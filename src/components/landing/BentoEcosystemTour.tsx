"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  BookOpen,
  ArrowRight,
  Sparkles,
  Zap,
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
      score: "Skor: 94/100 (A)",
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
      score: "Skor: 96/100 (A+)",
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
      score: "Skor: 92/100 (A)",
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

  // Smooth crossfade on career change
  useGSAP(() => {
    if (roadmapBodyRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        roadmapBodyRef.current,
        { opacity: 0.5, y: 3 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [activeCareerIdx]);

  // Smooth crossfade on kegiatan change
  useGSAP(() => {
    if (kegiatanBodyRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        kegiatanBodyRef.current,
        { opacity: 0.5, y: 3 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [activeKegiatanIdx]);

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
          ROW 1, CARD 1: ROADMAP BELAJAR TERSTRUKTUR (lg:col-span-7 - Black Shadow)
      ========================================================================= */}
      <div className="lg:col-span-7 p-3.5 sm:p-4.5 bg-white border border-slate-200/90 rounded-2xl flex flex-col justify-between shadow-[0_16px_36px_-8px_rgba(0,0,0,0.18),0_4px_12px_-2px_rgba(0,0,0,0.08)] space-y-2.5 min-h-[465px] h-full">
        {/* Top Header */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6.5 h-6.5 rounded-lg bg-blue-50 flex items-center justify-center text-brand-primary border border-blue-100 shadow-3xs">
                <GraduationCap className="w-3.5 h-3.5 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 leading-tight">
                  Roadmap Belajar Terstruktur
                </h3>
                <p className="text-[10.5px] text-slate-500">
                  Kurikulum 4 fase progresif terkalibrasi dengan standar industri nyata.
                </p>
              </div>
            </div>

            {/* Live Indicator Chip */}
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[9.5px] font-bold text-brand-primary self-start sm:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
              <span>Live Tour Otomatis</span>
            </div>
          </div>

          {/* Interactive Career Selector Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {ROADMAP_PRESETS.map((preset, idx) => {
              const isSelected = idx === activeCareerIdx;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectCareer(idx)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer btn-press flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? "bg-brand-primary text-white shadow-xs shadow-brand-primary/25 scale-[1.01]"
                      : "bg-white hover:bg-blue-50/60 border border-slate-200 text-slate-700"
                  }`}
                >
                  {isSelected && <Sparkles className="w-3 h-3 text-white" />}
                  <span>{preset.career}</span>
                  <span
                    className={`text-[9.5px] font-mono px-1 py-0.2 rounded font-bold ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {preset.overallProgress}%
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Career Track Banner */}
          <div className="bg-blue-50/50 border border-blue-100/90 rounded-xl px-2.5 py-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-brand-primary px-1.5 py-0.2 rounded bg-blue-100/80 border border-blue-200">
                TRACK
              </span>
              <span className="text-[11.5px] font-bold text-slate-800 truncate">
                {currentRoadmap.track}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 sm:w-24 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-primary rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${currentRoadmap.overallProgress}%` }}
                />
              </div>
              <span className="text-[11px] font-mono font-bold text-brand-primary tabular-nums shrink-0">
                {currentRoadmap.overallProgress}% Kesiapan
              </span>
            </div>
          </div>
        </div>

        {/* Module Progression: Fase 01 (Selesai) + Fase 02 (Modul Aktif) */}
        <div ref={roadmapBodyRef} className="space-y-2 flex-1 flex flex-col justify-center py-0.5">
          {/* FASE 01: MODUL SELESAI */}
          <div className="bg-emerald-50/25 border border-emerald-200/90 rounded-xl p-2.5 shadow-3xs space-y-1.5 transition-all">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-emerald-100/70 text-emerald-800 text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider border border-emerald-200 shrink-0">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                  {currentRoadmap.completedModule.phase}
                </span>
                <span className="text-[9px] text-emerald-700 font-bold bg-white px-1.5 py-0.2 rounded border border-emerald-200/90 font-mono shrink-0">
                  {currentRoadmap.completedModule.score}
                </span>
              </div>
              <span className="text-[9px] sm:text-[9.5px] text-slate-400 font-medium flex items-center gap-1 shrink-0">
                <Clock className="w-2.5 h-2.5 text-slate-400" />
                {currentRoadmap.completedModule.pace}
              </span>
            </div>

            <h4 className="text-[11px] sm:text-xs font-bold text-slate-800 leading-snug truncate">
              {currentRoadmap.completedModule.name}
            </h4>

            {/* Skill Keys & Project Capstone */}
            <div className="flex flex-wrap items-center justify-between gap-1 pt-1 border-t border-emerald-100/80">
              <div className="flex flex-wrap items-center gap-1 min-w-0">
                <span className="text-[8px] sm:text-[8.5px] font-mono text-slate-400 uppercase tracking-wider">
                  Skill:
                </span>
                {currentRoadmap.completedModule.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[9px] font-medium px-1.5 py-0.2 rounded bg-white border border-emerald-200/70 text-slate-700 truncate"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="inline-flex items-center gap-1 text-[9.5px] sm:text-[10px] text-emerald-800 font-bold bg-emerald-100/60 px-1.5 py-0.5 rounded border border-emerald-200 truncate max-w-[230px]">
                <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600 shrink-0" />
                <span className="truncate">{currentRoadmap.completedModule.project}</span>
              </div>
            </div>
          </div>

          {/* FASE 02: MODUL AKTIF */}
          <div className="bg-white border-2 border-blue-400/80 rounded-xl p-2.5 shadow-xs space-y-1.5 transition-all">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-blue-50 text-brand-primary text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider border border-blue-200 shrink-0">
                  <BookOpen className="w-2.5 h-2.5 text-brand-primary" />
                  {currentRoadmap.activeModule.phase}
                </span>
                <span className="text-[9px] text-brand-primary font-bold bg-blue-50/60 px-1.5 py-0.2 rounded border border-blue-200 font-mono shrink-0">
                  Target Selesai Minggu Ini
                </span>
              </div>
              <span className="text-[9px] sm:text-[9.5px] text-slate-500 font-medium flex items-center gap-1 shrink-0">
                <Clock className="w-2.5 h-2.5 text-brand-primary" />
                {currentRoadmap.activeModule.pace}
              </span>
            </div>

            <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 leading-snug truncate">
              {currentRoadmap.activeModule.name}
            </h4>

            {/* Skill Keys & Project Capstone */}
            <div className="flex flex-wrap items-center justify-between gap-1 pt-1 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1 min-w-0">
                <span className="text-[8px] sm:text-[8.5px] font-mono text-slate-400 uppercase tracking-wider">
                  Skill:
                </span>
                {currentRoadmap.activeModule.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[9px] font-medium px-1.5 py-0.2 rounded bg-blue-50/70 border border-blue-100 text-slate-700 truncate"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="inline-flex items-center gap-1 text-[9.5px] sm:text-[10px] text-brand-primary font-bold bg-blue-50/80 px-1.5 py-0.5 rounded border border-blue-100 truncate max-w-[230px]">
                <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-primary shrink-0" />
                <span className="truncate">{currentRoadmap.activeModule.project}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Phases Timeline Grid (Compact & Clear) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {currentRoadmap.phases.map((phase) => {
            const isCompleted = phase.status === "completed";
            const isInProgress = phase.status === "in_progress";
            const isReady = phase.status === "ready";

            return (
              <div
                key={phase.phase}
                className={`p-2 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                  isInProgress
                    ? "bg-white border-brand-primary shadow-xs ring-1 ring-brand-primary/20 scale-[1.01]"
                    : isCompleted
                    ? "bg-emerald-50/30 border-emerald-200"
                    : isReady
                    ? "bg-slate-50/60 border-slate-200"
                    : "bg-slate-100/40 border-slate-200 opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      FASE 0{phase.phase}
                    </span>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-0.5 text-[8px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Selesai
                      </span>
                    ) : isInProgress ? (
                      <span className="inline-flex items-center gap-1 text-[8px] font-bold text-brand-primary bg-blue-50 px-1.5 py-0.2 rounded-full border border-blue-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
                        Aktif
                      </span>
                    ) : isReady ? (
                      <span className="text-[8px] font-medium text-slate-500 bg-slate-100 px-1 py-0.2 rounded-full border border-slate-200">
                        Siap
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 text-[8px] text-slate-400">
                        <Lock className="w-2.5 h-2.5" /> Kunci
                      </span>
                    )}
                  </div>

                  <h4 className="text-[10.5px] font-bold text-slate-900 leading-snug">
                    {phase.title}
                  </h4>
                </div>

                {/* Modules list (2 items per phase to keep height compact) */}
                <div className="pt-1 mt-1 border-t border-slate-100 space-y-0.5">
                  {phase.modules.slice(0, 2).map((mod) => (
                    <div
                      key={mod}
                      className="text-[9px] font-medium text-slate-600 truncate flex items-center gap-1"
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
        {/* CARD 2: MISI SOFT SKILL (Checklist Harian Berhadiah XP) */}
        <div className="p-3.5 sm:p-4 bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl flex flex-col justify-between shadow-[0_16px_36px_-8px_rgba(0,0,0,0.16),0_4px_12px_-2px_rgba(0,0,0,0.06)] space-y-2.5 overflow-hidden flex-1">
          {/* Top Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200/90 flex items-center justify-center text-emerald-600 shadow-2xs">
                <Target className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xs sm:text-[13.5px] font-extrabold text-slate-900 leading-tight">
                  Misi Soft Skill
                </h3>
                <p className="text-[10px] sm:text-[10.5px] text-slate-500 leading-tight mt-0.5">
                  Latihan situasional harian berhadiah XP.
                </p>
              </div>
            </div>

            {/* Level & XP Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50/80 border border-emerald-300/80 text-[10px] sm:text-[11px] font-mono font-bold text-emerald-800 tracking-tight">
              <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
              <span>LEVEL 3 • 450 XP</span>
            </div>
          </div>

          {/* 3 Misi List */}
          <div className="space-y-1.5 flex-1 flex flex-col justify-between py-0.5">
            {/* Item 1: Sampaikan Ide Tim Cross-Functional (Completed) */}
            <div className="flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border border-emerald-300 bg-white shadow-2xs transition-all">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-[11px] sm:text-xs truncate">
                    Sampaikan Ide Tim Cross-Functional
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="px-1.5 py-0.2 rounded border border-blue-200 bg-blue-50 text-brand-primary text-[8.5px] sm:text-[9px] font-bold">
                      Komunikasi
                    </span>
                    <span className="text-[9.5px] text-slate-400 font-medium">15 Mnt</span>
                  </div>
                </div>
              </div>
              <div className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 font-mono text-[10.5px] sm:text-[11px] font-bold shrink-0">
                +150 XP
              </div>
            </div>

            {/* Item 2: Negosiasi Prioritas Sprint Tim (Active / In Progress) */}
            <div className="flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border-2 border-blue-400 bg-white shadow-2xs transition-all">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-blue-100/70 flex items-center justify-center shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-[11px] sm:text-xs truncate">
                    Negosiasi Prioritas Sprint Tim
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="px-1.5 py-0.2 rounded border border-emerald-200 bg-emerald-50 text-emerald-700 text-[8.5px] sm:text-[9px] font-bold">
                      Kolaborasi
                    </span>
                    <span className="text-[9.5px] text-slate-400 font-medium">20 Mnt</span>
                  </div>
                </div>
              </div>
              <div className="px-2 py-0.5 rounded-lg bg-blue-50 text-brand-primary font-mono text-[10.5px] sm:text-[11px] font-bold shrink-0">
                +200 XP
              </div>
            </div>

            {/* Item 3: Evaluasi Risiko Rilis Aplikasi (Locked) */}
            <div className="flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-slate-50/60 transition-all opacity-85">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                  <Lock className="w-3 h-3 text-slate-400" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-600 text-[11px] sm:text-xs truncate">
                    Evaluasi Risiko Rilis Aplikasi
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="px-1.5 py-0.2 rounded border border-amber-200 bg-amber-50 text-amber-700 text-[8.5px] sm:text-[9px] font-bold">
                      Tanggung Jawab
                    </span>
                    <span className="text-[9.5px] text-slate-400 font-medium">30 Mnt</span>
                  </div>
                </div>
              </div>
              <div className="px-2 py-0.5 text-slate-400 font-mono text-[10.5px] sm:text-[11px] font-bold shrink-0">
                +250 XP
              </div>
            </div>
          </div>

          {/* Daily Progress Meter */}
          <div className="pt-2 border-t border-slate-100 space-y-1">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px]">
              <span className="text-slate-600 font-medium">Progres Misi Harian</span>
              <span className="text-emerald-700 font-mono font-bold">2 / 3 Selesai (67%)</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[67%]" />
            </div>
          </div>
        </div>

        {/* CARD 3: PORTOFOLIO TERVERIFIKASI & SIMULASI KERJA (Tetap Biru) */}
        <div className="p-3.5 sm:p-4 bg-gradient-to-br from-[#0066FF] to-[#004ecc] text-white border border-blue-400/30 rounded-2xl flex flex-col justify-between shadow-[0_16px_36px_-8px_rgba(0,0,0,0.22),0_4px_12px_-2px_rgba(0,0,0,0.12)] space-y-2.5 overflow-hidden flex-1">
          <div>
            {/* Header Eyebrow */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-[8.5px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-blue-100">
                SIMULASI KERJA VIRTUAL
              </span>
              <span className="text-[8.5px] sm:text-[9px] font-mono font-bold text-white bg-white/20 border border-white/30 px-2 py-0.2 rounded-full">
                PORTOFOLIO TERVERIFIKASI
              </span>
            </div>

            <div className="mb-2">
              <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white leading-tight">
                Bangun Portofolio Teruji
              </h3>
              <p className="text-[10px] sm:text-[10.5px] text-blue-100/90 leading-tight mt-0.5">
                Studi kasus riil yang dievaluasi standar industri &amp; lowongan terkurasi.
              </p>
            </div>

            {/* Inner Curated / Case Study Card */}
            <div ref={kegiatanBodyRef} className="p-2.5 sm:p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex flex-col justify-between space-y-1.5">
              <div>
                <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] font-mono text-blue-100 mb-0.5">
                  <span>KEGIATAN &amp; STUDI KASUS</span>
                  <span className="text-white font-bold tabular-nums">{currentKegiatan.match}% Cocok</span>
                </div>
                <h4 className="text-xs sm:text-[13px] font-bold text-white truncate">
                  {currentKegiatan.title}
                </h4>
                <div className="text-[10px] text-blue-100 mt-0.5 truncate">
                  {currentKegiatan.organizer}
                </div>

                {/* Tags in single row */}
                <div className="flex items-center gap-1 mt-1.5 overflow-hidden h-[20px]">
                  {currentKegiatan.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[8px] sm:text-[8.5px] px-1.5 py-0.2 bg-white/15 border border-white/20 rounded text-white shrink-0 truncate max-w-[120px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1.5 border-t border-white/15 text-[9px]">
                <span className="text-amber-200 font-mono font-semibold flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-amber-200" />
                  {currentKegiatan.deadline}
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(currentKegiatan.id, e)}
                  className="text-white hover:text-blue-200 transition-colors cursor-pointer flex items-center gap-1 font-mono text-[9px]"
                >
                  <Bookmark
                    className={`w-2.5 h-2.5 ${
                      bookmarkedId === currentKegiatan.id ? "fill-white text-white" : ""
                    }`}
                  />
                  <span>Simpan</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bar inside Blue Card */}
          <div className="pt-1.5 border-t border-white/20 flex items-center justify-between gap-1.5 text-[9.5px] text-blue-100">
            <div className="flex items-center gap-1 font-mono text-[8.5px] sm:text-[9px]">
              {KEGIATAN_PRESETS.map((k, i) => (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => setActiveKegiatanIdx(i)}
                  className={`px-1.5 py-0.2 rounded cursor-pointer transition-colors ${
                    i === activeKegiatanIdx
                      ? "bg-white text-brand-primary font-bold shadow-xs"
                      : "text-blue-200 hover:text-white"
                  }`}
                >
                  Kegiatan {i + 1}
                </button>
              ))}
            </div>

            <Link
              href="/assessment"
              className="btn-press inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-brand-primary text-[10px] sm:text-[10.5px] font-bold shadow-xs hover:bg-blue-50 transition-colors cursor-pointer group shrink-0"
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
