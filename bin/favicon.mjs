#!/usr/bin/env node
import { run, chdir } from "./_util.mjs";

async function main([flag]) {
  chdir("src/static");
  await run("magick", "favicon.png", "favicon.ico");
}

main(process.argv.slice(2));
