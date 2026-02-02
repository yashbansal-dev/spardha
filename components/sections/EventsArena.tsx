'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
    FaFutbol, FaBasketballBall, FaRunning, FaGamepad, FaChessKing,
    FaArrowRight, FaTrophy, FaUsers, FaMapMarkerAlt, FaClipboardList, FaTimes, FaCheckCircle, FaBolt
} from 'react-icons/fa';
import { MdSportsCricket, MdSportsKabaddi } from 'react-icons/md';
import { GiVolleyballBall, GiShuttlecock } from 'react-icons/gi';

// --- DATA STRUCTURE ---
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
        girls?: PrizeDetails;
    };
    traits: string[];
}

interface SportData {
    id: string;
    name: string;
    tagline: string;
    type: string;
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
        tagline: 'Strategy vs Execution',
        type: 'Team Sport',
        categories: ['Boys'],
        icon: MdSportsCricket,
        color: 'from-blue-500 to-indigo-600',
        bg: 'https://images.unsplash.com/photo-1531415074968-bc2ce3a106e2?auto=format&fit=crop&q=80',
        details: {
            rules: ['ICC T20 Rules apply.', 'Hard leather ball usage.', '11 players per side + 3 substitutes.', 'Umpire decision is final.'],
            format: 'Knockout Tournament',
            venue: 'Main Stadium Ground',
            equipment: 'Full Cricket Kit (White Uniform)',
            prizes: {
                boys: { winner: '₹25,000', runnerUp: '₹15,000' }
            },
            traits: ['Strategy', 'Endurance', 'Teamwork']
        }
    },
    {
        id: 'football',
        name: 'Football',
        tagline: 'Passion vs Discipline',
        type: 'Team Sport',
        categories: ['Boys', 'Girls'],
        icon: FaFutbol,
        color: 'from-emerald-500 to-green-600',
        bg: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?auto=format&fit=crop&q=80',
        details: {
            rules: ['7 players on field for Boys / 5 for Girls.', 'Rolling substitutions allowed.', '30 mins per half.', 'Yellow/Red cards applicable.'],
            format: 'League + Knockout',
            venue: 'Synthetic Turf Arena',
            equipment: 'Studs/Turf Shoes, Shin Guards',
            prizes: {
                boys: { winner: '₹20,000', runnerUp: '₹10,000' },
                girls: { winner: '₹15,000', runnerUp: '₹8,000' }
            },
            traits: ['Speed', 'Agility', 'Coordination']
        }
    },
    {
        id: 'basketball',
        name: 'Basketball',
        tagline: 'Height vs Hustle',
        type: 'Team Sport',
        categories: ['Boys', 'Girls'],
        icon: FaBasketballBall,
        color: 'from-orange-500 to-red-600',
        bg: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80',
        details: {
            rules: ['FIBA standard rules.', '4 quarters of 10 mins each.', '5 fouls leads to ejection.', 'Timeouts allowed.'],
            format: 'Knockout Tournament',
            venue: 'Indoor Sports Complex',
            equipment: 'Non-marking shoes mandatory',
            prizes: {
                boys: { winner: '₹18,000', runnerUp: '₹10,000' },
                girls: { winner: '₹18,000', runnerUp: '₹10,000' }
            },
            traits: ['Height', 'Precision', 'Pace']
        }
    },
    {
        id: 'esports',
        name: 'E-Sports',
        tagline: 'Reflex vs Reality',
        type: 'Digital Sport',
        categories: ['Open'],
        icon: FaGamepad,
        color: 'from-violet-500 to-fuchsia-600',
        bg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
        details: {
            rules: ['Anti-cheat software mandatory.', 'Bring your own peripherals (Mouse/Keyboard).', 'Disconnect rules apply.'],
            format: 'Group Stage -> Playoffs',
            venue: 'Tech Auditorium',
            equipment: 'Headphones, Controller (FIFA)',
            prizes: {
                boys: { winner: '₹30,000', runnerUp: '₹15,000' }
            },
            traits: ['Reflexes', 'Tactics', 'Focus']
        }
    },
    {
        id: 'volleyball',
        name: 'Volleyball',
        tagline: 'Power vs Gravity',
        type: 'Team Sport',
        categories: ['Boys', 'Girls'],
        icon: GiVolleyballBall,
        color: 'from-yellow-400 to-orange-500',
        bg: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&q=80',
        details: {
            rules: ['Best of 3 sets.', 'Rotation rules apply.', 'Each set to 25 points.'],
            format: 'Knockout',
            venue: 'Outdoor Court 1',
            equipment: 'Standard Sportswear',
            prizes: {
                boys: { winner: '₹18,000', runnerUp: '₹10,000' },
                girls: { winner: '₹18,000', runnerUp: '₹10,000' }
            },
            traits: ['Power', 'Vertical', 'Communication']
        }
    },
    {
        id: 'badminton',
        name: 'Badminton',
        tagline: 'Speed vs Control',
        type: 'Racket Sport',
        categories: ['Boys', 'Girls', 'Mixed'],
        icon: GiShuttlecock,
        color: 'from-pink-500 to-rose-600',
        bg: 'https://images.unsplash.com/photo-1626224583764-847890e058f5?auto=format&fit=crop&q=80',
        details: {
            rules: ['BWF scoring system (21 points).', 'Feather shuttles used.', 'Non-marking shoes compulsory.'],
            format: 'Knockout',
            venue: 'Indoor Badminton Hall',
            equipment: 'Racket, Non-marking shoes',
            prizes: {
                boys: { winner: '₹10,000', runnerUp: '₹5,000' },
                girls: { winner: '₹10,000', runnerUp: '₹5,000' }
            },
            traits: ['Reflexes', 'Speed', 'Finesse']
        }
    },
    {
        id: 'kabaddi',
        name: 'Kabaddi',
        tagline: 'Strength vs Breath',
        type: 'Team Sport',
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
            },
            traits: ['Strength', 'Breath', 'Agility']
        }
    },
    {
        id: 'chess',
        name: 'Chess',
        tagline: 'Mind vs Mind',
        type: 'Mind Sport',
        categories: ['Open'],
        icon: FaChessKing,
        color: 'from-gray-500 to-gray-700',
        bg: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80',
        details: {
            rules: ['FIDE Blitz rules.', '5 mins + 3s increment.', 'Touch to move.'],
            format: 'Swiss League',
            venue: 'Quiet Hall A',
            equipment: 'None',
            prizes: {
                boys: { winner: '₹8,000', runnerUp: '₹4,000' }
            },
            traits: ['IQ', 'Patience', 'Strategy']
        }
    }
];

