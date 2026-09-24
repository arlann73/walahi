# CONTEXT: Portfolio Prastyo Arlan

Dokumentasi domain, spesifikasi teknis, arsitektur sistem, design system tokens, struktur komponen, dan alur interaksi untuk website portofolio personal **Prastyo Arlan**.

---

## 1. Persona, Domain & Brand Identity

- **Talent / Subject**: **Prastyo Arlan, S.T.**
- **Domain**: Geological Engineering / Junior Geologist (Lulusan S1 Teknik Geologi Institut Teknologi Sumatera / ITERA angkatan 2019, lulus 2025, IPK 3.62 / 4.00 — Honors).
- **Core Competencies**:
  - *Subsurface & Well Log Interpretation*: Analisis log sumur (gamma-ray, resistivity, density, neutron porosity) untuk zonasi hidrokarbon & elektrofasies.
  - *Sequence Stratigraphy & Biostratigraphy*: Pemodelan siklus transgresif-regresif (T-R), korelasi systems tracts (Embry, 1993), dan penentuan umur relatif mikrofosil foraminifera planktonik (Blow, 1969; Martini, 1971).
  - *3D Mine Modeling & Scheduling*: Pemodelan lapisan batubara & DTM menggunakan Minescape serta simulasi penjadwalan tambang dan optimasi armada menggunakan Spry.
  - *GIS & Geological Mapping*: Pemetaan geologi regional, analisis geomorfologi, dan kartografi digital menggunakan ArcGIS dan Global Mapper.
- **Industry Experience**:
  - **PT Pertamina Hulu Rokan (PHR)** — Undergraduate Thesis Researcher (Feb–Apr 2023): Penelitian stratigrafi sekuen dan zonasi biostratigrafi pada formasi hidrokarbon Cekungan Sumatra Tengah.
  - **PT Pertamina Hulu Rokan (PHR)** — Work Practice Intern (Nov–Des 2022): Evaluasi formasi bawah permukaan, korelasi log sumur eksplorasi, dan deskripsi inti batuan (*core description*).
- **Aesthetic Direction**: Perpaduan *brutalist editorial typography* kelas tinggi dengan *real-time 3D Three.js canvas*, transisi *square-pixel dot-raster wave*, dan palet warna *deep obsidian geological canvas* yang bertransisi ke *vibrant editorial red accent*. Terinspirasi oleh identitas digital agensi kreatif Belanda **Lama Lama** dan editorial monokromatik **Monolog**.

---

## 2. Global Design System & Branding Tokens

