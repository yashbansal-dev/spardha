'use client';

import { motion } from "framer-motion";
import { FaTrophy, FaBolt, FaMedal, FaUsers } from "react-icons/fa";

const cards = [
    {
        icon: FaTrophy,
        title: "Multi-Sport Championship",
        description: "Witness top-tier athletes competing across 50+ sporting events for ultimate glory.",
        color: "text-neon-cyan"
    },
    {
        icon: FaBolt,
        title: "High Octane Energy",
        description: "Experience the electrifying atmosphere of JKLU's biggest sports festival.",
        color: "text-neon-orange"
    },
    {
        icon: FaMedal,
        title: "Competitions & Rewards",
        description: "Huge prize pools and recognition for the best sporting talents in the country.",
        color: "text-neon-purple"
    },
    {
        icon: FaUsers,
        title: "Vibrant Community",
        description: "Connect with 2000+ participants from 30+ colleges across India.",
        color: "text-neon-blue"
    }
];

export default function About() {
    return (
        <section id="about" className="section-padding relative overflow-hidden">
            {/* Background Decorative */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[100px] -translate-y-1/2"></div>

            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-sans mb-4">
                        About <span className="text-neon-cyan">SPARDHA</span>
                    </h2>
                    <div className="w-24 h-1 bg-neon-cyan mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
                        SPARDHA is the annual sports festival of <strong className="text-white">JK Lakshmipat University (JKLU)</strong>.
                        It is a celebration of grit, passion, and sportsmanship. Every year, athletes from across the nation
                        converge at JKLU to compete, conquer, and create history.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 flex flex-col items-center text-center group hover:-translate-y-2"
                        >
                            <div className={`text-4xl mb-6 ${card.color} p-4 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,0,0,0.2)]`}>
                                <card.icon />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">
                                {card.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
