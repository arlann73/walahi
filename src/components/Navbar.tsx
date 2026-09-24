"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import type Lenis from "lenis";

function NavItem({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const bgRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (bgRef.current && textRef.current) {
      if (isActive) {
        gsap.to(bgRef.current, { scaleX: 1, duration: 0.5, ease: "power2.out" });
        gsap.to(textRef.current, { color: "#E2E2DD", duration: 0.2 });
      } else {
        gsap.to(bgRef.current, { scaleX: 0, duration: 0.4, ease: "power2.inOut" });
        gsap.to(textRef.current, { color: "#908C87", duration: 0.2 });
      }
    }
  }, [isActive]);

  const handleMouseEnter = () => {
    if (!isActive && bgRef.current && textRef.current) {
      gsap.to(bgRef.current, { scaleX: 1, duration: 0.5, ease: "power2.out" });
      gsap.to(textRef.current, { color: "#E2E2DD", duration: 0.2 });
    }
  };

  const handleMouseLeave = () => {
    if (!isActive && bgRef.current && textRef.current) {
      gsap.to(bgRef.current, { scaleX: 0, duration: 0.4, ease: "power2.inOut" });
      gsap.to(textRef.current, { color: "#908C87", duration: 0.2 });
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative px-2.5 sm:px-3 py-1 rounded-sm overflow-hidden cursor-pointer bg-transparent border-0 outline-none select-none"
    >
      {/* Soft Warm-Charcoal Shadow Background - GSAP animated */}
      <span
        ref={bgRef}
        aria-hidden="true"
        style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left" }}
        className="absolute inset-0 rounded-sm bg-nav-hover border border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.35)] pointer-events-none"
      />

      {/* Stationary Text - GSAP color animated */}
      <span
        ref={textRef}
        className="relative z-10 block font-sans text-[13px] sm:text-[13.5px] md:text-[14px] font-medium leading-none tracking-normal select-none py-0.5"
        style={{ color: isActive ? "#E2E2DD" : "#908C87" }}
      >
        {label}
      </span>
    </button>
  );
}

