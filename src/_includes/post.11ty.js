import { layoutPost } from "../templates/layoutPost.js";
import { unsafeHtml } from "../lib/html.js";

export function render(data) {
  return layoutPost(
    {
      title: data.title,
      description: data.description,
      date: data.date,
      draft: data.draft,
    },
    unsafeHtml(data.content),
  ).html;
}
