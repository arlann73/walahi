"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TIMELINE_ITEMS, type TimelineItem } from "@/data/journey";

interface TimelineTableProps {
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

function PassiveTimelineRow({
  item,
  onClick,
}: {
  item: TimelineItem;
  onClick: () => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (rowRef.current) {
      gsap.to(rowRef.current, {
        backgroundColor: "rgba(226, 226, 221, 0.06)",
        color: "#E2E2DD",
        duration: 0.2,
        ease: "power1.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (rowRef.current) {
      gsap.to(rowRef.current, {
        backgroundColor: "transparent",
        color: "#908C87",
        duration: 0.2,
        ease: "power1.out",
      });
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full text-left rounded-hairline overflow-hidden cursor-pointer outline-none border-0 bg-transparent p-0 select-none"
    >
      <div
        ref={rowRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full grid grid-cols-12 items-center px-1.5 sm:px-2 py-[2px] sm:py-[1.5px] rounded-hairline text-muted leading-none"
      >
        <span className="col-span-6 font-jakarta text-[8.5px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.02em] sm:tracking-[0.03em] font-medium truncate leading-none">
          {item.company}
        </span>
        <span className="col-span-4 font-jakarta text-[8.5px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.02em] sm:tracking-[0.03em] font-medium truncate leading-none">
          {item.role}
        </span>
        <span className="col-span-2 text-right font-jakarta text-[8.5px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.02em] sm:tracking-[0.03em] font-medium tabular-nums leading-none">
          {item.year}
        </span>
      </div>
    </button>
  );
}

export default function TimelineTable({
  activeIndex,
  onSelect,
  className = "",
}: TimelineTableProps) {
  // Auto-advance every 8.5s; resets on selection
  useEffect(() => {
    const timer = setInterval(() => {
      onSelect((activeIndex + 1) % TIMELINE_ITEMS.length);
    }, 8500);

    return () => clearInterval(timer);
  }, [activeIndex, onSelect]);

  const handleRowClick = (index: number) => {
    onSelect(index);
  };

  return (
    <div className={`w-full max-w-[270px] sm:max-w-[420px] md:max-w-[480px] pointer-events-auto select-text ${className}`}>
      {/* Top Header Row: [JOURNEY] & Dynamic Index Indicator */}
      <div className="mb-2 sm:mb-2.5 flex items-center justify-between px-1 sm:px-2">
        <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.22em] text-chalk uppercase font-bold">
          [JOURNEY]
        </span>

        <span className="font-mono text-[7.5px] sm:text-[8.5px] tracking-[0.18em] text-muted uppercase font-bold tabular-nums">
          {String(activeIndex + 1).padStart(2, "0")} — {String(TIMELINE_ITEMS.length).padStart(2, "0")}
        </span>
      </div>

      {/* 3-Column Editorial Table Rows */}
      <div className="w-full flex flex-col space-y-[1px]">
        {TIMELINE_ITEMS.map((item, index) => {
          const isActive = activeIndex === index;

          if (!isActive) {
            return (
              <PassiveTimelineRow
                key={item.id}
                item={item}
                onClick={() => handleRowClick(index)}
              />
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleRowClick(index)}
              className="group relative w-full text-left rounded-hairline overflow-hidden cursor-pointer outline-none border-0 bg-transparent p-0 select-none"
            >
              {/* ACTIVE ROW: DUAL-LAYER DYNAMIC STENCIL INVERSION (Sweeps from left to right over 8.5s) */}
              <div className="relative w-full overflow-hidden rounded-hairline">
                {/* Layer 1: Base Light Text on dark background (visible before loader passes over) */}
                <div className="w-full grid grid-cols-12 items-center px-1.5 sm:px-2 py-[2px] sm:py-[1.5px] bg-chalk/[0.05] rounded-hairline leading-none">
                  <span className="col-span-6 font-jakarta text-[8.5px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.02em] sm:tracking-[0.03em] text-chalk font-semibold truncate leading-none">
                    {item.company}
                  </span>
                  <span className="col-span-4 font-jakarta text-[8.5px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.02em] sm:tracking-[0.03em] text-chalk font-semibold truncate leading-none">
                    {item.role}
                  </span>
                  <span className="col-span-2 text-right font-jakarta text-[8.5px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.02em] sm:tracking-[0.03em] text-chalk tabular-nums font-semibold leading-none">
                    {item.year}
                  </span>
                </div>

                {/* Layer 2: Inverted Stencil Mask (Solid Chalk fill with Obsidian text sweeping left to right) */}
                <div
                  key={`loader-${activeIndex}-${item.id}`}
                  className="absolute inset-0 pointer-events-none rounded-hairline bg-chalk"
                  style={{
                    animation: "timelineLoaderClip 8500ms linear forwards",
                  }}
                >
                  <div className="w-full grid grid-cols-12 items-center px-1.5 sm:px-2 py-[2px] sm:py-[1.5px] leading-none">
                    <span className="col-span-6 font-jakarta text-[8.5px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.02em] sm:tracking-[0.03em] text-cta-icon font-bold truncate leading-none">
                      {item.company}
                    </span>
                    <span className="col-span-4 font-jakarta text-[8.5px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.02em] sm:tracking-[0.03em] text-cta-icon font-bold truncate leading-none">
                      {item.role}
                    </span>
                    <span className="col-span-2 text-right font-jakarta text-[8.5px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.02em] sm:tracking-[0.03em] text-cta-icon tabular-nums font-bold leading-none">
                      {item.year}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
