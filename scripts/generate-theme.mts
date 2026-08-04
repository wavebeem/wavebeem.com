/**
 * Generates md-tokens.css: every M3 color role as --md-* CSS vars, from one
 * seed color. Later hand mapped at theme.css to semantic tokens.
 *
 * Run: npm run generate-theme
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import {
  Blend,
  DynamicScheme,
  Hct,
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

async function main(): Promise<void> {
  const sourceColorHct = Hct.fromInt(argbFromHex(seedHex));
  const { light, dark } = buildSchemes(sourceColorHct);

  const roleLines = buildRoleLines(light, dark);
  const customColorLines = buildCustomColorLines(sourceColorHct);
  const output = buildOutput(roleLines, customColorLines);

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

// Nudges a hand-picked color's hue toward the seed, keeps its tone/chroma
// so it stays recognizable. For colors that aren't a DynamicScheme role.
function harmonizeHex(sourceColorHct: Hct, originalHex: string): string {
  const designColor = argbFromHex(originalHex);
  const sourceColor = sourceColorHct.toInt();
  const harmonized = Blend.harmonize(designColor, sourceColor);
  return hexFromArgb(harmonized);
}

function buildCustomColorLines(sourceColorHct: Hct): string {
  const commentLight = harmonizeHex(sourceColorHct, "#008800");
  const commentDark = harmonizeHex(sourceColorHct, "#5fd75f");
  const propertyLight = harmonizeHex(sourceColorHct, "#6600aa");
  const propertyDark = harmonizeHex(sourceColorHct, "#c792ea");
  const stringLight = harmonizeHex(sourceColorHct, "#cc0000");
  const stringDark = harmonizeHex(sourceColorHct, "#ff6b6b");
  const punctuationLight = harmonizeHex(sourceColorHct, "#884400");
  const punctuationDark = harmonizeHex(sourceColorHct, "#e0a458");

  return `\
  --md-custom-comment: light-dark(${commentLight}, ${commentDark});
  --md-custom-property: light-dark(${propertyLight}, ${propertyDark});
  --md-custom-string: light-dark(${stringLight}, ${stringDark});
  --md-custom-punctuation: light-dark(${punctuationLight}, ${punctuationDark});
`;
}

function buildOutput(roleLines: string, customColorLines: string): string {
  return `\
/**
 * GENERATED. Don't hand-edit -- regenerate with: npm run generate-theme
 *
 * Seed: ${seedHex}  Variant: ${Variant[variant]}  Contrast: ${contrastLevel}
 *
 * Every Material 3 color role, as --md-<kebab-case-role-name>. See
 * theme.css for how this site's --theme-* tokens map to these.
 */
/* prettier-ignore */
:root {
${roleLines}
  /* Hand-picked syntax-highlighting hues, hue-shifted toward the seed
     color via Blend.harmonize() -- not DynamicScheme roles. */
${customColorLines}}
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
