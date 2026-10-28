// ──────────────────────────────────────────────
// Situational Judgement Test (SJT) - Kesiapan Karir & Soft Skills
// Auto-generated from data/sjt/Bank_Soal_SJT_Kesiapan_Karir.xlsx
// ──────────────────────────────────────────────

export type SJTOption = {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
  weight: number; // 1 (Passive Bad), 2 (Active Bad), 3 (Sub-optimal), 4 (Most Effective)
  effectiveness: 'Most Effective' | 'Sub-optimal' | 'Active Bad' | 'Passive Bad';
};

export type SJTQuestion = {
  id: string;
  targetSkill: SJTSkill;
  dimension: string;
  behavioralIndicator: string;
  scenario: string;
  options: SJTOption[];
  mostEffectiveKey: 'A' | 'B' | 'C' | 'D';
  leastEffectiveKey: 'A' | 'B' | 'C' | 'D';
  psychometricRationale: string;
  careerCoachingFeedback: string;
};

export const SJT_SKILLS = [
  'Kolaborasi Tim & Lintas Fungsi',
  'Komunikasi',
  'Berpikir Analitis & Kritis',
  'Problem Solving',
  'Kemauan Belajar & Rasa Ingin Tahu',
  'Ketelitian (Attention to Detail)',
  'Inisiatif & Proaktif',
  'Adaptabilitas',
] as const;

export type SJTSkill = (typeof SJT_SKILLS)[number];

export const SJT_SKILL_META: Record<
  SJTSkill,
  { label: string; shortLabel: string; icon: string; description: string }
> = {
  'Kolaborasi Tim & Lintas Fungsi': {
    label: 'Kolaborasi Tim & Lintas Fungsi',
    shortLabel: 'Kolaborasi Tim',
    icon: 'Users2',
    description: 'Kemampuan bekerja sama, menyelaraskan tujuan lintas divisi, dan menyelesaikan konflik kelompok secara konstruktif.',
  },
  'Komunikasi': {
    label: 'Komunikasi Efektif',
    shortLabel: 'Komunikasi',
    icon: 'MessageSquare',
    description: 'Menyampaikan pesan secara jelas, mendengarkan aktif, dan menyesuaikan gaya komunikasi dengan audiens.',
  },
  'Berpikir Analitis & Kritis': {
    label: 'Berpikir Analitis & Kritis',
    shortLabel: 'Berpikir Kritis',
    icon: 'SearchCheck',
    description: 'Mengevaluasi bukti secara objektif, membedakan fakta vs asumsi, dan menarik kesimpulan logis terstruktur.',
  },
  'Problem Solving': {
    label: 'Pemecahan Masalah (Problem Solving)',
    shortLabel: 'Problem Solving',
    icon: 'Puzzle',
    description: 'Menganalisis akar masalah secara sistematis dan merumuskan solusi alternatif dengan pertimbangan trade-off matang.',
  },
  'Kemauan Belajar & Rasa Ingin Tahu': {
    label: 'Kemauan Belajar & Rasa Ingin Tahu',
    shortLabel: 'Kemauan Belajar',
    icon: 'BookOpen',
    description: 'Proaktif mencari wawasan baru, menerima umpan balik untuk refleksi diri, dan cepat menguasai hal yang belum dipahami.',
  },
  'Ketelitian (Attention to Detail)': {
    label: 'Ketelitian (Attention to Detail)',
    shortLabel: 'Ketelitian',
    icon: 'Crosshair',
    description: 'Cermat dalam memeriksa akurasi data, mematuhi standar kualitas, dan mengantisipasi celah kekeliruan kecil.',
  },
  'Inisiatif & Proaktif': {
    label: 'Inisiatif & Proaktif',
    shortLabel: 'Inisiatif',
    icon: 'Flame',
    description: 'Mengambil tindakan tanpa harus diperintah, mencari peluang perbaikan, dan bertanggung jawab atas hasil kerja.',
  },
  'Adaptabilitas': {
    label: 'Adaptabilitas & Fleksibilitas',
    shortLabel: 'Adaptabilitas',
    icon: 'RefreshCw',
    description: 'Cepat menyesuaikan diri dengan perubahan prioritas, tantangan tak terduga, dan dinamika lingkungan kerja.',
  },
};

