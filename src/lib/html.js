import escapeHtmlLib from "escape-html";

class SafeHtml {
  constructor(html) {
    this.html = html;
  }
  toString() {
    return this.html;
  }
}

export function unsafeHtml(value) {
  return new SafeHtml(value ?? "");
}

function stringifyValue(value) {
  if (value instanceof SafeHtml) {
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
