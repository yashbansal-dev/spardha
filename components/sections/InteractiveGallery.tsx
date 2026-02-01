'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';
import { IoScan } from 'react-icons/io5';

const MEMORIES = [
    {
        id: 'MEM-001',
        title: 'GRID DOMINATION',
        type: 'TACTICAL_ARCHIVE',
        src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=80',
        year: '2024'
    },
    {
        id: 'MEM-002',
        title: 'VELOCITY SPIKE',
        type: 'PERFORMANCE_LOG',
        src: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&q=80',
        year: '2023'
    },
    {
        id: 'MEM-003',
        title: 'CROWD RESONANCE',
        type: 'AUDIO_VISUAL',
        src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80',
        year: '2025'
    },
    {
        id: 'MEM-004',
        title: 'CORE STRENGTH',
        type: 'BIOMETRIC_DATA',
        src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
        year: '2024'
    },
    {
        id: 'MEM-005',
        title: 'FINAL WHISTLE',
        type: 'EVENT_MARKER',
        src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80',
        year: '2023'
    }
];

const MemoryNode = ({ memory, index, activeId, setActiveId }: any) => {
    const isActive = activeId === memory.id;
    const isBlur = activeId !== null && !isActive;

    return (
        <motion.div
            className={`relative flex-shrink-0 h-[400px] w-[300px] md:h-[500px] md:w-[350px] transition-all duration-500 cursor-pointer group ${isBlur ? 'opacity-30 blur-sm grayscale' : 'opacity-100 grayscale-0'
                } ${isActive ? 'w-[500px] md:w-[600px] z-20' : 'z-10'}`}
            onMouseEnter={() => setActiveId(memory.id)}
            layout
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            {/* Cyber Frame */}
            <div className={`absolute inset-0 border-2 transition-colors duration-300 ${isActive ? 'border-neon-cyan' : 'border-white/10 group-hover:border-neon-cyan/50'}`}>

                {/* Image */}
                <div className="absolute inset-1 overflow-hidden bg-black">
                    <img
                        src={memory.src}
                        alt={memory.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-100' : 'scale-110'}`}
                    />

                    {/* Scanlines & Grain */}
                    <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
                </div>

                {/* HUD Overlay - Active State */}
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-20 p-6 flex flex-col justify-between bg-gradient-to-t from-black/90 via-transparent to-transparent"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                                <span className="text-neon-cyan font-mono text-xs tracking-[0.2em]">{memory.id}</span>
                                <span className="text-white/50 font-mono text-[10px] mt-1">Status: DECRYPTED</span>
                            </div>
                            <IoScan className="text-neon-cyan text-xl animate-pulse" />
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-[2px] w-8 bg-neon-cyan"></div>
                                <span className="text-neon-cyan font-mono text-xs">{memory.type}</span>
                            </div>
                            <h3 className="text-3xl font-black text-white italic uppercase">{memory.title}</h3>
                            <p className="font-mono text-white/60 text-sm mt-1">ARCHIVE_YEAR // {memory.year}</p>
                        </div>
                    </motion.div>
                )}

                {/* HUD Overlay - Inactive State */}
                {!isActive && (
                    <div className="absolute bottom-4 left-4 z-20">
                        <span className="text-white/50 font-mono text-xs tracking-[0.2em] block">{memory.id}</span>
                    </div>
                )}
            </div>

            {/* Corner Markers */}
            <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 transition-colors duration-300 ${isActive ? 'border-neon-cyan' : 'border-white/20'}`}></div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 transition-colors duration-300 ${isActive ? 'border-neon-cyan' : 'border-white/20'}`}></div>
        </motion.div>
    );
};

export default function InteractiveGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeId, setActiveId] = useState<string | null>(null);

    // 3D Tilt Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 100, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            const width = rect.width;
            const height = rect.height;
            const mouseXPct = (e.clientX - rect.left) / width - 0.5;
            const mouseYPct = (e.clientY - rect.top) / height - 0.5;
            mouseX.set(mouseXPct);
            mouseY.set(mouseYPct);
        }
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setActiveId(null);
    };

    return (
        <section className="relative py-20 bg-[#020617] overflow-hidden" perspective-1000>
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none"></div>

            <div className="relative container mx-auto px-4 mb-12 z-10 flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 uppercase tracking-tighter">
                    Memory Stream
                </h2>
                <div className="h-[1px] w-24 bg-neon-cyan mt-4 shadow-[0_0_10px_rgba(227,114,51,0.8)]"></div>
                <p className="mt-2 font-mono text-neon-cyan/80 text-sm tracking-widest">[ INTERACTIVE_ARCHIVE_ACCESSED ]</p>
            </div>

            {/* 3D Tilt Container */}
            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full overflow-visible z-20 py-10"
            >
                {/* Horizontal Scroll Area */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 md:px-[50vw] snap-x snap-mandatory scrollbar-none"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {MEMORIES.map((memory, index) => (
                        <div key={memory.id} className="snap-center">
                            <MemoryNode
                                memory={memory}
                                index={index}
                                activeId={activeId}
                                setActiveId={setActiveId}
                            />
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Instructions */}
            <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
                <p className="text-white/20 font-mono text-xs uppercase tracking-[0.3em] animate-pulse">
                    &lt; HOVER TO DECRYPT // DRAG TO NAVIGATE &gt;
                </p>
            </div>
        </section>
    );
}
