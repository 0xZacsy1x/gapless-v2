"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, FileSearch, Layers } from "lucide-react";
import AssessmentDemo from "./AssessmentDemo";

export default function HeroSection() {
  return (
    <header className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-6 pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Left Column: Hero Copy & Value Props */}
      <div className="lg:col-span-7 flex flex-col justify-between self-start lg:min-h-[620px] text-left space-y-8 lg:space-y-0">
        <div className="space-y-6 md:space-y-8">

          {/* Semantic H1 with Responsive Clamping */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.2rem] font-black tracking-tight leading-[1.08] text-gray-900">
            Temukan Jalur <br className="hidden sm:inline" />
            <span className="text-brand-primary">Karir Sejatimu.</span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
            Berhenti menebak-nebak masa depan. Gapless menggunakan AI perilaku untuk memetakan kepribadian unikmu ke roadmap karir berbasis data.
          </p>

          {/* CTAs */}
          <div className="space-y-3 pt-1">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center rounded-full px-8 md:px-9 bg-brand-primary hover:bg-brand-primary/90 text-white h-13 text-base font-bold shadow-lg shadow-brand-primary/20 border-none transition-all hover:scale-[1.02] cursor-pointer"
              >
                Belum Tahu Minatku <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/career-test"
                className="inline-flex items-center justify-center rounded-full px-8 md:px-9 h-13 text-base font-bold border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900 transition-all cursor-pointer"
              >
                Sudah Tahu Minatku
              </Link>
            </div>
            {/* Microcopy */}
            <p className="text-xs text-gray-400 font-medium tracking-wide">
              Tes 5-7 menit • Gratis tanpa kartu kredit • Hasil instan
            </p>
          </div>
        </div>

        {/* Cara Kerjanya — 3 Metodologi Ilmiah Terpadu (RIASEC -> SJT -> Career Construction Theory) */}
        <div className="pt-6 border-t border-gray-100/90 mt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-gray-400">
              CARA KERJA (3 METODOLOGI ILMIAH)
            </div>
            <span className="text-[10px] font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full border border-brand-primary/20">
              Validasi Ilmiah
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
            {/* Step 01: RIASEC */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl lg:text-5xl font-black text-gray-200 tracking-tight select-none">
                  01
                </span>
                <Compass className="w-8 h-8 text-blue-600 stroke-[1.6]" />
              </div>
              <div className="text-sm font-bold text-gray-900 leading-snug">
                RIASEC Model
              </div>
              <div className="text-[11px] font-semibold text-brand-primary mt-0.5">
                Pemetaan Minat & Karakter
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">
                6 orientasi minat vokasional (Holland Codes) yang selaras dengan bakat alamimu.
              </p>
            </div>

            {/* Step 02: SJT */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl lg:text-5xl font-black text-gray-200 tracking-tight select-none">
                  02
                </span>
                <FileSearch className="w-8 h-8 text-indigo-600 stroke-[1.6]" />
              </div>
              <div className="text-sm font-bold text-gray-900 leading-snug">
                Situational Judgement
              </div>
              <div className="text-[11px] font-semibold text-indigo-600 mt-0.5">
                15 Simulasi Kasus Nyata
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">
                Mendeteksi respon logis, etika keputusan, dan gaya kerja sesungguhnya.
              </p>
            </div>

            {/* Step 03: Career Construction */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl lg:text-5xl font-black text-gray-200 tracking-tight select-none">
                  03
                </span>
                <Layers className="w-8 h-8 text-emerald-600 stroke-[1.6]" />
              </div>
              <div className="text-sm font-bold text-gray-900 leading-snug">
                Career Construction
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 mt-0.5">
                Adaptabilitas & Roadmap
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">
                Teori Savickas untuk kurikulum belajar adaptif, rekomendasi kegiatan, & misi XP.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Hero Visual Animated Demo Widget */}
      <div className="lg:col-span-5 w-full flex justify-center lg:justify-end self-start">
        <AssessmentDemo />
      </div>
    </header>
  );
}
