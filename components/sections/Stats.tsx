'use client';

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { FaBolt } from "react-icons/fa";

const battlefields = [
    {
        id: "cricket",
        name: "CRICKET",
        image: "/assets/games/cricket.JPG",
        stats: "11v11 // FIELD",
        zone: "ZONE_A",
        description: "TACTICAL BATTLEFIELD FOR ELITE COMPETITION. STRATEGIC DOMINANCE REQUIRED.",
        color: "#00f2ff"
    },
    {
        id: "football",
        name: "FOOTBALL",
        image: "/assets/games/football.JPG",
        stats: "7v7 // TURF",
        zone: "ZONE_B",
        description: "HIGH-INTENSITY ENGAGEMENT ZONE. SPEED AND PRECISION ARE VITAL.",
        color: "#10b981"
    },
    {
        id: "volleyball",
        name: "VOLLEYBALL",
        image: "/volleyball-match.png",
        stats: "6v6 // NET",
        zone: "ZONE_C",
        description: "AERIAL SUPREMACY ZONE. DEFY GRAVITY, SECURE THE MATCH.",
        color: "#8b5cf6"
    },
    {
        id: "basketball",
        name: "BASKETBALL",
        image: "/basketball-match.jpg",
        stats: "5v5 // COURT",
        zone: "ZONE_D",
        description: "CLOSE-QUARTERS COMBAT. DOMINATE THE PAINT, HIT THE ARC.",
        color: "#f97316"
    },
    {
        id: "badminton",
        name: "BADMINTON",
        image: "/assets/games/badminton_engaging.png",
        stats: "1v1 // COURT",
        zone: "ZONE_E",
        description: "PRECISION EXECUTION. THE FASTEST STRIKES IN THE OPERATION.",
        color: "#e11d48"
    },
];

