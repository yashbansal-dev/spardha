'use client';

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Story() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-black">

            {/* Sticky Content Wrapper */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Background Images - Cross-fading based on scroll */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Image 1: Volleyball Match (Start) */}
                    <motion.div
                        className="absolute inset-0 bg-contain bg-center bg-no-repeat grayscale"
                        style={{
                            backgroundImage: 'url("/volleyball-match.png")',
                            scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]),
                            opacity: useTransform(scrollYProgress, [0, 0.35], [0.4, 0])
                        }}
                    />
                    {/* Image 2: Basketball Match (Middle 1) */}
                    <motion.div
                        className="absolute inset-0 bg-contain bg-center bg-no-repeat grayscale"
                        style={{
                            backgroundImage: 'url("/basketball-match.jpg")',
                            scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]),
                            opacity: useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.65], [0, 0.4, 0.4, 0])
                        }}
                    />
                    {/* Image 3: Basketball Action (Middle 2) */}
                    <motion.div
                        className="absolute inset-0 bg-contain bg-center bg-no-repeat grayscale"
                        style={{
                            backgroundImage: 'url("/basketball-action.jpg")',
                            scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]),
                            opacity: useTransform(scrollYProgress, [0.6, 0.65, 0.8, 0.85], [0, 0.4, 0.4, 0])
                        }}
                    />
                    {/* Image 4: Basketball Night (End) */}
                    <motion.div
                        className="absolute inset-0 bg-contain bg-center bg-no-repeat grayscale"
                        style={{
                            backgroundImage: 'url("/basketball-night.jpg")',
                            scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]),
                            opacity: useTransform(scrollYProgress, [0.8, 0.9], [0, 0.4])
                        }}
                    />
                </div>

                {/* Text 1 */}
                <motion.div
                    className="absolute z-10 text-center"
                    style={{
                        opacity: useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0, 1, 0]),
                        y: useTransform(scrollYProgress, [0.1, 0.3], [50, -50])
                    }}
                >
                    <h2 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">
                        Between <span className="text-red-600">Fear</span> and <span className="text-neon-cyan">Courage</span>
                    </h2>
                </motion.div>

                {/* Text 2 */}
                <motion.div
                    className="absolute z-10 text-center"
                    style={{
                        opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]),
                        y: useTransform(scrollYProgress, [0.4, 0.6], [50, -50])
                    }}
                >
                    <h2 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">
                        Between <span className="text-orange-600">Fatigue</span> and <span className="text-neon-cyan">Discipline</span>
                    </h2>
                </motion.div>

                {/* Text 3 */}
                <motion.div
                    className="absolute z-10 text-center"
                    style={{
                        opacity: useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 0]),
                        y: useTransform(scrollYProgress, [0.7, 0.9], [50, -50])
                    }}
                >
                    <h2 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">
                        Between <span className="text-gray-500">Giving Up</span> and <span className="text-neon-purple">Pushing Forward</span>
                    </h2>
                </motion.div>

                {/* Fog/Mist Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none"></div>
            </div>

        </section>
    );
}
