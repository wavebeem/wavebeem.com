#!/usr/bin/env node
// @ts-check

import { writeFile } from "node:fs/promises";
import siteButtons from "../src/_data/siteButtons.mjs";

async function main() {
  for (const { buttonUrl } of siteButtons) {
    console.log("Downloading...", buttonUrl);
    const resp = await fetch(buttonUrl);
    const data = await resp.arrayBuffer();
    const hostname = new URL(buttonUrl).hostname;
    const filename = `src/static/buttons/${hostname}.gif`;
    await writeFile(filename, new Uint8Array(data));
  }
}

main();
