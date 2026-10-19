// Tells IndexNow (Bing, which feeds ChatGPT search and Copilot, plus Yandex, Seznam, Naver) which pages a deploy
// changed, so they are crawled within hours instead of whenever the bot next passes. Run by the deploy workflow
// after the site is live: `node scripts/indexnow.mjs <before-sha> <after-sha>`. No SHAs (or an unknown one, as on
// a manual run) submits every page in the live sitemap.
// The key is public by design: IndexNow checks it against public/<key>.txt on the site.
import { execFileSync } from "node:child_process";

const KEY = "37ca2269cdf2c4d1a3fae7641bec7d19";
const SITE = (process.env.SITE_URL ?? "https://petsonfocus.app").replace(/\/$/, "");
const [before, after] = process.argv.slice(2);

function changedFiles() {
  if (!before || !after || /^0+$/.test(before)) return null;
  try {
    return execFileSync("git", ["diff", "--name-only", before, after], { encoding: "utf8" }).split("\n").filter(Boolean);
  } catch {
    return null;
  }
}

async function sitemapUrls() {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const files = changedFiles();
let urls;
if (files === null) {
  urls = await sitemapUrls();
} else {
  const set = new Set();
  for (const f of files) {
    const guide = f.match(/^docs\/guides\/([a-z0-9-]+)\.md$/);
    if (guide) set.add(`/guides/${guide[1]}/`).add("/guides/");
    else if (f === "docs/privacy.md") set.add("/privacy/");
    else if (f === "docs/terms.md") set.add("/terms/");
    else if (/^(app|components|lib|assets|public)\//.test(f)) set.add("/");
  }
  if (set.size > 0) set.add("/llms.txt").add("/llms-full.txt");
  urls = [...set].map((p) => SITE + p);
}

if (urls.length === 0) {
  console.log("IndexNow: no page changed, nothing to submit.");
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URL(s):\n${urls.join("\n")}`);
// 200 and 202 both mean accepted.
if (res.status >= 400) process.exit(1);
