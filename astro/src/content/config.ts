import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  // schema: ({ image }) =>
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    tags: z
      .array(z.string())
      .optional()
      .default(() => []),
    // heroImage: image().optional(),
  }),
});

const art = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      image: image().refine(({ width, height, src, format }) => {
        // TODO: Complain about images that are too big or too small
        return true;
      }),
    }),
});

export const collections = { blog, art };
