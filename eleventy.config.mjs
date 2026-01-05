// @ts-check
import pluginRss from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownIt from "markdown-it";

const timeZone = "America/Los_Angeles";
const utcOffset = -8;

/**
 * Compare two values for sorting.
 *
 * An extremely naive implementation that really should throw exceptions based
 * on mismatched types.
 *
 * @template T
 * @param {T} a
 * @param {T} b
 * @returns {-1 | 0 | 1}
 */
function compare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/** @typedef {import("@11ty/eleventy").UserConfig} UserConfig */

/** @param {UserConfig} eleventyConfig */
export default function getConfig(eleventyConfig) {
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
  eleventyConfig.addPassthroughCopy(
    "src/**/*.{png,jpg,jpeg,webp,svg,mp4,css,mjs}",
  );
  eleventyConfig.addPassthroughCopy("src/**/assets/**/*");
  eleventyConfig.addPassthroughCopy("src/**/img/**/*");

  eleventyConfig.addWatchTarget("./src/_css/");

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addShortcode(
    "renderThemes",
    function (/** @type {{ [s: string]: any; } | ArrayLike<any>} */ themes) {
      let s = "";
      // Default theme (light mode)
      s += `:root {\n`;
      for (const [key, val] of Object.entries(themes)) {
        s += `  --${key}: ${val};\n`;
      }
      s += `}\n`;
      return s;
    },
  );

  const yearFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    timeZone,
  });
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone,
  });
  eleventyConfig.addFilter(
    "formatDate",
    function (
      /** @type {string | number | Date} */ value,
      /** @type {any} */ format,
    ) {
      const date = new Date(value);
      switch (format) {
        case "year": {
          return yearFormatter.format(date);
        }
        case "iso8601": {
          return date.toISOString();
        }
        default:
        case "date": {
          return dateFormatter.format(date);
        }
      }
    },
  );

  eleventyConfig.addFilter(
    "toISOString",
    function (/** @type {string | number | Date} */ date) {
      return new Date(date).toISOString();
    },
  );

  // https://jeremias.codes/2025/02/markdown-filters-eleventy/
  eleventyConfig.addFilter(
    "markdownify",
    function markdownify(/** @type {any} */ content) {
      return markdown.renderInline(content || "");
    },
  );

  eleventyConfig.addFilter(
    "take",
    function (/** @type {string | any[]} */ array, /** @type {any} */ count) {
      return array.slice(0, count);
    },
  );

  /**
   * @param {string | any[]} list
   */
  function* reversed(list) {
    for (let i = list.length - 1; i >= 0; i--) {
      yield list[i];
    }
  }

  eleventyConfig.addFilter(
    "groupByYear",
    function (/** @type {string | any[]} */ collection) {
      const map = new Map();
      for (const page of reversed(collection)) {
        const d = new Date(page.date);
        d.setHours(d.getHours() + utcOffset);
        const year = d.getFullYear();
        let group = map.get(year);
        if (!group) {
          group = [];
          map.set(year, group);
        }
        group.push(page);
      }
      return Array.from(map.entries());
    },
  );

  eleventyConfig.addFilter(
    "fallback",
    function (/** @type {any} */ data, /** @type {any} */ other) {
      return data || other;
    },
  );

  eleventyConfig.addFilter(
    "sortBy",
    function (/** @type {any} */ data, /** @type {any} */ property) {
      return [...data].sort((a, b) => {
        return compare(objectPathGet(a, property), objectPathGet(b, property));
      });
    },
  );

  /**
   * @param {any} obj
   * @param {string} path
   */
  function objectPathGet(obj, path) {
    let ret = obj;
    for (const chunk of path.split(".")) {
      ret = ret[chunk];
    }
    return ret;
  }

  eleventyConfig.addFilter(
    "sortByLocale",
    function (/** @type {any} */ data, /** @type {string} */ property) {
      return [...data].sort((a, b) => {
        return String(objectPathGet(a, property) || "").localeCompare(
          objectPathGet(b, property) || "",
        );
      });
    },
  );

  eleventyConfig.addFilter("debug", function (/** @type {any} */ data) {
    console.info(data);
    return "";
  });

  eleventyConfig.addFilter(
    "fallback",
    function (/** @type {any} */ data, /** @type {any} */ fallback) {
      return data || fallback;
    },
  );

  eleventyConfig.addFilter("sort", function (/** @type {any} */ data) {
    return [...data].sort((a, b) => a.localeCompare(b));
  });

  eleventyConfig.addFilter(
    "entries",
    function (/** @type {ArrayLike<any> | { [s: string]: any; }} */ data) {
      return Object.entries(data);
    },
  );

  eleventyConfig.addFilter("log", function (/** @type {any} */ data) {
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
