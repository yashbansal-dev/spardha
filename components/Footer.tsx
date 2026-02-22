import Link from 'next/link';
import { FaHeart, FaMapMarkerAlt, FaFileAlt, FaHandshake, FaQuestionCircle } from 'react-icons/fa';
import CinematicLogo from './ui/CinematicLogo';

export default function Footer() {
    return (
        <footer className="bg-[#050505] pt-8 pb-4 relative overflow-hidden font-sans">

            {/* Background Texture/Gradient */}
            {/* Background Texture/Gradient */}

            <div className="absolute -left-[20%] top-[20%] w-[50%] h-[50%] bg-neon-cyan/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 md:gap-0 mb-12">

                    {/* LEFT COLUMN: BRANDING */}
                    <div className="flex-1 max-w-2xl">
                        <p className="text-xl md:text-2xl text-gray-400 mb-2 font-light tracking-wide">
                            Become a part of
                        </p>
                        <h1 className="text-[15vw] md:text-7xl lg:text-9xl font-gang text-white leading-[0.8] mb-8 tracking-tighter uppercase select-none">
                            SPARDHA
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-md leading-relaxed">
                            Unforgettable experiences. Limitless energy. Thrilling innovation, culture, and sports. All in one place.
                            Whether you're a participant, sponsor, or curious attendee, we'd love to connect.
                        </p>
                    </div>

                    {/* RIGHT COLUMN: LARGE LINKS */}
                    <div className="flex flex-col items-start md:items-end gap-4 md:gap-6 min-w-[300px]">
                        {[
                            { label: 'Support', href: '/contact', icon: <FaQuestionCircle /> },
                            { label: 'Sponsor', href: '/#sponsors', icon: <FaHandshake /> },
                            { label: 'Info Kit', href: '/brochure', icon: <FaFileAlt /> },
                            { label: 'Location', href: 'https://maps.google.com', icon: <FaMapMarkerAlt />, external: true },
                            { label: 'Site Aid', href: '/team', icon: <FaHeart /> },
                        ].map((link, i) => (
                            <Link
                                key={i}
                                href={link.href}
                                target={link.external ? "_blank" : "_self"}
                                className="group flex items-center gap-4 text-4xl md:text-5xl lg:text-6xl font-gang font-black tracking-tighter uppercase text-white/40 hover:text-white transition-all duration-300"
                            >
                                <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-2xl text-neon-cyan">
                                    {link.icon}
                                </span>
                                <span className='group-hover:tracking-widest transition-all duration-300'>
                                    {link.label}
                                </span>
                            </Link>
                        ))}
                    </div>

                </div>



                {/* BOTTOM CENTER: LOGO */}
                <div className="flex justify-center items-center -mt-10 md:-mt-20 relative z-10 pointer-events-none">
                    <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-[300px] md:h-[300px]">
                        <CinematicLogo />
                    </div>
                </div>

                {/* Policies & Legal Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-t border-white/5 pt-12">
                    {/* Policies Links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-neon-cyan font-bold uppercase tracking-widest mb-2">Policies</h3>
                        <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
                        <Link href="/refunds" className="text-gray-400 hover:text-white transition-colors">Refunds & Cancellations</Link>
                        <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
                    </div>

                    {/* Products/Services */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-neon-cyan font-bold uppercase tracking-widest mb-2">Products/Services</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Registration for Sports Events, Cultural Competitions, and Flagship Flagship Event.
                        </p>
                    </div>

                    {/* Pricing Info */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-neon-cyan font-bold uppercase tracking-widest mb-2">Pricing</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            All products and services listed on this website are priced in <strong>INR (Indian Rupees)</strong>.
                        </p>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm md:text-base text-gray-500 uppercase tracking-widest gap-4">
                    <p>
                        © {new Date().getFullYear()} All rights reserved <span className="text-white font-bold">JKLU</span>
                    </p>
                    <p className="flex items-center gap-2">
                        Designed and Developed by <span className="text-neon-cyan font-bold cursor-pointer hover:underline">Yash Bansal & Kartik Gupta</span>
                    </p>
                </div>
            </div>
        </footer >
    );
}
