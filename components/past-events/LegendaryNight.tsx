'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function LegendaryNight() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

    return (
        <section ref={ref} className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center my-32">

            {/* Parallax Background */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0 bg-cover bg-center"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5 }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black"></div>
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 text-center px-4 max-w-4xl mx-auto"
            >
                <div className="text-neon-cyan text-sm uppercase tracking-[0.5em] mb-4 font-bold">Featured Highlight</div>
                <h2 className="text-5xl md:text-8xl font-black italic uppercase text-white mb-6 drop-shadow-2xl">
                    THE NIGHT <br /> OF LEGENDS
                </h2>
                <div className="w-24 h-1 bg-neon-cyan mx-auto mb-8 shadow-[0_0_20px_#0ef]"></div>
                <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed max-w-2xl mx-auto">
                    "The energy was unlike anything we've ever seen.
                    A moment where time stood still and history was written."
                </p>
            </motion.div>
        </section>
    );
}
