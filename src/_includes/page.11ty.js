import { layoutPage } from "../templates/layoutPage.js";
import { unsafeHtml } from "../lib/html.js";

export function render(data) {
  return layoutPage(
    { title: data.title, description: data.description },
    unsafeHtml(data.content),
  ).html;
}
