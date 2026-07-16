import markdownIt from "markdown-it";

const timeZone = "America/Los_Angeles";
const utcOffset = -8;

const inlineMarkdown = markdownIt({
  html: false,
  linkify: false,
  typographer: true,
});

const yearFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  timeZone,
});
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone,
});

export function formatDate(value, format) {
  const date = new Date(value);
  switch (format) {
    case "year":
      return yearFormatter.format(date);
    case "iso8601":
      return date.toISOString();
    default:
      return dateFormatter.format(date);
  }
}

export function markdownify(content) {
  return inlineMarkdown.renderInline(content || "");
}

export function compare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export function groupByYear(collection) {
  const map = new Map();
  for (const page of collection.toReversed()) {
    const d = new Date(page.date);
    d.setHours(d.getHours() + utcOffset);
    const year = d.getFullYear();
    let group = map.get(year);
    if (!group) {
      group = [];
      map.set(year, group);
    }
    group.push(page);
  }
  return Array.from(map.entries());
}
