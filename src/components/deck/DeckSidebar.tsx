"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CHAPTERS, type ChapterId } from "./types";
import { gsap } from "gsap";

interface DeckSidebarProps {
  activeChapter: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
  onClose?: () => void;
}

export default function DeckSidebar({
  activeChapter,
  onSelectChapter,
  onClose,
}: DeckSidebarProps) {
  const backBtnRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const handleBackMouseEnter = () => {
    if (backBtnRef.current) {
      gsap.to(backBtnRef.current, {
        x: -3,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const handleBackMouseLeave = () => {
    if (backBtnRef.current) {
      gsap.to(backBtnRef.current, {
        x: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  return (
    <aside
      className="w-[230px] h-screen bg-[#080808] border-r border-white/5 flex flex-col justify-between p-3.5 z-50 shrink-0 relative overflow-hidden select-none"
      data-purpose="deck-navigation-sidebar"
    >
      {/* Top Header: Back to Portfolio Link / Close */}
      <div className="mb-3 pb-3 border-b border-white/10 shrink-0">
        {onClose ? (
          <button
            ref={backBtnRef as unknown as React.RefObject<HTMLButtonElement>}
            onClick={onClose}
            onMouseEnter={handleBackMouseEnter}
            onMouseLeave={handleBackMouseLeave}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white font-mono text-[10px] tracking-widest uppercase transition-colors py-1 px-1 rounded-sm cursor-pointer"
            type="button"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>CLOSE DECK</span>
          </button>
        ) : (
          <Link
            ref={backBtnRef as unknown as React.RefObject<HTMLAnchorElement>}
            href="/"
            onMouseEnter={handleBackMouseEnter}
            onMouseLeave={handleBackMouseLeave}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white font-mono text-[10px] tracking-widest uppercase transition-colors py-1 px-1 rounded-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PORTFOLIO</span>
          </Link>
        )}
      </div>

      {/* Chapter Navigation List */}
      <nav className="flex flex-col gap-1.5 z-10 no-scrollbar overflow-y-auto pr-0.5 flex-1 custom-scroll">
        {CHAPTERS.map((chapter) => {
          const isActive = activeChapter === chapter.id;

          return (
            <button
              key={chapter.id}
              onClick={() => onSelectChapter(chapter.id)}
              className={`deck-nav-btn group w-full p-1.5 rounded-[4px] flex items-center gap-2.5 text-left cursor-pointer transition-colors duration-200 ${
                isActive
                  ? "bg-[#F5F1E9] text-black font-extrabold shadow-sm"
                  : "bg-[#141414] hover:bg-[#1F1F1F] text-white/90 font-bold"
              }`}
              data-purpose="nav-item"
              data-target={`panel-${chapter.id}`}
              type="button"
            >
              {/* Thumbnail indicator with gradient & index */}
              <div
                className={`w-7 h-7 rounded-[2px] overflow-hidden shrink-0 relative ${
                  isActive ? "bg-black" : "bg-neutral-900"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-tr ${chapter.thumbGradient} opacity-90`}
                />
                <span
                  className={`absolute inset-0 flex items-center justify-center font-mono text-[9px] font-bold ${
                    isActive ? "text-white" : "text-white/70"
                  }`}
                >
                  {chapter.index}
                </span>
              </div>

              {/* Label */}
              <span className="text-[11px] font-sans font-black tracking-wider uppercase truncate">
                {chapter.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Bottom: Watermark Typography & Studio Tag */}
      <div className="relative pt-4 pointer-events-none mt-auto shrink-0 select-none border-t border-white/5">
        <div className="leading-[0.82] font-black uppercase text-[30px] tracking-[-0.04em] text-[#1c1c1c] break-words">
          A CRE<br />AGEN<br />IN OR
        </div>
        <div className="mt-3 font-mono text-[9px] tracking-widest text-white/40 uppercase">
          20+ DIGITAL FREAKS
        </div>
      </div>
    </aside>
  );
}
