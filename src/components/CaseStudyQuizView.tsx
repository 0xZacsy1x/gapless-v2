'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ChevronRight,
  ChevronLeft,
  Loader2,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  Target,
  Brain,
  Compass,
  Briefcase,
  Layers,
  Users2,
  SearchCheck,
  Crosshair,
  Flame,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGaplessContext } from '@/contexts/CareerContext';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { Navbar } from '@/components/Navbar';
import { quizBank } from '@/data/quizBank';
import {
  sjtBank,
  computeSJTScores,
  getSJTScoreForSkill,
  SJTSkill,
  SJT_SKILLS,
  SJT_SKILL_META,
  SJTQuestion,
} from '@/data/sjtBank';
import {
  saveAssessmentDraft,
  loadAssessmentDraft,
  clearAssessmentDraft,
} from '@/lib/assessmentDraft';

// Simple slugify to match DB roleName to quizBank keys
const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

type AssessmentPhase = 'hardskill' | 'transition' | 'sjt' | 'saving';

function getInitialAssessmentState(roleSlug: string, userId?: string | null) {
  if (typeof window === 'undefined' || !roleSlug) {
    return {
      phase: 'hardskill' as AssessmentPhase,
      hardskillIndex: 0,
      sjtIndex: 0,
      hardskillAnswers: {} as Record<number, number>,
      sjtAnswers: {} as Record<number, number>,
      isRestored: false,
    };
  }

  const draftQuizType = `sudah_tahu_minat_${roleSlug}`;
  const draft = loadAssessmentDraft(draftQuizType, userId);
  const storedPhase = localStorage.getItem(`gapless:sjt_phase:${draftQuizType}`);

  if (draft && Object.keys(draft.answers).length > 0) {
    const hs: Record<number, number> = {};
    const sjt: Record<number, number> = {};

    Object.entries(draft.answers).forEach(([key, val]) => {
      if (key.startsWith('sjt_')) {
        const idx = parseInt(key.replace('sjt_', ''), 10);
        if (!isNaN(idx)) sjt[idx] = val;
      } else if (key.startsWith('hs_')) {
        const idx = parseInt(key.replace('hs_', ''), 10);
        if (!isNaN(idx)) hs[idx] = val;
      } else {
        const idx = parseInt(key, 10);
        if (!isNaN(idx)) hs[idx] = val;
      }
    });

    let phase: AssessmentPhase = 'hardskill';
    let sjtIndex = 0;
    let hardskillIndex = 0;

    if (storedPhase === 'sjt' || Object.keys(sjt).length > 0) {
      phase = 'sjt';
      sjtIndex = Math.min(draft.currentIndex, sjtBank.length - 1);
    } else if (storedPhase === 'transition') {
      phase = 'transition';
    } else {
      phase = 'hardskill';
      hardskillIndex = draft.currentIndex;
    }

    return {
      phase,
      hardskillIndex,
      sjtIndex,
      hardskillAnswers: hs,
      sjtAnswers: sjt,
      isRestored: true,
    };
  }

  return {
    phase: (storedPhase === 'sjt' ? 'sjt' : 'hardskill') as AssessmentPhase,
    hardskillIndex: 0,
    sjtIndex: 0,
    hardskillAnswers: {} as Record<number, number>,
    sjtAnswers: {} as Record<number, number>,
    isRestored: false,
  };
}

