#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { chdir } from "node:process";

async function main([flag]) {
  chdir("src");
  for (const size of [180, 360]) {
    const x = spawnSync("magick", [
      "photo.webp",
      "-resize",
      size,
      `photo-${size}.webp`,
    ]);
  }
}

main(process.argv.slice(2));
