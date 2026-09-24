"use client";

import React from "react";

// --- Milestone Icons (Geological, Academic & Industry Archetypes) ---
function AcademicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#111213]">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function LeadershipIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#111213]">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#111213]">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function FieldworkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#111213]">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </svg>
  );
}

function ExplorationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#111213]">
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M17 18h1" />
      <path d="M12 18h1" />
      <path d="M7 18h1" />
    </svg>
  );
}

function LabIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#111213]">
      <path d="M6 18h8M3 22h18M14 22a7 7 0 1 0 0-14h-1M9 14h2M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  );
}

function ResearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#111213]">
      <path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
      <path d="M5.52 16h12.96" />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#111213]">
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}

function getMilestoneIcon(type: string) {
  switch (type) {
    case "academic":
      return <AcademicIcon />;
    case "leadership":
      return <LeadershipIcon />;
    case "community":
      return <CommunityIcon />;
    case "fieldwork":
      return <FieldworkIcon />;
    case "exploration":
      return <ExplorationIcon />;
    case "lab":
      return <LabIcon />;
    case "research":
      return <ResearchIcon />;
    case "graduation":
      return <GraduationIcon />;
    default:
      return <AcademicIcon />;
  }
}

// 8 Milestones Mapped into Heynesh Staggered Rhythm
export interface HeyneshMilestone {
  id: string;
  yearDisplay: string;
  title: string;
  narrative: string;
  handle: string;
  timeAgo: string;
  institutionInitials: string;
  iconType: string;
  fieldLogSlug: string;
  side: "left" | "right";
  topPx: number;
}

export const HEYNESH_MILESTONES: HeyneshMilestone[] = [
  {
    id: "m1",
    yearDisplay: "'19",
    title: "Starting out in Geological Engineering",
    narrative:
      "Commenced undergraduate engineering studies at Institut Teknologi Sumatera (ITERA). Built foundational mastery in physical geology, structural mapping, and mineral identification.",
    handle: "@itera.ac.id",
    timeAgo: "6 years ago",
    institutionInitials: "IT",
    iconType: "academic",
    fieldLogSlug: "geological-engineering",
    side: "right",
    topPx: 70,
  },
  {
    id: "m2",
    yearDisplay: "'21",
    title: "HMGL Avanindra Leadership Steps",
    narrative:
      "Elected into departmental student leadership at HMGL Avanindra ITERA. Coordinated regional geological excursions, field safety protocols, and student development across Sumatra.",
    handle: "@hmgl.itera",
    timeAgo: "5 years ago",
    institutionInitials: "HM",
    iconType: "leadership",
    fieldLogSlug: "geological-engineering",
    side: "left",
    topPx: 410,
  },
  {
    id: "m3",
    yearDisplay: "'22",
    title: "Economic Geology & Mineral Systems",
    narrative:
      "Active member of MGEI (Masyarakat Geologi Ekonomi Indonesia) Student Chapter ITERA. Deepened expertise in hydrothermal alteration, mineral deposit models, and industry networking.",
    handle: "@mgei.or.id",
    timeAgo: "4 years ago",
    institutionInitials: "MG",
    iconType: "community",
    fieldLogSlug: "geological-engineering",
    side: "left",
    topPx: 870,
  },
  {
    id: "m4",
    yearDisplay: "'22",
    title: "Geological Mapping & Field Survey",
    narrative:
      "Conducted independent field mapping across the South Sumatra Basin. Plotted strike-dip strikes, stratigraphic columns, lithology boundaries, and regional geological cross-sections.",
    handle: "@field.sumatra",
    timeAgo: "4 years ago",
    institutionInitials: "GS",
    iconType: "fieldwork",
    fieldLogSlug: "geological-engineering",
    side: "right",
    topPx: 1250,
  },
  {
    id: "m5",
    yearDisplay: "'22",
    title: "Subsurface Practice at Pertamina Hulu Rokan",
    narrative:
      "Intensive work practice at PT Pertamina Hulu Rokan Exploration Division. Analyzed well log data (porosity, saturation, resistivity), core samples, and microfossil preparation.",
    handle: "@pertamina.phr",
    timeAgo: "4 years ago",
    institutionInitials: "PH",
    iconType: "exploration",
    fieldLogSlug: "work-practice",
    side: "right",
    topPx: 1710,
  },
  {
    id: "m6",
    yearDisplay: "'23",
    title: "Laboratory Assistant — Petrography & Subsurface",
    narrative:
      "Appointed academic laboratory assistant at ITERA. Guided junior engineering cohorts through optical polarizing microscopy, thin-section petrography, and stratigraphic correlation.",
    handle: "@lab.geology",
    timeAgo: "3 years ago",
    institutionInitials: "LB",
    iconType: "lab",
    fieldLogSlug: "geological-engineering",
    side: "left",
    topPx: 2090,
  },
  {
    id: "m7",
    yearDisplay: "'23",
    title: "Undergraduate Thesis Research with Pertamina",
    narrative:
      "Conducted sequence stratigraphy and biostratigraphic zonation research based on exploration well log data in the Central Sumatra Basin in collaboration with PT Pertamina Hulu Rokan.",
    handle: "@thesis.phr",
    timeAgo: "3 years ago",
    institutionInitials: "TH",
    iconType: "research",
    fieldLogSlug: "undergraduate-researcher",
    side: "left",
    topPx: 2550,
  },
  {
    id: "m8",
    yearDisplay: "'25",
    title: "Graduation — Bachelor of Engineering (S.T.)",
    narrative:
      "Graduated with Bachelor of Geological Engineering (S.T.) degree with GPA 3.62 / 4.00 (Honors). Fully equipped and prepared for energy, mining, and subsurface exploration roles.",
    handle: "@arlan.geo",
    timeAgo: "Graduated",
    institutionInitials: "ST",
    iconType: "graduation",
    fieldLogSlug: "geological-engineering",
    side: "right",
    topPx: 2930,
  },
];

