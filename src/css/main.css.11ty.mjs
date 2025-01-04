import * as fs from "node:fs/promises";
import * as path from "node:path";

const css = String.raw;

export default class Main {
  data() {
    return {
      permalink: "/x-main.css",
    };
  }

  async #include(filename) {
    const f = path.join(import.meta.dirname, filename);
    return fs.readFile(f, { encoding: "utf-8" });
  }

  async render(data) {
    console.log(this);
    console.log(data);
    const lines = [];
    lines.push(":root {");
    for (const [key, val] of Object.entries(data.colors.light)) {
      lines.push(`  --${key}: ${val};`);
    }
    lines.push("}");
    lines.push("@media (prefers-color-scheme: dark) {");
    lines.push("  :root {");
    for (const [key, val] of Object.entries(data.colors.dark)) {
      lines.push(`    --${key}: ${val};`);
    }
    lines.push("  }");
    lines.push("}");
    lines.push(await this.#include("./_fonts.css"));
    lines.push(await this.#include("./_vars.css"));
    lines.push(await this.#include("./_global.css"));
    lines.push(await this.#include("./_syntax.css"));
    lines.push(await this.#include("./_avatar.css"));
    return lines.join("\n");
  }
}

// ---
// permalink: "/main.css"
// ---
// :root { {% for item in colors.light | entries %}
//   --{{ item[0] }}: {{ item[1] }};{% endfor %}
// }

// @media (prefers-color-scheme: dark) {
//   :root { {% for item in colors.dark | entries %}
//     --{{ item[0] }}: {{ item[1] }};{% endfor %}
//   }
// }

// {% include "./_fonts.css" %}
// {% include "./_vars.css" %}
// {% include "./_global.css" %}
// {% include "./_avatar.css" %}
