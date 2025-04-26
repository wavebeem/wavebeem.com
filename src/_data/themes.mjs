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
  "color-root-background": "#333",
  "color-root-background-alpha": "#3333",
  "color-root-overscroll": "#222",
  "color-root-gradient1": oklch(55, 55, 165),
  "color-root-gradient2": oklch(55, 50, 290),
  "color-root-gradient3": oklch(45, 35, 290),
  "color-root-text": "#fff",
  "color-root-divider": "#fff3",

  "color-root-gradient1": oklch(60, 75, 165),
  "color-root-gradient2": oklch(60, 65, 290),
  "color-root-overscroll": "#111",

  "color-header-background": "#fff",
  "color-header-text": oklch(60, 50, 165),

  "color-footer-background": oklch(96, 10, 135),
  // "color-footer-background": oklch(96, 10, 165),
  // "color-footer-background": oklch(96, 10, 165),
  // "color-footer-text": oklch(40, 50, 165),
  "color-footer-text": "#111",

  "color-main-background": "#fff",
  "color-main-text-heading": oklch(52, 52, 165),
  // "color-main-text": oklch(40, 50, 165),
  "color-main-text": "#111",
  "color-main-divider": "#ccc",
  // "color-main-link": oklch(55, 55, 290),
  "color-main-link": oklch(55, 55, 345),
  // "color-main-link": oklch(52, 52, 135),

  // "color-syntax-background": oklch(96, 10, 165),
  "color-syntax-background": "#f4f4f4",
  // "color-syntax-background": "#f4f4f4",
  // "color-syntax-background": oklch(97, 0, 165),
  "color-syntax-text": "#111",
  "color-syntax-comment": oklch(52, 0, 290),
  "color-syntax-keyword": oklch(52, 100, 345),
  "color-syntax-property": oklch(52, 60, 250),
  "color-syntax-string": oklch(52, 100, 165),
  "color-syntax-punctuation": oklch(52, 30, 345),
};

export const dark = {
  // "color-main-background": "#333",
  // "color-main-text": "#eee",
  // "color-main-divider": "#555",
  // "color-main-link": oklch(80, 65, 290),
  // "color-syntax-background": "#2c2c2c",
  // "color-syntax-text": "#eee",
  // "color-syntax-comment": oklch(70, 15, 290),
  // "color-syntax-keyword": oklch(80, 70, 340),
  // "color-syntax-property": oklch(80, 70, 250),
  // "color-syntax-string": oklch(80, 50, 165),
  // "color-syntax-punctuation": oklch(70, 15, 340),
};
