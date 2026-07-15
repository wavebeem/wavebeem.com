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

export function toISOString(date) {
  return new Date(date).toISOString();
}

export function markdownify(content) {
  return inlineMarkdown.renderInline(content || "");
}

export function take(array, count) {
  return array.slice(0, count);
}

function* reversed(list) {
  for (let i = list.length - 1; i >= 0; i--) {
    yield list[i];
  }
}

export function groupByYear(collection) {
  const map = new Map();
  for (const page of reversed(collection)) {
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

export function fallback(data, other) {
  return data || other;
}

function objectPathGet(obj, path) {
  let ret = obj;
  for (const chunk of path.split(".")) {
    ret = ret[chunk];
  }
  return ret;
}

export function compare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export function sortBy(data, property) {
  return [...data].sort((a, b) => {
    return compare(objectPathGet(a, property), objectPathGet(b, property));
  });
}

export function sortByLocale(data, property) {
  return [...data].sort((a, b) => {
    return String(objectPathGet(a, property) || "").localeCompare(
      objectPathGet(b, property) || "",
    );
  });
}

export function sortAlpha(data) {
  return [...data].sort((a, b) => a.localeCompare(b));
}

export function entries(data) {
  return Object.entries(data);
}

export function debug(data) {
  console.info(data);
  return "";
}

export function log(data) {
  console.log(data);
  return data;
}
