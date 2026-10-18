import type { Metadata } from "next";
import Link from "next/link";
import { formatDay, listGuides } from "@/lib/guides";
import { absoluteUrl, openGraphFor } from "@/lib/site";

const title = "Guides to focus, study and Pomodoro";
const description =
  "Short, practical guides to focusing and studying: the Pomodoro technique, focus session lengths, putting the " +
  "phone down, sounds that help, and keeping a streak going.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/guides/") },
  openGraph: openGraphFor({ title, description, path: "/guides/" }),
};

export default async function GuidesIndex() {
  const guides = await listGuides();
  return (
    <section className="container guide guide-index">
      <h1>{title}</h1>
      <p className="guide-lede">{description}</p>
      <ul>
        {guides.map((g) => (
          <li key={g.slug}>
            <Link href={`/guides/${g.slug}/`}>{g.title}</Link>
            <p>{g.description}</p>
            <p className="guide-meta">{formatDay(g.updated)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
