'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    FaFutbol, FaBasketballBall, FaGamepad,
    FaArrowRight, FaTrophy, FaShoppingCart, FaInfoCircle, FaCheck
} from 'react-icons/fa';
import { MdSportsCricket, MdSportsKabaddi, MdFemale, MdMale } from 'react-icons/md';
import { GiShuttlecock, GiVolleyballBall } from 'react-icons/gi';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const SPORTS_DATA = [
    {
        id: 'cricket-leather',
        name: 'Leather Cricket',
        image: '/assets/images/media_2.jpeg',
        date: '14th - 16th Feb',
        type: 'Flagship Event',
        color: 'from-[#0f172a] to-[#1e293b]',
        accent: 'text-yellow-400',
        badgeColor: 'bg-yellow-400 text-black',
        hasGender: true,
        prize: { boys: '₹33,000', girls: '₹8,000' },
        fee: { boys: 400, girls: 0 },
        rules: {
            boys: ['Knockout Format', '11 Players + 4 Subs', 'T20 Rules'],
            girls: ['8 Over Matches', '11 Players', 'Tennis Ball']
        }
    },
    {
        id: 'football',
        name: 'Football (7v7 / 5v5)',
        image: '/assets/images/media_6.jpeg',
        date: '14th - 16th Feb',
        type: 'Flagship Event',
        color: 'from-[#022c22] to-[#064e3b]',
        accent: 'text-emerald-400',
        badgeColor: 'bg-emerald-400 text-black',
        hasGender: true,
        prize: { boys: '₹15,000', girls: '₹8,000' },
        fee: { boys: 250, girls: 0 },
        rules: {
            boys: ['7v7 Format', '30 Min Halves', 'Studs Allowed'],
            girls: ['5v5 Format', '20 Min Halves', 'Flats Only']
        }
    },
    {
        id: 'basketball',
        name: 'Basketball',
        image: '/assets/images/media_4.jpeg',
        date: '15th - 16th Feb',
        type: 'Core Sport',
        color: 'from-[#431407] to-[#7c2d12]',
        accent: 'text-orange-400',
        badgeColor: 'bg-orange-400 text-black',
        hasGender: true,
        prize: { boys: '₹17,000', girls: '₹8,000' },
        fee: { boys: 250, girls: 0 },
        rules: {
            boys: ['4 Quarters', 'FIBA Rules', 'Full Court'],
            girls: ['4 Quarters', 'FIBA Rules', 'Full Court']
        }
    },
    {
        id: 'volleyball',
        name: 'Volleyball',
        image: '/assets/images/media_3.jpeg',
        date: '15th Feb',
        type: 'Core Sport',
        color: 'from-[#1e1b4b] to-[#312e81]',
        accent: 'text-indigo-400',
        badgeColor: 'bg-indigo-400 text-white',
        hasGender: true,
        prize: { boys: '₹13,000', girls: '₹8,000' },
        fee: { boys: 250, girls: 0 },
        rules: {
            boys: ['Best of 3 Sets', '6 Players', 'Rotation Rules'],
            girls: ['Best of 3 Sets', '6 Players', 'Rotation Rules']
        }
    },
    {
        id: 'badminton',
        name: 'Badminton (Singles)',
        image: '/assets/images/badminton.png',
        date: '14th Feb',
        type: 'Racquet Sport',
        color: 'from-[#831843] to-[#be185d]',
        accent: 'text-pink-400',
        badgeColor: 'bg-pink-400 text-white',
        hasGender: true,
        prize: { boys: '₹4,500', girls: '₹3,100' },
        fee: { boys: 250, girls: 0 },
        rules: {
            boys: ['Singles', 'Points System', 'Feather Shuttle'],
            girls: ['Singles', 'Points System', 'Feather Shuttle']
        }
    },
    {
        id: 'badminton-doubles',
        name: 'Badminton (Doubles)',
        image: '/assets/images/badminton.png',
        date: '14th Feb',
        type: 'Racquet Sport',
        color: 'from-[#831843] to-[#be185d]',
        accent: 'text-pink-400',
        badgeColor: 'bg-pink-400 text-white',
        hasGender: true,
        prize: { boys: '₹6,100', girls: '₹3,600' },
        fee: { boys: 500, girls: 0 },
        rules: {
            boys: ['Doubles', 'Points System', 'Feather Shuttle'],
            girls: ['Doubles', 'Points System', 'Feather Shuttle']
        }
    },
    {
        id: 'badminton-mixed',
        name: 'Badminton (Mixed)',
        image: '/assets/images/badminton.png',
        date: '14th Feb',
        type: 'Racquet Sport',
        color: 'from-[#831843] to-[#be185d]',
        accent: 'text-pink-400',
        badgeColor: 'bg-pink-400 text-white',
        hasGender: false,
        prize: { open: '₹4,000' },
        fee: { open: 250 },
        rules: {
            open: ['Mixed Doubles', 'Points System', 'Feather Shuttle']
        }
    },
    {
        id: 'box-cricket',
        name: 'Box Cricket',
        image: '/assets/images/media_2.jpeg',
        date: '15th Feb',
        type: 'Fun Event',
        color: 'from-[#3f6212] to-[#65a30d]',
        accent: 'text-lime-400',
        badgeColor: 'bg-lime-400 text-black',
        hasGender: false,
        prize: { open: '₹8,800' },
        fee: { open: 1100 },
        rules: { open: ['6 Over Matches', 'Underarm Bowling', '8 Players'] }
    },
    {
        id: 'kabaddi',
        name: 'Kabaddi',
        image: '/assets/images/kabaddi.png',
        date: '16th Feb',
        type: 'Contact Sport',
        color: 'from-[#450a0a] to-[#7f1d1d]',
        accent: 'text-red-400',
        badgeColor: 'bg-red-400 text-white',
        hasGender: false,
        prize: { open: '₹6,100' },
        fee: { open: 1100 },
        rules: { open: ['Pro Kabaddi Rules', 'Under 75kg', 'Mat Surface'] }
    },
    {
        id: 'esports',
        name: 'E-Sports',
        image: '/assets/images/esports.png',
        date: '14th Feb',
        type: 'Digital',
        color: 'from-[#2e1065] to-[#4c1d95]',
        accent: 'text-violet-400',
        badgeColor: 'bg-violet-400 text-white',
        hasGender: false,
        prize: { open: '₹8,000' },
        fee: { open: 500 },
        rules: { open: ['BGMI Squads', 'Valorant 5v5', 'FIFA 1v1'] }
    },
    {
        id: 'chess',
        name: 'Chess',
        image: '/assets/images/chess.png',
        date: '16th Feb',
        type: 'Strategy',
        color: 'from-[#171717] to-[#404040]',
        accent: 'text-gray-200',
        badgeColor: 'bg-gray-200 text-black',
        hasGender: true,
        prize: { boys: '₹2,500', girls: '₹2,500' },
        fee: { boys: 150, girls: 0 },
        rules: {
            boys: ['Rapid Format', '10+5 Time Control', 'FIDE Rules'],
            girls: ['Rapid Format', '10+5 Time Control', 'FIDE Rules']
        }
    }
];

