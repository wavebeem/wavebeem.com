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
  "color-black": oklch(20, 20, 40),

  "color-green": oklch(50, 39, 162),
  // "color-green": oklch(74, 39, 162),
  // "color-green": oklch(52, 52, 165),

  // "color-purple": oklch(52, 52, 165),
  "color-purple": oklch(47, 67, 288),

  "color-steel": oklch(90, 1.75, 89),
  // "color-steel": oklch(90, 10, 40),
  "color-platinum": oklch(95, 1.75, 89),
  // oklch(0.9583 0.007 88.64)
  // "color-platinum": oklch(98, 2.5, 40),
  "color-white": oklch(100, 0, 0),

  "syntax-text": "var(--color-black)",
  "syntax-comment": oklch(52, 30, 40),
  "syntax-keyword": oklch(52, 52, 345),
  "syntax-property": oklch(52, 52, 255),
  "syntax-string": oklch(52, 52, 165),
  "syntax-punctuation": oklch(52, 30, 345),
};
