export default function passthroughPlugin(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.addPassthroughCopy("src/**/assets/**/*");
  eleventyConfig.addPassthroughCopy("src/**/img/**/*");
}
