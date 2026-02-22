"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface SpardhaLoaderProps {
    onComplete?: () => void;
    className?: string; // Allow custom classes
}

export default function SpardhaLoader({ onComplete, className }: SpardhaLoaderProps) {
    const [loadingText, setLoadingText] = useState("INITIALIZING");
    const [progress, setProgress] = useState(0);

    // Glitch text effect helpers
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    const targetWord = "SPARDHA";
    const [displayText, setDisplayText] = useState("SPARDHA");

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrameId: number;
        const DURATION_MS = 3000;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const nextProgress = Math.min((elapsed / DURATION_MS) * 100, 100);

            // 1. Update Progress
            setProgress(nextProgress);

            // 2. Update Text (Merged logic for performance)
            const revealedCount = Math.floor((nextProgress / 100) * targetWord.length);
            let newText = "";
            for (let i = 0; i < targetWord.length; i++) {
                if (i < revealedCount) {
                    newText += targetWord[i];
                } else {
                    newText += letters[Math.floor(Math.random() * letters.length)];
                }
            }
            setDisplayText(newText);

            // 3. Update Status Text
            if (nextProgress < 30) setLoadingText("INITIALIZING");
            else if (nextProgress < 60) setLoadingText("LOADING ASSETS");
            else if (nextProgress < 90) setLoadingText("CONNECTING...");
            else setLoadingText("SYS://ONLINE");

            if (nextProgress < 100) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                if (onComplete) setTimeout(onComplete, 1000); // Wait 1s after 100%
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [onComplete]);

    return (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white overflow-hidden ${className}`}>
            {/* Background Grid & Particles */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,114,51,0.1)_0%,transparent_70%)]"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Main Logo Text with Glitch */}
                <motion.div
                    initial={{ opacity: 0, letterSpacing: "0.5em", marginRight: "-0.5em" }}
                    animate={{ opacity: 1, letterSpacing: "0.2em", marginRight: "-0.2em" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative flex items-center justify-center"
                >
                    <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 font-gang relative">
                        {displayText}
                    </h1>

                    {/* Glitch Overlay (Optional red/blue shift) */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full text-6xl md:text-8xl font-black text-neon-cyan opacity-50 mix-blend-screen pointer-events-none flex items-center justify-center"
                        animate={{
                            x: [0, -2, 2, -1, 1, 0],
                            opacity: [0.5, 0.3, 0.6, 0.3, 0.5]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            repeatType: "mirror"
                        }}
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
                    >
                        {targetWord}
                    </motion.div>

                    <motion.div
                        className="absolute top-0 left-0 w-full h-full text-6xl md:text-8xl font-black text-neon-blue opacity-50 mix-blend-screen pointer-events-none flex items-center justify-center"
                        animate={{
                            x: [0, 2, -2, 1, -1, 0],
                            opacity: [0.5, 0.3, 0.6, 0.3, 0.5]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2.5,
                            repeatType: "mirror"
                        }}
                        style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)" }}
                    >
                        {targetWord}
                    </motion.div>
                </motion.div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-10 left-10 w-32 h-32 border-l-2 border-t-2 border-neon-cyan/30 rounded-tl-3xl opacity-50"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 border-r-2 border-b-2 border-neon-cyan/30 rounded-br-3xl opacity-50"></div>
        </div>
    );
}
