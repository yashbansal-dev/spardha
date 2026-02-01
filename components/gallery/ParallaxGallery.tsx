'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import GradualBlur from '../ui/GradualBlur';

// Sample data - columns of images
const IMAGES = [
    [
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
        'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?w=800&q=80',
        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
        'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=800&q=80',
        'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80'
    ],
    [
        'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80',
        'https://images.unsplash.com/photo-1585699324551-f60895011091?w=800&q=80',
        'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80',
        'https://images.unsplash.com/photo-1519861531473-920026393112?w=800&q=80',
        'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&q=80'
    ],
    [
        'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80',
        'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80',
        'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80',
        'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
        'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80'
    ],
];

function Column({ images, y }: { images: string[]; y: MotionValue<number> }) {
    return (
        <motion.div style={{ y }} className="flex flex-col gap-8 w-full min-w-[200px]">
            {images.map((src, i) => (
                <div key={i} className="relative group overflow-hidden rounded-xl border border-white/5 bg-gray-900/50 shadow-2xl aspect-[3/4]">
                    <img
                        src={src}
                        alt="Gallery Item"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>
            ))}
        </motion.div>
    );
}

export default function ParallaxGallery() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    // Create different movement speeds for each column
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]); // Moves opposite/slower
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section ref={sectionRef} className="relative w-full py-40 bg-[#020617] overflow-hidden">

            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-4">

                {/* Title */}
                <div className="text-center mb-32 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-light text-white uppercase tracking-[0.2em]"
                    >
                        Moments of Glory
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="w-20 h-[1px] bg-white/50 mx-auto mt-6"
                    ></motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-400 text-sm mt-4 font-light tracking-widest italic"
                    >
                        Relive the action.
                    </motion.p>
                </div>

                {/* Parallax Columns */}
                {/* Mobile: Stacked, Desktop: Flex Row */}
                <div className="flex flex-col md:flex-row gap-8 justify-center h-[1800px] overflow-hidden md:overflow-visible">
                    {/* On mobile we might want a simple grid instead of parallax or reduced parallax */}
                    <div className="hidden md:flex gap-8 w-full justify-center">
                        <Column images={IMAGES[0]} y={y1} />
                        <Column images={IMAGES[1]} y={y2} />
                        <Column images={IMAGES[2]} y={y3} />
                    </div>

                    {/* Mobile Fallback (Simple Stack) */}
                    <div className="md:hidden flex flex-col gap-4">
                        {[...IMAGES[0], ...IMAGES[1], ...IMAGES[2]].map((src, i) => (
                            <div key={i} className="relative rounded-xl overflow-hidden border border-white/10 aspect-video">
                                <img src={src} className="w-full h-full object-cover" alt="Gallery" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-32">
                    <p className="text-gray-500 text-sm tracking-[0.3em] uppercase">Scroll to Explore</p>
                </div>
            </div>

            <GradualBlur
                preset="bottom"
                strength={0.5}
                height="200px"
                className="z-20"
                animated="scroll"
            />
        </section>
    );
}
