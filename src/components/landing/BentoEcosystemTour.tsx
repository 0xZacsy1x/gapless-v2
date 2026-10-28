"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import {
  GraduationCap,
  Target,
  CheckCircle2,
  Lock,
  Bookmark,
  Clock,
  Award,
  ArrowRight,
  Check,
} from "lucide-react";

// Career Roadmaps Data (Streamlined & Clean)
const ROADMAP_PRESETS = [
  {
    id: "swe",
    career: "Software Engineer",
    track: "Full-Stack & Cloud Architecture",
    overallProgress: 68,
    completedModule: {
      phase: "Fase 01 — Fondasi Sistem",
      name: "Algoritma Pemrograman, Struktur Data & Database Relasional",
      skills: ["Data Structures", "PostgreSQL & SQL Indexing", "Git Workflow"],
      project: "Studi Kasus: Engine Transaksi Database & Logging",
      score: "94/100 (A)",
      pace: "2 Minggu • Selesai",
    },
    activeModule: {
      phase: "Fase 02 — Modul Aktif",
      name: "Framework Modern & Arsitektur API",
      skills: ["React 19 & Next.js", "REST & GraphQL", "State Architecture"],
      project: "Studi Kasus: Sistem Finansial & Checkout Skala Nyata",
      pace: "3 Minggu • 15 Jam Belajar",
    },
    phases: [
      {
        phase: 1,
        title: "Fondasi Sistem",
        status: "completed",
        modules: ["Algoritma Dasar", "Database & SQL"],
      },
      {
        phase: 2,
        title: "Praktik Industri",
        status: "in_progress",
        modules: ["Next.js & React 19", "Arsitektur API"],
      },
      {
        phase: 3,
        title: "Spesialisasi Cloud",
        status: "ready",
        modules: ["Docker Container", "CI/CD Pipeline"],
      },
      {
        phase: 4,
        title: "Kesiapan Kerja",
        status: "locked",
        modules: ["Capstone Portofolio", "Mock Tech Interview"],
      },
    ],
  },
  {
    id: "data",
    career: "Data Analyst",
    track: "Business Intelligence & Machine Learning",
    overallProgress: 62,
    completedModule: {
      phase: "Fase 01 — Fondasi Analitik",
      name: "Statistika Deskriptif, Probabilitas & SQL Tingkat Lanjut",
      skills: ["Statistika Deskriptif", "Complex SQL Joins", "Data Cleaning"],
      project: "Studi Kasus: Analisis Retensi & Cohort E-Commerce",
      score: "96/100 (A+)",
      pace: "2 Minggu • Selesai",
    },
    activeModule: {
      phase: "Fase 02 — Modul Aktif",
      name: "Pemrosesan Data & Exploratory Analysis",
      skills: ["Python & Pandas", "Data Wrangling", "Tableau Dashboard"],
      project: "Studi Kasus: Prediksi Churn Pelanggan & Analisis LTV",
      pace: "3 Minggu • 14 Jam Belajar",
    },
    phases: [
      {
        phase: 1,
        title: "Fondasi Analitik",
        status: "completed",
        modules: ["Statistika Deskriptif", "Advanced SQL"],
      },
      {
        phase: 2,
        title: "Pemrosesan Data",
        status: "in_progress",
        modules: ["Python & Pandas", "Tableau Dashboard"],
      },
      {
        phase: 3,
        title: "Pemodelan Prediktif",
        status: "ready",
        modules: ["Scikit-Learn ML", "A/B Testing"],
      },
      {
        phase: 4,
        title: "Kesiapan Industri",
        status: "locked",
        modules: ["Executive Storytelling", "Portfolio Pipeline"],
      },
    ],
  },
  {
    id: "design",
    career: "UI/UX Designer",
    track: "Product Design & Design Systems",
    overallProgress: 75,
    completedModule: {
      phase: "Fase 01 — Fondasi Desain",
      name: "Prinsip Desain Visual & Fondasi Design System",
      skills: ["Visual Hierarchy", "Design Tokens", "Wireframing"],
      project: "Studi Kasus: UI Style Guide & Token Handoff",
      score: "92/100 (A)",
      pace: "2 Minggu • Selesai",
    },
    activeModule: {
      phase: "Fase 02 — Modul Aktif",
      name: "Riset Pengguna & Interactive Prototyping",
      skills: ["User Flow Mapping", "Figma Auto-Layout", "Usability Testing"],
      project: "Studi Kasus: Redesain End-to-End Onboarding FinTech",
      pace: "2.5 Minggu • 12 Jam Belajar",
    },
    phases: [
      {
        phase: 1,
        title: "Fondasi Desain",
        status: "completed",
        modules: ["Design Principles", "Figma Auto-Layout"],
      },
      {
        phase: 2,
        title: "Riset & Prototyping",
        status: "in_progress",
        modules: ["Interactive Prototype", "Usability Testing"],
      },
      {
        phase: 3,
        title: "Interaksi Lanjutan",
        status: "ready",
        modules: ["Micro-interactions", "Design Token Handoff"],
      },
      {
        phase: 4,
        title: "Portofolio Produk",
        status: "locked",
        modules: ["Case Study Showcase", "Design Critique"],
      },
    ],
  },
];

