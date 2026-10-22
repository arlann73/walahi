"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import AsciiPortraitCanvas from "@/components/AsciiPortraitCanvas";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

function scrambleText(el: HTMLElement, duration = 1.2) {
  const original = el.dataset.original ?? el.textContent ?? "";
  el.dataset.original = original;

  const chars = "abcdefghijklmnopqrstuvwxyz!<>-_/[]{}=+*^?#";
  const state = { p: 0 };

  return gsap.to(state, {
    p: 1,
    duration,
    ease: "power3.inOut",
    onUpdate: () => {
      const settled = Math.floor(original.length * state.p);
      let out = "";
      for (let i = 0; i < original.length; i++) {
        const c = original[i];
        out +=
          c === " " || c === "\n" || i < settled
            ? c
            : chars[(Math.random() * chars.length) | 0];
      }
      el.textContent = out;
    },
    onComplete: () => {
      el.textContent = original;
    },
  });
}


export default function AboutPortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const asciiRef = useRef<HTMLDivElement>(null);
  const heroStatementRef = useRef<HTMLDivElement>(null);
  const heroParagraphRef = useRef<HTMLParagraphElement>(null);
  const [avatarSrc, setAvatarSrc] = useState("/arlan-face-dark.jpg");

  // GSAP Hover on portrait thumbnail
  const handlePortraitEnter = () => {
    if (portraitRef.current) {
      gsap.to(portraitRef.current, {
        rotate: 0,
        scale: 1.05,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handlePortraitLeave = () => {
    if (portraitRef.current) {
      gsap.to(portraitRef.current, {
        rotate: 1.5,
        scale: 1.0,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // mm.add("all") ensures animations run across all devices and OS configurations,
      // including Windows machines where battery saver might report reduced motion.
      mm.add("all", () => {
        const section = sectionRef.current;
        if (!section) return;

        // Set initial thumbnail tilt
        if (portraitRef.current) {
          gsap.set(portraitRef.current, { rotate: 1.5, transformOrigin: "center center" });
        }

        // Set initial state of grid lines
        gsap.set(".about-grid-line", { scaleY: 0, transformOrigin: "top" });

        // Select all reveal elements tagged with data-reveal or about-fade-el
        const revealElements = gsap.utils.toArray<HTMLElement>(
          "[data-reveal], .about-fade-el",
          section
        );

        // Set starting state for non-split reveal items (Opsi B initial state)
        revealElements.forEach((el) => {
          if (el !== heroStatementRef.current) {
            gsap.set(el, { y: 40, opacity: 0 });
          }
        });

        // SplitText for Hero Manifesto Statement: eliminates layout shift and enables line-by-line reveal
        const heroSplitConfig: SplitText.Vars = {
          type: "lines",
          linesClass: "about-hero-line block overflow-hidden",
        };
        let heroSplit: SplitText | null = null;
        if (heroParagraphRef.current) {
          heroSplit = new SplitText(heroParagraphRef.current, heroSplitConfig);
          gsap.set(heroSplit.lines, { y: 44, opacity: 0 });
        }

        // ASCII Portrait Canvas: static placement (diam saat di-scroll)
        if (asciiRef.current) {
          gsap.set(asciiRef.current, { y: 0 });
        }

        // Map to keep track of active scramble tweens per element
        const scrambleMap = new Map<HTMLElement, gsap.core.Tween>();

        // Option B Action: PLAY (when element enters from below)
        const playReveal = (el: HTMLElement) => {
          // If this is the hero statement, reveal lines with SplitText stagger
          if (el === heroStatementRef.current && heroSplit && heroSplit.lines.length > 0) {
            gsap.to(heroSplit.lines, {
              y: 0,
              opacity: 1,
              duration: 1.0,
              stagger: 0.08,
              ease: "expo.out",
              overwrite: "auto",
            });
            return;
          }

          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "expo.out",
            overwrite: "auto",
          });

          // Scramble cipher reserved strictly for short heading tags (h3) to prevent layout shift
          const scrambleEl = el.querySelector<HTMLElement>(".about-scramble-text");
          if (scrambleEl) {
            scrambleMap.get(scrambleEl)?.kill();
            const tween = scrambleText(scrambleEl, 1.2);
            scrambleMap.set(scrambleEl, tween);
          }
        };

        // Option B Action: RESET (when element leaves out the bottom as user scrolls back up above it)
        const resetReveal = (el: HTMLElement) => {
          // Reset hero statement lines
          if (el === heroStatementRef.current && heroSplit && heroSplit.lines.length > 0) {
            gsap.to(heroSplit.lines, {
              y: 44,
              opacity: 0,
              duration: 0.35,
              stagger: 0.03,
              ease: "power2.in",
              overwrite: "auto",
            });
            return;
          }

          const scrambleEl = el.querySelector<HTMLElement>(".about-scramble-text");
          if (scrambleEl) {
            scrambleMap.get(scrambleEl)?.kill();
            if (scrambleEl.dataset.original) {
              scrambleEl.textContent = scrambleEl.dataset.original;
            }
          }

          gsap.to(el, {
            y: 40,
            opacity: 0,
            duration: 0.35,
            ease: "power2.in",
            overwrite: "auto",
          });
        };

        // ── 1. Architectural Grid Lines: Reversible (play none none reverse) ──
        const lineObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const isEntering = entry.isIntersecting;
              const isAbove = entry.boundingClientRect.top > 0;

              if (isEntering && isAbove) {
                // onEnter: play
                gsap.to(".about-grid-line", {
                  scaleY: 1,
                  duration: 1.2,
                  ease: "power3.inOut",
                  stagger: 0.08,
                  overwrite: "auto",
                });
              } else if (!isEntering && isAbove) {
                // onLeaveBack: reverse
                gsap.to(".about-grid-line", {
                  scaleY: 0,
                  duration: 0.5,
                  ease: "power2.in",
                  stagger: 0.04,
                  overwrite: "auto",
                });
              }
            });
          },
          { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
        );
        lineObserver.observe(section);

        // ── 3. Content Blocks: Option B (toggleActions: "play none none reset") ──
        // - onEnter (entering from bottom): PLAY (reveals + scrambles)
        // - onLeave (scrolling down past it): NONE (stays visible)
        // - onEnterBack (scrolling up into it): NONE (stays visible, no flicker/reset while reading)
        // - onLeaveBack (scrolling all the way up above it): RESET (resets to y:40, opacity:0 so it can replay)
        const elementObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const target = entry.target as HTMLElement;
              const isEntering = entry.isIntersecting;
              const isAbove = entry.boundingClientRect.top > 0;

              if (isEntering && isAbove) {
                // onEnter: play
                playReveal(target);
              } else if (!isEntering && isAbove) {
                // onLeaveBack: reset
                resetReveal(target);
              }
            });
          },
          {
            rootMargin: "0px 0px -12% 0px", // Trigger when top 88% of screen is reached
            threshold: 0.05,
          }
        );

        revealElements.forEach((el) => elementObserver.observe(el));

        const handleResize = () => {
          if (heroSplit) {
            heroSplit.split(heroSplitConfig);
          }
        };
        window.addEventListener("resize", handleResize);

        return () => {
          lineObserver.disconnect();
          elementObserver.disconnect();
          scrambleMap.forEach((tw) => tw.kill());
          scrambleMap.clear();
          heroSplit?.revert();
          window.removeEventListener("resize", handleResize);
        };
      });

      // Recalculate SplitText and ScrollTrigger once fonts load
      document.fonts?.ready.then(() => {
        ScrollTrigger.refresh();
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[#121214] text-[#F9F4EB] min-h-screen overflow-hidden selection:bg-white selection:text-black z-20"
    >
      {/* ── Architectural Vertical Guidelines (matching Stitch screen layout) ── */}
      <div aria-hidden="true" className="about-grid-line absolute top-0 bottom-0 left-[2%] w-[1px] bg-white/[0.07] pointer-events-none z-[1]" />
      <div aria-hidden="true" className="about-grid-line absolute top-0 bottom-0 left-[26%] w-[1px] bg-white/[0.07] pointer-events-none z-[1]" />
      <div aria-hidden="true" className="about-grid-line absolute top-0 bottom-0 left-[50%] w-[1px] bg-white/[0.07] pointer-events-none z-[1]" />
      <div aria-hidden="true" className="about-grid-line absolute top-0 bottom-0 left-[74.5%] w-[1px] bg-white/[0.07] pointer-events-none z-[1]" />
      <div aria-hidden="true" className="about-grid-line absolute top-0 bottom-0 right-[2%] w-[1px] bg-white/[0.07] pointer-events-none z-[1]" />

      {/* ── Section Header: Identity, Column Tabs & Portrait Thumbnail ── */}
      <header data-reveal className="relative z-10 w-full pt-6 md:pt-8 px-5 md:px-8 flex justify-between items-start">
        {/* Brand / Identity */}
        <div className="flex items-center space-x-2">
          <span className="inline-block w-[7px] h-[7px] bg-[#F9F4EB] mb-[1px]" />
          <h2 className="text-mono-data lowercase text-[#F9F4EB]/90">
            prastyo arlan
          </h2>
        </div>

        {/* Navigation status / Column tabs (from reference design) */}
        <nav aria-label="About Section Breadcrumbs" className="hidden md:flex items-center space-x-28 pr-12 text-mono-data select-none">
          <span className="text-white/40 cursor-default">photos</span>
          <div className="flex items-center space-x-1.5 font-normal">
            <span className="inline-block w-[6px] h-[6px] bg-[#F9F4EB]" />
            <span className="text-[#F9F4EB]">about</span>
          </div>
        </nav>

        {/* Top-Right Portrait Thumbnail (with subtle 1.5deg tilt and GSAP straightener) */}
        <div
          ref={portraitRef}
          onMouseEnter={handlePortraitEnter}
          onMouseLeave={handlePortraitLeave}
          className="relative w-[68px] h-[68px] sm:w-[74px] sm:h-[74px] bg-neutral-900 shrink-0 shadow-sm border border-white/15 overflow-hidden cursor-pointer"
        >
          <Image
            src={avatarSrc}
            alt="Portrait of Prastyo Arlan"
            fill
            sizes="74px"
            className="object-cover grayscale contrast-125 select-none"
            onError={() => setAvatarSrc("/arlan-face.jpg")}
          />
        </div>
      </header>

      {/* ── Main Editorial Content ── */}
      <div className="relative z-10 w-full pt-14 md:pt-20 pb-20 md:pb-28 px-5 md:px-8">
        {/* Hero / Headline Statement: 4 intentional lines with SplitText line-by-line reveal */}
        <div
          ref={heroStatementRef}
          data-reveal
          data-purpose="hero-statement"
          className="grid grid-cols-1 md:grid-cols-12 gap-y-6"
        >
          <div className="col-span-12 max-w-[1480px]">
            <p
              ref={heroParagraphRef}
              className="text-h2 text-[#F9F4EB] leading-[1.15] select-none"
            >
              <span className="block pl-0 md:pl-[calc(100%/12)]">
                my work focuses on geological exploration and geological modeling.
              </span>
              <span className="block">
                with a strong foundation in geological engineering from institut teknologi
              </span>
              <span className="block">
                sumatera and internship experience, i strive to provide reliable subsurface
              </span>
              <span className="block">
                insights that bridge field exploration and computational geology.
              </span>
            </p>
          </div>
        </div>

        {/* Structured 4-Section Body Grid (background, focus, experience, contact) */}
        <div className="relative mt-20 md:mt-28 space-y-14 md:space-y-20">
          {/* ── Interactive Realtime Optical ASCII Portrait Shader (Rata kiri mulai grid kolom 1 sampai kolom 8) ── */}
          <div
            ref={asciiRef}
            aria-hidden="true"
            className="absolute -top-12 bottom-0 left-0 w-full md:w-8/12 pointer-events-none z-0 select-none flex items-start justify-start overflow-hidden"
          >
            <AsciiPortraitCanvas
              src="/arlan-face-dark.jpg"
              charSize={5}
              contrast={1.95}
              brightness={0.34}
              radius={150}
              force={24}
              charsetKey="kaspar"
              invert={true}
              maxDimension={706}
              opacity={0.85}
              showHud={true}
              hudPosition="bottom-left"
              align="left"
              maskGradient="linear-gradient(to bottom, black 85%, transparent 100%)"
            />
          </div>

          {/* SECTION 1: Background */}
          <div data-reveal data-purpose="section-background" className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-y-2">
            <div className="md:col-start-4 md:col-span-2">
              <h3 className="about-scramble-text text-subtitle-2 lowercase tracking-tight text-[#F9F4EB]/90 font-medium pt-[2px]" data-original="background" aria-label="background">
                background
              </h3>
            </div>
            <div className="md:col-start-7 md:col-span-5 lg:col-span-4">
              <p className="text-body-2 text-[#F9F4EB]/85">
                i graduated with a bachelor of geological engineering from institut teknologi sumatera (gpa 3.62 / 4.00), where my undergraduate thesis focused on sequence stratigraphic analysis and biostratigraphy in the mn field, central sumatra basin. my technical capabilities grew through intensive laboratory assistant roles across hydrogeology, geomorphology, and geotechnical engineering laboratories.
              </p>
            </div>
          </div>

          {/* SECTION 2: Focus */}
          <div data-reveal data-purpose="section-focus" className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-y-2">
            <div className="md:col-start-4 md:col-span-2">
              <h3 className="about-scramble-text text-subtitle-2 lowercase tracking-tight text-[#F9F4EB]/90 font-medium pt-[2px]" data-original="focus" aria-label="focus">
                focus
              </h3>
            </div>
            <div className="md:col-start-7 md:col-span-5 lg:col-span-4">
              <p className="text-body-2 text-[#F9F4EB]/85">
                my technical focus centers on well log analysis, biostratigraphy, geological mapping, and reservoir rock evaluation. proficient in arcgis, minescape, spry, global mapper, and rockworks, i specialize in translating raw field data and well logs into coherent 3d geological models, resource estimates, and structural maps.
              </p>
            </div>
          </div>

          {/* SECTION 3: Experience */}
          <div data-reveal data-purpose="section-experience" className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-y-2">
            <div className="md:col-start-4 md:col-span-2">
              <h3 className="about-scramble-text text-subtitle-2 lowercase tracking-tight text-[#F9F4EB]/90 font-medium pt-[2px]" data-original="experience" aria-label="experience">
                experience
              </h3>
            </div>
            <div className="md:col-start-7 md:col-span-5 lg:col-span-4">
              <p className="text-body-2 text-[#F9F4EB]/85">
                i conducted subsurface evaluation and biostratigraphic zonation at pt pertamina hulu rokan in the exploration division and undergraduate thesis program. beyond technical roles, i served as deputy head of seminar & field trip division at mgei sc itera, academic staff at hmgl avanindra, and led field coordinator initiatives for disaster preparedness community programs.
              </p>
            </div>
          </div>

          {/* SECTION 4: Contact */}
          <div data-reveal data-purpose="section-contact" className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-y-2">
            <div className="md:col-start-4 md:col-span-2">
              <h3 className="about-scramble-text text-subtitle-2 lowercase tracking-tight text-[#F9F4EB]/90 font-medium pt-[1px]" data-original="contact" aria-label="contact">
                contact
              </h3>
            </div>
            <div className="md:col-start-7 md:col-span-5 lg:col-span-4">
              <div className="text-body-2 font-mono space-y-1 text-[#F9F4EB]/90">
                <div>
                  <span className="text-white/40">m: </span>
                  <a
                     href="mailto:prastyoarlann73@gmail.com"
                     className="hover:text-white underline underline-offset-2 decoration-white/30 hover:decoration-white"
                  >
                    prastyoarlann73@gmail.com
                  </a>
                </div>
                <div>
                  <span className="text-white/40">p: </span>
                  <a
                     href="tel:+6282267108623"
                     className="hover:text-white underline underline-offset-2 decoration-white/30 hover:decoration-white"
                  >
                    +6282267108623
                  </a>
                </div>
                <div>
                  <span className="text-white/40">li: </span>
                  <a
                     href="https://linkedin.com/in/arlanpras/"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="hover:text-white underline underline-offset-2 decoration-white/30 hover:decoration-white"
                  >
                    arlanpras
                  </a>
                </div>
                <div>
                  <span className="text-white/40">ca: </span>
                  <a
                     href="https://arlan-portfolio.canva"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="hover:text-white underline underline-offset-2 decoration-white/30 hover:decoration-white"
                  >
                    arlan-portfolio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section Transition Divider ── */}
        <div data-reveal className="w-full mt-24 md:mt-32 pt-6 flex justify-between items-baseline text-mono-caption text-white/30 select-none border-t border-white/[0.08]">
          <span>[ 01 // ABOUT ]</span>
          <span>CONTINUE TO CATALOGUE ↓</span>
        </div>
      </div>
    </section>
  );
}

