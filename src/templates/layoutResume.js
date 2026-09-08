import { html } from "../lib/html.js";
import { layoutBase } from "./layoutBase.js";

export function layoutResume({ title, description }, ...children) {
  return layoutBase(
    { title, description },
    html`
      <article class="page">
        <header class="page-header" data-media="screen">
          <h1>${title}</h1>
        </header>
        <header hidden class="page-header" data-media="print">
          <h1>Sage Fennel Mock</h1>
        </header>
        <section class="page-body">${children}</section>
      </article>
    `,
  );
}
