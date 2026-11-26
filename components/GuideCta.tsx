import Image from "next/image";
import Link from "next/link";
import appIcon from "@/assets/app-icon.webp";
import { STORE_LINKS } from "@/lib/site";

// The download box in a guide: once in the middle, once at the end. Store buttons appear when STORE_LINKS has them.
export function GuideCta({ variant }: { variant: "middle" | "end" }) {
  const stores = [
    STORE_LINKS.android && { href: STORE_LINKS.android, label: "Get it on Google Play" },
    STORE_LINKS.ios && { href: STORE_LINKS.ios, label: "Download on the App Store" },
  ].filter((s): s is { href: string; label: string } => Boolean(s));
  const comingSoon = [!STORE_LINKS.android && "Google Play", !STORE_LINKS.ios && "the App Store"]
    .filter(Boolean)
    .join(" and ");

  return (
    <aside className={`guide-cta guide-cta--${variant}`} aria-label="Pets on Focus app">
      <Image src={appIcon} alt="Pets on Focus app icon" aria-hidden width={56} height={56} className="guide-cta-icon" />
      <div className="guide-cta-text">
        <p className="guide-cta-title">
          {variant === "end" ? "Focus together with Pets on Focus" : "A focus timer with a pet beside you"}
        </p>
        <p>
          Pets on Focus is a calm focus timer and Pomodoro app. Your pet settles in while you work, and you earn coins
          for its room when you finish.{" "}
          {STORE_LINKS.ios ? "Free on Android, iPhone and iPad." : "Free on Android; iPhone and iPad are on the way."}
        </p>
        <p className="guide-cta-actions">
          {stores.map((s) => (
            <a key={s.href} href={s.href} className="button">
              {s.label}
            </a>
          ))}
          {comingSoon && <span className="guide-cta-soon">Coming soon to {comingSoon}</span>}
          <Link href="/" className="guide-cta-more">
            See the app →
          </Link>
        </p>
      </div>
    </aside>
  );
}
