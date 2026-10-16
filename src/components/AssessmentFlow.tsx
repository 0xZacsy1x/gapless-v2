'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, ChevronRight, ChevronLeft, BarChart3, Loader2, RotateCcw } from 'lucide-react';
import { ASSESSMENT_QUESTIONS, type AssessmentOption } from '@/data/gaplessData';
import { useGaplessContext } from '@/contexts/CareerContext';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import {
  saveAssessmentDraft,
  loadAssessmentDraft,
  clearAssessmentDraft,
} from '@/lib/assessmentDraft';

import { Navbar } from '@/components/Navbar';

// Fisher-Yates shuffle — creates a new shuffled array
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function AssessmentFlow() {
  const { answers, setAnswers, setAnswer, setView, quizType, syncResultNow } =
    useGaplessContext();
  const { session } = useAuthGuard();
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const [showRetakeModal, setShowRetakeModal] = useState(false);
  const [isCheckingActive, setIsCheckingActive] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [isRestoredFromDraft, setIsRestoredFromDraft] = useState(false);

  const question = ASSESSMENT_QUESTIONS[currentIdx];
  const total = ASSESSMENT_QUESTIONS.length;
  const progress = ((currentIdx + 1) / total) * 100;

  // Shuffle options once on mount — stable per session, restored if draft exists
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<
    Record<number, { originalIndex: number; option: AssessmentOption }[]>
  >(() => {
    const map: Record<number, { originalIndex: number; option: AssessmentOption }[]> = {};
    for (const q of ASSESSMENT_QUESTIONS) {
      const indexed = q.options.map((opt, idx) => ({ originalIndex: idx, option: opt }));
      map[q.id] = shuffleArray(indexed);
    }
    return map;
  });

  // ── Restore Draft on Mount (useEffect to prevent hydration mismatch) ──
  useEffect(() => {
    const draft = loadAssessmentDraft(quizType || 'belum_tahu_minat', session?.user?.id);
    if (draft && Object.keys(draft.answers).length > 0) {
      const numericAnswers: Record<number, number> = {};
      Object.entries(draft.answers).forEach(([k, v]) => {
        numericAnswers[Number(k)] = v;
      });
      setAnswers(numericAnswers);
      setCurrentIdx(Math.min(draft.currentIndex, total - 1));
      setStarted(true);
      setIsRestoredFromDraft(true);

      if (draft.shuffledOptionsOrder) {
        const restoredMap: Record<number, { originalIndex: number; option: AssessmentOption }[]> = {};
        for (const q of ASSESSMENT_QUESTIONS) {
          const order = draft.shuffledOptionsOrder[q.id.toString()] || draft.shuffledOptionsOrder[q.id];
          if (order && Array.isArray(order) && order.length === q.options.length) {
            restoredMap[q.id] = order.map((origIdx) => ({
              originalIndex: origIdx,
              option: q.options[origIdx],
            }));
          }
        }
        if (Object.keys(restoredMap).length > 0) {
          setShuffledOptionsMap((prev) => ({ ...prev, ...restoredMap }));
        }
      }
    }
  }, [quizType, session?.user?.id, setAnswers, total]);

  // ── Auto-Save Draft on Change ──
  useEffect(() => {
    if (!started || Object.keys(answers).length === 0) return;
    const stringAnswers: Record<string, number> = {};
    Object.entries(answers).forEach(([k, v]) => {
      stringAnswers[k] = v;
    });

    const orderMap: Record<string, number[]> = {};
    Object.entries(shuffledOptionsMap).forEach(([qid, list]) => {
      orderMap[qid] = list.map((item) => item.originalIndex);
    });

    saveAssessmentDraft({
      quizType: quizType || 'belum_tahu_minat',
      userId: session?.user?.id,
      currentIndex: currentIdx,
      answers: stringAnswers,
      shuffledOptionsOrder: orderMap,
    });
  }, [answers, currentIdx, started, quizType, session?.user?.id, shuffledOptionsMap]);

  const handleResetDraft = () => {
    clearAssessmentDraft(quizType || 'belum_tahu_minat', session?.user?.id);
    setAnswers({});
    setCurrentIdx(0);
    setIsRestoredFromDraft(false);
    setSyncError(null);
  };

  const currentShuffledOptions =
    shuffledOptionsMap[question.id] ||
    question.options.map((opt, idx) => ({ originalIndex: idx, option: opt }));

  const handleSelect = (optionIndex: number) => {
    setAnswer(question.id, optionIndex);
  };

  const handleNext = () => {
    if (currentIdx < total - 1) {
      setCurrentIdx((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((i) => i - 1);
    }
  };

  const handleFinish = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncError(null);
    try {
      await syncResultNow();
      clearAssessmentDraft(quizType || 'belum_tahu_minat', session?.user?.id);
      setView('results');
    } catch (e) {
      console.warn('Background sync failed, continuing to results view', e);
      setSyncError('Gagal menyimpan hasil asesmen. Silakan coba klik Lihat Hasil lagi.');
    } finally {
      setIsSyncing(false);
    }
  };

  // ── Start Screen ──
  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-space px-6 relative overflow-hidden">
        {/* Animated Navbar (Disappears upwards when assessment starts) */}
        <AnimatePresence>
          {!started && (
            <motion.header
              key="assessment-navbar"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ 
                opacity: 0, 
                y: -80, 
                transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } 
              }}
              className="w-full absolute top-0 left-0 right-0 z-50"
            >
              <Navbar />
            </motion.header>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center max-w-lg pt-16 sm:pt-0"
        >
          <div
            className="flex items-center justify-center w-20 h-20 rounded-2xl mx-auto mb-6"
            style={{
              background: 'linear-gradient(135deg, #1d4ed8, #3b82f6, #22d3ee)',
              boxShadow: '0 0 40px rgba(37,99,235,0.3)',
            }}
          >
            <Brain size={36} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            <span className="gradient-text">Assesmen</span> Karir
          </h1>
          <p className="text-gray-500 text-lg mb-4 leading-relaxed">
            Jawab 15 pertanyaan untuk menemukan trait karir dominanmu dan temukan
            jalur karir yang paling cocok untukmu.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            100% client-side &middot; Tidak ada data yang keluar dari browsermu &middot; ~3 menit
          </p>
          <button
            onClick={async () => {
              setIsCheckingActive(true);
              try {
                const res = await fetch(`/api/assessment/has-active?quizType=${quizType}`);
                const data = await res.json();
                if (data.hasActive) {
                  setShowRetakeModal(true);
                } else {
                  setStarted(true);
                }
              } catch (e) {
                setStarted(true);
              } finally {
                setIsCheckingActive(false);
              }
            }}
            disabled={isCheckingActive}
            className="btn-primary flex items-center gap-2 mx-auto text-base disabled:opacity-70 cursor-pointer shadow-md hover:shadow-lg"
          >
            <Brain size={18} />
            {isCheckingActive ? 'Memuat...' : 'Mulai Assesmen'}
          </button>
        </motion.div>

        {/* Retake Modal */}
        <AnimatePresence>
          {showRetakeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-card w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-cyan-400" />
                <h2 className="text-xl font-bold text-white mb-3">Konfirmasi Retake</h2>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  Kamu akan mengambil tes ini lagi. Hasil analisis kamu akan diperbarui. Kalau rekomendasi kariernya beda dari sebelumnya, progress roadmap lama kamu tetap tersimpan tapi untuk sementara tidak ditampilkan. Lanjutkan?
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setShowRetakeModal(false)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      setShowRetakeModal(false);
                      setStarted(true);
                    }}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors border border-blue-500/30 cursor-pointer"
                  >
                    Ya, Lanjutkan
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── Question Flow (No completion screen interception on question 15) ──
  return (
    <div className="min-h-screen bg-space px-4 sm:px-6 py-12 flex flex-col justify-between">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Brain size={20} style={{ color: '#1d4ed8' }} />
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
              Assesmen
            </span>
          </div>
          <span className="text-sm text-gray-400">
            {currentIdx + 1} / {total}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="progress-track mb-6">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Restored from Draft Banner */}
        {isRestoredFromDraft && (
          <div className="mb-4 p-3 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-between text-xs text-blue-900 shadow-xs">
            <div className="flex items-center gap-2">
              <RotateCcw size={14} className="text-blue-600 shrink-0" />
              <span>Dilanjutkan dari pertanyaan {currentIdx + 1}</span>
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

        {/* Dimension Badge */}
        <div className="mb-4">
          <span
            className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
            style={{
              background: 'rgba(37,99,235,0.08)',
              color: '#3b82f6',
            }}
          >
            {question.dimension}
          </span>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 leading-relaxed">
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentShuffledOptions.map((item, displayIdx) => {
                const isSelected = answers[question.id] === item.originalIndex;
                return (
                  <motion.button
                    key={item.option.label + '-' + item.originalIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: displayIdx * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(item.originalIndex)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 flex items-start gap-4 ${
                      isSelected
                        ? 'option-card selected'
                        : 'option-card'
                    }`}
                  >
                    <span
                      className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-sm font-bold"
                      style={{
                        background: isSelected
                          ? 'rgba(37,99,235,0.12)'
                          : '#f1f5f9',
                        color: isSelected ? '#1d4ed8' : '#94a3b8',
                      }}
                    >
                      {['A', 'B', 'C', 'D'][displayIdx]}
                    </span>
                    <span
                      className="text-sm sm:text-base leading-relaxed pt-1"
                      style={{
                        color: isSelected ? '#1e293b' : '#64748b',
                      }}
                    >
                      {item.option.text}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Error notification if submit fails */}
        {syncError && (
          <div className="mt-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center justify-between">
            <span>{syncError}</span>
            <button onClick={() => setSyncError(null)} className="font-bold ml-2">Tutup</button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 text-sm cursor-pointer"
          >
            <ChevronLeft size={16} />
            Sebelumnya
          </button>

          {currentIdx === total - 1 ? (
            <button
              type="button"
              onClick={handleFinish}
              disabled={answers[question.id] === undefined || isSyncing}
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
                  <BarChart3 size={16} />
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={answers[question.id] === undefined}
              className="btn-primary flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>Selanjutnya</span>
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
