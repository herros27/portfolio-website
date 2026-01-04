# Dynamic Portfolio Website & CMS



Website portofolio full-stack yang dilengkapi dengan **Admin Dashboard (CMS)** untuk mengelola konten secara dinamis tanpa perlu mengubah kode. Dibangun dengan teknologi modern seperti **Next.js 15**, **Prisma**, **PostgreSQL**, dan **NextAuth**.## 🚀 Fitur Utama### 🌟 Public Frontend* **Desain Modern & Responsif**: Tampilan profesional dengan animasi halus (Framer Motion & Magic UI).* **Bagian Dinamis**: Data Projects, Experience, Certificates, dan Skills diambil langsung dari database.* **Fitur Kontak**: Formulir kontak fungsional yang terintegrasi dengan email (Resend).* **SEO Optimized**: Metadata dinamis untuk setiap halaman.### 🛡️ Admin Dashboard (CMS)* **Manajemen Konten Lengkap (CRUD)**:    * **Profile**: Update bio, foto, CV, dan sosial media.    * **Projects**: Tambah/Edit portofolio proyek dengan upload gambar (Cloudinary).    * **Experience**: Kelola riwayat pekerjaan dan pendidikan.    * **Certificates**: Showcase sertifikat dan pencapaian.    * **Skills**: Atur daftar keahlian teknis.* **Autentikasi Aman**: Login admin menggunakan NextAuth v5.* **Audit Logs**: Melacak setiap perubahan data yang terjadi di sistem.* **Pengaturan Visibilitas**: Sembunyikan/tampilkan bagian tertentu (misal: Skills atau Projects) dengan satu klik.* **Statistik Real-time**: Ringkasan jumlah data di dashboard utama.## 🛠️ Teknologi yang Digunakan* **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)* **Database**: [PostgreSQL](https://www.postgresql.org/)* **ORM**: [Prisma](https://www.prisma.io/)* **Authentication**: [NextAuth.js v5 (Auth.js)](https://authjs.dev/)* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)* **Image Storage**: [Cloudinary](https://cloudinary.com/)* **Validation**: [Zod](https://zod.dev/) & React Hook Form* **Email Service**: [Resend](https://resend.com/)* **Deployment**: Vercel (Frontend) & Supabase/Neon/Railway (Database)## 📋 Prasyarat* [Node.js](https://nodejs.org/) (Versi 20+ direkomendasikan)* [Docker Desktop](https://www.docker.com/) (Untuk menjalankan database lokal)* Akun [Cloudinary](https://cloudinary.com/) (Untuk upload gambar)* Akun [Resend](https://resend.com/) (Untuk fitur email)## 📦 Panduan Instalasi & Setup



Ikuti langkah-langkah ini untuk menjalankan proyek di komputer lokal:### 1. Clone Repository```bash

git clone [https://github.com/username-anda/portfolio-website-dinamis.git](https://github.com/username-anda/portfolio-website-dinamis.git)

cd portfolio-website-dinamis

2. Instal Dependencies

Bash



npm install

3. Konfigurasi Environment Variables

Salin file .env.example menjadi .env:

Bash



cp .env.example .env

Isi variabel berikut di file .env:

Cuplikan kode



# Database (Gunakan string koneksi lokal atau cloud)

DATABASE_URL="postgresql://admin_portfolio:password_rahasia_123@localhost:5434/portfolio_cms?schema=public"



# Auth (Generate string acak untuk secret: openssl rand -base64 32)

AUTH_SECRET="rahasia_super_aman"

AUTH_URL="http://localhost:3000"



# Cloudinary (Dari dashboard Cloudinary Anda)

CLOUDINARY_CLOUD_NAME="xxx"

CLOUDINARY_API_KEY="xxx"

CLOUDINARY_API_SECRET="xxx"



# Resend (Untuk kirim email)

RESEND_API_KEY="re_xxx"

4. Jalankan Database Lokal (via Docker)

Proyek ini menyediakan file docker-compose.yml untuk setup PostgreSQL instan.

(Catatan: Port diset ke 5434 untuk menghindari konflik dengan postgres default).

Bash



docker-compose up -d

5. Setup Database Schema

Push schema Prisma ke database dan jalankan seeding data awal (untuk membuat akun admin default).

Bash



# Push schema ke DB

npm run db:push# Generate Prisma Client

npm run db:generate# Isi data awal (Seed)

npm run db:seed

6. Jalankan Server Development

Bash



npm run dev

Buka http://localhost:3000 di browser.

🔐 Akses Admin Panel

Buka http://localhost:3000/admin/login.

Gunakan kredensial default (jika menggunakan seed default):

Email: admin@example.com (cek prisma/seed.ts untuk memastikannya)

Password: (sesuai konfigurasi di seed)

📂 Struktur Folder

Plaintext



.

├── actions/             # Server Actions (Mutasi data backend)

├── app/

│   ├── (main)/          # Halaman publik (Home, dll)

│   ├── admin/           # Halaman Admin Dashboard (Protected)

│   ├── api/             # API Routes (Auth, Upload)

│   └── ...

├── components/

│   ├── admin/           # Komponen UI khusus Admin

│   ├── ui/              # Komponen UI Shared (Button, Card, dll)

│   └── ...

├── lib/                 # Utilitas (Auth config, DB connection)

├── prisma/              # Schema database & Seed script

└── public/              # Aset statis

📜 Skrip Tersedia

npm run dev: Menjalankan server development dengan Turbopack.

npm run db:push: Sinkronisasi schema Prisma ke database (bagus untuk dev).

npm run db:studio: Membuka GUI Prisma Studio untuk melihat isi database.

npm run build: Build proyek untuk production.

📄 Lisensi

Proyek ini dilisensikan di bawah MIT License.

Dibuat dengan ❤️ oleh Kemas Khairunsyah
