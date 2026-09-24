"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { FIELD_LOG_DATA } from "@/data/fieldLogData";
import { Layers, Compass, Pickaxe, User, type LucideIcon } from "lucide-react";
import { gsap } from "gsap";

interface FieldLogModalProps {
  isOpen: boolean;
  activeId?: string;
  onClose: () => void;
  onSelectJob: (id: string) => void;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  SUBSURFACE: Layers,
  EXPLORATION: Compass,
  ENGINEERING: Pickaxe,
  IDENTITY: User,
};

export default function FieldLogModal({
  isOpen,
  activeId = "undergraduate-researcher",
  onClose,
  onSelectJob,
}: FieldLogModalProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);

  // Derive currently active item directly from activeId prop
  const activeItem =
    FIELD_LOG_DATA.find((item) => item.id === activeId || item.slug === activeId) ||
    FIELD_LOG_DATA[0];

  // GSAP animation for slide-in drawer
  useEffect(() => {
    if (asideRef.current) {
      if (isSidebarOpen) {
        gsap.to(asideRef.current, { x: 0, duration: 0.35, ease: "power2.out" });
      } else {
        gsap.to(asideRef.current, { x: -350, duration: 0.3, ease: "power2.in" });
      }
    }
  }, [isSidebarOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleSelectJob = useCallback(
    (id: string) => {
      onSelectJob(id);
    },
    [onSelectJob]
  );

  if (!isOpen) return null;

  return (
    <div
      ref={modalContainerRef}
      className="fixed inset-0 z-[9999] bg-canvas text-chalk flex flex-col justify-between overflow-hidden select-none animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="field-log-title"
    >
      {/* ============================================================ */}
      {/* 1. TOP BAR: GIANT SERIF TITLE + TRAPEZOID BADGE + CLOSE      */}
      {/* ============================================================ */}
      <div className="relative z-20 flex items-start justify-between px-6 sm:px-10 md:px-14 pt-6 sm:pt-10">
        {/* Title: Chauncey \ DEV / McAskill */}
        <h1
          id="field-log-title"
          className="font-editorial italic font-normal text-3xl sm:text-5xl md:text-6xl lg:text-[76px] tracking-tight leading-none text-chalk flex items-center flex-wrap gap-y-2"
        >
          <span>{activeItem.titlePart1}</span>

          {/* Exact Isosceles Outline Trapezoid Badge ala Locomotive */}
          <span className="relative inline-flex items-center justify-center mx-2.5 sm:mx-4 select-none align-middle -translate-y-0.5 sm:-translate-y-1">
            <svg
              viewBox="0 0 54 28"
              className="h-[0.58em] w-auto stroke-chalk/85 fill-transparent"
              strokeWidth="1.5"
            >
              <polygon points="8,2 46,2 53,26 1,26" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] sm:text-[11px] md:text-[12px] tracking-[0.2em] font-semibold text-chalk uppercase">
              {activeItem.badge}
            </span>
          </span>

          <span>{activeItem.titlePart2}</span>
        </h1>

        {/* Clean 'Close' Button ala Locomotive */}
        <button
          onClick={onClose}
          onMouseEnter={(e) => gsap.to(e.currentTarget, { opacity: 1, duration: 0.2, ease: "power1.out" })}
          onMouseLeave={(e) => gsap.to(e.currentTarget, { opacity: 0.85, duration: 0.2, ease: "power1.out" })}
          className="font-editorial italic text-lg sm:text-xl md:text-2xl text-chalk/90 cursor-pointer pt-1"
          aria-label="Close details"
        >
          Close
        </button>
      </div>

      {/* ============================================================ */}
      {/* 2. CENTER STAGE: RESERVED 3D KARAKTER VIEWPORT (CLEAN VOID)  */}
      {/* ============================================================ */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        {/* Clean void reserved for 3D character */}
      </div>

      {/* ============================================================ */}
      {/* 3. RIGHT SIDE: SIMPLIFIED 4-WORK ROSTER (LOCOMOTIVE STYLE)   */}
      {/* ============================================================ */}
      <div className="absolute top-28 sm:top-36 right-6 sm:right-10 md:right-16 z-20 flex flex-col gap-2.5 sm:gap-3 pointer-events-auto">
        <span className="font-mono text-[9px] tracking-[0.2em] text-muted/50 uppercase mb-1">
          [ 04 WORKS ]
        </span>
        {FIELD_LOG_DATA.map((item) => {
          const isSelected = item.id === activeItem.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectJob(item.id)}
              onMouseEnter={(e) => {
                if (!isSelected) gsap.to(e.currentTarget, { color: "#E2E2DD", duration: 0.2, ease: "power1.out" });
              }}
              onMouseLeave={(e) => {
                if (!isSelected) gsap.to(e.currentTarget, { color: "#908C87", duration: 0.2, ease: "power1.out" });
              }}
              style={{ color: isSelected ? "#E2E2DD" : "#908C87" }}
              className="font-sans text-sm sm:text-base md:text-[17px] leading-[1.6] text-left cursor-pointer flex items-center gap-2 whitespace-nowrap"
            >
              {isSelected ? (
                <span className="text-chalk font-bold select-none text-base">→</span>
              ) : (
                <span className="w-3" />
              )}
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 4. BOTTOM LEFT: METADATA & COMPACT SCOPE / DELIVERABLES      */}
      {/* ============================================================ */}
      <div className="relative z-20 px-6 sm:px-10 md:px-14 pb-8 sm:pb-12 max-w-[620px] pointer-events-auto overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin">
        {/* Primary Key-Value Metadata */}
        <div className="flex flex-col gap-y-2.5 sm:gap-y-3 pb-5 border-b border-hairline">
          {/* Company & Location */}
          <div className="flex items-start text-xs sm:text-[13px] leading-relaxed">
            <span className="w-24 sm:w-28 text-muted shrink-0 font-sans">
              Company
            </span>
            <span className="text-chalk font-sans">
              {activeItem.company} {activeItem.location && <span className="text-muted">· {activeItem.location}</span>}
            </span>
          </div>

          {/* Role */}
          <div className="flex items-start text-xs sm:text-[13px] leading-relaxed">
            <span className="w-24 sm:w-28 text-muted shrink-0 font-sans">
              Role
            </span>
            <span className="text-chalk font-sans font-medium">
              {activeItem.role}
            </span>
          </div>

          {/* Project */}
          <div className="flex items-start text-xs sm:text-[13px] leading-relaxed">
            <span className="w-24 sm:w-28 text-muted shrink-0 font-sans">
              Project
            </span>
            <span className="text-chalk font-sans">
              {activeItem.project}
            </span>
          </div>

          {/* Period */}
          <div className="flex items-start text-xs sm:text-[13px] leading-relaxed">
            <span className="w-24 sm:w-28 text-muted shrink-0 font-sans">
              Period
            </span>
            <span className="text-chalk font-sans">
              {activeItem.period}
            </span>
          </div>

          {/* Tools */}
          {activeItem.tools && activeItem.tools.length > 0 && (
            <div className="flex items-start text-xs sm:text-[13px] leading-relaxed">
              <span className="w-24 sm:w-28 text-muted shrink-0 font-sans">
                Tools
              </span>
              <span className="text-chalk/80 font-mono text-[11px] sm:text-xs">
                {activeItem.tools.join(" · ")}
              </span>
            </div>
          )}
        </div>

        {/* Shortened Responsibilities / Events (Underneath Metadata) */}
        <div className="pt-4 space-y-3.5">
          {/* Case A: Geological Engineering (Organizations + Major Events) */}
          {activeItem.id === "geological-engineering" && (
            <>
              {activeItem.organizations && activeItem.organizations.length > 0 && (
                <div>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted block mb-1.5">
                    ORGANIZATIONS & ASSISTANTSHIPS
                  </span>
                  <ul className="space-y-1 text-xs sm:text-[12.5px] text-chalk/85 font-sans leading-relaxed">
                    {activeItem.organizations.map((org, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-muted select-none">•</span>
                        <span>{org}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeItem.majorEvents && activeItem.majorEvents.length > 0 && (
                <div>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted block mb-1.5">
                    MAJOR EVENTS & FIELD MAPPING
                  </span>
                  <ul className="space-y-1 text-xs sm:text-[12.5px] text-chalk/85 font-sans leading-relaxed">
                    {activeItem.majorEvents.map((evt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-muted select-none">•</span>
                        <span>{evt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Case B: Compact Responsibilities / Scope for Research, Work Practice, & Arlan */}
          {activeItem.responsibilities && activeItem.responsibilities.length > 0 && (
            <div>
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted block mb-1.5">
                {activeItem.scopeTitle || "KEY RESPONSIBILITIES"}
              </span>
              <ul className="space-y-1.5 text-xs sm:text-[12.5px] text-chalk/85 font-sans leading-relaxed">
                {activeItem.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-muted select-none">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. LEFT HOVER DRAWER (LAMA LAMA STYLE SIDEBAR — SIMPLIFIED)  */}
      {/* ============================================================ */}
      {/* Invisible Hover Hotzone on far-left edge */}
      <div
        onMouseEnter={() => setIsSidebarOpen(true)}
        className="hidden md:block absolute top-0 left-0 bottom-0 w-8 z-40 cursor-pointer"
      />

      {/* Slide-in Drawer from Left */}
      <aside
        ref={asideRef}
        onMouseLeave={() => setIsSidebarOpen(false)}
        style={{ transform: "translateX(-350px)" }}
        className="fixed top-0 bottom-0 left-0 z-50 w-72 md:w-80 bg-surface/95 backdrop-blur-2xl border-r border-hairline p-6 flex flex-col justify-between shadow-2xl"
      >
        <div>
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-hairline font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
            <span>[ 04 WORKS INDEX ]</span>
            <span
              className="text-muted hover:text-chalk cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            >
              ✕
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {FIELD_LOG_DATA.map((item) => {
              const Icon = CATEGORY_ICONS[item.categoryTag] || Layers;
              const isActive = activeItem.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    handleSelectJob(item.id);
                    setIsSidebarOpen(false);
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      gsap.to(e.currentTarget, {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        borderColor: "rgba(255, 255, 255, 0.2)",
                        duration: 0.2,
                        ease: "power1.out",
                      });
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      gsap.to(e.currentTarget, {
                        backgroundColor: "rgba(8, 9, 10, 0.5)",
                        borderColor: "rgba(226, 226, 221, 0.14)",
                        duration: 0.2,
                        ease: "power1.out",
                      });
                    }
                  }}
                  className={`group w-full text-left p-3 rounded-squircle border flex items-start gap-3 cursor-pointer ${
                    isActive
                      ? "bg-surface border-border-hover text-chalk"
                      : "bg-canvas/50 border-hairline text-muted hover:text-chalk"
                  }`}
                >
                  <div className="p-1.5 rounded-sm border border-hairline bg-surface text-chalk/70">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[8px] tracking-[0.2em] text-muted uppercase block">
                        {item.index} · {item.categoryTag}
                      </span>
                    </div>
                    <h4 className="font-sans font-medium text-xs text-chalk truncate">
                      {item.name}
                    </h4>
                    <p className="font-sans text-[11px] text-muted truncate">
                      {item.company}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-hairline font-mono text-[9px] text-muted flex justify-between">
          <span>MOVE CURSOR OUT TO CLOSE</span>
          <span>4 ENTRIES</span>
        </div>
      </aside>
    </div>
  );
}
