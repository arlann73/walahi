"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export interface PreloaderProps {
  is3DReady: boolean;
  onComplete: () => void;
}

interface GridTile {
  row: number;
  col: number;
  x: number;
  y: number;
  baseSize: number;
  distFromCenter: number;
  active: boolean;
  alpha: number;
  targetAlpha: number;
  color: string;
  flipPhase: number;
  flipSpeed: number;
}

export default function Preloader({ is3DReady, onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  // Phases: 1 = Counter (0-100%), 2 = Logo & Locomotive Char Reveal, 3 = Full-Screen Pixel Depth Pull-Back
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const is3DReadyRef = useRef(is3DReady);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    is3DReadyRef.current = is3DReady;
  }, [is3DReady]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // 3-Layer Triple Protection Scroll Lock & Hard Reset to (0, 0)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Layer 1: Force browser to disable native scroll position restoration
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }

      // Layer 2: Instant native window scroll reset
      window.scrollTo(0, 0);

      // Layer 3: Lock body overflow & pause Lenis engine immediately
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void; scrollTo: (target: number, opts: { immediate: boolean }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
        lenis.stop();
      }

      return () => {
        document.body.style.overflow = origOverflow;
        if (lenis) {
          lenis.start();
        }
      };
    }
  }, []);

  // Phase 1: Numeric Counter Logic (Smooth minimum 1.3s duration)
  useEffect(() => {
    let animId: number;
    let startTime: number | null = null;
    const minDuration = 1300; // 1.3s smooth counter

    const countLoop = (time: number) => {
      if (startTime === null) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.max(0, Math.min(1, elapsed / minDuration));

      // Cap at 99% until 3D Canvas reports ready (with 3.5s safety timeout)
      let effectiveProgress = progress;
      const isTimedOut = elapsed > 3500;
      if (!is3DReadyRef.current && !isTimedOut && progress >= 0.99) {
        effectiveProgress = 0.99;
      }

      const currentInt = Math.floor(effectiveProgress * 100);
      setDisplayProgress(currentInt);

      if (effectiveProgress >= 1.0 && (is3DReadyRef.current || isTimedOut)) {
        // Phase 1 Finished -> Transition to Phase 2 (Logo & Locomotive Reveal)
        if (counterRef.current) {
          gsap.to(counterRef.current, {
            opacity: 0,
            scale: 0.92,
            duration: 0.28,
            ease: "power2.out",
            onComplete: () => {
              setPhase(2);
            },
          });
        } else {
          setPhase(2);
        }
        return;
      }

      animId = requestAnimationFrame(countLoop);
    };

    animId = requestAnimationFrame(countLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Phase 2: Logo Reveal & Locomotive Kinetic Char Reveal (Fade-in dari dalam / Depth Zoom)
  useEffect(() => {
    if (phase !== 2) return;

    if (logoRef.current) {
      const tl = gsap.timeline();

      // 1. Logo icon fades and scales in gracefully
      tl.fromTo(
        logoRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        }
      );

      // 2. Locomotive Kinetic Char Reveal: Fade-in dari dalam (scale-in from depth with blur decay)
      const prastyoChars = logoRef.current.querySelectorAll(".char-prastyo");
      const arlanChars = logoRef.current.querySelectorAll(".char-arlan");

      tl.fromTo(
        prastyoChars,
        {
          opacity: 0,
          scale: 0.35,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.42,
          stagger: 0.05,
          ease: "power3.out",
        },
        "-=0.15"
      );

      tl.fromTo(
        arlanChars,
        {
          opacity: 0,
          scale: 0.35,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.42,
          stagger: 0.055,
          ease: "power3.out",
        },
        "-=0.25"
      );

      // 3. Dwell briefly (0.45s) for audience recognition, then advance to Phase 3
      tl.call(() => {
        gsap.delayedCall(0.45, () => {
          setPhase(3);
        });
      });
    } else {
      setPhase(3);
    }
  }, [phase]);

  // Phase 3: Full-Screen Depth Pull-Back Pixel Dissolve ("Besar -> Kecil -> Memudar", Non-Diagonal)
  useEffect(() => {
    if (phase !== 3) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    // Start with LARGE chunky pixel tiles (e.g. 42px on desktop, 30px on mobile)
    const baseTileSize = isMobile ? 30 : 42;
    const gap = isMobile ? 2 : 3;
    const step = baseTileSize + gap;

    const centerX = width / 2;
    const centerY = height / 2;
    const maxDist = Math.hypot(centerX, centerY);

    // Build the grid across the ENTIRE viewport (1 full screen already filled)
    const tiles: GridTile[] = [];
    const cols = Math.ceil(width / step) + 2;
    const rows = Math.ceil(height / step) + 2;

    const startX = centerX - (cols / 2) * step + step / 2;
    const startY = centerY - (rows / 2) * step + step / 2;

    // Palette of authentic Lama Lama geological tones, grading outward to hero background #0A0B0B
    const palette = [
      "#6E7980", // Brightest focal slate (near center)
      "#576167",
      "#424B51",
      "#30373C",
      "#212629",
      "#16191B",
      "#0A0B0B", // Hero section background tone
    ];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Pure orthogonal grid: NO rowOffset, preventing any diagonal slant or brick angle
        const x = startX + c * step;
        const y = startY + r * step;

        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.hypot(dx, dy);
        const normDist = Math.min(1, dist / maxDist);

        // High-frequency decorrelated noise (prevents any directional banding or linear bias)
        const h = (Math.sin(c * 12.9898 + r * 78.233) * 43758.5453) % 1;
        const hash = h < 0 ? h + 1 : h;

        // Omnidirectional radial gradient: completely symmetric across X and Y axes
        const gradVal = Math.min(1, Math.max(0, normDist * 0.82 + (hash - 0.5) * 0.24));
        const colorIdx = Math.min(
          palette.length - 1,
          Math.floor(gradVal * palette.length)
        );

        tiles.push({
          row: r,
          col: c,
          x,
          y,
          baseSize: baseTileSize,
          distFromCenter: dist,
          active: hash > 0.06, // ~94% coverage, leaving subtle organic micro-gaps
          alpha: 1,
          targetAlpha: 0.7 + hash * 0.3,
          color: palette[colorIdx],
          // Individual stochastic flipping phase & speed (ZERO diagonal wave traveling)
          flipPhase: hash * Math.PI * 2,
          flipSpeed: 0.007 + hash * 0.005,
        });
      }
    }

    // Fade logo & text out smoothly as pixel field takes over
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.36,
        ease: "power2.out",
      });
    }

    let phase3Start: number | null = null;
    const duration = 1650; // 1.65s smooth luxurious depth transition
    let modelRevealed = false;

    const render = (time: number) => {
      animId = requestAnimationFrame(render);
      if (phase3Start === null) phase3Start = time;
      const elapsed = time - phase3Start;
      ctx.clearRect(0, 0, width, height);

      // Normalized progress (0 to 1)
      const progress = Math.max(0, Math.min(1, elapsed / duration));

      // 1. Camera pulls back gently into depth (omnidirectional perspective pull)
      const pull = Math.pow(progress, 1.25) * 0.28;

      // 2. Pixel size transformation: "dari ukuran pixel yang besar menjadi kecil hingga memudar"
      // Progressively contracts from 1.0 (BESAR: 42px) -> 0.35 (SEDANG: 15px) -> 0.12 (KECIL: 5px) -> 0 (0px)
      const sizeScale = Math.max(0, 1 - Math.pow(progress, 0.88));

      // 3. Global opacity decay ("hingga memudar")
      const globalFade = Math.max(0, 1 - Math.pow(progress, 1.18));

      // Reveal Hero Section & 3D Model when progress reaches 62%
      // Lingering micro-pixels remain dancing and shrinking over the 3D model for the final 38%
      if (progress >= 0.62 && !modelRevealed) {
        modelRevealed = true;
        document.body.style.overflow = "";
        const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
        if (lenis) lenis.start();

        // Reveal Hero Section and start character model entrance
        onCompleteRef.current();

        // Make preloader background transparent so Hero scene shows underneath
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            backgroundColor: "transparent",
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              if (containerRef.current) {
                containerRef.current.style.pointerEvents = "none";
              }
            },
          });
        }
      }

      for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        if (!tile.active) continue;

        // Position receding inwards towards center X and Y (camera zoom out)
        const dx = tile.x - centerX;
        const dy = tile.y - centerY;
        const drawX = centerX + dx * (1 - pull);
        const drawY = centerY + dy * (1 - pull);

        // Current size: Besar -> Kecil -> 0
        const drawSize = tile.baseSize * sizeScale;
        if (drawSize < 0.5) continue;

        // Opacity uniformly decays across whole screen
        const alpha = globalFade * tile.targetAlpha;
        if (alpha <= 0.01) continue;

        // Non-diagonal color inversion ("membolak-balik"):
        // Each tile oscillates independently on its own stochastic rhythm
        const flipCycle = Math.sin(time * tile.flipSpeed + tile.flipPhase);
        const flipThreshold = -0.55 + progress * 1.55;
        const isFlippedDark = flipCycle < flipThreshold;

        ctx.fillStyle = isFlippedDark ? "#0A0B0B" : tile.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(
          drawX - drawSize / 2,
          drawY - drawSize / 2,
          drawSize,
          drawSize
        );
      }

      // Fully complete transition
      if (progress >= 1.0) {
        setIsVisible(false);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [phase]);

  if (!isVisible) return null;

  return (
    <div
      id="preloader-overlay"
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-canvas flex items-center justify-center pointer-events-auto select-none overflow-hidden"
      style={{ willChange: "opacity, background-color" }}
    >
      {/* HTML5 Canvas for Phase 3: Full-Screen Terrain Pixel Depth Pull-Back */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Dead-Center Container (Center X & Center Y) */}
      <div className="relative z-20 flex items-center justify-center">
        {/* Phase 1: Minimalist Numeric Counter (000% -> 100%) */}
        {phase === 1 && (
          <div
            ref={counterRef}
            className="font-mono text-center text-chalk tracking-widest text-sm sm:text-base tabular-nums select-none"
          >
            <span>{String(displayProgress).padStart(3, "0")}</span>
            <span className="opacity-50 ml-0.5">%</span>
          </div>
        )}

        {/* Phase 2: Official ARLAN Logo + Locomotive Kinetic Char Reveal */}
        {phase >= 2 && (
          <div
            ref={logoRef}
            className="flex items-center gap-4 sm:gap-5 md:gap-6 opacity-0 select-none pointer-events-none"
          >
            {/* Logo Mark (+25% scale) */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center shrink-0">
              <Image
                src="/ARLAN_Icon svg.svg"
                alt="ARLAN Logo"
                width={80}
                height={75}
                priority
                className="w-full h-auto object-contain drop-shadow-[0_0_28px_rgba(249,244,235,0.22)]"
              />
            </div>

            {/* Locomotive Kinetic Character Stack: Row 1 = PRASTYO, Row 2 = ARLAN (Identical font weight & size) */}
            <div className="flex flex-col justify-center select-none font-mono font-bold text-chalk">
              {/* Row 1: PRASTYO */}
              <div className="text-base sm:text-lg md:text-xl font-bold tracking-[0.22em] text-chalk min-h-[1.3em] flex items-center whitespace-nowrap">
                {["P", "R", "A", "S", "T", "Y", "O"].map((char, idx) => (
                  <span
                    key={`p-${idx}`}
                    className="char-prastyo inline-block opacity-0"
                    style={{ willChange: "transform, opacity, filter" }}
                  >
                    {char}
                  </span>
                ))}
              </div>

              {/* Row 2: ARLAN (Identical font weight font-bold and optical weight) */}
              <div className="text-base sm:text-lg md:text-xl font-bold tracking-[0.22em] text-chalk min-h-[1.3em] flex items-center mt-1 whitespace-nowrap">
                {["A", "R", "L", "A", "N"].map((char, idx) => (
                  <span
                    key={`a-${idx}`}
                    className="char-arlan inline-block opacity-0"
                    style={{ willChange: "transform, opacity, filter" }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
