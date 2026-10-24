export type QuizOption = {
    label: string;
    text: string;
    score: number;
};

export type QuizQuestion = {
    id: string;
    question: string;
    options: QuizOption[];
};

export const quizBank: Record<string, QuizQuestion[]> = {
    "software-engineer": [
        {
            "id": "se-1",
            "question": "Sistem payment gateway mengalami lonjakan trafik 40x lipat saat flash sale, memicu connection pool exhausted pada database relasional utama. Solusi arsitektural tercepat dan teraman adalah?",
            "options": [
                {
                    "label": "A",
                    "text": "Memperbesar batas maksimum connection pool database sebesar 5 kali lipat untuk menampung seluruh lonjakan request.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menaikkan spesifikasi CPU dan RAM server database secara vertikal selama periode flash sale berlangsung.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Menerapkan rate limiting di API Gateway dan mengalihkan request non-kritis ke antrean pesan asynchronous.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menonaktifkan logging transaksi dan validasi database sementara waktu agar latensi koneksi berkurang drastis.",
                    "score": 1
                }
            ]
        },
        {
            "id": "se-2",
            "question": "Ditemukan celah race condition pada dompet digital di mana dua transaksi simultan bisa memakai saldo yang sama. Mekanisme data locking apa yang paling tepat diterapkan?",
            "options": [
                {
                    "label": "A",
                    "text": "Menerapkan pessimistic locking dengan SELECT FOR UPDATE atau distributed lock berbasis Redis pada saldo user.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Menjalankan proses pengecekan ulang saldo secara berkala melalui background cron job setiap 5 detik sekali.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Menambahkan jeda thread sleep selama 300 milidetik pada controller backend sebelum memproses mutasi saldo.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Mengandalkan validasi saldo di sisi aplikasi frontend sebelum mengirimkan request transaksi ke server.",
                    "score": 2
                }
            ]
        },
        {
            "id": "se-3",
            "question": "Sebuah microservice Node.js mengalami memory leak bertahap hingga server crash setiap 48 jam sekali di production. Langkah investigasi sistematis pertama adalah?",
            "options": [
                {
                    "label": "A",
                    "text": "Menaikkan alokasi batas memory container hingga 8 GB agar aplikasi memiliki waktu berjalan lebih panjang.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Menjalankan garbage collection secara manual melalui pemanggilan method kode global setiap ada request masuk.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Memasang restart otomatis pada container Docker setiap 12 jam sekali menggunakan orkestrasi Kubernetes pod sesuai dengan rekomendasi panduan standar industri terbaru.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Mengambil snapshot memory heap secara berkala di production dan menganalisis retained objects via Chrome DevTools.",
                    "score": 10
                }
            ]
        },
        {
            "id": "se-4",
            "question": "Saat migrasi dari monolitik ke microservices, dua service baru membutuhkan akses simultan ke tabel database yang sama. Pola arsitektur terbaik untuk memisahkan dependensi ini adalah?",
            "options": [
                {
                    "label": "A",
                    "text": "Membiarkan kedua microservice mengakses database monolitik yang sama demi efisiensi query dan integritas relasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menerapkan pola Database-per-Service dan menyinkronkan data antar service menggunakan arsitektur Event-Driven.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Membuat view database bersama yang dapat dibaca oleh kedua service tanpa mengubah struktur tabel fisik secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Menggabungkan kembali kedua service tersebut menjadi satu monolitik agar dependensi database tidak bermasalah.",
                    "score": 1
                }
            ]
        },
        {
            "id": "se-5",
            "question": "Query SQL analitik yang memproses 50 juta baris data transaksi berjalan selama 45 detik dan membebani server utama. Pendekatan optimasi database yang paling efektif adalah?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengambil seluruh 50 juta baris data mentah ke memori aplikasi lalu melakukan kalkulasi agregasi via JavaScript.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Menghapus constraint foreign key dan indeks yang ada agar proses scanning tabel transaksi berjalan tanpa beban secara berkala dengan melibatkan seluruh perwakilan tim kerja.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Membuat composite index yang sesuai pola filter, membuat tabel agregasi materialised, dan query ke Read Replica.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Memecah query analitik tersebut menjadi 10 query SQL kecil yang dijalankan secara berurutan di backend.",
                    "score": 2
                }
            ]
        },
        {
            "id": "se-6",
            "question": "Endpoint GraphQL mengembalikan data profil user beserta daftar order dan item, namun menimbulkan masalah N+1 query ke database. Solusi standar industri yang tepat adalah?",
            "options": [
                {
                    "label": "A",
                    "text": "Menggunakan DataLoader untuk mengelompokkan (batch) dan meng-cache request database dalam satu siklus event loop.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Mengubah schema GraphQL menjadi query REST API biasa dan membatasi pengambilan relasi maksimal satu tingkat.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Membuat query terpisah di setiap resolver field agar struktur kode GraphQL tetap modular dan mudah dibaca.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Menambahkan layer cache Redis dengan TTL 1 menit pada setiap hasil pemanggilan database individual.",
                    "score": 2
                }
            ]
        },
        {
            "id": "se-7",
            "question": "Service pembayaran pihak ketiga sering mengalami timeout saat mengirimkan webhook status transaksi sukses. Bagaimana merancang webhook consumer yang tangguh?",
            "options": [
                {
                    "label": "A",
                    "text": "Menerapkan retry otomatis tanpa batas waktu secara synchronous langsung di thread penerima request webhook dengan menerapkan framework audit korporat terintegrasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Mengabaikan webhook yang timeout dan menunggu rekonsiliasi manual dari tim operasional keesokan harinya.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Langsung menandai transaksi sukses tanpa verifikasi signature payload setiap kali webhook menerima koneksi.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Mendesain consumer yang idempoten berbasis ID unik transaksi dan memproses payload melalui worker antrean pesan.",
                    "score": 10
                }
            ]
        },
        {
            "id": "se-8",
            "question": "API secret key production tidak sengaja ter-commit ke public repository GitHub tim. Langkah mitigasi darurat tercepat dan paling aman adalah?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengubah status repository GitHub dari publik menjadi privat tanpa melakukan pergantian secret key aktif.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Segera merevoke key di provider, men-generate key baru di environment, lalu me-rewrite riwayat commit git.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Hanya membuat commit baru yang menghapus baris kode rahasia tersebut tanpa me-revoke key di dashboard provider.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Membiarkan secret key tersebut tetap aktif sambil memantau log akses server apakah ada trafik mencurigakan.",
                    "score": 1
                }
            ]
        },
        {
            "id": "se-9",
            "question": "Ketika sebuah service downstream mengalami degradasi performa, service upstream terus mengirim request hingga memicu cascading failure di seluruh sistem. Pola mitigasi yang tepat?",
            "options": [
                {
                    "label": "A",
                    "text": "Memperpanjang durasi timeout HTTP request pada upstream service agar transaksi tetap menunggu respon sampai selesai.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menghapus autentikasi antar microservice agar proses transmisi data jaringan berlangsung lebih cepat dan ringan.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Mengimplementasikan Circuit Breaker pattern dan fallback response untuk mengisolasi kegagalan service downstream.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menduplikasi instance service upstream sebanyak mungkin agar mampu menampung antrean request yang lambat.",
                    "score": 2
                }
            ]
        },
        {
            "id": "se-10",
            "question": "Ketika cache Redis dengan ribuan data katalog expired bersamaan pada jam sibuk, database utama seketika down akibat thundering herd problem. Pencegahan terbaik adalah?",
            "options": [
                {
                    "label": "A",
                    "text": "Menjalankan script pembersihan cache manual setiap tengah malam tanpa memperhitungkan lonjakan trafik user.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Menaikkan durasi TTL seluruh cache menjadi permanen tanpa kedaluwarsa agar database tidak pernah tersentuh.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Menonaktifkan layer caching Redis sepenuhnya dan mengarahkan seluruh query langsung ke database cluster secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Menerapkan random jitter pada TTL cache, locking mutex saat cache miss, dan pembaruan cache secara background.",
                    "score": 10
                }
            ]
        }
    ],
    "ui-ux-designer": [
        {
            "id": "uiux-1",
            "question": "Tingkat drop-off pengguna pada tahapan checkout aplikasi e-commerce mencapai 68% di perangkat mobile. Pendekatan UX research dan perancangan awal yang paling tepat adalah?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengubah total seluruh skema warna tombol dan banner promosi dengan palet warna cerah yang lebih mencolok secara menyeluruh di seluruh pipeline arsitektur sistem.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menambahkan survei pop-up 5 pertanyaan di tengah proses pembayaran untuk menanyakan alasan user keluar.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Menganalisis funnel analytics, mengamati rekaman sesi user, dan menyederhanakan formulir menjadi one-page checkout.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menghilangkan rincian biaya ongkir dan pajak di awal agar pengguna tidak kaget melihat total tagihan belanja.",
                    "score": 1
                }
            ]
        },
        {
            "id": "uiux-2",
            "question": "Warna identitas brand baru memiliki rasio kontras 2.8:1 pada teks utama, yang melanggar standar aksesibilitas WCAG AA (minimal 4.5:1). Tindakan desainer UI yang tepat?",
            "options": [
                {
                    "label": "A",
                    "text": "Menyesuaikan lightness palet warna pada antarmuka teks agar lolos rasio kontras 4.5:1 tanpa merusak esensi brand.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Tetap memakai warna brand asli namun memperbesar ukuran font menjadi sangat besar di seluruh halaman aplikasi.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Mengabaikan aturan kontras WCAG karena menganggap audiens target aplikasi mayoritas berusia muda dan berlihatan baik.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Menyediakan tombol opsi high-contrast tersembunyi di menu pengaturan aplikasi bagi pengguna yang membutuhkan.",
                    "score": 2
                }
            ]
        },
        {
            "id": "uiux-3",
            "question": "Tiga tim produk yang berbeda menghasilkan komponen tombol, kartu, dan modal yang tidak konsisten di Figma. Bagaimana cara menstandarisasi design system secara efektif?",
            "options": [
                {
                    "label": "A",
                    "text": "Membuat dokumen panduan PDF statis sepanjang 80 halaman tentang aturan desain dan membagikannya via email.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Membiarkan setiap tim mendesain bebas sesuai selera masing-masing agar kecepatan rilis fitur tidak terhambat.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Mengunci seluruh hak akses edit file Figma dan mewajibkan semua desainer meminta izin tertulis untuk setiap elemen.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Membangun core component library berbasis design tokens dan menerapkan proses governance bersama perwakilan squad.",
                    "score": 10
                }
            ]
        },
        {
            "id": "uiux-4",
            "question": "Stakeholder bisnis menuntut untuk meletakkan 6 tombol call-to-action (CTA) berbeda di hero section beranda aplikasi. Respon desain yang paling solutif adalah?",
            "options": [
                {
                    "label": "A",
                    "text": "Membuat keenam tombol CTA tersebut dengan ukuran dan warna yang sama besar agar semua divisi merasa puas.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menentukan satu primary CTA yang selaras dengan tujuan utama user, lalu mengelompokkan opsi lain ke navigasi sekunder.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Memasukkan keenam tombol tersebut ke dalam satu carousel banner otomatis yang berganti slide setiap 2 detik secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Menolak mentah-mentah permintaan stakeholder dalam rapat tanpa memberikan data perilaku user atau opsi alternatif.",
                    "score": 1
                }
            ]
        },
        {
            "id": "uiux-5",
            "question": "Hasil usability testing menunjukkan 80% user kebingungan menemukan menu riwayat transaksi pada navigasi tab bar baru. Apa langkah iterasi yang harus diambil?",
            "options": [
                {
                    "label": "A",
                    "text": "Mempertahankan desain navigasi tersebut dengan asumsi pengguna lama-kelamaan akan terbiasa setelah seminggu pemakaian.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Menambahkan animasi bouncing dan teks tooltip besar yang terus menunjuk ke tab bar tersebut saat aplikasi dibuka secara berkala dengan melibatkan seluruh perwakilan tim kerja.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Melakukan card sorting dan tree testing untuk merestrukturisasi arsitektur informasi berdasarkan mental model user.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Membuat video tutorial onboarding 4 langkah yang wajib ditonton pengguna baru sebelum bisa masuk ke aplikasi.",
                    "score": 2
                }
            ]
        },
        {
            "id": "uiux-6",
            "question": "Pengguna enterprise mengeluhkan dashboard analytics B2B terasa sangat berantakan dan lambat dipahami saat mencari metrik krusial. Solusi UI architecture terbaik adalah?",
            "options": [
                {
                    "label": "A",
                    "text": "Menerapkan progressive disclosure dengan kartu ringkasan eksekutif dan opsi kustomisasi widget dashboard.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Menghapus separuh metrik analitik bisnis secara sepihak tanpa mengonfirmasi kebutuhan alur kerja harian pengguna.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Menampilkan seluruh grafik data dan tabel mentah di satu halaman panjang agar pengguna tidak perlu klik halaman lain.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Mengganti semua visualisasi data menjadi angka tabel hitam putih sederhana tanpa indikator tren grafik visual.",
                    "score": 2
                }
            ]
        },
        {
            "id": "uiux-7",
            "question": "Formulir pendaftaran akun bisnis memiliki 22 kolom isian yang menyebabkan rasio pentalan (abandonment) sangat tinggi. Strategi perancangan interaksi yang ideal adalah?",
            "options": [
                {
                    "label": "A",
                    "text": "Merapatkan jarak spasi antar kolom isian dan memakai font kecil agar seluruh 22 input muat dalam satu layar tanpa scroll.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Memindahkan sebagian besar kolom input wajib ke halaman profil setelah proses pendaftaran selesai tanpa notifikasi.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Menyembunyikan label kolom dan hanya mengandalkan teks placeholder di dalam kotak isian input data.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Membagi form menjadi multi-step wizard berbasis konteks, menampilkan indikator progres, dan fitur auto-fill cerdas.",
                    "score": 10
                }
            ]
        },
        {
            "id": "uiux-8",
            "question": "Pesan error saat verifikasi dokumen KTP gagal berbunyi: \"Error 502: Internal Logic Failure\", membuat user panik dan komplain ke CS. Perbaikan UX writing yang tepat?",
            "options": [
                {
                    "label": "A",
                    "text": "Menampilkan animasi ikon silang merah berkedip tanpa memberikan teks penjelasan apa pun pada layar user.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Menampilkan pesan humanis dengan konteks penyebab kegagalan dan langkah panduan konkret untuk memfoto ulang dokumen.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Mengganti pesan menjadi kode error teknis yang lebih panjang dan detail mengenai status response server backend.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Menghilangkan pesan error sama sekali dan membiarkan layar loading berputar terus hingga user menutup aplikasi.",
                    "score": 1
                }
            ]
        },
        {
            "id": "uiux-9",
            "question": "Tabel data keuangan yang memiliki 12 kolom informasi penting terpotong dan sangat sulit dibaca pada layar smartphone. Solusi responsif yang paling ramah pengguna adalah?",
            "options": [
                {
                    "label": "A",
                    "text": "Memperkecil ukuran teks seluruh isi tabel menjadi ukuran 8px agar seluruh 12 kolom tetap muat dalam layar mobile guna memastikan seluruh dependensi operasional terakomodasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menghilangkan 8 kolom keuangan penting pada versi mobile dan hanya menampilkannya saat dibuka di laptop desktop.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Mengubah format tabel menjadi sistem kartu modular vertikal dengan kemampuan accordion expand untuk detail kolom.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Memaksa layar smartphone pengguna otomatis berputar ke mode landscape setiap kali membuka halaman laporan.",
                    "score": 2
                }
            ]
        },
        {
            "id": "uiux-10",
            "question": "Tim desainer ingin memvalidasi prototipe alur fitur pinjaman kilat, namun hanya menguji prototipe ke rekan kerja internal satu kantor. Masalah metodologi apa yang terjadi?",
            "options": [
                {
                    "label": "A",
                    "text": "Langsung merilis fitur pinjaman ke production tanpa pengujian untuk melihat reaksi pengguna secara nyata di pasar.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Menganggap feedback karyawan internal sudah sangat cukup mewakili seluruh lapisan masyarakat pengguna aplikasi.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Mengganti pengujian usability dengan survei kepuasan bintang 5 yang dibagikan ke grup WhatsApp keluarga tim secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Bias sampel internal; riset harus melibatkan target pengguna riil yang memiliki latar belakang finansial relevan.",
                    "score": 10
                }
            ]
        }
    ],
    "graphic-designer": [
        {
            "id": "gd-1",
            "question": "Katalog produk yang dicetak di percetakan offset mengalami pergeseran warna drastis: warna biru terang berubah kusam dan teks hitam tampak berbayang kabur. Penyebab teknisnya?",
            "options": [
                {
                    "label": "A",
                    "text": "Mesin cetak percetakan kehabisan tinta cyan dan resolusi gambar yang digunakan kurang dari 150 DPI standar.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Kertas cetak yang digunakan terlalu tebal sehingga penyerapan tinta cetak tidak merata di seluruh halaman.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "File masih dalam profil RGB bukan CMYK, dan teks hitam menggunakan Rich Black bukan 100% K overprint.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Operator mesin cetak lupa menyalakan monitor komputer dengan kalibrasi warna sRGB standar internasional.",
                    "score": 1
                }
            ]
        },
        {
            "id": "gd-2",
            "question": "Aset logo vektor klien pecah dan blur saat dicetak pada billboard ukuran 6x12 meter di jalan protokol. Di mana letak kesalahan teknis persiapan file desainer?",
            "options": [
                {
                    "label": "A",
                    "text": "Aset diekspor sebagai raster bitmap beresolusi rendah, bukan format vektor murni dengan rasio skala terukur.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "File desain disimpan dalam format PDF/X-1a dengan profil warna CMYK standar industri percetakan outdoor.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Desainer tidak menyertakan foto tanda tangan direktur klien di dalam file master desain sebelum dikirim ke vendor.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Ukuran artboard di software dibuat dengan skala 1:10 namun desainer lupa menaikkan nilai DPI raster effect.",
                    "score": 2
                }
            ]
        },
        {
            "id": "gd-3",
            "question": "Materi iklan banner digital untuk kampanye promo akhir tahun menghasilkan click-through rate (CTR) sangat rendah (0.15%). Bagaimana mengevaluasi komposisi visualnya?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengganti seluruh foto model asli dengan ilustrasi kartun abstrak 3D yang sedang populer di media sosial.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Menaikkan ukuran teks syarat dan ketentuan hukum berukuran panjang di bagian bawah banner hingga terbaca jelas.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Memenuhi seluruh ruang kosong banner dengan efek gradasi berkilau dan stiker diskon animasi yang ramai sesuai dengan rekomendasi panduan standar industri terbaru.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Memperjelas hierarki visual, meningkatkan kontras Call-to-Action, dan menyederhanakan headline tanpa clutter.",
                    "score": 10
                }
            ]
        },
        {
            "id": "gd-4",
            "question": "Sebuah sub-brand meluncurkan materi kampanye yang warnanya sangat kontras dan melenceng jauh dari identitas induk perusahaan. Bagaimana menyeimbangkan konsistensi brand?",
            "options": [
                {
                    "label": "A",
                    "text": "Melarang total segala bentuk eksplorasi kreatif baru dan mewajibkan semua materi memakai template kaku yang ada.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menyusun Brand Guidelines terstruktur yang memuat aturan fleksibilitas kampanye sub-brand namun menjaga elemen inti.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Membiarkan sub-brand memakai identitas visual apa pun tanpa aturan demi target penjualan jangka pendek secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Mengganti logo induk perusahaan dengan logo baru setiap kali membuat kampanye pemasaran digital tematik.",
                    "score": 1
                }
            ]
        },
        {
            "id": "gd-5",
            "question": "Aset grafis hero banner yang dipasang di halaman beranda website berukuran 12 MB, membuat waktu loading halaman melonjak hingga 9 detik. Solusi kompresi terbaik?",
            "options": [
                {
                    "label": "A",
                    "text": "Menyimpan file gambar dalam format BMP uncompressed agar ketajaman warna tetap terjaga maksimal di monitor.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Memperkecil dimensi pixel gambar secara ekstrem hingga 300px lalu meregangkannya secara paksa via kode CSS web secara berkala dengan melibatkan seluruh perwakilan tim kerja.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Mengonversi gambar ke format WebP/AVIF modern, mengatur resolusi sesuai viewport 2x, dan kompresi lossy terukur.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menghapus gambar banner tersebut dan hanya menampilkan latar belakang warna putih polos tanpa visual grafis.",
                    "score": 2
                }
            ]
        },
        {
            "id": "gd-6",
            "question": "Agensi memakai font komersial tanpa lisensi resmi untuk materi promosi billboard klien skala nasional. Apa risiko hukum dan mitigasi desainer yang tepat?",
            "options": [
                {
                    "label": "A",
                    "text": "Risiko gugatan hak cipta; segera ganti dengan font berlisensi komersial terbuka (OFL) atau beli lisensi korporat resmi.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Mengubah sedikit lekukan pada dua huruf di logo agar dianggap sebagai tipografi orisinal buatan tangan sendiri.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Mengonversi seluruh teks menjadi kurva vektor di software desain dengan asumsi kepemilikan font tidak dapat dilacak.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Menghapus nama desainer dari kredit karya dan berharap pemilik hak cipta tipografi tidak menyadari kampanye.",
                    "score": 2
                }
            ]
        },
        {
            "id": "gd-7",
            "question": "Klien meminta revisi ke-12 dengan instruksi saling bertolak belakang: \"Ingin minimalis tapi semua foto produk dimasukkan besar-besar\". Cara menghadapi situasi ini?",
            "options": [
                {
                    "label": "A",
                    "text": "Menuruti seluruh instruksi kontradiktif klien tersebut secara harfiah tanpa memberikan pertimbangan desain profesional.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Membuat 20 versi alternatif desain berbeda secara acak dan menyerahkan seluruh keputusan memilih kepada klien.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Menolak membalas pesan klien selama berhari-hari untuk menunjukkan ketidaksenangan atas revisi yang diberikan.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Menjadwalkan alignment review untuk membedah prioritas pesan kampanye dan memberikan moodboard visual terarah.",
                    "score": 10
                }
            ]
        },
        {
            "id": "gd-8",
            "question": "Infografis laporan tahunan perusahaan memiliki data statistik rumit, namun pembaca merasa pusing dan tidak memahami alur informasi. Perbaikan tata letak?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengubah seluruh diagram infografis menjadi paragraf teks narasi panjang tanpa elemen visual pembantu.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Menerapkan grid terstruktur, white space yang proporsional, serta pewarnaan selektif untuk memandu arah pandang mata.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Memberikan bingkai tebal warna-warni pada setiap angka data dan menggunakan 6 jenis font unik yang berbeda-beda.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Mengatur semua grafik dan teks menjadi ukuran rata tengah (center-aligned) di sepanjang halaman infografis.",
                    "score": 1
                }
            ]
        },
        {
            "id": "gd-9",
            "question": "Desain kemasan makanan ringan ditolak oleh badan pengawas obat dan makanan (BPOM) karena pelanggaran label. Elemen teknis apa yang harus ditaati desainer kemasan?",
            "options": [
                {
                    "label": "A",
                    "text": "Menyembunyikan tabel informasi nilai gizi di lipatan bawah kemasan yang gelap demi estetika visual bagian depan guna memastikan seluruh dependensi operasional terakomodasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menghapus seluruh teks peringatan alergen pada kemasan agar ruang desain untuk ilustrasi gambar lebih luas.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Mematuhi regulasi legal terkait ukuran font minimum label gizi, komposisi bahan baku, kontras barcode, dan ruang netto.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Mencetak barcode dengan gradasi warna emas mengkilap di atas latar belakang transparan kemasan produk.",
                    "score": 2
                }
            ]
        },
        {
            "id": "gd-10",
            "question": "Thumbnail video YouTube memiliki CTR di bawah 2% meskipun isi konten video sangat informatif dan berkualitas tinggi. Strategi visual perbaikan thumbnail?",
            "options": [
                {
                    "label": "A",
                    "text": "Memasang gambar clickbait menyesatkan yang sama sekali tidak berhubungan dengan isi pembahasan video materi.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Menempelkan seluruh ringkasan artikel video sebanyak 30 kata dengan font kecil di area pojok bawah thumbnail.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Menggunakan screenshot frame acak langsung dari dalam video tanpa menambahkan teks judul atau editing warna secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Gunakan subjek ekspresi fokus dengan cropping ketat, teks hook ringkas 3-4 kata, dan kontras warna latar tinggi.",
                    "score": 10
                }
            ]
        }
    ],
    "content-creator": [
        {
            "id": "cc-1",
            "question": "Jangkauan video organik akun brand di TikTok mendadak anjlok drastis selama 3 minggu terakhir. Langkah audit performa algoritma yang tepat dilakukan?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengunggah 10 video promosi produk yang sama setiap hari dengan harapan salah satu video masuk ke FYP TikTok secara menyeluruh di seluruh pipeline arsitektur sistem.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menghapus seluruh video lama yang memiliki penonton rendah untuk membersihkan tampilan grid profil akun.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Menganalisis retensi audiens di 3 detik pertama, rasio tonton tuntas (completion rate), dan format hook pembuka.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Membeli paket ribuan likes dan komentar palsu dari pihak ketiga untuk memancing respon algoritma platform.",
                    "score": 1
                }
            ]
        },
        {
            "id": "cc-2",
            "question": "Brand terlibat isu sosial sensitif yang viral dan kolom komentar media sosial dibanjiri kecaman netizen. Sikap kreator konten yang paling profesional?",
            "options": [
                {
                    "label": "A",
                    "text": "Menahan konten terjadwal, berkoordinasi dengan tim PR untuk rilis pernyataan empati resmi, dan memoderasi ujaran kebencian.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Tetap mengunggah video komedi promosi penjualan seperti biasa dengan asumsi isu sensitif akan segera dilupakan publik.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Menghapus seluruh akun media sosial perusahaan secara mendadak agar terhindar dari perdebatan netizen di internet.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Menonaktifkan seluruh kolom komentar di semua platform media sosial selama sebulan penuh tanpa penjelasan.",
                    "score": 2
                }
            ]
        },
        {
            "id": "cc-3",
            "question": "Video ulasan produk mencapai 600.000 penayangan organik, namun tautan pembelian di keranjang kuning hanya mencatat 4 transaksi. Evaluasi alur konversi?",
            "options": [
                {
                    "label": "A",
                    "text": "Penonton video media sosial pada dasarnya hanya mencari hiburan gratis dan tidak pernah memiliki uang belanja.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Algoritma platform dengan sengaja memblokir seluruh transaksi pembelian dari akun kreator tanpa alasan yang jelas.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Harga produk yang dipromosikan terlalu murah sehingga penonton mengira produk tersebut berkualitas rendah dan tiruan.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Call-to-Action kurang jelas dan tidak terintegrasi kuat dengan problem-solution yang dibahas dalam cerita video.",
                    "score": 10
                }
            ]
        },
        {
            "id": "cc-4",
            "question": "Video promosi berbayar (sponsored reel) terkena copyright strike audio sehingga suara video dimatikan secara sepihak oleh platform. Mitigasi kreator?",
            "options": [
                {
                    "label": "A",
                    "text": "Menggunakan lagu populer Billboard yang sedang tren dan menambahkan klaim \"no copyright infringement intended\" di caption.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Selalu menggunakan musik dari pustaka komersial resmi platform atau trek berlisensi bebas royalti untuk video iklan.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Mengedit kecepatan nada audio musik berhak cipta menjadi sedikit lebih cepat agar lolos dari deteksi filter otomatis.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Mengunggah ulang video yang sama berulang-ulang hingga sistem filter hak cipta platform tidak sengaja meloloskannya.",
                    "score": 1
                }
            ]
        },
        {
            "id": "cc-5",
            "question": "Kreator ingin memperluas jangkauan konten ke 3 platform berbeda (TikTok, Instagram Reels, dan YouTube Shorts). Strategi distribusi yang efektif adalah?",
            "options": [
                {
                    "label": "A",
                    "text": "Hanya membuat satu jenis konten per kuartal dan mengunggahnya pada platform forum teks online yang berbeda segmen.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Mengunduh video langsung dari TikTok dengan watermark logo aplikasi lalu mengunggahnya utuh ke Reels dan Shorts.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Menyesuaikan hook, durasi, aspek rasio, dan tren native masing-masing platform alih-alih melempar video mentah.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Memotong video berdurasi horizontal 16:9 menjadi video vertikal tanpa mempedulikan subjek utama yang terpotong.",
                    "score": 2
                }
            ]
        },
        {
            "id": "cc-6",
            "question": "Setelah berpindah konsep dari video edukasi tips menjadi konten jualan langsung (hard-selling), tingkat engagement akun turun 75%. Cara menyeimbangkan?",
            "options": [
                {
                    "label": "A",
                    "text": "Menerapkan formula rasio konten seimbang (misal 80% edukasi dan hiburan bernilai, 20% penawaran promosi produk).",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Menyalahkan perubahan algoritma media sosial dan membuat video panjang mengeluhkan penonton yang tidak loyal.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Menghilangkan total seluruh konten edukasi dan murni mengunggah video siaran langsung penjualan diskon setiap jam.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Memberikan giveaway saldo gratis bernilai besar di setiap video promosi agar penonton terpaksa berinteraksi.",
                    "score": 2
                }
            ]
        },
        {
            "id": "cc-7",
            "question": "Proses produksi konten sering terlambat karena revisi teks dan video membutuhkan persetujuan 4 lapis manajer. Solusi alur kerja konten?",
            "options": [
                {
                    "label": "A",
                    "text": "Membuat seluruh naskah konten secara spontan tanpa jadwal kalender dan langsung mengunggahnya tanpa izin tim manajemen.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menghentikan proses pembuatan video baru dan hanya membagikan ulang foto brosur promosi lama dari arsip internal.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Menghapus divisi pemasaran konten dan mengalihkan seluruh tugas media sosial ke staf customer service kantor.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Menyusun Content Pillar, Style Guide, dan SLA approval yang jelas serta mendelegasikan wewenang persetujuan akhir.",
                    "score": 10
                }
            ]
        },
        {
            "id": "cc-8",
            "question": "Influencer yang diajak kolaborasi mengunggah video promosi yang kualitas audionya sangat buruk dan tidak menyampaikan pesan kunci produk. Pencegahan ke depan?",
            "options": [
                {
                    "label": "A",
                    "text": "Memaksa influencer membaca naskah promosi kaku kata demi kata layaknya membaca berita televisi formal.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Menyusun Creative Brief komprehensif, mencantumkan klausul Do and Dont, serta mewajibkan review draf sebelum tayang.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Memberikan kebebasan mutlak 100% tanpa pengarahan apa pun kepada influencer dengan dalih menjaga keaslian konten.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Tidak pernah lagi menggunakan strategi endorsement influencer dan membatasi pemasaran hanya lewat pamflet cetak.",
                    "score": 1
                }
            ]
        },
        {
            "id": "cc-9",
            "question": "Grafik retensi video pendek menunjukkan rata-rata 65% penonton keluar sebelum detik ke-3 video selesai berputar. Evaluasi bagian mana yang harus diubah?",
            "options": [
                {
                    "label": "A",
                    "text": "Menaruh bumper logo animasi brand berdurasi 5 detik di awal video agar penonton langsung mengenali nama perusahaan guna memastikan seluruh dependensi operasional terakomodasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menaikkan volume musik latar belakang hingga batas maksimal agar mengejutkan penonton yang sedang scrolling.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Perkuat 3 detik pertama dengan visual action hook, pertanyaan problematis, atau pernyataan pembuka yang memicu rasa penasaran.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Memulai video dengan perkenalan nama lengkap kreator dan riwayat jabatan formal di awal rekaman video.",
                    "score": 2
                }
            ]
        },
        {
            "id": "cc-10",
            "question": "Kreator ingin membangun komunitas penonton yang loyal dan memiliki retensi tinggi jangka panjang di kanal digitalnya. Taktik komunitas yang paling berkelanjutan?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengunci seluruh konten video di balik sistem berlangganan berbayar mahal sebelum memiliki basis audiens yang solid.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Mengadakan kuis berhadiah uang tunai setiap hari tanpa pernah membahas topik yang berkaitan dengan fokus kanal.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Mengunggah konten secara sporadis sebulan sekali hanya ketika kreator sedang memiliki mood untuk membuat karya.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Membangun dialog dua arah yang konsisten, membalas komentar bermakna, dan melibatkan audiens dalam ide konten.",
                    "score": 10
                }
            ]
        }
    ],
    "ai-ml-engineer": [
        {
            "id": "aiml-1",
            "question": "Model credit scoring yang beroperasi di production mengalami penurunan performa AUC dari 0.89 menjadi 0.68 setelah 6 bulan berjalan. Masalah data apa ini?",
            "options": [
                {
                    "label": "A",
                    "text": "Model machine learning mengalami overfitting pada data inference harian di lingkungan server production secara menyeluruh di seluruh pipeline arsitektur sistem.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Terjadi kerusakan memori fisik pada server GPU inference yang menjalankan prediksi data nasabah baru.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Concept drift atau data drift akibat perubahan perilaku finansial nasabah pasca perubahan regulasi ekonomi makro.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Jumlah variabel fitur di database nasabah berkurang secara otomatis karena kapasitas harddisk server penuh.",
                    "score": 1
                }
            ]
        },
        {
            "id": "aiml-2",
            "question": "Saat melatih model prediksi harga saham berbasis time-series, akurasi validasi mencapai 99.8%, namun gagal total saat diuji pada data riil. Mengapa?",
            "options": [
                {
                    "label": "A",
                    "text": "Terjadi data leakage temporal akibat penggunaan random split alih-alih time-based split pada pemisahan data training.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Arsitektur neural network yang digunakan terlalu sederhana sehingga model mengalami underfitting pada pola pasar.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Proses training dijalankan pada sistem operasi komputer yang berbeda dengan sistem operasi server deployment.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Data saham yang digunakan memiliki format mata uang rupiah dan belum dikonversi ke standar mata uang dollar.",
                    "score": 2
                }
            ]
        },
        {
            "id": "aiml-3",
            "question": "Dataset deteksi transaksi penipuan (fraud) memiliki 99.8% transaksi normal dan hanya 0.2% transaksi fraud. Metrik evaluasi apa yang menyesatkan jika digunakan?",
            "options": [
                {
                    "label": "A",
                    "text": "F1-Score dan Recall, karena metrik ini terlalu memprioritaskan deteksi kelas transaksi yang berlabel positif.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Matriks konfusi (Confusion Matrix), karena tabel matriks ini tidak mampu menampilkan angka transaksi riil.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "ROC-AUC dan Precision-Recall Curve, karena kedua metrik ini tidak sensitif terhadap distribusi kelas minoritas sesuai dengan rekomendasi panduan standar industri terbaru.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Accuracy (akurasi keseluruhan), karena model naif yang selalu menebak kelas normal akan tetap meraih akurasi 99.8%.",
                    "score": 10
                }
            ]
        },
        {
            "id": "aiml-4",
            "question": "Chatbot customer service berbasis Large Language Model (LLM) sering mengarang kebijakan garansi fiktif (halusinasi) kepada pelanggan. Solusi teknis terbaik?",
            "options": [
                {
                    "label": "A",
                    "text": "Menaikkan nilai parameter temperature LLM hingga 1.5 agar respon chatbot menjadi lebih kreatif dan ramah tamah.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menerapkan arsitektur RAG (Retrieval-Augmented Generation) dengan semantic search dokumen resmi dan guardrails ketat.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Memperpanjang prompt instruksi sistem hingga ribuan baris tanpa menyertakan referensi dokumen pengetahuan resmi secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Melakukan fine-tuning ulang model dasar GPT-4 dari awal menggunakan seluruh riwayat percakapan customer service.",
                    "score": 1
                }
            ]
        },
        {
            "id": "aiml-5",
            "question": "API deteksi objek komputer vision membutuhkan waktu inferensi 850 milidetik per frame, terlalu lambat untuk kebutuhan real-time kamera keamanan (minimal 30 FPS). Optimasi?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghapus layer aktivasi non-linear pada arsitektur neural network agar komputasi matriks menjadi lebih singkat.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Mengganti resolusi kamera menjadi 4K Ultra HD agar model lebih mudah mendeteksi objek kecil di dalam frame video secara berkala dengan melibatkan seluruh perwakilan tim kerja.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Melakukan kuantisasi model (INT8/FP16), pruning bobot jaringan, dan export model ke runtime teroptimasi TensorRT/ONNX.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menjalankan inferensi model pada CPU server biasa secara paralel tanpa memanfaatkan akselerator hardware khusus.",
                    "score": 2
                }
            ]
        },
        {
            "id": "aiml-6",
            "question": "Model diagnosa medis dilatih pada dataset kecil berisi 500 sampel pasien dan mengalami overfitting parah. Pendekatan regularisasi yang tepat adalah?",
            "options": [
                {
                    "label": "A",
                    "text": "Menerapkan transfer learning dengan pre-trained model relevan, data augmentation terarah, dan regularisasi dropout/L2.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Menduplikasi 500 baris data yang ada menjadi 50.000 baris identik di file CSV sebelum proses training dimulai.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Menghapus proses validasi silang (cross-validation) dan menguji model langsung pada data latih yang sama.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Memperbesar jumlah layer dan hidden units neural network agar kapasitas memorisasi data kecil semakin tinggi.",
                    "score": 2
                }
            ]
        },
        {
            "id": "aiml-7",
            "question": "Sistem RAG untuk dokumen internal perusahaan sering mengambil potongan teks (chunks) yang tidak relevan dengan pertanyaan user. Di mana letak masalahnya?",
            "options": [
                {
                    "label": "A",
                    "text": "Database vektor yang digunakan memiliki kapasitas index yang terlalu besar sehingga pencarian teks menjadi lambat dengan menerapkan framework audit korporat terintegrasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Dokumen teks internal perusahaan harus diubah menjadi format gambar screenshot sebelum dimasukkan ke vektor.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "User mengajukan pertanyaan menggunakan kalimat yang terlalu sopan sehingga mesin pencari vektor gagal merespon.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Strategi chunking dokumen tidak tepat, embedding model kurang cocok domainnya, dan ketiadaan re-ranking hasil search.",
                    "score": 10
                }
            ]
        },
        {
            "id": "aiml-8",
            "question": "Lembaga audit perbankan menolak model machine learning persetujuan kredit karena dianggap sebagai kotak hitam (black-box) yang tidak dapat dijelaskan. Solusi?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengganti model deep learning dengan menebak hasil persetujuan secara acak menggunakan probabilitas 50:50.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Menggunakan framework interpretabilitas model seperti SHAP (Shapley Additive exPlanations) atau LIME untuk audit keputusan.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Menolak permintaan audit dan menegaskan bahwa akurasi model deep learning jauh lebih penting dari transparansi logika.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Menghapus seluruh fitur identitas nasabah dari data training dan hanya menyisakan nominal pengajuan pinjaman uang.",
                    "score": 1
                }
            ]
        },
        {
            "id": "aiml-9",
            "question": "Ketika melakukan fine-tuning pada LLM untuk tugas klasifikasi legal, model mendadak kehilangan kemampuan dasar penalaran umum dan matematika. Fenomena apa ini?",
            "options": [
                {
                    "label": "A",
                    "text": "Model LLM mengalami kejenuhan token dan perlu dilakukan restart cache server inference agar penalaran kembali normal guna memastikan seluruh dependensi operasional terakomodasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menaikkan learning rate hingga 10x lipat agar model dapat melupakan data lama lebih cepat dan fokus tugas legal.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Catastrophic forgetting; mitigasi dengan teknik parameter-efficient fine-tuning (LoRA/QLoRA) atau data replay campuran.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menghapus tokenizer bahasa alami dan menggantinya dengan parser ekspresi matematika berbasis aturan kaku.",
                    "score": 2
                }
            ]
        },
        {
            "id": "aiml-10",
            "question": "Proses training model computer vision besar mengalami error CUDA out of memory (OOM) pada cluster GPU. Solusi rekayasa komputasi terbaik?",
            "options": [
                {
                    "label": "A",
                    "text": "Mematikan sistem pendingin hardware server GPU agar frekuensi clock kecepatan prosesor meningkat sementara.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Menaikkan ukuran batch size sebesar 4 kali lipat agar proses kalkulasi batch tensor di memori GPU lebih efisien.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Memindahkan proses komputasi tensor matrix dari GPU ke harddisk eksternal menggunakan kabel koneksi USB secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Menerapkan gradient accumulation, mixed precision training (FP16/BF16), dan optimasi memori aktivasi checkpointing.",
                    "score": 10
                }
            ]
        }
    ],
    "devops-qa-engineer": [
        {
            "id": "devops-1",
            "question": "Serangkaian automated E2E test di pipeline CI/CD sering gagal secara acak (flaky test) sehingga menghambat deployment harian. Solusi teknis terbaik adalah?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghapus seluruh tahapan automated test dari pipeline CI/CD agar proses deployment aplikasi ke server selalu cepat.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menambahkan retry loop otomatis sebanyak 10 kali pada test yang gagal hingga pengujian akhirnya berhasil lolos.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Mengisolasi flaky test dari pipeline utama, mengganti sleep statis dengan dynamic wait, dan audit mock test data.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menjalankan seluruh automated test secara manual satu per satu di laptop engineer sebelum melakukan git push commit.",
                    "score": 1
                }
            ]
        },
        {
            "id": "devops-2",
            "question": "Pod aplikasi di Kubernetes sering mengalami status CrashLoopBackOff dengan exit code 137 (OOMKilled) saat trafik naik. Langkah diagnosis dan mitigasi?",
            "options": [
                {
                    "label": "A",
                    "text": "Menganalisis memory leak lewat profiling container, menaikkan memory limits, dan mengonfigurasi Horizontal Pod Autoscaler.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Menghapus memory limit pada manifest deployment Kubernetes agar container bebas memakai seluruh kapasitas node cluster.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Menonaktifkan liveness probe dan readiness probe pada manifest pod agar Kubernetes tidak pernah mematikan container.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Menaikkan jumlah replica pod menjadi 50 secara manual tanpa mengatur alokasi resource request dan limit yang jelas.",
                    "score": 2
                }
            ]
        },
        {
            "id": "devops-3",
            "question": "Tim perlu menambahkan kolom baru berindeks pada tabel transaksi production berisi 80 juta baris tanpa downtime sistem. Pola migrasi database yang aman?",
            "options": [
                {
                    "label": "A",
                    "text": "Mematikan akses seluruh user ke aplikasi selama 6 jam di akhir pekan demi menjalankan script migrasi schema database.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Membuat database baru terpisah dan meminta seluruh pengguna aplikasi mendaftar ulang akun dari awal tanpa data lama.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Mengeksekusi perintah ALTER TABLE ADD COLUMN secara langsung di jam sibuk dengan berasumsi database mampu menahannya sesuai dengan rekomendasi panduan standar industri terbaru.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Menjalankan migrasi multi-fase secara bertahap: add column nullable, dual-write di kode, backfill batch, lalu set index.",
                    "score": 10
                }
            ]
        },
        {
            "id": "devops-4",
            "question": "Security scanner (Trivy) menemukan kerentanan kritis (Critical CVE) pada base image Docker alpine yang digunakan di production. Respon keamanan?",
            "options": [
                {
                    "label": "A",
                    "text": "Menambahkan flag ignore-unfixed pada konfigurasi Trivy agar hasil laporan scan keamanan selalu terlihat hijau bersih.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Memperbarui base image ke versi patch terbaru yang sudah memitigasi CVE, menguji di staging, lalu promote ke production.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Membangun ulang container dari source code tanpa base image dan mengompilasi seluruh kernel OS Linux secara manual secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Mengabaikan peringatan CVE tersebut dengan alasan server production berada di balik firewall privat jaringan internal.",
                    "score": 1
                }
            ]
        },
        {
            "id": "devops-5",
            "question": "Saat menjalankan Canary Deployment versi baru ke 5% trafik, dashboard Grafana mendeteksi lonjakan error 5xx sebesar 3.5%. Tindakan otomatisasi rilis?",
            "options": [
                {
                    "label": "A",
                    "text": "Menonaktifkan alerting notifikasi Slack agar tim developer tidak panik saat melihat lonjakan grafik error di dashboard.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Langsung mengalirkan 100% trafik ke versi Canary tersebut dengan asumsi error akan hilang setelah cache terisi penuh secara berkala dengan melibatkan seluruh perwakilan tim kerja.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Memicu automated rollback otomatis seketika untuk mengembalikan 100% trafik ke versi stabil dan menganalisis log error.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Membiarkan trafik 5% tersebut tetap berjalan selama beberapa hari sambil menunggu ada user yang komplain ke tim CS.",
                    "score": 2
                }
            ]
        },
        {
            "id": "devops-6",
            "question": "Ditemukan perbedaan (drift) antara file konfigurasi Terraform dengan status infrastruktur cloud fisik akibat perubahan manual via console. Perbaikan?",
            "options": [
                {
                    "label": "A",
                    "text": "Menjalankan terraform refresh, mengimpor resource manual ke dalam state, dan mengunci akses console hanya via pipeline CI/CD.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Berhenti memakai Terraform selamanya dan mengelola seluruh infrastruktur cloud server murni melalui klik tombol web.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Menghapus file terraform.tfstate lokal dan menginisialisasi ulang Terraform dari awal tanpa sinkronisasi cloud provider.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Menghapus seluruh resource cloud fisik yang dibuat manual secara mendadak tanpa mengecek apakah ada data aktif.",
                    "score": 2
                }
            ]
        },
        {
            "id": "devops-7",
            "question": "Pipeline CI/CD GitLab membutuhkan waktu 58 menit untuk menyelesaikan tahapan build dan test, memperlambat feedback loop. Optimasi pipeline?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghapus seluruh tahapan security scan, linting, dan unit testing agar pipeline selesai dalam waktu kurang dari 1 menit dengan menerapkan framework audit korporat terintegrasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menyewa runner server cloud berukuran paling besar dan mahal tanpa memperbaiki konfigurasi cache pipeline yang buruk.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Membiarkan developer melakukan deploy langsung dari terminal laptop pribadi via SSH tanpa melalui pipeline CI/CD.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Menerapkan layer caching Docker dependency, memparalelkan job test, dan hanya menjalankan suite test pada modul terdampak.",
                    "score": 10
                }
            ]
        },
        {
            "id": "devops-8",
            "question": "Cluster log Elasticsearch kehabisan ruang disk (Disk Watermark Exceeded) karena aplikasi memproduksi log level DEBUG secara masif di production. Mitigasi?",
            "options": [
                {
                    "label": "A",
                    "text": "Membeli disk storage cloud tambahan setiap hari tanpa pernah membatasi volume atau durasi masa simpan dokumen log.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Menyesuaikan log level ke INFO/WARN di production, menerapkan Index Lifecycle Management (ILM), dan rotasi retensi log terukur.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Menghapus seluruh cluster database logging dan membiarkan aplikasi berjalan tanpa mencatat log aktivitas sistem apa pun.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Mengarahkan seluruh output log aplikasi ke file teks lokal di dalam container pod hingga container kehabisan memori.",
                    "score": 1
                }
            ]
        },
        {
            "id": "devops-9",
            "question": "Pengujian beban (load testing) menunjukkan latensi melonjak tajam pada SSL termination di Ingress Controller saat mencapai 20.000 concurrent connection. Solusi?",
            "options": [
                {
                    "label": "A",
                    "text": "Menonaktifkan enkripsi HTTPS dan mengubah seluruh protokol komunikasi aplikasi menjadi HTTP biasa tanpa sertifikat SSL guna memastikan seluruh dependensi operasional terakomodasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menolak koneksi pengguna secara acak begitu jumlah koneksi aktif di server melebihi batas 5.000 user yang ditentukan.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Mengaktifkan TLS session resumption, tuning worker Ingress Controller, dan mendelegasikan SSL termination ke Cloud Load Balancer.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Membuat 10 domain website berbeda untuk membagi rata beban koneksi SSL pengguna aplikasi secara manual terpisah.",
                    "score": 2
                }
            ]
        },
        {
            "id": "devops-10",
            "question": "Uji regresi otomatis memiliki test coverage 88% namun bug kritis pada alur diskon kupon lolos ke production. Evaluasi QA strategy?",
            "options": [
                {
                    "label": "A",
                    "text": "Menyalahkan tim developer secara terbuka di grup komunikasi perusahaan tanpa mengevaluasi celah pada test suite tim.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Mewajibkan test coverage menjadi 100% mutlak dengan menulis unit test tiruan (mock) tanpa memvalidasi logika bisnis riil.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Melarang penggunaan kupon diskon di aplikasi selamanya agar tim QA tidak perlu lagi menguji alur pembayaran promo secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Coverage tinggi hanya mengukur baris kode; QA harus melengkapi dengan testing berbasis skenario bisnis dan edge cases kupon.",
                    "score": 10
                }
            ]
        }
    ],
    "data-analyst": [
        {
            "id": "da-1",
            "question": "Hasil A/B testing menunjukkan variasi B menang pada segmen desktop dan mobile secara terpisah, namun secara agregat total variasi A yang menang. Anomali apa ini?",
            "options": [
                {
                    "label": "A",
                    "text": "Terjadi kesalahan kalkulasi formula matematika di dalam software kalkulator Excel yang dipakai oleh tim analis secara menyeluruh di seluruh pipeline arsitektur sistem.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Server pengujian A/B testing mengalami kegagalan hardware sehingga mencatat data ganda pada variasi B aplikasi.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Simpson's Paradox; disebabkan oleh distribusi proporsi traffic yang tidak seimbang antar segmen perangkat pengujian.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Mengabaikan seluruh data statistik tersebut dan memilih variasi berdasarkan selera desain personal manajer produk.",
                    "score": 1
                }
            ]
        },
        {
            "id": "da-2",
            "question": "Angka total omzet bulanan di dashboard Sales CRM berbeda selisih Rp 450 juta dengan laporan Data Warehouse tim finance. Langkah rekonsiliasi?",
            "options": [
                {
                    "label": "A",
                    "text": "Membedah definisi bisnis masing-masing sistem (status transaksi terbayar vs tertagih), zona waktu data, dan logika filter.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Langsung mengubah angka di Data Warehouse secara manual agar nilainya cocok persis dengan angka di aplikasi CRM sales.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Memilih angka yang nilainya lebih tinggi untuk dilaporkan ke direksi agar performa perusahaan terlihat sangat sukses.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Menghapus kedua dashboard tersebut dan meminta manajer penjualan menghitung total omzet memakai kalkulator fisik.",
                    "score": 2
                }
            ]
        },
        {
            "id": "da-3",
            "question": "Eksekutif meminta laporan ad-hoc cepat dan meminta analis mengeksekusi query join berat langsung ke database PostgreSQL operasional production. Sikap analis?",
            "options": [
                {
                    "label": "A",
                    "text": "Menolak permintaan pimpinan secara kasar tanpa memberikan solusi alternatif cara mendapatkan data laporan bisnis.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Mengekspor seluruh tabel database utama ke format CSV di komputer pribadi setiap jam untuk bahan analisis manual.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Langsung mengeksekusi query kompleks tanpa limit di database utama saat jam kerja sibuk demi melayani pimpinan cepat.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Arahkan query ke Read Replica atau Data Warehouse analitik agar tidak mengunci transaksi dan membebani server utama.",
                    "score": 10
                }
            ]
        },
        {
            "id": "da-4",
            "question": "Tim marketing mengklaim kanal Paid Ads menghasilkan 80% penjualan, sementara tim SEO mengklaim hal yang sama untuk kanal Organik. Masalah atribusi apa ini?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghitung total penjualan sebesar 160% dengan menggabungkan kedua klaim klaim performa departemen secara bersamaan.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Keduanya memakai model First-Touch dan Last-Touch terpisah; beralihlah ke model Multi-Touch Attribution berbasis data riil.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Membagi persentase atribusi sama rata 50:50 secara permanen tanpa menganalisis perjalanan interaksi customer journey secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Mematikan kedua kanal pemasaran tersebut untuk melihat kanal mana yang sebenarnya menghasilkan uang bagi perusahaan.",
                    "score": 1
                }
            ]
        },
        {
            "id": "da-5",
            "question": "Metrik churn rate pengguna melonjak tiba-tiba sebesar 22% tepat seminggu setelah rilis aplikasi versi 3.2.0. Langkah analisis akar masalah (root cause)?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghapus metrik churn rate dari laporan eksekutif bulanan agar tidak memicu kekhawatiran dari jajaran pemegang saham.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Mengasumsikan pengguna bosan secara alami dan menyarankan tim marketing membagikan voucher diskon tunai besar-besaran.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Segmentasikan data churn berdasarkan tipe perangkat OS, crash rate log aplikasi, dan funnel fitur baru versi 3.2.0.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Mengabaikan lonjakan churn tersebut dengan anggapan bahwa data analitik minggu berikutnya akan kembali normal.",
                    "score": 2
                }
            ]
        },
        {
            "id": "da-6",
            "question": "Dataset survei kepuasan pelanggan memiliki 35% nilai kosong (missing values) pada kolom penghasilan bulanan responden. Cara penanganan data yang tepat?",
            "options": [
                {
                    "label": "A",
                    "text": "Menganalisis pola keacakan data (MCAR/MAR); gunakan imputasi berbasis model fitur relevan atau kategorisasi Unknown.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Mengisi seluruh nilai kosong tersebut dengan angka pendapatan tertinggi di Indonesia agar rata-rata analisis naik.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Mengisi seluruh data kosong tersebut dengan angka nol rupiah dengan asumsi seluruh responden tidak memiliki penghasilan.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Menghapus 35% baris data survei tersebut secara massal tanpa mengevaluasi apakah menimbulkan bias pada sampel data.",
                    "score": 2
                }
            ]
        },
        {
            "id": "da-7",
            "question": "Dashboard Power BI yang digunakan manajemen membutuhkan waktu 50 detik setiap kali membuka halaman atau mengubah slicer filter. Optimasi data model?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghubungkan dashboard langsung ke puluhan tabel mentah database operasional dengan relasi many-to-many tidak teratur dengan menerapkan framework audit korporat terintegrasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menghapus seluruh filter tanggal dan kategori produk dari dashboard agar visualisasi grafik tidak bisa diubah user.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Meminta manajemen membeli komputer laptop baru berharga mahal agar proses rendering grafik dashboard lebih cepat.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Mengubah skema data menjadi Star Schema, pre-agregasi tabel di layer ELT data warehouse, dan hindari calculated column DAX.",
                    "score": 10
                }
            ]
        },
        {
            "id": "da-8",
            "question": "Stakeholder menyimpulkan bahwa \"seringnya membuka menu bantuan FAQ menyebabkan user menutup akun\", karena korelasinya positif tinggi. Tanggapan analis?",
            "options": [
                {
                    "label": "A",
                    "text": "Menyembunyikan menu bantuan FAQ di tempat tersembunyi agar pengguna kesulitan mencari cara menutup akun layanan.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Korelasi bukan kausasi; user yang mengalami masalah lebih sering membaca FAQ sebelum akhirnya terpaksa churn dari app.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Menyetujui kesimpulan stakeholder dan merekomendasikan penghapusan tombol menu bantuan FAQ dari seluruh aplikasi.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Membuat kesimpulan baru bahwa pengguna yang membaca FAQ adalah pengguna paling pintar dan setia di platform bisnis.",
                    "score": 1
                }
            ]
        },
        {
            "id": "da-9",
            "question": "Analisis kohort menunjukkan retensi pengguna minggu pertama (Week-1) stabil di angka 65%, namun terjun bebas menjadi 12% di minggu keempat (Week-4). Insight bisnis?",
            "options": [
                {
                    "label": "A",
                    "text": "Produk sudah sempurna di minggu awal sehingga pengguna merasa sudah tidak membutuhkan aplikasi lagi di kemudian hari guna memastikan seluruh dependensi operasional terakomodasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menghentikan pemantauan metrik retensi setelah minggu pertama dan hanya fokus pada jumlah pendaftaran user baru (TOFU).",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Onboarding awal berhasil mengaktifkan user, namun produk kekurangan hook retensi nilai berkelanjutan di fase penggunaan.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Mengirimkan notifikasi broadcast spam setiap 3 jam kepada user di minggu keempat untuk memaksa user membuka app.",
                    "score": 2
                }
            ]
        },
        {
            "id": "da-10",
            "question": "Perhitungan Customer Lifetime Value (CLV) rata-rata bisnis terdistorsi sangat tinggi karena ada 5 klien enterprise raksasa di antara 50.000 user retail biasa. Perbaikan?",
            "options": [
                {
                    "label": "A",
                    "text": "Menaikkan biaya langganan seluruh 50.000 user retail secara drastis agar angka belanja mereka mengejar nilai 5 klien besar.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Tetap memakai nilai rata-rata aritmatika tunggal yang terdistorsi dan menjadikannya dasar budget akuisisi user retail biasa.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Menghapus 5 akun klien enterprise terbesar tersebut dari database perusahaan agar angka rata-rata retail terlihat rapi secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Menggunakan nilai median, segmentasi kohort terpisah (B2B Enterprise vs B2C Retail), atau winsorization pada data outlier.",
                    "score": 10
                }
            ]
        }
    ],
    "data-researcher": [
        {
            "id": "dr-1",
            "question": "Riset perilaku adopsi fintech pedesaan dilakukan melalui kuesioner online Google Forms yang disebar di media sosial Twitter/X. Di mana letak bias metodologisnya?",
            "options": [
                {
                    "label": "A",
                    "text": "Kuesioner Google Forms memiliki tampilan warna antarmuka yang kurang menarik bagi responden masyarakat pedesaan secara menyeluruh di seluruh pipeline arsitektur sistem.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Jumlah pertanyaan kuesioner kurang dari 100 butir sehingga data statistik yang terkumpul dianggap tidak sah secara ilmiah.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Sampling bias parah; sampel hanya mencakup masyarakat perkotaan melek teknologi dan mengabaikan demografi riil desa.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Waktu penyebaran kuesioner dilakukan pada siang hari saat masyarakat pedesaan sedang beristirahat di rumah masing-masing.",
                    "score": 1
                }
            ]
        },
        {
            "id": "dr-2",
            "question": "Dua laporan riset industri terkemuka memberikan estimasi ukuran pasar e-groceries Indonesia yang berbeda jauh (USD 1.2 M vs USD 4.8 M). Langkah peneliti?",
            "options": [
                {
                    "label": "A",
                    "text": "Membedah metodologi definisi pasar (Gross Merchandise Value vs Net Revenue), ruang lingkup geografi, dan tahun dasar estimasi.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Mengambil angka rata-rata persis di tengah kedua laporan tersebut dan menjadikannya kesimpulan final tanpa verifikasi.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Menganggap kedua lembaga riset tersebut tidak kompeten dan membuat estimasi angka pasar sendiri berdasarkan firasat pribadi.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Memilih laporan yang angkanya lebih besar untuk menyenangkan direksi perusahaan saat presentasi rencana ekspansi.",
                    "score": 2
                }
            ]
        },
        {
            "id": "dr-3",
            "question": "Tingkat penyelesaian (completion rate) kuesioner evaluasi produk hanya 14%, di mana sebagian besar responden drop di pertanyaan ke-25. Evaluasi instrumen?",
            "options": [
                {
                    "label": "A",
                    "text": "Mewajibkan responden membayar denda uang tunai apabila tidak menyelesaikan seluruh butir pertanyaan kuesioner.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Mengisi sisa pertanyaan yang belum selesai secara mandiri menggunakan data rekaan sendiri agar sampel data terpenuhi.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Menambahkan 20 pertanyaan baru mengenai alasan responden berhenti mengisi kuesioner di bagian akhir formulir riset sesuai dengan rekomendasi panduan standar industri terbaru.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Terjadi survey fatigue; pangkas instrumen kuesioner menjadi maksimal 10-12 pertanyaan fokus, gunakan logic branch terarah.",
                    "score": 10
                }
            ]
        },
        {
            "id": "dr-4",
            "question": "Peneliti memiliki 30 jam rekaman wawancara mendalam (In-Depth Interview) kualitatif dari 20 responden pengguna. Bagaimana menyintesis data secara objektif?",
            "options": [
                {
                    "label": "A",
                    "text": "Hanya mencatat kutipan kalimat dari satu responden yang pendapatnya paling sesuai dengan hipotesis awal sang peneliti.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menggunakan analisis tematik berbasis koding transkrip (open, axial coding) dan cross-tabulation pola insight utama.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Membuat kesimpulan umum riset hanya berdasarkan ingatan memori percakapan tanpa membuka kembali transkrip wawancara secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Menghapus 25 jam rekaman wawancara dan hanya menyisakan 5 jam rekaman dari responden yang memberikan pujian produk.",
                    "score": 1
                }
            ]
        },
        {
            "id": "dr-5",
            "question": "Perusahaan ingin memetakan strategi kompetitor startup rahasia (stealth mode) yang belum merilis produk ke publik. Teknik pengumpulan data sekunder?",
            "options": [
                {
                    "label": "A",
                    "text": "Membayar pihak ketiga untuk meretas server database kompetitor demi mencuri roadmap produk pengembangan mereka.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Mengirimkan email palsu yang berpura-pura menjadi calon investor untuk meminta dokumen rahasia keuangan internal kompetitor secara berkala dengan melibatkan seluruh perwakilan tim kerja.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Menganalisis lowongan kerja teknis yang dibuka, profil LinkedIn founder/lead engineer, pendaftaran paten, dan data pendanaan.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menyimpulkan bahwa kompetitor tersebut tidak memiliki produk apa pun dan tidak berpotensi menjadi ancaman bisnis.",
                    "score": 2
                }
            ]
        },
        {
            "id": "dr-6",
            "question": "Survei kepuasan pelanggan tahunan hanya dijawab oleh 5% responden, dan skor CSAT menunjukkan angka sangat puas (96%). Ancaman validitas data apa ini?",
            "options": [
                {
                    "label": "A",
                    "text": "Non-response bias; hanya pelanggan yang sangat puas atau sangat loyal yang bersedia meluangkan waktu mengisi survei.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Menghentikan seluruh program peningkatan kualitas layanan karena menganggap skor kepuasan 96% sudah mencapai target.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Data survei tersebut 100% valid dan mencerminkan bahwa seluruh 100% pelanggan perusahaan sangat mencintai produk layanan.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Responden yang tidak menjawab survei diasumsikan semuanya sangat membenci produk perusahaan secara seragam.",
                    "score": 2
                }
            ]
        },
        {
            "id": "dr-7",
            "question": "Founder mengklaim produknya sudah mencapai Product-Market Fit (PMF) hanya karena jumlah download aplikasi tembus 100.000 kali. Uji validasi peneliti?",
            "options": [
                {
                    "label": "A",
                    "text": "Menyetujui klaim founder karena jumlah angka download adalah satu-satunya indikator keberhasilan sebuah produk di pasar dengan menerapkan framework audit korporat terintegrasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Mengukur PMF berdasarkan banyaknya liputan artikel media berita online tentang peluncuran aplikasi produk tersebut.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Menghitung PMF berdasarkan banyaknya pujian yang disampaikan oleh keluarga dan kerabat dekat pendiri startup.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Uji PMF Sean Ellis (\"berapa % user sangat kecewa jika produk hilang\"), organic retention rate kurva datar, dan repeat purchase.",
                    "score": 10
                }
            ]
        },
        {
            "id": "dr-8",
            "question": "Dalam studi tren daya beli, inflasi tinggi dan kenaikan harga BBM terjadi bersamaan dengan penurunan penjualan produk ritel. Analisis variabel perancu (confounding)?",
            "options": [
                {
                    "label": "A",
                    "text": "Menolak fakta data penurunan penjualan dan menganggap data penjualan kasir toko ritel dicatat secara keliru oleh staf.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Gunakan analisis regresi multivariat untuk mengontrol variabel makroekonomi dan memisahkan elastisitas harga produk sendiri.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Langsung menyimpulkan kenaikan harga BBM adalah satu-satunya penyebab tunggal tanpa menguji dampak kenaikan harga produk.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Menghentikan pencatatan angka penjualan barang selama inflasi tinggi berlangsung hingga situasi ekonomi negara normal.",
                    "score": 1
                }
            ]
        },
        {
            "id": "dr-9",
            "question": "Peneliti pemula menanyakan pertanyaan interview: \"Apakah Anda setuju bahwa aplikasi kami jauh lebih praktis daripada kompetitor X?\". Kesalahan apa ini?",
            "options": [
                {
                    "label": "A",
                    "text": "Pertanyaan tersebut sudah sangat objektif dan efektif untuk membuktikan keunggulan produk di hadapan para investor guna memastikan seluruh dependensi operasional terakomodasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Mengharuskan responden menjawab dengan opsi Ya atau Tidak tanpa memberikan kesempatan menjelaskan pengalaman pribadi.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Leading question yang menggiring jawaban; ubah menjadi netral: \"Bagaimana pengalaman Anda saat memakai fitur ini dibanding alternatif lain?\".",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Pertanyaan tersebut terlalu pendek dan harus ditambahkan pujian mengenai fitur canggih aplikasi sebelum ditanyakan.",
                    "score": 2
                }
            ]
        },
        {
            "id": "dr-10",
            "question": "Hasil analisis riset pasar setebal 120 halaman diabaikan oleh divisi produk karena dianggap terlalu teoretis dan sulit dieksekusi. Cara penyajian riset?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghapus seluruh divisi riset perusahaan dan membiarkan tim produk membuat fitur murni berdasarkan tebakan intuisi.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Menambah ketebalan laporan riset menjadi 300 halaman dengan menyertakan seluruh lampiran rumus matematika akademis rumit.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Mengirimkan dokumen PDF 120 halaman tersebut berulang-ulang via email dengan menandai status High Importance pada pesan secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Sajikan Executive Summary 1-pager, framework matriks prioritas actionable (Impact vs Effort), dan lokakarya co-creation tim.",
                    "score": 10
                }
            ]
        }
    ],
    "digital-marketing": [
        {
            "id": "dm-1",
            "question": "Biaya iklan Meta Ads (Facebook/Instagram) menghabiskan Rp 50 juta dalam 4 hari namun ROAS (Return on Ad Spend) anjlok ke angka 0.6x. Tindakan optimasi darurat?",
            "options": [
                {
                    "label": "A",
                    "text": "Menaikkan anggaran iklan menjadi Rp 200 juta per hari agar algoritma Meta Ads memiliki modal belanja data lebih leluasa secara menyeluruh di seluruh pipeline arsitektur sistem.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menghapus akun iklan Meta Business Manager secara permanen dan memindahkan seluruh budget pemasaran ke brosur koran.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Pause ad set berkinerja buruk, audit conversion tracking pixel, evaluasi relevansi penawaran, dan uji kreatif baru bertahap.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Mengganti target audiens iklan menjadi seluruh penduduk dunia usia 18-65 tahun tanpa batasan minat dan demografi.",
                    "score": 1
                }
            ]
        },
        {
            "id": "dm-2",
            "question": "Setelah pembaruan privasi Apple iOS 14+ (App Tracking Transparency), konversi web yang tercatat di Meta Ads Manager turun 45%. Solusi pelacakan teknis?",
            "options": [
                {
                    "label": "A",
                    "text": "Menerapkan Meta Conversions API (CAPI) server-side tracking, domain verification, dan Aggregated Event Measurement terkonfigurasi.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Mengabaikan pelacakan server-side dan berharap Apple mencabut aturan privasi pengguna iPhone di masa mendatang.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Meminta calon pembeli di media sosial mengirimkan foto tangkapan layar bukti transfer pembayaran via pesan DM pribadi.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Membatasi penayangan iklan Meta Ads hanya kepada pengguna smartphone Android dan memblokir seluruh pengguna Apple.",
                    "score": 2
                }
            ]
        },
        {
            "id": "dm-3",
            "question": "Quality Score pada kata kunci utama kampanye Google Search Ads turun menjadi 3/10, memicu lonjakan biaya per klik (CPC). Bagaimana memperbaikinya?",
            "options": [
                {
                    "label": "A",
                    "text": "Memasukkan 500 kata kunci acak yang tidak berhubungan ke dalam satu grup iklan (ad group) untuk memancing trafik klik.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Menghapus seluruh kata kunci dari akun Google Ads dan membiarkan sistem kampanye berjalan otomatis tanpa kata kunci target.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Menaikkan batas maksimal tawaran bid CPC sebesar 300% agar iklan tetap tayang di peringkat paling atas Google Search sesuai dengan rekomendasi panduan standar industri terbaru.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Optimasi relevansi ad copy dengan kata kunci, perbaiki relevansi konten landing page, dan tingkatkan kecepatan muat halaman web.",
                    "score": 10
                }
            ]
        },
        {
            "id": "dm-4",
            "question": "Kampanye iklan berbayar mendatangkan 15.000 klik pengunjung ke landing page produk B2B, namun hanya menghasilkan 3 submission formulir leads. Evaluasi funnel?",
            "options": [
                {
                    "label": "A",
                    "text": "Trafik pengunjung yang datang dari Google Ads adalah bot otomatis dan tidak ada manusia nyata yang menggunakan internet.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Ketidaksesuaian pesan ad-to-landing page (message mismatch), form leads terlalu rumit, atau kurangnya social proof kredibel.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Menghapus formulir kontak leads dan hanya mencantumkan nomor rekening bank perusahaan untuk transfer uang langsung secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Menyalahkan tim sales karena tidak menelepon pengunjung yang baru sekadar membuka halaman website selama 2 detik.",
                    "score": 1
                }
            ]
        },
        {
            "id": "dm-5",
            "question": "Materi video iklan TikTok Ads mengalami ad fatigue setelah 6 hari tayang: CTR merosot dari 2.4% ke 0.5% dan CPA melesat tinggi. Solusi kreatif iklan?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengunggah video yang sama berulang-ulang ke 20 akun TikTok baru setiap hari untuk memanipulasi frekuensi penayangan iklan.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Tetap memaksa menjalankan satu video iklan yang sama selama 6 bulan berturut-turut demi menjaga efisiensi biaya produksi secara berkala dengan melibatkan seluruh perwakilan tim kerja.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Terapkan strategi creative refresh mingguan: produksi variasi hook 3 detik awal baru, format UGC otentik, dan sudut pesan berbeda.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Mengganti lagu latar belakang video dengan rekaman suara hening tanpa mengubah visual atau teks penawaran promosi.",
                    "score": 2
                }
            ]
        },
        {
            "id": "dm-6",
            "question": "Newsletter email marketing promosi produk berkala masuk ke folder Spam/Promotions pada 85% kontak pelanggan. Audit deliverability teknis?",
            "options": [
                {
                    "label": "A",
                    "text": "Konfigurasi autentikasi domain (SPF, DKIM, DMARC), bersihkan kontak tidak aktif (scrubbing list), dan kurangi pemicu spam words.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Menuliskan subjek email menggunakan huruf kapital semua dengan puluhan tanda seru merah dan kata \"GRATIS UANG KAGET\".",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Mengirimkan email promosi yang sama sebanyak 5 kali sehari kepada pelanggan yang belum membuka pesan email sebelumnya.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Membeli database berisi 1 juta alamat email acak dari internet untuk menggantikan daftar kontak pelanggan yang ada.",
                    "score": 2
                }
            ]
        },
        {
            "id": "dm-7",
            "question": "Perusahaan menghabiskan anggaran besar untuk Google Search Ads pada nama brand sendiri (branded keyword), padahal peringkat SEO organik sudah posisi #1. Keputusan?",
            "options": [
                {
                    "label": "A",
                    "text": "Langsung mematikan seluruh branded search ads tanpa memeriksa apakah ada kompetitor yang memasang iklan pada nama brandmu dengan menerapkan framework audit korporat terintegrasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menghapus website dari hasil pencarian SEO Google organik agar seluruh pengunjung terpaksa mengklik tautan iklan berbayar.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Menaikkan anggaran iklan branded keyword hingga 90% dari total budget pemasaran perusahaan dan menghentikan kanal lain.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Jalankan pengujian incremental lift; pertahankan branded ads jika kompetitor aktif membid nama brandmu untuk mencuri trafik.",
                    "score": 10
                }
            ]
        },
        {
            "id": "dm-8",
            "question": "Pengguna yang sudah membeli produk mengeluh terus-menerus dihujani iklan retargeting produk yang sama selama berminggu-minggu. Kesalahan teknis ad set?",
            "options": [
                {
                    "label": "A",
                    "text": "Menaikkan frekuensi penayangan iklan retargeting menjadi 15 kali per hari agar pelanggan terbiasa melihat iklan tersebut.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Lupa memasang audiens eksklusi (exclusion audience) untuk segmen pengguna yang sudah menyelesaikan konversi pembelian (Purchase).",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Algoritma platform periklanan sengaja membalas dendam kepada pengguna yang sudah berbelanja produk di website perusahaan.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Menghubungi setiap pelanggan yang komplain satu per satu melalui telepon seluler untuk meminta mereka memblokir iklan akun.",
                    "score": 1
                }
            ]
        },
        {
            "id": "dm-9",
            "question": "Kampanye endorsement micro-influencer di Instagram menghasilkan banyak klik tautan profil namun rasio penjualan sangat rendah. Di mana letak evaluasi kolaborasi?",
            "options": [
                {
                    "label": "A",
                    "text": "Memilih influencer hanya berdasarkan jumlah total followers terbanyak tanpa memeriksa tingkat interaksi (engagement rate) riil guna memastikan seluruh dependensi operasional terakomodasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Mewajibkan influencer mengunggah 100 postingan foto produk setiap hari di akun media sosial pribadi mereka selama setahun.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Audit demografi audiens influencer (apakah audiens relevan dengan target pasar produk), keaslian followers, dan alur landing page.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menuntut influencer mengembalikan uang pembayaran endorsement secara sepihak jika target penjualan produk tidak tercapai.",
                    "score": 2
                }
            ]
        },
        {
            "id": "dm-10",
            "question": "Bagaimana mengalokasikan anggaran pemasaran digital yang seimbang antara Top of Funnel (Brand Awareness) dan Bottom of Funnel (Direct Conversion)?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghabiskan seluruh anggaran pemasaran tahunan di minggu pertama bulan Januari tanpa menyisakan dana untuk sisa bulan lain.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Alokasikan 100% anggaran hanya pada direct response conversion dan abaikan brand awareness selamanya hingga audiens jenuh.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Alokasikan 100% anggaran hanya pada brand awareness di billboard offline tanpa pernah mengukur konversi transaksi penjualan secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Gunakan rasio teruji (misal 60% brand building untuk jangka panjang, 40% performance conversion untuk penjualan jangka pendek).",
                    "score": 10
                }
            ]
        }
    ],
    "business-development": [
        {
            "id": "bd-1",
            "question": "Prospek klien enterprise bernilai kontrak Rp 1.5 M mendadak menghilang (ghosting) saat tahap final penandatanganan kontrak kerja sama. Taktik follow-up?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengirimkan email penagihan bernada marah setiap 2 jam sekali dan menandai alamat email seluruh jajaran direksi klien secara menyeluruh di seluruh pipeline arsitektur sistem.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Langsung memotong harga penawaran kontrak sebesar 70% secara sepihak untuk memicu kepanikan belanja pada pihak klien.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Kirim pesan multi-thread berbasis nilai tambah baru (studi kasus industri relevan / regulasi baru) atau hubungi sponsor internal lain.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menghapus data kontak prospek perusahaan klien dari CRM dan menganggap kesepakatan bisnis tersebut sudah batal selamanya.",
                    "score": 1
                }
            ]
        },
        {
            "id": "bd-2",
            "question": "Dalam negosiasi kemitraan strategis, calon mitra menuntut klausul bagi hasil eksklusif yang sangat merugikan margin keuntungan jangka panjang perusahaan. Solusi?",
            "options": [
                {
                    "label": "A",
                    "text": "Negosiasikan variabel non-moneter: komitmen volume minimum, durasi klausul terbatas, dan milestone evaluasi performa periodik.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Menyetujui seluruh klausul bagi hasil yang merugikan tersebut demi mendapatkan nama besar logo mitra di portofolio presentasi.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Menandatangani kontrak perjanjian dengan niat sejak awal untuk melanggar isi kesepakatan tersebut di kemudian hari.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Membatalkan pertemuan negosiasi secara mendadak dan mengejek draf proposal kemitraan pihak mitra di platform media sosial.",
                    "score": 2
                }
            ]
        },
        {
            "id": "bd-3",
            "question": "Pipeline CRM penjualan penuh dengan 120 prospek lama yang macet di tahap negosiasi selama lebih dari 8 bulan. Tindakan pipeline hygiene?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghubungi seluruh 120 prospek tersebut sekaligus menggunakan pesan template broadcast otomatis yang tidak dipersonalisasi.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Menghapus seluruh sistem software CRM penjualan perusahaan dan kembali mencatat data prospek klien di kertas buku tulis.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Mempertahankan seluruh 120 prospek macet tersebut di pipeline aktif agar laporan proyeksi omzet ke pimpinan tampak tinggi sesuai dengan rekomendasi panduan standar industri terbaru.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Lakukan kualifikasi ketat berbasis framework BANT/MEDDPICC, diskualifikasi prospek mati (closed-lost), dan fokuskan energi tim.",
                    "score": 10
                }
            ]
        },
        {
            "id": "bd-4",
            "question": "Tim Information Security (InfoSec) klien korporat menolak solusi software cloud SaaS perusahaan karena kebijakan privasi kepatuhan data internal. Mitigasi?",
            "options": [
                {
                    "label": "A",
                    "text": "Meyakinkan klien bahwa kebijakan keamanan InfoSec internal mereka sudah ketinggalan zaman dan tidak perlu dipatuhi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Tunjukkan sertifikasi kepatuhan (ISO 27001, SOC 2), tawarkan opsi dedicated VPC/on-premise deployment, dan dampingi audit keamanan.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Meminta staf klien mematikan sistem antivirus komputer mereka saat mengakses aplikasi software SaaS perusahaan secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Mengabaikan tim InfoSec klien dan mencoba menyuap staf operasional klien agar software tetap dipasang diam-diam.",
                    "score": 1
                }
            ]
        },
        {
            "id": "bd-5",
            "question": "Siklus penjualan B2B (sales cycle) produk enterprise rata-rata memakan waktu 11 bulan dari prospek awal hingga penutupan transaksi. Strategi akselerasi?",
            "options": [
                {
                    "label": "A",
                    "text": "Hanya menjual produk enterprise bernilai miliaran rupiah melalui pesan singkat SMS otomatis tanpa pertemuan langsung.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Memaksa pimpinan klien menandatangani kontrak dalam waktu 24 jam dengan mengancam akan memberikan diskon kepada rival mereka secara berkala dengan melibatkan seluruh perwakilan tim kerja.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Petakan Decision Making Unit (DMU) sejak discovery, buat business case ROI komprehensif, dan sediakan pilot project berbayar terukur.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menghilangkan seluruh sesi demo produk dan presentasi teknis agar proses penutupan transaksi berlangsung lebih singkat.",
                    "score": 2
                }
            ]
        },
        {
            "id": "bd-6",
            "question": "Staf resepsionis atau sekretaris (gatekeeper) selalu menolak menyambungkan telepon atau email penawaran kepada Chief Technology Officer (CTO) target. Taktik outreach?",
            "options": [
                {
                    "label": "A",
                    "text": "Gunakan pendekatan multi-channel: bangun interaksi di LinkedIn dengan konten berbobot, atau minta referral dari koneksi mutual.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Menyerah sepenuhnya dan menghentikan seluruh upaya penjualan ke seluruh perusahaan enterprise di Indonesia.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Menelepon meja resepsionis 50 kali sehari dengan berpura-pura menjadi anggota keluarga dekat CTO yang sedang dalam keadaan darurat.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Menunggu di lobi kantor klien selama berhari-hari tanpa janji temu resmi hingga CTO keluar dari pintu gedung kantor.",
                    "score": 2
                }
            ]
        },
        {
            "id": "bd-7",
            "question": "Perusahaan menerima dokumen Request for Proposal (RFP) setebal 90 halaman dari BUMN, namun tenggat waktu pengumpulan dokumen hanya tersisa 3 hari kerja. Keputusan?",
            "options": [
                {
                    "label": "A",
                    "text": "Menyetujui untuk mengikuti seluruh tender RFP yang masuk tanpa mempedulikan apakah solusi perusahaan cocok dengan kriteria dengan menerapkan framework audit korporat terintegrasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Mengumpulkan dokumen proposal kosong bertanda tangan dengan harapan panitia tender BUMN tidak memeriksa kelengkapan file.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Menyalin proposal tender milik perusahaan kompetitor secara mentah-mentah dan mengganti halaman sampul dengan logo sendiri.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Lakukan evaluasi Bid/No-Bid objektif: jika peluang menang rendah dan kapabilitas produk tidak sesuai, prioritaskan deal lain.",
                    "score": 10
                }
            ]
        },
        {
            "id": "bd-8",
            "question": "Klien korporat terbesar (penyumbang 35% omzet B2B) mengancam putus kontrak karena Key Account Manager yang menangani mereka pindah kerja ke kompetitor. Retensi?",
            "options": [
                {
                    "label": "A",
                    "text": "Memotong harga tagihan layanan sebesar 90% secara permanen tanpa memperbaiki kualitas komunikasi dan layanan akun.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "C-level executive meeting darurat, transisi manajer baru yang kompeten, dan tawarkan komitmen SLA layanan yang ditingkatkan.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Membiarkan klien terbesar tersebut pergi begitu saja dengan asumsi mencari klien baru jauh lebih mudah dan murah.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Mengirimkan surat somasi hukum kepada pihak klien atas ancaman pemutusan kontrak kerja sama bisnis yang diajukan.",
                    "score": 1
                }
            ]
        },
        {
            "id": "bd-9",
            "question": "Perusahaan berencana melakukan ekspansi kemitraan B2B ke pasar luar negeri (regional Asia Tenggara) di mana brand perusahaan belum dikenal sama sekali. Pendekatan awal?",
            "options": [
                {
                    "label": "A",
                    "text": "Langsung menyewa kantor megah di pusat kota luar negeri dan merekrut puluhan staf lokal sebelum memvalidasi permintaan pasar guna memastikan seluruh dependensi operasional terakomodasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Mengasumsikan dinamika hukum dan budaya bisnis di negara lain identik persis 100% dengan kondisi pasar domestik.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Gandeng mitra distributor lokal yang memiliki jaringan kuat, sesuaikan proposisi nilai dengan regulasi setempat, dan uji pasar pilot.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menjalankan kampanye iklan televisi nasional di negara tujuan dengan menggunakan bahasa Indonesia tanpa subtitle.",
                    "score": 2
                }
            ]
        },
        {
            "id": "bd-10",
            "question": "Target omzet penjualan tahunan divisi Business Development dinaikkan 2.5x lipat, namun jumlah staf penjualan di tim tetap sama. Strategi pencapaian?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengubah laporan angka pencapaian penjualan di akhir tahun menjadi angka fiktif agar target terlihat berhasil terpenuhi.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Memaksa setiap tenaga penjualan bekerja 20 jam sehari tanpa hari libur untuk melipatgandakan jumlah panggilan telepon prospek.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Menurunkan standar kualifikasi prospek dan menerima klien mana pun meskipun tidak mampu membayar biaya tagihan invoice secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Fokus pada segmen akun ber-Annual Contract Value (ACV) lebih tinggi, automasi alur prospecting, dan optimasi ekspansi up-sell.",
                    "score": 10
                }
            ]
        }
    ],
    "ecommerce-specialist": [
        {
            "id": "ecom-1",
            "question": "Peringkat pencarian organik toko resmi brand di marketplace mendadak anjlok dari halaman 1 ke halaman 5 setelah update sistem. Langkah audit optimasi pertama?",
            "options": [
                {
                    "label": "A",
                    "text": "Membuat 50 akun toko palsu baru untuk mengunggah ulang produk yang sama demi membanjiri halaman pencarian marketplace secara menyeluruh di seluruh pipeline arsitektur sistem.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menghapus seluruh katalog produk yang ada dan mengunggahnya kembali dari awal tanpa riwayat ulasan pembeli lama.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Audit metrik kesehatan toko: kecepatan respon chat, pemenuhan SLA pesanan tepat waktu, dan perbarui kata kunci judul relevan.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menuliskan ulasan komplain kemarahan di forum komunitas penjual tanpa memperbaiki performa operasional toko sendiri.",
                    "score": 1
                }
            ]
        },
        {
            "id": "ecom-2",
            "question": "Saat mega campaign tanggal kembar (12.12), lonjakan pesanan 20x lipat berisiko memicu overselling karena stok gudang fisik lambat sinkron. Mitigasi operasional?",
            "options": [
                {
                    "label": "A",
                    "text": "Terapkan buffer safety stock otomatis di sistem Order Management System (OMS) dan batasi kuota pembelian per checkout.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Menuliskan jumlah stok 99.999 unit di semua channel penjualan agar transaksi belanja sebanyak mungkin berhasil masuk.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Mematikan seluruh operasional toko online tepat saat event diskon 12.12 dibuka untuk menghindari kelelahan tim packing.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Menghitung stok fisik secara manual dengan menghitung kardus satu per satu di gudang saat pesanan sedang membludak.",
                    "score": 2
                }
            ]
        },
        {
            "id": "ecom-3",
            "question": "Tingkat pembatalan keranjang belanja (cart abandonment) mencapai 72% pada langkah pemilihan kurir dan kalkulasi ongkos kirim. Solusi komersial?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengirimkan pesan penagihan otomatis setiap 15 menit kepada pembeli yang belum menyelesaikan pembayaran belanja.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Menaikkan harga barang dua kali lipat agar perusahaan tetap meraih keuntungan meskipun banyak pesanan dibatalkan pembeli.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Menyembunyikan opsi pilihan kurir pengiriman dan mewajibkan pembeli memakai satu kurir ekspedisi bertarif paling mahal sesuai dengan rekomendasi panduan standar industri terbaru.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Sediakan promo gratis ongkir bersyarat minimum belanja, integrasikan kurir instan/kargo variatif, dan transparansi ongkir.",
                    "score": 10
                }
            ]
        },
        {
            "id": "ecom-4",
            "question": "Toko kompetitor menjual produk yang mirip dengan harga 40% lebih murah melalui strategi perang harga predatory pricing. Bagaimana meresponnya?",
            "options": [
                {
                    "label": "A",
                    "text": "Ikut memotong harga produk hingga di bawah harga pokok produksi (HPP) meskipun harus menanggung kerugian finansial besar.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Fokus pada diferensiasi nilai: bundling produk bernilai tambah, garansi keaslian resmi, sertifikasi, dan loyalitas pembeli.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Membeli seluruh stok produk milik kompetitor tersebut secara anonim untuk menghabiskan persediaan barang mereka di pasar secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Melaporkan akun toko kompetitor ke customer service marketplace dengan tuduhan palsu tanpa dasar bukti pelanggaran sah.",
                    "score": 1
                }
            ]
        },
        {
            "id": "ecom-5",
            "question": "Sesi live shopping di TikTok Shop/Shopee Live ditonton oleh 15.000 penonton bersamaan, namun rasio konversi keranjang belanja sangat rendah (0.3%). Evaluasi host?",
            "options": [
                {
                    "label": "A",
                    "text": "Menampilkan 100 produk berbeda sekaligus di etalase tanpa menjelaskan manfaat dan keunggulan masing-masing barang promosi.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Memaksa penonton membeli produk dengan mengancam akan segera mematikan siaran langsung jika target penjualan belum tercapai secara berkala dengan melibatkan seluruh perwakilan tim kerja.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Perbaiki alur penjualan live: buat flash sale berkala berbatas waktu, demonstrasi produk interaktif, dan pin keranjang jelas.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Hanya memutar video rekaman promosi produk yang diulang-ulang tanpa adanya interaksi tanya jawab langsung dengan penonton.",
                    "score": 2
                }
            ]
        },
        {
            "id": "ecom-6",
            "question": "Tingkat pengembalian barang (Return/RMA) kategori pakaian di toko mencapai 18% dengan alasan ukuran baju tidak pas. Perbaikan katalog digital?",
            "options": [
                {
                    "label": "A",
                    "text": "Sediakan panduan ukuran (size chart) komprehensif dengan toleransi cm, berat/tinggi badan model, dan ulasan foto pembeli riil.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Menyalahkan bentuk tubuh pembeli saat merespon komplain di kolom ulasan publik bintang satu toko di marketplace online.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Menghilangkan kebijakan retur barang sepenuhnya dan menolak segala bentuk komplain pelanggan terkait kesalahan ukuran baju.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Hanya menjual pakaian dengan satu ukuran all-size tanpa memberikan rincian ukuran lingkar dada atau panjang kain baju.",
                    "score": 2
                }
            ]
        },
        {
            "id": "ecom-7",
            "question": "Toko terancam penalti poin pelanggaran marketplace karena rasio keterlambatan pengiriman pesanan (Late Shipment Rate) melewati ambang batas 5%. Perbaikan SLA?",
            "options": [
                {
                    "label": "A",
                    "text": "Menekan tombol konfirmasi kirim barang secara fiktif di sistem aplikasi meskipun paket barang fisik masih belum dikemas di gudang.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Mengurangi jam operasional toko menjadi hanya 2 jam per hari agar jumlah pesanan yang masuk ke sistem tidak terlalu banyak.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Menyerahkan urusan operasional gudang sepenuhnya kepada pihak kurir ekspedisi tanpa pengawasan standar operasional tim.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Terapkan integrasi otomatis scan barcode resi, jadwal penjemputan kurir tetap per hari, dan prioritas antrean pesanan mendesak.",
                    "score": 10
                }
            ]
        },
        {
            "id": "ecom-8",
            "question": "Perusahaan berjualan di 4 marketplace berbeda sekaligus (Shopee, Tokopedia, Lazada, TikTok) dan sering terjadi selisih stok antar channel. Solusi infrastruktur?",
            "options": [
                {
                    "label": "A",
                    "text": "Membagi stok fisik gudang menjadi 4 bagian terpisah secara kaku dan menolak memindahkan stok jika ada channel yang laris.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Gunakan software Omnichannel ERP terintegrasi dengan sinkronisasi stok real-time dua arah via API resmi marketplace.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Menugaskan satu staf admin untuk memperbarui angka stok di 4 marketplace tersebut secara manual setiap 10 menit sekali.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Menutup 3 toko marketplace lainnya dan hanya berjualan di 1 channel saja untuk menghindari kesulitan manajemen stok inventaris.",
                    "score": 1
                }
            ]
        },
        {
            "id": "ecom-9",
            "question": "Tingkat pembelian ulang (repeat order rate) produk kebutuhan harian (FMCG) toko sangat rendah padahal ulasan pembeli rata-rata bintang 4.9. Strategi retensi?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengirimkan pesan siaran promosi (broadcast chat) massal setiap hari kepada seluruh database pembeli lama tanpa segmentasi guna memastikan seluruh dependensi operasional terakomodasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Mengabaikan pembeli lama dan mencurahkan 100% modal anggaran promosi hanya untuk mendatangkan pelanggan baru dari luar.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Bangun program voucher langganan berkala, pengingat pengisian ulang (refill reminder) berbasis siklus pakai, dan reward koin.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menaikkan harga produk untuk pembeli lama dengan asumsi bahwa pembeli yang puas bersedia membayar tarif lebih mahal.",
                    "score": 2
                }
            ]
        },
        {
            "id": "ecom-10",
            "question": "Iklan berbayar internal marketplace (Shopee Ads / TopAds) memiliki rasio biaya iklan terhadap penjualan (ACOS) sebesar 42%, membuat toko merugi. Optimasi iklan?",
            "options": [
                {
                    "label": "A",
                    "text": "Membiarkan kampanye iklan berjalan otomatis tanpa pernah memeriksa laporan kata kunci dan konversi penjualan bulanan toko.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Menaikkan nominal bid kata kunci menjadi nilai maksimal agar produk selalu muncul di posisi teratas hasil pencarian iklan.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Mematikan seluruh fitur iklan pencarian kata kunci dan hanya mengandalkan penayangan iklan pada produk rekomendasi serupa secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Evaluasi kata kunci pencarian bernilai konversi rendah, optimasi negative keyword, dan fokuskan bidding pada produk hero SKUs.",
                    "score": 10
                }
            ]
        }
    ],
    "product-manager": [
        {
            "id": "pm-1",
            "question": "Tim memiliki backlog berisi 45 ide fitur baru, sementara kapasitas sprint tim developer hanya mampu mengeksekusi 3 fitur kuartal ini. Framework prioritisasi?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengerjakan fitur mana pun yang diminta oleh pimpinan tertinggi perusahaan saat berpapasan santai di koridor kantor kemarin secara menyeluruh di seluruh pipeline arsitektur sistem.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Melakukan pengundian acak di hadapan tim developer untuk menentukan fitur yang akan dikerjakan pada sprint berikutnya.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Gunakan framework scoring terstruktur seperti RICE (Reach, Impact, Confidence, Effort) yang diselaraskan dengan Key Results (OKR).",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Membagi rata kapasitas waktu developer untuk mengerjakan seluruh 45 fitur sekaligus secara bersamaan dalam satu sprint.",
                    "score": 1
                }
            ]
        },
        {
            "id": "pm-2",
            "question": "Tim engineer mendesak 2 sprint penuh untuk melunasi technical debt arsitektur, sementara tim sales menuntut fitur komersial klien baru. Keputusan PM?",
            "options": [
                {
                    "label": "A",
                    "text": "Alokasikan rasio kapasitas sprint terencana (misal 70% fitur bisnis baru, 20% pelunasan technical debt, 10% bugfix darurat).",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Mengabaikan technical debt selamanya dan memaksa developer hanya merilis fitur baru komersial demi target jangka pendek.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Membiarkan kedua divisi berdebat tanpa ada penengah sampai salah satu pihak menyerah dan mengundurkan diri dari kantor.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Menghentikan seluruh aktivitas pengembangan fitur bisnis selama 3 bulan penuh demi menuruti keinginan refactoring kode.",
                    "score": 2
                }
            ]
        },
        {
            "id": "pm-3",
            "question": "Dua bulan pasca rilis fitur ekspor laporan keuangan baru, data analitik menunjukkan tingkat adopsi pengguna hanya 4%. Langkah evaluasi produk?",
            "options": [
                {
                    "label": "A",
                    "text": "Menampilkan pop-up dialog layar penuh yang memaksa pengguna mengunduh laporan keuangan setiap kali login aplikasi.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Menyalahkan tim desainer dan engineer secara sepihak atas kegagalan adopsi fitur tanpa memvalidasi kebutuhan bisnis riil.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Menyimpulkan bahwa pengguna tidak membutuhkan fitur tersebut dan langsung menghapus tombol fitur ekspor dari aplikasi sesuai dengan rekomendasi panduan standar industri terbaru.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Lakukan user interview mendalam untuk membedah discovery alur fitur, kegunaan riil format data, dan friction point user.",
                    "score": 10
                }
            ]
        },
        {
            "id": "pm-4",
            "question": "CEO meminta penambahan fitur dompet kripto di aplikasi fintech pembayaran tanpa adanya data validasi kebutuhan pengguna. Sikap profesional PM?",
            "options": [
                {
                    "label": "A",
                    "text": "Langsung menyuruh developer menghentikan seluruh roadmap kerja sprint demi membuat fitur kripto sesuai keinginan pribadi CEO.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Lakukan riset cepat dan uji hipotesis (fake door test / prototipe), sajikan data demand pasar dan risiko kepatuhan regulasi.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Menolak mentah-mentah ide CEO dalam rapat umum dewan direksi dengan menyebut ide tersebut sangat buruk dan tidak masuk akal secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Berpura-pura menyetujui permintaan CEO namun diam-diam tidak pernah memasukkan tugas tersebut ke dalam backlog kerja tim.",
                    "score": 1
                }
            ]
        },
        {
            "id": "pm-5",
            "question": "Eksperimen fitur menunjukkan kenaikan metrik konversi pendapatan jangka pendek, namun memicu lonjakan keluhan user terkait transparansi biaya. Keputusan?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengubah kebijakan privasi aplikasi menjadi dokumen hukum panjang yang melegalkan segala bentuk penipuan informasi biaya.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Pertahankan desain yang membingungkan tersebut selama angka pendapatan keuangan bulanan perusahaan masih terus meningkat secara berkala dengan melibatkan seluruh perwakilan tim kerja.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Tolak dark pattern; utamakan User Experience jujur dan Customer Lifetime Value berkelanjutan dibanding kenaikan omzet semu.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menyembunyikan saluran kontak customer service agar pengguna yang merasa tertipu tidak bisa mengirimkan keluhan komplain.",
                    "score": 2
                }
            ]
        },
        {
            "id": "pm-6",
            "question": "Tenggat waktu peluncuran produk tinggal tersisa 6 minggu, namun cakupan ruang lingkup (scope) fitur masih terlalu luas. Penentuan MVP (Minimum Viable Product)?",
            "options": [
                {
                    "label": "A",
                    "text": "Pangkas scope ke core value loop minimum yang memecahkan masalah esensial user, tunda fitur pendukung ke fase rilis iterasi.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Menghilangkan seluruh proses pengujian kualitas software (QA) agar produk yang belum selesai bisa langsung dirilis ke pasar.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Memaksa merilis seluruh fitur secara setengah matang dan penuh bug kritis demi mengejar tenggat waktu tanggal peluncuran.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Memundurkan jadwal peluncuran produk selama 1 tahun ke depan sampai seluruh fitur sekunder berhasil dibangun sempurna.",
                    "score": 2
                }
            ]
        },
        {
            "id": "pm-7",
            "question": "Squad Payments tidak bisa merilis fitur transfer karena tertahan dependensi integrasi API dari Squad User Identity yang terlambat. Manajemen blokade?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghentikan seluruh aktivitas kerja Squad Payments selama berminggu-minggu sampai Squad User Identity menyelesaikan tugasnya dengan menerapkan framework audit korporat terintegrasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menyuruh engineer Squad Payments mengambil alih seluruh repositori kode Squad User Identity tanpa izin koordinasi tim.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Menghapus fitur transfer saldo secara permanen dari roadmap produk agar dependensi antar tim developer tidak ada lagi.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Sepakati API contract interface di awal, gunakan mock server sementara untuk unblock pengujian squad, dan eskalasi sinkronisasi.",
                    "score": 10
                }
            ]
        },
        {
            "id": "pm-8",
            "question": "Perusahaan berdebat apakah harus membangun sistem autentikasi sendiri dari nol (Build) atau memakai layanan SaaS pihak ketiga (Buy). Kriteria evaluasi?",
            "options": [
                {
                    "label": "A",
                    "text": "Selalu membeli layanan software pihak ketiga yang paling mahal tanpa memeriksa apakah fitur tersebut relevan dengan produk.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Bandingkan Total Cost of Ownership (TCO), Time-to-Market, kepatuhan regulasi, dan apakah kapabilitas ini merupakan diferensiasi inti.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Selalu memilih membangun sendiri dari nol dengan asumsi bahwa membuat software in-house tidak membutuhkan biaya operasional.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Menentukan pilihan berdasarkan hasil lempar koin saat rapat evaluasi arsitektur teknologi bersama para pemegang saham.",
                    "score": 1
                }
            ]
        },
        {
            "id": "pm-9",
            "question": "Metrik North Star perusahaan (Weekly Active Users) stagnan selama 2 kuartal berturut-turut meskipun jumlah user terdaftar baru terus naik. Evaluasi PM?",
            "options": [
                {
                    "label": "A",
                    "text": "Menaikkan anggaran iklan akuisisi user baru 3 kali lipat agar jumlah pendaftaran pengguna baru di beranda semakin banyak guna memastikan seluruh dependensi operasional terakomodasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menyimpulkan bahwa pasar Indonesia sudah jenuh dan tidak ada lagi peluang pertumbuhan bisnis untuk kategori produk tersebut.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Fokus pada retensi dan habit moment; pengguna baru berhasil diakuisisi namun gagal menemukan core value pada penggunaan awal.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Mengganti metrik North Star menjadi jumlah total pendaftaran akun (vanity metric) agar grafik laporan terlihat selalu naik.",
                    "score": 2
                }
            ]
        },
        {
            "id": "pm-10",
            "question": "Klien korporat penting meminta penambahan 4 fitur kustom di tengah sprint yang sedang berjalan. Bagaimana PM mengelola scope creep ini?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghapus 4 fitur inti aplikasi yang sedang dibuat untuk digantikan dengan 4 fitur permintaan kustom dari klien korporat.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Langsung menyetujui seluruh permintaan tambahan fitur tersebut dan memaksa developer bekerja lembur tanpa mengubah jadwal rilis.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Menolak permintaan klien secara emosional dan membatalkan kontrak kerja sama bisnis dengan klien tersebut hari ini juga secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Evaluasi dampak delivery sprint aktif, tawarkan opsi trade-off pertukaran fitur, atau jadwalkan fitur baru pada sprint berikutnya.",
                    "score": 10
                }
            ]
        }
    ],
    "data-scientist": [
        {
            "id": "ds-1",
            "question": "Dalam pemodelan regresi linear ganda, dua variabel prediktor independen memiliki nilai korelasi Pearson sangat tinggi (r = 0.95). Masalah apa ini dan solusinya?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghapus seluruh variabel prediktor independen dan hanya menyisakan satu variabel target label di dalam persamaan model data secara menyeluruh di seluruh pipeline arsitektur sistem.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Mengabaikan multikolinearitas tersebut karena model regresi linear dianggap selalu kebal terhadap korelasi antar variabel.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Multikolinearitas parah; evaluasi Variance Inflation Factor (VIF), terapkan regularisasi Ridge/Lasso, atau reduksi dimensi PCA.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Mengalikan salah satu variabel dengan angka nol di dalam dataset agar korelasi matematikanya seketika berubah menjadi netral.",
                    "score": 1
                }
            ]
        },
        {
            "id": "ds-2",
            "question": "Perusahaan tidak dapat menjalankan A/B testing secara acak karena kendala etika dan regulasi privasi konsumen. Metode inferensi kausal ilmiah apa yang tepat?",
            "options": [
                {
                    "label": "A",
                    "text": "Gunakan metode kuasi-eksperimental: Difference-in-Differences (DiD), Propensity Score Matching (PSM), atau Regression Discontinuity.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Membandingkan nilai rata-rata metrik sebelum dan sesudah intervensi secara naif tanpa menggunakan kelompok kontrol pembanding.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Mengarang kelompok kontrol fiktif di software spreadsheet dengan mengisi angka-angka simulasi yang dibuat menyerupai data asli.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Menjalankan survei opini subjektif kepada staf internal kantor apakah program bisnis tersebut dianggap berhasil atau tidak.",
                    "score": 2
                }
            ]
        },
        {
            "id": "ds-3",
            "question": "Model klasifikasi biner deteksi penyakit langka menghasilkan akurasi 99.4%, namun saat diaudit gagal mendeteksi 80% pasien yang sakit. Mengapa hal ini terjadi?",
            "options": [
                {
                    "label": "A",
                    "text": "Dokter rumah sakit memberikan label diagnosa penyakit yang keliru pada sebagian besar rekam medis pasien di database.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Format tanggal pemeriksaan pasien di rumah sakit belum dikonversi ke standar zona waktu Greenwich Mean Time (GMT).",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Model machine learning kekurangan kapasitas memori komputer sehingga proses deteksi pada pasien sakit tidak sempat dihitung sesuai dengan rekomendasi panduan standar industri terbaru.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Class imbalance ekstrem; model memprediksi mayoritas kelas negatif sehingga metrik akurasi tinggi menipu, gunakan PR-AUC / Recall.",
                    "score": 10
                }
            ]
        },
        {
            "id": "ds-4",
            "question": "Model prediksi risiko churn nasabah bank mengalami penurunan drastis pada metrik F1-score setelah pemerintah merilis kebijakan suku bunga baru. Penyebab data?",
            "options": [
                {
                    "label": "A",
                    "text": "Kabel jaringan internet di pusat data server bank mengalami gangguan sinyal sehingga hasil kalkulasi prediksi model melambat.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Terjadi covariate shift dan concept drift; distribusi fitur keuangan dan hubungan kausal variabel target berubah pasca kebijakan makro.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Algoritma machine learning mengalami kerusakan logika internal dan perlu diinstal ulang software library Scikit-Learn dari awal secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Para nasabah bank sengaja mengubah perilaku transaksi mereka untuk menggagalkan hasil prediksi model machine learning bank.",
                    "score": 1
                }
            ]
        },
        {
            "id": "ds-5",
            "question": "Sistem rekomendasi e-commerce berbasis Collaborative Filtering gagal memberikan rekomendasi produk yang relevan kepada pengguna baru terdaftar. Masalah apa ini?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghapus sistem algoritma rekomendasi dan hanya menampilkan daftar produk secara acak tanpa aturan pengurutan apa pun.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Memberikan rekomendasi produk yang paling mahal di seluruh katalog barang dengan asumsi pengguna baru pasti menyukainya secara berkala dengan melibatkan seluruh perwakilan tim kerja.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Cold-start problem; mitigasi dengan hybrid recommendation berbasis konten (content-based), preferensi onboarding, dan produk populer.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menolak pendaftaran pengguna baru sampai mereka memiliki riwayat transaksi minimal 10 kali di toko offline perusahaan.",
                    "score": 2
                }
            ]
        },
        {
            "id": "ds-6",
            "question": "Saat melakukan segmentasi nasabah memakai K-Means Clustering, grafik inertia elbow curve tidak menunjukkan titik patahan siku yang jelas. Evaluasi penentuan K?",
            "options": [
                {
                    "label": "A",
                    "text": "Gunakan Silhouette Analysis, Davies-Bouldin Index, atau sesuaikan jumlah cluster dengan relevansi interpretasi domain bisnis nyata.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Mengabaikan hasil algoritma clustering dan membagi segmentasi nasabah murni berdasarkan alfabetis huruf depan nama nasabah.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Memilih jumlah cluster K = 1 agar seluruh nasabah perusahaan terkumpul rapi di dalam satu kelompok kategori yang seragam.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Membuat jumlah cluster sebanyak jumlah seluruh nasabah (K = N) agar setiap nasabah memiliki kelompok eksklusif sendiri.",
                    "score": 2
                }
            ]
        },
        {
            "id": "ds-7",
            "question": "Model Deep Neural Network berkinerja sangat tinggi ditolak oleh tim manajemen risiko perbankan karena regulasi menuntut transparansi keputusan kredit. Solusi?",
            "options": [
                {
                    "label": "A",
                    "text": "Menuntut tim kepatuhan perbankan dipecat karena dianggap menghalangi adopsi teknologi kecerdasan buatan mutakhir di industri dengan menerapkan framework audit korporat terintegrasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Mengganti model machine learning dengan sistem keputusan manual berdasarkan firasat subjektif analis kredit perbankan.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Menghapus seluruh fitur riwayat keuangan nasabah dari data training dan hanya menyisakan usia nasabah sebagai variabel input.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Gunakan model interpretable (Explainable AI) seperti Generalized Additive Models (GAMs) atau tools atribusi fitur SHAP/TreeSHAP.",
                    "score": 10
                }
            ]
        },
        {
            "id": "ds-8",
            "question": "Matriks fitur teks dokumen (TF-IDF) memiliki 150.000 dimensi kata unik dan menyebabkan kehabisan memori server saat training. Teknik reduksi dimensi?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengetik ulang seluruh dokumen teks secara manual untuk merangkum isinya menjadi maksimal satu kalimat pendek saja.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Gunakan Truncated SVD (Latent Semantic Analysis), embedding dimensi rendah terpadat, atau filter min_df / max_features selektif.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Menghapus 90% kata vokal dari seluruh dokumen teks bahasa Indonesia dengan asumsi huruf vokal tidak memiliki arti kata.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Memaksa server komputer memproses seluruh 150.000 dimensi fitur tanpa reduksi hingga server mengalami crash sistem berulang.",
                    "score": 1
                }
            ]
        },
        {
            "id": "ds-9",
            "question": "Model peramalan deret waktu (ARIMA) gagal memprediksi lonjakan penjualan tajam musiman tahunan saat periode hari raya Idulfitri. Kelemahan arsitektur?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghilangkan data penjualan periode hari raya Idulfitri dari dataset riwayat transaksi karena dianggap sebagai anomali bising guna memastikan seluruh dependensi operasional terakomodasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menghentikan proses peramalan bisnis dan menyuruh staf gudang memperkirakan persediaan barang murni berdasarkan intuisi.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Gunakan model musiman SARIMAX atau Prophet yang mendukung komponen kalender floating holiday, tren piecewise, dan regresi eksternal.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Mengasumsikan tanggal hari raya keagamaan selalu jatuh pada tanggal dan bulan masehi yang persis sama setiap tahunnya.",
                    "score": 2
                }
            ]
        },
        {
            "id": "ds-10",
            "question": "Dalam audit platform A/B testing, alokasi trafik 50:50 menghasilkan 48.200 sampel di variasi A dan 51.800 sampel di variasi B (Sample Ratio Mismatch). Respon?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengabaikan uji Sample Ratio Mismatch karena menganggap perbedaan beberapa ribu pengguna di internet adalah hal yang wajar.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Tetap menyimpulkan hasil pemenang A/B testing tersebut dengan dalih bahwa variasi B memiliki jumlah sampel data yang lebih banyak.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Menghapus 3.600 sampel data dari variasi B secara acak agar jumlah kedua kelompok pengujian menjadi seimbang 48.200 sampel secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Terjadi SRM (uji Chi-Square p < 0.001); batalkan hasil pengujian, jangan ambil kesimpulan bisnis, dan audit bug pengalihan trafik.",
                    "score": 10
                }
            ]
        }
    ],
    "hr-business-partner": [
        {
            "id": "hrbp-1",
            "question": "Tingkat pengunduran diri (turnover) di divisi engineering melonjak 38% dalam 6 bulan terakhir dengan keluhan gaya kepemimpinan manajer yang toxic. Aksi HRBP?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengabaikan keluhan tersebut dan mengancam karyawan yang mengundurkan diri dengan pemotongan sisa gaji serta penahanan dokumen.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Memasang meja biliar dan camilan gratis di kantor dengan asumsi masalah budaya kerja kepemimpinan akan selesai dengan sendirinya.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Gelar exit interview objektif terstruktur, lakukan penilaian kepemimpinan 360-degree, dan susun intervensi rencana manajemen.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Langsung memecat seluruh manajer divisi engineering secara sepihak hari ini tanpa melalui proses investigasi data pembuktian.",
                    "score": 1
                }
            ]
        },
        {
            "id": "hrbp-2",
            "question": "Seorang tenaga penjualan terbaik (top performer) sering melontarkan komentar merendahkan dan mempermalukan rekan junior dalam rapat umum. Penanganan HRBP?",
            "options": [
                {
                    "label": "A",
                    "text": "Tegakkan nilai budaya: lakukan sesi feedback korektif formal, buat rencana perbaikan perilaku terukur, dan beri konsekuensi tegas.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Membiarkan perilaku toxic tersebut terus berlangsung karena kontribusi omzet penjualan yang bersangkutan sangat besar bagi kantor.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Memindahkan seluruh karyawan junior yang menjadi korban ke divisi lain agar tidak pernah bertemu lagi dengan tenaga penjualan itu.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Memarahi karyawan tersebut secara emosional di depan seluruh staf kantor saat acara makan siang bersama di kafetaria.",
                    "score": 2
                }
            ]
        },
        {
            "id": "hrbp-3",
            "question": "Hasil penilaian kinerja tahunan menunjukkan 92% karyawan dinilai dengan skor \"Rata-Rata/Memuaskan\" oleh para manajer (Central Tendency Bias). Evaluasi sistem?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghapus seluruh sistem penilaian evaluasi kinerja karyawan selamanya dan memberikan bonus tahunan dengan nominal sama rata.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Menyerahkan penentuan nilai evaluasi kinerja karyawan sepenuhnya kepada manajer tanpa standar rubrik penilaian objektif.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Mewajibkan kurva distribusi paksa (forced ranking) secara kaku di mana 20% karyawan berkinerja baik wajib diberi nilai buruk sesuai dengan rekomendasi panduan standar industri terbaru.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Terapkan kalibrasi kinerja lintas departemen, panduan rubrik kompetensi berbasis perilaku nyata, dan pelatihan manajer penilai.",
                    "score": 10
                }
            ]
        },
        {
            "id": "hrbp-4",
            "question": "Karyawan lama yang berprestasi mengetahui bahwa pegawai baru dengan posisi setara direkrut dengan gaji 30% lebih tinggi karena inflasi pasar. Solusi kompensasi?",
            "options": [
                {
                    "label": "A",
                    "text": "Mengancam memecat karyawan lama tersebut atas tuduhan membocorkan rahasia informasi besaran nominal gaji di lingkungan kantor.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Lakukan audit kesetaraan gaji internal (pay equity review), sesuaikan rentang gaji berbasis benchmark pasar riil dan merit-based.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Menolak melakukan penyesuaian gaji dan menyuruh karyawan lama bekerja lebih keras lagi jika ingin penghasilannya bertambah secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Memotong gaji karyawan baru sebesar 30% secara sepihak agar nominal kompensasinya sama persis dengan gaji staf lama.",
                    "score": 1
                }
            ]
        },
        {
            "id": "hrbp-5",
            "question": "Skor survei keterikatan karyawan (employee engagement) turun tajam pasca penerapan kebijakan bekerja hybrid (3 hari WFO, 2 hari WFH). Langkah HRBP?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghapus survei keterikatan karyawan tahunan dari program kerja HR agar hasil evaluasi kepuasan tidak terlihat oleh direksi.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Mewajibkan seluruh karyawan kembali bekerja 100% dari kantor (WFO penuh) 6 hari seminggu dengan memasang kamera pengawas di meja kerja.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Gelar focus group discussion untuk membedah beban koordinasi, perjelas tujuan kehadiran tatap muka, dan evaluasi fleksibilitas tim.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Mengabaikan hasil survei tersebut dan menganggap bahwa karyawan yang mengeluhkan kebijakan kantor hanyalah pegawai pemalas.",
                    "score": 2
                }
            ]
        },
        {
            "id": "hrbp-6",
            "question": "Head of Data Science mendadak mengundurkan diri dan departemen terancam lumpuh karena ketiadaan penerus yang siap menggantikan. Manajemen suksesi?",
            "options": [
                {
                    "label": "A",
                    "text": "Tunjuk pelaksana tugas sementara (interim lead), audit Nine-Box Talent Matrix, dan percepat kesiapan suksesor kunci melalui mentoring.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Membubarkan divisi Data Science secara mendadak dan membagikan tugas analisis data kepada staf administrasi umum kantor.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Memaksa Head of Data Science yang mengundurkan diri tetap bekerja selamanya dengan mengunci akses pintu keluar kantor perusahaan.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Merekrut kandidat acak dari luar dalam waktu 24 jam tanpa melalui proses uji kompetensi teknis dan wawancara budaya kerja.",
                    "score": 2
                }
            ]
        },
        {
            "id": "hrbp-7",
            "question": "Konflik berkepanjangan antara Divisi Product dan Divisi Sales merusak moral kerja: Sales menyalahkan fitur lambat, Product menyalahkan janji over-promise. Mediasi?",
            "options": [
                {
                    "label": "A",
                    "text": "Memihak kepada salah satu divisi yang memiliki pimpinan lebih senior dan menginstruksikan divisi lain untuk menuruti perintah dengan menerapkan framework audit korporat terintegrasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Melarang staf Divisi Product dan Divisi Sales berbicara satu sama lain selama berada di area lingkungan gedung kantor.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Membiarkan perseteruan antar divisi terus memanas dengan harapan tercipta kompetisi kerja yang saling menjatuhkan antar tim.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Fasilitasi sesi rekonsiliasi objektif, selaraskan Key Performance Indicators (Shared OKRs), dan bangun forum komunikasi rutin berkala.",
                    "score": 10
                }
            ]
        },
        {
            "id": "hrbp-8",
            "question": "Manajer divisi mempromosikan staf favorit yang sudah bekerja 7 tahun meskipun kinerjanya biasa saja, mengabaikan talenta muda berkinerja luar biasa. Intervensi?",
            "options": [
                {
                    "label": "A",
                    "text": "Membatalkan seluruh program promosi jabatan di seluruh departemen perusahaan selama 2 tahun ke depan tanpa penjelasan.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Tegakkan promosi berbasis kompetensi teruji dan potensi kepemimpinan (Nine-Box Grid), hindari bias senioritas masa kerja murni.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Menyetujui promosi tersebut secara otomatis demi menjaga perasaan senioritas tanpa mengevaluasi kesiapan kepemimpinan riil.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Menghapus jabatan manajer tersebut dan menggantikannya dengan sistem pemungutan suara popularitas di media sosial kantor.",
                    "score": 1
                }
            ]
        },
        {
            "id": "hrbp-9",
            "question": "Perusahaan harus melakukan restrukturisasi organisasi dan pengurangan 15% karyawan akibat pergeseran strategi bisnis. Eksekusi humanis HRBP?",
            "options": [
                {
                    "label": "A",
                    "text": "Menyebarkan kabar pemutusan hubungan kerja melalui pesan berantai WhatsApp anonim tanpa mengadakan sesi pertemuan resmi guna memastikan seluruh dependensi operasional terakomodasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menunda keputusan perampingan organisasi selama bertahun-tahun hingga saldo kas kas perusahaan habis tak bersisa sama sekali.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Proses seleksi berbasis kriteria bisnis objektif, transparansi komunikasi, paket pesangon sesuai regulasi, dan dukungan outplacement karir.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Mematikan akses email dan kartu masuk gedung karyawan terdampak secara tiba-tiba tanpa pemberitahuan atau hak kompensasi.",
                    "score": 2
                }
            ]
        },
        {
            "id": "hrbp-10",
            "question": "Selama 3 bulan periode rilis proyek besar, tim operasional menunjukkan gejala kelelahan ekstrem (burnout), absensi sakit melonjak, dan produktivitas anjlok. Mitigasi?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghilangkan seluruh batas waktu proyek kerja dan membiarkan produk tidak pernah selesai dirilis ke pasar konsumen selamanya.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Menambah jam kerja lembur wajib di akhir pekan dengan memberikan iming-iming hadiah kopi instan tambahan di dapur kantor.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Memberikan surat peringatan disiplin kepada karyawan yang sakit dengan asumsi mereka sengaja mencari alasan untuk tidak kerja secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Tinjau ulang alokasi beban kerja, berikan cuti pemulihan (wellness days), sediakan konseling EAP, dan audit estimasi kapasitas kerja.",
                    "score": 10
                }
            ]
        }
    ],
    "startup-founder": [
        {
            "id": "sf-1",
            "question": "Sisa kas operasional startup (runway) tinggal 3.5 bulan lagi, sementara proses penggalangan dana modal ventura (fundraising) melambat drastis. Keputusan darurat CEO?",
            "options": [
                {
                    "label": "A",
                    "text": "Menaikkan anggaran pemasaran 3x lipat dan menyewa kantor mewah baru dengan harapan calon investor terpukau saat kunjungan secara menyeluruh di seluruh pipeline arsitektur sistem.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Berpura-pura saldo kas masih berlimpah dan membiarkan pengeluaran kantor berjalan normal sampai saldo bank habis tak bersisa.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Pangkas burn rate non-esensial secara tegas, prioritaskan monetisasi aliran kas jangka pendek, dan ajukan bridge loan investor eksisting.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menutup perusahaan secara mendadak hari ini juga tanpa mengabari tim atau investor dan membawa sisa kas yang masih tersisa.",
                    "score": 1
                }
            ]
        },
        {
            "id": "sf-2",
            "question": "Salah satu co-founder yang memegang 30% saham memutuskan mundur setelah 4 bulan berjalan, namun di awal tidak ada perjanjian vesting schedule tertulis. Mitigasi?",
            "options": [
                {
                    "label": "A",
                    "text": "Negosiasi restrukturisasi buyback ekuitas berbasis kontribusi riil, penyusunan Founder Agreement formal, dan mediasi penasihat hukum.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Membiarkan co-founder yang keluar membawa 30% saham utuh tanpa kontribusi masa depan sehingga merusak struktur cap table.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Membubarkan badan hukum perseroan terbatas (PT) dan menghapus seluruh repositori kode produk yang sudah dibangun bersama.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Membuat laporan pidana kepolisian atas tuduhan melanggar kesepakatan lisan pertemanan saat mendirikan startup bersama.",
                    "score": 2
                }
            ]
        },
        {
            "id": "sf-3",
            "question": "Klien korporat pertama bersedia membayar kontrak bernilai besar, namun menuntut fitur kustom yang melenceng jauh dari visi roadmap produk utama. Keputusan founder?",
            "options": [
                {
                    "label": "A",
                    "text": "Menerima pembayaran kontrak klien tersebut namun secara sengaja tidak pernah mengerjakan fitur kustom yang dijanjikan.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Menolak mentah-mentah penawaran klien dengan kata-kata kasar dalam rapat karena merasa visi produknya tidak dihargai mitra.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Menghentikan seluruh roadmap produk inti startup demi menjadi agensi penyedia jasa kustom eksklusif untuk satu klien korporat itu sesuai dengan rekomendasi panduan standar industri terbaru.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Evaluasi apakah kustomisasi selaras dengan kebutuhan pasar luas; tolak menjadi software house jika fitur tidak scalable bagi user lain.",
                    "score": 10
                }
            ]
        },
        {
            "id": "sf-4",
            "question": "Biaya akuisisi pengguna baru (CAC) mencapai Rp 180.000, sementara nilai Customer Lifetime Value (LTV) hanya tercatat Rp 120.000 (LTV:CAC < 1.0). Solusi unit economics?",
            "options": [
                {
                    "label": "A",
                    "text": "Menggelontorkan modal pinjaman bank berbunga tinggi untuk memperbesar volume iklan demi menutupi defisit margin transaksi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Perbaiki retensi organik produk, optimasi bauran kanal pemasaran non-berbayar, tingkatkan harga, atau kembangkan strategi ekspansi up-sell.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Menghentikan seluruh aktivitas operasional bisnis secara total dan menunggu ada investor malaikat yang bersedia membeli startup secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Mengubah angka pelaporan nilai LTV menjadi Rp 500.000 di slide presentasi pitch deck investor agar unit economics terlihat sehat.",
                    "score": 1
                }
            ]
        },
        {
            "id": "sf-5",
            "question": "Kompetitor besar bermodal triliunan rupiah meluncurkan produk tiruan serupa dengan strategi bakar uang subsidi harga sangat agresif. Respon strategis founder?",
            "options": [
                {
                    "label": "A",
                    "text": "Membuat petisi boikot publik di media sosial menuduh kompetitor berbuat curang tanpa memperbaiki kualitas produk sendiri.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Ikut membakar sisa kas operasional startup untuk menandingi subsidi harga kompetitor hingga kehabisan uang dalam 2 minggu secara berkala dengan melibatkan seluruh perwakilan tim kerja.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Fokus pada keunggulan vertikal niche yang spesifik, kecepatan inovasi produk, kedekatan komunitas pengguna, dan loyalitas layanan.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Menyerah dan menutup bisnis seketika begitu melihat berita peluncuran produk kompetitor di media portal berita online.",
                    "score": 2
                }
            ]
        },
        {
            "id": "sf-6",
            "question": "Ketika jumlah staf bertambah dari 10 menjadi 60 karyawan, budaya kerja startup yang tadinya lincah berubah menjadi birokratis dan silo antar divisi. Perbaikan organisasi?",
            "options": [
                {
                    "label": "A",
                    "text": "Dokumentasikan nilai inti budaya perusahaan, definisikan alur akuntabilitas kepemilikan mandiri, dan sederhanakan proses hierarki.",
                    "score": 10
                },
                {
                    "label": "B",
                    "text": "Mengabaikan pergeseran budaya kerja tersebut karena menganggap birokrasi kaku adalah tanda keberhasilan sebuah perusahaan.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Mengharuskan founder menyetujui setiap keputusan pengeluaran sekecil apa pun di kantor agar kendali operasional tetap mutlak.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Memecat 40 karyawan baru tersebut dan kembali bekerja hanya dengan 10 staf awal agar suasana kerja terasa akrab kembali.",
                    "score": 2
                }
            ]
        },
        {
            "id": "sf-7",
            "question": "Data metrik retensi menunjukkan hanya 8% pengguna umum yang bertahan, namun segmen komunitas desainer interior menunjukkan retensi 85% dan bersedia membayar. Keputusan pivot?",
            "options": [
                {
                    "label": "A",
                    "text": "Memaksa mempertahankan target audiens pasar umum yang tidak membutuhkan produk demi ambisi menjadi aplikasi sejuta umat dengan menerapkan framework audit korporat terintegrasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Menghapus segmen desainer interior tersebut dari aplikasi agar seluruh basis pengguna memiliki demografi yang seragam.",
                    "score": 2
                },
                {
                    "label": "C",
                    "text": "Menghentikan pengembangan software dan mengganti model bisnis menjadi toko offline penjualan perabotan rumah tangga fisik.",
                    "score": 1
                },
                {
                    "label": "D",
                    "text": "Lakukan pivot terarah: fokuskan positioning produk, pemasaran, dan fitur khusus untuk melayani segmen desainer interior yang terbukti PMF.",
                    "score": 10
                }
            ]
        },
        {
            "id": "sf-8",
            "question": "Penjualan gross merchandise value (GMV) tumbuh 30% per bulan, namun margin laba kotor (gross margin) negatif akibat biaya fulfillment logistik. Tindakan CEO?",
            "options": [
                {
                    "label": "A",
                    "text": "Menghilangkan layanan logistik pengiriman barang dan mewajibkan pembeli mengambil pesanan secara mandiri di kantor startup.",
                    "score": 2
                },
                {
                    "label": "B",
                    "text": "Audit struktur biaya variabel unit economics, negosiasikan kontrak rekanan logistik skala volume, dan sesuaikan ambang batas subsidi ongkir.",
                    "score": 10
                },
                {
                    "label": "C",
                    "text": "Terus menggenjot kenaikan omzet GMV setinggi-tingginya dengan mengabaikan margin negatif dengan harapan keajaiban skala ekonomi.",
                    "score": 4
                },
                {
                    "label": "D",
                    "text": "Memalsukan laporan keuangan laba rugi perusahaan kepada investor dengan menyembunyikan pos pengeluaran biaya logistik barang.",
                    "score": 1
                }
            ]
        },
        {
            "id": "sf-9",
            "question": "Dalam rapat dewan komisaris (Board of Directors), perwakilan investor menuntut ekspansi regional agresif ke Vietnam, sementara co-founder ingin fokus mendominasi pasar domestik. Resolusi?",
            "options": [
                {
                    "label": "A",
                    "text": "Langsung menuruti desakan ekspansi ke luar negeri tanpa riset kesiapan pasar demi menghindari konflik perdebatan dengan investor guna memastikan seluruh dependensi operasional terakomodasi.",
                    "score": 4
                },
                {
                    "label": "B",
                    "text": "Membagi kas perusahaan menjadi dua bagian yang sama besar untuk mendanai kedua rencana ekspansi yang saling bertentangan itu.",
                    "score": 1
                },
                {
                    "label": "C",
                    "text": "Sajikan analisis komparatif terukur: kesiapan kapabilitas modal, regulasi lokal, unit economics domestik, dan susun kriteria gerbang pasar.",
                    "score": 10
                },
                {
                    "label": "D",
                    "text": "Mengusir perwakilan investor dari ruang rapat dewan komisaris dan menolak berkomunikasi lagi dengan seluruh pemegang saham.",
                    "score": 2
                }
            ]
        },
        {
            "id": "sf-10",
            "question": "Mantan software engineer kontraktor mengklaim kepemilikan hak cipta atas arsitektur kode inti produk tepat saat startup akan menandatangani term sheet pendanaan Seri A. Mitigasi legal?",
            "options": [
                {
                    "label": "A",
                    "text": "Membatalkan seluruh rencana pendanaan Seri A perusahaan dan menutup bisnis startup karena ketakutan menghadapi isu legalitas.",
                    "score": 1
                },
                {
                    "label": "B",
                    "text": "Mengabaikan klaim sengketa hak cipta tersebut dan berharap calon investor modal ventura tidak melakukan proses legal due diligence.",
                    "score": 4
                },
                {
                    "label": "C",
                    "text": "Menulis ulang seluruh arsitektur kode software aplikasi dari awal dalam waktu 24 jam untuk menghindari klaim mantan kontraktor secara bertahap dalam jangka pendek.",
                    "score": 2
                },
                {
                    "label": "D",
                    "text": "Lakukan audit kontrak IP Assignment terdahulu, tempuh negosiasi penyelesaian klausul legal resmi (settlement), dan perbaiki kepemilikan aset.",
                    "score": 10
                }
            ]
        }
    ]
};
