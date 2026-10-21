import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import { aiModuleInsights } from "@/db/schema";
import { getCuratedModuleDetail } from "@/lib/curatedLearningResources";

const RequestSchema = z.object({
  moduleName: z.string().min(1, "Module name tidak boleh kosong"),
  roleName: z.string().min(1, "Role name tidak boleh kosong"),
  moduleSlug: z.string().min(1, "Module slug tidak boleh kosong"),
  careerSlug: z.string().min(1, "Career slug tidak boleh kosong")
});

export async function POST(req: Request) {
  try {
    // 1. Auth Guard
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rawBody = await req.json();
    
    // 2. Validasi Zod
    const validationResult = RequestSchema.safeParse(rawBody);
    if (!validationResult.success) {
      return NextResponse.json({ error: "Bad Request", details: validationResult.error.format() }, { status: 400 });
    }

    const { moduleName, roleName, moduleSlug, careerSlug } = validationResult.data;

    // 3. Ambil sumber belajar terverifikasi dan 100% tepat domain untuk karir yang dipilih
    const fullResult = getCuratedModuleDetail({
      moduleSlug,
      moduleTitle: moduleName,
      careerSlug,
      roleName,
    });

    // 4. Simpan / sinkronkan ke cache database (timpa jika cache lama salah domain)
    try {
      await db.insert(aiModuleInsights).values({
        moduleSlug,
        careerSlug,
        insightData: fullResult,
      }).onConflictDoUpdate({
        target: [aiModuleInsights.moduleSlug, aiModuleInsights.careerSlug],
        set: {
          insightData: fullResult,
          createdAt: new Date(),
        }
      });
    } catch (dbErr) {
      console.error("Failed to cache module insight:", dbErr);
    }

    return NextResponse.json(fullResult);
  } catch (error) {
    console.error("Failed to generate module insight:", error);
    return NextResponse.json({ error: "Failed to generate module insight" }, { status: 500 });
  }
}
