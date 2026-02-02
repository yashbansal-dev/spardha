'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import TimelineEvent from './TimelineEvent';
import ChronoGuide from './ChronoGuide';

// Filters
const FILTERS = ["All Events", "Concerts", "Sports Finals", "Legacy Moments"];

// Mock Data
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
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Horizontal Scroll Logic
    // We map vertical scroll (0 to 1) to horizontal movement (-1% to -95%)
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    // Parallax Layers
    const yearX = useTransform(scrollYProgress, [0, 1], ["10%", "-120%"]); // Moves faster
    const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]); // Moves slower

    const [activeFilter, setActiveFilter] = useState("All Events");
    const filteredEvents = activeFilter === "All Events"
        ? PAST_EVENTS
        : PAST_EVENTS.filter(e => e.type === activeFilter);

    // Provide progress to guide
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        return scrollYProgress.on("change", (latest) => setProgress(latest));
    }, [scrollYProgress]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-black">
            {/* 400vh height ensures enough scroll space */}

            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Background Parallax Layer */}
                <motion.div style={{ x: bgX }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
                </motion.div>

                {/* Filter Bar */}
                <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 flex gap-4">
                    {FILTERS.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all duration-300 border backdrop-blur-md ${activeFilter === filter
                                ? 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                                : 'bg-black/40 text-gray-500 border-white/5 hover:border-white/20 hover:text-white'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Giant Parallax Years Background */}
                <motion.div style={{ x: yearX }} className="absolute top-1/2 -translate-y-1/2 flex gap-[50vw] left-[10vw] z-0 pointer-events-none">
                    {PAST_EVENTS.map(event => (
                        <div key={event.id} className="text-[20vw] font-black text-white/5 whitespace-nowrap font-gang leading-none">
                            {event.year}
                        </div>
                    ))}
                </motion.div>

                {/* Horizontal Cards Container */}
                <motion.div style={{ x }} className="flex gap-[40vw] pl-[10vw] pr-[50vw] relative z-10 items-center">
                    {filteredEvents.map((event, index) => (
                        <div key={event.id} className="relative w-[80vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0">
                            <TimelineEvent event={event} index={index} />
                        </div>
                    ))}

                    {/* End Marker */}
                    <div className="flex-shrink-0 text-gray-700 font-mono tracking-widest text-xl rotate-90">
                        // END OF ARCHIVE
                    </div>
                </motion.div>

                {/* Guide at Bottom */}
                <ChronoGuide years={PAST_EVENTS.map(e => e.year)} progress={progress} />
            </div>
        </section>
    );
}
