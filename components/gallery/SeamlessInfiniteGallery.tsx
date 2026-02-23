'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { smartShuffle } from '@/utils/smartShuffle';
import { SPORTS_IMAGES } from '@/data/galleryImages';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const IMAGE_WIDTH = 280;
const IMAGE_HEIGHT = 180;
const SPACING = 15;
const GRID_ROWS = 4;
const GRID_COLS = 4;
const TILE_WIDTH = GRID_COLS * IMAGE_WIDTH + GRID_COLS * SPACING;
const TILE_HEIGHT = GRID_ROWS * IMAGE_HEIGHT + GRID_ROWS * SPACING;

const BASE_GRID = Array.from({ length: GRID_ROWS }, (_, row) =>
    Array.from({ length: GRID_COLS }, (_, col) => ({
        x: col * (IMAGE_WIDTH + SPACING),
        y: row * (IMAGE_HEIGHT + SPACING),
    }))
).flat();

export default function SeamlessInfiniteGallery() {
    // Motion Values for performant updates
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics (optional, but good for drag momentum)
    const smoothX = useSpring(x, { damping: 50, stiffness: 400 });
    const smoothY = useSpring(y, { damping: 50, stiffness: 400 });

    const isDragging = useRef(false);
    const lastMousePos = useRef({ x: 0, y: 0 });
    const clickStartPos = useRef({ x: 0, y: 0 });

    // Grid State
    const [activeTiles, setActiveTiles] = useState({ startX: -1, endX: 1, startY: -1, endY: 1 });
    const [shuffledImages, setShuffledImages] = useState<string[]>([]);

    // Lightbox State
    const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

    const isMobileRef = useRef(false);

    // Mouse Pos for cursor
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Initialize shuffled images on mount
    useEffect(() => {
        setShuffledImages(smartShuffle(SPORTS_IMAGES));
        isMobileRef.current = window.innerWidth < 768;
        updateTiles(x.get(), y.get());

        const checkMobile = () => {
            if (isMobileRef.current !== (window.innerWidth < 768)) {
                isMobileRef.current = window.innerWidth < 768;
                updateTiles(x.get(), y.get());
            }
        };
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateTiles = useCallback((latestX: number, latestY: number) => {
        const vpX = -latestX;
        const vpY = -latestY;
        const tileX = Math.floor(vpX / TILE_WIDTH);
        const tileY = Math.floor(vpY / TILE_HEIGHT);

        if (isMobileRef.current) {
            const modX = vpX % TILE_WIDTH;
            const progressX = modX >= 0 ? modX : TILE_WIDTH + modX;
            const startX = progressX < TILE_WIDTH / 2 ? tileX - 1 : tileX;

            const modY = vpY % TILE_HEIGHT;
            const progressY = modY >= 0 ? modY : TILE_HEIGHT + modY;
            const startY = progressY < TILE_HEIGHT / 2 ? tileY - 1 : tileY;

            setActiveTiles(prev => {
                if (prev.startX !== startX || prev.startY !== startY || prev.endX !== startX + 1 || prev.endY !== startY + 1) {
                    return { startX, endX: startX + 1, startY, endY: startY + 1 };
                }
                return prev;
            });
        } else {
            setActiveTiles(prev => {
                if (prev.startX !== tileX - 1 || prev.startY !== tileY - 1 || prev.endX !== tileX + 1 || prev.endY !== tileY + 1) {
                    return { startX: tileX - 1, endX: tileX + 1, startY: tileY - 1, endY: tileY + 1 };
                }
                return prev;
            });
        }
    }, []);

    useMotionValueEvent(x, "change", (latest) => updateTiles(latest, y.get()));
    useMotionValueEvent(y, "change", (latest) => updateTiles(x.get(), latest));

    const getTiledPositions = useCallback(() => {
        if (shuffledImages.length === 0) return [];

        const positions: Array<{ src: string; x: number; y: number; key: string }> = [];

        for (let ty = activeTiles.startY; ty <= activeTiles.endY; ty++) {
            for (let tx = activeTiles.startX; tx <= activeTiles.endX; tx++) {
                BASE_GRID.forEach((pos, idx) => {
                    const tileRow = Math.floor(idx / GRID_COLS);
                    const tileCol = idx % GRID_COLS;
                    const globalRow = ty * GRID_ROWS + tileRow;
                    const globalCol = tx * GRID_COLS + tileCol;
                    const linearIndex = globalRow * GRID_COLS + globalCol;

                    const len = shuffledImages.length;
                    const imageIndex = ((linearIndex % len) + len) % len;
                    const src = shuffledImages[imageIndex];

                    if (src) {
                        positions.push({
                            src,
                            x: pos.x + (tx * TILE_WIDTH),
                            y: pos.y + (ty * TILE_HEIGHT),
                            key: `${tx}-${ty}-${idx}`,
                        });
                    }
                });
            }
        }
        return positions;
    }, [activeTiles, shuffledImages]);

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        clickStartPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);

        if (!isDragging.current) return;

        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;

        x.set(x.get() + dx);
        y.set(y.get() + dy);

        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleWheel = (e: React.WheelEvent) => {
        x.set(x.get() - e.deltaX);
        y.set(y.get() - e.deltaY);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        isDragging.current = true;
        const touch = e.touches[0];
        lastMousePos.current = { x: touch.clientX, y: touch.clientY };
        clickStartPos.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging.current) return;
        const touch = e.touches[0];

        mouseX.set(touch.clientX);
        mouseY.set(touch.clientY);

        const dx = touch.clientX - lastMousePos.current.x;
        const dy = touch.clientY - lastMousePos.current.y;

        x.set(x.get() + dx);
        y.set(y.get() + dy);

        lastMousePos.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = () => {
        isDragging.current = false;
    };

    const handleImageInteraction = (src: string, e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();

        // Don't open lightbox if another is already open
        if (activeLightboxImage) return;

        let clientX = 0, clientY = 0;
        if ('touches' in e && e.changedTouches) {
            clientX = e.changedTouches[0].clientX;
            clientY = e.changedTouches[0].clientY;
        } else if ('clientX' in e) {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        const dx = Math.abs(clientX - clickStartPos.current.x);
        const dy = Math.abs(clientY - clickStartPos.current.y);

        if (dx < 10 && dy < 10) {
            setActiveLightboxImage(src);
        }
    };

    const lightboxNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!activeLightboxImage) return;
        const idx = shuffledImages.indexOf(activeLightboxImage);
        if (idx >= 0) {
            const nextIdx = (idx + 1) % shuffledImages.length;
            setActiveLightboxImage(shuffledImages[nextIdx]);
        }
    };

    const lightboxPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!activeLightboxImage) return;
        const idx = shuffledImages.indexOf(activeLightboxImage);
        if (idx >= 0) {
            const prevIdx = (idx - 1 + shuffledImages.length) % shuffledImages.length;
            setActiveLightboxImage(shuffledImages[prevIdx]);
        }
    };

    const tiledPositions = getTiledPositions();

    return (
        <section
            className="relative w-screen h-screen overflow-hidden bg-[#050505] cursor-none select-none touch-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Custom Cursor */}
            <motion.div
                className="fixed z-[100] pointer-events-none transition-transform duration-75 ease-out md:block hidden"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                    scale: 1, // Optional: adjust scale on drag if needed
                }}
            >
                <svg width="32" height="48" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                    <path d="M20 5 L5 45 L35 45 Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.5" />
                    <circle cx="20" cy="48" r="7" fill="#FFD700" />
                    <rect x="13" y="45" width="14" height="2" fill="#B22222" />
                </svg>
            </motion.div>

            <motion.div
                className="absolute inset-0"
                style={{
                    x: smoothX,
                    y: smoothY,
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
                            width: IMAGE_WIDTH,
                            height: IMAGE_HEIGHT,
                        }}
                    >
                        <div
                            className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:z-50 ring-1 ring-white/10 group-hover:ring-gold-500/50 cursor-pointer"
                            onMouseUp={(e) => handleImageInteraction(item.src, e)}
                            onTouchEnd={(e) => handleImageInteraction(item.src, e)}
                        >
                            <ViewportTracker itemX={item.x} itemY={item.y} x={x} y={y}>
                                <div className="absolute inset-0 bg-white/5 animate-pulse" /> {/* Placeholder while unmounted */}
                                <Image
                                    src={item.src}
                                    alt="Spardha moment"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 280px, 320px"
                                    draggable={false}
                                    loading="lazy"
                                    unoptimized
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                            </ViewportTracker>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {activeLightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 md:p-8 cursor-auto touch-auto"
                        onClick={() => setActiveLightboxImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video bg-black rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Low-res blurred placeholder (loads instantly from cache) */}
                            <Image
                                src={activeLightboxImage}
                                alt=""
                                fill
                                className="object-contain blur-xl opacity-50 z-0"
                                sizes="(max-width: 768px) 280px, 320px"
                            />
                            {/* High-res image */}
                            <Image
                                src={activeLightboxImage}
                                alt="Fullscreen gallery image"
                                fill
                                className="object-contain z-10"
                                sizes="100vw"
                                priority
                                unoptimized
                            />

                            {/* UI Controls */}
                            <div className="absolute top-4 right-4 z-[300]">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setActiveLightboxImage(null); }}
                                    className="p-3 bg-black/60 hover:bg-white text-white hover:text-black rounded-full transition-colors border border-white/20 cursor-pointer pointer-events-auto"
                                >
                                    <FaTimes className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="absolute inset-y-0 left-0 flex items-center pl-2 md:pl-6 z-[300]">
                                <button
                                    onClick={(e) => { e.stopPropagation(); lightboxPrev(e); }}
                                    className="p-3 bg-black/60 hover:bg-white text-white hover:text-black rounded-full transition-colors border border-white/20 backdrop-blur-sm cursor-pointer pointer-events-auto"
                                >
                                    <FaChevronLeft className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:pr-6 z-[300]">
                                <button
                                    onClick={(e) => { e.stopPropagation(); lightboxNext(e); }}
                                    className="p-3 bg-black/60 hover:bg-white text-white hover:text-black rounded-full transition-colors border border-white/20 backdrop-blur-sm cursor-pointer pointer-events-auto"
                                >
                                    <FaChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HUD Info */}
            <div className="absolute bottom-6 left-6 flex flex-col gap-1 pointer-events-none z-50">
                <div className="text-white/40 font-mono text-[10px] tracking-widest uppercase bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                    Spardha Archive
                </div>
            </div>
        </section>
    );
}

