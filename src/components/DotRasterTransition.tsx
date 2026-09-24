"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface DotRasterTransitionProps {
  progressRef: React.RefObject<number>;
  textContainerRef: React.RefObject<HTMLDivElement | null>;
  workRideAlongRef?: React.RefObject<HTMLDivElement | null>;
}

export default function DotRasterTransition({
  progressRef,
  textContainerRef,
  workRideAlongRef,
}: DotRasterTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let wasSleeping = false;

    let travelDistance = 3400;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      wasSleeping = false;

      if (workRideAlongRef?.current) {
        const scrollH = workRideAlongRef.current.scrollHeight || workRideAlongRef.current.offsetHeight;
        if (scrollH > 0) {
          travelDistance = Math.max(2600, scrollH - height + 120);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const startTime = performance.now();

    // Grid spacing for square pixels (10px grid for clear halftone gradation and high performance)
    const spacing = 10;

    const render = () => {
      // Read target progress from ScrollTrigger (already smoothly lerped by Lenis at 60/120fps)
      const smoothP = progressRef.current ?? 0;

      // Phase 1 (0.00 to 0.015): Bottom bar wipes via time-based tween, dot raster hidden
      // Phase 2 (0.015 to 0.35): Dot Raster Wave sweeps up, Ride-Along brings Headline directly into view
      // Phase 3 (0.35 to 1.00): Deep Editorial Scroll smoothly reveals About Me, Featured Work, and What I Do sections
      const waveEndP = 0.35;
      const wp = Math.max(0, Math.min(1, (smoothP - 0.015) / (waveEndP - 0.015)));
      const D = height + 630;
      const waveFront = height + 120 - wp * D;
      const textY = -wp * D;

      // Integer rounding eliminates subpixel font antialiasing vibration (jitter) in Chrome
      const roundedTextY = Math.round(textY);

      let roundedWorkY: number;
      if (smoothP <= waveEndP) {
        // Physical ride-along locked behind wave crest (+580px gives ample breathing room from dither dots)
        roundedWorkY = Math.round(waveFront + 580);
      } else {
        // Continuous smooth scroll landing gracefully at 70px below navbar and scrolling deep across About Me, Work & What I Do
        const deepProgress = (smoothP - waveEndP) / (1.0 - waveEndP);
        roundedWorkY = Math.round(70 - deepProgress * travelDistance);
      }

      // UNIFIED 1-CALL-STACK DIRECT SYNC:
      if (textContainerRef.current) {
        textContainerRef.current.style.transform = `translate3d(0px, ${roundedTextY}px, 0px)`;
      }

      // PHYSICAL RIDE-ALONG:
      if (workRideAlongRef?.current) {
        workRideAlongRef.current.style.transform = `translate3d(0px, ${roundedWorkY}px, 0px)`;
      }

      // SMART GPU SLEEP / WAKE ARCHITECTURE:
      // When wave has completely covered the screen (smoothP >= waveEndP),
      // commit one final clean state (#D8382B solid) and sleep to save GPU cycles for catalog interaction.
      // Instantly wake and redraw upon reverse scroll (< waveEndP) without stale frames or flash.
      if (smoothP >= waveEndP) {
        if (!wasSleeping) {
          ctx.fillStyle = "#D8382B";
          ctx.fillRect(0, 0, width, height);
          wasSleeping = true;
        }
        return;
      }

      // WAKE UP:
      if (wasSleeping) {
        wasSleeping = false;
      }

      ctx.clearRect(0, 0, width, height);

      if (smoothP > 0.015) {
        const elapsed = (performance.now() - startTime) * 0.001;

        // Array for wave-conforming solid column blocks: [x, y, w, h]
        const solidCols: number[] = [];
        // Single array for all halftone dots: [x, y, size]
        const dots: number[] = [];

        // Iterate column by column across the viewport (10px grid)
        for (let gx = 0; gx <= width + spacing; gx += spacing) {
          const ix = Math.round(gx / spacing);

          // ① Wave Composition: Multi-Harmonic Organic Ocean Wave & Mountain Ridge
          const w1 = Math.sin(gx * 0.007 + elapsed * 2.0) * 58;
          const w2 = Math.sin(gx * 0.016 + elapsed * 2.6 + 1.2) * 32;
          const w3 = Math.cos(gx * 0.035 - elapsed * 1.6) * 16;
          const w4 = Math.sin(gx * 0.070 + elapsed * 3.0) * 8;

          const baseWaveY = waveFront + w1 + w2 + w3 + w4;

          // Shorter vertical span for the dot raster (220px instead of 420px)
          const colSolidTop = Math.round(baseWaveY + 220);
          const colX = Math.round(gx - spacing * 0.5);

          if (colSolidTop < height) {
            const top = Math.max(0, colSolidTop);
            solidCols.push(colX, top, spacing + 0.5, height - top);
          }

          const colStartGy = Math.max(
            0,
            Math.floor((baseWaveY - 40) / spacing) * spacing
          );
          const colEndGy = Math.min(
            height,
            Math.ceil((colSolidTop + spacing * 2) / spacing) * spacing
          );

          for (let gy = colStartGy; gy <= colEndGy; gy += spacing) {
            const iy = Math.round(gy / spacing);

            // ② Edge Hash Scatter: deterministic dither noise
            const hash = Math.sin(ix * 12.9898 + iy * 78.233) * 43758.5453;
            const noise = (hash - Math.floor(hash) - 0.5) * 20;

            const currentWaveY = baseWaveY + noise;
            const dist = gy - currentWaveY;

            // ③ Pure Halftone Size Gradient (Span: 260px)
            // No alpha blending — pure solid color so it stays punchy and harmonious
            if (dist >= -40 && gy <= colSolidTop + spacing) {
              const t = Math.max(0, Math.min(1, (dist + 40) / 260));
              // Easing for size: starts small, accelerates to full size to fuse with solid base
              const eased = t * t;
              // Size ranges from tiny 1.5px dots to large 11px dots (fusing the 10px grid)
              const size = 1.5 + eased * 9.5;
              
              const rSize = Math.max(1, Math.round(size));
              const rx = Math.round(gx - size * 0.5);
              const ry = Math.round(gy - size * 0.5);
              
              dots.push(rx, ry, rSize);
            }
          }
        }

        // ④ Render: Single batch draw for solid red (#D8382B)
        ctx.fillStyle = "#D8382B";

        if (solidCols.length > 0) {
          for (let i = 0; i < solidCols.length; i += 4) {
            ctx.fillRect(
              solidCols[i],
              solidCols[i + 1],
              solidCols[i + 2],
              solidCols[i + 3]
            );
          }
        }

        if (dots.length > 0) {
          for (let i = 0; i < dots.length; i += 3) {
            ctx.fillRect(dots[i], dots[i + 1], dots[i + 2], dots[i + 2]);
          }
        }
      }
    };

    // Attach to GSAP's central ticker for 100% frame-synced rendering
    gsap.ticker.add(render);

    const textContainerEl = textContainerRef.current;
    const workRideAlongEl = workRideAlongRef?.current;

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      if (textContainerEl) {
        textContainerEl.style.transform = "";
      }
      if (workRideAlongEl) {
        workRideAlongEl.style.transform = "";
      }
    };
  }, [progressRef, textContainerRef, workRideAlongRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      style={{ display: "block" }}
    />
  );
}
