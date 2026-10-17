import type { SVGProps } from "react";

// The three Plus perks, drawn as the app draws them (diorama spec, section 27, approved 2026-10-17): flat
// fills, no outlines, no shadows. They sit on the dark cards of the Plus section. Decorative only: each perk's
// words carry the meaning.

/** WallArtInk.FrozenBlue: the wall calendar's ink while a day is frozen. Only ever on the calendar's page. */
const FROZEN = "#2b4a63";
const PAGE = "#f7f3e6";
const INK = "#2c3f29";

/** The room's coin jar coins. */
const GOLD = "#e6c352";
const GOLD_EDGE = "#c9a53a";

/** The Stats card's day cells: no minutes, then thirds of the best day (accent 30%, 60%, 100% over the card). */
const LEVELS = ["#2e2e2b", "#434e39", "#62764f", "#8aac6c"];
const ACCENT = "#8aac6c";
/** The app's muted text on its dark cards; draws the snowflake in a frozen cell. */
const ON_MUTED = "#98989e";

/** The frozen-day mark: a hand-drawn snowflake for a 28-unit cell, the same strokes in Stats and on the wall. */
function Snowflake(props: SVGProps<SVGGElement>) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.2 4.8c-.3 3.1.2 6.4-.1 9.3-.2 3 .1 6.1-.3 9.1" />
      <path d="M6.1 9.4c3 1.6 5.3 3.4 8 4.6 2.6 1.4 5.2 3.1 7.8 4.7" />
      <path d="M6.4 18.9c2.7-1.7 5.1-3.2 7.7-4.6 2.6-1.5 5-3.3 7.6-5" />
      <path d="M11.9 7.3l2.3-2.5 2.4 2.2" />
      <path d="M11.7 20.7l2.1 2.5 2.5-2.2" />
      <path d="M6 12.4l.1-3 2.9-.6" />
      <path d="M22.1 15.6l-.2 3.1-3 .5" />
      <path d="M6.2 15.9l.2 3 3 .4" />
      <path d="M18.9 9.8l2.8-.5.2 3" />
    </g>
  );
}

/** A stack of coins, bottom first, so each coin covers all but the rim of the one below. */
function Stack({ cx, count }: { cx: number; count: number }) {
  return (
    <g fill={GOLD} stroke={GOLD_EDGE} strokeWidth="3">
      {Array.from({ length: count }, (_, i) => (
        <ellipse key={i} cx={cx} cy={112 - i * 8} rx="25" ry="9" />
      ))}
    </g>
  );
}

/** Double coins: 5 coins for a 25-minute session, 10 with Plus. */
export function DoubleCoins() {
  return (
    <svg viewBox="0 0 180 124" aria-hidden="true">
      <Stack cx={36} count={5} />
      <Stack cx={100} count={10} />
      <text className="plus-art-hand" x="156" y="60" fontSize="34" fontWeight="700" fill="#f2efe0" textAnchor="middle">
        ×2
      </text>
    </svg>
  );
}

/** The streak freeze: the room's wall calendar the morning after a missed day (the app's V1 frozen look). */
export function FrozenCalendar() {
  return (
    <svg viewBox="0 0 100 118" aria-hidden="true">
      <circle cx="50" cy="5" r="4" fill={FROZEN} />
      <rect x="4" y="9" width="92" height="108" rx="3" fill={PAGE} />
      <rect x="4" y="9" width="92" height="22" rx="3" fill={FROZEN} />
      <g className="plus-art-hand" textAnchor="middle">
        <text x="50" y="25" fontSize="11" fontWeight="700" fill={PAGE}>
          streak
        </text>
        <text x="56" y="74" fontSize="38" fontWeight="700" fill={INK}>
          6
        </text>
        <text x="50" y="90" fontSize="10" fill={FROZEN}>
          frozen yesterday
        </text>
      </g>
      <Snowflake transform="translate(22 46) scale(0.6)" stroke={FROZEN} strokeWidth="2.4" />
      {[17, 28, 39, 50, 61, 72, 83].map((cx, i) => (
        <circle key={cx} cx={cx} cy="104" r="4" fill={i < 6 ? FROZEN : "none"} stroke={FROZEN} strokeWidth="1.5" />
      ))}
    </svg>
  );
}

// The app's sample month (spec, section 27): 25 of 35 days with focus, yesterday frozen, today last.
// One row per week, oldest first; 0-3 is the shade, F the frozen day.
const MONTH = ["0201213", "2121213", "1002102", "0013100", "12121F1"];
const CELL = 28;
const GAP = 4;

/** Deeper stats: the "Last 5 weeks" card's calendar, 7 columns by 5 weeks, today ringed. */
export function FiveWeeks() {
  const cells = MONTH.flatMap((week, row) => Array.from(week, (level, col) => ({ level, row, col })));
  return (
    <svg viewBox="-4 -4 228 164" aria-hidden="true">
      {cells.map(({ level, row, col }, i) => {
        const x = col * (CELL + GAP);
        const y = row * (CELL + GAP);
        const frozen = level === "F";
        return (
          <g key={i}>
            <rect x={x} y={y} width={CELL} height={CELL} rx="6" fill={LEVELS[frozen ? 0 : Number(level)]} />
            {frozen && <Snowflake transform={`translate(${x} ${y})`} stroke={ON_MUTED} strokeWidth="1.7" />}
            {i === cells.length - 1 && (
              <rect x={x - 2.25} y={y - 2.25} width={CELL + 4.5} height={CELL + 4.5} rx="8.25" fill="none" stroke={ACCENT} strokeWidth="1.5" />
            )}
          </g>
        );
      })}
    </svg>
  );
}
