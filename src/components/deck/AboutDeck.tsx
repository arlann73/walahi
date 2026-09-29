"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { CHAPTERS, type ChapterId } from "./types";
import DeckSidebar from "./DeckSidebar";
import {
  JourneyPanel,
  AboutPanel,
  WhatIDoPanel,
  OurVibePanel,
  CoreValuesPanel,
  ToolkitPanel,
  TheWorkPanel,
  CertificationsPanel,
  RootsPanel,
  ContactPanel,
} from "./DeckPanels";

interface AboutDeckProps {
  onClose?: () => void;
}

export default function AboutDeck({ onClose }: AboutDeckProps = {}) {
  const [activeChapter, setActiveChapter] = useState<ChapterId>("journey");
  const stageRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  const panelRefs = useRef<Record<ChapterId, HTMLElement | null>>({
    journey: null,
    about: null,
    "what-i-do": null,
    "our-vibe": null,
    "core-values": null,
    toolkit: null,
    "the-work": null,
    certifications: null,
    "the-roots": null,
    "lets-talk": null,
  });

  // 1. Deep linking: read initial hash on mount
  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace("#", "");
      const found = CHAPTERS.find((c) => c.id === hash);
      if (found) {
        setActiveChapter(found.id);
      }
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  // 2. Select chapter handler with URL sync
  const handleSelectChapter = useCallback((id: ChapterId) => {
    setActiveChapter(id);
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `${window.location.pathname}#${id}`);
    }
  }, []);

  // 3. Navigate Step with Hard Stop (Q2: 01 stays at 01, 10 stays at 10)
  const navigateStep = useCallback(
    (direction: 1 | -1): boolean => {
      const chapterList = CHAPTERS.map((c) => c.id);
      const currentIndex = chapterList.indexOf(activeChapter);
      const nextIndex = currentIndex + direction;

      // Hard stop boundary checks
      if (nextIndex < 0 || nextIndex >= chapterList.length) {
        return false;
      }

      handleSelectChapter(chapterList[nextIndex]);
      return true;
    },
    [activeChapter, handleSelectChapter]
  );

  // 4. GSAP Slide Animation Engine
  useEffect(() => {
    const chapterList = CHAPTERS.map((c) => c.id);

    chapterList.forEach((id) => {
      const panel = panelRefs.current[id];
      if (!panel) return;

      if (id === activeChapter) {
        gsap.killTweensOf(panel);
        panel.style.zIndex = "20";
        panel.style.pointerEvents = "auto";
        gsap.to(panel, {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
        });
      } else {
        gsap.killTweensOf(panel);
        gsap.to(panel, {
          opacity: 0,
          scale: 0.98,
          duration: 0.25,
          ease: "power2.inOut",
          onComplete: () => {
            if (panel) {
              panel.style.pointerEvents = "none";
              panel.style.zIndex = "10";
            }
          },
        });
      }
    });
  }, [activeChapter]);

  // 5. Wheel Scroll Orchestration (Q1: 700ms cooldown, threshold >= 25px)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent standard browser page scroll
      e.preventDefault();

      // Guard with cooldown to prevent skipping multiple slides on flick
      if (isAnimatingRef.current) return;

      // Threshold check to avoid accidental micro-scrolls
      if (Math.abs(e.deltaY) < 25) return;

      const direction: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      const moved = navigateStep(direction);

      if (moved) {
        isAnimatingRef.current = true;
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 700);
      }
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [navigateStep]);

  // 6. Touch Swipe Gestures for Mobile & Tablet (Q4)
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      if (isAnimatingRef.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartYRef.current - touchEndY;
      touchStartYRef.current = null;

      // Minimum swipe distance threshold
      if (Math.abs(deltaY) < 40) return;

      // Swipe up (deltaY > 0) -> Next slide (1)
      // Swipe down (deltaY < 0) -> Prev slide (-1)
      const direction: 1 | -1 = deltaY > 0 ? 1 : -1;
      const moved = navigateStep(direction);

      if (moved) {
        isAnimatingRef.current = true;
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 700);
      }
    };

    stage.addEventListener("touchstart", handleTouchStart, { passive: true });
    stage.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      stage.removeEventListener("touchstart", handleTouchStart);
      stage.removeEventListener("touchend", handleTouchEnd);
    };
  }, [navigateStep]);

  // 7. Keyboard Navigation (Arrow Keys + Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        navigateStep(1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        navigateStep(-1);
      } else if (e.key === "Escape") {
        e.preventDefault();
        if (onClose) {
          onClose();
        } else {
          handleSelectChapter("journey");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateStep, handleSelectChapter, onClose]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#050505] text-white font-sans overflow-hidden select-none flex z-50">
      {/* Fixed Vertical Navigation Sidebar */}
      <DeckSidebar
        activeChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
        onClose={onClose}
      />

      {/* Main Content Stage: 100vh viewport-fitted with wheel & touch scroll capture */}
      <main
        ref={stageRef}
        className="flex-1 h-screen relative bg-black overflow-hidden select-none touch-none"
        data-purpose="deck-stage"
      >
        {/* Floating Top Right Close Button if mounted via modal */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-40 px-3 py-1.5 rounded-sm bg-black/70 hover:bg-black/95 text-white/80 hover:text-white border border-white/15 font-mono text-[10px] tracking-widest uppercase flex items-center gap-2 cursor-pointer transition-colors backdrop-blur-sm shadow-lg"
            type="button"
            aria-label="Close pitchdeck"
          >
            <span>CLOSE</span>
            <span className="text-white/40">✕</span>
          </button>
        )}
        {/* CHAPTER 01: JOURNEY */}
        <section
          ref={(el) => {
            panelRefs.current.journey = el;
          }}
          id="panel-journey"
          className="absolute inset-0 w-full h-full p-2.5 sm:p-3.5 lg:p-4 z-20 opacity-100 scale-100 will-change-transform overflow-hidden"
          data-purpose="chapter-view"
        >
          <JourneyPanel
            onClose={() => handleSelectChapter("journey")}
            onNavigate={handleSelectChapter}
          />
        </section>

        {/* CHAPTER 02: ABOUT */}
        <section
          ref={(el) => {
            panelRefs.current.about = el;
          }}
          id="panel-about"
          className="absolute inset-0 w-full h-full p-2.5 sm:p-3.5 lg:p-4 z-10 opacity-0 scale-98 pointer-events-none will-change-transform overflow-hidden"
          data-purpose="chapter-view"
        >
          <AboutPanel onClose={() => handleSelectChapter("journey")} />
        </section>

        {/* CHAPTER 03: WHAT I DO */}
        <section
          ref={(el) => {
            panelRefs.current["what-i-do"] = el;
          }}
          id="panel-what-i-do"
          className="absolute inset-0 w-full h-full p-2.5 sm:p-3.5 lg:p-4 z-10 opacity-0 scale-98 pointer-events-none will-change-transform overflow-hidden"
          data-purpose="chapter-view"
        >
          <WhatIDoPanel onClose={() => handleSelectChapter("journey")} />
        </section>

        {/* CHAPTER 04: OUR VIBE */}
        <section
          ref={(el) => {
            panelRefs.current["our-vibe"] = el;
          }}
          id="panel-our-vibe"
          className="absolute inset-0 w-full h-full p-2.5 sm:p-3.5 lg:p-4 z-10 opacity-0 scale-98 pointer-events-none will-change-transform overflow-hidden"
          data-purpose="chapter-view"
        >
          <OurVibePanel onClose={() => handleSelectChapter("journey")} />
        </section>

        {/* CHAPTER 05: CORE VALUES */}
        <section
          ref={(el) => {
            panelRefs.current["core-values"] = el;
          }}
          id="panel-core-values"
          className="absolute inset-0 w-full h-full p-2.5 sm:p-3.5 lg:p-4 z-10 opacity-0 scale-98 pointer-events-none will-change-transform overflow-hidden"
          data-purpose="chapter-view"
        >
          <CoreValuesPanel onClose={() => handleSelectChapter("journey")} />
        </section>

        {/* CHAPTER 06: TOOLKIT */}
        <section
          ref={(el) => {
            panelRefs.current.toolkit = el;
          }}
          id="panel-toolkit"
          className="absolute inset-0 w-full h-full p-2.5 sm:p-3.5 lg:p-4 z-10 opacity-0 scale-98 pointer-events-none will-change-transform overflow-hidden"
          data-purpose="chapter-view"
        >
          <ToolkitPanel onClose={() => handleSelectChapter("journey")} />
        </section>

        {/* CHAPTER 07: THE WORK */}
        <section
          ref={(el) => {
            panelRefs.current["the-work"] = el;
          }}
          id="panel-the-work"
          className="absolute inset-0 w-full h-full p-2.5 sm:p-3.5 lg:p-4 z-10 opacity-0 scale-98 pointer-events-none will-change-transform overflow-hidden"
          data-purpose="chapter-view"
        >
          <TheWorkPanel onClose={() => handleSelectChapter("journey")} />
        </section>

        {/* CHAPTER 08: CERTIFICATIONS */}
        <section
          ref={(el) => {
            panelRefs.current.certifications = el;
          }}
          id="panel-certifications"
          className="absolute inset-0 w-full h-full p-2.5 sm:p-3.5 lg:p-4 z-10 opacity-0 scale-98 pointer-events-none will-change-transform overflow-hidden"
          data-purpose="chapter-view"
        >
          <CertificationsPanel onClose={() => handleSelectChapter("journey")} />
        </section>

        {/* CHAPTER 09: THE ROOTS */}
        <section
          ref={(el) => {
            panelRefs.current["the-roots"] = el;
          }}
          id="panel-the-roots"
          className="absolute inset-0 w-full h-full p-2.5 sm:p-3.5 lg:p-4 z-10 opacity-0 scale-98 pointer-events-none will-change-transform overflow-hidden"
          data-purpose="chapter-view"
        >
          <RootsPanel onClose={() => handleSelectChapter("journey")} />
        </section>

        {/* CHAPTER 10: LET'S TALK */}
        <section
          ref={(el) => {
            panelRefs.current["lets-talk"] = el;
          }}
          id="panel-lets-talk"
          className="absolute inset-0 w-full h-full p-2.5 sm:p-3.5 lg:p-4 z-10 opacity-0 scale-98 pointer-events-none will-change-transform overflow-hidden"
          data-purpose="chapter-view"
        >
          <ContactPanel onClose={() => handleSelectChapter("journey")} />
        </section>
      </main>
    </div>
  );
}
