'use client';

import { useState, useRef } from 'react';
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

// Game-world tiling configuration - calculated to eliminate ALL gaps
const IMAGE_WIDTH = 320;
const IMAGE_HEIGHT = 208;
const SPACING = 60;

// Calculate exact tile size based on 5x5 grid
// Width: 5 images * 320px + 4 gaps * 60px + 2 * 50px padding = 1900px
// Height: 5 images * 208px + 4 gaps * 60px + 2 * 50px padding = 1380px
const TILE_WIDTH = 5 * IMAGE_WIDTH + 4 * SPACING + 100; // 1900px
const TILE_HEIGHT = 5 * IMAGE_HEIGHT + 4 * SPACING + 100; // 1380px

// Create a dense base tile with 5x5 grid (25 images)
// This ensures every tile is fully populated with no large gaps
const BASE_POSITIONS = [
    // Row 1
    { src: SPORTS_IMAGES[0], x: 50, y: 50 },
    { src: SPORTS_IMAGES[1], x: 50 + (IMAGE_WIDTH + SPACING) * 1, y: 50 },
    { src: SPORTS_IMAGES[2], x: 50 + (IMAGE_WIDTH + SPACING) * 2, y: 50 },
    { src: SPORTS_IMAGES[3], x: 50 + (IMAGE_WIDTH + SPACING) * 3, y: 50 },
    { src: SPORTS_IMAGES[4], x: 50 + (IMAGE_WIDTH + SPACING) * 4, y: 50 },

    // Row 2
    { src: SPORTS_IMAGES[5], x: 50, y: 50 + (IMAGE_HEIGHT + SPACING) * 1 },
    { src: SPORTS_IMAGES[6], x: 50 + (IMAGE_WIDTH + SPACING) * 1, y: 50 + (IMAGE_HEIGHT + SPACING) * 1 },
    { src: SPORTS_IMAGES[7], x: 50 + (IMAGE_WIDTH + SPACING) * 2, y: 50 + (IMAGE_HEIGHT + SPACING) * 1 },
    { src: SPORTS_IMAGES[8], x: 50 + (IMAGE_WIDTH + SPACING) * 3, y: 50 + (IMAGE_HEIGHT + SPACING) * 1 },
    { src: SPORTS_IMAGES[9], x: 50 + (IMAGE_WIDTH + SPACING) * 4, y: 50 + (IMAGE_HEIGHT + SPACING) * 1 },

    // Row 3
    { src: SPORTS_IMAGES[10], x: 50, y: 50 + (IMAGE_HEIGHT + SPACING) * 2 },
    { src: SPORTS_IMAGES[11], x: 50 + (IMAGE_WIDTH + SPACING) * 1, y: 50 + (IMAGE_HEIGHT + SPACING) * 2 },
    { src: SPORTS_IMAGES[12], x: 50 + (IMAGE_WIDTH + SPACING) * 2, y: 50 + (IMAGE_HEIGHT + SPACING) * 2 },
    { src: SPORTS_IMAGES[13], x: 50 + (IMAGE_WIDTH + SPACING) * 3, y: 50 + (IMAGE_HEIGHT + SPACING) * 2 },
    { src: SPORTS_IMAGES[14], x: 50 + (IMAGE_WIDTH + SPACING) * 4, y: 50 + (IMAGE_HEIGHT + SPACING) * 2 },

    // Row 4
    { src: SPORTS_IMAGES[15], x: 50, y: 50 + (IMAGE_HEIGHT + SPACING) * 3 },
    { src: SPORTS_IMAGES[0], x: 50 + (IMAGE_WIDTH + SPACING) * 1, y: 50 + (IMAGE_HEIGHT + SPACING) * 3 },
    { src: SPORTS_IMAGES[1], x: 50 + (IMAGE_WIDTH + SPACING) * 2, y: 50 + (IMAGE_HEIGHT + SPACING) * 3 },
    { src: SPORTS_IMAGES[2], x: 50 + (IMAGE_WIDTH + SPACING) * 3, y: 50 + (IMAGE_HEIGHT + SPACING) * 3 },
    { src: SPORTS_IMAGES[3], x: 50 + (IMAGE_WIDTH + SPACING) * 4, y: 50 + (IMAGE_HEIGHT + SPACING) * 3 },

    // Row 5
    { src: SPORTS_IMAGES[4], x: 50, y: 50 + (IMAGE_HEIGHT + SPACING) * 4 },
    { src: SPORTS_IMAGES[5], x: 50 + (IMAGE_WIDTH + SPACING) * 1, y: 50 + (IMAGE_HEIGHT + SPACING) * 4 },
    { src: SPORTS_IMAGES[6], x: 50 + (IMAGE_WIDTH + SPACING) * 2, y: 50 + (IMAGE_HEIGHT + SPACING) * 4 },
    { src: SPORTS_IMAGES[7], x: 50 + (IMAGE_WIDTH + SPACING) * 3, y: 50 + (IMAGE_HEIGHT + SPACING) * 4 },
    { src: SPORTS_IMAGES[8], x: 50 + (IMAGE_WIDTH + SPACING) * 4, y: 50 + (IMAGE_HEIGHT + SPACING) * 4 },
];

