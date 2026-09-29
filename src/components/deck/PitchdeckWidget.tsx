"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import AboutDeck from "./AboutDeck";

export default function PitchdeckWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);
  const cardBackRef = useRef<HTMLDivElement>(null);
  const cardMidRef = useRef<HTMLDivElement>(null);
  const cardFrontRef = useRef<HTMLDivElement>(null);

  // Manage body scroll & Lenis smooth scroll lock when fullscreen pitchdeck is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      if (lenis) lenis.start();
    }

    return () => {
      document.body.style.overflow = "";
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      if (lenis) lenis.start();
    };
  }, [isModalOpen]);

  // Toggle Collapse / Expand with GSAP (Exact 155px height when expanded, 34px when collapsed)
  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current || !contentWrapRef.current) return;

    if (isExpanded) {
      gsap.to(containerRef.current, {
        height: 34,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(contentWrapRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
        onComplete: () => setIsExpanded(false),
      });
    } else {
      setIsExpanded(true);
      gsap.to(containerRef.current, {
        height: 155,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.fromTo(
        contentWrapRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, delay: 0.1, ease: "power2.out" }
      );
    }
  };

  // GSAP Hover Micro-Interaction: Kartu meregang sedikit ke atas saat kursor mendekat
  const handleMouseEnter = () => {
    if (!isExpanded) return;
    if (cardBackRef.current) {
      gsap.to(cardBackRef.current, {
        y: -22,
        rotation: 0,
        scale: 0.92,
        duration: 0.4,
        ease: "back.out(1.5)",
      });
    }
    if (cardMidRef.current) {
      gsap.to(cardMidRef.current, {
        y: -11,
        rotation: 0,
        scale: 0.97,
        duration: 0.4,
        ease: "back.out(1.5)",
      });
    }
    if (cardFrontRef.current) {
      gsap.to(cardFrontRef.current, {
        y: 2,
        rotation: 0,
        scale: 1.02,
        duration: 0.4,
        ease: "back.out(1.5)",
      });
    }
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        borderColor: "rgba(255, 255, 255, 0.28)",
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!isExpanded) return;
    if (cardBackRef.current) {
      gsap.to(cardBackRef.current, {
        y: -14,
        rotation: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power2.out",
      });
    }
    if (cardMidRef.current) {
      gsap.to(cardMidRef.current, {
        y: -7,
        rotation: 0,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.out",
      });
    }
    if (cardFrontRef.current) {
      gsap.to(cardFrontRef.current, {
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        borderColor: "rgba(226, 226, 221, 0.12)",
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  return (
    <>
      {/* Floating Desktop Widget (Strictly matching Lama Lama reference: 160 x 155 px) */}
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ width: "160px", height: isExpanded ? "155px" : "34px" }}
        className="hidden lg:flex flex-col p-2.5 rounded-[8px] bg-[#111213] border border-white/[0.12] shadow-[0_10px_30px_rgba(0,0,0,0.65)] select-none relative overflow-hidden will-change-[transform,height]"
      >
        {/* Textured Dot Matrix Pattern in Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "5px 5px",
          }}
          aria-hidden="true"
        />

        {/* 1. Header Section: PITCHDECK on left, ( - ) on right (Clean: no underline, no arrow) */}
        <div className="relative z-10 w-full flex items-center justify-between h-[16px] shrink-0 select-none px-0.5">
          <span className="font-sans font-black text-[10px] tracking-[0.06em] text-[#EDEDED] uppercase leading-none">
            PITCHDECK
          </span>

          <button
            type="button"
            onClick={handleToggleExpand}
            className="font-sans font-black text-[10px] text-[#EDEDED] hover:text-white tracking-[0.06em] cursor-pointer transition-colors px-0.5 leading-none"
            aria-label={isExpanded ? "Collapse pitchdeck" : "Expand pitchdeck"}
          >
            {isExpanded ? "( - )" : "( + )"}
          </button>
        </div>

        {/* 2. Stacked Slides Container: Terdalam (Journey Crimson) -> Tengah (Toolkit) -> Terluar/Depan (About Me) */}
        <div
          ref={contentWrapRef}
          className={`relative z-10 w-full flex-1 pt-3 pb-0.5 overflow-visible ${
            !isExpanded ? "hidden" : "block"
          }`}
        >
          <div
            onClick={() => setIsModalOpen(true)}
            title="Click to open Pitchdeck"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsModalOpen(true);
              }
            }}
            className="relative w-full h-[106px] cursor-pointer outline-none group/stack flex flex-col justify-end pb-1"
          >
            {/* Kartu 3: Terdalam / Paling Atas */}
            <div
              ref={cardBackRef}
              style={{ transform: "translateY(-12px) scale(0.9)" }}
              className="absolute inset-x-0 bottom-1 h-[84px] rounded-[3px] bg-[#F4F1EA] border border-black/15 shadow-xs z-10 will-change-transform pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-black/20" />
              <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 rounded-full bg-black/20" />
            </div>

            {/* Kartu 2: Lapisan Tengah */}
            <div
              ref={cardMidRef}
              style={{ transform: "translateY(-6px) scale(0.95)" }}
              className="absolute inset-x-0 bottom-1 h-[84px] rounded-[3px] bg-[#F4F1EA] border border-black/15 shadow-xs z-20 will-change-transform pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-black/20" />
              <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 rounded-full bg-black/20" />
            </div>

            {/* Kartu 1: Terluar / Depan */}
            <div
              ref={cardFrontRef}
              style={{ transform: "translateY(0px) scale(1)" }}
              className="relative w-full h-[84px] rounded-[3px] bg-[#F4F1EA] text-[#0A0A0A] p-2 shadow-[0_4px_16px_rgba(0,0,0,0.35)] border border-black/15 z-30 will-change-transform overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-black/30" />
              <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 rounded-full bg-black/30" />

              {/* Headline Bersih & Besar */}
              <div className="pt-0.5">
                <h4 className="font-sans font-black text-[13px] leading-[0.9] tracking-tight uppercase text-black">
                  PRASTYO
                  <br />
                  ARLAN.
                </h4>
              </div>

              {/* Bottom Row Split: Cuplikan Deskripsi Asli & Foto Portrait Profil */}
              <div className="flex items-end justify-between gap-1.5 mt-auto">
                {/* Cuplikan Teks Asli Deck */}
                <p className="font-sans text-[4.5px] leading-[1.3] text-black/70 max-w-[70px] line-clamp-3">
                  Geological Engineering graduate from ITERA. Passionate about exploration, subsurface data.
                </p>

                {/* Foto Portrait Asli Portofolio */}
                <div className="relative w-[34px] h-[34px] rounded-[1.5px] overflow-hidden bg-neutral-900 border border-black/10 shadow-xs shrink-0">
                  <Image
                    src="/avatar.jpg"
                    alt="Prastyo Arlan"
                    fill
                    sizes="34px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Interactive Pitchdeck Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] w-screen h-screen bg-black">
          <AboutDeck onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </>
  );
}
