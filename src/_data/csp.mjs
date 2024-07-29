const defaultSrc = ["'self'", "https://plausible.io"];
const imgSrc = [...defaultSrc];
const scriptSrc = [...defaultSrc];
const styleSrc = ["'self'", "'unsafe-inline'"];

// Allow 'unsafe-inline' JS sources for now, since Eleventy injects an inline
// script tag that loads Browsersync, rather than injecting a regular script
// tag.
if (!process.env.CI) {
  scriptSrc.push("'unsafe-inline'");
}

const cspObject = {
  "default-src": defaultSrc,
  "img-src": imgSrc,
  "script-src": scriptSrc,
  "style-src": styleSrc,
};

const cspString = Object.entries(cspObject)
  .map(([k, v]) => `${k} ${v.join(" ")};`)
  .join(" ");

export default cspString;
