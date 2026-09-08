// Bundles a .11ty.css file with its @imports and writes a source map.
import { mkdir, writeFile } from "node:fs/promises";
import { basename, dirname } from "node:path";
import { bundleAsync } from "lightningcss";

export function compileCss(_inputContent, inputPath) {
  return async (data) => {
    const { code, map } = await bundleAsync({
      filename: inputPath,
      sourceMap: true,
    });
    if (!map) {
      throw new Error("Expected a source map from lightningcss");
    }
    const outputPath = data?.page?.outputPath;
    if (typeof outputPath !== "string") {
      throw new Error("Expected data.page.outputPath to be a string");
    }
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(`${outputPath}.map`, map);
    const mapName = basename(outputPath);
    return `${code}\n/*# sourceMappingURL=${mapName}.map */\n`;
  };
}
