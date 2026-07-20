import { getCollection, type CollectionEntry } from "astro:content";
import { compare } from "@/lib/compare";
import { stripIndex } from "@/lib/stripIndex";

export interface PostSummary {
  title: string;
  description: string;
  date: Date;
  url: string;
}

function toSummary(
  prefix: string,
  post: CollectionEntry<"blog" | "toybox">,
): PostSummary {
  return {
    title: post.data.title,
    description: post.data.description,
    date: post.data.date,
    url: `/${prefix}/${stripIndex(post.id)}/`,
  };
}

// Mirrors the real site's tag-based "posts" collection: blog + toybox
// combined, each linking to its own URL.
export async function getAllPosts(): Promise<PostSummary[]> {
  const [blog, toybox] = await Promise.all([
    getCollection("blog"),
    getCollection("toybox"),
  ]);
  return [
    ...blog.map((post) => toSummary("blog", post)),
    ...toybox.map((post) => toSummary("toybox", post)),
  ].toSorted((a, b) => -compare(a.date.valueOf(), b.date.valueOf()));
}
