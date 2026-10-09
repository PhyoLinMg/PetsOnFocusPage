"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import catCelebrating from "@/assets/pets/cat_celebrating.webp";
import type { PetPose } from "../RoomScene";
import {
  BoltIcon,
  BottleCapArt,
  CheckIcon,
  ChevronIcon,
  CoinIcon,
  CupIcon,
  DropIcon,
  FlameIcon,
  LinkIcon,
  LockIcon,
  MailIcon,
  MessageIcon,
  PawIcon,
  PinIcon,
  PlusIcon,
  PlushMouseArt,
  PocketWatchArt,
  RoachArt,
  SpeakerIcon,
  StopwatchIcon,
  TreeIcon,
  WaveIcon,
} from "./icons";

// Live re-creations of the app's screens, played inside the room while a stop is
// active. Copy and layout follow the app's own screens; values are demo values.

export type DemoKey =
  | "pick"
  | "session"
  | "pets"
  | "pomodoro"
  | "gift"
  | "leave"
  | "customize"
  | "collection"
  | "sounds"
  | "tasks"
  | "stats"
  | "share";

/** "hud" sits on the wall above the pet; "sheet" is an app panel beside the room. */
export const DEMO_LAYOUT: Record<DemoKey, "hud" | "sheet"> = {
  pick: "hud",
  session: "hud",
  pets: "hud",
  pomodoro: "hud",
  gift: "sheet",
  leave: "sheet",
  customize: "sheet",
  collection: "sheet",
  sounds: "sheet",
  tasks: "sheet",
  stats: "sheet",
  share: "sheet",
};

export type RoomLook = { wall?: "slate"; rug?: "striped"; night?: boolean };

type Controls = {
  setPose: (pose: PetPose) => void;
  setRoom: (look: RoomLook) => void;
};

type DemoProps = { active: boolean; reduce: boolean } & Controls;

const PET = "Bramble";

// ---------- hooks ----------

/** Steps through `durations` while active (looping if asked); the last step when motion is reduced. */
function useSteps(active: boolean, reduce: boolean, durations: number[], loop = false) {
  const [step, setStep] = useState(0);
  const last = durations.length - 1;
  useEffect(() => {
    if (!active) {
      setStep(0);
      return;
    }
    if (reduce) {
      setStep(last);
      return;
    }
    let i = 0;
    let timer = 0;
    setStep(0);
    const next = () => {
      if (i >= last && !loop) return;
      timer = window.setTimeout(() => {
        i = i >= last ? 0 : i + 1;
        setStep(i);
        next();
      }, durations[i]);
    };
    next();
    return () => window.clearTimeout(timer);
    // `durations` is a literal per demo, so it is left out on purpose.
  }, [active, reduce]);
  return step;
}

/** Milliseconds elapsed since the demo became active (frozen at `still` when motion is reduced). */
function useElapsed(active: boolean, reduce: boolean, still = 0) {
  const [ms, setMs] = useState(0);
  useEffect(() => {
    if (!active) {
      setMs(0);
      return;
    }
    if (reduce) {
      setMs(still);
      return;
    }
    const start = performance.now();
    const id = window.setInterval(() => setMs(performance.now() - start), 50);
    return () => window.clearInterval(id);
  }, [active, reduce, still]);
  return ms;
}

const clock = (seconds: number) => {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

// ---------- shared pieces ----------

function TaskNote({ children }: { children: ReactNode }) {
  return (
    <p className="hud-note">
      <PinIcon className="hud-note-pin" />
      {children}
    </p>
  );
}

// Each character gets a fixed slot so the countdown doesn't wobble as digits change.
function Time({ value }: { value: string }) {
  return (
    <p className="hud-time">
      {value.split("").map((c, i) => (
        <span key={i} data-colon={c === ":" ? "" : undefined}>
          {c}
        </span>
      ))}
    </p>
  );
}

function Sheet({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`app-sheet ${className}`}>{children}</div>;
}

function Rays() {
  return (
    <span className="app-rays" aria-hidden="true">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <i key={a} style={{ transform: `rotate(${a}deg) translateY(-44px)` }} />
      ))}
    </span>
  );
}

