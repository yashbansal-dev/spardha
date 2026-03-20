'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Home, Clock, Mail } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get('order_id');
    const [status, setStatus] = useState<'loading' | 'success' | 'pending' | 'no_order'>('loading');
    const [orderDetails, setOrderDetails] = useState<any>(null);

    useEffect(() => {
        // Clear draft from localStorage on successful redirect to this page
        localStorage.removeItem('spardha-user-email');
        localStorage.removeItem('spardha-cart');
        console.log('✅ Local draft and cart cleared on payment success page.');

        // If no order ID in URL, something is truly wrong
        if (!orderId) {
            setStatus('no_order');
            return;
        }

        const verifyPayment = async () => {
            const MAX_RETRIES = 8;
            const RETRY_DELAY = 3000; // 3 seconds between retries = 24s total

            for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
                try {
                    console.log(`🔍 Verification attempt ${attempt}/${MAX_RETRIES}...`);

                    // First, check backend /success which handles DB lookup + Cashfree
                    const response = await fetch(`/api/payments/success/${orderId}`);
                    const data = await response.json();

                    if (data.success) {
                        console.log('✅ Payment verified successfully!');
                        setStatus('success');
                        setOrderDetails(data);
                        return; // Done!
                    }

                    // Also try the verify endpoint as a cross-check
                    if (!data.success) {
                        try {
                            const verifyRes = await fetch(`/api/payments/verify/${orderId}`);
                            const verifyData = await verifyRes.json();
                            const paymentsArr = Array.isArray(verifyData.data) ? verifyData.data : [];
                            const lastPayment = paymentsArr[paymentsArr.length - 1];
                            if (verifyData.success && lastPayment?.payment_status === 'SUCCESS') {
                                console.log('✅ Payment verified via /verify endpoint!');
                                setStatus('success');
                                setOrderDetails(verifyData);
                                return;
                            }
                        } catch (_) {
                            // Ignore verify endpoint errors
                        }
                    }

                    // Not confirmed yet — wait and retry (unless last attempt)
                    if (attempt < MAX_RETRIES) {
                        console.log(`⏳ Not confirmed yet, retrying in ${RETRY_DELAY / 1000}s...`);
                        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                    }
                } catch (error) {
                    console.error(`Verification attempt ${attempt} failed:`, error);
                    if (attempt < MAX_RETRIES) {
                        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                    }
                }
            }

            // All retries exhausted — but we NEVER say "failed" if payment was attempted.
            // The webhook will eventually process it. Show a "pending" state instead.
            console.log('⚠️ Could not verify in time — showing pending state (webhook will process)');
            setStatus('pending');
        };

        verifyPayment();
    }, [orderId]);

    // ─── LOADING ───────────────────────────────────────────────────────────
    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-4 text-center px-4">
                    <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-mono text-neon-cyan animate-pulse text-sm uppercase tracking-widest">Verifying Payment...</p>
                    <p className="text-gray-500 text-xs max-w-xs">This may take up to 30 seconds. Please do not close this page.</p>
                </div>
            </div>
        );
    }

    // ─── NO ORDER ID (truly broken URL) ────────────────────────────────────
    if (status === 'no_order') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white p-4">
                <div className="max-w-md w-full bg-white/5 border border-yellow-500/30 rounded-2xl p-8 text-center">
                    <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">⚠️</span>
                    </div>
                    <h1 className="text-2xl font-bold mb-4 font-gang">Invalid Link</h1>
                    <p className="text-gray-400 mb-8">
                        No order ID found in the URL. If you completed a payment, please check your email for a confirmation.
                    </p>
                    <Link href="/" className="px-6 py-3 bg-white text-black font-bold uppercase rounded hover:bg-gray-200 transition inline-block">
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }

    // ─── PENDING (timeout — payment was made, webhook will process) ─────────
    if (status === 'pending') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.06)_0%,transparent_70%)] pointer-events-none"></div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-lg w-full bg-[#0a0a0a] border border-yellow-500/20 rounded-3xl p-1 relative z-10 shadow-[0_0_50px_rgba(255,165,0,0.1)]"
                >
                    <div className="bg-[#111] rounded-[22px] p-8 md:p-10 text-center relative overflow-hidden">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(255,165,0,0.4)]"
                        >
                            <Clock size={44} className="text-black stroke-[2.5]" />
                        </motion.div>

                        <h1 className="text-3xl md:text-4xl font-black italic uppercase text-white mb-2 font-gang tracking-wider">
                            Payment Received!
                        </h1>
                        <p className="text-yellow-400 font-mono mb-6 uppercase tracking-widest text-xs">
                            Processing your registration...
                        </p>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 text-left space-y-3">
                            {orderId && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-xs uppercase tracking-wider">Order ID</span>
                                    <span className="font-mono text-white text-xs">{orderId}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-xs uppercase tracking-wider">Status</span>
                                <span className="text-yellow-400 font-bold uppercase text-xs bg-yellow-400/10 px-2 py-0.5 rounded">Processing</span>
                            </div>
                            <div className="h-px bg-white/10 my-2"></div>
                            <div className="flex items-start gap-2 text-xs text-gray-400">
                                <Mail size={14} className="text-yellow-400 mt-0.5 shrink-0" />
                                <p>
                                    Your payment was successful. We&apos;re registering your account — a confirmation email with your QR code will arrive within a few minutes. <strong className="text-white">Please check your inbox (and spam folder).</strong>
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-600 text-xs mb-6">
                            If you don&apos;t receive an email within 10 minutes, please contact support with your Order ID above.
                        </p>

                        <div className="flex flex-col gap-3">
                            <Link
                                href="/"
                                className="w-full py-4 bg-white text-black font-black italic uppercase rounded-lg hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2"
                            >
                                <Home size={18} /> Return to Base
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    // ─── SUCCESS ────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-lg w-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-1 relative z-10 shadow-[0_0_50px_rgba(0,243,255,0.2)]"
            >
                <div className="bg-[#111] rounded-[22px] p-8 md:p-12 text-center relative overflow-hidden">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
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

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
