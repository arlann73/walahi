"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CardData {
  title: string;
  subtitle?: string;
  bgClass?: string;
  bgHex?: string;
  textHex?: string;
  accentColor?: string;
  type: "graphic" | "photo" | "quote" | "branding" | "pure-photo";
  imageUrl?: string;
  imageAlt?: string;
  isWide?: boolean;
  photoIndex?: number;
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
    id: "fesco",
    title: "Fesco",
    year: "2025",
    categories: ["BRANDING", "DESIGN"],
    tags: ["BRANDING", "DESIGN"],
    actionText: "( + )",
    cards: [
      {
        title: "Fesco Fluid Brandmark Logotype",
        subtitle: "BRAND IDENTITY",
        type: "pure-photo",
        imageUrl: "/projects/fesco-01-logotype.png",
        imageAlt: "Fesco bold red fluid brandmark logotype on cream background",
        isWide: true,
        photoIndex: 0,
      },
      {
        title: "Pastry Campaign & Packaging Palette",
        subtitle: "PACKAGING",
        type: "pure-photo",
        imageUrl: "/projects/fesco-02-pastry-treat.png",
        imageAlt: "Fesco chocolate chip almond pastry treat on warm brown background",
        isWide: true,
        photoIndex: 1,
      },
      {
        title: "Fudgy Brownie Product Reveal",
        subtitle: "CREATIVE SUITE",
        type: "pure-photo",
        imageUrl: "/projects/fesco-03-brownie-special.png",
        imageAlt: "Fesco almond brownie with dynamic typography on red background",
        isWide: true,
        photoIndex: 2,
      },
      {
        title: "Duo Confectionery Split-Wave Showcase",
        subtitle: "CAMPAIGN",
        type: "pure-photo",
        imageUrl: "/projects/fesco-04-product-showcase.png",
        imageAlt: "Fesco duo product showcase with wavy red and cream color split",
        isWide: true,
        photoIndex: 3,
      },
    ],
  },
  {
    id: "arlan",
    title: "Arlan",
    year: "2026",
    categories: ["PORTFOLIO"],
    tags: ["BRANDING", "EXPERIENCE", "PORTFOLIO"],
    actionText: "( + )",
    cards: [
      {
        title: "Hero 3D Stage & Kinetic Typography",
        subtitle: "3D HERO",
        type: "pure-photo",
        imageUrl: "/projects/arlan-01-hero-3d.jpg",
        imageAlt: "Hero 3D canvas with character, kinetic grid, and bold typography",
        isWide: true,
        photoIndex: 0,
      },
      {
        title: "Optical Matrix ASCII Text Shader",
        subtitle: "ASCII SHADER",
        type: "pure-photo",
        imageUrl: "/projects/arlan-02-ascii-shader.jpg",
        imageAlt: "Optical matrix ASCII text shader portrait interface",
        isWide: true,
        photoIndex: 1,
      },
      {
        title: "Torn-Paper Dither Editorial Suite",
        subtitle: "EDITORIAL UI",
        type: "pure-photo",
        imageUrl: "/projects/arlan-03-subsurface-architecture.jpg",
        imageAlt: "Torn-paper dither contour mask and digital subsurface section",
        isWide: true,
        photoIndex: 2,
      },
      {
        title: "Technical Field Log Dossier Modal",
        subtitle: "FIELD LOG MODAL",
        type: "pure-photo",
        imageUrl: "/projects/arlan-04-field-log-dossier.jpg",
        imageAlt: "Field log technical archive modal with 3D geological wireframe",
        isWide: true,
        photoIndex: 3,
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
        title: "Regional Geological Mapping & Outcrop Analysis",
        subtitle: "FIELD MAPPING",
        type: "pure-photo",
        imageUrl: "/projects/geological-engineering-01-riverbed-mapping.jpg",
        imageAlt: "Arlan conducting geological outcrop observation in Sumatra riverbed",
        isWide: false,
        photoIndex: 0,
      },
      {
        title: "Sumatra Rainforest Field Excursion",
        subtitle: "EXCURSION",
        type: "pure-photo",
        imageUrl: "/projects/geological-engineering-02-rapids-fieldwork.jpg",
        imageAlt: "Arlan in yellow ITERA field vest standing on rocky river rapids",
        isWide: false,
        photoIndex: 1,
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
        title: "Biostratigraphic Laboratory Research",
        subtitle: "LAB RESEARCH",
        type: "pure-photo",
        imageUrl: "/projects/undergraduate-01-microscope.jpg",
        imageAlt: "Biostratigraphic laboratory inspection with binocular microscope",
        isWide: false,
        photoIndex: 0,
      },
      {
        title: "PT Pertamina Hulu Rokan Base",
        subtitle: "RUMBAI BASE",
        type: "pure-photo",
        imageUrl: "/projects/undergraduate-02-landmark.jpg",
        imageAlt: "Prastyo Arlan at PT Pertamina Hulu Rokan Rumbai",
        isWide: false,
        photoIndex: 1,
      },
      {
        title: "Subsurface Core Repository Team",
        subtitle: "SUBSURFACE CORE",
        type: "pure-photo",
        imageUrl: "/projects/undergraduate-03-core-team.jpg",
        imageAlt: "Geological research team at subsurface core repository",
        isWide: true,
        photoIndex: 2,
      },
      {
        title: "Core Warehouse & Stratigraphic Inspection",
        subtitle: "RESERVOIR LOGGING",
        type: "pure-photo",
        imageUrl: "/projects/undergraduate-04-core-facility.jpg",
        imageAlt: "Core warehouse inspection with technical specialists",
        isWide: false,
        photoIndex: 3,
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
        title: "Core Logging & Reservoir Evaluation",
        subtitle: "CORE ANALYSIS",
        type: "pure-photo",
        imageUrl: "/projects/work-practice-01-core-logging.jpg",
        imageAlt: "Macroscopic core description and logging on core table",
        isWide: false,
        photoIndex: 0,
      },
      {
        title: "PT Pertamina Hulu Rokan Headquarters",
        subtitle: "EXPLORATION",
        type: "pure-photo",
        imageUrl: "/projects/work-practice-02-pertamina-lobby.jpg",
        imageAlt: "Prastyo Arlan at PT Pertamina Hulu Rokan and SKK Migas lobby",
        isWide: false,
        photoIndex: 1,
      },
    ],
  },
];

