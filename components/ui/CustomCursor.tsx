'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';

export default function CustomCursor() {
    // Mouse Position
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth Spring Physics for Position
    const springConfig = { damping: 25, stiffness: 300, mass: 0.15 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    // Base rotation angle - 0deg (Natural Image Orientation)
    const BASE_ROTATION = 0;

    // Interaction States
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

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

    // Mouse Movement Logic
    useEffect(() => {
        if (!isVisible) return;

        const updateMousePosition = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check for interactive elements
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.tagName === 'INPUT' ||
                target.closest('button') ||
                target.closest('a') ||
                target.closest('.interactive') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(!!isInteractive);
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY, isVisible]);

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
                className="fixed top-0 left-0 z-[2147483647] pointer-events-none will-change-transform"
                style={{
                    x: springX,
                    y: springY,
                }}
            >
                <motion.div
                    className="relative w-10 h-10"
                    style={{ rotate: BASE_ROTATION }} // Fixed rotation
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
                    >
                        {/* Hover Glow */}
                        <motion.div
                            className="absolute inset-0 bg-cyan-400/30 rounded-full blur-md"
                            animate={{
                                opacity: isHovering ? 1 : 0,
                                scale: isHovering ? 1.5 : 0.5
                            }}
                            transition={{ duration: 0.2 }}
                        />

                        {/* Realistic Shuttlecock Image */}
                        <div className="relative w-full h-full drop-shadow-xl">
                            <Image
                                src="/assets/shuttlecock_real.png"
                                alt="Shuttlecock Cursor"
                                width={40}
                                height={40}
                                className="w-full h-full object-contain filter drop-shadow-lg"
                                priority
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </>
    );
}
