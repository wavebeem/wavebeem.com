/**
 * Generates md-tokens.css: every M3 color role as --md-* CSS vars, from one
 * seed color. Later hand mapped at theme.css to semantic tokens.
 *
 * Run: npm run generate-theme
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import {
  DynamicScheme,
  Hct,
  TonalPalette,
  Variant,
  argbFromHex,
  hexFromArgb,
} from "@material/material-color-utilities";

// Only subjective input. Everything else derives from this.
const seedHex = "#7bd675";

// ## TONAL_SPOT
// Low-medium colorfulness, tertiary hue related to source. Default Material
// You theme (Android 12/13).
//
// ## VIBRANT
// Maxes out colorfulness at every position in the primary palette.
//
// ## EXPRESSIVE
// Intentionally detached from the source color.
//
// ## NEUTRAL
// Near grayscale.
//
// ## MONOCHROME
// Grayscale.
//
// ## FIDELITY
// Source color goes straight into primaryContainer (~5 tone shift for
// contrast); tertiary is a computed complement.
//
// ## CONTENT
// Same behavior as FIDELITY, framed for content-derived (not brand) source
// colors.
//
// ## RAINBOW
// Playful, source color's hue doesn't appear in the theme.
//
// ## FRUIT_SALAD
// Same as RAINBOW.
const variant = Variant.TONAL_SPOT;

// -1 to 1, 0 = standard.
const contrastLevel = 0;

async function main() {
  const sourceColorHct = Hct.fromInt(argbFromHex(seedHex));
  const { light, dark } = buildSchemes(sourceColorHct);
  const seedLine = buildSeedLine();
  const roleLines = buildRoleLines(light, dark);
  const customColorLines = buildCustomColorLines(sourceColorHct);
  const output = buildOutput({
    seedLine,
    roleLines,
    customColorLines,
  });
  const outPath = await writeOutput(output);
  console.log(`Wrote ${outPath}`);
}

function buildSchemes(sourceColorHct) {
  const light = new DynamicScheme({
    sourceColorHct,
    variant,
    contrastLevel,
    isDark: false,
  });
  const dark = new DynamicScheme({
    sourceColorHct,
    variant,
    contrastLevel,
    isDark: true,
  });
  return { light, dark };
}

// Every role DynamicScheme exposes is a `get roleName()` accessor on its
// prototype, so this finds them all without hand-listing role names --
// naturally excludes contrastLevel/sourceColorArgb/etc, since those are
// plain instance fields, not prototype getters.
function getRoleNames(scheme) {
  const proto = Object.getPrototypeOf(scheme);
  const names = [];
  for (const name of Object.getOwnPropertyNames(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, name);
    if (descriptor !== undefined && typeof descriptor.get === "function") {
      names.push(name);
    }
  }
  return names;
}

// "onPrimaryContainer" -> "on-primary-container"
function kebabCase(name) {
  return name.replace(/([A-Z])/g, "-$1").toLowerCase();
}

function roleValue(scheme, roleName) {
  return scheme[roleName];
}

function buildRoleLines(light, dark) {
  const roleNames = getRoleNames(light);

  let lines = "";
  for (const roleName of roleNames) {
    const lightHex = hexFromArgb(roleValue(light, roleName));
    const darkHex = hexFromArgb(roleValue(dark, roleName));
    const cssName = kebabCase(roleName);
    lines += `  --md-${cssName}: light-dark(${lightHex}, ${darkHex});\n`;
  }
  return lines;
}

// Fixed chroma for the generated syntax hues, vivid enough to read as
// distinct categories without matching the (possibly much higher or lower)
// chroma the seed happens to carry at its own tone.
const customColorChroma = 48;

// Same tone convention M3 uses for its own accent roles (e.g. primary):
// tone 40 in light mode, tone 80 in dark mode, each read against the
// near-white/near-black code background for strong contrast.
const customColorToneLight = 40;
const customColorToneDark = 80;

// Quarter-turns around the seed's own hue. Evenly spaced by construction,
// so the four categories can't end up clustered/similar the way picking
// "related" hues (Blend.harmonize, TemperatureCache.analogous) did.
function customColorHex(sourceColorHct, hueOffset) {
  const hue = (sourceColorHct.hue + hueOffset) % 360;
  const palette = TonalPalette.fromHueAndChroma(hue, customColorChroma);
  return {
    light: hexFromArgb(palette.tone(customColorToneLight)),
    dark: hexFromArgb(palette.tone(customColorToneDark)),
  };
}

function buildCustomColorLines(sourceColorHct) {
  const comment = customColorHex(sourceColorHct, 0);
  const property = customColorHex(sourceColorHct, 90);
  const punctuation = customColorHex(sourceColorHct, 180);
  const string = customColorHex(sourceColorHct, 270);

  return `\
  --md-custom-comment: light-dark(${comment.light}, ${comment.dark});
  --md-custom-property: light-dark(${property.light}, ${property.dark});
  --md-custom-string: light-dark(${string.light}, ${string.dark});
  --md-custom-punctuation: light-dark(${punctuation.light}, ${punctuation.dark});
`;
}

// Not a DynamicScheme role. Exposed for the style guide's color palette.
function buildSeedLine() {
  return `  --md-custom-seed: ${seedHex};\n`;
}

function buildOutput({ seedLine, roleLines, customColorLines }) {
  return `\
/**
 * GENERATED. Don't hand-edit, regenerate with: npm run generate-theme
 *
 * Seed: ${seedHex}  Variant: ${Variant[variant]}  Contrast: ${contrastLevel}
 *
 * Every Material 3 color role, as --md-<kebab-case-role-name>. See
 * theme.css for how this site's --theme-* tokens map to these.
 */
/* prettier-ignore */
:root {
${seedLine}
${roleLines}
  /* Syntax-highlighting hues: seed hue rotated by 0/90/180/270 degrees,
     fixed chroma, tone 40/80, not DynamicScheme roles. */
${customColorLines}
}
`;
}

async function writeOutput(content) {
  const outPath = path.join(import.meta.dirname, "../src/_css/md-tokens.css");
  await writeFile(outPath, content, "utf8");
  return outPath;
}

await main();
