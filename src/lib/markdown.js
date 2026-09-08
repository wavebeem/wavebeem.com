// markdown-it-prism doesn't auto-load Prism language grammars.
import MarkdownIt from "markdown-it";
import markdownItPrism from "markdown-it-prism";
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-jsx.js";
import "prismjs/components/prism-tsx.js";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-json.js";

export const markdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
}).use(markdownItPrism, {
  highlightInlineCode: true,
});

export function renderMarkdownInline(content) {
  return markdownIt.renderInline(content || "");
}
