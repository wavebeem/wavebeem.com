import { setTimeout as sleep } from "node:timers/promises";
import { stat, unlink } from "node:fs/promises";
import path from "node:path";

async function retry({ fn, times, delay }) {
  for (let attempt = 1; attempt <= times; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === times) {
        throw error;
      }
      await sleep(delay);
    }
  }
}

// Folder name (anywhere in the path, any depth) picks the conversion style for
// PNG input. JPEG always uses its own settings below, regardless of folder.
// Anything not in one of these folders is a plain PNG: lossless, no resize.
const folderSettings = {
  vg: { quality: 80, maxWidth: 1280, maxHeight: 720 },
  pxl: { lossless: true, maxWidth: 1280, maxHeight: 720 },
  gbc: { lossless: true, upscale: 3 },
};
const jpegSettings = { quality: 90, maxWidth: 1280 };

const largeFileBytes = 500 * 1024;
const convertibleExtensions = new Set([".png", ".jpg", ".jpeg"]);

// Paths (relative to project root) allowed to stay large after conversion. Add
// an entry here if warnIfLarge flags one you've deliberately accepted.
const sizeExceptions = new Set();

// A raw/ folder (anywhere in the path, any depth) is never touched. For
// images that must stay in their original format, e.g. a post that shows
// real PNGs as content, not just illustration.
function isRaw(filePath) {
  return filePath.includes(`${path.sep}raw${path.sep}`);
}

function shouldConvertToWebp(filePath) {
  if (!filePath.includes(`${path.sep}assets${path.sep}`)) {
    return false;
  }
  if (isRaw(filePath)) {
    return false;
  }
  return convertibleExtensions.has(path.extname(filePath).toLowerCase());
}

function resolveSettings(filePath, ext) {
  if (ext === ".jpg" || ext === ".jpeg") {
    return jpegSettings;
  }

  for (const [folder, settings] of Object.entries(folderSettings)) {
    if (filePath.includes(`${path.sep}${folder}${path.sep}`)) {
      return settings;
    }
  }
  return { lossless: true };
}

async function resizeForSettings(image, settings) {
  if (settings.upscale) {
    const { width, height } = await image.metadata();
    // Nearest neighbour, not sharp's default lanczos3: gbc screenshots are
    // pixel art, and smooth interpolation would blur the hard edges.
    return image.resize(width * settings.upscale, height * settings.upscale, {
      kernel: "nearest",
    });
  }
  if (settings.maxWidth) {
    return image.resize(settings.maxWidth, settings.maxHeight ?? null, {
      fit: "inside",
      withoutEnlargement: true,
    });
  }
  return image;
}

async function readAndConvert(filePath, webpPath, settings) {
  // Dynamic import so astro build (which loads every integration too, not just
  // astro dev) never needs sharp resolvable.
  const { default: sharp } = await import("sharp");
  let image = sharp(filePath);
  image = await resizeForSettings(image, settings);
  image = image.webp(
    settings.lossless ? { lossless: true } : { quality: settings.quality },
  );
  await image.toFile(webpPath);
}

async function convertToWebp(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const webpPath = filePath.slice(0, -ext.length) + ".webp";
  const settings = resolveSettings(filePath, ext);

  // The watcher's "add" event can fire before a slow write (e.g. a big
  // screenshot) has fully landed on disk, so sharp can briefly fail to read a
  // genuinely valid file. Retry a few times before giving up.
  await retry({
    async fn() {
      await readAndConvert(filePath, webpPath, settings);
    },
    times: 5,
    delay: 200,
  });

  await unlink(filePath);
  return { webpPath, lossy: !settings.lossless };
}

async function warnIfLarge(webpPath, root, logger) {
  const { size } = await stat(webpPath);
  if (size <= largeFileBytes) {
    return;
  }

  const relPath = path.relative(root, webpPath);
  if (sizeExceptions.has(relPath)) {
    return;
  }

  logger.warn(
    `webp-watch: ${relPath} is ${(size / 1024).toFixed(0)}KB after conversion. ` +
      `Add "${relPath}" to sizeExceptions in webpWatch.mjs if that's expected.`,
  );
}

async function handleAdd(filePath, { root, logger }) {
  if (!shouldConvertToWebp(filePath)) {
    return;
  }

  let webpPath, lossy;
  try {
    ({ webpPath, lossy } = await convertToWebp(filePath));
  } catch (error) {
    logger.error(`webp-watch: failed converting ${filePath}: ${error.message}`);
    return;
  }

  const relFrom = path.relative(root, filePath);
  const relTo = path.relative(root, webpPath);
  logger.info(
    `webp-watch: ${relFrom} -> ${relTo} (${lossy ? "lossy" : "lossless"})`,
  );

  await warnIfLarge(webpPath, root, logger);
}

async function handleWatcherEvent(
  filePath,
  { root, logger, startedAt, inFlight },
) {
  // Guards against a single file write producing more than one watcher event
  // for the same path (confirmed in practice: a new file fires both "add" and
  // "change" a moment apart).
  if (inFlight.has(filePath)) {
    return;
  }
  inFlight.add(filePath);

  try {
    let stats;
    try {
      stats = await stat(filePath);
    } catch {
      // already gone, e.g. a duplicate event handled it first
      return;
    }
    // mtime newer than server start means either a brand-new file, or an
    // existing one deliberately touched to reprocess it (e.g. `touch` on an old
    // asset to run it through the pipeline). Anything with an older mtime was
    // never interacted with this session and must not be touched, regardless of
    // which watcher event fired.
    if (stats.mtimeMs < startedAt) {
      return;
    }
    await handleAdd(filePath, { root, logger });
  } finally {
    inFlight.delete(filePath);
  }
}

export default function webpWatch() {
  return {
    name: "webp-watch",
    hooks: {
      "astro:server:setup": ({ server, logger }) => {
        const root = server.config.root;
        const startedAt = Date.now();
        const inFlight = new Set();

        function onWatcherEvent(filePath) {
          // chokidar doesn't await listeners, so this must catch its own errors
          // or a bug here becomes an unhandled rejection that can crash the dev
          // server.
          handleWatcherEvent(filePath, {
            root,
            logger,
            startedAt,
            inFlight,
          }).catch((error) => {
            logger.error(`webp-watch: unexpected error: ${error.message}`);
          });
        }

        // Both events matter: "add" for brand-new files, "change" for an
        // existing file deliberately touched to reprocess it. The mtime gate
        // above (not the event name) decides what's real.
        server.watcher.on("add", onWatcherEvent);
        server.watcher.on("change", onWatcherEvent);
      },
    },
  };
}
