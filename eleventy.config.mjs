// @ts-check

import pluginRss from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import dateformat from "dateformat";
import markdownIt from "markdown-it";
import { inspect } from "node:util";

function compare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

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

  config.addCollection("feed", async function (collectionApi) {
    return collectionApi
      .getAllSorted()
      .filter((item) => {
        const tags = item?.data?.tags || [];
        return tags.includes("post") || tags.includes("art");
      })
      .map((item) => {
        const tags = item?.data?.tags || [];
        if (tags.includes("art") && item?.data?.image?.date) {
          const [y, m, d] = (item?.data?.image?.date || "")
            .split("-")
            .map(Number);
          const newDate = new Date(item.date);
          newDate.setUTCFullYear(y);
          newDate.setUTCMonth(m - 1);
          newDate.setUTCDate(d);
          item.feedDate = newDate;
        } else {
          item.feedDate = item.date;
        }
        return item;
      })
      .sort((a, b) => {
        return compare(getDate(a), getDate(b)) || compare(a.title, b.title);
      });
  });

  config.addPlugin(pluginRss);

  // Eleventy doesn't let you override `date`, so we have a second kind of date
  // reserved for making our own dates... sigh.
  function getDate(value) {
    return value.feedDate || value.date;
  }

  config.addFilter("getDate", getDate);

  config.addFilter("getNewestDate", function (value) {
    const dates = value.map(getDate);
    dates.sort(compare).reverse();
    return dates[0];
  });

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
        if (tag !== "draft") {
          set.add(tag);
        }
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
