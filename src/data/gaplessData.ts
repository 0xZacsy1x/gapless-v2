export type Trait = 'The Thinker' | 'The Creator' | 'The Connector' | 'The Builder';

export const TRAITS: Trait[] = [
  'The Thinker',
  'The Creator',
  'The Connector',
  'The Builder',
];

export const TRAIT_META: Record<
  Trait,
  { emoji: string; color: string; label: string; description: string }
> = {
  'The Thinker': {
    emoji: '🧠',
    color: '#10b981',
    label: 'The Thinker',
    description:
      'Kamu tumbuh dari data, logika, dan pemecahan masalah secara sistematis. Kamu ingin memahami cara kerja sesuatu sampai ke akar-akarnya.',
  },
  'The Creator': {
    emoji: '🎨',
    color: '#a855f7',
    label: 'The Creator',
    description:
      'Kamu digerakkan oleh imajinasi, orisinalitas, dan ekspresi diri. Kamu melihat peluang di mana orang lain melihat keterbatasan.',
  },
  'The Connector': {
    emoji: '🤝',
    color: '#3b82f6',
    label: 'The Connector',
    description:
      'Kamu didorong oleh koneksi, strategi digital, empati, dan pemasaran digital. Kamu membangun koneksi antara produk dan audiens melalui strategi yang efektif.',
  },
  'The Builder': {
    emoji: '🚀',
    color: '#f59e0b',
    label: 'The Builder',
    description:
      'Kamu didorong oleh teknologi, rekayasa perangkat lunak, dan membangun sistem. Kamu membangun tulang punggung teknologi yang mengubah permainan.',
  },
};

// ──────────────────────────────────────────────
// 15 Soal Asesmen MCQ
// Opsi: A = Analytical, B = Creative, C = Social, D = Entrepreneurial
// ──────────────────────────────────────────────

export interface AssessmentOption {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
  trait: Trait;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  dimension: string;
  options: [AssessmentOption, AssessmentOption, AssessmentOption, AssessmentOption];
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    question: "Kalau kamu dikasih waktu luang 3 jam tanpa tugas kuliah, kamu paling kemungkinan bakal...",
    dimension: "Interest",
    options: [
      { label: "A", text: "Baca artikel/riset tentang topik yang lagi kamu penasarin", trait: "The Thinker" },
      { label: "B", text: "Nongkrong, chat, atau ngobrol sama temen soal ide-ide baru", trait: "The Connector" },
      { label: "C", text: "Ngulik desain, bikin konten, atau coba tools kreatif baru", trait: "The Creator" },
      { label: "D", text: "Beresin planner, rapiin file, atau ngerjain checklist yang tertunda", trait: "The Builder" }
    ]
  },
  {
    id: 2,
    question: "Dalam kerja kelompok, kamu biasanya paling nyaman ambil peran sebagai...",
    dimension: "Social Role Preference",
    options: [
      { label: "A", text: "Orang yang jadi penghubung, presentasi, atau negosiasi ke pihak luar", trait: "The Connector" },
      { label: "B", text: "Orang yang mikirin ide \"out of the box\" atau visual project", trait: "The Creator" },
      { label: "C", text: "Orang yang riset data/referensi buat mendukung keputusan tim", trait: "The Thinker" },
      { label: "D", text: "Orang yang bikin timeline, bagi tugas, dan mastiin semua on-track", trait: "The Builder" }
    ]
  },
  {
    id: 3,
    question: "Lingkungan kerja \"dream job\" kamu itu yang kayak gimana?",
    dimension: "Environment Preference",
    options: [
      { label: "A", text: "Terstruktur, ada SOP jelas, target terukur", trait: "The Builder" },
      { label: "B", text: "Dinamis, banyak interaksi sama orang tiap hari", trait: "The Connector" },
      { label: "C", text: "Fleksibel, banyak ruang eksplorasi, gak monoton", trait: "The Creator" },
      { label: "D", text: "Tenang, fokus deep-work, banyak waktu buat mikir", trait: "The Thinker" }
    ]
  },
  {
    id: 4,
    question: "Pas ngerjain tugas kuliah, kamu paling puas kalau hasilnya...",
    dimension: "Task Satisfaction Style",
    options: [
      { label: "A", text: "Bisa dipresentasiin dan bikin orang lain paham/terinspirasi", trait: "The Connector" },
      { label: "B", text: "Analisisnya dalam dan datanya solid", trait: "The Thinker" },
      { label: "C", text: "Rapi, sistematis, dan sesuai rubrik", trait: "The Builder" },
      { label: "D", text: "Unik dan beda dari yang lain", trait: "The Creator" }
    ]
  },
  {
    id: 5,
    question: "Kalau harus milih salah satu skill buat diasah minggu ini, kamu bakal pilih...",
    dimension: "Skill Orientation",
    options: [
      { label: "A", text: "Data analysis/riset (SQL, riset pasar, problem solving)", trait: "The Thinker" },
      { label: "B", text: "Project management/tools teknis (Excel, Notion, automation)", trait: "The Builder" },
      { label: "C", text: "Public speaking/networking (pitching, komunikasi, leadership)", trait: "The Connector" },
      { label: "D", text: "Design/content creation (Canva, video editing, copywriting)", trait: "The Creator" }
    ]
  },
  {
    id: 6,
    question: "Kalau kamu ngerasa salah jurusan atau ragu sama jalur karier sekarang, reaksi pertama kamu biasanya...",
    dimension: "Concern",
    options: [
      { label: "A", text: "Cerita ke orang lain, cari mentor atau teman buat diskusi", trait: "The Connector" },
      { label: "B", text: "Riset dalam-dalam dulu, baca-baca, bandingin opsi, dan cari data", trait: "The Thinker" },
      { label: "C", text: "Bikin rencana konkret step-by-step buat pindah jalur", trait: "The Builder" },
      { label: "D", text: "Coba eksplorasi hal baru di luar jurusan, siapa tau nemu passion lain", trait: "The Creator" }
    ]
  },
  {
    id: 7,
    question: "Pas ada info lowongan magang yang deadline-nya besok, kamu...",
    dimension: "Control",
    options: [
      { label: "A", text: "Cek checklist requirement satu-satu biar gak ada yang kelewat", trait: "The Builder" },
      { label: "B", text: "Tanya-tanya kontak atau senior yang mungkin kenal orang dalam", trait: "The Connector" },
      { label: "C", text: "Langsung improvisasi portofolio/CV kreatif seadanya", trait: "The Creator" },
      { label: "D", text: "Cari tau dulu detail perusahaannya sebelum apply", trait: "The Thinker" }
    ]
  },
  {
    id: 8,
    question: "Menurut kamu, cara paling efektif belajar skill baru itu...",
    dimension: "Curiosity",
    options: [
      { label: "A", text: "Pahami dulu konsep dasarnya secara mendalam sebelum praktik", trait: "The Thinker" },
      { label: "B", text: "Belajar bareng orang lain / cari mentor yang udah berpengalaman", trait: "The Connector" },
      { label: "C", text: "Langsung praktik & experimen, belajar dari trial-error", trait: "The Creator" },
      { label: "D", text: "Ikutin kursus/modul terstruktur step-by-step", trait: "The Builder" }
    ]
  },
  {
    id: 9,
    question: "Kalau rencana karier kamu tiba-tiba berubah drastis (misal: perusahaan impian gak buka lowongan), kamu...",
    dimension: "Control",
    options: [
      { label: "A", text: "Segera susun ulang rencana B dengan target & timeline baru", trait: "The Builder" },
      { label: "B", text: "Anggap ini kesempatan buat eksplorasi arah yang lebih otentik buat kamu", trait: "The Creator" },
      { label: "C", text: "Reach out ke network buat cari opsi/insight lain", trait: "The Connector" },
      { label: "D", text: "Analisis dulu kenapa itu terjadi dan apa pelajarannya", trait: "The Thinker" }
    ]
  },
  {
    id: 10,
    question: "Rasa \"cemas soal masa depan karier\" biasanya paling mereda kalau kamu...",
    dimension: "Confidence",
    options: [
      { label: "A", text: "Ngobrol sama orang yang dipercaya buat dapet perspektif", trait: "The Connector" },
      { label: "B", text: "Nyalurin ke hal kreatif (nulis, bikin moodboard masa depan, dll)", trait: "The Creator" },
      { label: "C", text: "Nyari lebih banyak informasi/data biar gak \"buta arah\"", trait: "The Thinker" },
      { label: "D", text: "Bikin action plan konkret biar ada rasa \"in control\"", trait: "The Builder" }
    ]
  },
  {
    id: 11,
    question: "Kalau ditanya \"kerja itu buat apa sih sebenarnya?\", jawaban paling jujur kamu...",
    dimension: "Meaning of Work",
    options: [
      { label: "A", text: "Buat terus belajar dan memecahkan masalah yang menantang", trait: "The Thinker" },
      { label: "B", text: "Buat stabilitas, pencapaian yang jelas, dan rasa aman", trait: "The Builder" },
      { label: "C", text: "Buat bisa berdampak dan terhubung sama orang lain", trait: "The Connector" },
      { label: "D", text: "Buat bisa berekspresi dan ninggalin jejak karya", trait: "The Creator" }
    ]
  },
  {
    id: 12,
    question: "Kamu bakal ngerasa paling \"berarti\" di tempat kerja kalau...",
    dimension: "Self-Concept at Work",
    options: [
      { label: "A", text: "Kamu bisa bantu/mengembangkan orang lain di sekitar kamu", trait: "The Connector" },
      { label: "B", text: "Ide/karya kamu dipakai dan diapresiasi", trait: "The Creator" },
      { label: "C", text: "Kamu berhasil nemuin insight/solusi yang orang lain gak lihat", trait: "The Thinker" },
      { label: "D", text: "Sistem yang kamu bangun berjalan lancar dan efisien", trait: "The Builder" }
    ]
  },
  {
    id: 13,
    question: "Warisan (legacy) yang pengen kamu tinggalkan lewat karier kamu adalah...",
    dimension: "Legacy Narrative",
    options: [
      { label: "A", text: "Sistem/proses yang bikin sesuatu jadi lebih baik dan tahan lama", trait: "The Builder" },
      { label: "B", text: "Komunitas/relasi yang bertumbuh karena kehadiran kamu", trait: "The Connector" },
      { label: "C", text: "Karya atau ide orisinal yang diingat orang", trait: "The Creator" },
      { label: "D", text: "Kontribusi pengetahuan atau solusi atas masalah besar", trait: "The Thinker" }
    ]
  },
  {
    id: 14,
    question: "Di antara ini, yang paling bikin kamu \"males kerja\" adalah lingkungan yang...",
    dimension: "Values Misfit",
    options: [
      { label: "A", text: "Semua serba buru-buru tanpa waktu buat mikir mendalam", trait: "The Thinker" },
      { label: "B", text: "Kaku, gak ada ruang buat coba hal baru", trait: "The Creator" },
      { label: "C", text: "Individualis, minim interaksi atau kolaborasi", trait: "The Connector" },
      { label: "D", text: "Berantakan, gak jelas arah dan prosesnya", trait: "The Builder" }
    ]
  },
  {
    id: 15,
    question: "Kalau kamu bayangin diri kamu 10 tahun lagi sukses, gambaran yang paling relate...",
    dimension: "Future Career",
    options: [
      { label: "A", text: "Punya jaringan luas dan berperan besar mengembangkan orang lain", trait: "The Connector" },
      { label: "B", text: "Jadi expert/rujukan di bidang yang kamu dalami", trait: "The Thinker" },
      { label: "C", text: "Dikenal karena karya/kreativitas kamu yang khas", trait: "The Creator" },
      { label: "D", text: "Punya posisi/pencapaian yang solid dan terukur jelas", trait: "The Builder" }
    ]
  }
];

