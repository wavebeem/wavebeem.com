#!/usr/bin/env node
// @ts-check

import { spawnSync } from "node:child_process";
import { unlink } from "node:fs/promises";
import { chdir } from "node:process";
import { Glob } from "glob";

chdir("src/static");

for await (const file of new Glob("{art,blog}/**/*.{png,gif}", {})) {
  for (const [, base] of match(file, /^(.*)\.(png|gif)/)) {
    console.log(file);
    spawnSync("magick", [file, "-quality", "100", `${base}.webp`]);
    await unlink(file);
  }
}

for await (const file of new Glob("{art,blog}/**/*.{jpg,jpeg}", {})) {
  for (const [, base] of match(file, /^(.*)\.(jpg|jpeg)/)) {
    console.log(file);
    // Don't delete the source JPEG since we might want to re-convert the
    // file...
    spawnSync("magick", [file, "-resize", "800", `${base}.webp`]);
  }
}

function* match(string, regexp) {
  const m = string.match(regexp);
  if (m) {
    yield m;
  }
}
