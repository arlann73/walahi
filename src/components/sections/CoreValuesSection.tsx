"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CoreValueItem {
  id: string;
  tag: string;
  indexStr: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  traits: string[];
}

const CORE_VALUES: CoreValueItem[] = [
  {
    id: "01",
    tag: "[ CORE VALUE 01 ]",
    indexStr: "01 / 03",
    titleLine1: "STAY CURIOUS,",
    titleLine2: "ADAPT FAST.",
    description:
      "The industry evolves, and so do I. I thrive on exploring new tools, from traditional subsurface mapping to modern AI-driven workflows. It is about maintaining a relentless eagerness to learn and pivoting quickly to deliver the best results. High adaptability meets a forward-thinking mindset.",
    traits: ["Adaptability", "Eager to Learn"],
  },
  {
    id: "02",
    tag: "[ CORE VALUE 02 ]",
    indexStr: "02 / 03",
    titleLine1: "SHARP FOCUS,",
    titleLine2: "SOLID EXECUTION.",
    description:
      "Great outcomes require intense discipline and a meticulous eye for detail. Whether I am analyzing complex spatial datasets or structuring a project layout, I believe in doing the work right. No shortcuts—just a strong work ethic and a commitment to high-quality, precise results from start to finish.",
    traits: ["Detail-oriented", "Discipline", "Strong Work Ethic"],
  },
  {
    id: "03",
    tag: "[ CORE VALUE 03 ]",
    indexStr: "03 / 03",
    titleLine1: "KEEP IT",
    titleLine2: "GROUNDED.",
    description:
      "True progress happens when people work together with integrity. I bring loyalty, clear communication, and a collaborative spirit to every team I join. Whether coordinating field operations or supporting a corporate environment, I show up with honesty and a genuine drive to help the entire team succeed.",
    traits: ["Teamwork", "Leadership", "Integrity", "Loyalty"],
  },
];

