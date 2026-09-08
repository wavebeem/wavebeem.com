import { toLocalDate } from "./toLocalDate.js";

const timeZone = "America/Los_Angeles";

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

export function formatDate(value, format = "date") {
  const date = toLocalDate(value);
  switch (format) {
    case "year":
      return yearFormatter.format(date);
    case "iso8601":
      return date.toISOString();
    default:
      return dateFormatter.format(date);
  }
}
