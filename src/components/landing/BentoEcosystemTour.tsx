"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Brain,
  Briefcase,
  GraduationCap,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface ArchetypePreset {
  id: string;
  name: string;
  role: string;
  score: number;
  tagline: string;
  traits: string[];
  career: string;
  matchScore: number;
  activeStep: number;
  metrics: { logic: number; creativity: number; growth: number; execution: number };
}

const ARCHETYPE_PRESETS: ArchetypePreset[] = [
  {
    id: "builder",
    name: "The Builder",
    role: "Execution & Systems",
    score: 95,
    tagline: "Kekuatan alami dalam rekayasa sistem, pemecahan masalah logis, dan eksekusi terstruktur.",
    traits: ["Arsitektur Sistem", "Logika Pemrograman", "Eksekusi Presisi"],
    career: "Software Engineer",
    matchScore: 95,
    activeStep: 2,
    metrics: { logic: 95, creativity: 65, growth: 70, execution: 98 },
  },
  {
    id: "thinker",
    name: "The Thinker",
    role: "Analytical & Logic",
    score: 90,
    tagline: "Kekuatan alami dalam membedah data kuantitatif, riset mendalam, dan pola komputasi.",
    traits: ["Investigasi Data", "Penalaran Statistik", "Analisis Pola"],
    career: "Data Analyst",
    matchScore: 92,
    activeStep: 1,
    metrics: { logic: 92, creativity: 60, growth: 80, execution: 85 },
  },
  {
    id: "creator",
    name: "The Creator",
    role: "Visual & Creative",
    score: 85,
    tagline: "Kekuatan alami dalam merancang estetika visual, pengalaman interaksi, dan prototipe kreatif.",
    traits: ["Desain Antarmuka", "Eksplorasi Visual", "Empati Pengguna"],
    career: "Graphic Designer",
    matchScore: 88,
    activeStep: 3,
    metrics: { logic: 70, creativity: 95, growth: 75, execution: 82 },
  },
  {
    id: "connector",
    name: "The Connector",
    role: "People & Growth",
    score: 92,
    tagline: "Kekuatan alami dalam komunikasi persuasif, manajemen relasi, dan strategi pertumbuhan.",
    traits: ["Pertumbuhan Pasar", "Komunikasi Strategis", "Kolaborasi Tim"],
    career: "Digital Marketing",
    matchScore: 94,
    activeStep: 2,
    metrics: { logic: 78, creativity: 85, growth: 95, execution: 88 },
  },
];

const CAREER_ROLES = [
  "Software Engineer",
  "Graphic Designer",
  "Digital Marketing",
  "Data Analyst",
];

const ROADMAP_STEPS = [
  { step: "01", title: "Fondasi Keahlian", sub: "Konsep dasar industri & algoritma" },
  { step: "02", title: "Pemetaan Skill", sub: "Framework modern & hands-on project" },
  { step: "03", title: "Eksplorasi Minat", sub: "Portofolio siap kerja & verifikasi" },
];

