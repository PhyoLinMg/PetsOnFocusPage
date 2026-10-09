"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { DEMO_LAYOUT, Demos, type DemoKey, type RoomLook } from "./demos/Demos";
import { Outside } from "./Outside";
import { RoomScene, type PetPose } from "./RoomScene";

export type Stop = {
  key: string;
  /** Id for in-page links (e.g. "features"). */
  anchor?: string;
  /** data-obj names in RoomScene the camera frames. */
  target: string[];
  /** A tighter frame for narrow screens, where the camera has only the top half. */
  narrowTarget?: string[];
  pet: PetPose;
  /** "fit" pulls back to show the whole room. */
  view?: "fit";
  /** On wide screens the note sits on this side and the camera frames the other. */
  side?: "left" | "right";
  /** A live re-creation of the app screen this stop is about (see demos/Demos.tsx). */
  demo?: DemoKey;
  content: ReactNode;
};

// Portrait and narrow screens stack: notes at the bottom, the camera frames the top.
// Everything else (desktop, landscape phones) puts notes beside the camera's frame.
// Keep in step with the matching media queries in globals.css.
const STACKED = "(max-width: 860px) and (max-aspect-ratio: 8/5)";

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

type Box = { x: number; y: number; w: number; h: number };

// Layout box of el relative to ancestor, ignoring transforms (the camera's included).
function boxIn(el: HTMLElement, ancestor: HTMLElement): Box {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

// An object's box including its parts (a radio's antenna sticks out of the radio).
function boxWithParts(el: HTMLElement, ancestor: HTMLElement): Box {
  const boxes = [el, ...Array.from(el.children as HTMLCollectionOf<HTMLElement>)].map((n) => boxIn(n, ancestor));
  const x0 = Math.min(...boxes.map((b) => b.x));
  const y0 = Math.min(...boxes.map((b) => b.y));
  return {
    x: x0,
    y: y0,
    w: Math.max(...boxes.map((b) => b.x + b.w)) - x0,
    h: Math.max(...boxes.map((b) => b.y + b.h)) - y0,
  };
}

// Gap kept between an object brought wholly into view and the edge it was cut by.
const EDGE_MARGIN = 16;

export function Journey({ intro, stops }: { intro: ReactNode; stops: Stop[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const outsideRef = useRef<HTMLDivElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const camRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const [demo, setDemo] = useState<DemoKey | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Demos act on the room: the pet's pose and the Customize demo's wallpaper, rug and night.
  const setPose = useCallback((pose: PetPose) => {
    if (worldRef.current) worldRef.current.dataset.pet = pose;
  }, []);
  const setRoom = useCallback((look: RoomLook) => {
    const stage = stageRef.current;
    if (!stage) return;
    const set = (key: string, value?: string) => {
      if (value) stage.dataset[key] = value;
      else delete stage.dataset[key];
    };
    set("wall", look.wall);
    set("rug", look.rug);
    set("night", look.night ? "true" : undefined);
  }, []);

  useEffect(() => {
    const root = rootRef.current!;
    const stage = stageRef.current!;
    const outside = outsideRef.current!;
    const scene = outside.firstElementChild as HTMLElement;
    const door = doorRef.current!;
    const cam = camRef.current!;
    const world = worldRef.current!;
    const doorway = outside.querySelector<HTMLElement>("[data-doorway]")!;
    const doorBeat = root.querySelector<HTMLElement>(".beat--door")!;
    const stopBeats = Array.from(root.querySelectorAll<HTMLElement>("[data-stop]"));
    const notes = stopBeats.map((beat) => beat.querySelector<HTMLElement>(".note")!);
    const objectNames = [
      ...new Set(Array.from(world.querySelectorAll<HTMLElement>("[data-obj]"), (el) => el.dataset.obj!)),
    ];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stacked = window.matchMedia(STACKED);
    const demoEls = new Map(
      Array.from(stage.querySelectorAll<HTMLElement>("[data-demo]"), (el) => [el.dataset.demo as DemoKey, el]),
    );
    const wallTop = Math.min(
      ...Array.from(world.querySelectorAll<HTMLElement>("[data-obj]"), (el) => boxIn(el, world).y),
    );

    let active = 0;
    // When the camera last started a glide (0 once it has been cut into place).
    let framedAt = 0;
    const GLIDE_MS = 1300; // matches the .world transition in globals.css

    // Jump the camera straight to a stop: no glide, no pose crossfade.
    function cutTo(index: number) {
      stage.dataset.cut = "";
      frameStop(index);
      void world.offsetWidth; // commit the jump before transitions come back
      delete stage.dataset.cut;
      framedAt = 0;
    }
    let doorZoom = 1;
    // How far the doorway's centre must travel to reach the middle of the stage.
    let doorShift = { x: 0, y: 0 };
    let frame = 0;

    function frameStop(index: number) {
      const stop = stops[index];
      const sw = stage.clientWidth;
      const sh = stage.clientHeight;
      const W = world.offsetWidth;
      const H = world.offsetHeight;
      // The camera frames the space the stop's note leaves free.
      const note = notes[index];
      const r = note.getBoundingClientRect();
      // Where the note's top edge sits while its stop is active: stacked notes rest at
      // the bottom of their beat (about 94% down), side notes are centred.
      const noteTop = stacked.matches ? sh * 0.94 - note.offsetHeight : (sh - note.offsetHeight) / 2;
      let focus: Box;
      if (stacked.matches) {
        focus = { x: sw * 0.04, y: sh * 0.07, w: sw * 0.92, h: Math.max(sh * 0.25, noteTop - 20 - sh * 0.07) };
      } else {
        const x = stop.side === "right" ? sw * 0.03 : r.right + 32;
        const right = stop.side === "right" ? r.left - 32 : sw * 0.97;
        focus = { x, y: sh * 0.08, w: right - x, h: sh * 0.84 };
      }

      // A demo takes its share of the frame first; the camera gets the rest.
      // Wall HUDs (the timer) sit above the pet; app sheets sit on the outer side on
      // wide screens and at the bottom when stacked, like the app's own sheets.
      const demoEl = stop.demo ? demoEls.get(stop.demo) : undefined;
      const layout = stop.demo ? DEMO_LAYOUT[stop.demo] : undefined;
      let area = focus;
      let demoBox: Box | undefined;
      if (demoEl && layout) {
        const w = demoEl.offsetWidth;
        const h = demoEl.offsetHeight;
        let k: number;
        let dx: number;
        let dy: number;
        if (layout === "hud") {
          k = Math.min(1, focus.w / w, (focus.h * 0.42) / h);
          dx = focus.x + (focus.w - w * k) / 2;
          dy = focus.y;
          area = { x: focus.x, y: dy + h * k + 16, w: focus.w, h: focus.h - h * k - 16 };
        } else if (stacked.matches) {
          k = Math.min(1, focus.w / w, (focus.h * 0.72) / h);
          dx = focus.x + (focus.w - w * k) / 2;
          dy = focus.y + focus.h - h * k;
          area = { x: focus.x, y: focus.y, w: focus.w, h: Math.max(48, focus.h - h * k - 12) };
        } else {
          k = Math.min(1, (focus.w * 0.56) / w, focus.h / h);
          const outerRight = stop.side !== "right";
          dx = outerRight ? focus.x + focus.w - w * k : focus.x;
          dy = focus.y + (focus.h - h * k) / 2;
          area = outerRight
            ? { x: focus.x, y: focus.y, w: focus.w - w * k - 24, h: focus.h }
            : { x: focus.x + w * k + 24, y: focus.y, w: focus.w - w * k - 24, h: focus.h };
        }
        demoBox = { x: dx, y: dy, w: w * k, h: h * k };
        demoEl.style.transform = `translate(${dx}px, ${dy}px) scale(${k})`;
      }

      let s: number;
      let tx: number;
      let ty: number;
      if (stop.view === "fit") {
        // Sits on the bottom of its frame, so the room meets the section below.
        s = Math.min(focus.w / W, focus.h / H);
        tx = focus.x + (focus.w - W * s) / 2;
        ty = focus.y + focus.h - H * s;
      } else {
        const names = stacked.matches && stop.narrowTarget ? stop.narrowTarget : stop.target;
        const boxesOf = (list: string[]) =>
          list.flatMap((name) =>
            Array.from(world.querySelectorAll<HTMLElement>(`[data-obj="${name}"]`), (el) => boxIn(el, world)),
          );
        const boxes = boxesOf(names);
        const x0 = Math.min(...boxes.map((b) => b.x));
        // Under a wall HUD the frame takes in the whole wall band, so no wall object ends
        // up behind the timer.
        const y0 = layout === "hud" ? wallTop : Math.min(...boxes.map((b) => b.y));
        const x1 = Math.max(...boxes.map((b) => b.x + b.w));
        const y1 = Math.max(...boxes.map((b) => b.y + b.h));
        const padX = 1.45;
        const padY = layout === "hud" ? 1.08 : 1.45;
        // The floor runs on past the room's edges (RoomScene), so the camera may pull
        // back and frame an object near the edge without showing a gap.
        // Capped so neighbours stay readable instead of turning into giant fragments.
        s = clamp(Math.min(area.w / ((x1 - x0) * padX), area.h / ((y1 - y0) * padY)), demoEl ? 0.3 : 0.5, 1.8);
        tx = area.x + area.w / 2 - ((x0 + x1) / 2) * s;
        ty = area.y + area.h / 2 - ((y0 + y1) / 2) * s;

        // No other object should be sliced by an edge of the screen or of the note:
        // nudge the camera to take it wholly in (with a margin) or wholly out, as long
        // as the target stays inside its frame. `inside` is the visible side (+1 after
        // the edge, -1 before it); `from`/`to` limit the edge along the other axis.
        type Edge = { axis: "x" | "y"; pos: number; inside: 1 | -1; from: number; to: number };
        const noteBottom = noteTop + note.offsetHeight;
        const edges: Edge[] = [
          { axis: "y", pos: 0, inside: 1, from: -Infinity, to: Infinity },
          { axis: "x", pos: 0, inside: 1, from: -Infinity, to: Infinity },
          { axis: "x", pos: sw, inside: -1, from: -Infinity, to: Infinity },
          { axis: "y", pos: noteTop, inside: -1, from: r.left, to: r.right },
        ];
        if (demoBox && layout === "sheet") {
          // The sheet is solid, like the note: nothing should be half-hidden behind it.
          if (stacked.matches) edges.push({ axis: "y", pos: demoBox.y, inside: -1, from: demoBox.x, to: demoBox.x + demoBox.w });
          else if (stop.side === "right")
            edges.push({ axis: "x", pos: demoBox.x + demoBox.w, inside: 1, from: demoBox.y, to: demoBox.y + demoBox.h });
          else edges.push({ axis: "x", pos: demoBox.x, inside: -1, from: demoBox.y, to: demoBox.y + demoBox.h });
        }
        if (!stacked.matches) {
          edges.push({ axis: "y", pos: sh, inside: -1, from: -Infinity, to: Infinity });
          edges.push(
            stop.side === "right"
              ? { axis: "x", pos: r.left, inside: -1, from: noteTop, to: noteBottom }
              : { axis: "x", pos: r.right, inside: 1, from: noteTop, to: noteBottom },
          );
        }
        const limits = {
          x: [area.x - 8, area.x + area.w + 8],
          y: [area.y - 8, stacked.matches ? Math.min(noteTop, area.y + area.h + 8) : sh],
        };
        // The guard only fine-tunes: it may move the frame at most this far from the
        // composed position, so a stray object never drags the target off-centre.
        const home = { x: tx, y: ty };
        const reach = { x: sw * 0.12, y: sh * 0.12 };
        const targetSpan = { x: [x0, x1], y: [y0, y1] };
        const others = objectNames
          .filter((n) => !names.includes(n))
          .flatMap((name) =>
            Array.from(world.querySelectorAll<HTMLElement>(`[data-obj="${name}"]`), (el) => boxWithParts(el, world)),
          );
        for (let pass = 0; pass < 6; pass++) {
          let moved = false;
          for (const b of others) {
            const span = {
              x: [tx + b.x * s, tx + (b.x + b.w) * s],
              y: [ty + b.y * s, ty + (b.y + b.h) * s],
            };
            for (const e of edges) {
              const [start, end] = span[e.axis];
              const [crossStart, crossEnd] = span[e.axis === "x" ? "y" : "x"];
              if (crossEnd <= e.from || crossStart >= e.to) continue;
              if (!(start < e.pos - 2 && end > e.pos + 2)) continue;
              const intoView = e.inside === 1 ? e.pos + EDGE_MARGIN - start : e.pos - EDGE_MARGIN - end;
              const outOfView = e.inside === 1 ? e.pos - end : e.pos - start;
              const offset = e.axis === "x" ? tx : ty;
              const [lo, hi] = limits[e.axis];
              const [t0, t1] = targetSpan[e.axis];
              const fits = (d: number) =>
                offset + d + t0 * s >= lo &&
                offset + d + t1 * s <= hi &&
                Math.abs(offset + d - home[e.axis]) <= reach[e.axis];
              const best = [intoView, outOfView].filter(fits).sort((p, q) => Math.abs(p) - Math.abs(q))[0];
              if (best === undefined) continue;
              if (e.axis === "x") tx += best;
              else ty += best;
              moved = true;
              break;
            }
          }
          if (!moved) break;
        }
      }
      world.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${s})`;
      framedAt = performance.now();
      world.dataset.pet = stop.pet;
      stage.dataset.view = stop.view ?? "focus";
      setDemo(stop.demo ?? null);
    }

    function measure() {
      const sw = stage.clientWidth;
      const sh = stage.clientHeight;
      // Measured on screen with the zoom off: the house is centred with `translate`,
      // which layout offsets don't include.
      outside.style.transform = "none";
      const o = outside.getBoundingClientRect();
      const d = doorway.getBoundingClientRect();
      const dx = d.left - o.left;
      const dy = d.top - o.top;
      // The doorway is a real opening: the garden is cut away there so the room behind
      // shows through, and the door panel lives on its own layer above the cut.
      scene.style.clipPath = `path(evenodd, "M0 0H${o.width}V${o.height}H0Z M${dx} ${dy}H${dx + d.width}V${dy + d.height}H${dx}Z")`;
      Object.assign(door.style, { left: `${dx}px`, top: `${dy}px`, width: `${d.width}px`, height: `${d.height}px` });
      const cx = dx + d.width / 2;
      const cy = dy + d.height * 0.6;
      outside.style.transformOrigin = `${cx}px ${cy}px`;
      doorShift = { x: sw / 2 - cx, y: sh / 2 - cy };
      doorZoom = Math.max((sh * 1.3) / d.height, (sw * 1.3) / d.width);
      frameStop(active);
      update();
    }

    function update() {
      frame = 0;
      const sh = stage.clientHeight;

      // The walk through the door ends when the door beat's end is 70% up the screen,
      // just before the first note (the welcome, with the download badges) arrives.
      const walk = doorBeat.offsetTop + doorBeat.offsetHeight - sh * 0.7;
      const p = clamp(-root.getBoundingClientRect().top / walk);
      const still = reduce.matches;
      const angle = still ? 0 : -110 * easeOut(clamp(p / 0.4));
      const travel = still ? 0 : easeOut(clamp((p - 0.1) / 0.6));
      const zoom = still ? 1 : 1 + (doorZoom - 1) * clamp((p - 0.12) / 0.88) ** 2.6;
      // Reduced motion: the garden fades to the bare wall, then the room fades in, so
      // the two scenes never overlap. Otherwise the garden only fades once the doorway
      // has filled the screen.
      const fade = still ? 1 - smooth(0.4, 0.5, p) : 1 - smooth(0.9, 0.99, p);
      const roomIn = still ? smooth(0.5, 0.6, p) : 1;
      // The room behind the door grows more slowly than the doorway: it is further away.
      const landing = still ? 1 : 0.86 + 0.14 * easeOut(clamp((p - 0.2) / 0.8));

      // The active stop is the last one whose beat has reached the middle of the
      // viewport, read from layout on every frame. (Before the first stop that is the
      // welcome, so the room seen through the door is always the arrival view.)
      // Event-based detection lost track when a fast scroll skipped or straddled beats.
      const middle = window.innerHeight / 2;
      let current = 0;
      stopBeats.forEach((beat, i) => {
        if (beat.getBoundingClientRect().top <= middle) current = i;
      });
      if (fade > 0.001) {
        // Any of the garden showing means the room is only seen through the door, so
        // it must already be the arrival view. A glide still under way from a stop
        // deeper in (a fast scroll back up) is cut short instead of swinging past.
        if (active !== 0 || performance.now() - framedAt < GLIDE_MS) {
          active = 0;
          cutTo(0);
        }
      } else if (current !== active) {
        active = current;
        frameStop(active);
      }

      stage.style.setProperty("--door-angle", `${angle}deg`);
      outside.style.transform = `translate3d(${doorShift.x * travel}px, ${doorShift.y * travel}px, 0) scale(${zoom})`;
      outside.style.opacity = String(fade);
      outside.style.visibility = fade <= 0.001 ? "hidden" : "";
      cam.style.transform = `scale(${landing})`;
      cam.style.opacity = String(roomIn);
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // The room's clock shows the visitor's own time, like its window.
    const setClock = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      world.style.setProperty("--clock-minute", `${minutes * 6}deg`);
      world.style.setProperty("--clock-hour", `${(now.getHours() % 12) * 30 + minutes / 2}deg`);
    };
    setClock();
    const clock = window.setInterval(setClock, 30_000);

    const syncReduce = () => setReduceMotion(reduce.matches);
    syncReduce();
    reduce.addEventListener("change", syncReduce);

    const resize = new ResizeObserver(measure);
    resize.observe(stage);
    window.addEventListener("scroll", onScroll, { passive: true });
    reduce.addEventListener("change", update);
    measure();
    root.dataset.ready = "true";

    return () => {
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      reduce.removeEventListener("change", update);
      reduce.removeEventListener("change", syncReduce);
      window.clearInterval(clock);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [stops]);

  return (
    <div className="journey" ref={rootRef}>
      <div className="journey-stage" ref={stageRef} aria-hidden="true">
        <div className="room-cam" ref={camRef}>
          <div className="world" ref={worldRef} data-pet={stops[0]?.pet}>
            <RoomScene />
          </div>
        </div>
        <Demos active={demo} reduce={reduceMotion} setPose={setPose} setRoom={setRoom} />
        <div className="outside-layer" ref={outsideRef}>
          <Outside />
          <div className="house-door-panel" ref={doorRef}>
            <span className="house-door-inset house-door-inset--top" />
            <span className="house-door-inset house-door-inset--bottom" />
            <span className="house-door-knob" />
          </div>
        </div>
      </div>

      <div className="journey-track">
        <div className="beat beat--intro">{intro}</div>
        <div className="beat beat--door" />
        {stops.map((stop, i) => (
          <div key={stop.key} id={stop.anchor} className="beat beat--stop" data-stop={i} data-side={stop.side}>
            <div className="note">{stop.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
