'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TimelineEvent from './TimelineEvent';
import TimeTravelIndicator from './TimeTravelIndicator';

// Filters
const FILTERS = ["All Events", "Concerts", "Sports Finals", "Legacy Moments"];

// Mock Data with Emotional Stats
export const PAST_EVENTS = [
    {
        id: 1,
        year: "2025",
        title: "The Local Train Live",
        description: "An electrifying night where 5000+ students echoed 'Choo Lo'. The stadium shook with pure euphony.",
        type: "Concerts",
        image: "https://images.unsplash.com/photo-1470229722913-7ea051c24efc?w=800&auto=format&fit=crop&q=80",
        quote: "We have never performed for a crowd this loud.",
        stats: { "Crowd Roar Level": "110 dB", "Vibe Meter": "Electric ⚡" }
    },
    {
        id: 2,
        year: "2024",
        title: "Football Finals: JKLU vs IIT",
        description: "A nail-biting penalty shootout that brought the trophy home. Tears, cheers, and glory.",
        type: "Sports Finals",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=60",
        quote: "The final kick that stopped time.",
        stats: { "Adrenaline Rush": "Max", "History Made": "Yes" }
    },
    {
        id: 3,
        year: "2023",
        title: "Sunburn Campus",
        description: "Bass drops, neon lights, and non-stop dancing till dawn. The night the campus didn't sleep.",
        type: "Concerts",
        image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=60",
        quote: "A rave that rewrote the rules.",
        stats: { "Energy Rating": "Unreal 🔥", "Sleep Lost": "All Night" }
    },
    {
        id: 4,
        year: "2022",
        title: "Samay Raina Live",
        description: "Laughter echoed through the campus with Samay's supreme chess jokes. A night of pure comedic genius.",
        type: "Legacy Moments",
        image: "https://images.unsplash.com/photo-1585699324551-f60895011091?auto=format&fit=crop&q=60",
        quote: "I didn't expect checkmate to be this funny.",
        stats: { "Laughter Level": "Roaring 😂", "Rating": "★★★★★" }
    }
];

export default function TimelineContainer() {
    const [activeFilter, setActiveFilter] = useState("All Events");

    const filteredEvents = activeFilter === "All Events"
        ? PAST_EVENTS
        : PAST_EVENTS.filter(e => e.type === activeFilter);

    return (
        <div className="relative w-full min-h-screen py-20 bg-black overflow-hidden">

            <TimeTravelIndicator />

            {/* Atmospheric Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse"></div>
                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                        initial={{ x: Math.random() * 1000, y: Math.random() * 1000 }}
                        animate={{ y: [0, -100, 0], opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, ease: "linear" }}
                    />
                ))}
                {/* Occasional Flash */}
                <motion.div
                    className="absolute inset-0 bg-white mix-blend-overlay z-10"
                    animate={{ opacity: [0, 0.1, 0] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
                />
            </div>

            {/* Filter Bar */}
            <div className="sticky top-24 z-40 flex justify-center gap-4 mb-32 px-4 flex-wrap">
                {FILTERS.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-6 py-2 rounded-full border text-xs uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-md ${activeFilter === filter
                                ? 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan font-bold shadow-[0_0_20px_rgba(0,243,255,0.2)]'
                                : 'bg-black/20 text-gray-500 border-white/10 hover:border-white/30 hover:text-white'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Center Line with Glow */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gray-800 to-transparent transform md:-translate-x-1/2 z-0"></div>
            <motion.div
                className="absolute left-4 md:left-1/2 top-0 h-[50vh] w-[2px] bg-gradient-to-b from-neon-cyan to-transparent transform md:-translate-x-1/2 z-0 shadow-[0_0_20px_#0ef]"
                style={{ position: 'fixed', top: '50vh' }}
            />

            {/* Events List */}
            <div className="container mx-auto px-4 relative z-10">
                <AnimatePresence mode="popLayout">
                    {filteredEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                        >
                            <TimelineEvent event={event} index={index} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="text-center py-20 text-gray-600 text-xs uppercase tracking-[0.5em] pb-40">
                End of Archive
            </div>
        </div>
    );
}
