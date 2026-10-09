"use client";

import { useEffect } from "react";

// Text blocks marked data-reveal rise into place the first time they scroll into view.
// They are only hidden once this runs (data-reveal="wait"), so without the script, or
// with reduced motion, everything simply shows. Blocks already on screen or above it
// (a reload part-way down the page) are left alone.
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        // Everything now in view or already scrolled past shows, so a fast jump never
        // leaves a block hidden above the screen. Blocks that arrive together follow
        // one another, in page order.
        blocks
          .filter((el) => el.dataset.reveal === "wait" && el.getBoundingClientRect().top < window.innerHeight * 0.9)
          .forEach((el, k) => {
            el.style.transitionDelay = `${k * 90}ms`;
            el.dataset.reveal = "in";
            io.unobserve(el);
          });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    for (const el of blocks) {
      el.dataset.reveal = "wait";
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);
  return null;
}
