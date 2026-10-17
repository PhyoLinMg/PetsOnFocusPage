import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Devices } from "@/components/room/Devices";
import { RoomTour } from "@/components/room/RoomTour";
import { AUTHOR, CONTACT_EMAIL, HOME_DESCRIPTION, HOME_TITLE, LOGO, OG_IMAGE, SITE_NAME, absoluteUrl, openGraphFor } from "@/lib/site";

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

// What the app does beyond the tour. Facts from the redesign brief (2026-10-15).
const features: { title: string; body: string }[] = [
  {
    title: "Focus or Pomodoro",
    body:
      "Run one session from 5 minutes to 4 hours, or a Pomodoro run of work cycles, short breaks and a " +
      "long break. Set the lengths in Settings.",
  },
  {
    title: "A pet who keeps you company",
    body: "A short-hair cat, an orange tabby or a golden retriever. It sits, naps, yawns, stretches and cheers when you finish.",
  },
  {
    title: "A room that’s yours",
    body:
      "Tap Customize, then tap any spot in the room to swap it: the window, a frame, the rug, the bed, a " +
      "lamp. Try things in the room before you spend your coins.",
  },
  {
    title: "Ambient sounds",
    body: "Cat purring, rain, fireplace and café. Mix up to three, each at its own volume, and save the mix.",
  },
  {
    title: "Tasks",
    body: "Write down what you’re working on and pin it before you start, so each session has a purpose.",
  },
  {
    title: "Stats and timeline",
    body: "Your week at a glance, every past session on a timeline, and your streak.",
  },
  {
    title: "A streak reminder",
    body:
      "Got a streak going and no session yet today? One notification at 8 pm lets you know. Never while " +
      "you’re in the app, and you can turn it off in Settings.",
  },
  {
    title: "Share with friends",
    body: "Finished a session? Share a picture card of it and your pet with whoever you like.",
  },
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is it free?",
    a: "Yes. Pets on Focus is free to download and use. Plus and coin packs are optional purchases on top.",
  },
  {
    q: "What does Plus add?",
    a:
      "Double coins from every finished session and Pomodoro work cycle. A streak freeze: miss one day in any " +
      "seven, finish a session the next day, and your streak carries on. The day off gets a snowflake and doesn’t " +
      "add to the count, and two missed days in a row still end a streak. And two more cards in Stats: a " +
      "five-week calendar and your best hours.",
  },
  {
    q: "Is the free app limited?",
    a:
      "No. The free app is the whole app: the timer and Pomodoro, your pet and its room, gifts, sounds, tasks, " +
      "stats, streaks and the streak reminder. Plus only adds on top; nothing that was free moved behind it.",
  },
  {
    q: "What happens to my streak and coins if Plus ends?",
    a:
      "Freezes Plus already used stay in place, so your streak doesn’t change, and the coins you earned are still " +
      "yours. After that, new sessions pay the usual coins, a missed day isn’t covered, and the five-week calendar " +
      "and best hours cards lock again.",
  },
  {
    q: "Can I cancel?",
    a:
      "Yes, anytime, in your Google Play or App Store subscriptions. Plus stays on until the end of the period you " +
      "paid for, and deleting the app doesn’t cancel it. Lifetime is a one-time purchase, so there’s nothing to " +
      "cancel.",
  },
  { q: "Do I need an account?", a: "No. There is no sign-up and no login." },
  {
    q: "Why does the Android app ask for the Accessibility permission?",
    a:
      "Only to notice when you leave the app during a focus session, so the session can end after 10 " +
      "seconds away. It doesn’t read your screen, what you type or your messages, and nothing it sees " +
      "leaves your phone. You can turn it off in Android’s settings at any time.",
  },
  {
    q: "What happens if I leave the app during a session?",
    a:
      "You get a notification. Come back within 10 seconds and nothing happens. Stay away longer and the " +
      "session ends without a reward.",
  },
  {
    q: "If I reinstall or change phones, do I keep my purchases?",
    a:
      "Purchases made with Google Play or the App Store come back when you sign in with the same store " +
      "account. Tap Restore Purchases in Settings if needed. Coins and items bought with coins live on the " +
      "device and come back through your phone’s own backup (Android backup or iCloud).",
  },
  {
    q: "Which devices are supported?",
    a: "Android phones, tablets and foldables, and iPhone and iPad.",
  },
  {
    q: "How do I contact you?",
    a: (
      <>
        Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </>
    ),
  },
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
      operatingSystem: "Android, iOS, iPadOS",
      author: { "@type": "Person", name: AUTHOR },
      publisher: { "@id": ORG_ID },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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

      <section className="section section--dark" aria-label="Privacy and Plus">
        <div className="container cards">
          <article className="card" aria-labelledby="privacy-title" data-reveal>
            <h2 id="privacy-title" className="card-title">
              Privacy, in short
            </h2>
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
          </article>
          <article className="card" aria-labelledby="plus-title" data-reveal>
            <h2 id="plus-title" className="card-title">
              Pets on Focus Plus
            </h2>
            <p>
              The free app is the whole app. Plus is an optional upgrade, with more Plus features as they ship.
            </p>
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
