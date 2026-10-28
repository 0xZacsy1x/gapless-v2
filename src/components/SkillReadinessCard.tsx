'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  Target, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ArrowUpRight, 
  HelpCircle,
  RotateCcw,
  Layers,
  Award,
  Download,
  Lock,
  ArrowRight,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { CareerProfile } from '@/data/gaplessData';
import { computeSkillReadiness } from '@/lib/skillReadiness';
import { getSimulationForCareer } from '@/data/industrySimulations';
import { downloadBlobFile } from '@/lib/download-helper';

interface SkillReadinessCardProps {
  career: CareerProfile;
  skillRatings: Record<string, number>;
  completedModulesCount: number;
  totalModulesCount: number;
  assessmentId?: string;
  isPurchased?: boolean;
  onDownloadPdf?: () => void;
  onUnlockClick?: () => void;
}

export function SkillReadinessCard({
  career,
  skillRatings,
  completedModulesCount,
  totalModulesCount,
  assessmentId,
  isPurchased = true,
  onDownloadPdf,
  onUnlockClick,
}: SkillReadinessCardProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [isExplanationModalRendered, setIsExplanationModalRendered] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const explanationBackdropRef = useRef<HTMLDivElement>(null);
  const explanationModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showExplanationModal) {
      setIsExplanationModalRendered(true);
    } else if (isExplanationModalRendered && explanationBackdropRef.current && explanationModalRef.current) {
      gsap.killTweensOf([explanationBackdropRef.current, explanationModalRef.current]);
      gsap.to(explanationBackdropRef.current, {
        opacity: 0,
        duration: 0.16,
        ease: 'power2.in',
      });
      gsap.to(explanationModalRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.16,
        ease: 'power2.in',
        onComplete: () => setIsExplanationModalRendered(false),
      });
    }
  }, [showExplanationModal]);

  useGSAP(() => {
    if (isExplanationModalRendered && showExplanationModal && explanationBackdropRef.current && explanationModalRef.current) {
      gsap.killTweensOf([explanationBackdropRef.current, explanationModalRef.current]);
      gsap.fromTo(
        explanationBackdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: 'power2.out' }
      );
      gsap.fromTo(
        explanationModalRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.2, ease: 'back.out(1.4)' }
      );
    }
  }, [isExplanationModalRendered, showExplanationModal]);

  const simulation = getSimulationForCareer(career.title, career.id);

  const breakdown = computeSkillReadiness(career, skillRatings);
  const {
    readinessPercentage,
    skillsMet,
    skillsGap,
    statusLabel,
  } = breakdown;

  const completionPercentage = totalModulesCount > 0
    ? Math.round((completedModulesCount / totalModulesCount) * 100)
    : 0;

  const isCompletionFull = completionPercentage >= 100;
  const isReadinessNotFull = readinessPercentage < 100;
  const showBgYudaGapNotice = isCompletionFull && isReadinessNotFull;

  // Status dot & badge color based on readiness
  const isHighReadiness = readinessPercentage >= 80;
  const isMediumReadiness = readinessPercentage >= 50 && readinessPercentage < 80;

  const statusDotColor = isHighReadiness
    ? 'bg-emerald-500'
    : isMediumReadiness
    ? 'bg-amber-500'
    : 'bg-rose-500';

  const statusBadgeStyle = isHighReadiness
    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
    : isMediumReadiness
    ? 'bg-amber-50 text-amber-800 border-amber-200'
    : 'bg-rose-50 text-rose-800 border-rose-200';

  const handleDownload = async () => {
    if (onDownloadPdf) {
      onDownloadPdf();
      return;
    }

    if (!assessmentId) return;

    if (!isPurchased) {
      if (onUnlockClick) {
        onUnlockClick();
      } else {
        const el = document.getElementById('laporan-eksekutif-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    try {
      setIsDownloadingPdf(true);
      const res = await fetch(`/api/report/${assessmentId}/pdf`);
      if (!res.ok) {
        throw new Error('Gagal mengunduh file PDF');
      }
      const blob = await res.blob();
      const filename = `Gapless-Laporan-${(career.title || 'Karier').replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
      downloadBlobFile(blob, filename);
    } catch (err) {
      console.error(err);
      window.open(`/report/${assessmentId}`, '_blank');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="w-full mt-3">
      {/* Main Container Card */}
      <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-xs overflow-hidden">
        {/* Editorial Clean Header (Anti-AI Slop) */}
        <div className="bg-zinc-50/70 px-6 py-4 border-b border-zinc-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500">
              Evaluasi Kesiapan Karier
            </span>
            <span className="text-zinc-300">/</span>
            <span className="text-sm font-bold text-zinc-900 tracking-tight">
              {career.title}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowExplanationModal(true)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors py-1 px-2.5 rounded-lg hover:bg-zinc-200/60 cursor-pointer btn-press"
          >
            <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
            <span>Bedanya Kesiapan vs Progres?</span>
          </button>
        </div>

        {/* Dual Metric Header */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Metric 1: Skill Readiness (Hero metric, 7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-zinc-200/90 flex flex-col justify-between h-full shadow-2xs">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shadow-xs">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-zinc-900 text-base md:text-lg tracking-tight">
                          Skill Readiness
                        </h3>
                        {/* Technical status dot badge */}
                        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[11px] font-mono font-medium ${statusBadgeStyle}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusDotColor}`} />
                          <span>{statusLabel}</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Penguasaan kompetensi aktual vs standar industri
                      </p>
                    </div>
                  </div>

                  {/* Top Action Shortcut: Download PDF or Lock */}
                  {assessmentId && (
                    <button
                      type="button"
                      onClick={handleDownload}
                      disabled={isDownloadingPdf}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer btn-press shrink-0 ${
                        isPurchased
                          ? 'bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-900 shadow-2xs'
                          : 'bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 border-zinc-200'
                      }`}
                      title={isPurchased ? 'Unduh Dokumen PDF 11 Halaman' : 'Laporan PDF Terkunci (Buka Akses)'}
                    >
                      {isDownloadingPdf ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span className="font-mono text-[11px]">Mengunduh...</span>
                        </>
                      ) : isPurchased ? (
                        <>
                          <Download className="w-3.5 h-3.5 text-zinc-300" />
                          <span>Unduh PDF</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 text-amber-600" />
                          <span>PDF Terkunci</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <div className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight font-mono tabular-nums">
                    {readinessPercentage}%
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">Target: 100%</span>
                </div>
              </div>

              {/* Progress Bar for Readiness */}
              <div className="space-y-2 mt-2">
                <div className="h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden p-0.5 border border-zinc-200/60">
                  <div
                    style={{ width: `${readinessPercentage}%` }}
                    className={`h-full rounded-full transition-[width] duration-700 ease-out ${
                      isHighReadiness
                        ? 'bg-emerald-500'
                        : isMediumReadiness
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>
                    <strong className="font-mono tabular-nums text-zinc-800">{skillsMet.length}</strong> dari{' '}
                    <span className="font-mono tabular-nums">{breakdown.totalSkills}</span> skill memenuhi target
                  </span>
                  <span className="font-mono text-[11px] text-zinc-400">Validasi Industri</span>
                </div>
              </div>
            </div>

            {/* Metric 2: Roadmap Completion (5 cols, 4-Segment Phase Track) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-zinc-200/90 flex flex-col justify-between h-full shadow-2xs">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-800 border border-zinc-200 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 text-base md:text-lg tracking-tight">
                        Progres Materi
                      </h3>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Modul kurikulum pembelajaran selesai
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight font-mono tabular-nums">
                      {completionPercentage}%
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">Selesai Dibaca</span>
                  </div>
                </div>
              </div>

              {/* 4-Segment Phase Track representing Kurikulum 4 Fase */}
              <div className="space-y-2 mt-4">
                <div className="grid grid-cols-4 gap-1.5 h-3 w-full bg-zinc-100 p-0.5 rounded-full overflow-hidden border border-zinc-200/60">
                  {[0, 1, 2, 3].map((phaseIdx) => {
                    const phaseProgress = Math.min(100, Math.max(0, (completionPercentage - phaseIdx * 25) * 4));
                    return (
                      <div key={phaseIdx} className="h-full bg-zinc-200 rounded-full overflow-hidden relative">
                        <div
                          style={{ width: `${phaseProgress}%` }}
                          className="h-full bg-indigo-600 rounded-full transition-[width] duration-500 ease-out"
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>
                    <strong className="font-mono tabular-nums text-zinc-800">{completedModulesCount}</strong> dari{' '}
                    <span className="font-mono tabular-nums">{totalModulesCount}</span> modul
                  </span>
                  <span className="font-mono text-[11px] text-zinc-400">Kurikulum 4 Fase</span>
                </div>
              </div>
            </div>
          </div>

          {/* Special Educational Notice: 100% Completion but <100% Readiness (Bg Yuda Scenario) */}
          {showBgYudaGapNotice && (
            <div
              className="mt-6 p-5 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-zinc-800 relative overflow-hidden transition-all duration-300"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-zinc-900 text-sm md:text-base mb-1">
                    Semua Modul Telah Selesai, Namun Skill Readiness Masih {readinessPercentage}%?
                  </h4>
                  <p className="text-xs md:text-sm text-zinc-600 leading-relaxed mb-3">
                    Progres materi kurikulum kamu sudah <strong>100% Selesai</strong> karena seluruh modul telah dipelajari. Namun, <strong>Skill Readiness ({readinessPercentage}%)</strong> menunjukkan tingkat kompetensi awal berdasarkan asesmen skill. Untuk menguasai kompetensi secara nyata, pastikan kamu:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs font-medium text-zinc-800 mb-3">
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-amber-200/60 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                      <span>1. Terapkan materi ke dalam <strong>proyek portofolio nyata</strong>.</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-amber-200/60 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                      <span>2. Lakukan <strong>asesmen ulang</strong> untuk validasi kenaikan level skill.</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <Link
                      href={assessmentId ? `/hasil/${assessmentId}` : '/assessment'}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white px-3.5 py-2 rounded-xl transition-colors btn-press"
                    >
                      <span>Lihat Rincian Gap Analysis AI</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/career-test"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200 px-3.5 py-2 rounded-xl transition-colors btn-press"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Tes Ulang Level Skill</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Full Readiness Notice */}
          {isCompletionFull && !isReadinessNotFull && (
            <div
              className="mt-6 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-zinc-900 flex items-start gap-3.5 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm md:text-base mb-1 text-emerald-950">
                  Kesiapan Sempurna! Kamu Sudah Memenuhi Standar Industri
                </h4>
                <p className="text-xs md:text-sm text-emerald-900/90 leading-relaxed">
                  Kamu telah menyelesaikan seluruh materi belajar dan memiliki tingkat kesiapan skill 100% untuk berkarier sebagai <strong>{career.title}</strong>. Terus asah portofoliomu dan mulai lamar pekerjaan impian!
                </p>
              </div>
            </div>
          )}

          {/* ── Skill Breakdown Accordion (2-Category 3-Tier Horizontal Proficiency Bar Diagram) ── */}
          <div className="mt-6 pt-5 border-t border-zinc-100">
            <button
              type="button"
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="w-full flex items-center justify-between text-zinc-800 hover:text-zinc-950 font-bold text-xs md:text-sm py-1.5 cursor-pointer transition-colors btn-press"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>
                  Rincian Penguasaan Skill (
                  <span className="font-mono tabular-nums">{skillsMet.length}</span> Memenuhi,{' '}
                  <span className="font-mono tabular-nums">{skillsGap.length}</span> Perlu Ditingkatkan)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold">
                <span>{showBreakdown ? 'Sembunyikan' : 'Lihat Detail'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showBreakdown ? 'rotate-180' : ''}`} />
              </div>
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out overflow-hidden ${
                showBreakdown ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="bg-zinc-50/60 rounded-2xl p-4 sm:p-5 border border-zinc-200/70 mt-4 space-y-6">
                    {/* Visual Diagram Legend */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-200/60 text-xs">
                      <span className="text-zinc-600 font-medium">
                        Membandingkan Level Penguasaan Kamu vs Standar Industri:
                      </span>
                      <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-500">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3.5 h-2 rounded-xs bg-emerald-500 inline-block" />
                          <span>Level Kamu (Memenuhi)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-3.5 h-2 rounded-xs bg-amber-500 inline-block" />
                          <span>Level Kamu (Gap)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-3 bg-zinc-900 rounded-xs inline-block" />
                          <span>Target Industri</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Group 1: Skills Met */}
                      <div>
                        <div className="flex items-center gap-2 mb-3.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-800">
                            Memenuhi Target
                          </h5>
                          <span className="font-mono text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 tabular-nums">
                            {skillsMet.length} Skill
                          </span>
                        </div>

                        {skillsMet.length > 0 ? (
                          <div className="space-y-3">
                            {skillsMet.map((s) => {
                              const deltaLabel = s.current === s.required ? 'Sesuai' : `+${s.current - s.required} Level`;
                              return (
                                <div
                                  key={s.name}
                                  className="bg-white p-3.5 sm:p-4 rounded-xl border border-zinc-200/70 shadow-2xs hover:border-zinc-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                                >
                                  {/* Skill Name & Level Details */}
                                  <div className="min-w-0 flex-1">
                                    <p className="font-semibold text-xs sm:text-sm text-zinc-900 leading-snug break-words">
                                      {s.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-zinc-500">
                                      <span>Level: <strong className="text-zinc-800">{s.currentLabel}</strong></span>
                                      <span className="text-zinc-300">•</span>
                                      <span>Target: <span className="text-zinc-600">{s.requiredLabel}</span></span>
                                    </div>
                                  </div>

                                  {/* Visual 3-Tier Horizontal Proficiency Bar & Delta Tag */}
                                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                                    <div className="flex flex-col items-end gap-1">
                                      {/* 3-Step Proficiency Track */}
                                      <div className="grid grid-cols-3 gap-1 w-32 sm:w-44 h-2.5 bg-zinc-100 p-0.5 rounded-full border border-zinc-200/80 relative">
                                        {[1, 2, 3].map((lvl) => {
                                          const isFilled = s.current >= lvl;
                                          const isTarget = s.required === lvl;
                                          return (
                                            <div key={lvl} className="h-full rounded-full relative overflow-visible">
                                              <div
                                                className={`h-full rounded-full transition-all duration-300 ${
                                                  isFilled ? 'bg-emerald-500' : 'bg-transparent'
                                                }`}
                                              />
                                              {isTarget && (
                                                <div
                                                  className="absolute -top-1 -bottom-1 -right-0.5 w-1 bg-zinc-900 rounded-full shadow-2xs z-10"
                                                  title={`Target Standar: ${s.requiredLabel}`}
                                                />
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>

                                      {/* Step labels */}
                                      <div className="grid grid-cols-3 w-32 sm:w-44 text-[9px] font-mono text-zinc-400 text-center">
                                        <span>Dasar</span>
                                        <span>Menengah</span>
                                        <span>Lanjutan</span>
                                      </div>
                                    </div>

                                    {/* Delta Badge */}
                                    <span className="text-[10px] font-mono font-semibold px-2 py-1 rounded border border-emerald-200/80 bg-emerald-50 text-emerald-800 shrink-0">
                                      {deltaLabel}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-xs text-zinc-400 italic bg-white p-4 rounded-xl border border-zinc-200/60">
                            Belum ada skill yang mencapai level target industri.
                          </p>
                        )}
                      </div>

                      {/* Group 2: Skills with Gap */}
                      <div>
                        <div className="flex items-center gap-2 mb-3.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-800">
                            Perlu Ditingkatkan / Gap
                          </h5>
                          <span className="font-mono text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 tabular-nums">
                            {skillsGap.length} Skill
                          </span>
                        </div>

                        {skillsGap.length > 0 ? (
                          <div className="space-y-3">
                            {skillsGap.map((s) => {
                              const deltaLabel = `-${s.gap || 1} Level`;
                              return (
                                <div
                                  key={s.name}
                                  className="bg-white p-3.5 sm:p-4 rounded-xl border border-zinc-200/70 shadow-2xs hover:border-zinc-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                                >
                                  {/* Skill Name & Level Details */}
                                  <div className="min-w-0 flex-1">
                                    <p className="font-semibold text-xs sm:text-sm text-zinc-900 leading-snug break-words">
                                      {s.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-zinc-500">
                                      <span>Level: <strong className="text-amber-700">{s.currentLabel}</strong></span>
                                      <span className="text-zinc-300">→</span>
                                      <span>Target: <strong className="text-zinc-800">{s.requiredLabel}</strong></span>
                                    </div>
                                  </div>

                                  {/* Visual 3-Tier Horizontal Proficiency Bar & Delta Tag */}
                                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                                    <div className="flex flex-col items-end gap-1">
                                      {/* 3-Step Proficiency Track */}
                                      <div className="grid grid-cols-3 gap-1 w-32 sm:w-44 h-2.5 bg-zinc-100 p-0.5 rounded-full border border-zinc-200/80 relative">
                                        {[1, 2, 3].map((lvl) => {
                                          const isFilled = s.current >= lvl;
                                          const isTarget = s.required === lvl;
                                          return (
                                            <div key={lvl} className="h-full rounded-full relative overflow-visible">
                                              <div
                                                className={`h-full rounded-full transition-all duration-300 ${
                                                  isFilled ? 'bg-amber-500' : 'bg-transparent'
                                                }`}
                                              />
                                              {isTarget && (
                                                <div
                                                  className="absolute -top-1 -bottom-1 -right-0.5 w-1 bg-zinc-900 rounded-full shadow-2xs z-10"
                                                  title={`Target Standar: ${s.requiredLabel}`}
                                                />
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>

                                      {/* Step labels */}
                                      <div className="grid grid-cols-3 w-32 sm:w-44 text-[9px] font-mono text-zinc-400 text-center">
                                        <span>Dasar</span>
                                        <span>Menengah</span>
                                        <span>Lanjutan</span>
                                      </div>
                                    </div>

                                    {/* Delta Badge */}
                                    <span className="text-[10px] font-mono font-semibold px-2 py-1 rounded border border-amber-200/80 bg-amber-50 text-amber-900 shrink-0">
                                      Gap: {deltaLabel}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="bg-white p-4 rounded-xl border border-emerald-200/80 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Semua skill sudah memenuhi target industri!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* ── Virtual Job Simulation & LinkedIn Certificate Banner (Moved to the very bottom) ── */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-zinc-950 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden shadow-sm border border-zinc-800">
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-11 h-11 rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/20 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                    SERTIFIKASI PORTOFOLIO
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs text-zinc-400 font-medium flex items-center gap-1">
                    <span>In Collaboration with</span>
                    <strong className="text-zinc-200 font-semibold">{simulation.companyName}</strong>
                  </span>
                </div>
                <h4 className="font-bold text-sm sm:text-base text-white mb-1 tracking-tight">
                  {simulation.simulationTitle}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                  Buktikan penguasaan kompetensi kerjamu lewat studi kasus praktis dan klaim sertifikat resmi ber-badge mitra untuk profil LinkedIn kamu.
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full md:w-auto relative z-10">
              <Link
                href={assessmentId ? `/roadmap/${assessmentId}/simulasi` : '#'}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs sm:text-sm transition-all btn-press group shadow-sm"
              >
                <span>Mulai Simulasi Kerja</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Origin-Aware Explanation Modal: Readiness vs Completion */}
      {isExplanationModalRendered && (
        <div
          ref={explanationBackdropRef}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setShowExplanationModal(false)}
        >
          <div
            ref={explanationModalRef}
            className="bg-white border border-zinc-200 p-6 md:p-8 rounded-3xl max-w-lg w-full shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-10 bg-zinc-100 text-zinc-900 rounded-xl flex items-center justify-center mb-4 border border-zinc-200/80">
              <HelpCircle className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-zinc-900 mb-1.5 tracking-tight">
              Memahami Dua Metrik Progres Gapless
            </h3>
            <p className="text-xs md:text-sm text-zinc-500 mb-5 leading-relaxed">
              Di Gapless, kami memisahkan antara <strong>aktivitas belajar</strong> dengan <strong>tingkat penguasaan nyata</strong> agar kamu memiliki gambaran karier yang transparan dan akurat.
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70">
                <div className="flex items-center gap-2 font-bold text-zinc-900 text-xs sm:text-sm mb-1">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span>1. Skill Readiness (%) — Kesiapan Kompetensi</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Dihitung dari perbandingan level skill aktualmu terhadap standar requirement industri untuk posisi <strong>{career.title}</strong>. Angka ini hanya naik jika kamu memvalidasi peningkatan kemampuan melalui evaluasi atau asesmen ulang.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70">
                <div className="flex items-center gap-2 font-bold text-zinc-900 text-xs sm:text-sm mb-1">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>2. Progres Materi Belajar (%) — Roadmap Completion</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Menghitung berapa banyak modul kurikulum yang telah kamu buka dan pelajari. Selesai 100% berarti kamu sudah menuntaskan seluruh materi panduan belajar.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowExplanationModal(false)}
              className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer btn-press"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
