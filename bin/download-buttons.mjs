#!/usr/bin/env node
// @ts-check

import { spawnSync } from "node:child_process";
import { unlink, writeFile } from "node:fs/promises";
import { siteButtons } from "../src/_data/coolLinks.mjs";

async function main() {
  const tmp = "temporary-image";
  for (const { mainUrl, buttonUrl } of siteButtons) {
    const { hostname } = new URL(mainUrl);
    const filename = `src/static/buttons/${hostname}.webp`;
    if (buttonUrl) {
      console.log("NEW", hostname);
      const resp = await fetch(buttonUrl);
      const data = await resp.arrayBuffer();
      await writeFile(tmp, new Uint8Array(data));
      spawnSync("magick", [`${tmp}[0]`, "-strip", "-quality", "100", filename]);
    } else {
      console.log("??? MISSING", hostname);
    }
  }
  await unlink(tmp);
}

main();
