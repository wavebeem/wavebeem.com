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
  "color-header-text": oklch(40, 40, 140),
  "color-header-background": oklch(90, 30, 140),
  "color-header-button": oklch(86, 32, 140),
  "color-header-button-hover": oklch(84, 32, 140),

  "color-main-link": oklch(50, 50, 290),
  "color-main-background1": oklch(95, 20, 30),
  "color-main-background2": oklch(96, 20, 30),
  "color-main-background3": oklch(98, 20, 30),
  "color-main-border1": oklch(75, 15, 30),
  "color-main-border2": oklch(85, 15, 30),
  "color-main-text": oklch(30, 30, 30),
  "color-main-text-bright": oklch(30, 80, 30),
  "color-main-code": oklch(50, 100, 30),
  "color-main-shadow": oklch(93, 20, 30),

  "color-stripe-background1": oklch(98.5, 20, 30),
  "color-stripe-background2": oklch(99.5, 20, 30),

  "color-footer-background": oklch(95, 10, 140),
  "color-footer-text": oklch(40, 40, 140),

  "color-syntax-comment": oklch(55, 0, 300),
  "color-syntax-keyword": oklch(47, 100, 300),
  "color-syntax-property": oklch(52, 100, 190),
  "color-syntax-string": oklch(52, 100, 135),
  "color-syntax-punctuation": oklch(55, 40, 300),

  "color-easter-egg-shadow": oklch(90, 20, 30),
  "color-easter-egg-highlight": oklch(100, 0, 0, 70),
};

export default colors;
