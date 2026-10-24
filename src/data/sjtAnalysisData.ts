import { SJT_SKILLS, SJT_SKILL_META, SJTSkill } from './sjtBank';

export interface SoftSkillDetailReport {
  skill: SJTSkill;
  label: string;
  shortLabel: string;
  icon: string;
  level: number; // 1, 2, 3
  levelLabel: string;
  scorePercentage: number;
  maturityStatus: 'Dasar (Reaktif)' | 'Operasional (Mandiri)' | 'Strategis (Unggul)';
  behavioralTendency: string;
  workplaceStrengths: string[];
  blindSpotsAndRisks: string[];
  actionableCoaching: string;
  interviewTalkingPoint: {
    promptQuestion: string;
    starStory: {
      situation: string;
      task: string;
      action: string;
      result: string;
    };
  };
}

interface SkillLevelContent {
  levelLabel: string;
  scorePercentage: number;
  maturityStatus: 'Dasar (Reaktif)' | 'Operasional (Mandiri)' | 'Strategis (Unggul)';
  behavioralTendency: string;
  workplaceStrengths: string[];
  blindSpotsAndRisks: string[];
  actionableCoaching: string;
  interviewQuestion: string;
  starTemplate: (role: string) => {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}

const SOFT_SKILL_DEFINITIONS: Record<SJTSkill, Record<1 | 2 | 3, SkillLevelContent>> = {
  'Kolaborasi Tim & Lintas Fungsi': {
    3: {
      levelLabel: 'Lanjutan (Siap Kerja Unggul)',
      scorePercentage: 92,
      maturityStatus: 'Strategis (Unggul)',
      behavioralTendency:
        'Secara alami bertindak sebagai perekat tim dan jembatan lintas divisi. Saat terjadi gesekan atau ketidaksepakatan prioritas, kamu tidak reaktif atau membela ego silo departemen, melainkan fokus menyelaraskan objektif bersama dengan komunikasi asertif dan penuh empati.',
      workplaceStrengths: [
        'Mampu memfasilitasi kompromi produktif di tengah perbedaan pendapat antar-divisi.',
        'Proaktif mengidentifikasi bottleneck rekan kerja dan menawarkan bantuan sebelum pekerjaan terlambat.',
        'Menciptakan rasa aman psikologis (psychological safety) sehingga anggota tim berani bersuara.',
      ],
      blindSpotsAndRisks: [
        'Kecenderungan menampung beban terlalu banyak demi menjaga keharmonisan tim.',
        'Perlu berhati-hati agar empati tidak menghambat ketegasan saat menegakkan akuntabilitas rekan kerja.',
      ],
      actionableCoaching:
        'Latih teknik "Disagree and Commit" secara formal: pelajari cara menyampaikan sanggahan terstruktur di awal, lalu berikan 100% komitmen eksekusi ketika keputusan bersama telah disepakati.',
      interviewQuestion: 'Ceritakan pengalaman ketika kamu harus bekerja sama dengan individu atau tim yang memiliki prioritas berseberangan.',
      starTemplate: (role) => ({
        situation: `Saat menjalankan proyek kolaboratif untuk kebutuhan peran ${role}, tim teknis dan tim non-teknis memiliki ekspektasi timeline yang bertolak belakang.`,
        task: 'Saya bertugas menyelaraskan ekspektasi kedua pihak agar deliverable tetap sesuai standar tanpa memicu gesekan tim.',
        action: 'Saya menginisiasi sesi sinkronisasi 30 menit, memetakan trade-off secara visual, dan merumuskan milestone bertahap yang disepakati bersama.',
        result: 'Proyek rampung tepat waktu dengan tingkat kepuasan antar-tim 95% dan tidak ada pekerjaan yang harus diulang.',
      }),
    },
    2: {
      levelLabel: 'Menengah (Standar Industri)',
      scorePercentage: 68,
      maturityStatus: 'Operasional (Mandiri)',
      behavioralTendency:
        'Mampu bekerja sama dengan lancar di dalam lingkungan tim yang harmonis dan terstruktur. Namun, ketika berhadapan dengan rekan kerja yang sulit atau divisi yang tidak kooperatif, kamu cenderung menunggu ketua tim atau manajer untuk turun tangan.',
      workplaceStrengths: [
        'Kooperatif, tepat waktu dalam menyelesaikan bagian tugas kelompok, dan mudah diajak berdiskusi.',
        'Menghormati pembagian peran dan mematuhi kesepakatan workflow tim.',
      ],
      blindSpotsAndRisks: [
        'Cenderung pasif dalam mengatasi konflik horizontal; memilih mendiamkan isu daripada memicu konfrontasi sehat.',
        'Masih terbatas pada lingkaran tim inti, belum aktif membangun jejaring lintas divisi.',
      ],
      actionableCoaching:
        'Praktikkan sesi one-on-one informal 15 menit dengan rekan divisi pendukung untuk memahami alur kerja mereka sebelum proyek besar dimulai.',
      interviewQuestion: 'Bagaimana kamu menyikapi rekan satu tim yang kinerjanya tertinggal dan memengaruhi tenggat waktu kelompok?',
      starTemplate: (role) => ({
        situation: `Dalam penyusunan proyek ${role}, salah satu rekan mengalami kesulitan teknis yang berpotensi menunda pengumpulan.`,
        task: 'Sebagai bagian dari tim, saya merasa bertanggung jawab menjaga ritme kerja tanpa menghakimi rekan tersebut.',
        action: 'Saya mendekatinya secara personal, mendengarkan hambatannya, dan membagi sebagian beban pekerjaan teknis yang saya kuasai.',
        result: 'Tugas berhasil diunggah sesuai deadline dan hubungan tim tetap solid tanpa ada drama internal.',
      }),
    },
    1: {
      levelLabel: 'Dasar (Perlu Asah)',
      scorePercentage: 42,
      maturityStatus: 'Dasar (Reaktif)',
      behavioralTendency:
        'Cenderung merasa lebih nyaman bekerja secara individual atau soliter. Di lingkungan kerja kelompok, kamu rentan merasa terbebani oleh koordinasi dan dapat bereaksi defensif atau menarik diri saat ide pribadimu dikritik.',
      workplaceStrengths: [
        'Fokus tinggi saat mengerjakan komponen mandiri tanpa distraksi diskusi.',
      ],
      blindSpotsAndRisks: [
        'Risiko isolasi kerja (bekerja dalam silo) yang mengakibatkan pekerjaan tidak sinkron dengan kebutuhan tim.',
        'Kecenderungan mengeluh di belakang daripada menyelesaikan gesekan interpersonal secara profesional.',
      ],
      actionableCoaching:
        'Mulai biasakan membagikan update progres ringkas (3 poin: apa yang selesai, apa hambatan, apa rencana besok) di grup kerja setiap akhir hari.',
      interviewQuestion: 'Apakah kamu lebih suka bekerja sendiri atau dalam tim? Berikan contoh nyata adaptasimu.',
      starTemplate: (role) => ({
        situation: `Ketika awal mengerjakan task kompleks sebagai calon ${role}, saya terbiasa memecahkan semuanya sendiri hingga menemui jalan buntu.`,
        task: 'Saya menyadari bahwa untuk mencapai standar profesional, saya harus memanfaatkan kekuatan tim.',
        action: 'Saya mulai membuka diri, meminta feedback awal, dan mendokumentasikan progres secara transparan kepada rekan tim.',
        result: 'Hasil kerja menjadi lebih cepat tuntas 40% dan saya mendapat wawasan baru dari sudut pandang rekan kerja.',
      }),
    },
  },

  'Komunikasi': {
    3: {
      levelLabel: 'Lanjutan (Siap Kerja Unggul)',
      scorePercentage: 94,
      maturityStatus: 'Strategis (Unggul)',
      behavioralTendency:
        'Mampu menyampaikan pesan secara presisi, terstruktur (Minto Pyramid / Top-Down), dan fleksibel menyesuaikan gaya komunikasi dengan audiens (dari teknis ke eksekutif). Pendengar yang aktif (active listener) yang memverifikasi pemahaman sebelum merespon.',
      workplaceStrengths: [
        'Mengartikulasikan masalah rumit menjadi ringkasan yang mudah dipahami pemangku kepentingan.',
        'Mampu memberikan umpan balik korektif secara konstruktif tanpa mematikan motivasi lawan bicara.',
        'Sangat rapi dalam dokumentasi tertulis, email, dan presentasi formal.',
      ],
      blindSpotsAndRisks: [
        'Bisa terkesan terlalu formal atau kaku jika situasi hanya membutuhkan obrolan kasual cepat.',
      ],
      actionableCoaching:
        'Latih variasi bahasa: sesekali gunakan analogi cerita nyata (storytelling) untuk memikat audiens non-teknis dalam presentasi singkat.',
      interviewQuestion: 'Ceritakan bagaimana caramu menjelaskan ide teknis yang kompleks kepada audiens non-teknis atau manajemen puncak.',
      starTemplate: (role) => ({
        situation: `Dalam peran ${role}, saya harus mempresentasikan usulan optimasi sistem kepada pimpinan divisi bisnis yang awam istilah teknis.`,
        task: 'Saya harus meyakinkan mereka tentang urgensi perubahan tanpa membuat mereka bingung oleh jargon teknis.',
        action: 'Saya mengemas ide dalam analogi bisnis sehari-hari, fokus pada dampak efisiensi biaya, dan menyajikan diagram visual alur sebelum vs sesudah.',
        result: 'Proposal disetujui dalam pertemuan pertama dan mendapat apresiasi karena presentasi yang sangat jernih.',
      }),
    },
    2: {
      levelLabel: 'Menengah (Standar Industri)',
      scorePercentage: 70,
      maturityStatus: 'Operasional (Mandiri)',
      behavioralTendency:
        'Mampu berkomunikasi dengan jelas dalam format percakapan sehari-hari dan pesan singkat. Namun, dalam presentasi formal atau saat menyampaikan berita buruk/penundaan deadline, kamu masih sering ragu atau berbelit-belit.',
      workplaceStrengths: [
        'Ramah, komunikatif, dan responsif terhadap pesan atau email dari rekan kerja.',
        'Mampu menyusun laporan kerja berkala dengan data yang cukup lengkap.',
      ],
      blindSpotsAndRisks: [
        'Sering menunda memberi tahu atasan mengenai keterlambatan karena cemas akan reaksi negatif.',
        'Terkadang berasumsi audiens sudah paham tanpa melakukan konfirmasi ulang.',
      ],
      actionableCoaching:
        'Terapkan format komunikasi STAR (Situation, Task, Action, Result) atau BLUF (Bottom Line Up Front) setiap kali mengirim email atau pesan penting.',
      interviewQuestion: 'Bagaimana cara kamu menyampaikan kabar bahwa pekerjaanmu akan terlambat melewati deadline?',
      starTemplate: (role) => ({
        situation: `Saya menemui kendala eksternal di luar kendali yang berpotensi menunda deliverable ${role}.`,
        task: 'Saya harus mengomunikasikan penundaan ini secara profesional sebelum deadline terlewati.',
        action: 'Saya menghubungi manajer 24 jam sebelum tenggat, menjelaskan kendala secara jujur, dan langsung menawarkan dua opsi solusi alternatif mitigasi.',
        result: 'Manajer mengapresiasi transparansi saya dan menyetujui opsi perpanjangan waktu tanpa mengganggu jadwal tim.',
      }),
    },
    1: {
      levelLabel: 'Dasar (Perlu Asah)',
      scorePercentage: 45,
      maturityStatus: 'Dasar (Reaktif)',
      behavioralTendency:
        'Cenderung menyampaikan pesan yang tidak terstruktur atau terlalu singkat, sehingga sering menimbulkan salah paham (miscommunication). Ada kecenderungan pasif saat meeting dan berasumsi diam berarti setuju.',
      workplaceStrengths: [
        'Mau mendengarkan instruksi yang diberikan secara eksplisit.',
      ],
      blindSpotsAndRisks: [
        'Risiko miskomunikasi tinggi akibat enggan bertanya ketika instruksi ambigu.',
        'Kurang memperhatikan nada bicara (tone of voice) dan etika komunikasi tertulis profesional.',
      ],
      actionableCoaching:
        'Setiap kali menerima instruksi baru, wajib lakukan "paraphrasing": ulangi kembali pemahamanmu dengan kata-katamu sendiri untuk memastikan tidak ada asumsi keliru.',
      interviewQuestion: 'Pernahkah terjadi salah paham antara kamu dan rekan kerja? Bagaimana kamu mengatasinya?',
      starTemplate: (role) => ({
        situation: `Di awal keterlibatan saya pada studi kasus ${role}, saya salah mengartikan scope pekerjaan karena instruksi yang saya anggap sudah jelas.`,
        task: 'Saya harus memperbaiki kesalahan tersebut dan memastikan hal serupa tidak terulang.',
        action: 'Saya segera meminta maaf, mengklarifikasi poin yang benar, dan sejak itu selalu membuat ringkasan tertulis pasca-diskusi.',
        result: 'Pekerjaan berhasil diselaraskan dan saya belajar pentingnya konfirmasi aktif dalam etika kerja.',
      }),
    },
  },

  'Berpikir Analitis & Kritis': {
    3: {
      levelLabel: 'Lanjutan (Siap Kerja Unggul)',
      scorePercentage: 90,
      maturityStatus: 'Strategis (Unggul)',
      behavioralTendency:
        'Memiliki kebiasaan membedakan fakta objektif vs asumsi spekulatif secara ketat. Tidak mudah tergiur oleh solusi instan; kamu selalu menuntut bukti data, memetakan hubungan sebab-akibat (root cause), dan mengantisipasi efek samping jangka panjang.',
      workplaceStrengths: [
        'Mampu menyaring insight bermakna dari kumpulan data yang acak atau bising.',
        'Kritis terhadap anomali proses dan cepat mendeteksi kelemahan dalam proposal strategi.',
        'Menerapkan prinsip First Principles thinking dalam menganalisis kebuntuan kerja.',
      ],
      blindSpotsAndRisks: [
        'Potensi terjebak dalam "Analysis Paralysis" (terlalu lama menganalisis data hingga menunda eksekusi).',
      ],
      actionableCoaching:
        'Terapkan aturan "Rule of 70%": saat data yang kamu miliki sudah mencapai 70% kepastian, buat keputusan dan bergerak ke eksekusi sambil terus memonitor.',
      interviewQuestion: 'Ceritakan keputusan penting yang kamu ambil berbasis analisis data, bukan sekadar firasat atau intuisi.',
      starTemplate: (role) => ({
        situation: `Saat mengevaluasi strategi untuk deliverable ${role}, mayoritas tim ingin memilih solusi A karena terasa lebih mudah.`,
        task: 'Saya merasa perlu memvalidasi apakah solusi A benar-benar efektif berdasarkan tolok ukur objektif.',
        action: 'Saya mengumpulkan data historis, membuat model perbandingan biaya-waktu sederhana, dan menemukan bahwa solusi B lebih hemat 35% resiko jangka panjang.',
        result: 'Tim beralih ke solusi B dan hasil evaluasi akhir membuktikan efisiensi operasional meningkat signifikan.',
      }),
    },
    2: {
      levelLabel: 'Menengah (Standar Industri)',
      scorePercentage: 66,
      maturityStatus: 'Operasional (Mandiri)',
      behavioralTendency:
        'Cukup baik dalam menelaah data terstruktur dan mengikuti metodologi analisis standar. Namun saat menghadapi masalah yang ambigu tanpa contoh sebelumnya, kamu terkadang masih mengandalkan asumsi intuitif yang belum terverifikasi.',
      workplaceStrengths: [
        'Mampu membaca metrik kerja dan menyusun grafik perbandingan yang informatif.',
        'Teliti dalam mengecek konsistensi logika pada dokumen yang sudah ada.',
      ],
      blindSpotsAndRisks: [
        'Mudah terpengaruh oleh pendapat mayoritas atau figur otoritas tanpa meneliti ulang dasar argumennya.',
        'Cenderung fokus pada gejala di permukaan daripada akar masalah (root cause) yang sebenarnya.',
      ],
      actionableCoaching:
        'Latih metode "5 Whys" setiap kali menemukan masalah berulang: tanyakan "Mengapa" lima kali hingga sampai pada akar sistemik.',
      interviewQuestion: 'Bagaimana caramu membedakan antara informasi yang valid dan opini yang tidak berdasar saat riset?',
      starTemplate: (role) => ({
        situation: `Dalam riset persiapan tugas ${role}, saya menemukan dua sumber informasi yang memberikan angka statistik saling bertolak belakang.`,
        task: 'Saya harus menentukan data mana yang kredibel untuk dijadikan acuan keputusan.',
        action: 'Saya menelusuri metodologi riset asli kedua sumber, mengecek tanggal pembaruan data, dan memverifikasi dengan standar industri resmi.',
        result: 'Saya memilih data yang terverifikasi dan melindungi tim dari pengambilan keputusan yang keliru.',
      }),
    },
    1: {
      levelLabel: 'Dasar (Perlu Asah)',
      scorePercentage: 40,
      maturityStatus: 'Dasar (Reaktif)',
      behavioralTendency:
        'Cenderung menyerap informasi apa adanya tanpa skeptisisme konstruktif. Mengambil kesimpulan cepat berdasarkan sampel yang sangat terbatas atau pengalaman subjektif emosional.',
      workplaceStrengths: [
        'Cepat mengambil keputusan tanpa berlama-lama memikirkan detail rumit.',
      ],
      blindSpotsAndRisks: [
        'Tingkat kesalahan fatal tinggi karena melompati fase validasi data sebelum meluncurkan tindakan.',
        'Rentan mengalami bias konfirmasi (hanya mencari info yang membenarkan keyakinan awal).',
      ],
      actionableCoaching:
        'Sebelum mengambil kesimpulan, biasakan membuat daftar dua kolom: "Apa yang saya ketahui sebagai fakta pasti" vs "Apa yang baru sekadar asumsi saya".',
      interviewQuestion: 'Pernahkah analisismu salah? Apa yang kamu pelajari dari kejadian tersebut?',
      starTemplate: (role) => ({
        situation: `Pada awal pengenalan bidang ${role}, saya pernah membuat rekomendasi berbasis sampel data kecil yang ternyata bias.`,
        task: 'Setelah menyadari kesalahan tersebut, saya harus meralat rekomendasi dan memperbaiki cara kerja saya.',
        action: 'Saya mengakui kekurangan analisis saya, berkonsultasi dengan mentor tentang metodologi validasi, dan memperluas sampel pengujian.',
        result: 'Sejak itu, saya tidak pernah lagi merilis kesimpulan tanpa verifikasi silang minimal dua sumber independen.',
      }),
    },
  },

  'Problem Solving': {
    3: {
      levelLabel: 'Lanjutan (Siap Kerja Unggul)',
      scorePercentage: 91,
      maturityStatus: 'Strategis (Unggul)',
      behavioralTendency:
        'Melihat kendala bukan sebagai bencana, melainkan puzzle logis yang bisa dipecahkan secara terstruktur. Mampu memecah masalah besar menjadi sub-masalah independen (MECE) dan selalu menyiapkan rencana cadangan (contingency plan).',
      workplaceStrengths: [
        'Tenang dan terfokus pada solusi saat situasi krisis atau sistem mengalami kegagalan mendadak.',
        'Mampu menimbang trade-off antara kecepatan implementasi vs kualitas solusi jangka panjang.',
        'Solutif: tidak hanya membawa daftar keluhan ke atasan, tetapi selalu membawa 2 alternatif solusi siap pilih.',
      ],
      blindSpotsAndRisks: [
        'Kecenderungan mendesain solusi yang terlalu canggih/over-engineered untuk masalah sederhana.',
      ],
      actionableCoaching:
        'Prioritaskan prinsip "KISS" (Keep It Simple, Smart): cari solusi termudah dan paling minim friksi sebelum merancang sistem kompleks.',
      interviewQuestion: 'Ceritakan kendala paling berat yang pernah kamu hadapi dan langkah konkret penyelesaiannya.',
      starTemplate: (role) => ({
        situation: `Saat mempersiapkan output kunci pada peran ${role}, sistem utama mengalami kegagalan teknis 4 jam sebelum presentasi final.`,
        task: 'Saya harus memastikan presentasi tetap berjalan lancar tanpa mengurangi substansi data penting.',
        action: 'Saya segera mengaktifkan rencana mitigasi: mengekstrak data statis cadangan, menyusun alur demonstrasi manual, dan membagi tugas darurat tim.',
        result: 'Presentasi berjalan sukses tanpa disadari audiens bahwa sempat ada kendala sistem di balik layar.',
      }),
    },
    2: {
      levelLabel: 'Menengah (Standar Industri)',
      scorePercentage: 65,
      maturityStatus: 'Operasional (Mandiri)',
      behavioralTendency:
        'Mampu memecahkan masalah standar yang sudah memiliki SOP atau pola serupa di masa lalu. Namun jika masalah bersifat baru atau melibatkan multi-variabel dinamis, kamu rentan panik sesaat dan butuh validasi senior.',
      workplaceStrengths: [
        'Tekun mencoba berbagai alternatif pemecahan yang pernah dipelajari sebelumnya.',
        'Disiplin mendokumentasikan langkah perbaikan yang berhasil dilakukan.',
      ],
      blindSpotsAndRisks: [
        'Cenderung terpaku pada "trial and error" acak daripada analisis akar masalah secara terstruktur.',
        'Kadang cepat berpuas diri dengan solusi tambal sulam yang sifatnya sementara (workaround).',
      ],
      actionableCoaching:
        'Setiap kali menemukan error atau kendala, tuliskan: (1) Gejala, (2) Kondisi lingkungan, (3) Hipotesis penyebab, (4) Tes validasi, sebelum mulai mengutak-atik solusi.',
      interviewQuestion: 'Apa yang kamu lakukan jika solusi pertama yang kamu coba gagal memecahkan masalah?',
      starTemplate: (role) => ({
        situation: `Dalam uji coba simulasi ${role}, metode perbaikan pertama yang saya terapkan tidak memberikan hasil sesuai harapan.`,
        task: 'Saya harus mengevaluasi kegagalan tersebut dan merumuskan pendekatan baru dengan cepat.',
        action: 'Saya mundur satu langkah, mereviu log anomali dari awal, dan menguji variabel yang sebelumnya tidak saya duga.',
        result: 'Pendekatan kedua berhasil menyelesaikan masalah secara tuntas dan saya catat sebagai referensi tim ke depan.',
      }),
    },
    1: {
      levelLabel: 'Dasar (Perlu Asah)',
      scorePercentage: 42,
      maturityStatus: 'Dasar (Reaktif)',
      behavioralTendency:
        'Cenderung merasa kewalahan atau "freeze" saat menemui rintangan tak terduga. Respon pertama sering berupa kepanikan, mengeluhkan sistem, atau langsung melempar masalah ke orang lain tanpa upaya pemecahan mandiri.',
      workplaceStrengths: [
        'Jujur mengakui ketika tidak bisa memecahkan suatu masalah.',
      ],
      blindSpotsAndRisks: [
        'Dipersepsikan kurang mandiri oleh atasan karena terlalu sering meminta bantuan pada hal-hal kecil.',
        'Menghindari tanggung jawab ketika suatu solusi gagal.',
      ],
      actionableCoaching:
        'Terapkan "15-Minute Rule": saat buntu, kamu wajib mencoba mencari solusi secara mandiri selama 15 menit (Google, dokumentasi, forum) sebelum meminta bantuan rekan senior.',
      interviewQuestion: 'Ceritakan momen ketika kamu merasa buntu dalam suatu pekerjaan dan apa yang kamu lakukan.',
      starTemplate: (role) => ({
        situation: `Di awal mempelajari kompetensi ${role}, saya menemui error yang tidak saya pahami dan membuat pekerjaan terhenti.`,
        task: 'Saya harus mengatasi kebuntuan tersebut agar tidak menghambat deadline proyek.',
        action: 'Alih-alih panik, saya mendokumentasikan pesan error, mencari referensi serupa di forum profesional, dan menyusun pertanyaan spesifik untuk senior.',
        result: 'Masalah terselesaikan dan saya memahami mekanisme error tersebut sehingga tidak terulang lagi.',
      }),
    },
  },

  'Kemauan Belajar & Rasa Ingin Tahu': {
    3: {
      levelLabel: 'Lanjutan (Siap Kerja Unggul)',
      scorePercentage: 95,
      maturityStatus: 'Strategis (Unggul)',
      behavioralTendency:
        'Memiliki Growth Mindset yang sangat kuat. Menganggap feedback tajam sebagai hadiah pembelajaran, proaktif mempelajari tren teknologi/metodologi terbaru di luar jam kerja resmi, dan senang membagikan wawasan baru kepada rekan tim.',
      workplaceStrengths: [
        'Sangat cepat menguasai software, framework, atau alur kerja baru dalam hitungan hari.',
        'Menerima kritik dengan lapang dada dan langsung merancang aksi perbaikan konkret.',
        'Menjadi pelopor adopsi inovasi atau otomasi di dalam tim.',
      ],
      blindSpotsAndRisks: [
        'Kecenderungan mengalami "Shiny Object Syndrome" (mudah teralihkan oleh teknologi baru padahal sistem lama masih efektif).',
      ],
      actionableCoaching:
        'Fokuskan 80% energi belajar pada pendalaman skill yang langsung berdampak pada target peran saat ini, dan 20% untuk eksplorasi teknologi masa depan.',
      interviewQuestion: 'Bagaimana caramu menjaga keahlianmu tetap relevan di industri yang terus berubah cepat?',
      starTemplate: (role) => ({
        situation: `Perkembangan tren industri pada peran ${role} menuntut penguasaan metode baru yang belum pernah diajarkan di bangku formal.`,
        task: 'Saya ingin memastikan diri saya memiliki kompetensi yang kompetitif sebelum kebutuhan industri menjadi mendesak.',
        action: 'Saya mengalokasikan 45 menit setiap pagi untuk membedah studi kasus internasional, mengambil sertifikasi daring, dan membangun proyek portofolio eksperimental.',
        result: 'Saya berhasil menguasai metode tersebut dan menerapkannya dalam proyek nyata yang meningkatkan efisiensi kerja tim.',
      }),
    },
    2: {
      levelLabel: 'Menengah (Standar Industri)',
      scorePercentage: 72,
      maturityStatus: 'Operasional (Mandiri)',
      behavioralTendency:
        'Senang belajar hal baru jika ada arahan kurikulum yang jelas atau ada insentif pekerjaan yang nyata. Mampu menerima feedback dengan baik, meskipun butuh waktu untuk memproses emosi sebelum menindaklanjutinya.',
      workplaceStrengths: [
        'Rajin mengikuti pelatihan yang ditugaskan oleh pimpinan atau institusi.',
        'Mau bertanya kepada rekan yang lebih ahli untuk meningkatkan kapasitas diri.',
      ],
      blindSpotsAndRisks: [
        'Kurang memiliki inisiatif riset mandiri jika tidak ada dorongan eksternal atau kewajiban formal.',
        'Cenderung bertahan dengan cara kerja lama yang nyaman sampai dipaksa berubah.',
      ],
      actionableCoaching:
        'Buat target "1 Bulan 1 Skill Mikro": pilih satu fitur software atau konsep baru setiap bulan dan buat rangkuman aplikatif satu halaman.',
      interviewQuestion: 'Ceritakan keahlian baru yang kamu pelajari sendiri dalam 6 bulan terakhir.',
      starTemplate: (role) => ({
        situation: `Saya menyadari bahwa untuk unggul dalam peran ${role}, saya membutuhkan skill komputasi data yang lebih presisi.`,
        task: 'Saya berinisiatif mempelajari teknik tersebut secara mandiri di waktu luang.',
        action: 'Saya mengikuti modul online terkurasi, membuat latihan mandiri setiap akhir pekan, dan meminta koreksi dari mentor.',
        result: 'Dalam 2 bulan, saya mampu mengaplikasikan skill tersebut untuk mengolah data proyek dengan kecepatan 2x lipat.',
      }),
    },
    1: {
      levelLabel: 'Dasar (Perlu Asah)',
      scorePercentage: 44,
      maturityStatus: 'Dasar (Reaktif)',
      behavioralTendency:
        'Cenderung merasa cepat puas dengan keahlian yang sudah dimiliki (Fixed Mindset). Bereaksi defensif atau mencari kambing hitam saat kinerjanya dikritik, dan merasa terbebani jika dipaksa mempelajari alat/metode baru.',
      workplaceStrengths: [
        'Konsisten dan stabil dalam menjalankan rutinitas yang sudah sangat dikuasai.',
      ],
      blindSpotsAndRisks: [
        'Risiko keusangan skill (skill obsolescence) yang sangat tinggi di era otomasi dan AI.',
        'Sulit berkembang karena menutup diri dari umpan balik konstruktif rekan kerja.',
      ],
      actionableCoaching:
        'Latih respon netral saat menerima kritik: ucapkan "Terima kasih atas masukannya, bagian mana yang paling prioritas untuk saya benahi terlebih dahulu?" alih-alih membantah.',
      interviewQuestion: 'Ceritakan kritik paling tajam yang pernah kamu terima dan bagaimana responmu.',
      starTemplate: (role) => ({
        situation: `Dalam review tugas ${role}, seorang penguji memberikan kritik bahwa dokumen saya kurang terstruktur dan sulit dibaca.`,
        task: 'Awalnya saya merasa kecewa, namun saya menyadari kritik itu adalah jalan untuk meningkatkan standar profesional saya.',
        action: 'Saya membaca ulang dokumen dari sudut pandang penguji, meminta template contoh yang baik, dan menyusun ulang seluruh format laporannya.',
        result: 'Revisi diterima dengan pujian dan sejak itu saya selalu mematuhi standar format profesional.',
      }),
    },
  },

  'Ketelitian (Attention to Detail)': {
    3: {
      levelLabel: 'Lanjutan (Siap Kerja Unggul)',
      scorePercentage: 93,
      maturityStatus: 'Strategis (Unggul)',
      behavioralTendency:
        'Memiliki standar "Zero-Defect". Sangat cermat menangkap ketidakkonsistenan angka, ejaan, logika flow, atau format dokumen yang sering terlewatkan oleh orang lain. Selalu melakukan self-review bertingkat sebelum pekerjaan dirilis.',
      workplaceStrengths: [
        'Menjadi benteng pertahanan terakhir kualitas tim (quality assurance alami).',
        'Sangat disiplin terhadap kepatuhan SOP, keamanan data, dan integritas laporan.',
        'Mampu mendesain checklist kerja untuk mencegah kesalahan sistemik berulang.',
      ],
      blindSpotsAndRisks: [
        'Bisa menjadi terlalu perfeksionis hingga memperlambat kecepatan rilis produk/tugas.',
      ],
      actionableCoaching:
        'Terapkan pembagian prioritas detail: bedakan antara "kegagalan fatal yang tidak boleh ada eror" (laporan finansial, data klien) vs "detail kosmetik yang cukup baik 90%".',
      interviewQuestion: 'Bagaimana caramu memastikan bahwa hasil kerjamu benar-benar bebas dari kesalahan sebelum dikirim?',
      starTemplate: (role) => ({
        situation: `Sebelum mengirimkan dokumen final proyek ${role} kepada stakeholder eksternal, waktu yang tersisa sangat terbatas.`,
        task: 'Saya harus memastikan tidak ada kesalahan data atau tipografi tanpa menunda jadwal pengiriman.',
        action: 'Saya menggunakan checklist verifikasi 5 poin, mengecek silang angka kunci dengan sumber data primer, dan membaca ulang dalam format cetak.',
        result: 'Dokumen diterima dengan nol revisi dan stakeholder memuji kerapian serta akurasi data yang disajikan.',
      }),
    },
    2: {
      levelLabel: 'Menengah (Standar Industri)',
      scorePercentage: 69,
      maturityStatus: 'Operasional (Mandiri)',
      behavioralTendency:
        'Cermat dalam kondisi kerja normal dan tidak terburu-buru. Namun jika dihadapkan pada deadline ketat atau beban multitasking tinggi, konsentrasi detailmu rentan menurun dan memicu salah ketik atau data yang tidak sinkron.',
      workplaceStrengths: [
        'Mengetahui standar kualitas dasar dan berusaha mematuhinya secara konsisten.',
        'Mampu memperbaiki kesalahan dengan cepat begitu mendapat teguran atau koreksi.',
      ],
      blindSpotsAndRisks: [
        'Sering melewatkan detail kecil di akhir dokumen karena kelelahan mental (fatigue).',
        'Kurang disiplin menjalankan checklist verifikasi saat merasa percaya diri.',
      ],
      actionableCoaching:
        'Gunakan teknik "Fresh Eyes": istirahatlah 5-10 menit sebelum melakukan review final, atau ubah format tampilan (misal ganti ukuran font) saat proofreading.',
      interviewQuestion: 'Ceritakan pengalaman ketika kamu berhasil mendeteksi kesalahan kecil yang berdampak besar jika lolos.',
      starTemplate: (role) => ({
        situation: `Saat meninjau draft akhir deliverable ${role}, saya memperhatikan ada anomali kecil pada rumus perhitungan di tabel pendukung.`,
        task: 'Saya harus memverifikasi apakah anomali tersebut adalah kesalahan rumus atau variasi data normal.',
        action: 'Saya mengaudit formula sel per sel dan menemukan referensi koordinat yang meleset satu baris.',
        result: 'Koreksi cepat berhasil mencegah salah tafsir anggaran yang bernilai jutaan rupiah bagi tim.',
      }),
    },
    1: {
      levelLabel: 'Dasar (Perlu Asah)',
      scorePercentage: 43,
      maturityStatus: 'Dasar (Reaktif)',
      behavioralTendency:
        'Cenderung bekerja tergesa-gesa dengan dorongan "yang penting cepat selesai". Kerap melewatkan instruksi spesifik, format tidak rapi, dan membiarkan eror minor menumpuk hingga menurunkan reputasi profesional.',
      workplaceStrengths: [
        'Kecepatan eksekusi awal tinggi dan tidak terbebani oleh overthinking detail.',
      ],
      blindSpotsAndRisks: [
        'Dianggap ceroboh oleh atasan; memicu pekerjaan ganda (rework) yang justru memboroskan waktu tim.',
        'Rentan melanggar kepatuhan SOP penting karena malas membaca regulasi panjang.',
      ],
      actionableCoaching:
        'Wajibkan dirimu membuat "Checklist 3 Langkah": (1) Cek kesesuaian instruksi, (2) Cek akurasi angka/data, (3) Cek kerapian format, sebelum menekan tombol kirim.',
      interviewQuestion: 'Bagaimana caramu mengelola pekerjaan yang menuntut ketelitian tinggi ketika kamu sedang terburu-buru?',
      starTemplate: (role) => ({
        situation: `Saya pernah mengalami situasi di mana ketergesa-gesaan membuat saya salah memasukkan parameter penting pada tugas ${role}.`,
        task: 'Saya menyadari bahwa kecepatan tanpa ketelitian tidak ada nilainya di dunia kerja.',
        action: 'Saya menciptakan sistem checklist pribadi dan memperlambat ritme kerja 10% untuk mendedikasikan waktu review final.',
        result: 'Tingkat eror saya berkurang drastis hingga 90% pada seluruh penugasan berikutnya.',
      }),
    },
  },

  'Inisiatif & Proaktif': {
    3: {
      levelLabel: 'Lanjutan (Siap Kerja Unggul)',
      scorePercentage: 92,
      maturityStatus: 'Strategis (Unggul)',
      behavioralTendency:
        'Memiliki Sense of Ownership yang tinggi. Tidak pernah menunggu instruksi ketika melihat peluang perbaikan atau potensi risiko; kamu langsung menyusun proposal solusi dan mengeksekusinya dalam batas kewenangan profesional.',
      workplaceStrengths: [
        'Mampu mengubah ambiguitas menjadi rencana aksi konkret bagi seluruh tim.',
        'Menciptakan efisiensi baru dengan mengotomasikan tugas repetitif tanpa harus disuruh.',
        'Dipercaya oleh atasan untuk mengelola proyek mandiri dengan supervisi minimal.',
      ],
      blindSpotsAndRisks: [
        'Perlu menjaga komunikasi agar inisiatif mandiri tidak melangkahi kewenangan atasan atau merusak tatanan hierarki.',
      ],
      actionableCoaching:
        'Gunakan formula "Inform, don\'t ask": laporkan inisiatifmu dalam format "Saya melihat ada celah X, saya sudah merancang solusi Y, saya akan mulai besok kecuali ada arahan lain dari Bapak/Ibu."',
      interviewQuestion: 'Ceritakan inisiatif pribadi yang kamu ambil di luar tugas resmimu yang memberikan dampak nyata bagi organisasi.',
      starTemplate: (role) => ({
        situation: `Saat mengamati alur kerja rutin pada proyek ${role}, saya melihat banyak waktu terbuang untuk rekapitulasi data manual.`,
        task: 'Meskipun bukan tugas utama saya, saya ingin membantu tim bekerja lebih efisien.',
        action: 'Saya meluangkan waktu membuat template otomatisasi dan menyusun panduan penggunaan 2 halaman untuk tim.',
        result: 'Waktu rekapitulasi mingguan terpangkas dari 4 jam menjadi hanya 30 menit, menghemat ratusan jam kerja per tahun.',
      }),
    },
    2: {
      levelLabel: 'Menengah (Standar Industri)',
      scorePercentage: 67,
      maturityStatus: 'Operasional (Mandiri)',
      behavioralTendency:
        'Menjalankan tugas yang didefinisikan dengan penuh tanggung jawab dan dedikasi. Mau mengambil inisiatif jika situasinya mendesak atau setelah diberi sinyal hijau oleh atasan, namun belum terbiasa menciptakan peluang baru secara mandiri.',
      workplaceStrengths: [
        'Sangat dapat diandalkan (reliable) untuk menuntaskan apa yang sudah ditugaskan.',
        'Aktif memberikan usulan konstruktif saat diminta dalam forum diskusi atau meeting.',
      ],
      blindSpotsAndRisks: [
        'Cenderung berhenti bekerja begitu tugas formal selesai, daripada mencari nilai tambah (value-add) berikutnya.',
        'Kekhawatiran berlebihan akan membuat kesalahan menghambat keberanian berinisiatif.',
      ],
      actionableCoaching:
        'Latih mindset "Plus One": setiap kali menyelesaikan suatu tugas, tanyakan pada dirimu "Hal ekstra apa (meskipun kecil) yang bisa saya tambahkan agar hasil kerja ini melampaui ekspektasi atasan?"',
      interviewQuestion: 'Apa yang kamu lakukan ketika kamu sudah menyelesaikan seluruh tugasmu sebelum jam kerja berakhir?',
      starTemplate: (role) => ({
        situation: `Saya berhasil menyelesaikan deliverables ${role} lebih cepat 2 hari dari jadwal yang ditentukan.`,
        task: 'Alih-alih diam bersantai, saya ingin memanfaatkan sisa waktu untuk mendukung target tim.',
        action: 'Saya mengecek papan kerja rekan tim, menawarkan bantuan pada modul yang tertinggal, dan merapikan dokumentasi proyek.',
        result: 'Keseluruhan proyek tim selesai lebih cepat dan saya mendapatkan apresiasi atas kesiapan membantu rekan.',
      }),
    },
    1: {
      levelLabel: 'Dasar (Perlu Asah)',
      scorePercentage: 41,
      maturityStatus: 'Dasar (Reaktif)',
      behavioralTendency:
        'Bekerja dengan mentalitas "Wait-and-See". Hanya bergerak jika ada perintah tertulis yang eksplisit. Jika instruksi tidak lengkap, kamu cenderung memilih diam menunggu daripada berinisiatif bertanya atau mencari alternatif.',
      workplaceStrengths: [
        'Patuh pada komando dan tidak pernah bertindak melenceng dari batas perintah.',
      ],
      blindSpotsAndRisks: [
        'Dipersepsikan pasif, kurang memiliki gairah kerja, dan sulit dipromosikan ke jenjang kepemimpinan.',
        'Pekerjaan mudah terhenti (stagnan) begitu atasan sedang tidak berada di tempat.',
      ],
      actionableCoaching:
        'Latih keberanian berbicara: targetkan untuk mengajukan minimal satu pertanyaan atau satu usulan ide di setiap sesi meeting tim.',
      interviewQuestion: 'Ceritakan situasi ketika kamu harus mengambil keputusan tanpa ada atasan atau mentor di tempat.',
      starTemplate: (role) => ({
        situation: `Saya menghadapi pilihan mendesak dalam penyusunan tugas ${role} sementara ketua tim sedang berhalangan hadir.`,
        task: 'Saya harus mengambil keputusan agar proses tidak macet dengan tetap meminimalkan resiko.',
        action: 'Saya menimbang opsi berdasarkan panduan terdahulu, memilih opsi teraman, dan mendokumentasikan alasan keputusan secara lengkap.',
        result: 'Ketika ketua tim kembali, beliau menyetujui langkah saya karena dasar pertimbangannya logis dan terdokumentasi.',
      }),
    },
  },

  'Adaptabilitas': {
    3: {
      levelLabel: 'Lanjutan (Siap Kerja Unggul)',
      scorePercentage: 94,
      maturityStatus: 'Strategis (Unggul)',
      behavioralTendency:
        'Memiliki resiliensi emosional dan kelincahan mental (agility) yang tinggi. Saat terjadi perubahan strategi mendadak, pivot arah bisnis, atau perubahan susunan tim, kamu tidak mengeluh melainkan langsung menyusun ulang prioritas dan memimpin tim beradaptasi.',
      workplaceStrengths: [
        'Thrives in Ambiguity: tetap produktif dan tenang di lingkungan kerja yang dinamis tanpa kepastian penuh.',
        'Mampu memisahkan keterikatan emosional pada ide lama saat ide baru yang lebih baik dihadirkan.',
        'Menjadi penenang bagi rekan tim yang merasa cemas terhadap perubahan organisasi.',
      ],
      blindSpotsAndRisks: [
        'Bisa terkesan terlalu cepat berpindah arah sehingga rekan yang berorientasi rutinitas merasa tertinggal.',
      ],
      actionableCoaching:
        'Bantu rekan yang lambat beradaptasi: dampingi mereka dengan menjelaskan rasional di balik perubahan agar seluruh tim bergerak serentak.',
      interviewQuestion: 'Ceritakan pengalaman ketika rencana besarmu tiba-tiba dibatalkan atau diubah total di tengah jalan.',
      starTemplate: (role) => ({
        situation: `Setelah bekerja 3 minggu menyusun strategi ${role}, kebutuhan klien mendadak berubah 180 derajat karena perubahan regulasi pasar.`,
        task: 'Saya harus mengabaikan sebagian pekerjaan lama dan merancang pendekatan baru dalam waktu hanya 48 jam.',
        action: 'Saya segera memimpin sesi restrukturisasi ide, mendaur ulang aset yang masih relevan, dan menyusun roadmap darurat yang fokus pada kebutuhan baru.',
        result: 'Klien sangat terkesan dengan ketahanan dan kecepatan adaptasi tim, menghasilkan kontrak kerjasama jangka panjang.',
      }),
    },
    2: {
      levelLabel: 'Menengah (Standar Industri)',
      scorePercentage: 70,
      maturityStatus: 'Operasional (Mandiri)',
      behavioralTendency:
        'Mampu menerima perubahan rencana dengan baik setelah diberikan waktu adaptasi yang memadai dan penjelasan logis dari atasan. Sedikit merasa frustrasi di awal saat rutinitas terganggu, namun lekas kembali fokus.',
      workplaceStrengths: [
        'Fleksibel dalam menyesuaikan jadwal kerja dengan dinamika prioritas perusahaan.',
        'Terbuka mencoba tools atau aplikasi baru begitu diperkenalkan.',
      ],
      blindSpotsAndRisks: [
        'Kinerja sempat mengalami penurunan sementara saat terjadi goncangan atau perubahan sistem mendadak.',
        'Cenderung bernostalgia membandingkan sistem baru dengan cara kerja lama yang lebih nyaman.',
      ],
      actionableCoaching:
        'Latih mindset "Pivot as Learning": saat rencana berubah, fokuskan pikiran pada skill baru apa yang bisa kamu pelajari dari tantangan tak terduga tersebut.',
      interviewQuestion: 'Bagaimana kamu menyikapi perubahan prioritas yang mendadak dari manajer di saat tugasmu hampir selesai?',
      starTemplate: (role) => ({
        situation: `Menjelang penyelesaian tugas ${role}, manajer meminta revisi prioritas mendadak karena ada permintaan darurat dari stakeholder.`,
        task: 'Saya harus menghentikan task saat ini dan segera mengalihkan fokus ke prioritas baru tanpa kehilangan jejak pekerjaan lama.',
        action: 'Saya mengarsipkan progres pekerjaan pertama secara rapi, mengonfirmasi ekspektasi prioritas baru, dan langsung mengeksekusinya.',
        result: 'Permintaan darurat tuntas tepat waktu dan pekerjaan awal berhasil saya selesaikan di hari berikutnya tanpa kendala.',
      }),
    },
    1: {
      levelLabel: 'Dasar (Perlu Asah)',
      scorePercentage: 42,
      maturityStatus: 'Dasar (Reaktif)',
      behavioralTendency:
        'Sangat terikat pada rutinitas dan zona nyaman. Menunjukkan resistensi emosional yang tinggi saat ada perubahan mendadak, cenderung mengeluh berkepanjangan, dan butuh waktu lama untuk kembali produktif.',
      workplaceStrengths: [
        'Sangat konsisten dan presisi jika lingkungan kerja benar-benar stabil dan dapat diprediksi.',
      ],
      blindSpotsAndRisks: [
        'Tingkat stres tinggi di lingkungan startup atau industri modern yang bergerak cepat.',
        'Bisa dipersepsikan sebagai pribadi yang kaku dan enggan diajak maju oleh rekan tim.',
      ],
      actionableCoaching:
        'Lakukan latihan ketidaknyamanan mikro (micro-discomfort drills): ubah rute berangkat, gunakan shortcut baru, atau ubah urutan rutinitas harian untuk melatih fleksibilitas saraf otak.',
      interviewQuestion: 'Bagaimana caramu mengelola stres ketika menghadapi situasi kerja yang tidak menentu?',
      starTemplate: (role) => ({
        situation: `Saat pertama kali menghadapi pergeseran requirement yang mendadak dalam studi kasus ${role}, saya merasa kewalahan dan stres.`,
        task: 'Saya menyadari bahwa industri kerja tidak selalu ideal dan saya harus membangun daya tahan mental.',
        action: 'Saya mengambil jeda napas 5 menit, menuliskan ulang hal-hal yang berada dalam kendali saya, dan fokus mengeksekusi langkah demi langkah.',
        result: 'Saya berhasil menyelesaikan tugas tersebut dan membuktikan pada diri sendiri bahwa saya mampu beradaptasi di bawah tekanan.',
      }),
    },
  },
};

/**
 * Menghasilkan analisis mendalam untuk 8 dimensi soft skill berdasarkan level hasil tes user.
 * @param skillRatings Record rating skill (berisi skor level 1, 2, atau 3)
 * @param targetRole Nama target peran karier (misal: "Frontend Developer", "Product Manager")
 */
export function getDetailedSoftSkillAnalysis(
  skillRatings: Record<string, number>,
  targetRole: string = 'Karier Profesional'
): SoftSkillDetailReport[] {
  return SJT_SKILLS.map((skill) => {
    const meta = SJT_SKILL_META[skill];
    const rawLevel = skillRatings[skill] ?? 1;
    const level = (rawLevel >= 3 ? 3 : rawLevel === 2 ? 2 : 1) as 1 | 2 | 3;
    const content = SOFT_SKILL_DEFINITIONS[skill][level];

    return {
      skill,
      label: meta.label,
      shortLabel: meta.shortLabel,
      icon: meta.icon,
      level,
      levelLabel: content.levelLabel,
      scorePercentage: content.scorePercentage,
      maturityStatus: content.maturityStatus,
      behavioralTendency: content.behavioralTendency,
      workplaceStrengths: content.workplaceStrengths,
      blindSpotsAndRisks: content.blindSpotsAndRisks,
      actionableCoaching: content.actionableCoaching,
      interviewTalkingPoint: {
        promptQuestion: content.interviewQuestion,
        starStory: content.starTemplate(targetRole),
      },
    };
  });
}
