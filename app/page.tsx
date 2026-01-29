"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Events from "@/components/sections/Events"; // Replaced Websites
import Story from "@/components/sections/Story";
import VideoStrip from "@/components/sections/VideoStrip";
import Stats from "@/components/sections/Stats";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen text-white selection:bg-neon-cyan selection:text-black relative bg-[#020617]">
      <ParallaxBackground />

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <Navbar />

          <Hero />

          {/* Diagonal Transition Wrapper for Events */}
          <div className="relative z-20 -mt-20">
            <div className="absolute inset-x-0 -top-20 h-40 bg-[#020617] clip-path-polygon-[0_100%,_100%_0,_100%_100%,_0_100%] z-10"></div>
            {/* Note: Events has its own padding/bg */}
            <Events />
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
        </motion.div>
      )}
    </main>
  );
}
