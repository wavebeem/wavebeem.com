import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { getPosts } from "../data/posts";

export const GET: APIRoute = async function (context) {
  const posts = await getPosts();
  if (!context.site) {
    throw new Error(`missing context.site`);
  }
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
    })),
  });
};
