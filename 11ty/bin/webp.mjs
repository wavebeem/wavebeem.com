#!/usr/bin/env node
// @ts-check

import { spawnSync } from "node:child_process";
import { unlink } from "node:fs/promises";
import { chdir } from "node:process";
import { Glob } from "glob";

chdir("src/static");

for await (const file of new Glob("img/{art,slime-mode}/**/*.{png,gif}", {})) {
  for (const [, base] of match(file, /^(.*)\.(png|gif)/)) {
    console.log(file);
    spawnSync("magick", [file, "-quality", "100", `${base}.webp`]);
    await unlink(file);
  }
}

function* match(string, regexp) {
  const m = string.match(regexp);
  if (m) {
    yield m;
  }
}
