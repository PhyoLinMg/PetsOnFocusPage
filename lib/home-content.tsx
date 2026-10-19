import { CONTACT_EMAIL } from "@/lib/site";

// Home page copy that other pages reuse: the feature list and the FAQ (the home page, its JSON-LD and /llms.txt).
// Answers that are plain strings also go into structured data and llms.txt word for word.

// What the app does beyond the tour. Facts from the redesign brief (2026-10-15).
export const features: { title: string; body: string }[] = [
  {
    title: "Focus timer or Pomodoro",
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

export const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is Pets on Focus?",
    a:
      "A focus timer and Pomodoro app for Android, iPhone and iPad. Start a session and a hand-drawn pet sits " +
      "with you in a cosy room while you work or study. Stay in the app and it stays happy; finish and you earn " +
      "coins and a gift for its room.",
  },
  {
    q: "Can I use it as a study timer?",
    a:
      "Yes. Pick a session from 5 minutes to 4 hours, or run Pomodoro cycles with short breaks and a long break. " +
      "Pin what you’re studying as a task, add rain or café sounds, and watch your streak grow in Stats.",
  },
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
      "cancel; if you switch to it from a subscription, cancel the subscription in the store too.",
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
