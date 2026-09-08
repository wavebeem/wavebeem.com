import { html } from "../lib/html.js";
import { layoutBase } from "./layoutBase.js";

export function layoutPage({ title, description }, ...children) {
  return layoutBase(
    { title, description },
    html`
      <article class="page">
        <header class="page-header">
          <h1>${title}</h1>
        </header>
        <section class="page-body">${children}</section>
      </article>
    `,
  );
}
