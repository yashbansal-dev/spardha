'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { IoClose, IoExpand, IoScan, IoCodeSlash, IoPlanet, IoHardwareChip } from 'react-icons/io5';

const IMAGES = [
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?w=800&q=80',
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
    'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=800&q=80',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
    'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80',
    'https://images.unsplash.com/photo-1585699324551-f60895011091?w=800&q=80',
    'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80',
    'https://images.unsplash.com/photo-1519861531473-920026393112?w=800&q=80',
    'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&q=80',
    'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80',
    // Duplicates for density
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'
];

// Denser Configuration for "Void" placement
const VOID_CONFIG = [
    // Top Cluster
    { top: '10%', left: '5%', z: 0.5, scale: 0.7 },
    { top: '15%', left: '45%', z: 1.1, scale: 1.2 },
    { top: '20%', left: '80%', z: 0.4, scale: 0.6 },

    // Mid-Top Cluster
    { top: '30%', left: '20%', z: 0.8, scale: 0.9 },
    { top: '35%', left: '60%', z: 1.3, scale: 1.3 },
    { top: '40%', left: '90%', z: 0.6, scale: 0.75 },
    { top: '45%', left: '10%', z: 1.0, scale: 1.0 },

    // Middle Cluster
    { top: '55%', left: '40%', z: 0.5, scale: 0.8 },
    { top: '60%', left: '75%', z: 1.4, scale: 1.1 },
    { top: '65%', left: '5%', z: 0.7, scale: 0.9 },

    // Mid-Bottom
    { top: '75%', left: '25%', z: 1.2, scale: 1.0 },
    { top: '80%', left: '55%', z: 0.6, scale: 0.8 },
    { top: '85%', left: '85%', z: 0.9, scale: 0.9 },

    // Bottom Cluster
    { top: '95%', left: '15%', z: 0.4, scale: 0.7 },
    { top: '105%', left: '45%', z: 1.3, scale: 1.2 },
    { top: '115%', left: '70%', z: 0.8, scale: 1.0 },

    // Deep Scroll Area
    { top: '125%', left: '10%', z: 0.5, scale: 0.8 },
    { top: '135%', left: '35%', z: 1.1, scale: 1.1 },
    { top: '145%', left: '65%', z: 0.7, scale: 0.9 },
    { top: '155%', left: '90%', z: 1.0, scale: 1.0 },
    { top: '165%', left: '20%', z: 1.4, scale: 1.2 },
    { top: '175%', left: '50%', z: 0.6, scale: 0.8 },
];

// Cyber Debris - Floating Background Elements
const DEBRIS_CONFIG = [
    { text: "01001", top: '12%', left: '15%', opacity: 0.3, z: 0.2 },
    { icon: IoCodeSlash, top: '22%', left: '85%', opacity: 0.2, z: 0.3 },
    { text: "ERR_404", top: '35%', left: '5%', opacity: 0.4, z: 0.1 },
    { icon: IoPlanet, top: '45%', left: '50%', opacity: 0.1, z: 0.1 },
    { text: ":: SYSTEM ::", top: '58%', left: '80%', opacity: 0.3, z: 0.4 },
    { icon: IoHardwareChip, top: '68%', left: '25%', opacity: 0.2, z: 0.2 },
    { text: "[ NULL ]", top: '82%', left: '65%', opacity: 0.4, z: 0.3 },
    { icon: IoScan, top: '92%', left: '10%', opacity: 0.2, z: 0.1 },
    { text: ">>>", top: '110%', left: '40%', opacity: 0.3, z: 0.5 },
    { text: "0xFF", top: '130%', left: '90%', opacity: 0.2, z: 0.2 },
    { icon: IoCodeSlash, top: '150%', left: '15%', opacity: 0.1, z: 0.1 },
    { text: "DATA_LOSS", top: '170%', left: '70%', opacity: 0.3, z: 0.4 },
];

