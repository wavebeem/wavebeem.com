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
  "color-main-background": "#fff",
  "color-main-text": "#111",
  "color-main-link": oklch(55, 55, 290),
  "color-main-accent": oklch(52, 52, 165),
  "color-main-decoration": oklch(80, 50, 135),
  "color-main-faint": oklch(95, 10, 135),

  "color-button-highlight": oklch(98, 20, 135),
  "color-button-shadow": oklch(80, 50, 135, 50),
  "color-button-background": oklch(80, 50, 135),
  "color-button-border": oklch(65, 50, 135),

  "color-avatar-background": oklch(80, 50, 135),

  "color-header-highlight": oklch(80, 50, 135),
  "color-header-glow": oklch(70, 50, 135),
  "color-header-background": oklch(52, 52, 165),
  "color-header-text": "#fff",

  "color-footer-highlight": oklch(80, 50, 135),
  "color-footer-glow": oklch(90, 20, 135),
  "color-footer-background": oklch(95, 10, 135),
  "color-footer-text": "#111",

  "color-syntax-text": "#111",
  "color-syntax-comment": oklch(52, 0, 290),
  "color-syntax-keyword": oklch(52, 100, 345),
  "color-syntax-property": oklch(52, 60, 250),
  "color-syntax-string": oklch(52, 100, 135),
  "color-syntax-punctuation": oklch(52, 30, 345),
};
