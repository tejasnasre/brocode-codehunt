
import type { Metadata } from "next";
import "./globals.css";
import type React from "react"

import { Inter } from "next/font/google"
import "./globals.css"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JobHuntly - Discover More Than 5000+ Jobs",
  description: "Find your next career opportunity on JobHuntly",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

