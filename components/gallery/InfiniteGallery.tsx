'use client';

import { useState, useRef, useEffect } from 'react';
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

// Image position data - absolutely positioned coordinates
// Expanded to 64 images for a fuller, more explorable gallery
const IMAGE_POSITIONS = [
    // Row 1 (y: 300-500)
    { src: SPORTS_IMAGES[0], x: 400, y: 350 },
    { src: SPORTS_IMAGES[1], x: 900, y: 400 },
    { src: SPORTS_IMAGES[2], x: 1400, y: 350 },
    { src: SPORTS_IMAGES[3], x: 1900, y: 400 },
    { src: SPORTS_IMAGES[4], x: 2400, y: 350 },
    { src: SPORTS_IMAGES[5], x: 2900, y: 400 },
    { src: SPORTS_IMAGES[6], x: 3400, y: 350 },
    { src: SPORTS_IMAGES[7], x: 3900, y: 400 },

    // Row 2 (y: 700-900)
    { src: SPORTS_IMAGES[8], x: 300, y: 800 },
    { src: SPORTS_IMAGES[9], x: 800, y: 750 },
    { src: SPORTS_IMAGES[10], x: 1300, y: 800 },
    { src: SPORTS_IMAGES[11], x: 1800, y: 750 },
    { src: SPORTS_IMAGES[12], x: 2300, y: 800 },
    { src: SPORTS_IMAGES[13], x: 2800, y: 750 },
    { src: SPORTS_IMAGES[14], x: 3300, y: 800 },
    { src: SPORTS_IMAGES[15], x: 3800, y: 750 },

    // Row 3 (y: 1100-1300)
    { src: SPORTS_IMAGES[0], x: 500, y: 1200 },
    { src: SPORTS_IMAGES[1], x: 1000, y: 1150 },
    { src: SPORTS_IMAGES[2], x: 1500, y: 1200 },
    { src: SPORTS_IMAGES[3], x: 2000, y: 1150 },
    { src: SPORTS_IMAGES[4], x: 2500, y: 1200 },
    { src: SPORTS_IMAGES[5], x: 3000, y: 1150 },
    { src: SPORTS_IMAGES[6], x: 3500, y: 1200 },
    { src: SPORTS_IMAGES[7], x: 4000, y: 1150 },

    // Row 4 (y: 1500-1700)
    { src: SPORTS_IMAGES[8], x: 400, y: 1600 },
    { src: SPORTS_IMAGES[9], x: 900, y: 1550 },
    { src: SPORTS_IMAGES[10], x: 1400, y: 1600 },
    { src: SPORTS_IMAGES[11], x: 1900, y: 1550 },
    { src: SPORTS_IMAGES[12], x: 2400, y: 1600 },
    { src: SPORTS_IMAGES[13], x: 2900, y: 1550 },
    { src: SPORTS_IMAGES[14], x: 3400, y: 1600 },
    { src: SPORTS_IMAGES[15], x: 3900, y: 1550 },

    // Row 5 (y: 1900-2100)
    { src: SPORTS_IMAGES[0], x: 300, y: 2000 },
    { src: SPORTS_IMAGES[1], x: 800, y: 1950 },
    { src: SPORTS_IMAGES[2], x: 1300, y: 2000 },
    { src: SPORTS_IMAGES[3], x: 1800, y: 1950 },
    { src: SPORTS_IMAGES[4], x: 2300, y: 2000 },
    { src: SPORTS_IMAGES[5], x: 2800, y: 1950 },
    { src: SPORTS_IMAGES[6], x: 3300, y: 2000 },
    { src: SPORTS_IMAGES[7], x: 3800, y: 1950 },

    // Row 6 (y: 2300-2500)
    { src: SPORTS_IMAGES[8], x: 500, y: 2400 },
    { src: SPORTS_IMAGES[9], x: 1000, y: 2350 },
    { src: SPORTS_IMAGES[10], x: 1500, y: 2400 },
    { src: SPORTS_IMAGES[11], x: 2000, y: 2350 },
    { src: SPORTS_IMAGES[12], x: 2500, y: 2400 },
    { src: SPORTS_IMAGES[13], x: 3000, y: 2350 },
    { src: SPORTS_IMAGES[14], x: 3500, y: 2400 },
    { src: SPORTS_IMAGES[15], x: 4000, y: 2350 },

    // Row 7 (y: 2700-2900)
    { src: SPORTS_IMAGES[0], x: 400, y: 2800 },
    { src: SPORTS_IMAGES[1], x: 900, y: 2750 },
    { src: SPORTS_IMAGES[2], x: 1400, y: 2800 },
    { src: SPORTS_IMAGES[3], x: 1900, y: 2750 },
    { src: SPORTS_IMAGES[4], x: 2400, y: 2800 },
    { src: SPORTS_IMAGES[5], x: 2900, y: 2750 },
    { src: SPORTS_IMAGES[6], x: 3400, y: 2800 },
    { src: SPORTS_IMAGES[7], x: 3900, y: 2750 },

    // Row 8 (y: 3100-3300)
    { src: SPORTS_IMAGES[8], x: 300, y: 3200 },
    { src: SPORTS_IMAGES[9], x: 800, y: 3150 },
    { src: SPORTS_IMAGES[10], x: 1300, y: 3200 },
    { src: SPORTS_IMAGES[11], x: 1800, y: 3150 },
    { src: SPORTS_IMAGES[12], x: 2300, y: 3200 },
    { src: SPORTS_IMAGES[13], x: 2800, y: 3150 },
    { src: SPORTS_IMAGES[14], x: 3300, y: 3200 },
    { src: SPORTS_IMAGES[15], x: 3800, y: 3150 },
];

