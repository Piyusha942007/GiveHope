import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GiveHope | Transparent & Impactful Giving Platform",
  description: "GiveHope is the world's most trusted frictionless giving platform. We ensure your donation goes directly to verified causes with 100% transparency and real-time impact tracking.",
  metadataBase: new URL("https://givehope-iota.vercel.app"),
  openGraph: {
    title: "GiveHope | Transparent & Impactful Giving Platform",
    description: "Verified impact, 100% transparency. Join the future of global giving.",
    url: "https://givehope-iota.vercel.app",
    siteName: "GiveHope",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GiveHope | Transparent & Impactful Giving Platform",
    description: "Verified impact, 100% transparency. Join the future of global giving.",
    creator: "@GiveHope",
  },
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DonationProvider } from "@/context/DonationContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="font-sans min-h-screen flex flex-col bg-white">
        <DonationProvider>
          <Navbar />
          <main className="flex-grow flex flex-col page-fade-in">
            {children}
          </main>
          <Footer />
        </DonationProvider>
      </body>
    </html>
  );
}
