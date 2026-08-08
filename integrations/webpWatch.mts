import { setTimeout as sleep } from "node:timers/promises";
import { stat, unlink } from "node:fs/promises";
import path from "node:path";
import type { AstroIntegration, AstroIntegrationLogger } from "astro";
// Static import, not dynamic: a late `await import("sharp")` inside the
// astro:config:setup hook kept racing Vite's module runner teardown and
// crashing dev. sharp is a mandatory dependency now, so there's no reason to
// defer loading it.
import sharp, { type Sharp } from "sharp";

interface ConvertSettings {
  lossless?: boolean;
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  upscale?: number;
}

async function retry<T>({
  fn,
  times,
  delay,
}: {
  fn: () => Promise<T>;
  times: number;
  delay: number;
}): Promise<T> {
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
  // Unreachable: the loop always returns or throws on its final attempt.
  throw new Error("unreachable");
}

// Folder name (anywhere in the path, any depth) picks the conversion style for
// PNG input. JPEG always uses its own settings below, regardless of folder.
// Anything not in one of these folders is a plain PNG: lossless, no resize.
const folderSettings: Record<string, ConvertSettings> = {
  vg: { quality: 80, maxWidth: 1280, maxHeight: 720 },
  pxl: { lossless: true, maxWidth: 1280, maxHeight: 720 },
  gbc: { lossless: true, upscale: 3 },
  "3ds": { lossless: true, upscale: 3 },
  playdate: { lossless: true, upscale: 3 },
  bigshot: { quality: 90, maxWidth: 1280 },
};
const jpegSettings: ConvertSettings = { quality: 90, maxWidth: 1280 };

const largeFileBytes = 500 * 1024;
const convertibleExtensions = new Set([".png", ".jpg", ".jpeg"]);

// Paths (relative to project root) allowed to stay large after conversion. Add
// an entry here if warnIfLarge flags one you've deliberately accepted.
const sizeExceptions = new Set([
  "src/content/blog/2025/css-obfuscation-and-userstyles/assets/bigshot/zen3.webp",
  "src/content/blog/2024/curry/assets/silly-face.webp",
  "src/content/blog/2024/curry/assets/the-pose.webp",
]);

// A raw/ folder (anywhere in the path, any depth) is never touched. For
// images that must stay in their original format, e.g. a post that shows
// real PNGs as content, not just illustration.
function isRaw(filePath: string): boolean {
  return filePath.includes(`${path.sep}raw${path.sep}`);
}

function shouldConvertToWebp(filePath: string): boolean {
  if (!filePath.includes(`${path.sep}assets${path.sep}`)) {
    return false;
  }
  if (isRaw(filePath)) {
    return false;
  }
  return convertibleExtensions.has(path.extname(filePath).toLowerCase());
}

function resolveSettings(filePath: string, ext: string): ConvertSettings {
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

async function resizeForSettings(
  image: Sharp,
  settings: ConvertSettings,
): Promise<Sharp> {
  if (settings.upscale) {
    const { width, height } = await image.metadata();
    // Nearest neighbour, not sharp's default lanczos3: gbc screenshots are
    // pixel art, and smooth interpolation would blur the hard edges.
    return image.resize(
      (width ?? 0) * settings.upscale,
      (height ?? 0) * settings.upscale,
      { kernel: "nearest" },
    );
  }
  if (settings.maxWidth) {
    return image.resize(settings.maxWidth, settings.maxHeight ?? null, {
      fit: "inside",
      withoutEnlargement: true,
    });
  }
  return image;
}

async function readAndConvert(
  filePath: string,
  webpPath: string,
  settings: ConvertSettings,
): Promise<void> {
  let image = sharp(filePath);
  image = await resizeForSettings(image, settings);
  image = image.webp(
    settings.lossless ? { lossless: true } : { quality: settings.quality },
  );
  await image.toFile(webpPath);
}

async function convertToWebp(
  filePath: string,
): Promise<{ webpPath: string; lossy: boolean }> {
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

async function warnIfLarge(
  webpPath: string,
  root: string,
  logger: AstroIntegrationLogger,
): Promise<void> {
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
      `Add "${relPath}" to sizeExceptions in webpWatch.mts if that's expected.`,
  );
}

async function handleAdd(
  filePath: string,
  { root, logger }: { root: string; logger: AstroIntegrationLogger },
): Promise<void> {
  if (!shouldConvertToWebp(filePath)) {
    return;
  }

  let webpPath: string, lossy: boolean;
  try {
    ({ webpPath, lossy } = await convertToWebp(filePath));
  } catch (error) {
    logger.error(
      `webp-watch: failed converting ${filePath}: ${(error as Error).message}`,
    );
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
  filePath: string,
  {
    root,
    logger,
    startedAt,
    inFlight,
  }: {
    root: string;
    logger: AstroIntegrationLogger;
    startedAt: number;
    inFlight: Set<string>;
  },
): Promise<void> {
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

export default function webpWatch(): AstroIntegration {
  return {
    name: "webp-watch",
    hooks: {
      "astro:server:setup": ({ server, logger }) => {
        const root = server.config.root;
        const startedAt = Date.now();
        const inFlight = new Set<string>();

        async function onWatcherEvent(filePath: string) {
          // chokidar doesn't await listeners, so this must catch its own errors
          // or a bug here becomes an unhandled rejection that can crash the dev
          // server.
          try {
            await handleWatcherEvent(filePath, {
              root,
              logger,
              startedAt,
              inFlight,
            });
          } catch (error) {
            logger.error(`webp-watch: unexpected error: ${error}`);
          }
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
