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

export const collections = { blog };
