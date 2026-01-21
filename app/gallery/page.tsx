'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const images2024 = [
    "https://images.unsplash.com/photo-1574629810360-7efbbe4384d4?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=60"
];

const images2023 = [
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&auto=format&fit=crop&q=60"
];

export default function Gallery() {
    const [activeYear, setActiveYear] = useState<'2024' | '2023'>('2024');
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = activeYear === '2024' ? images2024 : images2023;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const getSlidePosition = (index: number) => {
        const diff = (index - currentIndex + images.length) % images.length;
        if (diff === 0) return 'center';
        if (diff === 1) return 'right';
        if (diff === images.length - 1) return 'left';
        return 'hidden';
    };

    return (
        <main className="min-h-screen bg-black relative overflow-hidden flex flex-col justify-between">
            <Navbar />

            {/* Starfield Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80"></div>
                <div className="stars"></div>
            </div>

            <section className="relative z-10 flex-grow flex flex-col items-center justify-center pt-24 pb-12">
                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold font-sans text-white mb-8 tracking-widest uppercase">
                    Gallery
                </h1>

                {/* Year Toggle */}
                <div className="flex gap-4 mb-16 relative">
                    <div className="absolute inset-0 bg-white/5 rounded-full blur-md"></div>
                    {['2024', '2023'].map((year) => (
                        <button
                            key={year}
                            onClick={() => setActiveYear(year as '2024' | '2023')}
                            className={`px-8 py-2 rounded-full font-bold transition-all relative z-10
                        ${activeYear === year
                                    ? 'bg-neon-cyan text-black shadow-[0_0_15px_#00f3ff]'
                                    : 'bg-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>

                {/* 3D Carousel */}
                <div className="relative w-full max-w-5xl h-[400px] flex items-center justify-center perspective-1000">
                    {images.map((src, index) => {
                        const position = getSlidePosition(index);

                        let x = 0;
                        let scale = 0.8;
                        let zIndex = 0;
                        let opacity = 0;
                        let rotateY = 0;

                        if (position === 'center') {
                            x = 0;
                            scale = 1;
                            zIndex = 10;
                            opacity = 1;
                            rotateY = 0;
                        } else if (position === 'left') {
                            x = -250;
                            scale = 0.8;
                            zIndex = 5;
                            opacity = 0.7;
                            rotateY = 15;
                        } else if (position === 'right') {
                            x = 250;
                            scale = 0.8;
                            zIndex = 5;
                            opacity = 0.7;
                            rotateY = -15;
                        }

                        return (
                            <motion.div
                                key={`${activeYear}-${index}`}
                                initial={false}
                                animate={{ x, scale, zIndex, opacity, rotateY }}
                                transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 20 }}
                                className="absolute w-[300px] md:w-[400px] h-[500px] rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl origin-bottom"
                                style={{ display: position === 'hidden' ? 'none' : 'block' }}
                            >
                                <img src={src} alt="Gallery" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20"></div>
                            </motion.div>
                        );
                    })}

                    {/* Controls */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-8 md:left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all z-20"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-8 md:right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black hover:border-white transition-all z-20"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
