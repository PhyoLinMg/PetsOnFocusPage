import Markdown from "react-markdown";
import type { LegalDoc } from "@/lib/legal";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <article className="container legal">
      <Markdown>{doc.body}</Markdown>
    </article>
  );
}
