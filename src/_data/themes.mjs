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

  "syntax-text": "var(--color-black)",
  "syntax-comment": oklch(52, 30, 40),
  "syntax-keyword": oklch(52, 52, 345),
  "syntax-property": oklch(52, 52, 255),
  "syntax-string": oklch(52, 52, 165),
  "syntax-punctuation": oklch(52, 30, 345),
};
