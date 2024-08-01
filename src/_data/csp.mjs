const defaultSrc = ["'self'", "https://plausible.io"];
const imgSrc = [...defaultSrc];
const scriptSrc = [...defaultSrc];
const styleSrc = ["'self'"];

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
