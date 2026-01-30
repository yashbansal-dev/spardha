"use client";

import Navbar from "@/components/Navbar";
import EventsArena from "@/components/sections/EventsArena";

import ParallaxBackground from "@/components/ParallaxBackground";

export default function EventsPage() {
    return (
        <main className="min-h-screen text-white selection:bg-neon-cyan selection:text-black relative bg-[#020617]">
            <ParallaxBackground />
            <Navbar />

            <div className="pt-24 min-h-screen flex flex-col">
                <div className="flex-grow">
                    <EventsArena />
                </div>

            </div>
        </main>
    );
}
