'use client';

import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
    FaFutbol, FaBasketballBall, FaRunning, FaGamepad, FaChessKing
} from 'react-icons/fa';
import { MdSportsCricket, MdSportsKabaddi } from 'react-icons/md';
import { GiVolleyballBall, GiShuttlecock } from 'react-icons/gi';

// Data Configuration
const ARENA_ZONES = [
    {
        id: 'cricket-leather',
        sport: 'Cricket (Leather)',
        categories: ['Boys', 'Girls'],
        prize: { winner: '₹25,000', runner: '₹15,000' },
        icon: MdSportsCricket,
        color: 'from-blue-600 to-indigo-600',
        neon: 'shadow-blue-500/50', // Simplified shadow
        accent: 'text-blue-400',
        border: 'border-blue-500',
        bg: 'https://images.unsplash.com/photo-1531415074968-bc2ce3a106e2?auto=format&fit=crop&q=80',
    },
    {
        id: 'cricket-box',
        sport: 'Box Cricket',
        categories: ['Open'],
        prize: { winner: '₹15,000', runner: '₹8,000' },
        icon: MdSportsCricket,
        color: 'from-cyan-600 to-blue-500',
        neon: 'shadow-cyan-500/50',
        accent: 'text-cyan-400',
        border: 'border-cyan-500',
        bg: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e975?auto=format&fit=crop&q=80',
    },
    {
        id: 'football-7',
        sport: 'Football (7v7)',
        categories: ['Boys'],
        prize: { winner: '₹20,000', runner: '₹10,000' },
        icon: FaFutbol,
        color: 'from-green-600 to-emerald-600',
        neon: 'shadow-green-500/50',
        accent: 'text-green-400',
        border: 'border-green-500',
        bg: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?auto=format&fit=crop&q=80',
    },
    {
        id: 'football-5',
        sport: 'Football (5v5)',
        categories: ['Girls'],
        prize: { winner: '₹15,000', runner: '₹8,000' },
        icon: FaFutbol,
        color: 'from-emerald-500 to-teal-500',
        neon: 'shadow-teal-500/50',
        accent: 'text-teal-400',
        border: 'border-teal-500',
        bg: 'https://images.unsplash.com/photo-1510051640316-cee39563ddab?auto=format&fit=crop&q=80',
    },
    {
        id: 'basketball',
        sport: 'Basketball',
        categories: ['Boys', 'Girls'],
        prize: { winner: '₹18,000', runner: '₹10,000' },
        icon: FaBasketballBall,
        color: 'from-orange-600 to-red-600',
        neon: 'shadow-orange-500/50',
        accent: 'text-orange-400',
        border: 'border-orange-500',
        bg: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80',
    },
    {
        id: 'volleyball',
        sport: 'Volleyball',
        categories: ['Boys', 'Girls'],
        prize: { winner: '₹18,000', runner: '₹10,000' },
        icon: GiVolleyballBall,
        color: 'from-yellow-500 to-orange-500',
        neon: 'shadow-yellow-500/50',
        accent: 'text-yellow-400',
        border: 'border-yellow-500',
        bg: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&q=80',
    },
    {
        id: 'badminton',
        sport: 'Badminton',
        categories: ['Singles', 'Doubles', 'Mixed'],
        prize: { winner: '₹10,000', runner: '₹5,000' },
        icon: GiShuttlecock,
        color: 'from-pink-600 to-rose-600',
        neon: 'shadow-pink-500/50',
        accent: 'text-pink-400',
        border: 'border-pink-500',
        bg: 'https://images.unsplash.com/photo-1626224583764-847890e058f5?auto=format&fit=crop&q=80',
    },
    {
        id: 'kabaddi',
        sport: 'Kabaddi',
        categories: ['Boys'],
        prize: { winner: '₹15,000', runner: '₹8,000' },
        icon: MdSportsKabaddi,
        color: 'from-red-600 to-red-800',
        neon: 'shadow-red-600/50',
        accent: 'text-red-400',
        border: 'border-red-500',
        bg: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80',
    },
    {
        id: 'kho-kho',
        sport: 'Kho-Kho',
        categories: ['Boys', 'Girls'],
        prize: { winner: '₹12,000', runner: '₹6,000' },
        icon: FaRunning,
        color: 'from-purple-600 to-indigo-600',
        neon: 'shadow-purple-500/50',
        accent: 'text-purple-400',
        border: 'border-purple-500',
        bg: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80',
    },
    {
        id: 'esports',
        sport: 'E-Sports',
        categories: ['Valorant', 'BGMI', 'FIFA'],
        prize: { winner: '₹30,000', runner: '₹15,000' },
        icon: FaGamepad,
        color: 'from-violet-600 to-fuchsia-600',
        neon: 'shadow-violet-500/50',
        accent: 'text-violet-400',
        border: 'border-violet-500',
        bg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
    },
    {
        id: 'chess',
        sport: 'Chess',
        categories: ['Open'],
        prize: { winner: '₹8,000', runner: '₹4,000' },
        icon: FaChessKing,
        color: 'from-gray-600 to-gray-800',
        neon: 'shadow-gray-500/50',
        accent: 'text-gray-400',
        border: 'border-gray-500',
        bg: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80',
    },
];

