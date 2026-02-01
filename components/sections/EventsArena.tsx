'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaFutbol, FaBasketballBall, FaRunning, FaGamepad, FaChessKing,
    FaArrowRight, FaTrophy, FaUsers, FaMapMarkerAlt, FaClipboardList, FaTimes, FaMars, FaVenus, FaCheckCircle
} from 'react-icons/fa';
import { MdSportsCricket, MdSportsKabaddi } from 'react-icons/md';
import { GiVolleyballBall, GiShuttlecock } from 'react-icons/gi';

// --- DATA STRUCTURE ---
// Enhanced to include specific details for Boys/Girls
interface PrizeDetails {
    winner: string;
    runnerUp: string;
}

interface SportDetails {
    rules: string[];
    format: string;
    venue: string;
    equipment: string;
    prizes: {
        boys: PrizeDetails;
        girls?: PrizeDetails; // Optional because some sports might not have Girls category or vice versa
    };
}

interface SportData {
    id: string;
    name: string;
    categories: ('Boys' | 'Girls' | 'Open' | 'Mixed')[];
    icon: any;
    color: string;
    bg: string;
    details: SportDetails;
}

const SPORTS_DATA: SportData[] = [
    {
        id: 'cricket',
        name: 'Cricket',
        categories: ['Boys'],
        icon: MdSportsCricket,
        color: 'from-neon-blue to-neon-purple',
        bg: 'https://images.unsplash.com/photo-1531415074968-bc2ce3a106e2?auto=format&fit=crop&q=80',
        details: {
            rules: ['ICC T20 Rules apply.', 'Hard leather ball usage.', '11 players per side + 3 substitutes.', 'Umpire decision is final.'],
            format: 'Knockout Tournament',
            venue: 'Main Stadium Ground',
            equipment: 'Full Cricket Kit (White Uniform)',
            prizes: {
                boys: { winner: '₹25,000', runnerUp: '₹15,000' }
            }
        }
    },
    {
        id: 'football',
        name: 'Football',
        categories: ['Boys', 'Girls'],
        icon: FaFutbol,
        color: 'from-green-600 to-emerald-600',
        bg: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?auto=format&fit=crop&q=80',
        details: {
            rules: ['7 players on field for Boys / 5 for Girls.', 'Rolling substitutions allowed.', '30 mins per half.', 'Yellow/Red cards applicable.'],
            format: 'League + Knockout',
            venue: 'Synthetic Turf Arena',
            equipment: 'Studs/Turf Shoes, Shin Guards',
            prizes: {
                boys: { winner: '₹20,000', runnerUp: '₹10,000' },
                girls: { winner: '₹15,000', runnerUp: '₹8,000' }
            }
        }
    },
    {
        id: 'basketball',
        name: 'Basketball',
        categories: ['Boys', 'Girls'],
        icon: FaBasketballBall,
        color: 'from-orange-600 to-red-600',
        bg: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80',
        details: {
            rules: ['FIBA standard rules.', '4 quarters of 10 mins each.', '5 fouls leads to ejection.', 'Timeouts allowed.'],
            format: 'Knockout Tournament',
            venue: 'Indoor Sports Complex',
            equipment: 'Non-marking shoes mandatory',
            prizes: {
                boys: { winner: '₹18,000', runnerUp: '₹10,000' },
                girls: { winner: '₹18,000', runnerUp: '₹10,000' }
            }
        }
    },
    {
        id: 'esports',
        name: 'E-Sports',
        categories: ['Open'],
        icon: FaGamepad,
        color: 'from-violet-600 to-fuchsia-600',
        bg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
        details: {
            rules: ['Anti-cheat software mandatory.', 'Bring your own peripherals (Mouse/Keyboard).', 'Disconnect rules apply.'],
            format: 'Group Stage -> Playoffs',
            venue: 'Tech Auditorium',
            equipment: 'Headphones, Controller (FIFA)',
            prizes: {
                boys: { winner: '₹30,000', runnerUp: '₹15,000' } // 'Boys' key acts as 'Open' here for simplicity in this structure
            }
        }
    },
    {
        id: 'volleyball',
        name: 'Volleyball',
        categories: ['Boys', 'Girls'],
        icon: GiVolleyballBall,
        color: 'from-yellow-500 to-orange-500',
        bg: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&q=80',
        details: {
            rules: ['Best of 3 sets.', 'Rotation rules apply.', 'Each set to 25 points.'],
            format: 'Knockout',
            venue: 'Outdoor Court 1',
            equipment: 'Standard Sportswear',
            prizes: {
                boys: { winner: '₹18,000', runnerUp: '₹10,000' },
                girls: { winner: '₹18,000', runnerUp: '₹10,000' }
            }
        }
    },
    {
        id: 'badminton',
        name: 'Badminton',
        categories: ['Boys', 'Girls', 'Mixed'], // Simplification: Treating Mixed/Doubles as categories or handled in registration
        icon: GiShuttlecock,
        color: 'from-pink-600 to-rose-600',
        bg: 'https://images.unsplash.com/photo-1626224583764-847890e058f5?auto=format&fit=crop&q=80',
        details: {
            rules: ['BWF scoring system (21 points).', 'Feather shuttles used.', 'Non-marking shoes compulsory.'],
            format: 'Knockout',
            venue: 'Indoor Badminton Hall',
            equipment: 'Racket, Non-marking shoes',
            prizes: {
                boys: { winner: '₹10,000', runnerUp: '₹5,000' },
                girls: { winner: '₹10,000', runnerUp: '₹5,000' }
            }
        }
    },
    {
        id: 'kabaddi',
        name: 'Kabaddi',
        categories: ['Boys'],
        icon: MdSportsKabaddi,
        color: 'from-red-600 to-red-800',
        bg: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80',
        details: {
            rules: ['Pro Kabaddi rules.', 'Weight limit: 85kg.', '20 mins per half.'],
            format: 'Knockout',
            venue: 'Kabaddi Mats',
            equipment: 'Jersey, Shorts',
            prizes: {
                boys: { winner: '₹15,000', runnerUp: '₹8,000' }
            }
        }
    },
    {
        id: 'chess',
        name: 'Chess',
        categories: ['Open'],
        icon: FaChessKing,
        color: 'from-gray-600 to-gray-800',
        bg: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80',
        details: {
            rules: ['FIDE Blitz rules.', '5 mins + 3s increment.', 'Touch to move.'],
            format: 'Swiss League',
            venue: 'Quiet Hall A',
            equipment: 'None',
            prizes: {
                boys: { winner: '₹8,000', runnerUp: '₹4,000' } // Using 'boys' as default for open/mixed
            }
        }
    }
];

