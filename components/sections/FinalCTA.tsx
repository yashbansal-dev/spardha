'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function FinalCTA() {
    return (
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">

            {/* Tunnel Light Effect */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                {/* Radial Gradient simulating light at end of tunnel */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] bg-[radial-gradient(circle,_#ffffff_0%,_#00f3ff_10%,_#020617_50%)] opacity-20 blur-[100px]"></div>

                {/* Rays */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,_transparent_0deg,_white_10deg,_transparent_20deg,_transparent_360deg)] opacity-10 animate-[spin_20s_linear_infinite]"></div>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <motion.h2
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-8xl font-black text-white italic tracking-tighter mb-8"
                >
                    YOUR GAME <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white">STARTS NOW.</span>
                </motion.h2>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <Link
                        href="#register"
                        className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black text-2xl font-bold uppercase tracking-widest rounded-full hover:scale-105 hover:bg-neon-cyan transition-all shadow-[0_0_50px_rgba(255,255,255,0.3)]"
                    >
                        Register Now <FaArrowRight />
                    </Link>
                </motion.div>
            </div>

        </section>
    );
}
