import type { Metadata } from "next";
import Link from "next/link";
import { Journey, type Stop } from "@/components/journey/Journey";
import { AUTHOR, CONTACT_EMAIL, HOME_DESCRIPTION, HOME_TITLE, OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { title: HOME_TITLE, description: HOME_DESCRIPTION, url: absoluteUrl("/"), images: [OG_IMAGE] },
};

const steps: { title: string; body: string }[] = [
  {
    title: "Pick your time.",
    body: "Choose how long you want to focus, or switch to Pomodoro for work and break cycles.",
  },
  {
    title: "Stay with your pet.",
    body:
      "Your pet curls up beside you while the timer runs. Leave the app for more than 10 seconds and the " +
      "session ends, and your pet looks a little let down.",
  },
  {
    title: "Celebrate and collect.",
    body:
      "Finish the session and your pet celebrates. You earn coins and a surprise gift for the collection.",
  },
];

type Feature = { title: string; body: string };

const features = {
  pomodoro: {
    title: "Focus or Pomodoro",
    body:
      "Run one focus session at a time, or a Pomodoro run with work cycles, short breaks and a longer " +
      "break. Set the lengths in Settings.",
  },
  honest: {
    title: "Honest focus",
    body:
      "Leaving the app is what ends a session, not a long list of blocked apps. Step away for more than " +
      "10 seconds and the session stops. That’s the deal you make with your pet.",
  },
  room: {
    title: "A room that’s yours",
    body:
      "Spend coins on wallpapers, windows, wall frames, rugs, beds, plants, lamps, floor patterns and " +
      "lighting. The window follows the real time of day: sun in the daytime, moon at night.",
  },
  gifts: {
    title: "Gifts after every session",
    body: "Every finished session opens a gift for your collection, from Common to Legendary.",
  },
  sounds: {
    title: "Ambient sounds",
    body: "Mix gentle background sounds while you focus: cat purring, rain, fireplace, café.",
  },
  progress: {
    title: "See your progress",
    body:
      "Stats, a timeline of past sessions, and streaks for focusing day after day. Reach a 7-day or " +
      "30-day streak for a reward.",
  },
  tasks: {
    title: "Tasks",
    body: "Write down what you’re working on and pick it before you start, so each session has a purpose.",
  },
  share: {
    title: "Share with friends",
    body: "Finished a session? Share a picture card of your session and your pet with whoever you like.",
  },
  screens: {
    title: "Works on big screens",
    body: "Built for phones, foldables and tablets.",
  },
} satisfies Record<string, Feature>;

// A feature stop: its note, what the camera frames, the pet's pose and the app demo it plays.
// On narrow screens the camera keeps to the pet, since the demo takes most of the frame.
function feature(key: keyof typeof features, target: string[], pet: Stop["pet"], demo: Stop["demo"]): Stop {
  return { key, target, narrowTarget: ["pet", "rug"], pet, demo, content: <FeatureNote items={[features[key]]} /> };
}

function FeatureNote({ items }: { items: Feature[] }) {
  return (
    <ul className="note-features">
      {items.map((f) => (
        <li key={f.title}>
          <h3 className="note-title">{f.title}</h3>
          <p className="note-body">{f.body}</p>
        </li>
      ))}
    </ul>
  );
}

