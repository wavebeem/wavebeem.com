import { unsafeHtml } from "./html.js";

export function dataUri(mimeType, content) {
  const raw = typeof content === "string" ? content : content.html;
  return unsafeHtml(`url("data:${mimeType},${encodeURIComponent(raw)}")`);
}
