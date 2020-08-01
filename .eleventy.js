const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = (config) => {
  config.addPlugin(syntaxHighlight);
  config.addPassthroughCopy("src/static");
  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
