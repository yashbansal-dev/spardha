'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useState } from 'react';

export default function ContactContent() {
    return (
        <main className="min-h-screen bg-[#020617] text-white selection:bg-neon-cyan selection:text-black">
            <Navbar />

            <div className="pt-32 pb-20 container mx-auto px-6">

                {/* Header - Using Gang Font Dominantly */}
                <div className="mb-12 md:mb-24 text-center">
                    <h1 className="text-5xl md:text-9xl font-gang text-white uppercase mb-6 tracking-wider">
                        GET IN TOUCH
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto tracking-wide">
                        WE ARE HERE TO HELP YOU NAVIGATE THE ARENA.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto items-start">

                    {/* Contact Info - Minimalist High Contrast */}
                    <div className="space-y-16">
                        <div className="group">
                            <h3 className="text-3xl font-gang uppercase text-neon-cyan mb-4 tracking-widest">General Inquiries</h3>
                            <a href="mailto:spardha@jklu.edu.in" className="text-2xl md:text-5xl font-bold text-white group-hover:text-neon-cyan transition-colors block break-all">
                                spardha@jklu.edu.in
                            </a>
                        </div>

                        <div className="group">
                            <h3 className="text-3xl font-gang uppercase text-neon-cyan mb-4 tracking-widest">Emergency Line</h3>
                            <a href="tel:+91 8619011601" className="text-2xl md:text-5xl font-bold text-white group-hover:text-neon-cyan transition-colors block">
                                +91 8619011601
                            </a>
                        </div>

                        <div className="group border-t border-white/10 pt-12">
                            <h3 className="text-3xl font-gang uppercase text-neon-cyan mb-6 tracking-widest">Headquarters</h3>
                            <a
                                href="https://www.google.com/maps/place/JK+Lakshmipat+University/@26.836603,75.650304,16z/data=!4m6!3m5!1s0x396c4af4fe68f403:0x3bf05f95df22b8c4!8m2!3d26.8366033!4d75.6503042!16s%2Fm%2F0cp46q7?hl=en&entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl text-gray-400 not-italic leading-relaxed block hover:text-neon-cyan transition-colors"
                            >
                                JK Lakshmipat University,<br />
                                Mahapura, Ajmer Road,<br />
                                Jaipur, Rajasthan.
                            </a>
                        </div>
                    </div>

                    {/* Contact Form - Stark & Bold */}
                    <div className="bg-white/5 p-6 md:p-16 rounded-[2px] border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/10 blur-[50px] pointer-events-none"></div>

                        <h3 className="text-4xl font-gang uppercase mb-12 tracking-widest">Send Message</h3>

                        <ContactForm />
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    );
}

function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('submitting');

        const form = e.currentTarget;
        const data = new FormData(form);

        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyXuhOP19oLz7nRsaGbW59ZGR7jfRx-UVvjIL68rD0SnvkbwT7p4Y0ppr15HWup-2Uq/exec";

        try {
            if (SCRIPT_URL.includes("REPLACE")) {
                await new Promise(r => setTimeout(r, 1000));
                console.log("Simulating submission. Data:", Object.fromEntries(data));
            } else {
                const params = new URLSearchParams();
                for (const [key, value] of data.entries()) {
                    params.append(key, value.toString());
                }

                await fetch(SCRIPT_URL, {
                    method: 'POST',
                    body: params,
                    mode: 'no-cors'
                });
            }
            setStatus('success');
            form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    }

    if (status === 'success') {
        return (
            <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                <div className="inline-block p-4 rounded-full bg-neon-cyan/20 text-neon-cyan mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-2xl font-bold font-gang text-white mb-2">TRANSMISSION RECEIVED</h3>
                <p className="text-gray-400">Our team is decrypting your message. Stand by for response.</p>
                <button onClick={() => setStatus('idle')} className="mt-8 text-neon-cyan hover:text-white underline underline-offset-4 decoration-neon-cyan/50">
                    Send Another Transmission
                </button>
            </div>
        );
    }

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="group">
                <label className="block text-xs uppercase tracking-[0.2em] text-neon-cyan mb-2">Your Identity</label>
                <input required name="name" type="text" className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:border-neon-cyan outline-none transition-colors placeholder:text-white/20" placeholder="Name or Team Name" />
            </div>

            <div className="group">
                <label className="block text-xs uppercase tracking-[0.2em] text-neon-cyan mb-2">Communication Channel</label>
                <input required name="email" type="email" className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:border-neon-cyan outline-none transition-colors placeholder:text-white/20" placeholder="Email Address" />
            </div>

            <div className="group">
                <label className="block text-xs uppercase tracking-[0.2em] text-neon-cyan mb-2">Transmission</label>
                <textarea required name="message" className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:border-neon-cyan outline-none transition-colors h-32 resize-none placeholder:text-white/20" placeholder="Enter your message..."></textarea>
            </div>

            <button disabled={status === 'submitting'} className="mt-8 px-12 py-5 bg-white text-black font-gang text-xl uppercase tracking-widest hover:bg-neon-cyan hover:text-white transition-all w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
                {status === 'submitting' ? 'Transmitting...' : 'Transmit'}
            </button>

            {status === 'error' && (
                <p className="text-red-500 text-sm mt-4">
                    Transmission failed. Please check your connection or contact via direct link.
                </p>
            )}
        </form>
    );
}
