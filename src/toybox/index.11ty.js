import { html } from "../lib/html.js";
import { layoutPage } from "../templates/layoutPage.js";
import { compare } from "../lib/compare.js";

export const data = {
  layout: false,
  eleventyExcludeFromCollections: true,
};

export function render(data) {
  const posts = data.collections.toybox
    .toSorted((a, b) => -compare(a.date, b.date))
    .map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      url: entry.url,
    }));

  return layoutPage(
    { title: "Toybox" },
    html`
      <p>
        A silly little collection of toys and jokes made specifically for the
        web.
      </p>

      <p><a class="button" href="/subscribe/">Subscribe</a></p>

      ${posts.map(
        (post) => html`
          <a class="infobox" href="${post.url}">
            <span class="heading">${post.title}</span>
            <span class="description">${post.description}</span>
          </a>
        `,
      )}
    `,
  ).html;
}