export default function VoidGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <section ref={containerRef} className="relative w-full h-[350vh] bg-[#020617] overflow-hidden">

            {/* Fixed Void Backgrounds */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Denser Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(227,114,51,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(227,114,51,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(227,114,51,0.02)_2px,transparent_2px),linear-gradient(90deg,rgba(227,114,51,0.02)_2px,transparent_2px)] bg-[size:240px_240px]"></div>

                {/* Animated Nebula Haze */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(227,114,51,0.08),transparent_60%)] animate-pulse"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.05),transparent_60%)] animate-pulse delay-1000"></div>
            </div>

            {/* Floating Title */}
            <div className="fixed top-24 left-8 z-10 pointer-events-none mix-blend-difference">
                <h2 className="text-8xl md:text-9xl font-black text-[#E37233]/20 tracking-tighter shadow-orange-glow">
                    ARCHIVE
                </h2>
                <div className="text-neon-cyan font-mono text-sm tracking-[0.5em] pl-2 opacity-80">
                    // CLASSIFIED_VISUAL_DATA_DUMP
                </div>
            </div>

            {/* Parallax Container */}
            <div className="relative w-full h-full z-10">

                {/* 1. Cyber Debris Layer (Background Parallax) */}
                {DEBRIS_CONFIG.map((debris, index) => {
                    const y = useTransform(springScroll, [0, 1], [0, -500 * debris.z]);
                    return (
                        <motion.div
                            key={`debris-${index}`}
                            style={{
                                top: debris.top,
                                left: debris.left,
                                y,
                                opacity: debris.opacity
                            }}
                            className="absolute text-neon-cyan/50 font-mono pointer-events-none select-none"
                        >
                            {debris.text && <span className="text-xl tracking-widest">{debris.text}</span>}
                            {debris.icon && <debris.icon className="text-4xl" />}
                        </motion.div>
                    );
                })}

                {/* 2. Logic Images Map */}
                {VOID_CONFIG.map((config, index) => {
                    const imgIndex = index % IMAGES.length;
                    const y = useTransform(springScroll, [0, 1], [0, -1200 * config.z]);
                    const opacity = useTransform(springScroll, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

                    return (
                        <motion.div
                            key={index}
                            style={{
                                top: config.top,
                                left: config.left,
                                y: y,
                                opacity: opacity,
                                scale: config.scale,
                                zIndex: Math.round(config.z * 10)
                            }}
                            className="absolute w-64 md:w-96 aspect-[4/3] cursor-pointer group perspective-1000"
                            onClick={() => setSelectedImage(imgIndex)}
                        >
                            <div className="relative w-full h-full transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1">
                                <div className="absolute inset-0 border border-white/5 bg-black/90 overflow-hidden group-hover:border-neon-cyan/80 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_30px_rgba(227,114,51,0.2)]">
                                    <img
                                        src={IMAGES[imgIndex]}
                                        alt={`Archive ${index}`}
                                        className="w-full h-full object-cover opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.8)_50%)] bg-[size:100%_4px] opacity-10 pointer-events-none"></div>
                                </div>

                                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="absolute bottom-2 left-2 bg-black/90 px-2 py-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100 border border-neon-cyan/30 backdrop-blur-sm">
                                    <IoScan className="text-neon-cyan text-xs" />
                                    <span className="text-[10px] font-mono text-neon-cyan tracking-widest">IMG_{1000 + index}</span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-8 right-8 text-white/50 hover:text-neon-cyan transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <IoClose size={32} />
                        </button>

                        <motion.div
                            layoutId={`img-${selectedImage}`}
                            className="relative max-w-5xl w-full aspect-video border border-white/10 bg-black/50 shadow-[0_0_50px_rgba(227,114,51,0.1)] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={IMAGES[selectedImage]}
                                alt="Full View"
                                className="w-full h-full object-contain"
                            />
                            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent p-6 flex justify-between items-end">
                                <div>
                                    <h3 className="text-2xl font-bold text-white uppercase tracking-wider">Archive Data_{selectedImage}</h3>
                                    <p className="text-neon-cyan font-mono text-xs mt-1">:: DECRYPTED :: SECURE ::</p>
                                </div>
                                <IoExpand className="text-white/50" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
