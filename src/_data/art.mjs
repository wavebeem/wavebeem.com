import * as path from "node:path";
import * as fs from "node:fs";
import { getAverageColor } from "fast-average-color-node";
import getImageSize from "image-size";
import { AssetCache } from "@11ty/eleventy-cache-assets";

const root = "src/static/img/art";

function isHiddenFile(filename) {
  return path.basename(filename).startsWith(".");
}

async function getArt() {
  return await Promise.all(
    fs
      .readdirSync(root)
      .filter((f) => !isHiddenFile(f))
      .map(readInfo)
  );
}

async function readInfo(filename) {
  const url = `/static/img/art/${filename}`;
  const cleanName = path.basename(filename).replace(/\.(png|gif|webp)$/, "");
  let [, date, name] = cleanName.match(/^(\d{4}-\d{2}-\d{2})-(.*)$/);
  name = name.replace(/-/g, " ");
  const file = path.join(root, filename);
  const { width, height } = getImageSize(file);
  const { hex: color } = await getAverageColor(file, {
    algorithm: "dominant",
  });
  const obj = { url, name, date, width, height, color };
  return obj;
}

// Delete `.cache` dir when adding new image files locally
async function getArtCached() {
  const asset = new AssetCache("wavebeem_art");
  if (asset.isCacheValid("1d")) {
    return await asset.getCachedValue();
  }
  const art = await getArt();
  await asset.save(art, "json");
  return art;
}

export default getArtCached;
