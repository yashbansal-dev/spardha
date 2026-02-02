'use client';

import React, { useState } from 'react';
import { SportItem } from '../GamifiedWizard';
import { FaFutbol, FaBasketballBall, FaRunning, FaGamepad, FaChessKing, FaCheck, FaInfoCircle } from 'react-icons/fa';
import { MdSportsCricket, MdSportsKabaddi, MdFemale, MdMale } from 'react-icons/md';
import { GiShuttlecock, GiVolleyballBall } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';

// MERGED DATA: combining visuals from old DraftBoard with Logic/Pricing from EventsScrollStack
export const ALL_SPORTS = [
    {
        id: 'cricket-leather',
        name: 'Cricket (Leather)',
        icon: MdSportsCricket,
        bg: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80',
        hasGender: true,
        bgGradient: 'from-blue-900 to-slate-900',
        prizes: { boys: 33000, girls: 8000 },
        fees: { boys: 4000, girls: 2000 },
        price: 500
    },
    {
        id: 'football',
        name: 'Football',
        icon: FaFutbol,
        bg: 'https://images.unsplash.com/photo-1579952363873-27f3bde87a34?auto=format&fit=crop&q=80',
        hasGender: true,
        price: 400
    },
    {
        id: 'basketball',
        name: 'Basketball',
        icon: FaBasketballBall,
        bg: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80',
        hasGender: true,
        price: 350
    },
    {
        id: 'volleyball',
        name: 'Volleyball',
        icon: GiVolleyballBall,
        bg: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&q=80',
        hasGender: true,
        price: 350
    },
    {
        id: 'badminton',
        name: 'Badminton',
        icon: GiShuttlecock,
        bg: 'https://images.unsplash.com/photo-1626224583764-847890e058f5?auto=format&fit=crop&q=80',
        hasGender: true,
        price: 300
    },
    {
        id: 'table-tennis',
        name: 'Table Tennis',
        icon: FaRunning,
        bg: 'https://images.unsplash.com/photo-1534158914592-062992bbe900?auto=format&fit=crop&q=80',
        hasGender: true,
        price: 250
    },
    {
        id: 'athletics',
        name: 'Athletics',
        icon: FaRunning,
        bg: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80',
        hasGender: true,
        price: 200
    },
    {
        id: 'kabaddi',
        name: 'Kabaddi',
        icon: MdSportsKabaddi,
        bg: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80',
        hasGender: false,
        price: 350
    },
    {
        id: 'kho-kho',
        name: 'Kho-Kho',
        icon: FaRunning, // Placeholder
        bg: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80',
        hasGender: false,
        price: 300
    },
    {
        id: 'box-cricket',
        name: 'Box Cricket',
        icon: MdSportsCricket,
        bg: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80',
        hasGender: false,
        price: 400
    },
    {
        id: 'chess',
        name: 'Chess',
        icon: FaChessKing,
        bg: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80',
        hasGender: false,
        price: 200
    },
    {
        id: 'esports',
        name: 'E-Sports',
        icon: FaGamepad,
        bg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
        hasGender: false,
        price: 600
    }
];

interface Props {
    cart: SportItem[];
    addToCart: (item: SportItem) => void;
    removeFromCart: (id: string) => void;
    onNext: () => void;
    onPrev: () => void;
}

