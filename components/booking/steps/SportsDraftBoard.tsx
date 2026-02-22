'use client';

import React, { useState, useMemo, memo, useCallback, useRef, useEffect } from 'react';
import { SportItem } from '../GamifiedWizard';
import { FaFutbol, FaBasketballBall, FaRunning, FaGamepad, FaChessKing, FaCheck, FaInfoCircle } from 'react-icons/fa';
import { MdSportsCricket, MdSportsKabaddi, MdFemale, MdMale } from 'react-icons/md';
import { GiShuttlecock, GiVolleyballBall } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// MERGED DATA: combining visuals from old DraftBoard with Logic/Pricing from EventsScrollStack
export const ALL_SPORTS = [
    {
        id: 'cricket-leather',
        name: 'Leather Cricket',
        icon: MdSportsCricket,
        bg: '/assets/games/cricket.JPG',
        hasGender: true,
        bgGradient: 'from-blue-900 to-slate-900',
        prizes: { boys: 33000, girls: 8000 },
        fees: { boys: 400, girls: 1 },
        price: 400,
        pricingType: 'person'
    },
    {
        id: 'football-7v7',
        name: 'Football (7v7)',
        icon: FaFutbol,
        bg: '/assets/games/football.JPG',
        hasGender: true,
        onlyGender: 'Boys',
        fees: { boys: 250, girls: 1 },
        price: 250,
        pricingType: 'person'
    },
    {
        id: 'football-5v5',
        name: 'Football (5v5)',
        icon: FaFutbol,
        bg: '/assets/games/football_5v5.png',
        hasGender: true,
        onlyGender: 'Girls',
        fees: { boys: 0, girls: 1 },
        price: 1,
        pricingType: 'person'
    },
    {
        id: 'basketball',
        name: 'Basketball',
        icon: FaBasketballBall,
        bg: '/assets/games/basketball.JPG',
        hasGender: true,
        fees: { boys: 250, girls: 1 },
        price: 250,
        pricingType: 'person'
    },
    {
        id: 'volleyball',
        name: 'Volleyball',
        icon: GiVolleyballBall,
        bg: '/assets/games/volleyball_v2.jpg',
        hasGender: true,
        fees: { boys: 250, girls: 1 },
        price: 250,
        pricingType: 'person'
    },
    {
        id: 'badminton',
        name: 'Badminton (Singles)',
        icon: GiShuttlecock,
        bg: '/assets/games/badminton_singles.png',
        hasGender: true,
        fees: { boys: 250, girls: 1 },
        price: 250,
        pricingType: 'person'
    },
    {
        id: 'badminton-doubles',
        name: 'Badminton (Doubles)',
        icon: GiShuttlecock,
        bg: '/assets/games/badminton_doubles.png',
        hasGender: true,
        fees: { boys: 500, girls: 1 },
        price: 500,
        pricingType: 'team'
    },
    {
        id: 'badminton-mixed',
        name: 'Badminton (Mixed)',
        icon: GiShuttlecock,
        bg: '/assets/games/badminton_mixed.png',
        hasGender: true,
        fees: { boys: 250, girls: 1 },
        price: 250,
        pricingType: 'person'
    },
    {
        id: 'kabaddi',
        name: 'Kabaddi',
        icon: MdSportsKabaddi,
        bg: '/assets/images/kabaddi.png',
        hasGender: true,
        fees: { boys: 1100, girls: 1 },
        price: 1100,
        pricingType: 'team'
    },
    {
        id: 'box-cricket',
        name: 'Box Cricket',
        icon: MdSportsCricket,
        bg: '/assets/images/media_2.jpeg',
        hasGender: true,
        fees: { boys: 1100, girls: 1 },
        price: 1100,
        pricingType: 'team'
    },
    {
        id: 'chess',
        name: 'Chess',
        icon: FaChessKing,
        bg: '/assets/images/chess.png',
        hasGender: true,
        fees: { boys: 150, girls: 1 },
        price: 150,
        pricingType: 'person'
    },
    {
        id: 'esports',
        name: 'E-Sports',
        icon: FaGamepad,
        bg: '/assets/images/esports.png',
        hasGender: true,
        fees: { boys: 500, girls: 1 },
        price: 500,
        pricingType: 'team'
    }
];


interface Props {
    cart: SportItem[];
    addToCart: (item: SportItem) => void;
    removeFromCart: (id: string) => void;
    onNext: () => void;
    onPrev: () => void;
}

// --- OPTIMIZED CARD COMPONENT ---
// Memoized to prevent re-renders of all cards when one cart item changes.
// Props are simplified to primitives or stable callbacks where possible.
interface SportCardProps {
    sport: typeof ALL_SPORTS[0];
    isBoyInCart: boolean;
    isGirlInCart: boolean;
    isOpenInCart: boolean;
    onToggle: (sport: typeof ALL_SPORTS[0], category: 'Boys' | 'Girls' | 'Open') => void;
}

