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
const variantDark = Variant.TONAL_SPOT;

// -1 to 1, 0 = standard.
const contrastLevel = 0;

async function main(): Promise<void> {
  const sourceColorHct = Hct.fromInt(argbFromHex(seedHex));
  const { light, dark } = buildSchemes(sourceColorHct);

  const roleLines = buildRoleLines(light, dark);
  const customColorLines = buildCustomColorLines(sourceColorHct);
  const emphasisLines = buildEmphasisLines();
  const output = buildOutput(roleLines, customColorLines, emphasisLines);

  const outPath = await writeOutput(output);
  console.log(`Wrote ${outPath}`);
}

function buildSchemes(sourceColorHct: Hct): {
  light: DynamicScheme;
  dark: DynamicScheme;
} {
  const light = new DynamicScheme({
    sourceColorHct,
    variant,
    contrastLevel,
    isDark: false,
  });
  const dark = new DynamicScheme({
    sourceColorHct,
    variant: variantDark,
    contrastLevel,
    isDark: true,
  });
  return { light, dark };
}

// Every role DynamicScheme exposes is a `get roleName()` accessor on its
// prototype, so this finds them all without hand-listing role names --
// naturally excludes contrastLevel/sourceColorArgb/etc, since those are
// plain instance fields, not prototype getters.
function getRoleNames(scheme: DynamicScheme): string[] {
  const proto = Object.getPrototypeOf(scheme);
  const names: string[] = [];
  for (const name of Object.getOwnPropertyNames(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, name);
    if (descriptor !== undefined && typeof descriptor.get === "function") {
      names.push(name);
    }
  }
  return names;
}

// "onPrimaryContainer" -> "on-primary-container"
function kebabCase(name: string): string {
  return name.replace(/([A-Z])/g, "-$1").toLowerCase();
}

function roleValue(scheme: DynamicScheme, roleName: string): number {
  const scheme_ = scheme as unknown as Record<string, number>;
  return scheme_[roleName];
}

function buildRoleLines(light: DynamicScheme, dark: DynamicScheme): string {
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

// Fixed chroma for the generated syntax hues -- vivid enough to read as
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
function customColorHex(
  sourceColorHct: Hct,
  hueOffset: number,
): {
  light: string;
  dark: string;
} {
  const hue = (sourceColorHct.hue + hueOffset) % 360;
  const palette = TonalPalette.fromHueAndChroma(hue, customColorChroma);
  return {
    light: hexFromArgb(palette.tone(customColorToneLight)),
    dark: hexFromArgb(palette.tone(customColorToneDark)),
  };
}

function buildCustomColorLines(sourceColorHct: Hct): string {
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

// A hand-picked hue, independent of the seed -- unlike the syntax colors
// above (seed hue + a fixed offset), this one isn't derived from the seed
// at all, same tradeoff as picking any M3 "custom color"
// (m3.material.io/styles/color/advanced/define-new-colors): no guaranteed
// harmony with the seed, just an intentional standalone accent. Coral hue,
// chosen 2026-08-05 as the one-off em/i/strong/b emphasis color --
// everything else on the site still uses the real (seed-derived) M3
// tertiary role.
const emphasisHue = 20;

function buildEmphasisLines(): string {
  const palette = TonalPalette.fromHueAndChroma(emphasisHue, customColorChroma);
  const light = hexFromArgb(palette.tone(customColorToneLight));
  const dark = hexFromArgb(palette.tone(customColorToneDark));

  return `  --md-custom-emphasis: light-dark(${light}, ${dark});\n`;
}

function buildOutput(
  roleLines: string,
  customColorLines: string,
  emphasisLines: string,
): string {
  return `\
/**
 * GENERATED. Don't hand-edit -- regenerate with: npm run generate-theme
 *
 * Seed: ${seedHex}  Variant: ${Variant[variant]} light / ${Variant[variantDark]} dark  Contrast: ${contrastLevel}
 *
 * Every Material 3 color role, as --md-<kebab-case-role-name>. See
 * theme.css for how this site's --theme-* tokens map to these.
 */
/* prettier-ignore */
:root {
${roleLines}
  /* Syntax-highlighting hues: seed hue rotated by 0/90/180/270 degrees,
     fixed chroma, tone 40/80 -- not DynamicScheme roles. */
${customColorLines}
  /* Hand-picked accent (hue ${emphasisHue}), not seed-derived -- see
     buildEmphasisLines above. One-off em/i/strong/b emphasis color. */
${emphasisLines}}
`;
}

async function writeOutput(content: string): Promise<string> {
  const outPath = path.join(
    import.meta.dirname,
    "../src/styles/css/md-tokens.css",
  );
  await writeFile(outPath, content, "utf8");
  return outPath;
}

await main();
