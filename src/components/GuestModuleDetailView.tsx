"use client";

import { useGaplessContext } from '@/contexts/CareerContext';
import ModuleDetailClient from '@/app/roadmap/[assessmentId]/modul/[moduleSlug]/ModuleDetailClient';
import { MODULE_DETAILS } from '@/data/gaplessData';
import { getCuratedModuleDetail } from '@/lib/curatedLearningResources';
import { Navbar } from '@/components/Navbar';

export function GuestModuleDetailView() {
  const context = useGaplessContext();
  const { selectedCareer, roadmapWithProgress, selectedModuleSlug, skillRatings } = context;

  if (!selectedCareer || !roadmapWithProgress || !selectedModuleSlug) {
    return <div className="p-8 text-center">Data modul tidak ditemukan.</div>;
  }

  // Find phase and module
  let phaseIndex = -1;
  let phaseData = null;
  let moduleName = "";
  let isCompleted = false;

  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  for (let i = 0; i < roadmapWithProgress.length; i++) {
    const phase = roadmapWithProgress[i];
    const modIdx = phase.modules.findIndex((m: string) => slugify(m) === selectedModuleSlug);
    
    if (modIdx !== -1) {
      phaseIndex = i;
      phaseData = phase;
      moduleName = phase.modules[modIdx];
      
      // Check if it's completed by skill
      const skill = selectedCareer.skills[modIdx % selectedCareer.skills.length];
      if (skill) {
        const userLevel = skillRatings[skill.name] ?? 0;
        if (userLevel >= skill.required) {
          isCompleted = true;
        }
      }
      break;
    }
  }

  if (!phaseData) {
    return <div className="p-8 text-center">Modul tidak ditemukan dalam roadmap.</div>;
  }

  // Get Detail Data
  const detailData = getCuratedModuleDetail({
    moduleSlug: selectedModuleSlug,
    moduleTitle: moduleName,
    careerSlug: selectedCareer.id,
    roleName: selectedCareer.title,
  });

  return (
    <div className="flex-1 w-full flex flex-col">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-12">
        <ModuleDetailClient
          assessmentId={context.currentAssessmentId || undefined}
          moduleSlug={selectedModuleSlug}
          profile={selectedCareer}
          phaseData={phaseData}
          phaseIndex={phaseIndex}
          detailData={detailData}
          moduleTitle={moduleName}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  );
}
