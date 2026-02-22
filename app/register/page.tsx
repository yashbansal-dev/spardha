import React, { Suspense } from 'react';
import Navbar from "@/components/Navbar";
import ParallaxBackground from "@/components/ParallaxBackground";
import GamifiedWizard from "@/components/booking/GamifiedWizard";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Register | SPARDHA 2026",
    description: "Secure your pass for SPARDHA 2026. Register now for the biggest sports festival in Jaipur.",
};

export default function RegisterPage() {
    return (
        <main className="min-h-screen relative bg-[#020617] text-white overflow-x-hidden selection:bg-neon-cyan selection:text-black">

            {/* Fixed Background */}
            <ParallaxBackground />

            {/* Overlay for form contrast */}
            <div className="fixed inset-0 bg-black/60 z-0 pointer-events-none" />

            <div className="relative z-10">
                <Navbar />

                <div className="relative z-10 w-full min-h-screen pt-20 pb-10 flex flex-col">
                    <Suspense fallback={<div className="text-white text-center pt-20">Loading Arena...</div>}>
                        <GamifiedWizard />
                    </Suspense>
                </div>
            </div>

        </main>
    );
}
