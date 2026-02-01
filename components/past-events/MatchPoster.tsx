'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Props {
    event: any;
    index: number;
}

export default function MatchPoster({ event, index }: Props) {
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ type: "spring", bounce: 0.3 }}
            className={`flex flex-col md:flex-row gap-8 items-center w-full max-w-6xl mx-auto mb-32 ${isLeft ? '' : 'md:flex-row-reverse'}`}
        >
            {/* Poster Image Section */}
            <div className="flex-1 w-full group perspective-1000 relative">
                <div className="relative overflow-hidden rounded-xl bg-[#0a0a0a] border-4 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transform transition-transform duration-500 group-hover:bg-white/5">

                    {/* Corner Tickets/Accents */}
                    <div className="absolute top-4 left-4 z-20 bg-neon-cyan text-black font-black uppercase text-xs px-3 py-1 -rotate-2 shadow-lg">
                        MATCH DAY
                    </div>
                    <div className="absolute bottom-4 right-4 z-20 bg-white text-black font-mono font-bold text-lg px-4 py-2 rotate-2 shadow-lg">
                        {event.year}
                    </div>

                    <div className="relative aspect-[3/4] md:aspect-[4/3] overflow-hidden">
                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                        {/* Title Overlay on Image */}
                        <div className="absolute bottom-8 left-8 right-8 z-10">
                            <h2 className="text-4xl md:text-5xl font-black italic uppercase text-white leading-none mb-2 drop-shadow-2xl">
                                {event.title}
                            </h2>
                            <div className="h-1 w-20 bg-neon-cyan mb-4"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scoreboard Stats Section */}
            <div className="flex-1 w-full md:pl-12">
                <div className="bg-[#111] border border-white/10 rounded-xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                    {/* Scoreboard Grid Effect */}
                    <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03]"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-end mb-8 border-b-2 border-white/10 pb-4">
                            <span className="text-gray-500 text-sm uppercase tracking-widest font-bold">MATCH STATS</span>
                            <span className="text-neon-cyan text-xs font-mono">LIVE FEED /// ARCHIVE</span>
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                            {event.description}
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            {Object.entries(event.stats).map(([key, value]) => (
                                <div key={key} className="bg-black/50 p-4 border border-white/5 rounded">
                                    <div className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-1">{key}</div>
                                    <div className="font-mono font-bold text-2xl text-white tracking-tight tabular-nums text-shadow-glow">
                                        {value as string}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
