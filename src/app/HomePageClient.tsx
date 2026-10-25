"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import BentoEcosystemTour from "@/components/landing/BentoEcosystemTour";
import Footer from "@/components/Footer";

export function HomePageClient() {
  return (
    <div className="w-full min-h-screen selection:bg-blue-600/10 flex flex-col items-center overflow-x-hidden bg-white text-zinc-900 font-sans">
      {/* Shared Navigation Component */}
      <Navbar />

      {/* Hero Section — Asymmetric 2 Columns with Left Editorial Copy & Right Interactive Live Preview */}
      <HeroSection />

      {/* Architectural Bento Grid Features — "Ekosistem Karir Terpadu" */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14 space-y-6 md:space-y-8 border-t border-zinc-200/80">
        <div className="space-y-2 max-w-2xl">
          <div className="text-[11px] font-mono font-bold text-blue-700 tracking-widest uppercase">
            FITUR UTAMA · ARSITEKTUR EKOSISTEM
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-zinc-950 font-sans">
            Ekosistem Karir Terpadu
          </h2>
          <p className="text-sm md:text-base text-zinc-600 leading-relaxed font-normal">
            Semua instrumen yang kamu butuhkan untuk memetakan minat, menutup gap kompetensi, dan bertransisi ke industri profesional dengan percaya diri.
          </p>
        </div>

        {/* Architectural 1px Hairline Bento Grid */}
        <BentoEcosystemTour />
      </section>

      {/* Comprehensive Information & Navigation Footer */}
      <Footer />
    </div>
  );
}

export default HomePageClient;
