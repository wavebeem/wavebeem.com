// @ts-check
import pluginRss from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import dateformat from "dateformat";
import markdownIt from "markdown-it";

/** @typedef {import("@11ty/eleventy").UserConfig} UserConfig */

/** @param {UserConfig} eleventyConfig */
export default function getConfig(eleventyConfig) {
  const now = new Date();

  const markdown = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  eleventyConfig.setLibrary("md", markdown);

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.setLiquidOptions({
    strictFilters: true,
  });

  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.addPassthroughCopy("src/**/*.{png,jpg,jpeg,webp,svg,mp4}");

  eleventyConfig.addWatchTarget("./src/_css/");

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addShortcode("renderThemes", function (themes) {
    let s = "";
    // Default theme (light mode)
    s += `:root {\n`;
    for (const [key, val] of Object.entries(themes.light)) {
      s += `  --${key}: ${val};\n`;
    }
    s += `}\n`;
    s += `\n`;
    // Default theme (dark mode)
    s += `@media (prefers-color-scheme: dark) {\n`;
    s += `  :root {\n`;
    for (const [key, val] of Object.entries(themes.dark)) {
      s += `    --${key}: ${val};\n`;
    }
    s += `  }\n`;
    s += `}\n`;
    s += `\n`;
    // Named themes
    for (const [name, vars] of Object.entries(themes)) {
      s += `:root[data-theme="${name}"] {\n`;
      for (const [key, val] of Object.entries(vars)) {
        s += `  --${key}: ${val};\n`;
      }
      s += `}\n`;
      s += `\n`;
    }
    return s;
  });

  eleventyConfig.addFilter("formatDate", function (value, format) {
    let isUTC = true;
    if (value === "now") {
      value = now;
      isUTC = false;
    }
    if (!value) {
      throw new Error(`bad date: ${value}`);
    }
    return dateformat(value, format, isUTC);
  });

  eleventyConfig.addFilter("formatTitle", function (value) {
    const base = "wavebeem";
    return [value, base].filter((x) => x).join(" - ");
  });

  eleventyConfig.addFilter("take", function (array, count) {
    return array.slice(0, count);
  });

  function* reversed(list) {
    for (let i = list.length - 1; i >= 0; i--) {
      yield list[i];
    }
  }

  eleventyConfig.addFilter("groupByYear", function (collection) {
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

  eleventyConfig.addFilter("fallback", function (data, other) {
    return data || other;
  });

  eleventyConfig.addFilter("debug", function (data) {
    console.info(data);
    return "";
  });

  eleventyConfig.addFilter("sort", function (data) {
    return [...data].sort((a, b) => a.localeCompare(b));
  });

  eleventyConfig.addFilter("entries", function (data) {
    return Object.entries(data);
  });

  eleventyConfig.addFilter("log", function (data) {
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
