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

    const isDragging = useRef(false);

    // Grid State
    const [activeTiles, setActiveTiles] = useState({ startX: -1, endX: 1, startY: -1, endY: 1 });
    const [shuffledImages, setShuffledImages] = useState<string[]>([]);

    // Lightbox State
    const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

    const isMobileRef = useRef(false);

    // Mouse Pos for cursor (Smooth Physics for lag-free cursor)
    const rawMouseX = useMotionValue(0);
    const rawMouseY = useMotionValue(0);
    const mouseX = useSpring(rawMouseX, { stiffness: 600, damping: 40, mass: 0.1 });
    const mouseY = useSpring(rawMouseY, { stiffness: 600, damping: 40, mass: 0.1 });

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

    const handlePointerMove = (e: React.PointerEvent) => {
        rawMouseX.set(e.clientX);
        rawMouseY.set(e.clientY);
    };

    const handleWheel = (e: React.WheelEvent) => {
        x.set(x.get() - e.deltaX);
        y.set(y.get() - e.deltaY);
    };

    const handleImageInteraction = (src: string) => {
        if (activeLightboxImage) return;
        setActiveLightboxImage(src);
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
            className="relative w-screen h-screen overflow-hidden bg-[#050505] cursor-auto md:cursor-none select-none touch-none"
            onPointerMove={handlePointerMove}
            onWheel={handleWheel}
        >
            {/* Custom Cursor */}
            <motion.div
                className="fixed z-[100] pointer-events-none md:block hidden will-change-transform"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                    transformOrigin: "center center"
                }}
            >
                <div className="relative flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                    <svg width="24" height="36" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 5 L5 45 L35 45 Z" fill="white" fillOpacity="0.4" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                        <circle cx="20" cy="48" r="6" fill="#FFD700" />
                        <rect x="14" y="44" width="12" height="3" fill="#B22222" rx="1" />
                    </svg>
                </div>
            </motion.div>

            <motion.div
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                drag
                dragConstraints={{ left: -1000000, right: 1000000, top: -1000000, bottom: 1000000 }}
                dragElastic={0}
                dragDamping={30}
                dragMomentum={true}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                style={{
                    x,
                    y,
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
                            onClick={() => handleImageInteraction(item.src)}
                        >
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
