'use client';

import React, { useEffect, useState } from 'react';
import { SportItem } from '../GamifiedWizard';
import Link from 'next/link';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { motion } from 'framer-motion';
import { FaDownload, FaHome, FaTrophy } from 'react-icons/fa';

interface Props {
    orderId: string;
    cart: SportItem[];
}

export default function VictoryMoment({ orderId, cart }: Props) {
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 8000); // Stop confetti after 8s
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-full flex flex-col items-center justify-center text-center relative">
            {showConfetti && <Confetti width={width} height={height} numberOfPieces={500} recycle={false} colors={['#0ef', '#f0f', '#ff0', '#fff']} />}

            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="mb-8"
            >
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(255,165,0,0.6)] mb-6 animate-bounce">
                    <FaTrophy className="text-5xl text-white" />
                </div>

                <h1 className="text-6xl md:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white tracking-tighter mb-4">
                    VICTORY!
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
                    WELCOME TO THE ARENA, ATHLETE. <br /> YOUR SPOT IS LOCKED.
                </p>
            </motion.div>

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl max-w-md w-full backdrop-blur-md"
            >
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                    <span className="text-gray-400 uppercase text-xs tracking-widest">Athlete ID</span>
                    <span className="text-neon-cyan font-mono font-bold text-xl">{orderId}</span>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="text-left">
                        <div className="text-gray-400 uppercase text-xs tracking-widest mb-2">Active Events</div>
                        <div className="flex flex-wrap gap-2">
                            {cart.map(item => (
                                <span key={item.id} className="bg-black/50 border border-white/20 px-3 py-1 text-xs rounded text-white font-bold">
                                    {item.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button className="w-full bg-white text-black font-bold py-3 rounded flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                        <FaDownload /> DOWNLOAD ENTRY PASS
                    </button>
                    <Link href="/" className="w-full bg-transparent border border-white/20 text-white font-bold py-3 rounded flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                        <FaHome /> RETURN TO LOBBY
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
