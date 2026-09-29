# DESIGN.md (v5)

This document serves as the absolute single source of truth for the design system, visual rules, tokens, and component specifications of the Prastyo Arlan Portfolio website. It documents the canonical design language extracted from the codebase to guide all future development and AI pair-programming.

---

## 1. DESIGN PHILOSOPHY

- **Overall Visual Character**: Brutalist editorial typography mixed with high-end real-time 3D, creating a "deep geological canvas" aesthetic.
- **Design Mood**: Technical, architectural, mysterious, and unapologetically digital. Draws primary inspiration from the Dutch creative agency Lama Lama and Monolog editorial design.
- **Visual Personality**: High-contrast, dynamic, tactile, and mathematically precise.
- **Core Principles**: 
  - **Typography is UI**: Type scale, letter spacing, and weight define structure and navigation.
  - **Motion Provides Context**: Animation is physical and informative, never ornamental fluff.
  - **Content Dictates Layout**: Generous whitespace, asymmetric editorial splits, and data-dense tables.
- **Level of Minimalism**: High minimalism. Interfaces are stripped of drop shadows, bevels, and gratuitous decorations, relying on hairlines, mono tags, and raw contrast.
- **Visual Density**: Low density in hero display areas; moderate to high density in data-heavy areas (timeline, metadata rows, project cards).
- **Contrast Philosophy**: Extreme, deliberate polarity. Deep obsidian dark canvas (`var(--color-bg)`) contrasted with stark chalk-white text (`var(--color-text)`) or bold editorial section accent red (`var(--color-section-accent)`).
- **Use of Whitespace**: Deliberate and generous, especially in typography leading, line-height clamping, and section vertical rhythm.
- **Signature Hallmarks**: Massive kinetic typography, 8px precision cursor dot, 10px square-pixel dot-raster wave transition, 12-column editorial bottom ticker, studio clock, and dual-layer stencil timeline table.
- **Forbidden Patterns**: Generic SaaS cards, blurry drop shadows, rounded pill buttons without squircle tokens, and un-tracked sans-serif fonts.
- **Animation Engine**: **GSAP is the sole motion authority for this site.** Native CSS `transition` properties are never used for interactive motion — see Section 10's GSAP-Only Motion Rule.

---

## 2. COLOR SYSTEM

Colors must be implemented strictly via semantic CSS variables rather than hardcoded hex codes.

### Token Reference

| Role | Semantic Token | Canonical Value | Usage & Context |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `--color-bg` | `#08090A` | Deep obsidian canvas background (all primary dark sections) |
| **Surface** | `--color-surface` | `#161819` | Cards, capsule menus, secondary backgrounds |
| **Glass Surface** | `--color-surface-glass` | `rgba(20, 22, 22, 0.5)` | Frosted glass containers (e.g., Navbar pill, backdrop-blur) |
| **Navbar Hover Fill** | `--color-nav-hover-bg` | `#383531` | Warm-charcoal expansion background on navbar link hover/active |
| **Primary Text** | `--color-text` | `#E2E2DD` | Headings, primary body text, active state items (Chalk White) |
| **Secondary Text** | `--color-text-secondary` | `#908C87` | Muted descriptions, inactive navigation, mono tags (Stone Gray) |
| **Border / Hairline** | `--color-border` | `rgba(226, 226, 221, 0.14)` | Hairline dividers, card outlines, subtle structural borders |
| **Border Active** | `--color-border-hover` | `rgba(255, 255, 255, 0.30)` | Active button states, focused borders |
| **Section Accent** | `--color-section-accent` | `#D8382B` | Canonical background for vibrant red lower sections |
| **Section Accent Text** | `--color-section-accent-foreground` | `#111213` | Dark obsidian text on top of the red section accent |
| **Section Reading Text**| `--color-text-on-accent` | `#FFFFFF` | High-contrast pure white text for small reading copy on red |
| **Section Muted Text**| `--color-section-accent-muted` | `rgba(17, 18, 19, 0.70)` | Secondary metadata and tags on red background |
| **Primary Button Hover**| `--color-btn-hover-bg` | `#FFFFFF` | Illuminated pure white background on primary button hover |
| **CTA Button Hover** | `--color-cta-hover-bg` | `#D8D8D2` | Subtle off-white shift on "LET'S TALK" CTA hover |
| **CTA Arrow Box** | `--color-cta-icon-bg` | `#0A0A09` | Dark obsidian container box for CTA diagonal arrow |
| **Cursor Dot** | `--color-cursor` | `#FFD000` | 8px precision cursor trail (matches 3D character yellow jacket) |
| **Signal / Pulse** | `--color-signal` | `#FFD904` | Pulsing studio operational status dots & active indicators |
| **Alert / Warning** | `--color-alert` | `#FF3B30` | System warning / alert states |
| **Selection Background**| `--color-selection-bg` | `#E2E2DD` | Highlight selection background on dark canvas |
| **Selection Foreground**| `--color-selection-fg` | `#010101` | Highlight selection text color on dark canvas |
| **Selection Accent BG** | `--color-selection-accent-bg` | `#111213` | Dark obsidian selection background on red section |
| **Selection Accent FG** | `--color-selection-accent-fg` | `#F4F2ED` | Chalk selection text on dark selection in red section |

---

## 3. TYPOGRAPHY SYSTEM

### Core Principles & Provenance
The typography system is unified on **Geist** (designed by Vercel in collaboration with Basement Studio for high-density modern digital interfaces). External Google Fonts have been purged for maximal performance and visual consistency.

- **Primary UI Typeface (`--font-sans`)**: `Geist Sans`
  - *Source*: Native `geist/font/sans` variable font in `src/app/layout.tsx`. Supports continuous weights 100–900.
  - *Usage*: All headlines, titles, subtitles, navigation, and body reading copy.
  - *Temporary Alias Notice*: `--font-display` is currently a **temporary backwards-compatibility alias** pointing to `var(--font-geist-sans)`. All TSX references will be replaced with canonical typography tokens during the 50-line rollout, after which `--font-display` will be permanently purged from `globals.css` to prevent design drift and confusion with the CSS property `font-display: swap`.
- **Secondary / Data Typeface (`--font-mono`)**: `Geist Mono`
  - *Source*: Native `geist/font/mono` variable font in `src/app/layout.tsx`. Supports continuous weights 100–900.
  - *Usage*: Technical metadata, well-log numbers, coordinates, timestamps, ASCII art, and tabular data tables.
- **Pixel Grid Accent (`--font-pixel-grid`)**: `Geist Pixel Grid`
  - *Source*: Direct local font loading via `next/font/local` in `src/app/layout.tsx` pointing to `src/fonts/GeistPixel-Grid.woff2` (accompanied by `src/fonts/LICENSE.txt`, SIL OFL 1.1). Single static weight: `500` (Medium).
  - *Optimization & Preload Rationale*: Loaded locally with `preload: false` to eliminate critical-path network contention on initial viewport paint. Bypasses the `geist/font/pixel` package barrel file, permanently eliminating 4 unused font preload tags and 101.1 KB of dead font payload (`Square`, `Circle`, `Triangle`, `Line`).
  - *Usage*: Section marker brackets (e.g. `[ 01 // ABOUT ME ]`) and technical table headers.

### Base Unit & Accessibility Calibration
$$\mathbf{1\text{ rem} = 16\text{px}}\quad\text{(Default Browser User-Agent Base)}$$
*Accessibility Clarification*: WCAG 1.4.4 does not mandate a specific pixel value; it requires text to scale smoothly up to 200% without loss of content or functionality. All font sizes and line heights are authored in `rem` (and fluid `clamp()`) to dynamically respect the user's root browser font size settings.

### Fluid Typography Scale `[Font Size] / [Line Height]`
Calculated along an interpolation slope from **375px (Mobile Min)** to **1440px (Desktop Max)**:

