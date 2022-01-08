const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItTocAndAnchor = require("markdown-it-toc-and-anchor").default;
const dateformat = require("dateformat");
const uslug = require("uslug");

module.exports = (config) => {
  config.setLibrary(
    "md",
    markdownIt({
      html: true,
      linkify: true,
      typographer: true,
    }).use(markdownItTocAndAnchor, {
      tocFirstLevel: 2,
    })
  );
  config.addPlugin(pluginRss);
  config.addPlugin(syntaxHighlight);
  config.addPassthroughCopy("src/_redirects");
  config.addPassthroughCopy("src/static");
  config.addFilter("formatDate", (value, format) => {
    if (value === "now") {
      value = new Date();
    }
    return dateformat(value, format);
  });
  config.addFilter("uslug", uslug);
  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
