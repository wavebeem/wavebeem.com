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
  "color-white": "#fff",
  "color-black": "#111",
  "color-green1": oklch(94, 10, 140),
  "color-green1b": oklch(92.5, 12.5, 140),
  // "color-green1b": oklch(92.5, 12.5, 140),
  // "color-green1": "#caf59f",
  // "color-green1": "GreenYellow",
  // "color-green1": "LightGreen",
  "color-green2": oklch(88, 15, 150),
  "color-green3": oklch(82, 25, 150),
  // "color-green2":
  //   "oklch(from var(--color-green1) calc(l * 0.95) calc(c * 1.10) calc(h + 10))",
  // "color-green3":
  //   "oklch(from var(--color-green1) calc(l * 0.85) calc(c * 1.33) calc(h + 10))",
  "color-purple": "BlueViolet",

  "theme-selection-bg": "var(--color-black)",
  "theme-selection-text": "var(--color-white)",

  "theme-header-bg": "var(--color-black)",
  "theme-header-text": "var(--color-white)",
  "theme-nav-bg": "var(--color-green2)",
  "theme-nav-text": "var(--color-black)",
  "theme-text": "var(--color-black)",
  "theme-infobox": "var(--color-green2)",
  "theme-code": "var(--color-green2)",
  "theme-shadow": "var(--color-green3)",
  "theme-page-bg": "var(--color-green1)",
  "theme-page-alt": "var(--color-green1b)",
  "theme-page-text": "var(--color-black)",
  "theme-scrollbar": "var(--color-black)",
  "theme-bullet": "var(--color-black)",
  "theme-accent": "var(--color-green2)",
  "theme-accent2": "var(--color-green3)",
  // "theme-divider": "var(--color-green2)",
  "theme-border": "var(--color-black)",
  "theme-number": "var(--color-green3)",
  "theme-photo": "var(--color-green3)",
  "theme-image": "var(--color-white)",
  "theme-box": "var(--color-white)",
  "theme-button-bg": "var(--color-black)",
  "theme-button-text": "var(--color-white)",
  "theme-card": "var(--color-white)",
  "theme-link": "var(--color-black)",
  "theme-hover-light": "rgb(from var(--color-green3) r g b / 20%)",
  "theme-hover-light-alt": "rgb(from var(--color-green3) r g b / 30%)",
  "theme-hover-dark": "rgb(from var(--color-green3) r g b / 20%)",
  // "theme-link": "var(--color-black)",

  "syntax-background": "var(--color-black)",
  "syntax-border": "var(--color-black)",
  "syntax-text": "var(--color-green1)",
  "syntax-keyword": "#ffffff",
  "syntax-comment": "#bd85f9",
  "syntax-property": "#b3f200",
  "syntax-string": "#00cc9c",
  "syntax-punctuation": "#d2acfb",
};
