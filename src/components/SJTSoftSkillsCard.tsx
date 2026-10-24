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
  HelpCircle,
} from 'lucide-react';
import { SJT_SKILLS, SJT_SKILL_META, SJTSkill } from '@/data/sjtBank';

interface SJTSoftSkillsCardProps {
  skillRatings: Record<string, number>;
}

export function SJTSoftSkillsCard({ skillRatings }: SJTSoftSkillsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if at least one SJT skill is present in skillRatings
  const hasSjtScores = useMemo(() => {
    return SJT_SKILLS.some((skill) => skillRatings[skill] !== undefined);
  }, [skillRatings]);

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
    <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 px-6 py-3.5 text-white flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold">
          <Brain className="w-4 h-4 text-violet-200" />
          <span>Hasil Evaluasi 8 Dimensi Soft Skill (SJT 40 Skenario)</span>
        </div>
        <span className="text-[11px] font-medium bg-white/20 px-2.5 py-0.5 rounded-full border border-white/30">
          Situational Judgement Test
        </span>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Profil Kesiapan Sikap &amp; Soft Skill Kerja</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Hasil simulasi 40 situasi dunia kerja untuk memetakan respon alami, etika kolaborasi, dan kematangan mentalitas profesionalmu.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0 self-start md:self-auto"
          >
            <span>{isExpanded ? 'Tutup Detail 8 Skill' : 'Lihat Semua 8 Skill'}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Top Insights Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Kekuatan Utama */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Soft Skill Paling Menonjol</span>
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
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-2">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span>Prioritas Pengembangan Diri</span>
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
                Keren! Semua 8 soft skill sudah berada di standar industri atau lebih tinggi.
              </p>
            )}
          </div>
        </div>

        {/* Expanded 8 Skills Grid */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {skillData.map((item) => (
                  <div
                    key={item.skill}
                    className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 flex flex-col justify-between"
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
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.progressColor}`}
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
      </div>
    </div>
  );
}
