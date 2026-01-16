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

export default {
  "color-black": oklch(27, 5, 142),

  "color-green": oklch(80, 40, 142),
  "color-greener": oklch(60, 40, 142),

  "color-silver": oklch(98, 5, 142),
  "color-white": oklch(100, 5, 142),

  "theme-selection": oklch(50, 80, 142),

  "theme-border": oklch(90, 0, 0),
  "theme-photo": oklch(96, 0, 0),
  "theme-code": oklch(96, 0, 0),
  "theme-button": oklch(90, 20, 142),
  "theme-card": oklch(96, 10, 142),
  "theme-link": oklch(50, 80, 142),

  "syntax-text": "var(--color-black)",
  // TODO: Improve these
  "syntax-keyword": oklch(52, 60, 260),
  "syntax-comment": oklch(50, 38, 162),
  "syntax-property": oklch(47, 67, 95),
  "syntax-string": oklch(55, 67, 42),
  "syntax-punctuation": oklch(57, 27, 288),
};
