// Converts PNG/JPEG under an "assets" folder to webp and deletes the
// source; idempotent, safe to run on every build.
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

// sharp's native binding load is most of its startup cost, and most builds
// convert zero images (nothing new since the last run). Load it lazily so
// that common case skips paying for it.
let sharpPromise;
function loadSharp() {
  return (sharpPromise ??= import("sharp").then((mod) => mod.default));
}

const largeFileBytes = 500 * 1024;
const convertibleExtensions = new Set([".png", ".jpg", ".jpeg"]);

// Folder name (anywhere in the path, any depth) picks the conversion style
// for PNG input. JPEG always uses jpegSettings. Anything else is a plain
// PNG: lossless, no resize.
const folderSettings = {
  pxl: { lossless: true, maxWidth: 1280, maxHeight: 720 },
  gbc: { lossless: true, upscale: 4 },
  vg: { quality: 90, maxWidth: 1600 },
};
const jpegSettings = { quality: 90, maxWidth: 1280 };

// Paths (relative to project root) allowed to stay large after conversion.
const sizeExceptions = new Set();

function isRaw(filePath) {
  return filePath.includes(`${path.sep}raw${path.sep}`);
}

export function shouldConvertToWebp(filePath) {
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
    return image.resize(
      (width ?? 0) * settings.upscale,
      (height ?? 0) * settings.upscale,
      {
        kernel: "nearest",
      },
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

async function retry(fn, times, delay) {
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
  throw new Error("unreachable");
}

async function readAndConvert(filePath, webpPath, settings) {
  const sharp = await loadSharp();
  let image = sharp(filePath);
  image = await resizeForSettings(image, settings);
  image = image.webp(
    settings.lossless ? { lossless: true } : { quality: settings.quality },
  );
  await image.toFile(webpPath);
}

export async function convertToWebp(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const webpPath = filePath.slice(0, -ext.length) + ".webp";
  const settings = resolveSettings(filePath, ext);

  // A write can still be landing on disk when this runs; retry a few times
  // before giving up.
  await retry(() => readAndConvert(filePath, webpPath, settings), 5, 200);

  await unlink(filePath);
  return { webpPath, lossy: !settings.lossless };
}

export async function warnIfLarge(webpPath, root) {
  const { size } = await stat(webpPath);
  if (size <= largeFileBytes) {
    return;
  }
  const relPath = path.relative(root, webpPath);
  if (sizeExceptions.has(relPath)) {
    return;
  }
  console.warn(
    `convert-images: ${relPath} is ${(size / 1024).toFixed(0)}KB after conversion.`,
  );
}

async function findConvertibleFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findConvertibleFiles(fullPath)));
    } else if (shouldConvertToWebp(fullPath)) {
      files.push(fullPath);
    }
  }
  return files;
}

export async function convertAllImages(srcDir, root) {
  const files = await findConvertibleFiles(srcDir);
  for (const filePath of files) {
    const relFrom = path.relative(root, filePath);
    try {
      const { webpPath, lossy } = await convertToWebp(filePath);
      const relTo = path.relative(root, webpPath);
      console.log(
        `convert-images: ${relFrom} -> ${relTo} (${lossy ? "lossy" : "lossless"})`,
      );
      await warnIfLarge(webpPath, root);
    } catch (error) {
      console.error(
        `convert-images: failed converting ${relFrom}: ${error.message}`,
      );
    }
  }
}
