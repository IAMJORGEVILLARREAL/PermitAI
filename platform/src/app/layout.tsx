import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BuildScope — Plans in. Contracts out.",
  description:
    "BuildScope reads construction plans, posts quantified scopes to a verified subcontractor marketplace, and locks permit compliance into every award.",
  openGraph: {
    title: "BuildScope — Plans in. Contracts out.",
    description:
      "Quantified scopes, competitive bids from verified subcontractors, and source-linked permit compliance.",
    images: [{ url: "/images/hero-site.jpg" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${inter.variable} h-full`}
    >
      <body className="material-grain min-h-full">{children}</body>
    </html>
  );
}
