import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Privacy() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-neon-cyan selection:text-black pt-24 px-6 md:px-12 lg:px-24">
            <Navbar />
            <div className="max-w-4xl mx-auto py-12">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 text-neon-cyan font-gang">Privacy Policy</h1>

                <div className="space-y-6 text-gray-300">
                    <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Data Collection</h2>
                    <p>We collect information you provide during registration, such as name, email, and contact details, solely for event coordination.</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Data Usage</h2>
                    <p>Your data is used to communicate event updates, process payments, and ensure a smooth experience. We do not sell your data to third parties.</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Security</h2>
                    <p>We implement security measures to protect your personal information from unauthorized access.</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at spardha@jklu.edu.in.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
