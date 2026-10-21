import { NextResponse } from "next/server";
import { db } from "@/db";
import { assessmentResults, roadmapProgress, aiModuleInsights } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/auth";
import { z } from "zod";
import { findCareerProfile, CAREER_PROFILES, MODULE_DETAILS } from "@/data/gaplessData";
import { getCuratedModuleDetail } from "@/lib/curatedLearningResources";
import { checkModuleSequence, MIN_STUDY_SECONDS } from "@/lib/roadmapSequence";
import { hasActivePro } from "@/lib/payment_service";

const RequestSchema = z.object({
  assessmentId: z.string().min(1, "Missing assessmentId"),
  moduleSlug: z.string().min(1, "Missing moduleSlug"),
  resourceIndex: z.number().optional(),
  totalResources: z.number().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rawBody = await req.json();
    const validationResult = RequestSchema.safeParse(rawBody);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Bad Request", details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const { assessmentId, moduleSlug, resourceIndex, totalResources: clientTotal } = validationResult.data;

    // 1. Ambil data asesmen milik user
    const assessment = await db.query.assessmentResults.findFirst({
      where: and(
        eq(assessmentResults.id, assessmentId),
        eq(assessmentResults.userId, session.user.id)
      ),
    });

    if (!assessment || !assessment.selectedCareer) {
      return NextResponse.json(
        { error: "Asesmen tidak ditemukan atau karier belum dipilih" },
        { status: 404 }
      );
    }

    const careerSlug =
      assessment.careerSlug ||
      assessment.selectedCareer.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const profile =
      findCareerProfile(careerSlug) ||
      findCareerProfile(assessment.selectedCareer) ||
      CAREER_PROFILES[0];

    // 2. Ambil roadmap progress
    const progress = await db.query.roadmapProgress.findFirst({
      where: and(
        eq(roadmapProgress.careerSlug, careerSlug),
        eq(roadmapProgress.userId, session.user.id)
      ),
    });

    if (!progress) {
      return NextResponse.json({ error: "Progress belum diinisialisasi" }, { status: 404 });
    }

    const moduleStatuses = (progress.moduleStatuses as Record<string, any>) || {};
    const skillRatings = (assessment.skillRatings as Record<string, number>) || {};

    // 3. Validasi urutan (Sequence Gating)
    const isPro = await hasActivePro(session.user.id);
    const sequenceCheck = checkModuleSequence({
      profile,
      moduleSlug,
      moduleStatuses,
      skillRatings,
      isPro,
    });

    if (!sequenceCheck.isUnlocked) {
      return NextResponse.json(
        {
          error: "Forbidden",
          message: sequenceCheck.reason || "Modul ini masih terkunci.",
        },
        { status: 403 }
      );
    }

    // 4. Hitung total materi yang harus diselesaikan di modul ini
    let expectedTotal = clientTotal && clientTotal > 0 ? clientTotal : 0;
    if (!expectedTotal) {
      const curated = getCuratedModuleDetail({
        moduleSlug,
        moduleTitle: moduleSlug,
        careerSlug,
        roleName: profile.title,
      });
      expectedTotal = curated.resources.length || 4;
    }

    // 5. Cek Sesi Belajar per resource
    const studySessions = (moduleStatuses._study_sessions as Record<string, any>) || {};
    const sessionData = studySessions[moduleSlug];
    const completedResourcesMap = (moduleStatuses._completed_resources as Record<string, number[]>) || {};
    const currentCompleted = [...(completedResourcesMap[moduleSlug] || [])];

    if (!sessionData) {
      const isModuleFullyCompleted = currentCompleted.length >= expectedTotal;
      return NextResponse.json({
        success: true,
        completed: isModuleFullyCompleted,
        moduleCompleted: isModuleFullyCompleted,
        newlyCompletedResource: false,
        isStudying: false,
        activeResources: [],
        completedResources: currentCompleted,
        totalResources: expectedTotal,
        message: "Tidak ada sesi belajar aktif.",
      });
    }

    const now = Date.now();
    const updatedResources = { ...(sessionData.resources || {}) };

    // Migrasi sesi lama yang hanya punya startedAt & resourceIndex
    if (Object.keys(updatedResources).length === 0 && sessionData.startedAt) {
      const idx = sessionData.resourceIndex ?? 0;
      updatedResources[idx] = sessionData.startedAt;
    }

    let newlyCompleted = false;

    // Evaluasi durasi belajar untuk setiap resource yang aktif
    for (const [resIdxStr, startTime] of Object.entries(updatedResources)) {
      const resIdx = parseInt(resIdxStr, 10);
      const elapsed = Math.floor((now - Number(startTime)) / 1000);

      if (elapsed >= MIN_STUDY_SECONDS) {
        if (!currentCompleted.includes(resIdx)) {
          currentCompleted.push(resIdx);
          newlyCompleted = true;
        }
        delete updatedResources[resIdx];
      }
    }

    const isModuleFullyCompleted = currentCompleted.length >= expectedTotal;

    if (newlyCompleted) {
      // Simpan resource yang selesai & update status modul jika ke-4 materi sudah tuntas
      const updatedSessions = {
        ...studySessions,
        [moduleSlug]: {
          ...sessionData,
          resources: updatedResources,
        },
      };

      const updatedStatuses: Record<string, any> = {
        ...moduleStatuses,
        _completed_resources: {
          ...completedResourcesMap,
          [moduleSlug]: currentCompleted,
        },
        _study_sessions: updatedSessions,
      };

      if (isModuleFullyCompleted) {
        updatedStatuses[moduleSlug] = true;
      } else {
        delete updatedStatuses[moduleSlug];
      }

      await db
        .update(roadmapProgress)
        .set({
          moduleStatuses: updatedStatuses,
          updatedAt: new Date(),
        })
        .where(eq(roadmapProgress.id, progress.id));

      const activeIndices = Object.keys(updatedResources).map((k) => parseInt(k, 10));
      return NextResponse.json({
        success: true,
        completed: isModuleFullyCompleted,
        moduleCompleted: isModuleFullyCompleted,
        newlyCompletedResource: true,
        isStudying: Object.keys(updatedResources).length > 0,
        activeResources: activeIndices,
        completedResources: currentCompleted,
        totalResources: expectedTotal,
        message: isModuleFullyCompleted
          ? "Selamat! Seluruh materi modul ini telah selesai dipelajari."
          : "Materi berhasil diselesaikan! Lanjutkan materi berikutnya.",
      });
    }

    // Auto-heal status lama jika moduleStatuses[moduleSlug] terlanjur true padahal belum semua materi selesai
    if (moduleStatuses[moduleSlug] === true && !isModuleFullyCompleted) {
      const cleanedStatuses = { ...moduleStatuses };
      delete cleanedStatuses[moduleSlug];
      await db
        .update(roadmapProgress)
        .set({
          moduleStatuses: cleanedStatuses,
          updatedAt: new Date(),
        })
        .where(eq(roadmapProgress.id, progress.id));
    }

    const hasActivePending = Object.keys(updatedResources).length > 0;
    const activeIndices = Object.keys(updatedResources).map((k) => parseInt(k, 10));

    return NextResponse.json({
      success: true,
      completed: isModuleFullyCompleted,
      moduleCompleted: isModuleFullyCompleted,
      newlyCompletedResource: false,
      isStudying: hasActivePending,
      activeResources: activeIndices,
      completedResources: currentCompleted,
      totalResources: expectedTotal,
      message: hasActivePending ? "Materi sedang dipelajari." : "Sesi belajar telah selesai.",
    });
  } catch (error) {
    console.error("Error checking study session:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
