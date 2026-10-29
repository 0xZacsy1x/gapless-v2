"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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
  const windowContentRef = useRef<HTMLDivElement>(null);
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

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

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

  // GSAP Smooth fade/slide when switching tabs
  useGSAP(() => {
    if (windowContentRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        windowContentRef.current,
        { opacity: 0.45, y: 8 },
        { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }
      );
    }
  }, [activeTab, prefersReducedMotion]);

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
      className="relative w-full bg-[#1c1c1e] border border-white/[0.12] rounded-2xl sm:rounded-3xl shadow-[0_28px_70px_-15px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.12)] overflow-hidden flex flex-col min-h-[480px] sm:min-h-[530px] text-[#f5f5f7] select-none font-sans"
    >
      {/* =========================================================================
          MACOS TOP WINDOW CHROME (MacBook Titlebar)
      ========================================================================= */}
      <div className="bg-[#252528] border-b border-white/[0.08] px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2.5 sm:gap-3 relative z-20 shrink-0">
        {/* macOS 3 Window Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F57] border border-[#e0443e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block"
            title="Close"
          />
          <span
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] border border-[#dea123] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block"
            title="Minimize"
          />
          <span
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28C840] border border-[#1aab29] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block"
            title="Fullscreen"
          />
        </div>

        {/* Window Subtitle / URL Address Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#1c1c1e] border border-white/[0.08] rounded-lg text-[11px] font-mono text-[#98989d] shadow-3xs max-w-sm w-full justify-center">
          <Lock className="w-3 h-3 text-[#98989d] shrink-0" />
          <span className="truncate">
            gapless.id/app/
            {activeTab === "roadmap"
              ? "roadmap-kurikulum"
              : activeTab === "misi"
              ? "misi-situasional"
              : "portofolio-industri"}
          </span>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-[#2c2c2e] border border-white/10 text-xs font-semibold text-[#f5f5f7] shadow-3xs shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#30d158]" />
          <span className="font-mono text-[10px] sm:text-[11px] text-[#e5e5e7]">Sistem Terkalibrasi</span>
        </div>
      </div>

      {/* =========================================================================
          IN-WINDOW TAB NAVIGATION BAR (Tabs Inside MacBook Window)
      ========================================================================= */}
      <div className="bg-[#18181b] border-b border-white/[0.08] px-3.5 sm:px-6 py-2 sm:py-2.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-3 relative z-20 shrink-0">
        {/* Segmented Control Tabs */}
        <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-[#242426] border border-white/[0.08] overflow-x-auto no-scrollbar touch-pan-x max-w-full">
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
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={`px-3 sm:px-4 py-2 sm:py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer min-h-[38px] sm:min-h-[40px] flex items-center gap-1.5 sm:gap-2 shrink-0 active:scale-[0.97] ${
                  isActive
                    ? "bg-[#0066FF] text-white shadow-xs"
                    : "text-[#98989d] hover:text-[#f5f5f7] hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span
                  className={`hidden sm:inline-block text-[10px] font-mono font-medium px-1.5 py-0.2 rounded ${
                    isActive ? "bg-white/20 text-white" : "text-[#71717a]"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Auto-Tour Status Indicator */}
        <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-mono text-[#98989d] shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
          <span>Tur Otomatis</span>
          <span className="text-[#71717a] hidden md:inline">· Klik bebas kapan saja</span>
        </div>
      </div>

      {/* =========================================================================
          DYNAMIC WINDOW CONTENT CANVAS
      ========================================================================= */}
      <div
        ref={windowContentRef}
        className="p-3.5 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between space-y-4 sm:space-y-5 relative z-10"
      >
        {/* ===================================================================
            TAB 1: ROADMAP BELAJAR TERSTRUKTUR
        =================================================================== */}
        {activeTab === "roadmap" && (
          <div className="space-y-4 sm:space-y-5 flex-1 flex flex-col justify-between">
            {/* Header & Career Selector Bar */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center text-[#0066FF] shadow-3xs shrink-0">
                    <GraduationCap className="w-5 h-5 text-[#0066FF]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#f5f5f7] tracking-tight leading-tight">
                      Roadmap Belajar Terstruktur
                    </h3>
                    <p className="text-xs text-[#98989d] leading-tight mt-0.5">
                      Kurikulum 4 fase progresif terkalibrasi dengan standar industri nyata.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#2c2c2e] border border-white/10 text-[#f5f5f7] text-[11px] font-mono font-medium self-start sm:self-auto">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                  <span>Jalur Terbuka</span>
                </div>
              </div>

              {/* Career Selector Tabs (Brand Blue Highlight) */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
                {ROADMAP_PRESETS.map((preset, idx) => {
                  const isSelected = idx === activeCareerIdx;
                  return (
                    <button
                      key={preset.id}
                      ref={idx === 1 ? careerDaRef : undefined}
                      type="button"
                      onClick={() => handleSelectCareer(idx)}
                      className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer btn-press flex items-center gap-2 shrink-0 ${
                        isSelected
                          ? "bg-[#0066FF] text-white border border-[#0066FF] shadow-xs"
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
              <div className="bg-[#242426] border border-white/[0.08] rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#a1a1a6] shrink-0">
                    Jalur Fokus:
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#f5f5f7] truncate">
                    {currentRoadmap.track}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-24 sm:w-32 h-2 bg-[#3a3a3c] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0066FF] rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${currentRoadmap.overallProgress}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#f5f5f7] tabular-nums">
                    {currentRoadmap.overallProgress}% Kesiapan
                  </span>
                </div>
              </div>
            </div>

            {/* Module Cards: 2 Columns Side-by-Side on Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* FASE 01: MODUL SELESAI */}
              <div className="bg-[#242426] border border-[#30d158]/30 rounded-2xl p-4 shadow-3xs space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#30d158]/15 text-[#30d158] border border-[#30d158]/30 shrink-0">
                        <Check className="w-3 h-3 text-[#30d158] stroke-[2.5]" />
                        Selesai
                      </span>
                      <span className="text-xs font-bold text-[#e5e5e7] truncate">
                        {currentRoadmap.completedModule.phase}
                      </span>
                    </div>
                    <div className="shrink-0 font-mono text-xs font-bold text-[#30d158]">
                      Skor {currentRoadmap.completedModule.score}
                    </div>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-[#f5f5f7] leading-snug">
                    {currentRoadmap.completedModule.name}
                  </h4>
                </div>

                <div className="pt-2.5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 text-[#98989d] font-medium">
                    <span className="text-[#a1a1a6] font-mono text-[11px] uppercase">Skill:</span>
                    <span className="truncate">{currentRoadmap.completedModule.skills.join(" · ")}</span>
                  </div>
                  <span className="text-[#a1a1a6] font-mono text-[11px] flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3 text-[#a1a1a6]" />
                    {currentRoadmap.completedModule.pace}
                  </span>
                </div>
              </div>

              {/* FASE 02: MODUL AKTIF (Brand Blue Highlight) */}
              <div className="bg-[#242426] border-2 border-[#0066FF] rounded-2xl p-4 shadow-xs space-y-2.5 flex flex-col justify-between ring-2 ring-[#0066FF]/20">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#0066FF] text-white shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        Modul Aktif
                      </span>
                      <span className="text-xs font-bold text-[#f5f5f7] truncate">
                        {currentRoadmap.activeModule.phase}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#0066FF] font-bold shrink-0">
                      Target Minggu Ini
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-[#f5f5f7] leading-snug">
                    {currentRoadmap.activeModule.name}
                  </h4>
                </div>

                <div className="pt-2.5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 text-[#e5e5e7] font-medium">
                    <span className="text-[#0066FF] font-mono text-[11px] uppercase font-bold">Skill:</span>
                    <span className="truncate">{currentRoadmap.activeModule.skills.join(" · ")}</span>
                  </div>
                  <span className="text-[#0066FF] font-mono text-[11px] flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3 text-[#0066FF]" />
                    {currentRoadmap.activeModule.pace}
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Phases Stepper Timeline (Spanning Full Width) */}
            <div className="bg-[#242426] border border-white/[0.08] rounded-xl sm:rounded-2xl p-3 sm:p-5">
              <div className="relative flex items-start justify-between px-1 sm:px-8">
                {/* Background connecting rail */}
                <div className="absolute left-6 right-6 sm:left-10 sm:right-10 top-3.5 h-0.5 bg-[#3a3a3c]" aria-hidden="true" />
                {/* Completed rail */}
                <div
                  className="absolute left-6 sm:left-10 top-3.5 h-0.5 bg-[#30d158] transition-all duration-500"
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
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isCompleted
                            ? "bg-[#30d158] text-black shadow-2xs"
                            : isInProgress
                            ? "bg-[#0066FF] text-white ring-4 ring-[#0066FF]/25 shadow-xs"
                            : isReady
                            ? "bg-[#2c2c2e] border-2 border-white/20 text-[#98989d]"
                            : "bg-[#202022] border-2 border-white/10 text-white/30"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-black stroke-[3]" />
                        ) : isInProgress ? (
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white" />
                        ) : isReady ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        ) : (
                          <Lock className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white/30" />
                        )}
                      </div>

                      <div className="mt-1.5 sm:mt-2 space-y-0.5">
                        <span
                          className={`text-[9.5px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider block ${
                            isInProgress
                              ? "text-[#0066FF]"
                              : isCompleted
                              ? "text-[#30d158]"
                              : "text-[#a1a1a6]"
                          }`}
                        >
                          Fase 0{phase.phase}
                        </span>
                        <h4 className="text-[10.5px] sm:text-xs font-bold text-[#f5f5f7] block truncate max-w-[65px] sm:max-w-[120px] leading-tight">
                          {phase.title}
                        </h4>
                        <span
                          className={`inline-block text-[9.5px] sm:text-[10.5px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-md ${
                            isCompleted
                              ? "text-[#30d158] bg-[#30d158]/15 border border-[#30d158]/30"
                              : isInProgress
                              ? "text-[#0066FF] bg-[#0066FF]/15 border border-[#0066FF]/30"
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
        )}

        {/* ===================================================================
            TAB 2: MISI SOFT SKILL
        =================================================================== */}
        {activeTab === "misi" && (
          <div className="space-y-4 sm:space-y-5 flex-1 flex flex-col justify-between">
            {/* Header with Level & XP Counter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center text-[#30d158] shadow-3xs shrink-0">
                  <Target className="w-5 h-5 text-[#30d158]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#f5f5f7] tracking-tight leading-tight">
                    Misi Soft Skill
                  </h3>
                  <p className="text-xs text-[#98989d] leading-tight mt-0.5">
                    Latihan situasional harian berhadiah XP untuk mengasah keahlian kerja nyata.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto bg-[#242426] border border-white/[0.08] px-3 py-1.5 rounded-xl">
                <div className="text-right">
                  <div className="font-mono text-sm sm:text-base font-extrabold text-[#f5f5f7] tabular-nums leading-none">
                    450 <span className="text-xs font-bold text-[#30d158]">XP</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-16 h-1.5 bg-[#3a3a3c] rounded-full overflow-hidden">
                      <div className="h-full bg-[#30d158] rounded-full w-[75%]" />
                    </div>
                    <span className="text-[10.5px] font-mono text-[#a1a1a6] font-bold">Lv. 3</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Situational Missions (Dark High Contrast Surface) */}
            <div className="space-y-2.5">
              {/* Mission 1 (Completed) */}
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#30d158]/30 bg-[#242426] shadow-3xs transition-all">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-[#30d158]/20 flex items-center justify-center text-[#30d158] shrink-0">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[#f5f5f7] text-xs sm:text-sm truncate">
                      Sampaikan Ide Tim Cross-Functional
                    </div>
                    <div className="text-[11px] text-[#a1a1a6] font-medium mt-0.5">
                      Komunikasi · 15 Mnt
                    </div>
                  </div>
                </div>
                <div className="font-mono text-xs sm:text-sm font-bold text-[#30d158] shrink-0 tabular-nums">
                  +150 XP
                </div>
              </div>

              {/* Mission 2 (Active / In Progress with Brand Blue) */}
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border-2 border-[#0066FF] bg-[#242426] shadow-xs ring-2 ring-[#0066FF]/20 transition-all">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-[#0066FF]/20 flex items-center justify-center text-[#0066FF] shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[#f5f5f7] text-xs sm:text-sm truncate">
                      Negosiasi Prioritas Sprint Tim
                    </div>
                    <div className="text-[11px] text-[#0066FF] font-medium mt-0.5">
                      Kolaborasi · 20 Mnt
                    </div>
                  </div>
                </div>
                <div className="font-mono text-xs sm:text-sm font-bold text-[#0066FF] shrink-0 tabular-nums">
                  +200 XP
                </div>
              </div>

              {/* Mission 3 (Locked) */}
              <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-white/[0.06] bg-[#202022] transition-all opacity-75">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center text-[#a1a1a6] shrink-0">
                    <Lock className="w-3.5 h-3.5 text-[#a1a1a6]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[#a1a1a6] text-xs sm:text-sm truncate">
                      Evaluasi Risiko Rilis Aplikasi
                    </div>
                    <div className="text-[11px] text-[#a1a1a6]/80 font-medium mt-0.5">
                      Tanggung Jawab · 30 Mnt
                    </div>
                  </div>
                </div>
                <div className="font-mono text-xs sm:text-sm font-bold text-[#a1a1a6] shrink-0 tabular-nums">
                  +250 XP
                </div>
              </div>
            </div>

            {/* Daily Progress Meter & Action */}
            <div className="pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1.5 flex-1 max-w-md">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#98989d] font-medium">Progres Misi Harian</span>
                  <span className="text-[#30d158] font-mono font-bold tabular-nums">2 / 3 Selesai (67%)</span>
                </div>
                <div className="w-full h-2 bg-[#3a3a3c] rounded-full overflow-hidden">
                  <div className="h-full bg-[#30d158] rounded-full w-[67%]" />
                </div>
              </div>

              <Link
                href="/assessment"
                className="btn-press inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer group shrink-0 min-h-[44px] active:scale-[0.97]"
              >
                <span>Mulai Latihan Situasional</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: PORTOFOLIO (BANGUN PORTOFOLIO TERUJI)
        =================================================================== */}
        {activeTab === "portofolio" && (
          <div className="space-y-4 sm:space-y-5 flex-1 flex flex-col justify-between">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center text-[#0066FF] shadow-3xs shrink-0">
                  <Briefcase className="w-5 h-5 text-[#0066FF]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#f5f5f7] tracking-tight leading-tight">
                    Bangun Portofolio Teruji
                  </h3>
                  <p className="text-xs text-[#98989d] leading-tight mt-0.5">
                    Studi kasus riil yang dievaluasi standar industri & lowongan terkurasi.
                  </p>
                </div>
              </div>

              <div className="text-[11px] font-mono font-bold tracking-wider text-[#0066FF] uppercase self-start sm:self-auto bg-[#0066FF]/15 px-2.5 py-1 rounded-lg border border-[#0066FF]/30">
                Simulasi Kasus Riil
              </div>
            </div>

            {/* Curated Case Study Card (Dark Surface, Crisp Details) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#242426] border border-white/[0.08] flex flex-col justify-between space-y-4 shadow-3xs">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#a1a1a6] font-bold uppercase tracking-wider text-[11px]">
                    Studi Kasus Rekomendasi
                  </span>
                  <span className="text-[#30d158] font-bold tabular-nums text-xs sm:text-sm font-mono">
                    {currentKegiatan.match}% Cocok
                  </span>
                </div>

                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#f5f5f7]">
                    {currentKegiatan.title}
                  </h4>
                  <div className="text-xs text-[#98989d] mt-0.5">
                    {currentKegiatan.organizer}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {currentKegiatan.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-white/[0.06] border border-white/10 rounded-lg text-[#e5e5e7] font-medium shadow-3xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deadline & Bookmark Row */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] text-xs">
                <span className="text-[#ffd60a] font-mono font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#ffd60a]" />
                  {currentKegiatan.deadline}
                </span>
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(currentKegiatan.id, e)}
                  className="text-[#98989d] hover:text-[#f5f5f7] transition-colors cursor-pointer flex items-center gap-1.5 font-mono text-xs"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      bookmarkedId === currentKegiatan.id ? "fill-[#0066FF] text-[#0066FF]" : ""
                    }`}
                  />
                  <span>{bookmarkedId === currentKegiatan.id ? "Tersimpan" : "Simpan"}</span>
                </button>
              </div>
            </div>

            {/* Case Switcher & CTA Button (Brand Blue: #0066FF) */}
            <div className="pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 font-mono text-xs">
                {KEGIATAN_PRESETS.map((k, i) => (
                  <button
                    key={k.id}
                    ref={i === 1 ? kegiatan2Ref : undefined}
                    type="button"
                    onClick={() => setActiveKegiatanIdx(i)}
                    className={`px-3.5 py-2 sm:py-1.5 min-h-[38px] rounded-lg cursor-pointer transition-colors active:scale-[0.97] ${
                      i === activeKegiatanIdx
                        ? "bg-[#0066FF] text-white font-bold shadow-xs"
                        : "bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[#98989d]"
                    }`}
                  >
                    Kasus {i + 1}
                  </button>
                ))}
              </div>

              <Link
                href="/assessment"
                className="btn-press inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer group shrink-0 min-h-[44px] active:scale-[0.97]"
              >
                <span>Mulai Simulasi</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          VIRTUAL ANIMATED CURSOR (Glides & Clicks Inside MacBook Window)
      ========================================================================= */}
      <div
        ref={cursorRef}
        className="absolute pointer-events-none z-50 top-0 left-0 will-change-transform"
        style={{ opacity: 1 }}
        aria-hidden="true"
      >
        <div className="relative">
          {/* Click Pulse Ripple (Origin centered directly on pointer tip at x=2, y=2) */}
          <span
            ref={clickPulseRef}
            className="absolute -top-3.5 -left-3.5 w-8 h-8 rounded-full bg-[#0066FF]/40 border-2 border-[#0066FF] pointer-events-none opacity-0 will-change-transform"
          />

          <svg
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            className="filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]"
          >
            <path
              d="M2 2L18 12.5L10 14.5L6.5 22L2 2Z"
              fill="#0066FF"
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
