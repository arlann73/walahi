"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ─── Milestone data ────────────────────────────────────────────────────────────
const milestones = [
  {
    year: "'19",
    title: "Starting out with my brother",
    description:
      "Everything began as a shared obsession — two brothers pulling apart design, frame by frame, learning what made things move people.",
    meta: "Brother / 6 years ago",
    side: "left" as const,
  },
  {
    year: "'20",
    title: "First freelance steps",
    description:
      "Took the first real brief from a real client. Small scope, massive lesson: taste alone doesn't ship. Discipline does.",
    meta: "Solo / 5 years ago",
    side: "right" as const,
  },
  {
    year: "'21",
    title: "Beyond what I knew",
    description:
      "Pushed into interaction design and motion. The web stopped feeling like pages and started feeling like space.",
    meta: "Studio / 4 years ago",
    side: "left" as const,
  },
  {
    year: "'22",
    title: "Leveling up",
    description:
      "First internship at a creative agency. Learned the gap between a good idea and a shipped product — and started closing it.",
    meta: "Agency / 3 years ago",
    side: "right" as const,
  },
  {
    year: "'23",
    title: "From trust to referrals",
    description:
      "Clients started coming through word of mouth. The work was doing the talking. Founded MONOLOG.",
    meta: "MONOLOG / 2 years ago",
    side: "left" as const,
  },
  {
    year: "'24",
    title: "A life-changing year",
    description:
      "Delivered 15+ founder-led brand and web projects. Awwwards recognition. Started to understand what it means to build with intention.",
    meta: "MONOLOG / 1 year ago",
    side: "right" as const,
  },
  {
    year: "'26",
    title: "The journey continues",
    description:
      "Still building. Still obsessing. Every project is another chance to close the gap between a founder's ambition and the world's perception of them.",
    meta: "MONOLOG / Present",
    side: "left" as const,
    isActive: true,
  },
];

// ─── SVG Timeline Path ─────────────────────────────────────────────────────────
function TimelinePath({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const pathLength = useTransform(progress, [0, 0.9], [0, 1]);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B645C" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#6B645C" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Zigzag path — drawn on scroll */}
      <motion.path
        d="
          M 50% 4%
          C 50% 8%, 20% 11%, 20% 16%
          C 20% 21%, 50% 23%, 50% 28%
          C 50% 33%, 80% 35%, 80% 40%
          C 80% 45%, 50% 47%, 50% 52%
          C 50% 57%, 20% 59%, 20% 64%
          C 20% 69%, 50% 71%, 50% 76%
          C 50% 81%, 80% 83%, 80% 88%
          C 80% 93%, 50% 95%, 50% 98%
        "
        fill="none"
        stroke="url(#pathGrad)"
        strokeWidth="1"
        style={{ pathLength }}
        initial={{ pathLength: 0 }}
      />
    </svg>
  );
}

// ─── Milestone Card ────────────────────────────────────────────────────────────
function MilestoneCard({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = milestone.side === "left";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -32 : 32, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative w-full md:w-[46%] ${
        isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
      }`}
    >
      {/* Card */}
      <div
        className="border border-[#38342F] bg-[#0D0C0B] group cursor-default"
        style={{ padding: "28px 32px 32px" }}
      >
        {/* Year + Active indicator */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="font-mono font-bold"
            style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              color: milestone.isActive ? "#FAFAF9" : "#8A8580",
              textTransform: "uppercase",
            }}
          >
            {milestone.year}
          </span>
          {milestone.isActive && (
            <span
              className="flex items-center gap-1.5"
              style={{ fontSize: "9px", letterSpacing: "0.15em", color: "#8A8580", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-[#6B645C] animate-pulse"
                aria-hidden="true"
              />
              Ongoing
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="font-display font-semibold mb-4 leading-tight"
          style={{
            fontSize: "clamp(18px, 1.8vw, 26px)",
            letterSpacing: "-0.03em",
            color: "#F0EDE6",
          }}
        >
          {milestone.title}
        </h3>

        {/* Description */}
        <p
          className="font-light leading-relaxed mb-6"
          style={{
            fontSize: "14px",
            letterSpacing: "-0.01em",
            color: "#8A8580",
            maxWidth: "340px",
          }}
        >
          {milestone.description}
        </p>

        {/* Footer meta + read more */}
        <div className="flex items-center justify-between border-t border-[#38342F] pt-4">
          <span
            className="font-mono"
            style={{ fontSize: "10px", letterSpacing: "0.1em", color: "#6B645C", textTransform: "uppercase" }}
          >
            {milestone.meta}
          </span>
          <motion.span
            className="font-mono cursor-pointer"
            style={{ fontSize: "10px", letterSpacing: "0.08em", color: "#6B645C", textTransform: "uppercase" }}
            whileHover={{ color: "#FAFAF9" }}
            transition={{ duration: 0.2 }}
          >
            Read more →
          </motion.span>
        </div>
      </div>

      {/* Dot connector on the center spine */}
      <div
        className={`hidden md:block absolute top-8 w-2 h-2 border border-[#38342F] bg-[#080807] ${
          isLeft ? "right-[-5px]" : "left-[-5px]"
        }`}
        aria-hidden="true"
      />
    </motion.div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function JourneyTimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"],
  });

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-background"
      aria-label="Journey Timeline"
    >
      {/* Top border */}
      <div className="border-t border-[#38342F]" />

      {/* ── HEADER ── */}
      <div
        ref={headerRef}
        className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-36 pb-16 md:pb-24"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* Left: section label + title */}
          <div>
            <motion.h2
              className="section-h1 mb-0"
              initial={{ opacity: 0, y: 24 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Journey
            </motion.h2>
          </div>

          {/* Right: context paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-light leading-relaxed md:max-w-[360px] md:text-right"
            style={{ fontSize: "14px", letterSpacing: "-0.01em", color: "#8A8580" }}
          >
            From two brothers pulling apart Dribbble shots at midnight to building brands for founders changing their industries. Seven years compressed into seven chapters.
          </motion.p>
        </div>

        {/* Divider */}
        <motion.div
          className="mt-10 border-t border-[#38342F]"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isHeaderInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* ── TIMELINE ── */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 pb-24 md:pb-40">
        {/* Relative container for SVG path + cards */}
        <div className="relative">
          {/* SVG path — desktop only */}
          <div className="hidden md:block absolute inset-0 pointer-events-none" aria-hidden="true">
            <TimelinePath progress={scrollYProgress} />
          </div>

          {/* Vertical line — mobile only */}
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-[#38342F]" aria-hidden="true" />

          {/* Cards */}
          <div className="flex flex-col gap-8 md:gap-0">
            {milestones.map((milestone, i) => (
              <div
                key={milestone.year}
                className={`relative md:mb-[-20px] ${i < milestones.length - 1 ? "md:mb-8" : ""}`}
                style={{ zIndex: milestones.length - i }}
              >
                {/* Mobile: year dot on left spine */}
                <div
                  className="md:hidden flex items-start gap-5 pl-6"
                >
                  <div
                    className="absolute left-[-4px] top-8 w-2 h-2 border border-[#38342F] bg-[#080807]"
                    aria-hidden="true"
                  />
                  <MilestoneCard milestone={milestone} index={i} />
                </div>

                {/* Desktop: zigzag positioning */}
                <div className="hidden md:block">
                  <MilestoneCard milestone={milestone} index={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="border-b border-[#38342F]" />
    </section>
  );
}
