'use client';

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const HERO_IMAGES = [
    '/assets/images/media_1.jpeg',
    '/assets/images/media_2.jpeg',
    '/assets/images/media_3.jpeg',
    '/assets/images/media_4.jpeg',
    '/assets/images/media_5.jpeg',
    '/assets/images/media_6.jpeg',
];

export default function Hero() {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Slideshow Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 3000); // Change every 3 seconds
        return () => clearInterval(timer);
    }, []);

    // Parallax logic
    const bgY = useTransform(scrollY, [0, 1000], [0, 200]);
    const contentY = useTransform(scrollY, [0, 600], [0, 150]);
    const textParallax = useTransform(scrollY, [0, 500], [0, -50]);

    // Mouse Parallax for subtle depth
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 20; // Reduced sensitivity
            const y = (e.clientY / innerHeight - 0.5) * 20;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section
            ref={ref}
            className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#000]"
        >
            {/* --- BACKGROUND: Premium Depth & Slideshow --- */}

            {/* 0. Slideshow Background */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y: bgY }}
            >
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentImageIndex}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url("${HERO_IMAGES[currentImageIndex]}")`,
                            filter: 'brightness(0.5) contrast(1.1)', // Dimmed for text readability
                        }}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </AnimatePresence>

                {/* Fallback/Base background */}
                <div className="absolute inset-0 bg-[#000] -z-10"></div>

                {/* Overlay Gradient to blend with black bg */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div>
            </motion.div>

            {/* 1. Noise Filter (Film Grain) */}
            <div className="bg-noise mix-blend-overlay"></div>

            {/* 2. Perspective Grid (Floor) */}
            <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-grid-perspective opacity-40 z-10 pointer-events-none"></div>

            {/* 3. Ambient Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-neon-cyan/10 rounded-full blur-[120px] pointer-events-none z-5"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-neon-purple/10 rounded-full blur-[100px] pointer-events-none z-5"></div>

            {/* --- CONTENT --- */}
            <motion.div
                className="relative z-20 w-full max-w-[1400px] mx-auto flex flex-col items-center justify-center p-4"
                style={{ y: contentY }}
            >
                <div className="relative w-full flex flex-col items-center justify-center">

                    {/* Background "Watermark" Text */}
                    <motion.h1
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[22rem] font-black leading-none select-none pointer-events-none text-stroke opacity-5 whitespace-nowrap z-0"
                        style={{
                            y: textParallax,
                            x: mouseX,
                        }}
                    >
                        VICTORY
                    </motion.h1>

                    {/* Foreground Content Stack */}
                    <div className="relative z-10 flex flex-col items-center text-center">

                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <span className="text-neon-cyan tracking-[0.3em] text-xs md:text-sm font-bold font-gang font-restore uppercase">JK Lakshmipat University Presents</span>
                        </motion.div>

                        {/* Main Title - Clean & Bold */}
                        <motion.h2
                            className="text-[5rem] md:text-[9rem] font-black tracking-tighter text-white uppercase leading-none mb-2 font-gang"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}

                        >
                            SPARDHA
                        </motion.h2>

                        {/* Year - Neon Accent */}
                        <motion.div
                            className="relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <h3 className="text-[3rem] md:text-[5rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-red-600 italic tracking-wide transform -skew-x-12">
                                2026
                            </h3>
                        </motion.div>

                        {/* Description */}

                    </div>


                </div>
            </motion.div>

            {/* Bottom Vignette */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
        </section>
    );
}
