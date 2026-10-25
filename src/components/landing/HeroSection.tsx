"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, FileSearch, Briefcase, Check } from "lucide-react";
import AssessmentDemo from "./AssessmentDemo";

export default function HeroSection() {
  return (
    <header className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-6 pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start font-sans">
      {/* Left Column: Hero Editorial Copy & Methodology Cards */}
      <div className="lg:col-span-7 flex flex-col justify-between self-start text-left space-y-5 lg:space-y-6">
        <div className="space-y-5">
          {/* Proof Strip Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 shadow-3xs">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-primary">
              Standar Riset 702+ Lowongan Industri
            </span>
          </div>

          {/* Editorial Semantic H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-slate-900 font-sans">
            Temukan Jalur <br className="hidden sm:inline" />
            <span className="text-brand-primary">Karir Sejatimu.</span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal font-sans">
            Berhenti menebak-nebak masa depan. Gapless menggunakan model psikometri RIASEC, 15 simulasi kasus situasional (SJT), dan data analitik dari 702+ lowongan kerja untuk memetakan kesiapan kariermu ke roadmap terstruktur.
          </p>

          {/* Tactile Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/assessment?quizType=belum_tahu_minat"
                className="btn-press inline-flex items-center justify-center rounded-xl px-7 py-3.5 bg-brand-primary hover:bg-brand-secondary text-white text-sm sm:text-base font-bold shadow-md shadow-brand-primary/25 transition-all cursor-pointer group"
              >
                <span>Belum Tahu Minatku</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/career-test"
                className="btn-press inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm sm:text-base font-bold border border-slate-200 bg-white hover:bg-blue-50/60 text-slate-800 transition-all cursor-pointer"
              >
                <span>Sudah Tahu Minatku</span>
              </Link>
            </div>

            {/* Micro Trust Proof */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-0.5 text-xs text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Gratis untuk mahasiswa
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Asesmen ringkas 5–7 menit
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Didukung Google Gemini AI
              </span>
            </div>
          </div>
        </div>

        {/* Cara Kerjanya — 3 Fondasi Riset & Standar Industri (Tightened Divider) */}
        <div className="pt-2 sm:pt-2.5 -mt-2 sm:-mt-2.5 border-t border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-slate-400">
              CARA KERJA &amp; STANDAR RISET
            </div>
            <span className="text-[10px] font-bold text-brand-primary bg-brand-primary/10 px-2.5 py-0.5 rounded-full border border-brand-primary/20">
              Data 702 Lowongan
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
            {/* Step 01: RIASEC */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl lg:text-5xl font-black text-slate-200 tracking-tight select-none font-sans">
                  01
                </span>
                <Compass className="w-8 h-8 text-blue-600 stroke-[1.6]" />
              </div>
              <div className="text-sm font-bold text-slate-900 leading-snug">
                RIASEC Model
              </div>
              <div className="text-[11px] font-semibold text-brand-primary mt-0.5">
                Pemetaan Minat &amp; Karakter
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                6 orientasi minat vokasional (Holland Codes) yang selaras dengan bakat alamimu.
              </p>
            </div>

            {/* Step 02: SJT */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl lg:text-5xl font-black text-slate-200 tracking-tight select-none font-sans">
                  02
                </span>
                <FileSearch className="w-8 h-8 text-indigo-600 stroke-[1.6]" />
              </div>
              <div className="text-sm font-bold text-slate-900 leading-snug">
                Situational Judgement
              </div>
              <div className="text-[11px] font-semibold text-indigo-600 mt-0.5">
                15 Simulasi Kasus Nyata
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Mendeteksi respon logis, etika keputusan, dan gaya kerja sesungguhnya.
              </p>
            </div>

            {/* Step 03: Asesmen Skill Gap */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl lg:text-5xl font-black text-slate-200 tracking-tight select-none font-sans">
                  03
                </span>
                <Briefcase className="w-8 h-8 text-emerald-600 stroke-[1.6]" />
              </div>
              <div className="text-sm font-bold text-slate-900 leading-snug">
                Asesmen Skill Gap
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 mt-0.5">
                Standar Industri Nyata
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Dirancang berbasis data standar skill dari 702 lowongan pekerjaan di berbagai perusahaan terkemuka.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Hero Visual Animated Demo Widget with Live Auto Movement and Mouse Cursor */}
      <div className="lg:col-span-5 w-full flex justify-center lg:justify-end self-start">
        <AssessmentDemo />
      </div>
    </header>
  );
}
