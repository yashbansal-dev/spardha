"use client";

import Navbar from "@/components/Navbar";
import Events from "@/components/sections/Events";

import ParallaxBackground from "@/components/ParallaxBackground";

export default function EventsPage() {
    return (
        <main className="min-h-screen text-white selection:bg-neon-cyan selection:text-black relative bg-[#020617]">
            <ParallaxBackground />
            <Navbar />

            <div className="pt-24 min-h-screen flex flex-col">
                <div className="flex-grow">
                    <Events />
                </div>

            </div>
        </main>
    );
}