const SportCard = memo(({ sport, isBoyInCart, isGirlInCart, isOpenInCart, onToggle }: SportCardProps) => {
    return (
        <div className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover:border-neon-cyan/50 transition-colors duration-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.1)] will-change-transform h-[320px] flex flex-col">
            {/* Background Image */}
            <div className="h-40 w-full relative overflow-hidden shrink-0">
                <Image
                    src={sport.bg}
                    alt={sport.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={60}
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111]"></div>

                {/* Title Overlay */}
                <div className="absolute bottom-2 left-4 z-10">
                    <h3 className="text-xl font-black italic uppercase text-white leading-none flex items-center gap-2 drop-shadow-md">
                        <sport.icon className="text-neon-cyan" /> {sport.name}
                    </h3>
                </div>
            </div>

            {/* Controls */}
            <div className="p-4 space-y-3 flex flex-col h-full justify-between">
                <div className="text-xs font-mono text-gray-400 flex flex-col items-start">
                    <div className="flex justify-between w-full">
                        <span>REGISTRATION FEE</span>
                        <span className="text-white font-bold">₹{sport.price}</span>
                    </div>
                    <div className="text-[10px] opacity-50 uppercase tracking-widest mt-0.5">
                        {sport.pricingType === 'team' ? '// per team entry' : '// per individual person'}
                    </div>
                </div>


                <div className="flex gap-2 mt-auto">
                    {sport.hasGender ? (
                        <>
                            {(!(sport as any).onlyGender || (sport as any).onlyGender === 'Boys') && (
                                <button
                                    onClick={() => onToggle(sport, 'Boys')}
                                    className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 border ${isBoyInCart ? 'bg-neon-cyan text-black border-neon-cyan shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}
                                >
                                    {isBoyInCart ? <FaCheck /> : <MdMale className="text-lg" />}
                                    BOYS
                                </button>
                            )}
                            {(!(sport as any).onlyGender || (sport as any).onlyGender === 'Girls') && (
                                <button
                                    onClick={() => onToggle(sport, 'Girls')}
                                    className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 border ${isGirlInCart ? 'bg-pink-500 text-white border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.4)]' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}
                                >
                                    {isGirlInCart ? <FaCheck /> : <MdFemale className="text-lg" />}
                                    GIRLS
                                </button>
                            )}
                        </>
                    ) : (
                        <button
                            onClick={() => onToggle(sport, 'Open')}
                            className={`w-full py-3 rounded-lg text-sm font-bold uppercase transition-all flex items-center justify-center gap-2 border ${isOpenInCart ? 'bg-neon-cyan text-black border-neon-cyan shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'}`}
                        >
                            {isOpenInCart ? 'ADDED TO ROSTER' : 'ADD TO ROSTER'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
});
SportCard.displayName = 'SportCard';


export default function SportsDraftBoard({ cart, addToCart, removeFromCart, onNext, onPrev }: Props) {

    // Store cart in ref to access inside stable callback without re-creating it
    const cartRef = useRef(cart);
    useEffect(() => {
        cartRef.current = cart;
    }, [cart]);

    // Stable callback - doesn't change on re-renders, so SportCard doesn't re-render unless its specific props change
    const toggleSport = useCallback((sport: typeof ALL_SPORTS[0], category: 'Boys' | 'Girls' | 'Open') => {
        const currentCart = cartRef.current;
        const uniqueId = category !== 'Open' ? `${sport.id}-${category}` : sport.id;
        const existingItem = currentCart.find(item => item.id === uniqueId);

        if (existingItem) {
            removeFromCart(uniqueId);
        } else {
            let finalPrice = sport.price;
            if (category === 'Boys' && (sport as any).fees?.boys !== undefined) finalPrice = (sport as any).fees.boys;
            if (category === 'Girls' && (sport as any).fees?.girls !== undefined) finalPrice = (sport as any).fees.girls;

            const color = category === 'Girls' ? '#ec4899' : category === 'Boys' ? '#60a5fa' : '#22d3ee';

            addToCart({
                id: uniqueId,
                name: sport.name,
                price: finalPrice,
                image: sport.bg,
                category: category,
                color: color,
                pricingType: (sport as any).pricingType
            });

        }
    }, [addToCart, removeFromCart]); // Only recreate if context helpers change (rare)

    // Construct a Set of active IDs for O(1) lookups during rendering
    const cartIds = useMemo(() => new Set(cart.map(item => item.id)), [cart]);

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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                        {ALL_SPORTS.map((sport) => (
                            <SportCard
                                key={sport.id}
                                sport={sport}
                                isBoyInCart={cartIds.has(`${sport.id}-Boys`)}
                                isGirlInCart={cartIds.has(`${sport.id}-Girls`)}
                                isOpenInCart={cartIds.has(sport.id)}
                                onToggle={toggleSport}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT: Loadout Sidebar */}
                <div className="w-full md:w-80 bg-[#080808] border-t md:border-t-0 md:border-l border-white/10 p-6 flex flex-col relative z-40 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
                    <div className="flex-1">
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6 flex justify-between items-center">
                            <span>Your Loadout</span>
                            <span className="text-neon-cyan">{cart.length} Active</span>
                        </h3>

                        <div className="space-y-3 overflow-y-auto max-h-[60vh] custom-scrollbar pr-2">
                            <AnimatePresence mode="popLayout" initial={false}>
                                {cart.map((item) => (
                                    <motion.div
                                        key={item.id}
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

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={onNext}
                                disabled={cart.length === 0}
                                className="w-full bg-gradient-to-r from-neon-cyan to-blue-500 text-black font-black italic uppercase py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group"
                            >
                                Confirm Selection <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                            </button>

                            <button
                                onClick={onPrev}
                                className="w-full bg-white/5 border border-white/10 text-gray-400 font-bold uppercase py-3 rounded-xl hover:bg-white/10 hover:text-white transition-all text-xs flex items-center justify-center gap-2"
                            >
                                <span>←</span> Edit Profile Details
                            </button>
                        </div>

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
