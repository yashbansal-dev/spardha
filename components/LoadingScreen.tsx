"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [arrows, setArrows] = useState<{ id: number; angle: number; x: number; y: number }[]>([]);

    // Simulation of loading progress
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Non-linear progress for realism
                const increment = Math.random() * 5 + 1;
                return Math.min(prev + increment, 100);
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    // Trigger arrows at specific progress points
    useEffect(() => {
        if (progress > 10 && arrows.length === 0) addArrow();
        if (progress > 30 && arrows.length === 1) addArrow();
        if (progress > 60 && arrows.length === 2) addArrow();
        if (progress > 85 && arrows.length === 3) addArrow();

        if (progress === 100) {
            setTimeout(onComplete, 800); // Wait a bit after 100% before finishing
        }
    }, [progress]);

    const addArrow = () => {
        // Random angle between 0 and 360
        const angle = Math.random() * 360;
        // Calculate final position primarily near the center (bullseye) with some scatter
        // Using polar coordinates: r * cos(theta), r * sin(theta)
        const r = Math.random() * 30; // Within 30px of center
        const x = r * Math.cos((angle * Math.PI) / 180);
        const y = r * Math.sin((angle * Math.PI) / 180);

        setArrows((prev) => [...prev, { id: Date.now(), angle, x, y }]);
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-blue/20 via-black to-black opacity-80" />
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />

            <div className="relative flex flex-col items-center justify-center">
                {/* Target Container with Shake Effect */}
                <motion.div
                    className="relative"
                    animate={arrows.length > 0 ? { x: [0, -5, 5, -5, 5, 0], y: [0, -5, 5, -5, 5, 0] } : {}}
                    transition={{ duration: 0.2 }}
                >
                    {/* Target SVG */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                        {/* Outer Ring */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-4 border-white/10"
                            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        {/* Progress Ring */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="48%"
                                fill="none"
                                stroke="#0ea5e9" // Neon Blue
                                strokeWidth="4"
                                strokeDasharray="100 100" // Not real dasharray for circle yet
                                pathLength="100"
                                strokeDashoffset={100 - progress}
                                strokeLinecap="round"
                                className="transition-all duration-300 ease-out"
                            />
                        </svg>

                        {/* Target Rings */}
                        <div className="absolute w-[80%] h-[80%] rounded-full border-[15px] border-white/10 bg-black/40 shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
                        <div className="absolute w-[60%] h-[60%] rounded-full border-[15px] border-red-600/80 shadow-[0_0_15px_rgba(220,38,38,0.4)]" />
                        <div className="absolute w-[40%] h-[40%] rounded-full border-[15px] border-white/90 shadow-[0_0_15px_rgba(255,255,255,0.4)]" />

                        {/* Bullseye */}
                        <motion.div
                            className="absolute w-[15%] h-[15%] rounded-full bg-neon-cyan shadow-[0_0_20px_#0ea5e9]"
                            animate={progress === 100 ? { scale: [1, 1.5, 30], opacity: [1, 1, 0] } : {}}
                            transition={{ duration: 0.5 }}
                        />

                        {/* Arrows */}
                        <AnimatePresence>
                            {arrows.map((arrow) => (
                                <motion.div
                                    key={arrow.id}
                                    initial={{
                                        opacity: 0,
                                        x: arrow.x - Math.cos(arrow.angle * Math.PI / 180) * 500,
                                        y: arrow.y - Math.sin(arrow.angle * Math.PI / 180) * 500,
                                        rotate: arrow.angle
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: arrow.x,
                                        y: arrow.y,
                                        rotate: arrow.angle
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="absolute z-10"
                                    style={{
                                        left: "50%",
                                        top: "50%",
                                        marginLeft: "-20px", // Center anchor
                                        marginTop: "-5px"
                                    }}
                                >
                                    <div className="relative">
                                        {/* Arrow Body */}
                                        <div className="w-40 h-1 bg-gradient-to-l from-gray-200 to-transparent rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                                        {/* Arrow Feathers */}
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-3 bg-neon-cyan/80 rotate-45 skew-x-12"></div>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-3 bg-neon-cyan/80 -rotate-45 -skew-x-12"></div>
                                        {/* Spark on tip (left side usually for flight direction if rotated, but let's assume right-to-left flight or standard orientation. 
                                  Standard CSS rotate 0 points RIGHT. So if we come from spread, we want tip at LEFT?
                                  Wait, `initial x` is `arrow.x - cos * 500`. 
                                  So it comes FROM (x-500, y-500). That means it flies towards (x,y).
                                  If angle is 0, it comes from left (-500) to right (0). 
                                  So the tip should be on the RIGHT.
                                  Let's check visual: <FaArrowRight> points RIGHT.
                                  So we want the TIP at the DESTINATION.
                                 */}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Percentage Text */}
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
                        <motion.div
                            key={Math.floor(progress)}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-4xl font-bold font-orbitron text-white tracking-widest tabular-nums"
                        >
                            {Math.floor(progress)}%
                        </motion.div>
                        <div className="text-xs text-neon-blue/80 uppercase tracking-[0.2em] mt-1">Target Acquired</div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
