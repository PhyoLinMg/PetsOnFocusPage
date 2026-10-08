import { readFile } from "node:fs/promises";
import path from "node:path";

export type LegalDoc = { title: string; body: string };

// The legal pages are rendered from docs/*.md so the policy has one source of text.
export async function readLegalDoc(name: "privacy" | "terms"): Promise<LegalDoc> {
  const raw = await readFile(path.join(process.cwd(), "docs", `${name}.md`), "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const title = match?.[1].match(/^title:\s*(.+)$/m)?.[1].trim() ?? name;
  return { title, body: match ? raw.slice(match[0].length) : raw };
}
