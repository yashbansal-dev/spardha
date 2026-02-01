'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function RunnerAvatar() {
    const { scrollYProgress } = useScroll();

    // Calculate position based on the same curve logic as LegacyTrack
    // This is a simplified approximation for visual effect
    const x = useTransform(scrollYProgress,
        [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        ["50%", "20%", "80%", "50%", "20%", "80%", "50%", "20%", "80%", "50%", "50%"]
    );

    return (
        <motion.div
            style={{ x, top: 200 }}
            className="fixed z-20 w-12 h-12 -ml-6"
        >
            <div className="relative w-full h-full">
                {/* Glow */}
                <div className="absolute inset-0 bg-neon-cyan/50 blur-xl rounded-full"></div>

                {/* Runner Icon/Sprite */}
                <div className="relative w-full h-full bg-black border-2 border-neon-cyan rounded-full flex items-center justify-center overflow-hidden">
                    <img
                        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5/3o7TKSjRrfIPjeiVyM/giphy.gif" // Placeholder running gif or static icon
                        alt="Runner"
                        className="w-full h-full object-cover mix-blend-screen"
                    />
                </div>
            </div>
        </motion.div>
    );
}
