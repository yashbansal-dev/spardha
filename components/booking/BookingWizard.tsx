'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UserDetails from './steps/UserDetails';
import SportsSelection from './steps/SportsSelection';
import CartPreview from './steps/CartPreview';
import Payment from './steps/Payment';
import OrderSuccess from './steps/OrderSuccess';
import { FaCheck } from 'react-icons/fa';

export type UserData = {
    fullName: string;
    email: string;
    phone: string;
    college: string;
    gender: string;
    age: string;
    city: string;
    tshirtSize: string;
};

export type SportItem = {
    id: string;
    name: string;
    price: number;
    image: string;
};

export default function BookingWizard() {
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState<UserData>({
        fullName: '',
        email: '',
        phone: '',
        college: '',
        gender: '',
        age: '',
        city: '',
        tshirtSize: ''
    });
    const [cart, setCart] = useState<SportItem[]>([]);
    const [orderId, setOrderId] = useState('');

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const steps = [
        { id: 1, label: 'Details' },
        { id: 2, label: 'Sports' },
        { id: 3, label: 'Cart' },
        { id: 4, label: 'Payment' }
    ];

    const calculateTotal = () => {
        const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
        const gst = subtotal * 0.05;
        return {
            subtotal,
            gst,
            total: subtotal + gst
        };
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative min-h-[600px] flex flex-col">

            {/* --- Progress Stepper --- */}
            <div className="bg-black/40 border-b border-white/10 p-4 md:p-6">
                <div className="flex items-center justify-between relative">
                    {/* Progress Bar Background */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 -z-10"></div>

                    {/* Active Progress Line */}
                    <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-neon-cyan -z-10"
                        initial={{ width: '0%' }}
                        animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    ></motion.div>

                    {steps.map((s, idx) => {
                        const isActive = step >= s.id;
                        const isCurrent = step === s.id;

                        return (
                            <div key={s.id} className="flex flex-col items-center gap-2">
                                <motion.div
                                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${isActive ? 'bg-neon-cyan border-neon-cyan text-black' : 'bg-black border-white/20 text-gray-500'}`}
                                    animate={{ scale: isCurrent ? 1.2 : 1 }}
                                >
                                    {isActive ? (isCurrent ? s.id : <FaCheck />) : s.id}
                                </motion.div>
                                <span className={`text-[10px] md:text-xs uppercase tracking-wider font-bold ${isActive ? 'text-white' : 'text-gray-600'}`}>
                                    {s.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* --- Step Content --- */}
            <div className="flex-1 p-6 md:p-10 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                    >
                        {step === 1 && (
                            <UserDetails
                                data={userData}
                                updateData={setUserData}
                                onNext={nextStep}
                            />
                        )}
                        {step === 2 && (
                            <SportsSelection
                                cart={cart}
                                setCart={setCart}
                                onNext={nextStep}
                                onPrev={prevStep}
                            />
                        )}
                        {step === 3 && (
                            <CartPreview
                                cart={cart}
                                setCart={setCart}
                                totals={calculateTotal()}
                                onNext={nextStep}
                                onPrev={prevStep}
                            />
                        )}
                        {step === 4 && (
                            <Payment
                                totals={calculateTotal()}
                                onComplete={(id) => {
                                    setOrderId(id);
                                    setStep(5);
                                }}
                                onPrev={prevStep}
                            />
                        )}
                        {step === 5 && (
                            <OrderSuccess
                                orderId={orderId}
                                cart={cart} // Pass cart here
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <style jsx global>{`
                .input-field {
                    width: 100%;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 12px 16px;
                    border-radius: 4px;
                    color: white;
                    font-family: var(--font-mono);
                    outline: none;
                    transition: all 0.3s;
                }
                .input-field:focus {
                    border-color: #0ea5e9;
                    background: rgba(14, 165, 233, 0.05);
                    box-shadow: 0 0 15px rgba(14, 165, 233, 0.1);
                }
                .btn-primary {
                    background: white;
                    color: black;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 12px 24px;
                    border-radius: 4px;
                    transition: all 0.3s;
                }
                .btn-primary:hover:not(:disabled) {
                    transform: scale(1.05);
                    box-shadow: 0 0 20px rgba(255,255,255,0.4);
                }
                 .btn-primary:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .btn-secondary {
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.2);
                    color: white;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 12px 24px;
                    border-radius: 4px;
                    transition: all 0.3s;
                }
                .btn-secondary:hover {
                    border-color: white;
                    background: rgba(255,255,255,0.1);
                }
            `}</style>
        </div>
    );
}
