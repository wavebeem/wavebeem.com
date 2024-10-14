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
  "color-header-text": oklch(40, 40, 140),
  "color-header-background": oklch(90, 30, 140),
  "color-header-button": oklch(86, 32, 140),

  "color-aside-background": oklch(95, 20, 290),

  "color-main-link": oklch(50, 50, 290),
  "color-main-background1": oklch(95, 20, 30),
  "color-main-background2": oklch(96, 20, 30),
  "color-main-background3": oklch(98, 20, 30),
  "color-main-text": oklch(30, 30, 30),
  "color-main-text-bright": oklch(40, 30, 30),
  "color-main-code": oklch(52, 100, 340),
  "color-main-shadow": oklch(93, 20, 30),

  "color-syntax-background": oklch(99.95, 20, 30),
  "color-syntax-text": oklch(20, 30, 30),
  "color-syntax-comment": oklch(55, 0, 300),
  "color-syntax-keyword": oklch(47, 100, 170),
  "color-syntax-property": oklch(52, 100, 340),
  "color-syntax-string": oklch(52, 100, 250),
  "color-syntax-punctuation": oklch(55, 30, 30),

  "color-easter-egg-shadow": oklch(90, 20, 30),
  "color-easter-egg-highlight": oklch(100, 0, 0, 70),
};

export const dark = {
  "color-header-text": oklch(96, 40, 140),
  "color-header-background": oklch(50, 20, 140),
  "color-header-button": oklch(45, 22, 140),

  "color-aside-background": oklch(34, 4, 290),

  "color-main-link": oklch(80, 100, 290),
  "color-main-background1": oklch(34, 4, 30),
  "color-main-background2": oklch(32, 4, 30),
  "color-main-background3": oklch(30, 4, 30),
  "color-main-text": oklch(85, 5, 30),
  "color-main-text-bright": oklch(95, 5, 30),
  "color-main-code": oklch(80, 40, 340),
  "color-main-shadow": oklch(34, 4, 30),

  "color-syntax-background": oklch(28, 4, 30),
  "color-syntax-text": oklch(90, 5, 30),
  "color-syntax-comment": oklch(70, 10, 300),
  "color-syntax-keyword": oklch(80, 70, 170),
  "color-syntax-property": oklch(80, 70, 250),
  "color-syntax-string": oklch(80, 50, 340),
  "color-syntax-punctuation": oklch(70, 15, 30),

  "color-easter-egg-shadow": oklch(25, 5, 30),
  "color-easter-egg-highlight": oklch(100, 0, 0, 30),
};
