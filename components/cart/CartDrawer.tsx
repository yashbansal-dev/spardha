'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { IoClose, IoTrash, IoCard } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
    const { items, isOpen, toggleCart, removeFromCart, totalAmount } = useCart();
    const router = useRouter();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#050505] border-l border-white/10 shadow-2xl z-[1000] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
                            <h2 className="text-2xl font-gang text-white uppercase tracking-wider">
                                Access <span className="text-neon-cyan">Passes</span>
                            </h2>
                            <button
                                onClick={toggleCart}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                            >
                                <IoClose size={24} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-white/30 space-y-4">
                                    <IoCard size={48} />
                                    <p className="font-mono text-sm tracking-widest uppercase">No Events Selected</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="relative bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 overflow-hidden group hover:border-neon-cyan/30 transition-colors"
                                    >
                                        <div className={`w-1 bg-gradient-to-b ${item.color} absolute left-0 top-0 bottom-0`}></div>

                                        <div className="flex-1">
                                            <h3 className="font-bold text-white uppercase tracking-wider">{item.name}</h3>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-xs font-mono text-white/50 uppercase bg-white/5 px-2 py-0.5 rounded">
                                                    {item.category}
                                                </span>
                                                <span className="text-neon-cyan font-bold font-mono">
                                                    ₹{item.price.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-white/20 hover:text-red-500 transition-colors p-2"
                                        >
                                            <IoTrash size={20} />
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        <div className="p-6 border-t border-white/10 bg-black/80 backdrop-blur-xl">
                            <div className="flex justify-between items-end mb-6">
                                <span className="text-white/50 text-sm font-mono uppercase tracking-widest">Total Amount</span>
                                <span className="text-3xl font-gang text-white">
                                    ₹{totalAmount.toLocaleString()}
                                </span>
                            </div>

                            <button
                                onClick={() => {
                                    toggleCart();
                                    router.push('/register');
                                }}
                                disabled={items.length === 0}
                                className="w-full py-4 bg-neon-cyan text-black font-black uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed clip-path-button"
                            >
                                Proceed into Arena
                            </button>
                        </div>

                        <style jsx>{`
                            .clip-path-button {
                                clip-path: polygon(5% 0, 100% 0, 100% 70%, 95% 100%, 0 100%, 0 30%);
                            }
                        `}</style>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
