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

export const light = {
  "color-selection": oklch(90, 30, 140, 75),

  "color-header-text": oklch(30, 0, 30),
  "color-header-background": oklch(85, 30, 140),
  "color-header-button": oklch(80, 30, 140),

  "color-footer-text": oklch(30, 0, 30),
  "color-footer-background": oklch(90, 40, 290),

  "color-card-background": oklch(94, 20, 30),
  "color-card-hover": oklch(96, 20, 30),

  "color-main-link": oklch(50, 50, 290),
  "color-main-background": oklch(98, 20, 30),
  "color-main-text": oklch(30, 0, 30),
  "color-main-code": oklch(52, 100, 340),
  "color-main-decoration": oklch(60, 20, 30),

  "color-syntax-background": oklch(100, 20, 30),
  "color-syntax-text": oklch(20, 0, 30),
  "color-syntax-comment": oklch(55, 0, 300),
  "color-syntax-keyword": oklch(47, 100, 170),
  "color-syntax-property": oklch(52, 100, 340),
  "color-syntax-string": oklch(52, 100, 250),
  "color-syntax-punctuation": oklch(55, 30, 30),

  "color-easter-egg-shadow": oklch(90, 20, 30),
  "color-easter-egg-highlight": oklch(100, 0, 0, 70),
};

export const dark = {
  "color-selection": oklch(50, 20, 140, 75),

  "color-header-text": oklch(95, 0, 30),
  "color-header-background": oklch(50, 20, 140),
  "color-header-button": oklch(45, 20, 140),

  "color-footer-text": oklch(95, 0, 30),
  "color-footer-background": oklch(35, 10, 290),

  "color-card-background": oklch(35, 4, 30),
  "color-card-hover": oklch(37, 4, 30),

  "color-main-link": oklch(80, 100, 290),
  "color-main-background": oklch(30, 4, 30),
  "color-main-text": oklch(95, 0, 30),
  "color-main-code": oklch(80, 40, 340),
  "color-main-decoration": oklch(60, 4, 30),

  "color-syntax-background": oklch(25, 4, 30),
  "color-syntax-text": oklch(90, 0, 30),
  "color-syntax-comment": oklch(70, 10, 300),
  "color-syntax-keyword": oklch(80, 70, 170),
  "color-syntax-property": oklch(80, 70, 250),
  "color-syntax-string": oklch(80, 50, 340),
  "color-syntax-punctuation": oklch(70, 15, 30),

  "color-easter-egg-shadow": oklch(25, 5, 30),
  "color-easter-egg-highlight": oklch(100, 0, 0, 30),
};
