# Gapless

**Platform konseling karier & analisis skill-gap berbasis AI untuk mahasiswa Indonesia.**

Gapless membantu mahasiswa menemukan jalur karier yang sesuai, memahami kesenjangan skill (skill-gap) antara kemampuan mereka saat ini dengan kebutuhan industri, lalu membangun roadmap belajar yang personal — semuanya didukung oleh AI dan data referensi industri resmi.

🔗 **Live:** [gapless.id](https://www.gapless.id)
🏆 **Dibangun untuk:** PIDI Digdaya x Hackathon 2026 (disponsori Bank Indonesia & OJK)

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Status](https://img.shields.io/badge/status-active_development-yellow)

---

## 📋 Daftar Isi

- [Masalah yang Diselesaikan](#masalah-yang-diselesaikan)
- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Memulai (Development Lokal)](#memulai-development-lokal)
- [Environment Variables](#environment-variables)
- [Struktur Project](#struktur-project)
- [Deployment](#deployment)
- [Konteks Hackathon](#konteks-hackathon)
- [Tim](#tim)

---

## Masalah yang Diselesaikan

Banyak mahasiswa Indonesia bingung menentukan arah karier, atau sudah punya target karier tapi tidak tahu persis skill apa yang masih kurang untuk mencapainya. Gapless menjawab dua situasi ini lewat dua jalur:

- **Belum Tahu Minat** — asesmen kepribadian (15 soal) memetakan pengguna ke salah satu dari 4 archetype (*The Thinker, The Creator, The Connector, The Builder*), lalu merekomendasikan jalur karier yang sesuai.
- **Sudah Tahu Minat** — pengguna memilih karier sendiri dan langsung masuk ke tahap analisis.

Keduanya berlanjut ke **studi kasus** (mengukur kesiapan praktis per role) dan **analisis skill-gap** yang membandingkan level skill pengguna saat ini dengan level yang dibutuhkan industri, lalu menghasilkan **roadmap belajar** yang personal.

## Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🧭 **Dua Jalur Asesmen** | Eksplorasi minat (archetype) atau langsung ke karier pilihan sendiri |
| 📊 **Analisis Skill-Gap** | Radar perbandingan skill saat ini vs. yang dibutuhkan, dengan referensi data [O\*NET](https://www.onetonline.org/) |
| 🗺️ **Learning Roadmap** | Dua jalur belajar — **Hard Skill** (kursus mitra + proyek praktik) dan **Soft Skill** (misi berbasis skenario) |
| 🎯 **Misi Soft Skill** | Latihan terstruktur per kompetensi, dengan feedback setelah pengerjaan |
| 📌 **Rekomendasi Kegiatan** | Organisasi, lomba, dan volunteer yang relevan dengan gap skill pengguna |
| 🪪 **Skill Passport** | Profil ringkas berisi skor, bukti pencapaian (sertifikat), dan tren perkembangan |
| 💳 **Model Berjenjang** | Akses gratis untuk fitur dasar, **Gapless Pro** (langganan) dan **Laporan Gap Mendalam** (sekali bayar per karier) untuk analisis lebih lanjut |

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router) + TypeScript
- **Autentikasi:** [NextAuth.js](https://next-auth.js.org/) (Google OAuth)
- **Database:** [Neon](https://neon.tech/) (Serverless Postgres) + [Drizzle ORM](https://orm.drizzle.team/)
- **AI:** [Vercel AI SDK](https://sdk.vercel.ai/) dengan DeepSeek V4 Flash untuk generasi roadmap, di-*ground*-kan ke data [O\*NET](https://www.onetonline.org/) lokal untuk mengurangi halusinasi
- **Hosting:** [Vercel](https://vercel.com/) (frontend + API routes serverless dalam satu deployment)
- **Domain:** gapless.id

Detail arsitektur lebih lengkap ada di [`ARCHITECTURE.md`](./ARCHITECTURE.md). Spesifikasi produk ada di [`PRD.md`](./PRD.md).

## Memulai (Development Lokal)

```bash
# 1. Clone repo
git clone https://github.com/nauvaldzakwanbaihaqi/gapless-v2.git
cd gapless-v2

# 2. Install dependencies
npm install

# 3. Siapkan environment variables
cp .env.example .env
# isi nilai sesuai bagian Environment Variables di bawah

# 4. Jalankan migrasi database
npm run db:migrate
# atau: npx drizzle-kit migrate

# 5. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Environment Variables

Buat file `.env` di root project berisi variabel berikut (nilai asli tidak disertakan di repo ini):

```bash
# Database
DATABASE_URL=

# NextAuth
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# AI Provider
DEEPSEEK_API_KEY=
GEMINI_API_KEY=

# Lainnya (storage, payment, dsb — sesuaikan dengan yang dipakai)
```

> ⚠️ Jangan pernah commit file `.env` yang berisi nilai asli ke repository.

## Struktur Project

```
gapless-v2/
├── src/
│   ├── app/              # Next.js App Router — halaman & API routes
│   ├── components/       # Komponen React, dikelompokkan per fitur
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Business logic, validators, helper API
│   └── contexts/         # React context providers
├── drizzle/              # Schema & migrasi database
├── scripts/              # Script utilitas (seed data, dsb)
├── public/                # Aset statis
└── ARCHITECTURE.md        # Dokumentasi arsitektur lengkap
```

## Deployment

Project ini di-deploy otomatis ke [Vercel](https://vercel.com/) setiap ada push ke branch `main`. Frontend dan API routes berjalan dalam satu deployment (Next.js API Routes sebagai Vercel Serverless Functions) — tidak ada backend terpisah.

## Konteks Hackathon

Gapless dikembangkan untuk **PIDI Digdaya x Hackathon 2026**, disponsori oleh **Bank Indonesia** dan **Otoritas Jasa Keuangan (OJK)**, dengan fokus menjawab isu kesenjangan skill dan kesiapan kerja mahasiswa Indonesia.

## Tim

| Nama | Peran |
|---|---|
| *(isi nama & peran anggota tim)* | |

---

<p align="center">
  <sub>© 2026 Gapless. Dibuat untuk mahasiswa Indonesia.</sub>
</p>
