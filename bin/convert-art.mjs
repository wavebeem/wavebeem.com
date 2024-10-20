#!/usr/bin/env node
// @ts-check

import { spawnSync } from "node:child_process";
import { opendir, unlink } from "node:fs/promises";
import { chdir } from "node:process";

chdir("src/static/img/art");

for await (const entry of await opendir(".")) {
  for (const [, name] of match(entry.name, /^(.*)\.(gif|png)$/i)) {
    spawnSync("magick", [entry.name, "-quality", "100", `${name}.webp`]);
    await unlink(entry.name);
  }
}

function* match(string, regexp) {
  const m = string.match(regexp);
  if (m) {
    yield m;
  }
}
