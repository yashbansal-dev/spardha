'use client';

import { motion } from 'framer-motion';

interface ChronoGuideProps {
    years: string[];
    progress: number; // 0 to 1
}

export default function ChronoGuide({ years, progress }: ChronoGuideProps) {
    return (
        <div className="fixed bottom-10 left-0 right-0 z-50 flex justify-center items-center pointer-events-none">
            <div className="relative w-[300px] h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">

                {/* Progress Bar */}
                <motion.div
                    className="absolute top-0 left-0 h-full bg-neon-cyan shadow-[0_0_10px_#0ef]"
                    style={{ width: `${progress * 100}%` }}
                />

                {/* Ticks */}
                <div className="absolute inset-0 flex justify-between items-center px-2">
                    {years.map((year, i) => (
                        <div key={year} className="w-1 h-1 bg-white/50 rounded-full" />
                    ))}
                </div>
            </div>

            <div className="absolute bottom-4 text-[10px] text-neon-cyan font-mono tracking-widest">
                TIMELINE_SYNC
            </div>
        </div>
    );
}
