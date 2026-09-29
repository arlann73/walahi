"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ASCII_TREE = `                                        +                                       |#
                                        1                                       i=         ■ about
                                      %1:           !+                          ::           -:++!1###0
                                      #1-       :-*!**|1#1                      #1           :--++11!#*##
                                      %11.      !**+---!!#+--1+                 +*            ++11++#*
                                      #1*      !#*+--:--++!11-                  **          ***!1##*!  :---**
                                      #1=     1*:*@1-@#*!#*--1-+1+*%!#1         #*        *##@1@@@!---*!11+*1
                                      #1+     !*---*#@#1=-:::--+1!#--111+        11       !###-*-+@@@@@@01
                                      #1-    --*:-:!++**!++#@0*@--+             11!     #11#--+--:!+*---@@@1*!
                                      %+   ::*#-+!*++*-:*+--+-|!*:             11#     ###1--*+++|11+--#*+++
                                     !:-  !#-*:-:--!-!-++*!++!#0@#*--:::1*+::  *#++###0!1+!*:-*#!*1+-111*1#
                                         --*-!-!-++!###|1!1*--:!#1--:+111!+    11*!*!*1!#11111*+--::--+:*#
                                         %+-*!*!#--*###!+@0---!#|#++1+1**      1       11!    =*!#%1!#*++%#1@01*!-+!:
                                            --++!#*1**!-!111*1!#@0:!|*#|1+--:1!      :1!       111  *11!#@1%*!++1!1*+*-b*+++
                                            1!*!1-*:--1:++!1*!#+*@#|###%!#*1--111-   ++!    +*1  -***11+!11!1+---.##+##
                                            :--**111!1--*@1*++|*#@#!+1111+--11*1++   #1*    11* 1*!*-*#+@1 #----*!1
                                            =--%%#*@1+*1  1--!*+--+#@1111+-!1*++    :1   +1*   1*!+-**
                                            *:*+!---*-    !-+!1**+ !%-@@-::-*!+-###   1++       1+-=+@
                                                           --!*:-:+!*!++-!-**!#*!*1!1!+--        *1
                                                            !*+--+*1!-!#@#11*++11*+---1!+      1*!
              %@*+#*!1!1#*1-- 1--*--     :++*:-             !*++-!-*-+1!#*!+*!1!*1!+---1!*+1*- !+
             @--##--:!11!+!#00@         @##1-               !#@+!*++-1**!+-1-!-!-+*!#@#!1*--+1+:
            --+++#*!+1#*---:*11!#*+..  *11!#*+--            !1*---!-*-++!#*@0@#*!#@0#11*--+!*
          +!++!+@00@:!#1111++   11!#11 @*=-                 !#--!+!#@0#@0#!-!-+!*11*--:1*
          +!+###@*#1!**!#1#!    +#*+!++!*1--11%#1*!-        #+*--!1111*-!-+!*11#@0@#!-!*
          +!-#000000#01--***%#+-- 111**#**!11!%@@@@1+:-     %#*!*+1!1--!-+!*11*--:1*
        01##%@0++11!#*+!-1%#---11%#%**:-:::=  @%1+--       %#*!+-!#*!1--!-+!*11*--:1*
        +**##%-  -!-*-*#11!#@0%--+!+::             011=-    @1+*--!#*!1--!-+!*11*--:1*
        +%-!#*-:::-----!-:!*#000@                  01---    @1+*--!#*!1--!-+!*11*--:1*
        000%@@0@#0--@@0---***!+1#                  %#*+--   @!*--!#*!1--!-+!*11*--:1*
         1*1-=*!1##*!@1111!*:-!1--1#+:::--          #*--    @!*--!#*!1--!-+!*11*--:1*
          --!*!@1%**--*#0001!#0000%@0!#*:-!1---%%### %+-    @!*--!#*!1--!-+!*11*--:1*
            !%%--!*+*#@1::-!11@00000000%@@0!*        @#1*   @!*--!#*!1--!-+!*11*--:1*
             # @000!#@00000*++++ 1%#11###            %#*-   @!*--!#*!1--!-+!*11*--:1*
              #--1*!#0@0@*#+++ 0%+**:-:              #*--   @!*--!#*!1--!-+!*11*--:1*
                11#+* +* *1-=1@0#11*                  #*++   @!*--!#*!1--!-+!*11*--:1*
                      !#F =                            01++  @!*--!#*!1--!-+!*11*--:1*
                                                         #*  @!*--!#*!1--!-+!*11*--:1*
                                                          #+ @!*--!#*!1--!-+!*11*--:1*
                                                           %#@!*--!#*!1--!-+!*11*--:1*
                                                            #*--!#*!1--!-+!*11*--:1*
                                                             #*--!#*!1--!-+!*11*--:1*
                                                              #*--!#*!1--!-+!*11*--:1*
                                                               #*--!#*!1--!-+!*11*--:1*
                                                                #*--!#*!1--!-+!*11*--:1*
                                                                 #*--!#*!1--!-+!*11*--:1*
                                                                  #*--!#*!1--!-+!*11*--:1*
                                                                   #*--!#*!1--!-+!*11*--:1*
                                                                    #*--!#*!1--!-+!*11*--:1*
                                                                     #*--!#*!1--!-+!*11*--:1*
                                                                      #*--!#*!1--!-+!*11*--:1*
                                                                       #*--!#*!1--!-+!*11*--:1*
                                                                        #*--!#*!1--!-+!*11*--:1*
                                                                         #*--!#*!1--!-+!*11*--:1*
                                                                          #*--!#*!1--!-+!*11*--:1*
                                                                           #*--!#*!1--!-+!*11*--:1*
                                                                            #*--!#*!1--!-+!*11*--:1*
                                                                             #*--!#*!1--!-+!*11*--:1*
                                                                              #*--!#*!1--!-+!*11*--:1*
                                                                               #*--!#*!1--!-+!*11*--:1*
                                                                                #*--!#*!1--!-+!*11*--:1*
                                                                                 #*--!#*!1--!-+!*11*--:1*
                                                                                  #*--!#*!1--!-+!*11*--:1*
                                                                                   #*--!#*!1--!-+!*11*--:1*
                                                                                    #*--!#*!1--!-+!*11*--:1*
                                                                                     #*--!#*!1--!-+!*11*--:1*
                                                                                      #*--!#*!1--!-+!*11*--:1*
                                                                                       #*--!#*!1--!-+!*11*--:1*
                                                                                        #*--!#*!1--!-+!*11*--:1*`;

