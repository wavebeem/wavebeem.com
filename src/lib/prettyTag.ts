const map = new Map([
  ["art", "Art"],
  ["bash", "Bash"],
  ["compilers", "Compilers"],
  ["cooking", "Cooking"],
  ["css", "CSS"],
  ["design", "Design"],
  ["draft", "Draft"],
  ["essay", "Essay"],
  ["feed", "Feed"],
  ["javascript", "JavaScript"],
  ["keyboards", "Keyboards"],
  ["meta", "Meta"],
  ["programming", "Programming"],
  ["python", "Python"],
  ["react", "React"],
  ["recipe", "Recipe"],
  ["tech", "Tech"],
  ["toybox", "Toybox"],
  ["typescript", "TypeScript"],
  ["video-games", "Video games"],
  ["web-components", "Web components"],
  ["web", "Web"],
]);

export function prettyTag(tag: string): string {
  const display = map.get(tag);
  if (!display) {
    throw new Error(`unknown tag: ${tag}`);
  }
  return display;
}
