#!/usr/bin/env node
import { run, chdir } from "./_util.mjs";

chdir("src");
for (const size of [180, 360]) {
  await run("magick", "photo.webp", "-resize", size, `photo-${size}.webp`);
}
