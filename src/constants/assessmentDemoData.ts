export interface DemoChoice {
    id: string;
    text: string;
    isCorrectChoice?: boolean;
}

export interface DemoQuestion {
    stepLabel: string;
    questionNumber: string;
    progressPercent: number;
    progressLabel: string;
    scenarioTitle: string;
    questionText: string;
    choices: DemoChoice[];
}

export interface SkillItem {
    name: string;
    userLevel: number;
    requiredLevel: number;
    isPriority?: boolean;
}

export interface CareerRoleData {
    role: string;
    readinessScore: number;
    status: "Perlu dikembangkan" | "Cukup siap" | "Siap";
    skills: SkillItem[];
    biggestGap: string;
    gapNote: string;
}

export interface ArchetypeBar {
    label: string;
    val: number;
}

export const DEMO_QUESTIONS: DemoQuestion[] = [
    {
        stepLabel: "Pertanyaan 3 dari 15",
        questionNumber: "03/15",
        progressPercent: 20,
        progressLabel: "20% Selesai",
        scenarioTitle: "KASUS SITUASIONAL",
        questionText: "Saat memulai proyek baru dalam tim, bagian mana yang paling menarik perhatianmu terlebih dahulu?",
        choices: [
            { id: "A", text: "Membedah struktur logika dan arsitektur sistem" },
            { id: "B", text: "Merancang tampilan visual dan alur interaksi pengguna" },
            { id: "C", text: "Menghubungkan kolaborasi tim dan strategi komunikasi" },
        ],
    },
    {
        stepLabel: "Pertanyaan 4 dari 15",
        questionNumber: "04/15",
        progressPercent: 27,
        progressLabel: "27% Selesai",
        scenarioTitle: "KASUS SITUASIONAL",
        questionText: "Ketika sistem menghadapi kendala tak terduga, apa reaksi alamimu?",
        choices: [
            { id: "A", text: "Melacak akar masalah teknis baris demi baris" },
            { id: "B", text: "Mencari solusi kreatif dan eksplorasi alternatif visual" },
            { id: "C", text: "Mengomunikasikan kendala ke tim dan menyelaraskan solusi" },
        ],
    },
    {
        stepLabel: "Pertanyaan 8 dari 15",
        questionNumber: "08/15",
        progressPercent: 53,
        progressLabel: "53% Selesai",
        scenarioTitle: "KASUS SITUASIONAL",
        questionText: "Dalam memilih tantangan baru, apa faktor yang paling memotivasimu?",
        choices: [
            { id: "A", text: "Mengoptimalkan performa dan efisiensi produk berskala besar" },
            { id: "B", text: "Menciptakan prototipe desain yang inovatif dan estetik" },
            { id: "C", text: "Memimpin strategi pertumbuhan dan negosiasi lintas divisi" },
        ],
    },
];

export const DEMO_ARCHETYPES: ArchetypeBar[] = [
    { label: "The Thinker", val: 85 },
    { label: "The Creator", val: 70 },
    { label: "The Connector", val: 90 },
    { label: "The Builder", val: 95 },
];

export const CAREER_ROLES_DATA: Record<string, CareerRoleData> = {
    "Software Engineer": {
        role: "Software Engineer",
        readinessScore: 68,
        status: "Cukup siap",
        skills: [
            { name: "Pemrograman Dasar", userLevel: 80, requiredLevel: 85 },
            { name: "Struktur Data", userLevel: 60, requiredLevel: 80 },
            { name: "System Design", userLevel: 40, requiredLevel: 75, isPriority: true },
        ],
        biggestGap: "System Design",
        gapNote: "Gap terbesar: System Design. Roadmap belajarmu mulai dari sini.",
    },
    "Data Analyst": {
        role: "Data Analyst",
        readinessScore: 54,
        status: "Cukup siap",
        skills: [
            { name: "SQL & Querying", userLevel: 75, requiredLevel: 80 },
            { name: "Statistika Terapan", userLevel: 50, requiredLevel: 75 },
            { name: "Data Modeling", userLevel: 35, requiredLevel: 75, isPriority: true },
        ],
        biggestGap: "Data Modeling",
        gapNote: "Gap terbesar: Data Modeling. Roadmap belajarmu mulai dari sini.",
    },
    "UI/UX Designer": {
        role: "UI/UX Designer",
        readinessScore: 74,
        status: "Cukup siap",
        skills: [
            { name: "Figma Auto-Layout & UI Systems", userLevel: 85, requiredLevel: 85 },
            { name: "Design Tokens & Handoff", userLevel: 65, requiredLevel: 80 },
            { name: "Usability Testing & Metrics", userLevel: 45, requiredLevel: 75, isPriority: true },
        ],
        biggestGap: "Usability Testing & Metrics",
        gapNote: "Gap terbesar: Usability Testing & Metrics. Roadmap belajarmu mulai dari sini.",
    },
};

export const RIASEC_TYPES = [
    {
        code: "R",
        name: "Realistic",
        sub: "Praktis & Teknikal",
        desc: "Menyukai kegiatan yang melibatkan manipulasi objek, mesin, peralatan, dan bekerja secara langsung dengan solusi konkret.",
    },
    {
        code: "I",
        name: "Investigative",
        sub: "Analisis & Riset",
        desc: "Gemar mengamati, menganalisis, mengevaluasi data, serta memecahkan problem ilmiah atau komputasi yang rumit.",
    },
    {
        code: "A",
        name: "Artistic",
        sub: "Eksploratif Kreatif",
        desc: "Mengedepankan ekspresi diri, inovasi visual, dan kebebasan berpikir tanpa aturan yang terlalu kaku.",
    },
    {
        code: "S",
        name: "Social",
        sub: "Membantu & Interaksi",
        desc: "Memiliki empati tinggi untuk mengajar, membimbing, memberi pendampingan, dan mengembangkan potensi orang lain.",
    },
    {
        code: "E",
        name: "Enterprising",
        sub: "Memimpin & Negosiasi",
        desc: "Tertarik memimpin proyek, memengaruhi orang lain, mengambil keputusan strategis, dan mengejar target ambisius.",
    },
    {
        code: "C",
        name: "Conventional",
        sub: "Struktur & Detail",
        desc: "Ahli dalam mengorganisasi data, menjaga ketelitian alur kerja terstruktur, dan memastikan kepatuhan sistem.",
    },
];

export const MENTORS_DATA = [
    {
        name: "Rizki Teguh Putra",
        role: "Product Manager",
        company: "Tokopedia",
        image: "/images/mentor/mentor-1.png",
    },
    {
        name: "Gisellia Agnes",
        role: "HR Business Partner",
        company: "Gojek",
        image: "/images/mentor/mentor-2.png",
    },
    {
        name: "Fadel Alfarisi",
        role: "Data Analyst",
        company: "Traveloka",
        image: "/images/mentor/mentor-3.png",
    },
];

export const PARTNERS_DATA = [
    { name: "LinkedIn", image: "/images/partner/linkedin.png" },
    { name: "Dealls", image: "/images/partner/dealls.png" },
    { name: "Glints", image: "/images/partner/glints.png" },
    { name: "Jobstreet", image: "/images/partner/jobstreet.png" },
];
