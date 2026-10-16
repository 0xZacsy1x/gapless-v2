import { NextResponse } from 'next/server';
import { db } from '@/db';
import { assessmentResults, roadmapProgress } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/auth';
import { z } from 'zod';
import { findCareerProfile, CAREER_PROFILES } from '@/data/gaplessData';
import { checkModuleSequence, MIN_STUDY_SECONDS } from '@/lib/roadmapSequence';
import { hasActivePro } from '@/lib/payment_service';

const RequestSchema = z.object({
  assessmentId: z.string().min(1, 'Missing assessmentId'),
  moduleSlug: z.string().min(1, 'Missing moduleSlug'),
  resourceIndex: z.number().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rawBody = await req.json();
    const validationResult = RequestSchema.safeParse(rawBody);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Bad Request', details: validationResult.error.format() },
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
        { error: 'Asesmen tidak ditemukan atau karier belum dipilih' },
        { status: 404 }
      );
    }

    const careerSlug =
      assessment.careerSlug ||
      assessment.selectedCareer.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const profile =
      findCareerProfile(careerSlug) ||
      findCareerProfile(assessment.selectedCareer) ||
      CAREER_PROFILES[0];

    // 2. Ambil roadmap progress
    let progress = await db.query.roadmapProgress.findFirst({
      where: and(
        eq(roadmapProgress.careerSlug, careerSlug),
        eq(roadmapProgress.userId, session.user.id)
      ),
    });

    if (!progress) {
      const [inserted] = await db
        .insert(roadmapProgress)
        .values({
          userId: session.user.id,
          careerSlug,
          moduleStatuses: {},
        })
        .returning();
      progress = inserted;
    }

    const moduleStatuses = (progress.moduleStatuses as Record<string, any>) || {};
    const skillRatings = (assessment.skillRatings as Record<string, number>) || {};

    // 3. Validasi sequence: Apakah modul ini sudah terbuka?
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
          error: 'Forbidden',
          message: sequenceCheck.reason || 'Modul ini masih terkunci. Selesaikan modul sebelumnya terlebih dahulu.',
        },
        { status: 403 }
      );
    }

    // 4. Jika modul sudah selesai sebelumnya, tidak perlu mencatat sesi belajar baru
    if (moduleStatuses[moduleSlug] === true) {
      return NextResponse.json({
        success: true,
        alreadyCompleted: true,
        startedAt: Date.now(),
        minStudySeconds: MIN_STUDY_SECONDS,
      });
    }

    // 5. Catat / perbarui sesi belajar di server
    const currentSessions = (moduleStatuses._study_sessions as Record<string, any>) || {};
    const now = Date.now();
    const existingSession = currentSessions[moduleSlug];

    const startedAt =
      existingSession?.startedAt && now - existingSession.startedAt < 24 * 60 * 60 * 1000
        ? existingSession.startedAt
        : now;

    const updatedStatuses = {
      ...moduleStatuses,
      _study_sessions: {
        ...currentSessions,
        [moduleSlug]: {
          startedAt,
          resourceIndex: resourceIndex ?? 0,
          updatedAt: now,
        },
      },
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
      startedAt,
      minStudySeconds: MIN_STUDY_SECONDS,
      message: 'Sesi belajar telah dimulai.',
    });
  } catch (error) {
    console.error('Error starting study session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
