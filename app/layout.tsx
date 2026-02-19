import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Alice } from 'next/font/google';
import SmoothScroll from "@/components/ui/SmoothScroll";
import "./globals.css";
import ClientLoader from "@/components/ClientLoader";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import CustomCursor from "@/components/ui/CustomCursor";

const gangOfThree = localFont({
  src: [
    {
      path: './fonts/go3v2.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-gang',
  display: 'swap',
});

const alice = Alice({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-alice',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SPARDHA | JKLU Sports Fest",
  description: "Annual Sports Festival of JK Lakshmipat University (JKLU). Experience the energy.",
  icons: {
    icon: "/assets/images/spardha_logo.png",
    shortcut: "/assets/images/spardha_logo.png",
    apple: "/assets/images/spardha_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gangOfThree.variable} ${alice.variable} antialiased font-gang`}
      >
        <CartProvider>
          <SmoothScroll>
            <ClientLoader>
              <CustomCursor />
              {children}
            </ClientLoader>
            <CartDrawer />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
