// Small authored icons for the app demos: 24px grid, 2px round strokes, currentColor.
// Item art (bottle cap, roach, pocket watch, plush mouse) is drawn flat in the room palette.

type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...stroke} d="M9 4h6M10 4v5l-3 4h10l-3-4V4M12 13v7" />
    </svg>
  );
}

export function PawIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g fill="currentColor">
        <ellipse cx="7" cy="9" rx="2" ry="2.6" />
        <ellipse cx="12" cy="6.5" rx="2" ry="2.6" />
        <ellipse cx="17" cy="9" rx="2" ry="2.6" />
        <path d="M12 11.5c3 0 5.5 3.2 5.5 5.4 0 1.8-1.6 2.6-3 2.2-1-.3-1.6-.6-2.5-.6s-1.5.3-2.5.6c-1.4.4-3-.4-3-2.2 0-2.2 2.5-5.4 5.5-5.4z" />
      </g>
    </svg>
  );
}

export function CoinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="#f2d27a" stroke="#a8613f" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" fill="none" stroke="#a8613f" strokeWidth="1.6" />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" fill="currentColor" />
      <path {...stroke} d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function SpeakerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" />
      <path {...stroke} d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
    </svg>
  );
}

export function DropIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M12 3.5c3 4.2 5.5 7.4 5.5 10.2a5.5 5.5 0 0 1-11 0c0-2.8 2.5-6 5.5-10.2z" />
    </svg>
  );
}

export function FlameIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3c.6 3 4.5 5 4.5 9.5A4.5 4.5 0 0 1 12 17a4.5 4.5 0 0 1-4.5-4.5c0-2 1-3.3 2-4.3.2 1.6 1 2.5 1.8 2.8C11.3 8.5 11 6 12 3z"
      />
      <path {...stroke} d="M7 20h10" />
    </svg>
  );
}

export function CupIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...stroke} d="M5 9h11v4a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 5.5v1.5M11 4.5v2.5" />
    </svg>
  );
}

export function WaveIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...stroke} d="M3 10c2.5-2.5 4.5-2.5 6 0s3.5 2.5 6 0 4.5-2.5 6 0M3 15c2.5-2.5 4.5-2.5 6 0s3.5 2.5 6 0 4.5-2.5 6 0" />
    </svg>
  );
}

export function TreeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M12 3l6 8h-3l4 6H5l4-6H6z" />
      <path {...stroke} d="M12 17v4" />
    </svg>
  );
}

export function BoltIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...stroke} d="M7 12a4 4 0 0 1 .5-8 5 5 0 0 1 9.4 1.6A3.3 3.3 0 0 1 17 12" />
      <path fill="currentColor" d="M12.5 11l-3 5h2.5l-1 5 4-6.5h-2.6l1.6-3.5z" />
    </svg>
  );
}

export function StopwatchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle {...stroke} cx="12" cy="13.5" r="7" />
      <path {...stroke} d="M12 13.5V10M10 3.5h4" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...stroke} d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...stroke} d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...stroke} strokeWidth={2.6} d="M6 12.5l4 4 8-9" />
    </svg>
  );
}

export function MessageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...stroke} d="M5 6h14v9H10l-4 3.5V15H5z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect {...stroke} x="4" y="6" width="16" height="12" rx="2" />
      <path {...stroke} d="M4.5 7l7.5 6 7.5-6" />
    </svg>
  );
}

export function LinkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path {...stroke} d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </svg>
  );
}

// Items

export function BottleCapArt({ className }: IconProps) {
  const teeth = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {teeth.map((a) => (
        <circle key={a} cx={24 + 17 * Math.cos((a * Math.PI) / 180)} cy={24 + 17 * Math.sin((a * Math.PI) / 180)} r="3.4" fill="#b5704f" />
      ))}
      <circle cx="24" cy="24" r="17" fill="#c4473a" />
      <circle cx="24" cy="24" r="11" fill="#f2efe0" />
      <path fill="#c4473a" d="M24 16.5l2.2 4.6 5 .6-3.7 3.4 1 5-4.5-2.5-4.5 2.5 1-5-3.7-3.4 5-.6z" />
    </svg>
  );
}

export function RoachArt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path stroke="#3a2a1e" strokeWidth="1.8" strokeLinecap="round" fill="none" d="M18 18l-6-4M30 18l6-4M17 25l-7 1M31 25l7 1M18 31l-5 5M30 31l5 5M21 11l-4-6M27 11l4-6" />
      <ellipse cx="24" cy="25" rx="8" ry="12" fill="#8a5a36" />
      <path stroke="#5c3a22" strokeWidth="1.6" fill="none" d="M24 15v21" />
      <ellipse cx="24" cy="13.5" rx="5" ry="4" fill="#5c3a22" />
    </svg>
  );
}

export function PocketWatchArt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="8" r="3.5" fill="none" stroke="#a8613f" strokeWidth="2.2" />
      <rect x="22" y="10" width="4" height="4" rx="1" fill="#a8613f" />
      <circle cx="24" cy="28" r="15" fill="#d9a441" />
      <circle cx="24" cy="28" r="11.5" fill="#f2efe0" />
      <path stroke="#2c3f29" strokeWidth="2" strokeLinecap="round" d="M24 28v-7M24 28l5 3" />
    </svg>
  );
}

export function PlushMouseArt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path stroke="#8a8a80" strokeWidth="2" strokeLinecap="round" fill="none" d="M37 33c5 1 7-3 5-6" />
      <ellipse cx="24" cy="30" rx="14" ry="10" fill="#9a9a90" />
      <circle cx="14" cy="20" r="6" fill="#9a9a90" />
      <circle cx="14" cy="20" r="3.4" fill="#d9a3a0" />
      <circle cx="11" cy="31" r="1.6" fill="#2c3f29" />
    </svg>
  );
}
