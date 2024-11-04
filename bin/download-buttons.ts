import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { unlink, writeFile } from "node:fs/promises";
import { siteButtons } from "../src/data/coolLinks";

async function main() {
  const tmp = "temporary-image";
  for (const { mainUrl, buttonUrl } of siteButtons) {
    const { hostname } = new URL(mainUrl);
    const filename = `public/buttons/${hostname}.webp`;
    if (existsSync(filename)) {
      console.log("...", filename);
    } else if (buttonUrl) {
      console.log("NEW", hostname);
      const resp = await fetch(buttonUrl);
      const data = await resp.arrayBuffer();
      await writeFile(tmp, new Uint8Array(data));
      spawnSync("magick", [`${tmp}[0]`, "-strip", "-quality", "100", filename]);
    } else {
      console.log("??? MISSING", hostname);
    }
  }
  if (existsSync(tmp)) {
    await unlink(tmp);
  }
}

main();
