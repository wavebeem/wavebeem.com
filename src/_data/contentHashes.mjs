import * as crypto from "node:crypto";
import * as fs from "node:fs";

function createContentHash(filename) {
  return crypto
    .createHash("md5")
    .update(fs.readFileSync(filename))
    .digest("hex");
}

export default {
  favicon: createContentHash("src/static/favicon.png"),
  photo: createContentHash("src/static/photo.webp"),
  ogImage: createContentHash("src/static/og-image.png"),
};
