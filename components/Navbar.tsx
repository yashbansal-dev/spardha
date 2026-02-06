'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    IoHome,
    IoCalendar,
    IoImages,
    IoPeople,
    IoTime,
    IoHeart,
    IoTicket,
    IoCart
} from 'react-icons/io5';
import Dock from './Dock';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const { items, toggleCart } = useCart();

    // Check if we're on the events page
    const isEventsPage = pathname === '/events';
    const isGalleryPage = pathname === '/gallery';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Dock Items Configuration
    const dockItems = [
        {
            icon: <IoHome size={22} />,
            label: 'Home',
            onClick: () => router.push('/')
        },
        {
            icon: <IoCalendar size={22} />,
            label: 'Events',
            onClick: () => router.push('/events')
        },
        {
            icon: <IoImages size={22} />,
            label: 'Gallery',
            onClick: () => router.push('/gallery')
        },
        {
            icon: <IoPeople size={22} />,
            label: 'Team',
            onClick: () => router.push('/team')
        },
        {
            icon: <IoTime size={22} />,
            label: 'Schedule',
            onClick: () => router.push('/schedule')
        },

        {
            icon: <IoTicket size={22} className="text-neon-cyan" />,
            label: 'Register',
            onClick: () => router.push('/register'),
            className: 'border-neon-cyan/50 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
        },
    ];

    return (
        <>
            {/* Top Bar: Logo & Branding ONLY - Hidden on Gallery Page */}
            {!isGalleryPage && (
                <motion.header
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className={`${isEventsPage ? 'fixed' : 'absolute'} top-0 left-0 right-0 z-[100] px-6 py-4 flex justify-between items-center pointer-events-none transition-all duration-300 ${isScrolled ? 'bg-black/20' : ''}`}
                >
                    {/* Logo (Top Left) */}
                    <div className="pointer-events-auto">
                        <Link href="/" className="flex items-center gap-3 group ml-6">
                            <div className="relative w-28 h-28 transition-all group-hover:scale-110 -mt-12">
                                <Image
                                    src="/assets/images/jklu_logo.png?v=3"
                                    alt="JKLU Logo"
                                    width={112}
                                    height={112}
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-bold text-lg tracking-widest text-white leading-none font-gang font-restore">
                                    SPARDHA
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Top Right: Cart Trigger */}
                    <div className="pointer-events-auto">
                        <button
                            onClick={toggleCart}
                            className="relative p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all mr-6 group"
                        >
                            <IoCart className="text-white text-xl" />
                            {items.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-neon-cyan text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {items.length}
                                </span>
                            )}
                        </button>
                    </div>
                </motion.header>
            )}

            {/* Bottom Dock: Main Navigation */}
            <Dock
                items={dockItems}
                panelHeight={68}
                baseItemSize={48}
                magnification={80}
            />
        </>
    );
}
