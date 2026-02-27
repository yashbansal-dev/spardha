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

// ─── Glitched / cut hero title ───────────────────────────────────────────────
const GLITCH_CSS = `
  @keyframes spardha-scan {
    0%   { top: -4px;  opacity: 0; }
    4%   { opacity: 1; }
    96%  { opacity: 1; }
    100% { top: 108%; opacity: 0; }
  }
  @keyframes spardha-flicker {
    0%, 89%, 91%, 93%, 100% { opacity: 1; }
    90%  { opacity: 0.82; }
    92%  { opacity: 0.93; }
  }
`;

function GlitchedTitle({ text }: { text: string }) {
    // Responsive class — same size as old motion.h2
    const cls =
        'font-black tracking-[0.1em] md:tracking-[0.15em] lg:tracking-[0.2em] uppercase leading-none font-gang ' +
        'text-[15vw] sm:text-[16vw] md:text-[9.5rem]';

    // globals.css sets font-alice !important on span elements.
    // font-restore class + inline fontFamily overrides that back to go3v2.ttf
    const fontOverride: React.CSSProperties = {
        fontFamily: 'var(--font-gang)',
        fontWeight: 900,
    };

    return (
        <div
            className="relative inline-block select-none font-restore"
            aria-label={text}
            style={{ animation: 'spardha-flicker 6s ease-in-out infinite' }}
        >
            <style>{GLITCH_CSS}</style>

            {/* ── Ghost base for sizing ── */}
            <span
                className={`${cls} opacity-0 block`}
                style={{ ...fontOverride, whiteSpace: 'nowrap' }}
            >{text}</span>

            {/* ── Main Title Layer ── */}
            <span
                aria-hidden="true"
                className={`${cls} absolute inset-0 bg-gradient-to-r from-white via-neon-orange to-white bg-clip-text text-transparent`}
                style={{
                    ...fontOverride,
                    whiteSpace: 'nowrap',
                    filter: 'drop-shadow(0 0 12px rgba(227, 114, 51, 0.35))',
                }}
            >{text}</span>

            {/* ── Grain texture overlay ── */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                        `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    opacity: 0.06,
                    mixBlendMode: 'overlay',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
}
// ─────────────────────────────────────────────────────────────────────────────


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
                            quality={90}
                            sizes="100vw"
                        />

                        {/* Preload next image for smoothness */}
                        <link rel="preload" href={HERO_IMAGES[(currentImageIndex + 1) % HERO_IMAGES.length]} as="image" />
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
                            <span
                                className="tracking-[0.15em] text-lg sm:text-2xl md:text-3xl font-black font-gang uppercase"
                                style={{
                                    color: '#ffffff',
                                    textShadow: '-1px 1px 0 rgba(0,0,0,0.8), 1px 1px 0 rgba(0,0,0,0.8), 0 2px 15px rgba(255,255,255,0.1)'
                                }}
                            >JK Lakshmipat University Presents</span>
                        </motion.div>

                        {/* Main Title — Glitched horizontal-cut effect */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="mb-2"
                        >
                            <GlitchedTitle text="SPARDHA'26" />
                        </motion.div>

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
                            className="mt-8 mb-6 relative z-50 group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <div className="px-6 py-2">
                                <p className="text-xl sm:text-2xl md:text-3xl font-gang text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                                    Total Prize Pool <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-orange font-black px-2 drop-shadow-[0_0_8px_rgba(227,114,51,0.8)]">₹1,60,000+</span>
                                </p>
                            </div>
                        </motion.div>

                        {/* Unique "God-Tier" Register Button */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="mt-6 z-50 group"
                        >
                            <a
                                href="/register"
                                onClick={handleRegisterClick}
                                className="relative inline-block"
                            >
                                {/* Outer decorative cut-out box */}
                                <div className="absolute inset-[-5px] border border-neon-cyan/20 z-0">
                                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-neon-cyan opacity-50 group-hover:scale-125 transition-transform duration-300"></div>
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-neon-cyan opacity-50 group-hover:scale-125 transition-transform duration-300"></div>
                                </div>

                                {/* Main Button Body */}
                                <div className="relative z-10 px-8 py-4 bg-transparent border border-neon-cyan overflow-hidden backdrop-blur-sm transition-all duration-300 group-hover:border-white">
                                    {/* Hover sweep effect */}
                                    <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent group-hover:left-[100%] transition-all duration-700 ease-in-out pointer-events-none"></div>

                                    <div className="relative flex items-center justify-center gap-4">
                                        <span className="font-gang text-neon-cyan text-xl md:text-2xl font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_8px_rgba(227,114,51,0.5)]">
                                            Register Now
                                        </span>
                                        {/* Stylized Arrow Component */}
                                        <div className="relative w-8 h-8 flex items-center justify-center border border-neon-cyan/50 rounded-full group-hover:border-white group-hover:bg-white transition-all duration-300">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-neon-cyan group-hover:text-black transition-colors duration-300 transform group-hover:translate-x-1">
                                                <path d="M5 12H19" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
                                                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Ambient Glow */}
                                <div className="absolute inset-0 bg-neon-cyan/20 blur-xl rounded-full scale-110 opacity-30 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"></div>
                            </a>
                        </motion.div>

                    </div>


                </div>
            </motion.div>

            {/* Bottom Vignette */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>

            {/* Bottom Left Athlete Style Registration Notice */}
            <motion.div
                className="absolute bottom-6 md:bottom-10 left-4 md:left-10 z-50 flex items-center gap-3 backdrop-blur-md bg-black/50 border border-white/10 rounded-full pl-2 pr-6 py-2 shadow-2xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                {/* Athlete Image Container */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-neon-orange/80 bg-black flex-shrink-0 shadow-[0_0_15px_rgba(227,114,51,0.4)] flex justify-center items-center">
                    <Image
                        src="/assets/images/spardha_logo.png"
                        alt="Spardha Logo"
                        fill
                        className="object-contain filter p-1"
                        sizes="48px"
                    />
                </div>

                {/* Text Content */}
                <div className="flex flex-col justify-center">
                    <span className="text-white font-black text-sm md:text-base uppercase tracking-widest leading-none drop-shadow-md">
                        Registration <span className="text-neon-orange">Closed</span>
                    </span>
                    <span className="text-white/60 font-bold text-[10px] md:text-xs tracking-[0.2em] mt-1 uppercase">
                        On 22 March
                    </span>
                </div>
            </motion.div>

            <RegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section >
    );
}
