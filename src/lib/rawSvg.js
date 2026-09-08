import { readFileSync } from "node:fs";
import path from "node:path";
import { unsafeHtml } from "./html.js";

const cache = new Map();

export function rawSvg(name) {
  let svg = cache.get(name);
  if (!svg) {
    svg = readFileSync(
      path.join(import.meta.dirname, "../icons", `${name}.svg`),
      "utf-8",
    );
    cache.set(name, svg);
  }
  return unsafeHtml(svg);
}
