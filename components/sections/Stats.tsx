'use client';

import CountUp from 'react-countup';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
    { label: "Events", value: 50, suffix: "+" },
    { label: "Participants", value: 2000, suffix: "+" },
    { label: "Colleges", value: 30, suffix: "+" },
    { label: "Days Fest", value: 3, suffix: "" },
];

export default function Stats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-20 bg-black/50 border-y border-white/5 relative">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-2 font-mono">
                                {isInView ? <CountUp end={stat.value} duration={2.5} /> : 0}
                                <span className="text-neon-cyan">{stat.suffix}</span>
                            </div>
                            <p className="text-gray-400 uppercase tracking-widest text-sm font-semibold">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
