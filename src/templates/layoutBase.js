import { html } from "../lib/html.js";
import { dataUri } from "../lib/dataUri.js";
import { rawSvg } from "../lib/rawSvg.js";
import { header } from "./header.js";
import { sidebar } from "./sidebar.js";
import { footer } from "./footer.js";

export function layoutBase({ title, description = "" }, ...children) {
  const maskWavyH = dataUri("image/svg+xml", rawSvg("divider-wavy-h"));
  const maskWavyV = dataUri("image/svg+xml", rawSvg("divider-wavy-v"));
  const maskChevronDown = dataUri("image/svg+xml", rawSvg("chevron-down"));

  return html`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>
          :root {
            --mask-wavy-h: ${maskWavyH};
            --mask-wavy-v: ${maskWavyV};
            --mask-chevron-down: ${maskChevronDown};
          }
        </style>
        <link rel="stylesheet" href="/base.css" />
        <script src="/theme-init.js"></script>
        <meta name="color-scheme" content="light dark" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <!-- Keep in sync with --md-primary in md-tokens.css. -->
        <meta
          name="theme-color"
          content="#3c6839"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#a2d399"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" sizes="32x32" href="/favicon.png" />
        <link
          rel="alternate"
          type="application/atom+xml"
          href="/feed.xml"
          title="Subscribe to wavebeem.com"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/PPMori-Regular.woff2"
          crossorigin
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/PPMori-Semibold.woff2"
          crossorigin
        />
        <meta name="og:title" content="${title}" />
        <meta name="og:description" content="${description}" />
        <meta property="og:type" content="website" />
        <meta name="description" content="${description}" />
        <title>${title}</title>
        <meta name="author" content="wavebeem" />
        <meta
          name="generator"
          content="Eleventy v${process.env.ELEVENTY_VERSION}"
        />
        <script
          defer
          data-domain="wavebeem.com"
          data-api="/p/api/event"
          src="/p/js/script.js"
        ></script>
        <script type="module" src="/global.mjs"></script>
      </head>
      <body>
        <a href="#main" class="skip-link">Skip to main content</a>
        ${header()}
        <div class="page-shell">
          ${sidebar()}
          <div class="content">
            <main class="main" id="main">${children}</main>
            ${footer()}
          </div>
        </div>
      </body>
    </html> `;
}
