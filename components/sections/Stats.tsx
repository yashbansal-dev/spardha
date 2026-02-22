'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaTrophy, FaUsers, FaUniversity, FaGamepad, FaBolt } from "react-icons/fa";

const battlefields = [
    {
        id: "cricket",
        name: "CRICKET",
        image: "/assets/games/cricket_premium.png",
        color: "from-blue-600 to-indigo-600",
        accent: "text-blue-500",
        stats: "11v11 // FIELD",
        gridClass: "md:col-span-2 md:row-span-2",
        description: "The ultimate clash for glory on the pitch. Showcase your strategy and power."
    },
    {
        id: "football",
        name: "FOOTBALL",
        image: "/assets/games/football_premium.png",
        color: "from-emerald-600 to-teal-600",
        accent: "text-emerald-500",
        stats: "7v7 // TURF",
        gridClass: "md:col-span-1 md:row-span-1",
        description: "Speed, precision, and raw energy on the field."
    },
    {
        id: "volleyball",
        name: "VOLLEYBALL",
        image: "/assets/games/volleyball_premium.png",
        color: "from-purple-600 to-pink-600",
        accent: "text-purple-500",
        stats: "6v6 // NET",
        gridClass: "md:col-span-1 md:row-span-1",
        description: "Rise above the competition. Every spike counts."
    },
    {
        id: "basketball",
        name: "BASKETBALL",
        image: "/assets/games/basketball_premium.png",
        color: "from-orange-600 to-red-600",
        accent: "text-orange-500",
        stats: "5v5 // COURT",
        gridClass: "md:col-span-1 md:row-span-1",
        description: "Dominate the paint and hit nothing but net."
    },
    {
        id: "badminton",
        name: "BADMINTON",
        image: "/assets/games/badminton_premium.png",
        color: "from-rose-600 to-red-600",
        accent: "text-rose-500",
        stats: "1v1 // COURT",
        gridClass: "md:col-span-1 md:row-span-1",
        description: "Agility meets power in the fastest racquet sport."
    },
];

export default function SportsArsenal() {
    return (
        <section className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-center py-20 font-sans">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] md:bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"></div>
            </div>

            <div className="container mx-auto px-4 z-20">
                {/* Header */}
                <div className="max-w-7xl mx-auto mb-16 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center md:items-start"
                    >
                        <h2 className="text-7xl md:text-9xl font-black font-gang text-white tracking-tighter uppercase leading-none relative">
                            BATTLE<span className="text-neon-cyan">FIELD</span>
                            <span className="absolute -top-6 -right-12 text-xs font-mono text-neon-cyan/50 tracking-[0.5em] hidden md:block">EST. 2026 // SYSTEM ACTIVE</span>
                        </h2>
                        <div className="h-1 w-24 bg-neon-cyan mt-4"></div>
                    </motion.div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {battlefields.map((field, idx) => (
                        <BentoCard key={field.id} field={field} index={idx} />
                    ))}
                </div>

                {/* Footer Stats */}
                <div className="w-full max-w-7xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
                    <StatHUD label="Arenas" value="11" sub="Tactical Zones" />
                    <StatHUD label="Athletes" value="500+" sub="Warriors" />
                    <StatHUD label="Institutes" value="40+" sub="Legions" />
                    <StatHUD label="Bounty" value="1.6L" sub="Credits" isCurrency />
                </div>
            </div>
        </section>
    );
}

function BentoCard({ field, index }: any) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPercent = (e.clientX - rect.left) / width - 0.5;
        const mouseYPercent = (e.clientY - rect.top) / height - 0.5;
        mouseX.set(mouseXPercent);
        mouseY.set(mouseYPercent);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1200,
            }}
            className={`${field.gridClass} group relative cursor-pointer min-h-[300px] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-sm`}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full relative"
            >
                {/* Image Container */}
                <div className="absolute inset-0 translate-z-[-20px] scale-110">
                    <Image
                        src={field.image}
                        alt={field.name}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 desaturate-[0.3] group-hover:desaturate-0 group-hover:scale-110"
                        priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-z-[50px]">
                    <div className="relative z-10">
                        <motion.div
                            className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full w-fit mb-4 border border-white/20"
                        >
                            <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-neon-cyan uppercase flex items-center gap-2">
                                <FaBolt className="animate-pulse" /> {field.stats}
                            </span>
                        </motion.div>

                        <h3 className="text-3xl md:text-5xl font-black font-gang text-white mb-2 tracking-tighter group-hover:text-neon-cyan transition-colors duration-300">
                            {field.name}
                        </h3>

                        <p className="text-xs md:text-sm text-white/50 max-w-[250px] line-clamp-2 md:line-clamp-none transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-medium tracking-tight">
                            {field.description}
                        </p>
                    </div>

                    {/* HUD Elements */}
                    <div className="absolute top-6 right-6 flex flex-col items-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-[2px] bg-white group-hover:bg-neon-cyan"></div>
                        <div className="w-6 h-[1px] bg-white/50 group-hover:bg-neon-cyan/50"></div>
                    </div>
                </div>

                {/* Reflection/Interactive Glow */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none"
                    style={{
                        background: useTransform(
                            [mouseX, mouseY],
                            ([x, y]) => `radial-gradient(circle at ${(x as any * 100) + 50}% ${(y as any * 100) + 50}%, white, transparent)`
                        ),
                    }}
                />

                {/* Scanning line effect */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(6,182,212,0.1)_50%,transparent_100%)] h-[2px] w-full top-[-100%] group-hover:top-[200%] transition-all duration-1000 ease-in-out pointer-events-none"></div>
            </motion.div>
        </motion.div>
    );
}

function StatHUD({ label, value, sub, isCurrency }: any) {
    return (
        <div className="flex flex-col group gap-1">
            <div className="flex items-baseline gap-2">
                {isCurrency && <span className="text-neon-orange text-2xl font-black font-gang">₹</span>}
                <span className="text-5xl md:text-7xl font-black text-white font-gang tracking-tighter group-hover:text-neon-cyan transition-colors duration-300">
                    {value}
                </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
                <div className="h-[2px] w-8 bg-neon-cyan"></div>
                <div className="flex flex-col">
                    <span className="text-xs font-mono font-black uppercase tracking-[0.2em] text-white/80">{label}</span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/30">{sub}</span>
                </div>
            </div>
        </div>
    );
}

import { useMotionValue, useTransform } from "framer-motion";
