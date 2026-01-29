'use client';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
    { label: "Sports", value: 20, suffix: "+" },
    { label: "Athletes", value: 500, suffix: "+" },
    { label: "Audience", value: 10, suffix: "K+" },
    { label: "Colleges", value: 40, suffix: "+" },
];

export default function Stats() {
    return (
        <section className="py-24 bg-[#050505] border-y border-white/5 relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <Counter key={index} stat={stat} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Counter({ stat, index }: { stat: any, index: number }) {
    const [count, setCount] = useState(0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onViewportEnter={() => {
                // Simple counter effect
                let start = 0;
                const end = stat.value;
                const duration = 2000;
                const incrementTime = (duration / end) * (end > 100 ? 10 : 1); // faster for bigger numbers

                const timer = setInterval(() => {
                    start += 1;
                    setCount(prev => {
                        if (prev >= end) {
                            clearInterval(timer);
                            return end;
                        }
                        return prev + 1;
                    });
                }, 10); // simplified logic for demo
            }}
            className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl relative group hover:bg-white/10 transition-colors"
        >
            {/* Digital Scoreboard Number */}
            <div className="text-5xl md:text-7xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-neon-cyan to-blue-600 mb-2 drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                {stat.value}{stat.suffix}
            </div>

            <div className="text-gray-400 uppercase tracking-[0.2em] font-semibold text-sm">
                {stat.label}
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-cyan/50 rounded-tl-lg"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-cyan/50 rounded-br-lg"></div>
        </motion.div>
    );
}
