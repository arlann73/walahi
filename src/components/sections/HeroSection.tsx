"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DotRasterTransition from "@/components/DotRasterTransition";
import AboutPortfolioSection from "@/components/sections/AboutPortfolioSection";
import FeaturedWorkSection from "@/components/sections/FeaturedWorkSection";
import WhatIDoSection from "@/components/sections/WhatIDoSection";
import CoreValuesSection from "@/components/sections/CoreValuesSection";
import ContactSection from "@/components/sections/ContactSection";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Filter benign upstream Three.js deprecation and DirectX/ANGLE HLSL precision warnings
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    const first = typeof args[0] === "string" ? args[0] : "";
    const second = typeof args[1] === "string" ? args[1] : "";
    if (
      first.includes("THREE.Clock: This module has been deprecated") ||
      (first.includes("THREE.WebGLProgram") && second.includes("X4122"))
    ) {
      return;
    }
    originalWarn(...args);
  };
}

export interface HeroSectionProps {
  on3DReady?: () => void;
  isPreloaderDone?: boolean;
}

const ASCII_CHARS = ".:+-/\\*><_~=";

function AsciiScrambleTag({ isPreloaderDone }: { isPreloaderDone: boolean }) {
  const [text, setText] = useState("[ EARLY CAREER ]");
  const [currentGoal, setCurrentGoal] = useState<"[ EARLY CAREER ]" | "[ AVAILABLE FOR WORK ]">("[ EARLY CAREER ]");
  const isScramblingRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const scrambleTo = useCallback((targetText: string, onComplete?: () => void) => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;

    let iteration = 0;
    const maxIterations = targetText.length * 2.8;

    const tick = () => {
      iteration++;
      const progress = iteration / maxIterations;

      const scrambled = targetText
        .split("")
        .map((char, index) => {
          if (char === " " || char === "[" || char === "]") return char;
          const charThreshold = index / targetText.length;
          if (progress > charThreshold) {
            return char;
          }
          return ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
        })
        .join("");

      setText(scrambled);

      if (iteration < maxIterations) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setText(targetText);
        isScramblingRef.current = false;
        if (onComplete) onComplete();
      }
    };

    tick();
  }, []);

  // 1. Reveal decode after preloader finishes: [ EARLY CAREER ] -> [ AVAILABLE FOR WORK ]
  useEffect(() => {
    if (!isPreloaderDone) return;

    const timer = setTimeout(() => {
      scrambleTo("[ AVAILABLE FOR WORK ]", () => {
        setCurrentGoal("[ AVAILABLE FOR WORK ]");
      });
    }, 1200);

    return () => {
      clearTimeout(timer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isPreloaderDone, scrambleTo]);

  // 2. Interactive hover & tap: scrambles and toggles with GSAP bounce and mobile haptic feedback
  const triggerScramble = () => {
    // Haptic feedback on mobile if supported
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // Safe ignore
      }
    }

    // GSAP organic micro-bounce
    if (spanRef.current) {
      gsap.timeline()
        .to(spanRef.current, { scale: 0.94, duration: 0.08, ease: "power2.in" })
        .to(spanRef.current, { scale: 1.06, duration: 0.16, ease: "back.out(2)" })
        .to(spanRef.current, { scale: 1, duration: 0.12, ease: "power2.out" });
    }

    if (isScramblingRef.current) return;
    const nextGoal = currentGoal === "[ AVAILABLE FOR WORK ]" ? "[ EARLY CAREER ]" : "[ AVAILABLE FOR WORK ]";
    scrambleTo(nextGoal, () => {
      setCurrentGoal(nextGoal);
    });
  };

  const handleMouseEnter = () => {
    if (spanRef.current) gsap.to(spanRef.current, { opacity: 0.75, duration: 0.2, ease: "power1.out" });
    triggerScramble();
  };

  const handleMouseLeave = () => {
    if (spanRef.current) gsap.to(spanRef.current, { opacity: 1, duration: 0.2, ease: "power1.out" });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={triggerScramble}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          triggerScramble();
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`hero-eyebrow-wrap mb-2 md:mb-3 pointer-events-auto select-none cursor-pointer outline-none ${
        !isPreloaderDone ? "opacity-0" : ""
      }`}
      title="Status (Click/Tap to scramble)"
    >
      <span
        ref={spanRef}
        className="font-mono text-mono-label tracking-mono-bracket uppercase text-chalk font-bold inline-block origin-left"
      >
        {text}
      </span>
    </div>
  );
}

