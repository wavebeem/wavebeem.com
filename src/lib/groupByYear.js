export function groupByYear(items, getYear) {
  const map = new Map();
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
