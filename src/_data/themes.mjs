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
  "color-background": "#eee",
  "color-text": "#333",
  "color-text-small": "#666",
  "color-divider": "#ccc",
  "color-link": "#007a3a",

  "color-syntax-background": "#fff",
  "color-syntax-text": oklch(20, 0, 340),
  "color-syntax-comment": oklch(52, 0, 290),
  "color-syntax-keyword": oklch(52, 100, 340),
  "color-syntax-property": oklch(52, 60, 250),
  "color-syntax-string": oklch(52, 100, 152),
  "color-syntax-punctuation": oklch(52, 30, 340),
};

export const dark = {
  "color-background": "#333",
  "color-text": "#ccc",
  "color-text-small": "#aaa",
  "color-divider": "#666",
  "color-link": "#6ed690",

  "color-syntax-background": "#222",
  "color-syntax-text": oklch(90, 0, 340),
  "color-syntax-comment": oklch(70, 15, 290),
  "color-syntax-keyword": oklch(80, 70, 340),
  "color-syntax-property": oklch(80, 70, 250),
  "color-syntax-string": oklch(80, 50, 152),
  "color-syntax-punctuation": oklch(70, 15, 340),
};
