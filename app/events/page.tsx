"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import EventsScrollStack from "@/components/sections/EventsScrollStack";
import ParallaxBackground from "@/components/ParallaxBackground";
import SpardhaLoader from "@/components/ui/SpardhaLoader";

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
