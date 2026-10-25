"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import BentoEcosystemTour from "@/components/landing/BentoEcosystemTour";
import Footer from "@/components/Footer";

export function HomePageClient() {
  return (
    <div className="w-full min-h-screen selection:bg-brand-primary/10 flex flex-col items-center overflow-x-hidden bg-white text-slate-900 font-sans">
      {/* Shared Navigation Component */}
      <Navbar />

      {/* Hero Section — 2 Columns with Left Content & Right Upward-Sliding Animated Demo */}
      <HeroSection />

      {/* Bento Grid Features — "Ekosistem Karir Terpadu" (Biru-Putih Brand Theme with Live Auto-Tour) */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14 space-y-6 md:space-y-8 border-t border-blue-50">
        <div className="space-y-2 max-w-2xl">
          <div className="text-[11px] font-mono font-bold text-brand-primary tracking-widest uppercase">
            FITUR UTAMA · ARSITEKTUR EKOSISTEM
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 font-sans">
            Ekosistem Karir Terpadu
          </h2>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed font-normal">
            Semua instrumen yang kamu butuhkan untuk memetakan minat, menutup gap kompetensi, dan bertransisi ke industri profesional dengan percaya diri.
          </p>
        </div>

        {/* Interactive Bento Ecosystem Grid with Auto-Cycling Tour Animation */}
        <BentoEcosystemTour />
      </section>

      {/* Comprehensive Information & Navigation Footer */}
      <Footer />
    </div>
  );
}

export default HomePageClient;
