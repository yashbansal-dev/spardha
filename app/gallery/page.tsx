'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Navbar from '@/components/Navbar';

// Reuse existing image arrays
const images2024 = [
    "https://images.unsplash.com/photo-1574629810360-7efbbe4384d4?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=80",
];

const images2023 = [
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&auto=format&fit=crop&q=60",
];

export default function Gallery() {
    const [activeYear, setActiveYear] = useState<'2024' | '2023'>('2024');
    const [activeIndex, setActiveIndex] = useState(2); // Start in the middle
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    const images = activeYear === '2024' ? images2024 : images2023;

    // --- Logic ---

    // Circular Index Handling
    const getWrappedIndex = useCallback((index: number) => {
        return (index + images.length) % images.length;
    }, [images.length]);

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1));
    }, []);

    const prevSlide = useCallback(() => {
        setActiveIndex((prev) => (prev - 1));
    }, []);

    // Scroll Handler
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Prevent default page scrolling
            e.preventDefault();
            e.stopPropagation();

            if (isScrolling) return;

            // Threshold to avoid super sensitive scroll
            if (Math.abs(e.deltaY) < 30) return;

            setIsScrolling(true);

            if (e.deltaY > 0) {
                nextSlide();
            } else {
                prevSlide();
            }

            // Debounce/Throttle
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
                setIsScrolling(false);
            }, 400); // 400ms delay as requested
        };

        // Add non-passive listener to cancel scroll
        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, [isScrolling, nextSlide, prevSlide]);

    // Position Calculation (Semicircle Arc)
    const getCardStyle = (index: number) => {
        // Calculate offset from active index
        // We want the carousel to feel infinite, but for positioning we need relative distance
        // Since we are incrementing activeIndex infinitely, we calculate relative diff
        const diff = index - activeIndex;

        // We only render a certain window of items, or we render all but strictly position them
        // Let's position all based on their circular distance relative to the "center" visible slot?
        // Actually, allowing activeIndex to go unbounded makes dragging simpler, but we need modulo for the image source.
        // But for the arc, we want index 0 to follow index N-1.

        // Let's try a different approach:
        // We calculate the "visual" index relative to the center.

        // Find the shortest distance in the circle
        // This is a standard ring buffer distance problem.
        const total = images.length;
        // Normalized active index 0..total-1
        const normalizedActive = ((activeIndex % total) + total) % total;

        let offset = index - normalizedActive;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        // CONSTANTS for Arc
        const RADIUS = 800; // Large radius for subtle curve
        const ANGLE_STEP = 15; // Degrees between cards

        const angleDeg = offset * ANGLE_STEP;
        const angleRad = (angleDeg * Math.PI) / 180;

        // X position: along the sine wave
        const x = RADIUS * Math.sin(angleRad);
        // Z position: along the cosine wave (depth) - Offset to bring center to 0
        const z = RADIUS * Math.cos(angleRad) - RADIUS;

        // Y position: slight curve down for outer items? Or just flat arc?
        // User asked for "Semicircle Image Layout (Arc / Radial Carousel)"
        // Typically this implies X/Z plane curve, maybe slight Y drop if it's "deck" style.
        // Let's effectively rotate them around a center point far behind the screen.

        return {
            x,
            z: z, // Center is 0, others are negative (farther away)
            opacity: Math.max(0, 1 - Math.abs(offset) * 0.2), // Fade out further items
            rotateY: -angleDeg, // Rotate to face inward/outward
            scale: Math.max(0, 1 - Math.abs(offset) * 0.1),
            zIndex: 100 - Math.abs(Math.round(offset)), // Center on top
            display: Math.abs(offset) > 3 ? 'none' : 'block' // Optimize rendering
        };
    };

    return (
        <main className="h-screen w-screen bg-black relative overflow-hidden flex flex-col items-center">
            {/* Force No Scroll - can also be done in global css but this ensures structure */}
            <style jsx global>{`
                body { overflow: hidden; }
            `}</style>

            <Navbar />

            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Deep Space Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950 via-[#020617] to-black"></div>
                {/* Stars/Dust */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 mix-blend-soft-light"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center py-10">

                {/* Header Section */}
                <div className="text-center mb-8 relative z-20">
                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 tracking-[0.2em] uppercase drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                        Gallery
                    </h1>

                    {/* Year Toggle */}
                    <div className="flex items-center justify-center gap-6 mt-8">
                        {['2024', '2023'].map((year) => (
                            <button
                                key={year}
                                onClick={() => setActiveYear(year as '2024' | '2023')}
                                className={`
                                    relative px-6 py-2 rounded-full font-bold text-sm tracking-wider transition-all duration-300
                                    ${activeYear === year
                                        ? 'text-black bg-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.6)] scale-110'
                                        : 'text-gray-500 hover:text-white border border-white/10 hover:border-white/30'}
                                `}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3D Arc Carousel */}
                <div className="flex-grow w-full relative perspective-[1200px] flex items-center justify-center top-10">
                    <div className="relative w-[300px] h-[450px] preserve-3d">
                        <AnimatePresence>
                            {images.map((src, i) => {
                                const style = getCardStyle(i);

                                // Only render visible (optimization handled in getCardStyle by display, but Framer Motion handles it better if we filter? 
                                // Actually, let's just animate all properties

                                return (
                                    <motion.div
                                        key={`${activeYear}-${i}`}
                                        className="absolute inset-0 rounded-3xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-sm bg-gray-900/80"
                                        initial={false}
                                        animate={{
                                            x: style.x,
                                            z: style.z,
                                            rotateY: style.rotateY,
                                            scale: style.scale,
                                            opacity: style.opacity,
                                            zIndex: style.zIndex,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 20,
                                            mass: 1
                                        }}
                                        style={{
                                            transformStyle: 'preserve-3d',
                                            display: style.display,
                                            boxShadow: i === ((activeIndex % images.length) + images.length) % images.length
                                                ? '0 0 50px rgba(0, 243, 255, 0.3)'
                                                : '0 0 10px rgba(0,0,0,0.5)'
                                        }}
                                    >
                                        <div className="relative w-full h-full">
                                            <img
                                                src={src}
                                                alt={`Gallery ${i}`}
                                                className="w-full h-full object-cover pointer-events-none select-none"
                                                draggable={false}
                                            />
                                            {/* Reflection / Gloss */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none"></div>
                                            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Bottom Controls / Indicators */}
                <div className="mt-8 flex flex-col items-center gap-4 relative z-20 pb-10">
                    <div className="flex items-center gap-8">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-md group"
                        >
                            <FaChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
                        </button>

                        <div className="flex gap-2">
                            {images.map((_, i) => (
                                <div
                                    key={i}
                                    className={`
                                        w-1.5 h-1.5 rounded-full transition-all duration-300
                                        ${i === ((activeIndex % images.length) + images.length) % images.length
                                            ? 'bg-neon-cyan w-6 shadow-[0_0_8px_#00f3ff]'
                                            : 'bg-white/20'}
                                    `}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-md group"
                        >
                            <FaChevronRight className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                    <p className="text-white/30 text-xs uppercase tracking-widest font-mono">
                        Scroll to Navigate
                    </p>
                </div>

            </div>
        </main>
    );
}
