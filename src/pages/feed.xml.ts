import assert from "node:assert/strict";
import type { APIRoute } from "astro";
import { Feed } from "feed";
import { getAllPosts } from "@/data/posts";

export const GET: APIRoute = async ({ site }) => {
  assert.ok(site);
  const origin = site.origin;
  const posts = await getAllPosts();

  const feed = new Feed({
    title: "wavebeem.com",
    description: "sage's domain",
    id: `${origin}/`,
    link: `${origin}/`,
    language: "en",
    updated: posts[0].date,
    author: {
      name: "sage fennel mock",
      email: "sage@wavebeem.com",
    },
    feedLinks: {
      atom: `${origin}/feed.xml`,
    },
  });

  for (const post of posts) {
    const url = new URL(post.url, origin).href;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      date: post.date,
      description: `${post.description} [Read more...]`,
    });
  }

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
};
