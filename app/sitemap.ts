import type { MetadataRoute } from "next";
import { readLegalDoc } from "@/lib/legal";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [privacy, terms] = await Promise.all([readLegalDoc("privacy"), readLegalDoc("terms")]);
  return [
    // The home page changes with every deploy, so its date is the build date.
    { url: absoluteUrl("/"), lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    // The legal pages carry their own "Last updated" line.
    { url: absoluteUrl("/privacy/"), lastModified: privacy.updated, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms/"), lastModified: terms.updated, changeFrequency: "yearly", priority: 0.3 },
  ];
}
