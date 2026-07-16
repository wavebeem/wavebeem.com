import "tsx/esm";
import { compileJsx } from "./compilers.mjs";

export default function jsxPlugin(eleventyConfig) {
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
    compile: compileJsx,
  });
  eleventyConfig.addTemplateFormats(["11ty.jsx", "11ty.ts", "11ty.tsx"]);
  eleventyConfig.addWatchTarget("**/*.{ts,tsx,jsx}");
}
