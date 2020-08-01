const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItTocAndAnchor = require("markdown-it-toc-and-anchor").default;

const date = new Date();
const year = date.getFullYear();

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
  config.addPlugin(syntaxHighlight);
  config.addPassthroughCopy("src/static");
  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
