'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { BsLightningChargeFill } from 'react-icons/bs';

const navLinks = [
    { name: 'Home', href: '/' },

    { name: 'Gallery', href: '/gallery' },
    { name: 'Team', href: '/team' },
    { name: 'Past Events', href: '/past-events' },
    { name: 'Sponsors', href: '#sponsors' }, // Assuming this targeted ID exists on home page or similar
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none`}
            >
                <div
                    className={`
                        pointer-events-auto
                        backdrop-blur-md border border-white/10 rounded-full px-8 py-3
                        flex items-center gap-16
                        transition-all duration-300
                        ${isScrolled ? 'bg-[#020617]/80 shadow-[0_0_20px_rgba(0,243,255,0.1)]' : 'bg-transparent border-transparent'}
                    `}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-8 h-8 flex items-center justify-center bg-gradient-to-br from-neon-cyan to-neon-blue rounded-lg overflow-hidden group-hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-shadow">
                            <BsLightningChargeFill className="text-white text-lg" />
                        </div>
                        <span className="font-bold text-xl tracking-wider text-white">
                            SPARDHA
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`
                                        relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
                                        ${isActive ? 'text-neon-cyan' : 'text-gray-300 hover:text-white'}
                                    `}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-white/10 rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Register Button */}
                    <Link
                        href="/#register"
                        className="hidden md:flex items-center gap-2 px-6 py-2 bg-white text-black font-bold rounded-full transition-all hover:bg-gradient-to-r hover:from-neon-cyan hover:to-neon-purple hover:text-white hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:scale-105 ml-4"
                    >
                        Register Now
                    </Link>



                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-white p-2"
                    >
                        {isMobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt4 size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-[#020617] pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 * i }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-2xl font-bold text-white hover:text-neon-cyan transition-colors block border-b border-white/5 pb-4"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