export default function EventsArena() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSport, setSelectedSport] = useState<SportData | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<'Boys' | 'Girls' | 'Open' | 'Mixed'>('Boys');

    const openModal = (sport: SportData, category: any) => {
        setSelectedSport(sport);
        setSelectedCategory(category);
        setModalOpen(true);
    };

    return (
        <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black text-white no-scrollbar">

            {/* 1. INTRO / GATE SECTION */}
            <section className="relative h-screen w-full snap-center flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80"
                    alt="Stadium Entrance"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                {/* Noise & Overlay */}
                <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        <h2 className="text-neon-cyan font-gang font-bold tracking-[0.5em] text-sm md:text-xl mb-4 uppercase drop-shadow-md">The Arena Awaits</h2>
                        <h1 className="text-6xl md:text-9xl font-gang font-black uppercase text-white tracking-widest leading-none mb-6 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                            Spardha <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-neon-purple">2026</span>
                        </h1>
                        <p className="text-gray-300 font-sans text-lg md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
                            Where legends are born. Choose your battleground.
                        </p>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="flex flex-col items-center gap-2 text-neon-cyan opacity-80"
                        >
                            <span className="text-xs uppercase tracking-[0.2em] font-bold">Scroll to Enter</span>
                            <FaArrowRight className="rotate-90 text-xl" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 2. SPORT ARENA SECTIONS */}
            {SPORTS_DATA.map((sport, index) => (
                <ArenaSection
                    key={sport.id}
                    sport={sport}
                    index={index}
                    onEnter={openModal}
                />
            ))}

            {/* MODAL */}
            <AnimatePresence>
                {modalOpen && selectedSport && (
                    <EventDetailModal
                        sport={selectedSport}
                        initialCategory={selectedCategory}
                        onClose={() => setModalOpen(false)}
                    />
                )}
            </AnimatePresence>

        </main>
    );
}

