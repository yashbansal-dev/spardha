'use client';

export default function Sponsors() {
    return (
        <section id="sponsors" className="section-padding bg-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold font-sans mb-16">
                    Our <span className="text-neon-blue">Sponsors</span>
                </h2>

                <div className="space-y-16">
                    {/* Title Sponsor */}
                    <div>
                        <h3 className="text-xl text-gray-400 mb-6 uppercase tracking-[0.2em]">Title Sponsor</h3>
                        <div className="glass-card max-w-sm mx-auto p-12 flex items-center justify-center neon-border bg-white/5">
                            <span className="text-4xl font-bold text-white opacity-50">LOGO</span>
                        </div>
                    </div>

                    {/* Co-Sponsors */}
                    <div>
                        <h3 className="text-lg text-gray-500 mb-6 uppercase tracking-[0.2em]">Powered By</h3>
                        <div className="flex flex-wrap justify-center gap-8">
                            {[1, 2].map((i) => (
                                <div key={i} className="glass-card w-64 h-32 flex items-center justify-center hover:bg-white/10 transition-colors">
                                    <span className="text-2xl font-bold text-white opacity-40">LOGO</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Partners */}
                    <div>
                        <h3 className="text-sm text-gray-600 mb-6 uppercase tracking-[0.2em]">Associate Partners</h3>
                        <div className="flex flex-wrap justify-center gap-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="glass w-40 h-24 flex items-center justify-center rounded-lg hover:scale-105 transition-transform">
                                    <span className="text-lg font-bold text-white opacity-30">LOGO</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
