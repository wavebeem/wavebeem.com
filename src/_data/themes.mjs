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

export default {
  "color-black": oklch(0, 0, 0, 87),
  // "color-black": oklch(25, 0, 0),
  // Material Design text guidelines...
  // "theme-text-high": oklch(0, 0, 0, 87),
  // "theme-text-medium": oklch(0, 0, 0, 60),
  // "theme-text-low": oklch(0, 0, 0, 38),

  "color-green": oklch(80, 40, 142),
  "color-greener": oklch(60, 40, 142),

  "color-silver": oklch(98, 5, 142),
  "color-white": oklch(100, 5, 142),

  "theme-selection-bg": oklch(85, 85, 322),
  "theme-selection-text": oklch(5, 0, 0),

  "theme-border": oklch(90, 0, 0),
  "theme-number": oklch(90, 0, 0),
  "theme-photo": oklch(96, 0, 0),
  "theme-figure": oklch(98, 0, 0),
  "theme-button": oklch(90, 20, 142),
  "theme-card": oklch(96, 10, 142),
  "theme-link": oklch(50, 80, 142),

  "syntax-bg": oklch(96, 0, 0),
  "syntax-text": oklch(0, 0, 0, 87),
  // "syntax-text": "#111111",
  "syntax-keyword": "#0000ee",
  "syntax-comment": "#007700",
  "syntax-property": "#aa00cc",
  "syntax-string": "#cc0000",
  "syntax-punctuation": "#aa4400",
};
