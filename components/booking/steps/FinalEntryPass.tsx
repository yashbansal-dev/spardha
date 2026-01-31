'use client';

import React from 'react';
import { SportItem, UserData } from '../GamifiedWizard';
import { FaBarcode, FaQrcode, FaCheckCircle, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Props {
    cart: SportItem[];
    userData: UserData;
    onNext: () => void;
    onPrev: () => void;
}

export default function FinalEntryPass({ cart, userData, onNext, onPrev }: Props) {

    // Calculations
    const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    return (
        <div className="h-full flex flex-col items-center justify-center p-4">
            <h2 className="text-3xl font-black italic uppercase text-white mb-8 text-center">
                Review Your <span className="text-neon-cyan">Entry Pass</span>
            </h2>

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-3xl bg-white text-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.1)] relative flex flex-col md:flex-row"
            >
                {/* Left: Main Ticket Info */}
                <div className="flex-1 p-8 border-r-2 border-dashed border-gray-300 relative">
                    {/* Perforations */}
                    <div className="absolute top-[-10px] right-[-10px] w-5 h-5 bg-black rounded-full"></div>
                    <div className="absolute bottom-[-10px] right-[-10px] w-5 h-5 bg-black rounded-full"></div>

                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <div className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Event</div>
                            <div className="text-2xl font-black italic uppercase tracking-tighter">SPARDHA 2026</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">Venue</div>
                            <div className="font-bold">JKLU ARENA</div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Athlete</div>
                            <div className="font-bold text-xl uppercase">{userData.fullName || "GUEST ATHLETE"}</div>
                            <div className="text-sm text-gray-500">{userData.college}</div>
                        </div>

                        <div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Registered Events</div>
                            <div className="flex flex-wrap gap-2">
                                {cart.map(item => (
                                    <span key={item.id} className="bg-black text-white px-3 py-1 text-xs font-bold uppercase rounded-sm">
                                        {item.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-t-2 border-black pt-4 flex justify-between items-end">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-wider mb-1">Total Payable</div>
                            <div className="text-4xl font-black font-mono tracking-tighter">₹{total.toFixed(0)}</div>
                            <div className="text-[10px] text-gray-500">(Inc. all taxes)</div>
                        </div>
                        <FaBarcode className="text-6xl opacity-50" />
                    </div>
                </div>

                {/* Right: Stub / Action */}
                <div className="w-full md:w-48 bg-gray-100 p-6 flex flex-col justify-between items-center text-center relative">
                    {/* Perforations */}
                    <div className="absolute top-[-10px] left-[-10px] w-5 h-5 bg-black rounded-full"></div>
                    <div className="absolute bottom-[-10px] left-[-10px] w-5 h-5 bg-black rounded-full"></div>

                    <div className="mt-4">
                        <FaQrcode className="text-6xl mb-2 mx-auto" />
                        <div className="text-[10px] font-mono uppercase text-gray-400">Scan to Verify</div>
                    </div>

                    <button
                        onClick={onNext}
                        className="w-full bg-black text-white py-4 font-black italic uppercase tracking-wider hover:bg-neon-cyan hover:text-black transition-colors flex items-center justify-center gap-2 group"
                    >
                        <FaLock className="text-sm group-hover:hidden" />
                        <span>Confirm</span>
                    </button>
                </div>
            </motion.div>

            <div className="mt-8">
                <button onClick={onPrev} className="text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-widest">
                    &larr; Modified Selection
                </button>
            </div>
        </div>
    );
}
