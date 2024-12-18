#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { chdir } from "node:process";
import { Glob } from "glob";
import { existsSync } from "node:fs";

chdir("src/static");

for await (const file of new Glob("{art,blog}/**/*.{png,gif}", {})) {
  for (const [, base] of match(file, /^(.*)\.(png|gif)/)) {
    const dest = `${base}.webp`;
    if (!existsSync(dest)) {
      console.log(file);
      spawnSync("magick", [file, "-quality", "100", dest]);
    }
  }
}

for await (const file of new Glob("{art,blog}/**/*.{jpg,jpeg}", {})) {
  for (const [, base] of match(file, /^(.*)\.(jpg|jpeg)/)) {
    const dest = `${base}.webp`;
    if (!existsSync(dest)) {
      console.log(file);
      spawnSync("magick", [file, "-resize", "800", dest]);
    }
  }
}

function* match(string, regexp) {
  const m = string.match(regexp);
  if (m) {
    yield m;
  }
}
