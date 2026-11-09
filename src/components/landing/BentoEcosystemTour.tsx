"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import Link from "next/link";
import {
  GraduationCap,
  Target,
  Briefcase,
  Lock,
  Bookmark,
  Clock,
  ArrowRight,
  Check,
} from "lucide-react";

// Career Roadmaps Data
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

// Rekomendasi Kegiatan & Portofolio Data
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

type FeatureTab = "roadmap" | "misi" | "portofolio";

const FEATURE_TABS = [
  {
    id: "roadmap" as FeatureTab,
    label: "Roadmap Belajar",
    badge: "4 Fase",
    icon: GraduationCap,
  },
  {
    id: "misi" as FeatureTab,
    label: "Misi Soft Skill",
    badge: "Latihan Harian",
    icon: Target,
  },
  {
    id: "portofolio" as FeatureTab,
    label: "Portofolio",
    badge: "Kasus Riil",
    icon: Briefcase,
  },
];

export default function BentoEcosystemTour() {
  const windowContainerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const clickPulseRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const userTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Button refs for cursor automated gliding
  const tabRoadmapRef = useRef<HTMLButtonElement>(null);
  const tabMisiRef = useRef<HTMLButtonElement>(null);
  const tabPortoRef = useRef<HTMLButtonElement>(null);
  const careerDaRef = useRef<HTMLButtonElement>(null);
  const kegiatan2Ref = useRef<HTMLButtonElement>(null);

  // States
  const [activeTab, setActiveTab] = useState<FeatureTab>("roadmap");
  const [activeCareerIdx, setActiveCareerIdx] = useState<number>(0);
  const [activeKegiatanIdx, setActiveKegiatanIdx] = useState<number>(0);
  const [bookmarkedId, setBookmarkedId] = useState<string>("k1");
  const [isTabActive, setIsTabActive] = useState<boolean>(true);
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);

  // Coordinate helper relative to window container
  const getCoords = useCallback(
    (el: HTMLElement | null, off?: { x?: number; y?: number }) => {
      if (!el || !windowContainerRef.current) return { x: 140, y: 55 };
      const parentRect = windowContainerRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      return {
        x: Math.round(elRect.left - parentRect.left + elRect.width * 0.4 + (off?.x ?? 0)),
        y: Math.round(elRect.top - parentRect.top + elRect.height * 0.5 + (off?.y ?? 0)),
      };
    },
    []
  );

  // Ripple click pulse on cursor with visible tactile feedback
  const triggerClickPulse = useCallback(() => {
    if (cursorRef.current) {
      gsap.timeline()
        .to(cursorRef.current, { scale: 0.74, duration: 0.08, ease: "power2.in" })
        .to(cursorRef.current, { scale: 1, duration: 0.16, ease: "back.out(2)" });
    }
    if (clickPulseRef.current) {
      gsap.fromTo(
        clickPulseRef.current,
        { scale: 0.2, opacity: 1 },
        { scale: 1.8, opacity: 0, duration: 0.35, ease: "power2.out", immediateRender: false }
      );
    }
  }, []);

  // Visibility handling (pause only when browser tab is inactive)
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Automated Virtual Cursor Tour Orchestration
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Immediately place cursor at Tab 1 on mount
    const initPos = getCoords(tabRoadmapRef.current, { x: 0, y: 0 });
    gsap.set(cursor, { x: initPos.x, y: initPos.y, opacity: 1, scale: 1 });

    // Create the master looping cursor timeline
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.4,
      defaults: { ease: "power2.out" },
    });
    tlRef.current = tl;

    // ── PHASE 1: Start at Roadmap Belajar ──
    tl.call(() => {
      setActiveTab("roadmap");
      setActiveCareerIdx(0);
    });

    // Pause briefly at Tab 1
    tl.to({}, { duration: 0.4 });

    // Click Tab 1
    tl.call(() => {
      triggerClickPulse();
      setActiveTab("roadmap");
    }, undefined, "+=0.1");

    // Glide cursor to "Data Analyst" career switcher button
    tl.to(cursor, {
      x: () => getCoords(careerDaRef.current, { x: 0, y: 0 }).x,
      y: () => getCoords(careerDaRef.current, { x: 0, y: 0 }).y,
      duration: 0.75,
      ease: "power2.inOut",
    }, "+=0.6");

    // Click "Data Analyst" button
    tl.call(() => {
      triggerClickPulse();
      setActiveCareerIdx(1);
    }, undefined, "+=0.12");

    // Pause to inspect Data Analyst roadmap modules
    tl.to({}, { duration: 3.2 });

    // ── PHASE 2: Glide to Tab 2 (Misi Soft Skill) ──
    tl.to(cursor, {
      x: () => getCoords(tabMisiRef.current, { x: 0, y: 0 }).x,
      y: () => getCoords(tabMisiRef.current, { x: 0, y: 0 }).y,
      duration: 0.8,
      ease: "power2.inOut",
    });

    // Click Tab 2
    tl.call(() => {
      triggerClickPulse();
      setActiveTab("misi");
    }, undefined, "+=0.1");

    // Pause to inspect Misi Soft Skill items & XP
    tl.to({}, { duration: 3.5 });

    // ── PHASE 3: Glide to Tab 3 (Portofolio) ──
    tl.to(cursor, {
      x: () => getCoords(tabPortoRef.current, { x: 0, y: 0 }).x,
      y: () => getCoords(tabPortoRef.current, { x: 0, y: 0 }).y,
      duration: 0.8,
      ease: "power2.inOut",
    });

    // Click Tab 3
    tl.call(() => {
      triggerClickPulse();
      setActiveTab("portofolio");
    }, undefined, "+=0.1");

    // Pause briefly, then glide cursor to "Kasus 2" button
    tl.to(cursor, {
      x: () => getCoords(kegiatan2Ref.current, { x: 0, y: 0 }).x,
      y: () => getCoords(kegiatan2Ref.current, { x: 0, y: 0 }).y,
      duration: 0.75,
      ease: "power2.inOut",
    }, "+=1.0");

    // Click "Kasus 2"
    tl.call(() => {
      triggerClickPulse();
      setActiveKegiatanIdx(1);
    }, undefined, "+=0.12");

    // Pause to inspect Case 2 (Hackathon)
    tl.to({}, { duration: 3.0 });

    // ── PHASE 4: Glide back to Tab 1 (Roadmap) ──
    tl.to(cursor, {
      x: () => getCoords(tabRoadmapRef.current, { x: 0, y: 0 }).x,
      y: () => getCoords(tabRoadmapRef.current, { x: 0, y: 0 }).y,
      duration: 0.8,
      ease: "power2.inOut",
    });

    // Click Tab 1 to complete the loop
    tl.call(() => {
      triggerClickPulse();
      setActiveTab("roadmap");
      setActiveCareerIdx(0);
      setActiveKegiatanIdx(0);
    }, undefined, "+=0.1");

    return () => {
      tl.kill();
    };
  }, [getCoords, triggerClickPulse]);

  // Pause cursor tour when user interacts or browser tab is hidden
  useEffect(() => {
    if (!tlRef.current) return;
    if (!isTabActive) {
      tlRef.current.pause();
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { opacity: 0, duration: 0.2 });
      }
    } else if (isUserInteracting) {
      tlRef.current.pause();
      // Keep cursor gently visible at current position without vanishing abruptly
    } else {
      tlRef.current.resume();
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { opacity: 1, duration: 0.25 });
      }
    }
  }, [isUserInteracting, isTabActive]);

  const handleTabClick = (tabId: FeatureTab) => {
    setActiveTab(tabId);
    setIsUserInteracting(true);
    if (userTimerRef.current) clearTimeout(userTimerRef.current);
    userTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 4500);
  };

  const handleSelectCareer = (idx: number) => {
    setActiveCareerIdx(idx);
    setIsUserInteracting(true);
    if (userTimerRef.current) clearTimeout(userTimerRef.current);
    userTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 4500);
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedId((prev) => (prev === id ? "" : id));
  };

  const currentRoadmap = ROADMAP_PRESETS[activeCareerIdx];
  const currentKegiatan = KEGIATAN_PRESETS[activeKegiatanIdx];

  return (
    <div
      ref={windowContainerRef}
      className="relative w-full bg-surface-panel border border-border rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.08),0_24px_56px_-12px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col min-h-[480px] sm:min-h-[530px] text-ink select-none font-showcase"
    >
      {/* =========================================================================
          BROWSER CHROME
      ========================================================================= */}
      <div className="bg-surface-chrome border-b border-border px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2.5 sm:gap-3 relative z-20 shrink-0">
        {/* Window controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0" aria-hidden="true">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F57] border border-[#e0443e] inline-block" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] border border-[#dea123] inline-block" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28C840] border border-[#1aab29] inline-block" />
        </div>

        {/* URL pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-lg text-[11px] font-showcase-mono text-ink-body max-w-sm w-full justify-center">
          <Lock className="w-3 h-3 text-ink-muted shrink-0" />
          <span className="truncate">
            gapless.id/app/
            {activeTab === "roadmap"
              ? "roadmap-kurikulum"
              : activeTab === "misi"
              ? "misi-situasional"
              : "portofolio-industri"}
          </span>
        </div>

        {/* Status pill */}
        <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-done-tint border border-done-tint-bd shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
          <span className="font-showcase-mono text-[10px] sm:text-[11px] font-semibold text-done-ink">Sistem Terkalibrasi</span>
        </div>
      </div>

      {/* =========================================================================
          TAB STRIP
      ========================================================================= */}
      <div className="bg-surface-muted border-b border-border-hair px-3.5 sm:px-6 py-2 sm:py-2.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-3 relative z-20 shrink-0">
        <div
          role="tablist"
          aria-label="Fitur Gapless"
          className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-[#EDF1F7] border border-[#E1E7F0] overflow-x-auto no-scrollbar touch-pan-x max-w-full"
        >
          {FEATURE_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            const ref =
              tab.id === "roadmap"
                ? tabRoadmapRef
                : tab.id === "misi"
                ? tabMisiRef
                : tabPortoRef;

            return (
              <button
                key={tab.id}
                ref={ref}
                id={`tour-tab-${tab.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tour-panel-${tab.id}`}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={`px-3 sm:px-4 py-2 sm:py-1.5 rounded-lg text-xs font-bold transition-colors duration-200 cursor-pointer min-h-[38px] sm:min-h-[40px] flex items-center gap-1.5 sm:gap-2 shrink-0 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${
                  isActive
                    ? "bg-blue text-white"
                    : "bg-transparent text-ink-strong hover:bg-white/70"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span
                  className={`hidden sm:inline-block text-[10px] font-showcase-mono font-medium px-1.5 py-0.5 rounded ${
                    isActive ? "bg-white/[0.22] text-white" : "text-ink-muted"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Auto-tour indicator */}
        <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-showcase-mono text-ink-body shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
          <span>Tur Otomatis</span>
          <span className="text-ink-muted hidden md:inline">· Klik bebas kapan saja</span>
        </div>
      </div>

      {/* =========================================================================
          TAB PANELS — ketiganya selalu ter-render & ditumpuk di satu sel grid
          (lihat .tab-panels di globals.css), jadi tinggi wadah tetap.
      ========================================================================= */}
      <div className="tab-panels p-3.5 sm:p-6 lg:p-7 flex-1 relative z-10">
        {/* ===================================================================
            TAB 1: ROADMAP BELAJAR
        =================================================================== */}
        <div
          role="tabpanel"
          id="tour-panel-roadmap"
          aria-labelledby="tour-tab-roadmap"
          data-inactive={activeTab !== "roadmap" || undefined}
          inert={activeTab !== "roadmap"}
          className="space-y-4 sm:space-y-5 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-tint border border-blue-tint-bd flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-blue-deep" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-ink tracking-tight leading-tight">
                    Roadmap Belajar Terstruktur
                  </h3>
                  <p className="text-xs text-ink-body leading-tight mt-0.5">
                    Kurikulum 4 fase progresif terkalibrasi dengan standar industri nyata.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-tint border border-blue-tint-bd text-blue-deep text-[11px] font-showcase-mono font-semibold self-start sm:self-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-deep" />
                <span>Jalur Terbuka</span>
              </div>
            </div>

            {/* Career chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
              {ROADMAP_PRESETS.map((preset, idx) => {
                const isSelected = idx === activeCareerIdx;
                return (
                  <button
                    key={preset.id}
                    ref={idx === 1 ? careerDaRef : undefined}
                    type="button"
                    onClick={() => handleSelectCareer(idx)}
                    className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer btn-press flex items-center gap-2 shrink-0 border ${
                      isSelected
                        ? "bg-blue text-white border-blue"
                        : "bg-white border-border text-ink-strong hover:bg-surface-muted"
                    }`}
                  >
                    <span>{preset.career}</span>
                    <span
                      className={`text-[11px] font-showcase-mono tabular-nums font-bold ${
                        isSelected ? "text-white/80" : "text-ink-muted"
                      }`}
                    >
                      {preset.overallProgress}%
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Focus bar */}
            <div className="bg-surface-muted border border-border-hair rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-[11px] font-showcase-mono font-bold uppercase tracking-wider text-ink-muted shrink-0">
                  Jalur Fokus:
                </span>
                <span className="text-xs sm:text-sm font-bold text-ink truncate">
                  {currentRoadmap.track}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-24 sm:w-32 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue rounded-full transition-[width] duration-700 ease-out"
                    style={{ width: `${currentRoadmap.overallProgress}%` }}
                  />
                </div>
                <span className="text-xs font-showcase-mono font-bold text-ink tabular-nums">
                  {currentRoadmap.overallProgress}% Kesiapan
                </span>
              </div>
            </div>
          </div>

          {/* Module cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* FASE 01 — selesai */}
            <div className="bg-[#F7FCFA] border border-done-tint-bd rounded-2xl p-4 space-y-2.5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-done-tint text-done-ink border border-done-tint-bd shrink-0">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                      Selesai
                    </span>
                    <span className="text-xs font-bold text-ink-strong truncate">
                      {currentRoadmap.completedModule.phase}
                    </span>
                  </div>
                  <div className="shrink-0 font-showcase-mono text-xs font-bold text-done-ink tabular-nums">
                    Skor {currentRoadmap.completedModule.score}
                  </div>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-ink leading-snug">
                  {currentRoadmap.completedModule.name}
                </h4>
              </div>

              <div className="pt-2.5 border-t border-done-tint-bd flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-ink-body font-medium min-w-0">
                  <span className="text-ink-muted font-showcase-mono text-[11px] uppercase shrink-0">Skill:</span>
                  <span className="truncate">{currentRoadmap.completedModule.skills.join(" · ")}</span>
                </div>
                <span className="text-ink-muted font-showcase-mono text-[11px] flex items-center gap-1 shrink-0">
                  <Clock className="w-3 h-3" />
                  {currentRoadmap.completedModule.pace}
                </span>
              </div>
            </div>

            {/* FASE 02 — aktif */}
            <div className="bg-white border-2 border-blue rounded-2xl p-4 space-y-2.5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue text-white shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      Modul Aktif
                    </span>
                    <span className="text-xs font-bold text-ink truncate">
                      {currentRoadmap.activeModule.phase}
                    </span>
                  </div>
                  <span className="text-[11px] font-showcase-mono text-blue-deep font-bold shrink-0">
                    Target Minggu Ini
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-ink leading-snug">
                  {currentRoadmap.activeModule.name}
                </h4>
              </div>

              <div className="pt-2.5 border-t border-border-hair flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-ink-body font-medium min-w-0">
                  <span className="text-blue-deep font-showcase-mono text-[11px] uppercase font-bold shrink-0">Skill:</span>
                  <span className="truncate">{currentRoadmap.activeModule.skills.join(" · ")}</span>
                </div>
                <span className="text-blue-deep font-showcase-mono text-[11px] flex items-center gap-1 shrink-0">
                  <Clock className="w-3 h-3" />
                  {currentRoadmap.activeModule.pace}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline 4 fase */}
          <div className="bg-surface-muted border border-border-hair rounded-xl sm:rounded-2xl p-3 sm:p-5">
            <div className="relative flex items-start justify-between px-1 sm:px-8">
              <div className="absolute left-6 right-6 sm:left-10 sm:right-10 top-3.5 h-0.5 bg-locked" aria-hidden="true" />
              <div
                className="absolute left-6 sm:left-10 top-3.5 h-0.5 bg-done"
                style={{ width: "33%" }}
                aria-hidden="true"
              />

              {currentRoadmap.phases.map((phase) => {
                const isCompleted = phase.status === "completed";
                const isInProgress = phase.status === "in_progress";
                const isReady = phase.status === "ready";

                return (
                  <div key={phase.phase} className="relative z-10 flex flex-col items-center text-center">
                    <div
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-done text-white"
                          : isInProgress
                          ? "bg-blue text-white ring-4 ring-[#D5E2FD]"
                          : "bg-white border-2 border-locked text-ink-muted"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5 stroke-[3]" />
                      ) : isInProgress ? (
                        <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white" />
                      ) : isReady ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-locked" />
                      ) : (
                        <Lock className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-locked" />
                      )}
                    </div>

                    <div className="mt-1.5 sm:mt-2 space-y-0.5">
                      <span
                        className={`text-[9.5px] sm:text-[10.5px] font-showcase-mono font-bold uppercase tracking-wider block ${
                          isInProgress
                            ? "text-blue-deep"
                            : isCompleted
                            ? "text-done-ink"
                            : "text-ink-muted"
                        }`}
                      >
                        Fase 0{phase.phase}
                      </span>
                      <h4 className="text-[10.5px] sm:text-xs font-bold text-ink block truncate max-w-[65px] sm:max-w-[120px] leading-tight">
                        {phase.title}
                      </h4>
                      <span
                        className={`inline-block text-[9.5px] sm:text-[10.5px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-md border ${
                          isCompleted
                            ? "text-done-ink bg-done-tint border-done-tint-bd"
                            : isInProgress
                            ? "text-blue-deep bg-blue-tint border-blue-tint-bd"
                            : isReady
                            ? "text-ink-body bg-white border-border"
                            : "text-ink-muted bg-transparent border-transparent"
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

        {/* ===================================================================
            TAB 2: MISI SOFT SKILL
        =================================================================== */}
        <div
          role="tabpanel"
          id="tour-panel-misi"
          aria-labelledby="tour-tab-misi"
          data-inactive={activeTab !== "misi" || undefined}
          inert={activeTab !== "misi"}
          className="space-y-4 sm:space-y-5 flex flex-col justify-between"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-hair pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-done-tint border border-done-tint-bd flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-done-ink" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-ink tracking-tight leading-tight">
                  Misi Soft Skill
                </h3>
                <p className="text-xs text-ink-body leading-tight mt-0.5">
                  Latihan situasional harian berhadiah XP untuk mengasah keahlian kerja nyata.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto bg-surface-muted border border-border-hair px-3 py-1.5 rounded-xl">
              <div className="text-right">
                <div className="font-showcase-mono text-sm sm:text-base font-extrabold text-ink tabular-nums leading-none">
                  450 <span className="text-xs font-bold text-done-ink">XP</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-16 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div className="h-full bg-done rounded-full w-[75%]" />
                  </div>
                  <span className="text-[10.5px] font-showcase-mono text-ink-muted font-bold tabular-nums">Lv. 3</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {/* Misi 1 — selesai */}
            <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-done-tint-bd bg-[#F7FCFA]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-7 h-7 rounded-full bg-done flex items-center justify-center text-white shrink-0">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-ink text-xs sm:text-sm truncate">
                    Sampaikan Ide Tim Cross-Functional
                  </div>
                  <div className="text-[11px] text-ink-muted font-showcase-mono mt-0.5">
                    Komunikasi · 15 Mnt
                  </div>
                </div>
              </div>
              <div className="font-showcase-mono text-xs sm:text-sm font-bold text-done-ink shrink-0 tabular-nums">
                +150 XP
              </div>
            </div>

            {/* Misi 2 — aktif */}
            <div className="flex items-center justify-between px-4 py-3 rounded-xl border-2 border-blue bg-white">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-7 h-7 rounded-full bg-blue-tint border border-blue-tint-bd flex items-center justify-center shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-ink text-xs sm:text-sm truncate">
                    Negosiasi Prioritas Sprint Tim
                  </div>
                  <div className="text-[11px] text-blue-deep font-showcase-mono mt-0.5">
                    Kolaborasi · 20 Mnt
                  </div>
                </div>
              </div>
              <div className="font-showcase-mono text-xs sm:text-sm font-bold text-blue-deep shrink-0 tabular-nums">
                +200 XP
              </div>
            </div>

            {/* Misi 3 — terkunci */}
            <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-border-hair bg-surface-muted">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-7 h-7 rounded-full bg-white border-2 border-locked flex items-center justify-center shrink-0">
                  <Lock className="w-3.5 h-3.5 text-ink-muted" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-ink-muted text-xs sm:text-sm truncate">
                    Evaluasi Risiko Rilis Aplikasi
                  </div>
                  <div className="text-[11px] text-ink-muted font-showcase-mono mt-0.5">
                    Tanggung Jawab · 30 Mnt
                  </div>
                </div>
              </div>
              <div className="font-showcase-mono text-xs sm:text-sm font-bold text-ink-muted shrink-0 tabular-nums">
                +250 XP
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border-hair flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1.5 flex-1 max-w-md">
              <div className="flex items-center justify-between text-xs">
                <span className="text-ink-body font-medium">Progres Misi Harian</span>
                <span className="text-done-ink font-showcase-mono font-bold tabular-nums">2 / 3 Selesai (67%)</span>
              </div>
              <div className="w-full h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                <div className="h-full bg-done rounded-full w-[67%]" />
              </div>
            </div>

            <Link
              href="/assessment"
              className="btn-press inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl bg-blue hover:bg-blue-deep text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer group shrink-0 min-h-[44px] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              <span>Mulai Latihan Situasional</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* ===================================================================
            TAB 3: PORTOFOLIO
        =================================================================== */}
        <div
          role="tabpanel"
          id="tour-panel-portofolio"
          aria-labelledby="tour-tab-portofolio"
          data-inactive={activeTab !== "portofolio" || undefined}
          inert={activeTab !== "portofolio"}
          className="space-y-4 sm:space-y-5 flex flex-col justify-between"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-hair pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-tint border border-blue-tint-bd flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-blue-deep" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-ink tracking-tight leading-tight">
                  Bangun Portofolio Teruji
                </h3>
                <p className="text-xs text-ink-body leading-tight mt-0.5">
                  Studi kasus riil yang dievaluasi standar industri & lowongan terkurasi.
                </p>
              </div>
            </div>

            <div className="text-[11px] font-showcase-mono font-bold tracking-wider text-blue-deep uppercase self-start sm:self-auto bg-blue-tint px-2.5 py-1 rounded-lg border border-blue-tint-bd">
              Simulasi Kasus Riil
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-border flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-showcase-mono">
                <span className="text-ink-muted font-bold uppercase tracking-wider text-[11px]">
                  Studi Kasus Rekomendasi
                </span>
                <span className="text-done-ink font-bold tabular-nums text-xs sm:text-sm">
                  {currentKegiatan.match}% Cocok
                </span>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-bold text-ink">
                  {currentKegiatan.title}
                </h4>
                <div className="text-xs text-ink-body mt-0.5">
                  {currentKegiatan.organizer}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {currentKegiatan.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 bg-surface-muted border border-border-hair rounded-lg text-ink-strong font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border-hair text-xs">
              <span className="text-[#B45309] font-showcase-mono font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {currentKegiatan.deadline}
              </span>
              <button
                type="button"
                onClick={(e) => toggleBookmark(currentKegiatan.id, e)}
                className="text-ink-body hover:text-ink transition-colors cursor-pointer flex items-center gap-1.5 font-showcase-mono text-xs min-h-[44px] -my-3 px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue rounded"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${
                    bookmarkedId === currentKegiatan.id ? "fill-blue text-blue" : ""
                  }`}
                />
                <span>{bookmarkedId === currentKegiatan.id ? "Tersimpan" : "Simpan"}</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-border-hair flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 font-showcase-mono text-xs">
              {KEGIATAN_PRESETS.map((k, i) => (
                <button
                  key={k.id}
                  ref={i === 1 ? kegiatan2Ref : undefined}
                  type="button"
                  onClick={() => setActiveKegiatanIdx(i)}
                  className={`px-3.5 py-2 sm:py-1.5 min-h-[38px] rounded-lg cursor-pointer transition-colors active:scale-[0.97] border ${
                    i === activeKegiatanIdx
                      ? "bg-blue text-white font-bold border-blue"
                      : "bg-white border-border text-ink-strong hover:bg-surface-muted"
                  }`}
                >
                  Kasus {i + 1}
                </button>
              ))}
            </div>

            <Link
              href="/assessment"
              className="btn-press inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl bg-blue hover:bg-blue-deep text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer group shrink-0 min-h-[44px] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              <span>Mulai Simulasi</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================================
          VIRTUAL CURSOR
      ========================================================================= */}
      <div
        ref={cursorRef}
        className="absolute pointer-events-none z-50 top-0 left-0 will-change-transform"
        style={{ opacity: 1 }}
        aria-hidden="true"
      >
        <div className="relative">
          <span
            ref={clickPulseRef}
            className="absolute -top-3.5 -left-3.5 w-8 h-8 rounded-full bg-blue/25 border-2 border-blue pointer-events-none opacity-0 will-change-transform"
          />
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
            <path
              d="M2 2L18 12.5L10 14.5L6.5 22L2 2Z"
              fill="#2A64F6"
              stroke="#FFFFFF"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