// ──────────────────────────────────────────────
// Profil Karier — 6 skill masing-masing, rating 0-3
// ──────────────────────────────────────────────

export interface SkillRequirement {
  name: string;
  required: number; // 0 = Tidak Ada Pengalaman, 1 = Dasar, 2 = Menengah, 3 = Lanjutan
}

export interface CareerProfile {
  id: string;
  title: string;
  trait: Trait;
  icon: string;
  description: string;
  salaryRange: string;
  growthOutlook: string;
  skills: SkillRequirement[];
  roadmap: CurriculumPhase[];
}

export interface CurriculumPhase {
  phase: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  description: string;
  modules: string[];
  duration: string;
}
export interface LearningResource {
  title: string;
  provider: string;
  type: 'Course' | 'Artikel' | 'Video' | 'Buku' | 'Roadmap' | 'Dokumentasi';
  isFree: boolean;
  price?: string;
  url: string;
}

export interface ModuleDetail {
  slug: string;
  title: string;
  duration: string;
  target: string;
  breakdown: { title: string; description: string }[];
  resources: LearningResource[];
}

export const MODULE_DETAILS: Record<string, ModuleDetail> = {
  'proses-design-thinking': {
    slug: 'proses-design-thinking',
    title: 'Proses Design Thinking',
    duration: 'Estimasi 4–5 jam',
    target: 'Mampu memetakan satu studi kasus produk memakai kelima tahap design thinking secara mandiri.',
    breakdown: [
      { title: 'Emphatize', description: 'Riset dan memahami kebutuhan pengguna' },
      { title: 'Define', description: 'Merumuskan masalah inti dari hasil riset' },
      { title: 'Ideate', description: 'Brainstorming solusi inovatif untuk masalah' },
      { title: 'Prototype', description: 'Membangun purwarupa/mockup interaktif awal' },
      { title: 'Test', description: 'Menguji purwarupa ke pengguna untuk feedback' }
    ],
    resources: [
      {
        title: 'Design Thinking Fundamentals',
        provider: 'Coursera.org',
        type: 'Course',
        isFree: true,
        url: 'https://www.coursera.org/search?query=Design+Thinking+Fundamentals'
      },
      {
        title: 'Panduan & Tahap Design Thinking',
        provider: 'nngroup.com',
        type: 'Artikel',
        isFree: true,
        url: 'https://www.nngroup.com/search/?q=Panduan+Tahap+Design+Thinking'
      },
      {
        title: 'Studi Kasus: Redesain Aplikasi',
        provider: 'youtube.com',
        type: 'Video',
        isFree: true,
        url: 'https://www.youtube.com/results?search_query=Studi+Kasus+Redesain+Aplikasi'
      },
      {
        title: 'Design Thinking Masterclass',
        provider: 'skillshare.com',
        type: 'Course',
        isFree: false,
        price: 'Rp 149.000',
        url: 'https://www.skillshare.com/en/search?query=Design+Thinking+Masterclass'
      }
    ]
  }
};

