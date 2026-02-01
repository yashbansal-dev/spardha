'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StatCounter from './StatCounter';
import MemoryReplayModal from './MemoryReplayModal';
import { FaPlay } from 'react-icons/fa';

interface TimelineEventProps {
    event: any;
    index: number;
}

export default function TimelineEvent({ event, index }: TimelineEventProps) {
    const [isReplayOpen, setIsReplayOpen] = useState(false);
    const isLeft = index % 2 === 0;

    return (
        <>
            <div className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-20 mb-48 relative ${isLeft ? '' : 'md:flex-row-reverse'}`}>

                {/* Center Dot with Pulse */}
                <div className="absolute left-4 md:left-1/2 top-1/2 -translate-y-1/2 w-4 h-4 z-20 transform md:-translate-x-1/2 flex items-center justify-center">
                    <div className="w-full h-full bg-neon-cyan rounded-full shadow-[0_0_20px_#0ef]"></div>
                    <div className="absolute w-12 h-12 bg-neon-cyan/20 rounded-full animate-ping"></div>
                </div>

                {/* Content Side */}
                <motion.div
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 w-full md:text-right pl-12 md:pl-0"
                >
                    <div className={`flex flex-col ${isLeft ? 'md:items-end' : 'md:items-start'}`}>
                        <div className="text-neon-cyan font-mono font-bold text-xl mb-2 tracking-widest">{event.year}</div>
                        <h2 className={`text-4xl md:text-6xl font-black uppercase italic text-white mb-6 leading-none tracking-tighter ${isLeft ? 'text-right' : 'text-left'}`}>
                            {event.title}
                        </h2>
                        <div className={`w-20 h-1 bg-gradient-to-r from-neon-cyan to-transparent mb-8 ${isLeft ? '' : 'rotate-180'}`}></div>
                        <p className={`text-gray-400 text-lg mb-8 max-w-md ${isLeft ? 'text-right' : 'text-left'}`}>
                            {event.description}
                        </p>

                        {/* Emotional Stats Grid */}
                        <div className={`grid grid-cols-2 gap-8 ${isLeft ? 'justify-items-end' : 'justify-items-start'}`}>
                            {Object.entries(event.stats).map(([key, value]) => (
                                <div key={key} className={`flex flex-col ${isLeft ? 'items-end' : 'items-start'}`}>
                                    <div className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-1">{key}</div>
                                    <StatCounter value={value as string} />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Cinematic Memory Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: 'grayscale(100%) blur(5px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'grayscale(0%) blur(0px)' }}
                    whileHover={{ scale: 1.02 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 w-full pl-12 md:pl-0"
                    onClick={() => setIsReplayOpen(true)}
                >
                    <div className="relative group overflow-hidden rounded-md border-y border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.8)] cursor-pointer aspect-video bg-black">
                        {/* Film Grain & Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none z-20"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>

                        {/* Play Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex gap-2 items-center bg-neon-cyan text-black px-6 py-2 font-bold uppercase tracking-widest text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                <FaPlay className="text-xs" /> Replay Moment
                            </div>
                        </div>

                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                        />

                        {/* Cinematic Bars */}
                        <div className="absolute top-0 left-0 w-full h-[10%] bg-black z-20 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-full h-[10%] bg-black z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    </div>
                </motion.div>
            </div>

            <MemoryReplayModal
                isOpen={isReplayOpen}
                onClose={() => setIsReplayOpen(false)}
                event={event}
            />
        </>
    );
}
