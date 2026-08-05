export function dataUri(mimeType: string, content: string): string {
  return `url("data:${mimeType},${encodeURIComponent(content)}")`;
}
