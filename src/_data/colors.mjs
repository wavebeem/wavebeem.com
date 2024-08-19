import Color from "colorjs.io";

/**
 * @param lightness {number}
 * @param chroma {number}
 * @param hue {number}
 * @param alpha {number}
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

const colors = {
  "color-header-text": oklch(40, 40, 170),
  "color-header-background": oklch(95, 50, 170),
  "color-header-border": oklch(80, 25, 170),

  "color-nav-text": oklch(40, 40, 170),
  "color-nav-background": oklch(98, 50, 170),

  "color-main-accent": oklch(50, 50, 250),
  "color-main-background1": oklch(100, 20, 40),
  "color-main-background2": oklch(98, 20, 40),
  "color-main-background3": oklch(97, 20, 40),
  "color-main-border1": oklch(75, 15, 40),
  "color-main-border2": oklch(85, 15, 40),
  "color-main-text": oklch(40, 60, 40),
  "color-main-code": oklch(50, 100, 340),
  "color-main-shadow": oklch(93, 20, 40),

  "color-syntax-default": oklch(20, 30, 40),
  "color-syntax-comment": oklch(52, 0, 170),
  "color-syntax-keyword": oklch(52, 100, 170),
  "color-syntax-property": oklch(52, 60, 340),
  "color-syntax-string": oklch(52, 100, 250),
  "color-syntax-punctuation": oklch(52, 30, 40),

  "color-easter-egg-shadow": oklch(90, 20, 40),
  "color-easter-egg-highlight": oklch(100, 0, 0, 50),
};

export default colors;