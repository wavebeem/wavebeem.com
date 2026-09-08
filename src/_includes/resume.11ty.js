import { layoutResume } from "../templates/layoutResume.js";
import { unsafeHtml } from "../lib/html.js";

export function render(data) {
  return layoutResume(
    { title: data.title, description: data.description },
    unsafeHtml(data.content),
  ).html;
}
