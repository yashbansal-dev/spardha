"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export default function ParallaxBackground() {
    const { scrollY } = useScroll();
    const [pageHeight, setPageHeight] = useState(1000);

    useEffect(() => {
        setPageHeight(document.body.scrollHeight - window.innerHeight);
    }, []);

    // Scroll parallax transforms
    // We map scrollY (0 to pageHeight) to a vertical displacement.
    // Negative values move UP distinctively slower than content (which moves up at 100% speed relative to viewport).

    // Layer 1: Deep Background (20% speed)
    const y1 = useTransform(scrollY, [0, pageHeight], [0, pageHeight * 0.2]);

    // Layer 2: Stadium Atmosphere (40% speed)
    const y2 = useTransform(scrollY, [0, pageHeight], [0, pageHeight * 0.4]);

    // Layer 3: Mid Energy (60% speed)
    const y3 = useTransform(scrollY, [0, pageHeight], [0, pageHeight * 0.6]);

    // Mouse parallax for extra depth
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 30, stiffness: 100 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY, innerWidth, innerHeight } = {
                clientX: e.clientX,
                clientY: e.clientY,
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight
            };
            const x = (clientX / innerWidth - 0.5) * 50; // Range -25 to 25
            const y = (clientY / innerHeight - 0.5) * 50;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#020617]">
            {/* Layer 1 - Deep Background (Stars & Gradient) */}
            <motion.div
                className="absolute inset-0 w-full h-[120%]"
                style={{ y: y1 }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#050b24] via-[#090518] to-[#020617]"></div>
                {/* Simulated Stars */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute top-0 left-0 w-full h-full opacity-60"
                    style={{
                        backgroundImage: 'radial-gradient(1px 1px at 50% 50%, #ffffff 1px, transparent 0)',
                        backgroundSize: '100px 100px'
                    }}
                ></div>
                <div className="absolute top-0 left-0 w-full h-full opacity-40"
                    style={{
                        backgroundImage: 'radial-gradient(1.5px 1.5px at 20% 30%, #a855f7 1px, transparent 0)',
                        backgroundSize: '250px 250px'
                    }}
                ></div>
            </motion.div>

            {/* Layer 2 - Sports Background (Main) */}
            <motion.div
                className="absolute inset-0 w-full h-[120%]"
                style={{ y: y2, x: springX }}
            >
                <div
                    className="absolute inset-0 w-full h-full bg-no-repeat"
                    style={{
                        backgroundImage: 'url("/assets/sports-bg-1.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        opacity: 0.8
                    }}
                ></div>

                {/* Fog/Mist Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
            </motion.div>

            {/* Layer 3 - Mid Energy (Floating Particles & Shapes) */}
            <motion.div
                className="absolute inset-0 w-full h-[120%]"
                style={{ y: y3, x: useTransform(springX, x => x * -1.5) }} // Parallax opposition
            >
                {/* Floating Shapes */}
                <div className="absolute top-[20%] left-[15%] w-32 h-32 bg-purple-600/10 rounded-full blur-[60px] animate-pulse"></div>
                <div className="absolute top-[60%] right-[20%] w-48 h-48 bg-cyan-600/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </motion.div>
        </div>
    );
}
