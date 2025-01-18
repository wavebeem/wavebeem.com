#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { chdir } from "node:process";
import { Glob } from "glob";
import { existsSync } from "node:fs";

// TODO: Update this to work with images outside the Eleventy static directory.
// Use extname and basename to avoid globbing repeatedly.

async function main([flag]) {
  chdir("src");

  const globDirs = ["past-designs", "blog", "drafts"];
  const globRoots = "{" + globDirs.join(",") + "}";

  for await (const file of new Glob(`${globRoots}/**/*.{png,gif}`, {})) {
    for (const [, base] of match(file, /^(.*)\.(png|gif)/)) {
      const dest = `${base}.webp`;
      if (flag === "force" || !existsSync(dest)) {
        console.log(file);
        spawnSync("magick", [file, "-quality", "100", dest]);
      }
    }
  }

  for await (const file of new Glob(`${globRoots}/**/*.{jpg,jpeg}`, {})) {
    for (const [, base] of match(file, /^(.*)\.(jpg|jpeg)/)) {
      const dest = `${base}.webp`;
      if (flag === "force" || !existsSync(dest)) {
        console.log(file);
        spawnSync("magick", [file, "-resize", "800>", dest]);
      }
    }
  }
}

function* match(string, regexp) {
  const m = string.match(regexp);
  if (m) {
    yield m;
  }
}

main(process.argv.slice(2));
