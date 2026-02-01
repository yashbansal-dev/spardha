'use client';

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function VideoStrip() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section ref={containerRef} className="relative h-[70vh] w-full overflow-hidden bg-black flex items-center justify-center border-y-4 border-neon-cyan/20">

            {/* HUD Overlays - Tactical Drone View */}
            <div className="absolute inset-0 z-30 pointer-events-none p-8">
                {/* REC Indicator */}
                <div className="absolute top-8 left-8 flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-600 animate-pulse box-shadow-[0_0_10px_red]"></div>
                    <span className="font-mono text-red-500 font-bold tracking-widest text-sm">REC</span>
                    <span className="font-mono text-white/50 text-xs ml-4">00:04:23:12</span>
                </div>

                {/* Crosshairs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/20 rounded-full flex items-center justify-center">
                    <div className="w-1 h-4 bg-neon-cyan/80 absolute top-0 -translate-y-1/2"></div>
                    <div className="w-1 h-4 bg-neon-cyan/80 absolute bottom-0 translate-y-1/2"></div>
                    <div className="w-4 h-1 bg-neon-cyan/80 absolute left-0 -translate-x-1/2"></div>
                    <div className="w-4 h-1 bg-neon-cyan/80 absolute right-0 translate-x-1/2"></div>
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                </div>

                {/* Frame Corners */}
                <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/20"></div>
                <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/20"></div>
                <div className="absolute bottom-8 right-8 font-mono text-xs text-neon-cyan/60 text-right">
                    ISO 800 <br />
                    F/2.8 <br />
                    DRONE_FEED_04
                </div>
            </div>

            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_1px] opacity-60"></div>

            {/* Video Container with Parallax & Glitch Skew */}
            <motion.div
                className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-80 mix-blend-screen"
                style={{ y }}
            >
                <video
                    className="w-full h-full object-cover grayscale contrast-125 brightness-75"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/assets/athlete-action.png"
                >
                    <source src="/assets/promo-video.mp4" type="video/mp4" />
                </video>
            </motion.div>

            {/* Main Text Content */}
            <div className="relative z-40 text-center mix-blend-overlay">
                <motion.h2
                    initial={{ scale: 0.9, opacity: 0, letterSpacing: "0.5em" }}
                    whileInView={{ scale: 1, opacity: 1, letterSpacing: "0.2em" }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="text-5xl md:text-9xl font-black uppercase text-white leading-none tracking-widest ml-4 drop-shadow-[4px_4px_0px_rgba(0,255,255,0.4)]"
                >
                    ADRENALINE
                </motion.h2>
                <p className="font-mono text-sm md:text-lg text-neon-orange mt-4 uppercase tracking-[0.5em] bg-black/50 inline-block px-4 py-1 border border-neon-orange/30">
                    // RAW_UNFILTERED_ACTION
                </p>
            </div>

        </section>
    );
}

