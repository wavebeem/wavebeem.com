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
  "color-background": oklch(99, 10, 152),
  "color-text": oklch(45, 100, 152),

  "color-syntax-background": oklch(25, 0, 340),
  "color-syntax-text": oklch(90, 0, 340),
  "color-syntax-comment": oklch(70, 15, 290),
  "color-syntax-keyword": oklch(80, 70, 340),
  "color-syntax-property": oklch(80, 70, 250),
  "color-syntax-string": oklch(80, 50, 152),
  "color-syntax-punctuation": oklch(70, 15, 340),
};

export const dark = {
  "color-text": oklch(90, 15, 152),
  "color-background": oklch(40, 15, 152),
};

export const tufte = {
  "color-background": "#fffff8",
  "color-text": " #111111",
};

export const paperback2 = {
  "color-background": "#b8c2b9",
  "color-text": " #382b26",
};

export const peachy_keen = {
  "color-background": "#242234",
  "color-text": " #facab8",
};

export const pro = {
  "color-background": "#444",
  "color-text": " #ccc",
};

export const ys_neutral_green = {
  "color-background": "#004c3d",
  "color-text": " #ffeaf9",
};

export const matchlatte_2 = {
  "color-background": "#405622",
  "color-text": " #fdfbfb",
};

export const shrine_etrian = {
  "color-background": "#1d6650",
  "color-text": " #a2f9e2",
};

export const shrine_smt = {
  // Red text
  // "color-background": "#1f1214",
  // "color-text": "#f24",
  // SMT V
  // "color-background": "#1c1e1d",
  // "color-text": "#eec39a",
  // SMT III
  "color-background": "#2d2e3d",
  "color-text": "#cccbfd",
  // Red background
  // "color-background": "#5b1622",
  // "color-text": "#f3d6d7",
};

export const shrine_dq = {
  "color-background": "#303030",
  "color-text": "#f8f8f8",
  // "color-background": "#42281e",
  // "color-text": "#c7c7c7",
  // "color-background": "#000",
  // "color-text": "#fff",
};
