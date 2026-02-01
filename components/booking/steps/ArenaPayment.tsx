'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaWallet, FaUniversity, FaLock } from 'react-icons/fa';

interface Props {
    onComplete: (orderId: string) => void;
    onPrev: () => void;
    amount: number;
}

export default function ArenaPayment({ onComplete, onPrev, amount }: Props) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [showTunnel, setShowTunnel] = useState(true);

    // Initial Tunnel Effect
    useEffect(() => {
        const timer = setTimeout(() => setShowTunnel(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handlePayment = async () => {
        setIsProcessing(true);
        // Simulate Grid Lock
        await new Promise(resolve => setTimeout(resolve, 3000));
        const mockOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        onComplete(mockOrderId);
    };

    return (
        <div className="h-full relative overflow-hidden flex items-center justify-center">

            {/* Tunnel Overlay */}
            <AnimatePresence>
                {showTunnel && (
                    <motion.div
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 5, opacity: 0 }}
                        exit={{ display: 'none' }}
                        transition={{ duration: 1.5, ease: "easeIn" }}
                        className="absolute inset-0 z-50 bg-black flex items-center justify-center pointer-events-none"
                    >
                        <div className="w-full h-full bg-[radial-gradient(circle,_transparent_10%,_black_90%)] border-[100px] border-black rounded-full shadow-[inset_0_0_100px_#0ef]"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Payment Jumbotron */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 }}
                className="w-full max-w-2xl bg-black border-4 border-neon-cyan shadow-[0_0_50px_rgba(0,243,255,0.3)] rounded-3xl p-1 relative overflow-hidden"
            >
                {/* Screen Scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>

                <div className="bg-[#111] rounded-2xl p-8 relative z-20 h-full flex flex-col items-center text-center">
                    <h2 className="text-3xl font-black italic uppercase text-white mb-2">
                        SECURE <span className="text-neon-cyan">GATEWAY</span>
                    </h2>
                    <p className="text-gray-400 text-sm mb-8">Complete transaction to lock your spot</p>

                    <div className="w-full bg-white/5 border border-white/10 rounded-xl p-6 mb-8 flex justify-between items-center">
                        <span className="text-gray-400 uppercase tracking-widest text-sm">Total Payable</span>
                        <span className="text-4xl font-mono font-bold text-neon-cyan">₹{amount.toFixed(2)}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full mb-8">
                        {['UPI', 'CARD', 'NET BANKING', 'WALLET'].map((method) => (
                            <button key={method} className="bg-white/5 hover:bg-neon-cyan hover:text-black border border-white/10 p-4 rounded-lg font-bold uppercase transition-all flex flex-col items-center gap-2">
                                {method === 'UPI' && <FaWallet className="text-xl" />}
                                {method === 'CARD' && <FaCreditCard className="text-xl" />}
                                {method === 'NET BANKING' && <FaUniversity className="text-xl" />}
                                {method === 'WALLET' && <FaWallet className="text-xl" />}
                                <span>{method}</span>
                            </button>
                        ))}
                    </div>

                    <div className="w-full">
                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="w-full bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-black italic uppercase text-xl py-5 rounded-lg shadow-[0_0_30px_rgba(227,114,51,0.5)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden"
                        >
                            {isProcessing && (
                                <div className="absolute inset-0 bg-white/20 animate-progress-loading origin-left"></div>
                            )}
                            {isProcessing ? 'PROCESSING...' : (
                                <>
                                    <FaLock /> INITIATE TRANSFER
                                </>
                            )}
                        </button>
                    </div>

                    <button onClick={onPrev} disabled={isProcessing} className="mt-4 text-gray-500 hover:text-white text-xs uppercase tracking-widest">
                        Cancel Transaction
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
