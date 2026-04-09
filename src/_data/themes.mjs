import Color from "colorjs.io";

// Should I try out some other colors eventually?
//
// https://color-combos.wavebeem.com/?fg=%23fff%0A%23222&bg=%23fff%0A%23222%0A%2370f%0A%230f8%0A%23eef&group_by=background
//
// #eef
// #fff
// #222
// #70f
// #0f8

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

const raw = {
  white: "#fff",
  black: "#222",
  silver: "#eef",
  ice: "#ddf",
  green: "#0f7",
  purple: "#70f",
  peach: "#fc6",
};

export default {
  "color-black": raw.black,
  "color-green": raw.green,
  "color-silver": raw.silver,
  "color-white": raw.white,

  "theme-selection-bg": raw.peach,
  "theme-selection-text": raw.black,

  "theme-scrollbar": raw.purple,
  "theme-accent": raw.green,
  "theme-border": raw.ice,
  "theme-number": raw.silver,
  "theme-photo": raw.silver,
  "theme-figure": raw.ice,
  "theme-image": raw.ice,
  "theme-button": raw.ice,
  "theme-card": raw.silver,
  "theme-link": raw.purple,

  "syntax-border": raw.ice,
  "syntax-text": raw.black,
  // "syntax-text": "#111111",
  "syntax-keyword": "#0000ee",
  "syntax-comment": "#007700",
  "syntax-property": "#aa00cc",
  "syntax-string": "#cc0000",
  "syntax-punctuation": "#aa4400",
};
