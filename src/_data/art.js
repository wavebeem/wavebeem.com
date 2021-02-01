const globby = require("globby");

async function getArt() {
  const files = await globby("../static/art/*", { cwd: __dirname });
  console.log("==>", files);
  return files;
}

module.exports = getArt();
