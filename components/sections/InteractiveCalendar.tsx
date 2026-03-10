'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    format,
    isSameDay,
    addDays,
    parseISO,
} from 'date-fns';
import {
    FaChevronLeft,
    FaChevronRight,
    FaCalendarAlt,
    FaCalendarDay,
    FaSearch,
    FaTimes,
    FaClock,
    FaMapMarkerAlt,
    FaGoogle,
    FaHome,
    FaLayerGroup
} from 'react-icons/fa';
import { SpardhaEvent, MOCK_EVENTS, SPORT_COLORS, SPORT_ICONS, SportType } from '@/data/events';

// --- Utils ---

const calculateEventLayout = (dayEvents: SpardhaEvent[]) => {
    const sorted = [...dayEvents].sort((a, b) => a.startTime.localeCompare(b.startTime));
    const columns: SpardhaEvent[][] = [];

    sorted.forEach(event => {
        let placed = false;
        for (let i = 0; i < columns.length; i++) {
            const lastEventInCol = columns[i][columns[i].length - 1];
            if (event.startTime >= lastEventInCol.endTime) {
                columns[i].push(event);
                placed = true;
                break;
            }
        }
        if (!placed) {
            columns.push([event]);
        }
    });

    const results: (SpardhaEvent & { width: number, left: number })[] = [];
    columns.forEach((col, colIdx) => {
        col.forEach(event => {
            results.push({
                ...event,
                width: 100 / columns.length,
                left: (colIdx * 100) / columns.length
            });
        });
    });

    return results;
};

// --- Sub-components ---

