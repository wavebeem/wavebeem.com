// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  markdown: {
    // Let's try Shiki later. My code already assumes Prism.
    syntaxHighlight: "prism",
  },
  trailingSlash: "always",
  site: "https://www.wavebeem.com",
  integrations: [mdx(), sitemap({})],
});
