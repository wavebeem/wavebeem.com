import { render as renderToString } from "preact-render-to-string";

export function renderDocument(vnode) {
  return "<!DOCTYPE html>\n" + renderToString(vnode);
}
