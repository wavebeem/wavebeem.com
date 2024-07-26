// https://docs.netlify.com/configure-builds/environment-variables/

const fallbackOrigin = process.env.CI
  ? "https://wavebeem.com"
  : "http://localhost:1312";

const prettyOrigin =
  process.env.CONTEXT === "production"
    ? process.env.DEPLOY_PRIME_URL
    : process.env.URL;

const origin = prettyOrigin || fallbackOrigin;

module.exports = origin;
