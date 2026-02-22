'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

/**
 * CustomCursor - Ultra High Performance Version
 * 
 * Performance optimizations for low-end machines:
 * 1. Event-Driven: No continuous requestAnimationFrame loop draining CPU/battery.
 * 2. Direct DOM Updates: Updates only fire when the mouse actually moves.
 * 3. Zero Style Recalculations: Replaced expensive getComputedStyle with DOM traversal (closest).
 * 4. Hardware Acceleration: translate3d forces GPU rendering.
 * 5. Instant Response: Removed lerping/smoothing which causes perceived "input lag".
 */
export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    
    // State refs
    const isVisible = useRef(false);
    const isHovering = useRef(false);

    useEffect(() => {
        // Device Detection
        const checkDevice = () => {
            const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
            const isLargeScreen = window.innerWidth > 768;

            if (hasFinePointer && isLargeScreen) {
                isVisible.current = true;
                if (cursorRef.current) cursorRef.current.style.opacity = '1';
            } else {
                isVisible.current = false;
                if (cursorRef.current) cursorRef.current.style.opacity = '0';
            }
        };

        checkDevice();
        window.addEventListener('resize', checkDevice, { passive: true });

        // Event Listeners
        const handleMouseMove = (e: MouseEvent) => {
            if (isVisible.current && cursorRef.current) {
                // Direct layout-free update on mouse move gives the lowest possible latency
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
        };

        const handleMouseDown = () => {
            if (innerRef.current) {
                innerRef.current.style.transform = 'scale(0.8) rotate(180deg)';
            }
        };

<<<<<<< HEAD
        const handleMouseUp = () => {
            if (innerRef.current) {
                innerRef.current.style.transform = isHovering.current ? 'scale(1.5)' : 'scale(1)';
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            if (!isVisible.current) return;
            const target = e.target as HTMLElement;
            
            // Ultra-fast check using closest() instead of expensive getComputedStyle()
            const interactive = !!(target && typeof target.closest === 'function' && 
                target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer'));
=======
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
            target.tagName === 'SELECT' ||
            target.tagName === 'TEXTAREA' ||
            target.tagName === 'LABEL' ||
            target.tagName === 'SUMMARY' ||
            target.getAttribute('role') === 'button' ||
            target.getAttribute('role') === 'link' ||
            target.closest('button') ||
            target.closest('a') ||
            target.closest('.interactive') ||
            target.closest('.cursor-pointer');
>>>>>>> 6c176b0 (finishing)

            isHovering.current = interactive;

            if (innerRef.current) {
                if (interactive) {
                    innerRef.current.style.transform = 'scale(1.5)';
                    innerRef.current.classList.add('cursor-hover-glow');
                } else {
                    innerRef.current.style.transform = 'scale(1)';
                    innerRef.current.classList.remove('cursor-hover-glow');
                }
            }
        };

        // Attach Passive Listeners
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mousedown', handleMouseDown, { passive: true });
        window.addEventListener('mouseup', handleMouseUp, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkDevice);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <style jsx global>{`
                @media (pointer: fine) and (min-width: 768px) {
                    body, a, button, input, select, textarea, summary, [role="button"], [role="link"], .cursor-pointer {
                        cursor: none !important;
                    }
                    /* Smooth CSS transitions for scale/rotate only */
                    .cursor-inner {
                        transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                    .cursor-glow {
                        transition: opacity 0.15s;
                    }
                }
            `}</style>

            <div
                ref={cursorRef}
                className="fixed top-0 left-0 z-[99999] pointer-events-none will-change-transform backface-hidden"
                style={{
                    opacity: 0, // Hidden until init
                    transform: 'translate3d(-100px, -100px, 0)',
                }}
            >
                <div
                    ref={innerRef}
                    className="cursor-inner relative w-6 h-6 flex items-center justify-center"
                >
                    <div className="cursor-glow absolute inset-0 bg-neon-cyan/40 rounded-full blur-md opacity-0 transition-opacity duration-300 pointer-events-none group-[.cursor-hover-glow]:opacity-100" />

                    <Image
                        src="/assets/shuttlecock_real.png"
                        alt="cursor"
                        width={32}
                        height={32}
                        priority
                        className="w-full h-full object-contain filter drop-shadow-md relative z-10"
                    />
                </div>
            </div>
        </>
    );
}
