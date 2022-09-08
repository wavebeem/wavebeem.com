const path = require("path");
const fs = require("fs");
const { AssetCache } = require("@11ty/eleventy-cache-assets");

const root = path.resolve(__dirname, "../static/img/site-buttons");

async function getSiteButtons() {
  return await Promise.all(fs.readdirSync(root).map(readInfo));
}

async function readInfo(filename) {
  const url = `/static/img/site-buttons/${filename}`;
  const name = path.basename(filename, ".gif");
  return { url, name };
}

// Delete `.cache` dir when adding new image files locally
async function getSiteButtonsCached() {
  const asset = new AssetCache("wavebeem_site_buttons");
  if (asset.isCacheValid("1d")) {
    return await asset.getCachedValue();
  }
  const siteButton = await getSiteButtons();
  await asset.save(siteButton, "json");
  return siteButton;
}

module.exports = getSiteButtonsCached;
