'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedinIn, FaEnvelope, FaPhone, FaInstagram, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';

const CATEGORIES = ["ALL", "FACULTIES", "CORE", "HEADS", "TECH"];

// Enhanced Data with "Stats" for the Game element
const TEAM_DATA = [
    { id: 1, name: "Dr. Sutar", role: "Faculty Coordinator", category: "FACULTIES", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800", stats: { leadership: 98, vision: 95, exp: 100 } },
    { id: 2, name: "Rahul Verma", role: "Festival Convener", category: "HEADS", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800", stats: { leadership: 95, stress_res: 90, energy: 85 } },
    { id: 3, name: "Sneha Gupta", role: "Co-Convener", category: "HEADS", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800", stats: { management: 92, creativity: 88, charisma: 95 } },
    { id: 4, name: "Aryan Singh", role: "Tech Lead", category: "TECH", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800", stats: { coding: 99, caffeine: 100, bugs_fixed: 404 } },
    { id: 5, name: "Priya Sharma", role: "Hospitality", category: "CORE", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800", stats: { patience: 98, logistics: 90, smile: 100 } },
    { id: 6, name: "Amit Kumar", role: "Events Head", category: "CORE", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800", stats: { planning: 90, execution: 95, volume: 85 } },
    { id: 7, name: "Riya Patel", role: "Marketing", category: "CORE", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800", stats: { viral: 96, reach: 92, strategy: 88 } },
];

export default function TeamRoster() {
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [selectedMember, setSelectedMember] = useState(TEAM_DATA[0]);
    const [isAnimating, setIsAnimating] = useState(false);

    const filteredMembers = selectedCategory === "ALL"
        ? TEAM_DATA
        : TEAM_DATA.filter(m => m.category === selectedCategory);

    // Auto-select first member when category changes
    useEffect(() => {
        if (filteredMembers.length > 0 && !filteredMembers.find(m => m.id === selectedMember.id)) {
            setSelectedMember(filteredMembers[0]);
        }
    }, [selectedCategory, filteredMembers, selectedMember.id]);

    const handleMemberClick = (member: any) => {
        if (member.id === selectedMember.id) return;
        setIsAnimating(true);
        setSelectedMember(member);
        setTimeout(() => setIsAnimating(false), 500); // Reset glitch duration
    };

    return (
        <div className="relative w-full min-h-[800px] lg:h-screen flex flex-col lg:flex-row overflow-hidden bg-black text-white font-sans">

            {/* --- 1. LEFT PANEL: ROSTER LIST (30%) --- */}
            <div className="w-full lg:w-[35%] h-full flex flex-col z-20 bg-black/80 backdrop-blur-xl border-r border-white/10 p-6 lg:p-10 relative">

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white">
                        SELECT AGENT
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-[10px] font-mono uppercase px-3 py-1 border transition-all ${selectedCategory === cat
                                    ? "bg-neon-cyan text-black border-neon-cyan font-bold"
                                    : "bg-transparent text-gray-400 border-white/20 hover:border-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-2 no-scrollbar">
                    {filteredMembers.map((member) => (
                        <div
                            key={member.id}
                            onClick={() => handleMemberClick(member)}
                            className={`
                                group relative p-4 flex items-center gap-4 cursor-pointer transition-all border-l-2
                                ${selectedMember.id === member.id
                                    ? "bg-white/10 border-neon-cyan"
                                    : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/50"
                                }
                            `}
                        >
                            {/* Small Avatar */}
                            <div className={`relative w-12 h-12 overflow-hidden rounded-full border-2 ${selectedMember.id === member.id ? 'border-neon-cyan' : 'border-gray-600'}`}>
                                <Image src={member.image} alt={member.name} fill className="object-cover" />
                            </div>

                            {/* Text */}
                            <div>
                                <h4 className={`font-bold uppercase tracking-wider ${selectedMember.id === member.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                    {member.name}
                                </h4>
                                <p className="text-xs font-mono text-neon-cyan/80">{member.role}</p>
                            </div>

                            {/* Active Indicator */}
                            {selectedMember.id === member.id && (
                                <motion.div
                                    layoutId="active-glow"
                                    className="absolute inset-0 bg-neon-cyan/5 pointer-events-none"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* --- 2. RIGHT PANEL: HERO SHOWCASE (70%) --- */}
            <div className="relative w-full lg:w-[65%] h-[50vh] lg:h-full flex items-center justify-center overflow-hidden bg-[#050505]">

                {/* Background Graphics */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/10 rounded-full blur-[150px] animate-pulse"></div>

                    {/* Big Watermark Name */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center overflow-hidden">
                        <h1 className="text-[15rem] font-black uppercase text-white/5 whitespace-nowrap select-none font-gang">
                            {selectedMember.category}
                        </h1>
                    </div>
                </div>

                {/* --- MAIN CHARACTER IMAGE --- */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedMember.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] max-h-[80vh]"
                        >
                            {/* Glowing Ring */}
                            <div className="absolute inset-0 border-[1px] border-white/10 rounded-full scale-110 animate-[spin_10s_linear_infinite]"></div>
                            <div className="absolute inset-0 border-[1px] border-dashed border-neon-cyan/30 rounded-full scale-105 animate-[spin_15s_linear_infinite_reverse]"></div>

                            {/* Image Mask (Circle/Hexagon) */}
                            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_50px_rgba(0,243,255,0.2)]">
                                <Image
                                    src={selectedMember.image}
                                    alt={selectedMember.name}
                                    fill
                                    className="object-cover"
                                />
                                {/* Glitch Overlay */}
                                <div className="absolute inset-0 bg-neon-cyan/20 mix-blend-overlay opacity-0 animate-pulse hover:opacity-100 transition-opacity"></div>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* --- STATS OVERLAY (Floating UI) --- */}
                <div className="absolute bottom-10 right-10 z-20 w-80 pointer-events-none">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`stats-${selectedMember.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.2 }}
                            className="bg-black/80 backdrop-blur border border-neon-cyan/30 p-6 rounded-xl"
                        >
                            <h3 className="text-xl font-bold uppercase mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-neon-cyan rounded-full animate-ping"></span>
                                Agent Stats
                            </h3>
                            <div className="space-y-4">
                                {Object.entries(selectedMember.stats).map(([stat, val], idx) => (
                                    <div key={stat}>
                                        <div className="flex justify-between text-xs font-mono uppercase mb-1 text-gray-400">
                                            <span>{stat.replace('_', ' ')}</span>
                                            <span className="text-neon-cyan">{val}%</span>
                                        </div>
                                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${val}%` }}
                                                transition={{ duration: 0.8, delay: 0.3 + (idx * 0.1) }}
                                                className="h-full bg-gradient-to-r from-neon-cyan to-blue-500"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* --- FLOATING NAME (Bottom Left) --- */}
                <div className="absolute bottom-10 left-10 z-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`name-${selectedMember.id}`}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-left"
                        >
                            <h1 className="text-6xl md:text-8xl font-black italic uppercase text-white leading-[0.8] mb-2 font-gang">
                                {selectedMember.name.split(' ')[0]}
                            </h1>
                            <h2 className="text-4xl md:text-6xl font-black italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-transparent leading-[0.8] font-gang">
                                {selectedMember.name.split(' ')[1] || ""}
                            </h2>
                            <p className="mt-4 text-neon-cyan font-mono tracking-[0.5em] uppercase border-t border-neon-cyan/50 pt-4 inline-block">
                                {selectedMember.role}
                            </p>

                            {/* Socials */}
                            <div className="flex gap-4 mt-6 pointer-events-auto">
                                <button className="p-3 bg-white/5 hover:bg-neon-cyan hover:text-black rounded-full transition-all"><FaLinkedinIn /></button>
                                <button className="p-3 bg-white/5 hover:bg-neon-cyan hover:text-black rounded-full transition-all"><FaTwitter /></button>
                                <button className="p-3 bg-white/5 hover:bg-neon-cyan hover:text-black rounded-full transition-all"><FaEnvelope /></button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
