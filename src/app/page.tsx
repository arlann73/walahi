import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import JourneyTimelineSection from "@/components/sections/JourneyTimelineSection";

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
        
        {/* Sections that slide up over the Hero */}
        <div className="relative z-10 w-full shadow-2xl">
          <AboutSection />
          <JourneyTimelineSection />
        </div>
        
      </div>
    </main>
  );
}
