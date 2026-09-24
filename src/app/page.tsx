"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import Preloader from "@/components/Preloader";
import FieldLogModal from "@/components/FieldLogModal";

export default function Home() {
  const [is3DReady, setIs3DReady] = useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isFieldLogOpen, setIsFieldLogOpen] = useState(false);
  const [activeFieldLogId, setActiveFieldLogId] = useState("undergraduate-researcher");
  const navbarWrapRef = useRef<HTMLDivElement>(null);

  // Hash listener to open/close Field Log modal without page reload
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#field-log") || hash.startsWith("#experience")) {
        setIsFieldLogOpen(true);
        // Extract job slug if present: #field-log?job=geological-engineering
        if (hash.includes("?job=")) {
          const jobId = hash.split("?job=")[1]?.split("&")[0];
          if (jobId) {
            setActiveFieldLogId(jobId);
          }
        }
      } else {
        setIsFieldLogOpen(false);
      }
    };

    handleHashSync();
    window.addEventListener("hashchange", handleHashSync);
    return () => window.removeEventListener("hashchange", handleHashSync);
  }, []);

  const handleCloseFieldLog = useCallback(() => {
    setIsFieldLogOpen(false);
    if (window.location.hash.startsWith("#field-log") || window.location.hash.startsWith("#experience")) {
      // Clear hash cleanly without causing scroll jumping or reloads
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  const handleSelectFieldLogJob = useCallback((id: string) => {
    setActiveFieldLogId(id);
    history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#field-log?job=${id}`
    );
  }, []);

  const isNavbarVisible = isPreloaderDone;

  useEffect(() => {
    if (!navbarWrapRef.current) return;
    if (isNavbarVisible) {
      gsap.to(navbarWrapRef.current, {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
        onStart: () => {
          if (navbarWrapRef.current) {
            navbarWrapRef.current.style.pointerEvents = "auto";
          }
        },
      });
    } else {
      gsap.set(navbarWrapRef.current, {
        opacity: 0,
      });
      navbarWrapRef.current.style.pointerEvents = "none";
    }
  }, [isNavbarVisible]);

  return (
    <main
      suppressHydrationWarning
      className="flex min-h-screen flex-col bg-canvas selection:bg-section-accent selection:text-white"
    >
      {/* Fullscreen Pixel Dispersion Preloader */}
      <Preloader
        is3DReady={is3DReady}
        onComplete={() => setIsPreloaderDone(true)}
      />

      {/* Fixed Navigation & Global Header (z-50) — Full Theater Mode during Opening Credit Film */}
      <div
        ref={navbarWrapRef}
        className="opacity-0 pointer-events-none"
      >
        <Navbar />
      </div>

      {/* Hero, Opening Credits Film, Featured Work & What I Do Scroll Track */}
      <div id="hero-track" className="relative w-full h-[700vh] z-30">
        {/* Sticky 100dvh Hero Stage */}
        <div className="sticky top-0 h-[100dvh] w-full z-0 overflow-hidden">
          <HeroSection
            on3DReady={() => setIs3DReady(true)}
            isPreloaderDone={isPreloaderDone}
          />
        </div>
      </div>

      {/* Fullscreen Field Log Modal (Reference Section / Pitchdeck) */}
      <FieldLogModal
        isOpen={isFieldLogOpen}
        activeId={activeFieldLogId}
        onClose={handleCloseFieldLog}
        onSelectJob={handleSelectFieldLogJob}
      />
    </main>
  );
}
