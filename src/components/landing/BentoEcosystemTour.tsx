"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
} from "lucide-react";
import FakeCursor from "./FakeCursor";

// Career Roadmaps Data (Streamlined & Clean)
const ROADMAP_PRESETS = [
  {
    id: "swe",
    career: "Software Engineer",
    track: "Full-Stack & Cloud Architecture",
    overallProgress: 68,
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

// Interactive Live Scenarios for Right Card Live Preview
const SCENARIO_PRESETS = [
  {
    id: "s1",
    question: "Sprint deadline mendadak maju 3 hari sementara ada bug kritis di staging. Apa langkah utamamu?",
    choiceA: "[A] Isolasi bug & komunikasikan trade-off scope fitur ke tim.",
    choiceB: "[B] Deploy hotfix cepat tanpa pengujian menyeluruh.",
    correctChoice: "A" as const,
    reward: "+50 XP Adaptabilitas & Manajemen Risiko",
    activeMissionId: "m2",
    finalProgress: 67,
    progressLabel: "2 / 3 Selesai (67%)",
  },
  {
    id: "s2",
    question: "Stakeholder meminta penambahan 3 fitur besar di tengah sprint tanpa mengubah deadline rilis.",
    choiceA: "[A] Terima semua permintaan tanpa validasi kapasitas tim.",
    choiceB: "[B] Analisis trade-off teknis dan tawarkan rilis modular bertahap.",
    correctChoice: "B" as const,
    reward: "+75 XP Negosiasi & Komunikasi Efektif",
    activeMissionId: "m3",
    finalProgress: 100,
    progressLabel: "3 / 3 Selesai (100%)",
  },
];

// Base Misi List
const MISI_BASE = [
  {
    id: "m1",
    title: "Sampaikan Ide Tim Cross-Functional",
    competency: "Komunikasi",
    xp: 150,
    time: "15 Mnt",
  },
  {
    id: "m2",
    title: "Negosiasi Prioritas Sprint Tim",
    competency: "Kolaborasi",
    xp: 200,
    time: "20 Mnt",
  },
  {
    id: "m3",
    title: "Evaluasi Risiko Rilis Aplikasi",
    competency: "Tanggung Jawab",
    xp: 250,
    time: "30 Mnt",
  },
];

export default function BentoEcosystemTour() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const choiceARef = useRef<HTMLButtonElement>(null);
  const choiceBRef = useRef<HTMLButtonElement>(null);

  // States for Left Card & Bottom Card
  const [activeCareerIdx, setActiveCareerIdx] = useState<number>(0);
  const [activeKegiatanIdx, setActiveKegiatanIdx] = useState<number>(0);
  const [bookmarkedId, setBookmarkedId] = useState<string>("k1");
  const [isInView, setIsInView] = useState<boolean>(true);
  const [isTabActive, setIsTabActive] = useState<boolean>(true);
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);

  // States for Right Card (Live Preview Interactive with Fake Cursor)
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<"A" | "B" | null>(null);
  const [isRewardAwarded, setIsRewardAwarded] = useState<boolean>(false);
  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>(["m1"]);
  const [liveDailyProgress, setLiveDailyProgress] = useState<number>(33);
  const [liveProgressLabel, setLiveProgressLabel] = useState<string>("1 / 3 Selesai (33%)");

  // Fake Cursor States for Right Card
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 260, y: 30 });
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [cursorVisible, setCursorVisible] = useState<boolean>(false);

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

  // Helper to move cursor to element within Right Card
  const moveCursorToTarget = useCallback((targetEl: HTMLElement | null) => {
    if (!targetEl || !rightCardRef.current) return;
    const cardRect = rightCardRef.current.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    // Point cursor near center-left of target
    const targetX = targetRect.left - cardRect.left + Math.min(60, targetRect.width * 0.4);
    const targetY = targetRect.top - cardRect.top + targetRect.height * 0.5;

    setCursorPos({ x: targetX, y: targetY });
  }, []);

  // LIVE PREVIEW STATE MACHINE FOR RIGHT CARD (Misi Soft Skill)
  useEffect(() => {
    if (prefersReducedMotion || !isInView || !isTabActive) return;

    let isSubscribed = true;
    let stepTimer: NodeJS.Timeout;

    const currentScenario = SCENARIO_PRESETS[activeScenarioIdx];
    const targetChoice = currentScenario.correctChoice;

    // Reset visual state on scenario entry
    setSelectedChoice(null);
    setIsRewardAwarded(false);
    setIsClicking(false);
    setCursorVisible(true);

    // Initial position above
    if (rightCardRef.current) {
      const cardRect = rightCardRef.current.getBoundingClientRect();
      setCursorPos({ x: cardRect.width * 0.75, y: 40 });
    }

    // Step 1: Gliding mouse to target option (500ms after entry)
    stepTimer = setTimeout(() => {
      if (!isSubscribed) return;
      const targetEl = targetChoice === "A" ? choiceARef.current : choiceBRef.current;
      moveCursorToTarget(targetEl);

      // Step 2: Click the target option (850ms glide)
      stepTimer = setTimeout(() => {
        if (!isSubscribed) return;
        setIsClicking(true);
        setSelectedChoice(targetChoice);

        // Step 3: Award XP & complete mission (250ms press feedback)
        stepTimer = setTimeout(() => {
          if (!isSubscribed) return;
          setIsClicking(false);
          setIsRewardAwarded(true);

          if (targetChoice === "A") {
            setCompletedMissionIds(["m1", "m2"]);
            setLiveDailyProgress(67);
            setLiveProgressLabel("2 / 3 Selesai (67%)");
          } else {
            setCompletedMissionIds(["m1", "m2", "m3"]);
            setLiveDailyProgress(100);
            setLiveProgressLabel("3 / 3 Selesai (100%)");
          }

          // Step 4: Rest and appreciate the reward (2200ms)
          stepTimer = setTimeout(() => {
            if (!isSubscribed) return;
            // Move cursor away slightly
            setCursorPos((prev) => ({ x: prev.x + 30, y: prev.y + 60 }));
            setCursorVisible(false);

            // Step 5: Transition to next scenario (600ms)
            stepTimer = setTimeout(() => {
              if (!isSubscribed) return;
              setActiveScenarioIdx((prev) => (prev + 1) % SCENARIO_PRESETS.length);
            }, 600);
          }, 2200);
        }, 250);
      }, 850);
    }, 500);

    return () => {
      isSubscribed = false;
      clearTimeout(stepTimer);
    };
  }, [activeScenarioIdx, isInView, isTabActive, moveCursorToTarget, prefersReducedMotion]);

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
  const currentScenario = SCENARIO_PRESETS[activeScenarioIdx];

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 select-none w-full items-stretch font-sans"
    >
      {/* =========================================================================
          ROW 1, CARD 1: ROADMAP BELAJAR TERSTRUKTUR (lg:col-span-8 - Black Shadow)
      ========================================================================= */}
      <div className="lg:col-span-8 p-3.5 sm:p-4.5 bg-white border border-slate-200/90 rounded-2xl flex flex-col justify-between shadow-[0_16px_36px_-8px_rgba(0,0,0,0.18),0_4px_12px_-2px_rgba(0,0,0,0.08)] space-y-2.5">
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

        {/* Active Module Box (Clean, streamlined, no walls of text) */}
        <div className="bg-white border border-blue-100 rounded-xl p-2.5 shadow-3xs space-y-1.5 min-h-[96px] flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-blue-50 text-brand-primary text-[9.5px] font-bold uppercase tracking-wider border border-blue-100">
                <BookOpen className="w-2.5 h-2.5 text-brand-primary" />
                {currentRoadmap.activeModule.phase}
              </span>
              <span className="text-[9.5px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
                Target Selesai Minggu Ini
              </span>
            </div>
            <span className="text-[9.5px] text-slate-500 font-medium flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-brand-primary" />
              {currentRoadmap.activeModule.pace}
            </span>
          </div>

          <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug truncate">
            {currentRoadmap.activeModule.name}
          </h4>

          {/* Skill Keys & Project Capstone */}
          <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1.5 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[8.5px] font-mono text-slate-400 uppercase tracking-wider">
                Skill:
              </span>
              {currentRoadmap.activeModule.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[9.5px] font-medium px-1.5 py-0.2 rounded bg-blue-50/70 border border-blue-100 text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="inline-flex items-center gap-1 text-[10.5px] text-brand-primary font-bold bg-blue-50/70 px-1.5 py-0.5 rounded border border-blue-100">
              <Award className="w-3 h-3 text-brand-primary shrink-0" />
              <span className="truncate max-w-[240px]">
                {currentRoadmap.activeModule.project}
              </span>
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
          ROW 1, CARD 2: MISI SOFT SKILL & SJT (lg:col-span-4 - Live Preview Virtual Cursor)
      ========================================================================= */}
      <div
        ref={rightCardRef}
        className="relative lg:col-span-4 p-3.5 sm:p-4.5 bg-white border border-slate-200/90 rounded-2xl flex flex-col justify-between shadow-[0_16px_36px_-8px_rgba(0,0,0,0.18),0_4px_12px_-2px_rgba(0,0,0,0.08)] space-y-2.5 overflow-hidden"
      >
        {/* Animated Virtual Mouse Cursor */}
        <FakeCursor
          x={cursorPos.x}
          y={cursorPos.y}
          isClicking={isClicking}
          visible={cursorVisible}
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6.5 h-6.5 rounded-lg bg-blue-50 flex items-center justify-center text-brand-primary border border-blue-100 shadow-3xs">
                <Target className="w-3.5 h-3.5 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  Misi Soft Skill
                </h3>
                <p className="text-[10.5px] text-slate-500">
                  Latihan situasional harian berhadiah XP.
                </p>
              </div>
            </div>

            {/* Live Indicator Chip */}
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[9.5px] font-bold text-brand-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
              <span>Live Simulasi</span>
            </div>
          </div>

          {/* Interactive Dilemma Choice Demo with Live Cursor Motion */}
          <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 space-y-1.5 transition-all duration-300">
            <div className="flex items-center justify-between text-[8.5px] font-mono text-slate-400 uppercase tracking-wider">
              <span>SKENARIO HARI INI</span>
              <span className="text-brand-primary font-bold">LEVEL 3 • 450 XP</span>
            </div>
            <p className="text-[11.5px] font-semibold text-slate-900 leading-snug min-h-[30px] transition-all duration-300">
              &quot;{currentScenario.question}&quot;
            </p>

            <div className="space-y-1 pt-0.5">
              <button
                ref={choiceARef}
                type="button"
                className={`w-full text-left px-2 py-1.5 rounded-lg text-[10px] leading-snug font-medium border transition-all duration-200 ${
                  selectedChoice === "A"
                    ? "bg-white border-brand-primary text-brand-primary font-bold shadow-xs ring-2 ring-brand-primary/20 scale-[0.99]"
                    : "bg-white/80 border-slate-200 text-slate-600 hover:border-blue-200"
                }`}
              >
                {currentScenario.choiceA}
              </button>

              <button
                ref={choiceBRef}
                type="button"
                className={`w-full text-left px-2 py-1.5 rounded-lg text-[10px] leading-snug font-medium border transition-all duration-200 ${
                  selectedChoice === "B"
                    ? "bg-white border-brand-primary text-brand-primary font-bold shadow-xs ring-2 ring-brand-primary/20 scale-[0.99]"
                    : "bg-white/80 border-slate-200 text-slate-600 hover:border-blue-200"
                }`}
              >
                {currentScenario.choiceB}
              </button>
            </div>

            {/* XP Award Micro-Animation */}
            <div
              className={`text-[9.5px] font-mono pt-0.5 text-emerald-700 flex items-center gap-1.5 font-bold transition-opacity duration-300 ${
                isRewardAwarded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
              }`}
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>{currentScenario.reward}</span>
            </div>
          </div>

          {/* Missions Checklist with Live Active Highlight */}
          <div className="space-y-1 pt-0.5">
            <div className="text-[8.5px] font-mono text-slate-400 uppercase tracking-wider">
              DAFTAR MISI TERSEDIA:
            </div>
            {MISI_BASE.map((misi) => {
              const isCompleted = completedMissionIds.includes(misi.id);
              const isSimulatedActive =
                !isCompleted && misi.id === currentScenario.activeMissionId;

              return (
                <div
                  key={misi.id}
                  className={`flex items-center justify-between px-2 py-1.5 rounded-lg border text-xs transition-all duration-300 ${
                    isSimulatedActive
                      ? "bg-white border-brand-primary shadow-xs ring-1 ring-brand-primary/20 scale-[1.01]"
                      : isCompleted
                      ? "bg-emerald-50/25 border-emerald-200"
                      : "bg-slate-50/60 border-slate-200 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-700"
                          : isSimulatedActive
                          ? "bg-blue-100 text-brand-primary"
                          : "bg-slate-200 text-slate-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-2.5 h-2.5" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      )}
                    </span>
                    <div className="truncate">
                      <div className="font-semibold text-slate-900 text-[10.5px] truncate">
                        {misi.title}
                      </div>
                      <div className="text-[8.5px] text-slate-400">
                        {misi.competency} • {misi.time}
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-[8.5px] font-bold text-brand-primary bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100 shrink-0">
                    +{misi.xp} XP
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Progress Meter with Live Fill Transition */}
        <div className="pt-1.5 border-t border-slate-100">
          <div className="flex items-center justify-between text-[9.5px] text-slate-500 mb-0.5 font-mono">
            <span>PROGRES MISI HARIAN</span>
            <span className="font-bold text-emerald-700 transition-all">
              {liveProgressLabel}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${liveDailyProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 2, CARD 3: FULL WIDTH ROYAL BLUE SECTION (lg:col-span-12 - Black Shadow)
      ========================================================================= */}
      <div className="lg:col-span-12 p-3.5 sm:p-4 bg-gradient-to-br from-[#0066FF] to-[#004ecc] text-white rounded-2xl flex flex-col justify-between shadow-[0_20px_45px_-10px_rgba(0,0,0,0.35),0_8px_18px_-4px_rgba(0,0,0,0.18)] space-y-2.5">
        <div>
          {/* Header Eyebrow */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-100">
              SIMULASI KERJA VIRTUAL &amp; VERIFIKASI INDUSTRI
            </span>
            <span className="text-[9px] font-mono font-bold text-white bg-white/20 border border-white/30 px-2 py-0.2 rounded-full">
              PORTOFOLIO TERVERIFIKASI
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
            <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white leading-tight">
              Bangun Portofolio Teruji Sebelum Melamar Kerja
            </h3>
            <p className="text-[10.5px] text-blue-100/90 leading-tight">
              Studi kasus riil yang dievaluasi standar industri dan lowongan terkurasi.
            </p>
          </div>

          {/* 2-Column Split: Featured Curated Activity + Virtual Work Simulation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {/* Left Column: Featured Curated Activity with Auto-Cycle */}
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex flex-col justify-between min-h-[145px] sm:min-h-[150px] space-y-1.5">
              <div>
                <div className="flex items-center justify-between text-[8.5px] font-mono text-blue-100 mb-0.5">
                  <span>KEGIATAN TERKURASI</span>
                  <span className="text-white font-bold tabular-nums">{currentKegiatan.match}% Cocok</span>
                </div>
                <h4 className="text-xs sm:text-[13px] font-bold text-white truncate">
                  {currentKegiatan.title}
                </h4>
                <div className="text-[10.5px] text-blue-100 mt-0.5 truncate">
                  {currentKegiatan.organizer}
                </div>

                {/* Tags in single row with stable height */}
                <div className="flex items-center gap-1 mt-1.5 overflow-hidden h-[22px]">
                  {currentKegiatan.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[8.5px] px-1.5 py-0.2 bg-white/15 border border-white/20 rounded text-white shrink-0 truncate max-w-[140px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1.5 border-t border-white/15 text-[9.5px]">
                <span className="text-amber-200 font-mono font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-200" />
                  {currentKegiatan.deadline}
                </span>
                <button
                  onClick={(e) => toggleBookmark(currentKegiatan.id, e)}
                  className="text-white hover:text-blue-200 transition-colors cursor-pointer flex items-center gap-1 font-mono text-[9.5px]"
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

            {/* Right Column: Work Simulation Showcase */}
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex flex-col justify-between min-h-[145px] sm:min-h-[150px] space-y-1.5">
              <div>
                <div className="flex items-center justify-between text-[8.5px] font-mono text-blue-100 mb-0.5">
                  <span>STUDI KASUS SPESIALISASI</span>
                  <span className="text-emerald-300 font-bold">100% RELEVAN</span>
                </div>
                <h4 className="text-xs sm:text-[13px] font-bold text-white truncate">
                  Simulasi Penanganan Insiden Finansial
                </h4>
                <p className="text-[10.5px] text-blue-100/90 mt-0.5 leading-snug line-clamp-1">
                  Menyelesaikan simulasi arsitektur sistem checkout skala tinggi &amp; analisis trade-off performa.
                </p>
                <div className="text-[9.5px] font-mono text-blue-200 mt-1 truncate">
                  Luaran: Dokumen RFC + Script Pengujian Stres
                </div>
              </div>

              <div className="pt-1.5 border-t border-white/15 flex items-center justify-between">
                <span className="text-[9.5px] font-mono text-blue-100">
                  Model Sertifikasi Mandiri
                </span>
                <Link
                  href="/assessment"
                  className="btn-press inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-brand-primary text-[11px] font-bold shadow-xs hover:bg-blue-50 transition-colors cursor-pointer group"
                >
                  <span>Mulai Simulasi</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar inside Blue Card */}
        <div className="pt-1.5 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[10.5px] text-blue-100">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Terbuka untuk semua mahasiswa dengan akun terdaftar</span>
          </div>

          <div className="flex items-center gap-1 font-mono text-[9.5px]">
            {KEGIATAN_PRESETS.map((k, i) => (
              <button
                key={k.id}
                onClick={() => setActiveKegiatanIdx(i)}
                className={`px-2 py-0.2 rounded cursor-pointer transition-colors ${
                  i === activeKegiatanIdx
                    ? "bg-white text-brand-primary font-bold shadow-xs"
                    : "text-blue-200 hover:text-white"
                }`}
              >
                Kegiatan {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
