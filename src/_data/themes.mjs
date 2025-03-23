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
  "color-background-green1": "hsl(140 50% 30%)",
  "color-background-green2": "hsl(140 50% 35%)",
  "color-background-green3": "hsl(140 50% 30%)",
  "color-background-green4": "hsl(140 50% 29%)",
  "color-background-text": "hsl(140 25% 92%)",
  "color-background-divider": "hsl(140 25% 92% / 10%)",

  // "color-background": "#eee",
  "color-background": "hsl(140 25% 92%)",
  // "color-text": "hsl(140 25% 24%)",
  "color-text": "#333",
  "color-text-small": "#666",
  "color-divider": "#fff2",
  // "color-link": "hsl(140 100% 24%)",
  "color-link": "hsl(256 56% 52%)",

  "color-syntax-background": "#fff",
  "color-syntax-text": oklch(20, 0, 340),
  "color-syntax-comment": oklch(52, 0, 290),
  "color-syntax-keyword": oklch(52, 100, 340),
  "color-syntax-property": oklch(52, 60, 250),
  "color-syntax-string": oklch(52, 100, 152),
  "color-syntax-punctuation": oklch(52, 30, 340),
};

export const dark = {
  "color-background": "hsl(140 25% 25%)",
  // "color-background": "#333",
  "color-text": "#fff",
  "color-text-small": "#aaa",
  "color-divider": "#fff2",
  // "color-divider": "hsl(140 25% 35%)",
  "color-link": "hsl(140 56% 64%)",

  "color-syntax-background": "hsl(140 25% 20%)",
  "color-syntax-text": oklch(90, 0, 340),
  "color-syntax-comment": oklch(70, 15, 290),
  "color-syntax-keyword": oklch(80, 70, 340),
  "color-syntax-property": oklch(80, 70, 250),
  "color-syntax-string": oklch(80, 50, 152),
  "color-syntax-punctuation": oklch(70, 15, 340),
};
