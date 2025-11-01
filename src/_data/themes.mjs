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
  "color-black": oklch(27, 3.25, 299),

  "color-green": oklch(74, 38, 162),

  "color-purple": oklch(47, 67, 288),
  "color-periwinkle": oklch(85, 67, 288),

  "color-silver": oklch(95, 1.75, 89),
  "color-white": oklch(99.5, 1.75, 89),

  "syntax-text": "var(--color-black)",
  "syntax-comment": oklch(52, 30, 40),
  "syntax-keyword": oklch(50, 38, 162),
  "syntax-property": oklch(47, 67, 299),
  "syntax-string": oklch(55, 67, 89),
  "syntax-punctuation": oklch(57, 27, 288),
};
