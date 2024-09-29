// @ts-check

import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import dateformat from "dateformat";
import markdownIt from "markdown-it";
import { inspect } from "node:util";

/** @typedef {import("@11ty/eleventy").UserConfig} UserConfig */

/** @param {UserConfig} config */
export default function getConfig(config) {
  const now = new Date();
  const markdown = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  config.setLibrary("md", markdown);
  config.addPlugin(syntaxHighlight);
  config.addPassthroughCopy({ "src/static": "/" });

  config.addPlugin(feedPlugin, {
    type: "atom", // or "rss", "json"
    outputPath: "/feed.xml",
    collection: {
      name: "post", // iterate over `collections.post`
      limit: 0, // 0 means no limit
    },
    metadata: {
      language: "en",
      title: "wavebeem.com blog",
      subtitle: "sage fennel's website",
      base: "https://www.wavebeem.com/",
      author: {
        name: "sage fennel",
        email: "mail@wavebeem.com",
      },
    },
  });

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

  config.addFilter("markdown", function (content) {
    return markdown.render(content);
  });

  // Return all the tags used in a collection
  config.addFilter("getAllTags", function (collection) {
    const set = new Set();
    for (const item of collection) {
      for (const tag of item.data.tags || []) {
        set.add(tag);
      }
    }
    return Array.from(set);
  });

  config.addFilter("sort", function (data) {
    return [...data].sort((a, b) => a.localeCompare(b));
  });

  const blockedTags = new Set(["all", "nav", "post", "posts"]);

  config.addFilter("filterTagList", function (tags) {
    tags = tags || [];
    return tags.filter((tag) => !blockedTags.has(tag));
  });

  // https://github.com/11ty/eleventy-base-blog/blob/main/eleventy.config.js
  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    // templateFormats: ["md", "njk", "html", "liquid"],

    // Pre-process *.md files with: (default: `liquid`)
    // markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    // htmlTemplateEngine: "njk",

    dir: {
      input: "src",
      output: "_site",
    },
  };
}
