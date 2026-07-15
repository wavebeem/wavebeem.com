/** @jsx h */
import { h } from "preact";
import { LayoutBase } from "./layout-base.11ty.jsx";
import { renderDocument } from "./render-document.mjs";

export function render(data) {
  const { title, content } = data;
  return renderDocument(
    <LayoutBase {...data}>
      <article class="page">
        <header class="page-header" data-media="screen">
          <h1>{title}</h1>
        </header>
        <header hidden class="page-header" data-media="print">
          <h1>Sage Fennel Mock</h1>
        </header>
        <section class="page-body">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </section>
      </article>
    </LayoutBase>,
  );
}
