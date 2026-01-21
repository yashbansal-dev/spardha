'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedinIn, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

const categories = [
    "Hospitality", "Events & Competitions", "Marketing", "Public Relations",
    "Web & App", "Media & Publicity", "Design", "Show Management", "Finance",
    "Security", "Festival Coordinators"
];

const teamData = {
    "Hospitality": [
        { name: "Rahul Verma", role: "Head", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400" },
        { name: "Sneha Gupta", role: "Head", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
        { name: "Aryan Singh", role: "Manager", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400" },
    ],
    "Events & Competitions": [
        { name: "Priya Sharma", role: "Secretary", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400" },
        { name: "Amit Kumar", role: "Manager", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" },
    ],
    // Default placeholder for other categories
    "default": [
        { name: "Member Name", role: "Core Member", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" },
        { name: "Member Name", role: "Coordinator", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400" },
    ]
};

export default function Team() {
    const [activeTab, setActiveTab] = useState("Hospitality");

    const members = teamData[activeTab as keyof typeof teamData] || teamData["default"];

    return (
        <main className="min-h-screen bg-[#060b14] text-white">
            <Navbar />

            <section className="pt-32 pb-20 px-4 min-h-screen flex flex-col">
                <div className="container mx-auto flex-grow flex flex-col">
                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-8xl font-bold text-center text-white mb-16 tracking-tighter"
                    >
                        TEAM
                    </motion.h1>

                    {/* Members Grid */}
                    <div className="flex-grow flex items-center justify-center mb-16">
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
                        >
                            <AnimatePresence mode='popLayout'>
                                {members.map((member, idx) => (
                                    <motion.div
                                        key={`${activeTab}-${idx}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                                        className="w-72 relative group"
                                    >
                                        {/* Frame Card */}
                                        <div className="relative h-96 border-2 border-gray-700 bg-gray-900 overflow-hidden">
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />

                                            {/* Name Bar */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-white p-3 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                <h3 className="text-black font-bold text-lg uppercase">{member.name}</h3>
                                                <p className="text-gray-600 text-xs font-semibold tracking-wider">{member.role}</p>
                                            </div>
                                        </div>

                                        {/* Socials */}
                                        <div className="flex justify-center gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <a href="#" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center text-gray-400 hover:border-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all"><FaLinkedinIn size={14} /></a>
                                            <a href="#" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center text-gray-400 hover:border-neon-pink hover:text-neon-pink hover:bg-neon-pink/10 transition-all"><FaInstagram size={14} /></a>
                                            <a href="#" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center text-gray-400 hover:border-neon-blue hover:text-neon-blue hover:bg-neon-blue/10 transition-all"><FaEnvelope size={14} /></a>
                                            <a href="#" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center text-gray-400 hover:border-white hover:text-white hover:bg-white/10 transition-all"><FaPhone size={14} /></a>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Bottom Nav Bar */}
                    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 py-4 overflow-x-auto z-40">
                        <div className="flex justify-start md:justify-center gap-8 px-8 min-w-max">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveTab(cat)}
                                    className={`text-sm uppercase tracking-wider font-semibold transition-colors
                                ${activeTab === cat ? 'text-neon-cyan border-b-2 border-neon-cyan pb-1' : 'text-gray-500 hover:text-white'}
                            `}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