export default function SeamlessInfiniteGallery() {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const animationFrameRef = useRef<number | null>(null);

    // Generate tiled positions - create a 3x3 grid of tiles around the viewport
    const getTiledPositions = () => {
        const positions: Array<{ src: string; x: number; y: number; key: string }> = [];

        // Create 5x5 grid of tiles (-2 to +2 in both directions)
        // This ensures viewport is always fully covered with no gaps
        for (let tileY = -2; tileY <= 2; tileY++) {
            for (let tileX = -2; tileX <= 2; tileX++) {
                BASE_POSITIONS.forEach((pos, idx) => {
                    positions.push({
                        src: pos.src,
                        x: pos.x + (tileX * TILE_WIDTH),
                        y: pos.y + (tileY * TILE_HEIGHT),
                        key: `${tileX}-${tileY}-${idx}`,
                    });
                });
            }
        }

        return positions;
    };

    // Modular wrapping function for seamless looping
    const wrapPosition = (value: number, size: number) => {
        const wrapped = ((value % size) + size) % size;
        return wrapped;
    };

    // Calculate wrapped offset for rendering
    const getWrappedOffset = () => {
        return {
            x: wrapPosition(offset.x, TILE_WIDTH),
            y: wrapPosition(offset.y, TILE_HEIGHT),
        };
    };

    // Mouse drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
            const newX = e.clientX - dragStart.x;
            const newY = e.clientY - dragStart.y;
            setOffset({ x: newX, y: newY });
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
        setDragStart({ x: touch.clientX - offset.x, y: touch.clientY - offset.y });
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
            setOffset({ x: newX, y: newY });
        });
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    };

    // Trackpad/Wheel gesture handler for two-finger scrolling
    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault(); // Prevent page scrolling

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
            // Update camera position based on wheel delta
            // Negative because scrolling down should move content up
            const newX = offset.x - e.deltaX;
            const newY = offset.y - e.deltaY;
            setOffset({ x: newX, y: newY });
        });
    };

    const wrappedOffset = getWrappedOffset();
    const tiledPositions = getTiledPositions();

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
            onWheel={handleWheel}
        >
            {/* Instruction overlay */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                    <p className="font-alice text-white/90 text-sm md:text-base tracking-widest leading-relaxed">
                        ✨ Drag or use trackpad to explore the infinite world
                    </p>
                </div>
            </div>

            {/* Tiled canvas - uses modular wrapping for seamless infinite effect */}
            <div
                className="absolute inset-0"
                style={{
                    transform: `translate(${wrappedOffset.x}px, ${wrappedOffset.y}px)`,
                    willChange: 'transform',
                }}
            >
                {tiledPositions.map((item) => (
                    <div
                        key={item.key}
                        className="absolute group"
                        style={{
                            left: `${item.x}px`,
                            top: `${item.y}px`,
                        }}
                    >
                        <div className="relative w-72 h-48 md:w-80 md:h-52 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(59,130,246,0.6)]">
                            <Image
                                src={item.src}
                                alt="Gallery image"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 288px, 320px"
                                draggable={false}
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/0 group-hover:ring-blue-500/60 transition-all duration-300" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Ambient light effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

            {/* Vignette effect */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40 pointer-events-none" />

            {/* Debug info (optional - remove in production) */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg text-white/70 text-xs font-mono pointer-events-none">
                <div>Offset: ({Math.round(offset.x)}, {Math.round(offset.y)})</div>
                <div>Wrapped: ({Math.round(wrappedOffset.x)}, {Math.round(wrappedOffset.y)})</div>
                <div>Images: {tiledPositions.length}</div>
            </div>
        </section>
    );
}