export const CAREER_PROFILES: CareerProfile[] = [
  // ── Karier AI / ML ──
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer / Machine Learning Engineer',
    trait: 'The Thinker',
    icon: '🤖',
    description: 'Membangun dan melatih model kecerdasan buatan untuk memecahkan masalah kompleks dan mengotomatisasi keputusan.',
    salaryRange: 'Rp 10.000.000 - Rp 25.000.000/bulan',
    growthOutlook: '40%',
    skills: [
      { name: 'Large Language Models', required: 3 }, // 60% market demand
      { name: 'Agentic AI', required: 2 }, // 45.5% market demand
      { name: 'Machine Learning', required: 2 }, // 45.5% market demand
      { name: 'Python', required: 2 }, // 41.8% market demand
      { name: 'Retrieval-Augmented Generation', required: 2 }, // 41.8% market demand
      { name: 'Generative AI', required: 2 }, // 34.5% market demand
      { name: 'Cross-Functional Collaboration', required: 3 }, // 69.1% market demand
      { name: 'Communication Skills', required: 3 }, // 52.7% market demand
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Dasar',
        subtitle: 'Matematika dan Pemrograman',
        description: 'Kuasai fondasi perhitungan matematika dan bahasa pemrograman utama untuk AI.',
        modules: ['Aljabar Linear dan Kalkulus Dasar', 'Statistik Lanjut dan Probabilitas', 'Pemrograman Python Lanjut', 'Eksplorasi Data dengan Pandas & NumPy', 'Visualisasi Data Matplotlib'],
        duration: '8-10 minggu',
      },
      {
        phase: 2,
        title: 'Menengah',
        subtitle: 'Machine Learning Klasik',
        description: 'Pahami dan terapkan algoritma dasar Machine Learning sebelum masuk ke Deep Learning.',
        modules: ['Regresi dan Klasifikasi', 'Decision Trees & Random Forests', 'Support Vector Machines (SVM)', 'Clustering (K-Means, PCA)', 'Evaluasi Model & Tuning Hyperparameter'],
        duration: '8-10 minggu',
      },
      {
        phase: 3,
        title: 'Lanjutan',
        subtitle: 'Deep Learning & Neural Networks',
        description: 'Mulai bangun arsitektur Neural Network untuk masalah yang lebih kompleks seperti visi komputer atau bahasa.',
        modules: ['Pengenalan Neural Networks', 'Frameworks: TensorFlow & PyTorch', 'Convolutional Neural Networks (CNN) untuk Gambar', 'Recurrent Neural Networks (RNN/LSTM)', 'Natural Language Processing (NLP) Dasar'],
        duration: '10-12 minggu',
      },
      {
        phase: 4,
        title: 'Mahir',
        subtitle: 'MLOps & Generative AI',
        description: 'Terapkan model ke production dan eksplorasi model AI generatif (LLM).',
        modules: ['Model Deployment (Docker/FastAPI)', 'MLOps & Model Monitoring', 'Pengantar Large Language Models (LLM)', 'RAG (Retrieval-Augmented Generation)', 'Etika AI & Bias Model'],
        duration: '10-12 minggu',
      },
    ]
  },
  // ── Karier Analitis ──
  {
    id: 'data-scientist',
    title: 'Data Analyst / Business Intelligence',
    trait: 'The Thinker',
    icon: '📊',
    description: 'Mengungkap pola tersembunyi dalam data untuk mendorong keputusan strategis lintas industri.',
    salaryRange: 'Rp 6.000.000 - Rp 15.000.000/bulan',
    growthOutlook: '36%',
    skills: [
      { name: 'SQL', required: 3 }, // 73.7% market demand
      { name: 'Dashboard Development', required: 3 }, // 64.9% market demand
      { name: 'Microsoft Excel', required: 3 }, // 59.6% market demand
      { name: 'Python', required: 3 }, // 57.9% market demand
      { name: 'Power BI', required: 3 }, // 56.1% market demand
      { name: 'Tableau', required: 2 }, // 45.6% market demand
      { name: 'Analytical Thinking', required: 3 }, // 70.2% market demand
      { name: 'Cross-Functional Collaboration', required: 3 }, // 57.9% market demand
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Dasar',
        subtitle: 'Bangun fondasi analitismu',
        description: 'Kuasai dasar pengolahan data dan query database.',
        modules: ['Fundamental SQL', 'Pemrograman Python Dasar', 'Data Cleansing 101', 'Logika Bisnis Dasar', 'Etika Data'],
        duration: '6–8 minggu',
      },
      {
        phase: 2,
        title: 'Menengah',
        subtitle: 'Visualisasi dan Pelaporan',
        description: 'Pelajari cara menyajikan data menjadi informasi yang mudah dipahami.',
        modules: ['Tableau / Power BI Dasar', 'Desain Dashboard Lanjut', 'Data Storytelling', 'Otomatisasi Laporan (Cron/Scripts)', 'Analisis Trend'],
        duration: '8–10 minggu',
      },
      {
        phase: 3,
        title: 'Lanjutan',
        subtitle: 'Analisis Statistik Mendalam',
        description: 'Beralih dari analisis deskriptif ke diagnostik dan prediktif.',
        modules: ['Statistik Inferensial', 'A/B Testing & Eksperimentasi', 'Analisis Kohort', 'Python Pandas Lanjut', 'Pemodelan Metrik Bisnis'],
        duration: '10–12 minggu',
      },
      {
        phase: 4,
        title: 'Mahir',
        subtitle: 'Pimpin Kecerdasan Bisnis',
        description: 'Dorong inisiatif intelijen bisnis berskala perusahaan.',
        modules: ['Arsitektur Data Warehouse', 'Strategi Business Intelligence', 'Komunikasi Stakeholder C-Level', 'Pengelolaan Tim Analis', 'Translasi Strategi Bisnis'],
        duration: '12–16 minggu',
      },
    ],
  },
  {
    id: 'research-scientist',
    title: 'Data Researcher / Strategy Analyst',
    trait: 'The Thinker',
    icon: '🔬',
    description: 'Mendorong batas pengetahuan melalui eksplorasi data mendalam dan strategi pasar.',
    salaryRange: 'Negotiable / Kompensasi Magang',
    growthOutlook: '8%',
    skills: [
      { name: 'Microsoft Excel', required: 3 }, // 70% market demand
      { name: 'Data Analysis', required: 3 }, // 58% market demand
      { name: 'Corporate Strategy', required: 3 }, // 56% market demand
      { name: 'Process Improvement', required: 2 }, // 44% market demand
      { name: 'Competitive Analysis', required: 2 }, // 40% market demand
      { name: 'Market Research', required: 2 }, // 38% market demand
      { name: 'Analytical Thinking', required: 3 }, // 74% market demand
      { name: 'Communication Skills', required: 3 }, // 72% market demand
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Dasar',
        subtitle: 'Kuasai Metodologi Riset',
        description: 'Pahami cara mendesain riset dan mengumpulkan data yang valid.',
        modules: ['Metodologi Riset Kuantitatif', 'Teknik Survei & Kuesioner', 'Penelusuran Platform Digital', 'Statistika Dasar', 'Pengantar Strategi Bisnis'],
        duration: '6–8 minggu',
      },
      {
        phase: 2,
        title: 'Menengah',
        subtitle: 'Ekstraksi dan Eksplorasi',
        description: 'Mulai melakukan data mining dan eksplorasi data tingkat lanjut.',
        modules: ['Teknik Data Mining', 'Web Scraping Dasar', 'Sintesis Informasi Kompleks', 'Penyusunan Laporan Riset', 'Analisis Lanskap Kompetitif'],
        duration: '8–10 minggu',
      },
      {
        phase: 3,
        title: 'Lanjutan',
        subtitle: 'Analisis Strategis',
        description: 'Terapkan model prediktif untuk memetakan peluang strategi bisnis.',
        modules: ['Pemodelan Prediktif Dasar', 'Analisis Pasar Mendalam', 'Framework Strategi Lanjut', 'Validasi Hipotesis Bisnis', 'Ketelitian Akademis Terapan'],
        duration: '10–12 minggu',
      },
      {
        phase: 4,
        title: 'Mahir',
        subtitle: 'Arahkan Strategi Perusahaan',
        description: 'Gunakan hasil riset untuk membentuk arah bisnis perusahaan.',
        modules: ['Presentasi Wawasan Manajerial', 'Advisi Strategi C-Level', 'Manajemen Riset Skala Besar', 'Intelijen Pasar (Market Intelligence)', 'Inovasi Berbasis Riset'],
        duration: '12–16 minggu',
      },
    ],
  },

  // ── Karier Kreatif ──
  {
    id: 'ux-designer',
    title: 'UI/UX Designer',
    trait: 'The Creator',
    icon: '🎨',
    description: 'Merancang pengalaman digital yang intuitif dan memecahkan masalah nyata pengguna.',
    salaryRange: 'Rp 5.000.000 - Rp 9.000.000/bulan',
    growthOutlook: '13%',
    skills: [
      { name: 'Figma', required: 3 }, // 72.3% market demand
      { name: 'Prototyping', required: 3 }, // 53.8% market demand
      { name: 'User Research', required: 2 }, // 36.9% market demand
      { name: 'Wireframing', required: 2 }, // 35.4% market demand
      { name: 'Design System', required: 2 }, // 35.4% market demand
      { name: 'Visual Design', required: 2 }, // 33.8% market demand
      { name: 'Cross-Functional Collaboration', required: 3 }, // 66.2% market demand
      { name: 'Communication Skills', required: 3 }, // 60% market demand
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Dasar',
        subtitle: 'Pahami pengguna-mu',
        description: 'Pelajari prinsip design thinking dan dasar-dasar desain berpusat pengguna.',
        modules: ['Proses Design Thinking', 'Pengembangan User Persona', 'Wireframing Dasar', 'Teori Warna & Tipografi', 'Fundamental Figma'],
        duration: '6–8 minggu',
      },
      {
        phase: 2,
        title: 'Menengah',
        subtitle: 'Bangun prototipe interaktif',
        description: 'Buat desain fidelitas lebih tinggi dan pelajari pola interaksi.',
        modules: ['Mockup High-Fidelity', 'Prototipe Interaktif', 'Pustaka Pola UI', 'Prinsip Desain Responsive', 'HTML/CSS Dasar untuk Desainer'],
        duration: '8–10 minggu',
      },
      {
        phase: 3,
        title: 'Lanjutan',
        subtitle: 'Validasi dan sempurnakan',
        description: 'Kuasai uji usabilitas dan bangun sistem desain yang scalable.',
        modules: ['Metode Uji Usabilitas', 'Conversion Rate Optimization (CRO)', 'Arsitektur Sistem Desain', 'Standar Aksesibilitas (WCAG)', 'Motion Design Dasar'],
        duration: '10–12 minggu',
      },
      {
        phase: 4,
        title: 'Mahir',
        subtitle: 'Pimpin strategi desain',
        description: 'Dorong visi produk melalui desain dan presentasikan ide dengan kuat.',
        modules: ['Kepemimpinan Desain', 'Kolaborasi Lintas Fungsi (Eng/PM)', 'Metrik & KPI Desain', 'Portofolio & Studi Kasus', 'Komunikasi & Presentasi Eksekutif'],
        duration: '12–16 minggu',
      },
    ],
  },
  {
    id: 'content-strategist',
    title: 'Content Creator / Social Media Specialist',
    trait: 'The Creator',
    icon: '✍️',
    description: 'Membentuk narasi brand dan mengelola kehadiran di media sosial.',
    salaryRange: 'Negotiable / Uang Saku Magang',
    growthOutlook: '12%',
    skills: [
      { name: 'TikTok', required: 3 }, // 65.4% market demand
      { name: 'Copywriting', required: 2 }, // 41% market demand
      { name: 'Content Calendar', required: 2 }, // 30.8% market demand
      { name: 'Content Performance Analysis', required: 2 }, // 30.8% market demand
      { name: 'Community Management', required: 2 }, // 28.2% market demand
      { name: 'Content Ideation', required: 1 }, // 24.4% market demand
      { name: 'Creative Thinking', required: 3 }, // 62.8% market demand
      { name: 'Cross-Functional Collaboration', required: 3 }, // 59% market demand
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Dasar',
        subtitle: 'Kuasai pembuatan konten',
        description: 'Bangun fondasi menulis dan pembuatan konten visual.',
        modules: ['Fundamental Copywriting', 'Teknik Pemahaman Narasi', 'Dasar SEO Content Writing', 'Riset Audiens', 'Pembuatan Style Guide Brand'],
        duration: '6–8 minggu',
      },
      {
        phase: 2,
        title: 'Menengah',
        subtitle: 'Produksi Media & Tren',
        description: 'Pelajari video editing dan cara mengikuti tren media sosial.',
        modules: ['Video Editing (CapCut/Premiere)', 'Manajemen Kalender Konten', 'Agility Terhadap Tren', 'Strategi Media Sosial (TikTok/IG)', 'Visual Copywriting'],
        duration: '8–10 minggu',
      },
      {
        phase: 3,
        title: 'Lanjutan',
        subtitle: 'Analisis dan Optimasi',
        description: 'Ukur dampak konten dan optimalkan performanya.',
        modules: ['Social Media Analytics Dasar', 'A/B Testing Konten', 'Strategi Interaksi Massa', 'Persuasi Visual', 'Optimasi Hashtag & Algoritma'],
        duration: '10–12 minggu',
      },
      {
        phase: 4,
        title: 'Mahir',
        subtitle: 'Pimpin Visi Sosial',
        description: 'Arahkan narasi brand dan pimpin inisiatif kampanye digital.',
        modules: ['Manajemen Kampanye Viral', 'Strategi Lintas Kanal', 'Pengukuran ROI Konten', 'Manajemen Krisis (Public Relations)', 'Kepemimpinan Tim Kreatif'],
        duration: '12–16 minggu',
      },
    ],
  },

  // ── Karier Sosial ──
  {
    id: 'community-manager',
    title: 'Digital Marketing Specialist',
    trait: 'The Connector',
    icon: '🌐',
    description: 'Mengelola kampanye pemasaran digital dan memaksimalkan konversi pelanggan secara daring.',
    salaryRange: 'Rp 5.000.000 - Rp 15.000.000/bulan',
    growthOutlook: '10%',
    skills: [
      { name: 'Google Ads', required: 3 }, // 50% market demand
      { name: 'Meta Ads', required: 2 }, // 42% market demand
      { name: 'A/B Testing', required: 2 }, // 36% market demand
      { name: 'SEO', required: 2 }, // 36% market demand
      { name: 'ROAS', required: 2 }, // 35% market demand
      { name: 'Conversion Rate', required: 2 }, // 35% market demand
      { name: 'Cross-Functional Collaboration', required: 3 }, // 66% market demand
      { name: 'Analytical Thinking', required: 3 }, // 59% market demand
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Dasar',
        subtitle: 'Pahami Ekosistem Digital',
        description: 'Pelajari dasar-dasar digital marketing dan bagaimana audiens berinteraksi secara online.',
        modules: ['Fundamental Digital Marketing', 'SEO Dasar (On-page & Off-page)', 'Dasar Copywriting Iklan', 'Pengenalan Google Analytics', 'Riset Keyword Terapan'],
        duration: '6–8 minggu',
      },
      {
        phase: 2,
        title: 'Menengah',
        subtitle: 'Eksekusi Kampanye Berbayar',
        description: 'Mulai jalankan dan optimasi iklan di berbagai platform.',
        modules: ['Google Ads & SEM', 'Meta Ads (Facebook/IG)', 'TikTok Ads & Tren Video', 'A/B Testing Kampanye', 'Pembuatan Landing Page'],
        duration: '8–10 minggu',
      },
      {
        phase: 3,
        title: 'Lanjutan',
        subtitle: 'Optimalisasi Funneling',
        description: 'Kuasai teknik konversi dan pelacakan metrik secara end-to-end.',
        modules: ['Funneling Strategy & Retargeting', 'Google Tag Manager Lanjut', 'CRM & Email Marketing Dasar', 'Analisis Cohort & LTV', 'Optimasi Conversion Rate (CRO)'],
        duration: '10–12 minggu',
      },
      {
        phase: 4,
        title: 'Mahir',
        subtitle: 'Pimpin Pertumbuhan Digital',
        description: 'Rancang strategi holistik dan pimpin inisiatif pertumbuhan pendapatan.',
        modules: ['Strategi Omnichannel Marketing', 'Marketing Automation', 'Alokasi Budget Eksekutif', 'Negosiasi Kemitraan Digital', 'Kepemimpinan Proyek Growth'],
        duration: '12–16 minggu',
      },
    ],
  },
  {
    id: 'hr-business-partner',
    title: 'Business Development / Account Executive',
    trait: 'The Connector',
    icon: '🤝',
    description: 'Membangun relasi strategis, memperluas pasar, dan mendorong pertumbuhan penjualan B2B.',
    salaryRange: 'Rp 6.000.000 - Rp 14.000.000/bulan',
    growthOutlook: '9%',
    skills: [
      { name: 'Sales Pipeline Management', required: 3 }, // 69.8% market demand
      { name: 'Lead Generation', required: 3 }, // 66% market demand
      { name: 'B2B Sales', required: 3 }, // 66% market demand
      { name: 'Sales Target Achievement', required: 3 }, // 66% market demand
      { name: 'Account Management', required: 3 }, // 64.2% market demand
      { name: 'Business Development', required: 3 }, // 62.3% market demand
      { name: 'Relationship Building', required: 3 }, // 83% market demand
      { name: 'Communication Skills', required: 3 }, // 83% market demand
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Dasar',
        subtitle: 'Kuasai Fundamental Sales',
        description: 'Pelajari dasar-dasar penjualan dan cara melakukan prospek.',
        modules: ['Teknik Cold Calling', 'Email Outreach yang Efektif', 'Fundamental B2B Sales', 'Penggunaan LinkedIn Dasar', 'Dasar Komunikasi Bisnis'],
        duration: '6–8 minggu',
      },
      {
        phase: 2,
        title: 'Menengah',
        subtitle: 'Kelola Relasi dan Pipeline',
        description: 'Mulai menggunakan CRM untuk melacak prospek dan peluang.',
        modules: ['Manajemen CRM (HubSpot/Salesforce)', 'Teknik Discovery Call', 'Presentasi Sales (Pitching)', 'Social Selling (LinkedIn Lanjut)', 'Proyeksi Penjualan (Forecasting)'],
        duration: '8–10 minggu',
      },
      {
        phase: 3,
        title: 'Lanjutan',
        subtitle: 'Penutupan dan Negosiasi',
        description: 'Kembangkan strategi negosiasi dan analisis metrik keuntungan.',
        modules: ['Strategi Negosiasi Lanjut', 'Analisis Market & ROI', 'Penanganan Keberatan (Objection Handling)', 'Key Account Management', 'Penyusunan Kontrak Bisnis'],
        duration: '10–12 minggu',
      },
      {
        phase: 4,
        title: 'Mahir',
        subtitle: 'Pimpin Ekspansi Pasar',
        description: 'Bangun kemitraan strategis bernilai tinggi dan arahkan strategi bisnis.',
        modules: ['Strategi Ekspansi Teritorial', 'Kemitraan Strategis B2B (Partnerships)', 'Account Planning Tingkat Eksekutif', 'Mentoring Tim Sales', 'Manajemen Portofolio Klien Enterprise'],
        duration: '12–16 minggu',
      },
    ],
  },

  // ── Karier Entrepreneurial ──
  {
    id: 'startup-founder',
    title: 'Software Engineer (Front/Back/Full-Stack)',
    trait: 'The Builder',
    icon: '💻',
    description: 'Membangun aplikasi perangkat lunak dari nol, merancang arsitektur sistem yang scalable.',
    salaryRange: 'Rp 8.000.000 - Rp 15.000.000/bulan',
    growthOutlook: '22%',
    skills: [
      { name: 'Golang', required: 3 }, // 50.6% market demand
      { name: 'REST API', required: 2 }, // 41% market demand
      { name: 'Java', required: 2 }, // 30.1% market demand
      { name: 'Python', required: 2 }, // 28.9% market demand
      { name: 'PostgreSQL', required: 2 }, // 27.7% market demand
      { name: 'SQL', required: 2 }, // 27.7% market demand
      { name: 'Cross-Functional Collaboration', required: 3 }, // 50.6% market demand
      { name: 'Problem Solving', required: 2 }, // 38.6% market demand
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Dasar',
        subtitle: 'Validasi kemampuan koding',
        description: 'Pelajari dasar pemrograman web dan algoritma penyelesaian masalah.',
        modules: ['HTML, CSS, dan JS Dasar', 'Struktur Data Dasar', 'Dasar Version Control (Git)', 'Membuat Halaman Statis', 'Logika Pemrograman Dasar'],
        duration: '6–8 minggu',
      },
      {
        phase: 2,
        title: 'Menengah',
        subtitle: 'Bangun fitur dinamis',
        description: 'Buat aplikasi web dinamis dan pahami integrasi API.',
        modules: ['Framework Frontend (React/Vue)', 'Pengenalan Backend (Node/Python)', 'Integrasi REST API', 'Pemodelan Database Relasional', 'Pemahaman Asynchronous Programming'],
        duration: '8–10 minggu',
      },
      {
        phase: 3,
        title: 'Lanjutan',
        subtitle: 'Arsitektur skala menengah',
        description: 'Tumbuhkan kemampuan membangun sistem end-to-end yang tangguh dan teruji.',
        modules: ['Desain Arsitektur Microservices', 'Pengujian Unit (TDD/BDD)', 'Manajemen State Global', 'Optimasi Query Database', 'Keamanan Aplikasi Web'],
        duration: '10–12 minggu',
      },
      {
        phase: 4,
        title: 'Mahir',
        subtitle: 'Pimpin rekayasa perangkat lunak',
        description: 'Pimpin inisiatif arsitektur berskala besar dan bangun infrastruktur handal.',
        modules: ['Desain Sistem Skala Besar (System Design)', 'Kinerja dan Skalabilitas Ekstrem', 'Cloud Native Development', 'Mentoring Insinyur Muda', 'Strategi Infrastruktur Global'],
        duration: '12–16 minggu',
      },
    ],
  },
  {
    id: 'product-manager',
    title: 'DevOps Engineer / QA Automation Engineer',
    trait: 'The Builder',
    icon: '⚙️',
    description: 'Membangun pipeline otomatisasi pengujian dan penyebaran untuk siklus rilis yang cepat dan stabil.',
    salaryRange: 'Rp 7.500.000 - Rp 14.000.000/bulan',
    growthOutlook: '21%',
    skills: [
      { name: 'CI/CD Pipeline', required: 3 }, // 83.7% market demand
      { name: 'AWS', required: 3 }, // 67.4% market demand
      { name: 'Docker', required: 3 }, // 65.1% market demand
      { name: 'Kubernetes', required: 3 }, // 55.8% market demand
      { name: 'Google Cloud Platform', required: 3 }, // 53.5% market demand
      { name: 'Infrastructure as Code', required: 2 }, // 46.5% market demand
      { name: 'Cross-Functional Collaboration', required: 2 }, // 46.5% market demand
      { name: 'Communication Skills', required: 2 }, // 32.6% market demand
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Dasar',
        subtitle: 'Berpikir seperti insinyur sistem',
        description: 'Pahami prinsip otomatisasi infrastruktur dan pengujian.',
        modules: ['Pengenalan Linux & Command Line', 'Dasar Shell Scripting', 'Konsep Dasar QA (Manual vs Auto)', 'Git Workflow Lanjutan', 'Fundamental Jaringan Komputer'],
        duration: '6–8 minggu',
      },
      {
        phase: 2,
        title: 'Menengah',
        subtitle: 'Otomatisasi pengujian dan container',
        description: 'Pelajari cara membuat container aplikasi dan menjalankan tes otomatis.',
        modules: ['Membuat Dockerfile', 'Pengujian E2E (Cypress/Selenium)', 'Setup CI Dasar (GitHub Actions)', 'Analisis dan Pelaporan Defect', 'Validasi Database'],
        duration: '8–10 minggu',
      },
      {
        phase: 3,
        title: 'Lanjutan',
        subtitle: 'Orkestrasi dan deployment awan',
        description: 'Kuasai platform orkestrasi, provisioning cloud, dan pemantauan sistem.',
        modules: ['Dasar Kubernetes (Pods & Services)', 'Infrastructure as Code (Terraform)', 'Pipeline CI/CD Lengkap', 'Monitoring & Logging (Prometheus/Grafana)', 'Uji Beban & Performa'],
        duration: '10–12 minggu',
      },
      {
        phase: 4,
        title: 'Mahir',
        subtitle: 'Bentuk keandalan sistem',
        description: 'Pimpin rekayasa keandalan situs (SRE) dan arsitektur awan enterprise.',
        modules: ['Arsitektur Cloud Enterprise Tingkat Lanjut', 'Chaos Engineering', 'Otomatisasi Keamanan (DevSecOps)', 'Strategi Rilis Lanjutan (Canary/Blue-Green)', 'Kultur Keandalan & Mentoring'],
        duration: '12–16 minggu',
      },
    ],
  },
  // ── Karier Desain Grafis (Visual Creative) ──
  {
    id: 'graphic-designer',
    title: 'Graphic Designer / Visual Designer',
    trait: 'The Creator',
    icon: '🎨',
    description: 'Merancang identitas visual, materi promosi kreatif, dan aset branding yang memikat untuk berbagai media digital maupun cetak.',
    salaryRange: 'Rp 4.500.000 - Rp 9.000.000/bulan',
    growthOutlook: '15%',
    skills: [
      { name: 'Adobe Photoshop', required: 3 }, // 66.3% market demand
      { name: 'Adobe Illustrator', required: 3 }, // 65.1% market demand
      { name: 'Branding', required: 3 }, // 62.8% market demand
      { name: 'Ad Creative Design', required: 3 }, // 50% market demand
      { name: 'Art Direction', required: 2 }, // 43% market demand
      { name: 'Adobe Creative Suite', required: 2 }, // 38.4% market demand
      { name: 'Creative Thinking', required: 3 }, // 54.7% market demand
      { name: 'Time Management', required: 3 }, // 54.7% market demand
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Dasar',
        subtitle: 'Prinsip desain visual dan software inti',
        description: 'Kuasai teori warna, tipografi, komposisi grid, serta tools standar industri (Adobe Photoshop & Illustrator).',
        modules: ['Teori Warna, Tipografi & Komposisi Grid', 'Mastering Adobe Illustrator (Vector Artwork)', 'Mastering Adobe Photoshop (Photo Manipulation)', 'Dasar Layout Desain Grafis', 'Eksplorasi Asset & Resource Desain'],
        duration: '6–8 minggu',
      },
      {
        phase: 2,
        title: 'Menengah',
        subtitle: 'Desain promosi & creative ads',
        description: 'Terapkan visual design untuk kampanye pemasaran digital, media sosial, dan materi iklan berkinerja tinggi.',
        modules: ['Ad Creative Design (Meta & TikTok Ads)', 'Social Media Feed & Carousel System', 'Branding Kit & Visual Identity', 'Digital Banner & Display Ads', 'Persiapan File Cetak & Pre-press'],
        duration: '8–10 minggu',
      },
      {
        phase: 3,
        title: 'Lanjutan',
        subtitle: 'Motion graphic & brand storytelling',
        description: 'Tingkatkan daya tarik visual dengan animasi gerak dasar dan perancangan brand guidelines komprehensif.',
        modules: ['Dasar Motion Graphic (After Effects)', 'Penyusunan Brand Guidelines Lengkap', 'Art Direction & Moodboarding', 'Visual Storytelling untuk Kampanye Terpadu', 'Desain Kemasan (Packaging Design)'],
        duration: '10–12 minggu',
      },
      {
        phase: 4,
        title: 'Mahir',
        subtitle: 'Kepemimpinan kreatif & portofolio global',
        description: 'Kelola tim kreatif, arahkan strategi artistik visual brand, dan bangun portofolio profesional berstandar internasional.',
        modules: ['Art Direction & Creative Strategy', 'Manajemen Proyek Desain & Klien', 'Pitching Ide & Presentasi Kreatif', 'Portofolio Profesional (Behance/Dribbble)', 'Manajemen Hak Cipta & Aset Kreatif'],
        duration: '12–16 minggu',
      },
    ],
  },
  // ── Karier E-Commerce & Dropship ──
  {
    id: 'ecommerce-specialist',
    title: 'E-Commerce Specialist / Dropshipper',
    trait: 'The Builder',
    icon: '🛒',
    description: 'Mengelola operasional toko online di berbagai marketplace, optimasi konversi penjualan, manajemen katalog dan inventaris, serta strategi promosi multi-channel.',
    salaryRange: 'Rp 5.000.000 - Rp 12.000.000/bulan',
    growthOutlook: '25%',
    skills: [
      { name: 'TikTok Shop Operations', required: 2 }, // 31.3% market demand
      { name: 'Shopee Operations', required: 2 }, // 28.1% market demand
      { name: 'Lazada Operations', required: 1 }, // 18.8% market demand
      { name: 'Conversion Rate Optimization', required: 1 }, // 15.6% market demand
      { name: 'Inventory Management', required: 1 }, // 15.6% market demand
      { name: 'Tokopedia Operations', required: 1 }, // 15.6% market demand
      { name: 'Analytical Thinking', required: 3 }, // 65.6% market demand
      { name: 'Cross-Functional Collaboration', required: 3 }, // 62.5% market demand
    ],
    roadmap: [
      {
        phase: 1,
        title: 'Dasar',
        subtitle: 'Setup & operasional marketplace',
        description: 'Pelajari dasar-dasar ekosistem e-commerce Indonesia, setup akun toko, dan optimasi listing produk.',
        modules: ['Ekosistem Marketplace (Shopee, Tokopedia, TikTok Shop)', 'Product Listing & SEO Judul Produk', 'Manajemen Stok & Logistik Dasar', 'Customer Service & Chat Broadcast', 'Tools Dekorasi Toko Online'],
        duration: '6–8 minggu',
      },
      {
        phase: 2,
        title: 'Menengah',
        subtitle: 'Iklan marketplace & promosi campaign',
        description: 'Kuasai fitur promosi internal marketplace, iklan berbayar (Shopee Ads / TikTok Ads), dan partisipasi mega campaign.',
        modules: ['Shopee Ads & Tokopedia TopAds', 'TikTok Shop Affiliate & Creator Collaboration', 'Strategi Kampanye Flash Sale & Tanggal Kembar', 'Optimasi Conversion Rate (CRO) Produk', 'Analisis Dashboard Penjualan'],
        duration: '8–10 minggu',
      },
      {
        phase: 3,
        title: 'Lanjutan',
        subtitle: 'Manajemen dropship & multi-channel inventory',
        description: 'Kelola rantai pasok dropship, integrasi order multi-channel, dan strategi penetapan harga yang kompetitif.',
        modules: ['Sistem Dropship & Sourcing Supplier Tepercaya', 'Integrasi Multi-Channel (Omnichannel Tools)', 'Inventory & Cashflow Forecasting', 'Live Streaming Selling Tactics', 'Manajemen Retur & Penanganan Komplain Lanjutan'],
        duration: '10–12 minggu',
      },
      {
        phase: 4,
        title: 'Mahir',
        subtitle: 'Skalabilitas brand & private label',
        description: 'Kembangkan toko online menjadi private label brand yang berkelanjutan dengan unit economics yang sehat.',
        modules: ['Membangun Brand Toko Mandiri (Private Label)', 'Unit Economics & Profit Margin Optimization', 'Otomatisasi Operasional & SOP Tim Gudang/Admin', 'Ekspansi Cross-Border E-Commerce', 'Retensi Pelanggan & Program Loyalitas'],
        duration: '12–16 minggu',
      },
    ],
  },
];