const HeroHeader = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="relative h-[40vh] md:h-[50vh] flex flex-col items-center justify-center text-center overflow-hidden bg-[#0f172a]">
            <div className="absolute inset-0 z-0 opacity-10">
                {mounted && Object.values(SPORT_ICONS).map((Icon: any, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-white"
                        initial={{ x: `${Math.random() * 100}vw`, y: `${Math.random() * 100}vh`, rotate: 0, scale: 0.5 + Math.random() }}
                        animate={{ y: ['-10vh', '110vh'], rotate: 360 }}
                        transition={{ duration: 15 + Math.random() * 20, repeat: Infinity, ease: 'linear', delay: -Math.random() * 20 }}
                    >
                        <Icon size={40 + Math.random() * 40} />
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 space-y-4 px-6 mt-16 md:mt-24">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-5xl lg:text-6xl font-black text-white tracking-widest uppercase italic"
                    style={{ textShadow: '0 0 20px rgba(34,211,238,0.5)' }}
                >
                    SPARDHA EVENT CALENDAR
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-cyan-400 font-mono tracking-[0.3em] uppercase text-sm md:text-base lg:text-lg"
                >
                    Explore every match of the fest.
                </motion.p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20" />
        </div>
    );
};

const FilterBar = ({ activeSport, setActiveSport }: { activeSport: SportType, setActiveSport: (s: SportType) => void }) => {
    const sports: SportType[] = ['All', 'Cricket', 'Football', 'Basketball', 'Volleyball', 'Badminton', 'Table Tennis', 'Esports'];
    return (
        <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                {sports.map((sport) => {
                    const Icon = sport === 'All' ? FaCalendarAlt : (SPORT_ICONS[sport] || SPORT_ICONS.Default);
                    const isActive = activeSport === sport;
                    const color = SPORT_COLORS[sport] || SPORT_COLORS.Default;
                    return (
                        <motion.button
                            key={sport}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveSport(sport)}
                            className={`flex items-center gap-3 px-6 py-2.5 rounded-full border transition-all whitespace-nowrap ${isActive ? 'bg-white text-black border-white' : 'bg-black/40 text-white/60 border-white/10 hover:border-white/30'}`}
                            style={{ borderColor: isActive ? color : undefined }}
                        >
                            <Icon size={14} style={{ color: isActive ? '#000' : color }} />
                            <span className="text-xs font-bold uppercase tracking-widest">{sport}</span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};


const DayView = ({ currentMonth, events, onEventClick }: { currentMonth: Date, events: SpardhaEvent[], onEventClick: (e: SpardhaEvent) => void }) => {
    const dayEvents = useMemo(() => events.filter((e) => isSameDay(parseISO(e.date), currentMonth)), [events, currentMonth]);
    const layoutEvents = calculateEventLayout(dayEvents);
    const hours = Array.from({ length: 15 }, (_, i) => i + 8); // 8 AM to 10 PM
    const hHeight = 160;

    return (
        <div className="w-full max-w-5xl mx-auto bg-black/20 rounded-[50px] border border-white/10 backdrop-blur-3xl flex flex-col md:flex-row h-[900px] overflow-hidden shadow-2xl">
            {/* Time Column */}
            <div className="w-20 md:w-28 border-r border-white/5 flex flex-col pt-24 bg-black/60 shrink-0">
                {hours.map(hour => (
                    <div key={hour} className="h-[160px] text-[10px] md:text-sm font-mono text-white/20 text-center italic border-b border-white/5 last:border-0 pt-4 flex-shrink-0">
                        {hour}:00
                    </div>
                ))}
            </div>

            {/* Events Grid */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative bg-zinc-950/20">
                {/* Header for the day */}
                <div className="sticky top-0 z-40 h-24 flex flex-col items-center justify-center border-b border-white/10 bg-black/90 backdrop-blur-xl">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] mb-1">{format(currentMonth, 'EEEE')}</span>
                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">{format(currentMonth, 'MMMM do')}</h3>
                </div>

                <div className="relative" style={{ height: `${hours.length * hHeight}px` }}>
                    {/* Grid Lines */}
                    {hours.map(h => <div key={h} className="h-[160px] border-b border-white/5 opacity-40 shadow-inner" />)}

                    {/* Events */}
                    <AnimatePresence>
                        {layoutEvents.map((event) => {
                            const startH = parseInt(event.startTime.split(':')[0]);
                            const startM = parseInt(event.startTime.split(':')[1]);
                            const endH = parseInt(event.endTime.split(':')[0]);
                            const endM = parseInt(event.endTime.split(':')[1]);
                            const top = (startH - 8 + startM / 60) * hHeight;
                            const height = (endH - startH + (endM - startM) / 60) * hHeight;
                            const color = SPORT_COLORS[event.sport] || SPORT_COLORS.Default;
                            const Icon = SPORT_ICONS[event.sport] || SPORT_ICONS.Default;

                            return (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    onClick={() => onEventClick(event)}
                                    whileHover={{ scale: 1.01, zIndex: 10, boxShadow: `0 0 50px ${color}40`, borderColor: `${color}60` }}
                                    className="absolute rounded-[24px] p-4 md:p-5 cursor-pointer border shadow-2xl flex flex-col overflow-hidden group transition-all"
                                    style={{
                                        top: `${top + 10}px`,
                                        height: `${height - 20}px`,
                                        width: `${event.width - 4}%`,
                                        left: `${event.left + 2}%`,
                                        backgroundColor: `${color}15`,
                                        borderColor: `${color}30`,
                                        backdropFilter: 'blur(10px)'
                                    }}
                                >
                                    <div className="flex-1 flex items-center justify-center text-center w-full">
                                        <h4 className="text-sm md:text-lg lg:text-2xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase italic tracking-tight leading-tight break-words line-clamp-6 w-full px-2" style={{ wordBreak: 'break-word' }}>
                                            {event.title}
                                        </h4>
                                    </div>

                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] blur-[100px] rounded-full group-hover:bg-white/[0.05] transition-colors" />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const FestivalGrid = ({ events, onEventClick }: { events: SpardhaEvent[], onEventClick: (e: SpardhaEvent) => void }) => {
    const dates = [new Date(2026, 2, 27), new Date(2026, 2, 28), new Date(2026, 2, 29)];
    const hours = Array.from({ length: 15 }, (_, i) => i + 8); // 8 AM to 10 PM
    const hHeight = 160; // Increased scale for more breathing room

    return (
        <div className="w-full bg-black/20 rounded-[50px] overflow-hidden border border-white/10 backdrop-blur-3xl flex flex-col md:flex-row h-[1000px] shadow-2xl">
            {/* Time Column */}
            <div className="w-16 md:w-24 border-r border-white/5 flex flex-col pt-24 bg-black/60 sticky left-0 z-50">
                {hours.map(hour => (
                    <div key={hour} className="h-[160px] text-[10px] md:text-xs font-mono text-white/20 text-center italic border-b border-white/5 last:border-0 pt-4 flex-shrink-0">
                        {hour}:00
                    </div>
                ))}
            </div>

            <div className="flex-1 flex overflow-x-auto no-scrollbar bg-zinc-950/20 scroll-smooth">
                {dates.map((day, dIdx) => {
                    const dayEvents = events.filter((e) => isSameDay(parseISO(e.date), day));
                    const layoutEvents = calculateEventLayout(dayEvents);

                    return (
                        <div key={dIdx} className="flex-1 min-w-[450px] border-r border-white/10 last:border-0 relative bg-gradient-to-b from-white/[0.02] to-transparent">
                            {/* Sticky Day Header */}
                            <div className="sticky top-0 z-40 h-24 flex flex-col items-center justify-center border-b border-white/10 bg-black/90 backdrop-blur-xl">
                                <motion.span
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] mb-1"
                                >
                                    FESTIVAL_DAY_0{dIdx + 1}
                                </motion.span>
                                <span className="text-2xl font-black text-white italic uppercase tracking-tighter">{format(day, 'MMMM do')}</span>
                            </div>

                            <div className="relative" style={{ height: `${hours.length * hHeight}px` }}>
                                {/* Hour Grid Lines */}
                                {hours.map(h => <div key={h} className="h-[160px] border-b border-white/5 opacity-40 shadow-inner" />)}

                                {/* Events */}
                                <AnimatePresence>
                                    {layoutEvents.map((event) => {
                                        const startH = parseInt(event.startTime.split(':')[0]);
                                        const startM = parseInt(event.startTime.split(':')[1]);
                                        const endH = parseInt(event.endTime.split(':')[0]);
                                        const endM = parseInt(event.endTime.split(':')[1]);

                                        const top = (startH - 8 + startM / 60) * hHeight;
                                        const duration = (endH - startH + (endM - startM) / 60);
                                        const height = duration * hHeight;

                                        const color = SPORT_COLORS[event.sport] || SPORT_COLORS.Default;
                                        const Icon = SPORT_ICONS[event.sport] || SPORT_ICONS.Default;

                                        return (
                                            <motion.div
                                                key={event.id}
                                                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                                transition={{ duration: 0.4, ease: "easeOut" }}
                                                onClick={() => onEventClick(event)}
                                                whileHover={{
                                                    scale: 1.02,
                                                    zIndex: 50,
                                                    boxShadow: `0 0 60px ${color}40`,
                                                    borderColor: `${color}80`
                                                }}
                                                className="absolute rounded-[20px] p-3 md:p-4 cursor-pointer border shadow-2xl flex flex-col overflow-hidden group transition-all"
                                                style={{
                                                    top: `${top + 10}px`,
                                                    height: `${height - 20}px`,
                                                    width: `${event.width - 4}%`,
                                                    left: `${event.left + 2}%`,
                                                    backgroundColor: `${color}15`,
                                                    borderColor: `${color}30`,
                                                    backdropFilter: 'blur(8px)'
                                                }}
                                            >
                                                <div className="flex-1 flex items-center justify-center text-center w-full relative z-10">
                                                    <h4 className="text-[10px] md:text-xs lg:text-sm font-black text-white group-hover:text-cyan-400 transition-colors uppercase italic tracking-tight leading-tight break-words line-clamp-6 w-full px-1" style={{ wordBreak: 'break-word' }}>
                                                        {event.title}
                                                    </h4>
                                                </div>

                                                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/[0.03] blur-3xl rounded-full group-hover:bg-white/10 transition-colors" />
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const EventModal = ({ event, isOpen, onClose }: { event: SpardhaEvent | null, isOpen: boolean, onClose: () => void }) => {
    if (!event) return null;
    const Icon = SPORT_ICONS[event.sport] || SPORT_ICONS.Default;
    const color = SPORT_COLORS[event.sport] || SPORT_COLORS.Default;
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/99 backdrop-blur-2xl" />
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative w-full max-w-3xl bg-[#0a0a0a] border border-white/10 rounded-[48px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <div className="h-4 w-full" style={{ backgroundColor: color }} />
                        <button onClick={onClose} className="absolute top-10 right-10 text-white/20 hover:text-cyan-400 p-3 bg-white/5 rounded-2xl border border-white/10"><FaTimes size={20} /></button>
                        <div className="p-10 md:p-16 space-y-8">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 shadow-2xl shrink-0" style={{ borderColor: `${color}30`, color }}><Icon size={64} /></div>
                                <div className="space-y-4">
                                    <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40" style={{ color }}>{event.sport} EVENT</span>
                                    <h2 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tighter uppercase italic">{event.title}</h2>
                                    <div className="flex flex-wrap items-center gap-6 font-mono text-sm text-white/40 pt-2">
                                        <span className="flex items-center gap-2"> <FaMapMarkerAlt className="text-cyan-400" /> {event.venue}</span>
                                        <span className="flex items-center gap-2"> <FaClock className="text-cyan-400" /> {event.startTime} - {event.endTime}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[40px] space-y-4">
                                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20 border-l-2 border-cyan-400 pl-3">Description</h4>
                                <p className="text-sm text-white/60 leading-relaxed italic">{event.description}</p>
                                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                    {event.teams.map((team, idx) => (
                                        <React.Fragment key={team}>
                                            <span className="text-lg font-black text-white uppercase italic">{team}</span>
                                            {idx < event.teams.length - 1 && <span className="text-white/10 font-black italic text-xl">VS</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button className="flex-1 h-14 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-cyan-400 hover:text-white transition-all">Add to My Schedule</button>
                                <button className="px-8 h-14 rounded-2xl bg-white/5 border border-white/10 text-white/60 font-black flex items-center gap-2 hover:bg-white/10 transition-all"><FaGoogle size={14} /> Sync</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default function InteractiveCalendar() {
    const festivalStart = new Date(2026, 2, 27);
    const [currentDate, setCurrentDate] = useState(festivalStart);
    const [view, setView] = useState<'day' | 'festival'>('festival');
    const [activeSport, setActiveSport] = useState<SportType>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEvent, setSelectedEvent] = useState<SpardhaEvent | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile && view === 'festival') setView('day');
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [view]);

    const filteredEvents = useMemo(() => MOCK_EVENTS.filter(e => (activeSport === 'All' || e.sport === activeSport) && (e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.venue.toLowerCase().includes(searchQuery.toLowerCase()))), [activeSport, searchQuery]);

    const navigate = (dir: 'next' | 'prev') => {
        setCurrentDate(dir === 'next' ? addDays(currentDate, 1) : addDays(currentDate, -1));
    };

    const handleEventClick = (event: SpardhaEvent) => { setSelectedEvent(event); setIsModalOpen(true); };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 font-sans pb-32">
            <HeroHeader />
            <div className="max-w-7xl mx-auto px-6 space-y-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#0a0a0a] p-6 lg:p-8 rounded-[40px] border border-white/5 relative z-30 -mt-10 lg:-mt-20 shadow-2xl">
                    {mounted && (
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setView('festival')}
                                    className={`px-4 py-2 rounded-xl border transition-all text-[10px] font-black uppercase tracking-widest ${view === 'festival' ? 'bg-cyan-500 border-cyan-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white'}`}
                                >
                                    <FaLayerGroup className="inline mr-2" />
                                    Overview
                                </button>
                                <div className="w-[1px] h-8 bg-white/10 mx-1" />
                                {[27, 28, 29].map(day => (
                                    <button
                                        key={day}
                                        onClick={() => {
                                            const newDate = new Date(2026, 2, day);
                                            setCurrentDate(newDate);
                                            setView('day');
                                        }}
                                        className={`px-4 py-2 rounded-xl border transition-all text-[10px] font-black uppercase tracking-widest ${isSameDay(currentDate, new Date(2026, 2, day)) && view === 'day' ? 'bg-cyan-500 border-cyan-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white'}`}
                                    >
                                        Mar {day}
                                    </button>
                                ))}
                            </div>
                            <div className="h-8 w-[1px] bg-white/10 mx-2 hidden md:block" />
                            <div className="flex gap-1.5">
                                <button onClick={() => navigate('prev')} className="p-3 rounded-xl bg-black border border-white/5 hover:text-cyan-400 transition-all"><FaChevronLeft size={12} /></button>
                                <button onClick={() => navigate('next')} className="p-3 rounded-xl bg-black border border-white/5 hover:text-cyan-400 transition-all"><FaChevronRight size={12} /></button>
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight ml-2">
                                {view === 'festival' ? 'Festival Overview' : format(currentDate, 'MMMM d, yyyy')}
                            </h3>
                        </div>
                    )}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="relative group w-full md:w-56">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
                            <input type="text" placeholder="Search events..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full h-12 bg-black border border-white/10 rounded-2xl pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-cyan-500 transition-all" />
                        </div>
                        {/* View switcher removed as only 2 remain, accessible via specialized buttons & floating menu */}
                    </div>
                </div>

                <FilterBar activeSport={activeSport} setActiveSport={setActiveSport} />
                <AnimatePresence mode="wait">
                    {mounted && (
                        <motion.div key={`${view}-${currentDate.toISOString()}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                            {view === 'festival' && <FestivalGrid events={filteredEvents} onEventClick={handleEventClick} />}
                            {view === 'day' && <DayView currentMonth={currentDate} events={filteredEvents} onEventClick={handleEventClick} />}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex gap-2 p-2 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full shadow-2xl ring-1 ring-white/5">
                {[
                    { icon: FaHome, v: 'festival', l: 'Overview' },
                    { icon: FaCalendarDay, v: 'day', l: 'Schedule' },
                ].map((item: any) => (
                    <button key={item.v} onClick={() => setView(item.v)} className={`p-4 rounded-full transition-all group relative ${view === item.v ? 'bg-cyan-500 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/10'}`}>
                        <item.icon size={18} />
                        <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-[10px] font-black uppercase rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">{item.l}</span>
                    </button>
                ))}
            </div>

            <EventModal event={selectedEvent} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
