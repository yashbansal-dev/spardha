'use client';

import Navbar from '@/components/Navbar';
import AutoScrollGallery from '@/components/gallery/AutoScrollGallery';

export default function Gallery() {
    return (
        <main className="min-h-screen bg-[#1A1A1A] text-white overflow-hidden">
            <Navbar />
            <AutoScrollGallery />
        </main>
    );
}
