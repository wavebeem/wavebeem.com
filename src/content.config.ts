import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// Astro runs shit through github-slugger which turns "wavebeem-2.0-slime-mode"
// into "wavebeem-20-slime-mode". This is NOT compatible with my current
// relative file strategy with passthrough static copy, and it's also some
// serious bullshit to impose your own slugification on my already slugified
// folders.
function generateId({ entry }: { entry: string }) {
  return entry.replace(/\.[^./]+$/, "").replace(/\/index$/, "");
}

const schema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
});

const blog = defineCollection({
  loader: glob({
    pattern: "**/index.md",
    base: "./src/content/blog",
    generateId,
  }),
  schema,
});

const toybox = defineCollection({
  loader: glob({
    pattern: "**/index.md",
    base: "./src/content/toybox",
    generateId,
  }),
  schema,
});

// Being a draft is which collection a post lives in, not a frontmatter
// flag, so it can't leak into the main listing by accident. Schema is
// lenient because some real drafts have no frontmatter at all.
const drafts = defineCollection({
  loader: glob({
    pattern: "**/index.md",
    base: "./src/content/drafts",
    generateId,
  }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
  }),
});

export const collections = { blog, toybox, drafts };