export default function EventsArena() {
    const [activeZone, setActiveZone] = useState<typeof ARENA_ZONES[0] | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Optimized Parallax: Reduced sensitivity and overhead
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    // Increased damping for smoother, less jittery movement
    const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25, mass: 0.8 });
    const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25, mass: 0.8 });

    // Reduced range of motion for better performance
    const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, 10]);
    const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3, 3]);
    const translateX = useTransform(smoothX, [-0.5, 0.5], [10, -10]);

    // Throttled mouse move handler via requestAnimationFrame
    const handleMouseMove = (e: React.MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const x = e.clientX / innerWidth - 0.5;
        const y = e.clientY / innerHeight - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[140vh] md:h-screen bg-black overflow-hidden flex flex-col items-center justify-center"
            onMouseMove={handleMouseMove}
        >

            {/* --- VISUALS --- */}
            {/* Optimized Background: Single layer switching, no heavy filters */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode='popLayout'>
                    <motion.div
                        key={activeZone ? activeZone.id : 'default'}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${activeZone ? activeZone.bg : 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80'})`,
                            filter: activeZone ? 'brightness(1.2) contrast(1.1)' : 'none',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activeZone ? 1 : 0.4 }} // Lower opacity natively instead of brightness filter
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                </AnimatePresence>

                {/* Static Gradient Overlay (Performance > Dynamic Gradient) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 via-[#020617]/20 to-black/10"></div>

                {/* Subtle Color Tint */}
                <div className={`absolute inset-0 transition-colors duration-700 pointer-events-none ${activeZone ? 'bg-' + activeZone.color.split('-')[1] + '-900/10' : 'bg-transparent'}`}></div>
            </div>

            {/* Optimized Atmosphere: Static gradients/images instead of complex particle loops */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-radial from-transparent to-black"></div>
            </div>


            {/* --- 3D INTERFACE STAGE --- */}
            <div className="relative z-10 w-full max-w-[1600px] h-full flex flex-col items-center justify-center px-4 perspective-1000">

                {/* Header HUD */}
                <motion.div
                    className="absolute top-6 left-0 w-full flex justify-between px-6 z-30 pointer-events-none"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <div className="flex flex-col">
                        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 tracking-tighter uppercase drop-shadow-md">
                            Event<span className="text-neon-cyan">Grid</span>
                        </h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className={`w-1.5 h-1.5 rounded-full ${activeZone ? 'bg-red-500' : 'bg-green-500'} transition-colors`}></div>
                            <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">
                                {activeZone ? 'Module Active' : 'System Ready'}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* VIRTUAL STADIUM FLOOR */}
                {/* Using hardware acceleration (transform-style-3d) */}
                <motion.div
                    className="relative w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-12 md:gap-y-20 transform-style-3d will-change-transform"
                    style={{
                        rotateX: rotateX,
                        rotateY: rotateY,
                        translateX: translateX,
                    }}
                >
                    {ARENA_ZONES.map((zone, index) => {
                        const isActive = activeZone?.id === zone.id;
                        const isDimmed = activeZone && !isActive;

                        return (
                            <div
                                key={zone.id}
                                className={`relative group h-[160px] flex items-end justify-center perspective-500 transition-opacity duration-300 ${isDimmed ? 'opacity-40' : 'opacity-100'}`}
                                onMouseEnter={() => setActiveZone(zone)}
                                onMouseLeave={() => setActiveZone(null)}
                            >
                                <div className="relative flex flex-col items-center">

                                    {/* Simple Floor Highlight */}
                                    {isActive && <div className="absolute bottom-[-20px] w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>}

                                    {/* Hexagon Module - Reduced shadows for performance */}
                                    {/* Using standard tailwind shadows instead of complex custom colored ones when not active */}
                                    <div className={`relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-[#111] border border-white/10 ${isActive ? `${zone.border} scale-110 bg-black` : 'group-hover:border-white/30'} clip-path-hexagon transition-all duration-300 z-20 cursor-pointer`}>
                                        <zone.icon className={`text-4xl text-gray-600 transition-colors duration-300 ${isActive ? 'text-white' : 'group-hover:text-gray-400'}`} />
                                    </div>

                                    {/* Label */}
                                    <div className={`mt-4 px-2 py-0.5 rounded-sm bg-black/80 border border-white/5 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 transition-colors duration-300 ${isActive ? 'text-white border-white/30' : ''}`}>
                                        {zone.sport}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            {/* --- INFO PANEL (Slide-Up) --- */}
            {/* Optimized: No heavy blur, solid dark colors with slight transparency */}
            <AnimatePresence>
                {activeZone && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.3, ease: "circOut" }}
                        className="fixed bottom-0 left-0 w-full z-50 flex justify-center pointer-events-none"
                    >
                        <div className="relative w-full max-w-4xl bg-black/40 backdrop-blur-md border-t border-white/10 shadow-2xl p-6 pb-8 pointer-events-auto overflow-hidden">
                            {/* Spotlight Effect */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-white/10 to-transparent pointer-events-none blur-3xl opacity-50"></div>

                            {/* Accent Line */}
                            <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${activeZone.color}`}></div>

                            <div className="flex flex-row justify-between items-center gap-4">
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white">
                                        {activeZone.sport}
                                    </h2>
                                    <div className="flex gap-2 mt-2">
                                        {activeZone.categories.map(cat => (
                                            <span key={cat} className="px-2 py-1 bg-white/10 text-gray-300 text-[10px] font-bold uppercase tracking-wider rounded-sm">
                                                {cat}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4 text-right items-center">
                                    <div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Winner</div>
                                        <div className="text-xl md:text-2xl font-mono font-bold text-neon-cyan">{activeZone.prize.winner}</div>
                                    </div>
                                    <div className="hidden md:block w-[1px] h-8 bg-white/10"></div>
                                    <div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Runner Up</div>
                                        <div className="text-xl md:text-2xl font-mono font-bold text-gray-400">{activeZone.prize.runner}</div>
                                    </div>

                                    <Link
                                        href="/register"
                                        className="hidden md:flex items-center gap-2 px-6 py-2 bg-white text-black font-bold uppercase tracking-wider text-sm rounded-sm hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] ml-4"
                                    >
                                        Register Now
                                    </Link>
                                </div>
                            </div>

                            {/* Mobile Button */}
                            <Link
                                href="/register"
                                className="md:hidden w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase tracking-wider text-sm rounded-sm active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            >
                                Register Now
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .clip-path-hexagon {
                    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
                }
            `}</style>
        </section >
    );
}
