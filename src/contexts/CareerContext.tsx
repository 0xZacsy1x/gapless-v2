'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { useAuthGuard } from '@/hooks/useAuthGuard';

import {
  type Trait,
  type CareerProfile,
  type CurriculumPhase,
  ASSESSMENT_QUESTIONS,
  computeTraitScores,
  getDominantTrait,
  getTraitRadarData,
  getSkillGapData,
  getRecommendedCareers,
  findCareerProfile,
} from '@/data/gaplessData';

// ──────────────────────────────────────────────
// Database Types
// ──────────────────────────────────────────────

export type JobRole = {
  id: string;
  dimension: string;
  roleName: string;
  salaryRange: string | null;
  companies: string[] | null;
  hardSkills: string[] | null;
  softSkills: string[] | null;
};

// ──────────────────────────────────────────────
// View navigation
// ──────────────────────────────────────────────

export type GaplessView = 'assessment' | 'results' | 'skills' | 'roadmap' | 'case-study' | 'module-detail' | 'selection';

// ──────────────────────────────────────────────
// AI Insight types
// ──────────────────────────────────────────────

export interface AiInsight {
  personality_summary: string;
  reasoning: string;
  traits: string[];
  strengths: string[];
  ai_engine_used?: string;
}

export interface GapInsight {
  basis_penilaian: string;
  kesesuaian: string[];
  kekurangan: string[];
  catatan_singkat: string;
  ai_engine_used?: string;
}

// ──────────────────────────────────────────────
// Skill-gap enrichment types
// ──────────────────────────────────────────────

export interface SkillGapEntry {
  name: string;
  required: number;
  current: number;
  delta: number;
}

export interface RoadmapNode extends CurriculumPhase {
  completedModules: string[];
  progress: number; // 0-1 fraction
}

// ──────────────────────────────────────────────
// Context shape
// ──────────────────────────────────────────────

export interface GaplessContextValue {
  // ── Navigation ──
  currentView: GaplessView;
  setCurrentView: Dispatch<SetStateAction<GaplessView>>;
  setView: (v: GaplessView) => void;

  // ── Assessment ──
  answers: Record<number, number>;
  setAnswers: (answers: Record<number, number> | ((prev: Record<number, number>) => Record<number, number>)) => void;
  setAnswer: (questionId: number, optionIndex: number) => void;
  completedQuestions: number;
  isAssessmentComplete: boolean;

  // ── Trait results (computed from answers) ──
  traitScores: Record<Trait, number>;
  dominantTrait: Trait | null;
  traitRadarData: ReturnType<typeof getTraitRadarData>;
  recommendedCareers: CareerProfile[];

  // ── AI Insight ──
  aiInsight: AiInsight | null;
  isLoadingAi: boolean;
  aiError: string | null;
  fetchAiInsight: () => Promise<void>;

  // ── Gap Insight ──
  gapInsight: GapInsight | null;
  isLoadingGapAi: boolean;
  gapAiError: string | null;
  fetchGapInsight: () => Promise<void>;

  // ── Career selection (Assessment flow) ──
  selectedCareer: CareerProfile | null;
  selectCareer: (career: CareerProfile, targetView?: GaplessView) => void;

  // ── Role selection (Database flow) ──
  selectedRole: JobRole | null;
  setSelectedRole: (role: JobRole | null) => void;

  // ── Skill self-ratings ──
  skillRatings: Record<string, number>;
  setSkillRating: (skillName: string, level: number) => void;
  setSkillRatings: (ratings: Record<string, number>) => void;
  selectedModuleSlug: string | null;
  setSelectedModuleSlug: (slug: string | null) => void;
  currentAssessmentId: string | null;
  setCurrentAssessmentId: (id: string | null) => void;
  quizType: string;
  setQuizType: (type: string) => void;
  resetProgress: () => Promise<void>;
  skillGapData: SkillGapEntry[];
  allSkillsRated: boolean;
  syncResultNow: (overrideData?: { skillRatings?: Record<string, number>; rawAnswers?: Record<any, any> }) => Promise<string | undefined>;

  // ── Roadmap ──
  roadmapWithProgress: RoadmapNode[];

  // ── Reset ──
  reset: () => void;
}

// ──────────────────────────────────────────────
// Empty / default state
// ──────────────────────────────────────────────

const CareerContext = createContext<GaplessContextValue | null>(null);

// ──────────────────────────────────────────────
// Hook
// ──────────────────────────────────────────────

export function useGaplessContext() {
  const ctx = useContext(CareerContext);
  if (!ctx) {
    throw new Error('useGaplessContext must be used within GaplessProvider');
  }
  return ctx;
}

