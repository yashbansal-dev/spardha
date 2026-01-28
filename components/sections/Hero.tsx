'use client';

import { useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaPlay } from "react-icons/fa";

export default function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Mouse parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for mouse movement
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            // Calculate normalized position (-1 to 1)
            const x = (clientX / innerWidth - 0.5) * 2;
            const y = (clientY / innerHeight - 0.5) * 2;

            mouseX.set(x * 20); // Max 20px movement
            mouseY.set(y * 20);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* 1. Transparent Background needed for Global Parallax to show through */}




            {/* 3. Main Content with Glass/Parallax Effect */}
            <motion.div
                className="relative z-10 text-center px-4 max-w-6xl mx-auto"
                style={{ x: springX, y: springY }} // Apply subtle parallax to potential container
            >
                {/* Introduction Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-neon-cyan text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                        JK Lakshmipat University Presents
                    </span>
                </motion.div>

                {/* Main Heading - Glass Typography */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, type: "spring" }}
                    className="relative mb-6"
                >
                    <h1 className="text-7xl md:text-9xl font-black font-sans tracking-tight text-white relative z-10 drop-shadow-[0_0_25px_rgba(0,243,255,0.3)]">
                        SPARDHA
                        <span className="text-transparent bg-clip-text bg-gradient-to-tr from-neon-cyan to-neon-purple">.</span>
                    </h1>

                    {/* Glow behind text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 blur-[60px] -z-10 rounded-full"></div>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-gray-300 text-lg md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed font-light"
                >
                    The Annual Sports Festival of <strong className="text-white font-semibold">JK Lakshmipat University</strong>.
                    <br />
                    <span className="inline-block mt-2 text-white/80">
                        Experience the <span className="text-neon-cyan font-medium">Energy</span>. Unleash the <span className="text-neon-purple font-medium">Champion</span>.
                    </span>
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Link
                        href="#register"
                        className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                    >
                        <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all">
                            Register Now <FaArrowRight />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 group-hover:gap-3 transition-all opacity-0 group-hover:opacity-100 text-white">
                            Register Now <FaArrowRight />
                        </span>
                    </Link>

                    <Link
                        href="#events"
                        className="group px-8 py-4 backdrop-blur-md bg-white/5 border border-white/10 text-white font-bold text-lg rounded-full transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105 flex items-center gap-2"
                    >
                        <FaPlay className="text-xs group-hover:text-neon-cyan transition-colors" /> Explore Events
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-neon-cyan to-transparent animate-pulse"></div>
            </motion.div>
        </section>
    );
}
