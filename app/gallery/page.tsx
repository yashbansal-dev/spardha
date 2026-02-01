'use client';

import Navbar from '@/components/Navbar';
import VoidGallery from '@/components/gallery/VoidGallery';

export default function Gallery() {
    return (
        <main className="min-h-screen bg-[#020617] text-white">
            <Navbar />
            <VoidGallery />
        </main>
    );
}
