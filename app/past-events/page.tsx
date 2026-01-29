'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';


const events = [
    {
        title: "Pronites with Local Train",
        description: "An electrifying night with India's premier rock band. The crowd roared to the tunes of 'Choo Lo' and 'Dil Mere'.",
        image: "https://images.unsplash.com/photo-1470229722913-7ea051c24efc?w=800&auto=format&fit=crop&q=60"
    },
    {
        title: "Sunburn Campus",
        description: "The biggest EDM festival made its way to JKLU. Beats dropping, hearts pumping, and a night to remember.",
        image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=800&auto=format&fit=crop&q=60"
    },
    {
        title: "Standup with Samay Raina",
        description: "Laughter echoed through the campus as Samay Raina took the stage. A perfect blend of humor and chess references.",
        image: "https://images.unsplash.com/photo-1585699324551-f60895011091?w=800&auto=format&fit=crop&q=60"
    }
];

export default function PastEvents() {
    return (
        <main className="min-h-screen bg-black text-white p-0 relative">
            <Navbar />

            {/* Background Particles/Stars */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none"></div>

            <section className="pt-32 pb-20 container mx-auto px-4 md:px-12">
                <h1 className="text-4xl md:text-6xl font-bold mb-20 text-center tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                    Our Past Events
                </h1>

                <div className="space-y-24">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 group`}
                        >
                            {/* Text Content */}
                            <div className="flex-1 relative">
                                <div className="absolute -inset-4 bg-neon-blue/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10 p-8 border-l-4 border-neon-cyan bg-black/50 backdrop-blur-sm shadow-[0_0_30px_rgba(0,102,255,0.1)] group-hover:shadow-[0_0_50px_rgba(0,102,255,0.3)] transition-all duration-300 rounded-r-xl">
                                    <h2 className="text-3xl font-bold mb-4 text-white group-hover:text-neon-cyan transition-colors">{event.title}</h2>
                                    <p className="text-gray-400 leading-relaxed text-lg">
                                        {event.description}
                                    </p>
                                </div>
                            </div>

                            {/* Image Poster */}
                            <div className="flex-1 w-full max-w-[600px]">
                                <div className="relative rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,102,255,0.3)] group-hover:shadow-[0_0_40px_rgba(0,102,255,0.6)] transition-all duration-500 border border-neon-blue/30 transform group-hover:scale-[1.02]">
                                    <div className="absolute inset-0 bg-neon-blue/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500"></div>
                                    <img src={event.image} alt={event.title} className="w-full h-auto object-cover" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>


        </main>
    );
}