export default function InfiniteGallery() {
    const CANVAS_SIZE = 4000; // Large virtual canvas
    const LOOP_THRESHOLD = 1500; // When to loop back

    const [canvasPosition, setCanvasPosition] = useState({ x: -1500, y: -1500 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Handle infinite looping
    useEffect(() => {
        const { x, y } = canvasPosition;
        let newX = x;
        let newY = y;
        let needsUpdate = false;

        // Loop horizontally
        if (x > 0) {
            newX = x - LOOP_THRESHOLD;
            needsUpdate = true;
        } else if (x < -LOOP_THRESHOLD) {
            newX = x + LOOP_THRESHOLD;
            needsUpdate = true;
        }

        // Loop vertically
        if (y > 0) {
            newY = y - LOOP_THRESHOLD;
            needsUpdate = true;
        } else if (y < -LOOP_THRESHOLD) {
            newY = y + LOOP_THRESHOLD;
            needsUpdate = true;
        }

        if (needsUpdate) {
            setCanvasPosition({ x: newX, y: newY });
        }
    }, [canvasPosition]);

    // Mouse drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - canvasPosition.x, y: e.clientY - canvasPosition.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
            const newX = e.clientX - dragStart.x;
            const newY = e.clientY - dragStart.y;
            setCanvasPosition({ x: newX, y: newY });
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    };

    // Touch drag handlers for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        setIsDragging(true);
        setDragStart({ x: touch.clientX - canvasPosition.x, y: touch.clientY - canvasPosition.y });
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;

        const touch = e.touches[0];

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
            const newX = touch.clientX - dragStart.x;
            const newY = touch.clientY - dragStart.y;
            setCanvasPosition({ x: newX, y: newY });
        });
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    };

    return (
        <section
            className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a]"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Instruction overlay */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                    <p className="text-white/80 text-sm font-medium tracking-wide">
                        ✨ Drag to explore the infinite 2D world
                    </p>
                </div>
            </div>

            {/* Large virtual canvas - NO FLEX/GRID */}
            <div
                ref={canvasRef}
                className="absolute"
                style={{
                    width: `${CANVAS_SIZE}px`,
                    height: `${CANVAS_SIZE}px`,
                    transform: `translate(${canvasPosition.x}px, ${canvasPosition.y}px)`,
                    willChange: 'transform',
                    transition: 'transform 0.05s ease-out',
                }}
            >
                {/* Images positioned absolutely using coordinates */}
                {IMAGE_POSITIONS.map((item, index) => (
                    <div
                        key={index}
                        className="absolute group"
                        style={{
                            left: `${item.x}px`,
                            top: `${item.y}px`,
                        }}
                    >
                        <div className="relative w-72 h-48 md:w-80 md:h-52 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(59,130,246,0.6)]">
                            <Image
                                src={item.src}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 288px, 320px"
                                draggable={false}
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/0 group-hover:ring-blue-500/60 transition-all duration-300" />

                            {/* Image number badge */}
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-white/90 text-xs font-medium">{index + 1}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Ambient light effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

            {/* Vignette effect */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40 pointer-events-none" />
        </section>
    );
}
