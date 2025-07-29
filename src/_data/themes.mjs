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

export default {
  "color-white": oklch(100, 0, 0),
  "color-green": oklch(52, 52, 165),
  "color-black": oklch(20, 5, 40),
  "color-gray": oklch(70, 20, 40),
  "color-steel": oklch(90, 10, 40),
  "color-silver": oklch(95, 10, 40),
  "color-platinum": oklch(98, 2.5, 40),

  // TODO: Remove these semantic colors
  "color-main-background": "var(--color-platinum)",
  "color-main-text": "var(--color-black)",
  "color-main-link": "var(--color-green)",
  "color-main-accent": "var(--color-green)",
  "color-main-decoration": "var(--color-silver)",
  "color-main-faint": "var(--color-silver)",

  "color-syntax-text": "var(--color--black)",
  "color-syntax-comment": oklch(52, 0, 290),
  "color-syntax-keyword": oklch(52, 100, 345),
  "color-syntax-property": oklch(52, 60, 250),
  "color-syntax-string": oklch(52, 100, 135),
  "color-syntax-punctuation": oklch(52, 30, 345),
};
