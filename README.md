# Pets on Focus — website

Marketing site for the Pets on Focus app. Next.js App Router, static export, hosted on GitHub Pages.
Copy and design brief: `docs/home.md` (kept local, git-ignored).

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
```

## Content

- `/` — `app/page.tsx`. The scroll tour of the pet's room is `components/room/RoomTour.tsx` (camera, scroll
  timing in `SEGS`) and `components/room/Walls.tsx` (the room, redrawn from the app's screenshots).
- `/privacy/`, `/terms/` — rendered from `docs/privacy.md` and `docs/terms.md` at build time. Edit the Markdown only.
- 404 — `app/not-found.tsx`
- Social card — `app/og.png/route.tsx` (built to `out/og.png`; fetches Shantell Sans from Google Fonts at build time).
  App icon, wordmark and the cat; every page points at it through `openGraphFor()` in `lib/site.ts`.
- Search engines — `app/sitemap.ts`, `app/robots.ts`, and JSON-LD on `/` (`app/page.tsx`: Organization with the
  logo, WebSite, SoftwareApplication).
- Pet art — `assets/pets/*.webp`, the app's short-hair cat stills in their in-app colours
- App icon — `app/icon.png` (also the logo in JSON-LD), `app/favicon.ico`, `app/apple-icon.png` and
  `assets/app-icon.webp` (header)

## Deploy

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. In the repo settings set
**Pages → Source** to **GitHub Actions**.

The workflow passes two values from `actions/configure-pages` to the build:

- `PAGES_BASE_PATH` — `/<repo>` for `<user>.github.io/<repo>`, empty for a custom domain or a `<user>.github.io` repo.
- `SITE_URL` — the public URL, used for canonical links, Open Graph, `sitemap.xml` and `robots.txt`.

To build for another host, set both yourself, e.g.
`SITE_URL=https://petsonfocus.app npm run build`.

### Google Search Console

Add the site at <https://search.google.com/search-console> (URL-prefix property for `https://petsonfocus.app/`),
pick the **HTML tag** method and copy the tag's `content` value into a repository variable named
`GOOGLE_SITE_VERIFICATION` (Settings → Secrets and variables → Actions → Variables). The next deploy emits the
tag on every page; verify, then submit `https://petsonfocus.app/sitemap.xml` under Sitemaps. Without the
variable nothing is emitted.

### Bing Webmaster Tools

Bing also feeds DuckDuckGo, Yahoo and ChatGPT search. Add the site at <https://www.bing.com/webmasters> (or import it
from Search Console once that is verified). For the **HTML Meta Tag** method, copy the `msvalidate.01` tag's `content`
value into a repository variable named `BING_SITE_VERIFICATION`, deploy, verify, then submit
`https://petsonfocus.app/sitemap.xml`.

## Guides

`/guides/<slug>/` pages render from `docs/guides/<slug>.md` (front matter, Markdown body, one `<!-- cta -->` line for
the middle download box). The sitemap, the guides index and each guide's "More guides" links pick new files up on
their own. Rules for writing one: `docs/seo/WRITING.md`; topics waiting: `docs/seo/BACKLOG.md`.
`npm run lint` and the deploy run `scripts/check-guides.mjs` (`npm run check:guides`), so a guide that breaks the rules never ships.

A daily Claude Code routine (claude.ai/code/routines) writes the next backlog topic, runs lint and build, and pushes
to `main`. When the store listings are live, put their URLs in `STORE_LINKS` (`lib/site.ts`) and every download box
shows store buttons instead of "Coming soon".

## Later

- App Store id exists → add the Smart App Banner in `app/layout.tsx` (`apple-itunes-app`).
- Store listings live → replace the "Coming soon" badges in `app/page.tsx` with links.
