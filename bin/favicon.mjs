#!/usr/bin/env node
// @ts-check

import { spawnSync } from "node:child_process";
import { chdir } from "node:process";

chdir("src/static");

spawnSync("magick", [
  "favicon-16.png",
  "favicon-32.png",
  "photo-512.webp",
  "favicon.ico",
]);