function Stat({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="app-stat">
      <span className="app-stat-label">{label}</span>
      <span className="app-stat-value">{children}</span>
    </div>
  );
}

// ---------- HUD demos (on the wall) ----------

function PickDemo({ active, reduce }: DemoProps) {
  const step = useSteps(active, reduce, [1400, 1400, 1400, 1600], true);
  const mode = step === 1 ? "pomodoro" : "single";
  return (
    <div className="hud">
      <Time value="25:00" />
      <TaskNote>Finish the essay draft</TaskNote>
      <div className="hud-toggle" data-mode={mode}>
        <span>Single focus</span>
        <span>Pomodoro</span>
      </div>
      <span className="hud-pill" data-pressed={step === 3 ? "" : undefined}>
        Start
      </span>
    </div>
  );
}

function SessionDemo({ active, reduce }: DemoProps) {
  const ms = useElapsed(active, reduce, 4000);
  return (
    <div className="hud">
      <Time value={clock(25 * 60 - 1 - Math.floor(ms / 1000))} />
      <TaskNote>Finish the essay draft</TaskNote>
      <span className="hud-pill hud-pill--wide">Hold to finish</span>
    </div>
  );
}

const PET_PARADE: { pose: PetPose; name: string; doing: string; coins?: boolean }[] = [
  { pose: "cat-sit", name: "Tabby cat", doing: "sits with you" },
  { pose: "cat-sleep", name: "Tabby cat", doing: "naps" },
  { pose: "cat-celebrating", name: "Tabby cat", doing: "cheers when you finish" },
  { pose: "dog-sit", name: "Golden retriever", doing: "keeps you company" },
  { pose: "rabbit-sit", name: "Holland Lop", doing: "joins with coins", coins: true },
];

function PetsDemo({ active, reduce, setPose }: DemoProps) {
  const step = useSteps(active, reduce, PET_PARADE.map(() => 1700), true);
  const pet = PET_PARADE[reduce ? 0 : step];
  useEffect(() => {
    if (active) setPose(pet.pose);
  }, [active, pet.pose, setPose]);
  return (
    <div className="hud hud--pets">
      <p className="hud-chip hud-chip--name" key={pet.name}>
        {pet.coins && <CoinIcon className="hud-chip-coin" />}
        <strong>{pet.name}</strong>
        <span>{pet.doing}</span>
      </p>
    </div>
  );
}

const POMODORO: { kind: "work" | "short" | "long"; cycle?: number; seconds: number; ms: number }[] = [
  { kind: "work", cycle: 1, seconds: 25 * 60, ms: 1700 },
  { kind: "short", seconds: 5 * 60, ms: 900 },
  { kind: "work", cycle: 2, seconds: 25 * 60, ms: 1700 },
  { kind: "short", seconds: 5 * 60, ms: 900 },
  { kind: "work", cycle: 3, seconds: 25 * 60, ms: 1700 },
  { kind: "short", seconds: 5 * 60, ms: 900 },
  { kind: "work", cycle: 4, seconds: 25 * 60, ms: 1700 },
  { kind: "long", seconds: 15 * 60, ms: 1500 },
];
const POMODORO_MS = POMODORO.reduce((sum, p) => sum + p.ms, 0);

function PomodoroDemo({ active, reduce }: DemoProps) {
  const ms = useElapsed(active, reduce, 600);
  let t = ms % (POMODORO_MS + 900);
  let index = POMODORO.length - 1;
  let progress = 1;
  for (let i = 0; i < POMODORO.length; i++) {
    if (t < POMODORO[i].ms) {
      index = i;
      progress = t / POMODORO[i].ms;
      break;
    }
    t -= POMODORO[i].ms;
  }
  const phase = POMODORO[index];
  const label =
    phase.kind === "work" ? `Cycle ${phase.cycle} of 4 · work` : phase.kind === "short" ? "Short break" : "Long break";
  return (
    <div className="hud">
      <Time value={clock(phase.seconds * (1 - progress))} />
      <p className="hud-chip" data-kind={phase.kind}>
        {label}
      </p>
      <ol className="hud-track">
        {POMODORO.map((p, i) => (
          <li
            key={i}
            data-kind={p.kind}
            data-current={i === index ? "" : undefined}
            style={{ ["--fill" as string]: i < index ? 1 : i === index ? progress : 0 }}
          />
        ))}
      </ol>
      <TaskNote>Finish the essay draft</TaskNote>
    </div>
  );
}

