import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import jsxPlugin from "./eleventy/plugin-jsx.mjs";
import lightningcssPlugin from "./eleventy/plugin-lightningcss.mjs";
import markdownPlugin from "./eleventy/plugin-markdown.mjs";
import passthroughPlugin from "./eleventy/plugin-passthrough.mjs";
import serverPlugin from "./eleventy/plugin-server.mjs";

export default function getConfig(eleventyConfig) {
  eleventyConfig.addPlugin(serverPlugin);
  eleventyConfig.addPlugin(markdownPlugin);
  eleventyConfig.addPlugin(jsxPlugin);
  eleventyConfig.addPlugin(lightningcssPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(passthroughPlugin);

  return {
    markdownTemplateEngine: false,
    htmlTemplateEngine: false,
    dir: {
      input: "src",
      output: "_site",
    },
  };
}
