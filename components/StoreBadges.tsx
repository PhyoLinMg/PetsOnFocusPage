import Image from "next/image";
import playBadge from "@/assets/google-play-badge.png";

// Google's own "Get it on Google Play" badge (play.google.com/intl/en_us/badges), cropped to the badge and otherwise
// unaltered, as Google's brand rules ask. Opens the listing in a new tab.
export function GooglePlayBadge({ href, className }: { href: string; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" className={`play-badge ${className ?? ""}`.trim()}>
      <Image src={playBadge} alt="Get it on Google Play" className="play-badge-art" />
    </a>
  );
}

// A phone and a tablet in outline, for "iPhone and iPad". Not Apple's logo: Apple allows that only inside its own
// App Store badge, which is for apps already on the App Store. One stroke, round caps, drawn in the text colour.
export function AppleDevicesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 30 20"
      width="30"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* iPhone: tall, narrow, a short speaker line at the top. */}
      <rect x="1.9" y="2.9" width="8.2" height="14.2" rx="2.2" />
      <path d="M5 5.4h2" />
      {/* iPad: wider, a home-dot near the bottom edge. */}
      <rect x="13.4" y="0.9" width="14.7" height="18.2" rx="2.4" />
      <path d="M20.75 16.2h0.01" strokeWidth="2.2" />
    </svg>
  );
}

// A store not out yet: the same two-line shape as Google's badge ("GET IT ON" / "Google Play"), but an outline and
// not a link. The colours come from the surrounding note or card (globals.css, .soon-chip).
export function ComingSoonChip({ platform, icon }: { platform: string; icon?: React.ReactNode }) {
  return (
    <span className="soon-chip">
      {icon}
      <span className="soon-chip-words">
        <span className="soon-chip-kicker">Coming soon</span>
        <span className="soon-chip-name">{platform}</span>
      </span>
    </span>
  );
}
