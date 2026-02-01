'use client';

import Navbar from '@/components/Navbar';
import ParallaxGallery from '@/components/gallery/ParallaxGallery';

export default function Gallery() {
    return (
        <main className="min-h-screen w-screen bg-[#020617] relative">
            {/* Background Glow */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617]/50 to-[#020617] pointer-events-none z-0" />

            <div className="relative z-50">
                <Navbar />
            </div>

            {/* Gallery Collage Section */}
            <div className="relative z-20 bg-[#020617] pt-20">
                <ParallaxGallery />
            </div>
        </main>
    );
}
