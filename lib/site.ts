// SITE_URL is the public root of the site, including any GitHub Pages base path
// (e.g. https://example.github.io/petsonfocuspage). The Pages workflow sets it from
// actions/configure-pages; set it yourself for other hosts.
export const SITE_URL = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const SITE_NAME = "Pets on Focus";
export const CONTACT_EMAIL = "phyolinmg.dev@gmail.com";
export const AUTHOR = "Phyo Lin Mg";

export const HOME_TITLE = "Pets on Focus — a cosy focus timer with a pet who keeps you company";
export const HOME_DESCRIPTION =
  "Start a focus session and your pet settles in beside you. Stay in the app and it stays happy; " +
  "finish and you earn coins for its room. A calm focus timer and Pomodoro app for Android and iPhone.";

/** Absolute URL for a site path, e.g. absoluteUrl("/privacy/"). */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

// Pages that set their own `openGraph` replace the layout's, so they include this too.
export const OG_IMAGE = {
  url: absoluteUrl("/og.png"),
  width: 1200,
  height: 630,
  alt: "Pets on Focus: a cat sitting on a rug in a cosy room",
};
