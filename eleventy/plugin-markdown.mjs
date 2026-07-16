import markdownIt from "markdown-it";

export default function markdownPlugin(eleventyConfig) {
  const markdown = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  eleventyConfig.setLibrary("md", markdown);
}
