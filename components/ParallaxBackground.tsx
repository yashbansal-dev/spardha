"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxBackground() {
    // This component is now only for GLOBAL atmosphere on other pages or deeper sections.
    // The Hero section handles its own cinematic background.

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#020617] pointer-events-none">
            {/* Simple subtle noise/stars for the rest of the app */}
            <div className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")'
                }}>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]"></div>
        </div>
    );
}
