'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CinematicLogo() {
    return (
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">

            {/* Container for Logo + Effects */}
            <div className="relative w-full h-full transform transition-transform duration-500 hover:scale-105">

                {/* 
            Title: Dynamic Colored Drop Shadow
            Description: Creates the "halo" glow behind the logo that changes color.
        */}
                <motion.div
                    className="absolute inset-0 z-0 opacity-60 blur-[20px]"
                    animate={{
                        background: [
                            "radial-gradient(circle, rgba(255,165,0,0.6) 0%, transparent 70%)", // Orange
                            "radial-gradient(circle, rgba(255,215,0,0.6) 0%, transparent 70%)", // Gold
                            "radial-gradient(circle, rgba(255,69,0,0.6) 0%, transparent 70%)",  // Red-Orange
                            "radial-gradient(circle, rgba(255,165,0,0.6) 0%, transparent 70%)", // Back to Orange
                        ]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* The Base Logo Image */}
                <Image
                    src="/assets/images/spardha_logo.png"
                    alt="Spardha Logo"
                    width={500}
                    height={500}
                    className="relative z-10 w-full h-full object-contain"
                    priority
                />

                {/* 
            Title: Internal Color Overlay
            Description: Uses mask-image to overlay a moving gradient ON TOP of the logo content.
            This gives the "logo changing color" effect.
        */}
                <div
                    className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
                    style={{
                        maskImage: "url('/assets/images/spardha_logo.png')",
                        WebkitMaskImage: "url('/assets/images/spardha_logo.png')",
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center"
                    }}
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600"
                        animate={{
                            filter: [
                                "hue-rotate(0deg) brightness(1.2)",
                                "hue-rotate(30deg) brightness(1.5)",
                                "hue-rotate(0deg) brightness(1.2)"
                            ],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>
            </div>

        </div>
    );
}
