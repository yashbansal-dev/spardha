"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import SportsMarquee from "@/components/sections/SportsMarquee";
import Story from "@/components/sections/Story";
import Stats from "@/components/sections/Stats";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";

export default function Home() {
  return (
    <main className="min-h-screen text-white selection:bg-neon-cyan selection:text-black relative bg-black">
      <ParallaxBackground />

      <div className="relative z-10">
        <Navbar />

        <Hero />

        <div className="relative z-30">
          <SportsMarquee />
        </div>

        {/* Story Section - Full width cinematic */}
        <Story />

        {/* Stats Section */}
        <Stats />

        {/* Final CTA */}
        <FinalCTA />

        <Footer />
      </div>
    </main>
  );
}
