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

      {/* Bento Grid Features — "Ekosistem Karir Terpadu" (Generous Bottom Spacing) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-8 pb-14 md:pt-10 md:pb-24 lg:pt-12 lg:pb-28 space-y-5 md:space-y-6 border-t border-blue-50/70">
        <div className="space-y-1.5 max-w-2xl">
          <div className="text-[10.5px] font-mono font-bold text-brand-primary tracking-widest uppercase">
            FITUR UTAMA · ARSITEKTUR EKOSISTEM
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-900 font-sans">
            Ekosistem Karir Terpadu
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            Kurikulum 4 fase terstruktur, simulasi tantangan harian, dan verifikasi portofolio industri.
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
