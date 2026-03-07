import Navbar from '@/components/Navbar';
import OrbitalChronoSystem from '@/components/sections/OrbitalChronoSystem';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Schedule | SPARDHA 2026",
    description: "Navigate the Spardha 2026 timeline through our immersive Tactical Orbital Chronograph and 3D Stacked Arena.",
};

export default function SchedulePage() {
    return (
        <main className="w-full bg-black text-white relative font-sans flex flex-col pt-0 selection:bg-neon-cyan/30">
            <Navbar />

            {/* Phase 1: The Orbital Timeline */}
            <OrbitalChronoSystem />

        </main>
    );
}
