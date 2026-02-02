'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

const BASE_IMAGES = [
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1628779238951-be2c9f255902?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531415074968-bc2ce3a106e2?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1510137600163-2729bc699b0c?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1560067174-c5a3a8f37060?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1628779238951-be2c9f255902?auto=format&fit=crop&q=80',
];

// Double up for density
const IMAGES = [...BASE_IMAGES, ...BASE_IMAGES].slice(0, 20);

// REFINED POSITIONS - Denser "Cloud" around center
// Avoid 40-60% Y at Center X
const POSITIONS = [
    // --- TOP BAND (Dense) ---
    { x: 10, y: 12, scale: 0.9 }, // Top Left Corner
    { x: 28, y: 8, scale: 0.8 }, // Top Left-Mid
    { x: 45, y: 12, scale: 0.9 }, // Top Center
    { x: 62, y: 8, scale: 0.8 }, // Top Right-Mid
    { x: 80, y: 12, scale: 0.9 }, // Top Right
    { x: 92, y: 18, scale: 0.85 }, // Far Top Right

    // --- UPPER MID BAND ---
    { x: 5, y: 32, scale: 1.0 }, // Mid-High Left
    { x: 22, y: 28, scale: 0.85 }, // Inner Left
    { x: 75, y: 28, scale: 0.85 }, // Inner Right
    { x: 95, y: 35, scale: 1.0 }, // Mid-High Right

    // --- TITLE FLANKERS (Vertical Center) ---
    { x: 12, y: 50, scale: 0.9 }, // Left of Title
    { x: 88, y: 50, scale: 0.9 }, // Right of Title

    // --- LOWER MID BAND ---
    { x: 5, y: 68, scale: 1.0 }, // Mid-Low Left
    { x: 25, y: 65, scale: 0.85 }, // Inner Left
    { x: 75, y: 65, scale: 0.85 }, // Inner Right
    { x: 95, y: 72, scale: 1.0 }, // Mid-Low Right

    // --- BOTTOM BAND (Dense) ---
    { x: 15, y: 85, scale: 0.9 }, // Bottom Left
    { x: 35, y: 82, scale: 0.85 }, // Bottom Left-Mid
    { x: 50, y: 88, scale: 0.95 }, // Bottom Center
    { x: 65, y: 82, scale: 0.85 }, // Bottom Right-Mid
    { x: 85, y: 85, scale: 0.9 }, // Bottom Right
];

export default function MemoryVault() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const imgs = imgRefs.current.filter(Boolean);

        // --- 1. ENTRANCE ---
        gsap.fromTo(imgs,
            {
                opacity: 0,
                scale: 0,
            },
            {
                opacity: 1,
                scale: (i) => POSITIONS[i]?.scale || 1,
                duration: 0.8,
                stagger: {
                    amount: 0.8,
                    grid: [5, 4],
                    from: "center"
                },
                ease: "back.out(1.5)"
            }
        );

        // --- 2. FLOAT ---
        imgs.forEach((img, i) => {
            gsap.to(img, {
                y: "-=8",
                duration: gsap.utils.random(3, 6),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: gsap.utils.random(0, 3)
            });
        });

    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[100vh] overflow-hidden bg-[#121212]"
        >
            {/* CENTER TITLE */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <h1 className="text-[15vw] md:text-[7rem] font-gang text-white tracking-[8px] uppercase drop-shadow-2xl select-none z-10">
                    GALLERY
                </h1>
            </div>

            {/* IMAGES */}
            <div className="relative w-full h-full">
                {IMAGES.map((src, i) => {
                    const pos = POSITIONS[i % POSITIONS.length];

                    return (
                        <div
                            key={i}
                            ref={(el) => { imgRefs.current[i] = el }}
                            className="absolute w-[160px] md:w-[220px] aspect-[16/10] shadow-xl cursor-pointer transition-all duration-300 hover:z-50 bg-[#1a1a1a]"
                            style={{
                                left: `${pos.x}%`,
                                top: `${pos.y}%`,
                                transform: `translate(-50%, -50%) scale(${pos.scale})`,
                            }}
                        >
                            <div className="relative w-full h-full overflow-hidden">
                                <Image
                                    src={src}
                                    alt={`Gallery ${i}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Hover Effect */}
                            <style jsx>{`
                                div[class*='absolute'] {
                                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                                }
                                div[class*='absolute']:hover {
                                    transform: translate(-50%, calc(-50% - 5px)) scale(1.1) !important;
                                    box-shadow: 0 10px 40px rgba(0,0,0,0.8);
                                    z-index: 50;
                                }
                           `}</style>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
