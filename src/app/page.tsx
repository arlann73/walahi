import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />
      {/* Wrapper to handle sticky Hero and overlapping sections */}
      <div className="relative w-full">
        
        {/* Sticky Hero Container */}
        <div className="sticky top-0 h-[100dvh] w-full z-0 overflow-hidden">
          <HeroSection />
        </div>
        
        {/* Next Sections (Slide up over the Hero) */}
        <div className="relative z-10 w-full bg-background min-h-[100vh] flex items-center justify-center border-t border-white/5 shadow-2xl">
          <p className="text-secondary font-mono tracking-widest text-[11px] uppercase">
            Phase 2 Begins Here
          </p>
        </div>
        
      </div>
    </main>
  );
}
