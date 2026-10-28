'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Brain,
  ArrowRight,
  Zap,
  ChevronDown,
  Sparkles,
  Info,
} from 'lucide-react';
import { COMPETENCIES, CompetencyItem } from '../types';

interface SoftSkillCompetenciesProps {
  competencies?: CompetencyItem[];
  hasVerifiedSjt?: boolean;
}

export function SoftSkillCompetencies({
  competencies = COMPETENCIES,
  hasVerifiedSjt = false,
}: SoftSkillCompetenciesProps) {
  const [expandedFeedbackId, setExpandedFeedbackId] = useState<string | null>(null);

  // Hitung jumlah dimensi per tingkat kemahiran
  const counts = useMemo(() => {
    let unggul = 0;
    let standar = 0;
    let perluAsah = 0;

    competencies.forEach((c) => {
      const score = c.base;
      if (score >= 80) unggul++;
      else if (score >= 50) standar++;
      else perluAsah++;
    });

    return { unggul, standar, perluAsah };
  }, [competencies]);

  // Pisahkan ke dalam 2 kolom independen untuk layout desktop (masonry)
  // Ini mencegah kartu di sebelah kanan tertarik melar saat kartu di sebelah kiri membuka dropdown
  const { leftCol, rightCol } = useMemo(() => {
    const left: CompetencyItem[] = [];
    const right: CompetencyItem[] = [];
    competencies.forEach((c, idx) => {
      if (idx % 2 === 0) left.push(c);
      else right.push(c);
    });
    return { leftCol: left, rightCol: right };
  }, [competencies]);

  const toggleFeedback = (id: string) => {
    setExpandedFeedbackId((prev) => (prev === id ? null : id));
  };

  const renderCard = (comp: CompetencyItem) => {
    const score = comp.base;
    const isLevel3 = score >= 80;
    const isLevel2 = score >= 50 && score < 80;

    // Style per level
    let badgeText = 'Perlu Asah';
    let badgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
    let barGradient = 'from-amber-400 to-amber-500';
    let scoreColor = 'text-amber-600';

    if (isLevel3) {
      badgeText = 'Unggul';
      badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      barGradient = 'from-emerald-500 via-teal-500 to-cyan-500';
      scoreColor = 'text-emerald-700';
    } else if (isLevel2) {
      badgeText = 'Standar Industri';
      badgeClass = 'bg-blue-50 text-blue-700 border-blue-200';
      barGradient = 'from-blue-500 to-indigo-600';
      scoreColor = 'text-blue-700';
    }

    const hasFeedback = comp.feedbackList && comp.feedbackList.length > 0;
    const isExpanded = expandedFeedbackId === comp.id;

    return (
      <div
        key={comp.id}
        className={`rounded-2xl p-4 transition-all duration-200 border ${
          isExpanded
            ? 'bg-white border-blue-300 shadow-xs ring-1 ring-blue-500/10'
            : 'bg-slate-50/70 hover:bg-slate-50 border-slate-200/70'
        }`}
      >
        {/* Top: Icon + Name + Badge + Score */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-base shrink-0 shadow-2xs">
              {comp.icon || '🎯'}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                {comp.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-md border ${badgeClass}`}>
                  {badgeText}
                </span>
                {comp.shortLabel && (
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    • {comp.shortLabel}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className={`text-base sm:text-lg font-extrabold ${scoreColor}`}>
              {score}%
            </span>
          </div>
        </div>

        {/* Deskripsi ringkas */}
        <p className="text-[11px] text-slate-500 leading-relaxed mb-2.5 line-clamp-2">
          {comp.desc}
        </p>

        {/* Progress Bar yang menyatu langsung di bawah deskripsi */}
        <div className="w-full h-2 bg-slate-200/70 rounded-full overflow-hidden">
          <div
            className={`h-full bg-linear-to-r ${barGradient} rounded-full transition-all duration-700`}
            style={{ width: `${Math.min(100, Math.max(5, score))}%` }}
          />
        </div>

        {/* Coaching Feedback Toggle jika ada saran perbaikan */}
        {hasFeedback && (
          <div className="mt-3 pt-2.5 border-t border-slate-200/60">
            <button
              type="button"
              onClick={() => toggleFeedback(comp.id)}
              className="w-full flex items-center justify-between text-[11px] font-semibold text-slate-600 hover:text-blue-600 cursor-pointer transition-colors"
            >
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-blue-500" />
                <span>Rekomendasi Coaching ({comp.feedbackList!.length})</span>
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180 text-blue-600' : ''
                }`}
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out overflow-hidden ${
                isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="mt-2.5 space-y-1.5 p-3 rounded-xl bg-white border border-blue-100 text-[11px] text-slate-600 shadow-2xs">
                  {comp.feedbackList!.map((fb, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-blue-500 font-bold shrink-0 mt-0.5">•</span>
                      <span className="leading-snug">{fb}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -left-12 -top-12 w-48 h-48 bg-linear-to-br from-indigo-100/40 to-blue-100/20 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Brain className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              8 Dimensi Soft Skill Kesiapan Karir
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Diukur melalui Situational Judgement Test (SJT) 40 skenario terstandar industri & standar O*NET.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {hasVerifiedSjt ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Terverifikasi Asesmen SJT</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Estimasi Standar</span>
            </span>
          )}
        </div>
      </div>

      {/* Banner Ajakan Asesmen jika belum verifikasi SJT */}
      {!hasVerifiedSjt && (
        <div className="mb-6 p-4 rounded-2xl bg-linear-to-r from-blue-50/90 via-indigo-50/60 to-slate-50 border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs relative z-10">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                Tingkatkan Kredibilitas Paspor Karir Kamu
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Nilai di bawah masih berupa estimasi. Selesaikan 40 skenario asesmen SJT agar 8 dimensi soft skill terverifikasi resmi oleh Gapless.
              </p>
            </div>
          </div>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shrink-0 shadow-xs transition-colors cursor-pointer"
          >
            <span>Mulai Asesmen SJT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Kemahiran Summary Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-5 text-xs relative z-10">
        <span className="text-slate-400 font-medium text-[11px] uppercase tracking-wider mr-1">
          Distribusi:
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-semibold text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          {counts.unggul} Siap Kerja Unggul (≥80%)
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/80 font-semibold text-[11px]">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          {counts.standar} Standar Industri (50–79%)
        </span>
        {counts.perluAsah > 0 && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/80 font-semibold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            {counts.perluAsah} Perlu Asah (&lt;50%)
          </span>
        )}
      </div>

      {/* Layout Kartu: Mobile 1 Kolom Berurutan */}
      <div className="space-y-3.5 md:hidden relative z-10">
        {competencies.map((comp) => renderCard(comp))}
      </div>

      {/* Layout Kartu: Desktop 2 Kolom Independen (Masonry) */}
      {/* Menggunakan 2 kolom terpisah agar saat kartu kiri di-expand, kartu kanan TIDAK ikut melar aneh */}
      <div className="hidden md:grid md:grid-cols-2 gap-3.5 items-start relative z-10">
        <div className="space-y-3.5 flex flex-col">
          {leftCol.map((comp) => renderCard(comp))}
        </div>
        <div className="space-y-3.5 flex flex-col">
          {rightCol.map((comp) => renderCard(comp))}
        </div>
      </div>
    </div>
  );
}
