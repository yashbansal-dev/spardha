import { Metadata } from 'next';
import GalleryContent from '@/components/GalleryContent';

export const metadata: Metadata = {
    title: "Gallery | SPARDHA 2026",
    description: "Relive the greatest moments from SPARDHA. High-energy action shots from our annual sports festival.",
};

export default function Gallery() {
    return <GalleryContent />;
}
