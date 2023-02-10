const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItTocAndAnchor = require("markdown-it-toc-and-anchor").default;
const dateformat = require("dateformat");
const util = require("util");

module.exports = function (config) {
  const markdown = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  }).use(markdownItTocAndAnchor, {
    wrapHeadingTextInAnchor: true,
    tocFirstLevel: 2,
  });
  config.setLibrary("md", markdown);
  config.addPlugin(pluginRss);
  config.addPlugin(syntaxHighlight);
  config.addPassthroughCopy("src/_redirects");
  config.addPassthroughCopy("src/static");
  const now = new Date();
  config.addFilter("formatDate", function (value, format) {
    if (value === "now") {
      value = now;
    }
    return dateformat(value, format);
  });
  config.addFilter("inspect", function (value) {
    return util.inspect(value, {});
  });
  config.addFilter("objectKeys", function (object) {
    return Object.keys(object);
  });
  config.addFilter("markdown", function (content) {
    return markdown.render(content);
  });
  return {
    // markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
