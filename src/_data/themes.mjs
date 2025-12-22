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

  "color-border-faint": oklch(27, 3.25, 299, 10),
  "color-border-light": oklch(27, 3.25, 299, 20),
  "color-border-medium": oklch(27, 3.25, 299, 40),
  "color-border-heavy": oklch(27, 3.25, 299, 60),

  "color-green": oklch(74, 38, 162),

  "color-pink": oklch(71, 50, 345),

  "color-purple": oklch(47, 67, 288),
  "color-periwinkle": oklch(85, 67, 288),

  "color-steel": oklch(92, 0.5, 68),
  "color-silver": oklch(94, 0.5, 68),
  "color-white": oklch(99.5, 0.5, 68),

  "syntax-text": "var(--color-black)",
  "syntax-keyword": oklch(52, 60, 260),
  "syntax-comment": oklch(50, 38, 162),
  "syntax-property": oklch(47, 67, 345),
  "syntax-string": oklch(55, 67, 42),
  "syntax-punctuation": oklch(57, 27, 288),
};
