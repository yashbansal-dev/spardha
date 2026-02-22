import { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "SPARDHA 2026 | JKLU Annual Sports Fest",
  description: "Experience the energy at SPARDHA 2026, the annual sports festival of JK Lakshmipat University. Join us for Cricket, Football, Basketball, E-Sports and more!",
  keywords: ["SPARDHA 2026", "JKLU Sports Fest", "College Sports Festival", "JK Lakshmipat University", "Sports Tournament Jaipur"],
  openGraph: {
    title: "SPARDHA 2026 | JKLU Annual Sports Fest",
    description: "Join the ultimate sports celebration at JK Lakshmipat University. March 27-29, 2026.",
    url: "https://spardha-jklu.com",
    siteName: "SPARDHA",
    images: [
      {
        url: "/assets/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SPARDHA 2026",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SPARDHA 2026 | JKLU Annual Sports Fest",
    description: "Join the ultimate sports celebration at JK Lakshmipat University. March 27-29, 2026.",
    images: ["/assets/images/og-image.jpg"],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "SPARDHA 2026",
    "description": "The Annual Sports Festival of JK Lakshmipat University (JKLU).",
    "startDate": "2026-03-27",
    "endDate": "2026-03-29",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "JK Lakshmipat University",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "P.O. Mahapura, Ajmer Road",
        "addressLocality": "Jaipur",
        "postalCode": "302026",
        "addressRegion": "Rajasthan",
        "addressCountry": "IN"
      }
    },
    "image": [
      "https://spardha-jklu.com/assets/images/spardha_logo.png"
    ],
    "organizer": {
      "@type": "Organization",
      "name": "JK Lakshmipat University",
      "url": "https://jklu.edu.in"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent />
    </>
  );
}
