// https://docs.netlify.com/configure-builds/environment-variables/

const fallbackOrigin = process.env.CI
  ? "https://wavebeem.com"
  : "http://localhost:1312";

const origin =
  process.env.DEPLOY_PRIME_URL || process.env.URL || fallbackOrigin;

module.exports = origin;
