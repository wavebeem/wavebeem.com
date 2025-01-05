export default class Theme {
  data() {
    return {
      permalink: "/_themes.css",
    };
  }

  render(data) {
    const css = String.raw;
    const lines = [];

    lines.push(`:root {`);
    for (const [key, val] of Object.entries(data.colors.light)) {
      lines.push(`  --${key}: ${val};`);
    }
    lines.push(`}`);

    lines.push(`@media (prefers-color-scheme: dark) {`);
    lines.push(`  :root {`);
    for (const [key, val] of Object.entries(data.colors.dark)) {
      lines.push(`    --${key}: ${val};`);
    }
    lines.push(`  }`);
    lines.push(`}`);

    lines.push(`:root[data-theme="light"] {`);
    for (const [key, val] of Object.entries(data.colors.light)) {
      lines.push(`  --${key}: ${val};`);
    }
    lines.push(`}`);

    lines.push(`:root[data-theme="dark"] {`);
    for (const [key, val] of Object.entries(data.colors.dark)) {
      lines.push(`  --${key}: ${val};`);
    }
    lines.push(`}`);

    lines.push(css`
      :root[data-theme="tufte"] {
        --color-background: #fffff8;
        --color-text: #111111;
      }

      :root[data-theme="paperback-2"] {
        --color-background: #b8c2b9;
        --color-text: #382b26;
      }

      :root[data-theme="peachy-keen"] {
        --color-background: #242234;
        --color-text: #facab8;
      }

      :root[data-theme="pro"] {
        --color-background: #444;
        --color-text: #ccc;
      }

      :root[data-theme="ys-neutral-green"] {
        --color-background: #004c3d;
        --color-text: #ffeaf9;
      }

      :root[data-theme="matchalatte-2"] {
        --color-background: #405622;
        --color-text: #fdfbfb;
      }

      :root[data-theme="shrine-etrian"] {
        --color-background: #186e55;
        --color-text: #7bfedf;
      }

      :root[data-theme="shrine-smt"] {
        --color-background: hsl(352.5 80% 8%);
        --color-text: hsl(356.7 74.7% 64%);
      }
    `);

    const styles = lines.join("\n");
    return styles;
  }
}
