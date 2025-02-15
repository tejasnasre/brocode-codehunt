import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import Footer from "../components/Footer";
import "./globals.css";
import type React from "react";

// Initialize fonts
const inter = Inter({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "JobHuntly - Discover More Than 5000+ Jobs",
  description: "Find your next career opportunity on JobHuntly",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${geistMono.variable} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
