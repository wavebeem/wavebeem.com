import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import { compare } from "../lib/compare";
import { prettyTag } from "../lib/prettyTag";
import { localeCompare } from "../lib/localeCompare";

type BlogPost = CollectionEntry<"blog">;

export async function getPosts(): Promise<BlogPost[]> {
  const blog = await getCollection("blog");
  return [...blog].sort((a, b) => -compare(a.data.pubDate, b.data.pubDate));
}

export function postsGroupedByYear(posts: BlogPost[]): Map<number, BlogPost[]> {
  const map = new Map<number, BlogPost[]>();
  for (const post of posts) {
    const year = post.data.pubDate.getFullYear();
    let group = map.get(year);
    if (!group) {
      group = [];
      map.set(year, group);
    }
    group.push(post);
  }
  return map;
}

export type BlogPostTag = {
  title: string;
  id: string;
};

export function postHasTagById(post: BlogPost, tagId: string): boolean {
  return post.data.tags.includes(tagId);
}

export function upgradeTags(tags: string[]): BlogPostTag[] {
  return tags
    .map((tag) => {
      return {
        id: tag,
        title: prettyTag(tag),
      };
    })
    .sort((a, b) => localeCompare(a.title, b.title));
}

export function tagsForPost(post: BlogPost): BlogPostTag[] {
  return upgradeTags(post.data.tags);
}

export function getAllTagsForPosts(posts: BlogPost[]): BlogPostTag[] {
  const all = posts.flatMap(tagsForPost);
  const set = new Set<string>();
  const ret: typeof all = [];
  for (const tag of all) {
    if (!set.has(tag.id)) {
      set.add(tag.id);
      ret.push(tag);
    }
  }
  ret.sort((a, b) => localeCompare(a.title, b.title));
  return ret;
}
