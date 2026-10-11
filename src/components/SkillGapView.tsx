'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ChevronRight, ChevronLeft, Home } from 'lucide-react';
import Link from 'next/link';
import { TRAIT_META } from '@/data/gaplessData';
import { useRouter } from 'next/navigation';
import { useGaplessContext } from '@/contexts/CareerContext';
import { quizBank } from '@/data/quizBank';
const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const getQuizKey = (title: string) => {
    const slug = slugify(title);
    const aliases: Record<string, string> = {
        'ui-ux-designer': 'ui-ux-designer',
        'content-creator-social-media-specialist': 'content-creator',
        'software-engineer-front-back-full-stack': 'software-engineer',
        'ai-ml-engineer-machine-learning-engineer': 'ai-ml-engineer',
        'devops-engineer-qa-automation-engineer': 'devops-qa-engineer',
        'data-analyst-business-intelligence': 'data-analyst',
        'data-researcher-strategy-analyst': 'data-researcher',
        'digital-marketing-specialist': 'digital-marketing',
        'business-development-account-executive': 'business-development',
        'graphic-designer-digital-creative-product-designer': 'graphic-designer',
        'graphic-designer-visual-designer': 'graphic-designer',
        'e-commerce-dropship-specialist': 'ecommerce-specialist',
        'e-commerce-specialist-dropshipper': 'ecommerce-specialist',
    };
    return aliases[slug] || slug;
};

