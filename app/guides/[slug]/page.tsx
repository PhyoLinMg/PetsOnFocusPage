import type { Metadata } from "next";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { GuideCta } from "@/components/GuideCta";
import { formatDay, listGuides, readGuide } from "@/lib/guides";
import { AUTHOR, LOGO, OG_IMAGE, SITE_NAME, absoluteUrl, openGraphFor } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await listGuides()).map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = await readGuide(slug);
  const path = `/guides/${slug}/`;
  // Google cuts titles near 60 characters: keep " — Pets on Focus" only when the whole thing still fits.
  const branded = `${g.title} — ${SITE_NAME}`;
  return {
    title: { absolute: branded.length <= 60 ? branded : g.title },
    description: g.description,
    keywords: g.keywords,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: openGraphFor({ title: g.title, description: g.description, path }),
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [g, all] = await Promise.all([readGuide(slug), listGuides()]);
  const url = absoluteUrl(`/guides/${slug}/`);
  // Three other guides at the foot of every page, so each new guide is linked from the ones before it.
  const related = all.filter((o) => o.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: g.title,
        description: g.description,
        url,
        mainEntityOfPage: url,
        image: OG_IMAGE.url,
        datePublished: g.published.toISOString().slice(0, 10),
        dateModified: g.updated.toISOString().slice(0, 10),
        inLanguage: "en",
        keywords: g.keywords.join(", "),
        author: { "@type": "Person", name: AUTHOR },
        publisher: { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: SITE_NAME, logo: { "@type": "ImageObject", url: LOGO.url } },
        about: { "@id": absoluteUrl("/#app") },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Guides", item: absoluteUrl("/guides/") },
          { "@type": "ListItem", position: 3, name: g.title, item: url },
        ],
      },
      // The guide's "Common questions" section, word for word.
      ...(g.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: g.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ]
        : []),
    ],
  };

  return (
    <article className="container guide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav aria-label="Breadcrumb" className="guide-crumbs">
        <Link href="/guides/">Guides</Link>
      </nav>
      <h1>{g.title}</h1>
      <p className="guide-meta">
        {AUTHOR} · {g.updated > g.published ? `Updated ${formatDay(g.updated)}` : formatDay(g.published)}
      </p>
      {g.parts.map((part, i) => (
        <div key={i}>
          <Markdown remarkPlugins={[remarkGfm]}>{part}</Markdown>
          {i < g.parts.length - 1 && <GuideCta variant="middle" />}
        </div>
      ))}
      <GuideCta variant="end" />
      {related.length > 0 && (
        <section className="guide-related" aria-labelledby="related-title">
          <h2 id="related-title">More guides</h2>
          <ul>
            {related.map((o) => (
              <li key={o.slug}>
                <Link href={`/guides/${o.slug}/`}>{o.title}</Link>
                <p>{o.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
