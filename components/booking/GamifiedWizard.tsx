'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AthleteCardBuilder from './steps/AthleteCardBuilder';
import SportsDraftBoard from './steps/SportsDraftBoard';
import FinalEntryPass from './steps/FinalEntryPass';
import ArenaPayment from './steps/ArenaPayment';
import VictoryMoment from './steps/VictoryMoment';

export type UserData = {
    fullName: string;
    college: string;
    city: string;
    email: string;
    phone: string;
};

export type SportItem = {
    id: string;
    name: string;
    price: number;
    image: string;
};

export default function GamifiedWizard() {
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState<UserData>({
        fullName: '',
        college: '',
        city: '',
        email: '',
        phone: ''
    });
    const [cart, setCart] = useState<SportItem[]>([]);
    const [orderId, setOrderId] = useState('');

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const steps = [
        { id: 1, title: 'Athlete Profile' },
        { id: 2, title: 'Sport Selection' },
        { id: 3, title: 'Final Pass' },
        { id: 4, title: 'Payment' },
        { id: 5, title: 'Victory' }
    ];

    return (
        <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-neon-cyan selection:text-black">
            {/* Top HUD / Progress Bar */}
            <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-black italic tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                        SPARDHA<span className="text-neon-cyan">2026</span>
                    </h1>

                    {/* Retro Level Indicator */}
                    <div className="flex items-center gap-2">
                        {steps.map((s) => (
                            <div
                                key={s.id}
                                className={`h-2 w-8 rounded-full transition-all duration-300 ${s.id <= step ? 'bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.5)]' : 'bg-white/10'}`}
                            />
                        ))}
                    </div>

                    <div className="font-mono font-bold text-neon-cyan">
                        LEVEL {step}/5
                    </div>
                </div>
            </header>

            {/* Main Stage */}
            <main className="flex-1 w-full max-w-7xl mx-auto pt-24 pb-12 px-4 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "anticipate" }}
                        className="h-full"
                    >
                        {step === 1 && (
                            <AthleteCardBuilder
                                data={userData}
                                updateData={setUserData}
                                onNext={nextStep}
                            />
                        )}
                        {step === 2 && (
                            <SportsDraftBoard
                                cart={cart}
                                setCart={setCart}
                                onNext={nextStep}
                                onPrev={prevStep}
                            />
                        )}
                        {step === 3 && (
                            <FinalEntryPass
                                cart={cart}
                                userData={userData}
                                onNext={nextStep}
                                onPrev={prevStep}
                            />
                        )}
                        {step === 4 && (
                            <ArenaPayment
                                onComplete={(id) => {
                                    setOrderId(id);
                                    nextStep();
                                }}
                                onPrev={prevStep}
                                amount={cart.reduce((acc, item) => acc + item.price, 0) * 1.18}
                            />
                        )}
                        {step === 5 && (
                            <VictoryMoment
                                orderId={orderId}
                                cart={cart}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
