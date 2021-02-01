const path = require("path");
const fs = require("fs");

function getArt() {
  return fs
    .readdirSync(path.resolve(__dirname, "../static/img/art"))
    .map((filename) => {
      const url = `/static/img/art/${filename}`;
      let name = filename;
      name = path.basename(name, ".png");
      name = path.basename(name, ".gif");
      name = name.replace(/-/g, " ");
      name = name.replace(/^(\d\d\d\d) (\d\d) (\d\d) (.*)$/, "$4 ($1-$2-$3)");
      return { url, name };
    });
}

module.exports = getArt();
