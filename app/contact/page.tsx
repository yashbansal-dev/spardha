'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#020617] text-white selection:bg-neon-cyan selection:text-black">
            <Navbar />

            <div className="pt-32 pb-20 container mx-auto px-6">

                {/* Header - Using Gang Font Dominantly */}
                <div className="mb-24 text-center">
                    <h1 className="text-7xl md:text-9xl font-gang text-white uppercase mb-6 tracking-wider">
                        GET IN TOUCH
                    </h1>
                    <p className="font-sans text-gray-400 text-lg max-w-xl mx-auto tracking-wide">
                        WE ARE HERE TO HELP YOU NAVIGATE THE ARENA.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-7xl mx-auto items-start">

                    {/* Contact Info - Minimalist High Contrast */}
                    <div className="space-y-16">
                        <div className="group">
                            <h3 className="text-3xl font-gang uppercase text-neon-cyan mb-4 tracking-widest">General Inquiries</h3>
                            <a href="mailto:spardha@jklu.edu.in" className="font-sans text-4xl md:text-5xl font-bold text-white group-hover:text-neon-cyan transition-colors block">
                                spardha@jklu.edu.in
                            </a>
                        </div>

                        <div className="group">
                            <h3 className="text-3xl font-gang uppercase text-neon-cyan mb-4 tracking-widest">Emergency Line</h3>
                            <a href="tel:+919876543210" className="font-sans text-4xl md:text-5xl font-bold text-white group-hover:text-neon-cyan transition-colors block">
                                +91 98765 43210
                            </a>
                        </div>

                        <div className="group border-t border-white/10 pt-12">
                            <h3 className="text-3xl font-gang uppercase text-neon-cyan mb-6 tracking-widest">Headquarters</h3>
                            <address className="font-sans text-xl text-gray-400 not-italic leading-relaxed">
                                JK Lakshmipat University,<br />
                                Mahapura, Ajmer Road,<br />
                                Jaipur, Rajasthan.
                            </address>
                        </div>
                    </div>

                    {/* Contact Form - Stark & Bold */}
                    <div className="bg-white/5 p-10 md:p-16 rounded-[2px] border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/10 blur-[50px] pointer-events-none"></div>

                        <h3 className="text-4xl font-gang uppercase mb-12 tracking-widest">Send Message</h3>

                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="group">
                                <label className="block text-xs font-sans uppercase tracking-[0.2em] text-neon-cyan mb-2">Your Identity</label>
                                <input type="text" className="w-full bg-transparent border-b border-white/20 py-4 text-xl font-sans text-white focus:border-neon-cyan outline-none transition-colors placeholder:text-white/20" placeholder="Name or Team Name" />
                            </div>

                            <div className="group">
                                <label className="block text-xs font-sans uppercase tracking-[0.2em] text-neon-cyan mb-2">Communication Channel</label>
                                <input type="email" className="w-full bg-transparent border-b border-white/20 py-4 text-xl font-sans text-white focus:border-neon-cyan outline-none transition-colors placeholder:text-white/20" placeholder="Email Address" />
                            </div>

                            <div className="group">
                                <label className="block text-xs font-sans uppercase tracking-[0.2em] text-neon-cyan mb-2">Transmission</label>
                                <textarea className="w-full bg-transparent border-b border-white/20 py-4 text-xl font-sans text-white focus:border-neon-cyan outline-none transition-colors h-32 resize-none placeholder:text-white/20" placeholder="Enter your message..."></textarea>
                            </div>

                            <button className="mt-8 px-12 py-5 bg-white text-black font-gang text-xl uppercase tracking-widest hover:bg-neon-cyan hover:text-white transition-all w-full md:w-auto">
                                Transmit
                            </button>
                        </form>
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    );
}
