// God forbid I ever move and need to put different time zones on different
// items. There will be hell to pay. Perhaps I'll just tell a little lie about
// time zones. We love doing that.
const timeZone = "America/Los_Angeles";

const offsetFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone,
  timeZoneName: "shortOffset",
});

function localOffsetHoursAt(utcMs: number): number {
  const offset = offsetFormatter
    .formatToParts(utcMs)
    .find((part) => part.type === "timeZoneName")?.value;
  return Number(offset?.replace("GMT", "")) || 0;
}

function isUtcMidnight(date: Date): boolean {
  return (
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0 &&
    date.getUTCMilliseconds() === 0
  );
}

// Some dates are floating (no attached time, e.g. "2025-04-13"), some are real
// timestamps (e.g. "2026-07-05T19:47:23-07:00"). Floating ones parse to UTC
// midnight with no real meaning behind that UTC anchor, so we re-anchor to
// local midnight instead. Real timestamps are already correct and left alone.
export function toLocalDate(date: Date | string): Date {
  const parsed = typeof date === "string" ? new Date(date) : date;
  if (!isUtcMidnight(parsed)) {
    return parsed;
  }
  const utcMidnight = new Date(parsed);
  utcMidnight.setUTCHours(0, 0, 0, 0);
  const localMidnight = new Date(utcMidnight);
  localMidnight.setUTCHours(-localOffsetHoursAt(utcMidnight.getTime()));
  return localMidnight;
}
