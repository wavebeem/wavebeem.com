import { Feed } from "feed";
import { toLocalDate } from "./lib/toLocalDate.js";

const origin = "https://www.wavebeem.com";

// must match production's /feed.xml field shape and ordering
export const data = {
  layout: false,
  permalink: "/feed.xml",
  eleventyExcludeFromCollections: true,
};

export function render(data) {
  const posts = data.collections.posts;

  const feed = new Feed({
    title: "wavebeem.com",
    description: "sage's domain",
    id: `${origin}/`,
    link: `${origin}/`,
    language: "en",
    updated: toLocalDate(posts[0].date),
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
      title: post.data.title,
      id: url,
      link: url,
      date: toLocalDate(post.date),
      description: `${post.data.description} [Read more...]`,
    });
  }

  return feed.atom1();
}
