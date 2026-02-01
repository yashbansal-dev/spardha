import StadiumHero from '@/components/past-events/StadiumHero';
import FieldTimeline from '@/components/past-events/FieldTimeline';
import Navbar from '@/components/Navbar';

export default function PastEvents() {
    return (
        <main className="min-h-screen bg-black text-white relative font-sans">
            <Navbar />
            <StadiumHero />
            <FieldTimeline />
        </main>
    );
}
