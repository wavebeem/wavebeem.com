#!/usr/bin/env node
// @ts-check

import { spawnSync } from "node:child_process";
import { chdir } from "node:process";

const sizes = [48, 96, 180, 192, 360, 512];
chdir("src/static");

for (const s of sizes) {
  spawnSync("magick", [
    "photo.webp",
    "-scale",
    String(s),
    "-strip",
    `photo-${s}.webp`,
  ]);
}
