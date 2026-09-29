"use client";

import React from "react";

interface PhotoPlaceholderProps {
  aspectRatio?: string; // e.g. "aspect-[4/5]", "aspect-[3/4]"
  label?: string;
  subLabel?: string;
  aspectText?: string;
  className?: string;
}

export default function PhotoPlaceholder({
  aspectRatio = "aspect-[3/4]",
  label = "PHOTO PLACEHOLDER",
  subLabel = "TECHNICAL PORTRAIT FRAME",
  aspectText,
  className = "",
}: PhotoPlaceholderProps) {
  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-[3px] border border-black/20 bg-[#e5dfd3]/70 flex flex-col items-center justify-center p-3 sm:p-5 text-center select-none overflow-hidden group shadow-sm ${className}`}
    >
      {/* Editorial corner ticks */}
      <span className="absolute top-2 left-2 text-[9px] font-mono text-black/30 font-bold leading-none">
        +
      </span>
      <span className="absolute top-2 right-2 text-[9px] font-mono text-black/30 font-bold leading-none">
        +
      </span>
      <span className="absolute bottom-2 left-2 text-[9px] font-mono text-black/30 font-bold leading-none">
        +
      </span>
      <span className="absolute bottom-2 right-2 text-[9px] font-mono text-black/30 font-bold leading-none">
        +
      </span>

      {/* Subtle center icon */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black/20 bg-[#F5F1E9] flex items-center justify-center mb-2 sm:mb-3 text-black/70 font-mono text-sm sm:text-base shadow-xs shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-black/60"
        >
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      </div>

      {/* Primary mono label */}
      <div className="font-mono text-xs uppercase tracking-widest font-bold text-black mb-1">
        {label}
      </div>

      {/* Secondary technical tag */}
      <div className="font-mono text-[10px] text-black/60 tracking-wider uppercase">
        {subLabel}
      </div>

      {/* Aspect ratio stamp */}
      {aspectText && (
        <div className="mt-3 text-[10px] text-black/40 font-mono tracking-widest uppercase px-2 py-0.5 border border-black/10 rounded-[2px] bg-black/5">
          {aspectText}
        </div>
      )}
    </div>
  );
}
