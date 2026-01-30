'use client';

import Navbar from '@/components/Navbar';
import InfiniteMenu from '@/components/ui/InfiniteMenu';

const items = [
    {
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
        link: '#',
        title: 'OPENING',
        description: 'The Beginning'
    },
    {
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
        link: '#',
        title: 'CRICKET',
        description: 'World Class'
    },
    {
        image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80',
        link: '#',
        title: 'FOOTBALL',
        description: 'Kickoff'
    },
    {
        image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
        link: '#',
        title: 'TEAM',
        description: 'Unity'
    },
    {
        image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80',
        link: '#',
        title: 'VICTORY',
        description: 'Awards Night'
    },
    {
        image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80',
        link: '#',
        title: 'GOAL',
        description: 'Striking Success'
    },
    {
        image: 'https://images.unsplash.com/photo-1470229722913-7ea051c7130e?w=800&q=80',
        link: '#',
        title: 'CROWD',
        description: 'Electric'
    },
    {
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
        link: '#',
        title: 'SOCCER',
        description: 'Field of Dreams'
    },
    {
        image: 'https://images.unsplash.com/photo-1514525253440-b393452e2729?w=800&q=80',
        link: '#',
        title: 'MUSIC',
        description: 'Live Show'
    },
    {
        image: 'https://images.unsplash.com/photo-1624880357913-a8539238245b?w=800&q=80',
        link: '#',
        title: 'ACTION',
        description: 'Intense Play'
    },
    {
        image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80',
        link: '#',
        title: 'GLORY',
        description: 'Trophy Moment'
    },
    {
        image: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=800&q=80',
        link: '#',
        title: 'LIGHTS',
        description: 'Night Vibes'
    },
    {
        image: 'https://images.unsplash.com/photo-1519861531473-920026393112?w=800&q=80',
        link: '#',
        title: 'BASKETBALL',
        description: 'Slam Dunk'
    },
    {
        image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80',
        link: '#',
        title: 'FANS',
        description: 'Cheering Loud'
    },
    {
        image: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=800&q=80',
        link: '#',
        title: 'SKATE',
        description: 'Halfpipe'
    },
    {
        image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80',
        link: '#',
        title: 'RUN',
        description: 'The Sprint'
    }
];

export default function Gallery() {
    return (
        <main className="h-screen w-screen bg-[#020617] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617]/50 to-[#020617] pointer-events-none z-0" />

            <div className="relative z-10">
                <Navbar />
            </div>

            <div className="absolute inset-0 z-0">
                <InfiniteMenu items={items} />
            </div>

            {/* Instructions Overlay */}
            <div className="absolute bottom-8 right-8 z-50 pointer-events-none">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-4 animate-fade-in shadow-2xl">
                    <div className="relative w-8 h-8 flex items-center justify-center">
                        {/* Hand Icon Animation */}
                        <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-ping opacity-20"></div>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="text-white w-6 h-6 animate-pulse"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <path d="M12 17h.01" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-sm tracking-widest uppercase">Drag to Rotate</span>
                        <span className="text-white/50 text-[10px] font-mono tracking-wider">INTERACTIVE 3D VIEW</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
