# DESIGN SYSTEM RULES (Always On)

All UI, styling, tokens, and motion MUST strictly adhere to this rulebook.
Full specifications, deep component architectures, and changelog reside in [`DESIGN.md`](file:///d:/Aduhh/DESIGN.md) at the project root.

---

## 1. NON-NEGOTIABLE CORE RULES

1. **DESIGN.md WINS OVER CODE**: If existing code conflicts with this rulebook or `DESIGN.md`, the code must be refactored to match the design system. Never introduce a third variation.
2. **DO NOT INVENT**: Never use arbitrary hex colors, ad-hoc font sizes, unscaled paddings, or untokenized radiuses. If a value does not exist, use the closest canonical token.
3. **GSAP-ONLY MOTION**: All interactive animations, hovers, micro-interactions, and transitions MUST be authored via GSAP (`gsap.to`, `useGSAP`, `ScrollTrigger`). Native CSS `transition` properties on interactive UI elements are strictly forbidden.
4. **NO GENERIC AI SLOP**: No blurry large drop shadows, no SaaS purple/blue gradients, no default Tailwind rounded corners without squircle tokens, and no un-tracked grotesque fonts.

---

## 2. CANONICAL COLOR TOKENS

Colors must be implemented via semantic CSS variables:

| Semantic Token | Canonical Hex | Usage |
| :--- | :--- | :--- |
| `--color-bg` | `#08090A` | Deep obsidian canvas (dark sections & hero background) |
| `--color-surface` | `#161819` | Cards, capsule menus, secondary dark backdrops |
| `--color-surface-glass` | `rgba(20, 22, 22, 0.5)` | Frosted glass containers (with backdrop-blur) |
| `--color-nav-hover-bg` | `#383531` | Warm-charcoal expansion background on navbar hover |
| `--color-text` | `#E2E2DD` | Chalk White: Headings, primary text, active items |
| `--color-text-secondary` | `#908C87` | Muted Stone Gray: Secondary descriptions, mono tags |
| `--color-border` | `rgba(226, 226, 221, 0.14)` | Hairline dividers, card outlines, subtle borders |
| `--color-border-hover` | `rgba(255, 255, 255, 0.30)` | Active button states, focused borders |
| `--color-section-accent` | `#D8382B` | Canonical Editorial Red: Lower section background |
| `--color-section-accent-foreground` | `#111213` | Dark obsidian text on top of red accent section |
| `--color-text-on-accent` | `#FFFFFF` | High-contrast white text for reading copy on red |
| `--color-section-accent-muted` | `rgba(17, 18, 19, 0.70)` | Secondary metadata/tags on red accent section |
| `--color-btn-hover-bg` | `#FFFFFF` | Illuminated pure white background on button hover |
| `--color-cta-hover-bg` | `#D8D8D2` | Off-white shift on "LET'S TALK" CTA hover |
| `--color-cta-icon-bg` | `#0A0A09` | Dark obsidian box for CTA diagonal arrow |
| `--color-cursor` | `#FFD000` | 8px precision cursor trail (matches 3D jacket) |
| `--color-signal` | `#FFD904` | Operational studio pulse & active indicator dots |
| `--color-alert` | `#FF3B30` | System alerts & warning states |
| `--color-selection-bg` | `#E2E2DD` | Selection highlight on dark canvas |
| `--color-selection-fg` | `#010101` | Selection text color on dark canvas |
| `--color-selection-accent-bg` | `#111213` | Dark obsidian selection on red accent section |
| `--color-selection-accent-fg` | `#F4F2ED` | Chalk selection text on red accent section |

---

## 3. TYPOGRAPHY SYSTEM

### Font Stack & Sources
- **Primary UI Typeface (`--font-sans`)**: `Geist Sans` (variable font, weights 100–900). *Note: `--font-display` is a temporary alias to be purged after the 50-line rollout.*
- **Monospace & Data (`--font-mono`)**: `Geist Mono` (variable font, weights 100–900)
- **Pixel Grid (`--font-pixel-grid`)**: `Geist Pixel Grid` (src/fonts/GeistPixel-Grid.woff2, localFont preload: false, single static weight 500, OFL-1.1; 4 varian barrel lainnya dibuang)

### Base Unit & Accessibility Calibration
- Base: `1 rem = 16px` (Browser root default; WCAG 1.4.4 compliant for dynamic 200% scaling)

### Fluid Typography Scale [Font Size / Line Height] (375px to 1440px)
- **Display**: Desktop `120/115` (`7.5rem`) | Tablet `≈77/74` (`~4.81rem`) | Mobile `52/50` (`3.25rem`) | Tracking `-0.04em` | `clamp(3.25rem, 1.8rem + 6.3vw, 7.5rem)`
- **Display SM**: Desktop `76/80` (`4.75rem`) | Tablet `≈50/52` (`~3.09rem`) | Mobile `34/36` (`2.125rem`) | Tracking `-0.03em` | `clamp(2.125rem, 1.2rem + 3.94vw, 4.75rem)`
- **Heading 1**: Desktop `56/60` (`3.5rem`) | Tablet `≈42/45` (`~2.63rem`) | Mobile `34/37` (`2.125rem`) | Tracking `-0.03em` | `clamp(2.125rem, 1.63rem + 2.1vw, 3.5rem)`
- **Heading 2**: Desktop `40/46` (`2.5rem`) | Tablet `≈31/36` (`~1.94rem`) | Mobile `26/30` (`1.625rem`) | Tracking `-0.02em` | `clamp(1.625rem, 1.32rem + 1.3vw, 2.5rem)`
- **Heading 3**: Desktop `28/34` (`1.75rem`) | Tablet `≈23/28` (`~1.44rem`) | Mobile `20/24` (`1.25rem`) | Tracking `-0.015em` | `clamp(1.25rem, 1.07rem + 0.75vw, 1.75rem)`
- **Subtitle 1**: Desktop `20/28` (`1.25rem`) | Tablet `≈17.5/24.5` (`~1.09rem`) | Mobile `16/22` (`1.0rem`) | Tracking `-0.01em` | `clamp(1.0rem, 0.91rem + 0.38vw, 1.25rem)`
- **Subtitle 2**: Desktop `16/23` (`1.0rem`) | Tablet `≈14.7/21.3` (`~0.92rem`) | Mobile `14/20` (`0.875rem`) | Tracking `0em` | `clamp(0.875rem, 0.83rem + 0.19vw, 1.0rem)`
- **Body Editorial**: Desktop `18/29` (`1.125rem`) | Tablet `≈16.8/27` (`~1.05rem`) | Mobile `16/26` (`1.0rem`) | Tracking `-0.005em` | `clamp(1.0rem, 0.96rem + 0.19vw, 1.125rem)`
- **Body 1 (Regular/SemiBold)**: Desktop `16/24` (`1.0rem`) | Tablet `≈15.4/23.1` (`~0.96rem`) | Mobile `15/22` (`0.9375rem`) | Tracking `0em` | `clamp(0.9375rem, 0.92rem + 0.09vw, 1.0rem)`
- **Body 2 (Regular/SemiBold)**: Desktop `14/21` (`0.875rem`) | Tablet `≈13.3/19.7` (`~0.83rem`) | Mobile `13/19` (`0.8125rem`) | Tracking `+0.005em` | `clamp(0.8125rem, 0.79rem + 0.09vw, 0.875rem)`

### Geist Mono Scale
- **Mono Label**: `0.75rem / 1.0rem` (`12px / 16px`) | Tracking `+0.14em` (brackets ≤3 words) / `+0.08em` (meta)
- **Mono Caption**: `0.75rem / 1.0rem` (`12px / 16px`) | Tracking `+0.02em`
- **Mono Data**: `clamp(0.8125rem, 0.79rem + 0.09vw, 0.875rem)` (`13–14px`) | Tracking `+0.02em` (`tabular-nums`)

### Geist Pixel Accent Scale
- **Pixel Label (`.text-pixel-label`)**: `0.75rem / 1.0rem` (`12px / 16px`) | Weight `500` (`font-synthesis-weight: none`) | Tracking `+0.14em` | Section marker brackets & table markers (lantai internal 12px; ketajaman matriks diverifikasi visual).

### Layout & Legibility
- **Measure**: `.measure-editorial` (`max-width: 65ch`)
- **Headings**: `text-wrap: balance; text-rendering: optimizeLegibility;`
- **Body**: `text-wrap: pretty;`
- **Display Descender Protection**: `padding-bottom: 0.08em` pada `.text-display` (leading ketat 0.96) dan `0.04em` pada `.text-display-sm` (leading 1.05 yang lebih longgar sudah cukup melindungi descender).
- **Trailing Tracking Compensation**: `.text-mono-center` (`margin-right: -0.14em`) on center-aligned wide tracking labels

### Section Statement Typographic Architecture
- **About Me Manifesto (`AboutPortfolioSection.tsx`)**: `.text-h2` (`26px` $\rightarrow$ `40px`), weight `600` canonical token, container `max-w-[1040px]` (~50ch, col-start-4 col-span-9), `<p>`.
- **Featured Work Positioning (`FeaturedWorkSection.tsx`)**: `.text-h2` (`26px` $\rightarrow$ `40px`), weight `600` canonical token, container `max-w-[1040px]` (~50ch), `<h2>` with inner lines for GSAP reveal.
- **What I Do (`WhatIDoSection.tsx`)**: Header title `.text-h1` (`34px` $\rightarrow$ `56px`, standard weight, no `font-black`), mission statement `.text-h3` (`20px` $\rightarrow$ `28px`, continuous fluid, no `sm:text-h2` jump), maintaining 2:1 harmonic octave ratio (56px : 28px).

### Pengecualian yang Disengaja (Intentional Exceptions)
1. **Pitchdeck Widget & Interactive Deck (`src/components/deck/`)**: Sidebar tetap `w-[230px]` dan slide ber-rasio tetap yang diskalakan via GSAP. Dilarang memakai fluid `vw` karena teks akan meluber saat viewport melebar; wajib menggunakan ukuran statis (`rem`/`px`) atau container queries.
2. **ASCII Grid Preloader & Background Canvas Art (7–8.5px)**: Karakter monospace dekoratif terminal (`aria-hidden="true"`). Wajib statis agar susunan sel matriks kolom/baris karakter tetap presisi.
3. **Miniatur Preview Kartu Portfolio (6.5–7px)**: Thumbnail kartu miniatur (~120px) di `FeaturedWorkSection.tsx`.
4. **3D WebGL HUD Overlay Chips (`FieldLogCanvas3D.tsx:168`)**: Label petunjuk orbital 3D mikro (`text-[9px] sm:text-[10px]`, `aria-hidden="true"`).

---

## 4. SPACING & RADII TOKENS

### Spacing Scale (Base: 4px)
- `--space-1`: 4px | `--space-2`: 8px | `--space-3`: 12px | `--space-4`: 16px
- `--space-6`: 24px | `--space-8`: 32px | `--space-10`: 40px | `--space-12`: 48px
- `--space-14`: 56px | `--space-16`: 64px | `--space-20`: 80px | `--space-24`: 96px

### Radii Tokens
- `--radius-hairline`: `1.5px` (TimelineTable rows & precision lines)
- `--radius-micro`: `2px` (Internal sub-elements & micro status chips)
- `--radius-sm`: `3px` (Navbar buttons, avatar thumbnail, CTA arrow box)
- `--radius-squircle`: `5.33px` (Lama Lama signature squircle for cards & pill containers)
- `--radius-card`: `28px` / `32px` (Heynesh timeline milestone cards)
- `--radius-full`: `9999px` (Pill badges, slider switches, circular elements)

---

## 5. SIGNATURE COMPONENTS & TRANSITIONS

1. **Navbar**: Fixed top header. Center cluster (`About`, `Work`, `What I do`) with warm-charcoal (`#383531`) expander on hover (`--duration-medium: 0.5s`). Slim 31px "LET'S TALK" CTA on right with avatar and diagonal arrow box.
2. **Hero Stage**: 100dvh sticky stage inside `#hero-track` (`h-[700vh]`). Houses `TimelineTable`, rotating headline (`PRASTYO/ARLAN` & `EXPLORE/THE EARTH`), `Newsreader` italic narrative, and 12-column bottom ticker.
3. **DotRasterTransition**: 10px square-pixel grid (`--dot-raster-grid`), size 1.5px to 11px, solid `#D8382B`. 3-phase scroll sync with GPU sleep when screen is covered (`smoothP >= 0.35`).
4. **Ride-Along Stage**: `workRideAlongRef` on `#D8382B` surface houses `FeaturedWorkSection` & `WhatIDoSection`.
