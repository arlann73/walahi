"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const expoOut = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

type LenisWindow = Window & { __lenis?: Lenis };

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    let scrollState = "";

    const setScrollState = (next: string) => {
      if (next === scrollState) return; // hanya sentuh DOM saat state berubah
      scrollState = next;
      if (next) root.setAttribute("data-scrolling", next);
      else root.removeAttribute("data-scrolling");
    };

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({
        duration: 1.1,
        easing: expoOut,
        anchors: true,
      });
      (window as LenisWindow).__lenis = lenis;

      lenis.on("scroll", (e: { velocity: number }) => {
        ScrollTrigger.update();
        const vel = Math.abs(e.velocity);
        setScrollState(vel > 0.4 ? "fast" : vel > 0.02 ? "true" : "");
      });

      tick = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    };

    const stop = () => {
      if (!lenis) return;
      if (tick) gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
      tick = null;
      setScrollState("");
      delete (window as LenisWindow).__lenis;
    };

    const sync = () => (coarse.matches || reduced.matches ? stop() : start());

    sync();
    coarse.addEventListener("change", sync);
    reduced.addEventListener("change", sync);

    return () => {
      coarse.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return <>{children}</>;
}
