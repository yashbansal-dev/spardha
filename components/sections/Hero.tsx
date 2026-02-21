'use client';

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { isRegistrationOpen } from '@/utils/registrationDate';
import RegistrationModal from '../ui/RegistrationModal';
import { useRouter } from 'next/navigation';

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
    const [isMobile, setIsMobile] = useState(true); // Default true for safety layout

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleRegisterClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isRegistrationOpen()) {
            router.push('/register');
        } else {
            setIsModalOpen(true);
        }
    };

    // Client-side detection for mobile
    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                <AnimatePresence>
                    <motion.div
                        key={currentImageIndex}
                        className="absolute inset-0"
                        style={{
                            filter: 'brightness(0.8)',
                        }}
                        initial={{
                            opacity: 0,
                            scale: 1,
                        }}
                        animate={{
                            opacity: 1,
                            scale: isMobile ? 1 : 1.05,
                        }}
                        exit={{
                            opacity: 0,
                            scale: isMobile ? 1 : 1.05,
                        }}
                        transition={{
                            opacity: { duration: 1.2, ease: "easeInOut" },
                            scale: { duration: 7, ease: "linear" } 
                        }}
                    >
                        <Image
                            src={HERO_IMAGES[currentImageIndex]}
                            alt="Hero Background"
                            fill
                            className="object-cover object-center"
                            priority
                            sizes="(max-width: 768px) 100vw, 100vw"
                        />
                        {/* Preload next image efficiently without display: none DOM issues on mobile browsers */}
                        <div className="absolute opacity-0 pointer-events-none -z-10 w-[1px] h-[1px] overflow-hidden">
                            <Image
                                src={HERO_IMAGES[(currentImageIndex + 1) % HERO_IMAGES.length]}
                                alt="preload"
                                width={10}
                                height={10}
                                priority
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Fallback/Base background */}
                <div className="absolute inset-0 bg-[#000] -z-10"></div>

                {/* Overlay Gradient to blend with black bg */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div>
            </motion.div>

            {/* 1. Noise Filter (Film Grain) */}
            <div className="bg-noise md:mix-blend-overlay opacity-30"></div>

            {/* 2. Perspective Grid (Floor) */}
            <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-grid-perspective opacity-40 z-10 pointer-events-none md:mask-image-[linear-gradient(to_bottom,transparent,black)]"></div>

            {/* 3. Ambient Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-neon-cyan/10 rounded-full blur-[60px] md:blur-[120px] pointer-events-none z-5"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-neon-purple/10 rounded-full blur-[50px] md:blur-[100px] pointer-events-none z-5"></div>

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
                            className="flex items-center gap-4 mb-3"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-white tracking-[0.15em] text-lg sm:text-2xl md:text-4xl font-black font-gang font-restore uppercase drop-shadow-[0_2px_10px_rgba(255,100,0,0.3)] filter">JK Lakshmipat University Presents</span>
                        </motion.div>

                        {/* Main Title - Clean & Bold */}
                        <motion.h2
                            className="text-[14vw] sm:text-[15vw] md:text-[9rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-orange-600 to-white uppercase leading-none mb-2 font-gang"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}

                        >
                            SPARDHA'26
                        </motion.h2>

                        {/* Year - Neon Accent */}
                        <motion.div
                            className="relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <h3 className="text-4xl sm:text-[3rem] md:text-[5rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-red-600 italic tracking-wide transform -skew-x-12">
                                {/* 2026 */}
                            </h3>
                        </motion.div>

                        {/* Prize Pool */}
                        <motion.div
                            className="mt-8 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90">
                                Prize Pool Worth Over{" "}
                                <span className="text-neon-cyan font-bold">₹1,60,000+</span>
                            </p>
                        </motion.div>

                        {/* Unique Creative Register Button (Skewed Cyber Style) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="mt-8 z-50"
                        >
                            <a href="/register" onClick={handleRegisterClick} className="group relative inline-block p-4">
                                {/* Main Button Container (Skewed) */}
                                <div className="relative px-12 py-4 bg-white/5 border border-neon-cyan/50 transform -skew-x-12 hover:skew-x-0 hover:bg-neon-cyan/10 hover:border-neon-cyan transition-all duration-300 ease-out overflow-hidden">

                                    {/* Glitch Overlay (Hidden by default, shows on hover) */}
                                    <div className="absolute inset-0 bg-neon-cyan/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12 pointer-events-none" />

                                    {/* Corner Accents */}
                                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-cyan -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-cyan translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                                    <div className="absolute top-0 right-0 w-2 h-2 bg-neon-cyan/0 group-hover:bg-neon-cyan/50 transition-all duration-300" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-neon-cyan/0 group-hover:bg-neon-cyan/50 transition-all duration-300" />

                                    {/* Text (Counter-skewed to straighten) */}
                                    <div className="relative transform skew-x-12 group-hover:skew-x-0 transition-all duration-300 flex items-center gap-3">
                                        <span className="text-neon-cyan font-black tracking-[0.2em] uppercase text-lg md:text-xl group-hover:text-white transition-colors duration-300">
                                            Register Now
                                        </span>
                                        <FaArrowRight className="text-neon-cyan text-sm group-hover:translate-x-2 group-hover:text-white transition-all duration-300" />
                                    </div>
                                </div>

                                {/* Outer Ghost Border (Echo effect) */}
                                <div className="absolute inset-0 border border-neon-cyan/20 transform -skew-x-12 scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none" />
                            </a>
                        </motion.div>

                    </div>


                </div>
            </motion.div>

            {/* Bottom Vignette */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>

            <RegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
}
