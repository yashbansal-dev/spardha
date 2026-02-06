import Navbar from '@/components/Navbar';

export default function SchedulePage() {
    return (
        <main className="min-h-screen bg-black text-white relative font-sans flex flex-col">
            <Navbar />

            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 space-y-6">
                    <h1 className="text-6xl md:text-8xl font-gang text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-cyan to-white tracking-widest drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                        SCHEDULE
                    </h1>
                    <p className="text-xl md:text-3xl font-alice text-gray-400 tracking-widest uppercase border-y border-white/10 py-4 max-w-2xl mx-auto">
                        Coming Soon
                    </p>
                    <p className="text-sm text-white/50 font-mono tracking-wide">
                        The timeline of glory is being forged. Stay tuned.
                    </p>
                </div>
            </div>
        </main>
    );
}
