'use client';

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const DecryptText = ({ text, className }: { text: string, className?: string }) => {
    const [displayText, setDisplayText] = useState(text);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

    useEffect(() => {
        if (!isInView) return;

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(prev =>
                text.split("").map((letter, index) => {
                    if (index < iteration) return text[index];
                    return letters[Math.floor(Math.random() * 26)];
                }).join("")
            );

            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [isInView, text]);

    return <span ref={ref} className={className}>{displayText}</span>;
};

export default function Story() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-black font-mono">
            {/* Sticky Wrapper */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">

                {/* HUD Overlay Layer */}
                <div className="absolute inset-0 z-20 pointer-events-none p-6 md:p-12 border-[20px] border-transparent">
                    {/* Corners */}




                    {/* Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,255,247,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
                </div>

                {/* Background Images */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                    <motion.div
                        className="absolute inset-0 bg-cover bg-center grayscale mix-blend-luminosity"
                        style={{ backgroundImage: 'url("/volleyball-match.png")', opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
                    />
                    <motion.div
                        className="absolute inset-0 bg-cover bg-center grayscale mix-blend-luminosity"
                        style={{ backgroundImage: 'url("/basketball-match.jpg")', opacity: useTransform(scrollYProgress, [0.3, 0.4, 0.6], [0, 1, 0]) }}
                    />
                    <motion.div
                        className="absolute inset-0 bg-cover bg-center grayscale mix-blend-luminosity"
                        style={{ backgroundImage: 'url("/basketball-action.jpg")', opacity: useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 0]) }}
                    />

                    {/* Digital Noise Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
                </div>

                {/* Narrative Text Content */}
                <div className="relative z-30 max-w-4xl mx-auto text-center px-4">

                    {/* Block 1 */}
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [1, 0]), display: useTransform(scrollYProgress, (v) => v > 0.3 ? "none" : "block") }}
                    >
                        <div className="text-neon-cyan text-sm mb-4 tracking-[0.5em] border-b border-neon-cyan/30 inline-block pb-2">
                            MISSION_01: ORIGIN
                        </div>
                        <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 uppercase">
                            <DecryptText text="Between Fear" /> <br />
                            <span className="text-neon-cyan">And Courage</span>
                        </h2>
                        <p className="text-gray-400 max-w-lg mx-auto leading-relaxed border-l-2 border-neon-orange pl-4 text-left">
                            Protocol initialized. The arena is not just a ground; it's a crucible where hesitation is deleted and legends are compiled.
                        </p>
                    </motion.div>

                    {/* Block 2 */}
                    <motion.div
                        style={{
                            opacity: useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 1, 0]),
                            display: useTransform(scrollYProgress, (v) => (v < 0.35 || v > 0.65) ? "none" : "block")
                        }}
                    >
                        <div className="text-neon-orange text-sm mb-4 tracking-[0.5em] border-b border-neon-orange/30 inline-block pb-2">
                            MISSION_02: ENDURANCE
                        </div>
                        <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 uppercase">
                            <span className="text-neon-orange">Fatigue Is</span> <br />
                            <DecryptText text="Just a Glitch" />
                        </h2>
                        <p className="text-gray-400 max-w-lg mx-auto leading-relaxed border-r-2 border-neon-cyan pr-4 text-right">
                            System overload imminent. Pushing past theoretical limits. Re-routing power to will. Success is the only valid output.
                        </p>
                    </motion.div>

                    {/* Block 3 */}
                    <motion.div
                        style={{
                            opacity: useTransform(scrollYProgress, [0.7, 0.85], [0, 1]),
                            display: useTransform(scrollYProgress, (v) => v < 0.7 ? "none" : "block")
                        }}
                    >
                        <div className="text-white/50 text-sm mb-4 tracking-[0.5em] border-b border-white/20 inline-block pb-2">
                            MISSION_03: VICTORY
                        </div>
                        <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 uppercase">
                            <DecryptText text="Defining" /> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">The Legacy</span>
                        </h2>
                        <p className="text-gray-400 max-w-lg mx-auto leading-relaxed border-l-2 border-white/50 pl-4 text-left">
                            Archive complete. The data is clear: only those who dare to override their limits will remain in history.
                        </p>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}

