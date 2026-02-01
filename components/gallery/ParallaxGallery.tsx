'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5';

const IMAGES = [
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
    'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?w=1200&q=80',
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=80',
    'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=1200&q=80',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80',
    'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&q=80',
    'https://images.unsplash.com/photo-1585699324551-f60895011091?w=1200&q=80',
    'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80',
    'https://images.unsplash.com/photo-1519861531473-920026393112?w=1200&q=80',
    'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=1200&q=80',
    'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=1200&q=80'
];

// Define positions and parallax speeds for the scattered images
const IMAGE_CONFIGS = [
    { top: '10%', left: '5%', width: '25%', speed: -100, delay: 0 },
    { top: '15%', left: '70%', width: '20%', speed: 150, delay: 0.1 },
    { top: '35%', left: '15%', width: '22%', speed: -50, delay: 0.2 },
    { top: '40%', left: '65%', width: '28%', speed: 100, delay: 0.3 },
    { top: '60%', left: '10%', width: '24%', speed: -150, delay: 0.4 },
    { top: '65%', left: '75%', width: '20%', speed: 80, delay: 0.5 },
    { top: '85%', left: '20%', width: '26%', speed: -120, delay: 0.6 },
    { top: '80%', left: '60%', width: '22%', speed: 130, delay: 0.7 },
    { top: '25%', left: '35%', width: '18%', speed: 60, delay: 0.8 },
    { top: '55%', left: '40%', width: '20%', speed: -70, delay: 0.9 },
    { top: '12%', left: '45%', width: '15%', speed: 110, delay: 1.0 },
    { top: '88%', left: '42%', width: '20%', speed: -90, delay: 1.1 },
];

export default function ParallaxGallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const gridY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    useEffect(() => {
        if (selectedImage !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedImage]);

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImage !== null) {
            setSelectedImage((selectedImage + 1) % IMAGES.length);
        }
    };

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImage !== null) {
            setSelectedImage((selectedImage - 1 + IMAGES.length) % IMAGES.length);
        }
    };

    return (
        <section ref={sectionRef} className="relative w-full min-h-[250vh] bg-black overflow-hidden flex flex-col items-center">

            {/* Immersive Background */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 z-0 opacity-30 grayscale pointer-events-none"
            >
                <img
                    src="/assets/gallery-bg.png"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Triangular Grid Overlay */}
            <motion.div
                style={{ y: gridY }}
                className="absolute inset-0 z-1 opacity-20 pointer-events-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.2 }}
                transition={{ duration: 1.5 }}
            >
                <div className="w-full h-full bg-[url('/assets/neon-grid-bg.png')] bg-repeat bg-[length:100px_100px]"></div>
            </motion.div>

            {/* Neon Glow Vignette */}
            <div className="absolute inset-0 z-2 bg-gradient-to-b from-black via-transparent to-black pointer-events-none"></div>
            <div className="absolute inset-0 z-2 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-cyan-500/5 rounded-full blur-[200px] pointer-events-none animate-pulse"></div>

            {/* Central Title */}
            <div className="sticky top-1/2 z-10 -translate-y-1/2 pointer-events-none text-center px-4">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-7xl md:text-9xl font-black text-white/10 uppercase tracking-[0.3em] select-none"
                >
                    Gallery
                </motion.h2>
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100px' }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-[2px] bg-cyan-400 mx-auto mt-4 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                ></motion.div>
            </div>

            {/* Scattered Images Container */}
            <div className="relative z-5 w-full h-full max-w-7xl mx-auto py-[20vh]">
                {IMAGE_CONFIGS.map((config, index) => {
                    const yOffset = useTransform(scrollYProgress, [0, 1], [0, config.speed]);

                    return (
                        <motion.div
                            key={index}
                            style={{
                                top: config.top,
                                left: config.left,
                                width: config.width,
                                y: yOffset
                            }}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: config.delay, duration: 0.8 }}
                            className="absolute cursor-pointer group"
                            onClick={() => setSelectedImage(index)}
                        >
                            <div className="relative overflow-hidden rounded-sm border border-white/10 bg-gray-900/50 shadow-2xl aspect-[4/3] group-hover:border-cyan-400/50 transition-colors duration-500">
                                <img
                                    src={IMAGES[index]}
                                    alt={`Gallery item ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-100"
                                />
                                <div className="absolute inset-0 bg-neon-cyan/0 group-hover:bg-neon-cyan/5 transition-colors duration-500"></div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
                            onClick={() => setSelectedImage(null)}
                        >
                            <IoClose size={40} />
                        </button>

                        <button
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-cyan-400 transition-colors z-[110]"
                            onClick={handlePrev}
                        >
                            <IoChevronBack size={50} />
                        </button>

                        <button
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-cyan-400 transition-colors z-[110]"
                            onClick={handleNext}
                        >
                            <IoChevronForward size={50} />
                        </button>

                        <motion.div
                            key={selectedImage}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative max-w-6xl w-full h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={IMAGES[selectedImage]}
                                alt="Gallery Preview"
                                className="max-w-full max-h-full object-contain shadow-2xl"
                            />

                            {/* Technical Details Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
                                    Capture No. {String(selectedImage + 1).padStart(2, '0')}
                                </p>
                                <h3 className="text-white text-xl font-light mt-1">Spardha Moments</h3>
                            </div>
                        </motion.div>

                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 font-mono text-xs uppercase tracking-[0.5em]">
                            {selectedImage + 1} / {IMAGES.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

