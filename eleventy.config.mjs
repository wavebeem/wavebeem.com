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
  config.setLiquidOptions({
    strictFilters: true,
  });
  config.addPassthroughCopy({ "src/static": "/" });

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

  function* reversed(list) {
    for (let i = list.length - 1; i >= 0; i--) {
      yield list[i];
    }
  }

  config.addFilter("groupByYear", function (collection) {
    const map = new Map();
    for (const page of reversed(collection)) {
      const year = page.date.getFullYear();
      let group = map.get(year);
      if (!group) {
        group = [];
        map.set(year, group);
      }
      group.push(page);
    }
    return Array.from(map.entries());
  });

  config.addFilter("debug", function (data) {
    console.info(data);
    return "";
  });

  config.addFilter("sort", function (data) {
    return [...data].sort((a, b) => a.localeCompare(b));
  });

  config.addFilter("entries", function (data) {
    return Object.entries(data);
  });

  config.addFilter("log", function (data) {
    console.log(data);
    return data;
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
