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
  title: "TRUK พุทธรักษา - ผู้เชี่ยวชาญด้านการผลิตและประกอบตัวถังรถบรรทุกขยะ",
  description:
    "รับผลิตและออกแบบตัวถังรถบรรทุกขยะทุกประเภท โดยช่างผู้เชี่ยวชาญ พร้อมบริการหลังการขายแบบครบวงจร",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
