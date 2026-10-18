import { NextResponse } from "next/server";
import { db } from "@/db";
import { assessmentResults, roadmapProgress } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/auth";
import { z } from "zod";
import { findCareerProfile, CAREER_PROFILES } from "@/data/gaplessData";
import { checkModuleSequence, MIN_STUDY_SECONDS } from "@/lib/roadmapSequence";
import { hasActivePro } from "@/lib/payment_service";

const RequestSchema = z.object({
  assessmentId: z.string().min(1, "Missing assessmentId"),
  moduleSlug: z.string().min(1, "Missing moduleSlug"),
  resourceIndex: z.number().optional(),
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

    const { assessmentId, moduleSlug, resourceIndex } = validationResult.data;

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

    // 4. Cek Sesi Belajar per resource
    const studySessions = (moduleStatuses._study_sessions as Record<string, any>) || {};
    const sessionData = studySessions[moduleSlug];
    const completedResourcesMap = (moduleStatuses._completed_resources as Record<string, number[]>) || {};
    const currentCompleted = [...(completedResourcesMap[moduleSlug] || [])];

    if (!sessionData) {
      return NextResponse.json({
        success: true,
        completed: moduleStatuses[moduleSlug] === true,
        isStudying: false,
        completedResources: currentCompleted,
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

    if (newlyCompleted) {
      // Tandai modul ini selesai di roadmap dan simpan resource yang selesai
      const updatedSessions = {
        ...studySessions,
        [moduleSlug]: {
          ...sessionData,
          resources: updatedResources,
        },
      };

      const updatedStatuses = {
        ...moduleStatuses,
        [moduleSlug]: true,
        _completed_resources: {
          ...completedResourcesMap,
          [moduleSlug]: currentCompleted,
        },
        _study_sessions: updatedSessions,
      };

      await db
        .update(roadmapProgress)
        .set({
          moduleStatuses: updatedStatuses,
          updatedAt: new Date(),
        })
        .where(eq(roadmapProgress.id, progress.id));

      return NextResponse.json({
        success: true,
        completed: true,
        isStudying: Object.keys(updatedResources).length > 0,
        completedResources: currentCompleted,
        message: "Selamat! Materi telah berhasil dipelajari.",
      });
    }

    const hasActivePending = Object.keys(updatedResources).length > 0;

    return NextResponse.json({
      success: true,
      completed: moduleStatuses[moduleSlug] === true,
      isStudying: hasActivePending,
      completedResources: currentCompleted,
      message: hasActivePending ? "Materi sedang dipelajari." : "Sesi belajar telah selesai.",
    });
  } catch (error) {
    console.error("Error checking study session:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
