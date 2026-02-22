import { AnimatePresence, motion } from 'framer-motion';
import { REGISTRATION_OPEN_DATE } from '@/utils/registrationDate';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        if (!isOpen) return;

        const calculateTimeLeft = () => {
            const difference = +REGISTRATION_OPEN_DATE - +new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                // Time up logic if needed
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Initial call

        return () => clearInterval(timer);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg z-[101]"
                    >
                        <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-spardha-gold/10">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-spardha-gold via-spardha-accent to-spardha-gold opacity-50"></div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
                            >
                                <X size={24} />
                            </button>

                            <div className="p-8 text-center pt-12 relative">


                                <h3 className="text-3xl md:text-4xl font-gang font-black text-white mb-2 uppercase tracking-wide">
                                    Registration <span className="font-gang font-normal capitalize text-white ml-2">Locked</span>
                                </h3>

                                <p className="font-gang text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed text-lg">
                                    Registration for Spardha 2026 begins on <br />
                                    <span className="text-white font-bold">22 February 2026</span> at 2:00 PM.
                                </p>

                                {/* Countdown */}
                                <div className="grid grid-cols-4 gap-3 md:gap-4 mb-8 max-w-sm mx-auto">
                                    {[
                                        { label: 'Days', value: timeLeft.days },
                                        { label: 'Hours', value: timeLeft.hours },
                                        { label: 'Mins', value: timeLeft.minutes },
                                        { label: 'Secs', value: timeLeft.seconds }
                                    ].map((item, index) => (
                                        <div key={index} className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                                            <span className="text-3xl md:text-4xl font-bold font-gang text-white mb-1">
                                                {String(item.value).padStart(2, '0')}
                                            </span>
                                            <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 font-gang">
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={onClose}
                                    className="px-10 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm rounded shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-gray-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300"
                                >
                                    Understood
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RegistrationModal;
