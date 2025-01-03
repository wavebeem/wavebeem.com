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
  "color-selection": oklch(74, 44, 149, 25),

  // "color-header-text": oklch(100, 0, 0),
  // "color-header-background": oklch(59, 44, 149),

  "color-background": oklch(95, 25, 152),
  // "color-background": "#6ed690",
  "color-text": oklch(40, 25, 152),
  // "color-text": "#2e2e2e",

  // "color-footer-text": oklch(45, 30, 150),
  // "color-footer-background": oklch(95, 30, 130),

  // "color-card-border": oklch(84, 24, 149),
  // "color-card-background": oklch(99.5, 2, 149),
  "color-card-hover": oklch(96, 5, 149),

  // "color-main-link": oklch(50, 50, 290),
  // "color-background": oklch(45, 30, 160),
  // "color-text": oklch(95, 30, 130),
  // "color-main-heading": oklch(44, 24, 149),
  // "color-main-code": oklch(52, 100, 340),
  // "color-main-decoration": oklch(64, 44, 149),

  "color-syntax-background": oklch(100, 0, 0),
  "color-syntax-text": oklch(20, 0, 0),
  "color-syntax-comment": oklch(52, 0, 290),
  "color-syntax-keyword": oklch(52, 100, 340),
  "color-syntax-property": oklch(52, 60, 290),
  "color-syntax-string": oklch(52, 100, 149),
  "color-syntax-punctuation": oklch(52, 30, 30),

  "color-easter-egg-shadow": oklch(40, 25, 152, 20),
  "color-easter-egg-highlight": oklch(100, 0, 0, 100),
};

export const dark = {
  "color-text": oklch(95, 25, 152),
  // "color-background": "#6ed690",
  "color-background": oklch(40, 25, 152),
};
