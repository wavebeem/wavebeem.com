import * as crypto from "node:crypto";
import * as fs from "node:fs";

function hash(filename) {
  return crypto
    .createHash("md5")
    .update(fs.readFileSync(filename))
    .digest("hex");
}

export const favicon = hash("src/static/favicon.png");
export const faviconVector = hash("src/static/favicon.svg");
export const ogImage = hash("src/static/og-image.png");
export const globalMjs = hash("src/assets/global.mjs");
