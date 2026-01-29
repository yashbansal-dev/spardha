'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';


export default function Competitions() {
    return (
        <main className="min-h-screen relative overflow-hidden bg-black">
            <Navbar />

            {/* Hero Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90 z-10"></div>
                {/* Placeholder for Sports Team Group Photo */}
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat opacity-60 scale-105 animate-float"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=2070&auto=format&fit=crop")' }}
                ></div>
            </div>

            {/* Main Content */}
            <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">

                {/* Small Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-neon-cyan font-bold tracking-[0.5em] text-sm md:text-lg uppercase mb-4"
                >
                    Spardha '25
                </motion.p>

                {/* Huge Title */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold font-sans text-white tracking-tight mb-6 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                >
                    COMPETITIONS
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-gray-300 text-lg md:text-xl font-light tracking-wide mb-12 max-w-2xl"
                >
                    The last date of Registration is 29th September.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-6 items-center"
                >
                    <button className="px-10 py-3 rounded-full border border-neon-cyan bg-neon-cyan/10 text-neon-cyan font-bold tracking-widest uppercase hover:bg-neon-cyan hover:text-black transition-all duration-300 shadow-[0_0_15px_#00f3ff20] hover:shadow-[0_0_30px_#00f3ff60] min-w-[200px]">
                        Login
                    </button>
                    <button className="px-10 py-3 rounded-full border border-white/20 bg-white/5 text-white font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 min-w-[200px] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        Authenticate
                    </button>
                    <button className="px-10 py-3 rounded-full border border-neon-purple bg-neon-purple/10 text-neon-purple font-bold tracking-widest uppercase hover:bg-neon-purple hover:text-white transition-all duration-300 shadow-[0_0_15px_#bc13fe20] hover:shadow-[0_0_30px_#bc13fe60] min-w-[200px]">
                        Contact Us
                    </button>
                </motion.div>

            </section>


        </main>
    );
}
