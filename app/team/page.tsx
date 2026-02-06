'use client';

import Navbar from '@/components/Navbar';
import TeamRoster from '@/components/sections/TeamRoster';

export default function Team() {
    return (
        <main className="min-h-screen bg-black relative overflow-hidden">
            <Navbar />
            <div className="pt-20"> {/* Offset for Fixed/Absolute Navbar */}
                <TeamRoster />
            </div>
        </main>
    );
}