// ──────────────────────────────────────────────
// Helper utilities
// ──────────────────────────────────────────────

export const SKILL_LABELS: Record<number, string> = {
  0: 'Tidak Ada Pengalaman',
  1: 'Dasar',
  2: 'Menengah',
  3: 'Lanjutan',
};

export function computeTraitScores(
  answers: Record<number, number>
): Record<Trait, number> {
  const scores: Record<Trait, number> = {
    'The Thinker': 0,
    'The Creator': 0,
    'The Connector': 0,
    'The Builder': 0,
  };

  for (const question of ASSESSMENT_QUESTIONS) {
    const optionIndex = answers[question.id];
    if (optionIndex !== undefined) {
      const trait = question.options[optionIndex].trait;
      scores[trait] += 1;
    }
  }

  return scores;
}

export function getDominantTrait(
  scores: Record<Trait, number>
): Trait | null {
  let maxTrait: Trait | null = null;
  let maxScore = 0;

  for (const trait of TRAITS) {
    if (scores[trait] > maxScore) {
      maxScore = scores[trait];
      maxTrait = trait;
    }
  }

  return maxTrait;
}

export function getTraitRadarData(scores: Record<Trait, number>) {
  return TRAITS.map((trait) => ({
    trait,
    value: scores[trait],
    fullMark: ASSESSMENT_QUESTIONS.length,
  }));
}

