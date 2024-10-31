// @ts-check

import pluginRss from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import dateformat from "dateformat";
import markdownIt from "markdown-it";

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
  config.addPassthroughCopy("src/art/*.webp");

  config.addPlugin(pluginRss);

  config.addFilter("formatDate", function (value, format) {
    if (value === "now") {
      value = now;
    }
    if (!value) {
      throw new Error(`bad date: ${value}`);
    }
    const isUTC = true;
    return dateformat(value, format, isUTC);
  });

  config.addFilter("formatTitle", function (value) {
    const base = "wavebeem";
    return [value, base].filter((x) => x).join(" - ");
  });

  config.addFilter("take", function (array, count) {
    return array.slice(0, count);
  });

  const prettyTagMap = new Map([
    ["art", "Art"],
    ["bash", "Bash"],
    ["compilers", "Compilers"],
    ["cooking", "Cooking"],
    ["css", "CSS"],
    ["design", "Design"],
    ["draft", "Draft"],
    ["essay", "Essay"],
    ["feed", "Feed"],
    ["javascript", "JavaScript"],
    ["keyboards", "Keyboards"],
    ["meta", "Meta"],
    ["programming", "Programming"],
    ["python", "Python"],
    ["react", "React"],
    ["recipe", "Recipe"],
    ["tech", "Tech"],
    ["toybox", "Toybox"],
    ["typescript", "TypeScript"],
    ["video-games", "Video games"],
    ["web-components", "Web components"],
    ["web", "Web"],
  ]);

  config.addFilter("prettyTag", function (content) {
    if (!prettyTagMap.has(content)) {
      throw new Error(`unknown tag: ${content}`);
    }
    return prettyTagMap.get(content);
  });

  // Return all the tags used in a collection
  config.addFilter("getAllTags", function (collection) {
    const set = new Set();
    for (const item of collection) {
      const tags = item.data.tags || [];
      if (tags.includes("draft")) {
        continue;
      }
      for (const tag of tags) {
        set.add(tag);
      }
    }
    return Array.from(set);
  });

  config.addFilter("sort", function (data) {
    return [...data].sort((a, b) => a.localeCompare(b));
  });

  const blockedTags = new Set(["all", "posts"]);

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
