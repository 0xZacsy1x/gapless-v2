"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Award,
  Layers,
  Activity,
} from "lucide-react";
import {
  CAREER_ROLES_DATA,
  DEMO_QUESTIONS,
  type CareerRoleData,
} from "@/constants/assessmentDemoData";

type PreviewTab = "readiness" | "sjt" | "roadmap";

export default function AssessmentDemo() {
  const [activeRole, setActiveRole] = useState<string>("Software Engineer");
  const [activeTab, setActiveTab] = useState<PreviewTab>("readiness");
  const [selectedChoiceId, setSelectedChoiceId] = useState<string>("B");

  const roleData: CareerRoleData =
    CAREER_ROLES_DATA[activeRole] || CAREER_ROLES_DATA["Software Engineer"];
  const currentQ = DEMO_QUESTIONS[0]; // Interactive SJT Question

  // Detailed rationale for interactive SJT demo choices
  const choiceFeedbacks: Record<string, { label: string; note: string; tone: "positive" | "warning" | "neutral" }> = {
    A: {
      label: "Analitis & Sistemik (+30 XP)",
      note: "Fokus pada akar arsitektur dan modularitas kode sebelum menulis baris pertama.",
      tone: "positive",
    },
    B: {
      label: "Pengalaman Pengguna & Interaksi (+45 XP)",
      note: "Memastikan usability flow dan kepuasan pengguna akhir menjadi kompas utama produk.",
      tone: "positive",
    },
    C: {
      label: "Kepemimpinan Kolaboratif (+40 XP)",
      note: "Menyelaraskan komunikasi lintas divisi dan ekspektasi pemangku kepentingan.",
      tone: "positive",
    },
  };

  const activeFeedback = choiceFeedbacks[selectedChoiceId] || choiceFeedbacks["B"];

  return (
    <div className="w-full max-w-[540px] bg-white rounded-2xl border border-zinc-200/90 shadow-sm overflow-hidden flex flex-col font-sans transition-all">
      {/* Top Application Header Bar */}
      <div className="px-4 py-3 bg-zinc-50/80 border-b border-zinc-200/80 flex items-center justify-between gap-3">
        {/* Terminal / System Dots */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 inline-block" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold pl-1">
            Preview Interaktif
          </span>
        </div>

        {/* Live Indicator */}
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] font-mono font-bold text-emerald-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          <span>DATA AKTIF</span>
        </div>
      </div>

      {/* Role Switcher Tabs */}
      <div className="px-3.5 pt-3 pb-2 bg-white border-b border-zinc-100 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-medium text-zinc-400 shrink-0 uppercase tracking-wider font-mono">
          Pilih Peran:
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          {["Software Engineer", "Data Analyst", "UI/UX Designer"].map((role) => {
            const isSelected = activeRole === role;
            return (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all btn-press cursor-pointer ${
                  isSelected
                    ? "bg-zinc-900 text-white shadow-xs"
                    : "bg-zinc-100/80 text-zinc-600 hover:bg-zinc-200/70"
                }`}
              >
                {role}
              </button>
            );
          })}
        </div>
      </div>

      {/* View Switcher Pills */}
      <div className="grid grid-cols-3 p-1.5 mx-3.5 mt-3 bg-zinc-100/80 rounded-xl gap-1 text-xs font-medium text-zinc-600">
        <button
          onClick={() => setActiveTab("readiness")}
          className={`py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "readiness"
              ? "bg-white text-zinc-900 font-bold shadow-xs"
              : "hover:text-zinc-900"
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-blue-600" />
          <span className="truncate">Skill Gap</span>
        </button>
        <button
          onClick={() => setActiveTab("sjt")}
          className={`py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "sjt"
              ? "bg-white text-zinc-900 font-bold shadow-xs"
              : "hover:text-zinc-900"
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
          <span className="truncate">Simulasi SJT</span>
        </button>
        <button
          onClick={() => setActiveTab("roadmap")}
          className={`py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "roadmap"
              ? "bg-white text-zinc-900 font-bold shadow-xs"
              : "hover:text-zinc-900"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-emerald-600" />
          <span className="truncate">4 Fase</span>
        </button>
      </div>

      {/* Interactive Main Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between min-h-[340px]">
        {/* TAB 1: SKILL GAP & READINESS */}
        {activeTab === "readiness" && (
          <div className="space-y-4">
            {/* Top Metric Header */}
            <div className="p-3.5 rounded-xl bg-zinc-50/90 border border-zinc-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block">
                  Estimasi Kesiapan Industri
                </span>
                <div className="text-base font-bold text-zinc-900 mt-0.5">
                  {roleData.role}
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-zinc-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>3 Kompetensi Kunci Terpantau</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-zinc-900 font-mono tracking-tight tabular-nums">
                  {roleData.readinessScore}%
                </span>
                <span className="block text-[10px] font-mono text-blue-600 font-semibold">
                  STATUS: {roleData.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* 3-Tier Visual Skill Comparison Diagram */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                <span>SKILL &amp; LEVEL KAMU</span>
                <span>TARGET INDUSTRI</span>
              </div>

              {roleData.skills.map((skill) => {
                const isMet = skill.userLevel >= skill.requiredLevel;
                return (
                  <div
                    key={skill.name}
                    className="p-2.5 rounded-xl border border-zinc-200/70 bg-white space-y-1.5 hover:border-zinc-300 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-zinc-900 truncate">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-2 font-mono text-[11px] tabular-nums">
                        <span className={isMet ? "text-emerald-700 font-bold" : "text-amber-700 font-bold"}>
                          {skill.userLevel}%
                        </span>
                        <span className="text-zinc-300">/</span>
                        <span className="text-zinc-500">{skill.requiredLevel}% target</span>
                      </div>
                    </div>

                    {/* Progress Bar with Target Marker */}
                    <div className="relative w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                      {/* User Level Fill */}
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isMet ? "bg-emerald-600" : "bg-amber-500"
                        }`}
                        style={{ width: `${skill.userLevel}%` }}
                      />
                      {/* Target Indicator Line */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-zinc-900 z-10"
                        style={{ left: `${skill.requiredLevel}%` }}
                        title={`Target: ${skill.requiredLevel}%`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Priority Gap Notice */}
            <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/80 flex items-start gap-2 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong className="font-bold">Prioritas Belajar:</strong> {roleData.gapNote}
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: SITUATIONAL JUDGEMENT TEST (SJT) */}
        {activeTab === "sjt" && (
          <div className="space-y-3.5">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                <span>SIMULASI KASUS SITUASIONAL</span>
                <span className="font-bold text-indigo-600 font-mono">03 DARI 15 KASUS</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug">
                {currentQ.questionText}
              </h4>
            </div>

            {/* Choices */}
            <div className="space-y-2">
              {currentQ.choices.map((choice) => {
                const isSelected = selectedChoiceId === choice.id;
                return (
                  <button
                    key={choice.id}
                    onClick={() => setSelectedChoiceId(choice.id)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer btn-press ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600/20"
                        : "border-zinc-200/80 bg-white hover:bg-zinc-50"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {choice.id}
                    </span>
                    <span className="text-zinc-800 leading-snug pt-0.5">
                      {choice.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Instant Behavioral Feedback */}
            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/90 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-zinc-900 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>POLA PERILAKU: {activeFeedback.label}</span>
              </div>
              <p className="text-zinc-600 text-[11px] leading-relaxed">
                {activeFeedback.note}
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: 4-PHASE ROADMAP */}
        {activeTab === "roadmap" && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                STRUKTUR KURIKULUM 4 FASE
              </span>
              <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                STANDAR INDUSTRI
              </span>
            </div>

            {/* Phase Stepper */}
            <div className="space-y-2">
              {[
                { phase: 1, title: "Fondasi Sistem", desc: "Algoritma & Struktur Data", status: "completed" },
                { phase: 2, title: "Praktik Industri & API", desc: "Framework Modern & Database", status: "active" },
                { phase: 3, title: "Spesialisasi Cloud", desc: "Docker & CI/CD Pipeline", status: "ready" },
                { phase: 4, title: "Kesiapan Kerja", desc: "Capstone Project & Mock Tech Interview", status: "locked" },
              ].map((item) => (
                <div
                  key={item.phase}
                  className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                    item.status === "active"
                      ? "border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-600/20"
                      : item.status === "completed"
                      ? "border-emerald-200 bg-emerald-50/30"
                      : "border-zinc-200/80 bg-zinc-50/60 opacity-75"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                        item.status === "active"
                          ? "bg-blue-600 text-white"
                          : item.status === "completed"
                          ? "bg-emerald-600 text-white"
                          : "bg-zinc-200 text-zinc-600"
                      }`}
                    >
                      0{item.phase}
                    </span>
                    <div className="truncate">
                      <div className="font-bold text-zinc-900 leading-tight truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-zinc-500 truncate mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                      item.status === "active"
                        ? "bg-blue-100 text-blue-800"
                        : item.status === "completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {item.status === "active"
                      ? "SEDANG AKTIF"
                      : item.status === "completed"
                      ? "SELESAI"
                      : "TERKUNCI"}
                  </span>
                </div>
              ))}
            </div>

            {/* Note */}
            <p className="text-[11px] text-zinc-500 leading-relaxed font-sans pt-1">
              Setiap modul dilengkapi latihan kode interaktif, mini-proyek nyata, dan evaluasi berkala.
            </p>
          </div>
        )}

        {/* Card Footer: Conversion Callout */}
        <div className="pt-3.5 mt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
          <div className="text-[11px] text-zinc-500">
            Data berbasis <span className="font-semibold text-zinc-800">702+ lowongan industri</span>
          </div>
          <Link
            href="/assessment?quizType=belum_tahu_minat"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors cursor-pointer group"
          >
            <span>Mulai Asesmen</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
