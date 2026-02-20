import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Terms() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-neon-cyan selection:text-black pt-24 px-6 md:px-12 lg:px-24">
            <Navbar />
            <div className="max-w-4xl mx-auto py-12">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 text-neon-cyan font-gang">Terms & Conditions</h1>

                <div className="space-y-6 text-gray-300">
                    <p>Welcome to Spardha 2026. By accessing or using our website and services, you agree to be bound by these Terms & Conditions.</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Event Registration</h2>
                    <p>Registration for events is subject to availability and payment of required fees. We reserve the right to refuse registration to anyone at our discretion.</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Code of Conduct</h2>
                    <p>Participants are expected to behave with sportsmanship and respect towards others. Any form of harassment or misconduct will result in immediate disqualification.</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Intellectual Property</h2>
                    <p>All content on this website, including logos, text, and images, is the property of JK Lakshmipat University and Spardha 2026.</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Limitation of Liability</h2>
                    <p>Spardha 2026 is not liable for any injuries or damages sustained during the event, except where required by law.</p>

                    <p className="mt-8 text-sm text-gray-500">Last Updated: February 2026</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
