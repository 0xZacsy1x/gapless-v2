"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  GraduationCap,
  Calendar,
  Target,
  Sparkles,
  CheckCircle2,
  Lock,
  Bookmark,
  Zap,
  Clock,
} from "lucide-react";

// Career Roadmaps Data (Matching real /roadmap sequential phase structure)
const ROADMAP_PRESETS = [
  {
    id: "swe",
    career: "Software Engineer",
    track: "Full-Stack & Cloud Architecture",
    overallProgress: 68,
    phases: [
      {
        phase: 1,
        title: "Fondasi Sistem",
        desc: "Logika algoritma & struktur data",
        status: "completed",
        progress: 100,
        modules: ["Algoritma Dasar", "Version Control Git", "Database & SQL"],
      },
      {
        phase: 2,
        title: "Praktik Industri",
        desc: "Framework modern & arsitektur API",
        status: "in_progress",
        progress: 75,
        modules: ["Next.js & React 19", "REST & GraphQL", "State Architecture"],
      },
      {
        phase: 3,
        title: "Spesialisasi Cloud",
        desc: "Docker, CI/CD, & microservices",
        status: "ready",
        progress: 0,
        modules: ["Docker Container", "CI/CD Pipeline", "Cloud Deployment"],
      },
      {
        phase: 4,
        title: "Kesiapan Kerja",
        desc: "Capstone project & tech interview",
        status: "locked",
        progress: 0,
        modules: ["Capstone Portofolio", "Mock Tech Interview"],
      },
    ],
  },
  {
    id: "data",
    career: "Data Analyst",
    track: "Business Intelligence & Machine Learning",
    overallProgress: 62,
    phases: [
      {
        phase: 1,
        title: "Fondasi Analitik",
        desc: "Statistika & querying data",
        status: "completed",
        progress: 100,
        modules: ["Statistika Deskriptif", "Advanced SQL", "Spreadsheet Pro"],
      },
      {
        phase: 2,
        title: "Pemrosesan Data",
        desc: "Python analytics & visualisasi",
        status: "in_progress",
        progress: 60,
        modules: ["Python & Pandas", "Data Cleaning", "Tableau Dashboard"],
      },
      {
        phase: 3,
        title: "Pemodelan Prediktif",
        desc: "Machine learning & insight",
        status: "ready",
        progress: 0,
        modules: ["Scikit-Learn ML", "A/B Testing", "Business Metrics"],
      },
      {
        phase: 4,
        title: "Kesiapan Industri",
        desc: "Studi kasus data nyata",
        status: "locked",
        progress: 0,
        modules: ["Executive Storytelling", "Portfolio Pipeline"],
      },
    ],
  },
  {
    id: "design",
    career: "UI/UX Designer",
    track: "Product Design & Design Systems",
    overallProgress: 75,
    phases: [
      {
        phase: 1,
        title: "Fondasi Desain",
        desc: "Prinsip visual & design thinking",
        status: "completed",
        progress: 100,
        modules: ["Design Principles", "Figma Auto-Layout", "Design Systems"],
      },
      {
        phase: 2,
        title: "Riset & Prototyping",
        desc: "Pengujian pengguna interaktif",
        status: "in_progress",
        progress: 80,
        modules: ["User Interview", "Interactive Prototype", "Usability Testing"],
      },
      {
        phase: 3,
        title: "Interaksi Lanjutan",
        desc: "Micro-motion & aksesibilitas",
        status: "ready",
        progress: 0,
        modules: ["Micro-interactions", "Design Token Handoff"],
      },
      {
        phase: 4,
        title: "Portofolio Produk",
        desc: "Verifikasi studi kasus nyata",
        status: "locked",
        progress: 0,
        modules: ["Case Study Showcase", "Design Critique"],
      },
    ],
  },
];

