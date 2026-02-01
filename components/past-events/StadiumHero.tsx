'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function StadiumHero() {
    return (
        <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black">
            {/* Background Image - Blurred Stadium Crowd */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-10" />
                <img
                    src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80"
                    alt="Stadium Crowd"
                    className="w-full h-full object-cover opacity-60 blur-sm scale-110"
                />
            </div>

            {/* Floodlights Effect */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-neon-cyan/20 to-transparent opacity-50 z-20 pointer-events-none" style={{ maskImage: 'radial-gradient(circle at 50% 0%, black, transparent 70%)' }}></div>
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-white/30 blur-[100px] rounded-full z-20 pointer-events-none animate-pulse"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-white/30 blur-[100px] rounded-full z-20 pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Hero Text */}
            <div className="relative z-30 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] uppercase">
                        SPARDHA LEGACY
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex items-center justify-center gap-4 mb-12"
                >
                    <div className="h-[1px] w-12 bg-neon-cyan"></div>
                    <p className="text-xl md:text-2xl text-gray-300 font-light tracking-[0.3em] uppercase">
                        Moments that shook the ground
                    </p>
                    <div className="h-[1px] w-12 bg-neon-cyan"></div>
                </motion.div>

                {/* Animated Stats */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-20">
                    {[
                        { label: "PARTICIPANTS", value: "10,000+" },
                        { label: "CHAMPIONS", value: "50+" },
                        { label: "YEARS OF GLORY", value: "05" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + (i * 0.2) }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-6xl font-black font-mono text-neon-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.6)] mb-1">
                                {stat.value}
                            </div>
                            <div className="text-xs md:text-sm text-gray-400 font-bold tracking-widest uppercase">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Scroll Cue */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
            >
                <div className="text-[10px] uppercase tracking-widest text-gray-500">Scroll for Kickoff</div>
                <div className="w-[1px] h-12 bg-gradient-to-b from-neon-cyan to-transparent"></div>
            </motion.div>
        </div>
    );
}
