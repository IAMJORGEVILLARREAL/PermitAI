import type { Metadata } from "next";
import { FooterDisclaimer } from "@/components/layout/FooterDisclaimer";
import { Nav } from "@/components/layout/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuildScope AI",
  description: "Plans → scopes → subcontractors → compliance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <Nav />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
        <FooterDisclaimer />
      </body>
    </html>
  );
}
