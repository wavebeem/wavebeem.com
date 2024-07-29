// https://docs.netlify.com/configure-builds/environment-variables/

const fallbackOrigin = process.env.CI
  ? "https://wavebeem.com"
  : "http://localhost:1312";

const prettyOrigin =
  process.env.CONTEXT === "production"
    ? process.env.URL
    : process.env.DEPLOY_PRIME_URL;

const origin = prettyOrigin || fallbackOrigin;

export default origin;
