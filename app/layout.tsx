import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import ClientLoader from "@/components/ClientLoader";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

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

export const metadata: Metadata = {
  title: "SPARDHA | JKLU Sports Fest",
  description: "Annual Sports Festival of JK Lakshmipat University (JKLU). Experience the energy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gangOfThree.variable} antialiased font-gang`}
      >
        <CartProvider>
          <ClientLoader>
            {children}
            <CartDrawer />
          </ClientLoader>
        </CartProvider>
      </body>
    </html>
  );
}

