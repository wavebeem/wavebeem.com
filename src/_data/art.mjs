// @ts-check
import { AssetCache } from "@11ty/eleventy-cache-assets";
import getImageSize from "image-size";
import * as fs from "node:fs";
import * as path from "node:path";
import artTitles from "./artTitles.mjs";

const root = "src/static/art";

function isArtImage(filename) {
  const base = path.basename(filename);
  if (base.startsWith(".")) {
    return false;
  }
  return base.endsWith(".webp");
}

async function getArt() {
  return await Promise.all(
    fs.readdirSync(root).filter(isArtImage).map(readInfo)
  );
}

async function readInfo(filename) {
  const url = `/art/${filename}`;
  const cleanName = path.basename(filename, ".webp");
  let extension = path.basename(filename).split(/\./).pop();
  let [, date, name] = cleanName.match(/^(\d{4}-\d{2}-\d{2})-(.*)$/) || [];
  let [year] = date.split(/-/);
  const slug = name;
  name = name.replace(/-/g, " ");
  const title = artTitles[filename];
  if (!title) {
    throw new Error(`can't get title for ${filename}`);
  }
  name = title;
  const file = path.join(root, filename);
  const { width, height } = getImageSize(file);
  const obj = {
    url,
    year,
    name,
    date,
    width,
    height,
    extension,
    slug,
  };
  return obj;
}

// Delete `.cache` dir when adding new image files locally
export default async function getArtCached() {
  const asset = new AssetCache("wavebeem_art");
  if (asset.isCacheValid("1d")) {
    return await asset.getCachedValue();
  }
  const art = await getArt();
  await asset.save(art, "json");
  return art;
}
