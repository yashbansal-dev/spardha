'use client';

import React from 'react';
import { motion } from 'framer-motion';
import MatchPoster from './MatchPoster';
import LoudestNight from './LoudestNight';
import { PAST_EVENTS } from './TimelineContainer'; // reusing data

export default function FieldTimeline() {
    return (
        <div className="relative w-full bg-[#050505] overflow-hidden pb-40">

            {/* Field/Track Lane Background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Grass Texture Effect */}
                <div className="absolute inset-0 bg-[#0a0f0a] opacity-80"></div>
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(255,255,255,0.03)_50%,transparent_51%)] bg-[length:100px_100%]"></div>

                {/* Center Main Line - The "Track Lane" */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-4 md:w-32 -translate-x-1/2 z-0">
                    <div className="absolute inset-0 border-x-2 border-white/20"></div>
                    <div className="absolute inset-0 bg-white/5"></div>
                    {/* Dashed Center */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 border-l-2 border-dashed border-white/20"></div>
                </div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 pt-32">

                {/* Filter / Category Header (Optional styling update) */}
                <div className="text-center mb-32">
                    <div className="inline-block bg-white text-black font-black uppercase text-xs px-4 py-2 tracking-widest rotate-6">
                        THE ARCHIVE
                    </div>
                </div>

                {/* Event Posters */}
                {PAST_EVENTS.map((event, index) => (
                    <div key={event.id} className="relative">
                        {/* Lane Marker Node */}
                        <div className="absolute left-4 md:left-1/2 top-0 w-4 h-4 bg-white rounded-full z-20 md:-translate-x-1/2 md:-ml-[1px] md:-mt-2 shadow-[0_0_20px_white]"></div>
                        <div className="absolute left-8 md:left-[52%] top-0 text-xs font-mono text-gray-500 uppercase tracking-widest pl-2">
                            Full Time: {event.year}
                        </div>

                        <MatchPoster event={event} index={index} />

                        {/* Inject Feature Section in middle */}
                        {index === 1 && <LoudestNight />}
                    </div>
                ))}

                {/* End of Match Marker */}
                <div className="flex flex-col items-center justify-center pt-20">
                    <div className="w-full max-w-xs h-[2px] bg-white/20 mb-8"></div>
                    <h3 className="text-4xl font-black italic text-gray-700 uppercase">FULL TIME</h3>
                </div>
            </div>
        </div>
    );
}
