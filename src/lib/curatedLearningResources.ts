export interface LearningResourceItem {
  title: string;
  provider: string;
  type: "Course" | "Artikel" | "Video" | "Dokumentasi";
  isFree: boolean;
  price?: string;
  url: string;
}

export interface CuratedModuleDetail {
  slug: string;
  title: string;
  duration: string;
  target: string;
  breakdown: Array<{ title: string; description: string }>;
  resources: LearningResourceItem[];
}

export interface CareerDomainConfig {
  domainTitle: string;
  courseProvider: string;
  courseSearchUrl: (q: string) => string;
  docProvider: string;
  docSearchUrl: (q: string) => string;
  articleProvider: string;
  articleSearchUrl: (q: string) => string;
  videoQuerySuffix: string;
}

export const CAREER_DOMAIN_CONFIGS: Record<string, CareerDomainConfig> = {
  "hr-business-partner": {
    domainTitle: "B2B Sales & Business Development",
    courseProvider: "HubSpot Academy",
    courseSearchUrl: (q) => `https://academy.hubspot.com/courses?query=${encodeURIComponent(q + " sales")}`,
    docProvider: "Close.com / Sales Playbook",
    docSearchUrl: (q) => `https://www.close.com/resources?q=${encodeURIComponent(q)}`,
    articleProvider: "Harvard Business Review / Sales Hacker",
    articleSearchUrl: (q) => `https://www.saleshacker.com/?s=${encodeURIComponent(q)}`,
    videoQuerySuffix: "tutorial b2b sales prospecting closing",
  },
  "ecommerce-specialist": {
    domainTitle: "E-Commerce & Marketplace Specialist",
    courseProvider: "Shopee Seller Education Hub",
    courseSearchUrl: (q) => `https://seller.shopee.co.id/edu/search?keyword=${encodeURIComponent(q)}`,
    docProvider: "Tokopedia Pusat Edukasi Seller",
    docSearchUrl: (q) => `https://seller.tokopedia.com/edu/search?keyword=${encodeURIComponent(q)}`,
    articleProvider: "TikTok Shop Academy",
    articleSearchUrl: (q) => `https://seller-id.tiktok.com/university/home?q=${encodeURIComponent(q)}`,
    videoQuerySuffix: "tutorial jualan toko online marketplace shopee tokopedia",
  },
  "community-manager": {
    domainTitle: "Digital Marketing Specialist",
    courseProvider: "Google Skillshop",
    courseSearchUrl: (q) => `https://grow.google/certificates/digital-marketing-ecommerce/`,
    docProvider: "Meta Blueprint / Google Search Central",
    docSearchUrl: (q) => `https://developers.google.com/search/docs?hl=id&q=${encodeURIComponent(q)}`,
    articleProvider: "Ahrefs / HubSpot Blog",
    articleSearchUrl: (q) => `https://ahrefs.com/blog/?s=${encodeURIComponent(q)}`,
    videoQuerySuffix: "tutorial digital marketing seo ads campaign",
  },
  "content-strategist": {
    domainTitle: "Content Creation & Social Media",
    courseProvider: "HubSpot Academy (Content Marketing)",
    courseSearchUrl: (q) => `https://academy.hubspot.com/courses?query=${encodeURIComponent(q + " content")}`,
    docProvider: "YouTube Creator Academy",
    docSearchUrl: (q) => `https://www.youtube.com/creators/`,
    articleProvider: "Copyblogger / Hootsuite Blog",
    articleSearchUrl: (q) => `https://copyblogger.com/?s=${encodeURIComponent(q)}`,
    videoQuerySuffix: "tutorial content creator copywriting social media",
  },
  "graphic-designer": {
    domainTitle: "Graphic & Visual Design",
    courseProvider: "Canva Design School / Coursera",
    courseSearchUrl: (q) => `https://www.canva.com/designschool/tutorials/?query=${encodeURIComponent(q)}`,
    docProvider: "Adobe Help & Tutorials",
    docSearchUrl: (q) => `https://www.canva.com/design-school/explore/?query=${encodeURIComponent(q)}`,
    articleProvider: "Behance / Envato Tuts+",
    articleSearchUrl: (q) => `https://www.behance.net/search/projects?search=${encodeURIComponent(q)}`,
    videoQuerySuffix: "tutorial graphic design illustrator photoshop typography",
  },
  "ux-designer": {
    domainTitle: "UI/UX & Product Design",
    courseProvider: "Coursera (Google UX Design)",
    courseSearchUrl: (q) => `https://www.coursera.org/search?query=${encodeURIComponent(q + " UX Design")}`,
    docProvider: "Figma Help Center & Community",
    docSearchUrl: (q) => `https://help.figma.com/hc/en-us/search?query=${encodeURIComponent(q)}`,
    articleProvider: "Nielsen Norman Group (NN/g)",
    articleSearchUrl: (q) => `https://www.nngroup.com/search/?q=${encodeURIComponent(q)}`,
    videoQuerySuffix: "ui ux design tutorial figma case study",
  },
  "data-scientist": {
    domainTitle: "Data Analyst & Business Intelligence",
    courseProvider: "Mode Analytics SQL / DataCamp",
    courseSearchUrl: (q) => `https://mode.com/sql-tutorial/`,
    docProvider: "Microsoft Power BI / Tableau Docs",
    docSearchUrl: (q) => `https://learn.microsoft.com/en-us/search/?terms=${encodeURIComponent(q + " power bi")}`,
    articleProvider: "Pandas PyData / Towards Data Science",
    articleSearchUrl: (q) => `https://pandas.pydata.org/docs/search.html?q=${encodeURIComponent(q)}`,
    videoQuerySuffix: "tutorial data analyst sql power bi python alex the analyst",
  },
  "research-scientist": {
    domainTitle: "Data Research & Strategic Analysis",
    courseProvider: "Coursera (Research Methodologies)",
    courseSearchUrl: (q) => `https://www.coursera.org/search?query=${encodeURIComponent(q + " Research Methodology")}`,
    docProvider: "Pew Research Center / Statista",
    docSearchUrl: (q) => `https://www.pewresearch.org/search/${encodeURIComponent(q)}`,
    articleProvider: "Harvard Business Review / McKinsey",
    articleSearchUrl: (q) => `https://hbr.org/search?term=${encodeURIComponent(q)}`,
    videoQuerySuffix: "business research strategy quantitative data synthesis tutorial",
  },
  "product-manager": {
    domainTitle: "DevOps & QA Automation Engineer",
    courseProvider: "Linux Journey / Coursera",
    courseSearchUrl: (q) => `https://linuxjourney.com/`,
    docProvider: "Docker / Kubernetes Documentation",
    docSearchUrl: (q) => `https://docs.docker.com/search/?q=${encodeURIComponent(q)}`,
    articleProvider: "GitHub Docs (Actions & CI/CD)",
    articleSearchUrl: (q) => `https://docs.github.com/en/search?query=${encodeURIComponent(q)}`,
    videoQuerySuffix: "tutorial devops qa automation docker kubernetes linux",
  },
  "ai-ml-engineer": {
    domainTitle: "AI & Machine Learning Engineering",
    courseProvider: "DeepLearning.AI / Khan Academy",
    courseSearchUrl: (q) => `https://www.deeplearning.ai/courses/`,
    docProvider: "PyTorch / Hugging Face Official",
    docSearchUrl: (q) => `https://pytorch.org/tutorials/search.html?q=${encodeURIComponent(q)}`,
    articleProvider: "Scikit-Learn / Papers With Code",
    articleSearchUrl: (q) => `https://scikit-learn.org/stable/search.html?q=${encodeURIComponent(q)}`,
    videoQuerySuffix: "machine learning ai python neural network tutorial 3blue1brown",
  },
  "startup-founder": {
    domainTitle: "Software Engineering & Full-Stack",
    courseProvider: "freeCodeCamp",
    courseSearchUrl: (q) => `https://www.freecodecamp.org/news/search/?query=${encodeURIComponent(q)}`,
    docProvider: "MDN Web Docs",
    docSearchUrl: (q) => `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(q)}`,
    articleProvider: "React / Node.js Official Docs",
    articleSearchUrl: (q) => `https://react.dev/learn?q=${encodeURIComponent(q)}`,
    videoQuerySuffix: "software engineering web development programming tutorial",
  },
};

