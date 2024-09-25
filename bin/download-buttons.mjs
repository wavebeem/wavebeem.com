#!/usr/bin/env node
// @ts-check

import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { siteButtons } from "../src/_data/coolLinks.mjs";

async function main() {
  for (const { mainUrl, buttonUrl } of siteButtons) {
    const { hostname } = new URL(mainUrl);
    // TODO: Support downloading other file formats... Chrome/Firefox/Safari all
    // seem to handle the incorrect MIME type just fine, but they shouldn't have
    // to!
    const filename = `src/static/buttons/${hostname}.gif`;
    if (existsSync(filename)) {
      console.log("...", hostname);
    } else if (buttonUrl) {
      console.log("NEW", hostname);
      const resp = await fetch(buttonUrl);
      const data = await resp.arrayBuffer();
      await writeFile(filename, new Uint8Array(data));
    } else {
      console.log("??? MISSING", hostname);
    }
  }
}

main();
