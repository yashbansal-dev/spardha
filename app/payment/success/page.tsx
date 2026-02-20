'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Download, Home } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get('order_id');
    const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
    const [orderDetails, setOrderDetails] = useState<any>(null);

    useEffect(() => {
        if (!orderId) {
            setStatus('failed');
            return;
        }

        const verifyPayment = async () => {
            try {
                // Call verification endpoint
                const response = await fetch(`/api/payments/verify/${orderId}`);
                const data = await response.json();

                // data.data is an array of payments — check the last payment
                const paymentsArr = Array.isArray(data.data) ? data.data : [];
                const lastPayment = paymentsArr[paymentsArr.length - 1];
                const isPaid = data.success && lastPayment?.payment_status === 'SUCCESS';

                if (isPaid) {
                    setStatus('success');
                    setOrderDetails(data.data);

                    // Trigger the success handler to generate QR and send email
                    // Backend has a retry loop — await so we don't fire-and-forget
                    try {
                        await fetch(`/api/payments/success/${orderId}`);
                    } catch (e) {
                        console.error('Success handler error (non-fatal, webhook is fallback):', e);
                    }
                } else {
                    setStatus('failed');
                }
            } catch (error) {
                console.error('Payment verification failed:', error);
                setStatus('failed');
            }
        };

        verifyPayment();
    }, [orderId]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-mono text-neon-cyan animate-pulse">VERIFYING PAYMENT...</p>
                </div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white p-4">
                <div className="max-w-md w-full bg-white/5 border border-red-500/30 rounded-2xl p-8 text-center">
                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">❌</span>
                    </div>
                    <h1 className="text-2xl font-bold mb-4 font-gang">Payment Failed</h1>
                    <p className="text-gray-400 mb-8">
                        We couldn't verify your payment. If money was deducted, it will be refunded automatically within 5-7 business days.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => router.push('/register')}
                            className="px-6 py-2 bg-white text-black font-bold uppercase rounded hover:bg-gray-200 transition"
                        >
                            Try Again
                        </button>
                        <Link href="/" className="px-6 py-2 border border-white/20 text-white font-bold uppercase rounded hover:bg-white/10 transition">
                            Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-lg w-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-1 relative z-10 shadow-[0_0_50px_rgba(0,243,255,0.2)]"
            >
                <div className="bg-[#111] rounded-[22px] p-8 md:p-12 text-center relative overflow-hidden">
                    {/* Confetti / Particle Effect would go here */}

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-24 h-24 bg-gradient-to-tr from-neon-cyan to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,243,255,0.5)]"
                    >
                        <Check size={48} className="text-black stroke-[3]" />
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-black italic uppercase text-white mb-2 font-gang tracking-wider">
                        VICTORY!
                    </h1>
                    <p className="text-neon-cyan font-mono mb-8 uppercase tracking-widest text-sm">
                        Registration Confirmed
                    </p>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-left space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-500 text-xs uppercase tracking-wider">Order ID</span>
                            <span className="font-mono text-white">{orderId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 text-xs uppercase tracking-wider">Status</span>
                            <span className="text-green-400 font-bold uppercase text-xs bg-green-400/10 px-2 py-0.5 rounded">Paid</span>
                        </div>
                        <div className="h-px bg-white/10 my-2"></div>
                        <p className="text-xs text-gray-400 text-center">
                            A confirmation email with your QR Code has been sent to your registered email address.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link
                            href="/"
                            className="w-full py-4 bg-white text-black font-black italic uppercase rounded-lg hover:bg-neon-cyan transition-colors flex items-center justify-center gap-2"
                        >
                            <Home size={18} /> Return to Base
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