// --- Internal Component for Card Logic ---
const EventCardContent = ({ sport, index, onOpenRules }: { sport: typeof SPORTS_DATA[0], index: number, onOpenRules: (title: string, rules: string[]) => void }) => {
    const [gender, setGender] = useState<'boys' | 'girls'>('boys');
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();

    // 3D Tilt Logic Removed as per user request
    const cardRef = useRef<HTMLDivElement>(null);

    const activePrize = sport.hasGender ? sport.prize[gender] : sport.prize.open;
    // @ts-ignore - dynamic indexing
    const activeRules = sport.hasGender ? sport.rules[gender] : sport.rules.open;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click

        // Price from Fee Structure
        // @ts-ignore
        const activeFee = sport.fee ? (sport.hasGender ? (sport.fee[gender] || 0) : (sport.fee.open || 0)) : 0;
        const price = activeFee || 0;

        addToCart({
            id: `${sport.id}-${sport.hasGender ? gender : 'open'}`,
            name: sport.name,
            category: sport.hasGender ? (gender === 'boys' ? 'Boys' : 'Girls') : 'Open',
            price: price,
            color: sport.color
        });

        setAdded(true);
        setTimeout(() => setAdded(false), 1500); // Just for visual feedback not logic
    };

    return (
        <div className="relative w-full h-full rounded-[30px] overflow-hidden border-[1px] border-white/10 bg-[#1a1a1a] group cursor-default">
            {/* SPORT IMAGE BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <img
                    src={sport.image}
                    alt={sport.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500"></div>
            </div>

            {/* GRADIENT BG */}
            <div className={`absolute inset-0 bg-gradient-to-br ${sport.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500 mix-blend-overlay z-0`}></div>

            {/* Neon Glow Border */}
            <div className={`absolute inset-0 rounded-[30px] border border-white/5 group-hover:border-${sport.badgeColor.split('-')[1]}-400/50 transition-colors duration-500 pointer-events-none`}></div>

            {/* Top Badge */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 px-6 py-2 ${sport.badgeColor} text-sm font-bold font-sans uppercase tracking-[0.2em] rounded-b-xl shadow-[0_10px_20px_rgba(0,0,0,0.3)] z-20`}>
                Event {index + 1}
            </div>

            {/* Content Layout */}
            <div className="absolute inset-0 flex flex-col md:flex-row p-6 md:p-8 gap-8">

                {/* LEFT: Branding */}
                <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black font-sans uppercase text-white tracking-tighter drop-shadow-xl m-0 leading-none">
                        {sport.name}
                    </h2>
                    <div className="flex items-center gap-3 opacity-80 justify-center md:justify-start">
                        <span className="text-xl md:text-2xl font-outline-2 text-transparent font-black uppercase tracking-widest">
                            {sport.type.split(' ')[0]}
                        </span>
                        <span className={`text-xl md:text-2xl font-black ${sport.accent} uppercase tracking-widest`}>
                            {sport.type.split(' ')[1]}
                        </span>
                    </div>
                </div>

                {/* RIGHT: Controls & Info */}
                <div className="flex-1 flex flex-col justify-center space-y-6 z-30">

                    {/* Gender Toggle - ONLY SHOW IF HAS GENDER */}
                    {sport.hasGender && (
                        <div className="bg-black/30 backdrop-blur-sm p-1.5 rounded-full flex relative border border-white/10 w-fit mx-auto md:mx-0">
                            <div
                                className="absolute inset-y-1.5 bg-white/10 rounded-full transition-all duration-300 w-[calc(50%-6px)]"
                                style={{ left: gender === 'boys' ? '6px' : 'calc(50%)' }}
                            ></div>
                            <button
                                onClick={(e) => { e.stopPropagation(); setGender('boys'); }}
                                className={`relative z-10 px-8 py-2 rounded-full text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${gender === 'boys' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                            >
                                <MdMale className="text-lg" /> Boys
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); setGender('girls'); }}
                                className={`relative z-10 px-8 py-2 rounded-full text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${gender === 'girls' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                            >
                                <MdFemale className="text-lg" /> Girls
                            </button>
                        </div>
                    )}

                    {/* Rules Summary */}
                    {/* Rules Summary */}
                    <div
                        onClick={(e) => { e.stopPropagation(); onOpenRules(sport.name, activeRules || []); }}
                        className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/5 text-sm md:text-base text-gray-300 space-y-2 cursor-pointer hover:bg-white/5 hover:border-neon-cyan/30 transition-all group/rules"
                    >
                        <div className="flex items-center justify-between text-white/60 text-xs uppercase tracking-widest font-bold mb-1">
                            <span className="flex items-center gap-2"><FaInfoCircle /> Rules Snapshot</span>
                            <span className="text-neon-cyan opacity-0 group-hover/rules:opacity-100 transition-opacity text-[10px]">VIEW FULL RULES →</span>
                        </div>
                        <ul className="space-y-1 list-disc list-inside marker:text-neon-cyan line-clamp-3">
                            {activeRules?.slice(0, 2).map((rule: string, r: number) => (
                                <li key={r}>{rule}</li>
                            ))}
                            {(activeRules?.length || 0) > 2 && <li className="list-none text-xs text-neon-cyan italic pl-2">+ {(activeRules?.length || 0) - 2} more rules...</li>}
                        </ul>
                    </div>

                    {/* Actions Row */}
                    <div className="flex items-center gap-4 justify-center md:justify-start pt-2">
                        <div className="flex flex-col">
                            <span className="text-xs text-white/50 uppercase tracking-widest font-bold">Prize Pool</span>
                            <span className="text-3xl font-gang text-white drop-shadow-lg">{activePrize}</span>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={added}
                            className={`flex-1 h-14 px-8 bg-white text-black hover:bg-neon-cyan hover:text-white transition-all rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(255,255,255,0.2)] ${added ? '!bg-green-500 !text-white' : ''}`}
                        >
                            {added ? (
                                <>
                                    <FaCheck /> Added
                                </>
                            ) : (
                                <>
                                    Add <FaShoppingCart className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </div>

            {/* Footer Date */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-sm font-bold uppercase tracking-[0.3em]">
                {sport.date} • JNU Stadium
            </div>
        </div>
    );
};


export default function EventsScrollStack() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const [modalData, setModalData] = useState<{ title: string, rules: string[] } | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.event-card') as HTMLElement[];



            // 1. Initial State: Force Card 0 visible immediately, others hidden down
            gsap.set(cards[0], { y: 0, opacity: 1, zIndex: 1 });
            gsap.set(cards.slice(1), { y: '120vh', zIndex: (i) => i + 1 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    start: "top top",
                    end: `+=${cards.length * 100}%`,
                    scrub: 1, // Smooth scrubbing
                    anticipatePin: 1,
                    snap: {
                        snapTo: 1 / (cards.length - 1),
                        duration: { min: 0.2, max: 0.5 },
                        delay: 0,
                        ease: "power1.inOut"
                    },
                    invalidateOnRefresh: true,
                    onRefresh: () => {
                        // Ensure visibility persists on refresh
                        gsap.set(cards[0], { opacity: 1, y: 0 });
                    },
                    onUpdate: (self) => {
                        // Update current card index based on scroll progress
                        const progress = self.progress;
                        const index = Math.min(Math.floor(progress * cards.length), cards.length - 1);
                        setCurrentCardIndex(index);
                    }
                }
            });

            // Stack animation
            cards.forEach((card, i) => {
                if (i === 0) return;

                // 1. Current card slides UP
                tl.to(card, {
                    y: 0,
                    duration: 1,
                    ease: "none"
                }, i - 1);

                // 2. Previous cards push back - DISABLED as per user request to remove "transition" effect
                /* 
                for (let j = 0; j < i; j++) {
                    const prevCard = cards[j];
                    const depth = i - j;

                    tl.to(prevCard, {
                        scale: 1 - (depth * 0.05),
                        y: -(depth * 25), // Move up slightly
                        filter: `blur(${depth * 3}px) brightness(${1 - depth * 0.15})`, // Blur and dim
                        duration: 1,
                        ease: "none"
                    }, i - 1);
                } 
                */
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative h-screen w-full bg-[#1a1a1a] overflow-hidden">

            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-[#111] to-[#000] z-0"></div>

            {/* Header */}
            <div className="absolute top-32 w-full text-center z-50 pointer-events-none mix-blend-normal">
                <h2 className="text-neon-cyan font-gang tracking-[0.5em] text-xs md:text-sm uppercase mb-2 drop-shadow-md">The Arena</h2>
                <h1 className="text-5xl md:text-6xl font-gang text-white uppercase tracking-widest drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                    Event Schedule
                </h1>
            </div>

            {/* CARDS CONTAINER */}
            <div ref={wrapperRef} className="relative w-full h-full flex items-center justify-center z-10 perspective-1000">
                {SPORTS_DATA.map((sport, i) => (
                    <div
                        key={sport.id}
                        className="event-card absolute w-[95%] md:w-[900px] aspect-[16/10] md:aspect-[1.8/1] rounded-[30px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] origin-bottom will-change-transform"
                        style={{
                            backfaceVisibility: 'hidden',
                            transformStyle: 'preserve-3d',
                            transform: 'translate3d(0,0,0)'
                        }}
                    >

                        <EventCardContent
                            sport={sport}
                            index={i}
                            onOpenRules={(title, rules) => setModalData({ title, rules })}
                        />
                    </div>
                ))}
            </div>

            {/* SCROLL DOWN INDICATOR */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                <div className="flex flex-col items-center gap-2 animate-bounce">
                    <span className="text-white/60 text-sm font-bold uppercase tracking-[0.3em]">
                        {currentCardIndex === SPORTS_DATA.length - 1 ? 'Scroll Up' : 'Scroll Down'}
                    </span>
                    <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {currentCardIndex === SPORTS_DATA.length - 1 ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        )}
                    </svg>
                </div>
            </div>

            {/* RULES MODAL */}
            <AnimatePresence>
                {modalData && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setModalData(null)}
                        className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#111] border border-white/10 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
                                <h3 className="text-xl font-bold font-gang uppercase tracking-widest text-white">{modalData.title} RULES</h3>
                                <button
                                    onClick={() => setModalData(null)}
                                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                <ul className="space-y-4">
                                    {modalData.rules.map((rule, idx) => (
                                        <li key={idx} className="flex gap-4 text-gray-300">
                                            <span className="text-neon-cyan font-mono font-bold">0{idx + 1}</span>
                                            <span className="leading-relaxed">{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-4 bg-white/5 border-t border-white/10 text-center">
                                <p className="text-xs text-white/30 uppercase tracking-widest">Official Tournament Regulations</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .font-outline-2 {
                    -webkit-text-stroke: 1.5px rgba(255,255,255,1);
                    color: transparent;
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255,255,255,0.05);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.2);
                    border-radius: 10px;
                }
            `}</style>
        </section>
    );
}