| Token Name | Weight | Desktop Max (`1440px`) | Tablet Mid (`≈768px` interpolasi) | Mobile Min (`375px`) | Tracking | Fluid Clamp Formula |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | 800 | **120 / 115** (`7.5rem`) | **≈77 / 74** (`~4.81rem`) | **52 / 50** (`3.25rem`) | `-0.04em` | `clamp(3.25rem, 1.8rem + 6.3vw, 7.5rem)` |
| **Display SM** | 700 | **76 / 80** (`4.75rem`) | **≈50 / 52** (`~3.09rem`) | **34 / 36** (`2.125rem`) | `-0.03em` | `clamp(2.125rem, 1.2rem + 3.94vw, 4.75rem)` |
| **Heading 1** | 700 | **56 / 60** (`3.5rem`) | **≈42 / 45** (`~2.63rem`) | **34 / 37** (`2.125rem`) | `-0.03em` | `clamp(2.125rem, 1.63rem + 2.1vw, 3.5rem)` |
| **Heading 2** | 600 | **40 / 46** (`2.5rem`) | **≈31 / 36** (`~1.94rem`) | **26 / 30** (`1.625rem`) | `-0.02em` | `clamp(1.625rem, 1.32rem + 1.3vw, 2.5rem)` |
| **Heading 3** | 600 | **28 / 34** (`1.75rem`) | **≈23 / 28** (`~1.44rem`) | **20 / 24** (`1.25rem`) | `-0.015em` | `clamp(1.25rem, 1.07rem + 0.75vw, 1.75rem)` |
| **Subtitle 1** | 500 | **20 / 28** (`1.25rem`) | **≈17.5 / 24.5** (`~1.09rem`) | **16 / 22** (`1.0rem`) | `-0.01em` | `clamp(1.0rem, 0.91rem + 0.38vw, 1.25rem)` |
| **Subtitle 2** | 500 | **16 / 23** (`1.0rem`) | **≈14.7 / 21.3** (`~0.92rem`) | **14 / 20** (`0.875rem`) | `0em` | `clamp(0.875rem, 0.83rem + 0.19vw, 1.0rem)` |
| **Body Editorial** | 400 | **18 / 29** (`1.125rem`) | **≈16.8 / 27** (`~1.05rem`) | **16 / 26** (`1.0rem`) | `-0.005em` | `clamp(1.0rem, 0.96rem + 0.19vw, 1.125rem)` |
| **Body 1** | 400 / 600 | **16 / 24** (`1.0rem`) | **≈15.4 / 23.1** (`~0.96rem`) | **15 / 22** (`0.9375rem`) | `0em` | `clamp(0.9375rem, 0.92rem + 0.09vw, 1.0rem)` |
| **Body 2** | 400 / 600 | **14 / 21** (`0.875rem`) | **≈13.3 / 19.7** (`~0.83rem`) | **13 / 19** (`0.8125rem`) | `+0.005em` | `clamp(0.8125rem, 0.79rem + 0.09vw, 0.875rem)` |

### Geist Mono Dedicated Scale

| Token Name | Weight | Size / Line Height | Tracking | Typographic Role |
| :--- | :--- | :--- | :--- | :--- |
| **Mono Label** | 500 | **`0.75rem / 1.0rem`** (`12px / 16px`) | `+0.14em` (bracket) / `+0.08em` (meta) | Uppercase bracket tags (`[ FEATURED WORK ]`), status badges |
| **Mono Caption** | 400 | **`0.75rem / 1.0rem`** (`12px / 16px`) | `+0.02em` | Code captions, secondary timestamps, small footnotes |
| **Mono Data** | 500 | **`clamp(0.8125rem, 0.79rem + 0.09vw, 0.875rem)`** | `+0.02em` (`tabular-nums`) | Timeline table rows, well-log numbers, drill depths |

### Geist Pixel Dedicated Scale (Grid Accent)

| Token Name | Weight | Size / Line Height | Tracking | Typographic Role |
| :--- | :--- | :--- | :--- | :--- |
| **Pixel Label** (`.text-pixel-label`) | 500 (`font-synthesis-weight: none`) | **`0.75rem / 1.0rem`** (`12px / 16px`) | `+0.14em` | Section marker bracket tags (`[ 01 // ABOUT ME ]`), technical table markers |

*Catatan Karakteristik & Safeguard*:
- **Batas Lantai Internal**: Ukuran `0.75rem` (`12px`) merupakan batas lantai minimum internal sistem tipografi kita (bukan ketentuan WCAG langsung, yang tidak mematok angka px minimum). Keterbacaan dan ketajaman rendering matriks piksel perlu diverifikasi visual pada display 1x maupun 2x Retina.
- **Pencegahan Faux Bold Struktural**: Menyertakan `font-synthesis-weight: none` secara permanen untuk memblokir sintesis browser jika terjadi tumpang tindih kelas `font-bold`.
- **Kompensasi Tracking**: Untuk label berposisi rata tengah (centered), kombinasikan dengan utilitas `.text-mono-center` (`margin-right: -0.14em`) untuk menetralkan offset tracking akhir.

### Advanced Typography Global Rules
1. **Heading Balance & Legibility**: All `h1, h2, h3, h4, .text-display, .text-display-sm, .text-h1, .text-h2, .text-h3` use `text-wrap: balance; text-rendering: optimizeLegibility;`
2. **Paragraph Flow**: All `p, .text-body-editorial, .text-body-1, .text-body-2` use `text-wrap: pretty;`
3. **Reading Measure**: Use `.measure-editorial` (`max-width: 65ch`) on long-form narrative paragraphs.
4. **Display Descender Protection**: `.text-display` menyertakan `padding-bottom: 0.08em` (leading ketat `0.96`), sedangkan `.text-display-sm` sengaja memakai `padding-bottom: 0.04em` karena leading-nya lebih longgar (`1.05`), sehingga ruang batas bawah descender (`y`, `p`, `g`) sudah terlindungi tanpa menciptakan ruang kosong berlebih.
5. **Trailing Tracking Compensation**: Center-aligned Geist Mono labels with wide tracking (`+0.14em`) must use `.text-mono-center` (`margin-right: -0.14em`) to compensate for the trailing space and ensure optical symmetry.

### Section Statement Typographic Architecture & Reading Measure
Untuk mempertahankan konsistensi hirarki editorial lintas section (Cross-Section Hierarchy) tanpa persaingan visual (typographic collision):

1. **About Me — Editorial Manifesto Statement (`AboutPortfolioSection.tsx`)**:
   - **Token**: `.text-h2` (`26px` $\rightarrow$ `40px`, leading `1.15`, tracking `-0.02em`).
   - **Weight**: Native canonical token weight (`600`), tanpa override `font-normal`.
   - **Measure / Width**: `max-w-[1040px]` (~50–55ch), col-start-4 col-span-9 pada 12-column grid.
   - **Semantics**: Tag `<p>` naratif editorial dengan prefix tag `[about]`.

2. **Featured Work — Positioning & Transition Statement (`FeaturedWorkSection.tsx`)**:
   - **Token**: `.text-h2` (`26px` $\rightarrow$ `40px`, leading `1.15`, tracking `-0.02em`). Diturunkan dari legacy H1 agar proporsional secara vertikal terhadap grid kartu proyek.
   - **Weight**: Native canonical token weight (`600`), tanpa override ad-hoc.
   - **Measure / Width**: `max-w-[1040px]` (~50ch) untuk densitas per baris yang ideal (38–54 karakter per baris), selaras dengan About Me manifesto.
   - **Semantics**: Tag `<h2>` section heading dengan inner line containers (`desktop-line-1`, `desktop-line-2`) untuk koreografi GSAP reveal.

3. **What I Do — Section Header & Core Mission Statement (`WhatIDoSection.tsx`)**:
   - **Header Title**: `.text-h1` (`34px` $\rightarrow$ `56px`), standard token weight (menghapus `font-black` untuk estetika monokromatik Swiss modernist yang tenang).
   - **Mission Statement**: `.text-h3` (`20px` $\rightarrow$ `28px`, leading `1.22`, tracking `-0.015em`). Menghapus responsive jump `sm:text-h2` dan custom `tracking-tight` guna menjaga rasio harmonik oktaf 2:1 terhadap judul H1 section (56px : 28px).
   - **Semantics**: `<h2>` untuk header judul, `<p>` untuk paragraf misi.

### Pengecualian yang Disengaja (Intentional Exceptions)
Area-area berikut secara eksplisit dikecualikan dari skala fluid viewport (`vw`):
1. **Pitchdeck Widget & Interactive Deck (`src/components/deck/`)**:
   - *Karakteristik*: `DeckSidebar` berukuran lebar tetap (`w-[230px]`), dan slide presentasi di `AboutDeck` / `DeckPanels` adalah kanvas bernisbah tetap yang diskalakan secara matematis menggunakan transformasi GSAP (`scale`).
   - *Alasan*: Menerapkan skala fluid berbasis `vw` pada kontainer yang lebarnya statis akan merusak proporsi teks; teks akan membesar saat lebar viewport bertambah meskipun sidebar tetap 230px, mengakibatkan overflow dan text wrapping yang rusak. Area ini wajib menggunakan ukuran font statis (`rem`/`px`) atau Container Queries (`@container`).
