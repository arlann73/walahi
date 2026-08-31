"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";

// Scroll-driven word color reveal
function RevealWord({ word, progress, start, end, bold }: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  bold?: boolean;
}) {
  const color = useTransform(progress, [start, end], ["#3A3632", "#FAFAF9"]);
  return (
    <motion.span
      style={{ color }}
      className={bold ? "font-semibold" : "font-light"}
    >
      {word}{" "}
    </motion.span>
  );
}

const brands = [
  "Vinamilk", "Fiumark", "OH", "Ovatr",
  "Ksana", "Studio", "Halo", "Cove",
];

const stats = [
  { value: "07+", label: "Project\nExperience" },
  { value: "02+", label: "Internship\nExperience" },
  { value: "15+", label: "Founder-led\nBrands" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const logosRef = useRef(null);
  const isLogosInView = useInView(logosRef, { once: true, margin: "-80px" });

  // Scroll progress scoped to the about section for word reveal
  const manifestoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: manifestoRef,
    offset: ["start 0.85", "start 0.2"],
  });

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-background"
    >

      {/* Top border */}
      <div className="relative z-10 border-t border-[#38342F]" />

      {/* ── MAIN BODY: Left stats col + Right manifesto ── */}
      <div
        ref={sectionRef}
        className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-28 md:py-44"
      >
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[180px_1fr] gap-0">

          {/* ── LEFT: Secondary stats metadata ── */}
          <div className="flex flex-col justify-between md:border-r border-[#38342F] md:pr-8 mb-14 md:mb-0">

            {/* ABOUT — section-h1: primary section title
                 Rule: one per section, large display, --highlight color, uppercase
                 Semantic: <h2> (page h1 is ARLAN in Hero) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12 md:mb-0"
            >
              {/* ABOUT — vertical rotated label, fits narrow sidebar without overflow */}
              <span
                className="font-mono font-normal tracking-[0.3em] uppercase"
                style={{
                  fontSize: "11px",
                  color: "#8A8580",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transform: "rotate(180deg)",
                  display: "block",
                  userSelect: "none",
                }}
              >
                ABOUT
              </span>
            </motion.div>

            {/* Stats stacked — bottom of left col, tertiary weight */}
            <div className="flex flex-row md:flex-col gap-6 md:gap-7 mt-8 md:mt-auto md:pt-12">
              {stats.map((s, i) => (
                <motion.div
                  key={s.value}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-[3px]"
                >
                  <span
                    className="font-display font-semibold tabular-nums"
                    style={{ fontSize: "clamp(20px, 1.6vw, 28px)", letterSpacing: "-0.02em", lineHeight: 1, color: "#FAFAF9" }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="font-mono leading-snug whitespace-pre-line"
                    style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B645C" }}
                  >
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Manifesto — dominant visual ── */}
          <div className="md:pl-14 lg:pl-24 xl:pl-28">

            {/* Main statement — scroll-driven word reveal */}
            <div
              ref={manifestoRef}
              style={{
                fontSize: "clamp(20px, 2.8vw, 40px)",
                lineHeight: 1.3,
                letterSpacing: "-0.025em",
                maxWidth: "680px",
              }}
              className="font-display mb-8"
            >
              {(() => {
                // Full text split into segments: [text, isBold]
                const segments: [string, boolean][] = [
                  ["Great", true],
                  ["founders", true],
                  ["changing", true],
                  ["the", true],
                  ["world", true],
                  ["deserve", true],
                  ["a", true],
                  ["presence", true],
                  ["as", true],
                  ["powerful", true],
                  ["as", true],
                  ["what", true],
                  ["they're", true],
                  ["building.", true],
                  ["Most", true],
                  ["founders", true],
                  ["we", true],
                  ["work", true],
                  ["with", true],
                  ["have", true],
                  ["built", true],
                  ["something", true],
                  ["significant,", true],
                  ["but", true],
                  ["their", true],
                  ["website", true],
                  ["doesn't", true],
                  ["show", true],
                  ["it", true],
                  ["yet.", true],
                ];
                const total = segments.length;
                return segments.map(([word, bold], i) => (
                  <RevealWord
                    key={i}
                    word={word}
                    bold={bold}
                    progress={scrollYProgress}
                    start={i / total}
                    end={Math.min((i + 3) / total, 1)}
                  />
                ));
              })()}
            </div>

            {/* Supporting paragraph — foreground color, readable */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="font-light leading-relaxed mb-12"
              style={{ fontSize: "clamp(13px, 1vw, 15px)", letterSpacing: "-0.01em", maxWidth: "420px", color: "#C4BFB8" }}
            >
              That gap costs more than revenue. It costs the certainty that your brand is finally being understood.
            </motion.p>

            {/* Avatar credit */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full border border-[#38342F] bg-[#1A1814] flex items-center justify-center flex-shrink-0">
                <span className="font-display font-bold text-[12px]" style={{ color: "#A9A49B" }}>A</span>
              </div>
              <span className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C4BFB8" }}>
                Arlan / Founder, MONOLOG
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── 4.3 BRANDS / SELECTED COLLABORATIONS ── */}
      <div
        ref={logosRef}
        className="relative z-10 border-t border-[#38342F]"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isLogosInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* SELECTED COLLABORATIONS — section-h2: sub-section label
                 Rule: mono, wide-tracked, muted color, uppercase
                 Semantic: <h3> within the section */}
            <h3 className="section-h2 mb-10 md:mb-12">Selected Collaborations</h3>

            <div className="flex flex-wrap gap-x-10 gap-y-6 md:gap-x-16 md:gap-y-8">
              {brands.map((name, i) => (
                <motion.span
                  key={name}
                  initial={{ opacity: 0 }}
                  animate={isLogosInView ? { opacity: 0.65 } : { opacity: 0 }}
                  whileHover={{ opacity: 0.95 }}
                  transition={{ opacity: { duration: 0.5, delay: i * 0.05 } }}
                  className="font-display font-medium"
                  style={{ fontSize: "clamp(13px, 1.2vw, 16px)", letterSpacing: "-0.01em", cursor: "default", color: "#F0EDE6" }}
                >
                  {name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="relative z-10 border-b border-[#38342F]" />
    </section>
  );
}
