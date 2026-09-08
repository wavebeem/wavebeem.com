import { html, unsafeHtml } from "../lib/html.js";
import { layoutBase } from "./layoutBase.js";
import { formatDate } from "../lib/formatDate.js";
import { renderMarkdownInline } from "../lib/markdown.js";

export function layoutPost(
  { title, description, date, draft = false },
  ...children
) {
  return layoutBase(
    { title, description },
    html`
      <article class="page post">
        <header class="page-header">
          <h1>${title}</h1>
          ${
            date
              ? html`
                  <small>
                    <time datetime="${formatDate(date, "iso8601")}"
                      >${formatDate(date, "date")}</time
                    >
                  </small>
                `
              : ""
          }
        </header>

        ${
          draft
            ? html`
                <section class="page-body">
                  <p class="card">
                    <strong
                      >This post isn't finished yet. Please don't share
                      it.</strong
                    >
                  </p>
                </section>
              `
            : ""
        }

        <section class="page-body">
          ${
            description
              ? html`<p class="post-description">
                  ${unsafeHtml(renderMarkdownInline(description))}
                </p>`
              : ""
          }
          ${children}
        </section>

        <footer class="page-footer">
          <div class="page-footer--congrats">
            Thanks for reading <span aria-hidden="true">:-)</span>
            <br />
          </div>
          <ul class="inline-menu">
            <li><a href="/contact/">Comment</a></li>
            <li><a href="/subscribe/">Subscribe</a></li>
          </ul>
        </footer>
      </article>
    `,
  );
}
