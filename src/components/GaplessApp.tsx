'use client';

import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'motion/react';
import { AssessmentFlow } from '@/components/AssessmentFlow';
import { useGaplessContext } from '@/contexts/CareerContext';

// Definisikan tipe data dari database
export type JobRole = {
  id: string;
  dimension: string;
  roleName: string;
  salaryRange: string | null;
  companies: string[] | null;
  hardSkills: string[] | null;
  softSkills: string[] | null;
};

// Loading skeleton fallback yang seragam dan elegan
const ViewLoadingSkeleton = () => (
  <div className="min-h-screen bg-space px-4 sm:px-6 py-12 flex items-center justify-center">
    <div className="w-full max-w-3xl space-y-6 animate-pulse">
      <div className="h-8 w-64 bg-slate-200 rounded-lg mx-auto" />
      <div className="h-72 bg-white/80 rounded-3xl p-8 border border-slate-200 shadow-sm" />
    </div>
  </div>
);

// Lazy load sub-views yang hanya tampil di fase berikutnya
const ResultsView = dynamic(
  () => import('@/components/ResultsView').then((m) => m.ResultsView),
  { ssr: false, loading: ViewLoadingSkeleton }
);

const SkillGapView = dynamic(
  () => import('@/components/SkillGapView').then((m) => m.SkillGapView),
  { ssr: false, loading: ViewLoadingSkeleton }
);

const CaseStudyQuizView = dynamic(
  () => import('@/components/CaseStudyQuizView').then((m) => m.CaseStudyQuizView),
  { ssr: false, loading: ViewLoadingSkeleton }
);

const RoadmapView = dynamic(
  () => import('@/components/RoadmapView').then((m) => m.RoadmapView),
  { ssr: false, loading: ViewLoadingSkeleton }
);

const GuestModuleDetailView = dynamic(
  () => import('@/components/GuestModuleDetailView').then((m) => m.GuestModuleDetailView),
  { ssr: false, loading: ViewLoadingSkeleton }
);

import { Navbar } from '@/components/Navbar';

export function GaplessApp() {
  const { currentView } = useGaplessContext();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentView}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {currentView === 'assessment' && <AssessmentFlow />}
        {currentView === 'results' && <ResultsView />}
        {currentView === 'skills' && <SkillGapView />}
        {currentView === 'case-study' && <CaseStudyQuizView />}
        {currentView === 'roadmap' && (
          <div className="min-h-screen bg-space flex flex-col">
            <Navbar />
            <main className="flex-1">
              <RoadmapView />
            </main>
          </div>
        )}
        {currentView === 'module-detail' && <GuestModuleDetailView />}
      </motion.div>
    </AnimatePresence>
  );
}
