'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MOCK_EVENTS } from '@/data/events';
import { FaClock, FaMapMarkerAlt, FaStar, FaChevronRight } from 'react-icons/fa';

// --- Premium Utilities ---

const BorderBeam = ({ color = "cyan" }: { color?: string }) => {
    const beamColor = color === "cyan" ? "via-cyan-400" : "via-orange-400";
    const shadowColor = color === "cyan" ? "rgba(34,211,238,0.8)" : "rgba(249,115,22,0.8)";

    return (
        <div className="absolute inset-0 pointer-events-none rounded-[inherit]">
            <div className="absolute inset-0 rounded-[inherit] border border-white/10" />
            <motion.div
                animate={{
                    offsetDistance: ["0%", "100%"],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className={`absolute top-0 left-0 w-32 h-[3px] bg-gradient-to-r from-transparent ${beamColor} to-transparent`}
                style={{
                    offsetPath: "rect(0% 100% 100% 0% round 40px)",
                    boxShadow: `0 0 20px ${shadowColor}`
                }}
            />
        </div>
    );
};

const MagneticCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - (left + width / 2)) * 0.15;
        const y = (e.clientY - (top + height / 2)) * 0.15;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.div
            ref={ref}
            animate={{ x: position.x, y: position.y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={{ perspective: 1000 }}
        >
            {children}
        </motion.div>
    );
};

const ImmersiveSchedule = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const days = [
        { num: 1, date: '2026-03-27', label: 'THE AWAKENING', display: 'DAY 01', color: 'cyan' },
        { num: 2, date: '2026-03-28', label: 'THE CLASH', display: 'DAY 02', color: 'orange' },
        { num: 3, date: '2026-03-29', label: 'THE GLORY', display: 'DAY 03', color: 'purple' },
    ];

    return (
        <div ref={containerRef} className="relative min-h-screen bg-black py-32 overflow-hidden selection:bg-cyan-500/30">
            {/* Dynamic Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-black" />
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/[0.03] blur-[180px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-500/[0.03] blur-[180px] rounded-full" />
                <div className="bg-noise opacity-[0.02]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 px-6">
                {/* Introspect Header */}
                <section className="h-[80vh] flex flex-col items-center justify-center text-center relative mb-40">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative"
                    >
                        {/* Futuristic Header Metadata */}
                        <div className="flex items-center justify-center gap-4 mb-10">
                            <motion.div
                                animate={{ scaleX: [0, 1] }}
                                transition={{ duration: 1, ease: "circOut" }}
                                className="h-[1px] w-12 bg-cyan-500/50"
                            />
                            <h2 className="text-[#E37233] font-gang tracking-[1.5em] uppercase text-[10px] block opacity-80 animate-pulse">SPARDHA CHRONICLES</h2>
                            <motion.div
                                animate={{ scaleX: [0, 1] }}
                                transition={{ duration: 1, ease: "circOut" }}
                                className="h-[1px] w-12 bg-orange-500/50"
                            />
                        </div>

                        {/* HIGH-IMPACT TITLE WITH NEW COLOR COMBINATION */}
                        <h1 className="text-[7rem] md:text-[14rem] font-normal uppercase leading-[0.75] tracking-tighter font-gang relative">
                            <span className="text-orange-500 font-gang relative z-10 drop-shadow-[0_0_20px_rgba(227,114,51,0.5)]">THE</span>
                            <span className="text-white font-gang block md:inline drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] font-gang"> EVENT</span><br />
                            <motion.span
                                animate={{
                                    opacity: [1, 0.8, 1],
                                    filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="text-[#E37233] font-gang drop-shadow-[0_0_30px_rgba(227,114,51,0.7)]"
                            >
                                TIMELINE
                            </motion.span>
                        </h1>

                        <div className="absolute -top-20 -left-20 w-40 h-40 bg-orange-500/10 blur-[80px] rounded-full animate-pulse" />
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/10 blur-[80px] rounded-full animate-pulse-slow" />

                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: '140%', opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1.5 }}
                            className="h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent absolute -bottom-16 left-1/2 -translate-x-1/2"
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-scan-line-fast mix-blend-overlay" />
                        </motion.div>
                    </motion.div>
                </section>

                {/* The Great Timeline Path */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[100vh] bottom-0 w-[4px] hidden md:block">
                    <div className="absolute inset-0 bg-white/5 rounded-full" />
                    <motion.div
                        style={{ scaleY, originY: 0 }}
                        className="absolute inset-0 bg-gradient-to-b from-cyan-500 via-orange-500 to-purple-600 rounded-full shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-white/10 animate-scan-line-fast mix-blend-overlay" />
                    </motion.div>
                </div>

                {/* Records Body */}
                <div className="relative">
                    {days.map((day, dIdx) => {
                        const dayEvents = MOCK_EVENTS.filter(e => e.date === day.date);

                        // Parallax transform for the background DAY marker
                        const yOffset = useTransform(scrollYProgress, [dIdx * 0.3, (dIdx + 1) * 0.3], [100, -100]);
                        const opacity = useTransform(scrollYProgress, [dIdx * 0.3, dIdx * 0.3 + 0.1, dIdx * 0.3 + 0.2, (dIdx + 1) * 0.3], [0, 0.1, 0.1, 0]);

                        return (
                            <div key={day.num} id={`day-${day.num}`} className="relative min-h-screen py-32">
                                {/* Ghost Parallax DAY Marker */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                                    <motion.h3
                                        style={{ y: yOffset, opacity }}
                                        className="text-[30rem] md:text-[50rem] font-black italic uppercase text-transparent stroke-text-heavy whitespace-nowrap select-none"
                                    >
                                        {day.display}
                                    </motion.h3>
                                </div>

                                <div className="relative z-20 flex flex-col items-center">
                                    {/* Day Callout */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ margin: "-100px" }}
                                        className="flex flex-col items-center mb-40 text-center"
                                    >
                                        <div className={`w-28 h-[5px] mb-8 bg-${day.color === 'cyan' ? 'cyan-500' : day.color === 'orange' ? 'orange-500' : 'purple-500'} rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]`} />
                                        <h4 className="text-white text-8xl md:text-[10rem] font-normal uppercase tracking-tighter leading-none font-gang">{day.display}</h4>
                                        <span className="text-white/70 font-gang text-sm tracking-[0.8em] mt-8 block uppercase font-gang">{day.label}</span>
                                    </motion.div>

                                    {/* Events Stream */}
                                    <div className="w-full space-y-48">
                                        {dayEvents.map((event, eIdx) => {
                                            const accentColor = day.color === 'cyan' ? 'cyan' : day.color === 'orange' ? 'orange' : 'purple';
                                            return (
                                                <div
                                                    key={event.id}
                                                    className={`flex flex-col md:flex-row items-center justify-center gap-10 md:gap-40 ${eIdx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                                                >
                                                    {/* Premium Card */}
                                                    <MagneticCard className="w-full md:w-[550px]">
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.6, ease: "circOut" }}
                                                            className="group relative bg-[#111111] backdrop-blur-3xl rounded-[40px] p-12 md:p-16 overflow-hidden border border-white/[0.08] shadow-2xl shadow-black"
                                                        >
                                                            <BorderBeam color={accentColor} />

                                                            <div className="relative z-10">
                                                                <div className="flex justify-between items-start mb-12">
                                                                    <div className="flex flex-col">
                                                                        <span className={`text-${accentColor}-500 font-mono text-[10px] tracking-[0.4em] uppercase font-black mb-2`}>
                                                                            ENTRY: {event.status}
                                                                        </span>
                                                                        <h5 className="text-4xl md:text-5xl font-normal text-white uppercase leading-none group-hover:text-[#E37233] transition-all duration-700 font-gang tracking-tight">
                                                                            {event.title}
                                                                        </h5>
                                                                    </div>
                                                                    <div className={`p-5 rounded-2xl bg-white/5 border border-white/10 text-${accentColor}-400 group-hover:bg-white group-hover:text-black transition-all duration-700`}>
                                                                        <FaStar size={24} />
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                                                    <div className="flex items-center gap-5 text-white/50">
                                                                        <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/[0.05]"><FaClock size={16} className={`text-${accentColor}-400`} /></div>
                                                                        <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold">{event.startTime} {event.endTime ? `— ${event.endTime}` : ''}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-5 text-white/50">
                                                                        <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/[0.05]"><FaMapMarkerAlt size={16} className={`text-${accentColor}-400`} /></div>
                                                                        <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold truncate">{event.venue}</span>
                                                                    </div>
                                                                </div>

                                                                <p className="text-white/60 text-lg leading-relaxed font-light italic border-l-2 border-white/20 pl-8 group-hover:border-cyan-500 transition-all duration-700">
                                                                    {event.description}
                                                                </p>

                                                                <motion.div
                                                                    whileHover={{ x: 10 }}
                                                                    className={`mt-14 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-${accentColor}-500 cursor-pointer group-hover:text-white transition-all`}
                                                                >
                                                                    Access Protocol <FaChevronRight size={12} />
                                                                </motion.div>
                                                            </div>

                                                            {/* Dynamic Aura Glow */}
                                                            <div className={`absolute -right-20 -bottom-20 w-96 h-96 bg-${accentColor}-500/[0.05] blur-[120px] rounded-full group-hover:bg-${accentColor}-500/[0.15] transition-all duration-1000`} />
                                                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                                                        </motion.div>
                                                    </MagneticCard>

                                                    {/* Node Pillar */}
                                                    <div className="hidden md:flex relative z-30">
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            whileInView={{ scale: 1 }}
                                                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                                            className={`w-14 h-14 rounded-full bg-black border-[4px] border-${accentColor}-500 shadow-[0_0_30px_rgba(34,211,238,0.3)] flex items-center justify-center relative`}
                                                        >
                                                            <div className={`w-3 h-3 rounded-full bg-${accentColor}-400 animate-ping`} />
                                                            <div className={`absolute inset-[-12px] border border-${accentColor}-500/20 rounded-full animate-spin-slow`} />
                                                            <div className={`absolute inset-[-6px] border border-${accentColor}-500/40 rounded-full`} />
                                                        </motion.div>
                                                        <div className={`absolute top-1/2 -translate-y-1/2 w-48 h-[1px] bg-gradient-to-r from-${accentColor}-500 to-transparent opacity-40`} />
                                                    </div>

                                                    <div className="hidden md:block w-full md:w-[550px]" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Eternal Outro */}
                <section className="h-[80vh] flex flex-col items-center justify-center relative z-10 mt-40">
                    <div className="w-[1px] h-40 bg-gradient-to-b from-purple-500 via-orange-500/50 to-transparent mb-16 opacity-30" />

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center flex flex-col items-center relative group"
                    >
                        {/* THE GENESIS CORE BUTTON */}
                        <div className="relative cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            {/* Rotating Geometric Rings */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-60px] border-2 border-dashed border-orange-500/10 rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-40px] border border-white/5 rounded-full"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-[-20px] bg-orange-500/5 blur-xl rounded-full"
                            />

                            {/* The Inner Core */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="relative z-10 w-64 h-64 rounded-full bg-black border-4 border-white flex flex-col items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_100px_rgba(227,114,51,0.5)] transition-all duration-500 font-gang"
                            >
                                {/* Core Ignition Glow - Using Branding Orange */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#E37233]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <span className="text-white text-5xl font-normal uppercase tracking-tighter leading-none mb-2">SCROLL</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-[2px] bg-[#E37233]" />
                                    <span className="text-[#E37233] font-gang text-xl tracking-widest uppercase">UP</span>
                                    <div className="w-8 h-[2px] bg-[#E37233]" />
                                </div>

                                {/* Intense Pulse */}
                                <motion.div
                                    animate={{ opacity: [0.05, 0.2, 0.05] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="absolute inset-0 bg-orange-500/10"
                                />

                                {/* Scanned light line */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-white/10 animate-scan-line-fast" />
                            </motion.button>
                        </div>

                        {/* Narrative Subtext */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.2 }}
                            transition={{ delay: 0.5 }}
                            className="text-white font-mono text-[8px] tracking-[1.5em] mt-32 uppercase select-none"
                        >
                            Returning to the point of origin
                        </motion.span>
                    </motion.div>
                </section>
            </div>

            <style jsx global>{`
                .stroke-text {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
                    color: transparent;
                }
                .stroke-text-heavy {
                    -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.08);
                }
                @keyframes scan-line-fast {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100vh); }
                }
                .animate-scan-line-fast {
                    animation: scan-line-fast 10s linear infinite;
                }
                .animate-spin-slow {
                    animation: spin 12s linear infinite;
                }
                .bg-noise {
                    background-image: url('https://grainy-gradients.vercel.app/noise.svg');
                    filter: contrast(170%) brightness(1000%);
                }
            `}</style>
        </div>
    );
};

export default ImmersiveSchedule;
