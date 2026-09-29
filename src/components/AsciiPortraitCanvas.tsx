"use client";

import React, { useEffect, useRef, useState } from "react";

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

interface SamplePoint {
  col: number;
  row: number;
  baseX: number;
  baseY: number;
  glyph: string;
}

export default function AsciiPortraitCanvas({
  src = "/arlan-face.jpg",
  charSize = 5.5,
  contrast = 1.48,
  brightness = 0.04,
  radius = 125,
  force = 24,
  charsetKey = "kaspar",
  invert = false,
  opacity = 0.65,
  showHud = true,
  hudPosition = "bottom-left",
  align = "left",
  maskGradient = "linear-gradient(to bottom, black 80%, transparent 100%)",
  className = "",
}: AsciiPortraitCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Telemetry state
  const [telemetry, setTelemetry] = useState({
    cursorX: 0,
    cursorY: 0,
    fps: 60,
    samples: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Offscreen sampling canvas
    const sampleCanvas = document.createElement("canvas");
    const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });
    if (!sampleCtx) return;

    // Load active image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    // Engine state
    let isVisible = true;
    let animId = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let smoothMouseX = -9999;
    let smoothMouseY = -9999;
    let lastFrame = performance.now();
    let fps = 60;
    let lastHudUpdate = 0;

    let points: SamplePoint[] = [];
    const palette = GLYPH_RAMPS[charsetKey] || GLYPH_RAMPS.kaspar;
    const paletteMax = palette.length - 1;

    // Pre-calculate sample points whenever canvas dimensions or image change
    function rebuildSamples() {
      if (!canvas || !container || !sampleCtx) return;
      if (!img.complete || img.naturalWidth === 0) return;

      const width = canvas.width;
      const height = canvas.height;

      const cols = Math.floor(width / charSize);
      const rows = Math.floor(height / charSize);

      if (cols <= 0 || rows <= 0) return;

      sampleCanvas.width = cols;
      sampleCanvas.height = rows;

      // Draw image fit within cols x rows maintaining aspect ratio
      sampleCtx.clearRect(0, 0, cols, rows);

      // Aspect fit calculation
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const cvsRatio = cols / rows;

      let drawW = cols;
      let drawH = rows;
      let drawX = 0;
      let drawY = 0;

      if (imgRatio > cvsRatio) {
        drawW = Math.round(rows * imgRatio);
        drawX = Math.round((cols - drawW) / 2);
      } else {
        drawH = Math.round(cols / imgRatio);
        drawY = Math.round((rows - drawH) / 2);
      }

      sampleCtx.drawImage(img, drawX, drawY, drawW, drawH);

      const imgData = sampleCtx.getImageData(0, 0, cols, rows).data;
      const newPoints: SamplePoint[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = (r * cols + c) * 4;
          const alpha = imgData[idx + 3];
          if (alpha < 20) continue;

          const red = imgData[idx];
          const green = imgData[idx + 1];
          const blue = imgData[idx + 2];

          // ITU-R BT.601 Perceptual Luminance
          let lum = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

          // Brightness offset
          lum += brightness;

          // Optical contrast curve
          lum = Math.pow(Math.max(0, Math.min(1, lum)), contrast);

          // Invert: White studio background (lum=1.0) maps to space (' ')
          // Darker portrait features map to dense ASCII glyphs
          if (!invert) {
            lum = 1.0 - lum;
          }

          lum = Math.max(0, Math.min(1, lum));

          const charIdx = Math.floor(lum * paletteMax);
          const glyph = palette[charIdx];

          if (!glyph || glyph === " ") continue;

          newPoints.push({
            col: c,
            row: r,
            baseX: c * charSize + charSize / 2,
            baseY: r * charSize + charSize / 2,
            glyph,
          });
        }
      }

      points = newPoints;
      setTelemetry((prev) => ({ ...prev, samples: points.length }));
    }

    // Resize handler
    function handleResize() {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const maxW = Math.min(rect.width - 32, 820);
      const maxH = Math.min(rect.height, 780);

      let targetW = Math.floor(Math.min(maxW, maxH * 0.95));
      let targetH = Math.floor(targetW / 0.95);
      if (targetH > maxH) {
        targetH = maxH;
        targetW = Math.floor(targetH * 0.95);
      }

      const finalW = Math.max(280, targetW);
      const finalH = Math.max(340, targetH);

      if (canvas.width !== finalW || canvas.height !== finalH) {
        canvas.width = finalW;
        canvas.height = finalH;
      }
      rebuildSamples();
    }

    img.onload = () => {
      handleResize();
      rebuildSamples();
    };
    if (img.complete && img.naturalWidth > 0) {
      handleResize();
      rebuildSamples();
    }

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Global mouse/touch tracking across window with proximity boundary check
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

    // Visibility Observer to pause loop when scrolled out of view
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

    // Main animation loop
    function render() {
      if (!isVisible) {
        animId = 0;
        return;
      }

      // Smooth mouse interpolation
      smoothMouseX += (mouseX - smoothMouseX) * 0.18;
      smoothMouseY += (mouseY - smoothMouseY) * 0.18;

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.font = `${charSize}px var(--font-mono), 'Space Mono', monospace`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.fillStyle = "#F9F4EB";

      const hasMouse = smoothMouseX > -400 && smoothMouseY > -400;

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        let px = pt.baseX;
        let py = pt.baseY;

        // Dynamic magnetic repulsion
        if (hasMouse) {
          const dx = px - smoothMouseX;
          const dy = py - smoothMouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius && dist > 0.001) {
            const push = (1.0 - dist / radius) * force;
            px += (dx / dist) * push;
            py += (dy / dist) * push;
          }
        }

        ctx!.fillText(pt.glyph, px, py);
      }

      // FPS benchmark and telemetry update (throttled to 4Hz for React performance)
      const now = performance.now();
      const delta = (now - lastFrame) / 1000;
      lastFrame = now;
      fps = Math.round(0.92 * fps + 0.08 * (1 / (delta || 0.016)));

      if (now - lastHudUpdate > 250) {
        lastHudUpdate = now;
        setTelemetry({
          cursorX: hasMouse ? Math.max(0, Math.round(smoothMouseX)) : 0,
          cursorY: hasMouse ? Math.max(0, Math.round(smoothMouseY)) : 0,
          fps: isNaN(fps) ? 60 : Math.min(120, fps),
          samples: points.length,
        });
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
  }, [src, charSize, contrast, brightness, radius, force, charsetKey, invert]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex ${
        align === "left"
          ? "items-start justify-start"
          : "items-center justify-center"
      } pointer-events-none select-none ${className}`}
    >
      {/* Real-time ASCII Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          opacity,
          maskImage: maskGradient,
          WebkitMaskImage: maskGradient,
        }}
        className="will-change-transform drop-shadow-[0_0_24px_rgba(249,244,235,0.06)]"
      />

      {/* Floating Telemetry HUD */}
      {showHud && (
        <div
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
          <div>FRAME_RATE: {telemetry.fps} FPS</div>
          <div>SAMPLES: {telemetry.samples.toLocaleString()} GLYPHS</div>
        </div>
      )}
    </div>
  );
}
