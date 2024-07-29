// @ts-check

import pluginRss from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownIt from "markdown-it";
/** @type {any} */
import dateformat from "dateformat";
/** @ts-expect-error */
import { inspect } from "node:util";

/** @param config {import("@11ty/eleventy").UserConfig} */
export default function getConfig(config) {
  const markdown = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  config.setLibrary("md", markdown);
  config.addPlugin(pluginRss);
  config.addPlugin(syntaxHighlight);
  config.addPassthroughCopy("src/static");
  const now = new Date();
  config.addFilter("formatDate", function (value, format) {
    if (value === "now") {
      value = now;
    }
    const isUTC = true;
    return dateformat(value, format, isUTC);
  });
  config.addFilter("formatTitle", function (value) {
    const base = "wavebeem";
    return [value, base].filter((x) => x).join(" | ");
  });
  config.addFilter("inspect", function (value) {
    return inspect(value, {});
  });
  config.addFilter("objectKeys", function (object) {
    return Object.keys(object);
  });
  config.addFilter("markdown", function (content) {
    return markdown.render(content);
  });
  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
}
