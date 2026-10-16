'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Layers, Loader2, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGaplessContext } from '@/contexts/CareerContext';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { quizBank } from '@/data/quizBank';
import { TRAIT_META } from '@/data/gaplessData';
import {
  saveAssessmentDraft,
  loadAssessmentDraft,
  clearAssessmentDraft,
} from '@/lib/assessmentDraft';

// Simple slugify to match DB roleName to quizBank keys (e.g. 'Software Engineer' -> 'software-engineer')
const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export function CaseStudyQuizView() {
    const { 
        selectedRole, 
        selectedCareer, 
        setSkillRating, 
        setView,
        syncResultNow
    } = useGaplessContext();
    const { session } = useAuthGuard();
    const router = useRouter();

    const [isSyncing, setIsSyncing] = useState(false);
    const [syncError, setSyncError] = useState<string | null>(null);
    const [isRestoredFromDraft, setIsRestoredFromDraft] = useState(false);
    
    // Map DB role slugs to quizBank keys if they don't match exactly
    const ROLE_ALIASES: Record<string, string> = {
        'graphic-designer-digital-creative-product-designer': 'graphic-designer',
        'graphic-designer-visual-designer': 'graphic-designer',
        'content-creator-social-media-specialist': 'content-creator',
        'software-engineer-front-back-full-stack': 'software-engineer',
        'ai-ml-engineer-machine-learning-engineer': 'ai-ml-engineer',
        'devops-engineer-qa-automation-engineer': 'devops-qa-engineer',
        'data-analyst-business-intelligence': 'data-analyst',
        'data-researcher-strategy-analyst': 'data-researcher',
        'digital-marketing-specialist': 'digital-marketing',
        'business-development-account-executive': 'business-development',
        'e-commerce-dropship-specialist': 'ecommerce-specialist',
        'e-commerce-specialist-dropshipper': 'ecommerce-specialist',
    };

    // Attempt to get the quiz questions
    let rawRoleSlug = selectedRole ? slugify(selectedRole.roleName) : '';
    const roleSlug = ROLE_ALIASES[rawRoleSlug] || rawRoleSlug;
    
    const questions = useMemo(() => (roleSlug ? quizBank[roleSlug] || [] : []), [roleSlug]);
    const draftQuizType = roleSlug ? `sudah_tahu_minat_${roleSlug}` : 'sudah_tahu_minat_generic';

    const [step, setStep] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});

    // ── Restore Draft on Mount ──
    useEffect(() => {
      if (!roleSlug || questions.length === 0) return;
      const draft = loadAssessmentDraft(draftQuizType, session?.user?.id);
      if (draft && Object.keys(draft.answers).length > 0) {
        const numericAnswers: Record<number, number> = {};
        Object.entries(draft.answers).forEach(([k, v]) => {
          numericAnswers[Number(k)] = v;
        });
        setAnswers(numericAnswers);
        setCurrentIndex(Math.min(draft.currentIndex, questions.length - 1));
        setIsRestoredFromDraft(true);
      }
    }, [draftQuizType, questions.length, roleSlug, session?.user?.id]);

    // ── Auto-Save Draft on Change ──
    useEffect(() => {
      if (!roleSlug || Object.keys(answers).length === 0 || step === 2) return;
      const stringAnswers: Record<string, number> = {};
      Object.entries(answers).forEach(([k, v]) => {
        stringAnswers[k] = v;
      });
      saveAssessmentDraft({
        quizType: draftQuizType,
        userId: session?.user?.id,
        currentIndex,
        answers: stringAnswers,
        careerSlug: roleSlug,
      });
    }, [answers, currentIndex, draftQuizType, roleSlug, session?.user?.id, step]);

    const handleResetDraft = () => {
      clearAssessmentDraft(draftQuizType, session?.user?.id);
      setAnswers({});
      setCurrentIndex(0);
      setIsRestoredFromDraft(false);
      setSyncError(null);
    };

    useEffect(() => {
      if (step === 2) {
        const syncAndRedirect = async () => {
          setIsSyncing(true);
          try {
            const assessmentId = await syncResultNow();
            if (assessmentId) {
              clearAssessmentDraft(draftQuizType, session?.user?.id);
              router.push(`/hasil/${assessmentId}`);
            } else {
              setIsSyncing(false);
              setView('roadmap');
            }
          } catch (e) {
            setIsSyncing(false);
            setSyncError('Gagal menyimpan hasil asesmen. Silakan coba lagi.');
            setStep(1);
          }
        };
        syncAndRedirect();
      }
    }, [step, syncResultNow, router, setView, draftQuizType, session?.user?.id]);

    // If no questions are found for this role, we can just skip or show a placeholder.
    if (!questions || questions.length === 0) {
        return (
            <div className="min-h-screen bg-space flex items-center justify-center px-4">
                <div className="max-w-md w-full glass-card p-8 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Quiz Case Study</h2>
                    <p className="mb-6 text-gray-500">Modul kuis untuk peran ini sedang disiapkan.</p>
                    <button 
                        onClick={() => {
                            selectedCareer?.skills.forEach(skill => {
                                setSkillRating(skill.name, 1);
                            });
                            setView('roadmap');
                        }}
                        className="btn-primary w-full"
                    >
                        Lanjut ke Roadmap →
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const selectedOptionIdx = answers[currentIndex] ?? null;
    
    const handleSelectOption = (idx: number) => {
        setAnswers((prev) => ({ ...prev, [currentIndex]: idx }));
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((i) => i - 1);
        }
    };

    const handleNext = () => {
        if (selectedOptionIdx === null) return;
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((i) => i + 1);
        }
    };

    const handleFinish = () => {
        if (selectedOptionIdx === null || !currentQuestion || isSyncing) return;
        
        if (selectedCareer) {
            const totalSkills = selectedCareer.skills.length;
            const totalQs = questions.length;
            
            selectedCareer.skills.forEach((skill, skillIdx) => {
                let skillPoints = 0;
                let maxSkillPoints = 0;
                
                for (let qIdx = 0; qIdx < totalQs; qIdx++) {
                     if (qIdx % totalSkills === skillIdx) {
                         const optIdx = answers[qIdx];
                         const optScore = (optIdx !== undefined && questions[qIdx]?.options[optIdx])
                           ? questions[qIdx].options[optIdx].score
                           : 0;
                         skillPoints += optScore;
                         maxSkillPoints += 10;
                     }
                }
                
                const pct = maxSkillPoints > 0 ? skillPoints / maxSkillPoints : 0;
                
                let finalLevel = 1;
                if (pct >= 0.8) {
                    finalLevel = 3; // Lanjutan
                } else if (pct >= 0.4) {
                    finalLevel = 2; // Menengah
                } else {
                    finalLevel = 1; // Dasar
                }
                
                setSkillRating(skill.name, finalLevel);
            });
        }
        
        setStep(2);
    };

    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-space flex flex-col items-center justify-center px-4 sm:px-6 py-12">
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
                
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="quiz"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                      className="w-full max-w-2xl"
                    >
                        {/* Restored Draft Banner */}
                        {isRestoredFromDraft && (
                          <div className="mb-4 p-3 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-between text-xs text-blue-900 shadow-xs">
                            <div className="flex items-center gap-2">
                              <RotateCcw size={14} className="text-blue-600 shrink-0" />
                              <span>Dilanjutkan dari pertanyaan {currentIndex + 1}</span>
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

                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Case Study: {selectedRole?.roleName}</h2>
                            <p className="text-gray-500">Pertanyaan {currentIndex + 1} dari {questions.length}</p>
                        </div>

                        <div className="w-full bg-gray-200 h-2 rounded-full mb-10 overflow-hidden">
                            <motion.div 
                                className="h-full rounded-full"
                                style={{ background: 'linear-gradient(90deg, #1d4ed8, #3b82f6, #22d3ee)' }}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                        {syncError && (
                          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center justify-between">
                            <span>{syncError}</span>
                            <button onClick={() => setSyncError(null)} className="font-bold ml-2">Tutup</button>
                          </div>
                        )}

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="glass-card p-6 sm:p-8"
                            >
                                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-8 leading-relaxed">
                                    {currentQuestion.question}
                                </h3>

                                <div className="space-y-4">
                                    {currentQuestion.options.map((option, idx) => {
                                        const isSelected = selectedOptionIdx === idx;
                                        return (
                                        <button
                                            key={idx}
                                            onClick={() => handleSelectOption(idx)}
                                            className={`w-full text-left p-4 rounded-xl border transition-all group flex items-start gap-4 ${
                                                isSelected
                                                    ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-200'
                                                    : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                                            }`}
                                        >
                                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
                                                isSelected
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'border-gray-300 text-gray-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600'
                                            }`}>
                                                {option.label}
                                            </div>
                                            <span className={`mt-1 transition-colors ${
                                                isSelected ? 'text-slate-900 font-medium' : 'text-gray-600 group-hover:text-slate-900'
                                            }`}>
                                                {option.text}
                                            </span>
                                        </button>
                                        );
                                    })}
                                </div>

                                {/* Navigation: Sebelumnya & Selanjutnya/Lihat Hasil */}
                                <div className="mt-8 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        disabled={currentIndex === 0}
                                        className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 text-sm cursor-pointer"
                                    >
                                        <ChevronLeft size={16} />
                                        Sebelumnya
                                    </button>

                                    {currentIndex === questions.length - 1 ? (
                                        <button
                                            type="button"
                                            onClick={handleFinish}
                                            disabled={selectedOptionIdx === null || isSyncing}
                                            className="btn-primary flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                        >
                                            {isSyncing ? (
                                                <>
                                                    <Loader2 size={16} className="animate-spin" />
                                                    <span>Menghitung hasil...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Lihat Hasil</span>
                                                    <ChevronRight size={16} />
                                                </>
                                            )}
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            disabled={selectedOptionIdx === null}
                                            className="btn-primary flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                        >
                                            <span>Selanjutnya</span>
                                            <ChevronRight size={16} />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="saving"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full flex flex-col items-center justify-center py-24 text-center"
                    >
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-100 mb-6">
                            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">Menghitung &amp; Menyimpan Hasil...</h2>
                        <p className="text-gray-500 max-w-sm mx-auto">
                            Mohon tunggu sebentar, kami sedang menyiapkan laporan analisis gap skill kamu.
                        </p>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
        </div>
    );
}
