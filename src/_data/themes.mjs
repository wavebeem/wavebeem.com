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
  // green: "#0f7",
  // green: "#0e6",
  green: "#7e7",
  shamrock: "#5c5",
  purple: "#60e",
  peach: "#fc6",
};

export default {
  "color-black": raw.black,
  "color-green": raw.green,
  "color-shamrock": raw.shamrock,
  "color-silver": raw.silver,
  "color-white": raw.white,
  "color-purple": raw.purple,
  "color-peach": raw.peach,
  "color-ice": raw.ice,

  "theme-selection-bg": "var(--color-peach)",
  "theme-selection-text": "var(--color-black)",

  "theme-scrollbar": "var(--color-purple)",
  "theme-bullet": "var(--color-purple)",
  "theme-accent": "var(--color-shamrock)",
  "theme-border": "var(--color-ice)",
  "theme-number": "var(--color-silver)",
  "theme-photo": "var(--color-silver)",
  "theme-figure": "var(--color-ice)",
  "theme-image": "var(--color-white)",
  "theme-button": "var(--color-ice)",
  "theme-card": "var(--color-silver)",
  "theme-link": "var(--color-purple)",

  "color-shadow": "rgb(from var(--color-purple) r g b / 5%)",

  "syntax-border": "var(--color-ice)",
  "syntax-text": "var(--color-black)",
  // "syntax-text": "#111111",
  "syntax-keyword": "#0000ee",
  "syntax-comment": "#007700",
  "syntax-property": "#aa00cc",
  "syntax-string": "#cc0000",
  "syntax-punctuation": "#aa4400",
};
