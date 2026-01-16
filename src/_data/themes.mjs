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

const syntax = {
  blue: "#2e5acc",
  pink: "#b40391",
  black: "#38383d",
  green: "#2e7210",
  purple: "#7b08d3",
  navy: "#273aa7",
};

export default {
  "color-black": oklch(25, 0, 0),

  "color-green": oklch(80, 40, 142),
  "color-greener": oklch(60, 40, 142),

  "color-silver": oklch(98, 5, 142),
  "color-white": oklch(100, 5, 142),

  "theme-selection-bg": oklch(85, 85, 322),
  "theme-selection-text": oklch(5, 0, 0),

  "theme-border": oklch(90, 0, 0),
  "theme-number": oklch(90, 0, 0),
  "theme-photo": oklch(96, 0, 0),
  "theme-code": oklch(96, 0, 0),
  "theme-button": oklch(90, 20, 142),
  "theme-card": oklch(96, 10, 142),
  "theme-link": oklch(50, 80, 142),

  "syntax-text": oklch(2, 0, 0),
  "syntax-keyword": oklch(50, 57, 250),
  "syntax-comment": oklch(50, 38, 142),
  "syntax-property": oklch(55, 57, 322),
  "syntax-string": oklch(55, 57, 40),
  "syntax-punctuation": oklch(50, 50, 80),
};