// Single Heynesh Timeline Card Component
function HeyneshTimelineCard({
  item,
  isAbsolute = true,
}: {
  item: HeyneshMilestone;
  isAbsolute?: boolean;
}) {
  const handleOpenFieldLog = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = `#field-log?job=${item.fieldLogSlug}`;
  };

  return (
    <article
      className={`group relative bg-[#EBE7DF] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 transition-all duration-300 border border-[#111213]/8 hover:border-[#111213]/25 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] ${
        isAbsolute
          ? `absolute w-full max-w-[480px] xl:max-w-[510px] z-20 ${
              item.side === "right" ? "right-0 lg:right-4 xl:right-6" : "left-0 lg:left-4 xl:left-6"
            }`
          : "relative w-full max-w-[540px] mx-auto"
      }`}
      style={isAbsolute ? { top: `${item.topPx}px` } : undefined}
      aria-label={`${item.title} (${item.yearDisplay})`}
    >
      {/* Side Accent Line (Left edge for left cards, right edge for right cards) */}
      {isAbsolute && (
        <div
          className={`hidden lg:block absolute top-10 w-[2px] h-[65%] bg-[#111213]/25 rounded-full pointer-events-none transition-colors group-hover:bg-[#111213]/50 ${
            item.side === "right" ? "-right-5 xl:-right-6" : "-left-5 xl:-left-6"
          }`}
          aria-hidden="true"
        />
      )}

      {/* Giant Year Numeral in Bright Highlighter Neon Yellow (Heynesh signature) */}
      <div className="font-sans font-black text-6xl sm:text-7xl xl:text-8xl text-[#F7FA4C] leading-none mb-3.5 select-none tracking-tighter drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]">
        {item.yearDisplay}
      </div>

      {/* Bold Headline */}
      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#111213] tracking-tight leading-snug mb-3 group-hover:text-black transition-colors">
        {item.title}
      </h3>

      {/* Editorial Narrative Paragraph */}
      <p className="text-sm sm:text-[14.5px] leading-relaxed text-[#111213]/70 font-normal mb-6">
        {item.narrative}
      </p>

      {/* Footbar: Overlapping Avatars/Badges on Left, Pill Button on Right */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#111213]/10">
        {/* Left: Overlapping Avatars + Handle & Time */}
        <div className="flex items-center">
          <div className="relative flex items-center shrink-0">
            {/* Front Avatar Badge */}
            <div className="w-10 h-10 rounded-full border-2 border-[#EBE7DF] bg-white shadow-xs flex items-center justify-center font-mono font-black text-xs text-[#111213] z-10">
              {item.institutionInitials}
            </div>
            {/* Overlapping Secondary Avatar Badge with Category Icon */}
            <div className="w-10 h-10 rounded-full border-2 border-[#EBE7DF] bg-[#DFDAD0] shadow-xs flex items-center justify-center -ml-3 text-[#111213]">
              {getMilestoneIcon(item.iconType)}
            </div>
          </div>

          {/* Institution Handle & Relative Time */}
          <div className="ml-3 flex flex-col justify-center">
            <span className="font-mono text-xs font-bold text-[#111213] leading-tight">
              {item.handle}
            </span>
            <span className="font-mono text-[11px] text-[#111213]/55 leading-tight">
              {item.timeAgo}
            </span>
          </div>
        </div>

        {/* Right: Pill Button "Read more" triggering FieldLogModal */}
        <button
          type="button"
          onClick={handleOpenFieldLog}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white/95 hover:bg-white text-[#111213] font-sans font-semibold text-xs sm:text-[13px] border border-[#111213]/12 hover:border-[#111213]/30 shadow-xs hover:shadow transition-all duration-200 cursor-pointer select-none active:scale-95 group/btn"
        >
          <span>Read more</span>
        </button>
      </div>
    </article>
  );
}

export default function AboutMeSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-[#D8382B] text-[#111213] selection:bg-[#111213] selection:text-[#F4F2ED] pt-10 pb-24 overflow-hidden"
    >
      {/* Top Metadata Header Line (Trigger Point for Sticky Pinning at 72px) */}
      <div className="w-full max-w-[1740px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 border-b border-[#111213]/15 pb-4 mb-8 flex items-center justify-between">
        <span className="font-pixel-grid text-[9px] sm:text-[10px] tracking-[0.24em] uppercase text-[#111213]/70 font-medium select-none">
          [ 01 // ABOUT ME & MY JOURNEY ]
        </span>
        <span className="font-pixel-grid text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#111213]/50 font-medium select-none hidden sm:inline-block">
          CHRONOLOGICAL EXPLORATION & FIELD TIMELINE (2019–2025)
        </span>
      </div>

      {/* Main Grid: Slim Pinned Sidebar on Left (~20%), Full-Scale Heynesh Stage on Right (~80%) */}
      <div className="w-full max-w-[1740px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-8 xl:gap-14 relative">
          
          {/* =========================================================================
              LEFT COLUMN: Slim Condensed Editorial Sidebar (Pinned at 72px on Desktop)
              ========================================================================= */}
          <aside
            data-sticky-about-left
            className="w-full lg:w-[280px] xl:w-[310px] shrink-0 flex flex-col items-start gap-5 pt-2 z-30 will-change-transform lg:sticky lg:top-[72px] lg:self-start"
          >
            {/* Profile Identity Pill */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#111213] text-[#F4F2ED] rounded-full font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#FFD904] animate-pulse" />
                <span>ARLAN®</span>
              </span>
              <span className="font-mono text-[11px] text-[#111213]/60 font-medium tracking-wide">
                Junior Geologist
              </span>
            </div>

            {/* Concise Bio */}
            <p className="text-xs sm:text-[13px] leading-relaxed text-[#111213]/80">
              Graduate of Geological Engineering from{" "}
              <strong className="text-[#111213]">Institut Teknologi Sumatera (ITERA)</strong>.
              Hands-on in subsurface interpretation, well log sequence stratigraphy, and field mapping gained through intensive exploration practice at{" "}
              <strong className="text-[#111213]">PT Pertamina Hulu Rokan</strong>.
            </p>

            {/* Stats Block (Heynesh inspired) */}
            <div className="w-full grid grid-cols-2 gap-2 pt-1">
              <div className="border border-[#111213]/12 rounded-2xl bg-[#EBE7DF]/80 p-3.5 flex flex-col justify-center">
                <span className="font-sans font-black text-2xl text-[#111213] leading-none">
                  3.62
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#111213]/60 font-bold mt-1">
                  GPA (Honors)
                </span>
              </div>
              <div className="border border-[#111213]/12 rounded-2xl bg-[#EBE7DF]/80 p-3.5 flex flex-col justify-center">
                <span className="font-sans font-black text-2xl text-[#111213] leading-none flex items-center">
                  6<span className="text-[#FFD904] text-xl font-bold">+</span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#111213]/60 font-bold mt-1">
                  Years Journey
                </span>
              </div>
            </div>

            {/* Degree Summary */}
            <div className="w-full border border-[#111213]/12 rounded-2xl bg-white/70 p-3.5 space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#111213]/50 font-bold block">
                [ DEGREE ]
              </span>
              <h4 className="font-display font-bold text-xs text-[#111213] leading-snug">
                B.Eng. Geological Engineering (S.T.)
              </h4>
              <p className="font-mono text-[10px] text-[#111213]/60">
                ITERA • 2019–2025
              </p>
            </div>

            {/* Core Software Chips */}
            <div className="w-full space-y-1.5 pt-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#111213]/50 font-bold block">
                [ TECHNICAL SOFTWARE ]
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["ArcGIS", "Minescape", "RockWorks", "Global Mapper"].map((soft) => (
                  <span
                    key={soft}
                    className="px-2 py-1 bg-white/80 border border-[#111213]/12 rounded-md font-mono text-[10px] font-bold text-[#111213]"
                  >
                    {soft}
                  </span>
                ))}
              </div>
            </div>

            {/* Affiliation Strip */}
            <div className="w-full pt-3 border-t border-[#111213]/12">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#111213]/50 font-bold block mb-1">
                [ AFFILIATIONS ]
              </span>
              <p className="font-mono text-[10px] font-semibold text-[#111213]/70 leading-relaxed">
                ITERA • HMGL • MGEI • PERTAMINA PHR • IAGI
              </p>
            </div>

            {/* Quick Action Button */}
            <a
              href="#field-log"
              className="w-full mt-1 px-4 py-2.5 rounded-full bg-[#FFD904] text-[#111213] font-sans font-bold text-xs text-center border border-[#111213]/15 shadow-xs hover:bg-[#ffe338] transition-all"
            >
              View Detailed Field Logs
            </a>
          </aside>

          {/* =========================================================================
              RIGHT COLUMN: Full-Scale Heynesh Timeline Stage (~75-80% Width)
              ========================================================================= */}
          <div
            data-about-right-track
            className="flex-1 min-w-0 w-full relative"
          >
            {/* Heynesh Timeline Header Block */}
            <div className="mb-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111213]/8 border border-[#111213]/10 font-mono text-[10.5px] font-bold text-[#111213] uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD904]" />
                <span>START SMALL GROW BIG</span>
              </div>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl xl:text-6xl text-[#111213] tracking-tight leading-[1.05] uppercase mb-3">
                About Me (&) <br />
                My Journey
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#111213]/70 font-normal">
                Six years ago I entered Geological Engineering at ITERA. What happened after that — through regional mapping, subsurface reservoir practice at Pertamina Hulu Rokan, and honors research — is easier to show than explain.
              </p>
            </div>

            {/* -----------------------------------------------------------------------
                DESKTOP PRESENTATION (lg and up): 2-Column Staggered Zig-Zag & Snake Curve
                ----------------------------------------------------------------------- */}
            <div className="hidden lg:block relative w-full h-[3500px]">
              
              {/* Continuous Dark Snake Spline with Yellow Circular Bead Nodes */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 1100 3450"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* Continuous Dark Ink Spine */}
                <path
                  d="
                    M 1040 120
                    C 1040 260, 550 240, 550 320
                    C 550 390, 60 360, 60 460
                    C 60 620, 30 760, 30 920
                    C 30 1080, 550 1120, 550 1200
                    C 550 1270, 1040 1230, 1040 1300
                    C 1040 1480, 1040 1620, 1040 1760
                    C 1040 1920, 550 1960, 550 2040
                    C 550 2110, 60 2060, 60 2140
                    C 60 2320, 30 2460, 30 2600
                    C 30 2760, 550 2820, 550 2900
                    C 550 2960, 1040 2920, 1040 2980
                  "
                  stroke="#111213"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Node 1: Start at '19 Card (Right) */}
                <circle cx="1040" cy="120" r="7" fill="#FFD904" stroke="#111213" strokeWidth="2.5" />
                <circle cx="1040" cy="120" r="2" fill="#111213" />

                {/* Node 2: Center crossover turn */}
                <circle cx="550" cy="320" r="6.5" fill="#FFD904" stroke="#111213" strokeWidth="2.5" />

                {/* Node 3: At '21 Card (Left) */}
                <circle cx="60" cy="460" r="7" fill="#FFD904" stroke="#111213" strokeWidth="2.5" />
                <circle cx="60" cy="460" r="2" fill="#111213" />

                {/* Node 4: At '22 MGEI Card (Left) */}
                <circle cx="30" cy="920" r="7" fill="#FFD904" stroke="#111213" strokeWidth="2.5" />
                <circle cx="30" cy="920" r="2" fill="#111213" />

                {/* Node 5: Center crossover to Right */}
                <circle cx="550" cy="1200" r="6.5" fill="#FFD904" stroke="#111213" strokeWidth="2.5" />

                {/* Node 6: At '22 Mapping Card (Right) */}
                <circle cx="1040" cy="1300" r="7" fill="#FFD904" stroke="#111213" strokeWidth="2.5" />
                <circle cx="1040" cy="1300" r="2" fill="#111213" />

                {/* Node 7: At '22 Pertamina Card (Right) */}
                <circle cx="1040" cy="1760" r="7" fill="#FFD904" stroke="#111213" strokeWidth="2.5" />
                <circle cx="1040" cy="1760" r="2" fill="#111213" />

                {/* Node 8: Center crossover to Left */}
                <circle cx="550" cy="2040" r="6.5" fill="#FFD904" stroke="#111213" strokeWidth="2.5" />

                {/* Node 9: At '23 Lab Assistant Card (Left) */}
                <circle cx="60" cy="2140" r="7" fill="#FFD904" stroke="#111213" strokeWidth="2.5" />
                <circle cx="60" cy="2140" r="2" fill="#111213" />

                {/* Node 10: At '23 Thesis Card (Left) */}
                <circle cx="30" cy="2600" r="7" fill="#FFD904" stroke="#111213" strokeWidth="2.5" />
                <circle cx="30" cy="2600" r="2" fill="#111213" />

                {/* Node 11: Center crossover to Right */}
                <circle cx="550" cy="2900" r="6.5" fill="#FFD904" stroke="#111213" strokeWidth="2.5" />

                {/* Node 12: At '25 Graduation Card (Right) */}
                <circle cx="1040" cy="2980" r="7" fill="#FFD904" stroke="#111213" strokeWidth="2.5" />
                <circle cx="1040" cy="2980" r="2" fill="#111213" />
              </svg>

              {/* 8 Spacious Milestone Cards Positioned in Staggered Alternation */}
              {HEYNESH_MILESTONES.map((item) => (
                <HeyneshTimelineCard key={item.id} item={item} isAbsolute={true} />
              ))}
            </div>

            {/* -----------------------------------------------------------------------
                MOBILE & TABLET PRESENTATION (< lg): Adaptive Connected Vertical Flow
                ----------------------------------------------------------------------- */}
            <div className="block lg:hidden relative w-full pt-4 pb-12">
              {/* Continuous vertical stem line with circular bead nodes */}
              <div
                className="absolute top-6 bottom-6 left-5 sm:left-6 w-0.5 bg-[#111213]/25 pointer-events-none"
                aria-hidden="true"
              />

              <div className="space-y-8 pl-10 sm:pl-12">
                {HEYNESH_MILESTONES.map((item) => (
                  <div key={`mobile-${item.id}`} className="relative">
                    {/* Glowing circular bead node sitting on left stem */}
                    <div className="absolute -left-[27px] sm:-left-[31px] top-8 -translate-y-1/2 z-20">
                      <div className="w-4 h-4 rounded-full border-2 border-[#111213] bg-[#FFD904] flex items-center justify-center shadow-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#111213]" />
                      </div>
                    </div>

                    {/* Responsive Full-Scale Heynesh Card */}
                    <HeyneshTimelineCard item={item} isAbsolute={false} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
