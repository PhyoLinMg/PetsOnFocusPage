import type { Metadata } from "next";
import Link from "next/link";
import { DoubleCoins, FiveWeeks, FrozenCalendar } from "@/components/PlusArt";
import { Reveal } from "@/components/Reveal";
import { Devices } from "@/components/room/Devices";
import { faqs, features } from "@/lib/home-content";
import { RoomTour } from "@/components/room/RoomTour";
import { AUTHOR, CONTACT_EMAIL, HOME_DESCRIPTION, HOME_TITLE, KEYWORDS, LOGO, OG_IMAGE, SITE_NAME, absoluteUrl, openGraphFor } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: openGraphFor({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/" }),
};

// What the tour shows, one note per stop (components/room/RoomTour.tsx).
const tourNotes: { anchor?: string; content: React.ReactNode }[] = [
  {
    content: (
      <>
        <h1 className="eyebrow">Pets on Focus</h1>
        <p className="tour-headline">Focus together.</p>
        <p className="tour-body">A calm focus timer with a hand-drawn pet who sits with you in a small, cosy room.</p>
        <ul className="tour-stores" aria-label="Download">
          <li>Android</li>
          <li>iPhone and iPad</li>
          <li className="tour-stores-soon">Coming soon</li>
        </ul>
      </>
    ),
  },
  {
    anchor: "how-it-works",
    content: (
      <>
        <h2 className="visually-hidden">How it works</h2>
        <p className="eyebrow">How it works · 01 / 03</p>
        <h3 className="tour-title">Start, and your pet settles in.</h3>
        <p className="tour-body">
          Five minutes to four hours, or Pomodoro cycles. Your pet naps and stretches beside you. Step away for
          more than 10 seconds and the session ends; you get a heads-up the moment you leave.
        </p>
      </>
    ),
  },
  {
    content: (
      <>
        <p className="eyebrow">How it works · 02 / 03</p>
        <h3 className="tour-title">Finish, and your pet brings a gift.</h3>
        <p className="tour-body">
          Your pet celebrates, you earn coins for the room, and a find goes into your collection. The rarest
          gifts come from streaks.
        </p>
      </>
    ),
  },
  {
    content: (
      <>
        <p className="eyebrow">How it works · 03 / 03</p>
        <h3 className="tour-title">Turn around. Your progress is on the wall.</h3>
        <p className="tour-body">
          Today&rsquo;s sessions on the chalkboard, your streak on the calendar, and a pennant for every milestone
          from 1 to 100 days.
        </p>
      </>
    ),
  },
  {
    content: (
      <>
        <p className="eyebrow">Collection</p>
        <h3 className="tour-title">Seven gifts to find.</h3>
        <p className="tour-body">
          Five turn up after sessions, Common to Rare. An Epic waits at a 7-day streak and a Legendary at 30 days.
        </p>
      </>
    ),
  },
];

// Pets on Focus Plus. Titles are the app's own benefit lines (PlusPerks.benefitLines); facts from the Plus perks
// spec (2026-10-17). No prices, no trial, nothing free moved behind Plus.
const plusPerks: { title: string; body: string; art: React.ReactNode }[] = [
  {
    title: "Double coins from every finished session",
    body: "Pomodoro work cycles too. A 25-minute session pays 10 coins for the room instead of 5.",
    art: <DoubleCoins />,
  },
  {
    title: "Miss a day a week, keep your streak",
    body: "A day off that doesn’t cost you your streak, once in any seven days. Finish a session the next day and Plus covers it.",
    art: <FrozenCalendar />,
  },
  {
    title: "Five-week calendar and best hours in Stats",
    body: "The last 35 days, shaded by how long you focused, and the two hours when most of your focus starts.",
    art: <FiveWeeks />,
  },
];

const plusPlans: { name: string; body: string }[] = [
  { name: "Monthly or annual", body: "A subscription through Google Play or the App Store. Cancel anytime in the store." },
  { name: "Lifetime", body: "One payment, no subscription." },
  { name: "New phone or a reinstall", body: "Plus comes back with Restore Purchases in Settings, on the same store account." },
];

// Structured data for search engines: who makes the app, what this site is, and what the app is.
// Organization.logo and WebSite.name are what Google reads to show the icon and site name in results.
const ORG_ID = absoluteUrl("/#organization");
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: LOGO.url, width: LOGO.width, height: LOGO.height },
      email: CONTACT_EMAIL,
      founder: { "@type": "Person", name: AUTHOR },
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      name: SITE_NAME,
      url: absoluteUrl("/"),
      inLanguage: "en",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "SoftwareApplication",
      "@id": absoluteUrl("/#app"),
      name: SITE_NAME,
      description: HOME_DESCRIPTION,
      url: absoluteUrl("/"),
      image: OG_IMAGE.url,
      applicationCategory: "ProductivityApplication",
      applicationSubCategory: "Focus timer",
      operatingSystem: "Android, iOS, iPadOS",
      keywords: KEYWORDS.join(", "),
      featureList: features.map((f) => f.title),
      author: { "@type": "Person", name: AUTHOR },
      publisher: { "@id": ORG_ID },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    // The FAQ below as structured data, word for word. Answers with links (contact) stay out: the text must be plain.
    {
      "@type": "FAQPage",
      "@id": absoluteUrl("/#faq"),
      mainEntity: faqs
        .filter((f): f is { q: string; a: string } => typeof f.a === "string")
        .map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <RoomTour notes={tourNotes} />

      <section id="screens" className="section" aria-labelledby="screens-title">
        <div className="container">
          <h2 id="screens-title" className="section-title" data-reveal>
            At home on every screen.
          </h2>
          <p className="section-lede" data-reveal>
            Phones, foldables and tablets, on Android and on iPhone and iPad. On a bigger screen the room opens
            up around your pet.
          </p>
          <Devices />
        </div>
      </section>

      <section id="features" className="section" aria-labelledby="features-title">
        <div className="container">
          <h2 id="features-title" className="section-title" data-reveal>
            More in the app
          </h2>
          <ul className="features">
            {features.map((f) => (
              <li key={f.title} className="feature" data-reveal>
                <h3 className="feature-title">{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="plus" className="section section--dark" aria-label="Plus and privacy">
        <div className="container">
          <div className="plus-head" data-reveal>
            <h2 className="section-title">Pets on Focus Plus</h2>
            <p className="plus-lede">The free app is the whole app. Plus is for anyone who’d like a little more.</p>
          </div>
          <ul className="plus-perks">
            {plusPerks.map((p) => (
              <li key={p.title} className="plus-perk" data-reveal>
                <div className="plus-art">{p.art}</div>
                <div>
                  <h3 className="plus-perk-title">{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <dl className="plus-plans" data-reveal>
            {plusPlans.map((p) => (
              <div key={p.name}>
                <dt>{p.name}</dt>
                <dd>{p.body}</dd>
              </div>
            ))}
          </dl>

          <article className="card card--split" aria-labelledby="privacy-title" data-reveal>
            <h2 id="privacy-title" className="card-title">
              Privacy, in short
            </h2>
            <div className="card-text">
              <p>
                No account. No sign-up. Your tasks, coins and room stay on your device. The app sends crash reports so
                bugs can be fixed, and usage stats (on by default, off in Settings) so it can get better. Never
                anything you type, and it never sells your data.
              </p>
              <p>
                <Link href="/privacy/" className="link-accent">
                  Read the Privacy Policy →
                </Link>
              </p>
            </div>
          </article>
        </div>
      </section>

      <section id="faq" className="section" aria-labelledby="faq-title">
        <div className="container faq-layout">
          <div data-reveal>
            <h2 id="faq-title" className="section-title">
              Questions, answered
            </h2>
          </div>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q} className="faq-item" data-reveal>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Reveal />
    </>
  );
}
