import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Kurye Yönetim Sistemi",
  description: "Profesyonel kurye ve sipariş yönetim sistemi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning className={inter.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <div className="min-h-screen bg-background transition-colors duration-200">
            <Navbar />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 p-8 mx-auto max-w-7xl">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
