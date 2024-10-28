#!/usr/bin/env node
// @ts-check

import { existsSync } from "node:fs";
import { unlink, writeFile } from "node:fs/promises";
import { siteButtons } from "../src/_data/coolLinks.mjs";
import { spawnSync } from "node:child_process";

async function main() {
  const tmp = "temporary-image";
  for (const { mainUrl, buttonUrl } of siteButtons) {
    const { hostname } = new URL(mainUrl);
    const filename = `src/static/buttons/${hostname}.gif`;
    if (existsSync(filename)) {
      console.log("...", hostname);
    } else if (buttonUrl) {
      console.log("NEW", hostname);
      const resp = await fetch(buttonUrl);
      const data = await resp.arrayBuffer();
      await writeFile(tmp, new Uint8Array(data));
      spawnSync("magick", [tmp, "-strip", filename]);
    } else {
      console.log("??? MISSING", hostname);
    }
  }
  await unlink(tmp);
}

main();
