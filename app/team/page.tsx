import { Metadata } from 'next';
import TeamContent from '@/components/TeamContent';

export const metadata: Metadata = {
    title: "The Team | SPARDHA 2026",
    description: "Meet the architects behind SPARDHA 2026. The dedicated individuals working tirelessly to make this sports festival a reality.",
};

export default function Team() {
    return <TeamContent />;
}
