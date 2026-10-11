import type { Metadata } from 'next';
import { HomePageClient } from './HomePageClient';

export const metadata: Metadata = {
  title: 'Gapless — Tes Minat Karier & Analisis Skill Gap Mahasiswa',
  description:
    'Temukan jalur karier yang cocok untukmu dalam 5 menit. Gapless menganalisis kepribadian dan skill gap kamu, lalu membuat roadmap belajar personal berbasis AI. Gratis untuk mahasiswa Indonesia.',
  alternates: {
    canonical: 'https://www.gapless.id',
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
