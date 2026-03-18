'use client';

import React, { useState, useEffect } from 'react';
import { SportItem, UserData } from '../GamifiedWizard';
import { TeamMember } from './TeamRoster';
import { FaBarcode, FaQrcode, FaCheckCircle, FaLock, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

declare global {
    interface Window {
        Cashfree: any;
    }
}

interface Props {
    cart: SportItem[];
    userData: UserData;
    teamMembers?: Record<string, TeamMember[]>;
    onNext: () => void;
    onPrev: () => void;
}

export default function FinalEntryPass({ cart, userData, teamMembers, onNext, onPrev }: Props) {

    const [isProcessing, setIsProcessing] = useState(false);
    const [sdkLoaded, setSdkLoaded] = useState(false);

    // Calculations
    const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
    const total = subtotal;

    // Load Cashfree SDK
    React.useEffect(() => {
        const loadSdk = () => {
            const script = document.createElement('script');
            script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
            script.onload = () => {
                console.log('✅ Cashfree SDK Loaded');
                setSdkLoaded(true);
            };
            document.body.appendChild(script);
        };
        loadSdk();
    }, []);

    const handlePayment = async () => {
        if (!sdkLoaded) {
            alert('Payment SDK is still loading. Please wait...');
            return;
        }

        setIsProcessing(true);

        try {
            // 1. Create Order on Backend
            const response = await fetch('/api/payments/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: total,
                    customerName: userData.fullName,
                    customerEmail: userData.email,
                    customerPhone: userData.phone,
                    customerGender: userData.gender,
                    customerAge: userData.age,
                    universityName: userData.college,
                    universityIdCard: userData.universityIdCard,
                    address: userData.address,
                    teamMembers: teamMembers,
                    items: cart.map(item => ({
                        id: item.id,
                        title: item.name,
                        category: item.category,
                        price: item.price
                    }))
                }),
            });

            const data = await response.json();

            if (data.success) {
                // 2. Initialize Cashfree Payment
                const cashfree = new window.Cashfree({
                    mode: data.data.environment || 'sandbox',
                });

                const orderId = data.data.order_id;
                const returnUrl = `${window.location.origin}/payment/success?order_id=${orderId}`;

                const checkoutOptions = {
                    paymentSessionId: data.data.payment_session_id,
                    redirectTarget: '_self',
                    return_url: returnUrl, // Tell SDK where to redirect after payment
                };

                console.log('💳 Cashfree checkout with return_url:', returnUrl);
                cashfree.checkout(checkoutOptions);
            } else {
                alert('Failed to create order: ' + data.message);
                setIsProcessing(false);
            }
        } catch (error) {
            console.error('Payment Error:', error);
            alert('Payment initialization failed.');
            setIsProcessing(false);
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-start pt-4 px-4 pb-20 overflow-y-auto">
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 text-neon-cyan mb-2 border border-neon-cyan/30 px-4 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                    <FaLock className="text-xs" />
                    <span className="text-[10px] uppercase tracking-[0.3em]">Secure Checkout Protocol</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white tracking-wider">
                    FINAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-blue-500">SUMMARY</span>
                </h2>
                <p className="text-gray-400 mt-2 text-sm font-mono">
                    ORDER #SP-{Math.random().toString(36).substr(2, 6).toUpperCase()} // REVIEW DETAILS BEFORE DEPLOYMENT
                </p>
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
                {/* Left: Ticket Pass */}
                <div className="lg:col-span-2 bg-white text-black rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.1)] flex flex-col md:flex-row relative">
                    {/* Perforations */}
                    <div className="absolute top-[40%] md:top-[-10px] right-[-10px] md:right-[200px] w-5 h-5 bg-[#020617] rounded-full z-10"></div>
                    <div className="absolute bottom-[60%] md:bottom-[-10px] right-[-10px] md:right-[200px] w-5 h-5 bg-[#020617] rounded-full z-10"></div>

                    <div className="flex-1 p-8 border-b-2 md:border-b-0 md:border-r-2 border-dashed border-gray-300 relative">
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-black rounded-lg">
                                    <span className="text-neon-cyan font-black italic text-xl">S</span>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Organizer</div>
                                    <div className="text-lg font-black italic uppercase tracking-tight">SPARDHA 2026</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-bold text-gray-400">ACCESS LEVEL</div>
                                <div className="text-xs font-black bg-black text-white px-2 py-0.5 rounded">ELITE ATHLETE</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Athlete</div>
                                <div className="font-black text-lg uppercase truncate">{userData.fullName || "ATHLETE"}</div>
                                <div className="text-[10px] text-gray-500 uppercase truncate">{userData.college}</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Venue</div>
                                <div className="font-black text-lg uppercase">JKLU ARENA</div>
                                <div className="text-[10px] text-gray-500 uppercase">JAIPUR, INDIA</div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-2">Registered Operations</div>
                            <div className="flex flex-wrap gap-2">
                                {cart.map(item => (
                                    <span key={item.id} className="bg-black text-[#22d3ee] px-3 py-1 text-[10px] font-black uppercase rounded flex items-center gap-1">
                                        <FaCheckCircle className="text-[8px]" /> {item.name}
                                    </span>
                                ))}
                                {cart.length === 0 && <span className="text-gray-400 text-xs italic">No events selected</span>}
                            </div>
                        </div>

                        <div className="flex justify-between items-end mt-auto pt-6 border-t border-gray-100">
                            <div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Order Status</div>
                                <div className="text-amber-500 font-black text-xs uppercase flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                                    Awaiting Payment
                                </div>
                            </div>
                            <FaBarcode className="text-5xl opacity-20" />
                        </div>
                    </div>

                    {/* Ticket Stub */}
                    <div className="w-full md:w-[200px] bg-gray-50 p-8 flex flex-col items-center justify-center relative">
                        <FaQrcode className="text-6xl mb-4 text-black/80" />
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
                            Scan to<br />Verify Entry
                        </div>
                    </div>
                </div>

                {/* Right: Checkout Sidebar */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col h-fit backdrop-blur-sm">
                    <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-neon-cyan rounded-full"></span>
                        Checkout Details
                    </h3>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-xs font-mono">
                            <span className="text-gray-500 uppercase">Subtotal</span>
                            <span className="text-white">₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-white/10 pt-4 flex justify-between items-end">
                            <span className="text-xs font-bold text-gray-300 uppercase">Total Amount</span>
                            <span className="text-3xl font-black text-neon-cyan font-mono">₹{total.toFixed(0)}</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="w-full bg-white text-black py-4 rounded-xl font-black italic uppercase tracking-wider hover:bg-neon-cyan transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        >
                            {isProcessing ? (
                                <span className="animate-pulse flex items-center gap-2">
                                    <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                                    Processing...
                                </span>
                            ) : (
                                <>
                                    <span>PAY & FINALIZE</span>
                                    <FaLock className="text-xs opacity-50" />
                                </>
                            )}
                        </button>

                        <button
                            onClick={onPrev}
                            disabled={isProcessing}
                            className="w-full text-[10px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors flex items-center justify-center gap-2 py-2"
                        >
                            &larr; Modify Registration
                        </button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/5">
                        <p className="text-[9px] text-center text-gray-600 font-mono leading-relaxed italic">
                            By clicking PAY, you agree to Spardha 2026 Terms of Service and Refund Policy.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
