'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function FinalCTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const imgs = imgRefs.current.filter(Boolean);

            // --- 1. ENTRANCE ---
            gsap.fromTo(imgs,
                { opacity: 0, scale: 0 },
                {
                    opacity: 0.8, // Clearly visible as requested
                    scale: (i) => POSITIONS[i]?.scale || 1,
                    duration: 1.5,
                    stagger: { amount: 1, grid: [5, 4], from: "center" },
                    ease: "back.out(1.2)"
                }
            );

            // --- 2. FLOAT ---
            imgs.forEach((img, i) => {
                gsap.to(img, {
                    y: "-=15",
                    duration: gsap.utils.random(4, 7),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: gsap.utils.random(0, 3)
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black group">

            {/* Tunnel Light Effect (Subtle Base) */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] bg-[radial-gradient(circle,_#ffffff_0%,_#00f3ff_5%,_#000000_60%)] opacity-10 blur-[100px]"></div>
            </motion.div>

            {/* FLOATING GALLERY BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {IMAGES.map((src, i) => {
                    const pos = POSITIONS[i % POSITIONS.length];
                    return (
                        <div
                            key={i}
                            ref={(el) => { imgRefs.current[i] = el }}
                            className="absolute w-[140px] md:w-[200px] aspect-[16/10] opacity-0 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-500"
                            style={{
                                left: `${pos.x}%`,
                                top: `${pos.y}%`,
                                transform: `translate(-50%, -50%) scale(${pos.scale})`,
                            }}
                        >
                            <Image
                                src={src}
                                alt={`Background Gallery ${i}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    );
                })}
            </div>

            {/* Content (High Z-Index) */}
            <div className="relative z-50 text-center px-4 mix-blend-normal">
                <motion.h2
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-8xl font-gang text-white tracking-tight mb-8 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] leading-[0.9]"
                >
                    YOUR GAME <br />
                    <span className="text-neon-cyan">STARTS NOW.</span>
                </motion.h2>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <Link
                        href="/register"
                        className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black text-2xl font-bold uppercase tracking-widest rounded-full hover:scale-105 hover:bg-neon-cyan hover:text-white transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                    >
                        Register Now <FaArrowRight />
                    </Link>
                </motion.div>
            </div>

        </section>
    );
}

// Reuse constants from MemoryVault for consistency
const BASE_IMAGES = [
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1628779238951-be2c9f255902?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531415074968-bc2ce3a106e2?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1510137600163-2729bc699b0c?auto=format&fit=crop&q=80'
];

const IMAGES = [...BASE_IMAGES, ...BASE_IMAGES].slice(0, 12); // Exact 12 for the pattern

// Structured Pattern: "Rhapsody Grid" (Symmetrical 3-2-2-2-3)
const POSITIONS = [
    // --- ROW 1 (Top) ---
    { x: 15, y: 15, scale: 0.8 },
    { x: 50, y: 12, scale: 0.8 },
    { x: 85, y: 15, scale: 0.8 },

    // --- ROW 2 ---
    { x: 30, y: 30, scale: 0.7 },
    { x: 70, y: 30, scale: 0.7 },

    // --- ROW 3 (Center Flankers) ---
    { x: 8, y: 50, scale: 0.9 },
    { x: 92, y: 50, scale: 0.9 },

    // --- ROW 4 ---
    { x: 30, y: 70, scale: 0.7 },
    { x: 70, y: 70, scale: 0.7 },

    // --- ROW 5 (Bottom) ---
    { x: 15, y: 85, scale: 0.8 },
    { x: 50, y: 88, scale: 0.8 },
    { x: 85, y: 85, scale: 0.8 },
];
