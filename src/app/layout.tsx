import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TRUK พุทธรักษา | ผู้เชี่ยวชาญผลิตและประกอบตัวถังรถบรรทุกขยะ",
  description:
    "รับผลิต ออกแบบ และประกอบตัวถังรถบรรทุกขยะทุกประเภท รถอัดท้าย รถเทท้าย รถอัดข้าง โดยช่างผู้เชี่ยวชาญกว่า 20 ปี พร้อมบริการหลังการขายครบวงจร ส่งมอบทั่วประเทศ",
  keywords: [
    "รถบรรทุกขยะ",
    "รถอัดขยะ",
    "ประกอบตัวถังรถขยะ",
    "รถเทท้าย",
    "รถอัดท้าย",
    "รถขยะ 6 ล้อ",
    "รถขยะ 10 ล้อ",
    "ผลิตรถขยะ",
    "ซ่อมรถบรรทุกขยะ",
    "TRUK พุทธรักษา",
  ],
  openGraph: {
    title: "TRUK พุทธรักษา | ผู้เชี่ยวชาญรถบรรทุกขยะ",
    description:
      "รับผลิต ออกแบบ และประกอบตัวถังรถบรรทุกขยะทุกประเภท กว่า 500 คันทั่วประเทศ",
    type: "website",
    locale: "th_TH",
    siteName: "TRUK พุทธรักษา",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${notoSansThai.variable} h-full antialiased`}
    >
      <body className={`${notoSansThai.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