function ViewportTracker({
    itemX,
    itemY,
    x,
    y,
    children
}: {
    itemX: number;
    itemY: number;
    x: import('framer-motion').MotionValue<number>;
    y: import('framer-motion').MotionValue<number>;
    children: React.ReactNode
}) {
    // Only strictly unmount on mobile to save GPU memory; desktop handles it fine
    const [isVisible, setIsVisible] = useState(true);
    const isMobile = useRef(false);

    useEffect(() => {
        isMobile.current = window.innerWidth < 768;
        if (isMobile.current) checkVisibility();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useMotionValueEvent(x, "change", () => {
        if (isMobile.current) checkVisibility();
    });
    useMotionValueEvent(y, "change", () => {
        if (isMobile.current) checkVisibility();
    });

    const checkVisibility = useCallback(() => {
        const vpX = -x.get();
        const vpY = -y.get();

        const viewL = vpX - 300;
        const viewR = vpX + window.innerWidth + 300;
        const viewT = vpY - 300;
        const viewB = vpY + window.innerHeight + 300;

        // Image bounds
        const imgL = itemX;
        const imgR = itemX + IMAGE_WIDTH;
        const imgT = itemY;
        const imgB = itemY + IMAGE_HEIGHT;

        // Check intersection
        const visible = imgR > viewL && imgL < viewR && imgB > viewT && imgT < viewB;

        if (visible !== isVisible) {
            setIsVisible(visible);
        }
    }, [itemX, itemY, x, y, isVisible]);

    if (!isVisible) {
        return <div className="w-full h-full bg-[#111] animate-pulse rounded-xl shadow-2xl" />; // Very cheap placeholder
    }

    return <>{children}</>;
}
