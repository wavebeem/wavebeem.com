const path = require("path");
const fs = require("fs");
const getImageColors = require("get-image-colors");
const getImageSize = require("image-size");

const root = path.resolve(__dirname, "../static/img/art");

async function getArt() {
  return await Promise.all(fs.readdirSync(root).map(readInfo));
}

async function readInfo(name) {
  const filename = path.resolve(root, name);
  const url = `/static/img/art/${name}`;
  name = path.basename(name, ".png");
  name = path.basename(name, ".gif");
  name = name.replace(/-/g, " ");
  name = name.replace(/^(\d\d\d\d) (\d\d) (\d\d) (.*)$/, "$4 ($1-$2-$3)");
  const { width, height } = getImageSize(filename);
  const colors = await getImageColors(filename);
  const color = colors[0].hex();
  return { url, name, width, height, color };
}

module.exports = getArt;
