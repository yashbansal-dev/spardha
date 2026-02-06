'use client';

import { motion } from 'framer-motion';
import { FaLinkedinIn, FaEnvelope, FaPhone, FaDna } from 'react-icons/fa';
import Image from 'next/image';

interface TeamMember {
    name: string;
    role: string;
    image: string;
    phone?: string;
    email?: string;
    linkedin?: string;
}

const CyberAgentCard = ({ member, index }: { member: TeamMember, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative w-full max-w-[350px] mx-auto"
        >
            {/* --- CARD FRAME (CYBER SHAPE) --- */}
            <div className="relative bg-[#050505] border border-white/10 hover:border-neon-cyan/50 transition-all duration-500 overflow-hidden h-[450px]">

                {/* Decoration: Corner Markers */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-cyan/30 group-hover:border-neon-cyan transition-colors z-20"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-cyan/30 group-hover:border-neon-cyan transition-colors z-20"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-cyan/30 group-hover:border-neon-cyan transition-colors z-20"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-cyan/30 group-hover:border-neon-cyan transition-colors z-20"></div>

                {/* --- IMAGE SEGMENT (Top 70%) --- */}
                <div className="relative h-[70%] overflow-hidden">
                    {/* Filter Overlay */}
                    <div className="absolute inset-0 bg-neon-cyan/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10"></div>

                    {/* Scanline */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent z-20 h-[10px] w-full pointer-events-none"
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                    />

                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                    />
                </div>

                {/* --- DATA SEGMENT (Bottom 30%) --- */}
                <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/10 p-6 flex flex-col justify-between group-hover:h-[45%] transition-all duration-300 z-20">

                    {/* Header Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono text-neon-cyan/70 bg-neon-cyan/10 px-1 rounded">ID: {Math.floor(Math.random() * 9000) + 1000}</span>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-neon-cyan/30 to-transparent"></div>
                        </div>
                        <h3 className="text-2xl font-bold text-white uppercase tracking-wider font-gang mb-1">{member.name}</h3>
                        <p className="text-sm font-mono text-gray-400 uppercase tracking-widest">{member.role}</p>
                    </div>

                    {/* Hidden Details (Reveal on Hover) */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center justify-between mt-4">
                        <div className="flex gap-3">
                            {member.linkedin && (
                                <a href={member.linkedin} className="text-gray-400 hover:text-neon-cyan transition-colors"><FaLinkedinIn /></a>
                            )}
                            {member.email && (
                                <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-neon-cyan transition-colors"><FaEnvelope /></a>
                            )}
                            {member.phone && (
                                <a href={`tel:${member.phone}`} className="text-gray-400 hover:text-neon-cyan transition-colors"><FaPhone /></a>
                            )}
                        </div>
                        <div className="text-neon-cyan animate-pulse">
                            <FaDna />
                        </div>
                    </div>
                </div>

                {/* --- HOVER GLITCH ELEMENTS --- */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100 z-30"></div>
            </div>
        </motion.div>
    );
};

export default CyberAgentCard;
