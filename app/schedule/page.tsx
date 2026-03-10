import Navbar from '@/components/Navbar';
import InteractiveCalendar from '@/components/sections/InteractiveCalendar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Schedule | SPARDHA 2026",
    description: "Experience the Spardha 2026 event schedule through our immersive multi-view interactive calendar. Track every match in Month, Week, or Day detail.",
};

export default function SchedulePage() {
    return (
        <main className="w-full bg-black text-white relative font-sans flex flex-col pt-0 selection:bg-cyan-500/30">
            <Navbar />

            {/* Immersive Spardha Calendar Dashboard */}
            <InteractiveCalendar />

        </main>
    );
}
