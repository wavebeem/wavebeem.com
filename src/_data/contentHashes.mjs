import * as crypto from "node:crypto";
import * as fs from "node:fs";

function createContentHash(filename) {
  return crypto
    .createHash("md5")
    .update(fs.readFileSync(filename))
    .digest("hex");
}

export default {
  wavebeemThemeSelect: createContentHash(
    "src/static/elements/wavebeem-theme-select.mjs"
  ),
  favicon: createContentHash("src/static/favicon.ico"),
  favicon16: createContentHash("src/static/favicon-16.png"),
  favicon32: createContentHash("src/static/favicon-32.png"),
  favicon: createContentHash("src/static/favicon.png"),
  faviconVector: createContentHash("src/static/favicon.svg"),
  photo: createContentHash("src/static/photo.webp"),
  ogImage: createContentHash("src/static/og-image.png"),
};
