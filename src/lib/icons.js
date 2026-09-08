import { readFileSync } from "node:fs";
import { unsafeHtml } from "./html.js";

function loadIcon(lucideName) {
  const path = import.meta.resolve(`lucide-static/icons/${lucideName}.svg`);
  return unsafeHtml(readFileSync(new URL(path), "utf-8"));
}

export const icons = {
  menu: loadIcon("menu"),
  close: loadIcon("x"),
  theme: loadIcon("sun-moon"),
  navHome: loadIcon("house"),
  navBlog: loadIcon("rss"),
  navArt: loadIcon("palette"),
  navProjects: loadIcon("folder-git-2"),
  navAbout: loadIcon("user-round"),
  navShrines: loadIcon("landmark"),
  navExtras: loadIcon("boxes"),
};
