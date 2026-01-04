# Dynamic Portfolio Website & CMS

Website portofolio **full-stack modern** yang dilengkapi dengan **Admin Dashboard (CMS)**.
Dibangun untuk mengelola konten seperti **Projects, Experience, Certificates, dan Skills** secara dinamis **tanpa mengubah kode**, menggunakan **Next.js 15**, **Prisma**, dan **PostgreSQL**.

---

## 🚀 Fitur Utama

### 🌟 Public Frontend

* **Desain Interaktif**
  Dibangun dengan **Tailwind CSS v4**, animasi halus menggunakan **Framer Motion** dan **Magic UI**.
* **Konten Dinamis**
  Data Projects, Experience, Certificates, dan Skills diambil langsung dari database.
* **Form Kontak**
  Integrasi email menggunakan **Resend**.
* **SEO Optimized**
  Metadata dinamis untuk setiap halaman (SEO-friendly).

---

### 🛡️ Admin Dashboard (CMS)

* **Manajemen Konten (CRUD)**

  * **Profile**: Edit bio, foto profil, dan link sosial media
  * **Projects**: Tambah/Edit portofolio + upload gambar (Cloudinary)
  * **Experience**: Kelola riwayat pekerjaan/pendidikan (Timeline)
  * **Certificates**: Upload & kelola sertifikat
  * **Skills**: Tambah, edit, dan atur urutan skill
* **Autentikasi & Keamanan**
  Menggunakan **Auth.js (NextAuth v5)**.
* **Audit Logs**
  Mencatat semua aktivitas perubahan data.
* **Pengaturan Website**
  Kontrol visibilitas setiap section secara real-time.

---

## 🛠️ Teknologi yang Digunakan

* **Framework**: Next.js 15 (App Router)
* **Language**: TypeScript
* **Database**: PostgreSQL
* **ORM**: Prisma
* **Styling & Animation**: Tailwind CSS v4, Framer Motion, Magic UI
* **Authentication**: Auth.js (NextAuth v5)
* **Storage**: Cloudinary
* **Email Service**: Resend

---

## 📋 Prasyarat

Pastikan Anda telah menginstal:

* Node.js **v18.17+** atau **v20+**
* Docker Desktop (untuk database lokal)
* Akun **Cloudinary** dan **Resend** (API Key)

---

## 📦 Panduan Instalasi

### 1️⃣ Clone Repository

```bash
git clone https://github.com/username-anda/portfolio-website-dinamis.git
cd portfolio-website-dinamis
```

---

### 2️⃣ Instal Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Isi konfigurasi berikut di file `.env`:

```env
# Database
DATABASE_URL="postgresql://admin_portfolio:password_rahasia_123@localhost:5434/portfolio_cms?schema=public"

# Auth (Generate dengan: openssl rand -base64 32)
AUTH_SECRET="isi_secret_key_acak"
AUTH_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME="nama_cloud_anda"
CLOUDINARY_API_KEY="api_key_anda"
CLOUDINARY_API_SECRET="api_secret_anda"

# Resend
RESEND_API_KEY="re_123..."
```

---

### 4️⃣ Jalankan Database (Docker)

```bash
docker-compose up -d
```

> **Catatan:**
> Database akan berjalan di port **5434** sesuai konfigurasi `docker-compose.yml`.

---

### 5️⃣ Setup Database & Admin

```bash
# Push schema Prisma ke database
npm run db:push

# Generate Prisma Client
npm run db:generate

# Seed data awal & buat akun Admin
npm run db:seed
```

---

### 6️⃣ Jalankan Server Development

```bash
npm run dev
```

Buka di browser:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🔐 Akses Admin Dashboard

* URL: **[http://localhost:3000/admin/login](http://localhost:3000/admin/login)**
* Kredensial default (lihat `prisma/seed.ts`):

  * **Email**: `admin@example.com`
  * **Password**: `password123`

> ⚠️ **Disarankan mengganti password admin setelah login pertama.**

---

## 📂 Struktur Project

```plaintext
.
├── actions/            # Server Actions (Backend Logic)
├── app/
│   ├── (main)/         # Public Pages (Frontend)
│   ├── admin/          # Admin Dashboard
│   └── api/            # API Routes
├── components/
│   ├── admin/          # Admin UI Components
│   ├── ui/             # Shared UI Components
│   └── ...
├── lib/                # Configurations (Auth, DB, Utils)
├── prisma/             # Prisma Schema & Seed
└── public/             # Static Assets
```

---

## 📜 Perintah Berguna

| Perintah            | Deskripsi                              |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Menjalankan server development         |
| `npm run build`     | Build untuk production                 |
| `npm run lint`      | Cek kualitas kode                      |
| `npm run db:push`   | Sinkronisasi schema Prisma ke database |
| `npm run db:studio` | Membuka Prisma Studio (GUI Database)   |

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License**.

---

## ❤️ Kredit

Dibuat dengan ❤️ oleh **Kemas Khairunsyah**
