import "tsx/esm";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownIt from "markdown-it";
import { compileJsx, compileCss } from "./eleventy/compilers.mjs";

export default function getConfig(eleventyConfig) {
  eleventyConfig.setServerOptions({
    host: process.env.MY_ELEVENTY_HOST || "localhost",
  });

  const markdown = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  eleventyConfig.setLibrary("md", markdown);

  // TODO: Convert JSX templates to a plugin
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
    compile: compileJsx,
  });
  eleventyConfig.addTemplateFormats(["11ty.jsx", "11ty.ts", "11ty.tsx"]);
  eleventyConfig.addWatchTarget("**/*.{ts,tsx,jsx}");

  // Convert lightning CSS bundles to a plugin... not sure how to cleanly handle
  // that we might also want to keep passthrough CSS around too?
  eleventyConfig.addExtension("11ty.css", {
    outputFileExtension: "css",
    compile: compileCss,
  });
  eleventyConfig.addTemplateFormats(["11ty.css"]);
  eleventyConfig.ignores.add("src/_css/**");

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.addPassthroughCopy(
    "src/**/*.{png,jpg,jpeg,webp,svg,mp4,mjs}",
  );
  eleventyConfig.addPassthroughCopy("src/!(_css)/**/*.css");
  eleventyConfig.addPassthroughCopy("src/**/assets/**/*");
  eleventyConfig.addPassthroughCopy("src/**/img/**/*");

  eleventyConfig.addWatchTarget("./src/_css/");

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