// Rekomendasi Kegiatan Data
const KEGIATAN_PRESETS = [
  {
    id: "k1",
    title: "Bangkit Academy 2026",
    type: "Studi Independen",
    match: 95,
    organizer: "Google, GoTo, Traveloka",
    tags: ["Cloud Computing", "AI/ML", "Konversi 20 SKS"],
    deadline: "Sisa 5 Hari",
  },
  {
    id: "k2",
    title: "Hackathon Inovasi Nasional",
    type: "Kompetisi",
    match: 92,
    organizer: "Kemenpora & BUMN",
    tags: ["Inovasi Digital", "Hadiah Rp50 Jt", "Tim 3 Orang"],
    deadline: "Pendaftaran Dibuka",
  },
  {
    id: "k3",
    title: "Tech Talent Internship",
    type: "Magang",
    match: 88,
    organizer: "Top Tech Unicorn",
    tags: ["Full-time Hybrid", "Mentoring 1-on-1", "Paid"],
    deadline: "Sisa 12 Hari",
  },
];

export default function BentoEcosystemTour() {
  const containerRef = useRef<HTMLDivElement>(null);
  const roadmapBodyRef = useRef<HTMLDivElement>(null);
  const kegiatanBodyRef = useRef<HTMLDivElement>(null);

  // States for Left Card & Bottom Card
  const [activeCareerIdx, setActiveCareerIdx] = useState<number>(0);
  const [activeKegiatanIdx, setActiveKegiatanIdx] = useState<number>(0);
  const [bookmarkedId, setBookmarkedId] = useState<string>("k1");
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
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Smooth crossfade on career change
  useGSAP(() => {
    if (roadmapBodyRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        roadmapBodyRef.current,
        { opacity: 0.5, y: 3 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [activeCareerIdx, prefersReducedMotion]);

  // Smooth crossfade on kegiatan change
  useGSAP(() => {
    if (kegiatanBodyRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        kegiatanBodyRef.current,
        { opacity: 0.5, y: 3 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [activeKegiatanIdx, prefersReducedMotion]);

  // IntersectionObserver & Visibility handling
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabActive(!document.hidden);
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

  // Auto-cycle Left Card Career Roadmap every 5.0 seconds
  useEffect(() => {
    if (prefersReducedMotion || !isInView || !isTabActive || isUserInteracting) return;

    const timer = setInterval(() => {
      setActiveCareerIdx((prev) => (prev + 1) % ROADMAP_PRESETS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isInView, isTabActive, isUserInteracting, prefersReducedMotion]);

  // Auto-cycle Kegiatan in Bottom Card every 4.0 seconds
  useEffect(() => {
    if (prefersReducedMotion || !isInView || !isTabActive) return;

    const timer = setInterval(() => {
      setActiveKegiatanIdx((prev) => (prev + 1) % KEGIATAN_PRESETS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isInView, isTabActive, prefersReducedMotion]);

  const handleSelectCareer = (idx: number) => {
    setActiveCareerIdx(idx);
    setIsUserInteracting(true);
    const timeout = setTimeout(() => {
      setIsUserInteracting(false);
    }, 6000);
    return () => clearTimeout(timeout);
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedId((prev) => (prev === id ? "" : id));
  };

  const currentRoadmap = ROADMAP_PRESETS[activeCareerIdx];
  const currentKegiatan = KEGIATAN_PRESETS[activeKegiatanIdx];

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsUserInteracting(true)}
      onMouseLeave={() => setIsUserInteracting(false)}
      className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 select-none w-full items-stretch font-sans"
    >
      {/* =========================================================================
          ROW 1, CARD 1: ROADMAP BELAJAR TERSTRUKTUR (lg:col-span-7)
      ========================================================================= */}
      <div className="lg:col-span-7 p-4 sm:p-5 bg-white border border-slate-200/90 rounded-2xl flex flex-col justify-between shadow-[0_16px_36px_-8px_rgba(0,0,0,0.14),0_4px_12px_-2px_rgba(0,0,0,0.05)] space-y-3 min-h-[465px] h-full">
        {/* Top Header */}
        <div className="space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-brand-primary border border-blue-100 shadow-3xs">
                <GraduationCap className="w-4 h-4 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 leading-tight">
                  Roadmap Belajar Terstruktur
                </h3>
                <p className="text-[11px] text-slate-500">
                  Kurikulum 4 fase progresif terkalibrasi dengan standar industri nyata.
                </p>
              </div>
            </div>

            {/* Subtle Live Tour Indicator (Text, no loud pill) */}
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 self-start sm:self-auto font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Tur Otomatis</span>
            </div>
          </div>

          {/* Interactive Career Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {ROADMAP_PRESETS.map((preset, idx) => {
              const isSelected = idx === activeCareerIdx;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectCareer(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer btn-press flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white hover:bg-slate-50 border border-slate-200 text-slate-700"
                  }`}
                >
                  <span>{preset.career}</span>
                  <span
                    className={`text-[10px] font-mono tabular-nums font-bold ${
                      isSelected ? "text-slate-300" : "text-slate-400"
                    }`}
                  >
                    {preset.overallProgress}%
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Career Track Banner */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 shrink-0">
                Jalur Fokus:
              </span>
              <span className="text-xs font-bold text-slate-800 truncate">
                {currentRoadmap.track}
              </span>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-20 sm:w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-primary rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${currentRoadmap.overallProgress}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-slate-900 tabular-nums">
                {currentRoadmap.overallProgress}% Kesiapan
              </span>
            </div>
          </div>
        </div>

        {/* Module Progression: Fase 01 (Selesai) + Fase 02 (Modul Aktif) */}
        <div ref={roadmapBodyRef} className="space-y-2 flex-1 flex flex-col justify-center py-0.5">
          {/* FASE 01: MODUL SELESAI */}
          <div className="bg-white border border-emerald-200/90 rounded-xl p-3 shadow-3xs space-y-2 transition-all">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9.5px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                  <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[2.5]" />
                  Selesai
                </span>
                <span className="text-xs font-bold text-slate-700 truncate">
                  {currentRoadmap.completedModule.phase}
                </span>
              </div>
              <div className="flex items-baseline gap-1 shrink-0 font-mono">
                <span className="text-xs font-bold text-emerald-700">Skor {currentRoadmap.completedModule.score}</span>
              </div>
            </div>

            <h4 className="text-xs font-bold text-slate-900 leading-snug">
              {currentRoadmap.completedModule.name}
            </h4>

            {/* Skill Keys & Project Capstone */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1.5 border-t border-slate-100 text-[10px]">
              <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="text-slate-400 font-mono text-[9px] uppercase">Skill:</span>
                <span>{currentRoadmap.completedModule.skills.join(" · ")}</span>
              </div>
              <span className="text-slate-400 font-mono text-[9.5px] flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-slate-400" />
                {currentRoadmap.completedModule.pace}
              </span>
            </div>
          </div>

          {/* FASE 02: MODUL AKTIF */}
          <div className="bg-white border-2 border-brand-primary/80 rounded-xl p-3 shadow-xs space-y-2 transition-all">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9.5px] font-semibold bg-blue-50 text-brand-primary border border-blue-200 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                  Modul Aktif
                </span>
                <span className="text-xs font-bold text-slate-900 truncate">
                  {currentRoadmap.activeModule.phase}
                </span>
              </div>
              <span className="text-[10px] font-mono text-brand-primary font-bold">
                Target Minggu Ini
              </span>
            </div>

            <h4 className="text-xs font-bold text-slate-900 leading-snug">
              {currentRoadmap.activeModule.name}
            </h4>

            {/* Skill Keys & Project Capstone */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1.5 border-t border-slate-100 text-[10px]">
              <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="text-slate-400 font-mono text-[9px] uppercase">Skill:</span>
                <span>{currentRoadmap.activeModule.skills.join(" · ")}</span>
              </div>
              <span className="text-slate-500 font-mono text-[9.5px] flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-brand-primary" />
                {currentRoadmap.activeModule.pace}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Phases Timeline Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {currentRoadmap.phases.map((phase) => {
            const isCompleted = phase.status === "completed";
            const isInProgress = phase.status === "in_progress";
            const isReady = phase.status === "ready";

            return (
              <div
                key={phase.phase}
                className={`p-2.5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                  isInProgress
                    ? "bg-white border-brand-primary shadow-xs ring-1 ring-brand-primary/20"
                    : isCompleted
                    ? "bg-emerald-50/20 border-emerald-200"
                    : isReady
                    ? "bg-slate-50/60 border-slate-200"
                    : "bg-slate-50/40 border-slate-200/80 opacity-70"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      FASE 0{phase.phase}
                    </span>
                    {/* Unified 4px Status Badges */}
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-0.5 text-[8.5px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded-md border border-emerald-200">
                        <Check className="w-2 h-2 text-emerald-600 stroke-[2.5]" /> Selesai
                      </span>
                    ) : isInProgress ? (
                      <span className="inline-flex items-center gap-1 text-[8.5px] font-semibold text-brand-primary bg-blue-50 px-1.5 py-0.2 rounded-md border border-blue-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                        Aktif
                      </span>
                    ) : isReady ? (
                      <span className="text-[8.5px] font-semibold text-slate-600 bg-slate-50 px-1.5 py-0.2 rounded-md border border-slate-200">
                        Tersedia
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[8.5px] text-slate-400 font-medium">
                        <Lock className="w-2.5 h-2.5" /> Kunci
                      </span>
                    )}
                  </div>

                  <h4 className="text-[11px] font-bold text-slate-900 leading-snug">
                    {phase.title}
                  </h4>
                </div>

                {/* Modules list */}
                <div className="pt-1.5 mt-1.5 border-t border-slate-100 space-y-0.5">
                  {phase.modules.slice(0, 2).map((mod) => (
                    <div
                      key={mod}
                      className="text-[9.5px] font-medium text-slate-600 truncate flex items-center gap-1.5"
                    >
                      <span
                        className={`w-1 h-1 rounded-full shrink-0 ${
                          isCompleted
                            ? "bg-emerald-600"
                            : isInProgress
                            ? "bg-brand-primary"
                            : "bg-slate-300"
                        }`}
                      />
                      <span className="truncate">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          RIGHT COLUMN (lg:col-span-5): MISI SOFT SKILL (TOP) + PORTOFOLIO (BOTTOM)
      ========================================================================= */}
      <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4 h-full">
        {/* CARD 2: MISI SOFT SKILL */}
        <div className="p-4 sm:p-5 bg-white border border-slate-200/90 rounded-2xl flex flex-col justify-between shadow-[0_16px_36px_-8px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.05)] space-y-3 overflow-hidden flex-1">
          {/* Top Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/90 flex items-center justify-center text-emerald-600 shadow-2xs">
                <Target className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  Misi Soft Skill
                </h3>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                  Latihan situasional harian berhadiah XP.
                </p>
              </div>
            </div>

            {/* Level & XP: Pure Typography with High Visual Hierarchy (No lightning bolt pill) */}
            <div className="text-right">
              <div className="font-mono text-sm sm:text-base font-extrabold text-slate-900 tabular-nums">
                450 <span className="text-xs font-bold text-emerald-600">XP</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 font-medium">
                Level 3 · Mahir
              </div>
            </div>
          </div>

          {/* 3 Misi List */}
          <div className="space-y-1.5 flex-1 flex flex-col justify-between py-0.5">
            {/* Item 1: Sampaikan Ide Tim Cross-Functional (Completed) */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl border border-emerald-200 bg-white shadow-3xs transition-all">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-5.5 h-5.5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-xs truncate">
                    Sampaikan Ide Tim Cross-Functional
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                    Komunikasi · 15 Mnt
                  </div>
                </div>
              </div>
              <div className="font-mono text-xs font-bold text-emerald-700 shrink-0 tabular-nums">
                +150 XP
              </div>
            </div>

            {/* Item 2: Negosiasi Prioritas Sprint Tim (Active / In Progress) */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl border-2 border-brand-primary/80 bg-white shadow-xs transition-all">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-5.5 h-5.5 rounded-full bg-blue-100/70 flex items-center justify-center shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-xs truncate">
                    Negosiasi Prioritas Sprint Tim
                  </div>
                  <div className="text-[10px] text-brand-primary font-medium mt-0.5">
                    Kolaborasi · 20 Mnt
                  </div>
                </div>
              </div>
              <div className="font-mono text-xs font-bold text-brand-primary shrink-0 tabular-nums">
                +200 XP
              </div>
            </div>

            {/* Item 3: Evaluasi Risiko Rilis Aplikasi (Locked) */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl border border-slate-200/90 bg-slate-50/60 transition-all opacity-85">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-5.5 h-5.5 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                  <Lock className="w-3 h-3 text-slate-400" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-600 text-xs truncate">
                    Evaluasi Risiko Rilis Aplikasi
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                    Tanggung Jawab · 30 Mnt
                  </div>
                </div>
              </div>
              <div className="font-mono text-xs font-bold text-slate-400 shrink-0 tabular-nums">
                +250 XP
              </div>
            </div>
          </div>

          {/* Daily Progress Meter */}
          <div className="pt-2 border-t border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-600 font-medium">Progres Misi Harian</span>
              <span className="text-emerald-700 font-mono font-bold tabular-nums">2 / 3 Selesai (67%)</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[67%]" />
            </div>
          </div>
        </div>

        {/* CARD 3: PORTOFOLIO TERVERIFIKASI & SIMULASI KERJA */}
        <div className="p-4 sm:p-5 bg-gradient-to-br from-[#0066FF] to-[#004ecc] text-white border border-blue-400/30 rounded-2xl flex flex-col justify-between shadow-[0_16px_36px_-8px_rgba(0,0,0,0.2),0_4px_12px_-2px_rgba(0,0,0,0.1)] space-y-3 overflow-hidden flex-1">
          <div>
            {/* Header Kicker (Clean typography, no pill boxes) */}
            <div className="flex items-center justify-between mb-1.5 text-[10px] font-mono font-bold tracking-wider text-blue-100 uppercase">
              <span>Portofolio Teruji</span>
              <span>Simulasi Kasus Riil</span>
            </div>

            <div className="mb-2.5">
              <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white leading-tight">
                Bangun Portofolio Teruji
              </h3>
              <p className="text-[11px] text-blue-100/90 leading-tight mt-0.5">
                Studi kasus riil yang dievaluasi standar industri &amp; lowongan terkurasi.
              </p>
            </div>

            {/* Inner Curated / Case Study Card */}
            <div ref={kegiatanBodyRef} className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-blue-100 mb-1">
                  <span>STUDI KASUS REKOMENDASI</span>
                  <span className="text-white font-bold tabular-nums text-xs font-mono">{currentKegiatan.match}% Cocok</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {currentKegiatan.title}
                </h4>
                <div className="text-[10.5px] text-blue-100 mt-0.5 truncate">
                  {currentKegiatan.organizer}
                </div>

                {/* Tags in single row */}
                <div className="flex items-center gap-1.5 mt-2 overflow-hidden h-[22px]">
                  {currentKegiatan.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] px-2 py-0.5 bg-white/10 border border-white/20 rounded-md text-white shrink-0 truncate max-w-[130px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/15 text-[10px]">
                <span className="text-amber-200 font-mono font-semibold flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-amber-200" />
                  {currentKegiatan.deadline}
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(currentKegiatan.id, e)}
                  className="text-white hover:text-blue-200 transition-colors cursor-pointer flex items-center gap-1 font-mono text-[10px]"
                >
                  <Bookmark
                    className={`w-3 h-3 ${
                      bookmarkedId === currentKegiatan.id ? "fill-white text-white" : ""
                    }`}
                  />
                  <span>Simpan</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bar inside Blue Card */}
          <div className="pt-2 border-t border-white/20 flex items-center justify-between gap-2 text-[10px] text-blue-100">
            <div className="flex items-center gap-1 font-mono text-[9px] sm:text-[10px]">
              {KEGIATAN_PRESETS.map((k, i) => (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => setActiveKegiatanIdx(i)}
                  className={`px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                    i === activeKegiatanIdx
                      ? "bg-white text-brand-primary font-bold shadow-xs"
                      : "text-blue-200 hover:text-white"
                  }`}
                >
                  Kasus {i + 1}
                </button>
              ))}
            </div>

            <Link
              href="/assessment"
              className="btn-press inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-brand-primary text-[10.5px] font-bold shadow-xs hover:bg-blue-50 transition-colors cursor-pointer group shrink-0"
            >
              <span>Mulai Simulasi</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
