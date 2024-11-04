// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  vite: {
    build: {
      // Don't use inline JS and stuff!
      assetsInlineLimit: 0,
    },
  },
  markdown: {
    // Let's try Shiki later. My code already assumes Prism.
    syntaxHighlight: "prism",
  },
  // This causes "file endpoints" to also have trailing slashes :|
  //
  // https://github.com/withastro/astro/issues/9674
  //
  // trailingSlash: "always",
  site: "https://www.wavebeem.com",
  integrations: [mdx(), sitemap({})],
});
