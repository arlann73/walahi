"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CardData {
  title: string;
  subtitle?: string;
  bgClass: string;
  bgHex?: string;
  textHex?: string;
  accentColor?: string;
  type: "graphic" | "photo" | "quote" | "branding";
}

interface ProjectCase {
  id: string;
  title: string;
  year: string;
  categories: string[];
  tags: string[];
  actionText?: string;
  cards: CardData[];
}

const PROJECTS: ProjectCase[] = [
  {
    id: "arlan",
    title: "Arlan",
    year: "2026",
    categories: ["PORTFOLIO"],
    tags: ["BRANDING", "EXPERIENCE", "PORTFOLIO"],
    actionText: "( + )",
    cards: [
      {
        title: "JACK & AI",
        subtitle: "DORST & LESSER",
        bgClass: "bg-[#E63B2E] text-black",
        bgHex: "#E63B2E",
        textHex: "#000000",
        type: "graphic",
      },
      {
        title: "CAMPAIGN",
        subtitle: "FALL COLLECTION",
        bgClass: "bg-[#252828] text-[#F9F4EB]",
        bgHex: "#252828",
        textHex: "#F9F4EB",
        type: "photo",
      },
      {
        title: "WE SPOT SOCIAL TRENDS BEFORE THEY BREAK.",
        subtitle: "CASE",
        bgClass: "bg-[#111212] text-[#F9F4EB]",
        bgHex: "#111212",
        textHex: "#F9F4EB",
        accentColor: "#E63B2E",
        type: "quote",
      },
      {
        title: "INSIGHT AGENCY",
        subtitle: "IDENTITY",
        bgClass: "bg-[#1E2020] text-[#F9F4EB]",
        bgHex: "#1E2020",
        textHex: "#F9F4EB",
        type: "branding",
      },
    ],
  },
  {
    id: "geological-engineering",
    title: "Geological Engineering",
    year: "Class of 2025",
    categories: ["EDUCATION", "ORGANIZATION"],
    tags: ["EDUCATION"],
    actionText: "( + )",
    cards: [
      {
        title: "WELLNESS & MOTION",
        subtitle: "STUDIO SYSTEM",
        bgClass: "bg-[#2A2E2A] text-[#F9F4EB]",
        bgHex: "#2A2E2A",
        textHex: "#F9F4EB",
        type: "photo",
      },
      {
        title: "MOOV",
        subtitle: "ECO PACKAGING",
        bgClass: "bg-[#B88958] text-black",
        bgHex: "#B88958",
        textHex: "#000000",
        type: "branding",
      },
      {
        title: "INTELLIGENT RUNNING",
        subtitle: "DIGITAL PLATFORM",
        bgClass: "bg-[#1A2226] text-[#F9F4EB]",
        bgHex: "#1A2226",
        textHex: "#F9F4EB",
        type: "graphic",
      },
      {
        title: "MOVEMENT FOR ALL",
        subtitle: "MANIFESTO",
        bgClass: "bg-[#232727] text-[#F9F4EB]",
        bgHex: "#232727",
        textHex: "#F9F4EB",
        type: "quote",
      },
    ],
  },
  {
    id: "undergraduate-researcher",
    title: "Undergraduate Researcher",
    year: "2023",
    categories: ["EXPERIENCE", "ORGANIZATION"],
    tags: ["EXPERIENCE", "INTERNSHIP"],
    actionText: "( + )",
    cards: [
      {
        title: "SUSTAINABILITY",
        subtitle: "REPORT 2026",
        bgClass: "bg-[#243324] text-[#F9F4EB]",
        bgHex: "#243324",
        textHex: "#F9F4EB",
        type: "photo",
      },
      {
        title: "CIRCULAR DESIGN",
        subtitle: "STRATEGY",
        bgClass: "bg-[#141C14] text-[#9ACD32]",
        bgHex: "#141C14",
        textHex: "#9ACD32",
        type: "graphic",
      },
      {
        title: "ROOTED IN NATURE",
        subtitle: "ECO IDENTITY",
        bgClass: "bg-[#2E362C] text-[#F9F4EB]",
        bgHex: "#2E362C",
        textHex: "#F9F4EB",
        type: "branding",
      },
      {
        title: "FUTURE HABITAT",
        subtitle: "VISION",
        bgClass: "bg-[#1B221B] text-[#F9F4EB]",
        bgHex: "#1B221B",
        textHex: "#F9F4EB",
        type: "quote",
      },
    ],
  },
  {
    id: "work-practice",
    title: "Work Practice",
    year: "2022",
    categories: ["EXPERIENCE", "ORGANIZATION"],
    tags: ["EXPERIENCE", "INTERNSHIP"],
    actionText: "( + )",
    cards: [
      {
        title: "BIOTECH VISION",
        subtitle: "3D LAB",
        bgClass: "bg-[#091526] text-[#93C5FD]",
        bgHex: "#091526",
        textHex: "#93C5FD",
        type: "photo",
      },
      {
        title: "NEURONS.AI",
        subtitle: "ENTERPRISE",
        bgClass: "bg-[#0B1E38] text-[#60A5FA]",
        bgHex: "#0B1E38",
        textHex: "#60A5FA",
        type: "graphic",
      },
      {
        title: "DATA INTELLIGENCE",
        subtitle: "PLATFORM",
        bgClass: "bg-[#040A14] text-[#F9F4EB]",
        bgHex: "#040A14",
        textHex: "#F9F4EB",
        type: "branding",
      },
      {
        title: "AI TRANSFORMATION",
        subtitle: "RESEARCH",
        bgClass: "bg-[#071220] text-[#60A5FA]",
        bgHex: "#071220",
        textHex: "#60A5FA",
        type: "quote",
      },
    ],
  },
];

