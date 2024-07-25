const Color = require("colorjs.io").default;

function oklch(lightness, chroma, hue, alpha = 100) {
  const l = lightness / 100;
  const c = (chroma / 100) * 0.4;
  const h = hue;
  const a = alpha / 100;
  const color = new Color("oklch", [l, c, h]);
  color.alpha = a;
  return color.to("srgb").toString({ format: "hex" });
}

module.exports = {
  light: {
    "color-header-text": oklch(40, 40, 125),
    "color-header-background": oklch(95, 50, 125),

    "color-nav-text": oklch(30, 30, 290),
    "color-nav-background": oklch(90, 20, 290),

    "color-main-accent": oklch(50, 50, 290),
    "color-main-background1": oklch(100, 20, 290),
    "color-main-background2": oklch(98, 20, 290),
    "color-main-background3": oklch(97, 20, 290),
    "color-main-border1": oklch(75, 15, 290),
    "color-main-border2": oklch(85, 15, 290),
    "color-main-text": oklch(30, 30, 290),
    "color-main-code": oklch(50, 100, 40),
    "color-main-shadow": oklch(93, 20, 290),

    "color-syntax-comment": oklch(55, 0, 300),
    "color-syntax-keyword": oklch(47, 100, 300),
    "color-syntax-property": oklch(52, 100, 190),
    "color-syntax-string": oklch(52, 100, 135),
    "color-syntax-punctuation": oklch(55, 40, 300),

    "color-easter-egg-shadow": oklch(90, 20, 290),
    "color-easter-egg-highlight": oklch(100, 0, 0, 50),
  },

  dark: {},
};