// ---------- sheet demos (app panels) ----------

function GiftDemo({ active, reduce }: DemoProps) {
  const step = useSteps(active, reduce, [900, 700, 0]);
  return (
    <Sheet className="app-sheet--gift">
      <p className="app-sheet-title app-hand">{PET} brought you a gift!</p>
      <div className="app-item" data-shown={step >= 1 ? "" : undefined}>
        <Rays />
        <BottleCapArt className="app-item-art" />
      </div>
      <span className="app-rarity">Common</span>
      <p className="app-item-name app-hand">Bottle Cap</p>
      <p className="app-muted">Shiny. That’s the whole appeal.</p>
      <p className="app-quote">“Look what I found!” — {PET}</p>
      <div className="app-stats">
        <Stat label="Focused">25 min</Stat>
        <Stat label="Coins earned">
          <CoinIcon className="app-coin" /> {step >= 2 ? "+1" : "0"}
        </Stat>
      </div>
      <span className="app-button">Let’s go</span>
      <span className="app-link">Share with friends</span>
    </Sheet>
  );
}

function LeaveDemo({ active, reduce, setPose }: DemoProps) {
  const ms = useElapsed(active, reduce, 6000);
  const left = Math.max(0, 10 - Math.floor(ms / 380));
  const over = left === 0;
  useEffect(() => {
    if (active) setPose(over ? "cat-disappointed" : "cat-sleep");
  }, [active, over, setPose]);
  return (
    <div className="app-leave" data-over={over ? "" : undefined}>
      <div className="app-notice">
        <span className="app-notice-icon">
          <PawIcon />
        </span>
        <span className="app-notice-text">
          <strong>
            You’re leaving your focus session <em>· now</em>
          </strong>
          <span>Come back within 10 seconds or this session ends.</span>
        </span>
        <span className="app-notice-count" style={{ ["--left" as string]: left / 10 }}>
          {left}
        </span>
      </div>
      <Sheet className="app-sheet--leave">
        <p className="app-sheet-title app-hand">{PET} dragged this in instead.</p>
        <div className="app-item" data-shown={over ? "" : undefined}>
          <Rays />
          <RoachArt className="app-item-art" />
        </div>
        <span className="app-rarity">Trash</span>
        <p className="app-item-name app-hand">Roach</p>
        <p className="app-muted">Impossible to get rid of!</p>
        <p className="app-quote">“…I found this instead.” — {PET}</p>
        <div className="app-stats">
          <Stat label="Session">Ended early</Stat>
          <Stat label="Coins earned">
            <CoinIcon className="app-coin" /> 0
          </Stat>
        </div>
        <span className="app-button">Fine</span>
      </Sheet>
    </div>
  );
}