function ArenaSection({ sport, index, onEnter }: { sport: SportData, index: number, onEnter: (s: SportData, c: any) => void }) {
    const [category, setCategory] = useState<'Boys' | 'Girls' | 'Mixed'>(sport.categories[0] as any);
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5 });

    const getPrize = () => {
        if (category === 'Girls' && sport.details.prizes.girls) return sport.details.prizes.girls.winner;
        return sport.details.prizes.boys.winner;
    };

    return (
        <section ref={ref} className="relative h-screen w-full snap-center overflow-hidden flex items-center justify-center">

            {/* Background Image (Optimized) */}
            <motion.div
                className="absolute inset-0 w-full h-full"
                initial={{ scale: 1.1 }}
                animate={isInView ? { scale: 1 } : { scale: 1.1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <Image
                    src={sport.bg}
                    alt={`${sport.name} Arena`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={index < 2} // Prioritize first few images
                />
            </motion.div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
            <div className={`absolute inset-0 bg-gradient-to-br ${sport.color} opacity-20 mix-blend-overlay`}></div>
            <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">

                {/* Left: Text & Title */}
                <div className="text-left space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <sport.icon className="text-5xl text-neon-cyan drop-shadow-[0_0_10px_rgba(227,114,51,0.5)]" />
                            <span className="px-4 py-1.5 border border-white/20 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-gray-300 bg-black/30 backdrop-blur-sm">
                                {sport.type}
                            </span>
                        </div>

                        <h2 className="text-7xl md:text-9xl font-cinzel font-black uppercase tracking-tighter text-white mb-2 leading-[0.85] drop-shadow-2xl">
                            {sport.name}
                        </h2>
                        <p className="text-2xl md:text-3xl text-neon-cyan italic font-serif tracking-wide drop-shadow-lg">
                            "{sport.tagline}"
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap gap-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {sport.details.traits.map(trait => (
                            <span key={trait} className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                                {trait}
                            </span>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <button
                            onClick={() => onEnter(sport, category)}
                            className="mt-6 px-12 py-6 bg-white text-black hover:bg-neon-cyan hover:text-white font-cinzel font-black uppercase tracking-widest text-lg rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(227,114,51,0.6)] flex items-center gap-4 group"
                        >
                            Enter The Arena <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                        </button>
                    </motion.div>
                </div>

                {/* Right: Info Card & Toggle */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity"></div>

                    <h3 className="text-sm font-bold uppercase text-gray-400 mb-8 tracking-[0.2em]">Battle Configuration</h3>

                    {/* Category Toggle */}
                    {sport.categories.length > 1 && (
                        <div className="flex bg-black/40 rounded-xl p-1.5 mb-10 overflow-hidden border border-white/5">
                            {sport.categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat as any)}
                                    className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${category === cat ? 'bg-neon-cyan text-black shadow-lg' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Stats */}
                    <div className="space-y-8 font-cinzel">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <div className="text-gray-400 font-bold uppercase text-xs tracking-widest font-sans">Prize Pool</div>
                            <div className="text-4xl font-black text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]">{getPrize()}</div>
                        </div>
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <div className="text-gray-400 font-bold uppercase text-xs tracking-widest font-sans">Format</div>
                            <div className="text-xl text-white font-bold">{sport.details.format}</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-gray-400 font-bold uppercase text-xs tracking-widest font-sans">Team Size</div>
                            <div className="text-xl text-white font-bold">{sport.details.rules[2]?.split('.')[0] || 'Standard'}</div>
                        </div>
                    </div>

                </motion.div>

            </div>

            {/* Scroll Hint */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent"></div>
            </div>
        </section>
    );
}

// Reuse existing modal logic
function EventDetailModal({ sport, initialCategory, onClose }: { sport: SportData, initialCategory: 'Boys' | 'Girls' | 'Open' | 'Mixed', onClose: () => void }) {
    const router = useRouter();

    const getPrizeData = (cat: string) => {
        if (cat === 'Girls' && sport.details.prizes.girls) return sport.details.prizes.girls;
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 50 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl bg-[#0f172a] border border-white/10 rounded-[2rem] shadow-[0_0_100px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:h-[650px]"
            >
                {/* Left Side (Image & Title) */}
                <div className="relative h-48 md:h-full md:w-5/12 shrink-0 overflow-hidden group">
                    <Image
                        src={sport.bg}
                        alt={sport.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${sport.color} opacity-80 mix-blend-multiply`}></div>
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                        <sport.icon className="text-8xl text-white/10 mb-auto absolute top-10 right-10 rotate-12" />
                        <h2 className="text-5xl md:text-6xl font-cinzel font-black uppercase text-white tracking-widest leading-none mb-4">{sport.name}</h2>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest rounded-lg border border-white/20">
                                {initialCategory} Mode
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Side (Content) */}
                <div className="relative flex-1 flex flex-col bg-[#020617]">
                    <button onClick={onClose} className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors border border-white/10">
                        <FaTimes />
                    </button>
                    <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 custom-scrollbar">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-2 text-yellow-500 mb-2">
                                    <FaTrophy /> <span className="text-xs font-bold uppercase tracking-wider">Winner Prize</span>
                                </div>
                                <div className="text-3xl font-cinzel font-black text-white">{prizeData?.winner || 'TBA'}</div>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-2 text-gray-400 mb-2">
                                    <FaUsers /> <span className="text-xs font-bold uppercase tracking-wider">Runner Up</span>
                                </div>
                                <div className="text-2xl font-cinzel font-bold text-gray-300">{prizeData?.runnerUp || 'TBA'}</div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-neon-cyan font-bold uppercase tracking-widest mb-4 text-sm flex items-center gap-2"><FaBolt /> Battle Rules</h3>
                                <ul className="space-y-3">
                                    {sport.details.rules.map((rule, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed">
                                            <FaCheckCircle className="mt-1 text-xs text-green-500 shrink-0" />
                                            {rule}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-gray-500 mb-1 tracking-wider">Arena Location</h4>
                                    <p className="text-white font-bold">{sport.details.venue}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-gray-500 mb-1 tracking-wider">Gear Required</h4>
                                    <p className="text-white font-bold">{sport.details.equipment}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 border-t border-white/10 bg-[#0f172a]">
                        <button
                            onClick={handleRegister}
                            className="w-full py-5 bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-cinzel font-black uppercase tracking-widest text-lg rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                        >
                            Confirm Registration <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
