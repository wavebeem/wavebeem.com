const path = require("path");
const fs = require("fs");
const getImageColors = require("get-image-colors");
const getImageSize = require("image-size");

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
    .replace(/^(\d\d\d\d) (\d\d) (\d\d) (.*)$/, "$4 ($1-$2-$3)");
  const [, name, date] = cleanName.match(/^(.*?) \((.*)\)$/);
  const file = path.join(root, filename);
  const { width, height } = getImageSize(file);
  const colors = await getImageColors(file);
  const color = colors[0].hex();
  const obj = { url, name, date, width, height, color };
  return obj;
}

// If this ever gets too slow, check out asset caching
// https://www.11ty.dev/docs/plugins/cache/
module.exports = getArt;
