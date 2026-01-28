'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, PanInfo, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGamepad, FaMusic, FaCamera, FaGlobe, FaHandsHelping, FaTrophy, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Mock Data based on the screenshot/description
const websitesData = [
    {
        id: '01',
        title: 'Esports',
        description: 'Digital Warfare',
        icon: FaGamepad,
        color: 'from-red-500 to-orange-600',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60'
    },
    {
        id: '02',
        title: 'Social Initiatives',
        description: 'Making a Difference',
        icon: FaHandsHelping,
        color: 'from-blue-500 to-cyan-600',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=60'
    },
    {
        id: '03',
        title: 'Pro Shows',
        description: 'Star Studded Nights',
        icon: FaMusic,
        color: 'from-yellow-500 to-orange-500',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60'
    },

    {
        id: '05',
        title: 'Antique',
        description: 'Timeless Classics',
        icon: FaGlobe,
        color: 'from-amber-700 to-yellow-600',
        image: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=800&auto=format&fit=crop&q=60'
    },
    {
        id: '06',
        title: 'Gallery',
        description: 'Visual Journey',
        icon: FaCamera,
        color: 'from-indigo-500 to-blue-600',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60'
    },
    {
        id: '07',
        title: 'UNOSQ',
        description: 'Quiz & Debate',
        icon: FaExternalLinkAlt,
        color: 'from-pink-500 to-purple-600',
        image: 'https://images.unsplash.com/photo-1577983072124-77e48b894165?w=800&auto=format&fit=crop&q=60'
    },
];

const CARD_WIDTH = 300;
const CARD_GAP = 100;

export default function Websites() {
    const [activeIndex, setActiveIndex] = useState(3);
    const containerRef = useRef<HTMLDivElement>(null);

    // Motion values for smooth dragging
    const dragX = useMotionValue(0);
    const dragIndex = useTransform(dragX, (value) => {
        return activeIndex - value / (CARD_WIDTH + CARD_GAP);
    });

    const smoothIndex = useSpring(dragIndex, {
        damping: 20,
        stiffness: 150,
        mass: 0.8
    });

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 50;
        const velocityThreshold = 100;

        let nextIndex = activeIndex;

        if (Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > velocityThreshold) {
            if (info.offset.x > 0) {
                nextIndex = Math.max(0, activeIndex - 1);
            } else {
                nextIndex = Math.min(websitesData.length - 1, activeIndex + 1);
            }
        }

        setActiveIndex(nextIndex);
        dragX.set(0);
    };

    useEffect(() => {
        smoothIndex.set(activeIndex);
    }, [activeIndex, dragX, smoothIndex]);

    const navNext = () => setActiveIndex(prev => Math.min(websitesData.length - 1, prev + 1));
    const navPrev = () => setActiveIndex(prev => Math.max(0, prev - 1));

    return (
        <section className="relative h-[85vh] w-full bg-transparent overflow-hidden flex flex-col items-center justify-center py-20 perspective-1000">

            {/* Background Gradient - Reduced opacity to show parallax */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0f2c]/50 to-transparent opacity-50 z-0"></div>

            {/* Header */}
            <div className="absolute top-10 text-center z-20">
                <h2 className="text-5xl md:text-7xl font-serif text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    WEBSITES
                </h2>
            </div>

            {/* Navigation Buttons - Circular Floating */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-12 z-50 pointer-events-none">
                <button
                    onClick={navPrev}
                    className={`w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-2xl hover:bg-neon-cyan hover:text-black hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] pointer-events-auto ${activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={activeIndex === 0}
                >
                    <FaChevronLeft />
                </button>
                <button
                    onClick={navNext}
                    className={`w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-2xl hover:bg-neon-cyan hover:text-black hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] pointer-events-auto ${activeIndex === websitesData.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={activeIndex === websitesData.length - 1}
                >
                    <FaChevronRight />
                </button>
            </div>

            {/* 3D Container */}
            <div
                ref={containerRef}
                className="relative w-full h-full flex items-center justify-center perspective-[1200px] transform-style-3d cursor-grab active:cursor-grabbing z-10"
            >
                <motion.div
                    className="relative w-full h-full flex items-center justify-center transform-style-3d"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    style={{ x: dragX }}
                    onDragEnd={handleDragEnd}
                >
                    {websitesData.map((site, index) => (
                        <Card
                            key={site.id}
                            data={site}
                            index={index}
                            currentIndex={smoothIndex}
                            isActive={index === activeIndex}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Bottom Indicator */}
            <div className="absolute bottom-10 flex gap-8 text-white/30 text-xl z-20 pointer-events-none uppercase tracking-widest font-mono">
                <span>Scroll • Swipe • Explore</span>
            </div>
        </section>
    );
}

function Card({ data, index, currentIndex, isActive, onClick }: { data: any, index: number, currentIndex: any, isActive: boolean, onClick: () => void }) {
    const distanceFromCenter = useTransform(currentIndex, (current: number) => {
        return index - current;
    });

    const absDistance = useTransform(distanceFromCenter, (d) => Math.abs(d));

    // 1. Z-Position: Center is 0, moving away pushes back
    const z = useTransform(absDistance, (d) => {
        return -d * 400;
    });

    // 2. X-Position: Spread
    const x = useTransform(distanceFromCenter, (d) => {
        return d * 280;
    });

    // 3. Rotation Y: Subtle rotation
    const rotateY = useTransform(distanceFromCenter, (d) => {
        return Math.max(-45, Math.min(45, d * -25));
    });

    // 4. Brightness & Opacity
    // Simulate brightness filter using opacity on overlay + CSS filter
    const brightness = useTransform(absDistance, (d) => {
        // Center (0) -> 1.2 (boost), Sides -> 0.5
        return Math.max(0.4, 1.2 - d * 0.4);
    });

    // Scale: Center pops out
    const scale = useTransform(absDistance, (d) => {
        return Math.max(0.8, 1 - d * 0.15);
    });

    return (
        <motion.div
            style={{
                x,
                z,
                rotateY,
                scale,
                filter: useTransform(brightness, b => `brightness(${b})`),
                zIndex: useTransform(absDistance, (d) => 100 - Math.round(d)),
                width: CARD_WIDTH,
                height: CARD_WIDTH * 1.4,
                position: 'absolute',
            }}
            className={`
                rounded-2xl overflow-hidden shadow-2xl border border-white/10 group transform-style-3d transition-all duration-500
                ${isActive ? 'shadow-[0_0_50px_rgba(0,243,255,0.3)] border-neon-cyan/50' : 'bg-[#111]'}
            `}
            onClick={onClick}
        >
            {/* Card Content - Interactive */}
            <div className="relative w-full h-full flex flex-col justify-end p-6 select-none bg-[#050505] cursor-pointer">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img src={data.image} alt={data.title} className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${data.color} opacity-40 mix-blend-overlay`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                </div>

                {/* Text Content */}
                <div className="relative z-10 transform-style-3d translate-z-10 px-2 pb-2">
                    <div className="text-6xl font-bold text-white/10 absolute -top-10 left-0 font-mono pointer-events-none">
                        {data.id}
                    </div>
                    <div className="mb-2 text-neon-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                        <data.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors drop-shadow-md">
                        {data.title}
                    </h3>
                    <p className="text-sm text-gray-300 font-light tracking-wide">
                        {data.description}
                    </p>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
        </motion.div>
    );
}
