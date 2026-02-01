'use client';

import React from 'react';
import { SportItem } from '../GamifiedWizard';
import { FaFutbol, FaBasketballBall, FaRunning, FaGamepad, FaChessKing, FaLock, FaBolt } from 'react-icons/fa';
import { MdSportsCricket, MdSportsKabaddi } from 'react-icons/md';
import { GiVolleyballBall, GiShuttlecock } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';

export const ALL_SPORTS = [
    { id: '1', name: 'Cricket', price: 500, icon: MdSportsCricket, bg: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80', difficulty: 'Elite' },
    { id: '2', name: 'Football', price: 400, icon: FaFutbol, bg: 'https://images.unsplash.com/photo-1579952363873-27f3bde87a34?auto=format&fit=crop&q=80', difficulty: 'Pro' },
    { id: '3', name: 'Basketball', price: 350, icon: FaBasketballBall, bg: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80', difficulty: 'Pro' },
    { id: '4', name: 'Badminton', price: 300, icon: GiShuttlecock, bg: 'https://images.unsplash.com/photo-1626224583764-847890e058f5?auto=format&fit=crop&q=80', difficulty: 'Intermediate' },
    { id: '5', name: 'Table Tennis', price: 250, icon: FaRunning, bg: 'https://images.unsplash.com/photo-1534158914592-062992bbe900?auto=format&fit=crop&q=80', difficulty: 'Intermediate' },
    { id: '6', name: 'Chess', price: 200, icon: FaChessKing, bg: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80', difficulty: 'Tactical' },
    { id: '7', name: 'Athletics', price: 300, icon: FaRunning, bg: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80', difficulty: 'Endurance' },
    { id: '8', name: 'E-Sports', price: 600, icon: FaGamepad, bg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80', difficulty: 'Digital' },
    { id: '9', name: 'Volleyball', price: 350, icon: GiVolleyballBall, bg: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&q=80', difficulty: 'Team' },
    { id: '10', name: 'Kabaddi', price: 350, icon: MdSportsKabaddi, bg: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80', difficulty: 'Power' },
];

interface Props {
    cart: SportItem[];
    setCart: React.Dispatch<React.SetStateAction<SportItem[]>>;
    onNext: () => void;
    onPrev: () => void;
}

export default function SportsDraftBoard({ cart, setCart, onNext, onPrev }: Props) {
    const MAX_EVENTS = 4;

    const toggleSport = (sport: any) => {
        const isInCart = cart.find(item => item.id === sport.id);
        if (isInCart) {
            setCart(prev => prev.filter(item => item.id !== sport.id));
        } else {
            if (cart.length >= MAX_EVENTS) return;
            setCart(prev => [...prev, { id: sport.id, name: sport.name, price: sport.price, image: sport.bg }]);
        }
    };

    const energyPercentage = (cart.length / MAX_EVENTS) * 100;

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col md:flex-row h-full gap-6">

                {/* LEFT: Draft Board */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <h2 className="text-3xl font-black italic uppercase text-white mb-6 sticky top-0 bg-black z-20 py-4 border-b border-white/10 flex justify-between items-center">
                        <div>
                            DRAFT <span className="text-neon-cyan">BOARD</span>
                        </div>
                        <div className="text-sm not-italic font-mono text-gray-400">
                            SELECT EVENTS
                        </div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                        {ALL_SPORTS.map((sport) => {
                            const isSelected = cart.some(item => item.id === sport.id);
                            const isLocked = !isSelected && cart.length >= MAX_EVENTS;

                            return (
                                <motion.div
                                    key={sport.id}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className={`relative h-64 rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 ${isLocked ? 'grayscale opacity-50 cursor-not-allowed' : ''} ${isSelected ? 'ring-2 ring-neon-cyan shadow-[0_0_30px_rgba(0,243,255,0.4)]' : 'ring-1 ring-white/10'}`}
                                    onClick={() => !isLocked && toggleSport(sport)}
                                >
                                    {/* Video/Image Background */}
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${sport.bg})` }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                                    {/* Content */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${sport.difficulty === 'Elite' ? 'bg-red-500 text-white' :
                                                sport.difficulty === 'Pro' ? 'bg-orange-500 text-white' :
                                                    'bg-blue-500 text-white'
                                                }`}>
                                                {sport.difficulty}
                                            </span>
                                            {isSelected && <div className="bg-neon-cyan text-black p-1 rounded-full"><FaBolt /></div>}
                                        </div>

                                        <div>
                                            <sport.icon className="text-4xl text-white/80 mb-2 group-hover:text-neon-cyan transition-colors" />
                                            <h3 className="text-2xl font-black uppercase italic text-white leading-none mb-1">{sport.name}</h3>
                                            <div className="text-sm font-mono text-gray-300">Entry Fee: <span className="text-neon-cyan font-bold">₹{sport.price}</span></div>
                                        </div>
                                    </div>

                                    {/* Overlay Button */}
                                    <div className={`absolute inset-0 bg-neon-cyan/90 flex items-center justify-center font-black italic text-black text-xl tracking-widest uppercase transition-opacity duration-200 ${isSelected ? 'opacity-0 hover:opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                        {isSelected ? 'REMOVE' : 'JOIN EVENT'}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT: Status Panel */}
                <div className="w-full md:w-80 bg-white/5 border-l border-white/10 p-6 flex flex-col relative z-30">
                    <div className="mb-8">
                        <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-4">Team Energy</h3>
                        <div className="bg-black/50 h-4 rounded-full overflow-hidden border border-white/20 relative">
                            <motion.div
                                className={`h-full ${energyPercentage === 100 ? 'bg-red-500' : 'bg-neon-cyan'} shadow-[0_0_20px_currentColor]`}
                                initial={{ width: 0 }}
                                animate={{ width: `${energyPercentage}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-xs font-mono">
                            <span className="text-white">{cart.length} Events</span>
                            <span className="text-gray-500">Max {MAX_EVENTS}</span>
                        </div>
                        {cart.length === MAX_EVENTS && (
                            <div className="mt-2 text-red-500 text-xs font-bold uppercase tracking-widest animate-pulse">
                                Energy Limit Reached
                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-4">Your Loadout</h3>
                        <div className="space-y-2">
                            <AnimatePresence>
                                {cart.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="bg-black/40 border border-white/10 p-3 rounded flex justify-between items-center group"
                                    >
                                        <span className="font-bold text-sm uppercase">{item.name}</span>
                                        <button onClick={() => toggleSport(item)} className="text-gray-500 hover:text-red-500">
                                            &times;
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {cart.length === 0 && (
                                <div className="text-gray-600 text-sm italic text-center py-8">No Active Events</div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 space-y-3">
                        <button onClick={onNext} disabled={cart.length === 0} className="w-full bg-neon-cyan text-black font-black italic uppercase py-3 rounded hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                            Confirm Loadout &rarr;
                        </button>
                        <button onClick={onPrev} className="w-full text-gray-500 text-xs uppercase tracking-widest hover:text-white transition-colors">
                            Back to Profile
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
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
        </div>
    );
}
