'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function TimeTravelIndicator() {
    const { scrollYProgress } = useScroll();
    const [year, setYear] = useState(2025);

    // Map scroll progress to years (reverse chronological)
    const currentYear = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.9], [2025, 2024, 2023, 2022]);

    useEffect(() => {
        return currentYear.on("change", (latest) => {
            setYear(Math.round(latest));
        });
    }, [currentYear]);

    return (
        <motion.div
            className="fixed top-24 right-4 md:right-12 z-50 mix-blend-difference pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
        >
            <div className="flex flex-col items-end">
                <div className="text-[10px] text-neon-cyan uppercase tracking-[0.2em] mb-1">Time Travel</div>
                <div className="text-6xl md:text-8xl font-black font-mono text-white leading-none">
                    {year}
                </div>
            </div>
        </motion.div>
    );
}