export default function EventsArena() {
    const [selectedSport, setSelectedSport] = useState<SportData | null>(null);
    const [modalCategory, setModalCategory] = useState<'Boys' | 'Girls' | 'Open' | 'Mixed'>('Boys');

    return (
        <section className="relative w-full min-h-screen bg-[#020617] py-20 px-4 md:px-8">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none"></div>

            {/* Header */}
            <div className="relative z-10 text-center mb-16 space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white"
                >
                    Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">Battle</span>
                </motion.h1>
                <div className="h-1 w-24 bg-neon-cyan mx-auto rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)]"></div>
            </div>

            {/* GRID LAYOUT */}
            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {SPORTS_DATA.map((sport) => (
                    <SportCard
                        key={sport.id}
                        sport={sport}
                        onEnter={(category) => {
                            setSelectedSport(sport);
                            setModalCategory(category);
                        }}
                    />
                ))}
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {selectedSport && (
                    <EventDetailModal
                        sport={selectedSport}
                        initialCategory={modalCategory}
                        onClose={() => setSelectedSport(null)}
                    />
                )}
            </AnimatePresence>

        </section>
    );
}

function SportCard({ sport, onEnter }: { sport: SportData, onEnter: (cat: 'Boys' | 'Girls' | 'Open' | 'Mixed') => void }) {
    // Determine available categories. Default to first available.
    const [selectedCategory, setSelectedCategory] = useState(sport.categories[0]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="relative group h-[420px] bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                style={{ backgroundImage: `url(${sport.bg})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>

            {/* Content Top: Category Toggle */}
            <div className="absolute top-6 left-0 w-full flex justify-center z-20">
                {sport.categories.length > 1 && (
                    <div className="flex bg-black/50 backdrop-blur-md rounded-full p-1 border border-white/10">
                        {sport.categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={(e) => { e.stopPropagation(); setSelectedCategory(cat); }}
                                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${selectedCategory === cat
                                    ? 'bg-neon-cyan text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}
                {sport.categories.length === 1 && (
                    <div className="px-4 py-1.5 bg-black/50 backdrop-blur-md text-neon-cyan text-xs font-bold uppercase tracking-wider rounded-full border border-white/10">
                        {sport.categories[0]} Only
                    </div>
                )}
            </div>

            {/* Content Bottom */}
            <div className="absolute bottom-0 w-full p-6 flex flex-col items-center text-center">

                {/* Icon & Name */}
                <div className="mb-4">
                    <div className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br ${sport.color} flex items-center justify-center text-white text-xl shadow-lg mb-3 ring-2 ring-white/20`}>
                        <sport.icon />
                    </div>
                    <h3 className="text-2xl font-black uppercase text-white tracking-wide group-hover:text-neon-cyan transition-colors">
                        {sport.name}
                    </h3>
                </div>

                {/* Enter Arena Button */}
                <button
                    onClick={() => onEnter(selectedCategory)}
                    className="w-full py-3 bg-white/10 hover:bg-neon-cyan hover:text-black border border-white/20 hover:border-neon-cyan text-white font-bold uppercase tracking-widest text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                    Enter Arena <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Hover Glow Border */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/20 pointer-events-none transition-colors duration-300"></div>
        </motion.div>
    );
}

function EventDetailModal({ sport, initialCategory, onClose }: { sport: SportData, initialCategory: 'Boys' | 'Girls' | 'Open' | 'Mixed', onClose: () => void }) {
    const router = useRouter();

    // For internal category switching in modal if user realizes they clicked wrong
    // Filter to available categories
    const isBoysAvailable = sport.categories.includes('Boys');
    const isGirlsAvailable = sport.categories.includes('Girls');

    // Default to initialCategory, but prize pool logic depends on simplified 'boys'/'girls' keys
    // Mapping keys: 'Boys'|'Open'|'Mixed' -> 'boys' data key. 'Girls' -> 'girls' data key.
    const getPrizeData = (cat: string) => {
        if (cat === 'Girls') return sport.details.prizes.girls;
        return sport.details.prizes.boys;
    };

    const prizeData = getPrizeData(initialCategory);

    const handleRegister = () => {
        const queryParams = new URLSearchParams({
            sport: sport.id,
            category: initialCategory.toLowerCase()
        }).toString();
        router.push(`/register?${queryParams}`);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors">
                    <FaTimes />
                </button>

                {/* Header */}
                <div className="relative h-40 shrink-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${sport.bg})` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${sport.color} opacity-80 mix-blend-multiply`}></div>
                    <div className="absolute inset-0 p-8 flex items-end">
                        <div>
                            <h2 className="text-4xl font-black uppercase text-white tracking-tighter leading-none">{sport.name}</h2>
                            <span className="inline-block mt-2 px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest rounded-lg border border-white/20">
                                {initialCategory} Category
                            </span>
                        </div>
                    </div>
                </div>

                {/* Scrollable Body */}
                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-8">

                    {/* Rules */}
                    <div>
                        <h3 className="flex items-center gap-2 text-neon-cyan font-bold uppercase tracking-wider mb-4">
                            <FaClipboardList /> Rules & Format
                        </h3>
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-gray-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan mt-1.5 shrink-0"></span>
                                    Format: <strong className="text-white ml-1">{sport.details.format}</strong>
                                </li>
                                {sport.details.rules.map((rule, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-1.5 shrink-0"></span>
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Prizes */}
                    <div>
                        <h3 className="flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-wider mb-4">
                            <FaTrophy /> Prize Pool ({initialCategory})
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-2xl p-4 flex flex-col items-center text-center">
                                <span className="text-xs font-bold text-yellow-500 uppercase mb-1">Winner</span>
                                <span className="text-2xl font-black text-white">{prizeData?.winner || 'TBA'}</span>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center">
                                <span className="text-xs font-bold text-gray-400 uppercase mb-1">Runner Up</span>
                                <span className="text-xl font-bold text-gray-200">{prizeData?.runnerUp || 'TBA'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Venue & Info */}
                    <div>
                        <h3 className="flex items-center gap-2 text-neon-blue font-bold uppercase tracking-wider mb-4">
                            <FaMapMarkerAlt /> Additional Info
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
                                <div className="text-gray-400 text-xs uppercase font-bold">Venue</div>
                                <div className="text-white font-bold text-sm">{sport.details.venue}</div>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
                                <div className="text-gray-400 text-xs uppercase font-bold">Equip</div>
                                <div className="text-white font-bold text-sm">{sport.details.equipment}</div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Action */}
                <div className="p-6 border-t border-white/10 bg-[#020617]">
                    <button
                        onClick={handleRegister}
                        className="w-full py-4 bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-black uppercase tracking-widest text-lg rounded-xl shadow-[0_0_20px_rgba(227,114,51,0.4)] hover:shadow-[0_0_40px_rgba(227,114,51,0.6)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        Register Now <FaArrowRight />
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-3">
                        Navigates to registration page • 100% Secure Payment
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
