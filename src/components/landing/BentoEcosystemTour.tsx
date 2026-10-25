"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Calendar,
  Target,
  CheckCircle2,
  Lock,
  Bookmark,
  Zap,
  Clock,
  Award,
  BookOpen,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Building,
} from "lucide-react";

// Career Roadmaps Data
const ROADMAP_PRESETS = [
  {
    id: "swe",
    career: "Software Engineer",
    track: "Full-Stack & Cloud Architecture",
    overallProgress: 68,
    activeModule: {
      phase: "Fase 02 — Modul Aktif",
      name: "Framework Modern & Arsitektur API",
      desc: "Membangun sistem modular berbasis Next.js 15, state architecture, dan integrasi backend.",
      skills: ["React 19 & Next.js", "REST & GraphQL", "State Architecture"],
      project: "Studi Kasus: Sistem Finansial & Checkout Skala Nyata",
      pace: "3 Minggu • 15 Jam Belajar",
    },
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
        desc: "Framework modern & API sistem",
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
    activeModule: {
      phase: "Fase 02 — Modul Aktif",
      name: "Pemrosesan Data & Exploratory Analysis",
      desc: "Mengekstraksi wawasan bisnis kuantitatif, data cleaning tingkat lanjut, dan visualisasi interaktif.",
      skills: ["Python & Pandas", "Data Wrangling", "Tableau Dashboard"],
      project: "Studi Kasus: Prediksi Churn Pelanggan & Analisis LTV",
      pace: "3 Minggu • 14 Jam Belajar",
    },
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
    activeModule: {
      phase: "Fase 02 — Modul Aktif",
      name: "Riset Pengguna & Interactive Prototyping",
      desc: "Menyusun wireframing resolusi tinggi, pengujian usability terarah, dan design systems multi-platform.",
      skills: ["User Flow Mapping", "Figma Auto-Layout", "Usability Testing"],
      project: "Studi Kasus: Redesain End-to-End Onboarding FinTech",
      pace: "2.5 Minggu • 12 Jam Belajar",
    },
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

// Misi Soft Skill Data
const MISI_PRESETS = [
  {
    id: "m1",
    title: "Sampaikan Ide Tim Cross-Functional",
    competency: "Komunikasi",
    xp: 150,
    time: "15 Mnt",
    status: "completed",
  },
  {
    id: "m2",
    title: "Negosiasi Prioritas Sprint Tim",
    competency: "Kolaborasi",
    xp: 200,
    time: "20 Mnt",
    status: "in_progress",
  },
  {
    id: "m3",
    title: "Evaluasi Risiko Rilis Aplikasi",
    competency: "Tanggung Jawab",
    xp: 250,
    time: "30 Mnt",
    status: "locked",
  },
];

export default function BentoEcosystemTour() {
  const [activeCareerIdx, setActiveCareerIdx] = useState<number>(0);
  const [activeKegiatanIdx, setActiveKegiatanIdx] = useState<number>(0);
  const [bookmarkedId, setBookmarkedId] = useState<string>("k1");
  const [sjtOptionChosen, setSjtOptionChosen] = useState<string | null>("A");

  const currentRoadmap = ROADMAP_PRESETS[activeCareerIdx];
  const currentKegiatan = KEGIATAN_PRESETS[activeKegiatanIdx];

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedId((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 select-none w-full items-stretch">
      {/* =========================================================================
          CARD 1: ROADMAP BELAJAR TERSTRUKTUR (lg:col-span-8 - Architectural Card)
      ========================================================================= */}
      <div className="lg:col-span-8 p-5 sm:p-6 bg-white border border-zinc-200/90 rounded-2xl flex flex-col justify-between shadow-xs space-y-4">
        {/* Top Header */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 border border-zinc-200">
                <GraduationCap className="w-4 h-4 text-blue-700" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-950 leading-tight">
                  Roadmap Belajar Terstruktur
                </h3>
                <p className="text-xs text-zinc-500">
                  Kurikulum 4 fase progresif terkalibrasi dengan standar lowongan industri.
                </p>
              </div>
            </div>

            {/* Interactive Career Selector Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {ROADMAP_PRESETS.map((preset, idx) => {
                const isSelected = idx === activeCareerIdx;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setActiveCareerIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer btn-press flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? "bg-zinc-900 text-white shadow-xs"
                        : "bg-zinc-100 hover:bg-zinc-200/70 text-zinc-700"
                    }`}
                  >
                    <span>{preset.career}</span>
                    <span
                      className={`text-[10px] font-mono px-1 py-0.2 rounded ${
                        isSelected ? "bg-white/20 text-white" : "bg-zinc-200 text-zinc-600"
                      }`}
                    >
                      {preset.overallProgress}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Career Track Banner */}
          <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                TRACK
              </span>
              <span className="text-xs font-semibold text-zinc-800">
                {currentRoadmap.track}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-24 sm:w-32 h-2 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-700 rounded-full transition-all duration-500"
                  style={{ width: `${currentRoadmap.overallProgress}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-zinc-900 tabular-nums">
                {currentRoadmap.overallProgress}% Kesiapan
              </span>
            </div>
          </div>
        </div>

        {/* Active Module Box */}
        <div className="bg-white border border-zinc-200/90 rounded-xl p-4 shadow-3xs space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 text-[10px] font-mono font-bold uppercase">
                <BookOpen className="w-3 h-3 text-blue-700" />
                {currentRoadmap.activeModule.phase}
              </span>
              <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                TARGET AKTIF
              </span>
            </div>
            <span className="text-[11px] text-zinc-500 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-400" />
              {currentRoadmap.activeModule.pace}
            </span>
          </div>

          <h4 className="text-sm font-bold text-zinc-950 leading-snug">
            {currentRoadmap.activeModule.name}
          </h4>
          <p className="text-xs text-zinc-600 leading-relaxed">
            {currentRoadmap.activeModule.desc}
          </p>

          {/* Skill Keys & Project Capstone */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-100">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                Skill Kunci:
              </span>
              {currentRoadmap.activeModule.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] font-medium px-2 py-0.5 rounded bg-zinc-50 border border-zinc-200 text-zinc-700"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs text-zinc-700 font-medium">
              <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate max-w-[280px]">
                {currentRoadmap.activeModule.project}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Phases Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {currentRoadmap.phases.map((phase) => {
            const isCompleted = phase.status === "completed";
            const isInProgress = phase.status === "in_progress";
            const isReady = phase.status === "ready";

            return (
              <div
                key={phase.phase}
                className={`p-3 rounded-xl border flex flex-col justify-between min-h-[130px] ${
                  isInProgress
                    ? "bg-white border-blue-600/60 shadow-xs ring-1 ring-blue-600/10"
                    : isCompleted
                    ? "bg-emerald-50/20 border-emerald-200/90"
                    : isReady
                    ? "bg-zinc-50/60 border-zinc-200"
                    : "bg-zinc-100/40 border-zinc-200 opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                      FASE 0{phase.phase}
                    </span>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Selesai
                      </span>
                    ) : isInProgress ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                        Aktif
                      </span>
                    ) : isReady ? (
                      <span className="text-[9px] font-mono font-medium text-zinc-500 bg-zinc-100 px-1.5 py-0.2 rounded border border-zinc-200">
                        Siap
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono text-zinc-400">
                        <Lock className="w-2.5 h-2.5" /> Kunci
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-zinc-950 leading-snug">
                    {phase.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 leading-tight mt-0.5 line-clamp-1">
                    {phase.desc}
                  </p>
                </div>

                {/* Modules list */}
                <div className="pt-2 mt-2 border-t border-zinc-100 space-y-1">
                  {phase.modules.map((mod) => (
                    <div
                      key={mod}
                      className="text-[10px] font-medium text-zinc-600 truncate flex items-center gap-1.5"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          isCompleted
                            ? "bg-emerald-600"
                            : isInProgress
                            ? "bg-blue-600"
                            : "bg-zinc-300"
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
          CARD 2: MISI SOFT SKILL & SJT (lg:col-span-4 - Interactive Simulation)
      ========================================================================= */}
      <div className="lg:col-span-4 p-5 sm:p-6 bg-white border border-zinc-200/90 rounded-2xl flex flex-col justify-between shadow-xs space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900 border border-zinc-200">
                <Target className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-950 leading-tight">
                  Misi Soft Skill
                </h3>
                <p className="text-xs text-zinc-500">
                  Latihan situasional harian berhadiah XP.
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <Zap className="w-3 h-3 text-emerald-600" />
              LEVEL 3 • 450 XP
            </span>
          </div>

          {/* Interactive Dilemma Choice Demo */}
          <div className="mt-3 p-3 rounded-xl bg-zinc-50/80 border border-zinc-200/80 space-y-2">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              SKENARIO HARI INI:
            </div>
            <p className="text-xs font-semibold text-zinc-900 leading-snug">
              &quot;Sprint deadline mendadak maju 3 hari sementara ada bug kritis di staging. Apa langkah utamamu?&quot;
            </p>

            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => setSjtOptionChosen("A")}
                className={`w-full text-left p-2 rounded-lg text-[11px] font-medium border transition-all cursor-pointer btn-press ${
                  sjtOptionChosen === "A"
                    ? "bg-blue-50 border-blue-600 text-blue-900 font-semibold"
                    : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                [A] Isolasi bug &amp; komunikasikan trade-off scope fitur ke tim.
              </button>
              <button
                onClick={() => setSjtOptionChosen("B")}
                className={`w-full text-left p-2 rounded-lg text-[11px] font-medium border transition-all cursor-pointer btn-press ${
                  sjtOptionChosen === "B"
                    ? "bg-blue-50 border-blue-600 text-blue-900 font-semibold"
                    : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                [B] Deploy hotfix cepat tanpa pengujian menyeluruh.
              </button>
            </div>

            {sjtOptionChosen && (
              <div className="text-[10px] font-mono pt-1 text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>
                  {sjtOptionChosen === "A"
                    ? "+50 XP Adaptabilitas & Manajemen Risiko"
                    : "Evaluasi: Risiko regresi sistem meningkat"}
                </span>
              </div>
            )}
          </div>

          {/* Missions Checklist */}
          <div className="space-y-2 pt-3">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              DAFTAR MISI TERSEDIA:
            </div>
            {MISI_PRESETS.map((misi) => {
              const isCompleted = misi.status === "completed";
              const isInProgress = misi.status === "in_progress";

              return (
                <div
                  key={misi.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs ${
                    isInProgress
                      ? "bg-white border-blue-600/40 shadow-3xs"
                      : isCompleted
                      ? "bg-emerald-50/20 border-emerald-200/80"
                      : "bg-zinc-50/60 border-zinc-200 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-700"
                          : isInProgress
                          ? "bg-blue-100 text-blue-700"
                          : "bg-zinc-200 text-zinc-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      )}
                    </span>
                    <div className="truncate">
                      <div className="font-semibold text-zinc-900 truncate">
                        {misi.title}
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        {misi.competency} • {misi.time}
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] font-bold text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded shrink-0">
                    +{misi.xp} XP
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Progress Meter */}
        <div className="pt-2 border-t border-zinc-100">
          <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1.5 font-mono">
            <span>PROGRES MISI HARIAN</span>
            <span className="font-bold text-emerald-700">2 / 3 Selesai (67%)</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full"
              style={{ width: "67%" }}
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          CARD 3: VALIDASI RISET & 702+ LOWONGAN (lg:col-span-4 - Data Verification)
      ========================================================================= */}
      <div className="lg:col-span-4 p-5 sm:p-6 bg-white border border-zinc-200/90 rounded-2xl flex flex-col justify-between shadow-xs space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
              STANDAR VALIDASI EMPIRIS
            </span>
            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              HOLLAND CODES
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-zinc-950 font-mono tracking-tight tabular-nums">
              702+
            </div>
            <h4 className="text-sm font-bold text-zinc-900 leading-snug">
              Lowongan Industri Dianalisis
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed mt-1">
              Setiap modul roadmap diselaraskan dengan kebutuhan kompetensi nyata pada lowongan kerja perusahaan teknologi terkemuka di Indonesia.
            </p>
          </div>

          {/* Holland Codes RIASEC mini vector breakdown */}
          <div className="mt-4 space-y-2">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              6 ORIENTASI MINAT RIASEC:
            </div>
            {[
              { code: "R", name: "Realistic", val: 82 },
              { code: "I", name: "Investigative", val: 94 },
              { code: "A", name: "Artistic", val: 68 },
              { code: "S", name: "Social", val: 75 },
              { code: "E", name: "Enterprising", val: 86 },
              { code: "C", name: "Conventional", val: 80 },
            ].map((r) => (
              <div key={r.code} className="flex items-center justify-between gap-3 text-xs">
                <span className="font-mono text-zinc-600 font-semibold w-28 truncate">
                  {r.code} · {r.name}
                </span>
                <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-zinc-800 rounded-full"
                    style={{ width: `${r.val}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-zinc-500 tabular-nums w-8 text-right">
                  {r.val}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Micro note */}
        <div className="pt-2 border-t border-zinc-100 text-[11px] text-zinc-500 font-medium">
          Divalidasi dengan model psikometri psikologi okupasional John Holland.
        </div>
      </div>

      {/* =========================================================================
          CARD 4: HIGH-CONTRAST DARK SHOWCASE (lg:col-span-8 - Virtual Simulations)
      ========================================================================= */}
      <div className="lg:col-span-8 p-5 sm:p-6 bg-zinc-950 text-white border border-zinc-800 rounded-2xl flex flex-col justify-between shadow-md space-y-4">
        <div>
          {/* Header Eyebrow */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
              SIMULASI KERJA VIRTUAL &amp; VERIFIKASI INDUSTRI
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
              PORTOFOLIO TERVERIFIKASI
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
            Bangun Portofolio Teruji Sebelum Melamar Kerja
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-1 max-w-2xl">
            Selesaikan studi kasus kerja riil dari skenario industri terkemuka. Hasil kerjamu dievaluasi dengan rubrik standar perekrut profesional.
          </p>

          {/* 2-Column Split: Featured Activity + Work Simulation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {/* Left: Featured Curated Activity */}
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
                  <span>KEGIATAN TERKURASI</span>
                  <span className="text-blue-400 font-bold">{currentKegiatan.match}% Cocok</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  {currentKegiatan.title}
                </h4>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  {currentKegiatan.organizer}
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {currentKegiatan.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] px-1.5 py-0.5 bg-zinc-800 border border-zinc-700/60 rounded text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-[10px]">
                <span className="text-amber-400 font-mono font-semibold">
                  {currentKegiatan.deadline}
                </span>
                <button
                  onClick={(e) => toggleBookmark(currentKegiatan.id, e)}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-mono text-[10px]"
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

            {/* Right: Simulation Partner Showcase */}
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
                  <span>STUDI KASUS SPESIALISASI</span>
                  <span className="text-emerald-400 font-bold">100% RELEVAN</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  Simulasi Penanganan Insiden Finansial
                </h4>
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                  Menyelesaikan simulasi arsitektur sistem checkout skala tinggi &amp; analisis trade-off performa.
                </p>
                <div className="text-[10px] font-mono text-zinc-500 mt-2">
                  Luaran: Dokumen RFC + Script Pengujian Stres
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-400">
                  Model Sertifikasi Mandiri
                </span>
                <Link
                  href="/assessment"
                  className="btn-press inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer group"
                >
                  <span>Mulai Simulasi</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar inside Dark Card */}
        <div className="pt-3 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Terbuka untuk semua mahasiswa dengan akun terdaftar</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            {KEGIATAN_PRESETS.map((k, i) => (
              <button
                key={k.id}
                onClick={() => setActiveKegiatanIdx(i)}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                  i === activeKegiatanIdx
                    ? "bg-zinc-800 text-white font-bold"
                    : "text-zinc-500 hover:text-zinc-300"
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
