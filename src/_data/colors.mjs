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
  "color-aside-border": oklch(85, 20, 290),

  "color-main-link": oklch(50, 50, 290),
  "color-main-background1": oklch(95, 20, 30),
  "color-main-background2": oklch(96, 20, 30),
  "color-main-background3": oklch(98, 20, 30),
  "color-main-text": oklch(30, 30, 30),
  "color-main-text-bright": oklch(40, 30, 30),
  "color-main-code": oklch(50, 100, 30),
  "color-main-shadow": oklch(93, 20, 30),

  "color-syntax-comment": oklch(55, 0, 300),
  "color-syntax-keyword": oklch(47, 100, 300),
  "color-syntax-property": oklch(52, 100, 190),
  "color-syntax-string": oklch(52, 100, 140),
  "color-syntax-punctuation": oklch(55, 40, 300),

  "color-easter-egg-shadow": oklch(90, 20, 30),
  "color-easter-egg-highlight": oklch(100, 0, 0, 70),
};

export const dark = {
  "color-header-text": oklch(96, 40, 140),
  "color-header-background": oklch(50, 20, 140),
  "color-header-button": oklch(45, 22, 140),

  "color-aside-background": oklch(34, 4, 290),
  "color-aside-border": oklch(44, 8, 290),

  "color-main-link": oklch(80, 100, 290),
  "color-main-background1": oklch(34, 4, 30),
  "color-main-background2": oklch(32, 4, 30),
  "color-main-background3": oklch(30, 4, 30),
  "color-main-text": oklch(80, 5, 30),
  "color-main-text-bright": oklch(95, 5, 30),
  "color-main-code": oklch(80, 100, 30),
  "color-main-shadow": oklch(34, 5, 30),

  "color-syntax-comment": oklch(70, 10, 190),
  "color-syntax-keyword": oklch(80, 70, 300),
  "color-syntax-property": oklch(80, 70, 190),
  "color-syntax-string": oklch(80, 50, 140),
  "color-syntax-punctuation": oklch(70, 20, 300),

  "color-easter-egg-shadow": oklch(25, 5, 30),
  "color-easter-egg-highlight": oklch(100, 0, 0, 30),
};
