# Pets on Focus — website

Marketing site for the Pets on Focus app. Next.js App Router, static export, hosted on GitHub Pages.
Copy and design brief: `docs/home.md` (kept local, git-ignored).

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
```

## Content

- `/` — `app/page.tsx`
- `/privacy/`, `/terms/` — rendered from `docs/privacy.md` and `docs/terms.md` at build time. Edit the Markdown only.
- 404 — `app/not-found.tsx`
- Social card — `app/og.png/route.tsx` (built to `out/og.png`; fetches Shantell Sans from Google Fonts at build time)
- Pet art — `assets/pets/*.webp`, cropped from the app's `composeResources/drawable` PNGs

## Deploy

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. In the repo settings set
**Pages → Source** to **GitHub Actions**.

The workflow passes two values from `actions/configure-pages` to the build:

- `PAGES_BASE_PATH` — `/<repo>` for `<user>.github.io/<repo>`, empty for a custom domain or a `<user>.github.io` repo.
- `SITE_URL` — the public URL, used for canonical links, Open Graph, `sitemap.xml` and `robots.txt`.

To build for another host, set both yourself, e.g.
`SITE_URL=https://petsonfocus.app npm run build`.

## Later

- App Store id exists → add the Smart App Banner in `app/layout.tsx` (`apple-itunes-app`).
- Store listings live → replace the "Coming soon" badges in `app/page.tsx` with links.
- App icon designed → add `app/icon.png` and `app/apple-icon.png`.
