import { Metadata } from 'next';
import CompetitionsContent from '@/components/CompetitionsContent';

export const metadata: Metadata = {
    title: "Competitions | SPARDHA 2026",
    description: "Explore the wide range of competitive sports and e-sports at SPARDHA 2026. Prove your mettle in the arena.",
};

export default function Competitions() {
    return <CompetitionsContent />;
}
