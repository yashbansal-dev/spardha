'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

// Simplified high-quality sports images
const galleryItems = [
    { id: 1, src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80", span: "row-span-1 col-span-1", x: -20, y: -20 },
    { id: 2, src: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80", span: "row-span-2 col-span-1", x: 30, y: -30 },
    { id: 3, src: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80", span: "row-span-1 col-span-2", x: -40, y: 10 },
    { id: 4, src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80", span: "row-span-1 col-span-1", x: 40, y: 40 },
    { id: 5, src: "https://images.unsplash.com/photo-1626248401347-1c6d83333333?w=800&q=80", span: "row-span-2 col-span-1", x: -10, y: 50 },
    { id: 6, src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80", span: "row-span-1 col-span-1", x: 60, y: 0 },
    { id: 7, src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80", span: "row-span-1 col-span-1", x: -50, y: -40 },
    { id: 8, src: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&q=80", span: "row-span-1 col-span-2", x: 20, y: 60 },
];

export default function Gallery() {
    const [activeId, setActiveId] = useState<number | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Trigger entrance animation on mount
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (activeId === null) return;
        const currentIndex = galleryItems.findIndex(item => item.id === activeId);
        const nextIndex = (currentIndex + 1) % galleryItems.length;
        setActiveId(galleryItems[nextIndex].id);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (activeId === null) return;
        const currentIndex = galleryItems.findIndex(item => item.id === activeId);
        const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        setActiveId(galleryItems[prevIndex].id);
    };

    return (
        <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center p-4">
            {/* Background Grid Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Central Heading */}
            <div className={`relative z-10 transition-all duration-500 ${activeId ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
                <h2 className="text-[15vw] leading-none font-black text-white/5 select-none tracking-tighter mix-blend-overlay">
                    GALLERY
                </h2>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl md:text-6xl font-bold text-white tracking-[0.5em]">
                        MOMENTS
                    </span>
                </div>
            </div>

            {/* Exploding Grid */}
            <LayoutGroup>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-full max-w-7xl h-full p-8 grid grid-cols-2 md:grid-cols-4 gap-4 pointer-events-auto">
                        {galleryItems.map((item, index) => {
                            const isActive = activeId === item.id;
                            // Calculate scattered positions for entrance
                            // We start at center (50% 50%) and explode out to grid position

                            return (
                                <motion.div
                                    key={item.id}
                                    layoutId={`card-${item.id}`}
                                    onClick={() => setActiveId(item.id)}
                                    initial={{
                                        opacity: 0,
                                        scale: 0,
                                        x: 0, // start at center relative to final position? 
                                        // Actually, let's just scale up from center with a massive offset
                                        // A simpler "explosion" is just layout animation from a centered clump
                                    }}
                                    animate={
                                        isLoaded
                                            ? {
                                                opacity: activeId ? (isActive ? 1 : 0.3) : 1,
                                                scale: 1,
                                                filter: activeId && !isActive ? 'blur(8px)' : 'blur(0px)',
                                                transition: {
                                                    type: "spring",
                                                    bounce: 0.4,
                                                    duration: 0.8,
                                                    delay: index * 0.05
                                                }
                                            }
                                            : { opacity: 0, scale: 0 }
                                    }
                                    className={`relative ${item.span} cursor-pointer group rounded-sm overflow-hidden border border-white/5 bg-white/5`}
                                    style={{
                                        // Add verify slight random offset for organic feel even in grid
                                        transform: isLoaded ? `translate(${item.x}px, ${item.y}px)` : 'none'
                                    }}
                                >
                                    <motion.img
                                        src={item.src}
                                        alt=""
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="border border-white/50 text-white px-4 py-1 text-xs tracking-widest uppercase">
                                            View
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Lightbox Overlay */}
                <AnimatePresence>
                    {activeId && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
                            onClick={() => setActiveId(null)}
                        >
                            {/* Active Image */}
                            <motion.div
                                layoutId={`card-${activeId}`}
                                className="relative w-full max-w-5xl aspect-video bg-black rounded-sm overflow-hidden shadow-2xl border border-white/10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={galleryItems.find(i => i.id === activeId)?.src}
                                    alt=""
                                    className="w-full h-full object-contain bg-black"
                                />

                                {/* UI Controls */}
                                <div className="absolute top-4 right-4 z-20">
                                    <button
                                        onClick={() => setActiveId(null)}
                                        className="p-2 bg-black/50 hover:bg-white text-white hover:text-black rounded-full transition-colors border border-white/20"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                                    <button
                                        onClick={handlePrev}
                                        className="p-3 bg-black/50 hover:bg-white text-white hover:text-black rounded-full transition-colors border border-white/20 backdrop-blur-sm"
                                    >
                                        <FaChevronLeft />
                                    </button>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                    <button
                                        onClick={handleNext}
                                        className="p-3 bg-black/50 hover:bg-white text-white hover:text-black rounded-full transition-colors border border-white/20 backdrop-blur-sm"
                                    >
                                        <FaChevronRight />
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </LayoutGroup>
        </section>
    );
}
