import escapeHtmlLib from "escape-html";

// Eleventy's watch mode can load this module more than once (cache busting), so
// `instanceof` fails across copies. A global symbol survives that.
const isSafeHtml = Symbol.for("wavebeem.isSafeHtml");

class SafeHtml {
  constructor(html) {
    this.html = html;
  }
  get [isSafeHtml]() {
    return true;
  }
  toString() {
    return this.html;
  }
}

export function unsafeHtml(value) {
  return new SafeHtml(value ?? "");
}

function stringifyValue(value) {
  if (value?.[isSafeHtml]) {
    return value.html;
  }
  if (Array.isArray(value)) {
    return value.map(stringifyValue).join("");
  }
  if (value == null || value === false) {
    return "";
  }
  return escapeHtmlLib(String(value));
}

export function html(strings, ...values) {
  return new SafeHtml(
    String.raw({ raw: strings }, ...values.map(stringifyValue)),
  );
}
