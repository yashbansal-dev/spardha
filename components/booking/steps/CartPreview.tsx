'use client';

import { SportItem } from '../BookingWizard';
import { FaTrash } from 'react-icons/fa';

interface CartPreviewProps {
    cart: SportItem[];
    setCart: React.Dispatch<React.SetStateAction<SportItem[]>>;
    totals: { subtotal: number; gst: number; total: number };
    onNext: () => void;
    onPrev: () => void;
}

export default function CartPreview({ cart, setCart, totals, onNext, onPrev }: CartPreviewProps) {

    const removeItem = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div className="h-full flex flex-col">
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-6 text-white border-l-4 border-neon-cyan pl-4">
                Cart <span className="text-neon-cyan">Summary</span>
            </h2>

            <div className="flex-1 overflow-y-auto mb-6 custom-scrollbar pr-2">
                {cart.length === 0 ? (
                    <div className="h-40 flex items-center justify-center text-gray-500 italic">
                        Your cart is empty. Go back and select sports.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center justify-between bg-white/5 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div>
                                        <h4 className="font-bold text-white uppercase">{item.name}</h4>
                                        <span className="text-xs text-gray-400">Registration Fee</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="font-mono font-bold text-neon-cyan">₹{item.price}</span>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-gray-500 hover:text-red-500 transition-colors p-2"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Calculations */}
            <div className="bg-black/40 p-6 rounded-xl border border-white/10">
                <div className="space-y-2 mb-4 border-b border-white/10 pb-4">
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Subtotal</span>
                        <span className="font-mono text-white">₹{totals.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>GST (5%)</span>
                        <span className="font-mono text-white">₹{totals.gst.toFixed(2)}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold uppercase text-white">Grand Total</span>
                    <span className="text-2xl font-black font-mono text-neon-cyan">₹{totals.total.toFixed(2)}</span>
                </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
                <button onClick={onPrev} className="btn-secondary">
                    &larr; Back
                </button>
                <button
                    onClick={onNext}
                    disabled={cart.length === 0}
                    className="btn-primary bg-neon-cyan border-neon-cyan hover:bg-neon-cyan/80"
                >
                    Proceed to Payment
                </button>
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
