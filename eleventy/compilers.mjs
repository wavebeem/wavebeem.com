import { writeFile } from "node:fs/promises";
import { basename } from "node:path";
import { render } from "preact-render-to-string";
import { bundleAsync } from "lightningcss";

// Renders .11ty.tsx templates
export function compileJsx() {
  return async function (data) {
    const content = await this.defaultRenderer(data);
    return typeof content === "string" ? content : render(content);
  };
}

// Bundles a .11ty.css file with its @imports and writes a source map
export function compileCss(_inputContent, inputPath) {
  return async (data) => {
    const { code, map } = await bundleAsync({
      filename: inputPath,
      sourceMap: true,
      // cssModules: true,
    });
    if (!map) {
      throw new Error("Expected a source map from lightningcss");
    }
    const outputPath = data?.page?.outputPath;
    if (typeof outputPath !== "string") {
      throw new Error("Expected data.page.outputPath to be a string");
    }
    await writeFile(`${outputPath}.map`, map);
    const mapName = basename(outputPath);
    return `${code}\n/*# sourceMappingURL=${mapName}.map */\n`;
  };
}
