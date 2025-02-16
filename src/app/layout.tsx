import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Footer from "../components/Footer";
import "./globals.css";
import type React from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "gethired. - Discover More Than 5000+ Jobs",
  description: "Find your next career opportunity on gethired.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>
        <Header />
        <Toaster />
        {children}
        <Footer />
      </body>
    </html>
  );
}
