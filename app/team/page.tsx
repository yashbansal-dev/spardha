'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import SkewedTeamCard from '@/components/sections/SkewedTeamCard';

const categories = [
    "Festival Heads", "Core Team", "Events", "Marketing"
];

const teamData = {
    "Festival Heads": [
        { name: "Rahul Verma", role: "Festival Convener", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400", phone: "+91 98765 43210", email: "convener@spardha.in" },
        { name: "Sneha Gupta", role: "Co-Convener", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400", phone: "+91 98765 43211", email: "coconvener@spardha.in" },
    ],
    "Core Team": [
        { name: "Aryan Singh", role: "Technical Head", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400", phone: "+91 98765 43212", email: "tech@spardha.in" },
        { name: "Priya Sharma", role: "Hospitality Head", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400", email: "hospitality@spardha.in" },
    ],
    "Events": [
        { name: "Amit Kumar", role: "Events Head", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400", email: "events@spardha.in" },
    ],
    "Marketing": [
        { name: "Riya Patel", role: "Marketing Head", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400", phone: "+91 98765 43213" },
    ]
};

export default function Team() {
    const [activeTab, setActiveTab] = useState("Festival Heads");
    const members = teamData[activeTab as keyof typeof teamData] || [];

    return (
        <main className="min-h-screen bg-[#020617] relative overflow-x-hidden selection:bg-neon-cyan/30 selection:text-white">
            <Navbar />

            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-grid-perspective opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
            </div>

            <section className="relative z-10 pt-32 pb-20 container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        THE SQUAD
                    </h1>
                    <div className="h-1 w-32 bg-neon-cyan mx-auto skew-x-[20deg] shadow-[0_0_15px_#E3723380]"></div>
                </motion.div>

                {/* Cyber Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-20">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`
                                relative px-8 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-300 skew-x-[20deg] group
                                ${activeTab === cat
                                    ? 'bg-neon-cyan text-black shadow-[0_0_20px_#E3723360]'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10 hover:border-neon-cyan/50'
                                }
                            `}
                        >
                            {/* Unskew Text */}
                            <span className="block -skew-x-[20deg]">
                                {cat}
                            </span>

                            {/* Active Indicator */}
                            {activeTab === cat && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute -bottom-2 -right-2 w-4 h-4 bg-white/50 border-r border-b border-white skew-x-[20deg]"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Filtered Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 max-w-6xl mx-auto">
                    <AnimatePresence mode="popLayout">
                        {members.map((member, idx) => (
                            <SkewedTeamCard key={`${activeTab}-${idx}`} member={member} />
                        ))}
                    </AnimatePresence>
                </div>
            </section>
        </main>
    );
}
