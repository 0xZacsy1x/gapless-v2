"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, FileSearch, Briefcase, Check } from "lucide-react";
import AssessmentDemo from "./AssessmentDemo";

export default function HeroSection() {
  return (
    <header className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-6 pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start font-sans">
      {/* Left Column: Hero Editorial Copy & Methodology Cards */}
      <div className="lg:col-span-7 flex flex-col justify-between self-start text-left space-y-8 lg:space-y-10">
        <div className="space-y-6">
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
          <div className="space-y-3 pt-1">
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
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs text-slate-500 font-medium">
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

        {/* 3 Fondasi Riset & Standar Industri */}
        <div className="pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3.5">
            <div className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400">
              STANDAR RISET &amp; METODOLOGI
            </div>
            <span className="text-[10px] font-mono font-bold text-brand-primary bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              3 FONDASI ILMIAH
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Step 01: RIASEC */}
            <div className="p-3.5 rounded-xl border border-blue-100 bg-white/90 hover:border-blue-300 shadow-3xs transition-colors flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-slate-400 tracking-wider">
                  01 / RIASEC
                </span>
                <Compass className="w-4 h-4 text-brand-primary" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 leading-snug">
                  Holland Codes
                </div>
                <div className="text-[11px] font-medium text-brand-primary mt-0.5">
                  6 Orientasi Minat
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                  Mendeteksi keselarasan bakat alamiah dengan jalur karir vokasional.
                </p>
              </div>
            </div>

            {/* Step 02: SJT */}
            <div className="p-3.5 rounded-xl border border-blue-100 bg-white/90 hover:border-blue-300 shadow-3xs transition-colors flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-slate-400 tracking-wider">
                  02 / SJT
                </span>
                <FileSearch className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 leading-snug">
                  Situational Test
                </div>
                <div className="text-[11px] font-medium text-indigo-600 mt-0.5">
                  15 Simulasi Kasus
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                  Mengevaluasi etika kerja, pengambilan keputusan, dan pola kolaborasi.
                </p>
              </div>
            </div>

            {/* Step 03: Asesmen Skill Gap */}
            <div className="p-3.5 rounded-xl border border-blue-100 bg-white/90 hover:border-blue-300 shadow-3xs transition-colors flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-slate-400 tracking-wider">
                  03 / SKILL GAP
                </span>
                <Briefcase className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 leading-snug">
                  Skill Gap Analysis
                </div>
                <div className="text-[11px] font-medium text-emerald-700 mt-0.5">
                  702+ Lowongan
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                  Mengukur jarak kesiapan kompetensi riil terhadap standar rekrutmen.
                </p>
              </div>
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
