const path = require("path");
const fs = require("fs");
const { getAverageColor } = require("fast-average-color-node");
const getImageSize = require("image-size");
const { AssetCache } = require("@11ty/eleventy-cache-assets");

const root = path.resolve(__dirname, "../static/img/art");

async function getArt() {
  return await Promise.all(fs.readdirSync(root).map(readInfo));
}

async function readInfo(filename) {
  const url = `/static/img/art/${filename}`;
  const cleanName = path
    .basename(filename)
    .replace(/\.(png|gif)$/, "")
    .replace(/-/g, " ")
    .replace(/^(\d{4}) (\d{2}) (\d{2}) (.*)$/, "$4 ($1-$2-$3)");
  const [, name, date] = cleanName.match(/^(.*?) \((.*)\)$/);
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

module.exports = getArtCached;
