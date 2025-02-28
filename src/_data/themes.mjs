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

export const light = {
  // "color-background": oklch(99, 10, 152),
  // "color-text": oklch(45, 100, 152),

  // "color-background": "#b4ddbf",
  // "color-text": "#222",

  "color-background": oklch(90, 10, 152),
  "color-text": oklch(25, 0, 152),

  "color-syntax-background": oklch(100, 0, 340),
  "color-syntax-text": oklch(20, 0, 340),
  "color-syntax-comment": oklch(52, 0, 290),
  "color-syntax-keyword": oklch(52, 100, 340),
  "color-syntax-property": oklch(52, 60, 250),
  "color-syntax-string": oklch(52, 100, 152),
  "color-syntax-punctuation": oklch(52, 30, 340),
};

export const dark = {
  "color-text": oklch(100, 0, 152),
  "color-background": oklch(40, 10, 152),

  // "color-text": oklch(90, 15, 152),
  // "color-background": oklch(40, 15, 152),

  "color-syntax-background": oklch(25, 0, 340),
  "color-syntax-text": oklch(90, 0, 340),
  "color-syntax-comment": oklch(70, 15, 290),
  "color-syntax-keyword": oklch(80, 70, 340),
  "color-syntax-property": oklch(80, 70, 250),
  "color-syntax-string": oklch(80, 50, 152),
  "color-syntax-punctuation": oklch(70, 15, 340),
};

export const tufte = {
  "color-background": "#fffff8",
  "color-text": " #111111",
};

export const paperback2 = {
  "color-background": "#b8c2b9",
  "color-text": " #382b26",
};

export const peachy_keen = {
  "color-background": "#242234",
  "color-text": " #facab8",
};

export const pro = {
  "color-background": "#444",
  "color-text": " #ccc",
};

export const ys_neutral_green = {
  "color-background": "#004c3d",
  "color-text": " #ffeaf9",
};

export const matchlatte_2 = {
  "color-background": "#405622",
  "color-text": " #fdfbfb",
};

export const shrine_etrian = {
  "color-background": "#1d6650",
  "color-text": " #a2f9e2",
};

export const shrine_smt = {
  // Red text
  // "color-background": "#1f1214",
  // "color-text": "#f24",
  // Red text 2
  "color-background": "#250408",
  "color-text": "#e85f66",
  // SMT V
  // "color-background": "#1c1e1d",
  // "color-text": "#eec39a",
  // SMT III
  // "color-background": "#2d2e3d",
  // "color-text": "#cccbfd",
  // Red background
  // "color-background": "#5b1622",
  // "color-text": "#f3d6d7",
};

export const shrine_dq = {
  // SNES
  "color-background": "#303030",
  "color-text": "#f8f8f8",
  // NES
  // "color-background": "#000",
  // "color-text": "#fff",
  // Modern vibes
  // "color-background": "#eec39a",
  // "color-text": "#452a17",
  // Sky vibes
  // "color-background": oklch(98, 10, 200),
  // "color-text": oklch(35, 80, 30),
  // GBC vibes
  // "color-background": "#f8f8d0",
  // "color-text": "#4b4a28",
  // Brand colors?
  // "color-background": "#2c4c9c",
  // "color-text": "#f0f0ba",
};

export const shrine_pkmn = {
  // Lospec GB
  // "color-background": "#c7c6c6",
  // "color-text": "#382843",
  // Pokémon Super Game Boy
  // "color-background": "#ffefff",
  // "color-text": "#181010",
  // Semi-realistic GBC
  "color-background": "#f3f1ee",
  "color-text": "#4a4741",
  // "color-background": "#fff",
  // "color-text": "#000",
};

export const shrine_castlevania = {
  "color-background": "#ededf3",
  "color-text": "#78141c",
};

export const shrine_metroid = {
  // "color-background": "#483545",
  // "color-text": "#bbc159",
  "color-background": "#001139",
  "color-text": "#dfceff",
};
