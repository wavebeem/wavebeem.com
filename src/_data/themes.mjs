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
  "color-black": oklch(27, 3.25, 11),

  "color-border-light": oklch(0, 0, 0, 3),
  "color-border-medium": oklch(0, 0, 0, 10),

  "color-green": oklch(80, 40, 142),
  "color-greener": oklch(60, 50, 142),

  "color-steel": oklch(92, 0.5, 322),
  "color-silver": oklch(98, 0.5, 322),
  "color-offwhite": oklch(98, 0.5, 322),
  "color-white": oklch(99.5, 0.5, 322),

  "theme-photo": oklch(96, 0.5, 322),
  "theme-card": oklch(96, 0.5, 322),
  "theme-grid-light": oklch(98, 0.5, 322),
  "theme-grid-dark": oklch(96, 0.5, 322),
  "theme-grid": oklch(96, 0.5, 322),
  "theme-link": oklch(50, 50, 142),
  "theme-button": oklch(92, 0.5, 322),

  "syntax-text": "var(--color-black)",
  // TODO: Improve these
  "syntax-keyword": oklch(52, 60, 260),
  "syntax-comment": oklch(50, 38, 162),
  "syntax-property": oklch(47, 67, 345),
  "syntax-string": oklch(55, 67, 42),
  "syntax-punctuation": oklch(57, 27, 288),
};
