// @ts-check

const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
/** @type {any} */
const dateformat = require("dateformat");
const util = require("util");

/** @param config {import("@11ty/eleventy").UserConfig} */
module.exports = function (config) {
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
    if (!value) {
      return "wavebeem";
    }
    return `${value} | wavebeem`;
  });
  config.addFilter("inspect", function (value) {
    return util.inspect(value, {});
  });
  config.addPairedShortcode("navLink", function (content, url) {
    let s = `<a class="candy-link" href="${url}"`;
    if (url === this.page.url) {
      s += ` aria-current="page"`;
    }
    s += `>${content}</a>`;
    return s;
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
};
