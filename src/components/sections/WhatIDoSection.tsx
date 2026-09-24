"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CapabilityItem {
  name: string;
  detail: string;
}

interface CapabilityColumn {
  id: string;
  index: string;
  label: string;
  tagline: string;
  items: CapabilityItem[];
  technologies: string[];
}

const CAPABILITY_COLUMNS: CapabilityColumn[] = [
  {
    id: "subsurface",
    index: "01",
    label: "Subsurface & Well Logs",
    tagline: "Basin evolution & reservoir characterization",
    items: [
      {
        name: "Well Log Interpretation",
        detail: "Gamma-ray, resistivity, density & neutron porosity for hydrocarbon zonation.",
      },
      {
        name: "Sequence Stratigraphy",
        detail: "T-R cycle modeling & systems tracts correlation (Embry, 1993).",
      },
      {
        name: "Biostratigraphic Zonation",
        detail: "Relative age dating with planktonic forams (Blow, 1969; Martini, 1971).",
      },
      {
        name: "Electrofacies Analysis",
        detail: "Depositional facies mapping from log signatures & sedimentary structures.",
      },
      {
        name: "Core & Cuttings Description",
        detail: "Lithology verification, grain sizing & microfossil sample preparation.",
      },
    ],
    technologies: ["Pertamina Hulu Rokan", "Blow (1969)", "Martini (1971)", "Embry (1993)"],
  },
  {
    id: "mine-planning",
    index: "02",
    label: "Mine Planning & 3D",
    tagline: "Computerized seam modeling & production flow",
    items: [
      {
        name: "Minescape Seam Modeling",
        detail: "Digital terrain models (DTM), stratigraphic grids & coal seam correlation.",
      },
      {
        name: "Spry Mine Scheduling",
        detail: "Short to long-term haulage scheduling & cycle-time fleet optimization.",
      },
      {
        name: "Pit & Disposal Geometry",
        detail: "Highwall bench parameters, safety berm design & waste dump capacities.",
      },
      {
        name: "Coal Resource Estimation",
        detail: "Tonnage calculation, seam thickness contouring & JORC reporting standards.",
      },
      {
        name: "Haul Road & Ramp Design",
        detail: "Grade percent optimization, superelevation & drainage ditch layout.",
      },
    ],
    technologies: ["Minescape", "Spry", "RockWorks", "DTM Grids", "JORC Code"],
  },
  {
    id: "geo-gis",
    index: "03",
    label: "Geomapping & Spatial Data",
    tagline: "Spatial intelligence & surface morphology",
    items: [
      {
        name: "ArcGIS Thematic Mapping",
        detail: "Lithology, structural strike/dip, morphometry & catchment delineation.",
      },
      {
        name: "DEM Terrain & LiDAR Analysis",
        detail: "Slope gradient, aspect, hillshading & geomorphological terrain breakdown.",
      },
      {
        name: "Global Mapper 3D Synthesis",
        detail: "Contour generation, 3D path profiling & multi-format GIS data conversion.",
      },
      {
        name: "Subsurface Spatial DB",
        detail: "Spatial database organization, attribute table georeferencing & coordinates.",
      },
      {
        name: "Field Structural Mapping",
        detail: "Fault plane measurement, joint rosette diagrams & fold axis projection.",
      },
    ],
    technologies: ["ArcGIS", "Global Mapper", "DEM / LiDAR", "Python GIS", "QGIS"],
  },
];