export function CaseStudyQuizView() {
  const {
    selectedRole,
    selectedCareer,
    setSkillRatings,
    setView,
    syncResultNow,
  } = useGaplessContext();
  const { session } = useAuthGuard();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Map DB role slugs to quizBank keys if they don't match exactly
  const ROLE_ALIASES: Record<string, string> = {
    'graphic-designer-digital-creative-product-designer': 'graphic-designer',
    'graphic-designer-visual-designer': 'graphic-designer',
    'content-creator-social-media-specialist': 'content-creator',
    'content-creator-social-media-strategist': 'content-creator',
    'content-strategist': 'content-creator',
    'software-engineer-front-back-full-stack': 'software-engineer',
    'ai-ml-engineer-machine-learning-engineer': 'ai-ml-engineer',
    'devops-engineer-qa-automation-engineer': 'devops-qa-engineer',
    'data-analyst-business-intelligence': 'data-analyst',
    'data-researcher-strategy-analyst': 'data-researcher',
    'research-scientist': 'data-researcher',
    'digital-marketing-specialist': 'digital-marketing',
    'community-manager': 'digital-marketing',
    'business-development-account-executive': 'business-development',
    'e-commerce-dropship-specialist': 'ecommerce-specialist',
    'e-commerce-specialist-dropshipper': 'ecommerce-specialist',
    'ux-designer': 'ui-ux-designer',
  };

  const urlRole = searchParams.get('role');
  const localRole = typeof window !== 'undefined' ? localStorage.getItem('gapless:active_role_slug') || '' : '';

  const rawRoleSlug = selectedRole
    ? slugify(selectedRole.roleName)
    : selectedCareer
    ? (selectedCareer.id || slugify(selectedCareer.title))
    : urlRole || localRole;
  const roleSlug = ROLE_ALIASES[rawRoleSlug] || rawRoleSlug;

  // Hardskill Questions (from quizBank)
  const hardskillQuestions = useMemo(
    () => (roleSlug ? quizBank[roleSlug] || [] : []),
    [roleSlug]
  );
  const draftQuizType = roleSlug
    ? `sudah_tahu_minat_${roleSlug}`
    : 'sudah_tahu_minat_generic';

  // Synchronously compute initial draft state to PREVENT ANY FLICKER
  const initialDraft = useMemo(
    () => getInitialAssessmentState(roleSlug, session?.user?.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [roleSlug]
  );

  const [phase, setPhase] = useState<AssessmentPhase>(initialDraft.phase);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [isRestoredFromDraft, setIsRestoredFromDraft] = useState(initialDraft.isRestored);

  // Hardskill state
  const [hardskillIndex, setHardskillIndex] = useState(initialDraft.hardskillIndex);
  const [hardskillAnswers, setHardskillAnswers] = useState<Record<number, number>>(initialDraft.hardskillAnswers);

  // SJT (Soft Skills) state
  const [sjtIndex, setSjtIndex] = useState(initialDraft.sjtIndex);
  const [sjtAnswers, setSjtAnswers] = useState<Record<number, number>>(initialDraft.sjtAnswers);

  // If role has no hardskill questions, default directly to SJT
  useEffect(() => {
    if (hardskillQuestions.length === 0 && phase === 'hardskill') {
      setPhase('sjt');
    }
  }, [hardskillQuestions.length, phase]);

  // ── Restore Draft on Mount (if not already restored synchronously) ──
  useEffect(() => {
    if (!roleSlug || isRestoredFromDraft) return;
    const draft = loadAssessmentDraft(draftQuizType, session?.user?.id);
    if (draft && Object.keys(draft.answers).length > 0) {
      const hs: Record<number, number> = {};
      const sjt: Record<number, number> = {};

      Object.entries(draft.answers).forEach(([key, val]) => {
        if (key.startsWith('sjt_')) {
          const idx = parseInt(key.replace('sjt_', ''), 10);
          if (!isNaN(idx)) sjt[idx] = val;
        } else if (key.startsWith('hs_')) {
          const idx = parseInt(key.replace('hs_', ''), 10);
          if (!isNaN(idx)) hs[idx] = val;
        } else {
          // Backward compatibility: numeric string keys are hardskill
          const idx = parseInt(key, 10);
          if (!isNaN(idx)) hs[idx] = val;
        }
      });

      setHardskillAnswers(hs);
      setSjtAnswers(sjt);

      // Check stored phase
      const storedPhase = localStorage.getItem(`gapless:sjt_phase:${draftQuizType}`);
      if (storedPhase === 'sjt' || Object.keys(sjt).length > 0) {
        setPhase('sjt');
        setSjtIndex(Math.min(draft.currentIndex, sjtBank.length - 1));
      } else if (storedPhase === 'transition') {
        setPhase('transition');
      } else {
        setPhase('hardskill');
        setHardskillIndex(Math.min(draft.currentIndex, Math.max(0, hardskillQuestions.length - 1)));
      }

      setIsRestoredFromDraft(true);
    }
  }, [draftQuizType, hardskillQuestions.length, isRestoredFromDraft, roleSlug, session?.user?.id]);

  // ── Auto-Save Draft on Change ──
  useEffect(() => {
    if (!roleSlug || phase === 'saving') return;
    if (Object.keys(hardskillAnswers).length === 0 && Object.keys(sjtAnswers).length === 0) return;

    const stringAnswers: Record<string, number> = {};
    Object.entries(hardskillAnswers).forEach(([k, v]) => {
      stringAnswers[`hs_${k}`] = v;
    });
    Object.entries(sjtAnswers).forEach(([k, v]) => {
      stringAnswers[`sjt_${k}`] = v;
    });

    const currentIndexToSave = phase === 'sjt' ? sjtIndex : hardskillIndex;

    saveAssessmentDraft({
      quizType: draftQuizType,
      userId: session?.user?.id,
      currentIndex: currentIndexToSave,
      answers: stringAnswers,
      careerSlug: roleSlug,
    });

    try {
      localStorage.setItem(`gapless:sjt_phase:${draftQuizType}`, phase);
    } catch (e) {
      // ignore
    }
  }, [
    hardskillAnswers,
    sjtAnswers,
    hardskillIndex,
    sjtIndex,
    phase,
    draftQuizType,
    roleSlug,
    session?.user?.id,
  ]);

  const handleResetDraft = () => {
    clearAssessmentDraft(draftQuizType, session?.user?.id);
    try {
      localStorage.removeItem(`gapless:sjt_phase:${draftQuizType}`);
    } catch (e) {}
    setHardskillAnswers({});
    setSjtAnswers({});
    setHardskillIndex(0);
    setSjtIndex(0);
    setPhase(hardskillQuestions.length > 0 ? 'hardskill' : 'sjt');
    setIsRestoredFromDraft(false);
    setSyncError(null);
  };

  // ── HARDSKILL HANDLERS ──
  const currentHardskillQ = hardskillQuestions[hardskillIndex];
  const selectedHardskillOptIdx = hardskillAnswers[hardskillIndex] ?? null;

  const handleSelectHardskillOption = (idx: number) => {
    setHardskillAnswers((prev) => ({ ...prev, [hardskillIndex]: idx }));
  };

  const handlePrevHardskill = () => {
    if (hardskillIndex > 0) {
      setHardskillIndex((i) => i - 1);
    }
  };

  const handleNextHardskill = () => {
    if (selectedHardskillOptIdx === null) return;
    if (hardskillIndex < hardskillQuestions.length - 1) {
      setHardskillIndex((i) => i + 1);
    } else {
      // Completed Hardskill -> Move to Transition Screen
      setPhase('transition');
    }
  };

  // ── SJT HANDLERS ──
  const currentSjtQ = sjtBank[sjtIndex];
  const selectedSjtOptIdx = sjtAnswers[sjtIndex] ?? null;

  const handleSelectSjtOption = (idx: number) => {
    setSjtAnswers((prev) => ({ ...prev, [sjtIndex]: idx }));
  };

  const handlePrevSjt = () => {
    if (sjtIndex > 0) {
      setSjtIndex((i) => i - 1);
    } else {
      // At the first SJT question, allow returning to transition screen
      setPhase('transition');
    }
  };

  const handleNextSjt = () => {
    if (selectedSjtOptIdx === null) return;
    if (sjtIndex < sjtBank.length - 1) {
      setSjtIndex((i) => i + 1);
    }
  };

  // ── FINISH & CALCULATION (Both Hard + Soft Skills) ──
  const handleFinishAll = useCallback(async () => {
    if (selectedSjtOptIdx === null || isSyncing) return;

    setIsSyncing(true);
    setPhase('saving');
    setSyncError(null);

    try {
      // 1. Calculate Soft Skills from SJT (8 Dimensions)
      const sjtScores = computeSJTScores(sjtAnswers);
      const computedRatings: Record<string, number> = {};

      // Register the 8 pure SJT dimensions
      Object.values(sjtScores).forEach((item) => {
        computedRatings[item.skill] = item.level;
      });

      // 2. Calculate Hard Skills & Map Soft Skills for the Selected Career
      if (selectedCareer) {
        selectedCareer.skills.forEach((skill, skillIdx) => {
          // Check if this is a soft skill using keyword matcher
          const matchedSJT = getSJTScoreForSkill(skill.name, sjtScores);
          if (matchedSJT) {
            computedRatings[skill.name] = matchedSJT.level;
          } else {
            // It's a technical / hard skill: calculate from hardskill questions
            if (hardskillQuestions.length > 0) {
              let skillPoints = 0;
              let maxPoints = 0;
              for (let qIdx = 0; qIdx < hardskillQuestions.length; qIdx++) {
                const optIdx = hardskillAnswers[qIdx];
                const optScore =
                  optIdx !== undefined && hardskillQuestions[qIdx]?.options[optIdx]
                    ? hardskillQuestions[qIdx].options[optIdx].score
                    : 0;
                skillPoints += optScore;
                maxPoints += 10;
              }
              const pct = maxPoints > 0 ? skillPoints / maxPoints : 0;
              let finalLevel = 1;
              if (pct >= 0.8) finalLevel = 3;
              else if (pct >= 0.4) finalLevel = 2;
              else finalLevel = 1;

              computedRatings[skill.name] = finalLevel;
            } else {
              computedRatings[skill.name] = 1;
            }
          }
        });
      }

      // 3. Prepare combined raw answers
      const combinedAnswers: Record<string, number> = {};
      Object.entries(hardskillAnswers).forEach(([k, v]) => {
        combinedAnswers[`hs_${k}`] = v;
      });
      Object.entries(sjtAnswers).forEach(([k, v]) => {
        combinedAnswers[`sjt_${k}`] = v;
      });

      // 4. Update Context state
      setSkillRatings(computedRatings);

      // 5. Sync to database
      const assessmentId = await syncResultNow({
        skillRatings: computedRatings,
        rawAnswers: combinedAnswers,
      });

      // 6. Clear Draft & Redirect
      clearAssessmentDraft(draftQuizType, session?.user?.id);
      try {
        localStorage.removeItem(`gapless:sjt_phase:${draftQuizType}`);
        localStorage.removeItem('gapless:active_quiz_type');
        localStorage.removeItem('gapless:active_role_slug');
        localStorage.removeItem('gapless:selected_role');
        localStorage.removeItem('gapless:selected_career');
      } catch (e) {}

      if (assessmentId) {
        router.push(`/hasil/${assessmentId}`);
      } else {
        setIsSyncing(false);
        setView('roadmap');
      }
    } catch (err: any) {
      console.error('Failed to save assessment results:', err);
      setIsSyncing(false);
      setSyncError('Gagal menyimpan hasil asesmen. Silakan coba lagi.');
      setPhase('sjt');
    }
  }, [
    selectedSjtOptIdx,
    isSyncing,
    sjtAnswers,
    selectedCareer,
    hardskillQuestions,
    hardskillAnswers,
    setSkillRatings,
    syncResultNow,
    draftQuizType,
    session?.user?.id,
    router,
    setView,
  ]);

  // Determine SJT Stage
  const sjtStage = useMemo(() => {
    if (sjtIndex < 10) {
      return {
        number: 1,
        title: 'Kolaborasi Tim & Komunikasi',
        icon: Users2,
      };
    } else if (sjtIndex < 20) {
      return {
        number: 2,
        title: 'Analisis & Pemecahan Masalah',
        icon: SearchCheck,
      };
    } else if (sjtIndex < 30) {
      return {
        number: 3,
        title: 'Ketelitian & Rasa Ingin Tahu',
        icon: Crosshair,
      };
    } else {
      return {
        number: 4,
        title: 'Inisiatif & Adaptabilitas Kerja',
        icon: Flame,
      };
    }
  }, [sjtIndex]);

  const hardskillProgress = hardskillQuestions.length > 0
    ? ((hardskillIndex + 1) / hardskillQuestions.length) * 100
    : 100;
  const sjtProgress = ((sjtIndex + 1) / sjtBank.length) * 100;

  const phaseContainerRef = useRef<HTMLDivElement>(null);
  const sjtCardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (phaseContainerRef.current) {
      gsap.fromTo(phaseContainerRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
    }
  }, [phase]);

  useGSAP(() => {
    if (sjtCardRef.current) {
      gsap.fromTo(sjtCardRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' });
    }
  }, [currentSjtQ?.id]);

  return (
    <div className="min-h-screen bg-space flex flex-col justify-between">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          {/* ══════════════════════════════════════════════════
              PHASE 1: STUDI KASUS TEKNIS (HARDSKILL)
             ══════════════════════════════════════════════════ */}
          {phase === 'hardskill' && currentHardskillQ && (
            <div
              ref={phaseContainerRef}
              key="hardskill"
              className="w-full max-w-2xl"
            >
              {/* Restored Draft Banner */}
              {isRestoredFromDraft && (
                <div className="mb-4 p-3 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-between text-xs text-blue-900 shadow-xs">
                  <div className="flex items-center gap-2">
                    <RotateCcw size={14} className="text-blue-600 shrink-0" />
                    <span>Dilanjutkan dari sesi sebelumnya</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetDraft}
                    className="text-xs font-bold text-blue-700 hover:text-blue-900 underline ml-2 cursor-pointer"
                  >
                    Mulai ulang
                  </button>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
                  <Briefcase size={13} />
                  <span>Bagian 1: Studi Kasus Hardskill</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                  {selectedRole?.roleName || selectedCareer?.title}
                </h2>
                <p className="text-slate-500 text-sm">
                  Pertanyaan {hardskillIndex + 1} dari {hardskillQuestions.length}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full mb-8 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    background: 'linear-gradient(90deg, #1d4ed8, #3b82f6, #22d3ee)',
                    width: `${hardskillProgress}%`,
                  }}
                />
              </div>

              {/* Question Card */}
              <div className="glass-card p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-6 leading-relaxed">
                  {currentHardskillQ.question}
                </h3>

                <div className="space-y-3.5">
                  {currentHardskillQ.options.map((option, idx) => {
                    const isSelected = selectedHardskillOptIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectHardskillOption(idx)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-200 shadow-sm'
                            : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50/80 bg-white/70'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-all ${
                            isSelected
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'border-slate-300 text-slate-400'
                          }`}
                        >
                          {option.label}
                        </div>
                        <span
                          className={`text-sm leading-relaxed transition-colors ${
                            isSelected ? 'text-slate-900 font-semibold' : 'text-slate-700'
                          }`}
                        >
                          {option.text}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevHardskill}
                    disabled={hardskillIndex === 0}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 text-sm cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                    Sebelumnya
                  </button>

                  <button
                    type="button"
                    onClick={handleNextHardskill}
                    disabled={selectedHardskillOptIdx === null}
                    className="btn-primary flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>
                      {hardskillIndex === hardskillQuestions.length - 1
                        ? 'Lanjut ke Simulasi Soft Skill'
                        : 'Selanjutnya'}
                    </span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════
              PHASE 1.5: TRANSITION INTERSTITIAL
             ══════════════════════════════════════════════════ */}
          {phase === 'transition' && (
            <div
              ref={phaseContainerRef}
              key="transition"
              className="w-full max-w-xl glass-card p-8 sm:p-10 text-center relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-3xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/25">
                <Sparkles size={32} />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold mb-3">
                <CheckCircle2 size={13} />
                <span>Tahap 1 Hardskill Selesai</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
                Simulasi Situasi Kerja (SJT)
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Langkah kedua mengukur <strong className="text-slate-900">8 dimensi soft skill</strong> esensial melalui <strong>40 skenario situasional</strong> singkat di dunia kerja.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
                <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs">
                  <div className="text-blue-600 mb-1 font-bold text-xs flex items-center gap-1">
                    <Brain size={14} />
                    <span>8 Soft Skill</span>
                  </div>
                  <p className="text-[12px] text-slate-600 leading-tight">
                    Kolaborasi, Komunikasi, Problem Solving, Kritis, dll.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs">
                  <div className="text-indigo-600 mb-1 font-bold text-xs flex items-center gap-1">
                    <Clock size={14} />
                    <span>~7 Menit</span>
                  </div>
                  <p className="text-[12px] text-slate-600 leading-tight">
                    40 skenario cepat, 10–15 detik per pertanyaan.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs">
                  <div className="text-emerald-600 mb-1 font-bold text-xs flex items-center gap-1">
                    <Target size={14} />
                    <span>Respon Alami</span>
                  </div>
                  <p className="text-[12px] text-slate-600 leading-tight">
                    Pilih tindakan yang paling mencerminkan dirimu.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {hardskillQuestions.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setHardskillIndex(hardskillQuestions.length - 1);
                      setPhase('hardskill');
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-all cursor-pointer"
                  >
                    ← Cek Kembali Hardskill
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setPhase('sjt')}
                  className="w-full sm:w-auto btn-primary px-7 py-3 text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Mulai Simulasi Soft Skill (40 Soal)</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════
              PHASE 2: 40 SOAL SJT (SOFT SKILLS)
             ══════════════════════════════════════════════════ */}
          {phase === 'sjt' && currentSjtQ && (
            <div
              ref={phaseContainerRef}
              key="sjt"
              className="w-full max-w-2xl"
            >
              {syncError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center justify-between">
                  <span>{syncError}</span>
                  <button onClick={() => setSyncError(null)} className="font-bold ml-2">
                    Tutup
                  </button>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-2 shadow-xs transition-colors duration-300"
                  style={{
                    backgroundColor: '#eff6ff',
                    borderColor: '#bfdbfe',
                    color: '#1d4ed8'
                  }}
                >
                  <sjtStage.icon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                  <span>{sjtStage.title}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                  Simulasi Soft Skill (SJT)
                </h2>
                <p className="text-slate-500 text-sm">
                  Skenario {sjtIndex + 1} dari {sjtBank.length}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full mb-8 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-200"
                  style={{
                    background: 'linear-gradient(90deg, #2563eb, #6366f1, #a855f7)',
                    width: `${sjtProgress}%`,
                  }}
                />
              </div>

              {/* Scenario & Options Card */}
              <div
                ref={sjtCardRef}
                key={currentSjtQ.id}
                className="glass-card p-6 sm:p-8"
              >
                  {/* Scenario Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200/90 mb-6">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Compass size={13} className="text-blue-600" />
                      <span>Skenario Kasus Kerja</span>
                    </div>
                    <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-normal">
                      {currentSjtQ.scenario}
                    </p>
                  </div>

                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Pilih tindakan yang PALING TEPAT kamu ambil:
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentSjtQ.options.map((option, idx) => {
                      const isSelected = selectedSjtOptIdx === idx;
                      return (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => handleSelectSjtOption(idx)}
                          className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/90 ring-2 ring-blue-300 shadow-sm'
                              : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50/70 bg-white/70'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-all ${
                              isSelected
                                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                : 'border-slate-300 text-slate-400'
                            }`}
                          >
                            {option.label}
                          </div>
                          <span
                            className={`text-sm leading-relaxed transition-colors ${
                              isSelected ? 'text-slate-900 font-semibold' : 'text-slate-700'
                            }`}
                          >
                            {option.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevSjt}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold transition-all flex items-center gap-1.5 text-sm cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                      Sebelumnya
                    </button>

                    {sjtIndex === sjtBank.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleFinishAll}
                        disabled={selectedSjtOptIdx === null || isSyncing}
                        className="btn-primary flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md"
                      >
                        {isSyncing ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Menghitung Hasil...</span>
                          </>
                        ) : (
                          <>
                            <span>Selesaikan &amp; Lihat Analisis</span>
                            <CheckCircle2 size={16} />
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextSjt}
                        disabled={selectedSjtOptIdx === null}
                        className="btn-primary flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <span>Selanjutnya</span>
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════
              PHASE 3: SAVING SCREEN
             ══════════════════════════════════════════════════ */}
          {phase === 'saving' && (
            <div
              ref={phaseContainerRef}
              key="saving"
              className="w-full flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 mb-6">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Mengkalkulasi Kesiapan Hard &amp; Soft Skills...
              </h2>
              <p className="text-slate-500 max-w-sm mx-auto text-sm">
                Mengintegrasikan hasil studi kasus teknis dan 40 simulasi situasi kerja untuk laporan kesiapan kariermu.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
