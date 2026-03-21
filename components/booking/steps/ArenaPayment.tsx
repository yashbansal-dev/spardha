'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaWallet, FaUniversity, FaLock } from 'react-icons/fa';
import { UserData, SportItem } from '../GamifiedWizard'; // UserData from parent
import { TeamMember } from './TeamRoster';

// Declare Cashfree type to avoid TS errors
declare global {
    interface Window {
        Cashfree: any;
    }
}

interface Props {
    userData: UserData;
    teamMembers?: Record<string, TeamMember[]>;
    cart: SportItem[];
    onPrev: () => void;
    amount: number;

}

export default function ArenaPayment({ userData, teamMembers, cart, onPrev, amount }: Props) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [showTunnel, setShowTunnel] = useState(true);
    const [sdkLoaded, setSdkLoaded] = useState(false);

    // Initial Tunnel Effect & Load SDK
    useEffect(() => {
        const timer = setTimeout(() => setShowTunnel(false), 2000);

        // Load Cashfree SDK
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

        return () => clearTimeout(timer);
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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                    customerName: userData.fullName,
                    customerEmail: userData.email,
                    customerPhone: userData.phone,
                    customerGender: userData.gender,
                    customerAge: userData.age,
                    universityName: userData.college,
                    universityIdCard: userData.universityIdCard,
                    address: userData.address,
                    teamMembers: teamMembers, // Send team data
                    items: cart.map(item => ({
                        id: item.id,
                        title: item.name,
                        category: item.category, // Added category for backend smart lookup
                        price: item.price
                    }))
                }),
            });

            const data = await response.json();

            console.log('Payment Order Response:', data); // DEBUG LOG

            if (data.success) {
                console.log('Initializing Cashfree in mode:', data.data.environment); // DEBUG LOG
                // 2. Initialize Cashfree Payment
                const cashfree = new window.Cashfree({
                    mode: data.data.environment || 'sandbox', // 'production' or 'sandbox'
                });

                const orderId = data.data.order_id;
                const returnUrl = `${window.location.origin}/payment/success?order_id=${orderId}`;

                const checkoutOptions = {
                    paymentSessionId: data.data.payment_session_id,
                    redirectTarget: '_self', // Redirect in same tab
                    returnUrl: returnUrl, // Explicitly tell SDK where to redirect after payment
                };

                console.log('💳 Cashfree checkout with return_url:', returnUrl); // DEBUG LOG
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
        <div className="h-full relative overflow-hidden flex items-center justify-center">

            {/* Tunnel Overlay */}
            <AnimatePresence>
                {showTunnel && (
                    <motion.div
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 5, opacity: 0 }}
                        exit={{ display: 'none' }}
                        transition={{ duration: 1.5, ease: "easeIn" }}
                        className="absolute inset-0 z-50 bg-black flex items-center justify-center pointer-events-none"
                    >
                        <div className="w-full h-full bg-[radial-gradient(circle,_transparent_10%,_black_90%)] border-[100px] border-black rounded-full shadow-[inset_0_0_100px_#0ef]"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Payment Jumbotron */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 }}
                className="w-full max-w-2xl bg-black border-4 border-neon-cyan shadow-[0_0_50px_rgba(0,243,255,0.3)] rounded-3xl p-1 relative overflow-hidden"
            >
                {/* Screen Scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>

                <div className="bg-[#111] rounded-2xl p-8 relative z-20 h-full flex flex-col items-center text-center">
                    <h2 className="text-3xl font-black italic uppercase text-white mb-2">
                        SECURE <span className="text-neon-cyan">GATEWAY</span>
                    </h2>
                    <p className="text-gray-400 text-sm mb-8">Complete transaction to lock your spot</p>

                    <div className="w-full bg-white/5 border border-white/10 rounded-xl p-6 mb-8 flex justify-between items-center">
                        <span className="text-gray-400 uppercase tracking-widest text-sm">Total Payable</span>
                        <span className="text-4xl font-mono font-bold text-neon-cyan">₹{amount.toFixed(2)}</span>
                    </div>


                    <div className="w-full">
                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="w-full bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-black italic uppercase text-xl py-5 rounded-lg shadow-[0_0_30px_rgba(227,114,51,0.5)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden"
                        >
                            {isProcessing && (
                                <div className="absolute inset-0 bg-white/20 animate-progress-loading origin-left"></div>
                            )}
                            {isProcessing ? 'PROCESSING...' : (
                                <>
                                    <FaLock /> PAY ₹{amount.toFixed(2)}
                                </>
                            )}
                        </button>
                    </div>

                    <button onClick={onPrev} disabled={isProcessing} className="mt-4 text-gray-500 hover:text-white text-xs uppercase tracking-widest">
                        Cancel Transaction
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