// Rekomendasi Kegiatan Data (Matching real /kegiatan opportunities feed)
const KEGIATAN_PRESETS = [
  {
    id: "k1",
    title: "Bangkit Academy 2026",
    type: "Studi Independen",
    typeColor: "bg-blue-50 text-blue-700 border-blue-200",
    match: 95,
    organizer: "Google, GoTo, Traveloka",
    tags: ["Cloud Computing", "AI/ML", "Konversi 20 SKS"],
    deadline: "Sisa 5 Hari",
  },
  {
    id: "k2",
    title: "Hackathon Inovasi Nasional",
    type: "Kompetisi",
    typeColor: "bg-amber-50 text-amber-700 border-amber-200",
    match: 92,
    organizer: "Kemenpora & BUMN",
    tags: ["Inovasi Digital", "Hadiah Rp50 Jt", "Tim 3 Orang"],
    deadline: "Pendaftaran Dibuka",
  },
  {
    id: "k3",
    title: "Tech Talent Internship",
    type: "Magang",
    typeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    match: 88,
    organizer: "Top Tech Unicorn",
    tags: ["Full-time Hybrid", "Mentoring 1-on-1", "Paid"],
    deadline: "Sisa 12 Hari",
  },
];

// Misi Soft Skill Data (Matching real /misi daily challenges)
const MISI_PRESETS = [
  {
    id: "m1",
    title: "Sampaikan Ide Tim Cross-Functional",
    competency: "Komunikasi",
    compColor: "text-blue-700 bg-blue-50 border-blue-200",
    xp: 150,
    time: "15 Mnt",
    status: "completed",
  },
  {
    id: "m2",
    title: "Negosiasi Prioritas Sprint Tim",
    competency: "Kolaborasi",
    compColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    xp: 200,
    time: "20 Mnt",
    status: "in_progress",
  },
  {
    id: "m3",
    title: "Evaluasi Risiko Rilis Aplikasi",
    competency: "Tanggung Jawab",
    compColor: "text-amber-700 bg-amber-50 border-amber-200",
    xp: 250,
    time: "30 Mnt",
    status: "locked",
  },
];

