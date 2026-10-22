"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ArrowUp,
  Copy,
  Check,
  Mail,
  MessageSquare,
  Compass,
} from "lucide-react";
import type Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CHANNELS = [
  {
    id: "01",
    label: "LINKEDIN",
    category: "[ PROFESSIONAL NETWORK ]",
    role: "Career trajectory, publications & engineering articles",
    href: "https://linkedin.com/in/arlanpras/",
    handle: "in/arlanpras",
    isExternal: true,
  },
  {
    id: "02",
    label: "INSTAGRAM",
    category: "[ VISUAL ARCHIVE ]",
    role: "Subsurface field photography & creative journeys",
    href: "https://www.instagram.com/",
    handle: "@arlanpras",
    isExternal: true,
  },
  {
    id: "03",
    label: "FIELD LOG & DOSSIER",
    category: "[ INTERACTIVE DECK ]",
    role: "Complete geological credentials & project case studies",
    href: "#field-log?job=fesco",
    handle: "VIEW DOSSIER",
    isExternal: false,
  },
  {
    id: "04",
    label: "DIRECT COMM",
    category: "[ WHATSAPP / TELEGRAM ]",
    role: "Direct messaging channel for timely inquiries",
    href: "https://wa.me/6282267108623?text=Hi%20Arlan,%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect.",
    handle: "+62 822 6710 8623",
    isExternal: true,
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);
  const arrowUpRef = useRef<HTMLSpanElement>(null);
  const emailBoxRef = useRef<HTMLDivElement>(null);
  const copyBtnRef = useRef<HTMLButtonElement>(null);
  const sendBtnRef = useRef<HTMLAnchorElement>(null);
  const waBtnRef = useRef<HTMLAnchorElement>(null);

  const [copied, setCopied] = useState(false);
  const [timeStr, setTimeStr] = useState("08 : 00 : 00");
  const [statusText, setStatusText] = useState("AVAILABLE FOR COLLABORATION · 2026");

  // Realtime clock (WIB / North Sumatra time: UTC+7)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to UTC+7 (Western Indonesia Time / WIB)
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const wibDate = new Date(utc + 3600000 * 7);
      const h = String(wibDate.getHours()).padStart(2, "0");
      const m = String(wibDate.getMinutes()).padStart(2, "0");
      const s = String(wibDate.getSeconds()).padStart(2, "0");
      setTimeStr(`${h} : ${m} : ${s}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // One-click copy email with feedback toast
  const handleCopyEmail = useCallback(() => {
    const email = "prastyoarlann73@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      if (copyBtnRef.current) {
        gsap.fromTo(
          copyBtnRef.current,
          { scale: 0.96 },
          { scale: 1, duration: 0.25, ease: "power2.out" }
        );
      }
      setTimeout(() => {
        setCopied(false);
      }, 2600);
    });
  }, []);

  // Smooth scroll back to apex (top)
  const handleBackToTop = useCallback(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.8 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Scramble status on click for playful tactile feel
  const handleScrambleStatus = useCallback(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>_/";
    const original = "AVAILABLE FOR COLLABORATION · 2026";
    let iterations = 0;
    const interval = setInterval(() => {
      setStatusText(
        original
          .split("")
          .map((letter, index) => {
            if (index < iterations || letter === " " || letter === "·") {
              return original[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iterations >= original.length) {
        clearInterval(interval);
        setStatusText(original);
      }
      iterations += 2;
    }, 30);
  }, []);

  // GSAP reveal upon scrolling into view
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const revealItems = section.querySelectorAll(".contact-reveal");
      if (revealItems.length > 0) {
        gsap.fromTo(
          revealItems,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full bg-[#121214] text-chalk antialiased select-none pt-24 sm:pt-32 pb-14 sm:pb-20 overflow-hidden border-t border-white/10"
    >
      {/* Ambient background depth gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(216, 56, 43, 0.12), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Main Container: 1740px Max Width matching all sections */}
      <div className="relative z-10 max-w-[1740px] mx-auto px-4 sm:px-10 lg:px-16 flex flex-col gap-16 lg:gap-24">
        {/* ── 01. TOP METADATA & TELEMETRY ROW ── */}
        <div className="contact-reveal w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          {/* Eyebrow Label */}
          <div className="flex items-center gap-3">
            <span className="text-pixel-label text-chalk">
              [ 04 // FINAL TRANSMISSION ]
            </span>
            <span className="text-mono-caption text-muted hidden sm:inline-block">
              · CONTACT &amp; COOPERATION
            </span>
          </div>

          {/* Operational Beacon & Live North Sumatra Time */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-mono-caption text-muted">
            {/* Pulsing Status Dot */}
            <button
              type="button"
              onClick={handleScrambleStatus}
              title="Click to scramble status"
              className="flex items-center gap-2 cursor-pointer outline-none bg-transparent border-0 p-0 text-left"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD904] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD904]" />
              </span>
              <span className="text-chalk font-bold tracking-mono-bracket uppercase">
                {statusText}
              </span>
            </button>

            {/* Coordinates & Local Clock */}
            <div className="flex items-center gap-2 whitespace-nowrap text-mono-data tabular-nums text-chalk/80">
              <Compass className="w-3.5 h-3.5 text-muted stroke-[2]" />
              <span>03°35&apos;N, 98°40&apos;E</span>
              <span className="text-muted">·</span>
              <span className="text-chalk font-mono font-bold">[ {timeStr} WIB ]</span>
            </div>
          </div>
        </div>

        {/* ── 02. GRAND BRUTALIST HEADLINE & MANIFESTO SPLIT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
          {/* Left Column (Cols 1-8): Monumental Headline */}
          <div className="contact-reveal lg:col-span-8 flex flex-col gap-4">
            <span className="text-mono-label tracking-mono-bracket text-muted uppercase">
              [ CALL TO ACTION ]
            </span>
            <h2
              id="contact-heading"
              className="text-display text-white font-extrabold uppercase leading-[0.92] tracking-[-0.035em] select-text"
            >
              <span className="block text-chalk">LET&apos;S UNCOVER</span>
              <span className="block text-white">WHAT LIES</span>
              <span className="block text-section-accent">BENEATH.</span>
            </h2>
          </div>

          {/* Right Column (Cols 9-12): Editorial Narrative & Commitments */}
          <div className="contact-reveal lg:col-span-4 flex flex-col justify-end gap-6 pb-2">
            <p className="text-body-editorial text-chalk measure-editorial select-text leading-relaxed">
              Combining geological rigor, subsurface insights, and creative technology.
              Whether you are developing energy exploration initiatives, interactive digital systems, or strategic brand identities—I am always prepared to build something deeply grounded.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-mono-caption">
              <div>
                <span className="block text-muted uppercase tracking-mono-meta mb-1">
                  AVAILABILITY
                </span>
                <span className="block text-chalk font-semibold">
                  Q2 / Q3 2026 ENGAGEMENTS
                </span>
              </div>
              <div>
                <span className="block text-muted uppercase tracking-mono-meta mb-1">
                  RESPONSE TIME
                </span>
                <span className="block text-chalk font-semibold">
                  &lt; 24 HOURS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 03. THE MAGNETIC PRIMARY CONTACT CARD (DIRECT DISPATCH) ── */}
        <div
          ref={emailBoxRef}
          className="contact-reveal relative w-full rounded-squircle bg-[#161819] border border-white/15 p-6 sm:p-10 lg:p-12 overflow-hidden flex flex-col gap-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        >
          {/* Subtle Corner Grid Detail */}
          <div
            className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #E2E2DD 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
            aria-hidden="true"
          />

          {/* Dispatch Eyebrow */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-section-accent" />
              <span className="text-mono-label tracking-mono-bracket text-chalk uppercase font-bold">
                [ PRIMARY ELECTRONIC MAIL ]
              </span>
            </div>
            <span className="text-mono-caption text-muted">
              TAP OR CLICK TO INTERACT
            </span>
          </div>

          {/* Massive Clickable / Copyable Email Address */}
          <div className="flex flex-col gap-2">
            <a
              href="mailto:prastyoarlann73@gmail.com"
              className="group inline-block text-h1 sm:text-display-sm font-sans font-bold text-white hover:text-chalk transition-none select-text break-all"
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  color: "#D8382B",
                  duration: 0.25,
                  ease: "power2.out",
                })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, {
                  color: "#FFFFFF",
                  duration: 0.25,
                  ease: "power2.out",
                })
              }
            >
              prastyoarlann73@gmail.com
            </a>
            <span className="text-body-2 text-muted">
              Direct inbox monitored daily. Suitable for project proposals, technical inquiries, and freelance briefs.
            </span>
          </div>

          {/* Action Buttons Cluster */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Button 1: Copy Email */}
            <button
              ref={copyBtnRef}
              type="button"
              onClick={handleCopyEmail}
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  backgroundColor: "#FFFFFF",
                  color: "#08090A",
                  borderColor: "#FFFFFF",
                  duration: 0.25,
                  ease: "power2.out",
                })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, {
                  backgroundColor: "#161819",
                  color: "#E2E2DD",
                  borderColor: "rgba(226, 226, 221, 0.25)",
                  duration: 0.25,
                  ease: "power2.out",
                })
              }
              className="relative inline-flex items-center gap-2.5 px-5 py-3 rounded-squircle bg-[#161819] text-chalk border border-white/25 text-mono-label tracking-mono-bracket uppercase font-bold cursor-pointer outline-none select-none"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                  <span>[ ✓ COPIED TO CLIPBOARD ]</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 stroke-[2]" />
                  <span>[ COPY ADDRESS ]</span>
                </>
              )}
            </button>

            {/* Button 2: Direct Mailto */}
            <a
              ref={sendBtnRef}
              href="mailto:prastyoarlann73@gmail.com?subject=Inquiry%20from%20Portfolio"
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  backgroundColor: "#D8382B",
                  borderColor: "#D8382B",
                  color: "#FFFFFF",
                  duration: 0.25,
                  ease: "power2.out",
                })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, {
                  backgroundColor: "#E2E2DD",
                  borderColor: "#E2E2DD",
                  color: "#08090A",
                  duration: 0.25,
                  ease: "power2.out",
                })
              }
              className="inline-flex items-center gap-2 px-5 py-3 rounded-squircle bg-chalk text-[#08090A] border border-chalk text-mono-label tracking-mono-bracket uppercase font-bold cursor-pointer outline-none select-none"
            >
              <span>SEND EMAIL</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            {/* Button 3: WhatsApp Direct */}
            <a
              ref={waBtnRef}
              href="https://wa.me/6282267108623?text=Hi%20Arlan,%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect."
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                  borderColor: "rgba(255, 255, 255, 0.4)",
                  duration: 0.25,
                  ease: "power2.out",
                })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, {
                  backgroundColor: "transparent",
                  borderColor: "rgba(226, 226, 221, 0.14)",
                  duration: 0.25,
                  ease: "power2.out",
                })
              }
              className="inline-flex items-center gap-2 px-5 py-3 rounded-squircle bg-transparent text-chalk border border-white/15 text-mono-label tracking-mono-bracket uppercase font-bold cursor-pointer outline-none select-none"
            >
              <MessageSquare className="w-4 h-4 stroke-[2]" />
              <span>WHATSAPP CHAT</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2]" />
            </a>
          </div>
        </div>

        {/* ── 04. EDITORIAL CHANNELS & DOSSIER DIRECTORY ── */}
        <div className="contact-reveal flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/15">
            <span className="text-pixel-label text-chalk">
              [ DIRECTORY // PROFESSIONAL CHANNELS &amp; ARCHIVE ]
            </span>
            <span className="text-mono-caption text-muted">
              INDEX 01 — 04
            </span>
          </div>

          <nav aria-label="Social and professional links" className="flex flex-col">
            {CHANNELS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    x: 6,
                    backgroundColor: "rgba(255, 255, 255, 0.035)",
                    duration: 0.25,
                    ease: "power2.out",
                  });
                  const arrow = e.currentTarget.querySelector(".channel-arrow");
                  if (arrow) {
                    gsap.to(arrow, {
                      x: 2,
                      y: -2,
                      color: "#FFFFFF",
                      duration: 0.25,
                      ease: "power2.out",
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    x: 0,
                    backgroundColor: "transparent",
                    duration: 0.25,
                    ease: "power2.out",
                  });
                  const arrow = e.currentTarget.querySelector(".channel-arrow");
                  if (arrow) {
                    gsap.to(arrow, {
                      x: 0,
                      y: 0,
                      color: "#908C87",
                      duration: 0.25,
                      ease: "power2.out",
                    });
                  }
                }}
                className="group w-full py-5 px-3 -mx-3 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 cursor-pointer rounded-sm outline-none"
              >
                {/* Index & Channel Name */}
                <div className="flex items-baseline gap-4 sm:gap-6 min-w-[280px]">
                  <span className="text-mono-caption text-muted tabular-nums">
                    {item.id}
                  </span>
                  <span className="text-h3 font-sans font-bold text-white group-hover:text-chalk">
                    {item.label}
                  </span>
                  <span className="text-mono-caption text-muted hidden sm:inline-block">
                    {item.category}
                  </span>
                </div>

                {/* Role / Description */}
                <div className="text-body-2 text-muted md:max-w-[420px]">
                  {item.role}
                </div>

                {/* Handle & Arrow Action */}
                <div className="flex items-center gap-2 text-mono-label tracking-mono-bracket text-chalk font-bold">
                  <span>{item.handle}</span>
                  <ArrowUpRight className="channel-arrow w-4 h-4 text-muted stroke-[2.5]" />
                </div>
              </a>
            ))}
          </nav>
        </div>

        {/* ── 05. MASSIVE ARCHITECTURAL WATERMARK (PRASTYO ARLAN) ── */}
        <div
          className="contact-reveal w-full overflow-hidden select-none pointer-events-none -my-6 sm:-my-10"
          aria-hidden="true"
        >
          <div className="text-[13vw] font-sans font-black tracking-[-0.04em] text-white/[0.035] leading-none text-center whitespace-nowrap">
            PRASTYO ARLAN
          </div>
        </div>

        {/* ── 06. COLOPHON & RETURN TO TOP BAR ── */}
        <footer className="contact-reveal w-full pt-8 border-t border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-mono-caption text-muted">
          {/* Left: Copyright & Legal */}
          <div className="flex flex-col gap-1">
            <span className="text-chalk font-semibold">
              © 2026 PRASTYO ARLAN. ALL RIGHTS RESERVED.
            </span>
            <span>
              DATA FROM CURRICULUM VITAE &amp; FIELD DOSSIER · NORTH SUMATRA, ID
            </span>
          </div>

          {/* Center: Technical Colophon */}
          <div className="hidden lg:flex flex-col gap-1 text-center">
            <span>
              ENGINEERED WITH NEXT.JS 16 · THREE.JS · GSAP · LENIS · TAILWIND V4
            </span>
            <span className="text-muted/70">
              TYPOGRAPHY: GEIST SANS &amp; GEIST MONO (VERCEL / BASEMENT STUDIO)
            </span>
          </div>

          {/* Right: Return to Top Trigger */}
          <div className="flex items-center gap-4">
            <button
              ref={backToTopRef}
              type="button"
              onClick={handleBackToTop}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  borderColor: "rgba(255, 255, 255, 0.4)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  duration: 0.25,
                  ease: "power2.out",
                });
                if (arrowUpRef.current) {
                  gsap.to(arrowUpRef.current, {
                    y: -3,
                    duration: 0.25,
                    ease: "power2.out",
                  });
                }
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  borderColor: "rgba(226, 226, 221, 0.14)",
                  backgroundColor: "transparent",
                  duration: 0.25,
                  ease: "power2.out",
                });
                if (arrowUpRef.current) {
                  gsap.to(arrowUpRef.current, {
                    y: 0,
                    duration: 0.25,
                    ease: "power2.out",
                  });
                }
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-white/15 bg-transparent text-chalk text-mono-label tracking-mono-bracket font-bold uppercase cursor-pointer outline-none select-none"
            >
              <span>RETURN TO TOP</span>
              <span ref={arrowUpRef} className="inline-block">
                <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
