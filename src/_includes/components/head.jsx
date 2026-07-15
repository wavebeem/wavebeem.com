/** @jsx h */
import { h } from "preact";

export function Head({
  title,
  description,
  draft,
  contentHashes,
  buildDate,
  origin,
  eleventy,
}) {
  return (
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta name="theme-color" content="#111" />
      <link
        rel="icon"
        href={`/favicon.svg?v=${contentHashes.faviconVector}`}
        type="image/svg+xml"
      />
      <link
        rel="icon"
        sizes="32x32"
        href={`/favicon.png?v=${contentHashes.favicon}`}
      />
      <link
        rel="stylesheet"
        media="screen"
        href={`/base.css?t=${buildDate.number}`}
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        href={`${origin}/feed.xml`}
        title="wavebeem.com"
      />
      <link rel="me" href="https://toot.community/@wavebeem" />
      <meta
        name="og:image"
        content={`${origin}/og-image.png?v=${contentHashes.ogImage}`}
      />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="description" content={description} />
      <title>{title}</title>
      <meta name="author" content="wavebeem" />
      <meta name="generator" content={eleventy.generator} />
      {draft && <meta name="robots" content="noindex" />}
      <script
        type="module"
        src={`/assets/global.mjs?v=${contentHashes.globalMjs}`}
      ></script>
      <script
        defer
        data-domain="wavebeem.com"
        data-api="/p/api/event"
        src="/p/js/script.js"
      ></script>
    </head>
  );
}
