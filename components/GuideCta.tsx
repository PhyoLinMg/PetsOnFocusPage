import Image from "next/image";
import Link from "next/link";
import appIcon from "@/assets/app-icon.webp";
import { AppleDevicesIcon, ComingSoonChip, GooglePlayBadge } from "@/components/StoreBadges";
import { STORE_LINKS } from "@/lib/site";

// The download box in a guide: once in the middle, once at the end. A store with a STORE_LINKS entry gets its badge.
export function GuideCta({ variant }: { variant: "middle" | "end" }) {

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
          {STORE_LINKS.android ? (
            <GooglePlayBadge href={STORE_LINKS.android} />
          ) : (
            <ComingSoonChip platform="Android" />
          )}
          {/* No App Store badge is bundled yet: when STORE_LINKS.ios is set, add Apple's official badge here. */}
          {STORE_LINKS.ios ? (
            <a href={STORE_LINKS.ios} className="button" target="_blank" rel="noopener">
              Download on the App Store
            </a>
          ) : (
            <ComingSoonChip platform="iPhone and iPad" icon={<AppleDevicesIcon className="soon-chip-icon" />} />
          )}
          <Link href="/" className="guide-cta-more">
            See the app →
          </Link>
        </p>
      </div>
    </aside>
  );
}
