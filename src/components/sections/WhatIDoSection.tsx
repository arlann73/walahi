"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Vintage Map Torn Paper Procedural SVG Masks (800x120 grand undulating contour with organic fiber tears)
const TOP_TEAR_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 120'%3E%3Cpath d='M 0,120 L 0,55 L 15,62 L 30,52 L 45,40 L 60,46 L 75,32 L 90,24 L 105,30 L 120,18 L 135,27 L 150,21 L 165,34 L 180,44 L 195,38 L 215,52 L 235,62 L 255,54 L 275,68 L 295,78 L 315,70 L 335,84 L 355,76 L 375,92 L 395,85 L 415,102 L 435,94 L 455,98 L 475,82 L 495,88 L 515,72 L 535,64 L 555,70 L 575,56 L 595,44 L 615,50 L 635,36 L 655,42 L 675,26 L 695,34 L 715,46 L 735,40 L 755,54 L 775,48 L 790,60 L 800,55 L 800,120 Z' fill='%23000000'/%3E%3C/svg%3E";

const BOTTOM_TEAR_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 120'%3E%3Cpath d='M 0,0 L 0,65 L 18,58 L 35,70 L 55,78 L 75,70 L 95,84 L 115,75 L 135,92 L 155,84 L 175,100 L 195,92 L 215,96 L 235,82 L 255,88 L 275,74 L 295,64 L 315,70 L 335,56 L 355,44 L 375,50 L 395,34 L 415,40 L 435,22 L 455,30 L 475,44 L 495,36 L 515,24 L 535,32 L 555,26 L 575,40 L 595,50 L 615,42 L 635,58 L 655,68 L 675,60 L 695,76 L 715,86 L 735,78 L 755,70 L 775,76 L 790,60 L 800,65 L 800,0 Z' fill='%23000000'/%3E%3C/svg%3E";

const TORN_DITHER_STYLE: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(rgba(255, 255, 255, 0.13) 1px, transparent 1px), radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
  backgroundSize: "8px 8px, 16px 16px",
  backgroundPosition: "0 0, 4px 4px",
  WebkitMaskImage: `url("${TOP_TEAR_SVG}"), linear-gradient(to bottom, #000, #000), url("${BOTTOM_TEAR_SVG}")`,
  WebkitMaskPosition: "top left, 0 118px, bottom left",
  WebkitMaskSize: "800px 120px, 100% calc(100% - 236px), 800px 120px",
  WebkitMaskRepeat: "repeat-x, no-repeat, repeat-x",
  maskImage: `url("${TOP_TEAR_SVG}"), linear-gradient(to bottom, #000, #000), url("${BOTTOM_TEAR_SVG}")`,
  maskPosition: "top left, 0 118px, bottom left",
  maskSize: "800px 120px, 100% calc(100% - 236px), 800px 120px",
  maskRepeat: "repeat-x, no-repeat, repeat-x",
};

