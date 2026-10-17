"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import BentoEcosystemTour from "@/components/landing/BentoEcosystemTour";
import AdaptiveCtaButton from "@/components/landing/AdaptiveCtaButton";

export function HomePageClient() {
  return (
    <div className="w-full min-h-screen selection:bg-brand-primary/10 flex flex-col items-center overflow-x-hidden bg-white text-gray-900 font-sans">
      {/* Shared Navigation Component */}
      <Navbar />

      {/* Hero Section — 2 Columns with Left Content & Right Upward-Sliding Animated Demo */}
      <HeroSection />

      {/* Bento Grid Features — "Ekosistem Karir Terpadu" (Compact single-viewport fit) */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12 space-y-4 md:space-y-6 border-t border-gray-100">
        <div className="space-y-1.5 max-w-2xl">
          <div className="text-[11px] font-bold text-brand-primary tracking-widest uppercase">
            Fitur Utama
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
            Ekosistem Karir Terpadu
          </h2>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed">
            Semua yang kamu butuhkan untuk bertransisi dari dunia kampus ke industri profesional dengan percaya diri.
          </p>
        </div>

        {/* Interactive Bento Ecosystem Grid with Tour Animation */}
        <BentoEcosystemTour />
      </section>

      {/* Closing CTA — Compact Strip (No extra long scroll) */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16 text-center">
        <div className="p-8 md:p-12 rounded-4xl md:rounded-[40px] bg-gray-50 border border-gray-200/80 space-y-6 relative overflow-hidden">
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900">
              Siap menemukan arah karier sejatimu?
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              Mulai dari tes 8-15 menit dan dapatkan rekomendasi karier serta roadmap belajar pribadimu.
            </p>
          </div>
          <div>
            <AdaptiveCtaButton />
          </div>
        </div>
      </section>

      {/* Footer — Clean, no dead # links */}
      <footer className="w-full max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-10 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <div className="text-xs font-bold text-gray-400 tracking-wider uppercase">
          © 2026 GAPLESS PLATFORM. DIBUAT UNTUK MAHASISWA INDONESIA.
        </div>
        <div className="text-xs text-gray-400 font-medium">
          Didesain untuk kejelasan arah masa depanmu.
        </div>
      </footer>
    </div>
  );
}

export default HomePageClient;