2. **ASCII Grid Preloader & Background Canvas Art (7–8.5px)**:
   - *Karakteristik*: Monospace art sel karakter di `Preloader.tsx` dan `AboutPortfolioSection.tsx` (`ASCII_TREE`).
   - *Alasan*: Elemen ini bersifat murni dekoratif grafis terminal dan wajib ditandai `aria-hidden="true"`. Ukuran mikro 7–8.5px dengan leading ketat (7.5–8.5px) diperlukan agar matriks kolom dan baris karakter ASCII tersusun presisi membentuk pola visual tanpa terdistorsi oleh fluid scaling.
3. **Miniatur Preview Kartu Portfolio (Micro Previews 6.5–7px)**:
   - *Karakteristik*: Label mikro pada miniatur kartu mock di dalam `FeaturedWorkSection.tsx`.
   - *Alasan*: Merupakan render miniatur skala mini (~120px) yang merepresentasikan thumbnail UI kartu secara visual.
4. **3D WebGL HUD Overlay Chips & Badges (`FieldLogCanvas3D.tsx:168`)**:
   - *Karakteristik*: Label chip petunjuk orbital 3D (`[ 360° ORBIT · DRAG TO ROTATE · SCROLL TO ZOOM ]`), berukuran mikro (`text-[9px] sm:text-[10px]`).
   - *Alasan*: Bersifat petunjuk gestur visual kamera 3D overlay yang murni dekoratif dan ditandai `aria-hidden="true"` agar diabaikan oleh pembaca layar.

---

## 4. SPACING SYSTEM

Base spacing unit is `4px` (`var(--space-1)`). All layout margins, paddings, and flex/grid gaps must align strictly to this scale:

| Token | Value (px) | Tailwind Equivalent | Use Case |
| :--- | :--- | :--- | :--- |
| `--space-1` | `4px` | `1` | Micro-offsets, icon gaps, dot-indicator spacing |
| `--space-2` | `8px` | `2` | Button inner padding, tight text gaps, pill vertical padding |
| `--space-3` | `12px` | `3` | Small component gaps, metadata row spacing |
| `--space-4` | `16px` | `4` | Standard flex gap, card inner padding, ticker bottom padding |
| `--space-6` | `24px` | `6` | Medium component spacing, modal internal padding |
| `--space-8` | `32px` | `8` | Large component spacing, 12-col grid gutters |
| `--space-10` | `40px` | `10` | Intermediate layout spacing, compact/small-device container horizontal padding (`sm:`) |
| `--space-12` | `48px` | `12` | Sub-section vertical rhythm, desktop grid gutters |
| `--space-14` | `56px` | `14` | Wide layout gaps, desktop container horizontal padding |
| `--space-16` | `64px` | `16` | Section inner vertical padding (mobile viewports) |
| `--space-20` | `80px` | `20` | Section inner vertical padding (tablet viewports) |
| `--space-24` | `96px` | `24` | Section inner vertical padding (desktop viewports) |

---

## 5. GRID & CONTAINER SYSTEM

### Containers
- **Wide Composition Container (`--container-wide: 1740px`)**:
  - Used for composition-driven stages: Hero section, 3D WebGL canvas overlay, Bottom Ticker, and Featured Work layout.
  - Horizontal padding: `px-6 sm:px-10 lg:px-14` (`var(--space-6)` / `var(--space-10)` / `var(--space-14)`).
- **Editorial Content Container (`--container-content: 1240px`)**:
  - Used for content-driven reading layouts: narrative biographies, technical specifications, and legal notes.

### Grid Columns & Gutters
- Standard Grid: 12-column CSS Grid.
- Gutters: `--space-8` (`32px`) on tablet/desktop, scaling up to `--space-12` (`48px`) on wide screens (`>= 1280px`).

---

## 6. BREAKPOINTS & RESPONSIVE BEHAVIOR

All responsive transformations are strictly tokenized:

| Breakpoint Token | Min Width | Layout Transformation |
| :--- | :--- | :--- |
| `--breakpoint-sm` | `640px` | Small devices; enables dual columns in compact grids |
| `--breakpoint-md` | `768px` | Tablet devices; 8-column grid, compact navigation |
| `--breakpoint-lg` | `1024px` | Desktop baseline; full 12-column grid, sticky splits |
| `--breakpoint-xl` | `1280px` | Large desktop; expanded editorial gutters (`var(--space-12)`) |
| `--breakpoint-2xl`| `1536px` | Ultrawide screens; capped at `var(--container-wide)` |

### Responsive Layout Rules:
- **Desktop (`>= var(--breakpoint-lg)`)**:
  - Full 12-column layout. Hero splits 8 columns for Headline/ASCII Eyebrow and 4 columns for Narrative Quote & Bio.
  - Section vertical padding defaults to `var(--space-24)` (`96px`).
  - Bottom Ticker shows all 6 editorial modules across 12 columns.
- **Tablet (`var(--breakpoint-md)` to `var(--breakpoint-lg)`)**:
  - Grids collapse to 8 columns or 2-column stacked cards.
  - Section vertical padding scales to `var(--space-20)` (`80px`).
  - Bottom Ticker hides secondary labels (`FOLLOW US`), retaining social links, clock, and language.
- **Mobile (`< var(--breakpoint-md)`)**:
  - All multi-column editorial splits collapse to a single column (100% width).
  - Horizontal scrolling (`overflow-x-auto`) is employed for project cards and data tables.
  - Section vertical padding scales to `var(--space-16)` (`64px`).
  - Bottom Ticker collapses to space-between flex row: Location, Clock, and Language Switcher (social links hidden).

---

## 7. COMPONENT & PATTERN SYSTEM

### Core UI Components

#### 1. Navbar Pill (`src/components/Navbar.tsx`)
- **Container**: `fixed top-0 left-0 w-full z-50 pointer-events-none flex items-center justify-between`. Layer: `var(--z-nav)`.
- **Center Nav Cluster**: Pointer-events auto, absolute center flank (`md:left-[46%] lg:left-[48%] xl:left-[50%]`).
- **Nav Buttons**:
  - Padding: `px-2.5 sm:px-3 py-1`.
  - Border Radius: `var(--radius-secondary)` (`3px`).
  - Hover / Active Background: Warm-charcoal fill `var(--color-nav-hover-bg)` (`#383531`) with `scale-x-0` -> `scale-x-100` transition, driven by GSAP (duration: `var(--duration-medium)`, `var(--ease-smooth)`).
  - Text: `var(--font-sans)`, `13px` to `14px`, `font-medium`. Inactive: `var(--color-text-secondary)`, Active/Hover: `var(--color-text)`.
- **CTA Button (`LET'S TALK`)**:
  - Height: `31px` fixed slim height.
  - Background: Chalk White `var(--color-text)`, hover `var(--color-cta-hover-bg)` (`#D8D8D2`).
  - Radius: `4.5px` squircle.
  - Anatomy: 23x23px avatar thumbnail + double-layer slide-up text (`var(--font-jakarta)` `text-[11px]` `font-bold` tracking `0.16em` uppercase) + 23x23px black box `var(--color-cta-icon-bg)` (`#0A0A09`) wrapping diagonal arrow with GSAP-driven slide-out/slide-in transition (`var(--duration-fast)`, `var(--ease-smooth)`).

#### 2. Project Card (Mini)
- Dimensions: Height `120px`, Width `96px` or `176px`.
- Border Radius: `var(--radius-secondary)` (`3px`).
- Border: `var(--border-hairline)` (`1px`) solid `var(--color-border)`.
- Hover Effect: Scale `var(--card-hover-scale)` (`1.03`) with `var(--ease-smooth)`.

