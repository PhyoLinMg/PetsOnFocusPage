"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Wall } from "./Walls";

// The home page tour: the visitor stands in the middle of the pet's room and scrolls through a focus
// session, then turns on the spot to the left wall. The room is a square box seen with a 90 degree field
// of view, so the wall faced fills the screen exactly and its neighbours start at the screen's edges.

/** Shared with globals.css (.tour): wide screens put the note beside the room, narrow ones below it. */
const WIDE = "(min-width: 700px) and (min-aspect-ratio: 1/1)";

type Pose = "sit" | "sleep" | "celebrating";
type Band = { narrow: [number, number]; wide: [number, number] };

// Stops. wall: 0 left, 1 front, 2 right. v: the band of the wall (screenshot px) the screen frames.
// zoom closes in on one object (its phone x and band) by scaling the picture, like a lens.
const STOPS: { wall: 0 | 1 | 2; pose: Pose; v: Band; zoom?: { x: number; v: Band } }[] = [
  { wall: 1, pose: "sit", v: { narrow: [50, 1860], wide: [160, 2060] } },
  { wall: 1, pose: "sleep", v: { narrow: [50, 1860], wide: [160, 2060] } },
  { wall: 1, pose: "celebrating", v: { narrow: [1220, 3030], wide: [1150, 3050] } },
  { wall: 0, pose: "sit", v: { narrow: [-20, 1790], wide: [-60, 1840] } },
  {
    wall: 0,
    pose: "sit",
    v: { narrow: [-20, 1790], wide: [-60, 1840] },
    zoom: { x: 812, v: { narrow: [1250, 1760], wide: [1200, 1760] } },
  },
];

// Scroll length (in screen heights x 100) of each move between stops, and the part of it the move eases
// over; the rest holds still. The session is short so the timer runs out quickly; the turn is long so it
// plays out slowly (owner, 2026-10-15).
const SEGS = [
  { len: 70, ease: [0.3, 0.7] }, // start a session
  { len: 70, ease: [0.3, 0.7] }, // the session ends, a gift
  { len: 220, ease: [0.08, 0.92] }, // turn to the left wall
  { len: 90, ease: [0.3, 0.7] }, // close in on the gift box
];

/** Scales every SEGS length. A phone's swipe moves the page about as far as the thumb travels, so the
 *  full-length tour took too many swipes there (owner, 2026-10-17); wide screens keep the full length. */
const PACE = { narrow: 0.5, wide: 1 };

/** Touch devices (phones, tablets) lay the room out at the size it is shown (--u, see globals.css), so the
 *  browser paints about one screen's worth of it. Laid out larger, Android Chrome left part of the floor
 *  undrawn at the corners mid-turn (2026-10-17). Not CSS zoom: iPhone Safari zooms boxes but not their text. */
const TOUCH = "(pointer: coarse)";

/** Band height every whole-wall stop is sized for; the wall is made as wide as the screen at that scale. */
const BAND = { narrow: 1810, wide: 1900 };
/** Facing each wall, in degrees of turn. */
const YAW = [-90, 0, 90];

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const clock = (sec: number) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;

/** Scroll in screen heights x 100 to a stop position, 0 .. STOPS.length - 1. */
function stopAt(units: number, pace: number) {
  for (let i = 0; i < SEGS.length; i++) {
    const len = SEGS[i].len * pace;
    if (units <= len) return i + Math.max(0, units) / len;
    units -= len;
  }
  return SEGS.length;
}

/** Scroll offset (screen heights x 100) of a stop, where its hold is centred. */
const unitsTo = (stop: number, pace: number) => SEGS.slice(0, stop).reduce((n, g) => n + g.len * pace, 0);

