"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { StaticImageData } from "next/image";
import catSit from "@/assets/pets/cat_sit.webp";
import tabbySit from "@/assets/pets/orange-tabby_sit.webp";
import retrieverSit from "@/assets/pets/golden-retriever_sit.webp";
import { FrontWall } from "./Walls";

// The same room on a phone, an unfolded foldable and a tablet. A bigger screen gets a wider wall, with
// things spread further apart, as the app's own big-screen layout does. Each screen shows the band of the
// wall from `top` down, as tall as its shape allows. Frames are plain: no brand's hardware.
const DEVICES: { key: string; label: string; W: number; spread: number; top: number; still: StaticImageData }[] = [
  { key: "tablet", label: "Tablet", W: 2600, spread: 1.7, top: 130, still: retrieverSit },
  { key: "fold", label: "Foldable", W: 2300, spread: 1.5, top: 110, still: tabbySit },
  { key: "phone", label: "Phone", W: 966, spread: 1, top: 120, still: catSit },
];

export function Devices() {
  const ref = useRef<HTMLDivElement>(null);

  // Scale each room (drawn in screenshot px) to its screen's width.
  useEffect(() => {
    const screens = Array.from(ref.current!.querySelectorAll<HTMLElement>(".device-screen"));
    const fit = () => {
      for (const s of screens) {
        const room = s.firstElementChild as HTMLElement;
        const k = s.clientWidth / Number(room.dataset.w);
        room.style.transform = `scale(${k}) translateY(${-Number(room.dataset.top)}px)`;
      }
    };
    fit();
    const ro = new ResizeObserver(fit);
    for (const s of screens) ro.observe(s);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="devices" ref={ref}>
      {DEVICES.map((d) => (
        <figure key={d.key} className={`device device--${d.key}`}>
          <div className="device-frame">
            <div className="device-screen" aria-hidden="true">
              <div
                className="device-room"
                data-w={d.W}
                data-top={d.top}
                style={{ "--W": d.W, "--spread": d.spread } as CSSProperties}
              >
                <div className="device-baseboard" />
                <div className="device-floor" />
                <div className="room-layer">
                  <FrontWall still={d.still} />
                </div>
              </div>
            </div>
          </div>
          <figcaption className="device-label">{d.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
