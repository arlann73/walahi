"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [vh, setVh] = useState(800);
  
  useEffect(() => {
    setMounted(true);
    setVh(window.innerHeight);
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = mounted && !prefersReducedMotion;

  // Use absolute scrollY so parallax works perfectly even when the Hero is sticky
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, [0, vh], [0, 1]);

  // Layer 0 — background
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const bgBlur = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bgFilter = useTransform(bgBlur, (v) => `blur(${v}px)`);

  // Layer 1 — badge
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const badgeScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  // Layer 2 — globe
  const globeY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const globeOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const globeRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  // Layer 3 — tagline + description
  const textY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  // Layer 4 — stats kiri/kanan
  const statsY = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const statsOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  // Layer 5 — wordmark
  const wordmarkY = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const wordmarkScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);

  return (
    <section
      ref={heroRef}
      className="relative h-[100dvh] overflow-hidden bg-background pt-[12dvh] md:pt-[16dvh] w-full flex flex-col items-center"
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blurFadeIn {
          from { opacity: 0; filter: blur(12px); transform: translateY(16px); }
          to { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
        .cinematic-enter {
          animation: blurFadeIn 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }
      `}} />

      {/* Layer 0 — Background */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform pointer-events-none"
        style={shouldAnimate ? { y: bgY, scale: bgScale, filter: bgFilter } : undefined}
      >
        <div className="absolute inset-0 opacity-50">
          <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-[#3B423C]/20 blur-[120px] rounded-full translate-y-1/3 -translate-x-1/4" />
          <div className="absolute top-1/4 right-0 w-[50vw] h-[50vw] bg-[#43403A]/20 blur-[100px] rounded-full translate-x-1/3" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            mixBlendMode: "overlay",
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "4px 4px"
          }}
        />
      </motion.div>

      {/* Layer 4 — Stats (Absolute, Outside Flex) */}
      <motion.div
        className="absolute top-[35%] left-6 md:left-12 xl:left-24 z-[5] hidden md:flex flex-col gap-2 cinematic-enter"
        style={{ animationDelay: "400ms", ...(shouldAnimate ? { y: statsY, opacity: statsOpacity } : {}) }}
      >
        <span className="text-highlight font-display font-medium tabular-nums tracking-[-0.04em]" style={{ fontSize: "clamp(28px, 3vw, 48px)" }}>07+</span>
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted">YEARS EXPERIENCE</span>
      </motion.div>

      <motion.div
        className="absolute top-[35%] right-6 md:right-12 xl:right-24 z-[5] hidden md:flex flex-col gap-2 items-end text-right cinematic-enter"
        style={{ animationDelay: "400ms", ...(shouldAnimate ? { y: statsY, opacity: statsOpacity } : {}) }}
      >
        <span className="text-highlight font-display font-medium tabular-nums tracking-[-0.04em]" style={{ fontSize: "clamp(28px, 3vw, 48px)" }}>02+</span>
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted">DESIGN × CODE</span>
      </motion.div>

      {/* Main Content Flex Column */}
      <div
        className="relative z-10 w-full flex flex-col items-center justify-between h-full flex-1"
        style={{ gap: "clamp(48px, 6vw, 96px)" }}
      >
        <div className="w-full max-w-[720px] px-6 flex flex-col items-center text-center">

          {/* Mobile Stats */}
          <motion.div
            className="flex md:hidden w-full justify-center gap-12 mb-10 cinematic-enter"
            style={{ animationDelay: "150ms", ...(shouldAnimate ? { y: statsY, opacity: statsOpacity } : {}) }}
          >
            <div className="flex flex-col gap-1 items-center">
              <span className="text-highlight font-display font-medium tabular-nums tracking-[-0.04em] text-3xl">07+</span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted">YEARS EXP</span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span className="text-highlight font-display font-medium tabular-nums tracking-[-0.04em] text-3xl">02+</span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted">DISCIPLINES</span>
            </div>
          </motion.div>

          {/* Layer 1 — Badge */}
          <motion.div
            className="cinematic-enter mb-6 will-change-transform"
            style={{ animationDelay: "200ms", ...(shouldAnimate ? { y: badgeY, opacity: badgeOpacity, scale: badgeScale } : {}) }}
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary">AVAILABLE FOR WORK</span>
          </motion.div>

          {/* Layer 2 — Globe Icon */}
          <motion.div
            className="mb-8 text-muted cinematic-enter will-change-transform"
            style={{ animationDelay: "300ms", ...(shouldAnimate ? { y: globeY, opacity: globeOpacity, scale: globeScale, rotate: globeRotate } : {}) }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <ellipse cx="12" cy="12" rx="10" ry="4"></ellipse>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              <path d="M2 12h20"></path>
            </svg>
          </motion.div>

          {/* Layer 3 — Tagline + Description */}
          <motion.div
            className="flex flex-col items-center will-change-transform"
            style={shouldAnimate ? { y: textY, opacity: textOpacity, scale: textScale } : undefined}
          >
            <h3
              className="font-display font-medium text-foreground leading-snug mb-4 cinematic-enter tracking-tight"
              style={{ animationDelay: "450ms" }}
            >
              <span className="text-lg md:text-xl lg:text-2xl block">DIGITAL DESIGNER</span>
              <span className="text-lg md:text-xl lg:text-2xl block">& CREATIVE DEVELOPER</span>
            </h3>

            <p className="text-secondary font-light text-xs md:text-sm leading-relaxed max-w-[420px] cinematic-enter" style={{ animationDelay: "600ms" }}>
              We design change-making website experiences that finally reflect what you've actually built. For established brands whose reputation has outgrown their digital presence.
            </p>
          </motion.div>
        </div>

        {/* Layer 5 — Giant Wordmark ARLAN (Absolute Anchored) */}
        <motion.div 
          className="absolute bottom-[4dvh] md:bottom-[6dvh] left-0 w-full flex justify-center pointer-events-none select-none cinematic-enter will-change-transform z-[1]"
          style={{ animationDelay: "750ms", ...(shouldAnimate ? { y: wordmarkY, scale: wordmarkScale } : {}) }}
        >
          <h1
            className="font-display font-bold uppercase text-primary leading-[0.8]"
            style={{
              fontSize: "clamp(100px, min(34vw, 44vh), 1000px)",
              letterSpacing: "-0.03em",
              whiteSpace: "nowrap"
            }}
          >
            ARLAN
          </h1>
        </motion.div>

      </div>
    </section>
  );
}