export function SkillGapView() {
  const {
    selectedCareer,
    setSkillRating,
    setView,
    dominantTrait,
    syncResultNow,
  } = useGaplessContext();

  const router = useRouter();

  const [step, setStep] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionScores, setQuestionScores] = useState<number[]>([]);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    if (step === 2 && !isSyncing && !syncError) {
      setIsSyncing(true);
      const syncAndRedirect = async () => {
        try {
          const assessmentId = await syncResultNow();
          if (assessmentId) {
            router.push(`/hasil/${assessmentId}`);
          } else {
            throw new Error('Gagal mendapatkan ID Asesmen');
          }
        } catch (err) {
          setSyncError(err instanceof Error ? err.message : 'Gagal menyimpan hasil asesmen.');
          setIsSyncing(false);
        }
      };
      syncAndRedirect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, syncError, router]);

  if (!selectedCareer) return null;

  const traitMeta = TRAIT_META[selectedCareer.trait];

  // Attempt to get the quiz questions
  const quizKey = getQuizKey(selectedCareer.title);
  const questions = quizBank[quizKey] || [];
  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    setSelectedOptionIdx(idx);
  };

  const handleConfirmNext = () => {
    if (selectedOptionIdx === null || !currentQuestion) return;
    const optionScore = currentQuestion.options[selectedOptionIdx].score;
    const newScores = [...questionScores, optionScore];
    
    if (currentIndex < questions.length - 1) {
        setQuestionScores(newScores);
        setCurrentIndex(currentIndex + 1);
        setSelectedOptionIdx(null); // Reset selection for next question
    } else {
        const totalSkills = selectedCareer.skills.length;
        const totalQs = questions.length;
        
        selectedCareer.skills.forEach((skill, skillIdx) => {
            let skillPoints = 0;
            let maxSkillPoints = 0;
            
            for (let qIdx = 0; qIdx < totalQs; qIdx++) {
                 if (qIdx % totalSkills === skillIdx) {
                     skillPoints += newScores[qIdx];
                     maxSkillPoints += 10; // assuming each Q is max 10
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
        
        // Proceed to Radar Chart
        setStep(2);
    }
  };

  const handleBackToResults = () => {
    if (!dominantTrait) {
      window.location.href = '/career-test';
    } else {
      setView('results');
    }
  };

  return (
    <div className="min-h-screen bg-space px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{
              background: `${traitMeta.color}10`,
              border: `1px solid ${traitMeta.color}25`,
            }}
          >
            <Layers size={14} style={{ color: traitMeta.color }} />
            <span className="text-xs font-semibold" style={{ color: traitMeta.color }}>
              Analisis Kesenjangan Skill
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            {selectedCareer.icon} {selectedCareer.title}
          </h1>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            Nilai level skillmu saat ini untuk melihat kesenjangan antara posisimu sekarang dan
            posisi yang perlu kamu capai.
          </p>
        </motion.div>

        {/* Wizard Steps */}
        <div className="mb-10 w-full relative">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="glass-card p-6 sm:p-8">
                  {(!questions || questions.length === 0) ? (
                    <div className="text-center py-8">
                      <h2 className="text-xl font-bold text-slate-900 mb-4">Quiz Case Study</h2>
                      <p className="mb-6 text-gray-500">Modul kuis untuk peran ini sedang disiapkan.</p>
                      <button 
                          onClick={() => {
                              selectedCareer.skills.forEach(skill => {
                                  setSkillRating(skill.name, 1);
                              });
                              setStep(2);
                          }}
                          className="btn-primary w-full max-w-xs mx-auto flex items-center justify-center gap-2"
                      >
                          Lanjut ke Analisis <ChevronRight size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="text-center mb-6">
                          <h2 className="text-2xl font-bold text-slate-900 mb-2">Case Study: {selectedCareer.title}</h2>
                          <p className="text-gray-500 text-sm">Pertanyaan {currentIndex + 1} dari {questions.length}</p>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-gray-200 h-1.5 rounded-full mb-8 overflow-hidden">
                          <motion.div 
                              className="h-full rounded-full"
                              style={{ background: traitMeta.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${(currentIndex / questions.length) * 100}%` }}
                              transition={{ duration: 0.3 }}
                          />
                      </div>

                      <AnimatePresence mode="wait">
                          <motion.div
                              key={currentIndex}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.2 }}
                          >
                              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-6 leading-relaxed">
                                  {currentQuestion.question}
                              </h3>

                              <div className="space-y-3">
                                  {currentQuestion.options.map((option, idx) => {
                                      const isSelected = selectedOptionIdx === idx;
                                      return (
                                        <button
                                            key={idx}
                                            onClick={() => handleSelectOption(idx)}
                                            className={`w-full text-left p-4 rounded-xl border transition-all group flex items-start gap-3 ${
                                              isSelected
                                                ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-200'
                                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                                            }`}
                                        >
                                            <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 transition-all mt-0.5 ${
                                              isSelected
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'border-gray-300 text-gray-400 group-hover:border-blue-400 group-hover:text-blue-500'
                                            }`}>
                                                {option.label}
                                            </div>
                                            <span className={`transition-colors text-sm ${
                                              isSelected ? 'text-slate-900 font-medium' : 'text-gray-600 group-hover:text-slate-900'
                                            }`}>
                                                {option.text}
                                            </span>
                                        </button>
                                      );
                                  })}
                              </div>

                              {/* Tombol Selanjutnya */}
                              <div className="mt-6 flex justify-end">
                                <button
                                  onClick={handleConfirmNext}
                                  disabled={selectedOptionIdx === null}
                                  className="btn-primary flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                >
                                  {currentIndex === questions.length - 1 ? 'Lihat Hasil' : 'Selanjutnya'}
                                  <ChevronRight size={16} />
                                </button>
                              </div>
                          </motion.div>
                      </AnimatePresence>
                    </>
                  )}
                </div>

                {/* Navigation Step 1 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-between mt-8"
                >
                  <div className="flex items-center gap-2 sm:gap-4">
                    <Link href="/" className="btn-ghost flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
                      <Home size={16} /> Home
                    </Link>
                    <button onClick={handleBackToResults} className="btn-ghost flex items-center gap-1 text-sm">
                      <ChevronLeft size={16} /> Hasil
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="glass-card p-12 flex flex-col items-center justify-center gap-4 text-center">
                  {syncError ? (
                    <>
                      <div className="w-16 h-16 rounded-full border-4 border-red-200 border-t-red-600 flex items-center justify-center mb-4">
                        <span className="text-red-600 text-2xl font-bold">!</span>
                      </div>
                      <h3 className="text-xl font-bold text-red-600">Gagal Menyimpan Hasil</h3>
                      <p className="text-sm text-slate-500 max-w-sm">{syncError}</p>
                      <div className="flex gap-4 mt-4">
                        <button 
                          onClick={() => setSyncError(null)}
                          className="btn-primary"
                        >
                          Coba Lagi
                        </button>
                        <button 
                          onClick={() => setStep(1)}
                          className="btn-ghost"
                        >
                          Kembali
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin mb-4" />
                      <h3 className="text-xl font-bold text-slate-800 animate-pulse">Menyimpan Hasil Asesmen...</h3>
                      <p className="text-sm text-slate-500 animate-pulse">Mohon tunggu sebentar, kami sedang menyiapkan halaman detail hasilmu.</p>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
