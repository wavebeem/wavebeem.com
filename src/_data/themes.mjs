import Color from "colorjs.io";

/**
 * @param {number} lightness
 * @param {number} chroma
 * @param {number} hue
 * @param {number} alpha
 * @returns {string}
 */
function oklch(lightness, chroma, hue, alpha = 100) {
  const l = lightness / 100;
  const c = (chroma / 100) * 0.4;
  const h = hue;
  const a = alpha / 100;
  const color = new Color("oklch", [l, c, h]);
  color.alpha = a;
  return color.to("srgb").toString({ format: "hex" });
}

// https://www.colourlovers.com/palette/1608718/queen_angel
//
// #181a1b
// #286757
// #2fc723
// #b3f200
// #d3e0d3
//
const raw = {
  white: "#d3e0d3",
  black: "#181a1b",
  silver: "#e7efe7",
  ice: "#e7efe7",
  green: "#286757",
  forest: "#2fc723",
  honeydew: "#b3f200",

  peach: "#d2acfb",
};

export default {
  "color-white": raw.white,
  "color-black": raw.black,
  "color-silver": raw.silver,
  "color-ice": raw.ice,
  "color-green": raw.green,
  "color-forest": raw.forest,
  "color-honeydew": raw.honeydew,
  "color-peach": raw.peach,

  "theme-selection-bg": "var(--color-peach)",
  "theme-selection-text": "var(--color-black)",

  "theme-scrollbar": "var(--color-forest)",
  "theme-bullet": "var(--color-green)",
  "theme-accent": "var(--color-forest)",
  "theme-border":
    "color-mix(in oklab, var(--color-green) 20%, var(--color-white))",
  "theme-number": "var(--color-silver)",
  "theme-photo": "var(--color-ice)",
  "theme-figure": "var(--color-ice)",
  "theme-image": "var(--color-ice)",
  "theme-button": "var(--color-ice)",
  "theme-card": "var(--color-silver)",
  "theme-link": "var(--color-green)",

  "syntax-background": "var(--color-black)",
  "syntax-border": "var(--color-black)",
  "syntax-text": "var(--color-white)",
  "syntax-keyword": "#ffffff",
  "syntax-comment": "#bd85f9",
  "syntax-property": "#b3f200",
  "syntax-string": "#00cc9c",
  "syntax-punctuation": "#d2acfb",
};
