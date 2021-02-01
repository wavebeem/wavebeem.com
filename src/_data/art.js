const path = require("path");
const fs = require("fs");

function getArt() {
  return fs
    .readdirSync(path.resolve(__dirname, "../static/img/art"))
    .reverse()
    .map((filename) => {
      let name = filename;
      name = path.basename(name, ".png");
      name = path.basename(name, ".gif");
      const url = `/static/img/art/${filename}`;
      return { url, name };
    });
}

module.exports = getArt();
