import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Insights for Fantasy Cricket",
  description: "CricBrains is your go-to cricket analytics platform designed for fantasy cricket players on Dream11, My11Circle, and MPL. Get expert Dream11 predictions, player stats, match analysis, pitch reports, and AI-powered fantasy team suggestions to maximize your winnings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        <div className="text-neutral-700">
        {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
