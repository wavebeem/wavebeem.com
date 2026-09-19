import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { styleText } from "node:util";

const style = {
  dim: styleText.bind(null, "dim"),
  bold: styleText.bind(null, "bold"),
  success: styleText.bind(null, "green"),
  choice: styleText.bind(null, "cyan"),
};

function fail(message) {
  console.error(message);
  process.exit(1);
}

function localISOString(date) {
  const pad = (n) => String(n).padStart(2, "0");
  const offset = -date.getTimezoneOffset();
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mi = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  const sign = offset >= 0 ? "+" : "-";
  const offH = pad(Math.floor(Math.abs(offset) / 60));
  const offM = pad(Math.abs(offset) % 60);
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}${sign}${offH}:${offM}`;
}

function slugify(title) {
  return title.trim().toLowerCase().replace(/\s+/g, "-");
}

const root = path.join(import.meta.dirname, "..");
const draftsDir = path.join(root, "src", "drafts");
const blogDir = path.join(root, "src", "blog");

async function ask(prompt) {
  const resp = await rl.question(prompt);
  return resp.trim();
}

async function createDraft() {
  const title = await ask("Title: ");
  if (!title) {
    fail("A title is required");
  }

  const slug = slugify(title);
  const dir = path.join(draftsDir, slug);

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    path.join(dir, "index.json"),
    JSON.stringify({ title }, null, 2) + "\n",
  );
  await fs.mkdir(path.join(dir, "assets"));
  await fs.writeFile(path.join(dir, "index.md"), "");

  console.log(
    style.success(`Created src/drafts/${slug}`) +
      style.dim(" (index.json, index.md, assets/)"),
  );
}

async function promoteDraft(slug) {
  const srcDir = path.join(draftsDir, slug);
  const { title, description } = JSON.parse(
    await fs.readFile(path.join(srcDir, "index.json"), "utf8"),
  );
  if (!title || !description) {
    fail(`src/drafts/${slug}/index.json needs a title and description`);
  }

  const d = new Date();
  const date = localISOString(d);
  const year = String(d.getFullYear());
  const destDir = path.join(blogDir, year, slug);

  console.log(`${style.bold("Title:")} ${title}`);
  console.log(`${style.bold("Description:")} ${description}`);
  console.log(`${style.bold("Date:")} ${date}`);
  console.log(`${style.bold("Path:")} src/blog/${year}/${slug}`);

  const confirm = await ask("\nPublish? (y/N): ");
  if (confirm.toLowerCase() !== "y") {
    console.log("Not publishing.");
    return;
  }

  await fs.mkdir(path.join(blogDir, year), { recursive: true });
  try {
    await fs.rename(srcDir, destDir);
  } catch (err) {
    fail(
      `Couldn't move src/drafts/${slug} to src/blog/${year}/${slug}: ${err.message}`,
    );
  }
  await fs.writeFile(
    path.join(destDir, "index.json"),
    JSON.stringify({ date, title, description }, null, 2) + "\n",
  );

  console.log(style.success(`Published src/blog/${year}/${slug}`));
}

const slugs = (await fs.readdir(draftsDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("SIGINT", () => {
  rl.close();
  process.exit(0);
});

console.log(style.bold("Drafts:"));
for (const [i, slug] of slugs.entries()) {
  console.log(`  ${style.choice(String(i + 1))}${style.dim(")")} ${slug}`);
}
console.log(`\n  ${style.choice("n")}${style.dim(")")} new draft`);

const pick = await ask("\n> ");

if (pick.toLowerCase() === "n") {
  await createDraft();
} else {
  const slug = slugs[Number(pick) - 1];
  if (!slug) {
    fail("Not a valid choice");
  }
  await promoteDraft(slug);
}

rl.close();
