import path from "node:path";
import Eleventy from "@11ty/eleventy";
import { convertAllImages } from "../src/lib/convertImages.js";

const command = process.argv[2];
if (command !== "build" && command !== "dev") {
  console.error("Usage: node scripts/cli.js <build|dev>");
  process.exit(1);
}

const root = path.join(import.meta.dirname, "..");
const port = 1312;

await convertAllImages(path.join(root, "src"), root);

const eleventy = new Eleventy(undefined, undefined, {
  configPath: path.join(root, "eleventy.config.mjs"),
  quietMode: true,
  runMode: command === "dev" ? "serve" : "build",
});
await eleventy.init();

if (command === "dev") {
  await eleventy.watch();
  eleventy.serve(port);
} else {
  await eleventy.write();
}
