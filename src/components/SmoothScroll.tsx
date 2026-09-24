"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Expo ease-out — the curve most premium sites converge on for scroll glide.
const expoOut = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Native scroll on touch and for reduced-motion users — smoothing
    // adds latency on mobile without adding polish, and shouldn't be
    // forced on people who've asked for less motion.
    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: expoOut,

      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,

      infinite: false,
      autoResize: true,
      orientation: "vertical",
      gestureOrientation: "vertical",

      // Normalize trackpad vs discrete mouse wheel:
      // Trackpads fire rapid small-delta wheel events (deltaMode 0, fractional deltaY)
      // that pile up under interpolation. Dampen them to prevent "heavy then swoosh".
      virtualScroll: (e) => {
        const evt = e.event;
        if (evt instanceof WheelEvent) {
          const isTrackpad =
            evt.deltaMode === 0 &&
            Math.abs(evt.deltaY) < 50 &&
            !Number.isInteger(evt.deltaY);
          if (isTrackpad) {
            e.deltaY *= 0.75;
          }
        }
        return true;
      },
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    // Scroll synchronization
    lenis.on("scroll", (e) => {
      ScrollTrigger.update();

      if (typeof document !== "undefined") {
        const vel = Math.abs(e.velocity);
        document.documentElement.style.setProperty(
          "--scroll-velocity",
          vel.toFixed(3)
        );
        if (vel > 0.4) {
          document.documentElement.setAttribute("data-scrolling", "fast");
        } else if (vel > 0.02) {
          document.documentElement.setAttribute("data-scrolling", "true");
        } else {
          document.documentElement.removeAttribute("data-scrolling");
        }
      }
    });

    // Frame synchronization via GSAP ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Prevents GSAP from "catching up" animations after a dropped frame
    // or backgrounded tab — without this, scroll-linked motion can jump.
    gsap.ticker.lagSmoothing(0);

    // ─────────────────────────────────────────────────────────────
    // CLEANUP
    // ─────────────────────────────────────────────────────────────
    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
    };
  }, []);

  return <>{children}</>;
}
