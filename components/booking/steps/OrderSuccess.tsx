'use client';

import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { FaCheckCircle, FaDownload, FaHome } from 'react-icons/fa';
import Link from 'next/link';
import { SportItem } from '../BookingWizard';

interface OrderSuccessProps {
    orderId: string;
    cart: SportItem[];
}

export default function OrderSuccess({ orderId, cart }: OrderSuccessProps) {
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 8000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-full flex flex-col items-center justify-center text-center relative">
            {showConfetti && <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />}

            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                <FaCheckCircle className="text-4xl text-black" />
            </div>

            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-white mb-2">
                Registration <span className="text-neon-cyan">Successful!</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-md">
                You are confirmed for SPARDHA 2026. A confirmation email has been sent to your registered address.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 w-full max-w-md mb-8">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                    <span className="text-gray-500 text-sm uppercase tracking-wider">Order ID</span>
                    <span className="font-mono font-bold text-neon-cyan text-xl">{orderId}</span>
                </div>
                <div className="text-left">
                    <span className="text-gray-500 text-xs uppercase tracking-wider block mb-2">Registered Events</span>
                    <div className="flex flex-wrap gap-2">
                        {cart.map(item => (
                            <span key={item.id} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white uppercase">
                                {item.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <Link href="/" className="btn-secondary flex items-center gap-2">
                    <FaHome /> Home
                </Link>
                <button className="btn-primary flex items-center gap-2 bg-neon-cyan text-black hover:bg-white">
                    <FaDownload /> Download Ticket
                </button>
            </div>
        </div>
    );
}
