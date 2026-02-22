import { Metadata } from 'next';
import ContactContent from '@/components/ContactContent';

export const metadata: Metadata = {
    title: "Contact Us | SPARDHA 2026",
    description: "Got questions? Reach out to the SPARDHA 2026 team. We're here to help you navigate the arena.",
};

export default function ContactPage() {
    return <ContactContent />;
}
