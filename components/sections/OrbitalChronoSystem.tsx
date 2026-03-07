'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import {
    FaStar, FaRunning, FaMusic, FaTrophy, FaFlagCheckered,
    FaChevronDown, FaRocket, FaMapMarkerAlt, FaClock
} from 'react-icons/fa';

// --- DATA TYPES & INITIAL DATA ---

interface ChronoEvent {
    id: string;
    title: string;
    time: string;
    venue: string;
    intel: string;
    category: 'CODING' | 'HACKATHON' | 'WORKSHOP' | 'ANNOUNCEMENT' | 'FINALE';
    pulse: boolean;
    customIcon?: any;
}

const CHRONO_DATA: ChronoEvent[] = [
    {
        id: '1',
        title: 'DAY_1: OPENING_CEREMONY',
        time: '09:30 AM',
        venue: 'MAIN_STADIUM',
        intel: 'Inauguration & Initial Matches. The grand beginning of Spardha 2026.',
        category: 'ANNOUNCEMENT',
        pulse: true,
        customIcon: FaStar
    },
    {
        id: '2',
        title: 'DAY_1: INITIAL_MATCHES',
        time: '10:45 AM+',
        venue: 'ALL_GROUNDS',
        intel: 'Matches across all sporting disciplines begin officially.',
        category: 'CODING',
        pulse: false,
        customIcon: FaRunning
    },
    {
        id: '3',
        title: 'DAY_1: CAMPUS_LIFE',
        time: '08:30 PM+',
        venue: 'OAT_ARENA',
        intel: 'Cultural and social events under the stars. Relax and recharge.',
        category: 'WORKSHOP',
        pulse: false,
        customIcon: FaMusic
    },
    {
        id: '4',
        title: 'DAY_2: MATCHES_RESTART',
        time: '09:30 AM+',
        venue: 'ALL_GROUNDS',
        intel: 'Main Competition Day. High-stakes qualifiers and group stages.',
        category: 'CODING',
        pulse: true,
        customIcon: FaRunning
    },
    {
        id: '5',
        title: 'DAY_2: CAMPUS_LIFE_V2',
        time: '08:30 PM+',
        venue: 'OAT_ARENA',
        intel: 'Day 2 Cultural night and social networking for participants.',
        category: 'WORKSHOP',
        pulse: false,
        customIcon: FaMusic
    },
    {
        id: '6',
        title: 'DAY_3: FINAL_SHOWDOWN',
        time: '09:30 AM - 04:00 PM',
        venue: 'CHAMPIONS_COURT',
        intel: 'Final & Valediction. The decisive matches for the Spardha trophy.',
        category: 'FINALE',
        pulse: true,
        customIcon: FaTrophy
    },
    {
        id: '7',
        title: 'DAY_3: CLOSING_CEREMONY',
        time: '06:00 PM',
        venue: 'MAIN_STADIUM',
        intel: 'Award ceremony and official closing of Spardha 2026.',
        category: 'FINALE',
        pulse: false,
        customIcon: FaFlagCheckered
    }
];

const CATEGORY_COLORS: Record<string, string> = {
    ANNOUNCEMENT: '#fbbf24',
    CODING: '#22d3ee',
    HACKATHON: '#a855f7',
    WORKSHOP: '#4ade80',
    FINALE: '#f43f5e',
};

const CATEGORY_UI: Record<string, { color: string; icon: any }> = {
    CODING: { color: '#22d3ee', icon: FaRunning },
    HACKATHON: { color: '#a855f7', icon: FaTrophy },
    WORKSHOP: { color: '#4ade80', icon: FaMusic },
    ANNOUNCEMENT: { color: '#fbbf24', icon: FaStar },
    FINALE: { color: '#f43f5e', icon: FaRocket },
};

// --- SUB-COMPONENTS (Performance Optimized) ---

const TacticalParticles = React.memo(({ isMobile }: { isMobile: boolean }) => (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: isMobile ? 20 : 40 }).map((_, i) => {
            const isDot = i % 3 !== 0;
            return (
                <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                        x: `${Math.random() * 100}vw`,
                        y: `${Math.random() * 100}vh`,
                        opacity: 0,
                    }}
                    animate={{
                        opacity: [0, Math.random() * 0.3 + 0.1, 0],
                        scale: [0, Math.random() * 0.8 + 0.4, 0],
                        x: [`${Math.random() * 100}vw`, `${(Math.random() * 10 - 5) + 50}vw`],
                        y: [`${Math.random() * 100}vh`, `${(Math.random() * 10 - 5) + 50}vh`]
                    }}
                    transition={{
                        duration: 20 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {isDot ? (
                        <div className={`w-1 h-1 rounded-full ${i % 2 === 0 ? 'bg-neon-cyan/20' : 'bg-white/10'}`} />
                    ) : (
                        <div className="relative w-3 h-3 flex items-center justify-center">
                            <div className="absolute w-full h-[0.5px] bg-neon-cyan/10" />
                            <div className="absolute h-full w-[0.5px] bg-neon-cyan/10" />
                        </div>
                    )}
                </motion.div>
            );
        })}
    </div>
));