export default function WhatIDoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Initial states
      gsap.set(".what-ido-title", { y: 30, opacity: 0 });
      gsap.set(".what-ido-col", { y: 40, opacity: 0 });
      gsap.set(".what-ido-footer", { y: 20, opacity: 0 });

      // Intersection Observer for accurate physical viewport entry
      // (Because this section is wrapped in a translate3d container)
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target;

              if (target.classList.contains("what-ido-title")) {
                gsap.to(target, {
                  y: 0,
                  opacity: 1,
                  duration: 1.0,
                  ease: "expo.out",
                });
                observer.unobserve(target);
              }

              if (target.classList.contains("what-ido-cols-container")) {
                gsap.to(".what-ido-col", {
                  y: 0,
                  opacity: 1,
                  duration: 1.0,
                  stagger: 0.15,
                  ease: "expo.out",
                });
                observer.unobserve(target);
              }

              if (target.classList.contains("what-ido-footer")) {
                gsap.to(target, {
                  y: 0,
                  opacity: 1,
                  duration: 1.0,
                  ease: "expo.out",
                });
                observer.unobserve(target);
              }
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
      );

      // Attach observer
      const titleEl = document.querySelector(".what-ido-title");
      const colsEl = document.querySelector(".what-ido-cols-container");
      const footerEl = document.querySelector(".what-ido-footer");
      
      if (titleEl) observer.observe(titleEl);
      if (colsEl) observer.observe(colsEl);
      if (footerEl) observer.observe(footerEl);

      return () => observer.disconnect();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="what-i-do"
      className="relative w-full bg-section-accent text-accent-fg selection:bg-accent-fg selection:text-[#F4F2ED] pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24 px-3 sm:px-5 lg:px-6 xl:px-8"
    >
      <div className="w-full">
        {/* Top Metadata Line */}
        <div className="w-full flex items-center justify-between pb-6 md:pb-8 border-b border-accent-fg/15">
          <span className="font-pixel-grid text-[9px] sm:text-[9.5px] md:text-[10px] tracking-[0.24em] uppercase text-accent-muted select-none font-medium">
            [ 02 // WHAT I DO ]
          </span>
          <span className="font-pixel-grid text-[9px] sm:text-[9.5px] md:text-[10px] tracking-[0.2em] uppercase text-accent-fg/50 select-none hidden sm:inline-block">
            CAPABILITIES & ARSENAL
          </span>
        </div>

        {/* Massive Display Title (Clean & Direct) */}
        <div className="what-ido-title w-full pt-8 pb-10 sm:pb-12 border-b border-accent-fg/15 will-change-[transform,opacity]">
          <h2 className="font-display font-medium uppercase text-[clamp(44px,5.5vw,76px)] leading-none tracking-[-0.035em] text-accent-fg select-none">
            WHAT I DO.
          </h2>
        </div>

        {/* Swiss Editorial 3-Column Grid */}
        <div className="what-ido-cols-container grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 xl:gap-12 pt-10 sm:pt-12">
          {CAPABILITY_COLUMNS.map((pillar) => (
            <div key={pillar.id} className="what-ido-col flex flex-col justify-between will-change-[transform,opacity]">
              <div>
                {/* Column Header */}
                <div className="flex flex-col pb-4 border-b border-accent-fg/15 mb-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-mono text-xs tracking-[0.2em] text-accent-fg/50 font-semibold">
                      {pillar.index}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-accent-fg/40">
                      DISCIPLINE
                    </span>
                  </div>
                  <h3 className="font-display font-medium text-xl sm:text-[22px] tracking-[-0.02em] text-accent-fg leading-tight">
                    {pillar.label}
                  </h3>
                  <p className="font-mono text-[11px] text-accent-fg/60 tracking-tight mt-1.5 leading-relaxed">
                    {pillar.tagline}
                  </p>
                </div>

                {/* Capability Item List (Pure Editorial Text) */}
                <div className="flex flex-col space-y-5">
                  {pillar.items.map((item) => (
                    <div key={item.name} className="flex flex-col">
                      <h4 className="font-sans font-semibold text-[13.5px] sm:text-[14px] text-accent-fg tracking-tight leading-snug">
                        {item.name}
                      </h4>
                      <p className="font-sans text-[12px] sm:text-[12.5px] text-accent-fg/65 leading-relaxed mt-0.5">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Methodologies & Tools (Running Monospace Text) */}
              <div className="mt-8 pt-4 border-t border-accent-fg/10">
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent-fg/45 mb-1.5 font-semibold">
                  CORE METHODOLOGIES & TOOLS
                </div>
                <p className="font-mono text-[11px] text-accent-fg/70 leading-relaxed">
                  {pillar.technologies.join(" · ")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist Bottom Inquiry Line */}
        <div className="what-ido-footer w-full mt-16 sm:mt-20 pt-8 border-t border-accent-fg/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] sm:text-xs will-change-[transform,opacity]">
          <div className="flex items-center gap-2 text-accent-fg/60 tracking-wide">
            <span className="text-accent-fg/40 font-semibold">[ INQUIRY ]</span>
            <span>For exploration contracts, technical reporting, or mine planning engagement:</span>
          </div>
          <a
            href="https://wa.me/6282267108623"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(e) => gsap.to(e.currentTarget, { opacity: 0.7, duration: 0.2, ease: "power1.out" })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { opacity: 1, duration: 0.2, ease: "power1.out" })}
            className="text-accent-fg font-semibold tracking-wider underline underline-offset-4 decoration-accent-fg/30 hover:decoration-accent-fg inline-flex items-center gap-1.5"
          >
            <span>Contact via WhatsApp: +62 822-6710-8623</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
