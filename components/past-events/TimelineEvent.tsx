'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MemoryReplayModal from './MemoryReplayModal';
import { FaPlay } from 'react-icons/fa';

interface TimelineEventProps {
    event: any;
    index: number;
}

export default function TimelineEvent({ event, index }: TimelineEventProps) {
    const [isReplayOpen, setIsReplayOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative group"
            >
                {/* Connector Line to Top (Visual Anchor) */}
                <div className="absolute -top-24 left-8 w-[1px] h-24 bg-gradient-to-b from-transparent to-neon-cyan/50 pointer-events-none"></div>
                <div className="absolute -top-2 left-8 w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_10px_#0ef]"></div>

                <div className="glass-card p-6 border-l-4 border-l-neon-cyan overflow-hidden relative">

                    {/* Holographic BG */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none"></div>

                    {/* Image / Thumbnail Section */}
                    <div
                        className="relative w-full aspect-video rounded-lg overflow-hidden mb-6 cursor-pointer group/image"
                        onClick={() => setIsReplayOpen(true)}
                    >
                        <div className="absolute inset-0 bg-black/20 group-hover/image:bg-transparent transition-colors z-10"></div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 ring-1 ring-neon-cyan/50">
                                <FaPlay className="text-white ml-1" />
                            </div>
                        </div>

                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-3xl font-black italic uppercase text-white leading-none tracking-tighter">
                                {event.title}
                            </h3>
                            <span className="text-4xl font-black text-white/10 font-gang">{event.year}</span>
                        </div>

                        <p className="text-gray-400 text-sm mb-6 border-l-2 border-white/10 pl-3">
                            {event.quote}
                        </p>

                        <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                            {event.description}
                        </p>

                        {/* Stats Row */}
                        <div className="flex gap-4 border-t border-white/10 pt-4">
                            {Object.entries(event.stats).map(([key, value]) => (
                                <div key={key} className="flex-1">
                                    <div className="text-[9px] text-neon-cyan uppercase tracking-widest mb-1">{key}</div>
                                    <div className="text-white font-bold font-mono text-sm shadow-neon">{value as string}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            <MemoryReplayModal
                isOpen={isReplayOpen}
                onClose={() => setIsReplayOpen(false)}
                event={event}
            />
        </>
    );
}
