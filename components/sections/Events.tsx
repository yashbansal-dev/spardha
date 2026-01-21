'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFutbol, FaTableTennis, FaChessKing, FaGamepad, FaRunning, FaBasketballBall, FaWhatsapp } from 'react-icons/fa';
import { GiCricketBat, GiVolleyballBall, GiShuttlecock } from 'react-icons/gi';

interface Event {
    id: string;
    name: string;
    category: string;
    icon: React.ElementType;
    description: string;
    image?: string;
}

const eventsData: Event[] = [
    { id: '1', name: 'Cricket', category: 'Outdoor', icon: GiCricketBat, description: 'The gentleman\'s game. 11 vs 11 battle for supremacy.' },
    { id: '2', name: 'Football', category: 'Outdoor', icon: FaFutbol, description: 'Show your skills on the field. 5-a-side and 11-a-side formats.' },
    { id: '3', name: 'Basketball', category: 'Outdoor', icon: FaBasketballBall, description: 'Dribble, shoot, score. High intensity court action.' },
    { id: '4', name: 'Volleyball', category: 'Outdoor', icon: GiVolleyballBall, description: 'Spike your way to victory.' },
    { id: '5', name: 'Badminton', category: 'Indoor', icon: GiShuttlecock, description: 'Smash hard, play smart. Singles and Doubles.' },
    { id: '6', name: 'Table Tennis', category: 'Indoor', icon: FaTableTennis, description: 'Fast-paced paddle action.' },
    { id: '7', name: 'Chess', category: 'Indoor', icon: FaChessKing, description: 'Battle of minds. Checkmate your opponent.' },
    { id: '8', name: 'Athletics', category: 'Athletics', icon: FaRunning, description: '100m, 200m, Relay races. Test your speed.' },
    { id: '9', name: 'BGMI / Valorant', category: 'E-Sports', icon: FaGamepad, description: 'Digital warfare. Mobile and PC gaming tournaments.' },
];

const categories = ["All", "Outdoor", "Indoor", "Athletics", "E-Sports"];

export default function Events() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const filteredEvents = activeFilter === "All"
        ? eventsData
        : eventsData.filter(e => e.category === activeFilter);

    return (
        <section id="events" className="section-padding bg-spardha-bg relative">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold font-sans mb-4">
                        Our <span className="text-neon-purple">Events</span>
                    </h2>
                    <p className="text-gray-400">Compete in a wide variety of sports and games.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-6 py-2 rounded-full border transition-all duration-300 font-semibold tracking-wide
                                ${activeFilter === cat
                                    ? 'bg-neon-purple border-neon-purple text-white shadow-[0_0_15px_rgba(188,19,254,0.4)]'
                                    : 'bg-transparent border-white/20 text-gray-400 hover:border-white/50 hover:text-white'}
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredEvents.map((event) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={event.id}
                                className="glass-card p-6 flex items-start gap-4 group cursor-pointer hover:neon-border"
                                onClick={() => setSelectedEvent(event)}
                            >
                                <div className="p-4 bg-white/5 rounded-xl text-3xl text-neon-cyan group-hover:bg-neon-cyan group-hover:text-black transition-colors duration-300">
                                    <event.icon />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">{event.name}</h3>
                                    <p className="text-gray-400 text-sm line-clamp-2">{event.description}</p>
                                    <span className="text-xs text-neon-purple mt-2 block font-semibold uppercase tracking-wider">{event.category}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedEvent(null)}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="bg-[#121212] border border-white/20 p-8 rounded-2xl max-w-lg w-full relative shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                                onClick={() => setSelectedEvent(null)}
                            >
                                &times;
                            </button>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-4 bg-neon-cyan/10 rounded-full text-4xl text-neon-cyan">
                                    <selectedEvent.icon />
                                </div>
                                <h3 className="text-3xl font-bold text-white">{selectedEvent.name}</h3>
                            </div>

                            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                                {selectedEvent.description}
                            </p>

                            <div className="bg-white/5 p-4 rounded-lg mb-6">
                                <h4 className="text-sm uppercase text-gray-500 font-bold mb-2">Details</h4>
                                <ul className="text-gray-300 space-y-2 text-sm">
                                    <li>• Category: <span className="text-white">{selectedEvent.category}</span></li>
                                    <li>• Team Size: <span className="text-white">Variable</span></li>
                                    <li>• Rules: <span className="text-white">Standard Federation Rules</span></li>
                                </ul>
                            </div>

                            <button className="w-full py-3 bg-neon-cyan text-black font-bold rounded-lg hover:bg-white transition-colors">
                                Register for {selectedEvent.name}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