export default function SportsArsenal() {
    const [activeIdx, setActiveIdx] = useState(0);
    const activeField = battlefields[activeIdx];

    return (
        <section className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-center py-24 font-sans border-y border-white/5">
            {/* Cyber-HUD Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_100%)]"></div>
            </div>

            <div className="container mx-auto px-6 z-20 flex flex-col h-full lg:max-h-[800px]">
                {/* Header */}
                <div className="mb-12 flex justify-between items-end border-b border-white/10 pb-6 relative overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black font-gang text-white tracking-tighter uppercase leading-none selection:bg-neon-cyan selection:text-black">
                            BATTLE<span className="text-neon-cyan">FIELD</span>
                        </h2>
                    </motion.div>

                    <div className="hidden lg:flex flex-col items-end font-mono text-[10px] text-white/40 tracking-[0.5em] uppercase">
                        <span>Terminal Protocol v4.0.2</span>
                        <span className="text-neon-cyan animate-pulse">Status: Active Search</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col lg:flex-row gap-12 items-stretch">
                    {/* Tactical Selector (Left) */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-4">
                        <div className="flex items-center gap-4 mb-4 opacity-50">
                            <div className="h-[1px] w-8 bg-white"></div>
                            <span className="text-[10px] font-mono tracking-widest uppercase">Arena Selection</span>
                        </div>

                        {battlefields.map((field, idx) => (
                            <button
                                key={field.id}
                                onMouseEnter={() => setActiveIdx(idx)}
                                className={`relative group flex items-center gap-6 p-4 rounded-xl transition-all duration-500 overflow-hidden border ${activeIdx === idx ? 'bg-white/10 border-white/20' : 'bg-transparent border-white/5 grayscale hover:grayscale-0 hover:bg-white/5'}`}
                            >
                                <span className={`text-sm font-mono font-black ${activeIdx === idx ? 'text-neon-cyan' : 'text-white/20'}`}>0{idx + 1}</span>
                                <div className="flex flex-col items-start">
                                    <span className={`text-2xl md:text-3xl font-black font-gang tracking-tighter transition-all ${activeIdx === idx ? 'text-white translate-x-2' : 'text-white/40'}`}>
                                        {field.name}
                                    </span>
                                    <span className={`text-[10px] font-mono uppercase tracking-widest transition-opacity ${activeIdx === idx ? 'opacity-60' : 'opacity-0'}`}>
                                        {field.stats}
                                    </span>
                                </div>

                                {activeIdx === idx && (
                                    <motion.div
                                        layoutId="active-bg"
                                        className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-transparent pointer-events-none"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Dynamic Preview (Right) */}
                    <div className="w-full lg:flex-1 relative aspect-video lg:aspect-auto rounded-3xl overflow-hidden border border-white/10 group bg-zinc-950">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeField.id}
                                initial={{ opacity: 0, scale: 1.1, 'x': 20 }}
                                animate={{ opacity: 1, scale: 1, 'x': 0 }}
                                exit={{ opacity: 0, scale: 0.9, 'x': -20 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="absolute inset-0"
                            >
                                <div className="relative w-full h-full overflow-hidden">
                                    {/* 3D Tilt Wrapper */}
                                    <InteractiveView image={activeField.image} name={activeField.name} />
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none"></div>

                                {/* Info HUD - Progress Bar Only */}
                                <div className="absolute bottom-8 right-8 z-20 flex flex-col items-end gap-2 pointer-events-none">
                                    <div className="h-[2px] w-32 bg-white/10 overflow-hidden">
                                        <motion.div
                                            initial={{ x: "-100%" }}
                                            animate={{ x: "100%" }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="w-full h-full bg-neon-cyan"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Corner Brackets */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/20 group-hover:border-neon-cyan transition-colors pointer-events-none"></div>
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 group-hover:border-neon-cyan transition-colors pointer-events-none"></div>
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/20 group-hover:border-neon-cyan transition-colors pointer-events-none"></div>
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/20 group-hover:border-neon-cyan transition-colors pointer-events-none"></div>
                    </div>
                </div>

                {/* Footer Stats - High Freq Nodes */}
                <div className="w-full mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-white/5 pt-12 relative">
                    <div className="absolute -top-1 left-0 w-8 h-2 bg-neon-cyan/50"></div>
                    <StatNode label="Active Areas" value="11" />
                    <StatNode label="Confirmed Ops" value="500+" />
                    <StatNode label="Institutional Nodes" value="40+" />
                    <StatNode label="Bounty Pool" value="1.6L" isCurrency />
                </div>

                {/* Preload Bucket - Renders images hidden to prime browser cache */}
                <div className="fixed opacity-0 pointer-events-none -z-50 w-0 h-0 overflow-hidden">
                    {battlefields.map((field) => (
                        <Image
                            key={`preload-${field.id}`}
                            src={field.image}
                            alt="preload"
                            width={10}
                            height={10}
                            priority
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function InteractiveView({ image, name }: { image: string, name: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full relative cursor-crosshair overflow-hidden"
            style={{ perspective: 1000 }}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-full h-full"
            >
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover scale-110 pointer-events-none"
                    priority
                />

                {/* HUD Scanning Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"></div>

                {/* Move with mouse "Red Dot" */}
                <motion.div
                    style={{
                        x: useTransform(mouseX, [-0.5, 0.5], [-200, 200]),
                        y: useTransform(mouseY, [-0.5, 0.5], [-200, 200])
                    }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <div className="w-24 h-24 border border-neon-cyan/40 rounded-full flex items-center justify-center relative">
                        <div className="absolute w-[2px] h-full bg-neon-cyan/20"></div>
                        <div className="absolute w-full h-[2px] bg-neon-cyan/20"></div>
                        <div className="w-1 h-1 bg-red-500 rounded-full shadow-[0_0_10px_red]"></div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

function StatNode({ label, value, isCurrency }: any) {
    return (
        <div className="flex flex-col group gap-2">
            <div className="flex items-center gap-2">
                <div className="w-1 h-3 bg-white/20 group-hover:bg-neon-cyan transition-colors"></div>
                <span className="text-[10px] font-mono font-black uppercase text-white/30 tracking-widest group-hover:text-white/60 transition-colors">{label}</span>
            </div>
            <div className="flex items-baseline gap-2">
                {isCurrency && <span className="text-red-500 text-2xl font-black font-alice -mr-1">₹</span>}
                <span className="text-5xl md:text-7xl font-black text-white font-alice tracking-tighter group-hover:text-neon-cyan transition-colors duration-300">
                    {value}
                </span>
            </div>
        </div>
    );
}
