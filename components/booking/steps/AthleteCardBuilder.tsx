'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { UserData } from '../GamifiedWizard';
import { FaUserAstronaut, FaIdCard, FaUniversity, FaCity, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

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

export default function AthleteCardBuilder({ data, updateData, onNext }: Props) {
    const [athleteId, setAthleteId] = useState('000-000');

    // ARCHETYPE SYSTEM
    const ARCHETYPES = [
        {
            id: 'striker',
            label: 'The Striker',
            color: 'from-orange-500 to-red-600',
            accent: 'text-orange-500',
            border: 'border-orange-500',
            glow: 'shadow-[0_0_30px_rgba(249,115,22,0.3)]',
            icon: '⚡',
            desc: 'Speed & Agility'
        },
        {
            id: 'tactician',
            label: 'The Tactician',
            color: 'from-cyan-400 to-blue-600',
            accent: 'text-neon-cyan',
            border: 'border-neon-cyan',
            glow: 'shadow-[0_0_30px_rgba(34,211,238,0.3)]',
            icon: '🧠',
            desc: 'Strategy & IQ'
        },
        {
            id: 'titan',
            label: 'The Titan',
            color: 'from-emerald-400 to-green-600',
            accent: 'text-emerald-400',
            border: 'border-emerald-400',
            glow: 'shadow-[0_0_30px_rgba(52,211,153,0.3)]',
            icon: '🛡️',
            desc: 'Power & Defense'
        }
    ];

    const [selectedArchetype, setSelectedArchetype] = useState(ARCHETYPES[1]); // Default: Tactician
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

    const onSubmit = (formData: UserData) => {
        updateData(formData);
        onNext();
    };

    return (
        <div className="h-full flex flex-col md:flex-row gap-8 items-start py-8">
            {/* LEFT: Live Athlete Card */}
            <div className="w-full md:w-5/12 flex items-center justify-center sticky top-24">
                <motion.div
                    key={selectedArchetype.id} // Re-animate on change
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className={`relative w-80 h-[480px] bg-black rounded-2xl overflow-hidden border-2 ${selectedArchetype.border} shadow-[0_0_50px_rgba(0,0,0,0.5)] group perspective-1000 transition-colors duration-500`}
                >
                    {/* Animated Border Glow based on Archetype */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedArchetype.color} opacity-20`}></div>

                    {/* Holographic Overlay Effect */}
                    <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10 mix-blend-overlay"></div>

                    {/* Card Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div className={`text-[10px] uppercase tracking-[0.2em] ${selectedArchetype.accent} font-bold border ${selectedArchetype.border} px-2 py-1 rounded`}>
                                {selectedArchetype.label}
                            </div>
                            <FaUserAstronaut className={`${selectedArchetype.accent} opacity-50 text-4xl`} />
                        </div>

                        {/* Avatar / Identity */}
                        <div className="text-center my-4 group/avatar relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setAvatar(reader.result as string);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="hidden"
                                id="avatar-upload"
                            />
                            <label
                                htmlFor="avatar-upload"
                                className={`w-32 h-32 mx-auto bg-gradient-to-b ${selectedArchetype.color} rounded-full border-4 border-white/5 flex items-center justify-center ${selectedArchetype.glow} cursor-pointer relative overflow-hidden transition-transform hover:scale-105`}
                            >
                                {avatar ? (
                                    <>
                                        <img src={avatar} alt="Avatar" className="w-full h-full object-cover mix-blend-hard-light filter grayscale contrast-125" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                        {/* Scanline */}
                                        <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/l41lV8X9gJ8B4yqOI/giphy.gif')] opacity-20 mix-blend-overlay"></div>
                                    </>
                                ) : (
                                    <span className="text-5xl group-hover/avatar:scale-110 transition-transform">{selectedArchetype.icon}</span>
                                )}

                                {/* Hover Hint */}
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                                    <span className="text-[10px] uppercase font-bold text-white tracking-widest">Upload IMG</span>
                                </div>
                            </label>

                            <h2 className="mt-4 text-2xl font-black italic text-white uppercase tracking-wider truncate">
                                {watchedValues.fullName || "UNKNOWN"}
                            </h2>
                            <p className={`text-xs ${selectedArchetype.accent} font-mono tracking-widest mt-1`}>
                                {athleteId}
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-2 text-xs border-t border-white/10 pt-4">
                            <div className="bg-white/5 p-2 rounded">
                                <div className="text-gray-500 uppercase text-[8px] tracking-wider">Affiliation</div>
                                <div className="text-white font-bold truncate">{watchedValues.college || "N/A"}</div>
                            </div>
                            <div className="bg-white/5 p-2 rounded">
                                <div className="text-gray-500 uppercase text-[8px] tracking-wider">Origin</div>
                                <div className="text-white font-bold truncate">{watchedValues.city || "N/A"}</div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-4 pt-4 border-t border-dashed border-white/20 flex justify-between items-end">
                            <div className="text-[8px] text-gray-500 w-2/3">
                                AUTHORIZED FOR SPARDHA 2026 COMPETITION
                            </div>
                            <div className="w-12 h-12 bg-white p-1">
                                <div className="w-full h-full bg-black flex items-center justify-center text-[6px] text-white text-center leading-none">
                                    QR CODE
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* RIGHT: Gaming Input Panel */}
            <div className="w-full md:w-7/12">

                {/* ARCHETYPE SELECTOR */}
                <div className="mb-8">
                    <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">Initialize Player Class</h3>
                    <div className="grid grid-cols-3 gap-3">
                        {ARCHETYPES.map((arch) => (
                            <button
                                key={arch.id}
                                onClick={() => setSelectedArchetype(arch)}
                                className={`relative p-3 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2 group ${selectedArchetype.id === arch.id ? `${arch.border} bg-white/5` : 'border-white/10 hover:border-white/30'}`}
                            >
                                <span className="text-2xl group-hover:scale-110 transition-transform">{arch.icon}</span>
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedArchetype.id === arch.id ? 'text-white' : 'text-gray-500'}`}>
                                    {arch.label}
                                </span>
                                {selectedArchetype.id === arch.id && (
                                    <motion.div layoutId="active-ring" className={`absolute inset-0 border-2 ${arch.border} rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)]`} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className={`h-px bg-gradient-to-r from-transparent via-${selectedArchetype.accent.split('-')[1]}-400 to-transparent flex-1`}></div>
                        <h3 className="text-xl font-black italic text-white uppercase tracking-widest">
                            Athlete <span className={selectedArchetype.accent}>Registration</span>
                        </h3>
                        <div className="h-px bg-gradient-to-r from-transparent via-transparent to-transparent flex-1"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="group relative">
                            <label className={`text-[10px] font-mono ${selectedArchetype.accent} uppercase tracking-widest mb-1 block flex items-center gap-2`}>
                                <FaIdCard /> Full Name
                            </label>
                            <input
                                {...register("fullName")}
                                className={`w-full bg-[#050505] border border-white/20 p-4 text-white font-bold tracking-wider rounded-none focus:${selectedArchetype.border} focus:shadow-[0_0_15px_rgba(255,255,255,0.1)] outline-none transition-all clip-path-slant`}
                                placeholder="ENTER NAME"
                            />
                            {errors.fullName && <p className="text-red-500 text-[10px] font-mono mt-1 blink">⚠ {errors.fullName.message}</p>}
                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50"></div>
                        </div>

                        {/* College */}
                        <div className="group relative">
                            <label className={`text-[10px] font-mono ${selectedArchetype.accent} uppercase tracking-widest mb-1 block flex items-center gap-2`}>
                                <FaUniversity /> University / College
                            </label>
                            <input
                                {...register("college")}
                                className={`w-full bg-[#050505] border border-white/20 p-4 text-white font-bold tracking-wider rounded-none focus:${selectedArchetype.border} focus:shadow-[0_0_15px_rgba(255,255,255,0.1)] outline-none transition-all`}
                                placeholder="ENTER INSTITUTE"
                            />
                            {errors.college && <p className="text-red-500 text-[10px] font-mono mt-1 blink">⚠ {errors.college.message}</p>}
                        </div>

                        {/* City */}
                        <div className="group relative">
                            <label className={`text-[10px] font-mono ${selectedArchetype.accent} uppercase tracking-widest mb-1 block flex items-center gap-2`}>
                                <FaCity /> City
                            </label>
                            <input
                                {...register("city")}
                                className={`w-full bg-[#050505] border border-white/20 p-4 text-white font-bold tracking-wider rounded-none focus:${selectedArchetype.border} focus:shadow-[0_0_15px_rgba(255,255,255,0.1)] outline-none transition-all`}
                                placeholder="ENTER CITY"
                            />
                            {errors.city && <p className="text-red-500 text-[10px] font-mono mt-1 blink">⚠ {errors.city.message}</p>}
                        </div>

                        {/* Phone */}
                        <div className="group relative">
                            <label className={`text-[10px] font-mono ${selectedArchetype.accent} uppercase tracking-widest mb-1 block flex items-center gap-2`}>
                                <FaPhoneAlt /> Comms (Phone)
                            </label>
                            <input
                                {...register("phone")}
                                className={`w-full bg-[#050505] border border-white/20 p-4 text-white font-bold tracking-wider rounded-none focus:${selectedArchetype.border} focus:shadow-[0_0_15px_rgba(255,255,255,0.1)] outline-none transition-all`}
                                placeholder="+91 XXXXX XXXXX"
                            />
                            {errors.phone && <p className="text-red-500 text-[10px] font-mono mt-1 blink">⚠ {errors.phone.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="group relative md:col-span-2">
                            <label className={`text-[10px] font-mono ${selectedArchetype.accent} uppercase tracking-widest mb-1 block flex items-center gap-2`}>
                                <FaEnvelope /> Digital ID (Email)
                            </label>
                            <input
                                {...register("email")}
                                className={`w-full bg-[#050505] border border-white/20 p-4 text-white font-bold tracking-wider rounded-none focus:${selectedArchetype.border} focus:shadow-[0_0_15px_rgba(255,255,255,0.1)] outline-none transition-all`}
                                placeholder="USER@DOMAIN.COM"
                            />
                            {errors.email && <p className="text-red-500 text-[10px] font-mono mt-1 blink">⚠ {errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="pt-8 flex justify-end">
                        <button
                            type="submit"
                            className={`bg-white text-black text-lg font-black italic uppercase px-12 py-4 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)] clip-path-button group flex items-center gap-2`}
                        >
                            Enter The Arena <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
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
                `}</style>
            </div>
        </div>
    );
}
