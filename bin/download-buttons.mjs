#!/usr/bin/env node
// @ts-check

import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import siteButtons from "../src/_data/siteButtons.mjs";

async function main() {
  for (const { mainUrl, buttonUrl } of siteButtons) {
    const { hostname } = new URL(mainUrl);
    const filename = `src/static/buttons/${hostname}.gif`;
    if (existsSync(filename)) {
      console.log("...", hostname);
    } else {
      console.log("NEW", hostname);
      const resp = await fetch(buttonUrl);
      const data = await resp.arrayBuffer();
      await writeFile(filename, new Uint8Array(data));
    }
  }
}

main();