export default function BentoEcosystemTour() {
  const containerRef = useRef<HTMLDivElement>(null);

  // States
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

  // Auto-cycle Career Roadmap every 4.2 seconds
  useEffect(() => {
    if (prefersReducedMotion || !isInView || !isTabActive || isUserInteracting) return;

    const timer = setInterval(() => {
      setActiveCareerIdx((prev) => (prev + 1) % ROADMAP_PRESETS.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [isInView, isTabActive, isUserInteracting, prefersReducedMotion]);

  // Auto-cycle Kegiatan every 3.6 seconds
  useEffect(() => {
    if (prefersReducedMotion || !isInView || !isTabActive) return;

    const timer = setInterval(() => {
      setActiveKegiatanIdx((prev) => (prev + 1) % KEGIATAN_PRESETS.length);
    }, 3600);

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
      className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 relative select-none w-full"
    >
      {/* =========================================================================
          CARD 1: ROADMAP BELAJAR (Paling Kiri yang Paling Besar - lg:col-span-8)
      ========================================================================= */}
      <div className="lg:col-span-8 p-4 sm:p-5 bg-gray-50/90 border border-gray-200/90 rounded-2xl sm:rounded-3xl flex flex-col justify-between hover:border-brand-primary/40 transition-all duration-300 relative overflow-hidden group shadow-xs">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[70px] pointer-events-none" />

        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20 shadow-3xs">
                <GraduationCap className="w-4 h-4 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-tight text-gray-900 leading-tight">
                  Roadmap Belajar Terstruktur
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 leading-tight">
                  Kurikulum 4 fase progresif berbasis standar kesiapan industri.
                </p>
              </div>
            </div>

            {/* Live Interactive Tour Indicator */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-gray-200/90 shadow-3xs text-[10px] font-bold text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
              <span className="text-brand-primary font-black">Live Roadmap</span>
            </div>
          </div>

          {/* Interactive Career Selector Chips */}
          <div className="flex items-center gap-1.5 pt-1.5 pb-2.5 overflow-x-auto no-scrollbar">
            {ROADMAP_PRESETS.map((preset, idx) => {
              const isSelected = idx === activeCareerIdx;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectCareer(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? "bg-brand-primary text-white shadow-xs shadow-brand-primary/25 scale-[1.02]"
                      : "bg-white hover:bg-gray-100 border border-gray-200 text-gray-700"
                  }`}
                >
                  {isSelected && <Sparkles className="w-3 h-3 text-white" />}
                  <span>{preset.career}</span>
                  <span
                    className={`text-[9px] px-1 py-0.2 rounded font-black ${
                      isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {preset.overallProgress}%
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Career Track Banner with Progress Meter */}
          <div className="bg-white border border-gray-200/90 rounded-xl p-2.5 px-3 mb-3 shadow-3xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-primary px-2 py-0.5 rounded bg-brand-primary/10">
                Track
              </span>
              <span className="text-xs font-bold text-gray-800">
                {currentRoadmap.track}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-24 sm:w-28 h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200/60">
                <div
                  className="h-full bg-brand-primary rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${currentRoadmap.overallProgress}%` }}
                />
              </div>
              <span className="text-[11px] font-black text-brand-primary tabular-nums">
                {currentRoadmap.overallProgress}% Kesiapan
              </span>
            </div>
          </div>
        </div>

        {/* 4 Phases Interactive Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {currentRoadmap.phases.map((phase) => {
            const isCompleted = phase.status === "completed";
            const isInProgress = phase.status === "in_progress";
            const isReady = phase.status === "ready";

            return (
              <div
                key={phase.phase}
                className={`p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                  isInProgress
                    ? "bg-white border-brand-primary/50 shadow-xs ring-1 ring-brand-primary/20 scale-[1.01]"
                    : isCompleted
                    ? "bg-white/90 border-emerald-200 shadow-3xs"
                    : isReady
                    ? "bg-white/60 border-gray-200"
                    : "bg-gray-100/60 border-gray-200 opacity-60"
                }`}
              >
                {/* Active Phase Glowing Header Bar */}
                {isInProgress && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-primary/20 overflow-hidden">
                    <div className="h-full bg-brand-primary animate-[progressFill_3s_linear_infinite]" />
                  </div>
                )}

                <div>
                  {/* Phase Status Badge */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">
                      FASE 0{phase.phase}
                    </span>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Selesai
                      </span>
                    ) : isInProgress ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-brand-primary bg-brand-primary/10 px-1.5 py-0.5 rounded-full border border-brand-primary/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
                        Aktif
                      </span>
                    ) : isReady ? (
                      <span className="text-[9px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full border border-gray-200">
                        Berikutnya
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-gray-400">
                        <Lock className="w-2.5 h-2.5" /> Terkunci
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs font-black text-gray-900 leading-snug">
                    {phase.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 leading-tight mt-0.5 line-clamp-2">
                    {phase.desc}
                  </p>
                </div>

                {/* Modules Chips */}
                <div className="pt-2 mt-2 border-t border-gray-100/90 space-y-1">
                  {phase.modules.map((mod) => (
                    <div
                      key={mod}
                      className="text-[9.5px] font-medium text-gray-600 truncate flex items-center gap-1"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                      ) : isInProgress ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                      )}
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
          RIGHT COLUMN: Cards 2 & 3 (Stacked: Rekomendasi Kegiatan & Misi)
      ========================================================================= */}
      <div className="lg:col-span-4 flex flex-col gap-3.5 sm:gap-4">
        {/* =====================================================================
            CARD 2: REKOMENDASI KEGIATAN (Kanan Atas)
        ===================================================================== */}
        <div className="p-4 sm:p-4.5 bg-gray-50/90 border border-gray-200/90 rounded-2xl sm:rounded-3xl flex flex-col justify-between hover:border-brand-primary/40 transition-all duration-300 relative group flex-1 shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100/80 flex items-center justify-center text-blue-600 border border-blue-200 shadow-3xs">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black tracking-tight text-gray-900 leading-tight">
                    Rekomendasi Kegiatan
                  </h3>
                  <p className="text-[10px] text-gray-500 leading-tight">
                    Magang, kompetisi, & program terkurasi.
                  </p>
                </div>
              </div>

              {/* Match Badge */}
              <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                <Sparkles className="w-2.5 h-2.5" />
                {currentKegiatan.match}% Cocok
              </span>
            </div>

            {/* Active Featured Activity Card */}
            <div className="bg-white border border-gray-200/90 rounded-xl p-3 shadow-3xs mt-2 relative transition-all duration-300 hover:shadow-xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className={`inline-block text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-1 ${currentKegiatan.typeColor}`}
                  >
                    {currentKegiatan.type}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                    {currentKegiatan.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-medium">
                    {currentKegiatan.organizer}
                  </p>
                </div>

                {/* Interactive Bookmark Button */}
                <button
                  onClick={(e) => toggleBookmark(currentKegiatan.id, e)}
                  aria-label="Simpan Kegiatan"
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                    bookmarkedId === currentKegiatan.id
                      ? "bg-brand-primary text-white border-brand-primary shadow-3xs"
                      : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-400"
                  }`}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      bookmarkedId === currentKegiatan.id ? "fill-white" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Activity Tags */}
              <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-gray-100">
                {currentKegiatan.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-semibold px-2 py-0.5 bg-gray-50 border border-gray-200/80 rounded text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-[9px] font-bold text-amber-600 ml-auto flex items-center gap-0.5">
                  <Clock className="w-2.5 h-2.5" />
                  {currentKegiatan.deadline}
                </span>
              </div>
            </div>
          </div>

          {/* Activity Mini Indicator Tickers */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[10px] text-gray-400 font-semibold">
              Menampilkan {activeKegiatanIdx + 1} dari {KEGIATAN_PRESETS.length} kegiatan
            </span>
            <div className="flex items-center gap-1">
              {KEGIATAN_PRESETS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveKegiatanIdx(i)}
                  aria-label={`Lihat kegiatan ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === activeKegiatanIdx
                      ? "w-4 bg-brand-primary"
                      : "w-1.5 bg-gray-200 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================================
            CARD 3: MISI SOFT SKILL (Kanan Bawah)
        ===================================================================== */}
        <div className="p-4 sm:p-4.5 bg-gray-50/90 border border-gray-200/90 rounded-2xl sm:rounded-3xl flex flex-col justify-between hover:border-brand-primary/40 transition-all duration-300 relative group flex-1 shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-600 border border-emerald-200 shadow-3xs">
                  <Target className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black tracking-tight text-gray-900 leading-tight">
                    Misi Soft Skill
                  </h3>
                  <p className="text-[10px] text-gray-500 leading-tight">
                    Latihan situasional harian berhadiah XP.
                  </p>
                </div>
              </div>

              {/* Level XP Badge */}
              <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Zap className="w-2.5 h-2.5 text-emerald-600" />
                Level 3 • 450 XP
              </span>
            </div>

            {/* Missions List */}
            <div className="space-y-1.5 pt-1.5">
              {MISI_PRESETS.map((misi) => {
                const isCompleted = misi.status === "completed";
                const isInProgress = misi.status === "in_progress";

                return (
                  <div
                    key={misi.id}
                    className={`flex items-center justify-between gap-2 p-2 px-2.5 rounded-xl border transition-all duration-300 ${
                      isInProgress
                        ? "bg-white border-brand-primary/40 shadow-3xs ring-1 ring-brand-primary/20"
                        : isCompleted
                        ? "bg-white/90 border-emerald-200"
                        : "bg-gray-100/50 border-gray-200 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          isCompleted
                            ? "bg-emerald-100 text-emerald-600"
                            : isInProgress
                            ? "bg-brand-primary/10 text-brand-primary"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : isInProgress ? (
                          <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
                        ) : (
                          <Lock className="w-3 h-3" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-gray-900 truncate leading-tight">
                          {misi.title}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className={`text-[8.5px] font-bold px-1.5 py-0.2 rounded border ${misi.compColor}`}
                          >
                            {misi.competency}
                          </span>
                          <span className="text-[9px] text-gray-400">
                            {misi.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-black shrink-0 px-1.5 py-0.5 rounded ${
                        isCompleted
                          ? "bg-emerald-50 text-emerald-700"
                          : isInProgress
                          ? "bg-brand-primary/10 text-brand-primary"
                          : "text-gray-400"
                      }`}
                    >
                      +{misi.xp} XP
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Mission Progress Bar */}
          <div className="pt-2 mt-1">
            <div className="flex items-center justify-between text-[10px] text-gray-500 font-semibold mb-1">
              <span>Progres Misi Harian</span>
              <span className="font-bold text-emerald-600">2 / 3 Selesai (67%)</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200/60">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: "67%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Inline styles for animated progress shimmer */}
      <style jsx>{`
        @keyframes progressFill {
          0% {
            width: 0%;
            opacity: 0.4;
          }
          50% {
            width: 70%;
            opacity: 1;
          }
          100% {
            width: 100%;
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
