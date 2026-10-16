import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { readLegalDoc } from "@/lib/legal";
import { absoluteUrl, openGraphFor } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { title } = await readLegalDoc("privacy");
  const description = `${title} for the Pets on Focus app.`;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl("/privacy/") },
    openGraph: openGraphFor({ title, description, path: "/privacy/" }),
  };
}

export default async function PrivacyPage() {
  return <LegalPage doc={await readLegalDoc("privacy")} />;
}