function CustomizeDemo({ active, reduce, setRoom }: DemoProps) {
  const step = useSteps(active, reduce, [1200, 1300, 1200, 1300, 1400]);
  useEffect(() => {
    if (!active) return;
    setRoom({ wall: step >= 1 ? "slate" : undefined, rug: step >= 3 ? "striped" : undefined, night: step >= 4 });
    // Leaving the stop puts the room back as it was.
    return () => setRoom({});
  }, [active, step, setRoom]);
  const tab = step < 2 ? "Wallpaper" : "Furniture";
  const items =
    tab === "Wallpaper"
      ? [
          { name: "Sage", swatch: "sage", on: step < 1 },
          { name: "Slate", swatch: "slate", on: step >= 1 },
          { name: "Linen", swatch: "linen", locked: true },
        ]
      : [
          { name: "Oval rug", swatch: "oval", on: step < 3 },
          { name: "Striped rug", swatch: "striped", on: step >= 3 },
          { name: "Fish rug", swatch: "fish", locked: true },
        ];
  return (
    <Sheet className="app-sheet--list">
      <div className="app-head">
        <p className="app-head-title">Customize</p>
        <span className="app-balance">
          <CoinIcon className="app-coin" /> 641
        </span>
      </div>
      <div className="app-tabs">
        {["Pet", "Wallpaper", "Furniture", "Lighting"].map((t) => (
          <span key={t} data-on={t === tab ? "" : undefined}>
            {t}
          </span>
        ))}
      </div>
      <p className="app-label">{tab === "Wallpaper" ? "Wallpaper" : "Rug"}</p>
      <div className="app-grid">
        {items.map((item) => (
          <div key={item.name} className="app-tile" data-on={item.on ? "" : undefined}>
            {item.on && (
              <span className="app-tile-check">
                <CheckIcon />
              </span>
            )}
            {item.locked && <LockIcon className="app-tile-lock" />}
            <span className={`app-swatch app-swatch--${item.swatch}`} />
            <strong>{item.name}</strong>
            <span>{item.on ? "Equipped" : item.locked ? "Shop ›" : "Tap to equip"}</span>
          </div>
        ))}
      </div>
      <p className="app-foot">The window follows the time of day: {step >= 4 ? "moon at night." : "sun by day."}</p>
    </Sheet>
  );
}

const FINDS: { rarity: string; found?: string }[] = [
  { rarity: "Rare" },
  { rarity: "Uncommon" },
  { rarity: "Uncommon" },
  { rarity: "Common", found: "Bottle Cap" },
  { rarity: "Common" },
];

function CollectionDemo({ active, reduce }: DemoProps) {
  const step = useSteps(active, reduce, [700, 1200, 400]);
  const found = step >= 2;
  return (
    <Sheet className="app-sheet--list">
      <div className="app-head">
        <ChevronIcon className="app-back" />
        <p className="app-head-title">Collection</p>
      </div>
      <div className="app-summary">
        <span className="app-ring">
          <svg viewBox="0 0 54 54" aria-hidden="true">
            <circle cx="27" cy="27" r="23" />
            <circle cx="27" cy="27" r="23" pathLength={100} strokeDasharray={`${(found ? 2 / 7 : 1 / 7) * 100} 100`} />
          </svg>
          <b>{found ? 2 : 1}/7</b>
        </span>
        <span>
          <strong>{found ? 2 : 1} of 7 found</strong>
          <span className="app-muted">2 come from streaks, 5 from sessions.</span>
        </span>
      </div>
      <p className="app-label">Streak rewards</p>
      <div className="app-rows">
        <div className="app-row">
          <PocketWatchArt className="app-row-art" />
          <span>
            <strong>Tarnished Pocket Watch</strong>
            <span>
              <em className="rarity-epic">Epic</em> · earned at a 7-day streak
            </span>
            <i className="app-bar app-bar--epic" style={{ ["--p" as string]: step >= 1 ? 1 : 0 }} />
          </span>
        </div>
        <div className="app-row">
          <PlushMouseArt className="app-row-art app-row-art--locked" />
          <span>
            <strong>Plush Mouse</strong>
            <span>
              <em className="rarity-legendary">Legendary</em> · 30-day streak · day 7 of 30
            </span>
            <i className="app-bar app-bar--legendary" style={{ ["--p" as string]: step >= 1 ? 7 / 30 : 0 }} />
          </span>
        </div>
      </div>
      <p className="app-label">Session finds</p>
      <div className="app-finds">
        {FINDS.map((f, i) => (
          <div key={i} className="app-find" data-found={f.found && found ? "" : undefined}>
            {f.found && found ? <BottleCapArt className="app-find-art" /> : <span className="app-find-q">?</span>}
            <strong>{f.found && found ? f.found : "Not found yet"}</strong>
            <span className={`rarity-${f.rarity.toLowerCase()}`}>{f.rarity}</span>
          </div>
        ))}
      </div>
    </Sheet>
  );
}

