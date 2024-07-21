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
    "color-root-fg": oklch(30, 30, 135),
    "color-root-fg2": oklch(30, 30, 135),
    "color-root-bg1": oklch(95, 25, 135),
    "color-root-bg2": oklch(93, 25, 135),
    "color-root-shadow": oklch(10, 25, 135, 20),

    "color-main-accent-background1": oklch(54, 50, 290),
    "color-main-accent-background2": oklch(48, 50, 290),
    "color-main-accent-border1": oklch(48, 50, 290),
    "color-main-accent-text1": oklch(100, 0, 0),
    "color-main-background1": oklch(100, 5, 290),
    "color-main-background2": oklch(98, 5, 290),
    "color-main-background3": oklch(96, 5, 290),
    "color-main-background4": oklch(93, 5, 290),
    "color-main-border1": oklch(60, 25, 290),
    "color-main-border2": oklch(75, 25, 290),
    "color-main-border3": oklch(85, 25, 290),
    "color-main-shadow1": oklch(15, 0, 0, 10),
    "color-main-text1": oklch(30, 30, 290),
    "color-main-text2": oklch(30, 30, 290),

    "color-syntax-comment": oklch(55, 0, 300),
    "color-syntax-keyword": oklch(47, 100, 300),
    "color-syntax-property": oklch(52, 100, 190),
    "color-syntax-string": oklch(52, 100, 135),
    "color-syntax-punctuation": oklch(55, 40, 300),

    "color-easter-egg-shadow": oklch(15, 0, 0, 40),
    "color-easter-egg-highlight": oklch(100, 0, 0, 50),
  },

  dark: {
    // "color-main-accent-background1": oklch(80, 40, 290),
    // "color-main-accent-background2": oklch(76, 40, 290),
    // "color-main-accent-border1": oklch(90, 40, 290),
    // "color-main-accent-text1": oklch(0, 0, 0),
    // "color-main-background1": oklch(29, 0, 0),
    // "color-main-background2": oklch(26, 0, 0),
    // "color-main-background3": oklch(22, 0, 0),
    // "color-main-background4": oklch(20, 0, 0),
    // "color-main-border1": oklch(60, 0, 0),
    // "color-main-border2": oklch(50, 0, 0),
    // "color-main-border3": oklch(40, 0, 0),
    // "color-main-shadow1": oklch(10, 0, 0, 10),
    // "color-main-text1": oklch(100, 0, 0),
    // "color-main-text2": oklch(85, 0, 0),
    // "color-syntax-comment": oklch(90, 30, 190),
    // "color-syntax-keyword": oklch(80, 70, 135),
    // "color-syntax-property": oklch(80, 70, 40),
    // "color-syntax-string": oklch(80, 70, 300),
    // "color-syntax-punctuation": oklch(70, 5, 190),
    // "color-easter-egg-shadow": oklch(15, 0, 0, 100),
    // "color-easter-egg-highlight": oklch(100, 0, 0, 30),
  },
};
