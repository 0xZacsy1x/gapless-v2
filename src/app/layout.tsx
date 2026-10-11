import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GaplessProvider } from "@/contexts/CareerContext";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gapless.id'),
  title: {
    default: 'Gapless — Temukan Karier Terbaikmu dengan AI',
    template: '%s | Gapless',
  },
  description:
    'Gapless membantu mahasiswa Indonesia menemukan jalur karier yang sesuai, menganalisis skill gap, dan membangun roadmap belajar personal berbasis AI. Mulai gratis.',
  keywords: [
    'gapless',
    'gapless.id',
    'tes minat karier mahasiswa',
    'skill gap analysis Indonesia',
    'rekomendasi karier AI',
    'roadmap belajar karier',
    'konseling karier mahasiswa Indonesia',
  ],
  authors: [{ name: 'Gapless', url: 'https://www.gapless.id' }],
  creator: 'Gapless',
  verification: {
    google: 'CTmPgwiATIZCFAv4IK6gy_Q_jqc08V1Utm2o-RABNFg',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://www.gapless.id',
    siteName: 'Gapless',
    title: 'Gapless — Temukan Karier Terbaikmu dengan AI',
    description:
      'Platform konseling karier dan analisis skill gap berbasis AI untuk mahasiswa Indonesia.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gapless — Platform Karier AI untuk Mahasiswa Indonesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gapless — Temukan Karier Terbaikmu dengan AI',
    description:
      'Platform konseling karier dan analisis skill gap berbasis AI untuk mahasiswa Indonesia.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          <GaplessProvider>
            {children}
          </GaplessProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
