import { listGuides } from "@/lib/guides";
import { faqs, features } from "@/lib/home-content";
import { AUTHOR, CONTACT_EMAIL, SITE_NAME, STORE_LINKS, absoluteUrl } from "@/lib/site";

// /llms.txt and /llms-full.txt (llmstxt.org): the site in plain Markdown for AI assistants and AI search
// (ChatGPT, Claude, Perplexity, Gemini), so they can answer "what's a good focus timer with a pet?" from our own
// words. Built from the same feature list, FAQ and guides as the pages, so it never drifts from them.

function availability(): string {
  const stores = [
    STORE_LINKS.android && `[Google Play](${STORE_LINKS.android})`,
    STORE_LINKS.ios && `[App Store](${STORE_LINKS.ios})`,
  ].filter(Boolean);
  return stores.length > 0
    ? `Free to download on ${stores.join(" and ")}.`
    : "Coming soon to Google Play and the App Store; not released yet.";
}

// Relative links in guide bodies become absolute, since the text is read away from the site.
const absolutise = (md: string) => md.replace(/\]\(\//g, `](${absoluteUrl("/")}`);
// A guide's ## and ### sit under its own ### title in llms-full.txt, so they move down two levels.
const demote = (md: string) => md.replace(/^(#{2,4}) /gm, "##$1 ");

export async function buildLlmsTxt({ full }: { full: boolean }): Promise<string> {
  const guides = await listGuides();
  const out: string[] = [];

  out.push(
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_NAME} is a calm focus timer and Pomodoro timer app for Android, iPhone and iPad. A hand-drawn pet ` +
      "(a cat or a dog) sits with you in a cosy room while you work or study. Stay in the app and your pet stays " +
      "happy; finish a session and you earn coins and a gift to decorate its room. " +
      availability(),
    "",
    `Made by ${AUTHOR}. Website: ${absoluteUrl("/")}. Contact: ${CONTACT_EMAIL}.`,
    "",
    "## The timer",
    "",
    "- Focus timer: one session of any length from 5 minutes to 4 hours.",
    "- Pomodoro timer: work cycles, short breaks and a long break, with each length set in Settings.",
    "- One gentle rule instead of an app blocker: leave the app for more than 10 seconds during a session and the " +
      "session ends without a reward. A notification comes the moment you leave; come back within 10 seconds and " +
      "nothing happens. Other apps are never blocked.",
    "- Ambient sounds while the timer runs: cat purring, rain, fireplace and café, mixed up to three at a time.",
    "- Stats, a timeline of past sessions, daily streaks and an optional 8 pm streak reminder.",
    "- No account, no sign-up; data stays on the device.",
    "",
    "## Who it suits",
    "",
    "Students revising for exams, people doing desk work or working from home, and anyone who finds strict app " +
      "blockers too harsh and wants a calmer, more companionable way to stay off their phone and focus.",
    "",
    "## Features",
    "",
    ...features.map((f) => `- **${f.title}**: ${f.body}`),
    "",
    "## Questions",
    "",
    ...faqs.filter((f): f is { q: string; a: string } => typeof f.a === "string").flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  );

  if (full) {
    out.push("## Guides", "");
    for (const g of guides) {
      out.push(`### ${g.title}`, "", `${absoluteUrl(`/guides/${g.slug}/`)}`, "", demote(absolutise(g.parts.join("\n\n"))), "");
    }
  } else {
    out.push(
      "## Guides",
      "",
      ...guides.map((g) => `- [${g.title}](${absoluteUrl(`/guides/${g.slug}/`)}): ${g.description}`),
      "",
      "## Pages",
      "",
      `- [Home](${absoluteUrl("/")}): what the app is, how a session works, features, Plus and FAQ`,
      `- [All guides](${absoluteUrl("/guides/")})`,
      `- [Privacy Policy](${absoluteUrl("/privacy/")})`,
      `- [Terms of Use](${absoluteUrl("/terms/")})`,
      "",
      "## Optional",
      "",
      `- [Full text of every guide](${absoluteUrl("/llms-full.txt")})`,
      "",
    );
  }
  return out.join("\n");
}

export function textResponse(body: string): Response {
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
