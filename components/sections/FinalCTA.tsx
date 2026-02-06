'use client';

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import Image from "next/image";

export default function FinalCTA() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505] perspective-container">

            {/* --- CINEMATIC TUNNEL ATMOSPHERE --- */}

            {/* 1. Base Darkening & Vignette */}
            <div className="absolute inset-0 bg-black/80 z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)] z-10 pointer-events-none" />

            {/* 2. Warm Stadium Glow (Behind Ticket) */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-amber-600/10 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute w-[40vw] h-[40vw] md:w-[30vw] md:h-[30vw] bg-orange-500/5 rounded-full blur-[80px]" />
            </div>

            {/* 3. Light Beams (Cutting through fog) */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
                <div className="absolute top-[-10%] left-[20%] w-[200px] h-[120vh] bg-gradient-to-b from-white/5 to-transparent -rotate-[15deg] blur-xl" />
                <div className="absolute top-[-10%] right-[20%] w-[300px] h-[120vh] bg-gradient-to-b from-white/5 to-transparent rotate-[15deg] blur-xl" />
            </div>

            {/* 4. Atmospheric Smoke / Fog */}
            <SmokeLayer className="bottom-[-10%] left-[-10%] opacity-20" duration={15} delay={0} />
            <SmokeLayer className="bottom-[-10%] right-[-10%] opacity-20" duration={18} delay={2} direction="left" />
            <SmokeLayer className="bottom-[-20%] left-[20%] opacity-15" duration={20} delay={5} />

            {/* 5. Looming Typography (Subtle) */}
            <div className="absolute top-[20%] inset-x-0 flex justify-center pointer-events-none z-0">
                <h1 className="text-[15vw] font-black text-white/[0.03] tracking-widest uppercase leading-none font-gang blur-sm">
                    ARENA
                </h1>
            </div>

            {/* 6. Floating Dust Particles */}
            <FloatingParticles count={30} />

            {/* --- FOREGROUND CONTENT --- */}
            <div className="relative z-20 flex flex-col items-center gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase mb-4 drop-shadow-2xl">
                        Enter The <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-amber-600">Arena</span>
                    </h2>
                    <p className="text-white/40 text-sm md:text-lg max-w-md mx-auto font-light tracking-wide">
                        The silence before the storm. <br /> Your legacy begins here.
                    </p>
                </motion.div>

                {/* The Realistic 3D Ticket */}
                <div className="relative">
                    {/* Backlight for Ticket */}
                    <div className="absolute inset-0 bg-orange-500/20 blur-[60px] -z-10 rounded-full" />
                    <Ticket />
                </div>
            </div>

            <style jsx global>{`
                .perspective-container {
                    perspective: 2000px;
                }
                .ticket-mask {
                    -webkit-mask-image: radial-gradient(circle at 71.5% 0%, transparent 15px, black 16px), 
                                      radial-gradient(circle at 71.5% 100%, transparent 15px, black 16px);
                    mask-image: radial-gradient(circle at 71.5% 0%, transparent 15px, black 16px), 
                                radial-gradient(circle at 71.5% 100%, transparent 15px, black 16px);
                }
            `}</style>
        </section>
    );
}

// --- HELPER COMPONENTS ---

function RotatingSpotlight({ className, duration = 10, delay = 0, reverse = false }: { className?: string, duration?: number, delay?: number, reverse?: boolean }) {
    return (
        <motion.div
            className={`absolute rounded-full pointer-events-none z-0 mix-blend-screen ${className}`}
            animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1],
                rotate: reverse ? [0, -360] : [0, 360],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "mirror", // Creates a breathing effect for scale/opacity, but rotation needs linear
                ease: "linear",
                delay: delay
            }}
        />
    );
}

function SmokeLayer({ className, duration = 10, delay = 0, direction = "right" }: { className?: string, duration?: number, delay?: number, direction?: "left" | "right" }) {
    const xRange = direction === "right" ? ["-10%", "10%"] : ["10%", "-10%"];

    return (
        <motion.div
            className={`absolute w-[80vw] h-[60vh] bg-gradient-to-t from-gray-500/10 via-gray-500/5 to-transparent blur-[80px] rounded-full pointer-events-none z-10 mix-blend-screen ${className}`}
            animate={{
                x: xRange,
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: delay
            }}
        />
    );
}

function FloatingParticles({ count = 15 }: { count?: number }) {
    // Generate random particles
    const particles = Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-amber-100/10 blur-[1px]"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -120, 0],
                        opacity: [0, 0.4, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}

function Ticket() {
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
        <Link href="/register" className="block mt-8 md:mt-0">
            <motion.div
                className="relative w-[340px] h-[600px] md:w-[700px] md:h-[280px] rounded-2xl cursor-none group perspective-container"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
                whileInView={{ scale: 1, opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                whileHover={{ scale: 1.05 }}
            >
                {/* TICKET BODY */}
                <div
                    className="absolute inset-0 bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden ticket-mask"
                    style={{ transform: "translateZ(0px)" }}
                >
                    {/* Background Texture - Concrete/Noise */}
                    <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10 mix-blend-overlay" />
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
                                    <div className="text-white text-lg font-mono">OCT 24-26</div>
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
                                        src="/assets/spardha-wings-final.png"
                                        alt="Spardha Wings Logo"
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
                        className="absolute inset-0 z-30 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-300 mix-blend-overlay"
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
        </Link >
    );
}
