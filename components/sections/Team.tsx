'use client';

import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const teamMembers = [
    { name: "Aditya Verma", role: "Festival Head", image: null },
    { name: "Riya Sharma", role: "Sports Secretary", image: null },
    { name: "Karan Singh", role: "Event Coordinator", image: null },
    { name: "Sneha Gupta", role: "Marketing Lead", image: null },
    { name: "Rahul Mehta", role: "Tech Lead", image: null },
];

export default function Team() {
    return (
        <section id="team" className="section-padding bg-spardha-bg">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-sans mb-4">
                        Meet the <span className="text-neon-purple">Team</span>
                    </h2>
                    <p className="text-gray-400">The minds behind the magic of Spardha.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="group relative w-64 h-80 perspective-1000">
                            <div className="w-full h-full bg-white/5 border border-white/10 rounded-xl overflow-hidden relative transition-all duration-500 group-hover:scale-105 group-hover:neon-border flex flex-col items-center justify-center p-6 text-center">

                                {/* Avatar Placeholder */}
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 mb-6 flex items-center justify-center text-4xl text-white/20 font-bold shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(188,19,254,0.4)] transition-all">
                                    {member.name.charAt(0)}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-neon-cyan text-sm uppercase tracking-wider mb-4">{member.role}</p>

                                {/* Socials Overlay */}
                                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaLinkedin /></a>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaTwitter /></a>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaInstagram /></a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