#### 3. Standard Buttons
- **Primary Button (`.btn-primary`)**:
  - Background: `var(--color-text)` (`#E2E2DD`), Text: `var(--color-selection-fg)` (`#010101`).
  - Radius: `var(--radius-primary)` (`5.33px`).
  - Font: `var(--font-mono)`, `var(--text-caption)` (`11px`), `font-bold`, tracking `0.16em`, uppercase.
  - Padding: `8px 16px` (`var(--space-2)` `var(--space-4)`). Hover: translateY(-1px), background `var(--color-btn-hover-bg)` (`#FFFFFF`).
- **Secondary Button (`.btn-secondary`)**:
  - Background: `var(--color-surface)` (`#161819`), Text: `var(--color-text)` (`#E2E2DD`).
  - Border: `var(--border-hairline)` (`1px`) solid `var(--color-border)`.
  - Radius: `var(--radius-primary)` (`5.33px`).
  - Font: `var(--font-mono)`, `var(--text-ticker)` (`10px`), `font-medium`, tracking `0.18em`, uppercase.
  - Padding: `6px 12px`.

#### 4. Field Log Modal ⚠️ NEEDS SOURCE VERIFICATION
> This component is referenced elsewhere in this document — Section 12 assigns it `--z-overlay`, and Section 4's spacing table implies `--space-6` for its internal padding — but it has never actually been documented with real anatomy, dimensions, or motion specs. **The items below are inferred only from those cross-references, not extracted from source.** Do not treat this as verified fact. Paste the actual component file (path and contents) so this entry can be completed and marked resolved.
- **Confirmed only from cross-references**:
  - Layer: `var(--z-overlay)` (z: 9999) — implies a full-screen overlay above nav and cursor.
  - Internal padding: likely `var(--space-6)` (24px) — unconfirmed.
- **Still missing, required from source**:
  - Open/close trigger and state management.
  - Entrance/exit animation — must be specified as a GSAP tween with explicit `var(--duration-*)` and `var(--ease-*)` tokens per Section 10.
  - Backdrop treatment (color, opacity — needs its own token if not already covered by `--color-bg` at reduced opacity).
  - Fixed dimensions or responsive behavior across breakpoints.
  - Typography and any reused components (buttons, tags, close icon) from this section.

---

## 8. SIGNATURE COMPONENTS SPECIFICATIONS

These 6 signature elements define the identity of the website. All implementations must use the semantic tokens defined below, and all motion in this section is authored through GSAP per Section 10's GSAP-Only Motion Rule.

### 1. Massive Kinetic Typography (Hero Headline)
- **Source**: `src/components/sections/HeroSection.tsx`
- **Anatomy**:
  - 2-line stacked heading inside `lg:col-span-8`.
  - Line 1: e.g. "PRASTYO" / "EXPLORE".
  - Line 2: e.g. "ARLAN" / "THE EARTH".
  - Each line is wrapped in a masked container with `.headline-text-mask` (linear-gradient mask: `transparent 0%, black 12%, black 88%, transparent 100%`) with row height `h-[1.15em] py-0.5`.
- **Typography & Scale**:
  - Font: `var(--font-display)`, Weight `800` (extrabold), tracking `-0.04em` (`tracking-tight`), uppercase, line-height `0.92`.
  - Size: `var(--text-display-xl)` (`clamp(2.4rem, 5.4vw, 84px)` fluid).
- **Kinetic Timing & Motion Tokens**:
  - Auto-advance interval: `var(--interval-kinetic)` (`4.2s` / 4200ms), loops continuously between headline pairs.
  - Incoming line 1: GSAP tween `headlineSlideUpFromBottom`, duration `var(--duration-kinetic)` (`0.95s` / 950ms), ease `var(--ease-smooth)` (rises from +50% Y, initial blur `4px` to `0px`).
  - Incoming line 2: Staggered delay of `var(--duration-stagger)` (`0.1s` / 100ms backwards).
  - Outgoing line: Smoothly translates to `translateY(-50%)` while fading to `opacity: 0` and `filter: blur(3px)` over `var(--duration-kinetic)` (`0.95s`).
  - Preloader entrance: Sweeps in from left (`x: -80, opacity: 0` to `x: 0, opacity: 1`) over `var(--duration-kinetic)` with `var(--ease-power3)` (GSAP `ease: "power3.out"`).
- **Eyebrow Tag (`AsciiScrambleTag`)**:
  - Sits directly above the headline. Font: `var(--font-mono)`, `var(--text-ticker)` (`10px`), tracking `0.26em`, uppercase, color `var(--color-text)`, `font-bold`.
  - Automatically decodes via ASCII character cycle (`.:+-/\*><_~=`) from `[ EARLY CAREER ]` to `[ AVAILABLE FOR WORK ]` `var(--duration-slow)` (`1.2s`) after preloader finishes. Scrambles and toggles on user hover.