function LetsTalkCta({
  avatarSrc,
  setAvatarSrc,
}: {
  avatarSrc: string;
  setAvatarSrc: (src: string) => void;
}) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const avatarImgRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const arrowBoxRef = useRef<HTMLDivElement>(null);
  const arrow1Ref = useRef<HTMLDivElement>(null);
  const arrow2Ref = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (containerRef.current) gsap.to(containerRef.current, { backgroundColor: "#D8D8D2", duration: 0.3, ease: "power2.out" });
    if (avatarImgRef.current) gsap.to(avatarImgRef.current, { scale: 1.1, duration: 0.3, ease: "power2.out" });
    if (text1Ref.current) gsap.to(text1Ref.current, { yPercent: -100, duration: 0.3, ease: "power2.out" });
    if (text2Ref.current) gsap.to(text2Ref.current, { yPercent: 0, duration: 0.3, ease: "power2.out" });
    if (arrowBoxRef.current) gsap.to(arrowBoxRef.current, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    if (arrow1Ref.current) gsap.to(arrow1Ref.current, { xPercent: 100, yPercent: -100, duration: 0.3, ease: "power2.out" });
    if (arrow2Ref.current) gsap.to(arrow2Ref.current, { xPercent: 0, yPercent: 0, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (containerRef.current) gsap.to(containerRef.current, { backgroundColor: "#E2E2DD", duration: 0.3, ease: "power2.out" });
    if (avatarImgRef.current) gsap.to(avatarImgRef.current, { scale: 1.0, duration: 0.3, ease: "power2.out" });
    if (text1Ref.current) gsap.to(text1Ref.current, { yPercent: 0, duration: 0.3, ease: "power2.out" });
    if (text2Ref.current) gsap.to(text2Ref.current, { yPercent: 100, duration: 0.3, ease: "power2.out" });
    if (arrowBoxRef.current) gsap.to(arrowBoxRef.current, { scale: 1.0, duration: 0.3, ease: "power2.out" });
    if (arrow1Ref.current) gsap.to(arrow1Ref.current, { xPercent: 0, yPercent: 0, duration: 0.3, ease: "power2.out" });
    if (arrow2Ref.current) gsap.to(arrow2Ref.current, { xPercent: -100, yPercent: 100, duration: 0.3, ease: "power2.out" });
  };

  return (
    <Link
      ref={containerRef}
      href="/#contact"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative inline-flex items-center h-[31px] gap-2.5 bg-chalk text-cta-icon rounded-squircle pl-1 pr-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.25)] border border-[#0A0A09]/10 overflow-hidden cursor-pointer select-none"
    >
      {/* Avatar thumbnail */}
      <div
        ref={avatarImgRef}
        className="relative w-[23px] h-[23px] rounded-sm overflow-hidden bg-neutral-800 shrink-0 border border-black/15 will-change-transform"
      >
        <Image
          src={avatarSrc}
          alt="Prastyo Arlan"
          fill
          sizes="23px"
          className="object-cover object-top"
          onError={() => setAvatarSrc("/avatar.jpg")}
        />
      </div>

      {/* Double-Layer Slide-Up Text Container */}
      <div className="relative h-[15px] overflow-hidden flex items-center font-jakarta text-[10.5px] md:text-[11px] font-bold tracking-[0.16em] uppercase">
        {/* Primary Text Layer */}
        <div ref={text1Ref} className="will-change-transform text-cta-icon">
          <span>LET&apos;S TALK</span>
        </div>

        {/* Duplicate Text Layer (Slides in from bottom) */}
        <div
          ref={text2Ref}
          style={{ transform: "translateY(100%)" }}
          className="absolute inset-0 will-change-transform text-cta-icon"
        >
          <span>LET&apos;S TALK</span>
        </div>
      </div>

      {/* Inner Black Box wrapping the Diagonal Arrow */}
      <div
        ref={arrowBoxRef}
        className="relative w-[23px] h-[23px] rounded-sm bg-cta-icon text-chalk flex items-center justify-center overflow-hidden shrink-0 shadow-sm will-change-transform"
      >
        {/* Arrow 1: slides up and out */}
        <div ref={arrow1Ref} className="will-change-transform">
          <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
        </div>

        {/* Arrow 2: slides in from bottom-left */}
        <div
          ref={arrow2Ref}
          style={{ transform: "translate(-100%, 100%)" }}
          className="absolute inset-0 flex items-center justify-center will-change-transform"
        >
          <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
        </div>
      </div>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [avatarSrc, setAvatarSrc] = useState("/avatar.jpg");
  const [scrollSection, setScrollSection] = useState<"work" | "what-i-do" | null>(null);

  // Derive active section directly from pathname or scroll state
  const activeSection: "about" | "work" | "what-i-do" | null =
    pathname === "/about" ? "about" : scrollSection;

  // Track active section on home page based on scroll position
  useEffect(() => {
    if (pathname === "/about") return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const track = document.getElementById("hero-track");
      if (!track) return;

      const maxScroll = track.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = scrollY / maxScroll;

      if (progress < 0.25 || scrollY < 400) {
        setScrollSection(null);
      } else if (progress < 0.65) {
        setScrollSection("work");
      } else {
        setScrollSection("what-i-do");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = useCallback(
    (section: "about" | "work" | "what-i-do") => {
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;

      if (section === "about") {
        if (pathname !== "/about") {
          router.push("/about");
        }
        return;
      }

      if (pathname === "/about") {
        router.push(`/#${section}`);
        return;
      }

      setScrollSection(section);
      const track = document.getElementById("hero-track");
      if (!track) return;
      const maxScroll = track.offsetHeight - window.innerHeight;

      if (section === "work") {
        const targetY = track.offsetTop + maxScroll * 0.36;
        if (lenis) {
          lenis.scrollTo(targetY, { duration: 1.4 });
        } else {
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
        return;
      }

      if (section === "what-i-do") {
        const targetY = track.offsetTop + maxScroll * 0.76;
        if (lenis) {
          lenis.scrollTo(targetY, { duration: 1.6 });
        } else {
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
        return;
      }
    },
    [pathname, router]
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 sm:px-10 lg:px-14 py-4 md:py-6 pointer-events-none flex items-center justify-between select-none">
      {/* Left Spacer */}
      <div className="hidden lg:block w-16 lg:w-24 pointer-events-none" />

      {/* Center-to-Right Nav Cluster */}
      <nav
        aria-label="Main Navigation"
        className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 md:gap-2 md:absolute md:left-[46%] lg:left-[48%] xl:left-[50%] md:-translate-x-0"
      >
        {([
          { id: "about" as const, label: "About" },
          { id: "work" as const, label: "Work" },
          { id: "what-i-do" as const, label: "What I do" },
        ]).map((item) => (
          <NavItem
            key={item.id}
            label={item.label}
            isActive={activeSection === item.id}
            onClick={() => handleNavClick(item.id)}
          />
        ))}
      </nav>

      {/* Far Right: Luxury "LET'S TALK" CTA */}
      <div className="pointer-events-auto flex items-center ml-auto shrink-0 z-10">
        <LetsTalkCta avatarSrc={avatarSrc} setAvatarSrc={setAvatarSrc} />
      </div>
    </header>
  );
}
