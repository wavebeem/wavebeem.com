import { compileCss } from "./compilers.mjs";

export default function lightningcssPlugin(eleventyConfig) {
  eleventyConfig.addExtension("11ty.css", {
    outputFileExtension: "css",
    compile: compileCss,
  });
  eleventyConfig.addTemplateFormats(["11ty.css"]);
  eleventyConfig.ignores.add("src/_css/**");
  eleventyConfig.addWatchTarget("./src/_css/");
}
