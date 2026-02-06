'use client';

import Navbar from '@/components/Navbar';
import SeamlessInfiniteGallery from '@/components/gallery/SeamlessInfiniteGallery';

export default function Gallery() {
    return (
        <main className="min-h-screen bg-[#1A1A1A] text-white overflow-hidden">
            <Navbar />
            <SeamlessInfiniteGallery />
        </main>
    );
}
