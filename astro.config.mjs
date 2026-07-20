// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import { viteStaticCopy } from "vite-plugin-static-copy";
import webpWatch from "./integrations/webpWatch.mjs";

// https://astro.build/config
export default defineConfig({
  integrations: [webpWatch()],
  security: {
    // Astro's CSP auto-hashing doesn't cover external same-origin files
    // (/theme-init.js, /resume/assets/print.css) without 'self'. Build/preview
    // only, astro dev doesn't apply CSP.
    csp: {
      directives: ["object-src 'none'"],
      scriptDirective: {
        // 'unsafe-inline' is ignored by browsers that support the hashes
        // Astro adds alongside it; it's only here as a fallback for older
        // browsers that don't.
        resources: ["'self'", "'unsafe-inline'"],
      },
      // unsafe-inline on style-src is ignored once Astro adds a hash there, so
      // it's scoped to style-src-attr instead (never hashed). 'self' is scoped
      // to style-src-elem since style-src-attr doesn't fall back to style-src
      // once it's explicitly set, and 'self' isn't a valid style-src-attr value.
      styleDirective: {
        resources: [
          { resource: "'self'", kind: "element" },
          { resource: "'unsafe-inline'", kind: "attribute" },
        ],
      },
    },
  },
  markdown: {
    syntaxHighlight: "prism",
  },
  image: {
    // https://github.com/withastro/astro/issues/14721
    service: passthroughImageService(),
  },
  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            // dist/blog/<slug>/assets/ next to dist/blog/<slug>/.
            src: "src/content/blog/*/*/assets",
            dest: "blog",
            rename: { stripBase: 3 },
          },
          {
            src: "src/content/toybox/*/*/assets",
            dest: "toybox",
            rename: { stripBase: 3 },
          },
          {
            // Non-post pages keep images colocated (resume, shrines/*,
            // past-designs).
            src: "src/pages/**/assets",
            dest: ".",
            rename: { stripBase: 2 },
          },
        ],
      }),
    ],
  },
});
