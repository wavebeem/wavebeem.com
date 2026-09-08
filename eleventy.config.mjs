import { markdownIt } from "./src/lib/markdown.js";
import { compileCss } from "./src/lib/compileCss.js";
import { compare } from "./src/lib/compare.js";

export default function configureEleventy(eleventyConfig) {
  eleventyConfig.setLibrary("md", markdownIt);

  // stops an initial "---" (<hr>) from misparsing as frontmatter
  eleventyConfig.setFrontMatterParsingOptions({
    delimiters: "~~~eleventy-no-frontmatter~~~",
  });

  eleventyConfig.addExtension("11ty.css", {
    outputFileExtension: "css",
    compile: compileCss,
    // avoids stale CSS on watch rebuilds (imports aren't tracked as deps)
    compileOptions: { cache: false },
  });
  eleventyConfig.addTemplateFormats(["11ty.css"]);
  eleventyConfig.ignores.add("src/_css/**");
  eleventyConfig.addWatchTarget("./src/_css/");

  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.addPassthroughCopy("src/**/assets/**/*");

  // the server already binds all interfaces regardless; this only affects
  // whether the LAN URL gets printed at startup
  eleventyConfig.setServerOptions({ showAllHosts: true });

  eleventyConfig.addCollection("posts", (collectionApi) =>
    [
      ...collectionApi.getFilteredByTag("blog"),
      ...collectionApi.getFilteredByTag("toybox"),
    ].sort((a, b) => -compare(a.date, b.date)),
  );

  return {
    markdownTemplateEngine: false,
    htmlTemplateEngine: false,
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
