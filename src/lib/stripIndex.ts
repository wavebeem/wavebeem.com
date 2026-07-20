// Content collection entries loaded via glob({ pattern: "**/index.md" })
// always have an id ending in "/index"; this strips it to get the URL slug.
export function stripIndex(id: string): string {
  return id.replace(/\/index$/, "");
}
