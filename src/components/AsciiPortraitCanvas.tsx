"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

interface AsciiPortraitCanvasProps {
  src?: string;
  charSize?: number;
  contrast?: number;
  brightness?: number;
  radius?: number;
  force?: number;
  charsetKey?: "kaspar" | "numeric" | "geometric" | "dense";
  invert?: boolean;
  opacity?: number;
  showHud?: boolean;
  hudPosition?: "bottom-left" | "bottom-right" | "top-left";
  align?: "left" | "center";
  maskGradient?: string;
  maxDimension?: number;
  className?: string;
}

const GLYPH_RAMPS = {
  kaspar: [" ", " ", ".", ":", "-", "+", "=", "*", "%", "#", "@"],
  numeric: [" ", " ", "1", "0", "7", "3", "5", "8", "9", "4"],
  geometric: [" ", ".", "/", "\\", "|", "(", ")", "[", "]", "{", "}", "#"],
  dense: [
    " ", ".", "'", "`", "^", "\"", ",", ":", ";", "I", "l", "!", "i", ">", "<",
    "~", "+", "_", "-", "?", "]", "[", "}", "{", "1", ")", "(", "|", "\\", "/",
    "t", "f", "j", "r", "x", "n", "u", "v", "c", "z", "X", "Y", "U", "J", "C",
    "L", "Q", "0", "O", "Z", "m", "w", "q", "p", "d", "b", "k", "h", "a", "o",
    "*", "#", "M", "W", "&", "8", "%", "B", "@", "$"
  ],
};

