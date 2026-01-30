"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import SportsMarquee from "@/components/sections/SportsMarquee";
import Story from "@/components/sections/Story";
import VideoStrip from "@/components/sections/VideoStrip";
import Stats from "@/components/sections/Stats";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";

export default function Home() {
  return (
    <main className="min-h-screen text-white selection:bg-neon-cyan selection:text-black relative bg-[#020617]">
      <ParallaxBackground />

      <div className="relative z-10">
        <Navbar />

        <Hero />

        <div className="relative z-30">
          <SportsMarquee />
        </div>

        {/* Story Section - Full width cinematic */}
        <Story />

        {/* Video Strip - Angled Cut */}
        <div className="relative z-20 py-10 overflow-hidden">
          <div className="origin-left transform -skew-y-2">
            <VideoStrip />
          </div>
        </div>

        {/* Stats Section */}
        <Stats />

        {/* Final CTA */}
        <FinalCTA />

        <Footer />
      </div>
    </main>
  );
}
