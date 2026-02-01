'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlay, FaQuoteLeft } from 'react-icons/fa';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    event: any;
}

export default function MemoryReplayModal({ isOpen, onClose, event }: Props) {
    if (!event) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        onClick={onClose}
                    ></div>

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 text-white hover:text-neon-cyan transition-colors"
                        >
                            <FaTimes className="text-2xl" />
                        </button>

                        {/* Media Section */}
                        <div className="flex-1 relative min-h-[40vh] md:min-h-full">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                            <button className="absolute inset-0 flex items-center justify-center group">
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                                    <FaPlay className="text-3xl text-white ml-2" />
                                </div>
                            </button>
                        </div>

                        {/* Details Section */}
                        <div className="w-full md:w-[400px] p-8 overflow-y-auto">
                            <div className="text-neon-cyan font-mono text-sm mb-4">{event.year} ARCHIVE</div>
                            <h2 className="text-3xl font-black italic uppercase text-white mb-6 leading-tight">
                                {event.title}
                            </h2>

                            <div className="mb-8">
                                <FaQuoteLeft className="text-gray-600 mb-2 text-xl" />
                                <p className="text-gray-300 italic font-light text-lg">
                                    "{event.quote || "A legendary moment in Spardha history that redefined the game."}"
                                </p>
                            </div>

                            <div className="space-y-6">
                                {Object.entries(event.stats).map(([key, value]) => (
                                    <div key={key} className="bg-white/5 p-4 rounded-lg border border-white/5">
                                        <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">{key}</div>
                                        <div className="text-xl font-bold text-white">{value as string}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