export default function SportsDraftBoard({ cart, addToCart, removeFromCart, onNext, onPrev }: Props) {

    // Helper to check if a specific variant is in cart
    const isInCart = (sportId: string, category?: string) => {
        // Construct the expected unique ID for precise matching
        const uniqueId = category && category !== 'Open' ? `${sportId}-${category}` : sportId;
        return cart.some(item => item.id === uniqueId);
    };

    const toggleSport = (sport: typeof ALL_SPORTS[0], category: 'Boys' | 'Girls' | 'Open') => {
        // Unique ID construction to match Global Cart pattern
        const uniqueId = category !== 'Open' ? `${sport.id}-${category}` : sport.id;

        const existingItem = cart.find(item => item.id === uniqueId);

        if (existingItem) {
            removeFromCart(uniqueId);
        } else {
            // Determine price based on category if specific fees exist
            let finalPrice = sport.price;
            if (category === 'Boys' && (sport as any).fees?.boys) finalPrice = (sport as any).fees.boys;
            if (category === 'Girls' && (sport as any).fees?.girls) finalPrice = (sport as any).fees.girls;

            addToCart({
                id: uniqueId,
                name: sport.name,
                price: finalPrice,
                image: sport.bg,
                category: category
            });
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col md:flex-row h-full gap-6">

                {/* LEFT: Draft Board Grid */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <h2 className="text-3xl font-black italic uppercase text-white mb-6 sticky top-0 bg-black/90 backdrop-blur-md z-30 py-4 border-b border-white/10 flex justify-between items-center transition-all">
                        <div className="flex items-center gap-3">
                            <span className="text-neon-cyan text-4xl">⚡</span>
                            <span>SELECT <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-blue-500">EVENTS</span></span>
                        </div>
                        <div className="text-xs font-mono text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            NO LIMITS // UNLOCKED
                        </div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-24">
                        {ALL_SPORTS.map((sport) => (
                            <div
                                key={sport.id}
                                className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.1)]"
                            >
                                {/* Background Image */}
                                <div className="h-32 w-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${sport.bg})` }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111]"></div>

                                    {/* Title Overlay */}
                                    <div className="absolute bottom-2 left-4 z-10">
                                        <h3 className="text-xl font-black italic uppercase text-white leading-none flex items-center gap-2">
                                            <sport.icon className="text-neon-cyan" /> {sport.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="p-4 space-y-3">
                                    <div className="text-xs font-mono text-gray-400 flex justify-between">
                                        <span>ENTRY FEE</span>
                                        <span className="text-white font-bold">₹{sport.price}</span>
                                    </div>

                                    <div className="flex gap-2">
                                        {sport.hasGender ? (
                                            <>
                                                <button
                                                    onClick={() => toggleSport(sport, 'Boys')}
                                                    className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 border ${isInCart(sport.id, 'Boys') ? 'bg-neon-cyan text-black border-neon-cyan shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}
                                                >
                                                    {isInCart(sport.id, 'Boys') ? <FaCheck /> : <MdMale className="text-lg" />}
                                                    BOYS
                                                </button>
                                                <button
                                                    onClick={() => toggleSport(sport, 'Girls')}
                                                    className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 border ${isInCart(sport.id, 'Girls') ? 'bg-pink-500 text-white border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.4)]' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}
                                                >
                                                    {isInCart(sport.id, 'Girls') ? <FaCheck /> : <MdFemale className="text-lg" />}
                                                    GIRLS
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => toggleSport(sport, 'Open')}
                                                className={`w-full py-3 rounded-lg text-sm font-bold uppercase transition-all flex items-center justify-center gap-2 border ${isInCart(sport.id, 'Open') ? 'bg-neon-cyan text-black border-neon-cyan shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'}`}
                                            >
                                                {isInCart(sport.id, 'Open') ? 'ADDED TO ROSTER' : 'ADD TO ROSTER'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Loadout Sidebar */}
                <div className="w-full md:w-80 bg-[#080808] border-l border-white/10 p-6 flex flex-col relative z-40 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
                    <div className="flex-1">
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6 flex justify-between items-center">
                            <span>Your Loadout</span>
                            <span className="text-neon-cyan">{cart.length} Active</span>
                        </h3>

                        <div className="space-y-3 overflow-y-auto max-h-[60vh] custom-scrollbar pr-2">
                            <AnimatePresence mode="popLayout">
                                {cart.map((item, idx) => (
                                    <motion.div
                                        key={item.id} // Standard ID keying since context ensures uniqueness
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        layout
                                        className="bg-white/5 border border-white/10 p-3 rounded-r-lg border-l-4 border-l-neon-cyan flex justify-between items-center group hover:bg-white/10 transition-colors"
                                    >
                                        <div>
                                            <div className="font-bold text-sm uppercase text-white flex items-center gap-2">
                                                {item.name}
                                            </div>
                                            <div className="text-[10px] font-mono text-gray-400 uppercase mt-1 flex gap-2">
                                                <span className={`${item.category === 'Girls' ? 'text-pink-400' : item.category === 'Boys' ? 'text-blue-400' : 'text-neon-cyan'}`}>
                                                    [{item.category || 'Open'}]
                                                </span>
                                                <span>₹{item.price}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-600 hover:text-red-500 transition-colors p-2"
                                        >
                                            &times;
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {cart.length === 0 && (
                                <div className="text-gray-600 text-xs text-center py-12 border border-dashed border-white/10 rounded-xl">
                                    <FaInfoCircle className="mx-auto mb-2 text-lg opacity-50" />
                                    NO EVENTS SELECTED<br />Select events from the board
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10">
                        <div className="flex justify-between items-end mb-6">
                            <span className="text-xs text-gray-400 uppercase tracking-widest">Total Fees</span>
                            <span className="text-2xl font-black font-mono text-neon-cyan">
                                ₹{cart.reduce((a, b) => a + b.price, 0)}
                            </span>
                        </div>

                        <button
                            onClick={onNext}
                            disabled={cart.length === 0}
                            className="w-full bg-gradient-to-r from-neon-cyan to-blue-500 text-black font-black italic uppercase py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group"
                        >
                            Confirm Selection <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255,255,255,0.3);
                }
            `}</style>
        </div>
    );
}
