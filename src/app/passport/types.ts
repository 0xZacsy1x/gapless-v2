export interface MissionProgressItem {
  progress: {
    id: string;
    missionId: string;
    status: string;
    submissionUrl?: string | null;
    notes?: string | null;
    evidenceType?: string;
    completedAt?: Date | string | null;
  };
  mission: {
    id: string;
    title: string;
    competency: string;
    difficultyLevel?: string | null;
    difficulty?: string;
  };
}

export interface ActivityEvidenceItem {
  evidence: {
    id: string;
    activityId: string;
    evidenceUrl: string;
    status: string;
    confirmedAt: Date | string | null;
  };
  activity: {
    id: string;
    title: string;
    type: string;
  };
}

export interface SnapshotItem {
  id: string;
  snapshotDate: string;
  hardSkillScore: number | null;
  softSkillScore: number | null;
}

export interface PublicProfile {
  id: string;
  publicToken: string;
  enabled: boolean;
}

export interface AssessmentInfo {
  id: string;
  quizType: string;
  careerSlug: string | null;
  careerTitle: string;
  dominantTrait?: string | null;
  isActive: boolean;
  createdAt: string;
  hasSjt?: boolean;
  competencies?: CompetencyItem[];
  softScore?: number;
}

export interface CertificateData {
  id: string;
  judul: string;
  penyelenggara: string;
  tanggalTerbit: string;
  kategoriSkill: string | null;
  sumber?: string;
  catatanTambahan?: string | null;
  fileMimeType: string;
  fileSize: number;
  status: string;
  adminNote: string | null;
  readinessBoostApplied: number;
  aiAnalysis?: any;
  aiSuggestedBoost?: number | null;
  source: string;
  createdAt: string | Date;
}

export interface PassportProps {
  user: {
    name: string;
    email: string;
    image: string | null;
  };
  targetRole: string;
  assessments?: AssessmentInfo[];
  hardSkillScore: number;
  softSkillScore: number;
  completedMissions: MissionProgressItem[];
  userActivities: ActivityEvidenceItem[];
  certificates?: CertificateData[];
  snapshots: SnapshotItem[];
  publicProfile: PublicProfile | null;
  isPro: boolean;
  competencies?: CompetencyItem[];
  hasVerifiedSjt?: boolean;
}

export interface CompetencyItem {
  id: string;
  name: string;
  shortLabel?: string;
  icon?: string;
  base: number;
  desc: string;
  level?: 1 | 2 | 3;
  feedbackList?: string[];
  isVerified?: boolean;
}

export const COMPETENCIES: CompetencyItem[] = [
  {
    id: 'kolaborasi',
    name: 'Kolaborasi Tim & Lintas Fungsi',
    shortLabel: 'Kolaborasi Tim',
    icon: '🤝',
    base: 78,
    desc: 'Kemampuan bekerja sama, menyelaraskan tujuan lintas divisi, dan resolusi konflik secara konstruktif.',
    level: 2,
    isVerified: false,
  },
  {
    id: 'komunikasi',
    name: 'Komunikasi Efektif',
    shortLabel: 'Komunikasi',
    icon: '💬',
    base: 82,
    desc: 'Menyampaikan pesan secara jelas, mendengarkan aktif, dan persuasi terstruktur.',
    level: 3,
    isVerified: false,
  },
  {
    id: 'berpikir_analitis',
    name: 'Berpikir Analitis & Kritis',
    shortLabel: 'Berpikir Kritis',
    icon: '🔍',
    base: 80,
    desc: 'Mengevaluasi bukti secara objektif, membedakan fakta vs asumsi, dan penalaran logis.',
    level: 3,
    isVerified: false,
  },
  {
    id: 'problem_solving',
    name: 'Pemecahan Masalah (Problem Solving)',
    shortLabel: 'Problem Solving',
    icon: '🧩',
    base: 85,
    desc: 'Menganalisis akar masalah secara sistematis dan merumuskan solusi dengan pertimbangan trade-off.',
    level: 3,
    isVerified: false,
  },
  {
    id: 'kemauan_belajar',
    name: 'Kemauan Belajar & Rasa Ingin Tahu',
    shortLabel: 'Kemauan Belajar',
    icon: '📚',
    base: 88,
    desc: 'Proaktif mencari wawasan baru, terbuka pada umpan balik, dan cepat menguasai hal baru.',
    level: 3,
    isVerified: false,
  },
  {
    id: 'ketelitian',
    name: 'Ketelitian (Attention to Detail)',
    shortLabel: 'Ketelitian',
    icon: '🎯',
    base: 74,
    desc: 'Cermat dalam akurasi data, mematuhi standar kualitas, dan minim kekeliruan.',
    level: 2,
    isVerified: false,
  },
  {
    id: 'inisiatif',
    name: 'Inisiatif & Proaktif',
    shortLabel: 'Inisiatif',
    icon: '⚡',
    base: 76,
    desc: 'Mengambil tindakan tanpa harus diperintah, mencari peluang perbaikan, dan kepemilikan hasil.',
    level: 2,
    isVerified: false,
  },
  {
    id: 'adaptabilitas',
    name: 'Adaptabilitas & Kelincahan',
    shortLabel: 'Adaptabilitas',
    icon: '🌱',
    base: 72,
    desc: 'Cepat menyesuaikan diri dengan perubahan prioritas, tantangan tak terduga, dan dinamika tim.',
    level: 2,
    isVerified: false,
  },
];
