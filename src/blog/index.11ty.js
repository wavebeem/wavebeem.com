import { html } from "../lib/html.js";
import { layoutPage } from "../templates/layoutPage.js";
import { groupByYear } from "../lib/groupByYear.js";

export const data = {
  layout: false,
  eleventyExcludeFromCollections: true,
};

export function render(data) {
  const posts = data.collections.posts.map((entry) => ({
    title: entry.data.title,
    description: entry.data.description,
    date: entry.date,
    url: entry.url,
  }));
  const postsByYear = groupByYear(posts, (post) => post.date.getFullYear());

  return layoutPage(
    { title: "Blog" },
    html`
      <p>
        I typically write about web development, video games, or my own life.
      </p>

      <p><a class="button" href="/subscribe/">Subscribe</a></p>

      ${postsByYear.map(
        ([year, yearPosts]) => html`
          <h2>${year}</h2>
          ${yearPosts.map(
            (post) => html`
              <a class="infobox" href="${post.url}">
                <span class="heading">${post.title}</span>
                <span class="description">${post.description}</span>
              </a>
            `,
          )}
        `,
      )}
    `,
  ).html;
}
