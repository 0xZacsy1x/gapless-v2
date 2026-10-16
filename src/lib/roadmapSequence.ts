import { CareerProfile } from '@/data/gaplessData';

export const MIN_STUDY_SECONDS = 120; // 2 menit waktu minimal belajar

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Cek apakah modul tertentu sudah selesai, baik dari riwayat manual DB (moduleStatuses)
 * atau dari hasil asesmen awal (skill level >= required level).
 */
export function isModuleDone(params: {
  moduleSlug: string;
  moduleIndexInPhase: number;
  profile: CareerProfile;
  moduleStatuses: Record<string, any>;
  skillRatings: Record<string, number>;
}): boolean {
  const { moduleSlug, moduleIndexInPhase, profile, moduleStatuses, skillRatings } = params;
  if (moduleStatuses[moduleSlug] === true) return true;

  if (profile.skills && profile.skills.length > 0) {
    const skill = profile.skills[moduleIndexInPhase % profile.skills.length];
    if (skill) {
      const userLevel = skillRatings[skill.name] ?? 0;
      if (userLevel >= skill.required) return true;
    }
  }

  return false;
}

export interface ModuleSequenceStatus {
  isUnlocked: boolean;
  reason?: string;
  targetPhaseIndex: number;
  targetModuleIndex: number;
  totalModules: number;
  priorModuleSlug?: string;
  moduleTitle?: string;
}

/**
 * Validasi apakah modul tertentu berhak diakses berdasarkan urutan kurikulum
 * (modul 1 fase 1 selalu terbuka, modul selanjutnya hanya terbuka jika modul tepat sebelumnya sudah selesai).
 */
export function checkModuleSequence(params: {
  profile: CareerProfile;
  moduleSlug: string;
  moduleStatuses: Record<string, any>;
  skillRatings: Record<string, number>;
  isPro: boolean;
}): ModuleSequenceStatus {
  const { profile, moduleSlug, moduleStatuses, skillRatings, isPro } = params;
  const roadmap = profile.roadmap;
  if (!roadmap || roadmap.length === 0) {
    return { isUnlocked: true, targetPhaseIndex: 0, targetModuleIndex: 0, totalModules: 0 };
  }

  // Cari index fase dan modul
  let targetPhaseIndex = -1;
  let targetModuleIndex = -1;
  let moduleTitle = '';

  for (let pi = 0; pi < roadmap.length; pi++) {
    const phase = roadmap[pi];
    const modIdx = phase.modules.findIndex((m: string) => slugify(m) === moduleSlug);
    if (modIdx !== -1) {
      targetPhaseIndex = pi;
      targetModuleIndex = modIdx;
      moduleTitle = phase.modules[modIdx];
      break;
    }
  }

  if (targetPhaseIndex === -1) {
    return {
      isUnlocked: false,
      reason: 'Modul tidak ditemukan dalam kurikulum',
      targetPhaseIndex: -1,
      targetModuleIndex: -1,
      totalModules: 0,
    };
  }

  const totalModules = roadmap.reduce((acc, p) => acc + p.modules.length, 0);

  // Gating Paket: Fase 3 & 4 (index 2 & 3) khusus Gapless Pro
  if (targetPhaseIndex >= 2 && !isPro) {
    return {
      isUnlocked: false,
      reason: 'Fase ini khusus member Gapless Pro',
      targetPhaseIndex,
      targetModuleIndex,
      totalModules,
      moduleTitle,
    };
  }

  // Modul pertama dari fase pertama SELALU terbuka untuk semua orang
  if (targetPhaseIndex === 0 && targetModuleIndex === 0) {
    return {
      isUnlocked: true,
      targetPhaseIndex,
      targetModuleIndex,
      totalModules,
      moduleTitle,
    };
  }

  // Cek seluruh fase sebelumnya: wajib selesai 100%
  for (let pi = 0; pi < targetPhaseIndex; pi++) {
    const prevPhase = roadmap[pi];
    for (let mi = 0; mi < prevPhase.modules.length; mi++) {
      const prevSlug = slugify(prevPhase.modules[mi]);
      const done = isModuleDone({
        moduleSlug: prevSlug,
        moduleIndexInPhase: mi,
        profile,
        moduleStatuses,
        skillRatings,
      });
      if (!done) {
        return {
          isUnlocked: false,
          reason: `Selesaikan seluruh modul di Fase ${pi + 1} (${prevPhase.title}) terlebih dahulu`,
          targetPhaseIndex,
          targetModuleIndex,
          totalModules,
          priorModuleSlug: prevSlug,
          moduleTitle,
        };
      }
    }
  }

  // Cek modul-modul sebelumnya di fase yang sama: wajib selesai
  for (let mi = 0; mi < targetModuleIndex; mi++) {
    const currPhase = roadmap[targetPhaseIndex];
    const prevSlug = slugify(currPhase.modules[mi]);
    const done = isModuleDone({
      moduleSlug: prevSlug,
      moduleIndexInPhase: mi,
      profile,
      moduleStatuses,
      skillRatings,
    });
    if (!done) {
      return {
        isUnlocked: false,
        reason: 'Selesaikan modul sebelumnya terlebih dahulu',
        targetPhaseIndex,
        targetModuleIndex,
        totalModules,
        priorModuleSlug: prevSlug,
        moduleTitle,
      };
    }
  }

  return {
    isUnlocked: true,
    targetPhaseIndex,
    targetModuleIndex,
    totalModules,
    moduleTitle,
  };
}
