import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

// Guides are rendered from docs/guides/*.md, one file per page at /guides/<file name>/.
// Front matter: title, description, published (YYYY-MM-DD), optional updated and keywords (comma separated).
// A line holding only <!-- cta --> marks where the download box goes in the middle; one always closes the page.

export type Guide = {
  slug: string;
  title: string;
  description: string;
  published: Date;
  updated: Date;
  keywords: string[];
  /** The body split at each <!-- cta --> line. */
  parts: string[];
  /** The "## Common questions" section as question and plain-text answer, for FAQ structured data. */
  faq: { q: string; a: string }[];
};

const DIR = path.join(process.cwd(), "docs", "guides");
export const CTA_MARKER = /^<!--\s*cta\s*-->$/m;

function field(front: string, name: string): string | undefined {
  return front.match(new RegExp(`^${name}:\\s*(.+)$`, "m"))?.[1].trim().replace(/^"(.*)"$/, "$1");
}

// Markdown to the plain text structured data wants: links keep their words, emphasis and code marks go.
const plain = (md: string) =>
  md.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "").replace(/\s+/g, " ").trim();

function commonQuestions(body: string): { q: string; a: string }[] {
  const section = body.match(/^## Common questions[^\n]*\n([\s\S]*?)(?=^## |(?![\s\S]))/m)?.[1];
  if (!section) return [];
  return [...section.matchAll(/^### (.+)\n([\s\S]*?)(?=^### |(?![\s\S]))/gm)]
    .map((m) => ({ q: plain(m[1]), a: plain(m[2]) }))
    .filter((f) => f.q && f.a);
}

function day(value: string | undefined, file: string, name: string): Date {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error(`${file}: ${name} must be YYYY-MM-DD`);
  return new Date(`${value}T00:00:00Z`);
}

export async function readGuide(slug: string): Promise<Guide> {
  const file = `${slug}.md`;
  const raw = await readFile(path.join(DIR, file), "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) throw new Error(`${file}: missing front matter`);
  const front = match[1];
  const title = field(front, "title");
  const description = field(front, "description");
  if (!title || !description) throw new Error(`${file}: title and description are required`);
  const published = day(field(front, "published"), file, "published");
  const updatedRaw = field(front, "updated");
  return {
    slug,
    title,
    description,
    published,
    updated: updatedRaw ? day(updatedRaw, file, "updated") : published,
    keywords: (field(front, "keywords") ?? "").split(",").map((k) => k.trim()).filter(Boolean),
    parts: raw.slice(match[0].length).split(CTA_MARKER).map((p) => p.trim()),
    faq: commonQuestions(raw.slice(match[0].length)),
  };
}

/** Every guide, newest first. */
export async function listGuides(): Promise<Guide[]> {
  const files = (await readdir(DIR)).filter((f) => f.endsWith(".md"));
  const guides = await Promise.all(files.map((f) => readGuide(f.slice(0, -3))));
  return guides.sort((a, b) => b.published.getTime() - a.published.getTime() || a.title.localeCompare(b.title));
}

export function formatDay(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
