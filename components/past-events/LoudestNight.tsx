'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LoudestNight() {
    return (
        <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden my-32">

            {/* Background Image Parallax (Simulated via fixed attachment or translate) */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <motion.img
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 10, ease: "linear" }}
                    src="https://images.unsplash.com/photo-1470229722913-7ea051c24efc?w=1600&auto=format&fit=crop&q=80"
                    className="w-full h-full object-cover"
                    alt="Concert Crowd"
                />
            </div>

            <div className="relative z-20 text-center max-w-5xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-6xl md:text-9xl font-black italic uppercase text-white leading-none tracking-tighter mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                        THE LOUDEST<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-neon-cyan to-blue-600">NIGHT</span>
                    </h2>

                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="bg-red-600 text-white font-bold text-xs px-3 py-1 rounded animate-pulse">RECORD BREAKING</div>
                        <div className="bg-white/10 backdrop-blur text-white font-bold text-xs px-3 py-1 rounded">128 DECIBELS</div>
                    </div>

                    <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                        "The ground shook. The voices became one. A moment of pure, unbridled energy that defined a generation."
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
