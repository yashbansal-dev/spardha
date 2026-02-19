'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaTrophy, FaUsers, FaUniversity, FaGamepad, FaBolt } from "react-icons/fa";

const battlefields = [
    {
        id: "basketball",
        name: "BASKETBALL",
        image: "/assets/games/basketball.JPG",
        color: "from-orange-600 to-red-600",
        accent: "text-orange-500",
        stats: "5v5 // COURT"
    },
    {
        id: "football",
        name: "FOOTBALL",
        image: "/assets/games/football.JPG",
        color: "from-emerald-600 to-teal-600",
        accent: "text-emerald-500",
        stats: "7v7 // TURF"
    },
    {
        id: "cricket",
        name: "CRICKET",
        image: "/assets/games/cricket.JPG",
        color: "from-blue-600 to-indigo-600",
        accent: "text-blue-500",
        stats: "11v11 // FIELD"
    },
    {
        id: "volleyball",
        name: "VOLLEYBALL",
        image: "/assets/games/volleyball_v2.jpg",
        color: "from-purple-600 to-pink-600",
        accent: "text-purple-500",
        stats: "6v6 // NET"
    },
    {
        id: "badminton",
        name: "BADMINTON",
        image: "/assets/games/badminton_v2.jpg",
        color: "from-rose-600 to-red-600",
        accent: "text-rose-500",
        stats: "1v1 // COURT"
    },
];

export default function SportsArsenal() {
    const [activeId, setActiveId] = useState<string | null>(null);

    return (
        <section className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-center py-20 font-sans">

            {/* Cyber-Grid Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"></div>
            </div>

            <div className="container mx-auto px-4 z-20 flex flex-col h-full items-center">

                {/* Section Header */}
                <div className="w-full max-w-7xl mb-12 md:mb-16 flex flex-col md:flex-row items-end justify-between border-b border-white/10 pb-6">
                    <div>
                        <motion.h2
                            className="text-6xl md:text-8xl font-black font-gang text-white tracking-tighter uppercase leading-none mix-blend-difference"
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            BATTLE<span className="text-neon-cyan">FIELD</span>
                        </motion.h2>

                    </div>
                </div>

                {/* The Prism Deck - Using Skew for better rendering stability */}
                <div className="w-full max-w-7xl h-[600px] flex flex-col md:flex-row gap-2 md:gap-0 pl-12 pr-12">
                    {battlefields.map((field) => (
                        <ShardCard
                            key={field.id}
                            field={field}
                            active={activeId === field.id}
                            onHover={() => setActiveId(field.id)}
                            onLeave={() => setActiveId(null)}
                        />
                    ))}
                </div>

                {/* Footer Stats - Cyber HUD Style */}
                <div className="w-full max-w-7xl mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 border-t border-white/10 pt-8">
                    <StatHUD label="Arenas" value="05" sub="Active" />
                    <StatHUD label="Athletes" value="500+" sub="Registered" />
                    <StatHUD label="Institutes" value="40+" sub="Incoming" />
                    <StatHUD label="Bounty" value="1.6L" sub="Credits" isCurrency />
                </div>

            </div>
        </section>
    );
}

function ShardCard({ field, active, onHover, onLeave }: any) {
    return (
        <motion.div
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className={`
                relative h-full transition-all duration-500 ease-out cursor-pointer
                flex-1 md:hover:flex-[2.5] 
                overflow-hidden
                group
                border border-white/10
                md:transform md:-skew-x-12
                md:-ml-4 first:ml-0
                grayscale hover:grayscale-0
                bg-white/5
            `}
        >
            {/* Background Image - Counter Skewed */}
            <div className="absolute inset-0 bg-black md:transform md:skew-x-12 md:scale-125 origin-center">
                <Image
                    src={field.image}
                    alt={field.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,black_3px)] bg-[size:100%_4px] opacity-20 pointer-events-none"></div>

                {/* Gradient tint */}
                <div className={`absolute inset-0 bg-gradient-to-t ${field.color} opacity-0 group-hover:opacity-60 mix-blend-hard-light transition-opacity duration-500`}></div>
            </div>

            {/* Content Content - Counter Skewed */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end items-center md:items-start text-center md:text-left transition-all duration-500 md:transform md:skew-x-12">

                {/* Glowing Border Lines */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 group-hover:bg-neon-cyan transition-colors shadow-[0_0_10px_currentColor]"></div>
                <div className="absolute bottom-0 right-0 w-full h-[1px] bg-white/20 group-hover:bg-neon-orange transition-colors shadow-[0_0_10px_currentColor]"></div>

                {/* Text Content */}
                <div className="relative z-10 w-full">
                    <h3 className={`text-4xl md:text-5xl font-black font-gang uppercase tracking-tighter text-white drop-shadow-lg mb-2 transition-all duration-500 ${active ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-70'}`}>
                        {field.name}
                    </h3>

                    <div className={`overflow-hidden transition-all duration-500 ${active ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className={`flex items-center gap-3 text-sm font-mono font-bold uppercase tracking-widest bg-black/80 backdrop-blur-md px-3 py-1 w-fit mx-auto md:mx-0 border-l-2 border-neon-cyan`}>
                            <FaBolt className="text-neon-cyan" /> {field.stats}
                        </div>
                    </div>
                </div>

            </div>

            {/* Hover Glitch Effect Overlay */}
            <div className="absolute inset-0 bg-white mix-blend-overlay opacity-0 group-hover:animate-pulse pointer-events-none md:transform md:skew-x-12"></div>
        </motion.div>
    );
}

function StatHUD({ label, value, sub, isCurrency }: any) {
    return (
        <div className="flex items-center gap-4 group">
            <div className="h-12 w-1 bg-white/20 group-hover:bg-neon-cyan transition-colors"></div>
            <div>
                <div className="flex items-baseline gap-1">
                    {isCurrency && <span className="text-neon-orange text-lg">₹</span>}
                    <span className="text-4xl md:text-5xl font-black text-white font-gang tracking-tighter">{value}</span>
                </div>
                <div className="flex gap-2 text-xs font-mono uppercase tracking-wider text-gray-500 group-hover:text-white transition-colors">
                    <span className="text-neon-cyan">{label}</span> // {sub}
                </div>
            </div>
        </div>
    );
}
