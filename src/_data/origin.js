// https://docs.netlify.com/configure-builds/environment-variables/
let origin = "https://wavebeem.com";
if (process.env.CI) {
  origin ||= process.env.URL;
  origin ||= process.env.DEPLOY_PRIME_URL;
} else {
  origin = "http://localhost:1312";
}

console.log(process.env);

module.exports = origin;
