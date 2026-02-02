import TimelineContainer from '@/components/past-events/TimelineContainer';
import Navbar from '@/components/Navbar';

export default function PastEvents() {
    return (
        <main className="min-h-screen bg-black text-white relative font-sans">
            <Navbar />
            <TimelineContainer />
        </main>
    );
}
