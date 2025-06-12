import { Metadata } from 'next';
import "./globals.css";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: {
    default: "リアルファイト - ホンモノの戦い",
    template: "%s | リアルファイト"
  },
  description: "リアルファイトの漫画を読むことができる漫画ビューアです。",
  keywords: ["漫画", "コミック", "リアルファイト", "ホンモノの戦い", "ビューア"],
  authors: [{ name: "リアルファイト" }],
  creator: "リアルファイト",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    title: "リアルファイト - ホンモノの戦い",
    description: "リアルファイトの漫画を読むことができる漫画ビューアです",
    siteName: "リアルファイト",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "リアルファイト"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "リアルファイト - ホンモノの戦い",
    description: "リアルファイトの漫画を読むことができる漫画ビューアです",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "リアルファイト"
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: undefined,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