export default function WhatIDoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Initial states for fade-in elements
      gsap.set(".what-ido-fade", { y: 30, opacity: 0 });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(".what-ido-fade", {
                y: 0,
                opacity: 1,
                duration: 1.0,
                stagger: 0.1,
                ease: "expo.out",
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
      );

      if (sectionRef.current) observer.observe(sectionRef.current);

      // Ambient Background Parallax: smooth vertical float on Sumatra SVG watermark
      const trackEl = document.getElementById("hero-track");
      let st: ScrollTrigger | null = null;
      let handleResize: (() => void) | null = null;

      if (trackEl && watermarkRef.current) {
        const updateParallax = () => {
          if (!sectionRef.current || !watermarkRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const windowH = window.innerHeight;

          // Track parallax while section is within or approaching viewport
          if (rect.bottom > -200 && rect.top < windowH + 200) {
            const totalTravel = windowH + rect.height;
            const currentDist = windowH - rect.top;
            const progress = Math.max(0, Math.min(1, currentDist / totalTravel));

            // Ambient vertical float: moves smoothly from -60px to +60px relative to center
            const targetY = (progress - 0.5) * 120;

            gsap.to(watermarkRef.current, {
              y: targetY,
              duration: 0.25,
              ease: "power1.out",
              overwrite: "auto",
            });
          }
        };

        st = ScrollTrigger.create({
          trigger: trackEl,
          start: "top top",
          end: "bottom bottom",
          onUpdate: updateParallax,
        });

        handleResize = updateParallax;
        window.addEventListener("resize", handleResize);
        updateParallax();
      }

      return () => {
        observer.disconnect();
        if (handleResize) window.removeEventListener("resize", handleResize);
        if (st) st.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="what-i-do"
      className="relative w-full bg-transparent text-white antialiased pb-32 sm:pb-40 pt-36 sm:pt-48 md:pt-56 lg:pt-64 px-4 sm:px-10 lg:px-16 selection:bg-white selection:text-black overflow-hidden"
    >
      {/* Torn-Paper Dither Dot Pattern Field (Jagged organic micro-tears at top & bottom) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={TORN_DITHER_STYLE}
      />

      {/* Sumatra Watermark Background with GSAP Parallax Float */}
      <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-1/2 w-[400px] sm:w-[600px] lg:w-[850px] xl:w-[1000px] aspect-square pointer-events-none z-0 opacity-70 what-ido-fade will-change-[transform,opacity]">
        <div ref={watermarkRef} className="relative w-full h-full will-change-transform">
          <Image
            src="/Sumatra.svg"
            alt="Sumatra Watermark"
            fill
            className="object-contain object-center"
            priority
          />
        </div>
      </div>

      <div className="w-full max-w-[1740px] mx-auto relative z-10">
        {/* Header */}
        <header className="w-full flex justify-between items-start z-30 relative mb-8 md:mb-10 what-ido-fade will-change-[transform,opacity]">
          <div>
            <h2 className="text-h1 font-black text-white select-none">
              WHAT I DO.
            </h2>
          </div>
        </header>

        {/* Category Pills Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-10 what-ido-fade will-change-[transform,opacity]">
          {["GEOLOGY", "DATA ANALYSIS", "VIBE CODING & AI"].map((pill) => (
            <button
              key={pill}
              type="button"
              className="text-body-2 font-mono border border-white/20 rounded-full px-3 py-1.5 text-gray-300 inline-flex items-center gap-1.5 bg-[#121214]/40 backdrop-blur-sm transition-all hover:border-white/60 hover:text-white"
            >
              <span>{pill}</span>
              <svg
                className="w-2.5 h-2.5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <line x1="7" x2="17" y1="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </button>
          ))}
        </div>

        {/* Agency Mission Statement Paragraph */}
        <div className="max-w-4xl what-ido-fade will-change-[transform,opacity]">
          <p className="text-h3 sm:text-h2 text-gray-100 font-normal tracking-tight">
            I bridge the gap between earth sciences and digital innovation. With a deep interest in data analysis and AI-driven workflows, I actively explore tech-assisted solutions to solve complex problems. By combining a strong scientific approach with a modern digital mindset, I bring fresh perspectives, high adaptability, and an eagerness to learn to every project I take on.
          </p>
        </div>

        {/* Bottom Services Grid & Direct Contact */}
        <div className="mt-24 md:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start what-ido-fade will-change-[transform,opacity]">
          {/* Bottom Left Contact Callout */}
          <div className="lg:col-span-4 xl:col-span-5 flex flex-wrap items-center gap-3 pt-1">
            <span className="text-body-2 font-normal text-gray-300">
              TLDR; I do a lot. Just give me a call:
            </span>
            <a
              className="inline-flex items-center gap-3 bg-black/90 hover:bg-black text-white px-2 py-1.5 rounded-sm border border-neutral-800 transition-colors shadow-lg"
              href="https://wa.me/6282267108623"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-5 h-5 rounded overflow-hidden flex-shrink-0 bg-neutral-700 relative">
                <Image
                  alt="Prastyo Arlan"
                  className="object-cover object-top"
                  src="/avatar.jpg"
                  fill
                  sizes="20px"
                />
              </div>
              <span className="font-mono text-xs text-gray-300 pr-2 tracking-wide font-medium">
                +62 822-6710-8623
              </span>
            </a>
          </div>

          {/* Right 3-Column Service Directory */}
          <div className="lg:col-span-8 xl:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            <div>
              <h3 className="font-mono text-[11px] tracking-[0.05em] text-white mb-5 sm:mb-6">
                [ GEOLOGY ]
              </h3>
              <ul className="space-y-1">
                {[
                  "Geological Mapping & 3D Geological Modeling",
                  "Well Log Analysis",
                  "Subsurface Data Interpretation",
                  "Sequence Stratigraphy & Biostratigraphy",
                  "Mine Planning & Scheduling",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-[13.5px] sm:text-[14.5px] leading-[1.8] text-white font-normal cursor-default select-none"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-[11px] tracking-[0.05em] text-white mb-5 sm:mb-6">
                [ DATA ANALYSIS ]
              </h3>
              <ul className="space-y-1">
                {[
                  "Basic Data Science (Excel)",
                  "Data Processing & Tabulation",
                  "Data Matching & Validation",
                  "Geospatial Data Processing",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-[13.5px] sm:text-[14.5px] leading-[1.8] text-white font-normal cursor-default select-none"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-[11px] tracking-[0.05em] text-white mb-5 sm:mb-6">
                [ VIBE CODING & AI ]
              </h3>
              <ul className="space-y-1">
                {[
                  "AI Prompt Engineering",
                  "UI/UX & Design Systems",
                  "Frontend Architecture Direction",
                  "Scrollytelling & Motion Direction",
                  "3D Asset Integration (WebGL)",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-[13.5px] sm:text-[14.5px] leading-[1.8] text-white font-normal cursor-default select-none"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
