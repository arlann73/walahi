"use client";

import Navbar from "@/components/Navbar";
import AboutPortfolioSection from "@/components/sections/AboutPortfolioSection";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-[#121214] text-[#F9F4EB] selection:bg-white selection:text-black relative">
      <Navbar />
      <div className="pt-16 sm:pt-20">
        <AboutPortfolioSection />
      </div>
    </main>
  );
}
