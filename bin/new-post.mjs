#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const template = `
---
draft: true
title: >-
  This is the title
description: >-
  This is the description.
---
`;

const [slug] = process.argv.slice(2);
const base = path.join(import.meta.dirname, "../src/drafts", slug);

if (!slug) {
  throw new Error("missing post slug");
}

await fs.mkdir(base, { recursive: true });
process.chdir(base);

await fs.writeFile("index.md", template, "utf-8");
await fs.mkdir("assets");
