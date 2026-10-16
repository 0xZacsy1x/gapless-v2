import { z } from "zod";

export const BANK_VERSION = 1;
export const DRAFT_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 jam

export const AssessmentDraftSchema = z.object({
  version: z.number(),
  quizType: z.string(),
  userId: z.string().optional(),
  currentIndex: z.number(),
  answers: z.record(z.string(), z.number()), // question key -> selected option index
  shuffledOptionsOrder: z.record(z.string(), z.array(z.number())).optional(), // question id -> array of original indices
  careerSlug: z.string().optional(),
  timestamp: z.number(),
});

export type AssessmentDraft = z.infer<typeof AssessmentDraftSchema>;

export function getDraftStorageKey(quizType: string, userId?: string | null): string {
  const userKey = userId ? userId : "guest";
  return `gapless:assessment-draft:v${BANK_VERSION}:${quizType}:${userKey}`;
}

export function saveAssessmentDraft(
  draft: Omit<AssessmentDraft, "version" | "timestamp"> & { userId?: string | null }
): void {
  if (typeof window === "undefined") return;
  try {
    const key = getDraftStorageKey(draft.quizType, draft.userId);
    const fullDraft: AssessmentDraft = {
      version: BANK_VERSION,
      quizType: draft.quizType,
      userId: draft.userId || undefined,
      currentIndex: draft.currentIndex,
      answers: draft.answers,
      shuffledOptionsOrder: draft.shuffledOptionsOrder,
      careerSlug: draft.careerSlug,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(fullDraft));
  } catch (err) {
    console.warn("Failed to save assessment draft to localStorage", err);
  }
}

export function loadAssessmentDraft(quizType: string, userId?: string | null): AssessmentDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const key = getDraftStorageKey(quizType, userId);
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    const result = AssessmentDraftSchema.safeParse(parsed);

    if (!result.success) {
      console.warn("Draft data invalid, clearing draft", result.error);
      localStorage.removeItem(key);
      return null;
    }

    const draft = result.data;

    // Check version
    if (draft.version !== BANK_VERSION) {
      console.warn("Draft version mismatch, clearing draft");
      localStorage.removeItem(key);
      return null;
    }

    // Check expiration (24 hours)
    if (Date.now() - draft.timestamp > DRAFT_EXPIRY_MS) {
      console.warn("Draft expired (> 24h), clearing draft");
      localStorage.removeItem(key);
      return null;
    }

    return draft;
  } catch (err) {
    console.warn("Failed to load assessment draft", err);
    return null;
  }
}

export function clearAssessmentDraft(quizType: string, userId?: string | null): void {
  if (typeof window === "undefined") return;
  try {
    const key = getDraftStorageKey(quizType, userId);
    localStorage.removeItem(key);
  } catch (err) {
    console.warn("Failed to clear assessment draft", err);
  }
}