export default function HeroSection({
  on3DReady,
  isPreloaderDone = false,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const workRideAlongRef = useRef<HTMLDivElement>(null);
  const bottomContentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const isPreloaderDoneRef = useRef(isPreloaderDone);

  useEffect(() => {
    isPreloaderDoneRef.current = isPreloaderDone;
  }, [isPreloaderDone]);

  const [timeStr, setTimeStr] = useState<string>("08 : 00 : 00");
  const [lang, setLang] = useState<"ID" | "EN">("EN");
  const langDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (langDotRef.current) {
      gsap.to(langDotRef.current, {
        x: lang === "EN" ? 11 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [lang]);

  // Continuous Upward Kinetic headline loop (strictly rolls upward from bottom to top)
  const HEADLINE_PAIRS = [
    { line1: "PRASTYO", line2: "ARLAN" },
    { line1: "EXPLORE", line2: "THE EARTH" },
  ];

  const [currentPairIdx, setCurrentPairIdx] = useState(0);
  const [outgoingPairIdx, setOutgoingPairIdx] = useState<number | null>(null);
  const line1CurRef = useRef<HTMLSpanElement>(null);
  const line2CurRef = useRef<HTMLSpanElement>(null);
  const line1OutRef = useRef<HTMLSpanElement>(null);
  const line2OutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPairIdx((prev) => {
        setOutgoingPairIdx(prev);
        const next = (prev + 1) % HEADLINE_PAIRS.length;
        // Clean up outgoing state after transition duration (950ms)
        setTimeout(() => {
          setOutgoingPairIdx(null);
        }, 950);
        return next;
      });
    }, 4200);

    return () => clearInterval(interval);
  }, [HEADLINE_PAIRS.length]);

  useEffect(() => {
    if (line1CurRef.current) {
      gsap.fromTo(
        line1CurRef.current,
        { yPercent: 50, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.95, ease: "power3.out" }
      );
    }
    if (line2CurRef.current) {
      gsap.fromTo(
        line2CurRef.current,
        { yPercent: 50, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.95, delay: 0.1, ease: "power3.out" }
      );
    }
  }, [currentPairIdx]);

  useEffect(() => {
    if (outgoingPairIdx !== null) {
      if (line1OutRef.current) {
        gsap.fromTo(
          line1OutRef.current,
          { yPercent: 0, opacity: 1, filter: "blur(0px)" },
          { yPercent: -50, opacity: 0, filter: "blur(3px)", duration: 0.95, ease: "power3.out" }
        );
      }
      if (line2OutRef.current) {
        gsap.fromTo(
          line2OutRef.current,
          { yPercent: 0, opacity: 1, filter: "blur(0px)" },
          { yPercent: -50, opacity: 0, filter: "blur(3px)", duration: 0.95, delay: 0.1, ease: "power3.out" }
        );
      }
    }
  }, [outgoingPairIdx]);

  const isWipedRef = useRef(false);

  useGSAP(
    () => {
      const bottomItems = heroRef.current?.querySelectorAll(".bottom-bar-item");

      const wipeOut = () => {
        if (isWipedRef.current) return;
        isWipedRef.current = true;
        if (bottomItems && bottomItems.length > 0) {
          gsap.to(bottomItems, {
            clipPath: "inset(0 100% 0 0)",
            opacity: 0,
            x: -18,
            duration: 0.32,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
        // Fade out timeline, eyebrow, and editorial — headline stays
        gsap.to(".hero-timeline-wrap, .hero-eyebrow-wrap, .hero-editorial-wrap", {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const wipeIn = () => {
        if (!isWipedRef.current) return;
        isWipedRef.current = false;
        if (bottomItems && bottomItems.length > 0) {
          gsap.to(bottomItems, {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
        // Restore timeline, eyebrow, and editorial
        gsap.to(".hero-timeline-wrap, .hero-eyebrow-wrap, .hero-editorial-wrap", {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });

        // Guaranteed restore of hero portrait when scrolling back up to top
        if (portraitRef.current && isPreloaderDoneRef.current) {
          gsap.to(portraitRef.current, {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      const trackEl = document.getElementById("hero-track");
      if (trackEl) {
        ScrollTrigger.create({
          trigger: trackEl,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            progressRef.current = self.progress;
            if (self.progress <= 0.005) {
              wipeIn();
            } else if (self.progress > 0.015) {
              wipeOut();
            }
          },
        });

        // Portrait inward fade & blur on scroll (bidirectional: fades out going down, fades back in going up)
        if (portraitRef.current) {
          ScrollTrigger.create({
            trigger: trackEl,
            start: "top top",
            end: "+=450",
            scrub: true,
            onUpdate: (self) => {
              if (!portraitRef.current || !isPreloaderDoneRef.current) return;
              const p = Math.max(0, Math.min(1, self.progress));
              const opacity = 1 - p;
              const blur = p * 22;
              const scale = 1 - p * 0.12;
              gsap.set(portraitRef.current, {
                opacity,
                filter: `blur(${blur.toFixed(1)}px)`,
                scale,
                overwrite: "auto",
              });
            },
          });
        }
      }
    },
    { scope: heroRef }
  );

  // Staggered Left-to-Right Entrance Reveal upon Preloader Exit
  useEffect(() => {
    if (!isPreloaderDone) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Eyebrow badge sweeps in from left to right
      tl.fromTo(
        ".hero-eyebrow-wrap",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 }
      );

      // 2. Giant Headline sweeps in from left to right
      tl.fromTo(
        ".hero-headline-wrap",
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.95 },
        "-=0.65"
      );

      // 3. Editorial paragraph sweeps in from left to right
      tl.fromTo(
        ".hero-editorial-wrap",
        { x: -70, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9 },
        "-=0.75"
      );

      // 4. Portrait floats in
      if (portraitRef.current) {
        tl.fromTo(
          portraitRef.current,
          { opacity: 0, filter: "blur(8px)", scale: 0.96 },
          { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.0, ease: "power3.out" },
          "-=0.75"
        );
      }

      // 5. Micro-typography items stagger in from left to right
      tl.fromTo(
        ".bottom-bar-item",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.07,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }, heroRef);

    return () => ctx.revert();
  }, [isPreloaderDone]);

  // Realtime clock (WIB / device local time)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      setTimeStr(`${h} : ${m} : ${s}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (on3DReady) {
      on3DReady();
    }
  }, [on3DReady]);

  return (
    <section
      ref={heroRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-canvas flex flex-col justify-between selection:bg-section-accent selection:text-white"
    >
      {/* Layer 0: Pure Minimalist Canvas Background */}
      <div className="absolute inset-0 z-0 bg-canvas pointer-events-none" />

      {/* Layer 1: Undulating Dot Raster Wave Transition (Progressively covers Hero content) */}
      <DotRasterTransition
        progressRef={progressRef}
        textContainerRef={textContainerRef}
        workRideAlongRef={workRideAlongRef}
      />

      {/* Layer 1.5: Hero Character Portrait (Shifted slightly right & Anchored to Viewport Bottom Edge) */}
      <div
        className={`hero-portrait-stage absolute bottom-0 left-[53%] lg:left-[54%] -translate-x-1/2 z-10 pointer-events-none select-none flex items-end justify-center h-[72dvh] sm:h-[76dvh] md:h-[80dvh] lg:h-[84dvh] xl:h-[88dvh] max-h-[880px] w-auto origin-bottom ${
          !isPreloaderDone ? "opacity-0" : ""
        }`}
      >
        <div
          ref={portraitRef}
          className="relative h-full w-auto flex items-end justify-center origin-bottom"
          style={{
            willChange: "opacity, filter, transform",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Image
            src="/arlan-portrait-hero.png"
            alt="Prastyo Arlan"
            width={682}
            height={1024}
            priority
            className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>

      {/* Layer 3: Direct Unified Mount: AboutPortfolioSection, FeaturedWorkSection & WhatIDoSection riding behind wave */}
      <div
        ref={workRideAlongRef}
        id="work-ride-along"
        className="absolute top-0 left-0 w-full z-30 pointer-events-auto bg-[#121214] text-white selection:bg-white selection:text-black min-h-[480vh]"
        style={{
          transform: "translate3d(0px, 2000px, 0px)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <AboutPortfolioSection />
        <FeaturedWorkSection />
        <WhatIDoSection />
        <CoreValuesSection />
        <ContactSection />
      </div>

      {/* Layer 2: Main Content Area (Foreground) — Translates UP locked with wave */}
      <div
        ref={textContainerRef}
        className="relative z-20 w-full max-w-[1740px] mx-auto px-4 sm:px-10 lg:px-14 pt-16 sm:pt-24 md:pt-28 flex-1 flex flex-col justify-end pb-12 sm:pb-20 lg:pb-24 pointer-events-none"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {/* Bottom Split: Headline on Left, Editorial Paragraph on Right */}
        <div className="w-full pointer-events-none mb-2 sm:mb-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Left Column: Eyebrow Tag & Giant Brutalist Headline */}
            <div className="lg:col-span-8 flex flex-col items-start">
              {/* ASCII Decoding & Interactive Eyebrow Tag */}
              <AsciiScrambleTag isPreloaderDone={isPreloaderDone} />

              <h1
                className={`hero-headline-wrap text-display text-chalk uppercase pointer-events-auto select-text w-full ${
                  !isPreloaderDone ? "opacity-0" : ""
                }`}
              >
                {/* Row 1: Strictly upward slide (line1) with feathered mask */}
                <span className="relative block overflow-hidden headline-text-mask h-[1.15em] py-0.5">
                  {/* Outgoing text */}
                  {outgoingPairIdx !== null && (
                    <span
                      key={`out-line1-${outgoingPairIdx}`}
                      ref={line1OutRef}
                      className="absolute inset-0 block whitespace-nowrap will-change-transform text-chalk"
                    >
                      {HEADLINE_PAIRS[outgoingPairIdx].line1}
                    </span>
                  )}

                  {/* Incoming/Current text */}
                  <span
                    key={`cur-line1-${currentPairIdx}`}
                    ref={line1CurRef}
                    className="block whitespace-nowrap will-change-transform text-chalk"
                  >
                    {HEADLINE_PAIRS[currentPairIdx].line1}
                  </span>
                </span>

                {/* Row 2: Strictly upward slide with stagger delay (line2) with feathered mask */}
                <span className="relative block overflow-hidden headline-text-mask h-[1.15em] py-0.5">
                  {/* Outgoing text */}
                  {outgoingPairIdx !== null && (
                    <span
                      key={`out-line2-${outgoingPairIdx}`}
                      ref={line2OutRef}
                      className="absolute inset-0 block whitespace-nowrap will-change-transform text-chalk"
                    >
                      {HEADLINE_PAIRS[outgoingPairIdx].line2}
                    </span>
                  )}

                  {/* Incoming/Current text */}
                  <span
                    key={`cur-line2-${currentPairIdx}`}
                    ref={line2CurRef}
                    className="block whitespace-nowrap will-change-transform text-chalk"
                  >
                    {HEADLINE_PAIRS[currentPairIdx].line2}
                  </span>
                </span>
              </h1>
            </div>

            {/* Right Column: Editorial Paragraph (Preserved) */}
            <div
              className={`hero-editorial-wrap hidden lg:flex lg:col-span-4 flex-col justify-end lg:pl-4 pb-1 ${
                !isPreloaderDone ? "opacity-0" : ""
              }`}
            >
              <p className="text-body-editorial measure-editorial text-chalk pointer-events-auto select-text">
                Curiosity drives me to look beyond the obvious. With a background in geology, I bring analytical thinking, adaptability, and a constant desire to learn into every challenge.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 3: Bottom Ticker & Status Bar */}
      <div
        className="absolute bottom-0 inset-x-0 z-20 w-full bg-transparent pb-3.5 sm:pb-4 md:pb-5 pointer-events-none"
      >
        <div className="max-w-[1740px] mx-auto px-4 sm:px-10 lg:px-14 w-full flex flex-col">
          {/* Micro-Typography Row: 12-Column Editorial Grid matching Locomotive/Monolog reference */}
          <div
            ref={bottomContentRef}
            className="w-full flex items-center justify-between lg:grid lg:grid-cols-12 text-mono-label tracking-mono-meta text-chalk"
          >
            {/* Col 1-3: NORTH SUMATRA */}
            <div
              className={`bottom-bar-item lg:col-span-3 flex items-center ${
                !isPreloaderDone ? "opacity-0" : ""
              }`}
              style={{ clipPath: "inset(0 0% 0 0)" }}
            >
              <span className="text-chalk font-bold whitespace-nowrap pointer-events-auto select-text">
                NORTH SUMATRA
              </span>
            </div>

            {/* Col 4-7: Studio Clock [ HH : MM : SS ] */}
            <div
              className={`bottom-bar-item lg:col-span-4 flex items-center justify-start lg:pl-2 ${
                !isPreloaderDone ? "opacity-0" : ""
              }`}
              style={{ clipPath: "inset(0 0% 0 0)" }}
            >
              <div className="flex items-center gap-1.5 whitespace-nowrap text-mono-data tracking-mono-data tabular-nums pointer-events-auto select-text text-chalk font-bold">
                <span className="text-chalk">[</span>
                <span>{timeStr}</span>
                <span className="text-chalk">]</span>
              </div>
            </div>

            {/* Col 8-9: FOLLOW US */}
            <div
              className={`bottom-bar-item hidden lg:flex lg:col-span-2 items-center justify-end ${
                !isPreloaderDone ? "opacity-0" : ""
              }`}
              style={{ clipPath: "inset(0 0% 0 0)" }}
            >
              <span className="text-chalk whitespace-nowrap pointer-events-auto select-text font-medium">
                FOLLOW US
              </span>
            </div>

            {/* Col 10: INSTAGRAM + */}
            <div
              className={`bottom-bar-item hidden md:flex lg:col-span-1 items-center justify-end ${
                !isPreloaderDone ? "opacity-0" : ""
              }`}
              style={{ clipPath: "inset(0 0% 0 0)" }}
            >
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => gsap.to(e.currentTarget, { opacity: 0.6, duration: 0.2, ease: "power1.out" })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { opacity: 1, duration: 0.2, ease: "power1.out" })}
                className="text-chalk whitespace-nowrap pointer-events-auto cursor-pointer flex items-center gap-1 group font-bold"
              >
                <span>INSTAGRAM</span>
                <span className="text-chalk">+</span>
              </a>
            </div>

            {/* Col 11: LINKEDIN + */}
            <div
              className={`bottom-bar-item hidden md:flex lg:col-span-1 items-center justify-end ${
                !isPreloaderDone ? "opacity-0" : ""
              }`}
              style={{ clipPath: "inset(0 0% 0 0)" }}
            >
              <a
                href="https://linkedin.com/in/arlanpras"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => gsap.to(e.currentTarget, { opacity: 0.6, duration: 0.2, ease: "power1.out" })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { opacity: 1, duration: 0.2, ease: "power1.out" })}
                className="text-chalk whitespace-nowrap pointer-events-auto cursor-pointer flex items-center gap-1 group font-bold"
              >
                <span>LINKEDIN</span>
                <span className="text-chalk">+</span>
              </a>
            </div>

            {/* Col 12: Language Switcher (ID ◉ EN) */}
            <div
              className={`bottom-bar-item lg:col-span-1 flex items-center justify-end pointer-events-auto ${
                !isPreloaderDone ? "opacity-0" : ""
              }`}
              style={{ clipPath: "inset(0 0% 0 0)" }}
            >
              <button
                onClick={() => setLang(lang === "EN" ? "ID" : "EN")}
                className="flex items-center gap-1.5 cursor-pointer tracking-mono-meta text-chalk font-bold"
                title="Switch Language"
              >
                <span className={lang === "ID" ? "font-extrabold opacity-100" : "opacity-40"}>
                  ID
                </span>

                {/* GSAP-Controlled Pill Slider */}
                <div className="relative w-6 h-3 bg-chalk/15 hover:bg-chalk/25 border border-chalk/20 rounded-full flex items-center px-0.5">
                  <div
                    ref={langDotRef}
                    className="absolute w-2 h-2 rounded-full bg-chalk will-change-transform"
                    style={{ transform: lang === "EN" ? "translateX(11px)" : "translateX(0px)" }}
                  />
                </div>

                <span className={lang === "EN" ? "font-extrabold opacity-100" : "opacity-40"}>
                  EN
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
