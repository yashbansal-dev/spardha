'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaTwitter } from 'react-icons/fa';

interface TeamMember {
    name: string;
    role: string;
    image: string;
    phone?: string;
    email?: string;

}

const HolographicTeamCard = ({ member }: { member: TeamMember }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position for 3D tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const defaultStats = [
        { label: "STR", value: Math.floor(Math.random() * 20) + 80 },
        { label: "INT", value: Math.floor(Math.random() * 20) + 80 },
        { label: "CHA", value: Math.floor(Math.random() * 20) + 80 },
    ];

    const statsToDisplay = member.stats || defaultStats;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-sm mx-auto h-[450px] perspective-1000"
        >
            {/* Card Body */}
            <div className="absolute inset-0 bg-[#0a0a0f]/90 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md">

                {/* Holographic Gradient Overlay */}
                <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(227, 114, 51, 0.1) 100%)`
                    }}
                ></div>

                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10 pointer-events-none z-10 bg-[length:4px_4px]"></div>

                {/* Image Section */}
                <div className="relative h-64 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10"></div>
                    <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700"
                        animate={{
                            scale: isHovered ? 1.1 : 1,
                            filter: isHovered ? "grayscale(0%) contrast(1.1)" : "grayscale(50%) contrast(1)",
                        }}
                    />

                    {/* Glitch Overlay on Hover (Simulated with CSS/Div) */}
                    {isHovered && (
                        <div className="absolute inset-0 bg-neon-cyan/20 mix-blend-overlay animate-pulse z-20 pointer-events-none"></div>
                    )}
                </div>

                {/* Content Section */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-z-20">
                    <motion.div
                        animate={{ y: isHovered ? -10 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <h3 className="text-2xl font-black italic uppercase text-white mb-1 tracking-wider drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]">
                            {member.name}
                        </h3>
                        <p className="text-neon-cyan font-mono text-sm tracking-[0.2em] uppercase mb-4 border-l-2 border-neon-cyan pl-2">
                            {member.role}
                        </p>
                    </motion.div>



                    {/* Social Links */}
                    <div className="flex justify-end gap-3 mt-2">
                        {member.phone && (
                            <a href={`tel:${member.phone}`} className="p-2 bg-white/5 hover:bg-neon-cyan hover:text-black rounded-full transition-colors text-white/70">
                                <FaPhoneAlt size={14} />
                            </a>
                        )}
                        {member.email && (
                            <a href={`mailto:${member.email}`} className="p-2 bg-white/5 hover:bg-neon-cyan hover:text-black rounded-full transition-colors text-white/70">
                                <FaEnvelope size={14} />
                            </a>
                        )}
                        <a href="#" className="p-2 bg-white/5 hover:bg-neon-cyan hover:text-black rounded-full transition-colors text-white/70">
                            <FaLinkedin size={14} />
                        </a>
                    </div>
                </div>

                {/* Decorative Corners */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-neon-cyan/50"></div>
                <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-neon-cyan/50"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-neon-cyan/50"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-neon-cyan/50"></div>
            </div>
        </motion.div>
    );
};

export default HolographicTeamCard;
