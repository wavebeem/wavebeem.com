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
  favicon: createContentHash("src/static/favicon.png"),
  faviconVector: createContentHash("src/static/favicon.svg"),
  ogImage: createContentHash("src/static/og-image.png"),
  appleTouchIcon: createContentHash("src/static/apple-touch-icon.png"),
};