const BLOCK_1_DESKTOP = [
  "From subsurface data interpretation to",
  "field exploration, I turn geological complexity",
  "into actionable insights.",
];

const BLOCK_2_DESKTOP = [
  "Here’s a taste of the work I’ve loved doing",
  "and the real-world projects I’ve helped bring to life.",
];

export default function FeaturedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // 1. Initial States
      const isDesktop = window.innerWidth >= 1024;
      
      gsap.set(".desktop-line-1, .desktop-line-2, .mobile-line-1, .mobile-line-2", {
        y: 40,
        opacity: 0,
        filter: "blur(8px)",
      });
      
      gsap.set(".project-row", {
        y: 40,
        opacity: 0,
        filter: "blur(4px)",
      });
      
      gsap.set(".project-card", {
        y: 20,
        scale: 0.96,
        opacity: 0,
      });

      // 2. Intersection Observer for accurate physical viewport entry
      // (Because this section is wrapped in a translate3d container, ScrollTrigger 
      // cannot calculate natural offset. IntersectionObserver sees physical reality.)
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target;

              // HEADLINE REVEAL
              if (target === headlineRef.current) {
                const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
                const targets1 = isDesktop ? ".desktop-line-1" : ".mobile-line-1";
                const targets2 = isDesktop ? ".desktop-line-2" : ".mobile-line-2";
                
                tl.to(targets1, {
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  duration: 1.2,
                  stagger: isDesktop ? 0.08 : 0,
                }).to(
                  targets2,
                  {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1.2,
                    stagger: isDesktop ? 0.08 : 0,
                  },
                  "-=0.95"
                );
                observer.unobserve(target);
              }
              
              // PROJECT ROW REVEAL
              if (target.classList.contains("project-row")) {
                const cards = target.querySelectorAll(".project-card");
                const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
                
                tl.to(target, {
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  duration: 1.0,
                });
                
                if (cards.length > 0) {
                  tl.to(
                    cards,
                    {
                      y: 0,
                      opacity: 1,
                      scale: 1,
                      duration: 0.85,
                      stagger: 0.05,
                    },
                    "-=0.8"
                  );
                }
                observer.unobserve(target);
              }
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
      );

      // Attach observer to headline
      if (headlineRef.current) {
        observer.observe(headlineRef.current);
      }

      // Attach observer to all rows
      rowsRef.current.forEach((row) => {
        if (row) observer.observe(row);
      });

      return () => observer.disconnect();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full bg-section-accent text-accent-fg min-h-screen pt-20 pb-16 px-0 selection:bg-accent-fg selection:text-[#F4F2ED] z-20"
    >
      <div className="w-full">
        {/* Top Header Block: Metadata Row + 2-Block Editorial Headline */}
        <div className="w-full border-b border-accent-fg/15 pb-12 md:pb-16 px-3 sm:px-5 lg:px-6 xl:px-8">
          {/* Top Metadata Line */}
          <div className="w-full flex items-center justify-between pb-6 md:pb-8">
            <span className="font-pixel-grid text-[9px] sm:text-[9.5px] md:text-[10px] tracking-[0.24em] uppercase text-accent-muted select-none font-medium">
              [ FEATURED WORK ]
            </span>
            <span className="font-pixel-grid text-[9px] sm:text-[9.5px] md:text-[10px] tracking-[0.2em] uppercase text-accent-fg/50 select-none hidden sm:inline-block">
              SELECTED CASES / 2022–2026
            </span>
          </div>

          {/* Main Statement Heading Container */}
          <div className="w-full max-w-[1240px]">
            <h2
              ref={headlineRef}
              aria-label="From subsurface data interpretation to field exploration, I turn geological complexity into actionable insights. Here’s a taste of the work I’ve loved doing and the real-world projects I’ve helped bring to life."
              className="font-display font-medium text-accent-fg text-left"
            >
              {/* DESKTOP PRESENTATION (lg and up): 5 Intentional Lines across 2 Blocks */}
              <div
                className="hidden lg:block text-[clamp(44px,4vw,64px)] leading-[1.05] tracking-[-0.035em]"
                aria-hidden="true"
              >
                {/* Block 1: Positioning Statement (3 lines) */}
                <div className="flex flex-col">
                  {BLOCK_1_DESKTOP.map((line, idx) => (
                    <span key={idx} className="block">
                      <span className="desktop-line-1 block will-change-[transform,opacity,filter]">
                        {line}
                      </span>
                    </span>
                  ))}
                </div>

                {/* Intentional breathing room between positioning and invitation */}
                <div className="h-[clamp(24px,2.5vw,48px)]" />

                {/* Block 2: Invitation / Transition (2 lines) */}
                <div className="flex flex-col">
                  {BLOCK_2_DESKTOP.map((line, idx) => (
                    <span key={idx} className="block">
                      <span className="desktop-line-2 block will-change-[transform,opacity,filter]">
                        {line}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* MOBILE / TABLET PRESENTATION (< lg): Natural Fluid Semantic Wrapping */}
              <div
                className="block lg:hidden text-[clamp(30px,7vw,44px)] leading-[1.08] tracking-[-0.025em]"
                aria-hidden="true"
              >
                {/* Block 1: Positioning */}
                <div className="block">
                  <span className="mobile-line-1 block will-change-[transform,opacity,filter]">
                    From subsurface data interpretation to field exploration, I turn geological complexity into actionable insights.
                  </span>
                </div>

                {/* Intentional breathing room */}
                <div className="h-[clamp(20px,4vw,28px)]" />

                {/* Block 2: Invitation */}
                <div className="block">
                  <span className="mobile-line-2 block will-change-[transform,opacity,filter]">
                    Here’s a taste of the work I’ve loved doing and the real-world projects I’ve helped bring to life.
                  </span>
                </div>
              </div>
            </h2>
          </div>
        </div>

        {/* Project Rows List (Title hugging left edge, Cards hugging right edge) */}
        <div className="w-full flex flex-col">
          {PROJECTS.map((project, index) => {
            return (
              <div
                key={project.id}
                ref={(el) => { rowsRef.current[index] = el; }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { backgroundColor: "rgba(17, 18, 19, 0.02)", duration: 0.25, ease: "power1.out" })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { backgroundColor: "transparent", duration: 0.25, ease: "power1.out" })}
                className="project-row w-full border-b border-accent-fg/15 py-5 lg:py-6 px-3 sm:px-5 lg:px-6 xl:px-8 will-change-[transform,opacity,filter]"
              >
                {/* Main Row Content: 120px height on desktop, matching lamalama (total row = 24 + 120 + 24 + 1 = 169px) */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 lg:gap-8 lg:h-[120px]">
                  {/* Left Group: Title, Tags, Year, Action Button top-aligned */}
                  <div className="flex flex-wrap lg:flex-nowrap items-center lg:items-start gap-3 sm:gap-4 lg:gap-5 shrink-0 lg:h-[120px]">
                    {/* Left Column 1: Title */}
                    <div className="lg:w-[190px] xl:w-[220px] shrink-0 pr-2">
                      <h3 className="font-display font-medium text-lg sm:text-xl lg:text-[20px] xl:text-[22px] tracking-[-0.02em] text-accent-fg leading-[1.08] select-none whitespace-pre-line">
                        {project.title}
                      </h3>
                    </div>

                    {/* Left Column 2: Tag Pills (h-[19px], matching requested 19px height) */}
                    <div className="flex items-center gap-1 flex-nowrap lg:w-[190px] xl:w-[215px] shrink-0">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[8px] sm:text-[8.5px] tracking-[0.14em] uppercase h-[19px] px-1.5 flex items-center justify-center rounded-micro bg-accent-fg text-chalk font-semibold whitespace-nowrap select-none leading-none"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Left Column 3: Year Column (Takes previous position of (+)) */}
                    <div className="h-[19px] lg:w-[115px] xl:w-[130px] shrink-0 flex items-center">
                      <span className="font-mono text-[9px] sm:text-[9.5px] md:text-[10px] tracking-[0.16em] uppercase text-accent-fg/60 font-semibold select-none whitespace-nowrap">
                        {project.year}
                      </span>
                    </div>

                    {/* Left Column 4: Action Button (Shifted further right, acting as bridge to cards gallery) */}
                    <div className="h-[19px] lg:w-[85px] xl:w-[95px] shrink-0 flex items-center ml-auto lg:ml-2">
                      <button
                        onClick={() => {
                          window.location.hash = `field-log?job=${project.id}`;
                        }}
                        onMouseEnter={(e) => gsap.to(e.currentTarget, { opacity: 0.75, duration: 0.2, ease: "power1.out" })}
                        onMouseLeave={(e) => gsap.to(e.currentTarget, { opacity: 1, duration: 0.2, ease: "power1.out" })}
                        className="group/btn font-mono text-xs sm:text-[11px] tracking-wider text-accent-fg cursor-pointer font-bold select-none whitespace-nowrap h-[19px] min-h-[19px] max-h-[19px] leading-[19px] inline-flex items-center"
                        aria-label={`View ${project.title.replace("\n", " ")} field log details`}
                      >
                        <span className="inline-flex items-center h-[19px] leading-[19px] group-hover/btn:hidden">( + )</span>
                        <span className="hidden group-hover/btn:inline-flex items-center h-[19px] leading-[19px]">( VIEW + )</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Cards Gallery (Height 120px, 96px/176px widths, matching lamalama) */}
                  <div
                    className="flex items-center gap-2 overflow-x-auto no-scrollbar justify-end ml-auto -mx-3 px-3 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden shrink-0 lg:h-[120px]"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    {project.cards.map((card, idx) => {
                      const isWide =
                        card.type === "graphic" ||
                        (project.id === "geological-engineering" && card.title === "MOOV");
                      const cardWidthClass = isWide ? "w-[176px]" : "w-[96px]";

                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            window.location.hash = `field-log?job=${project.id}`;
                          }}
                          onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.03, duration: 0.25, ease: "power2.out" })}
                          onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1.0, duration: 0.25, ease: "power2.out" })}
                          style={{
                            backgroundColor: card.bgHex,
                            color: card.textHex,
                          }}
                          className={`project-card shrink-0 ${cardWidthClass} h-[120px] rounded-sm p-2 flex flex-col justify-between shadow-sm overflow-hidden select-none cursor-pointer will-change-transform ${card.bgClass}`}
                        >
                          {/* Card Top Header */}
                          <div className="flex justify-between items-start">
                            <span className="font-mono text-[6.5px] sm:text-[7px] tracking-[0.2em] uppercase opacity-75 truncate max-w-[65px]">
                              {card.subtitle || "CASE"}
                            </span>
                            <span className="font-mono text-[6.5px] sm:text-[7px] opacity-60">
                              0{idx + 1}
                            </span>
                          </div>

                          {/* Card Center Content */}
                          <div className="my-auto">
                            {card.type === "quote" ? (
                              <p
                                className="font-display font-black text-[9px] uppercase tracking-tight leading-[1.1] line-clamp-3"
                                style={{ color: card.accentColor || "inherit" }}
                              >
                                {card.title}
                              </p>
                            ) : card.type === "graphic" ? (
                              <div>
                                <p className="font-display font-black text-[11px] sm:text-xs uppercase tracking-tighter leading-none">
                                  {card.title}
                                </p>
                                <div className="w-4 h-[1.5px] bg-current mt-1 opacity-50" />
                              </div>
                            ) : (
                              <div>
                                <div className="w-full aspect-[16/10] rounded-[1.5px] bg-black/20 mb-1 flex items-center justify-center">
                                  <span className="font-mono text-[6.5px] uppercase tracking-widest opacity-45">
                                    PREVIEW
                                  </span>
                                </div>
                                <p className="font-display font-bold text-[8.5px] uppercase tracking-tight leading-tight line-clamp-1">
                                  {card.title}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Card Bottom Meta */}
                          <div className="pt-1 border-t border-current/15 flex items-center justify-between font-mono text-[6.5px] uppercase tracking-widest opacity-70">
                            <span>VIEW DETAILS</span>
                            <span>+</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
