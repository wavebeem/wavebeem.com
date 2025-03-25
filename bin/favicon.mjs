#!/usr/bin/env node
import { run, chdir } from "./_util.mjs";

chdir("src/static");
await run("magick", "favicon.png", "favicon.ico");
