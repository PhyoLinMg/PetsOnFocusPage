import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { readLegalDoc } from "@/lib/legal";
import { OG_IMAGE, absoluteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { title } = await readLegalDoc("terms");
  return {
    title,
    description: `${title} for the Pets on Focus app.`,
    alternates: { canonical: absoluteUrl("/terms/") },
    openGraph: { title, url: absoluteUrl("/terms/"), images: [OG_IMAGE] },
  };
}

export default async function TermsPage() {
  return <LegalPage doc={await readLegalDoc("terms")} />;
}
