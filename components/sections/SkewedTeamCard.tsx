'use client';

import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface TeamMember {
    name: string;
    role: string;
    image: string;
    phone?: string;
    email?: string;
}

const SkewedTeamCard = ({ member }: { member: TeamMember }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative flex items-center"
        >
            {/* Main Container - Skewed */}
            <div className="relative flex items-center w-full max-w-xl">

                {/* 1. Image Container (Left) */}
                <div className="relative z-20 w-48 h-48 -skew-x-[20deg] overflow-hidden border-l-4 border-neon-cyan/50 bg-black shadow-lg group-hover:border-neon-cyan transition-colors duration-300">
                    {/* Unskew the image inside */}
                    <div className="absolute inset-0 skew-x-[20deg] scale-125">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                </div>

                {/* 2. Content Block (Right) */}
                <div className="relative z-10 flex-1 -ml-12 pl-16 pr-8 py-6 bg-white/5 border-r-2 border-white/10 backdrop-blur-sm -skew-x-[20deg] hover:bg-white/10 transition-colors duration-300 min-h-[160px] flex flex-col justify-center">
                    {/* Unskew content text */}
                    <div className="skew-x-[20deg]">
                        <h3 className="text-2xl font-black italic uppercase text-white leading-none mb-1">
                            {member.name}
                        </h3>
                        <p className="text-neon-cyan font-mono text-sm tracking-widest uppercase mb-4">
                            {member.role}
                        </p>

                        {/* Contact Pills */}
                        <div className="flex flex-col gap-2">
                            {member.phone && (
                                <div className="flex items-center gap-3 group/phone">
                                    <div className="w-8 h-8 bg-[#020617] -skew-x-[20deg] flex items-center justify-center border border-white/20 group-hover/phone:border-neon-cyan transition-colors">
                                        <FaPhoneAlt className="text-neon-cyan text-xs skew-x-[20deg]" />
                                    </div>
                                    <span className="text-sm text-gray-400 font-mono tracking-wider group-hover/phone:text-white transition-colors">
                                        {member.phone}
                                    </span>
                                </div>
                            )}

                            {member.email && (
                                <div className="flex items-center gap-3 group/email">
                                    <div className="w-8 h-8 bg-[#020617] -skew-x-[20deg] flex items-center justify-center border border-white/20 group-hover/email:border-neon-cyan transition-colors">
                                        <FaEnvelope className="text-neon-cyan text-xs skew-x-[20deg]" />
                                    </div>
                                    <span className="text-sm text-gray-400 font-mono tracking-wider group-hover/email:text-white transition-colors truncate">
                                        {member.email}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-2 right-0 w-24 h-1 bg-neon-cyan/30 -skew-x-[20deg]"></div>
            </div>
        </motion.div>
    );
};

export default SkewedTeamCard;
