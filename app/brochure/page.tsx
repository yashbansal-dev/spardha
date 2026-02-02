'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaDownload, FaFilePdf, FaChevronRight } from 'react-icons/fa';

export default function BrochurePage() {
    return (
        <main className="min-h-screen bg-[#020617] text-white selection:bg-neon-cyan selection:text-black">
            <Navbar />

            <div className="pt-32 pb-20 container mx-auto px-6">

                {/* Header */}
                <div className="mb-24 flex flex-col items-center justify-center text-center">
                    <span className="font-sans text-neon-cyan uppercase tracking-[0.3em] text-sm mb-4">Official Documentation</span>
                    <h1 className="text-7xl md:text-[10rem] font-gang text-white uppercase leading-[0.8] tracking-tight mb-8">
                        INFO KIT
                    </h1>
                    <div className="h-1 w-24 bg-neon-cyan mb-8"></div>
                    <p className="font-sans text-gray-400 text-lg max-w-2xl text-center leading-relaxed">
                        Access the complete archive of Spardha 2026. Rulebooks, schedules, and essential guides for teams and participants.
                    </p>
                </div>

                {/* Downloads List - Bold & tabular */}
                <div className="max-w-5xl mx-auto mb-32 space-y-4">
                    {[
                        { title: 'SPARDHA 2026 BROCHURE', size: '12.5 MB', type: 'PDF' },
                        { title: 'OFFICIAL RULEBOOK', size: '4.2 MB', type: 'PDF' },
                        { title: 'EVENT SCHEDULE', size: '1.8 MB', type: 'PDF' },
                        { title: 'CAMPUS MAP', size: '2.4 MB', type: 'PNG' },
                    ].map((item, i) => (
                        <div key={i} className="group flex flex-col md:flex-row items-center justify-between bg-white/5 border border-white/5 p-8 hover:bg-white/10 hover:border-neon-cyan/50 transition-all duration-300">
                            <div className="flex items-center gap-6 w-full md:w-auto mb-4 md:mb-0">
                                <span className="font-gang text-4xl text-white/20 group-hover:text-neon-cyan transition-colors">0{i + 1}</span>
                                <div>
                                    <h3 className="font-sans text-2xl font-bold uppercase tracking-wider text-white group-hover:text-neon-cyan transition-colors">{item.title}</h3>
                                    <span className="font-mono text-xs text-gray-500">{item.type} • {item.size}</span>
                                </div>
                            </div>

                            <button className="font-sans font-bold text-sm uppercase tracking-widest flex items-center gap-3 text-white border border-white/20 px-8 py-3 rounded-full group-hover:bg-neon-cyan group-hover:border-neon-cyan group-hover:text-black transition-all">
                                Download <FaDownload />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Visual FAQ */}
                <div className="max-w-4xl mx-auto border-t border-white/10 pt-20">
                    <h2 className="text-5xl font-gang uppercase mb-12 text-center">Key Intel</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[
                            { q: "REGISTRATION?", a: "Register via the Events page or at the on-site desk with College ID." },
                            { q: "ACCOMMODATION?", a: "Available for outstation teams. See Brochure pg. 14 for rates." },
                            { q: "MULTIPLE SPORTS?", a: "Allowed if schedules don't clash. Manage your own timeline." },
                            { q: "ENTRY REQS?", a: "Valid College ID + Registration Receipt mandatory at Main Gate." }
                        ].map((faq, i) => (
                            <div key={i} className="space-y-4">
                                <h4 className="font-gang text-2xl text-neon-cyan tracking-wider flex items-center gap-2">
                                    <FaChevronRight className="text-sm" /> {faq.q}
                                </h4>
                                <p className="font-sans text-gray-400 leading-relaxed border-l border-white/10 pl-4">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <Footer />
        </main>
    );
}