export default function CoreValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);

  const card1Ref = useRef<HTMLElement>(null);
  const card2Ref = useRef<HTMLElement>(null);
  const card3Ref = useRef<HTMLElement>(null);

  const tagBar1Ref = useRef<HTMLDivElement>(null);
  const tagBar2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = pinnedStageRef.current;
      const card2 = card2Ref.current;
      const card3 = card3Ref.current;

      if (!section || !stage || !card2 || !card3) return;

      const setStageY = gsap.quickSetter(stage, "y", "px");
      const setCard2Y = gsap.quickSetter(card2, "y", "px");
      const setCard3Y = gsap.quickSetter(card3, "y", "px");

      const updateStack = () => {
        // 1. PINNING: Clearance below fixed Navbar
        const pinTop = window.innerWidth < 640 ? 60 : 70;
        const rect = section.getBoundingClientRect();
        const scrollDist = pinTop - rect.top;
        const maxPin = Math.max(0, section.offsetHeight - window.innerHeight);

        // Exact height of the tag bar (hairline + [ CORE VALUE 01 ])
        const h1 = tagBar1Ref.current ? tagBar1Ref.current.offsetHeight : 44;
        const h2 = tagBar2Ref.current ? tagBar2Ref.current.offsetHeight : 44;

        // Card 2 lands directly below text [ CORE VALUE 01 ]
        const targetY2 = h1;
        // Card 3 lands directly below text [ CORE VALUE 02 ]
        const targetY3 = targetY2 + h2;
        const startY = window.innerHeight;

        // Before section reaches top of viewport: stage at top, Card 2 & 3 below screen
        if (scrollDist <= 0) {
          setStageY(0);
          setCard2Y(startY);
          setCard3Y(startY);
          return;
        }

        // Section reaches top of viewport: PINNED!
        const stageY = Math.min(maxPin, scrollDist);
        setStageY(stageY);

        // Active phases for sequential overlapping
        const phase1 = maxPin * 0.45;
        const phase2 = maxPin * 0.90;

        // Core Value 02: Moves up & stops right below text [ CORE VALUE 01 ]
        if (scrollDist < phase1) {
          const p1 = Math.max(0, Math.min(1, scrollDist / phase1));
          const ease1 = p1 * p1 * (3 - 2 * p1);
          setCard2Y(Math.round(startY + (targetY2 - startY) * ease1));
        } else {
          setCard2Y(targetY2);
        }

        // Core Value 03: Moves up & stops right below text [ CORE VALUE 02 ]
        if (scrollDist <= phase1) {
          setCard3Y(startY);
        } else if (scrollDist < phase2) {
          const p2 = Math.max(0, Math.min(1, (scrollDist - phase1) / (phase2 - phase1)));
          const ease2 = p2 * p2 * (3 - 2 * p2);
          setCard3Y(Math.round(startY + (targetY3 - startY) * ease2));
        } else {
          setCard3Y(targetY3);
        }
      };

      gsap.ticker.add(updateStack);

      return () => {
        gsap.ticker.remove(updateStack);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="core-values"
      aria-labelledby="core-values-01-title"
      className="relative w-full h-[280vh] bg-[#121214] text-chalk antialiased select-none overflow-hidden"
    >
      {/* ── PINNED STAGE (Locks at top of viewport when reached) ── */}
      <div
        ref={pinnedStageRef}
        className="relative w-full max-w-[1740px] mx-auto will-change-transform"
      >
        {/* ── CARD 01 (Base Layer: Core Value 01) ── */}
        <article
          ref={card1Ref}
          aria-labelledby="core-values-01-title"
          className="relative w-full px-4 sm:px-10 lg:px-16 bg-[#121214] z-10 min-h-[calc(100vh-70px)]"
        >
          {/* Top Hairline Divider */}
          <div className="w-full h-px bg-white/15" aria-hidden="true" />

          {/* Tag Bar: [ CORE VALUE 01 ] (Card 02 stops directly beneath this) */}
          <div ref={tagBar1Ref} className="pt-3 pb-3 sm:pt-4 sm:pb-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-pixel-label text-chalk">
                {CORE_VALUES[0].tag}
              </span>
              <span className="text-mono-caption text-muted tabular-nums">
                {CORE_VALUES[0].indexStr}
              </span>
            </div>
          </div>

          {/* Grid Layout: Left Column (Title), Right Column (Description + Traits) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-12">
            <div className="lg:col-span-7">
              <h3
                id="core-values-01-title"
                className="text-h1 text-white select-none"
              >
                <span className="block">{CORE_VALUES[0].titleLine1}</span>
                <span className="block">{CORE_VALUES[0].titleLine2}</span>
              </h3>
            </div>

            {/* Right Column: Editorial Paragraph & Category Chips */}
            <div className="lg:col-span-5 flex flex-col gap-5 pt-2 lg:pt-3">
              <p className="text-body-editorial text-chalk measure-editorial">
                {CORE_VALUES[0].description}
              </p>
              <ul className="flex flex-wrap gap-2" aria-label="Traits">
                {CORE_VALUES[0].traits.map((trait) => (
                  <li
                    key={trait}
                    className="text-mono-label tracking-mono-meta text-muted border border-border rounded-sm px-2.5 py-1"
                  >
                    [ {trait} ]
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        {/* ── CARD 02 (Layer 2: Core Value 02, Stops below [ CORE VALUE 01 ]) ── */}
        <article
          ref={card2Ref}
          aria-labelledby="core-values-02-title"
          style={{ transform: "translate3d(0px, 100vh, 0px)" }}
          className="absolute top-0 left-0 w-full px-4 sm:px-10 lg:px-16 bg-[#121214] z-20 min-h-[calc(100vh-70px)] will-change-transform"
        >
          {/* Top Hairline Divider */}
          <div className="w-full h-px bg-white/15" aria-hidden="true" />

          {/* Tag Bar: [ CORE VALUE 02 ] (Card 03 stops directly beneath this) */}
          <div ref={tagBar2Ref} className="pt-3 pb-3 sm:pt-4 sm:pb-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-pixel-label text-chalk">
                {CORE_VALUES[1].tag}
              </span>
              <span className="text-mono-caption text-muted tabular-nums">
                {CORE_VALUES[1].indexStr}
              </span>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-12">
            <div className="lg:col-span-7">
              <h3
                id="core-values-02-title"
                className="text-h1 text-white select-none"
              >
                <span className="block">{CORE_VALUES[1].titleLine1}</span>
                <span className="block">{CORE_VALUES[1].titleLine2}</span>
              </h3>
            </div>

            {/* Right Column: Editorial Paragraph & Category Chips */}
            <div className="lg:col-span-5 flex flex-col gap-5 pt-2 lg:pt-3">
              <p className="text-body-editorial text-chalk measure-editorial">
                {CORE_VALUES[1].description}
              </p>
              <ul className="flex flex-wrap gap-2" aria-label="Traits">
                {CORE_VALUES[1].traits.map((trait) => (
                  <li
                    key={trait}
                    className="text-mono-label tracking-mono-meta text-muted border border-border rounded-sm px-2.5 py-1"
                  >
                    [ {trait} ]
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        {/* ── CARD 03 (Layer 3: Core Value 03, Stops below [ CORE VALUE 02 ]) ── */}
        <article
          ref={card3Ref}
          aria-labelledby="core-values-03-title"
          style={{ transform: "translate3d(0px, 100vh, 0px)" }}
          className="absolute top-0 left-0 w-full px-4 sm:px-10 lg:px-16 bg-[#121214] z-30 min-h-[calc(100vh-70px)] will-change-transform"
        >
          {/* Top Hairline Divider */}
          <div className="w-full h-px bg-white/15" aria-hidden="true" />

          {/* Tag Bar: [ CORE VALUE 03 ] */}
          <div className="pt-3 pb-3 sm:pt-4 sm:pb-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-pixel-label text-chalk">
                {CORE_VALUES[2].tag}
              </span>
              <span className="text-mono-caption text-muted tabular-nums">
                {CORE_VALUES[2].indexStr}
              </span>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-12">
            <div className="lg:col-span-7">
              <h3
                id="core-values-03-title"
                className="text-h1 text-white select-none"
              >
                <span className="block">{CORE_VALUES[2].titleLine1}</span>
                <span className="block">{CORE_VALUES[2].titleLine2}</span>
              </h3>
            </div>

            {/* Right Column: Editorial Paragraph & Category Chips */}
            <div className="lg:col-span-5 flex flex-col gap-5 pt-2 lg:pt-3">
              <p className="text-body-editorial text-chalk measure-editorial">
                {CORE_VALUES[2].description}
              </p>
              <ul className="flex flex-wrap gap-2" aria-label="Traits">
                {CORE_VALUES[2].traits.map((trait) => (
                  <li
                    key={trait}
                    className="text-mono-label tracking-mono-meta text-muted border border-border rounded-sm px-2.5 py-1"
                  >
                    [ {trait} ]
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
