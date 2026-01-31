'use client';

import { useState } from 'react';
import { FaGooglePay, FaCreditCard, FaLock, FaSpinner } from 'react-icons/fa';
import { SiPhonepe, SiPaytm } from 'react-icons/si';

interface PaymentProps {
    totals: { total: number };
    onComplete: (orderId: string) => void;
    onPrev: () => void;
}

export default function Payment({ totals, onComplete, onPrev }: PaymentProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('upi');

    const handlePayment = async () => {
        setIsProcessing(true);
        // Simulate Payment Gateway
        await new Promise(resolve => setTimeout(resolve, 3000));
        const mockOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        onComplete(mockOrderId);
    };

    return (
        <div className="h-full flex flex-col">
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-6 text-white border-l-4 border-neon-cyan pl-4">
                Secure <span className="text-neon-cyan">Payment</span>
            </h2>

            <div className="flex-1">

                {/* Amount Display */}
                <div className="bg-gradient-to-r from-neon-cyan/20 to-transparent p-6 rounded-xl border-l-4 border-neon-cyan mb-8">
                    <div className="text-sm text-gray-400 uppercase tracking-widest mb-1">Total Payable Amount</div>
                    <div className="text-4xl font-black font-mono text-white">₹{totals.total.toFixed(2)}</div>
                </div>

                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Select Payment Method</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* UPI Option */}
                    <div
                        onClick={() => setSelectedMethod('upi')}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between ${selectedMethod === 'upi' ? 'border-neon-cyan bg-white/5' : 'border-white/10 hover:border-white/20'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl">
                                📱
                            </div>
                            <span className="font-bold text-white">UPI Apps</span>
                        </div>
                        <div className="flex gap-2 opacity-70">
                            <SiPhonepe className="text-purple-500" />
                            <FaGooglePay className="text-white" />
                            <SiPaytm className="text-blue-500" />
                        </div>
                    </div>

                    {/* Card Option */}
                    <div
                        onClick={() => setSelectedMethod('card')}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between ${selectedMethod === 'card' ? 'border-neon-cyan bg-white/5' : 'border-white/10 hover:border-white/20'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-xl">
                                <FaCreditCard />
                            </div>
                            <span className="font-bold text-white">Credit / Debit Card</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center text-xs text-gray-500 gap-2">
                    <FaLock />
                    <span>Payments are secured by 256-bit SSL encryption</span>
                </div>
            </div>

            <div className="mt-8 flex justify-between items-center border-t border-white/10 pt-6">
                <button onClick={onPrev} disabled={isProcessing} className="btn-secondary">
                    &larr; Back
                </button>
                <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="btn-primary w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2"
                >
                    {isProcessing ? (
                        <><FaSpinner className="animate-spin" /> Processing...</>
                    ) : (
                        `Pay ₹${totals.total.toFixed(2)}`
                    )}
                </button>
            </div>
        </div>
    );
}
