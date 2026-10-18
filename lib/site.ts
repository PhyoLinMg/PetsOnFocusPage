import type { Metadata } from "next";

// SITE_URL is the public root of the site, including any GitHub Pages base path
// (e.g. https://example.github.io/petsonfocuspage). The Pages workflow sets it from
// actions/configure-pages; set it yourself for other hosts.
export const SITE_URL = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const SITE_NAME = "Pets on Focus";
export const TAGLINE = "Focus together.";
export const CONTACT_EMAIL = "phyolinmg.dev@gmail.com";
export const AUTHOR = "Phyo Lin Mg";

// Search engines weigh the title most and cut it near 60 characters, and the description near 155:
// the phrases people search ("focus timer", "Pomodoro app") go first.
export const HOME_TITLE = "Pets on Focus — cosy focus timer & Pomodoro app with a pet";
export const HOME_DESCRIPTION =
  "A calm focus timer and Pomodoro app for Android and iPhone, with a hand-drawn pet who keeps you " +
  "company. Stay focused, earn coins and make its room your own.";

// What people type when they look for an app like this. Google ignores the keywords tag; Bing and
// others still read it, and it costs nothing.
export const KEYWORDS = [
  "Pets on Focus",
  "focus app",
  "focus timer",
  "focus timer app",
  "Pomodoro timer",
  "Pomodoro app",
  "study timer",
  "study app",
  "study with a pet",
  "focus app with a pet",
  "cute focus timer",
  "cosy focus app",
  "concentration timer",
  "deep work timer",
  "productivity timer",
  "productivity app",
  "stay focused app",
  "phone distraction",
  "virtual pet",
  "cat focus app",
  "focus streak",
  "ambient sounds for focus",
  "focus timer for Android",
  "focus timer for iPhone",
  "Pomodoro app for iPad",
];

/** Absolute URL for a site path, e.g. absoluteUrl("/privacy/"). */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/** The app icon as a square PNG (app/icon.png): the logo for search engines and share previews. */
export const LOGO = { url: absoluteUrl("/icon.png"), width: 512, height: 512 };

/** The share card (app/og.png/route.tsx): app icon, wordmark and the cat in its room. */
export const OG_IMAGE = {
  url: absoluteUrl("/og.png"),
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Pets on Focus: the app icon beside a cat sitting on a rug in a cosy room",
};

/**
 * Open Graph for one page. Next merges metadata per top-level key, so a page's `openGraph` replaces the
 * layout's whole object; every page builds its own through here so og:site_name, og:type, og:locale and
 * the share image are never dropped. The layout calls it with no page, and Next then derives og:title from
 * each page's <title> (the 404 page, for one).
 */
export function openGraphFor(
  page: { title?: string; description?: string; path?: string } = {},
): NonNullable<Metadata["openGraph"]> {
  return {
    ...(page.title && { title: page.title }),
    ...(page.description && { description: page.description }),
    ...(page.path && { url: absoluteUrl(page.path) }),
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [OG_IMAGE],
  };
}
