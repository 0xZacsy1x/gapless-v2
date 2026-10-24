'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Lock,
  ShieldCheck,
  ArrowRight,
  Target,
  Zap,
} from 'lucide-react';
import { SJT_SKILLS, SJT_SKILL_META, SJTSkill } from '@/data/sjtBank';
import { getDetailedSoftSkillAnalysis, SoftSkillDetailReport } from '@/data/sjtAnalysisData';

interface SJTSoftSkillsCardProps {
  skillRatings: Record<string, number>;
  isPurchased?: boolean;
  assessmentId?: string;
  careerTitle?: string;
  onUnlockClick?: () => void;
}

export function SJTSoftSkillsCard({
  skillRatings,
  isPurchased = false,
  assessmentId,
  careerTitle = 'Target Karier',
  onUnlockClick,
}: SJTSoftSkillsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'in_depth'>('overview');
  const [selectedSkillDetail, setSelectedSkillDetail] = useState<SJTSkill | null>(null);

  // Check if at least one SJT skill is present in skillRatings
  const hasSjtScores = useMemo(() => {
    return SJT_SKILLS.some((skill) => skillRatings[skill] !== undefined);
  }, [skillRatings]);

  // Basic overview data for Free tier
  const skillData = useMemo(() => {
    if (!hasSjtScores) return [];

    return SJT_SKILLS.map((skill) => {
      const meta = SJT_SKILL_META[skill];
      const level = skillRatings[skill] ?? 1; // 1 = Dasar, 2 = Menengah, 3 = Lanjutan

      let levelLabel = 'Dasar (Perlu Asah)';
      let levelColor = 'bg-amber-50 text-amber-700 border-amber-200';
      let progressColor = 'bg-amber-500';
      let barWidth = '33%';

      if (level >= 3) {
        levelLabel = 'Lanjutan (Siap Kerja Unggul)';
        levelColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        progressColor = 'bg-emerald-500';
        barWidth = '100%';
      } else if (level === 2) {
        levelLabel = 'Menengah (Standar Industri)';
        levelColor = 'bg-blue-50 text-blue-700 border-blue-200';
        progressColor = 'bg-blue-600';
        barWidth = '66%';
      }

      return {
        skill,
        label: meta.label,
        shortLabel: meta.shortLabel,
        icon: meta.icon,
        description: meta.description,
        level,
        levelLabel,
        levelColor,
        progressColor,
        barWidth,
      };
    });
  }, [hasSjtScores, skillRatings]);

  // In-depth details for Paid tier
  const detailedReports: SoftSkillDetailReport[] = useMemo(() => {
    if (!hasSjtScores) return [];
    return getDetailedSoftSkillAnalysis(skillRatings, careerTitle);
  }, [hasSjtScores, skillRatings, careerTitle]);

  // Top strengths (Level 3 or highest)
  const strengths = useMemo(() => {
    return skillData.filter((s) => s.level >= 2).slice(0, 3);
  }, [skillData]);

  // Areas to improve (Level 1)
  const areasToImprove = useMemo(() => {
    return skillData.filter((s) => s.level === 1).slice(0, 2);
  }, [skillData]);

  if (!hasSjtScores || skillData.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-8 transition-all">
      {/* Top Banner with Tier Indicator */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 px-6 py-3.5 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold">
          <Brain className="w-4 h-4 text-violet-200" />
          <span>Hasil Evaluasi 8 Dimensi Soft Skill (SJT 40 Skenario)</span>
        </div>
        <div className="flex items-center gap-2">
          {isPurchased ? (
            <span className="text-[11px] font-bold bg-emerald-500/25 text-emerald-100 border border-emerald-300/40 px-3 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Tergabung di Laporan Lengkap 11 Hal</span>
            </span>
          ) : (
            <span className="text-[11px] font-medium bg-white/20 text-white px-2.5 py-0.5 rounded-full border border-white/30 flex items-center gap-1">
              <span>Ringkasan Gratis</span>
            </span>
          )}
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Profil Kesiapan Sikap &amp; Soft Skill Kerja
              </h3>
              {!isPurchased && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                  FREE
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              Hasil simulasi 40 situasi industri untuk mengukur respon perilaku alami, etika kolaborasi, dan kematangan mentalitas profesionalmu.
            </p>
          </div>

          {/* Action Button: Toggle Details */}
          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              <span>{isExpanded ? 'Tutup Detail 8 Skill' : 'Lihat Semua 8 Skill'}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Top Insights Highlight (Strengths & Areas to Improve) - FREE & PAID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Kekuatan Utama */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Soft Skill Paling Menonjol (Kekuatan Utama)</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                Terverifikasi
              </span>
            </div>
            {strengths.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {strengths.map((s) => (
                  <span
                    key={s.skill}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-xl bg-white text-emerald-900 border border-emerald-200 shadow-2xs"
                  >
                    <span>{s.icon}</span>
                    <span>{s.shortLabel}</span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Soft skill kamu merata di tahap pondasi.</p>
            )}
          </div>

          {/* Area Asah */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span>Prioritas Pengembangan Diri (Blind Spots)</span>
              </div>
              <span className="text-[10px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">
                Perlu Latihan
              </span>
            </div>
            {areasToImprove.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {areasToImprove.map((s) => (
                  <span
                    key={s.skill}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-xl bg-white text-amber-900 border border-amber-200 shadow-2xs"
                  >
                    <span>{s.icon}</span>
                    <span>{s.shortLabel}</span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-emerald-700 font-medium">
                Hebat! Semua 8 soft skill sudah berada di standar industri atau lebih tinggi.
              </p>
            )}
          </div>
        </div>

        {/* Navigation Tabs (Available when expanded) */}
        {isExpanded && isPurchased && (
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Ringkasan Bar Progress
            </button>
            <button
              onClick={() => setActiveTab('in_depth')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'in_depth'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Detail Analisis Mendalam (Paid Exclusive)</span>
            </button>
          </div>
        )}

        {/* ── EXPANDED VIEW 1: BASIC PROGRESS BARS (FREE & OVERVIEW) ── */}
        <AnimatePresence>
          {isExpanded && (!isPurchased || activeTab === 'overview') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1 mb-6">
                {skillData.map((item) => (
                  <div
                    key={item.skill}
                    className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 flex flex-col justify-between hover:bg-white transition-all shadow-2xs hover:shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-2xl p-1.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                          {item.icon}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.levelColor}`}
                        >
                          {item.level === 3 ? 'Unggul' : item.level === 2 ? 'Standar' : 'Perlu Asah'}
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1 leading-snug">
                        {item.shortLabel}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed mb-3 line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium mb-1">
                        <span>Pencapaian</span>
                        <span className="font-mono font-bold text-slate-700">
                          {item.level === 3 ? 'Tinggi (Lv 3)' : item.level === 2 ? 'Sedang (Lv 2)' : 'Dasar (Lv 1)'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${item.progressColor}`}
                          style={{ width: item.barWidth }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── EXPANDED VIEW 2: IN-DEPTH DETAIL FOR PAID USERS ── */}
        <AnimatePresence>
          {isExpanded && isPurchased && activeTab === 'in_depth' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mb-4 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex items-start gap-3">
                <span className="p-2 bg-indigo-100 text-indigo-700 rounded-xl shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="text-xs font-bold text-indigo-950">
                      Evaluasi Kematangan Perilaku Kerja &amp; Panduan Wawancara ({careerTitle})
                    </h4>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-md">
                      ✓ Tergabung di Laporan Lengkap (Hal 4 &amp; 5)
                    </span>
                  </div>
                  <p className="text-[11px] text-indigo-800 leading-relaxed">
                    Data di bawah menganalisis respon alami di tempat kerja, deteksi blind spots, aksi perbaikan mingguan, dan simulasi jawaban interview (STAR Method). Analisis ini otomatis terintegrasi utuh di dalam Dokumen Laporan Eksekutif 11 Halaman di bawah.
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {detailedReports.map((item) => {
                  const isSelected = selectedSkillDetail === item.skill;

                  return (
                    <div
                      key={item.skill}
                      className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/60 transition"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedSkillDetail(isSelected ? null : item.skill)}
                        className="w-full p-4.5 sm:p-5 flex items-center justify-between text-left hover:bg-slate-100/80 transition cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="text-2xl p-2 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                            {item.icon}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-900">{item.label}</h4>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  item.level === 3
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : item.level === 2
                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                }`}
                              >
                                {item.maturityStatus}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                              {item.behavioralTendency}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-mono font-bold text-slate-700">
                            {item.scorePercentage}%
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform ${
                              isSelected ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-5 pt-1 border-t border-slate-200/80 bg-white space-y-4"
                          >
                            {/* Respon Alami */}
                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                              <span className="font-bold text-slate-900 block mb-1">
                                🧠 Respon Alami di Tempat Kerja:
                              </span>
                              <p className="text-slate-600 leading-relaxed">
                                {item.behavioralTendency}
                              </p>
                            </div>

                            {/* Strengths & Blind Spots */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs">
                                <span className="font-bold text-emerald-900 block mb-1.5 flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  Kekuatan Perilaku Terverifikasi:
                                </span>
                                <ul className="space-y-1 text-emerald-950 text-[11.5px]">
                                  {item.workplaceStrengths.map((str, i) => (
                                    <li key={i} className="flex items-start gap-1.5">
                                      <span className="text-emerald-500 font-bold">•</span>
                                      <span>{str}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 text-xs">
                                <span className="font-bold text-rose-900 block mb-1.5 flex items-center gap-1.5">
                                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                                  Blind Spots &amp; Potensi Risiko:
                                </span>
                                <ul className="space-y-1 text-rose-950 text-[11.5px]">
                                  {item.blindSpotsAndRisks.map((bs, i) => (
                                    <li key={i} className="flex items-start gap-1.5">
                                      <span className="text-rose-500 font-bold">•</span>
                                      <span>{bs}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Actionable Coaching Drill */}
                            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs">
                              <span className="font-bold text-blue-900 block mb-1 flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5 text-blue-600" />
                                Panduan Tindakan Mingguan (Actionable Habit):
                              </span>
                              <p className="text-blue-950 leading-relaxed text-[11.5px]">
                                {item.actionableCoaching}
                              </p>
                            </div>

                            {/* Interview Talking Points (STAR Method) */}
                            <div className="p-3.5 rounded-xl bg-violet-50/70 border border-violet-200 text-xs space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-violet-950 flex items-center gap-1.5">
                                  <Target className="w-3.5 h-3.5 text-violet-600" />
                                  Simulasi Wawancara Kerja (Metode STAR untuk {careerTitle}):
                                </span>
                                <span className="text-[10px] font-bold text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full">
                                  Interview Ready
                                </span>
                              </div>
                              <p className="text-slate-600 italic text-[11px]">
                                &ldquo;{item.interviewTalkingPoint.promptQuestion}&rdquo;
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                                <div className="p-2 bg-white rounded-lg border border-violet-100">
                                  <strong className="text-violet-900 block">S - Situation:</strong>
                                  <span className="text-slate-600">{item.interviewTalkingPoint.starStory.situation}</span>
                                </div>
                                <div className="p-2 bg-white rounded-lg border border-violet-100">
                                  <strong className="text-violet-900 block">T - Task:</strong>
                                  <span className="text-slate-600">{item.interviewTalkingPoint.starStory.task}</span>
                                </div>
                                <div className="p-2 bg-white rounded-lg border border-violet-100">
                                  <strong className="text-violet-900 block">A - Action:</strong>
                                  <span className="text-slate-600">{item.interviewTalkingPoint.starStory.action}</span>
                                </div>
                                <div className="p-2 bg-white rounded-lg border border-violet-100">
                                  <strong className="text-violet-900 block">R - Result:</strong>
                                  <span className="text-slate-600">{item.interviewTalkingPoint.starStory.result}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CALLOUT KUNCI UNTUK FREE USERS ── */}
        {!isPurchased && (
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-1.5 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 border border-white/15 text-[11px] font-bold">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Manfaat Eksklusif Laporan Berbayar (Rp9.900)</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Buka Detail Evaluasi Soft Skill &amp; Panduan Wawancara Kerja
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tingkatkan peluang lolos seleksi dengan analisis mendalam respon alami di tempat kerja, deteksi blind spots, latihan intervensi mingguan, dan contekan jawaban interview STAR Method untuk peran <strong>{careerTitle}</strong>.
                </p>
              </div>

              <div className="shrink-0">
                {onUnlockClick ? (
                  <button
                    type="button"
                    onClick={onUnlockClick}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Buka di Laporan Resmi (Rp9.900)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <a
                    href="#laporan-eksekutif-section"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Buka di Laporan Resmi (Rp9.900)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