Sistem desain diatur secara kanonikal dalam [`DESIGN.md`](file:///d:/Aduhh/DESIGN.md) (v5) dan diimplementasikan via CSS variables serta Tailwind CSS v4 `@theme inline` di [`src/app/globals.css`](file:///d:/Aduhh/src/app/globals.css).

### 2.1 Color Palette & Semantic Tokens

Semua warna wajib menggunakan semantic CSS variables, dilarang menggunakan hex mentah sembarangan (*Rule: DO NOT INVENT*).

| Semantic Token | Nilai Kanonikal | Peran & Penggunaan |
| :--- | :--- | :--- |
| `--color-bg` | `#08090A` | Deep obsidian canvas (latar belakang gelap utama Hero, Canvas 3D, dan panggung display) |
| `--color-surface` | `#161819` | Dark surface / Card fill / Capsule menu secondary backdrop |
| `--color-surface-glass` | `rgba(20, 22, 22, 0.5)` | Frosted glass containers dengan `backdrop-blur-xl` |
| `--color-nav-hover-bg` | `#383531` | Warm-charcoal expansion background pada hover/active nav link |
| `--color-text` | `#E2E2DD` | Chalk White: Tipografi utama (headings, body teks aktif, hairline dividers) |
| `--color-text-secondary` | `#908C87` | Muted Stone Gray: Deskripsi sekunder, status label, metadata, inactive links |
| `--color-border` | `rgba(226, 226, 221, 0.14)` | Hairline border subtil pada kartu, menu bar, timeline, dan divider |
| `--color-border-hover` | `rgba(255, 255, 255, 0.30)` | Border aktif saat interaksi fokus atau hover |
| `--color-section-accent` | `#D8382B` | Canonical Editorial Red: Latar belakang kontras untuk bagian bawah (`FeaturedWorkSection` & `WhatIDoSection`) |
| `--color-section-accent-foreground` | `#111213` | Dark obsidian text di atas permukaan merah aksen |
| `--color-text-on-accent` | `#FFFFFF` | Pure white text kontras tinggi untuk teks deskripsi bacaan di atas merah |
| `--color-section-accent-muted` | `rgba(17, 18, 19, 0.70)` | Secondary metadata dan tag di atas permukaan merah |
| `--color-btn-hover-bg` | `#FFFFFF` | Putih cerah saat hover pada primary action button |
| `--color-cta-hover-bg` | `#D8D8D2` | Shift off-white halus pada tombol "LET'S TALK" |
| `--color-cta-icon-bg` | `#0A0A09` | Dark obsidian square box untuk wadah panah diagonal CTA |
| `--color-cursor` | `#FFD000` | Titik kursor presisi 8px (selaras warna kuning jaket karakter 3D) |
| `--color-signal` | `#FFD904` | Titik status operasional studio & active indicators |
| `--color-alert` | `#FF3B30` | Indikator sistem peringatan / alert |
| `--color-selection-bg` | `#E2E2DD` | Highlight background saat seleksi teks pada canvas gelap |
| `--color-selection-fg` | `#010101` | Warna teks saat seleksi pada canvas gelap |
| `--color-selection-accent-bg` | `#111213` | Dark obsidian selection background pada section merah |
| `--color-selection-accent-fg` | `#F4F2ED` | Chalk selection text di dalam section merah |

### 2.2 Typography System & Hierarchy

Font diatur deterministik dan dimuat via `geist/font` dan Google Fonts di [`src/app/layout.tsx`](file:///d:/Aduhh/src/app/layout.tsx) dan [`src/app/globals.css`](file:///d:/Aduhh/src/app/globals.css):

- **Display & Sans (`--font-sans`, `--font-display`)**: `Geist Sans`
  - *Usage*: Giant brutalist headline Hero, judul section, nav labels, body paragraphs.
- **Mono (`--font-mono`)**: `Geist Mono`
  - *Usage*: Technical badges, timeline metadata, studio clock, coordinate brackets, counters.
- **Editorial Luxury Serif (`--font-editorial`, `--font-serif`)**: `Newsreader` (Italic)
  - *Usage*: Dynamic narrative quotes di Hero, kutipan reflektif personal. Tidak pernah digunakan untuk UI labels atau buttons.
- **Pixel Grid (`--font-pixel-grid`)**: `Geist Pixel Grid`
  - *Usage*: Indikator penanda teknis (contoh: `[ 01 // ABOUT ME ]`), crosshair coordinates.
- **Technical Grotesk (`--font-jakarta`)**: `Plus Jakarta Sans`
  - *Usage*: Row label pada `TimelineTable`, label CTA `LET'S TALK`.

#### Deterministic Type Scale

| Token Semantik | Ukuran | Weight | Line Height | Tracking | Case | Penggunaan Khas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `--text-display-xl` | `clamp(44px, 6.6vw, 96px)` | 800 | 0.92 | -0.04em | UPPERCASE | Hero Giant Headline (`PRASTYO ARLAN`) |
| `--text-display-lg` | `clamp(32px, 4.4vw, 64px)` | 700 | 1.05 | -0.04em | UPPERCASE | Major Section Titles (`FEATURED WORK`) |
| `--text-h1` | `clamp(44px, 5.5vw, 76px)` | 500 | 1.00 | -0.035em | UPPERCASE | Secondary Section Titles (`WHAT I DO.`) |
| `--text-h2` | `22px` | 500 | 1.08 | -0.02em | Normal | Project Card Headings, Large Callouts |
| `--text-h3` | `18px` | 500 | 1.10 | -0.01em | Normal | Sub-section headers |
| `--text-body-lg` | `16px` | 400 | 24px | -0.01em | Normal | Editorial narrative quotes (`Newsreader` italic) |
| `--text-body` | `14px` | 400 | 1.50 | normal | Normal | Paragraf bacaan umum |
| `--text-body-sm` | `12px` | 400 | 1.50 | normal | Normal | Deskripsi kartu sekunder, profil bio ringkas |
| `--text-caption` | `11px` | 600 | 1.00 | 0.16em | UPPERCASE | Button labels, timeline rows, metadata badges |
| `--text-ticker` | `10px` | 700 | 1.00 | 0.22em | UPPERCASE | 12-column bottom ticker, live studio clock |
| `--text-label` | `9px` | 500 | 1.00 | 0.24em | UPPERCASE | Micro-typography badges, brackets, tags |

### 2.3 Spacing Scale & Radii Tokens

- **Base Spacing Unit**: `4px` (`--space-1`), terskala secara disiplin:
  - `--space-1` (4px), `--space-2` (8px), `--space-3` (12px), `--space-4` (16px), `--space-6` (24px), `--space-8` (32px), `--space-10` (40px), `--space-12` (48px), `--space-14` (56px), `--space-16` (64px), `--space-20` (80px), `--space-24` (96px).
- **Border Radii**:
  - `--radius-hairline: 1.5px` (TimelineTable rows, precision indicators)
  - `--radius-micro: 2px` (Internal sub-elements, status chips)
  - `--radius-sm: 3px` (Navbar buttons, avatar frame, inner arrow box)
  - `--radius-squircle: 5.33px` (Lama Lama signature squircle untuk tombol standar & pill containers)
  - `--radius-card: 28px / 32px` (Heynesh-style milestone timeline cards di AboutMe)
  - `--radius-full: 9999px` (Pill badges, slider switches, circular avatars)

### 2.4 Tekstur & Efek Atmosferik

- **Film Grain Overlay** ([`src/components/FilmGrain.tsx`](file:///d:/Aduhh/src/components/FilmGrain.tsx)): Lapisan grain prosedural SVG `fractalNoise` global pada `body` dengan `opacity: 0.025`, `z-index: 9999`, pointer-events none.
- **Floating Dust Particles** ([`src/components/FloatingDustParticles.tsx`](file:///d:/Aduhh/src/components/FloatingDustParticles.tsx)): Partikel debu geologis mikro mengambang di ruang 3D.
- **Halftone Cursor Trail** ([`src/components/HalftoneCursorTrail.tsx`](file:///d:/Aduhh/src/components/HalftoneCursorTrail.tsx)): Titik kursor presisi 8px warna `#FFD000` dengan inersia lerp spring `0.22`, auto-hide di atas elemen interaktif.

---

## 3. Arsitektur Komponen & Struktur File Aktif

Struktur riil direktori kode di [`src/`](file:///d:/Aduhh/src):

```text
src/
├── app/
│   ├── globals.css                       # Tokens CSS, Tailwind v4 @theme inline, font utilities
│   ├── layout.tsx                        # Root layout, Geist fonts, SmoothScroll, FilmGrain
│   └── page.tsx                          # Single-page orchestrator (Preloader, Navbar, #hero-track, FieldLogModal)
├── components/
│   ├── Preloader.tsx                     # 3-Phase Preloader (Counter -> Logo Reveal -> Canvas Pixel Dissolve)
│   ├── Navbar.tsx                        # Fixed header: Center nav cluster + luxury "LET'S TALK" CTA
│   ├── SmoothScroll.tsx                  # Lenis smooth scroll provider terintegrasi GSAP ScrollTrigger
│   ├── FilmGrain.tsx                     # Global high-resolution film grain texture
│   ├── FloatingDustParticles.tsx         # 3D canvas atmospheric suspended dust motes
│   ├── HalftoneCursorTrail.tsx           # Custom 8px precision spring cursor dot (#FFD000)
│   ├── KineticGridFloor.tsx              # Three.js ShaderMaterial infinite treadmill grid + crosshair nodes
│   ├── Model.tsx                         # SkinnedMesh 3D walking character (Mixamo walk loop)
│   ├── DotRasterTransition.tsx           # Canvas 2D square-pixel dot-matrix wave transition & ride-along
│   ├── TimelineTable.tsx                 # 3-column compact journey table dengan dual-layer stencil animation
│   └── FieldLogModal.tsx                 # Fullscreen technical field log modal (synced via URL hash #field-log)
├── components/sections/
│   ├── HeroCanvas3D.tsx                  # Three.js Canvas: 3-point lighting, camera, kinetic floor, character
│   ├── HeroSection.tsx                   # 100dvh sticky hero stage, kinetic dual headline, 12-col bottom ticker
│   ├── FeaturedWorkSection.tsx           # Editorial red gallery (#D8382B), project rows, dynamic reveal scrub
│   ├── WhatIDoSection.tsx                # Capabilities showcase (Subsurface, Mine Planning, Geo-GIS)
│   └── AboutMeSection.tsx                # Independent About section: sticky geologist sidebar & Heynesh cards
└── data/
    ├── journey.ts                        # Data kronologis timeline journey Arlan (2019-2025)
    └── fieldLogData.ts                   # Data rinci studi kasus lapangan & operasional geologi
```

---

## 4. Audit Komponen & Spesifikasi Fungsional

### 4.1 `Preloader` ([`src/components/Preloader.tsx`](file:///d:/Aduhh/src/components/Preloader.tsx))
- **Peran**: Opening experience yang mengunci scroll pengguna hingga aset 3D dan shader selesai dikompilasi.
- **Scroll Lock**: Triple protection scroll lock:
  1. `history.scrollRestoration = "manual"`
  2. `window.scrollTo(0, 0)` seketika saat mount
  3. `document.body.style.overflow = "hidden"` dan `Lenis.stop()`
- **Fase 1 (Numeric Counter)**: Angka tabular `000%` sampai `100%`, tertahan di `99%` hingga sinyal `is3DReady` diterima dari `HeroCanvas3D`.
- **Fase 2 (Logo & Scramble Reveal)**: Fade dan scale logo resmi ARLAN serta animasi scramble text wheel pada nama "PRASTYO ARLAN".
- **Fase 3 (Canvas Pixel Dissolve Curtain)**: Tirai dither 2D kanvas ditarik ke atas (*pixel dissolution*), melepaskan scroll lock dan memunculkan panggung utama.

### 4.2 `Navbar` ([`src/components/Navbar.tsx`](file:///d:/Aduhh/src/components/Navbar.tsx))
- **Peran**: Navigasi atas tetap (*fixed top-0*, z-50) berdensitas ultra-presisi.
- **Left Spacer**: Spacer 64–96px untuk menjaga ruang bernapas `TimelineTable` di sudut kiri atas.
- **Center Nav Cluster**:
  - Item tautan: `About`, `Work`, `What I do`.
  - Efek hover: Latar warm-charcoal (`#383531`) meluncur mulus dari kiri ke kanan dengan durasi 500ms (`--duration-medium`). Teks tetap diam di tempat (*stationary text*), bertransisi warna dari `--color-text-secondary` (`#908C87`) ke `--color-text` (`#E2E2DD`).
  - Active detection: Sinkron otomatis dengan posisi scroll pada `#hero-track`.
- **Far Right CTA ("LET'S TALK")**:
  - Desain ramping dengan tinggi pasti `31px` (`h-[31px]`), background bone white (`#E2E2DD`, hover `#D8D8D2`), rounded `4.5px`.
  - Thumbnail avatar Arlan (`/avatar.jpg`, `23x23px`, rounded `3px`).
  - Teks ganda vertikal slide-up (*dual-layer slide-up hover effect*) menggunakan font `Plus Jakarta Sans` all-caps.
  - Wadah kotak obsidian (`23x23px`, `#0A0A09`) berisi panah diagonal (`ArrowUpRight`) yang meluncur keluar ke kanan atas dan masuk kembali dari kiri bawah saat hover.

### 4.3 `HeroSection` ([`src/components/sections/HeroSection.tsx`](file:///d:/Aduhh/src/components/sections/HeroSection.tsx))
- **Peran**: Panggung utama *above-the-fold* (`100dvh`) yang terikat di dalam sticky container `#hero-track`.
- **Top-Left Region**: Mount langsung untuk [`TimelineTable.tsx`](file:///d:/Aduhh/src/components/TimelineTable.tsx).
- **Giant Brutalist Headline**:
  - Menggunakan font `Geist Sans` extrabold uppercase dengan masking linear feather vertikal (`.headline-text-mask`).
  - Rotasi teks kinetik otomatis berputar setiap 8.5 detik (sinkron dengan timeline):
    - State A: `PRASTYO` (baris 1) / `ARLAN` (baris 2)
    - State B: `EXPLORE` (baris 1) / `THE EARTH` (baris 2)
  - Animasi transisi slide-up keluar masuk menggunakan kurva `cubic-bezier(0.22, 1, 0.36, 1)` durasi 950ms (`--duration-kinetic`).
- **Interactive Eyebrow Tag (`AsciiScrambleTag`)**:
  - Efek dekode karakter ASCII: `[ EARLY CAREER ]` bertransisi otomatis ke `[ AVAILABLE FOR WORK ]` setelah preloader selesai.
  - Hover interaktif: Melakukan re-scramble dan toggle bolak-balik antara kedua status.
- **Dynamic Editorial Narrative**:
  - Menampilkan deskripsi timeline aktif dalam balutan tipografi mewah `Newsreader` italic dengan tanda kutip gantung editorial.
  - Paragraf profil bawah menggunakan warna monokromatik muted `--color-text-secondary` (`#908C87`).
- **12-Column Micro-Typography Bottom Bar**:
  - Kolom 1-3: Lokasi basis `NORTH SUMATRA`.
  - Kolom 4-7: Studio Clock real-time format `[ HH : MM : SS ]` berbasis waktu lokal perangkat/WIB dengan angka tabular.
  - Kolom 8-9: Label mono `FOLLOW US`.
  - Kolom 10-11: Tautan sosial `INSTAGRAM +` dan `LINKEDIN +`.
  - Kolom 12: Language Switcher pill interaktif (`ID ◉ EN`).
  - ScrollTrigger wipe-out: Menyusut dan menghilang mulus saat pengguna mulai melakukan scroll (ambang progress 0.00 hingga 0.015).

### 4.4 `HeroCanvas3D` & 3D Engine ([`src/components/sections/HeroCanvas3D.tsx`](file:///d:/Aduhh/src/components/sections/HeroCanvas3D.tsx))
- **Renderer**: Three.js Canvas via `@react-three/fiber` dan `@react-three/drei`.
- **Lighting**: Studio 3-point lighting tanpa HDRI eksternal (Ambient 1.4, Directional Key Light 2.8 dengan shadow-map 1024x1024, Directional Fill Light 1.1 `#94A3B8`, Ground Reflection Light 0.4 `#E2E2DD`).
- **Kamera**: `PerspectiveCamera` (FOV 34, posisi `[0, 0.95, 5.0]`, lookAt `[0, 1.22, 0]`).
- **Lantai Kinetik (`KineticGridFloor.tsx`)**:
  - GLSL ShaderMaterial dengan drift sumbu Z tanpa henti (`speed = 1.25`, sinkron dengan animasi langkah kaki karakter).
  - Node crosshair arsitektural (`+`) warna `--color-text` di setiap persimpangan grid.
  - Mouse-proximity spotlight yang menyala hanya ketika pointer bergerak melintasi viewport.
- **Karakter 3D (`Model.tsx`)**:
  - SkinnedMesh GLTF (`/model.glb`, scale 1.42, posisi `[0, 0, -0.3]`).
  - Mixamo walk cycle loop mulus dengan soft contact shadows (`ContactShadows` opacity 0.7, blur 2.4).
- **Scene Warmup**: `SceneWarmupNotifier` menunggu 2 frame rAF sebelum mengirim sinyal `onReady` agar tidak terjadi lonjakan frame rate.

### 4.5 `DotRasterTransition` ([`src/components/DotRasterTransition.tsx`](file:///d:/Aduhh/src/components/DotRasterTransition.tsx))
- **Peran**: Transisi gelombang kanvas 2D square-pixel dot-matrix yang menyapu layar dari bawah ke atas, menghubungkan Hero gelap dengan section merah.
- **Spesifikasi Raster Grid**:
  - Grid interval: `10px` (`--dot-raster-grid`).
  - Dot geometry: Kotak (*square pixels*), ukuran min `1.5px` (`--dot-raster-size-min`), ukuran max `11px` (`--dot-raster-size-max`).
  - Warna: Solid editorial red `--color-section-accent` (`#D8382B`).
- **Mekanika Sinkronisasi Scroll 3-Fase**:
  - *Fase 1 (0.00 – 0.015)*: Bottom bar Hero menyusut (*wipe-out*), gelombang dot raster tersembunyi di bawah viewport.
  - *Fase 2 (0.015 – 0.35)*: Gelombang dot raster menyapu naik; `textContainerRef` terdorong ke atas; `workRideAlongRef` naik persis di balik puncak gelombang (+580px safety breathing room) dengan *integer rounding* (`Math.round`) untuk mencegah jitter font antialiasing.
  - *Fase 3 (0.35 – 1.00)*: Deep continuous scroll menelusuri `FeaturedWorkSection` dan `WhatIDoSection`.
- **Smart GPU Sleep / Wake Architecture**: Saat layar tertutup sempurna oleh gelombang merah (`smoothP >= 0.35`), kanvas mengisi layar dengan warna solid `#D8382B` lalu menghentikan kalkulasi loop (sleep) untuk menghemat daya GPU. Kanvas bangun seketika saat scroll balik ke atas.

### 4.6 `TimelineTable` ([`src/components/TimelineTable.tsx`](file:///d:/Aduhh/src/components/TimelineTable.tsx))
- **Peran**: Tabel ringkas perjalanan karir dan studi geologi Arlan (2019–2025) di sudut kiri atas Hero.
- **Struktur Kolom**:
  - Kolom 1: Index dua digit tabular (`01`, `02`, `03`, dll.).
  - Kolom 2: Tahun penanda (`'19`, `'22`, `'23`, `'25`).
  - Kolom 3: Judul tonggak pencapaian / peran (`ITERA GEOLOGY`, `PERTAMINA PHR`, dll.).
- **Dual-Layer Dynamic Stencil Inversion**:
  - Baris aktif menampilkan animasi clip-path dari kiri ke kanan berdurasi `8.5 detik` (`timelineLoaderClip`).
  - Saat loader menyapu baris, teks berubah warna secara instan dari putih ke arang gelap di atas latar belakang putih solid.
  - Pergantian baris otomatis memicu pembaruan kutipan editorial narasi di sudut kanan Hero.

### 4.7 `FeaturedWorkSection` & `WhatIDoSection`
- **Mount Terpadu**: Terpasang langsung di dalam `workRideAlongRef` pada `HeroSection.tsx`, beralaskan warna `--color-section-accent` (`#D8382B`) dengan teks arang `--color-section-accent-foreground` (`#111213`).
- **`FeaturedWorkSection.tsx`**:
  - Header editorial dengan *Dynamic Line-by-Line Reveal Scrub* (setiap baris teks meluncur naik dari balik masking sesuai putaran scroll pengguna).
  - Menampilkan 4 proyek utama: *Arlan Portfolio*, *Geological Engineering*, *Undergraduate Researcher*, dan *Work Practice*.
  - Tiap baris memuat kartu studi kasus mini (`120px` height) dengan preview grafis, foto singkapan batuan, dan tombol hover `( + )`.
- **`WhatIDoSection.tsx`**:
  - Judul besar `WHAT I DO.` bergaya Swiss International Typographic Style.
  - 3 Pilar Kapabilitas Geologi:
    1. *Subsurface & Well Logs* (Interpretasi log, siklus T-R, zonasi biostratigrafi, deskripsi core).
    2. *Mine Planning & 3D* (Pemodelan Minescape DTM, penjadwalan Spry, geometri lereng pit).
    3. *Geo-GIS & Spatial Tech* (Pemetaan ArcGIS, Digital Elevation Models, integrasi database spasial).
  - Footer inquiry minimalis yang menautkan langsung ke kontak WhatsApp resmi Arlan (+62 822-6710-8623).

### 4.8 `AboutMeSection` ([`src/components/sections/AboutMeSection.tsx`](file:///d:/Aduhh/src/components/sections/AboutMeSection.tsx))
- **Peran**: Komponen section mandiri berformat editorial Heynesh untuk membedah profil personal, latar belakang akademis, dan rekam jejak Arlan.
- **Sticky Left Sidebar (~20-25% width)**:
  - Identity badge `ARLAN®` dengan pulsing dot warna kuning `--color-signal` (`#FFD904`).
  - Ringkasan bio, kartu statistik (IPK 3.62 Honors, 6+ Years Journey).
  - Gelar B.Eng. S.T. ITERA, software chips (`ArcGIS`, `Minescape`, `RockWorks`, `Global Mapper`), dan afiliasi organisasi (`ITERA`, `HMGL`, `MGEI`, `PHR`, `IAGI`).
  - Tombol CTA yang memicu pembukaan `FieldLogModal`.
- **Right Timeline Stage (~75-80% width)**:
  - Kartu milestone bergaya Heynesh (`#EBE7DF`, rounded `28px/32px`, border subtil).
  - Memetakan 8 pencapaian penting dari tahun 2019 hingga 2025 dengan ikon kustom (Academic, Leadership, Fieldwork, Exploration, Lab, Research, Graduation).

### 4.9 `FieldLogModal` ([`src/components/FieldLogModal.tsx`](file:///d:/Aduhh/src/components/FieldLogModal.tsx))
- **Peran**: Fullscreen pitchdeck & technical field log viewer untuk meninjau detail teknis studi kasus geologi.
- **URL Hash Synchronization**: Terhubung langsung dengan event listener `window.onhashchange`:
  - Terbuka otomatis saat URL memuat hash `#field-log` atau `#experience`.
  - Mendukung deep-linking query job spesifik: `#field-log?job=undergraduate-researcher` atau `#field-log?job=geological-engineering`.
  - Menutup modal dengan tombol ESC atau tombol tutup akan membersihkan hash tanpa menyebabkan reload atau lonjakan scroll.
- **Sidebar & Log Explorer**: Menampilkan daftar log terstruktur berdasarkan kategori (`SUBSURFACE`, `EXPLORATION`, `ENGINEERING`, `IDENTITY`), metodologi terapan, koordinat formasi, dan galeri dokumen teknis.

---

## 5. Scroll Track & Orchestration Architecture

Arsitektur scroll satu halaman di [`src/app/page.tsx`](file:///d:/Aduhh/src/app/page.tsx) dirancang dengan konsep *sticky viewport track* setinggi `700vh`:

```text
[ Document Body (bg #000000 / #08090A) ]
│
├── <Preloader /> (Fixed fullscreen, z-[99999], mengunci scroll hingga 3D scene siap)
├── <Navbar /> (Fixed top-0, z-50, fade-in setelah preloader selesai)
│
├── #hero-track (Relative container h-[700vh], z-30)
│   │
│   └── Sticky Stage (Sticky top-0, h-[100dvh], w-full, overflow-hidden)
│       │
│       ├── Layer 0: <HeroCanvas3D /> (Background 3D canvas, KineticGridFloor, Character Model)
│       ├── Layer 1: <DotRasterTransition /> (Canvas 2D square-pixel dot-matrix wave sweep)
│       ├── Layer 2: Hero Foreground Content & <HalftoneCursorTrail />
│       │   ├── Top-Left: <TimelineTable /> (3-column journey table)
│       │   ├── Center-Left: Eyebrow + Brutalist Animated Headline
│       │   ├── Bottom-Right: Newsreader Italic Narrative + Profile Paragraph
│       │   └── Bottom-0: 12-Column Micro-Typography Bar (North Sumatra, Studio Clock, Socials, Lang)
│       │
│       └── Layer 3: Physical Ride-Along (workRideAlongRef, bg #D8382B, min-h-[360vh])
│           ├── <FeaturedWorkSection /> (Editorial gallery, project rows, dynamic reveal scrub)
│           └── <WhatIDoSection /> (Subsurface, Mine Planning, Geo-GIS pillars & WhatsApp CTA)
│
└── <FieldLogModal /> (Fixed fullscreen modal, z-50, synced via #field-log hash)
```

### Kronologi Interaksi Scroll

1. **Progress 0.00 – 0.015**:
   - Bottom bar Hero menyusut (*wipe-out*) secara halus dengan animasi GSAP.
   - Kanvas gelombang dither masih berada di bawah batas viewport.
2. **Progress 0.015 – 0.35**:
   - Gelombang square-pixel dot raster naik menyapu viewport dari bawah ke atas.
   - Konten teks Hero terdorong ke atas sumbu Y secara sinkron (`textContainerRef`).
   - Bagian bawah merah aksen (`workRideAlongRef`) terangkat naik persis di belakang gelombang kanvas.
3. **Progress 0.35 – 1.00**:
   - Kanvas transisi masuk ke mode GPU sleep dengan latar belakang solid `#D8382B`.
   - Pengguna menelusuri katalog proyek `FeaturedWorkSection` (studi kasus ITERA dan Pertamina PHR).
   - Pengguna melanjutkan scroll ke dalam pilar kapabilitas `WhatIDoSection`.
4. **Scroll Balik (< 0.35)**:
   - Kanvas seketika bangun (*wake up*) dan merender ulang gelombang titik raster tanpa frame macet (*no frame lag/stutter*).

---

## 6. Pemetaan Konten CV, Data Models & Status Implementasi

Data otentik bersumber dari kurikulum vitae dan portofolio resmi Prastyo Arlan di [`src/data/journey.ts`](file:///d:/Aduhh/src/data/journey.ts) dan [`src/data/fieldLogData.ts`](file:///d:/Aduhh/src/data/fieldLogData.ts):

| Aspek / Entitas | Sumber Data & Konten Otentik | Lokasi Komponen | Status Implementasi |
| :--- | :--- | :--- | :--- |
| **Identitas & Hero** | Nama, Tagline Geologi, Waktu Lokal WIB, Status Early Career, Socials | `HeroSection.tsx` | Selesai & Aktif |
| **Timeline Journey** | 5 Tonggak Karir (ITERA '19, PHR '22, PHR '23, DTM '24, Grad '25) | `TimelineTable.tsx` & `journey.ts` | Selesai & Aktif |
| **3D Character** | Avatar 3D berjalan dengan jaket kuning eksplorasi (`/model.glb`) | `Model.tsx` & `HeroCanvas3D.tsx` | Selesai & Aktif |
| **Lantai Grid Kinetik** | Shader GLSL infinite treadmill + crosshair arsitektural | `KineticGridFloor.tsx` | Selesai & Aktif |
| **Featured Work** | 4 Studi Kasus Utama (Pertamina PHR, ITERA Research, Mine Modeling) | `FeaturedWorkSection.tsx` | Selesai & Aktif |
| **What I Do** | Subsurface & Logs, Mine Planning 3D, Geo-GIS & Spatial Tech | `WhatIDoSection.tsx` | Selesai & Aktif |
| **About Arlan** | Profil Geologist, IPK 3.62 Honors, Milestone Cards, Software Chips | `AboutMeSection.tsx` | Selesai & Siap Diintegrasikan |
| **Technical Field Logs** | Log komprehensif sumur, formasi geologi, biostratigrafi, DTM batubara | `FieldLogModal.tsx` & `fieldLogData.ts` | Selesai & Terhubung URL Hash |
| **Sertifikasi** | Coal Mine Planning Initambang, Pra POP, Jobstreet Data Science, TOEFL | Data terstruktur di modal & CV | Selesai |
| **Kontak & Inquiry** | WhatsApp (+6282267108623), Email, LinkedIn, Canva CV | `Navbar.tsx`, `HeroSection.tsx`, `WhatIDoSection.tsx` | Selesai & Aktif |

---

## 7. Rulebook & Panduan Pengembangan Masa Depan

Bagi setiap pengembang atau AI coding agent yang bekerja pada repositori ini:

1. **Aturan Tunggal: `DESIGN.md` WINS OVER CODE**
   - [`DESIGN.md`](file:///d:/Aduhh/DESIGN.md) adalah sumber kebenaran mutlak untuk semua keputusan visual, token warna, typography, dan motion.
   - Jika terdapat perbedaan antara kode lama dan `DESIGN.md`, kode lama wajib diselaraskan dengan `DESIGN.md`.
2. **Aturan Larangan: DO NOT INVENT**
   - Dilarang membuat nilai hex arbitrer, font size sembarangan, spacing acak, atau radius di luar token yang telah ditentukan.
3. **Aturan Motion: GSAP-ONLY MOTION**
   - Seluruh animasi interaktif, hover effect, micro-interactions, dan scroll transitions wajib dibuat menggunakan GSAP (`gsap.to`, `gsap.timeline`, `ScrollTrigger`).
   - Dilarang menggunakan properti CSS `transition` native untuk animasi interaktif penting.
4. **Preservasi URL Hash**:
   - Integrasi modal dan deep-link wajib mempertahankan pola sinkronisasi hash (`#field-log`, `#experience`, `#about`, `#work`) tanpa memicu page reload.
