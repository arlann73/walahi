"use client";

import { useEffect, useRef } from "react";

const DEFAULT_FRAME_COUNT = 8;
const DEFAULT_TILE_SIZE = 128;

function createNoiseTile(size: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.createImageData(size, size);
  const buffer = imageData.data;

  for (let i = 0; i < buffer.length; i += 4) {
    const value = Math.floor(Math.random() * 255);
    buffer[i] = value;
    buffer[i + 1] = value;
    buffer[i + 2] = value;
    buffer[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export default function FilmGrain({
  opacity = 0.05,
  fps = 16,
  tileSize = DEFAULT_TILE_SIZE,
  frameCount = DEFAULT_FRAME_COUNT,
  blendMode = "overlay" as React.CSSProperties["mixBlendMode"],
  vignette = false,
  zIndex = 9999,
  className = "",
}: {
  opacity?: number;
  fps?: number;
  tileSize?: number;
  frameCount?: number;
  blendMode?: React.CSSProperties["mixBlendMode"];
  vignette?: boolean;
  zIndex?: number;
  className?: string;
} = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef(0);
  const frameIndexRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = canvas.getContext("2d")!;
    let pattern: CanvasPattern | null = null;

    const drawFrame = () => {
      if (!pattern) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (framesRef.current.length) {
        pattern = ctx.createPattern(
          framesRef.current[frameIndexRef.current],
          "repeat"
        );
        drawFrame();
      }
    };

    framesRef.current = Array.from({ length: frameCount }, () =>
      createNoiseTile(tileSize)
    );

    resize();
    window.addEventListener("resize", resize);

    if (prefersReducedMotion) {
      return () => window.removeEventListener("resize", resize);
    }

    const frameDuration = 1000 / fps;

    const tick = (time: number) => {
      if (time - lastFrameTimeRef.current >= frameDuration) {
        frameIndexRef.current =
          (frameIndexRef.current + 1) % framesRef.current.length;
        pattern = ctx.createPattern(
          framesRef.current[frameIndexRef.current],
          "repeat"
        );
        drawFrame();
        lastFrameTimeRef.current = time;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [fps, tileSize, frameCount]);

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity,
          mixBlendMode: blendMode,
        }}
      />
      {vignette && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      )}
    </div>
  );
}
