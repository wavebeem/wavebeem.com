/** @jsx h */
import { h } from "preact";
import { LayoutBase } from "./layout-base.11ty.jsx";
import { FormattedDate } from "./components/date.jsx";
import { renderDocument } from "./render-document.mjs";
import { markdownify } from "../../eleventy/filter.mjs";

export function render(data) {
  const { title, description, draft, content, page } = data;
  return renderDocument(
    <LayoutBase {...data}>
      <article class="page post">
        <header class="page-header">
          <h1>{title}</h1>
          <small>
            <FormattedDate date={page.date} />
          </small>
        </header>

        {draft && (
          <section class="page-body">
            <p class="card">
              <strong>
                This post isn't finished yet. Please don't share it.
              </strong>
            </p>
          </section>
        )}

        <section class="page-body">
          {description && (
            <p
              class="post-description"
              dangerouslySetInnerHTML={{ __html: markdownify(description) }}
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </section>

        <footer class="page-footer">
          <div class="page-footer--congrats">
            <strong>Thanks for reading :)</strong>
            <br />
          </div>
          <ul class="infobox">
            <li>
              <a href="/contact/">Tell me your thoughts</a>
            </li>
            <li>
              <a href="/subscribe/">Subscribe to my updates</a>
            </li>
            <li>
              <a href="/blog/">Read more blog posts</a>
            </li>
            <li>
              <a href="/menu/">Explore the rest of the site</a>
            </li>
          </ul>
        </footer>
      </article>
    </LayoutBase>,
  );
}
