import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Next.js 14で利用可能なフォントに変更
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "漫画管理システム",
  description: "自作漫画の管理システム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