export const HANDCRAFTED_MODULE_DETAILS: Record<string, Partial<CuratedModuleDetail>> = {
  // ── SALES / BUSINESS DEVELOPMENT (hr-business-partner) ──
  "teknik-cold-calling": {
    duration: "Estimasi 2–3 Jam",
    target: "Mampu menyusun script cold calling persuasif, menembus gatekeeper, dan mengamankan jadwal discovery call perdana.",
    breakdown: [
      { title: "1. Anatomi Script Cold Calling", description: "Penyusunan hook 10 detik pertama, value proposition singkat, dan call-to-action yang jelas." },
      { title: "2. Menghadapi Gatekeeper & Penolakan Awal", description: "Strategi komunikasi profesional saat dihadang resepsionis atau sekretaris eksekutif." },
      { title: "3. Simulasi & Pengukuran Metrik", description: "Roleplay interaktif mengatasi 5 jenis objection paling sering dan menghitung rasio konversi call-to-meeting." }
    ],
    resources: [
      {
        title: "HubSpot Academy — Inbound & Outbound Sales Fundamentals",
        provider: "HubSpot Academy",
        type: "Course",
        isFree: true,
        url: "https://academy.hubspot.com/courses/inbound-sales"
      },
      {
        title: "Sales Hacker — Complete Guide to B2B Cold Calling & Scripting",
        provider: "Sales Hacker",
        type: "Artikel",
        isFree: true,
        url: "https://www.saleshacker.com/cold-calling-guide/"
      },
      {
        title: "Tutorial Cold Calling B2B & Simulasi Objection Handling Praktis",
        provider: "YouTube (Sales Mastery)",
        type: "Video",
        isFree: true,
        url: "https://www.youtube.com/results?search_query=cold+calling+techniques+b2b+sales+tutorial"
      },
      {
        title: "Gong — Data-Backed Cold Calling Tips & Discovery Call Playbook",
        provider: "Gong.io",
        type: "Dokumentasi",
        isFree: true,
        url: "https://www.gong.io/blog/cold-calling-tips/"
      }
    ]
  },

  "email-outreach-yang-efektif": {
    duration: "Estimasi 2–3 Jam",
    target: "Menguasai penulisan subject line berdaya klik tinggi, personalisasi pesan B2B, dan sekuens email tindak lanjut (follow-up).",
    breakdown: [
      { title: "1. Formula Subject Line & Personalisasi", description: "Riset cepat profil prospek dan penulisan baris subjek yang relevan tanpa terkesan spam." },
      { title: "2. Struktur Body Email Pendek & Bernilai", description: "Teknik Problem - Value - Low-Friction Ask dalam kurang dari 120 kata." },
      { title: "3. Strategi Sekuens Follow-Up Otomatis", description: "Jadwal dan variasi sudut pandang tindak lanjut 3-5 email untuk memaksimalkan reply rate." }
    ],
    resources: [
      {
        title: "HubSpot Academy — Email Outreach & Lead Nurturing Certification",
        provider: "HubSpot Academy",
        type: "Course",
        isFree: true,
        url: "https://academy.hubspot.com/courses/email-marketing"
      },
      {
        title: "Mailchimp — Panduan Lengkap Email Outreach & Deliverability",
        provider: "Mailchimp Guides",
        type: "Artikel",
        isFree: true,
        url: "https://mailchimp.com/resources/email-marketing-field-guide/"
      },
      {
        title: "Cara Menulis Email Outreach B2B yang Menghasilkan Balasan Eksekutif",
        provider: "YouTube (B2B Growth)",
        type: "Video",
        isFree: true,
        url: "https://www.youtube.com/results?search_query=b2b+cold+email+outreach+tutorial"
      },
      {
        title: "Coursera — High-Impact Business Email Writing & Outreach",
        provider: "Coursera",
        type: "Dokumentasi",
        isFree: true,
        url: "https://www.coursera.org/search?query=cold+email"
      }
    ]
  },

  "fundamental-b2b-sales": {
    duration: "Estimasi 3–4 Jam",
    target: "Memahami tahapan siklus penjualan B2B, kualifikasi prospek (BANT/MEDDIC), dan pemetaan stakeholder pengambil keputusan.",
    breakdown: [
      { title: "1. Siklus Penjualan B2B Modern", description: "Perbedaan fundamental penjualan B2B enterprise vs B2C retail dan dinamika buying committee." },
      { title: "2. Framework Kualifikasi Prospek", description: "Menguji kelayakan prospek dengan model BANT (Budget, Authority, Need, Timeline)." },
      { title: "3. Manajemen Pipeline & Tahap Deal", description: "Mengatur tahapan dari Lead, Discovery, Demo, Proposal, Negosiasi hingga Closed-Won." }
    ],
    resources: [
      {
        title: "Coursera — Fundamentals of B2B Sales & Pipeline Management",
        provider: "Coursera",
        type: "Course",
        isFree: true,
        url: "https://www.coursera.org/learn/b2b-sales"
      },
      {
        title: "Harvard Business Review — The New B2B Sales Process",
        provider: "Harvard Business Review",
        type: "Artikel",
        isFree: true,
        url: "https://hbr.org/2012/07/the-end-of-solution-sales"
      },
      {
        title: "B2B Sales Process Explained: From Prospect to Enterprise Deal Closing",
        provider: "YouTube (Sales Insights)",
        type: "Video",
        isFree: true,
        url: "https://www.youtube.com/results?search_query=fundamental+b2b+sales+process+tutorial"
      },
      {
        title: "Gartner — B2B Buying Journey Framework & Sales Enablement Guide",
        provider: "Gartner",
        type: "Dokumentasi",
        isFree: true,
        url: "https://www.gartner.com/en/sales/insights/b2b-buying-journey"
      }
    ]
  },

  "penggunaan-linkedin-dasar": {
    duration: "Estimasi 2 Jam",
    target: "Memaksimalkan profil LinkedIn profesional untuk social selling, pencarian decision maker, dan inMail connection outreach.",
    breakdown: [
      { title: "1. Optimasi Profil Pribadi Berorientasi Klien", description: "Headline, Summary, dan Featured section yang memposisikan kamu sebagai konsultan tepercaya." },
      { title: "2. Boolean Search & Riset Prospek", description: "Menemukan C-Level dan VP di perusahaan target memakai filter kata kunci LinkedIn gratis." },
      { title: "3. Etika & Taktik Connection Request", description: "Mengirimkan pesan perkenalan 300 karakter yang personal dan relevan dengan konteks bisnis." }
    ],
    resources: [
      {
        title: "LinkedIn Help — Fundamentals of Social Selling & Professional Profile",
        provider: "LinkedIn Official",
        type: "Dokumentasi",
        isFree: true,
        url: "https://www.linkedin.com/help/linkedin/answer/a548443"
      },
      {
        title: "Coursera — Social Selling and B2B Prospecting on LinkedIn",
        provider: "Coursera",
        type: "Artikel",
        isFree: true,
        url: "https://www.coursera.org/search?query=linkedin+social+selling"
      },
      {
        title: "Tutorial Praktis Optimasi Profil & Prospek B2B Sales di LinkedIn",
        provider: "YouTube (Social Selling)",
        type: "Video",
        isFree: true,
        url: "https://www.youtube.com/results?search_query=cara+prospek+b2b+sales+di+linkedin+tutorial"
      },
      {
        title: "Sales Navigator Guide — Best Practices for Finding Key Decision Makers",
        provider: "LinkedIn Sales Solutions",
        type: "Course",
        isFree: true,
        url: "https://business.linkedin.com/sales-solutions/sales-navigator"
      }
    ]
  },

  "dasar-komunikasi-bisnis": {
    duration: "Estimasi 2–3 Jam",
    target: "Mampu menyampaikan argumen bisnis secara terstruktur, membangun rapport cepat, dan mendengarkan aktif saat meeting penjualan.",
    breakdown: [
      { title: "1. Active Listening & Asking Powerful Questions", description: "Teknik mengajukan pertanyaan terbuka untuk menggali rasa sakit bisnis (pain points) klien." },
      { title: "2. Struktur Komunikasi Pyramid Principle", description: "Menyampaikan kesimpulan di awal lalu diikuti data pendukung untuk audiens eksekutif." },
      { title: "3. Bahasa Tubuh & Nada Suara Profesional", description: "Membangun kredibilitas instan baik dalam pertemuan tatap muka maupun video call virtual." }
    ],
    resources: [
      {
        title: "Coursera (Wharton) — Improving Communication Skills in Business",
        provider: "Coursera",
        type: "Course",
        isFree: true,
        url: "https://www.coursera.org/learn/wharton-communication-skills"
      },
      {
        title: "Harvard Business Review — Communicating with Impact and Influence",
        provider: "Harvard Business Review",
        type: "Artikel",
        isFree: true,
        url: "https://hbr.org/topic/communication"
      },
      {
        title: "Komunikasi Efektif & Negosiasi Penjualan untuk B2B Sales Professionals",
        provider: "YouTube (Leadership & Sales)",
        type: "Video",
        isFree: true,
        url: "https://www.youtube.com/results?search_query=business+communication+skills+for+sales"
      },
      {
        title: "Grow with Google — Workplace Communication & Professional Skills",
        provider: "Grow with Google",
        type: "Dokumentasi",
        isFree: true,
        url: "https://grow.google/certificates/"
      }
    ]
  },

  // ── E-COMMERCE SPECIALIST (ecommerce-specialist) ──
  "ekosistem-marketplace-shopee-tokopedia-tiktok-shop": {
    duration: "Estimasi 2–3 Jam",
    target: "Memahami perbedaan algoritma, struktur biaya fee admin, dan karakteristik audiens Shopee, Tokopedia, dan TikTok Shop.",
    breakdown: [
      { title: "1. Komparasi Karakteristik 3 Marketplace Terbesar", description: "Perbandingan perilaku belanja pengguna di Shopee (lifestyle/diskon), Tokopedia (gadget/elektronik), dan TikTok Shop (impulse buying video)." },
      { title: "2. Skema Biaya Admin & Beban Operasional", description: "Perhitungan komisi platform, biaya gratis ongkir xtra, dan margin laba bersih toko." },
      { title: "3. Kepatuhan Kebijakan Penjual & Penalti", description: "Menghindari poin penalti, pembatalan pesanan otomatis, dan menjaga performa reputasi toko." }
    ],
    resources: [
      {
        title: "Shopee Seller Education Hub — Panduan Memulai Jualan di Shopee",
        provider: "Shopee Seller Education",
        type: "Course",
        isFree: true,
        url: "https://seller.shopee.co.id/edu/article/33"
      },
      {
        title: "Tokopedia Pusat Edukasi Seller — Panduan Resmi Membuka Toko Baru",
        provider: "Tokopedia Pusat Edukasi",
        type: "Dokumentasi",
        isFree: true,
        url: "https://seller.tokopedia.com/edu/"
      },
      {
        title: "Tutorial Membuka & Mengelola Toko di Shopee & TikTok Shop dari Nol",
        provider: "YouTube (E-Commerce Academy)",
        type: "Video",
        isFree: true,
        url: "https://www.youtube.com/results?search_query=tutorial+memulai+jualan+shopee+tiktok+shop"
      },
      {
        title: "TikTok Shop Academy — Panduan Onboarding Seller & Verifikasi Toko",
        provider: "TikTok Shop Academy",
        type: "Artikel",
        isFree: true,
        url: "https://seller-id.tiktok.com/university/home"
      }
    ]
  },

  "product-listing-seo-judul-produk": {
    duration: "Estimasi 2 Jam",
    target: "Mampu menyusun judul produk berbasis kata kunci pencarian terbanyak dan deskripsi produk yang meningkatkan rasio konversi.",
    breakdown: [
      { title: "1. Formula Struktur Judul Produk Marketplace", description: "Penerapan pola [Merek] + [Nama Produk] + [Spesifikasi/Model] + [Fitur Unggulan]." },
      { title: "2. Riset Kata Kunci Pencarian di Fitur Iklan", description: "Menemukan volume pencarian pembeli menggunakan fitur pencarian Shopee & Tokopedia." },
      { title: "3. Optimasi Foto Sampul & Deskripsi Persuasif", description: "Teknik foto produk menarik perhatian dalam 3 detik dan deskripsi ramah algoritma." }
    ],
    resources: [
      {
        title: "Shopee Seller Education — Optimasi Judul & Foto Produk Marketplace",
        provider: "Shopee Seller Education",
        type: "Dokumentasi",
        isFree: true,
        url: "https://seller.shopee.co.id/edu/article/32"
      },
      {
        title: "Tokopedia Seller Edu — Panduan Optimasi Judul & Foto Produk",
        provider: "Tokopedia Pusat Edukasi",
        type: "Artikel",
        isFree: true,
        url: "https://seller.tokopedia.com/edu/search?keyword=judul+produk"
      },
      {
        title: "Riset Keyword Judul Produk Marketplace Meningkatkan Penjualan Drastis",
        provider: "YouTube (Pakar E-Commerce)",
        type: "Video",
        isFree: true,
        url: "https://www.youtube.com/results?search_query=seo+judul+produk+marketplace+shopee+tokopedia"
      },
      {
        title: "Shopify Learn — Product Page SEO & High-Converting Descriptions",
        provider: "Shopify Learn",
        type: "Course",
        isFree: true,
        url: "https://www.shopify.com/learn/course/ecommerce-seo"
      }
    ]
  },

  // ── DIGITAL MARKETING (community-manager) ──
  "fundamental-digital-marketing": {
    duration: "Estimasi 3 Jam",
    target: "Menguasai prinsip dasar saluran pemasaran digital (Paid, Owned, Earned) dan metrik utama akuisisi pelanggan.",
    breakdown: [
      { title: "1. Lanskap Kanal Digital Marketing", description: "Karakteristik Search Marketing, Social Media, Email Marketing, dan Content Marketing." },
      { title: "2. Customer Acquisition Funnel", description: "Memetakan tahap Awareness, Consideration, Conversion, hingga Retention (AARRR framework)." },
      { title: "3. Metrik & KPI Esensial", description: "Perhitungan praktis CPA (Cost Per Acquisition), ROAS (Return on Ad Spend), dan CTR." }
    ],
    resources: [
      {
        title: "Grow with Google — Digital Marketing & E-commerce Certificate",
        provider: "Grow with Google",
        type: "Course",
        isFree: true,
        url: "https://grow.google/certificates/digital-marketing-ecommerce/"
      },
      {
        title: "HubSpot Academy — Inbound Digital Marketing Strategy Guide",
        provider: "HubSpot Academy",
        type: "Artikel",
        isFree: true,
        url: "https://academy.hubspot.com/courses/digital-marketing"
      },
      {
        title: "Belajar Digital Marketing dari Nol untuk Pemula: Konsep & Praktik",
        provider: "YouTube (Marketing ID)",
        type: "Video",
        isFree: true,
        url: "https://www.youtube.com/results?search_query=belajar+digital+marketing+dari+nol+pemula"
      },
      {
        title: "Meta Official via Coursera — Meta Digital Marketing Associate",
        provider: "Meta / Coursera",
        type: "Dokumentasi",
        isFree: true,
        url: "https://www.coursera.org/search?query=meta+digital+marketing"
      }
    ]
  },

  "seo-dasar-on-page-off-page": {
    duration: "Estimasi 3–4 Jam",
    target: "Mampu melakukan audit SEO dasar, mengoptimalkan meta tags dan struktur konten, serta memahami peran backlink.",
    breakdown: [
      { title: "1. Fondasi On-Page SEO", description: "Pemasangan title tag, meta description, heading hierarchy (H1-H3), dan optimasi gambar alt-text." },
      { title: "2. Riset Kata Kunci Intent Pengguna", description: "Membedakan Informational, Commercial, dan Transactional search intent." },
      { title: "3. Prinsip Off-Page SEO & Domain Authority", description: "Strategi natural link building, guest posting, dan sinyal otoritas brand di web." }
    ],
    resources: [
      {
        title: "Google Search Central — Panduan Memulai SEO Resmi",
        provider: "Google Search Central",
        type: "Dokumentasi",
        isFree: true,
        url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=id"
      },
      {
        title: "Ahrefs — On-Page SEO: The Beginner Complete Guide",
        provider: "Ahrefs Blog",
        type: "Artikel",
        isFree: true,
        url: "https://ahrefs.com/blog/on-page-seo/"
      },
      {
        title: "Panduan Lengkap On-Page & Off-Page SEO Praktis untuk Pemula",
        provider: "YouTube (SEO Masterclass)",
        type: "Video",
        isFree: true,
        url: "https://www.youtube.com/results?search_query=tutorial+belajar+on+page+off+page+seo+pemula"
      },
      {
        title: "Moz — The Beginner Guide to SEO & Link Building",
        provider: "Moz Academy",
        type: "Course",
        isFree: true,
        url: "https://moz.com/beginners-guide-to-seo"
      }
    ]
  },

  // ── GRAPHIC DESIGNER (graphic-designer) ──
  "teori-warna-tipografi-komposisi-grid": {
    duration: "Estimasi 2–3 Jam",
    target: "Menguasai roda warna, harmoni warna, hirarki tipografi, dan sistem grid layout untuk desain grafis profesional.",
    breakdown: [
      { title: "1. Teori & Psikologi Warna", description: "RGB vs CMYK, skema warna komplementer, analog, triadik, dan pengaruh emosional warna pada audiens." },
      { title: "2. Anatomi & Pairing Tipografi", description: "Perbedaan Serif, Sans Serif, Display, script, serta aturan kontras ukuran dan line height." },
      { title: "3. Komposisi Grid & Golden Ratio", description: "Mengatur layout simetris vs asimetris, negative space, dan focal point agar desain rapi." }
    ],
    resources: [
      {
        title: "Canva Design School — Graphic Design Basics: Color Theory & Typography",
        provider: "Canva Design School",
        type: "Course",
        isFree: true,
        url: "https://www.canva.com/designschool/courses/graphic-design-basics/"
      },
      {
        title: "Canva — Color Wheel & Color Theory Fundamentals for Designers",
        provider: "Canva Design School",
        type: "Dokumentasi",
        isFree: true,
        url: "https://www.canva.com/colors/color-wheel/"
      },
      {
        title: "Typography & Layout Composition Rules for Graphic Designers",
        provider: "YouTube (The Futur / Satori Graphics)",
        type: "Video",
        isFree: true,
        url: "https://www.youtube.com/results?search_query=typography+and+color+theory+graphic+design+tutorial"
      },
      {
        title: "Behance — Curated Editorial & Graphic Design Layout Showcase",
        provider: "Behance",
        type: "Artikel",
        isFree: true,
        url: "https://www.behance.net/search/projects?search=typography+and+layout"
      }
    ]
  },

  // ── UI/UX DESIGNER (ux-designer) ──
  "proses-design-thinking": {
    duration: "Estimasi 3–4 Jam",
    target: "Mampu memetakan satu studi kasus produk memakai kelima tahap design thinking secara mandiri.",
    breakdown: [
      { title: "1. Empathize & Define", description: "Riset dan memahami kebutuhan pengguna serta merumuskan Problem Statement (POV)." },
      { title: "2. Ideate & Crazy Eights", description: "Brainstorming solusi inovatif dan seleksi prioritas fitur." },
      { title: "3. Prototype & Usability Testing", description: "Membangun purwarupa interaktif dan menguji langsung ke pengguna untuk evaluasi." }
    ],
    resources: [
      {
        title: "Interaction Design Foundation — Design Thinking Fundamentals",
        provider: "IxDF",
        type: "Course",
        isFree: true,
        url: "https://www.interaction-design.org/courses/design-thinking-the-ultimate-guide"
      },
      {
        title: "Nielsen Norman Group — Design Thinking 101 Guide",
        provider: "Nielsen Norman Group",
        type: "Artikel",
        isFree: true,
        url: "https://www.nngroup.com/articles/design-thinking/"
      },
      {
        title: "Design Thinking Step by Step: Studi Kasus Redesain Aplikasi Nyata",
        provider: "YouTube (UX Academy)",
        type: "Video",
        isFree: true,
        url: "https://www.youtube.com/results?search_query=design+thinking+tutorial+ui+ux+case+study"
      },
      {
        title: "Figma Community — Design Thinking Workshop Template & Canvas",
        provider: "Figma Community",
        type: "Dokumentasi",
        isFree: true,
        url: "https://help.figma.com/hc/en-us"
      }
    ]
  },

  // ── DATA ANALYST (data-scientist) ──
  "fundamental-sql": {
    duration: "Estimasi 3 Jam",
    target: "Menguasai penulisan query SELECT, WHERE, GROUP BY, HAVING, dan multiple JOIN untuk analisis bisnis riil.",
    breakdown: [
      { title: "1. Dasar Ekstraksi Data SQL", description: "Pengambilan kolom, pemfilteran kondisi kompleks (AND/OR/IN), dan sorting data." },
      { title: "2. Fungsi Agregasi & Grouping", description: "Menghitung metrik bisnis dengan COUNT, SUM, AVG, MIN, MAX berdasarkan kategori." },
      { title: "3. Relasi Tabel (INNER, LEFT, RIGHT JOIN)", description: "Menggabungkan data transaksi penjualan dengan data profil pelanggan." }
    ],
    resources: [
      {
        title: "Mode Analytics — SQL Tutorial for Data Analysis",
        provider: "Mode Analytics",
        type: "Course",
        isFree: true,
        url: "https://mode.com/sql-tutorial/"
      },
      {
        title: "PostgreSQL Tutorial — SQL Queries, Joins, and Aggregations",
        provider: "PostgreSQL Tutorial",
        type: "Dokumentasi",
        isFree: true,
        url: "https://www.postgresqltutorial.com/"
      },
      {
        title: "SQL for Data Analysts Full Course: From Zero to Complex Joins",
        provider: "YouTube (Alex The Analyst)",
        type: "Video",
        isFree: true,
        url: "https://www.youtube.com/results?search_query=sql+for+data+analysts+alex+the+analyst"
      },
      {
        title: "W3Schools — Interactive SQL Practice Database & Query Challenges",
        provider: "W3Schools",
        type: "Artikel",
        isFree: true,
        url: "https://www.w3schools.com/sql/"
      }
    ]
  },

  // ── DEVOPS / QA (product-manager) ──
  "pengenalan-linux-command-line": {
    duration: "Estimasi 2–3 Jam",
    target: "Mampu bernavigasi cepat di terminal Linux, mengelola berkas, permission (chmod/chown), dan proses sistem.",
    breakdown: [
      { title: "1. Navigasi Direktori & Manipulasi Berkas", description: "Perintah esensial: cd, ls -la, mkdir, cp, mv, rm, cat, grep, dan piping (|)." },
      { title: "2. Manajemen Izin Berkas & User", description: "Konsep hak akses Linux (Read, Write, Execute) dan konfigurasi sudo." },
      { title: "3. Monitoring Proses & Resource", description: "Memantau performa CPU/RAM dengan top, htop, ps aux, dan manajemen background service." }
    ],
    resources: [
      {
        title: "Linux Journey — Linux Command Line Fundamentals",
        provider: "Linux Journey",
        type: "Course",
        isFree: true,
        url: "https://linuxjourney.com/"
      },
      {
        title: "Ubuntu Tutorials — Command Line for Beginners Official Guide",
        provider: "Ubuntu Official",
        type: "Dokumentasi",
        isFree: true,
        url: "https://ubuntu.com/tutorials/command-line-for-beginners"
      },
      {
        title: "Belajar Linux Command Line dari Nol untuk DevOps & QA Automation",
        provider: "YouTube (DevOps ID)",
        type: "Video",
        isFree: true,
        url: "https://www.youtube.com/results?search_query=belajar+linux+command+line+dasar+pemula"
      },
      {
        title: "Red Hat Developer — Linux Sysadmin & Terminal Cheat Sheet",
        provider: "Red Hat Developer",
        type: "Artikel",
        isFree: true,
        url: "https://developers.redhat.com/topics/linux"
      }
    ]
  },

  // ── AI/ML ENGINEER (ai-ml-engineer) ──
  "aljabar-linear-dan-kalkulus-dasar": {
    duration: "Estimasi 3–4 Jam",
    target: "Memahami vektor, matriks, dot product, derivatif parsial, dan konsep gradient descent sebagai fondasi model AI.",
    breakdown: [
      { title: "1. Vektor & Operasi Matriks", description: "Representasi data dalam vektor dimensi tinggi, perkalian matriks, dan transformasi linier." },
      { title: "2. Kalkulus Diferensial & Derivatif Parsial", description: "Perhitungan laju perubahan fungsi dan perannya dalam optimalisasi model." },
      { title: "3. Intuisi Gradient Descent", description: "Bagaimana algoritma menemukan nilai minimum bobot untuk meminimalkan loss." }
    ],
    resources: [
      {
        title: "3Blue1Brown — Essence of Linear Algebra Animated Series",
        provider: "3Blue1Brown",
        type: "Video",
        isFree: true,
        url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab"
      },
      {
        title: "Khan Academy — Linear Algebra for Machine Learning",
        provider: "Khan Academy",
        type: "Course",
        isFree: true,
        url: "https://www.khanacademy.org/math/linear-algebra"
      },
      {
        title: "DeepLearning.AI — Mathematics for Machine Learning & Data Science",
        provider: "DeepLearning.AI",
        type: "Dokumentasi",
        isFree: true,
        url: "https://www.deeplearning.ai/courses/"
      },
      {
        title: "DeepLearning.AI — Mathematics for Machine Learning & Data Science",
        provider: "Coursera / DeepLearning.AI",
        type: "Artikel",
        isFree: true,
        url: "https://www.coursera.org/specializations/mathematics-for-machine-learning-and-data-science"
      }
    ]
  },

  // ── SOFTWARE ENGINEER (startup-founder) ──
  "html-css-dan-js-dasar": {
    duration: "Estimasi 3–4 Jam",
    target: "Mampu membangun struktur web semantik, styling responsif modern, dan manipulasi interaktif DOM dengan JavaScript.",
    breakdown: [
      { title: "1. Struktur HTML5 Semantik", description: "Elemen semantik (header, nav, main, section, footer) dan aksesibilitas dasar." },
      { title: "2. CSS Modern (Flexbox & CSS Grid)", description: "Layouting responsif tanpa framework, media queries, dan CSS Box Model." },
      { title: "3. JavaScript DOM & Event Handling", description: "Interaktivitas tombol, event listener, validasi form, dan manipulasi elemen." }
    ],
    resources: [
      {
        title: "MDN Web Docs — HTML & CSS Dasar hingga Mahir",
        provider: "MDN Web Docs",
        type: "Dokumentasi",
        isFree: true,
        url: "https://developer.mozilla.org/id/docs/Learn_web_development"
      },
      {
        title: "MDN Web Docs — Panduan Lengkap JavaScript Modern",
        provider: "MDN Web Docs",
        type: "Dokumentasi",
        isFree: true,
        url: "https://developer.mozilla.org/id/docs/Web/JavaScript/Guide"
      },
      {
        title: "freeCodeCamp — Responsive Web Design Certification",
        provider: "freeCodeCamp",
        type: "Course",
        isFree: true,
        url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/"
      },
      {
        title: "Tutorial Lengkap Belajar HTML, CSS, dan JavaScript Dasar untuk Pemula",
        provider: "YouTube (Web Dev)",
        type: "Video",
        isFree: true,
        url: "https://www.youtube.com/results?search_query=belajar+html+css+javascript+dasar+pemula"
      }
    ]
  },

  "dasar-version-control-git": {
    duration: "Estimasi 2–3 Jam",
    target: "Menguasai alur kerja Git dasar: git init, commit, branching, merging, dan kolaborasi remote repository di GitHub.",
    breakdown: [
      { title: "1. Konsep Version Control & Perintah Inti", description: "Working directory, staging area, commit history, dan diffing perubahan." },
      { title: "2. Branching & Merging Terstruktur", description: "Membuat feature branch, merge pull request, dan mengatasi merge conflict." },
      { title: "3. Kolaborasi GitHub", description: "Push, pull, clone, remote origin, dan standar commit message profesional." }
    ],
    resources: [
      {
        title: "Git SCM — Git Handbook & Version Control Fundamental",
        provider: "Git SCM",
        type: "Dokumentasi",
        isFree: true,
        url: "https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control"
      },
      {
        title: "GitHub Docs — Git and GitHub Fundamentals",
        provider: "GitHub Docs",
        type: "Dokumentasi",
        isFree: true,
        url: "https://docs.github.com/en/get-started"
      },
      {
        title: "Tutorial Git & GitHub Lengkap untuk Pemula dari Dasar sampai Mahir",
        provider: "YouTube (Programmer Zaman Now)",
        type: "Video",
        isFree: true,
        url: "https://www.youtube.com/results?search_query=tutorial+git+github+pemula+bahasa+indonesia"
      },
      {
        title: "Atlassian Git Tutorial — Branching Strategies and Conflict Resolution",
        provider: "Atlassian",
        type: "Artikel",
        isFree: true,
        url: "https://www.atlassian.com/git/tutorials"
      }
    ]
  }
};

