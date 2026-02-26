'use client';

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import Image from "next/image";
import { isRegistrationOpen } from '@/utils/registrationDate';
import RegistrationModal from '../ui/RegistrationModal';
import { useRouter } from 'next/navigation';

export default function FinalCTA() {
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

    return (
        <section id="register" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505] perspective-container py-20 md:py-0">

            {/* --- CINEMATIC TUNNEL ATMOSPHERE --- */}

            {/* --- CINEMATIC HOME VIBE BACKGROUND --- */}

            {/* --- CINEMATIC COLLAGE BACKGROUND --- */}

            {/* 1. Dynamic 3-Column Marquee Collage */}
            {/* 1. Fixed 3-Column Grid */}
            {/* 1. Fixed 5-Column Grid (Full Width) */}
            <div className="absolute inset-x-0 inset-y-0 md:inset-x-0 md:inset-y-0 z-0 overflow-hidden flex justify-center items-center opacity-60 md:opacity-100 select-none pointer-events-none">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-4 w-[120%] sm:w-[120%] md:w-full shrink-0 h-max p-2 md:p-4 font-sans uppercase">
                    {/* Column 1 - Left on mobile */}
                    <StaticColumn images={[
                        { src: '/assets/validictory/121A0589-thumb.webp', position: 'object-top' },
                        { src: '/assets/validictory/121A0592-thumb.webp', position: 'object-top' },
                        { src: '/assets/validictory/121A0595-thumb.webp', position: 'object-center' }
                    ]} className="flex" />

                    {/* Column 2 - Right on mobile */}
                    <StaticColumn images={[
                        { src: '/assets/validictory/121A0597-thumb.webp', position: 'object-top' },
                        { src: '/assets/validictory/121A0601-thumb.webp', position: 'object-center' },
                        { src: '/assets/validictory/121A0602-thumb.webp', position: 'object-center' }
                    ]} className="mt-12 flex" />

                    {/* Column 3 - Hidden on mobile, visible on desktop */}
                    <StaticColumn images={[
                        { src: '/assets/validictory/121A0604-thumb.webp', position: 'object-top' },
                        { src: '/assets/validictory/121A0608-thumb.webp', position: 'object-top' },
                        { src: '/assets/validictory/121A0622-thumb.webp', position: 'object-center' }
                    ]} className="mt-24 md:mt-0 hidden md:flex" />

                    {/* Column 4 */}
                    <StaticColumn images={[
                        { src: '/assets/validictory/DSC_0990-thumb.webp', position: 'object-center' },
                        { src: '/assets/validictory/121A0625-thumb.webp', position: 'object-center' },
                        { src: '/assets/validictory/121A0629-thumb.webp', position: 'object-center' }
                    ]} className="hidden lg:flex" />

                    {/* Column 5 */}
                    <StaticColumn images={[
                        { src: '/assets/validictory/DSC_0932-thumb.webp', position: 'object-center' },
                        { src: '/assets/validictory/DSC_0953-thumb.webp', position: 'object-center' },
                        { src: '/assets/validictory/121A0662-thumb.webp', position: 'object-center' }
                    ]} className="hidden lg:flex" />
                </div>
            </div>

            {/* 2. Enhanced Visibility Overlay - Removed heavy multiply to let quality shine through */}
            <div className="absolute inset-0 bg-black/10 z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-0" />

            {/* 4. Noise & Texture - Subtler overlay to maintain sharpness */}
            <div className="absolute inset-0 bg-noise opacity-[0.05] z-10 pointer-events-none" />

            {/* 3. Perspective Grid (Floor) - Subtle & Dark (Matches Hero) */}
            <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-grid-perspective opacity-20 z-10 pointer-events-none"
                style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }}
            />

            {/* 3. Bottom Fade-Out */}
            <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10 pointer-events-none" />

            {/* 4. Top Fade-In */}
            <div className="absolute inset-x-0 top-0 h-[40vh] bg-gradient-to-b from-[#050505] via-[#050505]/60 to-transparent z-10 pointer-events-none" />

            <div className="absolute top-1/2 left-1/4 w-[40vw] h-[40vw] bg-neon-cyan/5 rounded-full blur-[60px] pointer-events-none z-5" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-neon-orange/10 rounded-full blur-[50px] pointer-events-none z-5" />

            {/* 5. Looming Watermark Text */}
            <div className="absolute top-[20%] inset-x-0 flex justify-center pointer-events-none z-0">
                <h1 className="text-[15vw] font-black text-white/[0.04] tracking-widest uppercase leading-none font-gang select-none">
                    ARENA
                </h1>
            </div>

            {/* --- FOREGROUND CONTENT --- */}
            <div className="relative z-20 flex flex-col items-center gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase mb-4 drop-shadow-2xl">
                        Enter The <span className="text-transparent bg-clip-text bg-gradient-to-br from-neon-orange to-neon-purple">Arena</span>
                    </h2>
                    <p className="text-white/40 text-sm md:text-lg max-w-md mx-auto font-light tracking-wide">
                        The silence before the storm. <br /> Your legacy begins here.
                    </p>
                </motion.div>

                {/* The Realistic 3D Ticket */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 12,
                        delay: 0.4
                    }}
                >
                    {/* Backlight for Ticket */}
                    <div className="absolute inset-0 bg-orange-500/20 blur-[60px] -z-10 rounded-full" />
                    <Ticket handleRegisterClick={handleRegisterClick} />
                </motion.div>
            </div>

            <style jsx global>{`
                .perspective-container {
                    perspective: 2000px;
                }
                @media (min-width: 768px) {
                    .ticket-mask {
                        -webkit-mask-image: radial-gradient(circle at 71.5% 0%, transparent 15px, black 16px), 
                                        radial-gradient(circle at 71.5% 100%, transparent 15px, black 16px);
                        mask-image: radial-gradient(circle at 71.5% 0%, transparent 15px, black 16px), 
                                    radial-gradient(circle at 71.5% 100%, transparent 15px, black 16px);
                    }
                }
            `}</style>
            <RegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
}

