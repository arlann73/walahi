# CONTEXT: Portfolio Arlan

Dokumentasi domain, arsitektur, dan struktur modularisasi section untuk website portofolio Arlan.

## 1. Modular Architecture Mapping (`src/components/`)

Untuk mempermudah redesign dan pemeliharaan per bagian, seluruh kode telah dimodulasi dan dipetakan ke dalam struktur komponen berikut:

```text
src/
├── components/
│   ├── Navbar.tsx                          # 1. Navigasi Atas & CTA
│   └── sections/
│       ├── HeroSection.tsx                 # 2. Opening Hero Banner & Branding
│       ├── AboutSection.tsx                # 3. Profil Personal, Manifesto & Brands
│       ├── JourneyTimelineSection.tsx      # 4. 7 Timeline Cards (2019-2026) + Curved Paths
│       ├── SkillsSection.tsx               # 5. Aplikasi/Tools yang Dikuasai & Sertifikasi
│       ├── ProjectsSection.tsx             # 6. Showcase Karya & Case Studies
│       ├── FaqSection.tsx                  # 7. Tanya Jawab (FAQ)
│       ├── ContactSection.tsx              # 8. Ajakan Kolaborasi & Kontak CTA
│       └── FooterSection.tsx               # 9. Footer, Socials, Ask AI & Copyright
├── app/
│   ├── layout.tsx                          # Root Layout Next.js (SEO & Fonts)
│   └── page.tsx                            # Main Page Assembly
└── imports/
    └── PortfolioArlanDesign/               # Raw Figma Export & Vector/Image Assets
```

---

## 2. Section Glossary & Detail Peran

### 1. `Navbar` (`src/components/Navbar.tsx`)
- **Peran**: Navigasi utama *fixed/sticky*.
- **Elemen**: Logo Arlan, toggle efek suara, tautan anchor navigasi (About, Skills, Projects, FAQ, Contact), dan tombol CTA "Start a project".

### 2. `HeroSection` (`src/components/sections/HeroSection.tsx`)
- **Peran**: Area pembuka website (*above the fold*).
- **Elemen**: Visual background branding, headline perkenalan Arlan, subheadline positioning, dan trigger scroll.

### 3. `AboutSection` (`src/components/sections/AboutSection.tsx`)
- **Peran**: Narasi komprehensif tentang identitas dan filosofi Arlan.
- **Sub-komponen**:
  1. *Storytelling Cards & Background Journey*: Riwayat karir, pencapaian, dan cerita personal Arlan.
  2. *Manifesto / Value Proposition*: Pesan filosofi kerja dan komitmen kualitas ("*Great founders changing the world deserve a presence as powerful as what they're building...*").
  3. *Brands We've Helped / Social Proof*: Logo brand atau klien yang pernah dibantu (Moc Chau Creamery, dsb.).

### 4. `JourneyTimelineSection` (`src/components/sections/JourneyTimelineSection.tsx`)
- **Peran**: Timeline perjalanan karier interaktif (*sebelumnya `Frame12`*).
- **Elemen**:
  - **7 Kartu Milestone (2019 – 2026)**: Menceritakan evolusi skill dari awal belajar kode, freelance pertama, agency, hingga era AI.
  - **Garis Melengkung Dinamis**: Vektor path meliuk dengan gradient blur mask yang mengalir ke bawah menghubungkan setiap tahun.
  - **Modal Interaktif**: Tombol *"Read more"* dan pop-up modal per tahun.

### 5. `SkillsSection` (`src/components/sections/SkillsSection.tsx`)
- **Peran**: Pembuktian keahlian teknis (*transformasi dari ServicesSection*).
- **Elemen**:
  - *Aplikasi & Software yang Dikuasai*: Figma, Webflow, React/Next.js, Tailwind CSS, Blender 3D, Adobe Creative Cloud, dsb.
  - *Sertifikasi Profesional*: Lisensi dan sertifikat resmi keahlian desain/development.
  - *Testimoni & Kredibilitas*: Pengakuan dari klien atas keahlian teknis yang terbukti.

### 6. `ProjectsSection` (`src/components/sections/ProjectsSection.tsx`)
- **Peran**: Showcase portofolio karya unggulan (*transformasi dari ProcessSection*).
- **Elemen**: Kartu studi kasus proyek pilihan, live preview link, teknologi/tools yang digunakan, dan ringkasan dampak karya.

### 7. `FaqSection` (`src/components/sections/FaqSection.tsx`)
- **Peran**: Menjawab pertanyaan umum calon klien/kolaborator.
- **Elemen**: Accordion FAQ seputar ketersediaan proyek, alur kerja sama, dan estimasi waktu.

### 8. `ContactSection` (`src/components/sections/ContactSection.tsx`)
- **Peran**: Ajakan bertindak penutup (*Call to Action*).
- **Elemen**: Headline penutup impresif dan tombol aksi cepat "Start a project" / form kontak.

### 9. `FooterSection` (`src/components/sections/FooterSection.tsx`)
- **Peran**: Navigasi bawah dan informasi studio.
- **Elemen**: Tautan sosial media (LinkedIn, YouTube, Instagram), widget interaktif *Ask AI about Arlan/Monolog*, live clock waktu lokal, dan copyright.
