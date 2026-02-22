'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

// Placeholder for the background image
const bg1 = '/assets/images/media_1.jpeg';

const teamMembers = [
    {
        role: 'Student Affairs',
        gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
        members: [
            {
                name: 'Vijay Chellobonia',
                position: 'Faculty Coordinator',
                image: '/assets/Core_photos/vijay.png',
                bio: 'Leading strategic initiatives and academic excellence.'
            },
            {
                name: 'Deepak Sogani',
                position: 'Faculty Coordinator',
                image: '/assets/Core_photos/deepak_sogani.png',
                bio: 'Dedicated to fostering student growth and ensuring smooth event execution.'
            },
            {
                name: 'Vaibhav Topiwala',
                position: 'Head Of Sports',
                image: '/assets/Core_photos/VaibhavTopiwala.jpeg',
                bio: 'Leading the sports committee with vision and dedication.'
            }
        ]
    },
    {
        role: 'Students Council',
        gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
        members: [
            // {
            //     name: 'Shubham Jain',
            //     position: 'President',
            //     image: '/assets/Core_photos/shubhamjain.jpg',
            //     bio: 'Coordinating student activities and ensuring seamless operations.'
            // },
            {
                name: 'Ishaan Saraswat',
                position: 'General Secretary',
                image: '/assets/Core_photos/IshaanSaraswat.jpeg',
                bio: 'Coordinating student activities and ensuring seamless operations.'
            },
            {
                name: 'Aman Prakash',
                position: 'Sports Affairs',
                image: '/assets/Core_photos/aman_prakash.jpg',
                bio: 'Working to elevate the sports culture and infrastructure.'
            }
        ]
    },
    {
        role: 'Organizing Heads',
        gradient: 'from-blue-500 via-cyan-500 to-teal-500',
        members: [
            {
                name: 'Naman Shukla',
                position: 'Organizing Head',
                image: '/assets/Core_photos/NamanShuklaOH.jpg',
                rotate: -90,
                bio: 'Orchestrating the vision and strategic execution of Spardha 2026.'
            },
            // {
            //     name: 'Arjun Tanwar',
            //     position: 'All Sports Core',
            //     image: '/assets/Core_photos/ArjunSinghTanwar.jpg',
            //     bio: 'Driving technical excellence and inter-departmental sports synergy.'
            // },
            {
                name: 'Garv Sharma',
                position: 'Organizing Head',
                image: '/assets/Core_photos/garv_sharma.jpg',
                bio: 'Seamlessly managing event operations and student collaboration.'
            },
            {
                name: 'Ashmit Sharma',
                position: 'Organizing Head',
                image: '/assets/Core_photos/ashmit_sharma_v2.png',
                bio: 'Bridging administration and on-ground execution for India\'s premier sports fest.'
            }
        ]
    },
    {
        role: 'Core Committees',
        gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
        members: [
            { name: 'Parth Bhardwaj', position: 'Discipline Head', image: '/assets/Core_photos/parth_bhardwaj.jpg' },
            { name: 'Tanik Gupta', position: 'Discipline Head', image: '/assets/Core_photos/TanikGupta_Core_Discipline.jpg' },
            { name: 'Kartik Sharma', position: 'Internal Arrangements', image: '/assets/Core_photos/KartikSharma.jpg' },
            { name: 'Roshan Jangir', position: 'Photography & Social Media', image: '/assets/Core_photos/Roshan_jangir.jpg' },
            { name: 'Smile Chhabra', position: 'Prize & Certificate', image: '/assets/Core_photos/Smilechhabra.jpeg' },
            { name: 'Jheel Jain', position: 'Prize & Certificate', image: '/assets/Core_photos/JheelJain.jpg' },
            { name: 'Satvik Agrawal', position: 'Food & Accommodation', image: '/assets/Core_photos/SatvikSharma.webp' },
            { name: 'Yash Bansal', position: 'Tech & Support Head', image: '/assets/Core_photos/YashBansal.jpg' },
            { name: 'Shlok Chaturvedi', position: 'First Aid Head', image: '/assets/Core_photos/ShlokChaturvedi.jpg' },
            { name: 'Parineeta Jain', position: 'Sponsorship & Promotion', image: '/assets/Core_photos/ParineetaJain.jpg' },
            { name: 'Gourang Tak', position: 'Transportation Head', image: '/assets/Core_photos/GourangTak.jpg' },
            { name: 'Rishika Sharma', position: 'Registration Head', image: '/assets/Core_photos/Rishikasharma.jpeg' },
            { name: 'Akshali Srivastava', position: 'Media Head', image: '/assets/Core_photos/AkshaliSrivastava.jpg', rotate: 90 },
            { name: 'Pratigya Bomb', position: 'Registration Head', image: '/assets/Core_photos/pratigya_bomb.jpg' }
        ]
    },
    {
        role: 'Sports Heads',
        gradient: 'from-orange-500 via-red-500 to-pink-500',
        members: [
            { name: 'Arjun Singh Tanwar', position: 'All Sports Core', image: '/assets/Core_photos/ArjunSinghTanwar.jpg' },
            { name: 'Harshveer Singh Rathore', position: 'Leather Cricket Head', image: '/assets/Core_photos/Harshveercricketcore.jpg' },
            { name: 'Vansh Sharma', position: 'Basketball Head', image: '/assets/Core_photos/Vanshbasketballcore.PNG' },
            { name: 'Mayank Gautam', position: 'E-Sports Head', image: '/assets/Core_photos/MayankGautam.png' },
            { name: 'Shiva Shankar', position: 'Kabaddi & Kho-Kho Head', image: '/assets/Core_photos/ShivaShankar.jpg' },
            { name: 'Mayank Shankar Pathak', position: 'Box Cricket Head', image: '/assets/Core_photos/MayankShankarPathak.jpg' },
            { name: 'Himanshu Gurjar', position: 'Volleyball Head', image: '/assets/Core_photos/himanshu_gurjar.png' },
            { name: 'Gaurav Singh Bora', position: 'Football Head', image: '/assets/Core_photos/gaurav_singh_bora.png' },
            { name: 'Akshit Singhal', position: 'Badminton Head', image: '/assets/Core_photos/akshit_singhal.png' },
            { name: 'Mahesh Gehlot', position: 'Indoor Games Head', image: '/assets/Core_photos/MaheshGehlot.jpg' }
        ]
    }
];


