'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import HolographicTeamCard from '@/components/sections/HolographicTeamCard';

const categories = [
    "Faculties", "Organising Head", "Core"
];
 
const teamData = {
    "Faculties": [
        { name: "Dr. Sutar", role: "Faculty Coordinator", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400", email: "faculty@jklu.edu.in" },
        { name: "Prof. Sharma", role: "Sports Mentor", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400", email: "mentor@jklu.edu.in" },
    ],
    "Organising Head": [
        { name: "Rahul Verma", role: "Festival Convener", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400", phone: "+91 98765 43210", email: "convener@spardha.in" },
        { name: "Sneha Gupta", role: "Co-Convener", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400", phone: "+91 98765 43211", email: "coconvener@spardha.in" },
    ],
    "Core": [
        { name: "Aryan Singh", role: "Technical Head", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400", phone: "+91 98765 43212", email: "tech@spardha.in" },
        { name: "Priya Sharma", role: "Hospitality Head", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400", email: "hospitality@spardha.in" },
        { name: "Amit Kumar", role: "Events Head", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400", email: "events@spardha.in" },
        { name: "Riya Patel", role: "Marketing Head", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400", phone: "+91 98765 43213" },
    ]
};

export default function Team() {
    const [activeTab, setActiveTab] = useState("Faculties");
    const members = teamData[activeTab as keyof typeof teamData] || [];

    return (
        <main className="min-h-screen bg-black relative overflow-x-hidden selection:bg-neon-cyan/30 selection:text-white">
            <Navbar />

            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-grid-perspective opacity-10"></div>
                {/* Floating Particles/Glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-orange/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </div>

            <section className="relative z-10 pt-32 pb-20 container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        THE SQUAD
                    </h1>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[2px] w-12 bg-neon-cyan"></div>
                        <p className="font-mono text-neon-cyan/80 tracking-[0.2em] text-sm uppercase">Meet the Architects of Chaos</p>
                        <div className="h-[2px] w-12 bg-neon-cyan"></div>
                    </div>
                </motion.div>

                {/* Cyber Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-6 mb-24">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`
                                relative px-6 py-2 font-bold uppercase tracking-widest text-sm transition-all duration-300 group
                                ${activeTab === cat
                                    ? 'text-black'
                                    : 'text-gray-400 hover:text-white'
                                }
                            `}
                        >
                            {/* Background Shape */}
                            <div className={`absolute inset-0 skew-x-[-12deg] transition-all duration-300 ${activeTab === cat ? 'bg-neon-cyan shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 'bg-white/5 border border-white/10 group-hover:bg-white/10'}`}></div>

                            <span className="relative z-10 block">
                                {cat}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Holographic Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto perspective-2000">
                    <AnimatePresence mode="popLayout">
                        {members.map((member, idx) => (
                            <motion.div
                                key={`${activeTab}-${idx}`}
                                layout
                                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                            >
                                <HolographicTeamCard member={member} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>
        </main>
    );
}