### 2. 8px Precision Cursor Dot (`HalftoneCursorTrail.tsx`)
- **Source**: `src/components/HalftoneCursorTrail.tsx`
- **Anatomy**: Single fixed dot inside `fixed inset-0 pointer-events-none` on layer `var(--z-cursor)` (z: 50).
- **Dimensions & Styling**:
  - Dimensions: `var(--cursor-size)` x `var(--cursor-size)` (`8px x 8px`).
  - Shape: `var(--radius-full)` (`rounded-full`).
  - Color: `var(--color-cursor)` (`#FFD000`, matching 3D character's yellow jacket).
  - Ambient Glow: `shadow-[0_0_8px_rgba(255,208,0,0.4)]`.
- **Motion & GPU Physics**:
  - Lerp factor: Smooth spring inertia `0.22` (`dx * 0.22`, `dy * 0.22`), driven by GSAP's ticker loop (`gsap.ticker.add()`), not `requestAnimationFrame` called in isolation.
  - GPU Sleep: Automatic loop suspension when motion delta `< 0.15px` to eliminate idle GPU cycles.
  - Hover Interaction: Detects closest clickable elements (`a, button, [role='button'], input, select, textarea, .cursor-pointer, [data-interactive='true']`).
  - Exit Transition: GSAP tween (`gsap.to()`) scales down and fades out (`opacity: 0, scale: 0`) over `var(--duration-micro)` (`0.2s` / 200ms) using `var(--ease-smooth)`. **No native CSS `transition` is used here or anywhere else in the cursor system** — see Section 10's GSAP-Only Motion Rule.
- **Breakpoint Rule**: Completely disabled on touch devices via `window.matchMedia("(pointer: coarse)")`.

### 3. Dot-Raster Wave Transition (`DotRasterTransition.tsx`)
- **Source**: `src/components/DotRasterTransition.tsx`
- **Anatomy**: Fullscreen `<canvas>` positioned `absolute inset-0 w-full h-full pointer-events-none` on layer `var(--z-foreground)` (z: 20).
- **Grid & Halftone Aesthetics**:
  - Grid: `var(--dot-raster-grid)` (`10px` square-pixel grid).
  - Dot Sizes: Ranges from `var(--dot-raster-size-min)` (`1.5px` delicate top dither) to `var(--dot-raster-size-max)` (`11px` fusing completely into solid base).
  - Dot Geometry: Crisp square pixels (`ctx.fillRect(rx, ry, rSize, rSize)`).
  - Color: Solid `var(--color-section-accent)` (`#D8382B`) with zero alpha blending for punchy contrast.
- **Wave Math & Phasing**:
  - Driven by ScrollTrigger scroll progress (`0.00` to `1.00`), synced to GSAP ticker:
    - **Phase 1 (`0.000` to `0.015`)**: Bottom bar wipes out (`var(--duration-fast)`, `0.3s`); dot raster remains hidden.
    - **Phase 2 (`0.015` to `0.350`)**: Halftone wave sweeps upward (`height + 120 - wp * D`).
    - Wave Composition: 4-harmonic sine/cosine curves (`w1` 58px @ 0.007, `w2` 32px @ 0.016, `w3` 16px @ 0.035, `w4` 8px @ 0.070) plus deterministic pseudo-random hash dither noise (`20px` scatter).
    - Synchronized Ride-Along: Coordinates direct 1-call-stack `translate3d` on `textContainerRef` and `workRideAlongRef` on the same frame to prevent subpixel antialiasing jitter.
    - **Phase 3 (`0.350` to `1.000`)**: Screen 100% filled with red. GPU Sleep triggers: commits one single `ctx.fillRect(0, 0, width, height)` and halts render loop until reverse scroll `< 0.350`.

### 4. 12-Column Editorial Bottom Ticker (`HeroSection.tsx`)
- **Source**: `src/components/sections/HeroSection.tsx` (lines 531-656)
- **Anatomy**:
  - Horizontal hairline: Height `var(--border-rule)` (`1.5px`), `bg-[#E2E2DD]/20`, margin-bottom `var(--space-4)` (`16px`), draws left-to-right (`scaleX: 1`, duration `var(--duration-normal)` with `var(--ease-smooth)`).
  - Micro-typography grid: 12-column layout on layer `var(--z-foreground)` (z: 20).
- **Column Structure**:
  - `Cols 1-3`: Location indicator `NORTH SUMATRA` (`font-bold`, uppercase).
  - `Cols 4-7`: Studio Clock `[ HH : MM : SS ]` (`tabular-nums`, live 1-second interval).
  - `Cols 8-9`: Section header `FOLLOW US` (`var(--color-text-secondary)`, `font-medium`).
  - `Col 10`: Social link `INSTAGRAM +` (`var(--color-text-secondary)` hover `var(--color-text)`).
  - `Col 11`: Social link `LINKEDIN +` (`var(--color-text-secondary)` hover `var(--color-text)`).
  - `Col 12`: Language switch `ID ◉ EN` (pill slider toggle).
- **Typography & Dimensions**:
  - Font: `var(--font-mono)`, size `var(--text-ticker)` (`10px` to `11px`), tracking `0.20em` to `0.22em`, uppercase.
  - Position: `absolute bottom-0 inset-x-0 z-20`, padding `pb-3 sm:pb-4`.
- **Motion & Scroll Wipeout**:
  - On scroll progress > 0.015: Items wipe left (`clipPath: inset(0 100% 0 0)`, `x: -18px`, duration `var(--duration-fast)` / `0.3s`) and bottom line collapses (`scaleX: 0`). Restores when scroll <= 0.005.
- **Breakpoint Behavior**:
  - Desktop (`>= var(--breakpoint-lg)`): Full 12-column grid.
  - Tablet (`var(--breakpoint-md)` - `var(--breakpoint-lg)`): Hides `FOLLOW US`, retains social links and clock/language.
  - Mobile (`< var(--breakpoint-md)`): Flex row space-between: Location + Studio Clock + Language Switcher (social links hidden).

### 5. Studio Clock & Operational Indicator
- **Source**: `src/components/sections/HeroSection.tsx` & `src/components/sections/AboutMeSection.tsx`
- **Anatomy**:
  - Ticker Clock: Live 24-hour time string `[ HH : MM : SS ]` enclosed in muted bracket delimiters (`text-[#E2E2DD]/40`).
  - Status Dot: `var(--cursor-size)` (`8px x 8px`) circular indicator (`var(--radius-full)`, `var(--color-signal)`, `animate-pulse`) signaling active operational status inside identity pills and metadata headers.
- **Typography & Color**:
  - Font: `var(--font-mono)`, `tabular-nums` (strictly prevents horizontal jitter as digits change).
  - Color: Clock text uses `var(--color-text)` (`#E2E2DD`); pulse dot uses `var(--color-signal)` (`#FFD904`).
  - Tracking: `0.18em` to `0.22em`.

### 6. Interactive Career Timeline Table (`TimelineTable.tsx`)
- **Source**: `src/components/TimelineTable.tsx`
- **Anatomy**:
  - Container: `w-full max-w-[420px] sm:max-w-[450px] md:max-w-[480px]`.
  - Top Bar: `[JOURNEY]` tag (left, bold mono) + Counter `01 — 05` (right, tabular-nums).
  - 5 career rows separated by `var(--border-hairline)` (`1px`) space.
  - Row Grid (12 cols): `col-span-6` for Company, `col-span-4` for Role, `col-span-2` for Year (`text-right`).
- **Typography & Dimensions**:
  - Font: `var(--font-jakarta)`, size `var(--text-caption)` (`11px`), uppercase, tracking `0.03em`, line-height `1.0` (`leading-none`).
  - Padding: `px-2 py-[1.5px]`. Radius: `var(--radius-hairline)` (`1.5px`).
- **Dual-Layer Dynamic Stencil Inversion**:
  - **Base Layer**: `var(--color-text)` on `rgba(226, 226, 221, 0.05)` background.
  - **Animated Overlay Layer**: Solid `var(--color-text)` fill with dark `var(--color-bg)` text sweeping left-to-right via GSAP tween `timelineLoaderClip`, duration `var(--interval-timeline)` (`8.5s` / 8500ms), linear ease (`clip-path: inset(0 100% 0 0)` to `inset(0 0% 0 0)`).
  - Cycle Duration: Auto-advances every `var(--interval-timeline)` (`8.5s`) to the next item; resets upon click.
  - Inactive Rows: Color `var(--color-text-secondary)`, transitions to `var(--color-text)` with background hover `rgba(226, 226, 221, 0.06)` over `var(--duration-micro)` (`0.2s`).

---

## 9. BORDER & RADIUS SYSTEM

Radius rules are strict. **Do not use border-radius larger than 6px** on any UI component (except full-round badges and cursor).

### Tokens & Rationale

- `--radius-primary`: `5.33px`
  - **Mathematical Rationale**: Extracted directly from the Lama Lama design identity scrape. Represents an exact 1/3 ratio of the base 16px spatial grid (`16px / 3 = 5.333px`).
  - **Rule**: **DO NOT ROUND** this value to 5px or 6px. It creates the subtle, tactile squircle signature seen in primary buttons and main cards.
- `--radius-secondary`: `3px`
  - Used for micro-components, navigation buttons, mini project cards, and avatar wrappers.
- `--radius-micro`: `2px`
  - Used for internal pill slider thumbs and small indicator badges.
- `--radius-hairline`: `1.5px`
  - Used for timeline table rows and ultra-dense data rows where standard 2px rounding appears overly soft.
- `--radius-full`: `9999px`
  - Restricted strictly to circular elements: 8px cursor dot, operational status pills, and toggle sliders.

### Hairline Borders
- Width: `var(--border-hairline)` (`1px`) or `var(--border-rule)` (`1.5px`).
- Color: `var(--color-border)` (`rgba(226, 226, 221, 0.14)`) on dark canvas; `rgba(17, 18, 19, 0.15)` on red sections.
- Box Shadows: Never use fuzzy drop shadows. Use only subtle hairlines and high background contrast.

---

## 10. MOTION & INTERACTION SYSTEM

### Engine Roles
- **GSAP**: Core animation engine for all element tweens, staggers, and timelines.
- **Lenis**: Global smooth scrolling provider. Completely normalizes and overrides native scroll.
- **ScrollTrigger**: Binds scroll offsets to GSAP timelines and progress references.
- **IntersectionObserver**: Viewport detection for transformed containers where ScrollTrigger cannot calculate natural offsets.

### GSAP-Only Motion Rule
**All interactive motion — including hover states, exit transitions, and other micro-interactions, not just large scroll-driven sequences — must be authored through GSAP** (`gsap.to()`, `gsap.fromTo()`, `gsap.timeline()`). Native CSS `transition` / `animation` properties are never used for interactive motion on this site, even for small state changes like a cursor exit or a button hover. This keeps a single timing authority across the codebase and prevents drift between CSS easing curves and GSAP easing curves. If a future component genuinely needs a CSS-only transition for a documented performance reason, that exception must be proposed and logged in the Decision Log (Section 17) before implementation — per Section 14's Conflict Resolution Protocol.

### Easing Token Consumption
The three easing tokens below are not interchangeable in how they are consumed:
- `--ease-expo` (`expo.out`) and `--ease-power3` (`power3.out`) are **GSAP-native ease string identifiers**. They are only meaningful inside GSAP's `ease:` property (e.g. `gsap.to(el, { ease: "expo.out" })`) — they are **not** valid CSS `transition-timing-function` values and must never be written directly into CSS.
- `--ease-smooth` (`cubic-bezier(0.22, 1, 0.36, 1)`) is dual-compatible: it is a valid CSS `transition-timing-function` value and can also be passed as a GSAP ease. Per the GSAP-Only Motion Rule above, it should still always be invoked through GSAP rather than a raw CSS `transition`, even though it would technically work as one.

### Motion Distance & Timing Tokens

| Token | Canonical Value | Use Case |
| :--- | :--- | :--- |
| `--motion-distance-sm` | `20px` | Micro-reveals, tag entrances, button hover shifts |
| `--motion-distance-md` | `40px` | Standard text blocks, card grid appearances |
| `--motion-distance-lg` | `80px` | Hero elements, giant headline sweeps |
| `--duration-micro` | `0.2s` (200ms) | Cursor hover scaling exit/enter, row color transitions |
| `--duration-fast` | `0.3s` (300ms) | Button hovers, ticker wipeouts, micro-interactions |
| `--duration-medium` | `0.5s` (500ms) | Navbar pill expander, capsule active transitions |
| `--duration-normal` | `0.85s` (850ms) | Card reveals, horizontal line draws, standard transitions |
| `--duration-kinetic` | `0.95s` (950ms) | Hero headline masked editorial sweeps |
| `--duration-slow` | `1.2s` (1200ms) | Section entrance sweeps, Lenis smooth scroll jumps |
| `--duration-stagger` | `0.1s` (100ms) | Line 2 kinetic headline stagger delay |
| `--interval-kinetic` | `4.2s` (4200ms) | Hero headline continuous rotation interval |
| `--interval-timeline` | `8.5s` (8500ms) | Timeline table auto-advance cycle |
| `--ease-expo` | `expo.out` | Snappy, sharp editorial entrances (GSAP-only) |
| `--ease-smooth` | `cubic-bezier(0.22, 1, 0.36, 1)` | Fluid continuous transformations (Lama Lama signature); dual CSS/GSAP-compatible |
| `--ease-power3` | `power3.out` | Staggered entrance sequences (Hero elements) (GSAP-only) |

---

## 11. EFFECTS & VISUAL INTENSITY

Visual intensity must be disciplined to keep the technical brutalist aesthetic clean:

### Priority Hierarchy:
1. Content & Data
2. Typography
3. 3D Spatial Character
4. Physical Wave Transition
5. Ambient Decorative Effects

### Tokenized Effects:
- **Film Grain**: `var(--film-grain-opacity)` (`0.025`, fixed overlay, `pointer-events: none`).
- **Blur Reveal**: Initial `var(--blur-reveal-initial)` (`8px` / `3px`) -> Final `0px`.
- **Card Hover Scale**: `var(--card-hover-scale)` (`1.03`) with `var(--ease-smooth)`.
- **Precision Cursor Size**: `var(--cursor-size)` (`8px x 8px`) with `shadow-[0_0_8px_rgba(255,208,0,0.4)]`.
- **Dot-Raster Grid**: `var(--dot-raster-grid)` (`10px`).
- **Dot-Raster Min Size**: `var(--dot-raster-size-min)` (`1.5px`).
- **Dot-Raster Max Size**: `var(--dot-raster-size-max)` (`11px`).

---

## 12. LAYERING & Z-INDEX SYSTEM

To eliminate z-index collisions, all layers are strictly categorized:

| Layer Token | Z-Index | Purpose & Assigned Components |
| :--- | :--- | :--- |
| `--z-max` | `99999` | Preloader (`Preloader.tsx`), full screen takeovers |
| `--z-overlay` | `9999` | Film Grain overlay, full-screen Field Log modal |
| `--z-cursor` | `50` | Halftone Cursor Trail (`HalftoneCursorTrail.tsx`) |
| `--z-nav` | `50` | Fixed Navigation Bar (`Navbar.tsx`) |
| `--z-track` | `30` | Hero physical ride-along container, sticky about sidebar |
| `--z-foreground` | `20` | Hero text container, bottom ticker, Dot Raster canvas |
| `--z-intermediate`| `10` | Card internal badges, Preloader canvas |
| `--z-canvas` | `0` | WebGL 3D Canvas (`HeroCanvas3D.tsx`), viewport canvas |
| `--z-behind` | `-1` | Under-canvas base layer (gradients placed behind 3D) |

---

## 13. ACCESSIBILITY & CONTRAST NORMS

All color pairings have been audited against WCAG 2.1 standards:

| Foreground Token | Background Token | Contrast Ratio | WCAG Compliance | Implementation Guidance |
| :--- | :--- | :--- | :--- | :--- |
| `var(--color-text)` (`#E2E2DD`) | `var(--color-bg)` (`#08090A`) | **14.2 : 1** | **Passes AAA** (Normal & Large) | Primary text, titles, active links |
| `var(--color-text-secondary)` (`#908C87`) | `var(--color-bg)` (`#08090A`) | **5.1 : 1** | **Passes AA** (Normal), **AAA** (Large) | Body paragraphs, secondary metadata |
| `var(--color-section-accent-foreground)` (`#111213`) | `var(--color-section-accent)` (`#D8382B`) | **3.8 : 1** | **Passes AA Large** (>= 18px / bold) | Headings and bold tags on red sections |
| `var(--color-text-on-accent)` (`#FFFFFF`) | `var(--color-section-accent)` (`#D8382B`) | **4.7 : 1** | **Passes AA** (Normal Text) | Mandated for small reading body copy (< 14px) on red |
| `var(--color-selection-accent-fg)` (`#F4F2ED`) | `var(--color-selection-accent-bg)` (`#111213`) | **16.0 : 1** | **Passes AAA** | Highlight selection text color on red background |
| `var(--color-cursor)` (`#FFD000`) | `var(--color-bg)` (`#08090A`) | **13.5 : 1** | **Passes AAA** | High-visibility interactive cursor |

### Accessibility Rules:
- For secondary text (`var(--color-text-secondary)`) under `12px` (e.g., micro-labels), apply `font-weight: 600` or `700` to maintain crisp legibility.
- On red sections (`var(--color-section-accent)`), small reading copy under `14px` must use `var(--color-text-on-accent)` (`#FFFFFF`) or `font-semibold` to satisfy contrast baselines.

---

## 14. SOURCE OF TRUTH & CONFLICT RESOLUTION PROTOCOL

`DESIGN.md` is the canonical contract for all visual code. When discrepancies occur, follow this strict protocol:

### Conflict Resolution Rule:
1. **`DESIGN.md` WINS OVER CODE**: If existing code in any component or CSS file conflicts with `DESIGN.md`, the code is considered legacy technical debt and must be refactored to align with `DESIGN.md`.
2. **NO AD-HOC INLINE VALUES**: An AI must **never** copy an arbitrary inline hex color, hardcoded pixel font size, or non-tokenized radius found in an older component.
3. **DOCUMENTATION PRECEDES CODE**: If a deliberate design decision requires changing an established token or adding a new component pattern, `DESIGN.md` must be updated and recorded in the Decision Log **first**, before modifying component code.
4. **UNVERIFIED SECTIONS ARE FLAGGED, NOT INVENTED**: If a component is referenced elsewhere in this document but has no full specification (see Section 7.4, Field Log Modal), it must be marked `⚠️ NEEDS SOURCE VERIFICATION` rather than filled in with invented specifics. An AI must never present a guess as extracted fact.

---

## 15. DO / DON'T & AI IMPLEMENTATION RULES

### AI IMPLEMENTATION RULE: DO NOT INVENT
Do not invent new visual patterns when an existing token can satisfy the requirement. Before introducing a new color, font, size, spacing value, radius, animation easing, or z-index, **check DESIGN.md first**.

### DO:
- **DO** use semantic tokens (`var(--color-bg)`, `var(--text-h1)`, `var(--space-4)`, `var(--radius-primary)`).
- **DO** use `clamp()` for responsive typography on major display headings.
- **DO** wrap mono tags in brackets `[ LIKE THIS ]` when used as metadata labels.
- **DO** use `tabular-nums` on all numbers, timers, clocks, and counters.
- **DO** respect the 10px square-pixel grid (`var(--dot-raster-grid)`) for halftone or raster effects.
- **DO** reference timing tokens (`var(--duration-kinetic)`, `var(--duration-micro)`, `var(--duration-medium)`, `var(--duration-fast)`) in animation timelines.
- **DO** author every interactive motion — including simple hover and exit states — through GSAP (`gsap.to()`, `gsap.fromTo()`), per Section 10's GSAP-Only Motion Rule.

### DON'T:
- **DON'T** introduce standard Tailwind colors (`text-blue-500`, `bg-gray-800`). Use CSS variables.
- **DON'T** use soft blurry drop shadows (`shadow-lg`). Use 1px hairlines and contrast.
- **DON'T** round `var(--radius-primary)` (`5.33px`) to 5px or 6px.
- **DON'T** mix unapproved fonts. Stick strictly to Geist Sans, Geist Mono, Newsreader, Geist Pixel Grid, and Plus Jakarta Sans.
- **DON'T** invent arbitrary z-index numbers (`z-[99]`, `z-[100]`). Use the formal z-index scale.
- **DON'T** write raw timing numbers (e.g., 950ms, 500ms, 200ms) without mapping them to semantic duration tokens.
- **DON'T** implement any interactive motion — including micro-interactions like hover or exit states — with native CSS `transition` or `animation` properties. Use GSAP, per Section 10.
- **DON'T** write `--ease-expo` or `--ease-power3` into a raw CSS `transition-timing-function`. They are GSAP-only ease strings — see Section 10's Easing Token Consumption rules.

---

## 16. CONSOLIDATED TOKENS QUICK REFERENCE

```css
/* ─────────────────────────────────────────────────────────────
   CANONICAL CSS TOKENS (DESIGN.md v5 QUICK REFERENCE)
   ───────────────────────────────────────────────────────────── */

:root {
  /* ── Color Tokens ── */
  --color-bg:                         #08090A;
  --color-surface:                    #161819;
  --color-surface-glass:              rgba(20, 22, 22, 0.50);
  --color-nav-hover-bg:               #383531;
  --color-text:                       #E2E2DD;
  --color-text-secondary:             #908C87;
  --color-border:                     rgba(226, 226, 221, 0.14);
  --color-border-hover:               rgba(255, 255, 255, 0.30);
  --color-section-accent:             #D8382B;
  --color-section-accent-foreground:  #111213;
  --color-section-accent-muted:       rgba(17, 18, 19, 0.70);
  --color-text-on-accent:             #FFFFFF;
  --color-btn-hover-bg:               #FFFFFF;
  --color-cta-hover-bg:               #D8D8D2;
  --color-cta-icon-bg:                #0A0A09;
  --color-cursor:                     #FFD000;
  --color-signal:                     #FFD904;
  --color-alert:                      #FF3B30;
  --color-selection-bg:               #E2E2DD;
  --color-selection-fg:               #010101;
  --color-selection-accent-bg:        #111213;
  --color-selection-accent-fg:        #F4F2ED;

  /* ── Font Family Tokens ── */
  --font-sans:                        var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono:                        var(--font-geist-mono), ui-monospace, monospace;
  --font-display:                     var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-serif:                       'Newsreader', 'Cormorant Garamond', Georgia, serif;
  --font-editorial:                   'Newsreader', 'Cormorant Garamond', Georgia, serif;
  --font-pixel-grid:                  var(--font-geist-pixel-grid), var(--font-geist-mono), monospace;
  --font-jakarta:                     'Plus Jakarta Sans', var(--font-geist-sans), sans-serif;

  /* ── Typography Scale Tokens ── */
  --text-display-xl:                  clamp(44px, 6.6vw, 96px); /* Weight 800, line-height 0.92, -0.04em */
  --text-display-lg:                  clamp(32px, 4.4vw, 64px); /* Weight 700, line-height 1.05, -0.04em */
  --text-h1:                          clamp(44px, 5.5vw, 76px); /* Weight 500, line-height 1.00, -0.035em */
  --text-h2:                          22px;                     /* Weight 500, line-height 1.08, -0.02em */
  --text-h3:                          18px;                     /* Weight 500, line-height 1.10, -0.01em */
  --text-body-lg:                     16px;                     /* Weight 400, line-height 24px, -0.01em */
  --text-body:                        14px;                     /* Weight 400, line-height 1.50, normal */
  --text-body-sm:                     12px;                     /* Weight 400, line-height 1.50, normal */
  --text-caption:                     11px;                     /* Weight 600, line-height 1.00, 0.16em */
  --text-ticker:                      10px;                     /* Weight 700, line-height 1.00, 0.22em */
  --text-label:                       9px;                      /* Weight 500, line-height 1.00, 0.24em */

  /* ── Spacing Tokens (Base 4px) ── */
  --space-1:                          4px;
  --space-2:                          8px;
  --space-3:                          12px;
  --space-4:                          16px;
  --space-6:                          24px;
  --space-8:                          32px;
  --space-10:                         40px;
  --space-12:                         48px;
  --space-14:                         56px;
  --space-16:                         64px;
  --space-20:                         80px;
  --space-24:                         96px;

  /* ── Container Tokens ── */
  --container-wide:                   1740px;
  --container-content:                1240px;

  /* ── Breakpoint Tokens ── */
  --breakpoint-sm:                    640px;
  --breakpoint-md:                    768px;
  --breakpoint-lg:                    1024px;
  --breakpoint-xl:                    1280px;
  --breakpoint-2xl:                   1536px;

  /* ── Border Radius Tokens ── */
  --radius-primary:                   5.33px; /* Lama Lama signature squircle (16px / 3) */
  --radius-secondary:                 3px;    /* Micro-cards, buttons, tags */
  --radius-micro:                     2px;    /* Internal ticks, slider thumbs, badges */
  --radius-hairline:                  1.5px;  /* Timeline table rows, ultra-dense data */
  --radius-full:                      9999px; /* Cursor dot, status badges */

  /* ── Border Width Tokens ── */
  --border-hairline:                  1px;
  --border-rule:                      1.5px;

  /* ── Effect Tokens ── */
  --film-grain-opacity:               0.025;
  --blur-reveal-initial:              8px;
  --card-hover-scale:                 1.03;
  --cursor-size:                      8px;
  --dot-raster-grid:                  10px;
  --dot-raster-size-min:              1.5px;
  --dot-raster-size-max:              11px;

  /* ── Motion Distance Tokens ── */
  --motion-distance-sm:               20px;
  --motion-distance-md:               40px;
  --motion-distance-lg:               80px;

  /* ── Motion Timing & Easing Tokens ──
     NOTE: --ease-expo and --ease-power3 are GSAP-only ease strings.
     Only --ease-smooth is valid as a literal CSS transition-timing-function.
     All of them must still be invoked through GSAP — see Section 10. ── */
  --duration-micro:                   0.2s;   /* Cursor exit, quick fades */
  --duration-fast:                    0.3s;   /* Button hovers, wipeouts */
  --duration-medium:                  0.5s;   /* Navbar pill expander, smooth menu shifts */
  --duration-normal:                  0.85s;  /* Card reveals, hairline draws */
  --duration-kinetic:                 0.95s;  /* Headline masked editorial sweeps */
  --duration-slow:                    1.2s;   /* Section entrance sweeps, scroll jumps */
  --duration-stagger:                 0.1s;   /* Headline row 2 stagger delay */
  --interval-kinetic:                 4.2s;   /* Headline rotation cycle */
  --interval-timeline:                8.5s;   /* Timeline auto-advance cycle */
  --ease-expo:                        expo.out;   /* GSAP-only */
  --ease-smooth:                      cubic-bezier(0.22, 1, 0.36, 1); /* CSS + GSAP compatible */
  --ease-power3:                      power3.out; /* GSAP-only */

  /* ── Layering & Z-Index Tokens ── */
  --z-max:                            99999; /* Preloader */
  --z-overlay:                        9999;  /* Film grain, full modal */
  --z-cursor:                         50;    /* Halftone cursor trail */
  --z-nav:                            50;    /* Fixed navbar */
  --z-track:                          30;    /* Sticky hero track */
  --z-foreground:                     20;    /* Hero text & ticker */
  --z-intermediate:                   10;    /* Preloader canvas, card items */
  --z-canvas:                         0;     /* 3D WebGL scene */
  --z-behind:                         -1;    /* Under-canvas base layer */
}
```

---

## 17. CHANGELOG & DECISION LOG

| Version | Date | Status | Change & Decision Rationale |
| :--- | :--- | :--- | :--- |
| **v1.0** | 2026-09-24 | COMPLETED | Initial extraction from `globals.css`, `layout.tsx`, and `CONTEXT.md`. Identified baseline colors and typography. |
| **v2.0** | 2026-09-24 | COMPLETED | Semantic tokenization of colors, removal of `Geist / Outfit` font ambiguity, formalization of 4px spacing scale, and 12-column grid definition. |
| **v3.0** | 2026-09-24 | COMPLETED | Hardened typography weights, eliminated numeric ranges in favor of deterministic values, introduced motion scale, visual intensity rules, and AI "DO NOT INVENT" rule. Marked Section 13 inconsistencies as UNRESOLVED. |
| **v4.0** | 2026-09-25 | RESOLVED | **Decision 1: Canvas Background (`--color-bg`)**<br>Canonically adopted `#08090A`. Conflicting `#0A0B0B` (from early `CONTEXT.md`) deprecated.<br>*Rationale*: `#08090A` is actively declared in `globals.css` and ensures deep obsidian contrast. |
| **v4.0** | 2026-09-25 | RESOLVED | **Decision 2: Lower Section Accent (`--color-section-accent`)**<br>Canonically adopted `#D8382B` (with `#111213` foreground). Deprecated `#F4F2ED` off-white background concept.<br>*Rationale*: Active production codebase in `FeaturedWorkSection.tsx`, `WhatIDoSection.tsx`, `AboutMeSection.tsx`, and `DotRasterTransition.tsx` uses `#D8382B`. This bold editorial red is the core signature of the website. |
| **v4.0** | 2026-09-25 | RESOLVED | **Decision 3: Disambiguated Z-Index Background**<br>Split `--z-background: 0 / -1` into `--z-canvas: 0` (WebGL 3D canvas) and `--z-behind: -1` (under-canvas base layer). |
| **v4.0** | 2026-09-25 | RESOLVED | **Decision 4: Provenance of Geist Pixel Grid Font**<br>Documented origin: Exported from `geist/font/pixel` npm package, injected as `--font-geist-pixel-grid`, accessible via `.font-pixel-grid`. |
| **v4.0** | 2026-09-25 | RESOLVED | **Decision 5: Border Radius Squircle Rationale**<br>Documented 5.33px origin: Lama Lama agency squircle ratio (`16px / 3 = 5.333px`). Strict DO NOT ROUND rule established. |
| **v4.0** | 2026-09-25 | RESOLVED | **Decision 6: Signature Timing Tokens (Eliminated Magic Numbers)**<br>Replaced raw timing values in Section 8 with semantic tokens: `--duration-kinetic: 0.95s` (headline sweep), `--duration-micro: 0.2s` (cursor exit), `--duration-stagger: 0.1s` (headline row 2 delay), `--interval-kinetic: 4.2s` (headline rotation), `--interval-timeline: 8.5s` (timeline cycle). |
| **v4.0** | 2026-09-25 | RESOLVED | **Decision 7: Disambiguated Micro Radius**<br>Split `--radius-micro: 1.5px / 2px` into `--radius-micro: 2px` (badges, pill slider thumbs) and `--radius-hairline: 1.5px` (timeline rows). All references in Section 8.6 and Section 16 now use `var(--radius-hairline)`. |
| **v4.0** | 2026-09-25 | RESOLVED | **Decision 8: Resolved Signal / Pulse Token**<br>Resolved `--color-signal` to canonical `#FFD904` (matching active pulse in `AboutMeSection.tsx`). Separated `#FF3B30` into `--color-alert` for system warning states. |
| **v4.0** | 2026-09-25 | RESOLVED | **Decision 9: Tokenized Accessibility Colors**<br>Created `--color-text-on-accent: #FFFFFF` for high-contrast small copy on red sections and `--color-selection-accent-fg: #F4F2ED` for selection text in red sections, eliminating orphan hex codes in Section 13. |
| **v4.0** | 2026-09-25 | RESOLVED | **Decision 10: Standardized Token References in Section 8**<br>Rewrote all Section 8 signature component specifications to explicitly cite `var(--token-name)` instead of raw numbers. |
| **v4.0** | 2026-09-25 | RESOLVED | **Decision 11: Added `--space-10` & `--space-14` to Spacing System**<br>Officially codified `--space-10: 40px` (Tailwind `10`) and `--space-14: 56px` (Tailwind `14`) to eliminate broken token references in container horizontal padding. |
| **v4.0** | 2026-09-25 | RESOLVED | **Decision 12: Added `--duration-medium: 0.5s`**<br>Tokenized `500ms` transition used in Navbar pill horizontal expansion and modal drawers, eliminating magic numbers in Section 7. |
| **v4.0** | 2026-09-25 | RESOLVED | **Decision 13: Tokenized Section 7 Interactive Colors**<br>Formally codified `--color-nav-hover-bg: #383531`, `--color-cta-hover-bg: #D8D8D2`, `--color-cta-icon-bg: #0A0A09`, and `--color-btn-hover-bg: #FFFFFF`, eliminating orphan hex values in basic UI components. |
| **v4.0** | 2026-09-25 | RESOLVED | **Decision 14: Decoupled Dot-Raster Sizes from Border-Radius**<br>Introduced `--dot-raster-size-min: 1.5px` and `--dot-raster-size-max: 11px`, keeping `--radius-hairline` strictly as a border radius token for timeline rows and UI chrome. |
| **v4.0** | 2026-09-25 | RESOLVED | **Decision 15: Disambiguated Red Section Selection Semantics**<br>Formally separated `--color-selection-accent-bg: #111213` and `--color-selection-accent-fg: #F4F2ED` in Section 2, 13, and 16, resolving semantic role mixing. |
| **v4.0** | 2026-09-25 | RESOLVED | **Decision 16: Final Token Polish & Dimension Locking**<br>Replaced raw `1.2s` with `var(--duration-slow)` (`1.2s`) in Section 8.1; eliminated `bg-[#FFD904]` in favor of `var(--color-signal)` and locked operational status dot to canonical `var(--cursor-size)` (`8px x 8px`) in Section 8.5; aligned `--space-10` description to `sm:` breakpoint. |
| **v5.0** | 2026-09-25 | RESOLVED | **Decision 17: GSAP-Only Motion Standardization**<br>Introduced the GSAP-Only Motion Rule and Easing Token Consumption guidance in Section 10, clarifying that `--ease-expo`/`--ease-power3` are GSAP-only ease strings while `--ease-smooth` is dual CSS/GSAP-compatible. Rewrote Section 8.2's cursor exit transition to remove the raw `ease-out` CSS reference and explicitly specify a GSAP tween (`gsap.to()`) using `var(--duration-micro)` and `var(--ease-smooth)`. Added matching DO/DON'T rules in Section 15 and an Animation Engine principle in Section 1.<br>*Rationale*: The prior wording implied a native CSS transition for one signature component, inconsistent with the site's GSAP-first motion architecture and the person's explicit intent to standardize on GSAP throughout. |
| **v5.0** | 2026-09-25 | ADDED — PENDING VERIFICATION | **Decision 18: Field Log Modal Placeholder**<br>Added Section 7.4 for the Field Log Modal, a component previously referenced only in passing (Section 12's `--z-overlay`, Section 4's `--space-6` usage note) but never formally specified. Flagged `⚠️ NEEDS SOURCE VERIFICATION` rather than inventing anatomy/motion details not present in this document's source material. Added Conflict Resolution Rule #4 (Section 14) requiring unverified components to be flagged, not fabricated.<br>*Next step*: supply `FieldLogModal.tsx` (or equivalent source) so this section can be completed and marked RESOLVED. |
| **v6.0** | 2026-09-29 | RESOLVED | **Decision 19: Canonical Typography System Overhaul (Pure Geist Stack)**<br>Purged legacy Google Font `@import` (`Anton`, `Bebas Neue`, `Newsreader`, `Plus Jakarta Sans`, `Syne`). Standardized 100% on native `Geist Sans` (primary UI) and `Geist Mono` (data/mono). Codified deterministic responsive type scale (Heading 1-3, Subtitle 1-2, Body 1-2 Regular/SemiBold) with `1 rem = 16px` base across Desktop, Tablet, and Mobile breakpoints with locked `[Size]/[Line Height]` metrics in `globals.css` and `DESIGN.md`. |
| **v6.1** | 2026-09-29 | RESOLVED | **Decision 20: Migration to Tailwind v4 `@utility` Directives & Variant Validation**<br>Migrated all typography utilities from `@layer utilities` to Tailwind CSS v4 native `@utility` directives, enabling full responsive (`lg:text-display`, `sm:text-body-1`, `sm:text-h2`) and state variants. Unified weight 600 body tokens strictly on `.text-body-1-semibold` and `.text-body-2-semibold`. Documented exact 768px clamp linear interpolation metrics and unified `.text-mono-center` with trailing letter-spacing compensation (`margin-right: -0.14em`). |

