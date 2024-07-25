const crypto = require("node:crypto");
const fs = require("node:fs");

function createContentHash(filename) {
  return crypto
    .createHash("md5")
    .update(fs.readFileSync(filename))
    .digest("hex");
}

module.exports = {
  favicon: createContentHash("src/static/favicon.png"),
  photo: createContentHash("src/static/photo.webp"),
  ogImage: createContentHash("src/static/og-image.png"),
};