const stops: Stop[] = [
  {
    key: "welcome",
    target: ["window", "clock", "rug", "pet"],
    narrowTarget: ["rug", "pet"],
    pet: "cat-sit",
    content: (
      <>
        <h2 className="note-headline">Make yourself at home.</h2>
        <p className="note-lede">
          Stay focused and it stays happy. Finish, and you earn coins to make its room your own.
        </p>
        <ul className="store-list" aria-label="Download">
          <li className="store-badge">
            <span className="store-badge-soon">Coming soon on</span>
            <span className="store-badge-name">Google Play</span>
          </li>
          <li className="store-badge">
            <span className="store-badge-soon">Coming soon on the</span>
            <span className="store-badge-name">App Store</span>
          </li>
        </ul>
      </>
    ),
  },
  ...steps.map(
    (step, i): Stop => ({
      key: `step-${i + 1}`,
      anchor: i === 0 ? "how-it-works" : undefined,
      target: [["pet", "rug"], ["pet", "rug"], ["pet", "gift"]][i],
      narrowTarget: ["pet", "rug"],
      pet: (["cat-sit", "cat-sleep", "cat-celebrating"] as const)[i],
      demo: (["pick", "session", "gift"] as const)[i],
      content: (
        <>
          {i === 0 && <h2 className="visually-hidden">How it works</h2>}
          <p className="eyebrow">
            How it works <span className="note-count">{`0${i + 1} / 03`}</span>
          </p>
          <h3 className="note-title note-title--step">{step.title}</h3>
          <p className="note-body">{step.body}</p>
        </>
      ),
    }),
  ),
  {
    key: "pet",
    anchor: "features",
    target: ["pet", "rug"],
    pet: "cat-sit",
    demo: "pets",
    content: (
      <>
        <h2 className="visually-hidden">Features</h2>
        <h3 className="note-title note-title--step">A pet who keeps you company</h3>
        <p className="note-body">
          A hand-drawn cat or dog lives in your room. It sits, naps, stretches, wakes up and cheers when you
          finish. Pick a short-hair or an orange tabby cat, or a golden retriever. More pets can join with coins,
          starting with a Holland Lop rabbit.
        </p>
      </>
    ),
  },
  feature("pomodoro", ["pet", "rug"], "cat-sit", "pomodoro"),
  feature("honest", ["pet", "rug"], "cat-sleep", "leave"),
  feature("room", ["window", "rug", "pet"], "cat-sit", "customize"),
  feature("gifts", ["gift", "pet"], "cat-celebrating", "collection"),
  feature("sounds", ["radio", "pet"], "cat-sleep", "sounds"),
  feature("tasks", ["notepad", "pet"], "cat-sit", "tasks"),
  feature("progress", ["calendar", "pet"], "cat-sit", "stats"),
  feature("share", ["frame", "pet"], "cat-celebrating", "share"),
  { key: "screens", target: [], pet: "cat-sit", view: "fit", content: <FeatureNote items={[features.screens]} /> },
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is it free?",
    a: "Yes. Pets on Focus is free to download and use. Plus and coin packs are optional purchases.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  description: HOME_DESCRIPTION,
  url: absoluteUrl("/"),
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Android, iOS, iPadOS",
  author: { "@type": "Person", name: AUTHOR },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Journey
        stops={stops}
        intro={
          <div className="container intro">
            <h1 className="intro-title">Pets on Focus</h1>
            <p className="intro-tagline">Focus together.</p>
            <p className="intro-lede">A calm focus timer with a pet who sits with you while you work.</p>
            <p className="intro-cue">
              Scroll to step inside
              <span className="intro-cue-arrow" aria-hidden="true" />
            </p>
          </div>
        }
      />

      <section className="section section--dark" aria-label="Privacy and Plus">
        <div className="container cards">
          <article className="card" aria-labelledby="privacy-title">
            <h2 id="privacy-title" className="card-title">
              Privacy, in short
            </h2>
            <p>
              No account. No sign-up. Your sessions, tasks, coins and room stay on your device. The app only sends
              crash reports so bugs can be fixed, and it never sells your data.
            </p>
            <p>
              <Link href="/privacy/" className="link-accent">
                Read the Privacy Policy →
              </Link>
            </p>
          </article>
          <article className="card" aria-labelledby="plus-title">
            <h2 id="plus-title" className="card-title">
              Pets on Focus Plus
            </h2>
            <p>
              The free app is the whole app: the timer, Pomodoro, your pet, the room and the collection. Plus is
              an optional upgrade, monthly, yearly or once for life, that adds the extra ambient sounds and more
              as they arrive.
            </p>
          </article>
        </div>
      </section>

      <section id="faq" className="section" aria-labelledby="faq-title">
        <div className="container faq-layout">
          <div>
            <h2 id="faq-title" className="section-title">
              Questions, answered
            </h2>
          </div>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q} className="faq-item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
