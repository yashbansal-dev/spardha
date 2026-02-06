'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const SPORTS_IMAGES = [
    '/basketball-action.jpg',
    '/basketball-match.jpg',
    '/basketball-night.jpg',
    '/volleyball-match.png',
    '/assets/images/media_1.jpeg',
    '/assets/images/media_2.jpeg',
    '/assets/images/media_3.jpeg',
    '/assets/images/media_4.jpeg',
    '/assets/images/media_5.jpeg',
    '/assets/images/media_6.jpeg',
    '/assets/athlete-action.png',
    '/assets/stadium-atmosphere-bg.png',
    '/assets/images/badminton.png',
    '/assets/images/kabaddi.png',

    '/assets/images/chess.png',
];

// Create multiple rows with different images
const createRows = () => {
    const row1 = [...SPORTS_IMAGES.slice(0, 8)];
    const row2 = [...SPORTS_IMAGES.slice(8, 16)];
    const row3 = [...SPORTS_IMAGES.slice(0, 8)];

    return [row1, row2, row3];
};

export default function AutoScrollGallery() {
    const rows = createRows();

    return (
        <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a]">
            {/* Title Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="text-center">
                    <h1 className="text-[12vw] md:text-[8rem] font-bold text-white/10 tracking-[0.2em] uppercase select-none">
                        GALLERY
                    </h1>
                </div>
            </div>

            {/* Scrolling Rows Container */}
            <div className="relative w-full h-full flex flex-col justify-center gap-8 py-12">
                {/* Row 1 - Scroll Right */}
                <div className="relative overflow-hidden">
                    <div className="flex gap-6 animate-scroll-right">
                        {/* Duplicate images 3 times for seamless loop */}
                        {[...rows[0], ...rows[0], ...rows[0]].map((src, index) => (
                            <div
                                key={`row1-${index}`}
                                className="flex-shrink-0 w-80 h-52 rounded-2xl overflow-hidden shadow-2xl group hover:scale-105 transition-transform duration-300"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={src}
                                        alt={`Gallery image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="320px"
                                        draggable={false}
                                    />
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 rounded-2xl ring-2 ring-cyan-500/0 group-hover:ring-cyan-500/50 transition-all duration-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2 - Scroll Left (slower) */}
                <div className="relative overflow-hidden">
                    <div className="flex gap-6 animate-scroll-left-slow">
                        {/* Duplicate images 3 times for seamless loop */}
                        {[...rows[1], ...rows[1], ...rows[1]].map((src, index) => (
                            <div
                                key={`row2-${index}`}
                                className="flex-shrink-0 w-80 h-52 rounded-2xl overflow-hidden shadow-2xl group hover:scale-105 transition-transform duration-300"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={src}
                                        alt={`Gallery image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="320px"
                                        draggable={false}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute inset-0 rounded-2xl ring-2 ring-purple-500/0 group-hover:ring-purple-500/50 transition-all duration-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 3 - Scroll Right (fast) */}
                <div className="relative overflow-hidden">
                    <div className="flex gap-6 animate-scroll-right-fast">
                        {/* Duplicate images 3 times for seamless loop */}
                        {[...rows[2], ...rows[2], ...rows[2]].map((src, index) => (
                            <div
                                key={`row3-${index}`}
                                className="flex-shrink-0 w-80 h-52 rounded-2xl overflow-hidden shadow-2xl group hover:scale-105 transition-transform duration-300"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={src}
                                        alt={`Gallery image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="320px"
                                        draggable={false}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/0 group-hover:ring-blue-500/50 transition-all duration-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Ambient light effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes scroll-right {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }

                @keyframes scroll-left {
                    0% {
                        transform: translateX(-33.333%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                .animate-scroll-right {
                    animation: scroll-right 40s linear infinite;
                }

                .animate-scroll-left-slow {
                    animation: scroll-left 50s linear infinite;
                }

                .animate-scroll-right-fast {
                    animation: scroll-right 30s linear infinite;
                }

                /* Pause on hover */
                .animate-scroll-right:hover,
                .animate-scroll-left-slow:hover,
                .animate-scroll-right-fast:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
