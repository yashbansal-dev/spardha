'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaFutbol, FaTableTennis, FaChessKing, FaGamepad, FaRunning, FaBasketballBall } from 'react-icons/fa';
import { GiCricketBat, GiVolleyballBall, GiShuttlecock } from 'react-icons/gi';

interface Event {
    id: string;
    name: string;
    category: string;
    icon: React.ElementType;
    description: string;
    image: string;
    color: string;
}

const eventsData: Event[] = [
    { id: '1', name: 'Cricket', category: 'Outdoor', icon: GiCricketBat, description: 'The gentleman\'s game of strategy.', image: 'https://images.unsplash.com/photo-1531415074968-bc2ce3a106e2?w=800&q=80', color: 'from-blue-600 to-indigo-600' },
    { id: '2', name: 'Football', category: 'Outdoor', icon: FaFutbol, description: 'Passion, precision, and team spirit.', image: 'https://images.unsplash.com/photo-1579952363873-27f3bde9be2b?w=800&q=80', color: 'from-green-600 to-emerald-600' },
    { id: '3', name: 'Basketball', category: 'Outdoor', icon: FaBasketballBall, description: 'Fast breaks and slam dunks.', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80', color: 'from-orange-600 to-red-600' },
    { id: '4', name: 'Volleyball', category: 'Outdoor', icon: GiVolleyballBall, description: 'Power spikes and diving saves.', image: 'https://images.unsplash.com/photo-1592656094267-764a45160876?w=800&q=80', color: 'from-yellow-500 to-orange-500' },
    { id: '5', name: 'Badminton', category: 'Indoor', icon: GiShuttlecock, description: 'Agility and lightning reflexes.', image: 'https://images.unsplash.com/photo-1626224583764-847890e058f5?w=800&q=80', color: 'from-cyan-600 to-blue-600' },
    { id: '6', name: 'Table Tennis', category: 'Indoor', icon: FaTableTennis, description: 'Speed and spin mastery.', image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&q=80', color: 'from-pink-600 to-rose-600' },
    { id: '8', name: 'Athletics', category: 'Athletics', icon: FaRunning, description: 'Push your physical limits.', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80', color: 'from-purple-600 to-fuchsia-600' },
    { id: '9', name: 'E-Sports', category: 'E-Sports', icon: FaGamepad, description: 'Digital glory awaits.', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80', color: 'from-violet-600 to-purple-600' },
];

export default function Events() {
    return (
        <section id="events" className="section-padding bg-[#020617] relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1e1b4b_0%,_#020617_60%)] opacity-50"></div>

            <div className="relative z-10 container mx-auto text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-black font-sans mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
                >
                    OUR <span className="text-neon-cyan">ARENA</span>
                </motion.h2>
                <div className="h-1 w-24 bg-neon-cyan mx-auto rounded-full mb-8"></div>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto px-4">
                {eventsData.map((event, index) => (
                    <TiltCard key={event.id} event={event} index={index} />
                ))}
            </div>
        </section>
    );
}

function TiltCard({ event, index }: { event: Event; index: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;

        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-[400px] w-full rounded-2xl cursor-pointer perspective-1000 group"
        >
            <div className="absolute inset-0 rounded-2xl overflow-hidden transform-style-3d shadow-2xl transition-shadow duration-300 group-hover:shadow-[0_0_30px_rgba(0,243,255,0.3)]">
                {/* Background Image - Moves slightly slower (Mini Parallax) */}
                <motion.div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                        backgroundImage: `url(${event.image})`,
                        translateX: useTransform(mouseX, [-0.5, 0.5], ["-10px", "10px"]),
                        translateY: useTransform(mouseY, [-0.5, 0.5], ["-10px", "10px"]),
                    }}
                />

                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${event.color} opacity-60 mix-blend-multiply transition-opacity group-hover:opacity-80`}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>

                {/* Content - Moves faster (Pop out effect) */}
                <div className="absolute bottom-0 left-0 w-full p-6 transform-style-3d translate-z-20">
                    <motion.div
                        style={{
                            translateX: useTransform(mouseX, [-0.5, 0.5], ["15px", "-15px"]),
                            translateY: useTransform(mouseY, [-0.5, 0.5], ["15px", "-15px"]),
                            translateZ: "50px"
                        }}
                    >
                        <div className="mb-4 text-4xl text-white opacity-80 group-hover:text-neon-cyan group-hover:scale-110 transition-all duration-300">
                            <event.icon />
                        </div>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2 group-hover:text-neon-cyan transition-colors">{event.name}</h3>
                        <p className="text-sm text-gray-300 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                            {event.description}
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