const Team = () => {
    const pathname = usePathname();
    const isFullPage = pathname === '/team';
    const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
    const [hoveredEditorial, setHoveredEditorial] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const content = (
        <div className={isFullPage ? 'min-h-screen bg-black pt-24' : ''}>
            {isFullPage && <Navbar />}
            {isFullPage && (
                <section className="section-padding bg-black">
                    <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-spardha-orange-dark to-white bg-clip-text text-transparent">
                                Meet The <span className="!font-gang">Team</span>
                            </h1>
                            <p className="text-base md:text-lg lg:text-xl text-spardha-textMuted max-w-4xl mx-auto px-4 sm:px-0">
                                The dedicated individuals working tirelessly to make Spardha 2026 an unforgettable experience
                            </p>
                        </motion.div>
                    </div>
                </section>
            )}

            <section id="team" className={`${isFullPage ? 'section-padding' : 'min-h-screen section-padding'} bg-black`}>
                <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
                    {!isFullPage && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-spardha-text mb-4">
                                The <span className="text-spardha-gold">Architects</span>
                            </h2>
                            <div className="w-24 h-1 bg-spardha-gold mx-auto rounded-full"></div>
                        </motion.div>
                    )}

                    <div className="space-y-24">
                        {teamMembers.map((category, catIndex) => (
                            <div key={catIndex}>
                                {/* Category Title */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="mb-12"
                                >
                                    <h3 className="text-xl font-semibold text-spardha-textMuted uppercase tracking-widest mb-2 text-center">
                                        {category.role}
                                    </h3>
                                    <div className="w-16 h-[1px] bg-spardha-gold/40 mx-auto"></div>
                                </motion.div>

                                {/* EDITORIAL MINIMALIST DESIGN FOR FIRST THREE CATEGORIES */}
                                {catIndex < 3 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4 md:px-0">
                                        {category.members.map((member, memIndex) => {
                                            const cardId = `${catIndex}-${memIndex}`;
                                            const isHovered = hoveredEditorial === cardId;
                                            const isActive = isMobile || isHovered;

                                            return (
                                                <motion.div
                                                    key={memIndex}
                                                    initial={{ opacity: 0, y: 40 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: memIndex * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                                    onMouseEnter={() => setHoveredEditorial(cardId)}
                                                    onMouseLeave={() => setHoveredEditorial(null)}
                                                    className="group"
                                                >
                                                    <motion.div
                                                        animate={{
                                                            height: isActive ? (isMobile ? '450px' : '560px') : (isMobile ? '400px' : '480px')
                                                        }}
                                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                                        className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden"
                                                    >


                                                        {/* Image Container */}
                                                        <div className="relative h-full overflow-hidden">
                                                            {/* Member Image Animation */}
                                                            <motion.div
                                                                animate={{
                                                                    filter: 'grayscale(0%)',
                                                                    scale: isActive ? 1.05 : 1
                                                                }}
                                                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                                                className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}
                                                            >
                                                                {/* Member Image */}
                                                                {member.image && (
                                                                    <div className="absolute inset-0 transition-transform duration-700">
                                                                        <Image
                                                                            src={member.image}
                                                                            alt={member.name}
                                                                            fill
                                                                            className="object-cover"
                                                                            style={{
                                                                                transform: member.rotate ? `rotate(${member.rotate}deg) scale(${isMobile ? 1.9 : 1.5})` : 'none'
                                                                            }}
                                                                            sizes="(max-width: 768px) 100vw, 50vw"
                                                                            priority={catIndex === 0}
                                                                        />



                                                                    </div>
                                                                )}


                                                            </motion.div>

                                                            {/* Gradient Overlay */}
                                                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>

                                                            {/* Name and Position - Revealed on Bottom */}
                                                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                                                <motion.div
                                                                    animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0.8 }}
                                                                    transition={{ duration: 0.4 }}
                                                                >
                                                                    <p className="text-xs text-spardha-gold uppercase tracking-[0.3em] font-semibold mb-2">
                                                                        {member.position}
                                                                    </p>
                                                                    <h4 className="text-3xl font-heading font-bold text-white tracking-tight">
                                                                        {member.name}
                                                                    </h4>
                                                                    <p className={`mt-4 text-sm text-white/70 leading-relaxed max-w-xs transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                                                        {/* @ts-expect-error: bio exists on some members */}
                                                                        {member.bio}
                                                                    </p>
                                                                </motion.div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    /* ACCORDION DESIGN FOR OTHER CATEGORIES */
                                    <div
                                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-nowrap gap-4 lg:gap-2 p-4 max-w-full"
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        {category.members.map((member, memIndex) => {
                                            const globalIndex = `${catIndex}-${memIndex}`;
                                            const isHovered = hoveredIndex === globalIndex;
                                            const isAnyHovered = !isMobile && hoveredIndex !== null && hoveredIndex.startsWith(`${catIndex}-`);
                                            const isActive = isMobile || isHovered;

                                            return (
                                                <motion.div
                                                    key={memIndex}
                                                    initial={{ opacity: 0, y: 30 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: memIndex * 0.05, duration: 0.4 }}
                                                    onMouseEnter={() => setHoveredIndex(globalIndex)}
                                                    className="group relative transition-all duration-500 ease-out"
                                                    style={{
                                                        flex: isActive ? '5' : '1',
                                                        minWidth: isAnyHovered && !isActive ? '40px' : '90px',
                                                        maxWidth: isActive ? '450px' : '220px'
                                                    }}
                                                >
                                                    <div className="relative bg-spardha-base rounded-2xl overflow-hidden border border-spardha-gold/10 hover:border-spardha-gold/40 transition-all duration-500 h-[400px] hover:shadow-2xl hover:shadow-spardha-gold/20">
                                                        <div className="relative h-full overflow-hidden">
                                                            {/* Member Image or Background Gradient */}
                                                            {/* @ts-expect-error: image exists on some members */}
                                                            {member.image || category.img ? (
                                                                <>
                                                                    <div className="absolute inset-0 transition-all duration-500">
                                                                        <Image
                                                                            /* @ts-expect-error: image exists on some members */
                                                                            src={member.image || category.img}
                                                                            alt={member.name}
                                                                            fill
                                                                            className="object-cover"
                                                                            style={{
                                                                                transform: member.rotate ? `rotate(${member.rotate}deg) scale(${isMobile ? 1.9 : 1.5})` : 'none'
                                                                            }}
                                                                            sizes="(max-width: 768px) 100vw, 33vw"
                                                                        />



                                                                    </div>
                                                                    <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 group-hover:from-black/50 group-hover:via-black/30 group-hover:to-black/50 transition-all duration-500"></div>
                                                                </>
                                                            ) : (
                                                                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                                            )}

                                                            {/* Subtle Pattern */}
                                                            <div className="absolute inset-0 opacity-20" style={{
                                                                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                                                                backgroundSize: '20px 20px'
                                                            }}></div>



                                                            {/* Info Bar - Slides up only on Hover */}
                                                            <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 transition-all duration-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                                                                <h4 className="text-lg md:text-xl font-bold text-spardha-text mb-1 group-hover:text-spardha-gold transition-colors leading-tight">
                                                                    {member.name}
                                                                </h4>
                                                                <p className="text-xs text-spardha-textMuted uppercase tracking-wider font-medium">
                                                                    {member.position}
                                                                </p>
                                                                <div className={`h-[2px] w-12 mt-4 bg-gradient-to-r ${category.gradient}`}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section >
        </div >
    );

    return content;
};

export default Team;
