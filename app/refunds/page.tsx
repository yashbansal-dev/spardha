import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Refunds() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-neon-cyan selection:text-black pt-24 px-6 md:px-12 lg:px-24">
            <Navbar />
            <div className="max-w-4xl mx-auto py-12">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 text-neon-cyan font-gang">Refunds & Cancellations</h1>

                <div className="space-y-6 text-gray-300">
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Cancellation Policy</h2>
                    <p>All payments are final. Once payment has been made, no cancellations, refunds, or credits will be provided under any circumstances.</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Event Cancellation</h2>
                    <p>If Spardha 2026 cancels an event due to unforeseen circumstances, all registered participants will receive a full refund.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
