'use client';

import { SportItem } from '../BookingWizard';
import { FaFutbol, FaBasketballBall, FaRunning, FaGamepad, FaChessKing } from 'react-icons/fa';
import { MdSportsCricket, MdSportsKabaddi } from 'react-icons/md';
import { GiVolleyballBall, GiShuttlecock } from 'react-icons/gi';
import { motion } from 'framer-motion';

const ALL_SPORTS = [
    { id: '1', name: 'Cricket', price: 500, icon: MdSportsCricket, bg: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80' },
    { id: '2', name: 'Football', price: 400, icon: FaFutbol, bg: 'https://images.unsplash.com/photo-1579952363873-27f3bde87a34?auto=format&fit=crop&q=80' },
    { id: '3', name: 'Basketball', price: 350, icon: FaBasketballBall, bg: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80' },
    { id: '4', name: 'Badminton', price: 300, icon: GiShuttlecock, bg: 'https://images.unsplash.com/photo-1626224583764-847890e058f5?auto=format&fit=crop&q=80' },
    { id: '5', name: 'Table Tennis', price: 250, icon: FaRunning, bg: 'https://images.unsplash.com/photo-1534158914592-062992bbe900?auto=format&fit=crop&q=80' }, // Placeholder icon
    { id: '6', name: 'Chess', price: 200, icon: FaChessKing, bg: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80' },
    { id: '7', name: 'Athletics', price: 300, icon: FaRunning, bg: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80' },
];

interface SportsSelectionProps {
    cart: SportItem[];
    setCart: React.Dispatch<React.SetStateAction<SportItem[]>>;
    onNext: () => void;
    onPrev: () => void;
}

export default function SportsSelection({ cart, setCart, onNext, onPrev }: SportsSelectionProps) {

    const toggleSport = (sport: any) => {
        const isInCart = cart.find(item => item.id === sport.id);
        if (isInCart) {
            setCart(prev => prev.filter(item => item.id !== sport.id));
        } else {
            setCart(prev => [...prev, { id: sport.id, name: sport.name, price: sport.price, image: sport.bg }]);
        }
    };

    return (
        <div className="h-full flex flex-col">
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-2 text-white border-l-4 border-neon-cyan pl-4">
                Select <span className="text-neon-cyan">Sports</span>
            </h2>
            <p className="text-gray-400 text-sm mb-6 pl-5">Select all the events you wish to participate in.</p>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {ALL_SPORTS.map((sport) => {
                        const isSelected = cart.some(item => item.id === sport.id);

                        return (
                            <div
                                key={sport.id}
                                onClick={() => toggleSport(sport)}
                                className={`
                                    relative group cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-300
                                    ${isSelected ? 'border-neon-cyan shadow-[0_0_20px_rgba(14,165,233,0.3)] scale-[1.02]' : 'border-white/10 hover:border-white/30'}
                                `}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${sport.bg})` }}></div>
                                <div className={`absolute inset-0 bg-black/60 transition-opacity ${isSelected ? 'opacity-80' : 'opacity-60 group-hover:opacity-50'}`}></div>

                                {/* Content */}
                                <div className="relative z-10 p-4 h-40 flex flex-col justify-between items-center text-center">
                                    <sport.icon className={`text-4xl mb-2 transition-colors ${isSelected ? 'text-neon-cyan' : 'text-gray-300'}`} />

                                    <div>
                                        <h3 className="font-bold uppercase tracking-wider text-sm md:text-base text-white">{sport.name}</h3>
                                        <div className="text-neon-cyan font-mono font-bold mt-1">₹{sport.price}</div>
                                    </div>

                                    <div className={`
                                        px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all
                                        ${isSelected ? 'bg-neon-cyan text-black' : 'bg-white/10 text-gray-300'}
                                    `}>
                                        {isSelected ? 'Added' : 'Add to Cart'}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-8 flex justify-between items-center border-t border-white/10 pt-6">
                <button onClick={onPrev} className="btn-secondary">
                    &larr; Back
                </button>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <span className="text-xs text-gray-400 uppercase block">Total Items</span>
                        <span className="text-xl font-bold font-mono text-white">{cart.length}</span>
                    </div>
                    <button
                        onClick={onNext}
                        disabled={cart.length === 0}
                        className="btn-primary"
                    >
                        Next: Cart &rarr;
                    </button>
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
