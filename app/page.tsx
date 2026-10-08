import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Room } from "@/components/Room";
import { AUTHOR, CONTACT_EMAIL, HOME_DESCRIPTION, HOME_TITLE, OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";
import dogSit from "@/assets/pets/dog_sit.webp";
import dogSleep from "@/assets/pets/dog_sleep.webp";
import catSit from "@/assets/pets/cat_sit.webp";
import catSleep from "@/assets/pets/cat_sleep.webp";
import catCelebrating from "@/assets/pets/cat_celebrating.webp";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { title: HOME_TITLE, description: HOME_DESCRIPTION, url: absoluteUrl("/"), images: [OG_IMAGE] },
};

const steps: { title: string; body: string; image: StaticImageData; alt: string }[] = [
  {
    title: "Pick your time.",
    body: "Choose how long you want to focus, or switch to Pomodoro for work and break cycles.",
    image: dogSit,
    alt: "A golden retriever sitting, ready to start",
  },
  {
    title: "Stay with your pet.",
    body:
      "Your pet curls up beside you while the timer runs. Leave the app for more than 10 seconds and the " +
      "session ends, and your pet looks a little let down.",
    image: catSleep,
    alt: "A tabby cat curled up asleep",
  },
  {
    title: "Celebrate and collect.",
    body:
      "Finish the session and your pet celebrates. You earn coins and a surprise gift for the collection.",
    image: catCelebrating,
    alt: "A tabby cat celebrating with its paws in the air",
  },
];

const features: { title: string; body: string }[] = [
  {
    title: "Focus or Pomodoro",
    body:
      "Run one focus session at a time, or a Pomodoro run with work cycles, short breaks and a longer " +
      "break. Set the lengths in Settings.",
  },
  {
    title: "Honest focus",
    body:
      "Leaving the app is what ends a session, not a long list of blocked apps. Step away for more than " +
      "10 seconds and the session stops. That’s the deal you make with your pet.",
  },
  {
    title: "A room that’s yours",
    body:
      "Spend coins on wallpapers, windows, wall frames, rugs, beds, plants, lamps, floor patterns and " +
      "lighting. The window follows the real time of day: sun in the daytime, moon at night.",
  },
  {
    title: "Gifts after every session",
    body: "Every finished session opens a gift for your collection, from Common to Legendary.",
  },
  {
    title: "Ambient sounds",
    body: "Mix gentle background sounds while you focus: cat purring, rain, fireplace, café.",
  },
  {
    title: "See your progress",
    body:
      "Stats, a timeline of past sessions, and streaks for focusing day after day. Reach a 7-day or " +
      "30-day streak for a reward.",
  },
  {
    title: "Tasks",
    body: "Write down what you’re working on and pick it before you start, so each session has a purpose.",
  },
  {
    title: "Share with friends",
    body: "Finished a session? Share a picture card of your session and your pet with whoever you like.",
  },
  {
    title: "Works on big screens",
    body: "Built for phones, foldables and tablets.",
  },
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

      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1 id="hero-title" className="hero-title">
              Pets on Focus
            </h1>
            <p className="hero-tagline">Focus together.</p>
            <p className="hero-lede">
              A calm focus timer with a pet who sits with you while you work. Stay focused and it stays happy.
              Finish, and you earn coins to make its room your own.
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
          </div>
          <Room />
        </div>
      </section>

      <section id="how-it-works" className="section section--dark" aria-labelledby="how-title">
        <div className="container">
          <p className="eyebrow eyebrow--dark">How it works</p>
          <h2 id="how-title" className="section-title">
            Three steps, one small friend.
          </h2>
          <ol className="steps">
            {steps.map((step, i) => (
              <li key={step.title} className="step">
                <div className="step-art">
                  <Image src={step.image} alt={step.alt} sizes="(max-width: 860px) 40vw, 180px" />
                </div>
                <p className="step-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="features" className="section" aria-labelledby="features-title">
        <div className="container">
          <p className="eyebrow">Features</p>
          <div className="feature-lead">
            <div className="feature-lead-copy">
              <h2 id="features-title" className="section-title">
                A pet who keeps you company
              </h2>
              <p className="feature-lead-body">
                A hand-drawn cat or dog lives in your room. It sits, naps, stretches, wakes up and cheers when
                you finish. Pick a short-hair or an orange tabby cat, or a golden retriever. More pets can join
                with coins, starting with a Holland Lop rabbit.
              </p>
            </div>
            <div className="feature-lead-art">
              <Image src={catSit} alt="A tabby cat sitting" sizes="(max-width: 860px) 30vw, 160px" />
              <Image src={dogSleep} alt="A golden retriever napping" sizes="(max-width: 860px) 45vw, 240px" />
            </div>
          </div>
          <ul className="features">
            {features.map((f) => (
              <li key={f.title} className="feature">
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-body">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--dark" aria-label="Privacy and Plus">
        <div className="container cards">
          <article className="card" aria-labelledby="privacy-title">
            <p className="eyebrow eyebrow--dark">Privacy</p>
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
            <p className="eyebrow eyebrow--dark">Optional</p>
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
            <p className="eyebrow">FAQ</p>
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
