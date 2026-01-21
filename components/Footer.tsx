import Link from 'next/link';
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50"></div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* Brand Info */}
                    <div>
                        <h2 className="text-3xl font-bold text-neon-cyan mb-4">SPARDHA</h2>
                        <p className="text-gray-400 mb-6">
                            The Annual Sports Festival of <br />
                            <span className="text-white font-semibold">JK Lakshmipat University (JKLU)</span>.
                            <br />
                            Celebrating sportsmanship, energy, and excellence.
                        </p>
                        <div className="flex gap-4">
                            {[FaInstagram, FaLinkedin, FaTwitter, FaYoutube].map((Icon, idx) => (
                                <Link key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-cyan hover:text-black transition-all hover:scale-110">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-3">
                            {['Home', 'Events', 'Schedule', 'Team', 'Sponsors'].map((item) => (
                                <li key={item}>
                                    <Link href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-neon-cyan transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Contact Us</h3>
                        <address className="not-italic text-gray-400 space-y-3">
                            <p>JK Lakshmipat University,</p>
                            <p>Near Mahindra SEZ, P.O. Mahapura,</p>
                            <p>Ajmer Road, Jaipur - 302026</p>
                            <p className="pt-2">
                                <span className="block text-sm text-gray-500">Email:</span>
                                <a href="mailto:spardha@jklu.edu.in" className="hover:text-neon-cyan transition-colors">spardha@jklu.edu.in</a>
                            </p>
                            <p>
                                <span className="block text-sm text-gray-500">Phone:</span>
                                <a href="tel:+919876543210" className="hover:text-neon-cyan transition-colors">+91 98765 43210</a>
                            </p>
                        </address>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 gap-4">
                    <p>© {new Date().getFullYear()} SPARDHA - JKLU. All rights reserved.</p>
                    <p>Designed with <span className="text-neon-pink">❤</span> by <span className="text-white">JKLU Tech Team</span></p>
                </div>
            </div>
        </footer>
    );
}