export default function AboutPortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const asciiRef = useRef<HTMLPreElement>(null);
  const [avatarSrc, setAvatarSrc] = useState("/avatar.jpg");

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
      // Initialize portrait initial rotation via GSAP
      if (portraitRef.current) {
        gsap.set(portraitRef.current, { rotate: 1.5, transformOrigin: "center center" });
      }

      // Initial state for fade-in editorial sections
      gsap.set(".about-fade-el", { y: 24, opacity: 0 });

      // Subtle parallax drift on ASCII tree background
      if (asciiRef.current && sectionRef.current) {
        gsap.to(asciiRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // IntersectionObserver for staggered entrance of editorial sections
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(entry.target, {
                y: 0,
                opacity: 1,
                duration: 0.85,
                ease: "power3.out",
                overwrite: "auto",
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
      );

      const fadeElements = sectionRef.current?.querySelectorAll(".about-fade-el");
      fadeElements?.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
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
      <div aria-hidden="true" className="absolute top-0 bottom-0 left-[2%] w-[1px] bg-white/[0.07] pointer-events-none z-[1]" />
      <div aria-hidden="true" className="absolute top-0 bottom-0 left-[26%] w-[1px] bg-white/[0.07] pointer-events-none z-[1]" />
      <div aria-hidden="true" className="absolute top-0 bottom-0 left-[50%] w-[1px] bg-white/[0.07] pointer-events-none z-[1]" />
      <div aria-hidden="true" className="absolute top-0 bottom-0 left-[74.5%] w-[1px] bg-white/[0.07] pointer-events-none z-[1]" />
      <div aria-hidden="true" className="absolute top-0 bottom-0 right-[2%] w-[1px] bg-white/[0.07] pointer-events-none z-[1]" />

      {/* ── Pale Architectural ASCII Tree Backdrop Overlay ── */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none z-[2] select-none opacity-85">
        <pre
          ref={asciiRef}
          className="ascii-bg absolute top-2 left-[24%] -translate-x-[15%] select-none font-mono text-[7px] sm:text-[8px] md:text-[8.5px] leading-[7.5px] sm:leading-[8px] md:leading-[8.5px] text-white/20 whitespace-pre will-change-transform"
        >
          {ASCII_TREE}
        </pre>
      </div>

      {/* ── Section Header: Identity, Column Tabs & Portrait Thumbnail ── */}
      <header className="relative z-10 w-full pt-6 md:pt-8 px-5 md:px-8 flex justify-between items-start">
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
          className="relative w-[68px] h-[68px] sm:w-[74px] sm:h-[74px] bg-neutral-900 shrink-0 shadow-sm border border-white/15 overflow-hidden will-change-transform cursor-pointer"
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
        {/* Hero / Headline Statement */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 about-fade-el will-change-[transform,opacity]" data-purpose="hero-statement">
          <div className="md:col-start-4 md:col-span-8 lg:col-start-4 lg:col-span-8 xl:col-span-7">
            <p className="text-h2 font-normal text-[#F9F4EB]">
              my work focuses on geological exploration and geological modeling. with a strong foundation in geological engineering from institut teknologi sumatera and internship experience at pt pertamina hulu rokan, i strive to provide reliable subsurface insights that bridge field exploration and computational geology.
            </p>
          </div>
        </div>

        {/* Structured 4-Section Body Grid (background, focus, experience, contact) */}
        <div className="mt-20 md:mt-28 space-y-14 md:space-y-20">
          {/* SECTION 1: Background */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-2 about-fade-el will-change-[transform,opacity]" data-purpose="section-background">
            <div className="md:col-start-4 md:col-span-2">
              <h3 className="text-subtitle-2 lowercase tracking-tight text-white/50 pt-[2px]">
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-2 about-fade-el will-change-[transform,opacity]" data-purpose="section-focus">
            <div className="md:col-start-4 md:col-span-2">
              <h3 className="text-subtitle-2 lowercase tracking-tight text-white/50 pt-[2px]">
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-2 about-fade-el will-change-[transform,opacity]" data-purpose="section-experience">
            <div className="md:col-start-4 md:col-span-2">
              <h3 className="text-subtitle-2 lowercase tracking-tight text-white/50 pt-[2px]">
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-2 about-fade-el will-change-[transform,opacity]" data-purpose="section-contact">
            <div className="md:col-start-4 md:col-span-2">
              <h3 className="text-subtitle-2 lowercase tracking-tight text-white/50 pt-[1px]">
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

        {/* ── Baseline Editorial Footer Divider ── */}
        <footer className="w-full mt-24 md:mt-32 pt-6 flex justify-between items-baseline text-body-2 font-mono text-white/40 select-none border-t border-white/[0.08]">
          <div>design and development by me / data from cv</div>
          <div>©2026</div>
        </footer>
      </div>
    </section>
  );
}