// ──────────────────────────────────────────────
// Provider
// ──────────────────────────────────────────────

export function GaplessProvider({ children }: { children: ReactNode }) {
  const { session } = useAuthGuard();
  const userTier = (session?.user as { tier?: string })?.tier || 'Free';
  const isPro = Boolean(userTier && (userTier.toLowerCase().includes('pro') || userTier.toLowerCase().includes('premium')));


  // ── Navigation ──
  const [currentView, setCurrentView] = useState<GaplessView>(() => {
    if (typeof window !== 'undefined') {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const qType = urlParams.get('quizType') || localStorage.getItem('gapless:active_quiz_type');
        if (qType === 'sudah_tahu_minat') {
          return 'case-study';
        }
      } catch (e) {}
    }
    return 'assessment';
  });

  // ── Assessment answers ──
  const [answers, setAnswersState] = useState<Record<number, number>>({});
  const [currentAssessmentId, setCurrentAssessmentId] = useState<string | null>(null);
  const [quizType, setQuizType] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('quizType') || localStorage.getItem('gapless:active_quiz_type') || 'belum_tahu_minat';
      } catch (e) {}
    }
    return 'belum_tahu_minat';
  });

  const setAnswers = useCallback((newAnswers: Record<number, number> | ((prev: Record<number, number>) => Record<number, number>)) => {
    setAnswersState(newAnswers);
    // If resetting answers, also reset current assessment ID so it creates a new row
    if (Object.keys(newAnswers).length === 0) {
      setCurrentAssessmentId(null);
    }
  }, []);

  // ── Career selection (Assessment flow) ──
  const [selectedCareer, setSelectedCareer] = useState<CareerProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('gapless:selected_career');
        if (saved) return JSON.parse(saved);
        const urlParams = new URLSearchParams(window.location.search);
        const role = urlParams.get('role');
        if (role) return findCareerProfile(role) || null;
      } catch (e) {}
    }
    return null;
  });

  // ── Role selection (Database flow) ──
  const [selectedRole, setSelectedRoleState] = useState<JobRole | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('gapless:selected_role');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return null;
  });

  const setSelectedRole = useCallback((role: JobRole | null) => {
    setSelectedRoleState(role);
    if (typeof window !== 'undefined') {
      try {
        if (role) {
          localStorage.setItem('gapless:selected_role', JSON.stringify(role));
        } else {
          localStorage.removeItem('gapless:selected_role');
        }
      } catch (e) {}
    }
  }, []);

  const [selectedModuleSlug, setSelectedModuleSlug] = useState<string | null>(null);

  // ── Skill self-ratings ──
  const [skillRatings, setSkillRatingsState] = useState<Record<string, number>>(
    {}
  );

  // ── AI Insight ──
  const [aiInsight, setAiInsight] = useState<AiInsight | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // ── Gap Insight ──
  const [gapInsight, setGapInsight] = useState<GapInsight | null>(null);
  const [isLoadingGapAi, setIsLoadingGapAi] = useState(false);
  const [gapAiError, setGapAiError] = useState<string | null>(null);

  // ── Locks for Anti-Spam ──
  const fetchLock = useRef(false);
  const fetchGapLock = useRef(false);
  const lastFetchedAnswers = useRef<string>('');
  const lastFetchedGap = useRef<string>('');

  // ── Derived: trait scores ──
  const traitScores = useMemo(() => computeTraitScores(answers), [answers]);

  // ── Derived: dominant trait ──
  const dominantTrait = useMemo(() => {
    if (quizType === 'sudah_tahu_minat' && selectedCareer) {
      return selectedCareer.trait;
    }
    return getDominantTrait(traitScores);
  }, [traitScores, quizType, selectedCareer]);

  // ── Derived: radar chart data ──
  const traitRadarData = useMemo(() => getTraitRadarData(traitScores), [traitScores]);

  // ── Derived: completed questions count ──
  const completedQuestions = useMemo(
    () => Object.keys(answers).length,
    [answers]
  );

  // ── Derived: is assessment complete ──
  const isAssessmentComplete = useMemo(
    () => completedQuestions === ASSESSMENT_QUESTIONS.length,
    [completedQuestions]
  );

  // ── Derived: recommended careers ──
  const recommendedCareers = useMemo(
    () => getRecommendedCareers(dominantTrait),
    [dominantTrait]
  );

  // ── Derived: skill gap data ──
  const skillGapData = useMemo(() => {
    if (!selectedCareer) return [];
    return getSkillGapData(selectedCareer, skillRatings);
  }, [selectedCareer, skillRatings]);

  // ── Derived: all skills rated ──
  const allSkillsRated = useMemo(() => {
    if (!selectedCareer) return false;
    return selectedCareer.skills.every(
      (s) => skillRatings[s.name] !== undefined
    );
  }, [selectedCareer, skillRatings]);

  // ── Derived: roadmap with progress ──
  const roadmapWithProgress = useMemo<RoadmapNode[]>(() => {
    if (!selectedCareer) return [];

    return selectedCareer.roadmap.map((phase, phaseIdx) => {
      const isLockedPhase = !isPro && phaseIdx >= 2;
      
      if (isLockedPhase) {
        // Redact premium content completely before sending to components
        return {
          ...phase,
          title: 'Lanjutan',
          subtitle: 'Materi lanjutan untuk memaksimalkan potensimu.',
          description: 'Pelajari materi lebih dalam dengan praktik industri nyata.',
          modules: phase.modules.map((_, i) => `Materi Premium ${i + 1}`),
          completedModules: [],
          progress: 0,
        };
      }

      const completedModules = phase.modules.filter((_module, idx) => {
        const skill = selectedCareer.skills[idx % selectedCareer.skills.length];
        if (!skill) return false;
        const userLevel = skillRatings[skill.name] ?? 0;
        return userLevel >= skill.required;
      });

      return {
        ...phase,
        completedModules,
        progress:
          phase.modules.length > 0
            ? completedModules.length / phase.modules.length
            : 0,
      };
    });
  }, [selectedCareer, skillRatings, isPro]);

  // ── Actions ──

  const setView = useCallback((v: GaplessView) => {
    setCurrentView(v);
  }, []);

  const setAnswer = useCallback((questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }, [setAnswers]);

  const selectCareer = useCallback((career: CareerProfile, targetView?: GaplessView) => {
    setSelectedCareer(career);
    setSkillRatingsState({});
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('gapless:selected_career', JSON.stringify(career));
      } catch (e) {}
    }
    if (targetView) {
      setCurrentView(targetView);
    } else {
      setCurrentView((prev) => (prev === 'case-study' ? 'case-study' : 'skills'));
    }
  }, []);

  const setSkillRating = useCallback((skillName: string, level: number) => {
    setSkillRatingsState((prev) => ({ ...prev, [skillName]: level }));
  }, []);

  const setSkillRatings = useCallback((ratings: Record<string, number>) => {
    setSkillRatingsState((prev) => ({ ...prev, ...ratings }));
  }, []);

  const fetchAiInsight = useCallback(async () => {
    const currentAnswersStr = JSON.stringify(answers);

    if (
      aiInsight || 
      fetchLock.current || 
      lastFetchedAnswers.current === currentAnswersStr
    ) {
      return;
    }

    fetchLock.current = true;
    lastFetchedAnswers.current = currentAnswersStr;
    
    setIsLoadingAi(true);
    setAiError(null);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60_000);

      const res = await fetch('/api/analyze?ai=gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          traitScores,
          dominantTrait,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) throw new Error('Analisis AI gagal');

      const data: AiInsight = await res.json();
      setAiInsight(data);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setAiError('Analisis AI habis waktu');
      } else {
        setAiError(err instanceof Error ? err.message : 'Error tidak diketahui');
      }
    } finally {
      setIsLoadingAi(false);
      fetchLock.current = false;
    }
  }, [answers, traitScores, dominantTrait, aiInsight]); 

  const fetchGapInsight = useCallback(async () => {
    if (!selectedCareer || !skillGapData.length) return;

    const currentGapStr = JSON.stringify(skillGapData.map(g => ({n: g.name, u: g.current, r: g.required})));

    if (
      gapInsight || 
      fetchGapLock.current || 
      lastFetchedGap.current === currentGapStr
    ) {
      return;
    }

    fetchGapLock.current = true;
    lastFetchedGap.current = currentGapStr;
    
    setIsLoadingGapAi(true);
    setGapAiError(null);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60_000);

      const res = await fetch('/api/analyze-gap?ai=gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillGapData,
          roleName: selectedCareer.title,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) throw new Error('Analisis Gap gagal');

      const data: GapInsight = await res.json();
      setGapInsight(data);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setGapAiError('Analisis Gap habis waktu');
      } else {
        setGapAiError(err instanceof Error ? err.message : 'Error tidak diketahui');
      }
    } finally {
      setIsLoadingGapAi(false);
      fetchGapLock.current = false;
    }
  }, [skillGapData, selectedCareer, gapInsight]);

  const reset = useCallback(() => {
    setCurrentView('assessment');
    setAnswers({});
    setSelectedCareer(null);
    setSelectedRole(null);
    setSkillRatingsState({});
    setAiInsight(null);
    setIsLoadingAi(false);
    setAiError(null);
    setGapInsight(null);
    setIsLoadingGapAi(false);
    setGapAiError(null);
    lastFetchedAnswers.current = '';
    lastFetchedGap.current = '';
    fetchLock.current = false;
    fetchGapLock.current = false;
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('gapless:active_quiz_type');
        localStorage.removeItem('gapless:active_role_slug');
        localStorage.removeItem('gapless:selected_role');
        localStorage.removeItem('gapless:selected_career');
      } catch (e) {}
    }
  }, [setAnswers]);

  const resetProgress = useCallback(async () => {
    setSkillRatingsState({});
  }, []);

  // ── Persistence & Auto-Sync ──

  const saveResultToServerOrLocal = useCallback(async (overrideData?: { skillRatings?: Record<string, number>; rawAnswers?: Record<any, any> }): Promise<string | undefined> => {
    if (quizType === 'belum_tahu_minat' && !dominantTrait) return undefined;
    if (quizType === 'sudah_tahu_minat' && !selectedCareer) return undefined;
    
    const finalSkillRatings = overrideData?.skillRatings || skillRatings;
    const finalAnswers = overrideData?.rawAnswers || answers;

    const payload = {
      assessmentId: currentAssessmentId,
      rawAnswers: finalAnswers,
      traitScores,
      dominantTrait,
      selectedCareer: selectedCareer?.title || null,
      skillRatings: Object.keys(finalSkillRatings).length > 0 ? finalSkillRatings : null,
      quizType,
    };

    if (session?.user) {
      try {
        const res = await fetch('/api/assessment/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const data = await res.json();
          if (data.result?.id && !currentAssessmentId) {
            setCurrentAssessmentId(data.result.id);
          }
          return data.result?.id || currentAssessmentId;
        } else {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to sync result');
        }
      } catch (err) {
        console.error('Failed to sync result', err);
        throw err;
      }
    } else {
      localStorage.setItem('gapless_pending_result', JSON.stringify(payload));
    }
    return currentAssessmentId || undefined;
  }, [answers, traitScores, dominantTrait, selectedCareer, skillRatings, session, currentAssessmentId, quizType]);

  useEffect(() => {
    if (session?.user) {
      const pending = localStorage.getItem('gapless_pending_result');
      if (pending) {
        fetch('/api/assessment/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: pending
        }).then(res => {
          if (res.ok) {
            localStorage.removeItem('gapless_pending_result');
          }
        }).catch(err => console.error(err));
      }
    }
  }, [session]);

  // ── Context value ──

  const value = useMemo<GaplessContextValue>(
    () => ({
      currentView,
      setCurrentView,
      setView,
      answers,
      setAnswer,
      completedQuestions,
      isAssessmentComplete,
      traitScores,
      dominantTrait,
      traitRadarData,
      recommendedCareers,
      aiInsight,
      isLoadingAi,
      aiError,
      fetchAiInsight,
      gapInsight,
      isLoadingGapAi,
      gapAiError,
      fetchGapInsight,
      selectedCareer,
      selectCareer,
      selectedRole,
      setSelectedRole,
      skillRatings,
      setSkillRating,
      setSkillRatings,
      setAnswers,
      currentAssessmentId,
      setCurrentAssessmentId,
      selectedModuleSlug,
      setSelectedModuleSlug,
      quizType,
      setQuizType,
      resetProgress,
      skillGapData,
      allSkillsRated,
      roadmapWithProgress,
      reset,
      syncResultNow: saveResultToServerOrLocal,
    }),
    [
      currentView,
      traitScores,
      dominantTrait,
      traitRadarData,
      recommendedCareers,
      aiInsight,
      isLoadingAi,
      aiError,
      fetchAiInsight,
      gapInsight,
      isLoadingGapAi,
      gapAiError,
      fetchGapInsight,
      selectedCareer,
      selectCareer,
      selectedRole,
      setSelectedRole,
      skillRatings,
      setSkillRating,
      setSkillRatings,
      skillGapData,
      allSkillsRated,
      roadmapWithProgress,
      reset,
      answers,
      completedQuestions,
      currentAssessmentId,
      setCurrentAssessmentId,
      isAssessmentComplete,
      quizType,
      resetProgress,
      saveResultToServerOrLocal,
      selectedModuleSlug,
      setAnswers,
      setAnswer,
      setView,
    ]
  );

  return (
    <CareerContext.Provider value={value}>{children}</CareerContext.Provider>
  );
}