// From https://www.wavebeem.com/blog/2024/js-compare-function/. No braces
// is deliberate (see the post) to keep this memorable, not an oversight.
// Negate for descending: -compare(a, b).
export function compare<T>(a: T, b: T): -1 | 0 | 1 {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
