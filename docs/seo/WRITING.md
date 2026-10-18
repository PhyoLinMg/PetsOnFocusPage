# Writing a guide

The rules for every page in `docs/guides/`. The daily guide routine follows them, and so does anyone writing by hand.
`npm run check:guides` (run by `npm run lint` and by the deploy) enforces the mechanical ones; the rest are on the writer.

## What a guide is for

Someone searches a real question ("how long should a Pomodoro be", "how to stop checking my phone while studying").
The guide answers it properly, better than the pages already ranking, and Pets on Focus comes up only where it
genuinely helps. A reader who never installs the app should still leave with their answer. One good guide beats ten
thin ones: Google demotes sites that publish mass-produced pages.

## File

- `docs/guides/<slug>.md`. The slug is the URL (`/guides/<slug>/`): lowercase words joined by hyphens, close to the
  search phrase, never changed once published (GitHub Pages cannot redirect).
- Front matter, every field on one line:

  ```
  ---
  title: How long should a focus session be?
  description: One sentence of 120–160 characters that answers the question and makes someone click.
  published: 2026-10-19
  keywords: focus session length, how long to focus, focus timer
  ---
  ```

  Add `updated: YYYY-MM-DD` when a guide is improved later; keep `published`.
- The page prints the title as the H1, so the body starts with text and uses `##` / `###` for sections. No `#`.
- One line holding only `<!-- cta -->` after the section where a reader is most likely to want to try it (usually
  after the first or second `##` section). Exactly one. The page adds a second download box at the end itself.

## Shape

- 900–1,800 words. Long enough to answer fully, no padding.
- Open with the direct answer in the first two or three sentences. No "In today's busy world".
- `##` sections that a skimmer can read on their own: steps, a short table or list where it helps, a worked example.
- Link to 2–4 other guides with relative links (`[Pomodoro technique for studying](/guides/pomodoro-technique-for-studying/)`)
  where they help the reader, and to `/` or `/#faq` at most once. Only link pages that exist.
- Outside sources are welcome when they back a claim (a study, a university page). Link them; never invent a study,
  a number or a quote. If you are not sure a figure is right, leave it out.
- End with a short "In short" or similar recap, not a sales pitch.

## Voice

Warm, short sentences, a little playful, never guilt-trippy, never preachy. British spelling the site uses ("cosy",
"customise" in prose; the app's button is "Customize"). Write to "you". The pet is happy when you focus and a little
disappointed, never punished, when you leave.

## What the app does (the only facts you may claim)

If a feature is not on this list, the app does not have it. The home page (`app/page.tsx`) says the same things;
`docs/home.md` is older and partly out of date, so don't take facts from it. When the app changes, update this list.

- Focus sessions from 5 minutes to 4 hours, or Pomodoro: work cycles, short breaks, a long break. Lengths are set in
  Settings. Do not state the app's default Pomodoro lengths.
- Leave the app for more than 10 seconds during a session and the session ends without a reward. A notification
  comes the moment you leave; come back within 10 seconds and nothing happens. It is not an app blocker: it does not
  block other apps, it notices you left.
- Android notices leaving through the Accessibility Service, only to see which app is in front. It does not read the
  screen, what you type or messages, and nothing it sees leaves the phone. It can be turned off in Android settings.
- Pets: short-hair cat, orange tabby cat, golden retriever; more with coins, starting with a Holland Lop rabbit. Pets
  sit, nap, yawn, stretch, wake up and celebrate.
- Finish a session: the pet celebrates, you earn coins and a gift. Seven gifts, Common to Legendary: five after
  sessions (Common to Rare), an Epic at a 7-day streak, a Legendary at a 30-day streak.
- Room customisation with coins: wallpapers, windows, wall frames, rugs, beds, plants, lamps, floor patterns,
  lighting. Try items in the room before buying. The window follows the real time of day.
- Ambient sounds: cat purring, rain, fireplace, café. Mix up to three, each at its own volume, save the mix.
- Tasks: write what you are working on and pin it before a session.
- Stats (week chart, streak and average tiles), a timeline of past sessions, streaks, a wall calendar, a chalkboard
  of today's sessions, a pennant for milestones from 1 to 100 days.
- Streak reminder: one notification at 8 pm local time on a day with a streak to lose and no finished session.
  Never while the app is open or during a session. On by default, off in Settings.
- Share a picture card of a finished session and your pet.
- Phones, foldables and tablets; Android, iPhone and iPad. Same features on both.
- Free to download and use; the free app is the whole app. Optional Plus (monthly, annual or lifetime) adds double
  coins from every finished session and Pomodoro work cycle, a weekly streak freeze (one missed day in any 7, covered
  when you finish a session the next day, shown with a snowflake), and two Stats cards ("Last 5 weeks" calendar,
  "Best hours"). Optional coin packs.
- No account, no sign-up, no login. Data stays on the device.

## Never

- Prices, or "cheap", "best value", "free trial". The stores show the price.
- "No ads" or "ad-free" (ads are an open decision).
- "Never lose a streak again". A freeze is one day off in seven that doesn't cost you your streak.
- Features not on the list above: no sync, backup to our servers, widgets, website blocking, Plus sounds, Plus pets,
  friends or leaderboards, Apple Watch.
- Store links or "download now". The app is not released: the page's download box handles this and says "Coming soon".
- Made-up reviews, ratings, user counts, testimonials or quotes.

## Comparison guides (allowed)

Pages like "Forest alternatives" or "apps like Focus To-Do" are fine when they are fair:

- Describe other apps only with facts their own store page or website states, in neutral words. No prices for any
  app. If you can't check a fact, leave it out. Never claim another app lacks something unless you have checked.
- Say plainly who each app suits, including when another app suits someone better than Pets on Focus.
- No logos or screenshots of other apps. Their names are fine in text.

## ADHD and attention guides (allowed, with care)

- Never say or imply Pets on Focus treats, helps manage or is designed for ADHD or any condition. It is a focus timer.
- Talk about what some people find helpful ("some people with ADHD find short, timed sessions easier to start"),
  backed by a linked reputable source where you make a factual claim (NHS, CDC, a university, a peer-reviewed paper).
- Include one line suggesting a doctor or specialist for diagnosis or treatment questions.
- No "cure", "treat", "fix your ADHD", "clinically proven", "doctor-recommended".
