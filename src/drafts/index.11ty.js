import { html } from "../lib/html.js";
import { layoutPage } from "../templates/layoutPage.js";

export const data = {
  layout: false,
  eleventyExcludeFromCollections: true,
};

export function render(data) {
  const posts = data.collections.drafts.map((entry) => ({
    title: entry.data.title ?? entry.fileSlug,
    url: entry.url,
  }));

  return layoutPage(
    { title: "Drafts" },
    html`
      <p>These posts aren't finished yet! Please don't share them.</p>

      ${posts.map(
        (post) => html`<a class="infobox" href="${post.url}">${post.title}</a>`,
      )}
    `,
  ).html;
}