// --- HELPER COMPONENTS ---

interface ImageProps {
    src: string;
    position?: string;
}

function StaticColumn({ images, className }: { images: (string | ImageProps)[], className?: string }) {
    return (
        <div className={`relative flex flex-col gap-2 md:gap-4 w-full h-max ${className}`}>
            {images.map((item, i) => {
                const src = typeof item === 'string' ? item : item.src;
                const position = typeof item === 'string' ? 'object-center' : (item.position || 'object-center');

                return (
                    <div key={i} className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white/5 hover:scale-[1.02] transition-transform duration-500 shadow-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={src}
                            alt="Ceremony Moment"
                            className={`absolute inset-0 w-full h-full object-cover brightness-[1.15] contrast-[1.1] saturate-[1.1] ${position}`}
                            loading={i < 2 ? "eager" : "lazy"}
                            decoding="async"
                        />
                    </div>
                );
            })}
        </div>
    );
}

function Ticket({ handleRegisterClick }: { handleRegisterClick: (e: React.MouseEvent) => void }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    // Glare effect movement
    const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = event.clientX - rect.left;
        const mouseYVal = event.clientY - rect.top;

        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <a href="/register" onClick={handleRegisterClick} className="block mt-8 md:mt-0 relative z-30">
            <motion.div
                className="relative w-[90vw] max-w-[340px] md:max-w-none md:w-[85vw] lg:w-[700px] h-[600px] md:h-[280px] rounded-2xl cursor-none group perspective-container"
                style={{
                    rotateX: typeof window !== 'undefined' && window.innerWidth > 768 ? rotateX : 0,
                    rotateY: typeof window !== 'undefined' && window.innerWidth > 768 ? rotateY : 0,
                    transformStyle: "preserve-3d",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
                whileInView={{ scale: 1, opacity: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring" }}
                whileHover={{ scale: 1.05 }}
            >
                {/* TICKET BODY */}
                <div
                    className="absolute inset-0 bg-black/90 md:bg-black/80 md:backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden ticket-mask"
                    style={{ transform: "translateZ(0px)" }}
                >
                    {/* Background Texture - Concrete/Noise */}
                    <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />

                    {/* Content Grid */}
                    <div className="relative h-full flex flex-col md:flex-row">

                        {/* LEFT: MAIN TICKET INFO (70%) */}
                        <div className="flex-[7] p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-dashed border-white/20 relative">
                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-1">
                                        SPARDHA <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-purple-500">'26</span>
                                    </h3>
                                    <p className="text-white/40 font-mono text-sm tracking-widest uppercase">JK LAKSHMIPAT UNIVERSITY</p>
                                </div>
                                <div className="hidden md:block">
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center animate-spin-slow">
                                        <div className="w-8 h-8 rounded-full border-2 border-dashed border-cyan-500/50" />
                                    </div>
                                </div>
                            </div>

                            {/* Middle Details */}
                            <div className="grid grid-cols-3 gap-4 my-6">
                                <div>
                                    <div className="text-white/30 text-xs font-bold uppercase tracking-wider mb-1">DATE</div>
                                    <div className="text-white text-lg font-mono">MAR 27-29</div>
                                </div>
                                <div>
                                    <div className="text-white/30 text-xs font-bold uppercase tracking-wider mb-1">TIME</div>
                                    <div className="text-white text-lg font-mono">10:00 AM</div>
                                </div>
                                <div>
                                    <div className="text-white/30 text-xs font-bold uppercase tracking-wider mb-1">VENUE</div>
                                    <div className="text-white text-lg font-mono">MAIN GROUND</div>
                                </div>
                            </div>

                            {/* Bottom - Action */}
                            <div className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                                <span className="text-neon-cyan font-black text-xl tracking-widest uppercase">CLICK TO REGISTER</span>
                                <div className="h-[2px] w-12 bg-neon-cyan" />
                            </div>
                        </div>

                        {/* RIGHT: STUB (30%) */}
                        <div className="flex-[3] bg-white/5 p-6 flex flex-col items-center justify-center relative border-dashed border-white/20">
                            {/* Holes for vertical layout on mobile, horizontal on desktop handled by mask */}

                            <div className="text-center space-y-4">
                                <div className="relative w-48 h-24 mx-auto">
                                    <Image
                                        src="/assets/images/spardha_logo.png"
                                        alt="Spardha Logo"
                                        fill
                                        className="object-contain mix-blend-screen contrast-125"
                                    />
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-white tracking-widest">VIP</div>
                                    <div className="text-white/40 text-[10px] font-mono uppercase tracking-[0.2em]">ADMIT ONE</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Glare Overlay */}
                    <motion.div
                        className="absolute inset-0 z-30 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                        style={{
                            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(0,243,255,0.2) 50%, transparent 54%)",
                            backgroundSize: "200% 200%",
                            backgroundPositionX: glareX.get() + "%",
                            backgroundPositionY: glareY.get() + "%",
                        }}
                    />
                </div>

                {/* 3D Depth Shadow/Glow */}
                <div
                    className="absolute inset-4 rounded-xl bg-neon-cyan/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{ transform: "translateZ(-40px) scale(0.9)" }}
                />
            </motion.div>
        </a>
    );
}