const SOUNDS = [
  { name: "Cat Purring", icon: PawIcon, to: 78 },
  { name: "Rain", icon: DropIcon, to: 34 },
  { name: "Fireplace", icon: FlameIcon, to: 60 },
];

function SoundsDemo({ active, reduce }: DemoProps) {
  const ms = useElapsed(active, reduce, 9000);
  return (
    <Sheet className="app-sheet--list">
      <div className="app-head">
        <p className="app-head-title">Sound Mix</p>
        <span className="app-count">3 of 3</span>
        <span className="app-round">
          <SpeakerIcon />
        </span>
      </div>
      <p className="app-label">Playing</p>
      <div className="app-rows">
        {SOUNDS.map((s, i) => {
          const t = Math.min(1, Math.max(0, (ms - 300 - i * 700) / 900));
          const v = Math.round(s.to * (1 - (1 - t) ** 3));
          const Icon = s.icon;
          return (
            <div key={s.name} className="app-row app-row--sound">
              <span className="app-row-icon">
                <Icon />
              </span>
              <span>
                <strong>{s.name}</strong>
                <i className="app-slider" style={{ ["--p" as string]: v / 100 }} />
              </span>
              <span className="app-pct">{v}%</span>
            </div>
          );
        })}
      </div>
      <p className="app-label">Add a sound</p>
      <div className="app-chips">
        <span>
          <CupIcon />
          Cafe<em>At 3</em>
        </span>
        <span>
          <WaveIcon />
          Ocean<em><LockIcon /> Plus</em>
        </span>
        <span>
          <TreeIcon />
          Forest<em><LockIcon /> Plus</em>
        </span>
        <span>
          <BoltIcon />
          Thunder<em><LockIcon /> Plus</em>
        </span>
      </div>
      <p className="app-foot">3 sounds at once is the most.</p>
    </Sheet>
  );
}

function TasksDemo({ active, reduce }: DemoProps) {
  const step = useSteps(active, reduce, [900, 1200, 1400]);
  const typed = "Evening walk".slice(0, step >= 1 ? 12 : 0);
  const pinned = step >= 2;
  const tasks = [
    { title: "Finish the essay draft", tag: "study", pin: pinned },
    { title: "Read chapter 4", tag: "study" },
    { title: "Plan tomorrow", tag: "work" },
  ];
  return (
    <Sheet className="app-sheet--list">
      <div className="app-head">
        <ChevronIcon className="app-back" />
        <p className="app-head-title">Tasks</p>
        <span className="app-round app-round--light">
          <PlusIcon />
        </span>
      </div>
      <div className="app-label app-label--split">
        <span>To do</span>
        <span>
          {step >= 1 ? 4 : 3} tasks · {pinned ? 1 : 0} pinned
        </span>
      </div>
      <div className="app-rows app-rows--tasks">
        {tasks.map((t) => (
          <div key={t.title} className="app-task" data-pinned={t.pin ? "" : undefined}>
            <span className="app-task-box" />
            <PinIcon className="app-task-pin" />
            <span>
              <strong>{t.title}</strong>
              <span className="app-task-meta">
                {t.pin && <em>Pinned — shown on home</em>}
                <span className="app-tag"># {t.tag}</span>
              </span>
            </span>
          </div>
        ))}
        <div className="app-task app-task--new" data-new={step >= 1 ? "" : undefined}>
          <span className="app-task-box" />
          <PinIcon className="app-task-pin" />
          <span>
            <strong>{typed}</strong>
            <span className="app-task-meta">
              <span className="app-tag"># health</span>
            </span>
          </span>
        </div>
      </div>
    </Sheet>
  );
}

const WEEK = [
  { day: "S", min: 38 },
  { day: "S", min: 55 },
  { day: "M", min: 41 },
  { day: "T", min: 37 },
  { day: "W", min: 45 },
  { day: "T", min: 45 },
  { day: "F", min: 24 },
];

