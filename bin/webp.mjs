#!/usr/bin/env node
import { Glob } from "glob";
import { existsSync } from "node:fs";
import { run, chdir, match } from "./_util.mjs";

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
        if (base.endsWith(".vg")) {
          await run(
            "magick",
            file,
            "-resize",
            "1280x720>",
            "-quality",
            "80",
            dest
          );
        } else if (base.endsWith(".pxl")) {
          await run(
            "magick",
            file,
            "-resize",
            "1280x720>",
            "-quality",
            "100",
            dest
          );
        } else {
          await run("magick", file, "-quality", "100", dest);
        }
      }
    }
  }

  for await (const file of new Glob(`${globRoots}/**/*.{jpg,jpeg}`, {})) {
    for (const [, base] of match(file, /^(.*)\.(jpg|jpeg)/)) {
      const dest = `${base}.webp`;
      if (flag === "force" || !existsSync(dest)) {
        console.log(file);
        await run("magick", file, "-resize", "800>", dest);
      }
    }
  }
}

main(process.argv.slice(2));
