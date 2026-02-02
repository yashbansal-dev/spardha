"use client";

import Navbar from "@/components/Navbar";
import EventsScrollStack from "@/components/sections/EventsScrollStack";
import ParallaxBackground from "@/components/ParallaxBackground";

export default function EventsPage() {
    return (
        <main className="min-h-screen text-white selection:bg-neon-cyan selection:text-black relative bg-[#020617]">
            <ParallaxBackground />
            <Navbar />

            {/* Scroll Stack Events Implementation */}
            <EventsScrollStack />

        </main>
    );
}