export function getSkillGapData(
  career: CareerProfile,
  userRatings: Record<string, number>
) {
  return career.skills.map((skill) => ({
    name: skill.name,
    required: skill.required,
    current: userRatings[skill.name] ?? 0,
    delta: skill.required - (userRatings[skill.name] ?? 0),
  }));
}

export function getRecommendedCareers(dominantTrait: Trait | null): CareerProfile[] {
  if (!dominantTrait) return [];
  return CAREER_PROFILES.filter((c) => c.trait === dominantTrait);
}

export function getArchetypeReasoning(scores: Record<Trait, number>): string {
  const sortedTraits = Object.entries(scores).sort(([, a], [, b]) => b - a) as [Trait, number][];
  const [primaryTrait, primaryScore] = sortedTraits[0];
  const [secondaryTrait, secondaryScore] = sortedTraits[1];

  // Hybrid edge case: if the difference is very small (e.g. <= 1)
  if (primaryScore - secondaryScore <= 1 && secondaryScore > 0) {
    return `Skor kamu sangat seimbang antara ${TRAIT_META[primaryTrait].label} (${primaryScore}) dan ${TRAIT_META[secondaryTrait].label} (${secondaryScore}). Ini menunjukkan kamu adalah talenta "Hybrid" yang mampu memadukan pola pikir dominan dari keduanya secara fleksibel.`;
  }

  // Deterministic mapping for clear dominant traits
  const mapping: Record<Trait, string> = {
    'The Thinker': `Kamu paling dominan di The Thinker karena kecenderungan kamu menjawab dengan pendekatan analitis dan terstruktur. Kamu lebih suka mengurai masalah secara logis dan mengandalkan data dibanding asumsi. Skor kamu: Thinker (${scores['The Thinker']}), Creator (${scores['The Creator']}), Connector (${scores['The Connector']}), Builder (${scores['The Builder']}).`,
    'The Creator': `Kamu paling dominan di The Creator karena kecenderungan kamu menjawab dengan ide-ide orisinal dan inovatif. Kamu lebih suka bereksperimen dan menemukan cara-cara tidak konvensional. Skor kamu: Thinker (${scores['The Thinker']}), Creator (${scores['The Creator']}), Connector (${scores['The Connector']}), Builder (${scores['The Builder']}).`,
    'The Connector': `Kamu paling dominan di The Connector karena kecenderungan kamu menjawab dengan fokus pada empati dan komunikasi tim. Kamu unggul dalam menyatukan ide dan menjaga keselarasan visi bersama. Skor kamu: Thinker (${scores['The Thinker']}), Creator (${scores['The Creator']}), Connector (${scores['The Connector']}), Builder (${scores['The Builder']}).`,
    'The Builder': `Kamu paling dominan di The Builder karena kecenderungan kamu menjawab dengan pendekatan aksi nyata dan eksekusi cepat. Kamu berorientasi pada penciptaan produk akhir dan efisiensi sistem. Skor kamu: Thinker (${scores['The Thinker']}), Creator (${scores['The Creator']}), Connector (${scores['The Connector']}), Builder (${scores['The Builder']}).`
  };

  return mapping[primaryTrait];
}

