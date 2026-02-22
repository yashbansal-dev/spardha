'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, useAnimation } from 'framer-motion';
import { UserData } from '../GamifiedWizard';
import { FaIdCard, FaUniversity, FaCity, FaPhoneAlt, FaEnvelope, FaFingerprint, FaWifi, FaMicrochip } from 'react-icons/fa';
import { BiBarcodeReader } from 'react-icons/bi';
import Image from 'next/image';


// Validation Schema
const userSchema = z.object({
    fullName: z.string().min(2, "IDENTITY REQUIRED"),
    email: z.string().email("INVALID COMMS CHANNEL"),
    phone: z.string().min(10, "INVALID SIGNAL"),
    college: z.string().min(2, "AFFILIATION REQUIRED"),
    city: z.string().min(2, "ORIGIN REQUIRED"),
    gender: z.string().min(1, "GENOTYPE REQUIRED"),
    age: z.string().min(1, "CHRONOLOGY REQUIRED"), // Keeping as string to match input type, can parse later
    universityIdCard: z.string().min(2, "ID REF REQUIRED"),
    address: z.string().min(5, "COORDINATES REQUIRED"),
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
        defaultValues: data,
        mode: 'onSubmit', // Only validate on submit to prevent autofill errors
        reValidateMode: 'onChange' // Re-validate on change after first submit
    });

    const watchedValues = watch();

    // Calculate Power Level (Progress)
    const [powerLevel, setPowerLevel] = useState(0);

    useEffect(() => {
        let score = 0;
        if (watchedValues.fullName && watchedValues.fullName.length > 2) score += 15;
        if (watchedValues.college && watchedValues.college.length > 2) score += 10;
        if (watchedValues.city && watchedValues.city.length > 2) score += 10;
        if (watchedValues.phone && watchedValues.phone.length >= 10) score += 15;
        if (watchedValues.email && watchedValues.email.includes('@')) score += 15;
        // New fields scoring
        if (watchedValues.gender) score += 10;
        if (watchedValues.age) score += 10;
        if (watchedValues.universityIdCard) score += 10;
        if (watchedValues.address) score += 5;

        setPowerLevel(Math.min(100, score));
    }, [watchedValues]);

    const onSubmit = (formData: UserData) => {
        updateData(formData);
        onNext();
    };

    return (
        <div className="h-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start py-2 lg:py-8">

            {/* LEFT: Holographic Identity Card */}
            <div className="w-full lg:w-5/12 flex items-center justify-center lg:sticky lg:top-24 perspective-1000 mb-8 lg:mb-0">
                <motion.div
                    initial={{ rotateX: 10, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="relative w-full max-w-[300px] md:max-w-[340px] aspect-[340/540] bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,243,255,0.1)] group transition-all duration-500 hover:shadow-[0_0_80px_rgba(227,114,51,0.2)]"
                >
                    {/* --- DECORATIVE TECH LAYERS --- */}

                    {/* Scanner Line Animation */}
                    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
                        <div className="w-full h-[2px] bg-neon-cyan/50 shadow-[0_0_20px_#00F3FF] animate-scan-line blur-[1px]"></div>
                    </div>

                    {/* Circuit Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-20 mix-blend-overlay z-0"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/80 z-0"></div>

                    {/* Corner Brackets */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-neon-cyan/50 rounded-tl-lg z-20"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-neon-cyan/50 rounded-tr-lg z-20"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-neon-cyan/50 rounded-bl-lg z-20"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-neon-cyan/50 rounded-br-lg z-20"></div>

                    {/* --- CONTENT LAYOUT --- */}
                    <div className="relative z-10 h-full flex flex-col p-6">

                        {/* Header: Chip & Status */}
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex flex-col gap-1">
                                <FaMicrochip className="text-3xl text-amber-400/80 drop-shadow-glow" />
                                <span className="text-[8px] font-mono text-amber-400/60 tracking-widest">SECURE CHIP</span>
                            </div>
                            <div className="text-right">
                                <div className="text-neon-cyan font-black italic tracking-widest text-lg">SPARDHA</div>
                                <div className="text-[10px] font-mono text-white/40 tracking-[0.2em] uppercase">Identity Pass</div>
                            </div>
                        </div>

                        {/* Middle: Avatar & Rings */}
                        <div className="relative flex-1 flex flex-col items-center justify-center">
                            {/* Rotating HUD Rings */}
                            <div className="absolute w-48 h-48 border border-dashed border-white/20 rounded-full animate-spin-slow-reverse"></div>
                            <div className="absolute w-56 h-56 border border-white/5 rounded-full animate-pulse"></div>

                            {/* Avatar Container */}
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-neon-cyan/50 shadow-[0_0_30px_rgba(0,243,255,0.2)] bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                <Image src="/assets/images/spardha_logo.png" alt="Avatar" width={80} height={80} className="w-20 h-20 object-contain brightness-125 drop-shadow-lg" />


                                {/* Glare */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Status Indicator */}
                            <div className="absolute bottom-10 px-3 py-1 bg-black/60 border border-neon-cyan/30 rounded-full backdrop-blur-md flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                                <span className="text-[10px] font-mono text-neon-cyan tracking-widest">ONLINE</span>
                            </div>
                        </div>

                        {/* Lower: ID Details */}
                        <div className="relative mt-auto pt-6 border-t border-white/10">
                            {/* Vertical ID Number */}
                            <div className="absolute -right-2 bottom-20 origin-bottom-right -rotate-90 text-[10px] font-mono text-white/20 tracking-[0.3em] flex items-center gap-2">
                                <BiBarcodeReader className="text-lg" /> {athleteId}
                            </div>

                            <div className="space-y-4 pr-8">
                                <div>
                                    <div className="text-[9px] text-neon-cyan/70 uppercase tracking-widest mb-1 font-mono">Operations Level</div>
                                    <h2 className="text-2xl font-black italic text-white uppercase tracking-wider truncate drop-shadow-md">
                                        {watchedValues.fullName || "UNKNOWN"}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-1 font-mono">Affiliation</div>
                                        <div className="text-sm font-bold text-white/90 truncate">{watchedValues.college || "---"}</div>
                                    </div>
                                    <div>
                                        <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-1 font-mono">Sector</div>
                                        <div className="text-sm font-bold text-white/90 truncate">{watchedValues.city || "---"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* RIGHT: Data Entry Terminal */}
            <div className="w-full lg:w-7/12 pl-0 lg:pl-10">
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6 relative">

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-2">
                        <FaFingerprint className="text-2xl text-neon-cyan animate-pulse" />
                        <h3 className="text-2xl font-black italic text-white uppercase tracking-widest">
                            Identity <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-orange-500">Verification</span>
                        </h3>
                    </div>

                    <div className="space-y-4">
                        {/* Name Input */}
                        <div className="group relative">
                            <label className="text-[10px] font-mono text-neon-cyan uppercase tracking-widest mb-2 flex justify-between">
                                <span className="flex items-center gap-2"><FaIdCard /> Full Name</span>
                                {watchedValues.fullName?.length > 2 && <FaWifi className="text-green-500 animate-pulse" />}
                            </label>
                            <div className="relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan to-orange-500 rounded-lg opacity-0 group-focus-within:opacity-75 transition duration-500 blur-sm"></div>
                                <input
                                    {...register("fullName")}
                                    className="relative w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 pl-12 text-white font-bold tracking-wider focus:outline-none focus:bg-black/80 transition-all placeholder:text-white/20"
                                    placeholder="ENTER FULL NAME"
                                    autoComplete="name"
                                    spellCheck="false"
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white/10 rounded-full flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full"></div>
                                </div>
                            </div>
                            {errors.fullName && <p className="text-red-500 text-[10px] font-mono mt-1 text-right">{errors.fullName.message}</p>}
                        </div>

                        {/* Gender & Age Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="group relative">
                                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-pink-500"></span> Gender
                                </label>
                                <div className="relative">
                                    <select
                                        {...register("gender")}
                                        className="relative w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white font-bold tracking-wider focus:outline-none focus:bg-black/80 transition-all appearance-none"
                                    >
                                        <option value="" className="bg-black text-gray-500">SELECT GENDER</option>
                                        <option value="Male" className="bg-black">Male</option>
                                        <option value="Female" className="bg-black">Female</option>
                                        <option value="Other" className="bg-black">Other</option>
                                    </select>
                                </div>
                                {errors.gender && <p className="text-red-500 text-[10px] font-mono mt-1 text-right">{errors.gender.message}</p>}
                            </div>

                            <div className="group relative">
                                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Age
                                </label>
                                <input
                                    {...register("age")}
                                    type="number"
                                    className="relative w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white font-bold tracking-wider focus:outline-none focus:bg-black/80 transition-all placeholder:text-white/20"
                                    placeholder="AGE"
                                />
                                {errors.age && <p className="text-red-500 text-[10px] font-mono mt-1 text-right">{errors.age.message}</p>}
                            </div>
                        </div>

                        {/* College & University ID Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="group relative">
                                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <FaUniversity /> Institute Name
                                </label>
                                <input
                                    {...register("college")}
                                    className="relative w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white font-bold tracking-wider focus:outline-none focus:bg-black/80 transition-all placeholder:text-white/20"
                                    placeholder="UNIVERSITY NAME"
                                />
                                {errors.college && <p className="text-red-500 text-[10px] font-mono mt-1 text-right">{errors.college.message}</p>}
                            </div>

                            <div className="group relative">
                                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <FaIdCard /> University ID
                                </label>
                                <input
                                    {...register("universityIdCard")}
                                    className="relative w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white font-bold tracking-wider focus:outline-none focus:bg-black/80 transition-all placeholder:text-white/20"
                                    placeholder="ID NUMBER"
                                />
                                {errors.universityIdCard && <p className="text-red-500 text-[10px] font-mono mt-1 text-right">{errors.universityIdCard.message}</p>}
                            </div>
                        </div>

                        {/* Contact, Email, City Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="group relative">
                                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <FaPhoneAlt /> Phone
                                </label>
                                <input
                                    {...register("phone")}
                                    type="tel"
                                    className="relative w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white font-bold tracking-wider focus:outline-none focus:bg-black/80 transition-all placeholder:text-white/20"
                                    placeholder="PHONE"
                                />
                                {errors.phone && <p className="text-red-500 text-[10px] font-mono mt-1 text-right">{errors.phone.message}</p>}
                            </div>

                            <div className="group relative md:col-span-2">
                                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <FaEnvelope /> Email
                                </label>
                                <input
                                    {...register("email")}
                                    type="email"
                                    className="relative w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white font-bold tracking-wider focus:outline-none focus:bg-black/80 transition-all placeholder:text-white/20"
                                    placeholder="EMAIL ADDRESS"
                                />
                                {errors.email && <p className="text-red-500 text-[10px] font-mono mt-1 text-right">{errors.email.message}</p>}
                            </div>
                        </div>

                        {/* Address & City */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="group relative">
                                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <FaCity /> City
                                </label>
                                <input
                                    {...register("city")}
                                    className="relative w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white font-bold tracking-wider focus:outline-none focus:bg-black/80 transition-all placeholder:text-white/20"
                                    placeholder="CITY"
                                />
                                {errors.city && <p className="text-red-500 text-[10px] font-mono mt-1 text-right">{errors.city.message}</p>}
                            </div>

                            <div className="group relative md:col-span-2">
                                <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-purple-500"></span> Address
                                </label>
                                <input
                                    {...register("address")}
                                    className="relative w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-white font-bold tracking-wider focus:outline-none focus:bg-black/80 transition-all placeholder:text-white/20"
                                    placeholder="FULL ADDRESS"
                                />
                                {errors.address && <p className="text-red-500 text-[10px] font-mono mt-1 text-right">{errors.address.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                        <div className="hidden md:block">
                            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">System Sync</div>
                            <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-neon-cyan shadow-[0_0_10px_#00F3FF]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${powerLevel}%` }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={powerLevel < 100}
                            className={`
                                relative group overflow-hidden px-8 py-4 rounded-xl font-black italic uppercase tracking-widest text-black transition-all duration-300
                                ${powerLevel < 100 ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-neon-cyan hover:scale-105 hover:shadow-[0_0_30px_rgba(0,243,255,0.4)]'}
                            `}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {powerLevel < 100 ? 'Complete Protocol' : 'Initialise Sequence'}
                                {powerLevel >= 100 && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                            </span>
                            {powerLevel >= 100 && (
                                <div className="absolute inset-0 bg-white/30 skew-x-12 -translate-x-full group-hover:animate-shine" />
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <style jsx>{`
                @keyframes scan-line {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .animate-scan-line {
                    animation: scan-line 3s linear infinite;
                }
                .animate-spin-slow-reverse {
                    animation: spin 8s linear infinite reverse;
                }
                .drop-shadow-glow {
                    filter: drop-shadow(0 0 5px rgba(251, 191, 36, 0.5));
                }
                @keyframes shine {
                    100% { transform: translateX(200%) skewX(12deg); }
                }
                .group-hover\:animate-shine:hover {
                    animation: shine 1s;
                }

                /* Autofill Override */
                input:-webkit-autofill,
                input:-webkit-autofill:hover, 
                input:-webkit-autofill:focus, 
                input:-webkit-autofill:active {
                    -webkit-box-shadow: 0 0 0 30px #0a0a0a inset !important;
                    -webkit-text-fill-color: white !important;
                    caret-color: white;
                    transition: background-color 5000s ease-in-out 0s;
                }
            `}</style>
        </div>
    );
}
