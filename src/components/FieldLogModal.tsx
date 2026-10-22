"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FIELD_LOG_DATA } from "@/data/fieldLogData";
import { Layers, Compass, Pickaxe, User, type LucideIcon } from "lucide-react";
import { gsap } from "gsap";

const FieldLogCanvas3D = dynamic(() => import("./FieldLogCanvas3D"), {
  ssr: false,
  loading: () => null,
});

interface FieldLogModalProps {
  isOpen: boolean;
  activeId?: string;
  initialPhotoIndex?: number;
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
  initialPhotoIndex = 0,
  onClose,
  onSelectJob,
}: FieldLogModalProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prevSync, setPrevSync] = useState({ activeId, initialPhotoIndex });
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null);
  const [fescoMode, setFescoMode] = useState<"presentation" | "gallery">("presentation");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (prevSync.activeId !== activeId || prevSync.initialPhotoIndex !== initialPhotoIndex) {
    setPrevSync({ activeId, initialPhotoIndex });
    setSelectedPhotoIdx(null);
    setFescoMode("presentation");
    setIsLightboxOpen(false);
  }

  const activePhotoIdx = selectedPhotoIdx ?? initialPhotoIndex ?? 0;
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const photoDisplayRef = useRef<HTMLDivElement>(null);

  const handleSelectPhoto = useCallback((idx: number) => {
    setSelectedPhotoIdx(idx);
  }, []);

  // GSAP subtle transition when photo index changes
  useEffect(() => {
    if (photoDisplayRef.current) {
      gsap.fromTo(
        photoDisplayRef.current,
        { opacity: 0.5, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [activePhotoIdx]);

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
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, isLightboxOpen]);

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

  const renderPhotoGallery = (isMobile: boolean) => {
    if (!activeItem.galleryPhotos || activeItem.galleryPhotos.length === 0) return null;
    const currentPhoto = activeItem.galleryPhotos[activePhotoIdx] ?? activeItem.galleryPhotos[0];

    return (
      <div className={isMobile ? "lg:hidden pt-4 pb-2" : "hidden lg:flex flex-col w-full max-w-[480px] xl:max-w-[540px]"}>
        {/* Gallery Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-hairline font-mono text-[9px] tracking-mono-bracket text-muted uppercase">
          <span>[ FIELD ARCHIVE // 0{activePhotoIdx + 1} OF 0{activeItem.galleryPhotos.length} ]</span>
          <span className="text-chalk/60 font-semibold">{currentPhoto.isWide ? "16:9 REPOSITORY" : "9:16 LAB VIEW"}</span>
        </div>

        {/* Featured Photo Display */}
        <div
          ref={!isMobile ? photoDisplayRef : undefined}
          className="relative w-full aspect-[16/10] max-h-[290px] xl:max-h-[320px] rounded-sm overflow-hidden bg-black/60 border border-hairline shadow-2xl"
        >
          <Image
            src={currentPhoto.url}
            alt={currentPhoto.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 540px"
            className="object-cover object-center"
          />
          {/* Subtle inner hairline border */}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-sm" />
        </div>

        {/* Title and Caption */}
        <div className="pt-2.5 pb-2">
          <h4 className="font-sans font-medium text-xs sm:text-[13px] text-chalk leading-snug">
            {currentPhoto.title}
          </h4>
          <p className="font-mono text-[10px] sm:text-[11px] text-muted leading-relaxed pt-0.5">
            {currentPhoto.caption}
          </p>
        </div>

        {/* 4 Mini Thumbnails Selector */}
        <div className="flex items-center gap-2 pt-1" role="tablist" aria-label="Field documentation photos">
          {activeItem.galleryPhotos.map((photo, pIdx) => {
            const isSelected = pIdx === activePhotoIdx;
            return (
              <button
                key={pIdx}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-label={`Select photo ${pIdx + 1}: ${photo.title}`}
                onClick={() => handleSelectPhoto(pIdx)}
                className={`relative w-14 h-9 sm:w-16 sm:h-10 rounded-micro overflow-hidden cursor-pointer transition-all ${
                  isSelected
                    ? "ring-2 ring-chalk shadow-md opacity-100"
                    : "ring-1 ring-hairline opacity-45 hover:opacity-85"
                }`}
              >
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  sizes="64px"
                  className="object-cover object-center"
                />
                <span className="absolute bottom-0.5 right-1 font-mono text-[7px] text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  0{pIdx + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFescoShowcase = (isMobile: boolean) => {
    return (
      <div
        className={
          isMobile
            ? "lg:hidden pt-4 pb-2 w-full"
            : "hidden lg:flex flex-col w-full max-w-[480px] xl:max-w-[540px] h-[calc(100vh-170px)]"
        }
      >
        {/* Gallery / Presentation Header toolbar */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-hairline font-mono text-[9px] tracking-mono-bracket text-muted uppercase shrink-0">
          <span className="text-chalk font-semibold">[ ✦ BRAND DOSSIER ]</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setFescoMode("presentation")}
              className={`px-2 py-0.5 rounded-micro text-[8.5px] font-mono tracking-wider uppercase transition-colors cursor-pointer ${
                fescoMode === "presentation"
                  ? "bg-white text-black font-semibold"
                  : "border border-hairline text-muted hover:text-white"
              }`}
            >
              PRESENTATION
            </button>
            <button
              type="button"
              onClick={() => setFescoMode("gallery")}
              className={`px-2 py-0.5 rounded-micro text-[8.5px] font-mono tracking-wider uppercase transition-colors cursor-pointer ${
                fescoMode === "gallery"
                  ? "bg-white text-black font-semibold"
                  : "border border-hairline text-muted hover:text-white"
              }`}
            >
              ASSETS (4)
            </button>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="px-2 py-0.5 rounded-micro border border-hairline hover:border-chalk text-chalk hover:text-white text-[8.5px] font-mono tracking-wider uppercase transition-colors cursor-pointer ml-1"
              title="Expand Fullscreen"
            >
              EXPAND ⤢
            </button>
          </div>
        </div>

        {/* Content View */}
        {fescoMode === "presentation" ? (
          <div
            className={`flex flex-col bg-surface/90 border border-hairline rounded-sm shadow-2xl overflow-hidden ${
              isMobile ? "h-[480px] w-full" : "flex-1 min-h-0"
            }`}
          >
            {/* Presentation Subheader */}
            <div className="px-3 py-1.5 border-b border-hairline/80 bg-black/40 flex items-center justify-between font-mono text-[8px] sm:text-[8.5px] text-muted tracking-wider uppercase shrink-0">
              <span className="text-chalk/80">BRAND GUIDELINES SHEET</span>
              <span className="text-signal flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
                SCROLL TO EXPLORE
              </span>
            </div>

            {/* Scrollable Viewport */}
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="flex-1 overflow-y-auto scrollbar-thin p-3 sm:p-4 bg-[#141211] flex flex-col items-center cursor-zoom-in group/sheet relative"
              title="Click to view fullscreen presentation"
            >
              <div className="relative w-full max-w-[360px] rounded-xs overflow-hidden shadow-2xl border border-white/10 group-hover/sheet:border-white/30 transition-colors">
                <Image
                  src="/projects/fesco-brand-presentation.png"
                  alt="FESCO Brand Identity & Packaging Presentation"
                  width={356}
                  height={1024}
                  className="w-full h-auto block"
                  priority
                />
              </div>

              {/* Hover Badge */}
              <div className="sticky bottom-2 mt-3 px-3 py-1 rounded-micro bg-black/85 backdrop-blur-md border border-hairline text-chalk font-mono text-[8px] sm:text-[9px] tracking-mono-bracket flex items-center gap-1.5 pointer-events-none opacity-80 group-hover/sheet:opacity-100 transition-opacity shadow-lg">
                <span>[ ⤢ CLICK TO EXPAND FULLSCREEN ]</span>
              </div>
            </div>
          </div>
        ) : (
          renderPhotoGallery(isMobile)
        )}
      </div>
    );
  };

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
          className="text-display-sm text-chalk flex items-center flex-wrap gap-y-2"
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
            <span className="absolute inset-0 flex items-center justify-center font-mono text-mono-label tracking-mono-bracket text-mono-center font-semibold text-chalk uppercase">
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
          className="font-sans text-lg sm:text-xl md:text-2xl text-chalk/90 cursor-pointer pt-1"
          aria-label="Close details"
        >
          Close
        </button>
      </div>

      {/* ============================================================ */}
      {/* 2. CENTER STAGE: 3D ARTEFACT VIEWPORT OR PHOTO GALLERY       */}
      {/* ============================================================ */}
      {activeItem.id === "arlan" && activePhotoIdx === 0 ? (
        <div className="absolute inset-0 z-10 pointer-events-auto">
          <FieldLogCanvas3D />
          {/* Overlay Switcher for Arlan Design Showcases */}
          {activeItem.galleryPhotos && activeItem.galleryPhotos.length > 0 && (
            <div className="hidden lg:flex absolute bottom-8 left-[560px] xl:left-[620px] right-[240px] xl:right-[280px] z-30 pointer-events-auto flex-col items-start gap-2 bg-surface/85 backdrop-blur-md p-3 rounded-sm border border-hairline shadow-2xl">
              <div className="flex items-center justify-between w-full font-mono text-[9px] tracking-mono-bracket text-muted uppercase">
                <span>[ 3D ARTEFACT ACTIVE // EXPLORE DESIGN ARCHIVES ]</span>
                <span className="text-signal flex items-center gap-1.5 font-semibold">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
                  LIVE 3D
                </span>
              </div>
              <div className="flex items-center gap-2" role="tablist" aria-label="Arlan design showcases">
                {activeItem.galleryPhotos.map((photo, pIdx) => {
                  const isSelected = pIdx === activePhotoIdx;
                  return (
                    <button
                      key={pIdx}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-label={`Select showcase ${pIdx + 1}: ${photo.title}`}
                      onClick={() => handleSelectPhoto(pIdx)}
                      className={`relative w-14 h-9 sm:w-16 sm:h-10 rounded-micro overflow-hidden cursor-pointer transition-all ${
                        isSelected
                          ? "ring-2 ring-chalk shadow-md opacity-100"
                          : "ring-1 ring-hairline opacity-50 hover:opacity-90"
                      }`}
                    >
                      <Image
                        src={photo.url}
                        alt={photo.title}
                        fill
                        sizes="64px"
                        className="object-cover object-center"
                      />
                      <span className="absolute bottom-0.5 right-1 font-mono text-[7px] text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                        {pIdx === 0 ? "3D" : `0${pIdx + 1}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : activeItem.id === "fesco" ? (
        <div className="hidden lg:flex absolute top-24 xl:top-28 left-[530px] xl:left-[590px] right-[230px] xl:right-[260px] bottom-6 z-20 pointer-events-auto flex-col justify-between items-start">
          {renderFescoShowcase(false)}
        </div>
      ) : activeItem.galleryPhotos && activeItem.galleryPhotos.length > 0 ? (
        <div className="hidden lg:flex absolute top-32 xl:top-36 left-[560px] xl:left-[620px] right-[240px] xl:right-[280px] bottom-10 z-20 pointer-events-auto flex-col justify-end items-start">
          {renderPhotoGallery(false)}
        </div>
      ) : activeItem.id === "arlan" ? (
        <div className="absolute inset-0 z-10 pointer-events-auto">
          <FieldLogCanvas3D />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          {/* Clean void for technical documentation */}
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. RIGHT SIDE: SIMPLIFIED 4-WORK ROSTER (LOCOMOTIVE STYLE)   */}
      {/* ============================================================ */}
      <div className="absolute top-28 sm:top-36 right-6 sm:right-10 md:right-16 z-20 flex flex-col gap-2.5 sm:gap-3 pointer-events-auto">
        <span className="font-pixel-grid text-mono-label tracking-mono-bracket text-muted/50 uppercase mb-1">
          [ 0{FIELD_LOG_DATA.length} WORKS ]
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
              className="text-body-2 sm:text-body-1 leading-[1.6] text-left cursor-pointer flex items-center gap-2 whitespace-nowrap"
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

          {/* Brand Palette for Fesco */}
          {activeItem.id === "fesco" && (
            <div className="flex items-start text-xs sm:text-[13px] leading-relaxed">
              <span className="w-24 sm:w-28 text-muted shrink-0 font-sans">
                Palette
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-chalk/90 bg-white/5 border border-hairline px-1.5 py-0.5 rounded-micro">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#FF1313] inline-block border border-white/20" />
                  #FF1313
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-chalk/90 bg-white/5 border border-hairline px-1.5 py-0.5 rounded-micro">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#76332D] inline-block border border-white/20" />
                  #76332D
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-chalk/90 bg-white/5 border border-hairline px-1.5 py-0.5 rounded-micro">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#FFFBEC] inline-block border border-white/20" />
                  #FFFBEC
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-chalk/90 bg-white/5 border border-hairline px-1.5 py-0.5 rounded-micro">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#373130] inline-block border border-white/20" />
                  #373130
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Photo Gallery Showcase (Visible only on screens < lg) */}
        {activeItem.id === "fesco" ? renderFescoShowcase(true) : renderPhotoGallery(true)}

        {/* Shortened Responsibilities / Events (Underneath Metadata) */}
        <div className="pt-4 space-y-3.5">
          {/* Case A: Geological Engineering (Organizations + Major Events) */}
          {activeItem.id === "geological-engineering" && (
            <>
              {activeItem.organizations && activeItem.organizations.length > 0 && (
                <div>
                  <span className="font-mono text-mono-label tracking-mono-bracket uppercase text-muted block mb-1.5">
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
                  <span className="font-mono text-mono-label tracking-mono-bracket uppercase text-muted block mb-1.5">
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
              <span className="font-mono text-mono-label tracking-mono-bracket uppercase text-muted block mb-1.5">
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
            <span>[ 0{FIELD_LOG_DATA.length} WORKS INDEX ]</span>
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
          <span>{FIELD_LOG_DATA.length} ENTRIES</span>
        </div>
      </aside>

      {/* ============================================================ */}
      {/* 6. FULLSCREEN HIGH-RES LIGHTBOX MODAL FOR FESCO PRESENTATION */}
      {/* ============================================================ */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100000] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 select-none animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Fesco Brand Presentation Fullscreen"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between w-full max-w-4xl mx-auto pb-4 border-b border-hairline font-mono text-[10px] sm:text-xs tracking-mono-bracket text-muted uppercase">
            <div className="flex items-center gap-2 text-chalk">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FF1313] animate-pulse" />
              <span>[ FESCO // BRAND IDENTITY & GUIDELINES DOSSIER ]</span>
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="text-chalk hover:text-white px-3 py-1 rounded-micro border border-hairline hover:border-chalk text-xs font-mono cursor-pointer transition-colors"
            >
              CLOSE [ ESC ] ✕
            </button>
          </div>

          {/* Centered Scrollable Canvas */}
          <div className="flex-1 w-full max-w-2xl mx-auto overflow-y-auto scrollbar-thin py-6 flex justify-center items-start">
            <div className="relative w-full max-w-[500px] rounded-sm overflow-hidden border border-white/20 shadow-2xl bg-surface">
              <Image
                src="/projects/fesco-brand-presentation.png"
                alt="FESCO Brand Identity Presentation Fullscreen"
                width={356}
                height={1024}
                className="w-full h-auto block"
                priority
              />
            </div>
          </div>

          {/* Bottom Bar Info */}
          <div className="w-full max-w-4xl mx-auto pt-3 border-t border-hairline font-mono text-[9px] sm:text-[10px] text-muted flex flex-col sm:flex-row items-center justify-between gap-1">
            <span>ABOUT THE BRAND · IBU SYAHRINI · PALETTE #FF1313 #76332D #FFFBEC #373130</span>
            <span className="text-chalk/70">SCROLL DOWN TO INSPECT FULL ARTWORK</span>
          </div>
        </div>
      )}
    </div>
  );
}
