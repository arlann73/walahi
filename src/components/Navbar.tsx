"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import type Lenis from "lenis";
import PitchdeckWidget from "@/components/deck/PitchdeckWidget";

function NavItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  const bgRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (bgRef.current && textRef.current) {
      gsap.to(bgRef.current, { scaleX: 1, duration: 0.5, ease: "power2.out" });
      gsap.to(textRef.current, { opacity: 1, duration: 0.2 });
    }
  };

  const handleMouseLeave = () => {
    if (bgRef.current && textRef.current) {
      gsap.to(bgRef.current, { scaleX: 0, duration: 0.4, ease: "power2.inOut" });
      gsap.to(textRef.current, { opacity: 0.6, duration: 0.2 });
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
      {/* Soft Warm-Charcoal Shadow Background - GSAP animated on hover */}
      <span
        ref={bgRef}
        aria-hidden="true"
        style={{ transform: "scaleX(0)", transformOrigin: "left" }}
        className="absolute inset-0 rounded-sm bg-nav-hover border border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.35)] pointer-events-none"
      />

      {/* Stationary Text - GSAP opacity animated on hover */}
      <span
        ref={textRef}
        className="relative z-10 block text-subtitle-2 font-medium leading-none select-none py-0.5 text-chalk"
        style={{ opacity: 0.6 }}
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
  const textContainerRef = useRef<HTMLDivElement>(null);
  const arrowBoxRef = useRef<HTMLDivElement>(null);
  const arrow1Ref = useRef<HTMLDivElement>(null);
  const arrow2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (arrow2Ref.current) {
      gsap.set(arrow2Ref.current, { xPercent: -100, yPercent: 100 });
    }
    if (textContainerRef.current) {
      gsap.set(textContainerRef.current, { yPercent: 0 });
    }
  }, []);

  const handleMouseEnter = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        backgroundColor: "#D8D8D2",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (avatarImgRef.current) {
      gsap.to(avatarImgRef.current, {
        scale: 1.08,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (textContainerRef.current) {
      gsap.to(textContainerRef.current, {
        yPercent: -50,
        duration: 0.32,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (arrowBoxRef.current) {
      gsap.to(arrowBoxRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (arrow1Ref.current) {
      gsap.to(arrow1Ref.current, {
        xPercent: 100,
        yPercent: -100,
        duration: 0.32,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (arrow2Ref.current) {
      gsap.to(arrow2Ref.current, {
        xPercent: 0,
        yPercent: 0,
        duration: 0.32,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        backgroundColor: "#E2E2DD",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (avatarImgRef.current) {
      gsap.to(avatarImgRef.current, {
        scale: 1.0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (textContainerRef.current) {
      gsap.to(textContainerRef.current, {
        yPercent: 0,
        duration: 0.28,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (arrowBoxRef.current) {
      gsap.to(arrowBoxRef.current, {
        scale: 1.0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (arrow1Ref.current) {
      gsap.to(arrow1Ref.current, {
        xPercent: 0,
        yPercent: 0,
        duration: 0.28,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (arrow2Ref.current) {
      gsap.to(arrow2Ref.current, {
        xPercent: -100,
        yPercent: 100,
        duration: 0.28,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  return (
    <Link
      ref={containerRef}
      href="/#contact"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex items-center justify-between w-full h-[31px] bg-chalk text-cta-icon rounded-squircle pl-1 pr-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.25)] border border-[#0A0A09]/10 overflow-hidden cursor-pointer select-none"
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

      {/* Double-Layer Slide-Up Text Container (15px window with 2 identical 15px spans) */}
      <div className="relative h-[15px] overflow-hidden flex flex-col justify-start px-1">
        <div ref={textContainerRef} className="flex flex-col will-change-transform">
          <span className="h-[15px] flex items-center justify-center font-mono text-mono-label tracking-mono-bracket text-mono-center font-bold uppercase leading-none text-cta-icon whitespace-nowrap">
            LET&apos;S TALK
          </span>
          <span className="h-[15px] flex items-center justify-center font-mono text-mono-label tracking-mono-bracket text-mono-center font-bold uppercase leading-none text-cta-icon whitespace-nowrap">
            LET&apos;S TALK
          </span>
        </div>
      </div>

      {/* Inner Black Box wrapping the Diagonal Arrow */}
      <div
        ref={arrowBoxRef}
        className="relative w-[23px] h-[23px] rounded-sm bg-cta-icon text-chalk flex items-center justify-center overflow-hidden shrink-0 shadow-sm will-change-transform"
      >
        {/* Arrow 1: slides up and out */}
        <div ref={arrow1Ref} className="absolute inset-0 flex items-center justify-center will-change-transform">
          <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
        </div>

        {/* Arrow 2: slides in from bottom-left */}
        <div
          ref={arrow2Ref}
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

  const handleNavClick = useCallback(
    (section: "about" | "work" | "what-i-do") => {
      if (pathname !== "/") {
        router.push(`/#${section}`);
        return;
      }

      const track = document.getElementById("hero-track");
      if (!track) return;
      const maxScroll = track.offsetHeight - window.innerHeight;
      const rideAlong = document.getElementById("work-ride-along");
      const travelDistance = rideAlong
        ? Math.max(2600, rideAlong.scrollHeight - window.innerHeight + 120)
        : 3400;

      let targetP = 0.35;
      if (section === "about") {
        targetP = 0.35;
      } else if (section === "work") {
        const workEl = document.getElementById("work");
        const offset = workEl ? workEl.offsetTop : 1100;
        const deepP = Math.min(1.0, Math.max(0, offset / travelDistance));
        targetP = 0.35 + deepP * 0.65;
      } else if (section === "what-i-do") {
        const whatEl = document.getElementById("what-i-do");
        const offset = whatEl ? whatEl.offsetTop : 2800;
        const deepP = Math.min(1.0, Math.max(0, offset / travelDistance));
        targetP = 0.35 + deepP * 0.65;
      }

      const targetY = track.offsetTop + maxScroll * targetP;
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;

      if (lenis) {
        lenis.scrollTo(targetY, { duration: 1.5 });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    },
    [pathname, router]
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 sm:px-10 lg:px-14 py-4 md:py-6 pointer-events-none flex items-start justify-between select-none">
      {/* Left Spacer */}
      <div className="hidden lg:block w-16 lg:w-24 pointer-events-none" />

      {/* Center-to-Right Nav Cluster */}
      <nav
        aria-label="Main Navigation"
        className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 md:gap-2 md:absolute md:left-[46%] lg:left-[48%] xl:left-[50%] md:-translate-x-0 pt-0.5"
      >
        {([
          { id: "about" as const, label: "About" },
          { id: "work" as const, label: "Work" },
          { id: "what-i-do" as const, label: "What I do" },
        ]).map((item) => (
          <NavItem
            key={item.id}
            label={item.label}
            onClick={() => handleNavClick(item.id)}
          />
        ))}
      </nav>

      {/* Far Right: Luxury "LET'S TALK" CTA & Floating Pitchdeck Card Stack (160px width) */}
      <div className="pointer-events-auto flex flex-col items-end gap-2.5 ml-auto shrink-0 z-10 w-[160px]">
        <LetsTalkCta avatarSrc={avatarSrc} setAvatarSrc={setAvatarSrc} />
        {pathname === "/" && <PitchdeckWidget />}
      </div>
    </header>
  );
}
