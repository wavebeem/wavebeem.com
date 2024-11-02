import { getCollection } from "astro:content";
import { compare } from "../lib/compare";

export async function getPosts() {
  const blog = await getCollection("blog");
  return [...blog].sort((a, b) => -compare(a.data.pubDate, b.data.pubDate));
}
