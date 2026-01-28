'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Navbar from '@/components/Navbar';

// Reuse existing image arrays
const images2024 = [
    "https://images.unsplash.com/photo-1574629810360-7efbbe4384d4?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=80",
];

const images2023 = [
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&auto=format&fit=crop&q=60",
];

export default function Gallery() {
    const [activeYear, setActiveYear] = useState<'2024' | '2023'>('2024');
    const images = activeYear === '2024' ? images2024 : images2023;

    // Use motion value for rotation to allow smooth physics-based animation
    const rotation = useMotionValue(0);
    const smoothRotation = useSpring(rotation, { damping: 20, stiffness: 100 });

    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        // Adjust sensitivity
        const delta = e.deltaY * 0.1;
        rotation.set(rotation.get() + delta);
    };

    useEffect(() => {
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, []);

    const nextSlide = () => {
        rotation.set(rotation.get() + 15); // Adjust step size as needed
    };

    const prevSlide = () => {
        rotation.set(rotation.get() - 15);
    };

    return (
        <main className="h-screen w-screen bg-black relative overflow-hidden flex flex-col items-center">
            <style jsx global>{`
                body { overflow: hidden; }
            `}</style>
            <Navbar />

            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950 via-[#020617] to-black"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 mix-blend-soft-light"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
            </div>

            <div className="relative z-10 w-full h-full flex flex-col items-center pt-28 pb-10">
                {/* Navigation Buttons (Sides) */}
                <button
                    onClick={prevSlide}
                    className="absolute left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-md group"
                >
                    <FaChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-md group"
                >
                    <FaChevronRight className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                {/* Header Section */}
                <div className="text-center mb-8 relative z-20">
                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 tracking-[0.2em] uppercase drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                        Gallery
                    </h1>

                    {/* Year Toggle */}
                    <div className="flex items-center justify-center gap-6 mt-8">
                        {['2024', '2023'].map((year) => (
                            <button
                                key={year}
                                onClick={() => setActiveYear(year as '2024' | '2023')}
                                className={`
                                    relative px-6 py-2 rounded-full font-bold text-sm tracking-wider transition-all duration-300
                                    ${activeYear === year
                                        ? 'text-black bg-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.6)] scale-110'
                                        : 'text-gray-500 hover:text-white border border-white/10 hover:border-white/30'}
                                `}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3D Fan Carousel */}
                <div className="flex-grow w-full relative perspective-[1200px] flex items-center justify-center top-8">
                    <div className="relative w-[300px] h-[450px] preserve-3d">
                        {images.map((src, i) => (
                            <Card
                                key={i}
                                index={i}
                                total={images.length}
                                rotation={smoothRotation}
                                src={src}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Indicator */}
                <div className="absolute bottom-8 flex flex-col items-center gap-4 z-20">
                    <p className="text-white/30 text-xs uppercase tracking-widest font-mono">                    </p>
                </div>

            </div>
        </main>
    );
}

function Card({ index, total, rotation, src }: { index: number, total: number, rotation: any, src: string }) {
    const ANGLE_STEP = 12;
    const RADIUS = 1500;
    const Y_OFFSET = 85; // Adjusted up slightly

    // Transform rotation into card specific visual state
    const transform = useTransform(rotation, (r: number) => {
        // Create infinite looping effect
        // We adjust 'r' so it maps effectively to indices
        const baseAngle = index * ANGLE_STEP;

        // Current angle for this card relative to the center view (0 deg)
        // We want it to loop every (total * ANGLE_STEPonly ) degrees
        const cycle = total * ANGLE_STEP;

        // Normalize current rotation to keep numbers small? Optional, but good for precision.
        // Actually, we need to know the 'visual' angle of this card.
        // cardAngle = baseAngle - r;
        let cardAngle = (baseAngle - r) % cycle;

        // Center it so we have negative and positive values?
        // We want range [-cycle/2, cycle/2]
        if (cardAngle > cycle / 2) cardAngle -= cycle;
        if (cardAngle < -cycle / 2) cardAngle += cycle;

        const angleRad = (cardAngle * Math.PI) / 180;

        const x = RADIUS * Math.sin(angleRad);
        const z = RADIUS * Math.cos(angleRad) - RADIUS - Math.abs(cardAngle) * 5; // Extra Z push
        const y = (RADIUS - RADIUS * Math.cos(angleRad)) + Y_OFFSET;
        const rotateY = -cardAngle;

        // Visibility/Styling check based on angle
        const isVisible = Math.abs(cardAngle) < 60; // Only show front-ish cards

        return {
            x,
            y,
            z,
            rotateY,
            scale: Math.max(0.6, 1 - Math.abs(cardAngle) / 80),
            opacity: Math.max(0, 1 - Math.abs(cardAngle) / 60),
            display: isVisible ? 'block' : 'none'
        };
    });

    return (
        <motion.div
            className="absolute inset-0 rounded-3xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-sm bg-gray-900/80"
            style={{
                x: useTransform(transform, t => t.x),
                y: useTransform(transform, t => t.y),
                z: useTransform(transform, t => t.z),
                rotateY: useTransform(transform, t => t.rotateY), // Using rotateY as per fan style
                // rotateZ: useTransform(transform, t => t.rotateY), 
                scale: useTransform(transform, t => t.scale),
                opacity: useTransform(transform, t => t.opacity),
                display: useTransform(transform, t => t.display),
                zIndex: useTransform(transform, t => 100 - Math.round(Math.abs(t.x) / 10)), // Approximate Z-index based on X distance from center
            }}
        >
            <div className="relative w-full h-full">
                <img
                    src={src}
                    alt={`Gallery ${index}`}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none"></div>
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
            </div>
        </motion.div>
    )
}
