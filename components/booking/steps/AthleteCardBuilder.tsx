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
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="relative w-80 h-[480px] bg-black rounded-2xl overflow-hidden border-2 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group perspective-1000"
                >
                    {/* Animated Border Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 via-transparent to-neon-purple/20 opacity-50"></div>

                    {/* Holographic Overlay Effect */}
                    <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10 mix-blend-overlay"></div>

                    {/* Card Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div className="text-[10px] uppercase tracking-[0.2em] text-neon-cyan font-bold border border-neon-cyan px-2 py-1 rounded">
                                Official Entry
                            </div>
                            <FaUserAstronaut className="text-white/20 text-4xl" />
                        </div>

                        {/* Avatar / Identity */}
                        <div className="text-center my-4">
                            <div className="w-32 h-32 mx-auto bg-gradient-to-b from-gray-800 to-black rounded-full border-4 border-white/5 flex items-center justify-center shadow-[0_0_30px_rgba(0,243,255,0.2)]">
                                <span className="text-5xl">👤</span>
                            </div>
                            <h2 className="mt-4 text-2xl font-black italic text-white uppercase tracking-wider truncate">
                                {watchedValues.fullName || "UNKNOWN"}
                            </h2>
                            <p className="text-xs text-neon-cyan font-mono tracking-widest mt-1">
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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent flex-1"></div>
                        <h3 className="text-xl font-black italic text-white uppercase tracking-widest">
                            Athlete <span className="text-neon-cyan">Registration</span>
                        </h3>
                        <div className="h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent flex-1"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="group relative">
                            <label className="text-[10px] font-mono text-neon-cyan uppercase tracking-widest mb-1 block flex items-center gap-2">
                                <FaIdCard /> Full Name
                            </label>
                            <input
                                {...register("fullName")}
                                className="w-full bg-[#050505] border border-white/20 p-4 text-white font-bold tracking-wider rounded-none focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] outline-none transition-all clip-path-slant"
                                placeholder="ENTER NAME"
                            />
                            {errors.fullName && <p className="text-red-500 text-[10px] font-mono mt-1 blink">⚠ {errors.fullName.message}</p>}
                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50"></div>
                        </div>

                        {/* College */}
                        <div className="group relative">
                            <label className="text-[10px] font-mono text-neon-cyan uppercase tracking-widest mb-1 block flex items-center gap-2">
                                <FaUniversity /> University / College
                            </label>
                            <input
                                {...register("college")}
                                className="w-full bg-[#050505] border border-white/20 p-4 text-white font-bold tracking-wider rounded-none focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] outline-none transition-all"
                                placeholder="ENTER INSTITUTE"
                            />
                            {errors.college && <p className="text-red-500 text-[10px] font-mono mt-1 blink">⚠ {errors.college.message}</p>}
                        </div>

                        {/* City */}
                        <div className="group relative">
                            <label className="text-[10px] font-mono text-neon-cyan uppercase tracking-widest mb-1 block flex items-center gap-2">
                                <FaCity /> City
                            </label>
                            <input
                                {...register("city")}
                                className="w-full bg-[#050505] border border-white/20 p-4 text-white font-bold tracking-wider rounded-none focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] outline-none transition-all"
                                placeholder="ENTER CITY"
                            />
                            {errors.city && <p className="text-red-500 text-[10px] font-mono mt-1 blink">⚠ {errors.city.message}</p>}
                        </div>

                        {/* Phone */}
                        <div className="group relative">
                            <label className="text-[10px] font-mono text-neon-cyan uppercase tracking-widest mb-1 block flex items-center gap-2">
                                <FaPhoneAlt /> Comms (Phone)
                            </label>
                            <input
                                {...register("phone")}
                                className="w-full bg-[#050505] border border-white/20 p-4 text-white font-bold tracking-wider rounded-none focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] outline-none transition-all"
                                placeholder="+91 XXXXX XXXXX"
                            />
                            {errors.phone && <p className="text-red-500 text-[10px] font-mono mt-1 blink">⚠ {errors.phone.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="group relative md:col-span-2">
                            <label className="text-[10px] font-mono text-neon-cyan uppercase tracking-widest mb-1 block flex items-center gap-2">
                                <FaEnvelope /> Digital ID (Email)
                            </label>
                            <input
                                {...register("email")}
                                className="w-full bg-[#050505] border border-white/20 p-4 text-white font-bold tracking-wider rounded-none focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] outline-none transition-all"
                                placeholder="USER@DOMAIN.COM"
                            />
                            {errors.email && <p className="text-red-500 text-[10px] font-mono mt-1 blink">⚠ {errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="pt-8 flex justify-end">
                        <button
                            type="submit"
                            className="bg-neon-cyan text-black text-lg font-black italic uppercase px-12 py-4 hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)] clip-path-button group flex items-center gap-2"
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