export default function BentoEcosystemTour() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isInView, setIsInView] = useState<boolean>(true);
  const [isTabActive, setIsTabActive] = useState<boolean>(true);
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Viewport & Visibility Observers with large rootMargin so it activates proactively
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabActive(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "250px 0px 250px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
    };
  }, []);

  // Continuous, lightweight rotation every 3.2 seconds
  useEffect(() => {
    if (prefersReducedMotion || !isInView || !isTabActive || isUserInteracting) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ARCHETYPE_PRESETS.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [isInView, isTabActive, isUserInteracting, prefersReducedMotion]);

  // Click handler: switches tab immediately and pauses auto-cycle for 6 seconds
  const handleSelectArchetype = (idx: number) => {
    setActiveIdx(idx);
    setIsUserInteracting(true);
    const timeout = setTimeout(() => {
      setIsUserInteracting(false);
    }, 6000);
    return () => clearTimeout(timeout);
  };

  const current = ARCHETYPE_PRESETS[activeIdx];

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 relative select-none w-full"
    >
      {/* =========================================================================
          CARD 1: Analisis Kepribadian (Left Bento Card - Compact, Rich & Connected)
      ========================================================================= */}
      <div className="lg:col-span-8 p-4 sm:p-5 bg-gray-50/90 border border-gray-200/90 rounded-2xl sm:rounded-3xl flex flex-col justify-between hover:border-brand-primary/40 transition-all duration-300 relative overflow-hidden group shadow-xs">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 blur-[60px] pointer-events-none" />

        {/* Card Header with Live Simulation Indicator */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 relative z-10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20 shadow-3xs">
              <Brain className="w-4 h-4 text-brand-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-gray-900 leading-tight">
                  Analisis Kepribadian
                </h3>
              </div>
              <p className="text-[11px] text-gray-500 leading-tight hidden sm:block">
                Algoritma AI memetakan respon perilaku ke 4 profil karir nyata.
              </p>
            </div>
          </div>

          {/* Live Animation Status Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-gray-200 shadow-3xs text-[10px] font-bold text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
            <span className="text-brand-primary font-black">Live Tour</span>
          </div>
        </div>

        {/* Middle Area: ACTIVE PERSONA SHOWCASE (Rich, Compact & Zero Void) */}
        <div className="my-2.5 p-3 sm:p-3.5 rounded-xl bg-white border border-gray-200/90 shadow-2xs relative z-10 space-y-2">
          {/* Active Preset Header */}
          <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-gray-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-primary">
                Profil:
              </span>
              <span className="text-sm font-black text-gray-900 transition-colors duration-300">
                {current.name}
              </span>
              <span className="text-[10px] text-gray-400 font-semibold">
                ({current.role})
              </span>
            </div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span>Dominan {current.score}%</span>
            </div>
          </div>

          {/* Dynamic Tagline */}
          <p className="text-xs text-gray-600 leading-snug font-medium line-clamp-2">
            {current.tagline}
          </p>

          {/* Dynamic Strength Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
              Kekuatan Alami:
            </span>
            {current.traits.map((trait) => (
              <span
                key={trait}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-50 border border-gray-200/80 text-gray-800 text-[10px] font-bold shadow-3xs"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-brand-primary shrink-0" />
                {trait}
              </span>
            ))}
          </div>

          {/* 4 Behavioral Spectrum Meters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1.5 border-t border-gray-100">
            <div className="space-y-0.5">
              <div className="flex justify-between text-[9px] font-bold text-gray-500">
                <span>Logika</span>
                <span className="text-brand-primary font-black tabular-nums">
                  {current.metrics.logic}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-primary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${current.metrics.logic}%` }}
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex justify-between text-[9px] font-bold text-gray-500">
                <span>Kreativitas</span>
                <span className="text-brand-primary font-black tabular-nums">
                  {current.metrics.creativity}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-primary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${current.metrics.creativity}%` }}
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex justify-between text-[9px] font-bold text-gray-500">
                <span>Kolaborasi</span>
                <span className="text-brand-primary font-black tabular-nums">
                  {current.metrics.growth}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-primary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${current.metrics.growth}%` }}
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex justify-between text-[9px] font-bold text-gray-500">
                <span>Eksekusi</span>
                <span className="text-brand-primary font-black tabular-nums">
                  {current.metrics.execution}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-primary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${current.metrics.execution}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Area: 4 Interactive Archetype Selector Tabs with Auto Progress */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 relative z-10 shrink-0">
          {ARCHETYPE_PRESETS.map((arch, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={arch.id}
                type="button"
                onClick={() => handleSelectArchetype(idx)}
                className={`p-2 rounded-lg border text-left transition-all duration-200 select-none cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? "bg-white border-brand-primary shadow-xs ring-1 ring-brand-primary/20 scale-[1.01]"
                    : "bg-white/60 border-gray-200 hover:bg-white hover:border-gray-300 opacity-75"
                }`}
              >
                {/* Auto-cycling visual progress bar for active tab */}
                {isSelected && !isUserInteracting && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-primary/20 overflow-hidden">
                    <div
                      key={`progress-${activeIdx}`}
                      className="h-full bg-brand-primary animate-[progressFill_3.2s_linear]"
                      style={{
                        animation: "progressFill 3.2s linear forwards",
                      }}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[8px] font-black uppercase tracking-wider text-brand-primary">
                    Archetype
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  )}
                </div>
                <div className="text-xs font-black text-gray-900 truncate">
                  {arch.name}
                </div>
                <div className="text-[9px] text-gray-400 truncate font-semibold">
                  {arch.score}% Match
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          RIGHT COLUMN: Cards 2 & 3 (Stacked & Compact)
      ========================================================================= */}
      <div className="lg:col-span-4 flex flex-col gap-3.5 sm:gap-4">
        {/* CARD 2: Rekomendasi Karir */}
        <div className="p-4 sm:p-4.5 bg-gray-50/90 border border-gray-200/90 rounded-2xl sm:rounded-3xl flex flex-col justify-between hover:border-brand-primary/40 transition-all duration-300 relative group flex-1 shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
                <Briefcase className="w-4 h-4 text-brand-primary" />
              </div>
              <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-400">
                Contoh tampilan
              </span>
            </div>
            <h3 className="text-base font-black tracking-tight text-gray-900 leading-tight">
              Rekomendasi Karir
            </h3>
            <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
              Dikurasi langsung dari archetype dominanmu.
            </p>
          </div>

          {/* Interactive Career Role Chips with Active Glow */}
          <div className="flex flex-wrap gap-1.5 pt-2.5">
            {CAREER_ROLES.map((role) => {
              const isMatch = role === current.career;

              return (
                <div
                  key={role}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-300 select-none flex items-center gap-1.5 shadow-3xs ${
                    isMatch
                      ? "bg-brand-primary text-white shadow-xs shadow-brand-primary/20 scale-[1.02] ring-1 ring-brand-primary/30"
                      : "bg-white border border-gray-200 text-gray-700"
                  }`}
                >
                  {isMatch && <Sparkles className="w-3 h-3 text-white" />}
                  <span>{role}</span>
                  {isMatch && (
                    <span className="text-[9px] px-1 py-0.2 bg-white/20 rounded font-black">
                      {current.matchScore}%
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CARD 3: Roadmap Belajar */}
        <div className="p-4 sm:p-4.5 bg-gray-50/90 border border-gray-200/90 rounded-2xl sm:rounded-3xl flex flex-col justify-between hover:border-brand-primary/40 transition-all duration-300 relative group flex-1 shadow-xs">
          <div>
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800 border border-gray-200 mb-1.5">
              <GraduationCap className="w-4 h-4 text-gray-900" />
            </div>
            <h3 className="text-base font-black tracking-tight text-gray-900 leading-tight">
              Roadmap Belajar
            </h3>
            <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
              Tahapan kurikulum progresif menuju kesiapan kerja.
            </p>
          </div>

          {/* Stepper with Live Active Highlight */}
          <div className="space-y-1.5 pt-2.5">
            {ROADMAP_STEPS.map((s, idx) => {
              const stepNum = idx + 1;
              const isActive = current.activeStep >= stepNum;

              return (
                <div
                  key={s.step}
                  className={`flex items-center gap-2.5 p-1.5 px-2 rounded-lg transition-all duration-300 ${
                    current.activeStep === stepNum
                      ? "bg-white border border-brand-primary/30 shadow-3xs"
                      : "bg-transparent opacity-75"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 transition-colors ${
                      isActive
                        ? "bg-brand-primary text-white shadow-3xs"
                        : "bg-white border border-gray-200 text-gray-400"
                    }`}
                  >
                    {s.step}
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`text-xs font-bold leading-tight ${
                        isActive ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {s.title}
                    </div>
                    <div className="text-[10px] text-gray-400 truncate leading-tight">
                      {s.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Inline styles for the progress fill keyframe */}
      <style jsx>{`
        @keyframes progressFill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
