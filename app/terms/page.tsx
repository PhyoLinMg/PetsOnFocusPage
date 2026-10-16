import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { readLegalDoc } from "@/lib/legal";
import { absoluteUrl, openGraphFor } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { title } = await readLegalDoc("terms");
  const description = `${title} for the Pets on Focus app.`;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl("/terms/") },
    openGraph: openGraphFor({ title, description, path: "/terms/" }),
  };
}

export default async function TermsPage() {
  return <LegalPage doc={await readLegalDoc("terms")} />;
}
