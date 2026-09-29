"use client";

import React from "react";
import PhotoPlaceholder from "./PhotoPlaceholder";
import type { ChapterId } from "./types";

interface PanelProps {
  onClose: () => void;
  onNavigate?: (id: ChapterId) => void;
}

// ─────────────────────────────────────────────────────────────
// CHAPTER 01: JOURNEY (WELCOME)
// ─────────────────────────────────────────────────────────────
export function JourneyPanel({ onNavigate }: PanelProps) {
  const milestones = [
    {
      institution: "Institut Teknologi Sumatera",
      detail: "B.Eng Geological Engineering (GPA 3.62 / 4.00)",
      year: "2025",
    },
    {
      institution: "Hydrogeology Laboratory",
      detail: "Laboratory Assistant",
      year: "2023",
    },
    {
      institution: "PT Pertamina Hulu Rokan",
      detail: "Undergraduate Thesis Internship (Subsurface & Biostratigraphy)",
      year: "2023",
    },
    {
      institution: "PT Pertamina Hulu Rokan",
      detail: "Work Practice for Exploration Division (Well Log Analysis)",
      year: "2022",
    },
    {
      institution: "Geomorphology Laboratory",
      detail: "Laboratory Assistant",
      year: "2022",
    },
    {
      institution: "Geotechnical Laboratory",
      detail: "Laboratory Assistant",
      year: "2022",
    },
    {
      institution: "MGEI SC ITERA",
      detail: "Deputy Head of Seminar & Field Trip Division",
      year: "2022",
    },
    {
      institution: "HMGL Avanindra",
      detail: "Academic Department Staff (Software Training & Tutoring)",
      year: "2021",
    },
  ];

  return (
    <div className="w-full h-full bg-[#E03426] text-[#121212] flex flex-col justify-between p-5 sm:p-7 lg:p-10 relative overflow-hidden font-sans select-text rounded-[6px] shadow-2xl">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between w-full border-b border-black/15 pb-2.5 sm:pb-3.5 select-none shrink-0">
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-lg sm:text-2xl font-black tracking-tight text-[#121212]">
            Prastyo Arlan®
          </span>
          <span className="hidden sm:inline-block font-mono text-sm tracking-wider text-black/60">
            ⌒*⌒
          </span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 font-medium text-xs sm:text-base text-black/80">
          <span className="font-black text-black underline underline-offset-8 decoration-2">
            Journey
          </span>
          {onNavigate && (
            <button
              onClick={() => onNavigate("about")}
              className="text-black/60 hover:text-black font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              NEXT ➔
            </button>
          )}
        </div>
      </div>

      {/* Main Milestones List: Viewport-fitted without scrolling */}
      <div className="flex-1 flex flex-col justify-evenly my-2 sm:my-3 divide-y divide-black/15 overflow-hidden">
        {milestones.map((item, idx) => (
          <div
            key={idx}
            className="py-1 sm:py-1.5 grid grid-cols-12 gap-2 sm:gap-4 items-center hover:bg-black/5 transition-colors px-1 sm:px-2 rounded-xs"
          >
            <div className="col-span-5 sm:col-span-4 font-bold text-xs sm:text-[14px] text-black truncate">
              {item.institution}
            </div>
            <div className="col-span-5 sm:col-span-6 text-[11px] sm:text-xs text-black/80 font-medium truncate">
              {item.detail}
            </div>
            <div className="col-span-2 text-right font-mono text-[11px] sm:text-xs font-bold text-black">
              {item.year}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Status Ticker */}
      <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-black/60 pt-2.5 border-t border-black/15 select-none uppercase shrink-0">
        <span>ARCHIVE // 2021 — 2025</span>
        <span>ACADEMIC &amp; INDUSTRY LOG</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CHAPTER 02: WHO WE ARE (ABOUT)
// ─────────────────────────────────────────────────────────────
export function AboutPanel({ onClose }: PanelProps) {
  return (
    <div className="w-full h-full bg-[#F5F1E9] rounded-[6px] p-5 sm:p-7 lg:p-10 flex flex-col justify-between relative shadow-2xl overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 w-9 h-9 sm:w-11 sm:h-11 rounded-[3px] border border-black/20 hover:bg-black/5 text-black flex items-center justify-center text-xs sm:text-sm font-mono transition-colors duration-150 z-20 cursor-pointer"
        type="button"
        title="Return to Journey"
      >
        ✕
      </button>

      <div className="shrink-0 max-w-[1100px] pr-12">
        <div className="font-mono text-[10px] sm:text-xs text-black/70 tracking-widest uppercase mb-1.5 sm:mb-2 select-text">
          [ AVAILABLE FOR WORK — EARLY CAREER ]
        </div>
        <h1 className="font-sans font-black text-3xl sm:text-5xl lg:text-[68px] xl:text-[78px] text-[#0A0A0A] select-text tracking-tight uppercase leading-[0.9]">
          PRASTYO ARLAN
        </h1>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center flex-1 my-auto overflow-hidden">
        <div className="lg:col-span-7 flex flex-col justify-center space-y-3 sm:space-y-4 max-w-[620px]">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-widest text-black/60 uppercase">
            [ ABOUT PRASTYO ARLAN ]
          </div>
          <p className="text-xs sm:text-[14px] lg:text-[15px] font-medium text-[#111] leading-relaxed select-text">
            Hello, I am Prastyo. As a Geological Engineering graduate from
            Institut Teknologi Sumatera, I am passionate about geological
            exploration and geological modeling. With the experience I gained
            through my studies and internship, my primary focus is translating
            technical data into accurate spatial maps and strategic models.
          </p>
          <p className="text-xs sm:text-[13px] lg:text-[14px] font-normal text-black/80 leading-relaxed select-text">
            My work is consistently driven by a strong commitment to
            operational safety, teamwork, and disciplined execution. I ensure
            that every decision is calculated, efficient, and highly
            collaborative. I have a vision to build a dynamic professional
            journey. I am ready to dedicate myself fully to creating innovative
            solutions for every project I take on.
          </p>
        </div>

        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full">
          <PhotoPlaceholder
            aspectRatio="aspect-[4/5]"
            label="PHOTO PLACEHOLDER"
            subLabel="PORTRAIT FRAME"
            aspectText="ASPECT RATIO 4:5"
            className="max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] max-h-[260px] sm:max-h-[300px] lg:max-h-[340px]"
          />
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-between text-[10px] font-mono text-black/50 pt-2 border-t border-black/10 select-none uppercase">
        <span>PRASTYO ARLAN // PROFILE</span>
        <span>SCROLL DOWN FOR SPECIALIZATION ➔</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CHAPTER 03: WHAT WE DO
// ─────────────────────────────────────────────────────────────
export function WhatIDoPanel({ onClose }: PanelProps) {
  return (
    <div className="w-full h-full bg-[#F5F1E9] rounded-[6px] p-5 sm:p-7 lg:p-10 flex flex-col justify-between relative shadow-2xl overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 w-9 h-9 sm:w-11 sm:h-11 border border-black/20 flex items-center justify-center hover:bg-black/5 active:scale-95 transition-all text-black font-mono text-xs sm:text-sm z-20 cursor-pointer"
        type="button"
      >
        ✕
      </button>

      <div className="shrink-0">
        <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-black uppercase leading-none select-none tracking-tight">
          WHAT I DO
        </h1>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center gap-6 lg:gap-10 xl:gap-14 py-2 sm:py-3 my-auto overflow-hidden">
        <div className="w-[180px] sm:w-[220px] lg:w-[260px] shrink-0">
          <PhotoPlaceholder
            aspectRatio="aspect-[3/4]"
            label="PORTRAIT"
            subLabel="TECHNICAL LEAD"
            aspectText="ASPECT RATIO 3:4"
            className="max-h-[220px] sm:max-h-[260px] lg:max-h-[300px]"
          />
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl">
          {/* Geology Column */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <span className="font-mono text-[10px] sm:text-xs text-black tracking-widest uppercase font-bold">
              [ GEOLOGY ]
            </span>
            <ul className="space-y-1 text-[#111] text-[11px] sm:text-xs lg:text-[13px] font-normal leading-relaxed">
              <li>• Geological Mapping &amp; 3D Modeling</li>
              <li>• Well Log Analysis</li>
              <li>• Subsurface Data Interpretation</li>
              <li>• Sequence &amp; Biostratigraphy</li>
              <li>• Mine Planning &amp; Scheduling</li>
            </ul>
          </div>

          {/* Data Analysis Column */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <span className="font-mono text-[10px] sm:text-xs text-black tracking-widest uppercase font-bold">
              [ DATA ANALYSIS ]
            </span>
            <ul className="space-y-1 text-[#111] text-[11px] sm:text-xs lg:text-[13px] font-normal leading-relaxed">
              <li>• Basic Data Science (Excel)</li>
              <li>• Data Processing &amp; Tabulation</li>
              <li>• Data Matching &amp; Validation</li>
              <li>• Geospatial Data Processing</li>
            </ul>
          </div>

          {/* Vibe Coding & AI Column */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <span className="font-mono text-[10px] sm:text-xs text-black tracking-widest uppercase font-bold">
              [ VIBE CODING &amp; AI ]
            </span>
            <ul className="space-y-1 text-[#111] text-[11px] sm:text-xs lg:text-[13px] font-normal leading-relaxed">
              <li>• AI Prompt Engineering</li>
              <li>• UI/UX &amp; Design Systems</li>
              <li>• Frontend Direction (Next.js)</li>
              <li>• Motion Direction (GSAP)</li>
              <li>• 3D Asset Integration (Three.js)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-between text-[10px] font-mono text-black/50 pt-2 border-t border-black/10 select-none uppercase">
        <span>CORE CAPABILITIES</span>
        <span>SCROLL DOWN FOR OUR VIBE ➔</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CHAPTER 04: OUR VIBE
// ─────────────────────────────────────────────────────────────
export function OurVibePanel({ onClose }: PanelProps) {
  return (
    <div className="w-full h-full bg-[#F5F1E9] rounded-[6px] p-5 sm:p-7 lg:p-10 flex flex-col justify-between relative shadow-2xl overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 w-9 h-9 sm:w-11 sm:h-11 border border-black/20 flex items-center justify-center hover:bg-black/5 active:scale-95 transition-all text-black font-mono text-xs sm:text-sm z-20 cursor-pointer"
        type="button"
      >
        ✕
      </button>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center my-auto overflow-hidden">
        <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
          <h1 className="font-sans font-black text-3xl sm:text-5xl lg:text-[62px] text-black uppercase leading-[0.88] select-none tracking-tight">
            ROCK &apos;N ROLL
            <br />
            MINDS WITH
            <br />
            WARM HEARTS
          </h1>
          <div className="pt-2">
            <div className="font-mono text-[10px] sm:text-xs text-black tracking-widest uppercase mb-2">
              [ OUR VIBE ]
            </div>
            <p className="text-xs sm:text-sm lg:text-[16px] font-medium text-black/80 leading-relaxed max-w-[480px]">
              Raw passion meets technical rigor. Driven by the energy to explore
              the unknown, ground technical decisions in safety, and deliver
              tangible engineering impact.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 flex items-center justify-center lg:justify-end w-full">
          <PhotoPlaceholder
            aspectRatio="aspect-[16/10]"
            label="STUDIO ENVIRONMENT"
            subLabel="MUSIC, CODE &amp; GEOLOGY"
            aspectText="ASPECT RATIO 16:10"
            className="max-w-[480px] max-h-[260px] sm:max-h-[300px] lg:max-h-[340px]"
          />
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-between text-[10px] font-mono text-black/50 pt-2 border-t border-black/10 select-none uppercase">
        <span>STUDIO CULTURE</span>
        <span>SCROLL DOWN FOR CORE VALUES ➔</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CHAPTER 05: CORE VALUES
// ─────────────────────────────────────────────────────────────
export function CoreValuesPanel({ onClose }: PanelProps) {
  const values = [
    {
      index: "01",
      title: "STAY CURIOUS,\nADAPT FAST.",
      description:
        "The industry evolves, and so do I. I thrive on exploring new tools, from traditional subsurface mapping to modern AI-driven workflows. Relentless learning meets high adaptability.",
      tags: ["[ Adaptability ]", "[ Eager to Learn ]"],
    },
    {
      index: "02",
      title: "SHARP FOCUS,\nSOLID EXECUTION.",
      description:
        "Great outcomes require discipline and a meticulous eye for detail. Whether analyzing complex spatial datasets or structuring a project, I believe in doing the work right.",
      tags: ["[ Detail-oriented ]", "[ Discipline ]", "[ Work Ethic ]"],
    },
    {
      index: "03",
      title: "KEEP IT\nGROUNDED.",
      description:
        "True progress happens when people work together with integrity. I bring loyalty, clear communication, and a collaborative spirit to every team I join.",
      tags: ["[ Teamwork ]", "[ Leadership ]", "[ Integrity ]"],
    },
  ];

  return (
    <div className="w-full h-full bg-[#F5F1E9] rounded-[6px] p-5 sm:p-7 lg:p-10 flex flex-col justify-between relative shadow-2xl overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 w-9 h-9 sm:w-11 sm:h-11 border border-black/20 flex items-center justify-center hover:bg-black/5 active:scale-95 transition-all text-black font-mono text-xs sm:text-sm z-20 cursor-pointer"
        type="button"
      >
        ✕
      </button>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 items-center my-auto overflow-hidden">
        <div className="lg:col-span-8 flex flex-col justify-between space-y-2.5 sm:space-y-3.5 pr-0 lg:pr-2">
          {values.map((v) => (
            <div key={v.index} className="pt-2 sm:pt-2.5 border-t border-black/20">
              <div className="font-mono text-[9px] sm:text-[10px] text-black/60 tracking-widest uppercase mb-1">
                [ CORE VALUE {v.index} ]
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 items-start">
                <div className="md:col-span-5">
                  <h2 className="font-sans font-black text-sm sm:text-lg lg:text-xl text-black uppercase leading-[0.9] select-text whitespace-pre-line">
                    {v.title}
                  </h2>
                </div>
                <div className="md:col-span-7 space-y-1.5">
                  <p className="text-[11px] sm:text-xs lg:text-[13px] font-normal text-black leading-relaxed select-text line-clamp-2 md:line-clamp-none">
                    {v.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-0.5 font-mono text-[9px] sm:text-[10px] text-black/70">
                    {v.tags.map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 rounded-[2px] bg-black/5 border border-black/10 uppercase tracking-wider font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
          <PhotoPlaceholder
            aspectRatio="aspect-[3/4]"
            label="DISCIPLINE"
            subLabel="VALUES IN FIELD WORK"
            aspectText="ASPECT RATIO 3:4"
            className="max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] max-h-[240px] sm:max-h-[280px] lg:max-h-[320px]"
          />
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-between text-[10px] font-mono text-black/50 pt-2 border-t border-black/10 select-none uppercase">
        <span>CORE OPERATING PRINCIPLES</span>
        <span>SCROLL DOWN FOR TOOLKIT ➔</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CHAPTER 06: TOOLKIT
// ─────────────────────────────────────────────────────────────
export function ToolkitPanel({ onClose }: PanelProps) {
  return (
    <div className="w-full h-full bg-[#F5F1E9] rounded-[6px] p-5 sm:p-7 lg:p-10 flex flex-col justify-between relative shadow-2xl overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 w-9 h-9 sm:w-11 sm:h-11 border border-black/20 flex items-center justify-center hover:bg-black/5 active:scale-95 transition-all text-black font-mono text-xs sm:text-sm z-20 cursor-pointer"
        type="button"
      >
        ✕
      </button>

      <div className="shrink-0">
        <div className="font-mono text-[10px] sm:text-xs text-black/70 tracking-widest uppercase mb-1 select-text">
          [ THE TOOLKIT ]
        </div>
        <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-black uppercase leading-none select-none tracking-tight">
          TOOLKIT
        </h1>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center gap-6 lg:gap-10 xl:gap-14 py-2 sm:py-3 my-auto overflow-hidden">
        <div className="w-[180px] sm:w-[220px] lg:w-[260px] shrink-0">
          <PhotoPlaceholder
            aspectRatio="aspect-[3/4]"
            label="TOOLKIT"
            subLabel="TECHNICAL SUITE"
            aspectText="ASPECT RATIO 3:4"
            className="max-h-[220px] sm:max-h-[260px] lg:max-h-[300px]"
          />
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl">
          {/* Geology Software */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] sm:text-xs text-black tracking-widest uppercase font-bold">
              [ GEOLOGY SOFTWARE ]
            </span>
            <ul className="space-y-1 text-[#111] text-[11px] sm:text-xs lg:text-[13px] font-normal leading-relaxed">
              <li>• ArcGIS</li>
              <li>• Qgis</li>
              <li>• Minescape</li>
              <li>• Spry</li>
              <li>• Global Mapper</li>
              <li>• RockWorks</li>
            </ul>
          </div>

          {/* Productivity */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] sm:text-xs text-black tracking-widest uppercase font-bold">
              [ PRODUCTIVITY ]
            </span>
            <ul className="space-y-1 text-[#111] text-[11px] sm:text-xs lg:text-[13px] font-normal leading-relaxed">
              <li>• Microsoft Excel</li>
              <li>• Microsoft Word</li>
              <li>• Microsoft PowerPoint</li>
              <li>• Google Docs</li>
              <li>• Figma &amp; Canva</li>
              <li>• CorelDRAW</li>
            </ul>
          </div>

          {/* AI Tooling */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] sm:text-xs text-black tracking-widest uppercase font-bold">
              [ AI TOOLING ]
            </span>
            <ul className="space-y-1 text-[#111] text-[11px] sm:text-xs lg:text-[13px] font-normal leading-relaxed">
              <li>• Gemini &amp; Claude</li>
              <li>• ChatGPT</li>
              <li>• Google Stitch</li>
              <li>• GitHub</li>
              <li>• Antigravity</li>
              <li>• Notebook LM</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-between text-[10px] font-mono text-black/50 pt-2 border-t border-black/10 select-none uppercase">
        <span>SOFTWARE &amp; WORKFLOW STACK</span>
        <span>SCROLL DOWN FOR THE WORK ➔</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CHAPTER 07: THE WORK
// ─────────────────────────────────────────────────────────────
export function TheWorkPanel({ onClose }: PanelProps) {
  return (
    <div className="w-full h-full bg-[#F5F1E9] rounded-[6px] p-5 sm:p-7 lg:p-10 flex flex-col justify-between relative shadow-2xl overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 w-9 h-9 sm:w-11 sm:h-11 rounded-[3px] border border-black/20 hover:bg-black/5 text-black flex items-center justify-center font-mono text-xs sm:text-sm z-20 cursor-pointer"
        type="button"
      >
        ✕
      </button>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center my-auto overflow-hidden">
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
          <h2 className="font-sans font-black text-3xl sm:text-5xl lg:text-[68px] text-black select-text leading-none uppercase">
            THE WORK?
            <br />
            I NEED WORK.
          </h2>
          <div className="pt-2">
            <div className="font-mono text-[10px] sm:text-xs text-black tracking-widest uppercase mb-2">
              [ THE WORK ]
            </div>
            <p className="text-xs sm:text-base lg:text-[18px] font-medium text-black leading-snug max-w-[480px] select-text">
              Let&apos;s be honest, no corporate jargon here. I am hungry for
              real-world opportunities. Here is the data I&apos;ve processed, the
              maps I&apos;ve built, and the problems I&apos;ve solved.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end w-full">
          <PhotoPlaceholder
            aspectRatio="aspect-[4/5]"
            label="PROJECT WORK"
            subLabel="SUB-SURFACE &amp; MAPPING"
            aspectText="ASPECT RATIO 4:5"
            className="max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] max-h-[260px] sm:max-h-[300px] lg:max-h-[340px]"
          />
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-between text-[10px] font-mono text-black/50 pt-2 border-t border-black/10 select-none uppercase">
        <span>DELIVERABLES &amp; IMPACT</span>
        <span>SCROLL DOWN FOR CERTIFICATIONS ➔</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CHAPTER 08: CERTIFICATIONS
// ─────────────────────────────────────────────────────────────
export function CertificationsPanel({ onClose }: PanelProps) {
  const certifications = [
    {
      title: "Coal Mine Planning Training: Minescape & Spry",
      issuer: "Initambang.com",
      date: "Dec 2025",
    },
    {
      title: "Refreshment Training of Lower Operational Supervisor (Pra POP)",
      issuer: "CV. Nusa Mineral Investama",
      date: "Oct 2025",
    },
    {
      title: "Basic Data Science Excel",
      issuer: "Jobstreet.com",
      date: "Nov 2025",
    },
    {
      title: "Basic Excel for Admin",
      issuer: "Jobstreet.com",
      date: "Nov 2025",
    },
    {
      title: "TOEFL",
      issuer: "Language Center Institut Teknologi Sumatera",
      date: "Sept 2024",
    },
    {
      title: "Geological Laboratory Assistant",
      issuer: "Geological Engineering Laboratory, ITERA",
      date: "Feb 2022",
    },
  ];

  return (
    <div className="w-full h-full bg-[#F5F1E9] rounded-[6px] p-5 sm:p-7 lg:p-10 flex flex-col justify-between relative shadow-2xl overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 w-9 h-9 sm:w-11 sm:h-11 border border-black/20 flex items-center justify-center hover:bg-black/5 active:scale-95 transition-all text-black font-mono text-xs sm:text-sm z-20 cursor-pointer"
        type="button"
      >
        ✕
      </button>

      <div className="shrink-0">
        <div className="font-mono text-[10px] sm:text-xs text-black/70 tracking-widest uppercase mb-1 select-text">
          [ CERTIFICATION &amp; TRAINING ]
        </div>
        <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-black uppercase leading-none select-text tracking-tight mb-2">
          CERTIFICATIONS
        </h1>
        <p className="text-[11px] sm:text-xs lg:text-sm font-medium text-black/70 max-w-[640px] leading-relaxed select-text">
          Certified competence across mining operations, software modeling, and
          foundational data science—proven through structured technical training.
        </p>
      </div>

      {/* Viewport-fitted table with compact rows and no scroll */}
      <div className="flex-1 flex flex-col justify-evenly my-2 sm:my-3 border-t border-b border-black/20 divide-y divide-black/10 overflow-hidden">
        {/* Table Header */}
        <div className="py-1 sm:py-1.5 grid grid-cols-12 gap-2 sm:gap-4 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-black/60 font-bold select-none">
          <div className="col-span-12 sm:col-span-6">CERTIFICATION &amp; TRAINING</div>
          <div className="col-span-8 sm:col-span-4">ISSUED BY</div>
          <div className="col-span-4 sm:col-span-2 text-right sm:text-left">DATE</div>
        </div>

        {/* Table Rows */}
        {certifications.map((item, idx) => (
          <div
            key={idx}
            className="py-1 sm:py-1.5 grid grid-cols-12 gap-2 sm:gap-4 items-center text-[11px] sm:text-xs text-black hover:bg-black/5 transition-colors px-1"
          >
            <div className="col-span-12 sm:col-span-6 font-bold text-[#111] truncate pr-2">
              {item.title}
            </div>
            <div className="col-span-8 sm:col-span-4 text-black/70 font-sans truncate">
              {item.issuer}
            </div>
            <div className="col-span-4 sm:col-span-2 font-mono text-[10px] sm:text-xs text-black/80 text-right sm:text-left font-semibold">
              {item.date}
            </div>
          </div>
        ))}
      </div>

      <div className="shrink-0 flex items-center justify-between text-[10px] font-mono text-black/50 pt-2 border-t border-black/10 select-none uppercase">
        <span>VERIFIED CREDENTIALS</span>
        <span>SCROLL DOWN FOR THE ROOTS ➔</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CHAPTER 09: THE ROOTS (CLIENTS)
// ─────────────────────────────────────────────────────────────
export function RootsPanel({ onClose }: PanelProps) {
  const roots = [
    {
      shortName: "ITERA",
      fullName: "INSTITUT TEKNOLOGI SUMATERA",
      department: "ACADEMIC INSTITUTION",
    },
    {
      shortName: "HMGL AVANINDRA",
      fullName: "GEOLOGICAL ENGINEERING",
      department: "STUDENT ASSOCIATION",
    },
    {
      shortName: "MGEI SC ITERA",
      fullName: "ECONOMIC GEOLOGY CHAPTER",
      department: "SOCIETY OF ECONOMIC GEOLOGISTS",
    },
  ];

  return (
    <div className="w-full h-full bg-[#F5F1E9] rounded-[6px] p-5 sm:p-7 lg:p-10 flex flex-col justify-between relative shadow-2xl overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 w-9 h-9 sm:w-11 sm:h-11 rounded-[3px] border border-black/20 hover:bg-black/5 text-black flex items-center justify-center font-mono text-xs sm:text-sm z-20 cursor-pointer"
        type="button"
      >
        ✕
      </button>

      <div className="shrink-0 max-w-[1100px] pr-12">
        <div className="font-mono text-[10px] sm:text-xs text-black/70 tracking-widest uppercase mb-1 select-text">
          [ THE ROOTS ]
        </div>
        <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-black uppercase leading-none select-text tracking-tight mb-2">
          SPACES OF GROWTH
        </h1>
        <p className="text-[11px] sm:text-xs lg:text-sm font-medium text-black/70 max-w-[640px] leading-relaxed select-text">
          Proudly representing the academic institution and geology organization
          that built my core competencies.
        </p>
      </div>

      <div className="my-auto py-2 sm:py-4 border-t border-b border-black/20 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-center">
          {roots.map((r, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-4 sm:p-6 border border-black/10 rounded-[4px] bg-[#EAE4D9]/60 hover:bg-[#EAE4D9] transition-all group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-black/20 flex items-center justify-center mb-2.5 font-mono text-xs sm:text-sm font-bold text-black bg-ivory">
                0{i + 1}
              </div>
              <span className="font-mono text-xs sm:text-sm font-bold text-black tracking-widest uppercase text-center">
                {r.shortName}
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-black/60 tracking-wider uppercase text-center mt-1">
                {r.fullName}
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] text-black/40 tracking-widest uppercase text-center mt-2 px-1.5 py-0.5 border border-black/10 rounded-xs">
                {r.department}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-between text-[10px] font-mono text-black/50 pt-2 border-t border-black/10 select-none uppercase">
        <span>AFFILIATIONS &amp; ROOTS</span>
        <span>SCROLL DOWN TO GET IN TOUCH ➔</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CHAPTER 10: LET'S TALK
// ─────────────────────────────────────────────────────────────
export function ContactPanel({ onClose }: PanelProps) {
  return (
    <div className="w-full h-full bg-[#F5F1E9] rounded-[6px] p-5 sm:p-7 lg:p-10 flex flex-col justify-between relative shadow-2xl overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 w-9 h-9 sm:w-11 sm:h-11 border border-black/20 flex items-center justify-center hover:bg-black/5 active:scale-95 transition-all text-black font-mono text-xs sm:text-sm z-20 cursor-pointer"
        type="button"
      >
        ✕
      </button>

      <div className="shrink-0">
        <h2 className="font-sans font-black text-3xl sm:text-5xl lg:text-[72px] text-black select-text leading-none uppercase">
          SAY NO MORE.
          <br />
          HIRE ME.
        </h2>
      </div>

      <div className="max-w-[640px] my-auto py-2 sm:py-4 space-y-4 sm:space-y-5">
        <div className="inline-flex items-center gap-2.5 bg-black/5 border border-black/10 px-3.5 py-1.5 rounded-full">
          <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-mono text-[10px] font-bold">
            PA
          </div>
          <span className="font-mono text-xs sm:text-sm font-bold text-black tracking-wider">
            +62 822 6710 8623
          </span>
        </div>

        <div>
          <div className="font-mono text-[10px] sm:text-xs text-black tracking-widest uppercase mb-1.5">
            [ GET IN TOUCH ]
          </div>
          <p className="text-base sm:text-xl lg:text-[22px] font-semibold text-black leading-snug select-text">
            So we both know it&apos;s a match. I am looking for a real team to
            join, real data to process, and real challenges to tackle. Point me
            to the problem.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-4 pt-1 sm:pt-2">
          <a
            className="px-5 sm:px-7 py-2.5 sm:py-3.5 bg-black hover:bg-neutral-800 text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold rounded-[3px] transition-all duration-150 inline-flex items-center gap-2 shadow-sm"
            href="mailto:prastyoarlan@gmail.com"
          >
            <span>SEND AN EMAIL ↗</span>
          </a>
          <a
            className="px-5 sm:px-7 py-2.5 sm:py-3.5 border border-black/30 hover:border-black hover:bg-black/5 text-black font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold rounded-[3px] transition-all duration-150 inline-flex items-center gap-2"
            href="/CV_Prastyo_Arlan.pdf"
            download
          >
            <span>DOWNLOAD CV ↗</span>
          </a>
        </div>
      </div>

      <div className="shrink-0 flex items-center justify-between text-[10px] font-mono text-black/50 pt-2 border-t border-black/10 select-none uppercase">
        <span>CALL TO ACTION</span>
        <span>FINAL SLIDE // DECK COMPLETE</span>
      </div>
    </div>
  );
}
