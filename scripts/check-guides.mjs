// Checks docs/guides/*.md against the mechanical rules in docs/seo/WRITING.md. Exits 1 on any problem, so a guide
// that breaks them fails `npm run lint` and the deploy, and the live site stays as it was.
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const DIR = path.join(process.cwd(), "docs", "guides");
const today = new Date().toISOString().slice(0, 10);

// Copy the site must never carry (PRODUCT.md, "Copy constraints"). Case-insensitive.
const BANNED = [
  [/[$€£฿¥]\s?\d|\b\d+(\.\d+)?\s?(usd|eur|gbp|thb|baht|dollars?)\b/i, "a price"],
  [/free trial/i, "\"free trial\""],
  [/\bad[- ]free\b|\bno ads\b|without ads/i, "an ads promise"],
  [/best value/i, "\"best value\""],
  [/never lose (a|your) streak/i, "\"never lose a streak\""],
  [/download (it )?now/i, "\"download now\""],
  [/play\.google\.com|apps\.apple\.com/i, "a store link (the download box handles stores)"],
  [/\bcures?\b|clinically|doctor[- ]recommended|treats? (your )?adhd|fix (your )?adhd/i, "a medical claim"],
  [/\b(sync|syncs|syncing)\b.*\b(devices|phones)\b/i, "a sync claim"],
];

const problems = [];
const files = (await readdir(DIR)).filter((f) => f.endsWith(".md")).sort();
const slugs = new Set(files.map((f) => f.slice(0, -3)));
const titles = new Map();

for (const file of files) {
  const slug = file.slice(0, -3);
  const say = (msg) => problems.push(`${file}: ${msg}`);
  const raw = await readFile(path.join(DIR, file), "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) {
    say("missing front matter");
    continue;
  }
  const field = (name) => m[1].match(new RegExp(`^${name}:\\s*(.+)$`, "m"))?.[1].trim().replace(/^"(.*)"$/, "$1");
  const body = raw.slice(m[0].length);

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) say("file name must be lowercase words joined by hyphens");
  const title = field("title");
  if (!title) say("title is missing");
  else if (titles.has(title.toLowerCase())) say(`same title as ${titles.get(title.toLowerCase())}`);
  else titles.set(title.toLowerCase(), file);
  if (title && title.length > 70) say(`title is ${title.length} characters; keep it under 70`);

  const description = field("description");
  if (!description) say("description is missing");
  else if (description.length < 100 || description.length > 170)
    say(`description is ${description.length} characters; keep it 100–170`);

  for (const name of ["published", "updated"]) {
    const v = field(name);
    if (name === "published" && !v) say("published is missing");
    if (v && !/^\d{4}-\d{2}-\d{2}$/.test(v)) say(`${name} must be YYYY-MM-DD`);
    // A day of slack for time zones: the routine runs at 07:00 in Bangkok, still yesterday in UTC.
    if (v && v > new Date(Date.now() + 864e5).toISOString().slice(0, 10)) say(`${name} ${v} is in the future (today is ${today})`);
  }
  if (!field("keywords")) say("keywords are missing");

  const ctas = body.match(/^<!--\s*cta\s*-->$/gm)?.length ?? 0;
  if (ctas !== 1) say(`needs exactly one <!-- cta --> line, found ${ctas}`);
  if (/^#\s/m.test(body)) say("body has a # heading; the page prints the title as the H1, so start at ##");

  const words = body.replace(/<!--[\s\S]*?-->/g, "").split(/\s+/).filter(Boolean).length;
  if (words < 700) say(`only ${words} words; a guide needs at least 700`);
  if (words > 2600) say(`${words} words; keep it under 2,600`);

  for (const [re, what] of BANNED) {
    const hit = body.match(re) ?? title?.match(re) ?? description?.match(re);
    if (hit) say(`contains ${what}: "${hit[0]}"`);
  }

  for (const [, target] of body.matchAll(/\]\((\/[^)\s]*)\)/g)) {
    const g = target.match(/^\/guides\/([^/#]+)\/?(#.*)?$/);
    if (g && !slugs.has(g[1])) say(`links to a guide that doesn't exist: ${target}`);
    else if (!g && !/^\/(#[\w-]+)?$|^\/guides\/$|^\/privacy\/$|^\/terms\/$/.test(target)) say(`links to an unknown page: ${target}`);
    if (g && !target.split("#")[0].endsWith("/")) say(`internal link needs a trailing slash: ${target}`);
  }
}

if (problems.length) {
  console.error(`Guide check failed (${problems.length}):\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log(`Guide check passed: ${files.length} guide${files.length === 1 ? "" : "s"}.`);
