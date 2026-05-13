import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI전공 AI교육 강사 | 김강사",
  description: "강의경력 8년, 삼성 출강 경험. 기업·공공기관 AI 교육 전문 강사 김강사에게 문의하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable}>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-RRWV2NJPY2" />
      <Analytics />
    </html>
  );
}
