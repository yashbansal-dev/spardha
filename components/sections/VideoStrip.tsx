'use client';

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function VideoStrip() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax for the video/background
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

    return (
        <section ref={containerRef} className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center bg-black my-20">

            {/* Parallax Container */}
            <motion.div
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
                style={{ y }}
            >
                {/* 
                  Video Background:
                  Replace 'src' with your actual video file path. 
                  Using a placeholder or a static image fallback if video fails.
                */}
                <video
                    className="w-full h-full object-cover opacity-60"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/assets/athlete-action.png" // Fallback image
                >
                    <source src="/assets/promo-video.mp4" type="video/mp4" />
                    {/* Fallback if video missing */}
                    <div className="absolute inset-0 bg-neutral-900"></div>
                </video>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 mix-blend-overlay">
                <motion.h2
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-9xl font-black uppercase text-white tracking-widest leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                >
                    Feel The
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 block mt-2">
                        Adrenaline
                    </span>
                </motion.h2>
            </div>

            {/* Diagonal Lines Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-20 pointer-events-none"></div>

        </section>
    );
}
