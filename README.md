# Portfolio Website

Website portofolio pribadi yang modern dan interaktif, dibangun menggunakan **Next.js**, **TypeScript**, dan **Tailwind CSS**. Proyek ini dirancang untuk menampilkan profil, keahlian, pengalaman, dan proyek-proyek yang telah dikerjakan dengan tampilan yang estetis dan performa yang cepat.

## 🚀 Fitur Utama

* **Desain Responsif**: Tampilan yang optimal di berbagai perangkat (Desktop, Tablet, Mobile).
* **Mode Gelap & Terang**: Mendukung peralihan tema (Dark/Light Mode) yang persisten.
* **Animasi Halus**: Menggunakan Framer Motion dan komponen UI modern (Magic UI) untuk transisi dan interaksi yang menarik.
* **Bagian Lengkap**:
    * **Intro**: Bagian hero dengan efek ketikan dan animasi.
    * **About**: Deskripsi diri singkat.
    * **Skills**: Daftar kemampuan teknis dengan animasi visual.
    * **Experience**: Timeline pengalaman kerja/organisasi.
    * **Projects**: Galeri proyek unggulan.
    * **Contact**: Formulir kontak yang fungsional (mengirim email langsung).
* **Server Actions**: Pengiriman email yang aman menggunakan Next.js Server Actions dan Resend.
* **SEO Friendly**: Struktur kode yang dioptimalkan untuk mesin pencari.

## 🛠️ Teknologi yang Digunakan

* **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
* **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Animasi**: [Framer Motion](https://www.framer.com/motion/)
* **UI Components**: Magic UI, Aceternity UI (beberapa komponen kustom)
* **Email**: [Resend](https://resend.com/) & React Email
* **Deployment**: Vercel (Rekomendasi)

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

* [Node.js](https://nodejs.org/) (Versi 18.17 atau lebih baru)
* npm, yarn, pnpm, atau bun (Package manager)

## 📦 Instalasi & Cara Menjalankan

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal Anda:

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/username-anda/portfolio-website.git](https://github.com/username-anda/portfolio-website.git)
    cd portfolio-website
    ```

2.  **Instal Dependencies**
    ```bash
    npm install
    # atau
    yarn install
    ```

3.  **Konfigurasi Environment Variables**
    Buat file `.env` di root direktori proyek. Anda memerlukan API Key dari [Resend](https://resend.com) untuk fitur form kontak.
    ```env
    RESEND_API_KEY=re_123456789...
    ```

4.  **Jalankan Development Server**
    ```bash
    npm run dev
    ```

5.  **Buka di Browser**
    Buka [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

## 📂 Susunan Project

Berikut adalah gambaran umum struktur folder proyek ini:

```text
.
├── actions/             # Server actions (logika backend, misal: kirim email)
│   └── sendEmail.ts
├── app/                 # Next.js App Router (Halaman utama dan layout)
│   ├── favicon.ico
│   ├── globals.css      # CSS Global & Tailwind directives
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Halaman utama (Home)
├── components/          # Komponen UI Reusable
│   ├── magicui/         # Komponen khusus animasi
│   ├── ui/              # Komponen UI dasar (Button, Card, dll)
│   ├── about.tsx
│   ├── contact.tsx
│   ├── experience.tsx
│   ├── header.tsx
│   ├── intro.tsx
│   ├── projects.tsx
│   └── skills.tsx
├── context/             # React Context (misal: Theme Context)
├── lib/                 # Utilitas dan Data statis
│   ├── data.ts          # <-- EDIT DATA ANDA DI SINI
│   ├── types.ts
│   └── utils.ts
├── public/              # Aset statis (Gambar, PDF CV, dll)
└── ...config files      # (tailwind.config, next.config, dll)
