import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const schema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/blog" }),
  schema,
});

const toybox = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/toybox" }),
  schema,
});

// Being a draft is which collection a post lives in, not a frontmatter
// flag, so it can't leak into the main listing by accident. Schema is
// lenient because some real drafts have no frontmatter at all.
const drafts = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/drafts" }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
  }),
});

export const collections = { blog, toybox, drafts };