export const sjtBank: SJTQuestion[] = [
  {
    "id": "SJT-KOL-01",
    "targetSkill": "Kolaborasi Tim & Lintas Fungsi",
    "dimension": "Manajemen Konflik / Pemecahan Masalah Bersama",
    "behavioralIndicator": "Mengatasi ketidakseimbangan kontribusi rekan dalam proyek bersama",
    "scenario": "Kamu satu kelompok dengan empat teman untuk tugas besar mata kuliah Pengantar Manajemen. Dua minggu menjelang pengumpulan, Bimo belum mengirimkan bagian tugasnya dan jarang menjawab pesan di grup. Anggota lain mulai mengeluh di belakang. Kamu bukan ketua kelompok, tetapi nilai tugas ini ditanggung bersama dan waktu semakin sempit. Kamu ingin tugas selesai dengan baik tanpa merusak suasana kelompok.",
    "options": [
      {
        "label": "A",
        "text": "Mengambil alih bagian Bimo supaya tugas kelompok tetap selesai tepat waktu.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "B",
        "text": "Berbicara dengan Bimo secara pribadi untuk memahami kendalanya dan menyepakati tenggat baru.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "C",
        "text": "Menegur Bimo di grup chat di depan semua anggota agar ia segera bekerja.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "D",
        "text": "Menunggu beberapa hari lagi sambil berharap Bimo mengirimkan bagiannya sendiri.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      }
    ],
    "mostEffectiveKey": "B",
    "leastEffectiveKey": "D",
    "psychometricRationale": "Kunci (B) mencerminkan Teamwork KSA: ketimpangan kontribusi ditangani lewat komunikasi langsung dan pribadi sehingga akar masalah dapat dipahami. Opsi A sub-optimal: niat menyelamatkan tugas baik, tetapi pola ketimpangan dibiarkan dan beban menumpuk pada diri sendiri. Opsi C active bad: menegur di ruang publik merusak relasi dan memicu sikap defensif. Opsi D passive bad: menghindari konflik sementara risiko tenggat terus membesar.",
    "careerCoachingFeedback": "Dalam kerja kelompok, bicarakan masalah kontribusi secara langsung dan empatik sebelum melibatkan pihak lain. Tanyakan kendalanya, bukan menuduh. Kebiasaan ini menjadi dasar kemampuan menangani konflik tim saat magang dan bekerja."
  },
  {
    "id": "SJT-KOL-02",
    "targetSkill": "Kolaborasi Tim & Lintas Fungsi",
    "dimension": "Penyelarasan & Kolaborasi Lintas Departemen",
    "behavioralIndicator": "Berbagi informasi secara proaktif dan memanfaatkan keahlian tim yang beragam",
    "scenario": "Kamu menjadi anggota tim lomba karya tulis yang terdiri dari mahasiswa Teknik, Ekonomi, dan Desain. Dalam rapat pertama, tiap jurusan memakai istilah berbeda dan cenderung mengerjakan bagiannya sendiri-sendiri. Kamu khawatir hasil akhirnya terpecah karena belum ada pemahaman bersama tentang alur karya. Ketua tim sedang sibuk ujian sehingga belum bisa memimpin penyelarasan. Kamu ingin karya tim ini terasa utuh dan saling melengkapi.",
    "options": [
      {
        "label": "A",
        "text": "Mengerjakan bagian jurusanmu saja sambil menunggu ketua tim selesai ujian untuk menyatukannya.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "B",
        "text": "Menyusun sendiri seluruh kerangka karya dari sudut pandang jurusanmu lalu meminta semua anggota mengikutinya.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "C",
        "text": "Meminta setiap anggota menulis ringkasan bagiannya untuk digabung oleh ketua tim nanti.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "D",
        "text": "Mengusulkan pertemuan singkat agar tiap jurusan memaparkan keahliannya dan menyepakati alur karya.",
        "weight": 4,
        "effectiveness": "Most Effective"
      }
    ],
    "mostEffectiveKey": "D",
    "leastEffectiveKey": "A",
    "psychometricRationale": "Kunci (D) menunjukkan penyelarasan lintas fungsi: informasi dibagikan secara proaktif, keahlian beragam dimanfaatkan, dan pemahaman bersama dibangun sebelum eksekusi. Opsi C sub-optimal karena berbagi informasi tanpa dialog, sehingga kesenjangan istilah tetap ada. Opsi B active bad karena memaksakan satu perspektif dan mengabaikan keahlian lain. Opsi A passive bad karena mempertahankan sekat kerja (silo) dan menunda penyelarasan.",
    "careerCoachingFeedback": "Tim lintas jurusan menghasilkan karya terbaik bila semua orang memahami tujuan dan keahlian satu sama lain sejak awal. Jangan menunggu diminta; inisiatif membuka diskusi singkat adalah ciri rekan kerja lintas fungsi yang dicari perekrut."
  },
  {
    "id": "SJT-KOL-03",
    "targetSkill": "Kolaborasi Tim & Lintas Fungsi",
    "dimension": "Pengambilan Perspektif & Keterbukaan",
    "behavioralIndicator": "Akomodatif terhadap sudut pandang anggota lain dan fleksibel dalam bekerja sama",
    "scenario": "Dalam kerja kelompok presentasi, kamu sudah menyiapkan konsep slide dengan banyak grafik. Saat rapat, Sinta mengusulkan konsep yang lebih sederhana karena audiens hanya punya waktu singkat untuk membaca. Beberapa anggota tampak setuju dengan Sinta, sementara kamu merasa konsepmu lebih lengkap dan sudah menghabiskan banyak waktu. Rapat hanya tersisa lima belas menit dan kelompok harus segera memutuskan konsep.",
    "options": [
      {
        "label": "A",
        "text": "Meminta Sinta menjelaskan pertimbangannya secara rinci agar kedua konsep dapat dibandingkan.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "B",
        "text": "Meyakinkan anggota lain bahwa konsepmu lebih baik karena kamu sudah banyak mengerjakannya.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "C",
        "text": "Mengikuti konsep Sinta tanpa berkomentar agar rapat cepat selesai.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "D",
        "text": "Mengajak kelompok memilih konsep melalui pemungutan suara.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "A",
    "leastEffectiveKey": "C",
    "psychometricRationale": "Kunci (A) mencerminkan pengambilan perspektif: alasan orang lain digali sebelum menilai, sehingga keputusan berbasis pertimbangan, bukan kepemilikan ide. Opsi D sub-optimal karena prosedurnya adil tetapi tidak menggali alasan, sehingga peluang memadukan ide hilang. Opsi B active bad karena menekan kelompok dengan argumen usaha pribadi. Opsi C passive bad karena mengalah tanpa menyampaikan pandangan, sehingga ide tidak dievaluasi.",
    "careerCoachingFeedback": "Ide yang kamu buat dengan susah payah belum tentu paling cocok. Pisahkan harga diri dari gagasan: tanyakan alasan orang lain, lalu cari titik temu. Sikap terbuka ini penting dalam tim magang dan proyek organisasi."
  },
  {
    "id": "SJT-KOL-04",
    "targetSkill": "Kolaborasi Tim & Lintas Fungsi",
    "dimension": "Regulasi Sosial",
    "behavioralIndicator": "Mampu melakukan kompromi, negosiasi, dan pembagian peran untuk mencapai tujuan bersama",
    "scenario": "Kamu dan tiga anggota UKM menyiapkan acara bakti sosial akhir bulan. Dua anggota ingin berfokus pada pengumpulan donasi, sedangkan dua lainnya ingin berfokus pada kegiatan lapangan. Perdebatan sudah berjalan dua kali rapat tanpa keputusan, dan waktu persiapan tinggal tiga minggu. Ketua UKM menyerahkan keputusan teknis kepada tim kalian. Kamu ingin acara berjalan baik tanpa ada anggota yang merasa pendapatnya diabaikan.",
    "options": [
      {
        "label": "A",
        "text": "Memilih pihak yang kamu anggap lebih berpengalaman lalu mengumumkan keputusannya ke seluruh tim.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "B",
        "text": "Menunda keputusan sampai rapat berikutnya agar semua pihak punya waktu berpikir lebih lama.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "C",
        "text": "Mengusulkan pembagian dua seksi sesuai minat masing-masing dengan target dan tenggat yang disepakati.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "D",
        "text": "Mengusulkan agar tim mengerjakan satu fokus dahulu, lalu fokus lainnya jika waktu masih cukup.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "C",
    "leastEffectiveKey": "B",
    "psychometricRationale": "Kunci (C) menunjukkan regulasi sosial: kompromi berbasis pembagian peran yang memadukan minat dan tujuan bersama dengan batas waktu jelas. Opsi D sub-optimal karena kompromi berurutan berisiko tidak terlaksana dan mengabaikan salah satu pihak. Opsi A active bad karena memutuskan sepihak dan menurunkan rasa memiliki. Opsi B passive bad karena perdebatan berlarut sementara sisa waktu persiapan menipis.",
    "careerCoachingFeedback": "Perbedaan prioritas dalam organisasi bisa diselesaikan lewat pembagian peran yang jelas. Latih dirimu mengusulkan solusi menang-menang dengan tenggat konkret; kemampuan bernegosiasi seperti ini membuatmu dipercaya memimpin proyek."
  },
  {
    "id": "SJT-KOL-05",
    "targetSkill": "Kolaborasi Tim & Lintas Fungsi",
    "dimension": "Eskalasi Masalah / Komunikasi Atasan",
    "behavioralIndicator": "Melibatkan dosen atau atasan secara tepat setelah upaya langsung kepada rekan tim",
    "scenario": "Sudah dua kali kamu dan ketua kelompok mengingatkan Rafi secara langsung untuk menyelesaikan bagian laporan praktikum yang menjadi tanggung jawabnya, tetapi ia terus menunda dengan berbagai alasan. Pengumpulan tinggal empat hari. Dosen pengampu membuka sesi konsultasi mingguan, dan kelompok lain pernah berkonsultasi soal pembagian kerja. Kamu ingin laporan selesai tepat waktu tanpa merusak hubungan dalam kelompok.",
    "options": [
      {
        "label": "A",
        "text": "Mengirim pesan kepada dosen berisi keluhan bahwa Rafi tidak bertanggung jawab tanpa melibatkan ketua kelompok.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "B",
        "text": "Bersama ketua kelompok, menyampaikan kendala pembagian kerja kepada dosen pada sesi konsultasi.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "C",
        "text": "Menawarkan diri membantu Rafi mengerjakan setengah bagiannya agar laporan terkejar.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "D",
        "text": "Mengerjakan bagian Rafi secara diam-diam agar tidak menimbulkan konflik.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      }
    ],
    "mostEffectiveKey": "B",
    "leastEffectiveKey": "D",
    "psychometricRationale": "Kunci (B) mencerminkan eskalasi yang tepat: upaya langsung sudah dua kali dilakukan, sehingga melibatkan dosen bersama ketua kelompok bersifat transparan, fokus pada kendala, dan melalui jalur yang benar. Opsi C sub-optimal karena mengulang pendekatan yang belum berhasil dan menambah beban diri. Opsi A active bad karena melewati ketua kelompok dan bernada menuduh. Opsi D passive bad karena menutupi masalah tanpa transparansi.",
    "careerCoachingFeedback": "Eskalasi bukan tanda kegagalan, asalkan dilakukan setelah berbicara langsung, melalui pihak yang tepat, dan berfokus pada solusi. Kebiasaan ini melatih komunikasi profesional kepada atasan saat magang dan bekerja."
  },
  {
    "id": "SJT-KOM-01",
    "targetSkill": "Komunikasi",
    "dimension": "Formulasi Pesan (Message Formulation)",
    "behavioralIndicator": "Merancang dan mengorganisasi pesan tertulis yang jelas sesuai konteks profesional",
    "scenario": "Jadwal kuis di salah satu mata kuliahmu bertabrakan dengan kegiatan kepanitiaan kampus yang sudah kamu sepakati sebelumnya. Kamu ingin meminta jadwal kuis pengganti kepada dosen yang belum pernah kamu temui langsung. Dosen tersebut dikenal sibuk dan hanya membalas pesan pada jam kerja. Kamu ingin kesan pertamamu kepada dosen tetap baik dan permintaanmu mudah ditindaklanjuti.",
    "options": [
      {
        "label": "A",
        "text": "Mengirim pesan di aplikasi chat pribadi pada malam hari dengan bahasa santai.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "B",
        "text": "Menunggu sampai bertemu dosen di kelas untuk membicarakannya secara lisan.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "C",
        "text": "Menulis email formal yang menyebutkan identitas, alasan, dan usulan waktu pengganti secara jelas.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "D",
        "text": "Menulis email singkat yang menyatakan kamu berhalangan dan meminta jadwal pengganti.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "C",
    "leastEffectiveKey": "B",
    "psychometricRationale": "Kunci (C) menunjukkan formulasi pesan yang efektif: kanal formal, identitas jelas, alasan ringkas, dan usulan solusi sehingga dosen dapat langsung menindaklanjuti. Opsi D sub-optimal karena tidak memuat alternatif waktu sehingga perlu balasan berulang. Opsi A active bad karena kanal dan gaya bahasa tidak sesuai norma profesional-akademik. Opsi B passive bad karena menunda hingga tatap muka dan berisiko melewati batas waktu.",
    "careerCoachingFeedback": "Pesan kepada dosen atau atasan sebaiknya memuat salam, identitas, tujuan, alasan singkat, dan usulan solusi. Pesan yang lengkap menghemat waktu penerima dan mencerminkan profesionalisme sejak dini."
  },
  {
    "id": "SJT-KOM-02",
    "targetSkill": "Komunikasi",
    "dimension": "Komunikasi Efektif dan Penyesuaian Audiens",
    "behavioralIndicator": "Mengekspresikan gagasan secara ringkas dan menyesuaikan gaya komunikasi dengan audiens",
    "scenario": "Kamu mendapat giliran menjelaskan hasil proyek kelompok kepada mahasiswa jurusan lain dalam pameran kampus. Proyekmu penuh istilah teknis dari bidang studimu. Pengunjung hanya berhenti sekitar dua menit di setiap stan, dan beberapa tampak bingung saat kamu menjelaskan. Kamu ingin pengunjung benar-benar memahami manfaat proyekmu sebelum berpindah ke stan lain, dan kamu sadar waktumu sangat terbatas.",
    "options": [
      {
        "label": "A",
        "text": "Menjelaskan inti proyek dengan bahasa sehari-hari dan satu contoh sederhana yang dekat dengan pengunjung.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "B",
        "text": "Mengulang penjelasan teknis dengan suara lebih keras sampai pengunjung memahaminya.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "C",
        "text": "Membiarkan pengunjung membaca poster stan sendiri dan hanya menjawab jika ada yang bertanya.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "D",
        "text": "Membagikan brosur berisi penjelasan lengkap proyek kepada setiap pengunjung.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "A",
    "leastEffectiveKey": "C",
    "psychometricRationale": "Kunci (A) menunjukkan penyesuaian audiens: pesan diringkas, bahasa disederhanakan, dan contoh kontekstual dipakai agar mudah dipahami dalam waktu singkat. Opsi D sub-optimal karena brosur membantu tetapi tidak menjawab kebingungan langsung dalam interaksi dua menit. Opsi B active bad karena mengulang pesan yang sama tanpa mengubah pendekatan dan terkesan defensif. Opsi C passive bad karena menghindari tanggung jawab menyampaikan pesan.",
    "careerCoachingFeedback": "Komunikasi efektif bukan soal selengkap apa penjelasanmu, melainkan semudah apa audiens memahaminya. Latih menyampaikan inti gagasan dalam satu atau dua kalimat dengan contoh sehari-hari."
  },
  {
    "id": "SJT-KOM-03",
    "targetSkill": "Komunikasi",
    "dimension": "Umpan Balik Pesan & Komunikasi (Message and Communication Feedback)",
    "behavioralIndicator": "Memahami audiens dan menginterpretasikan isyarat serta umpan balik lawan bicara",
    "scenario": "Saat kamu menjelaskan rencana program kerja UKM kepada seorang senior pembimbing, ia beberapa kali melihat jam dan mengerutkan dahi, tetapi tidak berkata apa-apa. Kamu baru menyelesaikan setengah penjelasan, dan masih ada beberapa poin penting yang ingin kamu sampaikan. Kamu ingin program kerjamu mendapat dukungan, tetapi tidak ingin membuat senior merasa waktunya terbuang.",
    "options": [
      {
        "label": "A",
        "text": "Mempercepat bicara agar semua poin tetap tersampaikan dalam waktu singkat.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "B",
        "text": "Menghentikan penjelasan lebih awal tanpa menanyakan apa pun kepada senior.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "C",
        "text": "Melanjutkan penjelasan sesuai rencana awal karena semua poinnya penting dipahami senior.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "D",
        "text": "Bertanya kepada senior apakah waktunya cukup dan bagian mana yang ingin didahulukan.",
        "weight": 4,
        "effectiveness": "Most Effective"
      }
    ],
    "mostEffectiveKey": "D",
    "leastEffectiveKey": "B",
    "psychometricRationale": "Kunci (D) menunjukkan kepekaan terhadap umpan balik non-verbal: isyarat dikonfirmasi lewat pertanyaan terbuka, lalu pesan diprioritaskan sesuai kebutuhan lawan bicara. Opsi A sub-optimal karena menyesuaikan kecepatan tanpa memverifikasi kebutuhan senior. Opsi C active bad karena mengabaikan isyarat dan memaksakan agenda sendiri. Opsi B passive bad karena menghindari klarifikasi sehingga poin penting tidak tersampaikan.",
    "careerCoachingFeedback": "Komunikasi berlangsung dua arah. Ketika lawan bicara menunjukkan isyarat terburu-buru atau tidak nyaman, cek dengan pertanyaan singkat daripada menebak atau memaksakan. Kepekaan ini sangat dihargai saat presentasi kepada atasan atau klien."
  },
  {
    "id": "SJT-KOM-04",
    "targetSkill": "Komunikasi",
    "dimension": "Penyampaian & Penerimaan Informasi",
    "behavioralIndicator": "Mendengarkan secara aktif dan memastikan pemahaman instruksi dengan bertanya",
    "scenario": "Dosen pengampu menjelaskan tugas observasi lapangan secara lisan di akhir kelas yang padat. Kamu hanya memahami sebagian instruksi, terutama soal format laporan dan batas waktunya. Dosen sudah bersiap meninggalkan ruangan, dan teman-temanmu langsung berkemas tanpa bertanya. Tugas ini berbobot cukup besar untuk nilai akhirmu dan dikumpulkan dua minggu lagi, sehingga kamu tidak ingin salah memahaminya.",
    "options": [
      {
        "label": "A",
        "text": "Meminta salinan instruksi dari teman yang tampak paham setelah kelas selesai.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "B",
        "text": "Meminta dosen mengulang bagian format laporan dan batas waktu sebelum beliau meninggalkan ruangan.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "C",
        "text": "Menunggu pengumuman tambahan di grup kelas dengan harapan instruksinya diulang.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "D",
        "text": "Menyimpulkan sendiri format dan batas waktunya berdasarkan tugas semester lalu.",
        "weight": 2,
        "effectiveness": "Active Bad"
      }
    ],
    "mostEffectiveKey": "B",
    "leastEffectiveKey": "C",
    "psychometricRationale": "Kunci (B) mencerminkan penerimaan informasi yang aktif: ketidakjelasan diklarifikasi langsung kepada sumber otoritatif pada saat yang paling efisien. Opsi A sub-optimal karena informasi didapat dari pihak ketiga sehingga berisiko tidak akurat. Opsi D active bad karena mengisi kekosongan informasi dengan asumsi. Opsi C passive bad karena bergantung pada kemungkinan pengumuman ulang tanpa memastikan.",
    "careerCoachingFeedback": "Bertanya untuk memperjelas instruksi bukan tanda kurang pintar, melainkan tanda profesional. Klarifikasi di awal mencegah kerja ulang dan kesalahan, baik di kuliah maupun di tempat magang."
  },
  {
    "id": "SJT-KOM-05",
    "targetSkill": "Komunikasi",
    "dimension": "Penyampaian Pesan (Message Delivery)",
    "behavioralIndicator": "Menyampaikan pesan yang sulit secara jelas, sopan, dan sesuai konteks",
    "scenario": "Seorang senior di UKM memintamu menjadi penanggung jawab dokumentasi acara besar akhir bulan. Pada waktu yang sama kamu punya dua tugas kuliah besar dan ujian tengah semester. Kamu menghargai kepercayaan senior itu dan ingin menjaga hubungan baik, tetapi kamu tahu tidak akan mampu menjalankan peran tersebut dengan baik. Senior tersebut menunggu jawabanmu sebelum rapat panitia dimulai besok.",
    "options": [
      {
        "label": "A",
        "text": "Menerima tugas itu terlebih dahulu dan berharap ada anggota lain yang membantu nanti.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "B",
        "text": "Tidak membalas pesan senior tersebut sampai ia mencari orang lain.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "C",
        "text": "Menolak secara singkat dengan mengatakan kamu sedang sibuk.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "D",
        "text": "Menolak dengan sopan sambil menyebutkan batas waktumu dan peran lain yang masih sanggup kamu ambil.",
        "weight": 4,
        "effectiveness": "Most Effective"
      }
    ],
    "mostEffectiveKey": "D",
    "leastEffectiveKey": "B",
    "psychometricRationale": "Kunci (D) menunjukkan komunikasi asertif: penolakan disampaikan sopan dengan alasan jelas dan alternatif kontribusi sehingga hubungan tetap terjaga. Opsi C sub-optimal karena jujur tetapi terlalu singkat dan berisiko terkesan tidak menghargai. Opsi A active bad karena janji yang tidak realistis merugikan acara dan reputasi. Opsi B passive bad karena menghindari percakapan dan membuat senior menunggu tanpa kepastian.",
    "careerCoachingFeedback": "Berkata tidak dengan sopan adalah bagian dari komunikasi profesional. Sampaikan keterbatasan dengan jelas dan tawarkan kontribusi alternatif. Cara ini lebih menjaga reputasi daripada menerima komitmen yang tidak bisa dipenuhi."
  },
  {
    "id": "SJT-BAK-01",
    "targetSkill": "Berpikir Analitis & Kritis",
    "dimension": "Berpikir Kritis tentang Dunia (Critical Thinking about the World)",
    "behavioralIndicator": "Mengidentifikasi dan mengevaluasi keandalan sumber informasi",
    "scenario": "Kamu mengerjakan tugas esai tentang tren pasar kerja bagi lulusan baru. Di media sosial, sebuah akun populer menyatakan bahwa sebagian besar lulusan jurusan tertentu menganggur, lengkap dengan grafik menarik tanpa mencantumkan sumber data. Teman satu kelompokmu ingin memakai grafik itu sebagai argumen utama esai karena tampak meyakinkan. Esai itu akan dinilai dari ketepatan argumen dan kualitas sumber yang kamu gunakan.",
    "options": [
      {
        "label": "A",
        "text": "Menelusuri sumber asli data tersebut pada situs lembaga resmi sebelum memutuskan memakainya.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "B",
        "text": "Memakai grafik itu karena sudah dibagikan ribuan kali dan dianggap banyak orang benar.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "C",
        "text": "Menyerahkan keputusan penggunaan grafik itu kepada teman satu kelompokmu.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "D",
        "text": "Menambahkan keterangan menurut akun media sosial pada grafik agar sumbernya jelas.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "A",
    "leastEffectiveKey": "C",
    "psychometricRationale": "Kunci (A) menunjukkan berpikir kritis terhadap sumber: klaim diverifikasi ke sumber primer yang kredibel sebelum dijadikan dasar argumen. Opsi D sub-optimal karena transparan soal sumber, tetapi tetap memakai data yang belum terverifikasi. Opsi B active bad karena popularitas bukan bukti kebenaran (bias bandwagon). Opsi C passive bad karena menghindari tanggung jawab mengevaluasi informasi.",
    "careerCoachingFeedback": "Jangan menilai kebenaran informasi dari seberapa banyak orang membagikannya. Biasakan menelusuri sumber asli, penerbit datanya, dan metodenya. Kebiasaan ini membuat argumenmu kuat dalam tugas kuliah maupun laporan kerja."
  },
  {
    "id": "SJT-BAK-02",
    "targetSkill": "Berpikir Analitis & Kritis",
    "dimension": "Identifikasi Masalah dan Evaluasi Alternatif Solusi",
    "behavioralIndicator": "Menganalisis akar penyebab masalah dan mengevaluasi fakta objektif",
    "scenario": "Kamu pengurus UKM yang menyelenggarakan seminar. Pendaftar hanya 30 orang dari target 100, padahal poster sudah disebar di media sosial selama dua minggu. Beberapa pengurus langsung berpendapat bahwa temanya kurang menarik dan ingin menggantinya, meskipun belum ada data tentang penyebab rendahnya pendaftaran. Rapat evaluasi akan diadakan besok, dan ketua UKM meminta masukan dari seluruh pengurus.",
    "options": [
      {
        "label": "A",
        "text": "Menyetujui penggantian tema karena sebagian besar pengurus sudah merasa yakin.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "B",
        "text": "Menambah frekuensi unggahan poster di semua media sosial agar lebih banyak orang melihatnya.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "C",
        "text": "Mengusulkan pengecekan data jangkauan poster dan alasan calon peserta belum mendaftar sebelum mengubah apa pun.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "D",
        "text": "Menunggu beberapa hari lagi untuk melihat apakah pendaftar bertambah dengan sendirinya.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      }
    ],
    "mostEffectiveKey": "C",
    "leastEffectiveKey": "D",
    "psychometricRationale": "Kunci (C) menunjukkan analisis akar masalah berbasis data: hipotesis diuji dengan fakta (jangkauan, minat) sebelum solusi dipilih. Opsi B sub-optimal karena menyasar satu kemungkinan penyebab tanpa bukti. Opsi A active bad karena keputusan diambil dari konsensus opini, bukan data. Opsi D passive bad karena menunggu tanpa informasi baru sementara waktu persiapan berkurang.",
    "careerCoachingFeedback": "Sebelum mencari solusi, pastikan kamu tahu penyebab masalahnya. Kumpulkan data sederhana seperti jumlah penayangan atau hasil bertanya kepada calon peserta. Berpikir berbasis bukti mencegah keputusan tergesa-gesa dan pemborosan sumber daya."
  },
  {
    "id": "SJT-BAK-03",
    "targetSkill": "Berpikir Analitis & Kritis",
    "dimension": "Berpikir Kritis tentang Diri Sendiri (Critical Thinking about Oneself / Self-Reflection)",
    "behavioralIndicator": "Mengevaluasi pemikiran sendiri secara objektif dan menyadari bias kognitif",
    "scenario": "Kamu yakin jurusanmu adalah pilihan terbaik karena disarankan kakak tingkat yang kamu kagumi. Semester ini, nilai dan minatmu pada beberapa mata kuliah inti ternyata menurun. Kamu mulai ragu, tetapi cenderung mengabaikan tanda-tanda itu karena merasa sudah telanjur berkomitmen. Masa pengisian rencana studi semester depan akan dibuka dua minggu lagi dan kamu perlu menentukan sikap sebelum itu.",
    "options": [
      {
        "label": "A",
        "text": "Tetap melanjutkan tanpa mengubah apa pun karena sudah telanjur menempuh satu tahun kuliah.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "B",
        "text": "Mengevaluasi data nilai dan minatmu secara objektif bersama konselor akademik.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "C",
        "text": "Segera pindah jurusan karena merasa semua yang dijalani selama ini salah.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "D",
        "text": "Meminta pendapat beberapa kakak tingkat lain tentang jurusan tersebut.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "B",
    "leastEffectiveKey": "A",
    "psychometricRationale": "Kunci (B) menunjukkan berpikir kritis tentang diri sendiri: bias komitmen dikenali dan keputusan ditinjau ulang berdasarkan data pribadi dengan bantuan pihak yang kompeten. Opsi D sub-optimal karena menambah perspektif tetapi masih bersumber dari opini orang lain, bukan data dirimu. Opsi C active bad karena keputusan drastis diambil secara emosional. Opsi A passive bad karena terjebak sunk cost dan mengabaikan data yang bertentangan.",
    "careerCoachingFeedback": "Sudah banyak berkorban pada suatu pilihan bukan alasan mengabaikan tanda ketidakcocokan. Evaluasi diri secara berkala dengan data nyata, dan manfaatkan konselor akademik atau pusat karir kampus untuk mendapat sudut pandang objektif."
  },
  {
    "id": "SJT-BAK-04",
    "targetSkill": "Berpikir Analitis & Kritis",
    "dimension": "Tindakan Kritis & Pengambilan Keputusan (Critical Action and Decision Making)",
    "behavioralIndicator": "Menerapkan berpikir kritis untuk membuat keputusan praktis dengan mempertimbangkan konsekuensi",
    "scenario": "Kamu menerima dua tawaran sekaligus: staf magang paruh waktu di sebuah startup (tanpa gaji, jadwal fleksibel) dan asisten laboratorium dosen (honor kecil, 10 jam per minggu). Tujuan karirmu masih tahap eksplorasi. Kamu harus memberi jawaban dalam tiga hari. Kedua tawaran sama-sama menarik, sementara jadwal kuliahmu semester ini cukup padat dan kamu belum pernah mengikuti magang sebelumnya.",
    "options": [
      {
        "label": "A",
        "text": "Menerima keduanya agar tidak kehilangan kesempatan, lalu mengatur waktu belakangan.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "B",
        "text": "Menunda jawaban sampai melewati batas waktu menunggu petunjuk yang lebih jelas.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "C",
        "text": "Memilih tawaran yang memberi honor karena kebutuhan finansial dianggap lebih nyata.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "D",
        "text": "Membandingkan kedua tawaran dengan kriteria jelas seperti minat, beban waktu, dan peluang belajar.",
        "weight": 4,
        "effectiveness": "Most Effective"
      }
    ],
    "mostEffectiveKey": "D",
    "leastEffectiveKey": "B",
    "psychometricRationale": "Kunci (D) menunjukkan pengambilan keputusan kritis: alternatif dievaluasi dengan kriteria eksplisit yang selaras dengan tujuan dan keterbatasan diri. Opsi C sub-optimal karena hanya memakai satu kriteria sehingga pertimbangan lain terabaikan. Opsi A active bad karena memutuskan tanpa analisis beban dan berisiko menurunkan kinerja akademik. Opsi B passive bad karena menunda hingga batas waktu terlewati sehingga kedua peluang bisa hilang.",
    "careerCoachingFeedback": "Saat memilih di antara beberapa peluang, tentukan dahulu kriteria penting bagimu, misalnya minat, beban waktu, dan peluang belajar, lalu bandingkan satu per satu. Keputusan karir yang baik lahir dari pertimbangan sistematis, bukan sekadar takut kehilangan kesempatan."
  },
  {
    "id": "SJT-BAK-05",
    "targetSkill": "Berpikir Analitis & Kritis",
    "dimension": "Evaluasi Data Objektif & Pemikiran Berbasis Bukti",
    "behavioralIndicator": "Mempertanyakan asumsi yang belum terverifikasi dan membedakan korelasi dari kausalitas",
    "scenario": "Dalam diskusi kelompok, seorang teman menyampaikan hasil survei kecil bahwa mahasiswa aktif organisasi memiliki IPK lebih tinggi, lalu menyimpulkan bahwa berorganisasi membuat IPK naik. Survei itu hanya diisi 15 mahasiswa dari satu fakultas. Kelompokmu akan memakai kesimpulan ini sebagai dasar rekomendasi untuk mahasiswa baru. Kamu merasa ada sesuatu yang kurang tepat, tetapi anggota lain tampak antusias dan ingin segera melanjutkan.",
    "options": [
      {
        "label": "A",
        "text": "Menolak seluruh hasil survei dan meminta kelompok membuat survei baru dari awal.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "B",
        "text": "Menggunakan hasil survei dengan menambahkan catatan bahwa jumlah respondennya sedikit.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "C",
        "text": "Menanyakan apakah hubungan itu benar-benar sebab-akibat dan apakah 15 responden cukup mewakili.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "D",
        "text": "Menerima kesimpulan itu karena temanmu sudah repot melakukan survei sendiri.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      }
    ],
    "mostEffectiveKey": "C",
    "leastEffectiveKey": "D",
    "psychometricRationale": "Kunci (C) menunjukkan pemikiran berbasis bukti: asumsi sebab-akibat dan kecukupan sampel dipertanyakan sebelum kesimpulan dipakai untuk rekomendasi. Opsi B sub-optimal karena mengakui keterbatasan tetapi tetap memakai kesimpulan sebab-akibat yang belum teruji. Opsi A active bad karena menolak total tanpa menjelaskan kelemahan spesifik sehingga merusak diskusi. Opsi D passive bad karena menerima premis cacat tanpa verifikasi.",
    "careerCoachingFeedback": "Dua hal yang berjalan bersamaan belum tentu saling menyebabkan. Biasakan bertanya: adakah penjelasan lain, dan cukupkah datanya? Pertanyaan kritis yang disampaikan sopan memperkuat kualitas keputusan tim."
  },
  {
    "id": "SJT-PSL-01",
    "targetSkill": "Problem Solving",
    "dimension": "Penanganan Masalah & Eksekusi Solusi",
    "behavioralIndicator": "Mengimplementasikan solusi yang realistis dan dapat ditindaklanjuti secara mandiri",
    "scenario": "Dua belas jam sebelum batas pengumpulan tugas kelompok, file laporan di laptopmu tiba-tiba rusak dan tidak bisa dibuka. Kamu tidak punya cadangan terbaru, dan anggota lain sedang beristirahat. Dosen sudah menegaskan bahwa tugas terlambat tidak diterima. Kamu merasa bertanggung jawab karena kamulah yang menyimpan file utama. Kamu perlu menentukan langkah pertama dengan cepat sebelum waktu habis.",
    "options": [
      {
        "label": "A",
        "text": "Menyusun ulang seluruh laporan dari awal seorang diri tanpa memberi tahu anggota lain.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "B",
        "text": "Menunggu anggota lain bangun dan menyerahkan solusinya kepada mereka.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "C",
        "text": "Meminta perpanjangan waktu kepada dosen dengan menjelaskan kendala teknis.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "D",
        "text": "Mencari versi tersimpan otomatis atau draf lama yang pernah dikirim ke grup untuk dipulihkan lebih dahulu.",
        "weight": 4,
        "effectiveness": "Most Effective"
      }
    ],
    "mostEffectiveKey": "D",
    "leastEffectiveKey": "B",
    "psychometricRationale": "Kunci (D) menunjukkan penyelesaian masalah praktis secara mandiri: sumber pemulihan yang realistis diidentifikasi dan langsung dieksekusi dalam batas wewenang. Opsi C sub-optimal karena meminta kelonggaran sebelum mencoba memulihkan file, padahal dosen sudah menegaskan aturan. Opsi A active bad karena mengabaikan sumber daya tim dan menanggung risiko tanpa transparansi. Opsi B passive bad karena menunda tindakan pada saat waktu kritis.",
    "careerCoachingFeedback": "Saat masalah teknis terjadi, langkah pertama yang baik adalah mencari jalur pemulihan tercepat yang realistis. Biasakan menyimpan cadangan di layanan awan dan membagikan draf berkala agar risiko seperti ini tidak menjadi krisis."
  },
  {
    "id": "SJT-PSL-02",
    "targetSkill": "Problem Solving",
    "dimension": "Penanganan Dilema Etis & Situasi Darurat",
    "behavioralIndicator": "Memberikan solusi rasional dan efektif terhadap dilema etis",
    "scenario": "Sahabatmu meminta jawaban tugas individumu agar bisa disesuaikan karena ia kewalahan dengan jadwalnya. Ia berjanji tidak akan menyalin mentah-mentah dan pernah menolongmu sebelumnya. Dosen sudah menyatakan tugas ini individu dan akan diperiksa dengan perangkat pendeteksi kemiripan. Kamu bingung karena tidak ingin merusak persahabatan, tetapi juga tidak ingin melanggar aturan perkuliahan. Waktu pengumpulan tugas tinggal dua hari.",
    "options": [
      {
        "label": "A",
        "text": "Mengirimkan jawabanmu dengan syarat ia mengubah banyak kalimatnya.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "B",
        "text": "Mengajaknya membahas cara mengerjakan tugas itu bersama tanpa membagikan jawabanmu.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "C",
        "text": "Menolak membagikan jawabanmu dengan alasan aturan dosen.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "D",
        "text": "Mengabaikan permintaannya dan tidak membahasnya lagi.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      }
    ],
    "mostEffectiveKey": "B",
    "leastEffectiveKey": "D",
    "psychometricRationale": "Kunci (B) menunjukkan solusi etis yang efektif: integritas akademik dijaga sambil tetap membantu kebutuhan teman melalui bentuk dukungan yang sah. Opsi C sub-optimal karena prinsipnya benar tetapi tidak menawarkan jalan keluar bagi kesulitan temannya. Opsi A active bad karena memfasilitasi pelanggaran dan berisiko sanksi bagi keduanya. Opsi D passive bad karena menghindari percakapan sehingga masalah dan hubungan tidak terselesaikan.",
    "careerCoachingFeedback": "Menolak pelanggaran integritas tidak harus berarti menolak orangnya. Tawarkan bantuan dalam bentuk yang sah, seperti belajar bersama. Reputasi integritas yang dibangun sejak kuliah menjadi modal penting dalam karir."
  },
  {
    "id": "SJT-PSL-03",
    "targetSkill": "Problem Solving",
    "dimension": "Proses Pemecahan Masalah Kreatif & Analitis",
    "behavioralIndicator": "Mengidentifikasi masalah, mengevaluasi fakta, dan merumuskan solusi alternatif",
    "scenario": "Kamu ketua panitia orientasi jurusan. Dua hari sebelum acara, vendor sound system membatalkan sewa karena jadwalnya bentrok. Anggaran tersisa terbatas, dan acara akan dihadiri 150 peserta di aula yang cukup besar. Anggota panitia mulai cemas dan menunggu arahanmu. Sebagai ketua, kamu perlu memutuskan langkah yang paling masuk akal dalam waktu singkat sambil menjaga semangat panitia.",
    "options": [
      {
        "label": "A",
        "text": "Mendata beberapa opsi pengganti beserta biaya dan ketersediaannya untuk dibandingkan dengan anggaran.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "B",
        "text": "Meminjam sound system dari UKM musik karena paling cepat, tanpa memeriksa opsi lain.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "C",
        "text": "Mengurangi jumlah peserta agar acara bisa berlangsung tanpa sound system.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "D",
        "text": "Menunggu kabar dari vendor kalau-kalau jadwal mereka kosong kembali.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      }
    ],
    "mostEffectiveKey": "A",
    "leastEffectiveKey": "D",
    "psychometricRationale": "Kunci (A) menunjukkan pemecahan masalah analitis: masalah dirumuskan, alternatif dikumpulkan, lalu dievaluasi terhadap kendala biaya dan ketersediaan sebelum memutuskan. Opsi B sub-optimal karena solusinya masuk akal tetapi diambil tanpa membandingkan kemungkinan yang lebih sesuai. Opsi C active bad karena mengubah tujuan acara demi menghindari masalah, bukan menyelesaikannya. Opsi D passive bad karena menggantungkan diri pada pihak lain saat waktu sangat terbatas.",
    "careerCoachingFeedback": "Saat rencana gagal, kumpulkan beberapa alternatif dan bandingkan dengan kriteria jelas seperti biaya, waktu, dan kualitas. Pemimpin proyek yang tenang dan sistematis membangun kepercayaan tim."
  },
  {
    "id": "SJT-PSL-04",
    "targetSkill": "Problem Solving",
    "dimension": "Pengambilan Keputusan Situasional & Manajemen Masalah",
    "behavioralIndicator": "Menyelesaikan konflik atau masalah praktis sampai ke akar masalahnya",
    "scenario": "Kamu koordinator seksi acara dalam sebuah kepanitiaan. Dua anggota seksimu, Dito dan Laras, berselisih tentang urutan acara dan mulai saling mengabaikan pesan. Pekerjaan seksi mulai terhambat, sementara hari acara tinggal dua minggu. Kamu ingin keduanya kembali bekerja sama sebelum perselisihan ini memengaruhi seksi lain, sementara ketua panitia sedang sibuk mengurus perizinan acara di luar kampus.",
    "options": [
      {
        "label": "A",
        "text": "Menentukan urutan acara sendiri dan menyuruh keduanya mengikutinya tanpa diskusi.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "B",
        "text": "Membiarkan keduanya menyelesaikan perselisihan sendiri karena dianggap urusan pribadi.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "C",
        "text": "Mempertemukan keduanya untuk membahas alasan masing-masing dan menyepakati urutan acara berdasarkan tujuan acara.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "D",
        "text": "Meminta ketua panitia memutuskan urutan acara yang dipakai.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "C",
    "leastEffectiveKey": "B",
    "psychometricRationale": "Kunci (C) menunjukkan penanganan masalah yang menyasar akar konflik: pihak-pihak dipertemukan, alasan digali, dan keputusan diikat pada tujuan bersama. Opsi D sub-optimal karena menyerahkan masalah kepada atasan sebelum mencoba menyelesaikannya dalam wewenang koordinator. Opsi A active bad karena keputusan sepihak mengabaikan alasan pihak yang berselisih. Opsi B passive bad karena hambatan dibiarkan terus menghambat pekerjaan seksi.",
    "careerCoachingFeedback": "Sebagai koordinator, tugasmu bukan memilih pemenang, melainkan memfasilitasi keputusan yang berpihak pada tujuan acara. Selesaikan masalah di tingkat terendah yang mungkin sebelum melibatkan atasan."
  },
  {
    "id": "SJT-PSL-05",
    "targetSkill": "Problem Solving",
    "dimension": "Pengambilan Keputusan Berbasis Situasi (Situational Decision Making)",
    "behavioralIndicator": "Memilih solusi paling efektif dalam skenario dilematis atau berisiko tinggi",
    "scenario": "Dua hari sebelum presentasi final, anggota kelompok yang bertugas membuat video demo mengundurkan diri karena sakit. Bagian demo menyumbang 30% dari nilai. Anggota lain sudah penuh dengan bagiannya masing-masing, dan kamu diminta ikut memutuskan langkah kelompok. Kriteria penilaian sudah dibagikan sejak awal semester, dan waktu yang tersisa sangat sempit untuk mengulang dari nol.",
    "options": [
      {
        "label": "A",
        "text": "Mengajak kelompok menentukan versi demo paling sederhana yang tetap memenuhi kriteria penilaian.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "B",
        "text": "Menghapus bagian demo dari presentasi agar waktu persiapan dialihkan ke bagian lain.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "C",
        "text": "Menunggu kabar dari anggota yang sakit kalau-kalau ia sempat menyelesaikan videonya.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "D",
        "text": "Mengambil alih pembuatan video demo seorang diri hingga selesai.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "A",
    "leastEffectiveKey": "C",
    "psychometricRationale": "Kunci (A) menunjukkan pengambilan keputusan situasional: tujuan (kriteria nilai) dipertahankan sementara cakupan disesuaikan dengan sumber daya tersisa melalui kesepakatan tim. Opsi D sub-optimal karena niatnya baik, tetapi menciptakan titik kegagalan tunggal dan beban berlebih. Opsi B active bad karena mengorbankan komponen bernilai tinggi. Opsi C passive bad karena menggantungkan solusi pada hal di luar kendali kelompok.",
    "careerCoachingFeedback": "Ketika sumber daya berkurang, jangan langsung membuang tujuan; sesuaikan cakupan dan pertahankan hal yang paling memengaruhi hasil. Libatkan seluruh tim agar solusi realistis dan beban terbagi."
  },
  {
    "id": "SJT-KBL-01",
    "targetSkill": "Kemauan Belajar & Rasa Ingin Tahu",
    "dimension": "Agilitas Belajar & Pengembangan Diri Mandiri",
    "behavioralIndicator": "Mencari umpan balik konstruktif dan menerapkannya pada tugas berikutnya",
    "scenario": "Kamu mendapat nilai rendah pada tugas pertama mata kuliah menulis ilmiah, padahal sudah berusaha keras. Dosen hanya menuliskan nilai dan komentar singkat bahwa struktur tulisan perlu diperbaiki. Kamu belum paham bagian mana yang harus diperbaiki, dan tugas berikutnya akan dinilai dengan kriteria serupa. Kamu ingin memperbaiki kemampuan menulismu karena keterampilan ini akan terus dipakai di mata kuliah lain.",
    "options": [
      {
        "label": "A",
        "text": "Meminta dosen menaikkan nilaimu dengan menjelaskan seberapa keras usahamu.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "B",
        "text": "Menerima nilai tersebut dan berharap tugas berikutnya membaik dengan sendirinya.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "C",
        "text": "Membaca ulang materi kuliah tentang struktur tulisan ilmiah secara mandiri.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "D",
        "text": "Menemui dosen untuk meminta contoh bagian yang perlu diperbaiki beserta sarannya.",
        "weight": 4,
        "effectiveness": "Most Effective"
      }
    ],
    "mostEffectiveKey": "D",
    "leastEffectiveKey": "B",
    "psychometricRationale": "Kunci (D) mencerminkan agilitas belajar: umpan balik dicari secara aktif dan spesifik sebagai dasar perbaikan pada tugas berikutnya. Opsi C sub-optimal karena belajar mandiri baik, tetapi tanpa umpan balik spesifik perbaikan bisa meleset. Opsi A active bad karena berfokus pada nilai, bukan pembelajaran. Opsi B passive bad karena tidak ada upaya belajar dari hasil yang diterima.",
    "careerCoachingFeedback": "Nilai rendah adalah data, bukan vonis. Cari umpan balik spesifik dari dosen atau asisten dosen, lalu terapkan pada tugas berikutnya. Orang yang aktif mencari umpan balik berkembang lebih cepat di kuliah maupun di tempat kerja."
  },
  {
    "id": "SJT-KBL-02",
    "targetSkill": "Kemauan Belajar & Rasa Ingin Tahu",
    "dimension": "Pembelajaran Mandiri & Adaptasi Berkelanjutan",
    "behavioralIndicator": "Berinisiatif mempelajari hal baru dan meregulasi diri dalam belajar",
    "scenario": "Kamu bergabung sebagai staf publikasi di UKM dan baru tahu bahwa divisimu memakai aplikasi desain yang belum pernah kamu gunakan. Tugas pertamamu adalah membuat poster dalam seminggu. Tidak ada pelatihan resmi, tetapi banyak materi belajar gratis tersedia daring. Kamu ingin tugas pertama ini berhasil agar dipercaya mengerjakan tugas-tugas berikutnya di divisi tersebut.",
    "options": [
      {
        "label": "A",
        "text": "Mengikuti tutorial daring sambil langsung mempraktikkannya pada poster contoh.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "B",
        "text": "Meminta senior mengajarimu langkah demi langkah sebelum mencoba sendiri.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "C",
        "text": "Membuat poster dengan aplikasi lama yang sudah kamu kuasai meski tidak sesuai standar divisi.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "D",
        "text": "Mengatakan kepada senior bahwa kamu belum bisa dan menunggu ada pelatihan.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      }
    ],
    "mostEffectiveKey": "A",
    "leastEffectiveKey": "D",
    "psychometricRationale": "Kunci (A) menunjukkan pembelajaran mandiri: sumber belajar yang tersedia dimanfaatkan secara proaktif dan langsung dipraktikkan agar keterampilan terbentuk. Opsi B sub-optimal karena bantuan senior berharga, tetapi bergantung penuh pada orang lain sebelum berusaha. Opsi C active bad karena menghindari keterampilan baru dan mengabaikan standar divisi. Opsi D passive bad karena menunda belajar sambil menunggu fasilitas.",
    "careerCoachingFeedback": "Di dunia kerja, banyak keterampilan dipelajari sambil berjalan. Manfaatkan tutorial dan sumber belajar gratis, lalu langsung praktikkan. Bertanyalah kepada senior setelah mencoba, bukan sebelumnya, agar pertanyaanmu lebih spesifik."
  },
  {
    "id": "SJT-KBL-03",
    "targetSkill": "Kemauan Belajar & Rasa Ingin Tahu",
    "dimension": "Keinginan Mengembangkan Diri & Pencarian Informasi Baru",
    "behavioralIndicator": "Menunjukkan ketertarikan dan keterbukaan terhadap bidang atau pengalaman baru",
    "scenario": "Kampusmu mengadakan seminar karir tentang bidang yang belum kamu kenal, yaitu analisis data, pada hari Sabtu yang kosong di jadwalmu. Bidang itu tidak berkaitan langsung dengan jurusanmu, tetapi beberapa temanmu bilang topiknya sedang banyak dibicarakan. Kamu belum punya rencana lain pada hari itu. Pendaftaran seminar masih dibuka dan gratis, tetapi tempat duduknya terbatas. Kamu belum pernah mengikuti seminar karir sebelumnya.",
    "options": [
      {
        "label": "A",
        "text": "Melewatkannya karena bidangnya tidak berkaitan dengan mata kuliah yang sedang kamu ambil.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "B",
        "text": "Mencari artikel singkat tentang analisis data di internet sebagai pengganti seminar.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "C",
        "text": "Menghadiri seminar itu dengan menyiapkan pertanyaan untuk pembicara.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "D",
        "text": "Mendaftar seminar hanya untuk mengambil sertifikat kehadiran bagi portofolio.",
        "weight": 2,
        "effectiveness": "Active Bad"
      }
    ],
    "mostEffectiveKey": "C",
    "leastEffectiveKey": "A",
    "psychometricRationale": "Kunci (C) menunjukkan rasa ingin tahu dan keterbukaan terhadap pengalaman baru: peluang eksplorasi dimanfaatkan secara aktif dengan keterlibatan bermakna. Opsi B sub-optimal karena mencari informasi tetapi melewatkan kesempatan berinteraksi langsung dengan praktisi. Opsi D active bad karena motivasinya sebatas formalitas sehingga tidak ada pembelajaran. Opsi A passive bad karena menutup peluang eksplorasi atas dasar relevansi yang sempit.",
    "careerCoachingFeedback": "Masa awal kuliah adalah waktu terbaik menjelajahi bidang baru dengan risiko rendah. Hadiri seminar dengan niat belajar dan siapkan pertanyaan; kamu bisa menemukan minat karir yang belum pernah terpikirkan."
  },
  {
    "id": "SJT-KBL-04",
    "targetSkill": "Kemauan Belajar & Rasa Ingin Tahu",
    "dimension": "Eksplorasi Pembelajaran & Adaptasi Pengetahuan",
    "behavioralIndicator": "Menyesuaikan cara belajar terhadap tuntutan baru, bukan menolak perubahan",
    "scenario": "Dosen mengganti metode ujian menjadi studi kasus terbuka, bukan hafalan seperti yang biasa kamu kerjakan. Beberapa temanmu mengeluh karena cara belajar lama tidak lagi efektif. Nilai kuis pertamamu juga lebih rendah dibanding semester lalu. Ujian tengah semester tinggal tiga minggu. Kamu ingin tetap mendapat nilai baik pada ujian tengah semester karena mata kuliah ini menjadi prasyarat mata kuliah berikutnya.",
    "options": [
      {
        "label": "A",
        "text": "Mengajak teman-teman meminta dosen kembali ke metode ujian lama.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "B",
        "text": "Mengubah cara belajarmu dengan berlatih menganalisis contoh-contoh kasus.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "C",
        "text": "Tetap memakai cara belajar lama dan berharap nilai membaik pada ujian berikutnya.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "D",
        "text": "Menanyakan kepada kakak tingkat bagaimana mereka dahulu menghadapi ujian semacam ini.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "B",
    "leastEffectiveKey": "C",
    "psychometricRationale": "Kunci (B) menunjukkan adaptasi pengetahuan: strategi belajar diubah sesuai tuntutan baru melalui latihan yang relevan dengan format ujian. Opsi D sub-optimal karena mencari informasi bermanfaat, tetapi belum menjadi tindakan belajar. Opsi A active bad karena melawan perubahan alih-alih menyesuaikan diri. Opsi C passive bad karena mempertahankan strategi yang terbukti kurang efektif (komplasensi).",
    "careerCoachingFeedback": "Ketika aturan berubah, ubahlah strategimu, bukan hanya mengeluh. Orang yang cepat belajar menjadikan hasil rendah sebagai sinyal untuk mencoba cara baru. Kemampuan ini sangat berguna saat dunia kerja terus berubah."
  },
  {
    "id": "SJT-KBL-05",
    "targetSkill": "Kemauan Belajar & Rasa Ingin Tahu",
    "dimension": "Sikap & Disposisi Kreatif / Intelektual",
    "behavioralIndicator": "Menunjukkan keterbukaan terhadap pengalaman baru, kebiasaan eksploratif, dan toleransi terhadap ambiguitas",
    "scenario": "Dosen memberi tugas proyek terbuka berupa membuat solusi digital untuk masalah di lingkungan kampus, tanpa ketentuan teknis rinci. Banyak temanmu bertanya-tanya apa yang harus dilakukan. Kamu penasaran, tetapi belum tahu mulai dari mana, dan tidak ada contoh dari semester lalu. Batas pengumpulan proposal ide adalah dua minggu lagi, dan nilai proyek ini menentukan sebagian besar nilai akhirmu.",
    "options": [
      {
        "label": "A",
        "text": "Mengeksplorasi beberapa referensi dan contoh proyek serupa untuk menemukan ide yang ingin kamu kembangkan.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "B",
        "text": "Menunggu dosen memberikan petunjuk teknis tambahan sebelum mulai bekerja.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "C",
        "text": "Meniru ide proyek yang pernah dipublikasikan tanpa menyebut sumbernya agar cepat selesai.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "D",
        "text": "Bertanya kepada dosen tentang contoh proyek yang baik untuk dijadikan acuan.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "A",
    "leastEffectiveKey": "B",
    "psychometricRationale": "Kunci (A) menunjukkan rasa ingin tahu dan toleransi terhadap ambiguitas: ketidakjelasan dijadikan ruang eksplorasi melalui pencarian referensi mandiri. Opsi D sub-optimal karena mencari acuan itu wajar, tetapi menyerahkan arah kepada dosen sebelum mengeksplorasi sendiri. Opsi C active bad karena jalan pintas yang melanggar integritas akademik. Opsi B passive bad karena menunggu instruksi dan menghindari ketidakpastian.",
    "careerCoachingFeedback": "Tugas terbuka melatih kemampuan yang dicari di dunia kerja: mengeksplorasi sendiri saat arah belum jelas. Mulailah dari mencari referensi dan mencoba ide kecil; bertanya kepada dosen lebih bermanfaat setelah kamu punya gambaran awal."
  },
  {
    "id": "SJT-KTL-01",
    "targetSkill": "Ketelitian (Attention to Detail)",
    "dimension": "Akurasi Operasional & Kontrol Kualitas",
    "behavioralIndicator": "Mengidentifikasi diskrepansi data dan memeriksa ulang hasil kerja kritis sebelum dirilis",
    "scenario": "Kamu bertugas merekap data pendaftar kegiatan UKM ke dalam tabel yang akan dikirim ke panitia fakultas besok pagi. Saat hampir selesai, kamu melihat total peserta di tabelmu berbeda tiga orang dengan daftar dari sekretaris. Waktu sudah malam dan kamu lelah. Panitia fakultas akan memakai tabel itu untuk menentukan jumlah konsumsi dan kursi yang disiapkan.",
    "options": [
      {
        "label": "A",
        "text": "Mengubah angka total di tabelmu agar sama dengan daftar sekretaris.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "B",
        "text": "Mencocokkan data per nama dengan daftar sekretaris untuk menemukan sumber selisih tiga orang itu.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "C",
        "text": "Mengirim tabel apa adanya dan menyatakan selisih kecil akan dikoreksi jika ada keberatan.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "D",
        "text": "Menanyakan kepada sekretaris apakah ada pendaftar yang belum tercatat.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "B",
    "leastEffectiveKey": "C",
    "psychometricRationale": "Kunci (B) menunjukkan kontrol kualitas: selisih data ditelusuri sampai ke sumbernya melalui pencocokan rinci sebelum data dilaporkan. Opsi D sub-optimal karena klarifikasi membantu, tetapi data milikmu sendiri tidak diverifikasi sehingga sumber kekeliruan belum tentu ditemukan. Opsi A active bad karena menyamakan angka tanpa verifikasi dapat memindahkan kesalahan. Opsi C passive bad karena mengirim data yang diketahui tidak konsisten.",
    "careerCoachingFeedback": "Ketika dua sumber data tidak cocok, telusuri penyebabnya sebelum melaporkan, meskipun selisihnya kecil dan kamu sedang lelah. Kepercayaan atasan dibangun dari data yang akurat dan dapat dipertanggungjawabkan."
  },
  {
    "id": "SJT-KTL-02",
    "targetSkill": "Ketelitian (Attention to Detail)",
    "dimension": "Akurasi Kerja dan Kepatuhan pada Standar Prosedur",
    "behavioralIndicator": "Mematuhi standar dan prosedur yang berlaku serta memeriksa ulang hasil kerja",
    "scenario": "Panduan penulisan laporan praktikum mengatur format sitasi, margin, dan sistematika tertentu. Kamu sudah menyelesaikan laporan sehari sebelum tenggat dan merasa isinya sudah bagus. Beberapa temanmu menyarankan agar tidak terlalu mempermasalahkan format karena dosen biasanya menilai isi. Kamu masih punya waktu sisa sebelum batas pengumpulan, dan kamu ingin laporan ini menjadi yang terbaik yang pernah kamu buat.",
    "options": [
      {
        "label": "A",
        "text": "Mengumpulkan laporan sesuai kondisi saat ini karena isi dianggap lebih penting daripada format.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "B",
        "text": "Meminta teman yang sudah mengumpulkan melihat apakah format laporanmu mirip dengan laporannya.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "C",
        "text": "Mencocokkan laporan dengan setiap ketentuan dalam panduan penulisan sebelum mengumpulkan.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "D",
        "text": "Mengubah format mengikuti contoh laporan kakak tingkat meskipun berbeda dari panduan.",
        "weight": 2,
        "effectiveness": "Active Bad"
      }
    ],
    "mostEffectiveKey": "C",
    "leastEffectiveKey": "A",
    "psychometricRationale": "Kunci (C) menunjukkan kepatuhan pada standar: laporan dicek terhadap acuan resmi (panduan) sebelum diserahkan. Opsi B sub-optimal karena memakai pembanding yang belum tentu benar dan hanya mengandalkan kemiripan. Opsi D active bad karena tampak teliti, tetapi mengacu pada contoh yang bisa saja keliru atau usang. Opsi A passive bad karena mengabaikan standar yang sudah ditetapkan.",
    "careerCoachingFeedback": "Standar dan prosedur ada agar hasil kerja konsisten dan adil. Jadikan panduan resmi sebagai daftar periksa, bukan opini teman atau contoh lama. Kebiasaan ini sangat dihargai di tempat magang yang memiliki prosedur kerja ketat."
  },
  {
    "id": "SJT-KTL-03",
    "targetSkill": "Ketelitian (Attention to Detail)",
    "dimension": "Akurasi & Kualitas Kerja",
    "behavioralIndicator": "Bertanggung jawab mengoreksi kesalahan dan menjaga kualitas hasil kerja",
    "scenario": "Beberapa jam setelah mengirim tabel hasil praktikum kelompok kepada dosen, kamu menyadari satu angka pada tabel salah salin dari buku catatan. Kesalahan itu memengaruhi hasil perhitungan akhir, tetapi belum ada yang menyadarinya. Anggota kelompok lain sudah menganggap tugas selesai. Kamu ingin hasil praktikum kelompokmu tetap dipercaya dosen dan tidak menimbulkan masalah bagi anggota lain.",
    "options": [
      {
        "label": "A",
        "text": "Membiarkannya karena kemungkinan dosen tidak memeriksa angka tersebut secara rinci.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "B",
        "text": "Mengirim ulang tabel perbaikan kepada dosen tanpa menyebutkan adanya perubahan.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "C",
        "text": "Memberi tahu anggota kelompok tentang kesalahan itu dan menunggu keputusan mereka.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "D",
        "text": "Mengirim tabel yang sudah diperbaiki kepada dosen beserta penjelasan singkat tentang perubahan angkanya.",
        "weight": 4,
        "effectiveness": "Most Effective"
      }
    ],
    "mostEffectiveKey": "D",
    "leastEffectiveKey": "A",
    "psychometricRationale": "Kunci (D) menunjukkan tanggung jawab dan keandalan: kesalahan diakui, dikoreksi dengan data yang benar, dan dikomunikasikan secara transparan kepada penerima hasil kerja. Opsi C sub-optimal karena melibatkan kelompok tetapi menunda koreksi yang bisa dilakukan segera. Opsi B active bad karena koreksi tanpa pemberitahuan mengurangi transparansi dan dapat membingungkan. Opsi A passive bad karena membiarkan kesalahan yang sudah diketahui.",
    "careerCoachingFeedback": "Semua orang pernah salah; yang membedakan adalah cara menanganinya. Segera akui dan perbaiki kesalahan dengan transparan. Atasan lebih mempercayai orang yang jujur tentang kekeliruannya daripada yang menutupinya."
  },
  {
    "id": "SJT-KTL-04",
    "targetSkill": "Ketelitian (Attention to Detail)",
    "dimension": "Responsibility (Tanggung Jawab) & Trustworthiness (Keterpercayaan)",
    "behavioralIndicator": "Menerapkan nilai tanggung jawab dan keterpercayaan dalam tindakan nyata di lingkungan kampus",
    "scenario": "Kamu dipercaya memegang uang kas kegiatan panitia sekitar dua juta rupiah. Saat membuat rekap pengeluaran, kamu menemukan beberapa nota belanja hilang sehingga catatan tidak sepenuhnya cocok dengan sisa uang. Bendahara dan ketua panitia akan memeriksa laporan keuangan besok. Ini pertama kalimu mengelola uang kegiatan, dan kamu ingin menjaga kepercayaan yang sudah diberikan panitia.",
    "options": [
      {
        "label": "A",
        "text": "Melaporkan nota yang hilang kepada bendahara disertai rekap pengeluaran yang dapat kamu buktikan.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "B",
        "text": "Membuat nota pengganti sendiri agar laporan terlihat lengkap.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "C",
        "text": "Tidak menyebutkan nota yang hilang dan berharap tidak ada yang menanyakannya.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "D",
        "text": "Mencari nota yang hilang ke semua toko tempat berbelanja sebelum melaporkan apa pun.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "A",
    "leastEffectiveKey": "C",
    "psychometricRationale": "Kunci (A) mencerminkan keandalan dan keterpercayaan: ketidaksesuaian dilaporkan terbuka dengan bukti yang ada sehingga pengawasan dapat dilakukan. Opsi D sub-optimal karena upaya mencari nota wajar, tetapi menunda transparansi hingga waktu pemeriksaan. Opsi B active bad karena memalsukan dokumen dan melanggar integritas. Opsi C passive bad karena menyembunyikan ketidaksesuaian.",
    "careerCoachingFeedback": "Saat dipercaya mengelola uang atau data, transparansi lebih penting daripada tampilan laporan yang sempurna. Simpan bukti sejak awal dan laporkan ketidaksesuaian segera. Reputasi keterpercayaan di organisasi kampus akan terbawa ke dunia kerja."
  },
  {
    "id": "SJT-KTL-05",
    "targetSkill": "Ketelitian (Attention to Detail)",
    "dimension": "Kecermatan Kerja",
    "behavioralIndicator": "Memperhatikan detail tugas dan meminimalkan kesalahan",
    "scenario": "Kamu bertugas menyusun undangan resmi untuk sebuah kegiatan, berisi puluhan nama tamu dengan gelar yang berbeda-beda. Draf sudah selesai dan harus dicetak sore ini. Ketua panitia berpesan agar tidak ada kesalahan penulisan nama karena tamu adalah pejabat fakultas dan alumni. Kamu merasa sudah teliti saat mengetik. Undangan itu akan dibagikan besok pagi dan tidak bisa ditarik kembali setelah tersebar.",
    "options": [
      {
        "label": "A",
        "text": "Mencetak seluruh undangan sekarang agar tidak terlambat dan memperbaiki yang salah setelah disebar.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "B",
        "text": "Membaca sekilas seluruh draf satu kali untuk memeriksa penulisan nama.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "C",
        "text": "Mengandalkan fitur pemeriksa ejaan otomatis tanpa mengecek secara manual.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "D",
        "text": "Mencocokkan setiap nama dan gelar pada draf dengan daftar tamu resmi sebelum dicetak.",
        "weight": 4,
        "effectiveness": "Most Effective"
      }
    ],
    "mostEffectiveKey": "D",
    "leastEffectiveKey": "C",
    "psychometricRationale": "Kunci (D) menunjukkan ketelitian sistematis: setiap item diverifikasi terhadap data sumber resmi sebelum dirilis, terutama pada dokumen berisiko reputasi. Opsi B sub-optimal karena pembacaan sekilas oleh penulis sendiri rentan melewatkan kesalahan. Opsi A active bad karena memprioritaskan kecepatan di atas kualitas. Opsi C passive bad karena menyerahkan pemeriksaan pada alat yang tidak mengenali kesalahan nama dan gelar.",
    "careerCoachingFeedback": "Merasa sudah teliti tidak sama dengan sudah terbukti benar. Untuk dokumen penting, cocokkan dengan data sumber dan, bila perlu, minta orang lain memeriksa. Ini cara sederhana menjaga reputasi dan kualitas kerja."
  },
  {
    "id": "SJT-INI-01",
    "targetSkill": "Inisiatif & Proaktif",
    "dimension": "Tindakan Otonom & Antisipasi Risiko",
    "behavioralIndicator": "Mengantisipasi hambatan dan bertindak otonom dalam batasan wewenang peran",
    "scenario": "Sebagai anggota seksi perlengkapan, kamu menyadari bahwa proyektor di ruang kegiatan sering bermasalah. Seminar akan dimulai besok, dan tidak ada yang memintamu mengecek peralatan. Pemeriksaan peralatan biasanya dilakukan seksi lain pada pagi hari acara. Acara tersebut dihadiri banyak peserta dari luar kampus, dan kamu tahu bahwa masalah teknis akan sangat mengganggu jalannya acara.",
    "options": [
      {
        "label": "A",
        "text": "Menyerahkan pengecekan pada seksi lain karena itu bukan tugas yang diberikan kepadamu.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "B",
        "text": "Mengganti proyektor ruangan dengan proyektor pribadi temanmu tanpa izin pihak kampus.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "C",
        "text": "Menguji proyektor di ruang kegiatan hari ini agar masalahnya diketahui sebelum acara.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "D",
        "text": "Mengirim pesan kepada ketua seksi untuk mengingatkan agar proyektor dicek besok pagi.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "C",
    "leastEffectiveKey": "A",
    "psychometricRationale": "Kunci (C) menunjukkan inisiatif antisipatif dalam batas wewenang: risiko yang dapat diprediksi diperiksa lebih awal sehingga masih ada waktu menyiapkan cadangan. Opsi D sub-optimal karena mengingatkan itu baik, tetapi tindakan nyata tetap ditunda sampai hari acara. Opsi B active bad karena melanggar batas wewenang dan prosedur peminjaman fasilitas. Opsi A passive bad karena membiarkan risiko yang dapat diprediksi.",
    "careerCoachingFeedback": "Inisiatif tidak selalu soal hal besar. Mengecek hal kecil sebelum menjadi masalah juga inisiatif. Bertindaklah dalam batas perananmu dan sampaikan temuanmu kepada orang yang bertanggung jawab."
  },
  {
    "id": "SJT-INI-02",
    "targetSkill": "Inisiatif & Proaktif",
    "dimension": "Inisiatif Pengguna / Agensi Mandiri (User Initiative)",
    "behavioralIndicator": "Menciptakan dan merealisasikan program atau kegiatan yang menjawab kebutuhan nyata",
    "scenario": "Kamu melihat banyak mahasiswa baru di jurusanmu kebingungan memilih organisasi dan kegiatan kampus yang sesuai minat karir. Tidak ada program resmi jurusan untuk hal ini. Kamu punya beberapa ide dan sedikit waktu luang di akhir pekan, tetapi belum pernah menyelenggarakan kegiatan sendiri. Kamu ingin membantu mereka lebih cepat menemukan kegiatan yang sesuai, tetapi tidak ingin melangkahi pengurus yang ada.",
    "options": [
      {
        "label": "A",
        "text": "Menunggu pengurus himpunan jurusan membuat program yang menjawab masalah tersebut.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "B",
        "text": "Mengajukan rencana sederhana sesi berbagi kepada pengurus himpunan jurusan untuk dijalankan bersama.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "C",
        "text": "Mengadakan acara besar sendiri dengan memakai nama himpunan jurusan tanpa izin agar pesertanya banyak.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "D",
        "text": "Membuat grup chat bagi mahasiswa baru yang ingin saling bertukar informasi organisasi.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "B",
    "leastEffectiveKey": "A",
    "psychometricRationale": "Kunci (B) menunjukkan agensi mandiri yang bertanggung jawab: ide diwujudkan menjadi rencana konkret dan diajukan lewat jalur resmi agar mendapat dukungan. Opsi D sub-optimal karena inisiatifnya nyata, tetapi dampak dan keberlanjutannya terbatas. Opsi C active bad karena melanggar batas wewenang dengan memakai nama organisasi tanpa izin. Opsi A passive bad karena menunggu pihak lain atas masalah yang sudah kamu kenali.",
    "careerCoachingFeedback": "Kamu tidak perlu menunggu jabatan untuk berinisiatif. Mulailah dari rencana kecil yang konkret dan libatkan pihak berwenang agar idemu mendapat dukungan. Pengalaman memprakarsai kegiatan menjadi nilai tambah kuat di CV dan wawancara."
  },
  {
    "id": "SJT-INI-03",
    "targetSkill": "Inisiatif & Proaktif",
    "dimension": "Kemandirian & Kepemimpinan Diri",
    "behavioralIndicator": "Mengambil tindakan tanpa menunggu instruksi dan memprioritaskan tugas sendiri",
    "scenario": "Selama magang paruh waktu di sebuah perusahaan, tugas utamamu selesai lebih cepat dari perkiraan pada Kamis siang. Pembimbing magang sedang rapat dan baru kembali sore hari. Kamu tahu masih ada tugas pengarsipan dokumen yang sering tertunda di divisi tempatmu magang. Pembimbing belum memberi tahu tugas berikutnya, dan kamu ingin memanfaatkan waktu sebaik mungkin.",
    "options": [
      {
        "label": "A",
        "text": "Mengerjakan pengarsipan dokumen yang tertunda sambil menunggu pembimbing kembali.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "B",
        "text": "Menunggu di meja sampai pembimbing selesai rapat dan memberikan tugas baru.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "C",
        "text": "Mengirim pesan kepada pembimbing untuk menanyakan tugas lain yang bisa dikerjakan.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "D",
        "text": "Mengerjakan tugas milik rekan magang lain yang belum selesai tanpa memberi tahu mereka.",
        "weight": 2,
        "effectiveness": "Active Bad"
      }
    ],
    "mostEffectiveKey": "A",
    "leastEffectiveKey": "B",
    "psychometricRationale": "Kunci (A) menunjukkan kemandirian: waktu luang dimanfaatkan untuk pekerjaan bernilai yang kebutuhannya sudah diketahui dan masih dalam batas peran. Opsi C sub-optimal karena bertanya cukup proaktif, tetapi bergantung pada instruksi padahal pembimbing sedang rapat. Opsi D active bad karena mengambil alih pekerjaan orang lain tanpa koordinasi. Opsi B passive bad karena menunggu instruksi eksplisit saat ada pekerjaan yang jelas tersedia.",
    "careerCoachingFeedback": "Di tempat magang, kemampuan melihat pekerjaan yang perlu dilakukan tanpa menunggu perintah sangat dihargai. Pilih tugas yang jelas bermanfaat dan masih dalam lingkup perananmu, lalu laporkan kepada pembimbing."
  },
  {
    "id": "SJT-INI-04",
    "targetSkill": "Inisiatif & Proaktif",
    "dimension": "Tindakan Mandiri dan Penanganan Masalah Tanpa Ditunggu",
    "behavioralIndicator": "Menyampaikan gagasan perbaikan secara proaktif sebelum diminta",
    "scenario": "Dalam rapat evaluasi UKM, kamu menyadari bahwa pendaftaran anggota baru memakai formulir kertas yang sering hilang dan merepotkan panitia. Kamu punya ide menggantinya dengan formulir daring sederhana. Rapat hampir selesai dan belum ada yang membahas pendaftaran. Ketua UKM tampak ingin segera menutup rapat, tetapi pengurus lain terlihat terbuka mendengar usulan. Kamu anggota baru yang baru tiga bulan bergabung.",
    "options": [
      {
        "label": "A",
        "text": "Menyimpan idemu karena rapat sudah hampir selesai.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "B",
        "text": "Mengusulkan idemu melalui pesan pribadi kepada ketua UKM setelah rapat.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "C",
        "text": "Langsung membuat formulir daring dan menyebarkannya kepada calon anggota tanpa persetujuan pengurus.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "D",
        "text": "Menyampaikan idemu kepada forum sebelum rapat ditutup dengan menjelaskan manfaatnya bagi panitia.",
        "weight": 4,
        "effectiveness": "Most Effective"
      }
    ],
    "mostEffectiveKey": "D",
    "leastEffectiveKey": "A",
    "psychometricRationale": "Kunci (D) menunjukkan perilaku bersuara (voice behavior): gagasan perbaikan disampaikan pada forum dan waktu yang tepat dengan alasan manfaat yang jelas. Opsi B sub-optimal karena gagasan tersampaikan tetapi tanpa diskusi kelompok sehingga dukungan dan tindak lanjutnya lebih lemah. Opsi C active bad karena bertindak tanpa persetujuan dan melampaui wewenang. Opsi A passive bad karena menahan gagasan yang bermanfaat.",
    "careerCoachingFeedback": "Anggota baru sekalipun boleh menyuarakan perbaikan. Sampaikan idemu di forum yang tepat dan jelaskan manfaatnya agar mudah diterima. Keberanian berpendapat dengan santun menandai calon pemimpin."
  },
  {
    "id": "SJT-INI-05",
    "targetSkill": "Inisiatif & Proaktif",
    "dimension": "Dominasi-Mandiri (Assured-Dominant) / Proaktif",
    "behavioralIndicator": "Mengambil langkah aktif tanpa menunggu arahan dan menunjukkan kepemimpinan dalam situasi sulit",
    "scenario": "Dalam kelompok proyek, rapat berlangsung tanpa arah karena semua anggota menunggu orang lain memulai. Ketua kelompok berhalangan hadir hari ini. Waktu rapat tinggal 30 menit dan tenggat proyek semakin dekat. Kamu sebenarnya sudah memikirkan langkah-langkah awal pengerjaan. Kamu khawatir jika tidak ada yang bergerak, kelompok akan tertinggal dari jadwal yang ditetapkan dosen. Anggota lain tampak ragu dan saling melirik.",
    "options": [
      {
        "label": "A",
        "text": "Ikut menunggu sampai ada anggota lain yang mengambil inisiatif.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "B",
        "text": "Menawarkan diri memandu rapat dengan agenda singkat yang disetujui anggota.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "C",
        "text": "Membagikan tugas kepada semua anggota berdasarkan keputusanmu sendiri tanpa bertanya.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "D",
        "text": "Menyarankan agar rapat ditunda sampai ketua kelompok dapat hadir.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "B",
    "leastEffectiveKey": "A",
    "psychometricRationale": "Kunci (B) menunjukkan inisiatif kepemimpinan situasional: kekosongan arah diisi secara terbuka dengan tetap meminta persetujuan kelompok. Opsi D sub-optimal karena menunda rapat saat waktu terbatas, padahal ada kapasitas untuk bergerak. Opsi C active bad karena mengambil alih keputusan tanpa legitimasi kelompok. Opsi A passive bad karena ikut menunggu sehingga kelompok kehilangan waktu.",
    "careerCoachingFeedback": "Kepemimpinan tidak selalu soal jabatan. Ketika kelompok terhenti, kamu bisa memulai dengan menawarkan struktur sederhana dan meminta persetujuan. Inisiatif yang inklusif membuat orang lain mau mengikuti."
  },
  {
    "id": "SJT-ADP-01",
    "targetSkill": "Adaptabilitas",
    "dimension": "Fleksibilitas Strategis & Manajemen Stres",
    "behavioralIndicator": "Mengubah strategi saat menerima parameter baru dan memprioritaskan ulang pekerjaan",
    "scenario": "Kamu dan kelompokmu sudah menyiapkan presentasi selama dua minggu dengan durasi 15 menit. Sehari sebelum presentasi, dosen mengumumkan bahwa tiap kelompok hanya mendapat 7 menit karena jumlah kelompok bertambah. Anggota kelompokmu mulai panik, dan sebagian ingin tetap memakai materi lengkap. Presentasi akan dinilai dari kejelasan pesan dan ketepatan waktu, dan latihan terakhir hanya bisa dilakukan malam ini.",
    "options": [
      {
        "label": "A",
        "text": "Mengajak kelompok menentukan poin inti dan memangkas materi agar sesuai dengan waktu baru.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "B",
        "text": "Membujuk dosen agar kelompokmu tetap mendapat 15 menit karena sudah lama menyiapkannya.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "C",
        "text": "Tetap berlatih dengan materi 15 menit dan berharap dosen memberi kelonggaran waktu.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "D",
        "text": "Membagi materi secara merata dan membiarkan tiap anggota memangkas bagiannya masing-masing.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "A",
    "leastEffectiveKey": "C",
    "psychometricRationale": "Kunci (A) menunjukkan fleksibilitas strategis: parameter baru diterima, tujuan dipertahankan, dan materi diprioritaskan ulang melalui kesepakatan tim. Opsi D sub-optimal karena menyesuaikan tanpa koordinasi sehingga alur presentasi bisa terputus. Opsi B active bad karena menolak perubahan dan menekan pihak yang berwenang. Opsi C passive bad karena mempertahankan rencana lama dan menggantungkan diri pada kelonggaran.",
    "careerCoachingFeedback": "Perubahan mendadak adalah hal biasa di kuliah dan kerja. Terima parameter baru, lalu tanyakan: apa inti yang harus tetap tersampaikan? Prioritaskan ulang bersama tim daripada mempertahankan rencana lama."
  },
  {
    "id": "SJT-ADP-02",
    "targetSkill": "Adaptabilitas",
    "dimension": "Adaptasi Lintas Budaya & Fleksibilitas Lingkungan",
    "behavioralIndicator": "Menyesuaikan strategi dan perilaku saat berhadapan dengan norma atau lingkungan baru",
    "scenario": "Kamu baru pindah ke kota lain untuk berkuliah dan tinggal di kos bersama mahasiswa dari berbagai daerah. Kebiasaan sehari-hari mereka berbeda dari kebiasaanmu, misalnya jam belajar, cara berkomunikasi, dan aturan ruang bersama. Setelah dua minggu, kamu mulai merasa tidak nyaman dan sering menyendiri di kamar. Kamu sebenarnya ingin punya banyak teman baru, tetapi belum tahu bagaimana memulainya.",
    "options": [
      {
        "label": "A",
        "text": "Meminta semua penghuni kos mengikuti kebiasaanmu agar kamu merasa nyaman.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "B",
        "text": "Menghindari ruang bersama dan hanya keluar kamar saat benar-benar perlu.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "C",
        "text": "Mencari teman sekelas yang berkebiasaan mirip denganmu untuk menghabiskan waktu bersama.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      },
      {
        "label": "D",
        "text": "Berbincang dengan penghuni kos untuk memahami kebiasaan mereka dan menemukan aturan ruang bersama yang cocok.",
        "weight": 4,
        "effectiveness": "Most Effective"
      }
    ],
    "mostEffectiveKey": "D",
    "leastEffectiveKey": "B",
    "psychometricRationale": "Kunci (D) menunjukkan adaptasi terhadap lingkungan baru: perbedaan kebiasaan dipahami lewat komunikasi dan dijadikan dasar kesepakatan bersama. Opsi C sub-optimal karena memberi dukungan sosial tetapi mempersempit paparan terhadap lingkungan baru. Opsi A active bad karena menuntut lingkungan menyesuaikan diri dengannya. Opsi B passive bad karena menarik diri sehingga adaptasi tidak terjadi.",
    "careerCoachingFeedback": "Transisi ke lingkungan baru wajar terasa tidak nyaman. Alih-alih menarik diri atau menuntut orang lain berubah, mulailah dengan berbincang dan mencari kesepakatan bersama. Kemampuan beradaptasi dengan beragam orang adalah modal penting memasuki dunia kerja."
  },
  {
    "id": "SJT-ADP-03",
    "targetSkill": "Adaptabilitas",
    "dimension": "Fleksibilitas Mental & Manajemen Ketidakpastian",
    "behavioralIndicator": "Mengubah sudut pandang, melepaskan rencana awal, dan mengelola kondisi tidak pasti",
    "scenario": "Kamu sudah merencanakan magang di perusahaan impianmu pada liburan semester dan telah menyiapkan lamaran. Beberapa hari sebelum batas pendaftaran, perusahaan itu mengumumkan bahwa program magang tahun ini ditiadakan. Kamu kecewa karena sudah menyiapkan banyak hal untuk itu. Liburan semester tinggal sebulan lagi, dan beberapa teman sudah mendapat tempat magang masing-masing. Kamu mulai merasa tertinggal dari mereka.",
    "options": [
      {
        "label": "A",
        "text": "Membatalkan rencana magang tahun ini karena tujuan utamamu tidak tersedia.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "B",
        "text": "Mencari peluang magang lain di bidang serupa untuk disesuaikan dengan berkas lamaran yang sudah ada.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "C",
        "text": "Menghubungi perusahaan itu berulang kali agar bersedia membuat pengecualian untukmu.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "D",
        "text": "Menunggu pengumuman program magang tahun depan sambil mengikuti kegiatan lain.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "B",
    "leastEffectiveKey": "A",
    "psychometricRationale": "Kunci (B) menunjukkan fleksibilitas mental: tujuan besar (pengalaman magang di bidang serupa) dipertahankan sambil melepas rencana awal dan memanfaatkan persiapan yang sudah ada. Opsi D sub-optimal karena menunda pengalaman dan peluang belajar selama setahun. Opsi C active bad karena memaksa pengecualian dan mengabaikan keputusan perusahaan. Opsi A passive bad karena membatalkan tujuan akibat satu hambatan.",
    "careerCoachingFeedback": "Rencana karir jarang berjalan lurus. Ketika satu pintu tertutup, lihat tujuan yang lebih besar: pengalaman apa yang ingin kamu dapatkan? Cari jalur alternatif dan manfaatkan persiapan yang sudah kamu buat."
  },
  {
    "id": "SJT-ADP-04",
    "targetSkill": "Adaptabilitas",
    "dimension": "Fleksibilitas Kerja dan Ketahanan terhadap Perubahan",
    "behavioralIndicator": "Menyesuaikan diri dengan prioritas yang berubah dan tetap efektif di bawah tekanan",
    "scenario": "Kamu sedang mengerjakan desain poster acara UKM yang diminta selesai Jumat. Pada hari Rabu, ketua panitia mengabarkan bahwa acara dimajukan dua hari dan konsepnya berubah. Desainmu yang sudah 70% selesai tidak lagi sesuai. Pada saat yang sama kamu punya tugas kuliah yang harus dikumpulkan Kamis. Ketua panitia berharap poster baru sudah siap untuk disebar paling lambat Jumat sore.",
    "options": [
      {
        "label": "A",
        "text": "Tetap melanjutkan desain lama agar usahamu tidak sia-sia dan meminta panitia menyesuaikan konsepnya.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "B",
        "text": "Menunda pengerjaan sampai konsep acara benar-benar final dan tidak berubah lagi.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "C",
        "text": "Menyusun ulang prioritas pekerjaan dan memakai kembali elemen desain lama yang masih sesuai konsep baru.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "D",
        "text": "Mengerjakan desain baru dari nol sambil menomorduakan tugas kuliah.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "C",
    "leastEffectiveKey": "B",
    "psychometricRationale": "Kunci (C) menunjukkan fleksibilitas saat prioritas berubah: pekerjaan diprioritaskan ulang dan aset lama dimanfaatkan untuk menghemat waktu sambil menjaga komitmen lain. Opsi D sub-optimal karena beradaptasi tetapi mengorbankan tugas kuliah dan tidak memakai kembali hasil kerja sebelumnya. Opsi A active bad karena menolak perubahan mandat dengan menuntut pihak lain menyesuaikan. Opsi B passive bad karena menunda hingga situasi stabil padahal tenggat makin dekat.",
    "careerCoachingFeedback": "Perubahan prioritas tidak berarti kerja kerasmu sia-sia. Pilih bagian yang masih bisa dipakai, susun ulang jadwal, dan jaga komitmen lain. Ketahanan menghadapi perubahan tuntutan membuatmu andal dalam tim."
  },
  {
    "id": "SJT-ADP-05",
    "targetSkill": "Adaptabilitas",
    "dimension": "Fleksibilitas & Manajemen Perubahan",
    "behavioralIndicator": "Menyesuaikan diri terhadap perubahan metode kerja jarak jauh dan teknologi baru",
    "scenario": "Kampusmu beralih ke pembelajaran daring selama dua minggu karena renovasi gedung. Kamu lebih suka belajar tatap muka dan merasa sulit fokus di rumah. Tugas dan kuis tetap berjalan seperti biasa, dan dosen mulai memakai platform diskusi daring yang belum kamu kenal. Dosen meminta semua mahasiswa aktif berdiskusi di platform itu dan partisipasi masuk dalam penilaian.",
    "options": [
      {
        "label": "A",
        "text": "Menunda belajar dengan alasan suasana rumah kurang mendukung sampai kuliah tatap muka kembali.",
        "weight": 1,
        "effectiveness": "Passive Bad"
      },
      {
        "label": "B",
        "text": "Menyampaikan keberatan kepada dosen agar penggunaan platform daring baru dihentikan.",
        "weight": 2,
        "effectiveness": "Active Bad"
      },
      {
        "label": "C",
        "text": "Menyusun rutinitas belajar daring terjadwal yang mencakup waktu mencoba fitur platform baru.",
        "weight": 4,
        "effectiveness": "Most Effective"
      },
      {
        "label": "D",
        "text": "Mengikuti kuliah daring seperlunya dan mengerjakan tugas saat mendekati tenggat.",
        "weight": 3,
        "effectiveness": "Sub-optimal"
      }
    ],
    "mostEffectiveKey": "C",
    "leastEffectiveKey": "A",
    "psychometricRationale": "Kunci (C) menunjukkan adaptasi terhadap perubahan metode kerja: rutinitas baru dibangun terstruktur dan teknologi baru dieksplorasi sejak awal. Opsi D sub-optimal karena menyesuaikan seadanya sehingga kualitas belajar menurun. Opsi B active bad karena menolak perubahan yang bersifat mandat dan merepotkan dosen. Opsi A passive bad karena menunda belajar sambil menunggu kondisi ideal.",
    "careerCoachingFeedback": "Kerja jarak jauh dan hybrid sudah umum di dunia kerja. Latih diri dengan jadwal terstruktur dan cobalah teknologi baru sedini mungkin. Kemampuan menyesuaikan metode kerja membuatmu tetap produktif dalam kondisi apa pun."
  }
];

export interface SJTSkillScore {
  skill: SJTSkill;
  totalPoints: number; // 5 - 20
  maxPoints: number; // 20
  percentage: number; // 0 - 100
  level: number; // 1 (Dasar), 2 (Menengah), 3 (Lanjutan)
  feedbackList: string[];
}

/**
 * Menghitung skor 8 dimensi soft skill dari jawaban 40 soal SJT
 * @param sjtAnswers Record<number, number> - index soal (0-39) -> index opsi (0-3)
 */
export function computeSJTScores(
  sjtAnswers: Record<number, number>
): Record<SJTSkill, SJTSkillScore> {
  const result: Record<SJTSkill, SJTSkillScore> = SJT_SKILLS.reduce((acc, skill) => {
    acc[skill] = {
      skill,
      totalPoints: 0,
      maxPoints: 0,
      percentage: 0,
      level: 1,
      feedbackList: [],
    };
    return acc;
  }, {} as Record<SJTSkill, SJTSkillScore>);

  sjtBank.forEach((q, idx) => {
    const selectedOptionIdx = sjtAnswers[idx];
    const skill = q.targetSkill;
    if (result[skill]) {
      result[skill].maxPoints += 4;
      if (selectedOptionIdx !== undefined && q.options[selectedOptionIdx]) {
        const option = q.options[selectedOptionIdx];
        result[skill].totalPoints += option.weight;
        // Simpan feedback bila opsi bukan yang paling efektif
        if (option.weight < 4 && q.careerCoachingFeedback) {
          result[skill].feedbackList.push(q.careerCoachingFeedback);
        }
      } else {
        result[skill].totalPoints += 1; // Default fallback to minimum weight
      }
    }
  });

  // Hitung persentase dan level (1 = Dasar, 2 = Menengah, 3 = Lanjutan)
  Object.values(result).forEach((item) => {
    const pct = item.maxPoints > 0 ? (item.totalPoints / item.maxPoints) * 100 : 0;
    item.percentage = Math.round(pct);
    if (item.percentage >= 80) {
      item.level = 3; // Lanjutan / Siap Kerja Unggul
    } else if (item.percentage >= 50) {
      item.level = 2; // Menengah / Standar Industri
    } else {
      item.level = 1; // Dasar / Butuh Pelatihan
    }
  });

  return result;
}

/**
 * Kamus pencocokan kata kunci untuk menghubungkan nama soft skill di profil karier
 * dengan 8 dimensi SJT.
 */
const SJT_KEYWORD_MAP: Array<{ skill: SJTSkill; keywords: string[] }> = [
  {
    skill: 'Kolaborasi Tim & Lintas Fungsi',
    keywords: ['kolaborasi', 'kerja sama', 'kerjasama', 'collaboration', 'cross-functional', 'teamwork', 'lintas fungsi'],
  },
  {
    skill: 'Komunikasi',
    keywords: ['komunikasi', 'communication', 'presentasi', 'public speaking', 'persuasi', 'storytelling'],
  },
  {
    skill: 'Berpikir Analitis & Kritis',
    keywords: ['analitis', 'analytical', 'kritis', 'critical thinking', 'logika', 'sintesis', 'penalaran'],
  },
  {
    skill: 'Problem Solving',
    keywords: ['problem solving', 'pemecahan masalah', 'solusi', 'troubleshooting', 'decision making'],
  },
  {
    skill: 'Kemauan Belajar & Rasa Ingin Tahu',
    keywords: ['belajar', 'learning', 'curiosity', 'rasa ingin tahu', 'literasi', 'pengetahuan', 'eksplorasi'],
  },
  {
    skill: 'Ketelitian (Attention to Detail)',
    keywords: ['ketelitian', 'detail', 'accuracy', 'akurasi', 'perhatian pada detail', 'keandalan', 'keteraturan'],
  },
  {
    skill: 'Inisiatif & Proaktif',
    keywords: ['inisiatif', 'proaktif', 'proactive', 'ownership', 'kemandirian', 'tanggung jawab'],
  },
  {
    skill: 'Adaptabilitas',
    keywords: ['adaptasi', 'adaptability', 'fleksibilitas', 'agility', 'resiliensi', 'kelincahan'],
  },
];

/**
 * Mencari skor SJT yang sesuai untuk nama soft skill tertentu (misal: 'Cross-Functional Collaboration')
 */
export function getSJTScoreForSkill(
  skillName: string,
  sjtScores: Record<SJTSkill, SJTSkillScore>
): SJTSkillScore | null {
  const cleanName = skillName.toLowerCase();
  
  // Exact match
  if (sjtScores[skillName as SJTSkill]) {
    return sjtScores[skillName as SJTSkill];
  }

  // Keyword match
  for (const entry of SJT_KEYWORD_MAP) {
    if (entry.keywords.some((kw) => cleanName.includes(kw))) {
      return sjtScores[entry.skill];
    }
  }

  return null;
}