export default function FeaturedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("all", () => {
        // 1. Initial States (Option B starting position)
        gsap.set(".work-headline-block", {
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

        const playHeadline = () => {
          gsap.to(".work-headline-block", {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.0,
            stagger: 0.14,
            ease: "expo.out",
            overwrite: "auto",
            clearProps: "filter",
          });
        };

        const resetHeadline = () => {
          gsap.to(".work-headline-block", {
            y: 40,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.35,
            ease: "power2.in",
            overwrite: "auto",
          });
        };

        const playRow = (target: HTMLElement) => {
          const cards = target.querySelectorAll(".project-card");
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

          tl.to(target, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            overwrite: "auto",
          });

          if (cards.length > 0) {
            tl.to(
              cards,
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.75,
                stagger: 0.04,
                overwrite: "auto",
              },
              "-=0.75"
            );
          }
        };

        const resetRow = (target: HTMLElement) => {
          const cards = target.querySelectorAll(".project-card");
          gsap.to(target, {
            y: 40,
            opacity: 0,
            filter: "blur(4px)",
            duration: 0.35,
            ease: "power2.in",
            overwrite: "auto",
          });
          if (cards.length > 0) {
            gsap.to(cards, {
              y: 20,
              scale: 0.96,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
              overwrite: "auto",
            });
          }
        };

        // 2. Option B State Machine (toggleActions: "play none none reset")
        // - onEnter (entering from bottom): PLAY
        // - onLeave (scrolling down past it): NONE (stays visible)
        // - onEnterBack (scrolling up into it): NONE (stays visible, no flicker/reset while reading)
        // - onLeaveBack (scrolling all the way up above it): RESET (resets to y:40 so it can replay)
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const target = entry.target as HTMLElement;
              const isEntering = entry.isIntersecting;
              const isAbove = entry.boundingClientRect.top > 0;

              if (isEntering && isAbove) {
                // onEnter: PLAY
                if (target === headlineRef.current) {
                  playHeadline();
                } else if (target.classList.contains("project-row")) {
                  playRow(target);
                }
              } else if (!isEntering && isAbove) {
                // onLeaveBack: RESET
                if (target === headlineRef.current) {
                  resetHeadline();
                } else if (target.classList.contains("project-row")) {
                  resetRow(target);
                }
              }
            });
          },
          { rootMargin: "0px 0px -10% 0px", threshold: 0.02 }
        );

        if (headlineRef.current) observer.observe(headlineRef.current);
        rowsRef.current.forEach((row) => {
          if (row) observer.observe(row);
        });

        return () => observer.disconnect();
      });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full bg-transparent text-white min-h-screen pt-20 pb-16 px-0 selection:bg-white selection:text-black z-20"
    >
      <div className="w-full">
        {/* Top Header Block: Metadata Row + 2-Block Editorial Headline */}
        <div className="w-full border-b border-white/15 pb-12 md:pb-16 px-3 sm:px-5 lg:px-6 xl:px-8">
          {/* Top Metadata Line */}
          <div className="w-full flex items-center justify-between pb-6 md:pb-8">
            <span className="font-pixel-grid text-mono-label tracking-mono-bracket text-white/50 select-none">
              [ FEATURED WORK ]
            </span>
            <span className="font-mono text-mono-label tracking-mono-meta text-white/50 select-none hidden sm:inline-block">
              SELECTED CASES / 2022–2026
            </span>
          </div>

          {/* Main Statement Heading Container */}
          <div className="w-full max-w-[1180px]">
            <h2
              ref={headlineRef}
              className="text-[#F9F4EB] text-left text-h2 leading-[1.15]"
            >
              <span className="work-headline-block block text-balance">
                geology taught me to make sense of complexity.
              </span>
              <span className="work-headline-block block text-balance">
                here&apos;s some of the experiences and work i&apos;m proud of.
              </span>
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
                className="project-row w-full border-b border-white/15 py-5 lg:py-6 px-3 sm:px-5 lg:px-6 xl:px-8"
              >
                {/* Main Row Content: 120px height on desktop, matching lamalama (total row = 24 + 120 + 24 + 1 = 169px) */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 lg:gap-8 lg:h-[120px]">
                  {/* Left Group: Title, Tags, Year, Action Button top-aligned */}
                  <div className="flex flex-wrap lg:flex-nowrap items-center lg:items-start gap-3 sm:gap-4 lg:gap-5 shrink-0 lg:h-[120px]">
                    {/* Left Column 1: Title */}
                    <div className="lg:w-[190px] xl:w-[220px] shrink-0 pr-2">
                      <h3 className="font-display font-medium text-lg sm:text-xl lg:text-[20px] xl:text-[22px] tracking-[-0.02em] text-white leading-[1.08] select-none whitespace-pre-line">
                        {project.title}
                      </h3>
                    </div>

                    {/* Left Column 2: Tag Pills (h-[19px], matching requested 19px height) */}
                    <div className="flex items-center gap-1 flex-nowrap lg:w-[190px] xl:w-[215px] shrink-0">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[8px] sm:text-[8.5px] tracking-[0.14em] uppercase h-[19px] px-1.5 flex items-center justify-center rounded-micro bg-white text-black font-semibold whitespace-nowrap select-none leading-none"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Left Column 3: Year Column (Takes previous position of (+)) */}
                    <div className="h-[19px] lg:w-[115px] xl:w-[130px] shrink-0 flex items-center">
                      <span className="font-mono text-[9px] sm:text-[9.5px] md:text-[10px] tracking-[0.16em] uppercase text-white/60 font-semibold select-none whitespace-nowrap">
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
                        className="group/btn font-mono text-xs sm:text-[11px] tracking-wider text-white cursor-pointer font-bold select-none whitespace-nowrap h-[19px] min-h-[19px] max-h-[19px] leading-[19px] inline-flex items-center"
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
                        card.isWide ??
                        (card.type === "graphic" ||
                          (project.id === "geological-engineering" && card.title === "MOOV"));
                      const cardWidthClass = isWide ? "w-[176px]" : "w-[96px]";

                      if (card.type === "pure-photo" && card.imageUrl) {
                        return (
                          <button
                            key={idx}
                            type="button"
                            aria-label={`View documentation: ${card.title} (${project.title})`}
                            onClick={() => {
                              window.location.hash = `field-log?job=${project.id}&photo=${card.photoIndex ?? idx}`;
                            }}
                            onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.03, duration: 0.25, ease: "power2.out" })}
                            onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1.0, duration: 0.25, ease: "power2.out" })}
                            className={`project-card shrink-0 ${cardWidthClass} h-[120px] rounded-sm relative overflow-hidden select-none cursor-pointer will-change-transform outline-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 border border-white/15 bg-surface group/photo`}
                          >
                            <Image
                              src={card.imageUrl}
                              alt={card.imageAlt || card.title}
                              fill
                              sizes={isWide ? "176px" : "96px"}
                              className="object-cover object-center transition-transform duration-500 ease-out group-hover/photo:scale-105"
                            />
                            {/* Pure photo tile - No text overlays, subtle hairline rim */}
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-sm transition-opacity duration-300 group-hover/photo:ring-white/30" />
                          </button>
                        );
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          aria-label={`Open case: ${card.title} (${project.title})`}
                          onClick={() => {
                            window.location.hash = `field-log?job=${project.id}`;
                          }}
                          onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.03, duration: 0.25, ease: "power2.out" })}
                          onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1.0, duration: 0.25, ease: "power2.out" })}
                          style={{
                            backgroundColor: card.bgHex,
                            color: card.textHex,
                          }}
                          className={`project-card shrink-0 ${cardWidthClass} h-[120px] rounded-sm p-2 flex flex-col justify-between text-left shadow-sm overflow-hidden select-none cursor-pointer will-change-transform outline-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${card.bgClass ?? ""}`}
                        >
                          {/* Inner Decorative Mockup Content - Screen Reader Hidden */}
                          <div aria-hidden="true" className="w-full h-full flex flex-col justify-between pointer-events-none">
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
                        </button>
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

