import { readFile } from "node:fs/promises";
import path from "node:path";

export type LegalDoc = { title: string; body: string; updated?: Date };

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

// The "_Last updated: 16 October 2026_" line under the heading, as a date for the sitemap.
function parseUpdated(body: string): Date | undefined {
  const m = body.match(/^_Last updated:\s*(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})_/m);
  if (!m) return undefined;
  const month = MONTHS.indexOf(m[2].toLowerCase());
  if (month < 0) return undefined;
  return new Date(Date.UTC(Number(m[3]), month, Number(m[1])));
}

// The legal pages are rendered from docs/*.md so the policy has one source of text.
export async function readLegalDoc(name: "privacy" | "terms"): Promise<LegalDoc> {
  const raw = await readFile(path.join(process.cwd(), "docs", `${name}.md`), "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const title = match?.[1].match(/^title:\s*(.+)$/m)?.[1].trim() ?? name;
  const body = match ? raw.slice(match[0].length) : raw;
  return { title, body, updated: parseUpdated(body) };
}
