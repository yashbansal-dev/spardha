'use client';

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
    const ref = useRef(null);
    const { scrollY } = useScroll();

    // Parallax logic
    const bgY = useTransform(scrollY, [0, 1000], [0, 300]);
    const contentY = useTransform(scrollY, [0, 600], [0, 200]);
    const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

    // Mouse Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 30, stiffness: 100 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 20;
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
            className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#020617]"
        >
            {/* --- ANTIGRAVITY HERO BACKGROUND --- */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    y: bgY,
                    scale: 1, // Reduced scale to show full image
                    x: springX, // Subtle mouse movement on the BG
                    rotateX: useTransform(springY, y => y * 0.05),
                }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("/assets/antigravity-hero-bg.png")',
                    }}
                >
                    {/* Dark gradient overlay for text readability - Reduced opacity */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/20"></div>
                </div>
            </motion.div>

            {/* --- FOREGROUND PARTICLES (Floating Debris/Sparks) --- */}
            <motion.div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ y: useTransform(scrollY, [0, 1000], [0, 600]) }}
            >
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-neon-cyan/60 blur-[1px]"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            boxShadow: '0 0 10px rgba(0,243,255,0.5)',
                            animation: `float-particle ${Math.random() * 5 + 5}s infinite linear`
                        }}
                    ></div>
                ))}
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-neon-purple/60 blur-[2px]"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`,
                            boxShadow: '0 0 15px rgba(188,19,254,0.5)',
                            animation: `float-particle ${Math.random() * 8 + 8}s infinite reverse`
                        }}
                    ></div>
                ))}
            </motion.div>

            {/* --- CONTENT (Center) --- */}
            <motion.div
                className="relative z-20 text-center px-4 max-w-7xl mx-auto flex flex-col items-center"
                style={{ y: contentY, opacity: contentOpacity }}
            >
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-neon-cyan tracking-[0.3em] uppercase font-bold text-sm md:text-lg mb-4 drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]"
                >
                    The Annual Sports Festival
                </motion.p>

                <motion.h1
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[12vw] md:text-[10rem] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_0_40px_rgba(0,243,255,0.2)]"
                >
                    SPARDHA
                </motion.h1>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 mb-12"
                >
                    <p className="text-xl md:text-3xl text-gray-200 font-light italic tracking-wide">
                        "Experience the <span className="text-neon-cyan font-semibold">Energy</span>. Unleash the <span className="text-neon-purple font-semibold">Champion</span>."
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        href="#register"
                        className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-black text-xl tracking-wider uppercase clip-path-slant transition-all hover:bg-neon-cyan whitespace-nowrap min-w-[250px]"
                        style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' }}
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Register Now <FaArrowRight />
                        </span>
                        <div className="absolute inset-0 bg-neon-cyan opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300 -z-10"></div>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50 mix-blend-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <div className="w-[1px] h-16 bg-white animate-pulse"></div>
            </motion.div>

            <style jsx>{`
                @keyframes float-particle {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
                }
            `}</style>
        </section>
    );
}