export function getCuratedModuleDetail(params: {
  moduleSlug: string;
  moduleTitle: string;
  careerSlug: string;
  roleName: string;
}): CuratedModuleDetail {
  const { moduleSlug, moduleTitle, careerSlug, roleName } = params;

  // 1. Cek apakah ada handcrafted detail khusus
  const handcrafted = HANDCRAFTED_MODULE_DETAILS[moduleSlug];
  if (handcrafted && handcrafted.resources && handcrafted.resources.length === 4) {
    return {
      slug: moduleSlug,
      title: moduleTitle,
      duration: handcrafted.duration || "Estimasi 2–4 Jam",
      target: handcrafted.target || `Menguasai konsep esensial dan implementasi nyata "${moduleTitle}" untuk peran ${roleName}.`,
      breakdown: handcrafted.breakdown || [
        { title: "1. Pemahaman Konsep & Fondasi", description: `Mempelajari prinsip fundamental dari ${moduleTitle}.` },
        { title: "2. Implementasi Terapan", description: `Mempraktikkan teknik ${moduleTitle} dalam studi kasus industri.` },
        { title: "3. Standar Praktik Terbaik", description: `Mengevaluasi standar kualitas dan optimasi profesional.` }
      ],
      resources: handcrafted.resources,
    };
  }

  // 2. Ambil konfigurasi domain karir yang sesuai
  const domainConfig = CAREER_DOMAIN_CONFIGS[careerSlug] || CAREER_DOMAIN_CONFIGS["startup-founder"];

  // 3. Bangun 4 sumber belajar yang relevan dan tepat domain
  const resources: LearningResourceItem[] = [
    {
      title: `${domainConfig.courseProvider} — Panduan & Kursus "${moduleTitle}"`,
      provider: domainConfig.courseProvider,
      type: "Course",
      isFree: true,
      url: domainConfig.courseSearchUrl(moduleTitle),
    },
    {
      title: `${domainConfig.articleProvider} — Artikel & Strategi Terapan "${moduleTitle}"`,
      provider: domainConfig.articleProvider,
      type: "Artikel",
      isFree: true,
      url: domainConfig.articleSearchUrl(moduleTitle),
    },
    {
      title: `Video Tutorial & Studi Kasus "${moduleTitle}" (${domainConfig.domainTitle})`,
      provider: "YouTube",
      type: "Video",
      isFree: true,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(moduleTitle + " " + domainConfig.videoQuerySuffix)}`,
    },
    {
      title: `${domainConfig.docProvider} — Dokumentasi Resmi & SOP "${moduleTitle}"`,
      provider: domainConfig.docProvider,
      type: "Dokumentasi",
      isFree: true,
      url: domainConfig.docSearchUrl(moduleTitle),
    },
  ];

  return {
    slug: moduleSlug,
    title: moduleTitle,
    duration: handcrafted?.duration || "Estimasi 2–4 Jam",
    target: handcrafted?.target || `Menguasai konsep esensial, teknik terapan, dan standar implementasi materi "${moduleTitle}" untuk peran ${roleName} (${domainConfig.domainTitle}).`,
    breakdown: handcrafted?.breakdown || [
      {
        title: "1. Fondasi Teori & Konsep Inti",
        description: `Mempelajari prinsip fundamental, arsitektur dasar, dan terminologi penting dari ${moduleTitle}.`
      },
      {
        title: "2. Implementasi Terapan & Studi Kasus",
        description: `Latihan langsung menerapkan ${moduleTitle} melalui skenario nyata yang relevan dengan kebutuhan ${domainConfig.domainTitle}.`
      },
      {
        title: "3. Best Practice & Standar Industri",
        description: `Mengevaluasi teknik optimasi, penanganan kendala umum, dan standar profesional saat menggunakan ${moduleTitle}.`
      }
    ],
    resources,
  };
}
