"use client";

import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-canvas text-chalk relative flex flex-col justify-between selection:bg-section-accent selection:text-white">
      {/* Global Navigation Header */}
      <Navbar />

      {/* Placeholder container for future About Me design */}
      <section className="flex-1 w-full max-w-[1740px] mx-auto px-6 sm:px-10 lg:px-14 pt-28 sm:pt-32 pb-16 flex flex-col items-center justify-center">
        {/* Intentionally blank canvas ready for upcoming design */}
      </section>
    </main>
  );
}