function StatsDemo({ active, reduce }: DemoProps) {
  const ms = useElapsed(active, reduce, 9000);
  const grow = Math.min(1, ms / 1400);
  const ease = 1 - (1 - grow) ** 3;
  const minutes = Math.round(285 * ease);
  const streak = Math.min(7, Math.max(1, Math.floor(ms / 220)));
  const reward = ms > 2400;
  return (
    <Sheet className="app-sheet--list app-sheet--stats">
      <div className="app-head">
        <ChevronIcon className="app-back" />
        <p className="app-head-title">Stats</p>
      </div>
      <div className="app-card">
        <p className="app-label app-label--tight">This week</p>
        <p className="app-big">
          {Math.floor(minutes / 60)} hr {minutes % 60} min
        </p>
        <p className="app-muted">across 7 of 7 days</p>
        <div className="app-bars">
          {WEEK.map((d, i) => (
            <span key={i} className="app-bar-col" data-today={i === WEEK.length - 1 ? "" : undefined}>
              {d.min === 55 && <em style={{ opacity: ease }}>55</em>}
              <i style={{ ["--h" as string]: (d.min / 55) * ease }} />
              <b>{d.day}</b>
            </span>
          ))}
        </div>
      </div>
      <div className="app-stats">
        <div className="app-stat app-stat--icon">
          <span className="app-stat-label">
            <PawIcon className="app-stat-icon" /> Streak
          </span>
          <span className="app-stat-value">{streak} days</span>
          <span className="app-muted">Keep it going today</span>
        </div>
        <div className="app-stat app-stat--icon">
          <span className="app-stat-label">
            <StopwatchIcon className="app-stat-icon" /> Average
          </span>
          <span className="app-stat-value">40 min</span>
          <span className="app-muted">per active day</span>
        </div>
      </div>
      <div className="app-reward" data-shown={reward ? "" : undefined}>
        <PocketWatchArt className="app-row-art" />
        <span>
          <strong>Tarnished Pocket Watch</strong>
          <span>
            <em className="rarity-epic">Epic</em> · 7-day streak reward
          </span>
        </span>
      </div>
    </Sheet>
  );
}

function ShareDemo({ active, reduce }: DemoProps) {
  const step = useSteps(active, reduce, [500, 900, 600]);
  return (
    <div className="app-share" data-step={step}>
      <div className="share-card">
        <div className="share-scene">
          <span className="share-floor" />
          <span className="share-rug" />
          <Image src={catCelebrating} alt="" className="share-pet" sizes="120px" loading="eager" />
        </div>
        <p className="share-time">25 min</p>
        <p className="share-line">focused with {PET}</p>
        <p className="share-task">
          <PinIcon className="share-pin" /> Finish the essay draft
        </p>
        <p className="share-mark">Pets on Focus</p>
      </div>
      <div className="share-targets">
        {[
          { label: "Message", Icon: MessageIcon },
          { label: "Mail", Icon: MailIcon },
          { label: "Copy link", Icon: LinkIcon },
        ].map(({ label, Icon }) => (
          <span key={label}>
            <i>
              <Icon />
            </i>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

const DEMOS: Record<DemoKey, (props: DemoProps) => ReactNode> = {
  pick: PickDemo,
  session: SessionDemo,
  pets: PetsDemo,
  pomodoro: PomodoroDemo,
  gift: GiftDemo,
  leave: LeaveDemo,
  customize: CustomizeDemo,
  collection: CollectionDemo,
  sounds: SoundsDemo,
  tasks: TasksDemo,
  stats: StatsDemo,
  share: ShareDemo,
};

/** Every demo stays mounted (so it can be measured); only the active one plays and shows. */
export function Demos({ active, reduce, ...controls }: { active: DemoKey | null; reduce: boolean } & Controls) {
  return (
    <div className="demo-layer">
      {(Object.keys(DEMOS) as DemoKey[]).map((key) => {
        const Demo = DEMOS[key];
        return (
          <div key={key} className="demo" data-demo={key} data-active={active === key ? "" : undefined}>
            <Demo active={active === key} reduce={reduce} {...controls} />
          </div>
        );
      })}
    </div>
  );
}
