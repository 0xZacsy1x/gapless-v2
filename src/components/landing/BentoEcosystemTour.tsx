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
      <div className="relative overflow-hidden lg:col-span-7 p-4 sm:p-5 bg-[#1c1c1e] border border-white/[0.12] rounded-2xl flex flex-col justify-between shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.12)] space-y-3 min-h-[465px] h-full text-[#f5f5f7]">
        {/* Top Header */}
        <div className="space-y-2.5 relative z-10 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-2.5">
            <div className="flex items-center gap-2.5">
              {/* macOS Window Controls */}
              <div className="flex items-center gap-1.5 shrink-0 pr-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] border border-[#e0443e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] border border-[#dea123] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] border border-[#1aab29] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block" />
              </div>
              <div className="h-3.5 w-px bg-white/[0.1] shrink-0" />
              <div className="w-7 h-7 rounded-lg bg-white/[0.08] flex items-center justify-center text-[#0a84ff] border border-white/10 shadow-3xs">
                <GraduationCap className="w-4 h-4 text-[#0a84ff]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold tracking-tight text-[#f5f5f7] leading-tight">
                  Roadmap Belajar Terstruktur
                </h3>
                <p className="text-[11px] text-[#98989d]">
                  Kurikulum 4 fase progresif terkalibrasi dengan standar industri nyata.
                </p>
              </div>
            </div>

            {/* Subtle Live Tour Indicator */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#2c2c2e] border border-white/10 text-xs font-semibold text-[#f5f5f7] shadow-xs self-start sm:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#30d158] " />
              <span className="font-mono text-[11px]">Tur Otomatis</span>
            </div>
          </div>

          {/* Interactive Career Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
            {ROADMAP_PRESETS.map((preset, idx) => {
              const isSelected = idx === activeCareerIdx;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectCareer(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer btn-press flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? "bg-[#0071e3] text-white border border-[#0a84ff] shadow-sm ring-2 ring-[#0a84ff]/20"
                      : "bg-[#2c2c2e] hover:bg-[#3a3a3c] border border-white/[0.08] text-[#e5e5e7]"
                  }`}
                >
                  <span>{preset.career}</span>
                  <span
                    className={`text-[11px] font-mono tabular-nums font-bold ${
                      isSelected ? "text-white/80" : "text-[#a1a1a6]"
                    }`}
                  >
                    {preset.overallProgress}%
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Career Track Banner */}
          <div className="bg-[#242426] border border-white/[0.08] rounded-xl px-3 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#a1a1a6] shrink-0">
                Jalur Fokus:
              </span>
              <span className="text-xs font-bold text-[#f5f5f7] truncate">
                {currentRoadmap.track}
              </span>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-20 sm:w-24 h-1.5 bg-[#3a3a3c] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0a84ff] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${currentRoadmap.overallProgress}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-[#f5f5f7] tabular-nums">
                {currentRoadmap.overallProgress}% Kesiapan
              </span>
            </div>
          </div>
        </div>

        {/* Module Progression: Fase 01 (Selesai) + Fase 02 (Modul Aktif) */}
        <div ref={roadmapBodyRef} className="space-y-2 flex-1 flex flex-col justify-center py-0.5 relative z-10">
          {/* FASE 01: MODUL SELESAI */}
          <div className="bg-[#242426] border border-[#30d158]/30 rounded-xl p-3 shadow-3xs space-y-2 transition-all">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#30d158]/15 text-[#30d158] border border-[#30d158]/30 shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#30d158] stroke-[2.5]" />
                  Selesai
                </span>
                <span className="text-xs font-bold text-[#e5e5e7] truncate">
                  {currentRoadmap.completedModule.phase}
                </span>
              </div>
              <div className="flex items-baseline gap-1 shrink-0 font-mono">
                <span className="text-xs font-bold text-[#30d158]">Skor {currentRoadmap.completedModule.score}</span>
              </div>
            </div>

            <h4 className="text-xs font-bold text-[#f5f5f7] leading-snug">
              {currentRoadmap.completedModule.name}
            </h4>

            {/* Skill Keys & Project Capstone */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1.5 border-t border-white/[0.08] text-[11px]">
              <div className="flex items-center gap-1.5 text-[#98989d] font-medium">
                <span className="text-[#a1a1a6] font-mono text-[11px] uppercase">Skill:</span>
                <span>{currentRoadmap.completedModule.skills.join(" · ")}</span>
              </div>
              <span className="text-[#a1a1a6] font-mono text-[11px] flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-[#a1a1a6]" />
                {currentRoadmap.completedModule.pace}
              </span>
            </div>
          </div>

          {/* FASE 02: MODUL AKTIF */}
          <div className="bg-[#242426] border-2 border-[#0a84ff] rounded-xl p-3 shadow-xs space-y-2 transition-all ring-2 ring-[#0a84ff]/20">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#0a84ff]/20 text-[#0a84ff] border border-[#0a84ff]/40 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0a84ff] " />
                  Modul Aktif
                </span>
                <span className="text-xs font-bold text-[#f5f5f7] truncate">
                  {currentRoadmap.activeModule.phase}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#0a84ff] font-bold">
                Target Minggu Ini
              </span>
            </div>

            <h4 className="text-xs font-bold text-[#f5f5f7] leading-snug">
              {currentRoadmap.activeModule.name}
            </h4>

            {/* Skill Keys & Project Capstone */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1.5 border-t border-white/[0.08] text-[11px]">
              <div className="flex items-center gap-1.5 text-[#98989d] font-medium">
                <span className="text-[#a1a1a6] font-mono text-[11px] uppercase">Skill:</span>
                <span>{currentRoadmap.activeModule.skills.join(" · ")}</span>
              </div>
              <span className="text-[#98989d] font-mono text-[11px] flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-[#0a84ff]" />
                {currentRoadmap.activeModule.pace}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Phases Horizontal Stepper Timeline (Progress Motif) */}
        <div className="bg-[#242426] border border-white/[0.08] rounded-xl p-3 sm:p-3.5 relative z-10">
          <div className="relative flex items-start justify-between px-2 sm:px-6">
            {/* Background connecting rail */}
            <div className="absolute left-8 right-8 top-3 h-0.5 bg-[#3a3a3c]" aria-hidden="true" />
            {/* Active completed segment rail */}
            <div
              className="absolute left-8 top-3 h-0.5 bg-[#30d158] transition-all duration-500"
              style={{ width: "33%" }}
              aria-hidden="true"
            />

            {currentRoadmap.phases.map((phase) => {
              const isCompleted = phase.status === "completed";
              const isInProgress = phase.status === "in_progress";
              const isReady = phase.status === "ready";

              return (
                <div key={phase.phase} className="relative z-10 flex flex-col items-center text-center group">
                  {/* Stepper Node Dot */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? "bg-[#30d158] text-black shadow-2xs"
                        : isInProgress
                        ? "bg-[#0a84ff] text-white ring-4 ring-[#0a84ff]/25 shadow-xs"
                        : isReady
                        ? "bg-[#2c2c2e] border-2 border-white/20 text-[#98989d]"
                        : "bg-[#202022] border-2 border-white/10 text-white/30"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3 h-3 text-black stroke-[3]" />
                    ) : isInProgress ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-white " />
                    ) : isReady ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    ) : (
                      <Lock className="w-2.5 h-2.5 text-white/30" />
                    )}
                  </div>

                  {/* Phase Label & Status under Node */}
                  <div className="mt-1.5 space-y-0.5">
                    <span
                      className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${
                        isInProgress
                          ? "text-[#0a84ff]"
                          : isCompleted
                          ? "text-[#30d158]"
                          : "text-[#a1a1a6]"
                      }`}
                    >
                      Fase 0{phase.phase}
                    </span>
                    <h4 className="text-xs font-bold text-[#f5f5f7] block truncate max-w-[65px] sm:max-w-[85px] leading-tight">
                      {phase.title}
                    </h4>
                    <span
                      className={`inline-block text-[11px] font-semibold px-1.5 py-0.2 rounded-md ${
                        isCompleted
                          ? "text-[#30d158] bg-[#30d158]/15 border border-[#30d158]/30"
                          : isInProgress
                          ? "text-[#0a84ff] bg-[#0a84ff]/15 border border-[#0a84ff]/30"
                          : isReady
                          ? "text-[#98989d] bg-[#2c2c2e] border border-white/10"
                          : "text-[#a1a1a6] bg-transparent"
                      }`}
                    >
                      {isCompleted ? "Selesai" : isInProgress ? "Aktif" : isReady ? "Tersedia" : "Terkunci"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          RIGHT COLUMN (lg:col-span-5): MISI SOFT SKILL (TOP) + PORTOFOLIO (BOTTOM)
      ========================================================================= */}
      <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4 h-full">
        {/* CARD 2: MISI SOFT SKILL */}
        <div className="relative overflow-hidden p-4 sm:p-5 bg-[#1c1c1e] border border-white/[0.12] rounded-2xl flex flex-col justify-between shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.12)] space-y-3 flex-1 text-[#f5f5f7]">
          {/* Top Header */}
          <div className="flex items-center justify-between relative z-10 shrink-0">
            <div className="flex items-center gap-2.5">
              {/* macOS Window Controls */}
              <div className="flex items-center gap-1.5 shrink-0 pr-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] border border-[#e0443e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] border border-[#dea123] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] border border-[#1aab29] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block" />
              </div>
              <div className="h-3.5 w-px bg-white/[0.1] shrink-0" />
              <div className="w-7 h-7 rounded-lg bg-white/[0.08] border border-white/10 flex items-center justify-center text-[#30d158] shadow-2xs">
                <Target className="w-4 h-4 text-[#30d158]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#f5f5f7] leading-tight">
                  Misi Soft Skill
                </h3>
                <p className="text-[11px] text-[#98989d] leading-tight mt-0.5">
                  Latihan situasional harian berhadiah XP.
                </p>
              </div>
            </div>

            {/* Level & XP: Game-like thin progress bar + bold typography */}
            <div className="text-right flex items-center gap-3">
              <div className="flex flex-col items-end">
                <div className="font-mono text-sm sm:text-base font-extrabold text-[#f5f5f7] tabular-nums">
                  450 <span className="text-xs font-bold text-[#30d158]">XP</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-14 sm:w-16 h-1.5 bg-[#3a3a3c] rounded-full overflow-hidden">
                    <div className="h-full bg-[#30d158] rounded-full w-[75%]" />
                  </div>
                  <span className="text-[11px] font-mono text-[#a1a1a6] font-bold">Lv. 3</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Misi List */}
          <div className="space-y-1.5 flex-1 flex flex-col justify-between py-0.5 relative z-10">
            {/* Item 1: Sampaikan Ide Tim Cross-Functional (Completed) */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl border border-[#30d158]/30 bg-[#242426] shadow-3xs transition-all">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-5.5 h-5.5 rounded-full bg-[#30d158]/20 flex items-center justify-center text-[#30d158] shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#30d158] stroke-[2.5]" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[#f5f5f7] text-xs truncate">
                    Sampaikan Ide Tim Cross-Functional
                  </div>
                  <div className="text-[11px] text-[#a1a1a6] font-medium mt-0.5">
                    Komunikasi · 15 Mnt
                  </div>
                </div>
              </div>
              <div className="font-mono text-xs font-bold text-[#30d158] shrink-0 tabular-nums">
                +150 XP
              </div>
            </div>

            {/* Item 2: Negosiasi Prioritas Sprint Tim (Active / In Progress) */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl border-2 border-[#0a84ff] bg-[#242426] shadow-xs transition-all ring-2 ring-[#0a84ff]/20">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-5.5 h-5.5 rounded-full bg-[#0a84ff]/20 flex items-center justify-center shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0a84ff] " />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[#f5f5f7] text-xs truncate">
                    Negosiasi Prioritas Sprint Tim
                  </div>
                  <div className="text-[11px] text-[#0a84ff] font-medium mt-0.5">
                    Kolaborasi · 20 Mnt
                  </div>
                </div>
              </div>
              <div className="font-mono text-xs font-bold text-[#0a84ff] shrink-0 tabular-nums">
                +200 XP
              </div>
            </div>

            {/* Item 3: Evaluasi Risiko Rilis Aplikasi (Locked) */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl border border-white/[0.06] bg-[#202022] transition-all ">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-5.5 h-5.5 rounded-full bg-white/[0.06] flex items-center justify-center text-[#a1a1a6] shrink-0">
                  <Lock className="w-3 h-3 text-[#a1a1a6]" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[#a1a1a6] text-xs truncate">
                    Evaluasi Risiko Rilis Aplikasi
                  </div>
                  <div className="text-[11px] text-[#a1a1a6]/80 font-medium mt-0.5">
                    Tanggung Jawab · 30 Mnt
                  </div>
                </div>
              </div>
              <div className="font-mono text-xs font-bold text-[#a1a1a6] shrink-0 tabular-nums">
                +250 XP
              </div>
            </div>
          </div>

          {/* Daily Progress Meter */}
          <div className="pt-2 border-t border-white/[0.08] space-y-1.5 relative z-10">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#98989d] font-medium">Progres Misi Harian</span>
              <span className="text-[#30d158] font-mono font-bold tabular-nums">2 / 3 Selesai (67%)</span>
            </div>
            <div className="w-full h-1.5 bg-[#3a3a3c] rounded-full overflow-hidden">
              <div className="h-full bg-[#30d158] rounded-full w-[67%]" />
            </div>
          </div>
        </div>

        {/* CARD 3: PORTOFOLIO TERVERIFIKASI & SIMULASI KERJA */}
        <div className="relative overflow-hidden p-4 sm:p-5 bg-[#1c1c1e] border border-white/[0.12] rounded-2xl flex flex-col justify-between shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.12)] space-y-3 flex-1 text-[#f5f5f7]">
          <div className="relative z-10 space-y-2.5">
            {/* Top Header with macOS Window Controls */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 shrink-0 pr-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] border border-[#e0443e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] border border-[#dea123] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] border border-[#1aab29] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block" />
                </div>
                <div className="h-3.5 w-px bg-white/[0.1] shrink-0" />
                <div>
                  <h3 className="text-xs sm:text-sm font-bold tracking-tight text-[#f5f5f7] leading-tight">
                    Bangun Portofolio Teruji
                  </h3>
                  <p className="text-[11px] text-[#98989d] leading-tight mt-0.5">
                    Studi kasus riil dievaluasi standar industri.
                  </p>
                </div>
              </div>

              <div className="text-[11px] font-mono font-bold tracking-wider text-[#0a84ff] uppercase shrink-0">
                Simulasi Riil
              </div>
            </div>

            {/* Inner Curated / Case Study Card */}
            <div ref={kegiatanBodyRef} className="p-3 rounded-xl bg-[#242426] border border-white/[0.08] flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#a1a1a6] mb-1">
                  <span>STUDI KASUS REKOMENDASI</span>
                  <span className="text-[#30d158] font-bold tabular-nums text-xs font-mono">{currentKegiatan.match}% Cocok</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#f5f5f7] truncate">
                  {currentKegiatan.title}
                </h4>
                <div className="text-xs text-[#98989d] mt-0.5 truncate">
                  {currentKegiatan.organizer}
                </div>

                {/* Tags in single row */}
                <div className="flex items-center gap-1.5 mt-2 overflow-hidden h-[22px]">
                  {currentKegiatan.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 bg-white/[0.06] border border-white/10 rounded-md text-[#e5e5e7] shrink-0 truncate max-w-[130px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[11px]">
                <span className="text-[#ffd60a] font-mono font-semibold flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-[#ffd60a]" />
                  {currentKegiatan.deadline}
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(currentKegiatan.id, e)}
                  className="text-[#98989d] hover:text-[#f5f5f7] transition-colors cursor-pointer flex items-center gap-1 font-mono text-[11px]"
                >
                  <Bookmark
                    className={`w-3 h-3 ${
                      bookmarkedId === currentKegiatan.id ? "fill-[#0a84ff] text-[#0a84ff]" : ""
                    }`}
                  />
                  <span>Simpan</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between gap-2 text-[11px] relative z-10">
            <div className="flex items-center gap-1 font-mono text-[11px] sm:text-[11px]">
              {KEGIATAN_PRESETS.map((k, i) => (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => setActiveKegiatanIdx(i)}
                  className={`px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                    i === activeKegiatanIdx
                      ? "bg-[#0071e3] text-white font-bold shadow-xs"
                      : "text-[#98989d] hover:text-white"
                  }`}
                >
                  Kasus {i + 1}
                </button>
              ))}
            </div>

            <Link
              href="/assessment"
              className="btn-press inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer group shrink-0"
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
