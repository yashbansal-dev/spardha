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
    referralCode?: string;
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
        address: '',
        referralCode: ''
    });

    // TEAM MEMBERS STATE: Map of cartItemId -> TeamMember[]
    const [teamMembers, setTeamMembers] = useState<Record<string, TeamMember[]>>({});

    const updateTeamMembers = (cartItemId: string, members: TeamMember[]) => {
        setTeamMembers(prev => ({
            ...prev,
            [cartItemId]: members
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

    // 3. LISTEN FOR CHECKOUT TRIGGER
    useEffect(() => {
        const isCheckout = searchParams.get('checkout') === 'true';
        const timestamp = searchParams.get('t'); // Unique timestamp ensures this fires on every click

        if (isCheckout) {
            console.log("Checkout triggered via URL/Timestamp", timestamp);

            // Validation for Step 1
            const isStep1Complete = 
                userData.fullName?.length > 2 && 
                userData.college?.length > 2 && 
                userData.city?.length > 2 && 
                userData.phone?.length >= 10 && 
                userData.email?.includes('@') &&
                userData.gender &&
                userData.age &&
                userData.universityIdCard &&
                userData.address;

            // Give a tiny moment for draft restoration if email is missing but might be in localStorage
            const hasSavedData = userData.email || localStorage.getItem('spardha-user-email');

            if (hasSavedData && isStep1Complete) {
                // Determine destination
                const hasTeamSports = cart.some(item => item.pricingType === 'team');
                const targetStep = hasTeamSports ? 3 : 4;

                // Only move if we aren't already there or beyond
                if (step < targetStep || (isCheckout && step === 2)) {
                    console.log("Jumping to target step:", targetStep);
                    setStep(targetStep);
                }
            } else {
                // If NO data or INCOMPLETE data, we must ensure they are at Step 1
                console.log("Incomplete data for checkout jump, staying at Step 1");
                if (step !== 1) setStep(1);
            }
        }
    }, [searchParams, userData, cart.length]); // depend on full userData for checkout validation
    
    // 4. SCROLL TO TOP ON STEP CHANGE
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    const [orderId, setOrderId] = useState('');

    // Navigation logic with Team Roster check
    const nextStep = () => {
        if (step === 2) {
            console.log('Cart items:', cart);
            // Check if any team sports are selected based on pricingType
            const hasTeamSports = cart.some(item => item.pricingType === 'team');

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
            const hasTeamSports = cart.some(item => item.pricingType === 'team');
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

    // 1. Restore Draft on Mount (Synchronously from localStorage + Async from API)
    useEffect(() => {
        // --- PHASE A: Sync from localStorage (Immediate) ---
        const savedEmail = localStorage.getItem('spardha-user-email');
        const savedLocalData = localStorage.getItem('spardha-user-data');
        const savedLocalTeam = localStorage.getItem('spardha-team-members');
        
        if (savedLocalData) {
            try {
                const parsed = JSON.parse(savedLocalData);
                setUserData(prev => ({ ...prev, ...parsed }));
            } catch (e) {
                console.error("Failed to parse local user data", e);
            }
        }

        if (savedLocalTeam) {
            try {
                const parsed = JSON.parse(savedLocalTeam);
                setTeamMembers(parsed);
            } catch (e) {
                console.error("Failed to parse local team members", e);
            }
        }

        if (!savedEmail) return;

        // --- PHASE B: Async from API (Backup/Cross-Device) ---
        const checkDraft = async () => {
            try {
                setIsRestoring(true);
                console.log("Checking for remote draft...", savedEmail);
                const res = await fetch(`${API_URL}/api/draft?email=${savedEmail}`);
                const data = await res.json();

                if (data.success && data.draft) {
                    console.log("Restoring remote draft:", data.draft);
                    const { step: savedStep, userData: savedUserData, cart: savedCart, teamMembers: savedTeamMembers } = data.draft;

                    if (savedUserData) setUserData(prev => ({ ...prev, ...savedUserData }));
                    if (savedCart && savedCart.length > 0) setCart(savedCart);
                    if (savedTeamMembers) setTeamMembers(savedTeamMembers);
                    if (savedStep && savedStep > 1) setStep(savedStep);
                }
            } catch (err) {
                console.error("Failed to restore remote draft", err);
            } finally {
                setIsRestoring(false);
            }
        };

        checkDraft();
    }, []);

    // 2. Auto-Save Logic
    // 2a. Immediate local storage sync
    useEffect(() => {
        if (userData.email) {
            localStorage.setItem('spardha-user-email', userData.email);
            localStorage.setItem('spardha-user-data', JSON.stringify(userData));
        }
    }, [userData]);

    useEffect(() => {
        localStorage.setItem('spardha-team-members', JSON.stringify(teamMembers));
    }, [teamMembers]);

    // 2b. Debounced API sync
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!userData.email || !userData.email.includes('@')) return;
            if (step === 5) return;

            try {
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
                console.log("Draft auto-saved to cloud");
            } catch (err) {
                console.error("Failed to auto-save draft to cloud", err);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [userData, cart, teamMembers, step]);

    const steps = [
        { id: 1, title: 'Athlete Profile' },
        { id: 2, title: 'Sport Selection' },
        { id: 3, title: 'Team Roster' },
        { id: 4, title: 'Review & Pay' },
        { id: 5, title: 'Victory' }
    ];



    return (
        <div className="min-h-screen bg-transparent text-white flex flex-col font-sans selection:bg-neon-cyan selection:text-black">
            {/* Top HUD / Progress Bar */}
            <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* SPARDHA 2026 title removed */}
                    <div></div>

                    {/* Interactive Level Indicator */}
                    <div className="flex items-center gap-1.5 md:gap-2">
                        {steps.map((s) => {
                            // VALIDATION FOR EACH STEP
                            const isStep1Complete = 
                                userData.fullName?.length > 2 && 
                                userData.college?.length > 2 && 
                                userData.city?.length > 2 && 
                                userData.phone?.length >= 10 && 
                                userData.email?.includes('@') &&
                                userData.gender &&
                                userData.age &&
                                userData.universityIdCard &&
                                userData.address;

                            const isStep2Complete = cart.length > 0;

                            const isClickable = 
                                s.id < step || // Allow going back to any previous step
                                (s.id === 2 && isStep1Complete) || // Level 2 only if Step 1 is complete
                                (s.id === 3 && isStep1Complete && isStep2Complete) || // Level 3 only if Step 1 & 2 are complete
                                (s.id === 4 && isStep1Complete && isStep2Complete); // Level 4 same as Level 3 (if no team sports, Level 3 is skipped anyway in nextStep)

                            return (
                                <button
                                    key={s.id}
                                    onClick={() => isClickable && setStep(s.id)}
                                    disabled={!isClickable}
                                    className={`h-1.5 md:h-2 w-5 md:w-8 rounded-full transition-all duration-300 ${s.id <= step
                                        ? 'bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.5)]'
                                        : 'bg-white/10'
                                        } ${isClickable ? 'cursor-pointer hover:bg-neon-cyan/50 hover:scale-y-125' : 'cursor-not-allowed'}`}
                                    title={isClickable ? `Go to ${s.title}` : s.title}
                                />
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-4">
                        {step === 1 && (userData.email || userData.fullName) && (
                            <button 
                                onClick={() => {
                                    if(confirm('Are you sure you want to clear the form?')) {
                                        localStorage.removeItem('spardha-user-email');
                                        localStorage.removeItem('spardha-cart');
                                        window.location.reload();
                                    }
                                }}
                                className="text-[10px] uppercase border border-red-500/50 text-red-400 px-2 py-1 rounded hover:bg-red-500/10 transition-colors"
                            >
                                Not you? Reset
                            </button>
                        )}
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-[0_0_15px_rgba(0,243,255,0.1)] group hover:border-neon-cyan/30 transition-all duration-300">
                            <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-pulse shadow-[0_0_8px_#00f3ff]"></span>
                            <div className="font-mono font-bold text-neon-cyan text-[10px] md:text-xs uppercase tracking-tighter">
                                LEVEL 0{step} <span className="text-white/30 mx-0.5">/</span> 0{steps.length}
                            </div>
                        </div>
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
