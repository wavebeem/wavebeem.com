/** @jsx h */
import { h } from "preact";
import { Head } from "./components/head.jsx";
import { Header } from "./components/header.jsx";
import { Footer } from "./components/footer.jsx";
import { renderDocument } from "./render-document.mjs";

export function LayoutBase({
  title,
  description,
  draft,
  contentHashes,
  buildDate,
  origin,
  eleventy,
  page,
  children,
}) {
  return (
    <html lang="en">
      <Head
        title={title}
        description={description}
        draft={draft}
        contentHashes={contentHashes}
        buildDate={buildDate}
        origin={origin}
        eleventy={eleventy}
      />
      <body>
        <Header page={page} />
        <main class="main">{children}</main>
        <Footer buildDate={buildDate} />
      </body>
    </html>
  );
}

export function render(data) {
  const { content } = data;
  return renderDocument(
    <LayoutBase {...data}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </LayoutBase>,
  );
}
