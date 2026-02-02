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
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] bg-[radial-gradient(circle,_rgba(255,69,0,0.05)_0%,_transparent_60%)] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
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
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
            onViewportEnter={() => {
                let start = 0;
                const end = stat.value;
                const duration = 2000;
                const timer = setInterval(() => {
                    start += Math.ceil(end / 100);
                    if (start >= end) {
                        setCount(end);
                        clearInterval(timer);
                    } else {
                        setCount(start);
                    }
                }, 20);
            }}
            className="group relative flex flex-col items-center justify-center p-8 md:p-12 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-neon-orange/50 transition-all duration-500 backdrop-blur-sm"
        >
            {/* Glow Behind */}
            <div className="absolute inset-0 bg-neon-orange/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            {/* Main Number - God Level Typography */}
            <div className="relative z-10 text-7xl md:text-9xl font-gang text-white group-hover:text-neon-orange transition-colors duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_30px_rgba(255,69,0,0.6)]">
                {count}{stat.suffix}
            </div>

            {/* Label */}
            <div className="relative z-10 mt-4 text-gray-500 group-hover:text-white font-sans font-bold uppercase tracking-[0.3em] text-sm md:text-base transition-colors duration-300">
                {stat.label}
            </div>

            {/* Tech Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 group-hover:border-neon-orange transition-colors duration-500"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 group-hover:border-neon-orange transition-colors duration-500"></div>
        </motion.div>
    );
}