TacticalParticles.displayName = 'TacticalParticles';

const TacticalHUD = ({ activeEvent, progress, isMobile }: { activeEvent: ChronoEvent, progress: any, isMobile: boolean }) => {
    // Direct mapping of progress value to percentage string for the UI
    const progressPercent = useTransform(progress, [0, 1], ["0%", "100%"]);

    if (!activeEvent) return null;

    const ActiveIcon = activeEvent.customIcon || FaStar;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 p-4 md:p-12 pb-32 md:pb-32 pt-10 md:pt-32 flex flex-col justify-between">
            {/* Top Header - Centered for balanced tactical feel */}
            <div className="flex flex-col items-center text-center mt-2 md:mt-10">
                <div className="space-y-1 md:space-y-3">
                    <h1 className="text-2xl sm:text-5xl md:text-7xl font-gang text-white tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.6em] drop-shadow-[0_0_25px_rgba(34,211,238,0.4)] leading-tight">
                        TIMELINE
                    </h1>
                </div>

                {/* Progress Bar - Centered under Timeline */}
                <div className="mt-2 md:mt-8 font-mono space-y-1 md:space-y-2">
                    <p className="text-[8px] md:text-[10px] text-white/20 tracking-[0.2em] md:tracking-[0.3em] uppercase italic">Sector_Alignment</p>
                    <div className="flex items-center justify-center gap-3 md:gap-4">
                        <div className="w-24 sm:w-48 h-[1px] bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div
                                className="h-full bg-neon-cyan shadow-[0_0_15px_#22d3ee]"
                                style={{ width: progressPercent }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Panel - Active Intel */}
            <div className="flex justify-center md:justify-start w-full pointer-events-none mb-4 md:mb-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeEvent.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        className="w-full max-w-2xl bg-black/60 md:bg-black/40 backdrop-blur-xl border border-white/10 md:border-white/5 rounded-[20px] md:rounded-[40px] p-4 md:p-12 relative overflow-hidden group pointer-events-auto mx-4 md:mx-0"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: CATEGORY_COLORS[activeEvent.category as any] || '#22d3ee' }} />
                        <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5 group-hover:opacity-20 transition-opacity hidden sm:block">
                            <ActiveIcon size={isMobile ? 50 : 120} />
                        </div>

                        <div className="space-y-3 md:space-y-6 relative z-10">
                            <div className="flex items-center gap-2 md:gap-4">
                                <span className="text-neon-cyan font-mono text-[9px] md:text-sm tracking-widest">[{activeEvent.time}]</span>
                                <div className="h-[1px] w-6 md:w-12 bg-white/10" />
                                <span className="text-white/40 font-mono text-[7px] md:text-[10px] tracking-widest uppercase">{activeEvent.category}</span>
                            </div>

                            <h2 className="text-lg sm:text-4xl md:text-5xl font-gang text-white tracking-wider uppercase leading-none min-h-[1.2em]">
                                {activeEvent.title}
                            </h2>

                            <div className="flex flex-wrap items-center gap-3 md:gap-8 text-[8px] md:text-[11px] font-mono text-white/40 uppercase tracking-widest">
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-neon-cyan" /> {activeEvent.venue}
                                </div>
                            </div>

                            <p className="text-white/60 text-[10px] md:text-sm leading-relaxed font-mono italic max-w-lg line-clamp-2 md:line-clamp-none">
                                {activeEvent.intel}
                            </p>
                        </div>

                        {/* Scanning Animation */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-cyan/20 animate-scan-line pointer-events-none" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Scroll Indicator - Bottom Right (Responsive) */}
            <div className="absolute bottom-28 md:bottom-12 right-6 md:right-12 flex flex-col items-center gap-2 md:gap-4 group pointer-events-none z-50">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    className="text-[8px] md:text-[10px] font-mono text-white uppercase tracking-[0.2em] md:tracking-[0.4em] [writing-mode:vertical-rl] lg:group-hover:text-neon-cyan transition-colors"
                >
                    {isMobile ? 'Scroll' : 'Rotate_Dial'}
                </motion.span>
                <div className="w-[1px] h-8 md:h-12 bg-white/10 lg:group-hover:h-20 transition-all overflow-hidden">
                    <motion.div
                        className="w-full h-1/2 bg-neon-cyan/60"
                        animate={{ y: [-20, 40] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                </div>
                <FaChevronDown className="text-white/20 text-xs md:text-base animate-bounce" />
            </div>
        </div>
    );
};

const TimelineItem = ({
    event,
    i,
    scrollSpring,
    itemSpacing,
    isMobile,
    activeIndex,
    iconSize,
    categoryIconSize
}: any) => {
    const relativePos = useTransform(
        scrollSpring,
        (latest: number) => i - latest * (CHRONO_DATA.length - 1)
    );

    const x = useTransform(relativePos, p => p * itemSpacing);
    const rotateY = useTransform(relativePos, p => p * -45);
    const z = useTransform(relativePos, p => Math.abs(p) * -200);
    const scale = useTransform(relativePos, p => (isMobile ? 1.1 : 1.2) - Math.abs(p) * 0.4);
    const opacity = useTransform(relativePos, p => 1 - Math.abs(p) * 0.7);

    const categoryInfo = CATEGORY_UI[event.category] || { color: '#22d3ee', icon: FaStar };
    const CategoryIcon = event.customIcon || categoryInfo.icon;

    return (
        <motion.div
            style={{
                x,
                z,
                rotateY,
                scale,
                opacity,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity'
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        >
            <div
                style={{
                    width: isMobile ? '3.5rem' : `${iconSize / 4}rem`,
                    height: isMobile ? '3.5rem' : `${iconSize / 4}rem`,
                    borderRadius: isMobile ? '1rem' : '2rem'
                }}
                className={`border flex items-center justify-center backdrop-blur-md transition-all duration-700
                ${activeIndex === i
                        ? 'bg-neon-cyan/5 border-neon-cyan/30 shadow-[0_0_40px_rgba(34,211,238,0.2)]'
                        : 'bg-black/40 border-white/5 opacity-40'}`}
            >
                <AnimatePresence>
                    {activeIndex === i && (
                        <motion.div
                            layoutId="activeCore"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute inset-4 bg-neon-cyan/10 rounded-[1.5rem] blur-xl"
                        />
                    )}
                </AnimatePresence>

                <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
                    <CategoryIcon
                        size={categoryIconSize}
                        className={`transition-all duration-700 
                        ${activeIndex === i ? 'text-white' : 'text-white/20'}`}
                    />

                    <div
                        className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-black shadow-lg"
                        style={{
                            backgroundColor: CATEGORY_COLORS[event.category],
                            transform: 'translateZ(10px)'
                        }}
                    />
                </div>
            </div>

            <div
                className="mt-6 md:mt-8 text-center"
                style={{ transform: 'translateZ(30px)', willChange: 'transform' }}
            >
                <p className={`text-[8px] md:text-[10px] font-mono tracking-[0.3em] uppercase transition-all duration-700 
                ${activeIndex === i ? 'text-neon-cyan opacity-100' : 'text-white/5 opacity-0'}`}>
                    {event.time}
                </p>
                <h3 className={`text-base md:text-xl font-gang tracking-[0.2em] uppercase mt-1 md:mt-2 transition-all duration-1000 
                ${activeIndex === i ? 'text-white translate-y-0 opacity-100' : 'text-white/5 translate-y-4 opacity-0'}`}>
                    {event.title.split('_')[0]}
                </h3>
            </div>
        </motion.div>
    );
};

// --- MAIN COMPONENT ---
export default function OrbitalChronoSystem() {
    const { scrollYProgress } = useScroll();
    const [windowWidth, setWindowWidth] = useState(1200); // Default to desktop
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Responsive Constants
    const isMobile = windowWidth < 768;
    const isSmallMobile = windowWidth < 400; // e.g. iPhone SE
    const isTablet = windowWidth >= 768 && windowWidth < 1024;

    const itemSpacing = isSmallMobile ? 200 : isMobile ? 260 : isTablet ? 380 : 500;
    const iconSize = isSmallMobile ? 12 : isMobile ? 16 : isTablet ? 24 : 28; // Icon container size (rem)
    const categoryIconSize = isSmallMobile ? 20 : isMobile ? 24 : isTablet ? 42 : 48;
    const perspective = isMobile ? '700px' : '2000px';

    // Smooth physics for linear movement
    const scrollSpring = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [activeIndex, setActiveIndex] = useState(0);

    // Discrete Snap Logic: Only re-render when index actually changes
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.min(
            Math.round(latest * (CHRONO_DATA.length - 1)),
            CHRONO_DATA.length - 1
        );
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    });

    const activeEvent = CHRONO_DATA[activeIndex];

    if (!mounted) return <div className="h-screen bg-black" />;

    return (
        <div className="h-[1200vh] w-full bg-black relative select-none cursor-default overflow-x-hidden">
            {/* Background Atmosphere */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)] opacity-60" />
                <div className="absolute inset-0 bg-noise opacity-[0.03]" />
            </div>

            <TacticalHUD activeEvent={activeEvent} progress={scrollYProgress} isMobile={isMobile} />

            {/* The Linear Snapping Timeline System (Cinematic 3D) */}
            <div
                className={`fixed inset-0 flex items-center justify-center z-10 overflow-hidden pointer-events-none ${isMobile ? '-translate-y-20' : ''}`}
                style={{ perspective }}
            >
                <div className="relative flex items-center justify-center w-full transform-style-3d">
                    {CHRONO_DATA.map((event, i) => (
                        <TimelineItem
                            key={event.id}
                            event={event}
                            i={i}
                            scrollSpring={scrollSpring}
                            itemSpacing={itemSpacing}
                            isMobile={isMobile}
                            activeIndex={activeIndex}
                            iconSize={iconSize}
                            categoryIconSize={categoryIconSize}
                        />
                    ))}
                </div>
            </div>

            <TacticalParticles isMobile={isMobile} />

            {/* Bottom Buffer */}
            <div className="absolute bottom-0 left-0 w-full h-1" />
        </div>
    );
}
