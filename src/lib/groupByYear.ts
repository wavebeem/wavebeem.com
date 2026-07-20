// Preserves order of first appearance (relies on Map insertion order),
// matching the real site's groupByYear. Callers rely on this for
// reverse-chronological listings.
export function groupByYear<T, Year>(
  items: T[],
  getYear: (item: T) => Year,
): Array<[Year, T[]]> {
  const map = new Map<Year, T[]>();
  for (const item of items) {
    const year = getYear(item);
    const group = map.get(year);
    if (group) {
      group.push(item);
    } else {
      map.set(year, [item]);
    }
  }
  return Array.from(map.entries());
}