export default function AsciiPortraitCanvas({
  src = "/arlan-face-dark.jpg",
  charSize = 5,
  contrast = 1.95,
  brightness = 0.34,
  radius = 150,
  force = 24,
  charsetKey = "kaspar",
  invert = true,
  opacity = 0.85,
  showHud = true,
  hudPosition = "bottom-left",
  align = "left",
  maskGradient = "linear-gradient(to bottom, black 85%, transparent 100%)",
  maxDimension = 706,
  className = "",
}: AsciiPortraitCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mounted = useMounted();

  const [telemetry, setTelemetry] = useState({
    cursorX: 0,
    cursorY: 0,
    fps: 56,
    samples: 0,
    totalGlyphs: 19881,
    matrixCols: 141,
    matrixRows: 141,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const sampleCanvas = document.createElement("canvas");
    const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });
    if (!sampleCtx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    let isVisible = true;
    let animId = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let smoothMouseX = -9999;
    let smoothMouseY = -9999;
    let lastFrame = performance.now();
    let fps = 60;
    let lastHudUpdate = 0;

    const palette = GLYPH_RAMPS[charsetKey] || GLYPH_RAMPS.kaspar;
    const paletteMax = palette.length - 1;

    function handleResize() {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const maxW = Math.min(Math.floor(rect.width), maxDimension);
      const maxH = Math.min(Math.max(400, Math.floor(rect.height)), maxDimension);

      const targetW = Math.min(maxW, maxH);
      const targetH = targetW;

      const finalW = Math.max(280, targetW);
      const finalH = Math.max(280, targetH);

      if (canvas.width !== finalW || canvas.height !== finalH) {
        canvas.width = finalW;
        canvas.height = finalH;
      }
    }

    img.onload = () => {
      handleResize();
    };
    if (img.complete && img.naturalWidth > 0) {
      handleResize();
    }

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    function handleMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (
        x >= -80 &&
        x <= rect.width + 80 &&
        y >= -80 &&
        y <= rect.height + 80
      ) {
        mouseX = x;
        mouseY = y;
      } else {
        mouseX = -9999;
        mouseY = -9999;
      }
    }

    function handleTouchMove(e: TouchEvent) {
      if (!canvas || !e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      if (
        x >= -80 &&
        x <= rect.width + 80 &&
        y >= -80 &&
        y <= rect.height + 80
      ) {
        mouseX = x;
        mouseY = y;
      } else {
        mouseX = -9999;
        mouseY = -9999;
      }
    }

    function handleMouseLeave() {
      mouseX = -9999;
      mouseY = -9999;
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseLeave, { passive: true });

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          lastFrame = performance.now();
          render();
        }
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    // Real-time raster loop — mirrors reference engine's renderLoop exactly
    function render() {
      if (!isVisible) {
        animId = 0;
        return;
      }

      // Smooth mouse physics interpolation
      smoothMouseX += (mouseX - smoothMouseX) * 0.18;
      smoothMouseY += (mouseY - smoothMouseY) * 0.18;

      const w = canvas!.width;
      const h = canvas!.height;
      const charStep = charSize;
      const cols = Math.floor(w / charStep);
      const rows = Math.floor(h / charStep);

      if (cols > 0 && rows > 0 && img.complete && img.naturalWidth > 0) {
        // Downsample: direct stretch to grid — matches reference exactly
        sampleCanvas.width = cols;
        sampleCanvas.height = rows;
        sampleCtx!.drawImage(img, 0, 0, cols, rows);

        const imgData = sampleCtx!.getImageData(0, 0, cols, rows).data;

        // Clear canvas
        ctx!.clearRect(0, 0, w, h);

        // Typography — hardcoded 'Space Mono' matching reference engine
        ctx!.font = `${charStep}px 'Space Mono', monospace`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillStyle = "#F9F4EB";

        const rRadius = radius;
        const rForce = force;
        const hasMouse = smoothMouseX > 0 && smoothMouseY > 0;
        let activeCount = 0;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const pixelIdx = (r * cols + c) * 4;
            const red = imgData[pixelIdx];
            const green = imgData[pixelIdx + 1];
            const blue = imgData[pixelIdx + 2];

            // ITU-R BT.601 Perceptual Luminance
            let lum = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

            // Brightness offset
            lum += brightness;

            // Optical contrast exponential curve
            lum = Math.pow(Math.max(0, Math.min(1, lum)), contrast);

            // Invert density mapping
            if (!invert) {
              lum = 1.0 - lum;
            }

            lum = Math.max(0, Math.min(1, lum));

            // Glyph indexing
            const charIdx = Math.floor(lum * paletteMax);
            const glyph = palette[charIdx];

            // Skip whitespace
            if (glyph === " ") continue;

            activeCount++;

            let px = c * charStep + charStep / 2;
            let py = r * charStep + charStep / 2;

            // Dynamic magnetic repulsion
            if (hasMouse) {
              const dx = px - smoothMouseX;
              const dy = py - smoothMouseY;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < rRadius && dist > 0.001) {
                const push = (1.0 - dist / rRadius) * rForce;
                px += (dx / dist) * push;
                py += (dy / dist) * push;
              }
            }

            ctx!.fillText(glyph, px, py);
          }
        }

        // FPS benchmark and telemetry update (throttled to 4Hz)
        const now = performance.now();
        const delta = (now - lastFrame) / 1000;
        lastFrame = now;
        fps = Math.round(0.92 * fps + 0.08 * (1 / (delta || 0.016)));

        if (now - lastHudUpdate > 250) {
          lastHudUpdate = now;
          setTelemetry({
            cursorX: hasMouse ? Math.max(0, Math.round(smoothMouseX)) : 0,
            cursorY: hasMouse ? Math.max(0, Math.round(smoothMouseY)) : 0,
            fps: isNaN(fps) ? 56 : Math.min(120, fps),
            samples: activeCount,
            totalGlyphs: cols * rows,
            matrixCols: cols,
            matrixRows: rows,
          });
        }
      }

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseLeave);
    };
  }, [src, charSize, contrast, brightness, radius, force, charsetKey, invert, maxDimension]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex ${
        align === "left"
          ? "items-start justify-start"
          : "items-center justify-center"
      } pointer-events-none select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        style={{
          opacity,
          maskImage: maskGradient,
          WebkitMaskImage: maskGradient,
        }}
        className="will-change-transform drop-shadow-[0_0_24px_rgba(249,244,235,0.06)]"
      />

      {showHud && mounted && (
        <div
          suppressHydrationWarning
          aria-hidden="true"
          className={`absolute z-10 font-mono text-[9px] sm:text-[10px] tracking-tight text-white/50 space-y-0.5 bg-[#121214]/90 p-2 sm:p-2.5 backdrop-blur-md border border-white/10 select-none pointer-events-none ${
            hudPosition === "bottom-right"
              ? "bottom-4 right-4 sm:bottom-6 sm:right-8"
              : hudPosition === "top-left"
              ? "top-4 left-4 sm:top-6 sm:left-6"
              : "bottom-4 left-4 sm:bottom-6 sm:left-6"
          }`}
        >
          <div className="flex items-center gap-1.5 pb-1 border-b border-white/10 text-white/70 uppercase tracking-widest text-[8.5px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span>OPTICAL ASCII MATRIX</span>
          </div>
          <div>CURSOR: [{telemetry.cursorX.toString().padStart(3, "0")}, {telemetry.cursorY.toString().padStart(3, "0")}]</div>
          <div>RENDER: {telemetry.fps} FPS</div>
          <div>MATRIX: {telemetry.matrixCols || 141} &times; {telemetry.matrixRows || 141} ({(telemetry.totalGlyphs || 19881).toLocaleString()})</div>
          <div>ACTIVE: {(telemetry.samples || 0).toLocaleString()} GLYPHS</div>
        </div>
      )}
    </div>
  );
}

