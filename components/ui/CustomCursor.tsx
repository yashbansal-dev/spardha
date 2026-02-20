'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';

export default function CustomCursor() {
    // Mouse Position
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth Spring Physics for Position - Optimized for snappiness
    const springConfig = { damping: 25, stiffness: 600, mass: 0.1, restDelta: 0.001 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    // Base rotation angle - 0deg (Natural Image Orientation)
    const BASE_ROTATION = 0;

    // Interaction States
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Interaction check ref
    const lastCheckRef = useRef<number>(0);

    // Mobile Detection & Init
    useEffect(() => {
        const checkDevice = () => {
            if (window.matchMedia('(pointer: fine)').matches && window.innerWidth > 768) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    // Memoized event handlers for better performance
    const updateMousePosition = useCallback((e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
    }, [cursorX, cursorY]);

    const handleMouseDown = useCallback(() => setIsClicking(true), []);
    const handleMouseUp = useCallback(() => setIsClicking(false), []);

    // Optimized hover detection - reduced throttle to 16ms (60fps) for instant feeling
    const handleMouseOver = useCallback((e: MouseEvent) => {
        const now = Date.now();
        if (now - lastCheckRef.current < 16) return;
        lastCheckRef.current = now;

        const target = e.target as HTMLElement;
        // Optimized interactive element check
        const isInteractive =
            target.tagName === 'BUTTON' ||
            target.tagName === 'A' ||
            target.tagName === 'INPUT' ||
            target.tagName === 'LABEL' ||
            target.closest('button') ||
            target.closest('a') ||
            target.closest('.interactive') ||
            target.closest('.cursor-pointer');

        setIsHovering(!!isInteractive);
    }, []);

    // Mouse Movement Logic
    useEffect(() => {
        if (!isVisible) return;

        // Passive listeners for better scroll performance
        window.addEventListener('mousemove', updateMousePosition, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isVisible, updateMousePosition, handleMouseDown, handleMouseUp, handleMouseOver]);

    if (!isVisible) return null;

    return (
        <>
            <style jsx global>{`
                @media (pointer: fine) and (min-width: 768px) {
                    body, a, button, input, select, textarea, .cursor-pointer {
                        cursor: none !important;
                    }
                }
            `}</style>

            <motion.div
                className="fixed top-0 left-0 z-[2147483647] pointer-events-none"
                style={{
                    x: springX,
                    y: springY,
                    willChange: 'transform',
                }}
            >
                <motion.div
                    className="relative w-6 h-6"
                    style={{
                        rotate: BASE_ROTATION,
                        willChange: 'transform',
                    }}
                    animate={{
                        scale: isClicking ? 0.9 : isHovering ? 1.4 : 1,
                    }}
                    transition={{
                        scale: { type: "spring", stiffness: 400, damping: 25 },
                    }}
                >
                    {/* Click Spin Animation (Separate from physics rotation) */}
                    <motion.div
                        animate={{ rotate: isClicking ? 360 : 0 }}
                        transition={{ duration: 0.2, ease: "backOut" }}
                        className="w-full h-full"
                        style={{ willChange: 'transform' }}
                    >
                        {/* Hover Glow */}
                        <motion.div
                            className="absolute inset-0 bg-cyan-400/30 rounded-full blur-md"
                            animate={{
                                opacity: isHovering ? 1 : 0,
                                scale: isHovering ? 1.5 : 0.5
                            }}
                            transition={{ duration: 0.2 }}
                            style={{ willChange: 'opacity, transform' }}
                        />

                        {/* Realistic Shuttlecock Image */}
                        <div className="relative w-full h-full drop-shadow-xl">
                            <Image
                                src="/assets/shuttlecock_real.png"
                                alt="Shuttlecock Cursor"
                                width={24}
                                height={24}
                                className="w-full h-full object-contain filter drop-shadow-lg"
                                priority
                                unoptimized
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </>
    );
}
