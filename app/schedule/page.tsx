import Navbar from '@/components/Navbar';
import ImmersiveSchedule from '@/components/sections/ImmersiveSchedule';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Schedule | SPARDHA 2026",
    description: "Witness the grand timeline of Spardha 2026. Explore the immersive event schedule and track every highlight of our national level sports festival.",
};

export default function SchedulePage() {
    return (
        <main className="w-full bg-black text-white relative font-sans flex flex-col pt-0 selection:bg-cyan-500/30">
            <Navbar />

            {/* Premium Immersive Timeline Schedule */}
            <ImmersiveSchedule />

        </main>
    );
}
