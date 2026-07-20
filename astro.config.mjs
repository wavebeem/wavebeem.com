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
      scriptDirective: {
        resources: ["'self'"],
      },
      // unsafe-inline on style-src is ignored once Astro adds a hash there, so
      // it's scoped to style-src-attr instead (never hashed).
      styleDirective: {
        resources: [
          "'self'",
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
    css: {
      // Needed for oklch, light-dark, nesting, @starting-style, ::picker,
      // rgb(from ...). See ~/Desktop/plan.md for the open browser-target
      // question.
      transformer: "lightningcss",
      // Empty targets = no downleveling. Vite's default target list polyfills
      // light-dark() incorrectly.
      lightningcss: {
        targets: {},
      },
    },
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
