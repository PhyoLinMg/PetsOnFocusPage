import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { JetBrains_Mono, Shantell_Sans, Source_Sans_3 } from "next/font/google";
import appIcon from "@/assets/app-icon.webp";
import { AUTHOR, CONTACT_EMAIL, HOME_DESCRIPTION, HOME_TITLE, KEYWORDS, OG_IMAGE, SITE_NAME, SITE_URL, openGraphFor } from "@/lib/site";
import "./globals.css";

const hand = Shantell_Sans({ subsets: ["latin"], variable: "--font-hand", display: "swap" });
const body = Source_Sans_3({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  // Origin only: canonical, og:url and og:image are written as absolute URLs (lib/site.ts),
  // so a base path in SITE_URL is never applied twice.
  metadataBase: new URL(new URL(SITE_URL).origin),
  title: { default: HOME_TITLE, template: `%s — ${SITE_NAME}` },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR }],
  creator: AUTHOR,
  publisher: AUTHOR,
  keywords: KEYWORDS,
  category: "productivity",
  openGraph: openGraphFor(),
  twitter: { card: "summary_large_image", images: [OG_IMAGE] },
  // Index everything, and let Google show the full share image in results and Discover.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Google Search Console → Settings → Ownership verification → HTML tag. Put the tag's content value in
  // the GOOGLE_SITE_VERIFICATION repository variable (read by .github/workflows/deploy.yml) and the tag
  // is on every page; leave it unset and nothing is emitted.
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  // Add the iOS Smart App Banner once the App Store id exists:
  // other: { "apple-itunes-app": "app-id=<id>" },
};

export const viewport: Viewport = { themeColor: "#C0C39F" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${hand.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <div className="container site-header-inner">
            <Link href="/" className="wordmark">
              <Image src={appIcon} alt="" width={32} height={32} className="wordmark-icon" loading="eager" />
              Pets on Focus
            </Link>
            <nav aria-label="Main" className="site-nav">
              <Link href="/#how-it-works">How it works</Link>
              <Link href="/#features">Features</Link>
              <Link href="/#faq">FAQ</Link>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="container site-footer-inner">
            <p className="site-footer-name">
              <span className="wordmark wordmark--floor">Pets on Focus</span>
              <span className="site-footer-credit">Made by {AUTHOR} in Thailand</span>
            </p>
            <nav aria-label="Footer" className="site-footer-links">
              <Link href="/privacy/">Privacy Policy</Link>
              <Link href="/terms/">Terms of Use</Link>
              <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
            </nav>
            <p className="site-footer-legal">
              © 2026 {AUTHOR}. Google Play is a trademark of Google LLC. App Store is a service mark of Apple Inc.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
