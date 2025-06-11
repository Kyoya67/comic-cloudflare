'use client';

import { usePathname } from 'next/navigation';
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <html lang="ja">
      <body>
        {!isAdminPage && <Header />}
        {children}
        <Footer />
      </body>
    </html>
  );
}
