"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";

import Contact from "@/components/sections/Contact";
import Websites from "@/components/sections/Websites";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen text-white selection:bg-neon-cyan selection:text-black relative">
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
          <Websites />
          <About />
          <Stats />

          <Contact />
          <Footer />
        </motion.div>
      )}
    </main>
  );
}
