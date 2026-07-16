import { Feed } from "feed";

export const data = {
  permalink: "/feed.xml",
  eleventyExcludeFromCollections: true,
  layout: null,
};

export function render(data) {
  const posts = data.collections.posts;
  const origin = data.origin;

  const feed = new Feed({
    title: "wavebeem.com",
    description: "sage fennel mock's website",
    id: `${origin}/`,
    link: `${origin}/`,
    language: "en",
    updated: posts.at(-1).date,
    author: {
      name: "sage fennel mock",
      email: "mail@wavebeem.com",
    },
    feedLinks: {
      atom: `${origin}/feed.xml`,
    },
  });

  for (const post of posts.toReversed()) {
    const url = new URL(post.url, origin).href;
    feed.addItem({
      title: post.data.title,
      id: url,
      link: url,
      date: post.date,
      description: `${post.data.description} [...]`,
    });
  }

  return feed.atom1();
}
