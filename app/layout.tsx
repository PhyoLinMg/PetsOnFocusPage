import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { JetBrains_Mono, Shantell_Sans, Source_Sans_3 } from "next/font/google";
import { AUTHOR, CONTACT_EMAIL, HOME_DESCRIPTION, HOME_TITLE, OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";
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
  openGraph: { siteName: SITE_NAME, type: "website", locale: "en", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", images: [OG_IMAGE] },
  // Add the iOS Smart App Banner once the App Store id exists:
  // other: { "apple-itunes-app": "app-id=<id>" },
};

export const viewport: Viewport = { themeColor: "#C0C39F" };

// Runs before paint so the room window shows the visitor's own time of day.
const skyScript = `(function(){var h=new Date().getHours();document.documentElement.dataset.sky=h>=6&&h<18?"day":"night";})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-sky="day"
      suppressHydrationWarning
      className={`${hand.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: skyScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <div className="container site-header-inner">
            <Link href="/" className="wordmark">
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
              <span> · Made by {AUTHOR} in Thailand</span>
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
