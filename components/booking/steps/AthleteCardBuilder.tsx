'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { UserData } from '../GamifiedWizard';
import { FaIdCard, FaUniversity, FaCity, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

// Validation Schema
const userSchema = z.object({
    fullName: z.string().min(2, "IDENTITY REQUIRED"),
    email: z.string().email("INVALID COMMS CHANNEL"),
    phone: z.string().min(10, "INVALID SIGNAL"),
    college: z.string().min(2, "AFFILIATION REQUIRED"),
    city: z.string().min(2, "ORIGIN REQUIRED"),
});

interface Props {
    data: UserData;
    updateData: (data: UserData) => void;
    onNext: () => void;
}

// ... imports ...

export default function AthleteCardBuilder({ data, updateData, onNext }: Props) {
    const [athleteId, setAthleteId] = useState('000-000');

    const [selectedArchetype] = useState({
        id: 'athlete',
        label: 'Official Athlete',
        color: 'from-orange-500 via-blue-500 to-purple-600',
        accent: 'text-white',
        border: 'border-white/20',
        glow: 'shadow-[0_0_40px_rgba(59,130,246,0.3)]',
        icon: '🏅',
        desc: 'Registered Participant'
    });

    const [avatar, setAvatar] = useState<string | null>(null);

    // Generate random ID on mount
    useEffect(() => {
        setAthleteId(`ATH-${Math.floor(Math.random() * 9000) + 1000}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9)}`);
    }, []);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<UserData>({
        resolver: zodResolver(userSchema),
        defaultValues: data
    });

    // Watch fields for live preview
    const watchedValues = watch();

    // Calculate Power Level (Progress)
    const [powerLevel, setPowerLevel] = useState(0);

    useEffect(() => {
        let score = 0;
        if (watchedValues.fullName && watchedValues.fullName.length > 2) score += 20;
        if (watchedValues.college && watchedValues.college.length > 2) score += 20;
        if (watchedValues.city && watchedValues.city.length > 2) score += 20;
        if (watchedValues.phone && watchedValues.phone.length >= 10) score += 20;
        if (watchedValues.email && watchedValues.email.includes('@')) score += 20;
        setPowerLevel(score);
    }, [watchedValues]);

    const onSubmit = (formData: UserData) => {
        updateData(formData);
        onNext();
    };

    return (
        <div className="h-full flex flex-col md:flex-row gap-12 items-start py-8">
            {/* LEFT: Live Athlete Card */}
            <div className="w-full md:w-5/12 flex items-center justify-center sticky top-24">
                <motion.div
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className={`relative w-[440px] h-[720px] bg-black rounded-3xl overflow-hidden border-2 ${selectedArchetype.border} shadow-2xl group perspective-1000 transition-colors duration-500`}
                >
                    {/* Animated Border Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedArchetype.color} opacity-20`}></div>

                    {/* Holographic Overlay Effect */}
                    <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10 mix-blend-overlay"></div>

                    {/* Card Content */}
                    <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                <img src="/assets/images/jklu_logo.png?v=3" alt="Logo" className="w-12 h-12 object-contain opacity-90" />
                            </div>
                        </div>

                        {/* Avatar / Identity */}
                        <div className="text-center my-6 relative">
                            <div className="w-56 h-56 mx-auto bg-black/40 rounded-full border-4 border-white/5 flex items-center justify-center shadow-[0_0_50px_rgba(255,165,0,0.1)] relative overflow-hidden backdrop-blur-md group-hover:border-orange-500/30 transition-colors duration-500">
                                <img src="/assets/images/jklu_logo.png?v=3" alt="Avatar" className="w-full h-full object-contain p-2 opacity-100 filter drop-shadow-[0_0_15px_rgba(255,165,0,0.3)] transform transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                            </div>

                            <h2 className="mt-8 text-3xl font-black italic text-white uppercase tracking-wider break-words whitespace-normal leading-tight min-h-[1.5em] flex items-center justify-center px-2">
                                {watchedValues.fullName || "ATHLETE NAME"}
                            </h2>
                            <p className="text-sm text-orange-400 font-mono tracking-widest mt-2">
                                {athleteId}
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 text-xs border-t border-white/10 pt-6">
                            <div className="bg-white/5 p-3 rounded-lg">
                                <div className="text-gray-500 uppercase text-[9px] tracking-wider mb-1">Affiliation</div>
                                <div className="text-white font-bold text-sm break-words whitespace-normal leading-tight">{watchedValues.college || "N/A"}</div>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg">
                                <div className="text-gray-500 uppercase text-[9px] tracking-wider mb-1">Origin</div>
                                <div className="text-white font-bold text-sm break-words whitespace-normal leading-tight">{watchedValues.city || "N/A"}</div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 pt-4 border-t border-dashed border-white/10 flex justify-center items-end">
                            <div className="text-[9px] text-gray-500 text-center tracking-[0.3em] font-mono opacity-50">
                                AUTHORIZED FOR SPARDHA 2026
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* RIGHT: Gaming Input Panel */}
            <div className="w-full md:w-7/12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className={`h-px bg-gradient-to-r from-transparent via-white/50 to-transparent flex-1`}></div>
                        <h3 className="text-xl font-black italic text-white uppercase tracking-widest">
                            Athlete <span className={selectedArchetype.accent}>Registration</span>
                        </h3>
                        <div className="h-px bg-gradient-to-r from-transparent via-transparent to-transparent flex-1"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="group relative">
                            <label className={`text-[10px] font-mono ${selectedArchetype.accent} uppercase tracking-widest mb-1 block flex items-center gap-2 justify-between`}>
                                <span className="flex items-center gap-2"><FaIdCard /> Full Name</span>
                                {watchedValues.fullName && watchedValues.fullName.length > 2 && <span className="text-green-500 text-[10px] animate-pulse">✓ VERIFIED</span>}
                            </label>
                            <div className="relative overflow-hidden group-focus-within:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-shadow">
                                <input
                                    {...register("fullName")}
                                    spellCheck={false}
                                    className={`w-full bg-[#050505] border border-white/20 p-4 pl-10 text-white font-bold tracking-wider rounded-none focus:${selectedArchetype.border} focus:border-l-4 outline-none transition-all clip-path-slant`}
                                    placeholder="ENTER NAME"
                                />
                                <div className={`absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b ${selectedArchetype.color} opacity-0 group-focus-within:opacity-100 transition-opacity`}></div>
                            </div>
                            {errors.fullName && <p className="text-red-500 text-[10px] font-mono mt-1 blink">⚠ {errors.fullName.message}</p>}
                        </div>

                        {/* College */}
                        <div className="group relative">
                            <label className={`text-[10px] font-mono ${selectedArchetype.accent} uppercase tracking-widest mb-1 block flex items-center gap-2 justify-between`}>
                                <span className="flex items-center gap-2"><FaUniversity /> University / College</span>
                                {watchedValues.college && watchedValues.college.length > 2 && <span className="text-green-500 text-[10px] animate-pulse">✓ VERIFIED</span>}
                            </label>
                            <div className="relative overflow-hidden group-focus-within:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-shadow">
                                <input
                                    {...register("college")}
                                    spellCheck={false}
                                    className={`w-full bg-[#050505] border border-white/20 p-4 pl-10 text-white font-bold tracking-wider rounded-none focus:${selectedArchetype.border} focus:border-l-4 outline-none transition-all`}
                                    placeholder="ENTER INSTITUTE"
                                />
                                <div className={`absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b ${selectedArchetype.color} opacity-0 group-focus-within:opacity-100 transition-opacity`}></div>
                            </div>
                            {errors.college && <p className="text-red-500 text-[10px] font-mono mt-1 blink">⚠ {errors.college.message}</p>}
                        </div>

                        {/* City */}
                        <div className="group relative">
                            <label className={`text-[10px] font-mono ${selectedArchetype.accent} uppercase tracking-widest mb-1 block flex items-center gap-2 justify-between`}>
                                <span className="flex items-center gap-2"><FaCity /> City</span>
                                {watchedValues.city && watchedValues.city.length > 2 && <span className="text-green-500 text-[10px] animate-pulse">✓ VERIFIED</span>}
                            </label>
                            <div className="relative overflow-hidden group-focus-within:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-shadow">
                                <input
                                    {...register("city")}
                                    spellCheck={false}
                                    className={`w-full bg-[#050505] border border-white/20 p-4 pl-10 text-white font-bold tracking-wider rounded-none focus:${selectedArchetype.border} focus:border-l-4 outline-none transition-all`}
                                    placeholder="ENTER CITY"
                                />
                                <div className={`absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b ${selectedArchetype.color} opacity-0 group-focus-within:opacity-100 transition-opacity`}></div>
                            </div>
                            {errors.city && <p className="text-red-500 text-[10px] font-mono mt-1 blink">⚠ {errors.city.message}</p>}
                        </div>

                        {/* Phone */}
                        <div className="group relative">
                            <label className={`text-[10px] font-mono ${selectedArchetype.accent} uppercase tracking-widest mb-1 block flex items-center gap-2 justify-between`}>
                                <span className="flex items-center gap-2"><FaPhoneAlt /> Comms (Phone)</span>
                                {watchedValues.phone && watchedValues.phone.length >= 10 && <span className="text-green-500 text-[10px] animate-pulse">✓ VERIFIED</span>}
                            </label>
                            <div className="relative overflow-hidden group-focus-within:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-shadow">
                                <input
                                    {...register("phone")}
                                    spellCheck={false}
                                    className={`w-full bg-[#050505] border border-white/20 p-4 pl-10 text-white font-bold tracking-wider rounded-none focus:${selectedArchetype.border} focus:border-l-4 outline-none transition-all`}
                                    placeholder="91 XXXXX XXXXX"
                                />
                                <div className={`absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b ${selectedArchetype.color} opacity-0 group-focus-within:opacity-100 transition-opacity`}></div>
                            </div>
                            {errors.phone && <p className="text-red-500 text-[10px] font-mono mt-1 blink">⚠ {errors.phone.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="group relative md:col-span-2">
                            <label className={`text-[10px] font-mono ${selectedArchetype.accent} uppercase tracking-widest mb-1 block flex items-center gap-2 justify-between`}>
                                <span className="flex items-center gap-2"><FaEnvelope /> Digital ID (Email)</span>
                                {watchedValues.email && watchedValues.email.includes('@') && <span className="text-green-500 text-[10px] animate-pulse">✓ VERIFIED</span>}
                            </label>
                            <div className="relative overflow-hidden group-focus-within:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-shadow">
                                <input
                                    {...register("email")}
                                    spellCheck={false}
                                    className={`w-full bg-[#050505] border border-white/20 p-4 pl-10 text-white font-bold tracking-wider rounded-none focus:${selectedArchetype.border} focus:border-l-4 outline-none transition-all`}
                                    placeholder="USER@DOMAIN.COM"
                                />
                                <div className={`absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b ${selectedArchetype.color} opacity-0 group-focus-within:opacity-100 transition-opacity`}></div>
                            </div>
                            {errors.email && <p className="text-red-500 text-[10px] font-mono mt-1 blink">⚠ {errors.email.message}</p>}
                        </div>
                    </div>

                    {/* Progress / Power Level Bar */}
                    <div className="mt-6 mb-2">
                        <div className="flex justify-between text-[10px] uppercase font-mono tracking-widest text-gray-500 mb-1">
                            <span>Synchronization Status</span>
                            <span>{powerLevel}%</span>
                        </div>
                        <div className="h-2 bg-white/10 w-full rounded-full overflow-hidden">
                            <motion.div
                                className={`h-full bg-gradient-to-r ${selectedArchetype.color}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${powerLevel}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            className={`
                                relative overflow-hidden group
                                bg-white text-black text-lg font-black italic uppercase px-12 py-4 
                                hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)] clip-path-button flex items-center gap-2
                                ${powerLevel < 100 ? 'opacity-80' : 'opacity-100 animate-pulse'}
                            `}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {powerLevel < 100 ? 'Initiating...' : 'Enter The Arena'}
                                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </span>
                            {/* Hover Fill Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${selectedArchetype.color} translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0 opacity-50`}></div>
                        </button>
                    </div>
                </form>

                <style jsx>{`
                    .clip-path-slant {
                        clip-path: polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%);
                    }
                    .clip-path-button {
                        clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
                    }
                    .blink {
                        animation: blink 1s infinite;
                    }
                    @keyframes blink {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.5; }
                    }
                    /* Autofill Fix */
                    input:-webkit-autofill,
                    input:-webkit-autofill:hover, 
                    input:-webkit-autofill:focus, 
                    input:-webkit-autofill:active{
                        -webkit-box-shadow: 0 0 0 30px #050505 inset !important;
                        -webkit-text-fill-color: white !important;
                        caret-color: white;
                    }
                `}</style>
            </div>
        </div>
    );
}
