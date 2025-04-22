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
  // "color-root-background": "#333",
  // "color-root-background-alpha": "#3333",
  // "color-root-overscroll": "#222",
  // "color-root-gradient1": oklch(55, 45, 152),
  // "color-root-gradient2": oklch(55, 45, 290),
  // "color-root-text": "#fff",
  // "color-root-divider": "#fff3",

  // "color-main-background": "#eee",
  // "color-main-text": "#333",
  // "color-main-text-small": "#666",
  // "color-main-divider": "#ccc",
  // "color-main-link": oklch(50, 50, 290),

  // "color-syntax-background": "#fff",
  // "color-syntax-text": "#111",
  // "color-syntax-comment": oklch(52, 0, 290),
  // "color-syntax-keyword": oklch(52, 100, 340),
  // "color-syntax-property": oklch(52, 60, 250),
  // "color-syntax-string": oklch(52, 100, 152),
  // "color-syntax-punctuation": oklch(52, 30, 340),

  "color-main-background": "#fafafa",
  "color-main-text": "#333",
  "color-main-text-small": "#666",
  // "color-main-text-heading": oklch(90, 55, 145),
  "color-main-text-heading": oklch(90, 55, 145),
  // "color-main-text-heading": oklch(60, 55, 145),
  // "color-main-text-heading": oklch(90, 55, 25),
  "color-main-divider": "#eee",
  "color-main-link": oklch(60, 70, 325),
  "color-main-link": oklch(60, 90, 290),

  "color-syntax-background": "#f4f4f4",
  "color-syntax-text": "#111",
  "color-syntax-comment": oklch(52, 0, 290),
  "color-syntax-keyword": oklch(52, 100, 340),
  "color-syntax-property": oklch(52, 60, 250),
  "color-syntax-string": oklch(52, 100, 152),
  "color-syntax-punctuation": oklch(52, 30, 340),
};

export const dark = {
  // "color-main-background": "#333",
  // "color-main-text": "#eee",
  // "color-main-text-small": "#aaa",
  // "color-main-divider": "#555",
  // "color-main-link": oklch(80, 50, 290),
  // "color-syntax-background": "#2c2c2c",
  // "color-syntax-text": "#eee",
  // "color-syntax-comment": oklch(70, 15, 290),
  // "color-syntax-keyword": oklch(80, 70, 340),
  // "color-syntax-property": oklch(80, 70, 250),
  // "color-syntax-string": oklch(80, 50, 152),
  // "color-syntax-punctuation": oklch(70, 15, 340),
};
