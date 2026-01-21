'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const scheduleData = {
    day1: [
        { time: "09:00 AM", event: "Opening Ceremony", venue: "Main Ground" },
        { time: "11:00 AM", event: "Cricket (Quarter Finals)", venue: "Cricket Ground" },
        { time: "02:00 PM", event: "Football (Group Stages)", venue: "Football Field" },
        { time: "05:00 PM", event: "Badminton (Heats)", venue: "Indoor Arena" },
    ],
    day2: [
        { time: "09:00 AM", event: "Athletics (100m, 200m)", venue: "Track" },
        { time: "01:00 PM", event: "Basketball (Semi Finals)", venue: "Basketball Court" },
        { time: "04:00 PM", event: "E-Sports Tournament", venue: "Auditorium" },
        { time: "07:00 PM", event: "Cultural Night", venue: "Amphitheatre" },
    ],
    day3: [
        { time: "10:00 AM", event: "Final Matches (All Sports)", venue: "Respective Grounds" },
        { time: "04:00 PM", event: "Prize Distribution", venue: "Main Stage" },
        { time: "06:00 PM", event: "Closing Ceremony & DJ Night", venue: "Main Ground" },
    ]
};

export default function Schedule() {
    const [activeDay, setActiveDay] = useState<'day1' | 'day2' | 'day3'>('day1');

    return (
        <section id="schedule" className="section-padding bg-black relative">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold font-sans mb-4">Event <span className="text-neon-cyan">Schedule</span></h2>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-12">
                    {(['day1', 'day2', 'day3'] as const).map((day, idx) => (
                        <button
                            key={day}
                            onClick={() => setActiveDay(day)}
                            className={`px-8 py-3 rounded-full text-lg font-bold transition-all relative overflow-hidden group 
                            ${activeDay === day ? 'text-black' : 'text-gray-400 hover:text-white'}`}
                        >
                            <span className="relative z-10">Day {idx + 1}</span>
                            {activeDay === day && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-neon-cyan"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            {activeDay !== day && (
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Timeline */}
                <div className="relative min-h-[400px]">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2"></div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeDay}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-8"
                        >
                            {scheduleData[activeDay].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`flex flex-col md:flex-row items-start md:items-center relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-neon-purple rounded-full -translate-x-1/2 shadow-[0_0_10px_#bc13fe] z-10 mt-1.5 md:mt-0"></div>

                                    {/* Content */}
                                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'}`}>
                                        <div className="glass-card p-6 border-l-4 border-l-neon-purple hover:bg-white/10 transition-colors">
                                            <h3 className="text-xl font-bold text-white mb-1 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue inline-block">{item.event}</h3>
                                            <div className="flex flex-col md:block text-gray-400 text-sm font-mono mt-2">
                                                <span className="text-neon-cyan font-bold mr-3">{item.time}</span>
                                                <span>{item.venue}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-1/2"></div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
