'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserPlus, FaTrash, FaUsers, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { SportItem } from '../GamifiedWizard';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the Team Member structure
export interface TeamMember {
    name: string;
    email: string;
    phone: string;
}

// Props for the component
interface Props {
    cart: SportItem[];
    teamMembers: Record<string, TeamMember[]>; // Map eventId -> TeamMember[]
    updateTeamMembers: (eventId: string, members: TeamMember[]) => void;
    onNext: () => void;
    onPrev: () => void;
}

// Validation schema for a single member
const memberSchema = z.object({
    name: z.string().min(2, "Name required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Invalid phone")
});

export default function TeamRoster({ cart, teamMembers, updateTeamMembers, onNext, onPrev }: Props) {
    // identify team sports in cart
    // identify team sports in cart
    const teamSports = cart.filter(item => item.pricingType === 'team');


    const [currentSportIndex, setCurrentSportIndex] = useState(0);
    const currentSport = teamSports[currentSportIndex];

    // Local form state for the *current* member being added
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TeamMember>({
        resolver: zodResolver(memberSchema)
    });

    // If no team sports, auto-skip (this logic handles edge case if step is rendered unnecessarily)
    useEffect(() => {
        if (teamSports.length === 0) {
            onNext();
        }
    }, [teamSports.length, onNext]);

    if (!currentSport) return null;

    const currentMembers = teamMembers[currentSport.id] || [];

    // Limits (Hardcoded for now, could be dynamic)
    const getLimit = (id: string) => {
        if (id.includes('cricket')) return 15;
        if (id.includes('football')) return 12; // 7v7 + subs
        if (id.includes('basketball')) return 12;
        if (id.includes('volleyball')) return 12;
        if (id.includes('kabaddi')) return 12;
        return 10;
    };
    const maxPlayers = getLimit(currentSport.id);
    const minPlayers = 2; // At least some members besides captain

    const addMember = (data: TeamMember) => {
        if (currentMembers.length >= maxPlayers) return;
        // Check duplicate email
        if (currentMembers.some(m => m.email === data.email)) {
            alert('Member with this email already added!');
            return;
        }

        const newMembers = [...currentMembers, data];
        updateTeamMembers(currentSport.id, newMembers);
        reset();
    };

    const removeMember = (index: number) => {
        const newMembers = [...currentMembers];
        newMembers.splice(index, 1);
        updateTeamMembers(currentSport.id, newMembers);
    };

    const handleNext = () => {
        if (currentMembers.length < minPlayers) {
            alert(`Please add at least ${minPlayers} members for ${currentSport.name}`);
            return;
        }

        if (currentSportIndex < teamSports.length - 1) {
            setCurrentSportIndex(prev => prev + 1);
        } else {
            onNext();
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-start pt-8 px-4 pb-20 overflow-y-auto">

            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 text-neon-cyan mb-2 border border-neon-cyan/30 px-4 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                    <FaUsers />
                    <span className="text-xs uppercase tracking-widest">Team Management Protocol</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white tracking-wider">
                    ASSEMBLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-blue-500">SQUAD</span>
                </h2>
                <p className="text-gray-400 mt-2 text-sm">
                    {currentSport.name} • {currentSportIndex + 1} of {teamSports.length} Team Events
                </p>
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left: Input Form */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md">
                    <h3 className="text-xl font-bold text-white uppercase mb-6 flex items-center gap-2">
                        <FaUserPlus className="text-neon-cyan" /> Add Operative
                    </h3>

                    <form onSubmit={handleSubmit(addMember)} className="space-y-4">
                        <div>
                            <input
                                {...register('name')}
                                placeholder="PLAYER NAME"
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white placeholder:text-gray-600 focus:border-neon-cyan outline-none transition-colors"
                            />
                            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <input
                                {...register('email')}
                                placeholder="EMAIL ADDRESS"
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white placeholder:text-gray-600 focus:border-neon-cyan outline-none transition-colors"
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <input
                                {...register('phone')}
                                placeholder="CONTACT NUMBER"
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white placeholder:text-gray-600 focus:border-neon-cyan outline-none transition-colors"
                            />
                            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={currentMembers.length >= maxPlayers}
                            className="w-full bg-white text-black font-black uppercase py-4 rounded-lg hover:bg-neon-cyan transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {currentMembers.length >= maxPlayers ? 'Roster Full' : 'Add to Roster'}
                        </button>
                    </form>
                </div>

                {/* Right: Roster List */}
                <div className="bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 rounded-full blur-[50px] pointer-events-none"></div>

                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white uppercase flex items-center gap-2">
                                Active Roster
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                {minPlayers} Required • {maxPlayers} Max
                            </p>
                        </div>
                        <div className="text-4xl font-black text-white/10">
                            {String(currentMembers.length).padStart(2, '0')}
                        </div>
                    </div>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {currentMembers.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-xl">
                                <FaUsers className="text-4xl text-white/20 mx-auto mb-3" />
                                <p className="text-gray-500 text-sm">No operatives assigned yet.</p>
                            </div>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {currentMembers.map((member, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-white/5 border border-white/5 rounded-lg p-3 flex justify-between items-center group hover:bg-white/10 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-xs text-gray-400 border border-white/10">
                                                {String(idx + 1).padStart(2, '0')}
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-sm">{member.name}</div>
                                                <div className="text-xs text-gray-400">{member.email}</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeMember(idx)}
                                            className="text-gray-600 hover:text-red-500 transition-colors p-2"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Footer */}
            <div className="w-full max-w-5xl mt-8 flex justify-between items-center border-t border-white/10 pt-6">
                <button
                    onClick={currentSportIndex > 0 ? () => setCurrentSportIndex(prev => prev - 1) : onPrev}
                    className="text-gray-500 hover:text-white uppercase text-xs tracking-widest transition-colors flex items-center gap-2"
                >
                    &larr; {currentSportIndex > 0 ? 'Previous Squad' : 'Back to Draft'}
                </button>

                <div className="flex gap-2">
                    {teamSports.map((_, i) => (
                        <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentSportIndex ? 'w-8 bg-neon-cyan' : 'w-2 bg-white/20'}`}></div>
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="bg-neon-cyan text-black px-8 py-3 rounded-lg font-black uppercase italic hover:scale-105 transition-transform flex items-center gap-2"
                >
                    {currentSportIndex < teamSports.length - 1 ? 'Next Squad' : 'Confirm ROSTER'} &rarr;
                </button>
            </div>
        </div>
    );
}
