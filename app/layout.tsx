import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Intempt",
  description: "Intempt Marketing Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${inter.variable}`} style={{ fontFamily: "var(--font-inter), sans-serif" }} suppressHydrationWarning>
      <body className="h-full">{children}</body>
    </html>
  );
}
