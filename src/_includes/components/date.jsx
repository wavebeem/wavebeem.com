/** @jsx h */
import { h } from "preact";
import { formatDate } from "#eleventy/helpers.mjs";

export function FormattedDate({ date }) {
  return (
    <time datetime={formatDate(date, "iso8601")}>
      {formatDate(date, "date")}
    </time>
  );
}
