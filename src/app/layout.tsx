import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jeevan AI — Cultural Intelligence Platform",
  description:
    "Understand Taste. Discover Connections. Experience Life. A unified cultural intelligence platform powered by Qloo Taste AI and agentic orchestration.",
  keywords: [
    "Jeevan AI",
    "Qloo",
    "Cultural Intelligence",
    "Agentic AI",
    "Taste AI",
    "Travel Concierge",
    "Maximin Fairness",
    "Creative Direction",
  ],
  icons: {
    icon: "/brand/jeevan-icon.png",
    shortcut: "/brand/jeevan-icon.png",
    apple: "/brand/jeevan-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#07080d] text-[#f8fafc]">
        {children}
      </body>
    </html>
  );
}
