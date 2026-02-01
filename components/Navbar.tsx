'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    IoHome,
    IoCalendar,
    IoImages,
    IoPeople,
    IoTime,
    IoHeart,
    IoTicket
} from 'react-icons/io5';
import Dock from './Dock';

export default function Navbar() {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);

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
            label: 'History',
            onClick: () => router.push('/past-events')
        },
        {
            icon: <IoHeart size={22} />,
            label: 'Sponsors',
            onClick: () => router.push('/#sponsors')
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
            {/* Top Bar: Logo & Branding ONLY */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className={`fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center pointer-events-none transition-all duration-300 ${isScrolled ? 'bg-black/20 backdrop-blur-sm' : ''}`}
            >
                {/* Logo (Top Left) */}
                <div className="pointer-events-auto">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-neon-cyan/50 transition-all shadow-lg shadow-black/50">
                            <Image
                                src="/assets/images/jklu_logo.png"
                                alt="JKLU Logo"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg tracking-widest text-white leading-none">
                                SPARDHA
                            </span>
                            <span className="text-[10px] text-neon-cyan font-mono tracking-[0.2em] leading-none opacity-80">
                                FESTIVAL_2025
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Optional Top Right Element (e.g. User Profile or Status) can go here */}
            </motion.header>

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
