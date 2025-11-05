#!/usr/bin/env node
import { Glob } from "glob";
import { existsSync } from "node:fs";
import { run, chdir, match, args } from "./_util.mjs";

// Looking to generate thumbnails from videos? Make a script for that
// eventually, yeah?
//
// ffmpeg -y -i INPUT.mp4 -ss 00:00:05.000 -vframes 1 INPUT.webp

// TODO: Update this to work with images outside the Eleventy static directory.
// Use extname and basename to avoid globbing repeatedly.

const [flag] = args;
chdir("src");

const globDirs = ["past-designs", "blog", "drafts", "shrines", "projects"];
const globRoots = "{" + globDirs.join(",") + "}";

for await (const file of new Glob(`${globRoots}/**/*.{png,gif}`, {})) {
  for (const [, base] of match(file, /^(.*)\.(png|gif)/)) {
    const dest = `${base}.webp`;
    if (flag === "force" || !existsSync(dest)) {
      console.log(file);
      if (base.endsWith(".vg") || base.endsWith(".lossy")) {
        await run(
          "magick",
          file,
          "-resize",
          "1280x720>",
          "-quality",
          "80",
          dest,
        );
      } else if (base.endsWith(".pxl")) {
        await run(
          "magick",
          file,
          "-resize",
          "1280x720>",
          "-quality",
          "100",
          dest,
        );
      } else if (base.endsWith(".gbc")) {
        await run("magick", file, "-scale", "300%", "-quality", "100", dest);
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
      await run("magick", file, "-resize", "1280>", dest);
    }
  }
}
