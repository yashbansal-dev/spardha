'use client';

import Link from 'next/link';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Contact() {
    return (
        <section id="contact" className="section-padding bg-black relative border-t border-white/5">
            {/* Register CTA */}
            <div id="register" className="container mx-auto mb-20">
                <div className="glass-card p-12 text-center rounded-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 via-transparent to-neon-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Ready to Compete?</h2>
                    <p className="font-alice text-xl text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
                        registrations are open for all events. Secure your spot now and represent your college at Spardha.
                    </p>
                    <Link
                        href="/register"
                        className="relative z-10 inline-block px-10 py-4 bg-neon-cyan text-black font-bold text-lg rounded-full shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_40px_rgba(0,243,255,0.8)] hover:scale-105 transition-all"
                    >
                        REGISTER NOW
                    </Link>
                </div>
            </div>

            {/* Contact Content */}
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-4xl font-bold font-sans mb-8">Get in <span className="text-neon-cyan">Touch</span></h2>
                    <p className="font-alice text-gray-400 mb-8 leading-relaxed text-lg">
                        Have questions about events, accommodation, or registration? Reach out to us.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/5 rounded-lg text-neon-cyan"><FaMapMarkerAlt size={20} /></div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Address</h4>
                                <p className="font-alice text-gray-400 text-base">JK Lakshmipat University, Near Mahindra SEZ, P.O. Mahapura, Ajmer Road, Jaipur - 302026</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-lg text-neon-cyan"><FaEnvelope size={20} /></div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Email</h4>
                                <p className="font-alice text-gray-400 text-base">spardha@jklu.edu.in</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-lg text-neon-cyan"><FaPhone size={20} /></div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Phone</h4>
                                <p className="font-alice text-gray-400 text-base">+91 98765 43210</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-neon-cyan transition-colors" required />
                        <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-neon-cyan transition-colors" required />
                    </div>
                    <input type="text" placeholder="Subject" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-neon-cyan transition-colors" required />
                    <textarea rows={5} placeholder="Message" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-neon-cyan transition-colors" required></textarea>
                    <button type="submit" className="px-8 py-3 bg-white/10 text-white border border-white/20 font-bold rounded-lg hover:bg-neon-cyan hover:text-black hover:border-neon-cyan transition-all w-full">
                        SEND MESSAGE
                    </button>
                </form>
            </div>
        </section>
    );
}