export function RoomTour({ notes }: { notes: { anchor?: string; content: ReactNode }[] }) {
  const tourRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tour = tourRef.current!;
    const track = tour.querySelector<HTMLElement>(".tour-track")!;
    const stage = tour.querySelector<HTMLElement>(".tour-stage")!;
    const scene = tour.querySelector<HTMLElement>(".tour-scene")!;
    const world = tour.querySelector<HTMLElement>(".tour-world")!;
    const walls = Array.from(world.querySelectorAll<HTMLElement>(".room-wall"));
    const halves = walls.map((w) => Array.from(w.querySelectorAll<HTMLElement>(".room-half")));
    const part = (name: string) => Array.from(stage.querySelectorAll<HTMLElement>(`[data-part="${name}"]`));
    const shades = walls.map((w) => Array.from(w.querySelectorAll<HTMLElement>('[data-part="shade"]')));
    const [timers, taskAlts, toggles, starts, sounds, glows, dims, eves, sheets] = [
      "timer", "task-alt", "toggle", "start", "sounds", "glow", "dim", "eve", "sheet",
    ].map(part);
    const poses = Array.from(stage.querySelectorAll<HTMLElement>("[data-pose]"));
    const noteEls = Array.from(stage.querySelectorAll<HTMLElement>(".tour-note"));
    const anchors = Array.from(track.querySelectorAll<HTMLElement>(".tour-anchor"));
    const wide = matchMedia(WIDE);
    const touch = matchMedia(TOUCH);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const set = (els: HTMLElement[], prop: "opacity" | "transform", value: string) => {
      for (const el of els) el.style[prop] = value;
    };

    // Everything that only changes with the window's size, measured on resize, never per frame.
    let L = {
      isWide: false,
      screen: 1,
      rect: { x: 0, y: 0, w: 1, h: 1 },
      W: 966,
      shift: 0,
      spread: 1,
      pace: 1,
      z: 1,
      trackTop: 0,
    };

    function layout() {
      const header = document.querySelector<HTMLElement>(".site-header");
      const headerH = header?.offsetHeight ?? 0;
      // The sticky header lies over the top of the stage, so the tour starts under it.
      tour.style.marginTop = `${-headerH}px`;
      stage.style.setProperty("--header-h", `${headerH}px`);
      const isWide = wide.matches;
      const screen = stage.clientHeight;
      const w = stage.clientWidth;
      const spread = parseFloat(getComputedStyle(stage).getPropertyValue("--spread")) || 1;
      let rect: typeof L.rect;
      let shift = 0;
      if (isWide) {
        // The room centres in the space right of the note; the wall runs on past the right edge.
        const note = noteEls[0];
        shift = (note.offsetLeft + note.offsetWidth) / 2;
        rect = { x: 0, y: headerH, w, h: screen - headerH };
      } else {
        const noteH = Math.max(...noteEls.map((n) => n.offsetHeight)) + 24;
        rect = { x: 0, y: headerH, w, h: screen - headerH - noteH };
      }
      rect.h = Math.max(rect.h, 120);
      const band = BAND[isWide ? "wide" : "narrow"];
      const W = Math.round(Math.max(isWide ? 1500 : 966, (rect.w + 2 * shift) / (rect.h / band)));
      stage.style.setProperty("--W", String(W));
      // The room is laid out at z px per room unit, so every room length in the world is times z.
      // Desktops keep z = 1: their memory has room for it, and the gift close-up stays sharp.
      const z = touch.matches ? (rect.w + 2 * shift) / W : 1;
      stage.style.setProperty("--u", `${z}px`);
      // A square room: the walls meet at right angles around the visitor.
      const half = (W / 2) * z;
      walls[0].style.transform = `translate3d(${-half}px, 0, 0) rotateY(90deg)`;
      walls[1].style.transform = `translate3d(0, 0, ${-half}px)`;
      walls[2].style.transform = `translate3d(${half}px, 0, 0) rotateY(-90deg)`;

      // Lengths in px, from the stage's own height, so a phone's sliding toolbar never shifts the tour.
      const pace = PACE[isWide ? "wide" : "narrow"];
      track.style.height = `${(unitsTo(SEGS.length, pace) / 100) * screen + screen}px`;
      for (const a of anchors) a.style.top = `${(unitsTo(Number(a.dataset.stop), pace) / 100) * screen}px`;
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      L = { isWide, screen, rect, W, shift, spread, pace, z, trackTop };
    }

    function cameraFor(i: number, scale: number, cx: number, cy: number) {
      const stop = STOPS[i];
      const key = L.isWide ? "wide" : "narrow";
      const [v0, v1] = stop.v[key];
      const camY = (v0 + v1) / 2;
      let zoom = 1;
      let tx = cx;
      let ty = cy;
      if (stop.zoom) {
        const [z0, z1] = stop.zoom.v[key];
        zoom = L.rect.h / ((z1 - z0) * scale);
        tx = cx + (stop.zoom.x - 540) * L.spread * scale;
        ty = cy + ((z0 + z1) / 2 - camY) * scale;
      }
      return { yaw: YAW[stop.wall], camY, zoom, tx, ty };
    }

    function frame() {
      // Review aid: #at=2.5 pins the stop position (headless screenshots run no scroll events).
      const at = /^#at=([\d.]+)$/.exec(location.hash);
      const raw = at
        ? clamp(parseFloat(at[1]), 0, STOPS.length - 1)
        : stopAt(((window.scrollY - L.trackTop) / L.screen) * 100, L.pace);
      const k = Math.min(STOPS.length - 2, Math.floor(raw));
      const seg = SEGS[k];
      const t = reduce.matches ? (raw - k < 0.5 ? 0 : 1) : smooth(seg.ease[0], seg.ease[1], raw - k);
      const pos = k + t;

      const { rect, W, shift } = L;
      const scale = (rect.w + 2 * shift) / W; // screen px per room unit on the wall faced
      const cx = rect.x + rect.w / 2 + shift;
      const cy = rect.y + rect.h / 2;
      const a = cameraFor(k, scale, cx, cy);
      const b = cameraFor(k + 1, scale, cx, cy);
      // iPhone Safari leaves out the front wall's half at a turn of exactly 45 degrees (iOS 18 and 26,
      // 2026-10-17); a thousandth of a degree off, it draws it.
      const turn = lerp(a.yaw, b.yaw, t);
      const yaw = Math.abs(Math.abs(turn) - 45) < 1e-3 ? Math.sign(turn) * (45 + 1e-3) : turn;
      const camY = lerp(a.camY, b.camY, t);
      const persp = (W * scale) / 2; // a 90 degree field of view across the wall
      scene.style.perspective = `${persp}px`;
      scene.style.perspectiveOrigin = `${cx}px ${cy}px`;
      world.style.transform =
        `translate(${cx}px, ${cy}px) translateZ(${persp}px) scale3d(${scale / L.z}, ${scale / L.z}, ${scale / L.z}) ` +
        `rotateY(${yaw}deg) translateY(${-camY * L.z}px)`;
      const zoom = lerp(a.zoom, b.zoom, t);
      scene.style.transform =
        zoom === 1 ? "" : `translate(${cx}px, ${cy}px) scale(${zoom}) translate(${-lerp(a.tx, b.tx, t)}px, ${-lerp(a.ty, b.ty, t)}px)`;

      // Each half-wall spans 45 degrees of view, either side of its wall's centre at YAW[wall] - yaw.
      // Hide a half once it lies wholly outside the view. Walls turned away read a little darker.
      walls.forEach((_, i) => {
        const centre = YAW[i] - yaw;
        halves[i].forEach((half, h) => {
          const lo = centre + (h ? 0 : -45);
          half.style.visibility = lo >= 44.9 || lo + 45 <= -44.9 ? "hidden" : "";
        });
        set(shades[i], "opacity", String(clamp(Math.abs(centre) / 90) * 0.2));
      });

      // The story: how strongly each stop shows at this point of the scroll.
      const weight = (i: number) => clamp(1 - Math.abs(pos - i));
      const session = weight(1);
      const gift = clamp(1 - Math.abs(pos - 2) * 2.5); // falls off fast: nothing lingers into the turn
      // The pose swaps while the camera moves; a crossfade would double-expose the pet.
      const pose = STOPS[Math.round(pos)].pose;
      for (const img of poses) img.style.opacity = img.dataset.pose === pose ? "1" : "0";
      set(glows, "opacity", String(session));
      set(dims, "opacity", String(session * 0.16));
      set(eves, "opacity", String(session * 0.85));
      set(sounds, "opacity", String(session));
      set(toggles, "opacity", String(clamp(1 - session - weight(2))));
      set(starts, "opacity", String(clamp(1 - session * 2 - weight(2) * 2)));
      set(taskAlts, "opacity", String(clamp(session + weight(2))));
      set(sheets, "opacity", String(gift));
      set(sheets, "transform", `translateY(${(1 - gift) * 160 * L.z}px)`);

      // The timer runs through the session's hold: from the end of the move in to the start of the move out.
      const runFrom = SEGS[0].ease[1];
      const runTo = 1 + SEGS[1].ease[0];
      const time = pos > 0.5 && pos < 1.5 ? clock(Math.ceil(1500 * (1 - clamp((raw - runFrom) / (runTo - runFrom))))) : "25:00";
      for (const el of timers) if (el.textContent !== time) el.textContent = time;

      // Opacity only: the notes are the tour's text for screen readers, so they stay in reach.
      noteEls.forEach((n, i) => (n.style.opacity = String(clamp(1 - Math.abs(pos - i) * 2.2))));
    }

    let queued = 0;
    const request = () => {
      if (!queued) queued = requestAnimationFrame(() => ((queued = 0), frame()));
    };
    const relayout = () => {
      layout();
      request();
    };
    layout();
    // The browser jumped to any #hash before the tour had its height; jump again now it has.
    const hash = location.hash.slice(1);
    if (hash && !hash.startsWith("at=")) document.getElementById(decodeURIComponent(hash))?.scrollIntoView();
    frame();
    tour.dataset.ready = "";
    addEventListener("scroll", request, { passive: true });
    addEventListener("resize", relayout);
    addEventListener("hashchange", request);
    wide.addEventListener("change", relayout);
    touch.addEventListener("change", relayout);
    reduce.addEventListener("change", request);
    document.fonts?.ready.then(relayout);
    return () => {
      cancelAnimationFrame(queued);
      removeEventListener("scroll", request);
      removeEventListener("resize", relayout);
      removeEventListener("hashchange", request);
      wide.removeEventListener("change", relayout);
      touch.removeEventListener("change", relayout);
      reduce.removeEventListener("change", request);
    };
  }, []);

  return (
    <div className="tour" ref={tourRef}>
      {/* Without JavaScript the notes read as plain text, one after another. */}
      <noscript>
        <style>{`.tour-stage{position:static;height:auto;overflow:visible}.tour-scene{display:none}.tour-note{position:static;opacity:1;transform:none;margin:16px auto;width:auto;max-width:560px}`}</style>
      </noscript>
      <div className="tour-track">
        {notes.map((n, i) =>
          n.anchor ? <span key={n.anchor} id={n.anchor} className="tour-anchor" data-stop={i} /> : null,
        )}
        <div className="tour-stage">
          {/* The room repeats every wall's words twice (two half-panels); the notes carry the real text. */}
          <div className="tour-scene" aria-hidden="true">
            <div className="tour-world">
              <Wall index={0} />
              <Wall index={1} />
              <Wall index={2} />
            </div>
          </div>
          {notes.map((n, i) => (
            <article key={i} className="tour-note" data-stop={i}>
              {n.content}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
