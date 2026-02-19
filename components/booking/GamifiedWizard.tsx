'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import AthleteCardBuilder from './steps/AthleteCardBuilder';
import SportsDraftBoard, { ALL_SPORTS } from './steps/SportsDraftBoard';
import FinalEntryPass from './steps/FinalEntryPass';
import VictoryMoment from './steps/VictoryMoment';
import TeamRoster, { TeamMember } from './steps/TeamRoster';

import { CartItem } from '@/context/CartContext';

export type UserData = {
    fullName: string;
    college: string;
    city: string;
    email: string;
    phone: string;
    gender: string;
    age: string;
    universityIdCard: string;
    address: string;
};

export type SportItem = CartItem;

import { useCart } from '@/context/CartContext';

// ... imports ...

// Simple Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 text-center border border-red-500 bg-red-900/20 rounded-xl my-8">
                    <h2 className="text-xl font-bold text-red-500 mb-2">SYSTEM FAILURE</h2>
                    <p className="text-gray-400 mb-4">The module crashed. Please refresh or contact support.</p>
                    <pre className="text-xs text-left bg-black p-4 rounded text-red-400 overflow-auto max-h-40">
                        {this.state.error?.toString()}
                    </pre>
                </div>
            );
        }

        return this.props.children;
    }
}

export default function GamifiedWizard() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState<UserData>({
        fullName: '',
        college: '',
        city: '',
        email: '',
        phone: '',
        gender: '',
        age: '',
        universityIdCard: '',
        address: ''
    });

    // TEAM MEMBERS STATE: Map of eventId -> TeamMember[]
    const [teamMembers, setTeamMembers] = useState<Record<string, TeamMember[]>>({});

    const updateTeamMembers = (eventId: string, members: TeamMember[]) => {
        setTeamMembers(prev => ({
            ...prev,
            [eventId]: members
        }));
    };

    // GLOBAL CART CONTEXT
    const { items: cart, addToCart, removeFromCart, setCart } = useCart();

    // We no longer need local cart state or URL parsing for it, as the context persists it.
    // However, if we want to support URL params adding to the global cart on load, we can add an effect.
    React.useEffect(() => {
        const sportParam = searchParams.get('sport');
        if (sportParam) {
            const found = ALL_SPORTS.find(s =>
                s.name.toLowerCase() === sportParam.toLowerCase() ||
                s.id === sportParam ||
                (sportParam === 'esports' && s.name === 'E-Sports')
            );
            if (found) {
                // Check if already in cart to avoid duplicates on refresh? 
                // Context usually handles duplicates or allows them. 
                // Let's assume user wants to add it if they navigated here.
                // But we should check existence to prevent infinite adds if we were doing this on every render.
                // Since this dependency array is empty (or just searchParams), it runs once.
                // Better to just rely on user adding it previous page. 
                // If they came from a direct link, we might want to Add.
                // For now, let's trust the global context is what we want.
            }
        }
    }, [searchParams]);

    const [orderId, setOrderId] = useState('');

    // Navigation logic with Team Roster check
    const nextStep = () => {
        if (step === 2) {
            console.log('Cart items:', cart);
            // Check if any team sports are selected
            const hasTeamSports = cart.some(item => {
                // Check if ID starts with known team sport IDs (to handle -Boys/-Girls suffix)
                const teamIds = ['cricket-leather', 'football', 'basketball', 'volleyball', 'kabaddi', 'tug-of-war'];
                const isTeamId = teamIds.some(id => item.id.startsWith(id));

                const isTeam = isTeamId ||
                    item.name.toLowerCase().includes('team') ||
                    item.name.toLowerCase().includes('doubles');

                console.log(`Checking item: ${item.name} (${item.id}) -> isTeam: ${isTeam}`);
                return isTeam;
            });

            console.log('Has team sports:', hasTeamSports);

            if (hasTeamSports) {
                setStep(3); // Go to Team Roster
            } else {
                setStep(4); // Skip to Final Pass
            }
        } else {
            setStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (step === 4) {
            const hasTeamSports = cart.some(item =>
                ['cricket-leather', 'football', 'basketball', 'volleyball', 'kabaddi', 'tug-of-war'].includes(item.id) ||
                item.name.toLowerCase().includes('team') ||
                item.name.toLowerCase().includes('doubles')
            );
            if (hasTeamSports) {
                setStep(3); // Go back to Team Roster
            } else {
                setStep(2); // Go back to Draft Board
            }
        } else {
            setStep(prev => prev - 1);
        }
    };

    // ----------------------------------------------------------------------
    // AUTO-SAVE & RESTORE LOGIC
    // ----------------------------------------------------------------------
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://spardha-backend-production.up.railway.app';
    const [isRestoring, setIsRestoring] = useState(false);

    // 1. Restore Draft on Mount (if email exists in localStorage or just check)
    useEffect(() => {
        const checkDraft = async () => {
            // Try to get email from localStorage if we saved it there previously
            const savedEmail = localStorage.getItem('spardha-user-email');
            if (!savedEmail) return;

            try {
                setIsRestoring(true);
                console.log("Found saved email, checking for draft...", savedEmail);
                const res = await fetch(`${API_URL}/api/draft?email=${savedEmail}`);
                const data = await res.json();

                if (data.success && data.draft) {
                    console.log("Restoring draft:", data.draft);
                    const { step: savedStep, userData: savedUserData, cart: savedCart, teamMembers: savedTeamMembers } = data.draft;

                    if (savedUserData) setUserData(savedUserData);
                    if (savedCart && savedCart.length > 0) setCart(savedCart);
                    if (savedTeamMembers) setTeamMembers(savedTeamMembers);
                    // Optional: Restore step, or let user start at 1 but with data filled
                    if (savedStep && savedStep > 1) setStep(savedStep);
                }
            } catch (err) {
                console.error("Failed to restore draft", err);
            } finally {
                setIsRestoring(false);
            }
        };

        checkDraft();
    }, []);

    // 2. Auto-Save when state changes
    useEffect(() => {
        // Debounce save
        const timer = setTimeout(async () => {
            if (!userData.email || !userData.email.includes('@')) return;

            // Save email to local storage to enable restore on return
            localStorage.setItem('spardha-user-email', userData.email);

            try {
                // Formatting payload
                const payload = {
                    email: userData.email,
                    step,
                    userData,
                    cart,
                    teamMembers
                };

                await fetch(`${API_URL}/api/save-draft`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                console.log("Draft auto-saved");
            } catch (err) {
                console.error("Failed to auto-save draft", err);
            }
        }, 2000); // 2 second debounce

        return () => clearTimeout(timer);
    }, [userData, cart, teamMembers, step]);

    const steps = [
        { id: 1, title: 'Athlete Profile' },
        { id: 2, title: 'Sport Selection' },
        { id: 3, title: 'Team Roster' },
        { id: 4, title: 'Final Pass' },
        { id: 5, title: 'Victory' }
    ];



    return (
        <div className="min-h-screen bg-transparent text-white flex flex-col font-sans selection:bg-neon-cyan selection:text-black">
            {/* Top HUD / Progress Bar */}
            <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* SPARDHA 2026 title removed */}
                    <div></div>

                    {/* Retro Level Indicator */}
                    <div className="flex items-center gap-1.5 md:gap-2">
                        {steps.map((s) => (
                            <div
                                key={s.id}
                                className={`h-1.5 md:h-2 w-3 md:w-8 rounded-full transition-all duration-300 ${s.id <= step ? 'bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.5)]' : 'bg-white/10'}`}
                            />
                        ))}
                    </div>

                    <div className="font-mono font-bold text-neon-cyan text-xs md:text-base">
                        LEVEL {step}/{steps.length}
                    </div>
                </div>
            </header>

            {/* Main Stage */}
            <main className="flex-1 w-full max-w-7xl mx-auto pt-24 pb-12 px-4 relative overflow-y-auto overflow-x-hidden">
                <ErrorBoundary>
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
                                    addToCart={addToCart}
                                    removeFromCart={removeFromCart}
                                    onNext={nextStep}
                                    onPrev={prevStep}
                                />
                            )}
                            {step === 3 && (
                                <TeamRoster
                                    cart={cart}
                                    teamMembers={teamMembers}
                                    updateTeamMembers={updateTeamMembers}
                                    onNext={nextStep}
                                    onPrev={prevStep}
                                />
                            )}
                            {step === 4 && (
                                <FinalEntryPass
                                    cart={cart}
                                    userData={userData}
                                    teamMembers={teamMembers}
                                    onNext={nextStep}
                                    onPrev={prevStep}
                                />
                            )}
                            {/* ArenaPayment Removed */}
                            {step === 5 && (
                                <VictoryMoment
                                    orderId={orderId}
                                    cart={cart}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </ErrorBoundary>
            </main>
        </div>
    );
}
