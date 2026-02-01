'use client';

import React from 'react';
import { motion } from 'framer-motion';
import StatCounter from './StatCounter';
import { FaTrophy } from 'react-icons/fa';

interface Props {
    event: any;
    index: number;
}

export default function EventCard({ event, index }: Props) {
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ type: "spring", bounce: 0.4 }}
            className={`absolute w-full md:w-[500px] ${isLeft ? 'left-4 md:left-[10%]' : 'right-4 md:right-[10%]'} top-0`}
        >
            <div className="relative bg-black/80 border border-neon-cyan/50 backdrop-blur-xl p-6 rounded-2xl shadow-[0_0_50px_rgba(0,243,255,0.2)] overflow-hidden">
                {/* Holographic Scanline */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,243,255,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>

                <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <span className="text-neon-cyan font-mono font-bold text-lg">LAP {index + 1}: {event.year}</span>
                        <FaTrophy className="text-yellow-400 text-xl" />
                    </div>

                    <h3 className="text-2xl font-black italic uppercase text-white leading-none">
                        {event.title}
                    </h3>

                    <div className="h-32 w-full rounded-lg overflow-hidden relative">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-neon-cyan/20 mix-blend-overlay"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-white/5 p-3 rounded-lg border border-white/5">
                        {Object.entries(event.stats).map(([key, value]) => (
                            <div key={key}>
                                <div className="text-[10px] text-gray-400 uppercase tracking-wider">{key}</div>
                                <div className="text-white font-bold text-sm truncate">{value as string}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Connector Line */}
                <div className={`absolute top-1/2 w-20 h-[1px] bg-neon-cyan ${isLeft ? '-right-20' : '-left-20'} hidden md:block`}></div>
                <div className={`absolute top-1/2 w-2 h-2 bg-neon-cyan rounded-full ${isLeft ? '-right-22' : '-left-22'} shadow-[0_0_10px_#0ef] hidden md:block`}></div>
            </div>
        </motion.div>
    );
}
