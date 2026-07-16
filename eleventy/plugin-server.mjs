export default function serverPlugin(eleventyConfig) {
  eleventyConfig.setServerOptions({
    host: process.env.MY_ELEVENTY_HOST || "localhost",
  });
}