export function findCareerProfile(identifier?: string | null): CareerProfile | undefined {
  if (!identifier) return undefined;
  const clean = identifier.trim().toLowerCase();

  // 1. Direct match by ID
  const byId = CAREER_PROFILES.find((c) => c.id.toLowerCase() === clean);
  if (byId) return byId;

  // 2. Direct match by Title
  const byTitle = CAREER_PROFILES.find((c) => c.title.toLowerCase() === clean);
  if (byTitle) return byTitle;

  // 3. Keyword / partial matching
  if (clean.includes('graphic design') || clean.includes('visual designer') || clean.includes('desainer grafis') || clean.includes('digital creative product designer')) {
    return CAREER_PROFILES.find((c) => c.id === 'graphic-designer');
  }
  if (clean.includes('ecommerce') || clean.includes('e-commerce') || clean.includes('dropship') || clean.includes('dropshipper') || clean.includes('shopee') || clean.includes('tokopedia')) {
    return CAREER_PROFILES.find((c) => c.id === 'ecommerce-specialist');
  }
  if (clean.includes('devops') || clean.includes('qa automation') || clean.includes('quality assurance')) {
    return CAREER_PROFILES.find((c) => c.id === 'product-manager');
  }
  if (clean.includes('software engineer') || clean.includes('front-end') || clean.includes('back-end') || clean.includes('full-stack') || clean.includes('developer')) {
    return CAREER_PROFILES.find((c) => c.id === 'startup-founder');
  }
  if (clean.includes('ui/ux') || clean.includes('ux designer') || clean.includes('product designer')) {
    return CAREER_PROFILES.find((c) => c.id === 'ux-designer');
  }
  if (clean.includes('data analyst') || clean.includes('business intelligence') || clean.includes('bi analyst')) {
    return CAREER_PROFILES.find((c) => c.id === 'data-scientist');
  }
  if (clean.includes('ai/ml') || clean.includes('machine learning') || clean.includes('ai engineer')) {
    return CAREER_PROFILES.find((c) => c.id === 'ai-ml-engineer');
  }
  if (clean.includes('content creator') || clean.includes('social media')) {
    return CAREER_PROFILES.find((c) => c.id === 'content-strategist');
  }
  if (clean.includes('digital marketing') || clean.includes('community manager') || clean.includes('seo') || clean.includes('growth')) {
    return CAREER_PROFILES.find((c) => c.id === 'community-manager');
  }
  if (clean.includes('business development') || clean.includes('account executive') || clean.includes('sales')) {
    return CAREER_PROFILES.find((c) => c.id === 'hr-business-partner');
  }
  if (clean.includes('data researcher') || clean.includes('strategy analyst') || clean.includes('researcher')) {
    return CAREER_PROFILES.find((c) => c.id === 'research-scientist');
  }

  // 4. Fuzzy includes
  return CAREER_PROFILES.find(
    (c) => clean.includes(c.id) || c.id.includes(clean) || clean.includes(c.title.toLowerCase()) || c.title.toLowerCase().includes(clean)
  );
}

export function formatShortCareer(title?: string | null): string {
  if (!title) return 'Karier';
  // Remove parenthetical notes like (Front/Back/Full-Stack) or (Front-End & Mobile focus)
  let clean = title.replace(/\s*\([^)]*\)/g, '').trim();
  // Split on " / " with spaces around slash (preserves UI/UX and AI/ML)
  if (clean.includes(' / ')) {
    clean = clean.split(' / ')[0].trim();
  }
  return clean || title;
}




// Re-export market data enrichment
export { CAREER_MARKET_DATA, getCareerMarketData } from './careerMarketData';
export type { CareerMarketInsight, MarketSkillData } from './careerMarketData';
