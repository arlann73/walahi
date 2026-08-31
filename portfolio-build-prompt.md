# MONOLOG Portfolio — Design-to-Build Prompt

> Purpose: this is a ready-to-use build prompt (for Claude Code, v0, Cursor, or a
> human dev) that converts the reference Figma screenshot into Arlan's Next.js
> portfolio, using the exact module map from `CONTEXT.md`. Paste this whole
> document as the instruction when scaffolding or redesigning the site.

---

## 0. Project Brief (give this to the AI/dev first)

Build a **dark, editorial, motion-driven personal portfolio** for a brand/
web designer-developer named **Arlan**, operating under the studio name
**"MONOLOG."** Stack: **Next.js (App Router) + TypeScript + Tailwind CSS +
Framer Motion**. Content and layout follow the section map below 1:1 with
`src/components/`. The tone is confident, minimal, high-contrast — think
"agency-grade portfolio," not a generic template.

---

## 1. Global Design System

**Color palette** (film/analog-leaning, not clean-UI — one warm off-black
+ one warm off-white, everything else is grayscale between them)
- `--bg: #080807` — Background. Near-black but warm, not pure `#000`.
- `--primary: #6B645C` — Primary. Warm taupe/gray, used for secondary
  surfaces, dividers-as-fill, muted icons, non-text UI chrome.
- `--text: #E8E4DC` — **Text Primary — the most important token in the
  system.** Never pure white. Slightly warm/cream so that combined with
  black background, grain, photographic texture, and Khteka, the site
  reads as *film / printed material / analog*, not a super-clean digital
  UI. This is the default color for body copy and most headlines.
- `--text-muted: #A9A49B` — Text Secondary. Captions, metadata, dimmed
  list items, timestamps, helper copy.
- `--highlight: #F1EEE7` — Highlight White. **Use sparingly, only for the
  handful of things that must read as most prominent**: the "ARLAN"
  wordmark/logo, the primary CTA, and active/current states. Never apply
  this to body text at large — it should stay rare enough to feel like a
  spotlight, not the default text color.
- `--border: #38342F` — Border. Hairline dividers, card outlines, table
  rules — all 1px, low-contrast, never a heavy stroke.
- `--muted: #6F6A63` — Muted. Disabled states, placeholder text, inactive
  icons.
- Optional darker/dirtier alternate for Text Primary if a moodier variant
  is wanted for a specific section: `#DDD8CF` (more muted, more "film").
- **Grain**: do not invent a new color for texture. Apply a noise/film-grain
  texture layer at **3–8% opacity** over dark sections (mix-blend-mode
  `overlay` or `soft-light`) so the base colors stay legible and the site
  gets an analog/tactile feel without reading as an applied Instagram
  filter.
- **Accent usage discipline**: this palette has no separate "accent color"
  (no lime, no color pop) — hierarchy is built entirely through the
  `text → text-muted → highlight` value ladder, not hue. Example priority
  order for what's allowed to use `--highlight`: `ARLAN wordmark → primary
  CTA → active state`. Everything else stays in `text`/`text-muted`.

**Typography**
- **Primary / Display / Heading / Body face: Khteka** (single family
  across the whole site — load via `next/font/local` from licensed font
  files; do not substitute a system font).
- **Mono / Metadata face: Geist Mono** — used only for small technical/
  metadata text: timestamps, year tags, tool-tag chips, coordinates-style
  labels, the live clock in the footer.
- Type scale (fluid, `clamp()`-based so it scales smoothly between mobile
  and desktop rather than jumping at breakpoints):
  - **H1 / Hero Display**: `clamp(96px, 14vw, 280px)` — the giant
    "MONOLOG"/"PROJECT JOURNEY"/closing-CTA treatments.
  - **H2 / Section Title**: `clamp(48px, 7vw, 120px)` — section headliners
    (manifesto statement, FAQ headline, etc.).
  - **H3**: `clamp(28px, 3vw, 48px)` — card titles, step titles, subheads.
  - **Body**: `18px` — paragraph copy, nav links, card descriptions.
  - **Small / Metadata**: `12px` — captions, avatar meta rows, labels.
  - **Mono / Technical**: `11px` (Geist Mono) — timestamps, tags, clock.
- Letter spacing (tighten as size increases, per the type's role, not just
  its pixel size):
  - Display: `-0.06em`
  - Heading: `-0.04em`
  - Body: `-0.02em`
  - Metadata: `0em` (mono stays neutral, untracked)

**Spacing**
- Base unit: `4px`. All spacing values are multiples of this unit —
  `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192`. Use Tailwind's
  spacing scale extended to include `48, 64, 96, 128, 192` explicitly so
  no arbitrary values are needed in component code.
- Section padding: **96px–160px** desktop, **48px–80px** mobile (replaces
  the earlier 120–180/64–80 range — align every section to this).
- **Border radius: `0px` everywhere.** This is a brutalist system — cards,
  buttons, inputs, avatars-in-UI-chrome (not photos), modals, and chips
  are all hard-edged rectangles. No rounded corners anywhere in the UI
  layer. (Circular *photographic* elements like a profile photo can stay
  circular if the reference explicitly shows a circle avatar — but default
  to square/rect crops where there's any ambiguity, to stay consistent
  with the brutalist language.)

**Personality**
- Tone: **Professional.** Energy: **Medium** — confident, not loud.
- Style: **Editorial / Experimental / Minimal**, visual character:
  **Brutalist** — sharp corners, exposed grid logic, high-contrast type
  pairing large display against small mono metadata, generous negative
  space.
- Density: **Low** — let sections breathe; resist the urge to fill space.
- Motion: **Subtle / Cinematic** — slow, intentional, never bouncy or
  playful; motion should feel like a camera move, not a UI flourish.

**Motion language**
- Sections fade/slide up on scroll (Framer Motion `whileInView`, 20–30px
  translate, 0.6–0.9s ease-out, slight stagger for card groups) — favor
  slightly slower durations than a typical SaaS site to read as
  "cinematic."
- The timeline connector is an animated SVG path that draws in as the user
  scrolls (`pathLength` animation tied to scroll progress).
- Hover states: subtle scale (1.01–1.02) and underline-draw on links using
  `--highlight`; buttons invert fill/text color (`bg`↔`highlight`) on
  hover — sharp cuts, no rounded easing artifacts given the 0px radius
  system.

**Layout rhythm**
- Max content width ~1280px, section padding per the spacing scale above.
- Alternate background bands (dark → light → dark → dark → dark) create
  visual pacing exactly as in the reference — but note the "light"
  sections should stay within this same warm-neutral family (lean on
  `--primary`/`--highlight` tints) rather than reintroducing the previous
  cream/tan hex values, so the whole site reads as one consistent film
  stock rather than two different palettes.

---

## 2. `Navbar.tsx`

- Fixed/sticky, transparent-to-blurred on scroll (backdrop-blur once
  scrolled past hero).
- Left: wordmark logo **"MONOLOG"**, small scale — uses the same custom
  letterforms defined in the Hero (swirl-orbit "O" after the M, square-
  outline "O" after the N, plain circle "O" before the G), as an inline
  SVG logo component shared between Navbar and Hero.
- Center-right: anchor nav links — `About · Work · Services/Skills ·
  Process · FAQ · Contact` (map to section ids: `#about`, `#projects`,
  `#skills`, `#projects` process anchor, `#faq`, `#contact`.
- A small square sound-toggle button (dark `--bg` fill, `1px --border`
  outline, speaker-mute glyph in `--text-muted`) sits directly left of the
  CTA — same height as the CTA button, 0px radius, tight gap between them.
- Right: CTA button reads **"Start a project"** (not "Book a call" — that
  copy belongs to the FAQ card only). Styled as a **`--highlight`-filled
  rectangle** (light fill, `--bg`-colored text) with a small black square
  inset on the right edge containing a white diagonal arrow icon. This is
  one of the few places `--highlight` is used at full block scale — invert
  to an outlined/transparent state on hover rather than going fully dark,
  so it never fully disappears against the dark hero.
- Mobile: collapse into a hamburger → full-screen dark menu with the same
  links stacked large, plus the CTA button pinned at the bottom.

---

## 3. `HeroSection.tsx`

- Full-bleed `--bg` background with a moody diffuse gradient (soft
  greenish-gray light blooms, low-contrast, positioned bottom-left and
  mid-right) sitting under a **halftone dot-screen texture** across the
  entire hero — this is a distinct treatment from the standard 3–8% grain
  used elsewhere: a visible dot-matrix/newsprint pattern layered over the
  gradient, not just noise. Implement as its own `<Halftone />` overlay
  variant (SVG `<pattern>` of small dots, low opacity, `mix-blend-mode:
  overlay`) reserved for the Hero; other sections keep the plain grain.
- **No stat callouts in the hero itself** — the `7+`/`2+` project and
  internship stats live elsewhere (fold this content into the About
  section's stat callout instead of duplicating it in the Hero; remove it
  from the hero spec).
- **Center-top, ~15–20% down the viewport**: a small line-art icon — a
  wireframe globe/sphere (latitude/longitude ellipses only, no fill) — centered
  horizontally, `--text-muted` stroke, acts as a small visual anchor above
  the copy.
- **Centered two-paragraph statement**, directly below the globe icon, max
  width ~520–600px, center-aligned, `--text` color, medium weight, Body
  scale (or a size between Body and H3):
  - _"We design change-making website experiences that finally reflect
    what you've actually built."_
  - Gap (~24–32px), then: _"For established brands whose reputation has
    outgrown their digital presence."_
- **Giant wordmark "MONOLOG"** anchored to the **bottom of the hero
  viewport, deliberately oversized so it bleeds off the bottom edge** —
  only the top ~55–65% of the letterforms is visible within the fold; the
  rest is cropped by the viewport (not scaled to fit). Horizontally it
  spans edge-to-edge, the `M` starting near the left viewport edge and the
  final `G` extending to the right edge.
  - **Color**: render the wordmark in a **muted mid-tone** (`--primary` or
    `--muted`, not `--highlight`) — at this scale it functions as a
    background watermark/ghost mark sitting behind the foreground copy,
    so it should read as quieter than the small logo/CTA, not brighter.
    (This supersedes the earlier note suggesting `--highlight` for the
    Hero wordmark — reserve `--highlight` for the small nav logo, the CTA,
    and active states only.)
  - **Custom letterforms** (match the nav logo mark at large scale): of
    the three "O"s in MONOLOG, only two are customized, the third stays a
    plain circle, giving the wordmark rhythm rather than uniform
    repetition:
    1. First "O" (M-**O**-NOLOG): a swirl/orbit glyph — a spiral or
       wave-like line coiling inward inside the circle, echoing an
       eye/nautilus/orbit motif. This exact mark is reused as the small
       logo icon in the Navbar.
    2. Second "O" (MON-**O**-LOG): replaced with an open **square/
       rectangle outline** (not round) — reads like an abstract monitor
       or picture-frame bezel, reinforcing the brutalist/0px-radius
       language even inside the wordmark itself.
    3. Third "O" (MONOL-**O**-G): a plain, unmodified circle — the
       "control" letterform that lets the first two customizations read
       as intentional rather than a broken font.
  - Letters sit tight with near-zero tracking (per the `-0.06em` Display
    letter-spacing token) at Hero Display scale (`clamp(96px, 14vw,
    280px)`, pushed toward the top of that range here since it's meant to
    overflow the viewport).
- Down-scroll cue (small arrow / "scroll" label) bottom-center, optional —
  only if it doesn't collide with the bleeding wordmark.
- On mobile: keep the globe icon + centered paragraphs pattern, shrink the
  wordmark scale enough that at least one full line is legible before it
  crops off-screen (allow 2-line wrap if the viewport is narrow enough
  that MONOLOG can't bleed edge-to-edge on one line).

---

## 4. `AboutSection.tsx`

Background switches to a lighter warm-neutral band (tint of `--primary`/
`--highlight`, still the same film-stock family — not the old cream/tan).
Three stacked sub-blocks per `CONTEXT.md`:

**4.1 Storytelling / stat callout**
- Stat row (3 stats, moved here from the Hero to avoid duplicating content
  across sections):
  - `7+` — "Project Experience"
  - `2+` — "Internship Experience"
  - `15+` — "Founder-led brands from disruptive creative agencies to
    consumer brands"
- Numerals in Khteka Display/Heading scale (`--highlight` or `--text`),
  small Mono/Metadata caption underneath each number.

**4.2 Manifesto / value proposition**
- Large right-aligned (or centered) statement in the display face, mixed
  weight (bold on key phrases, regular on connective text):
  - _"Great founders changing the world deserve a presence as powerful as
    what they're building. Most founders we work with have built
    something significant, but their website doesn't show it yet."_
  - Follow-up paragraph in smaller body text: _"That gap costs more than
    revenue. It costs the certainty that your brand is finally being
    understood."_
- Below the manifesto: a small avatar + name credit line — "Arlan / Founder,
  MONOLOG" with a tiny circular profile photo, styled like a quote
  attribution.

**4.3 Brands We've Helped**
- Caption label "Brands we've helped" above a responsive logo row/grid
  (grayscale/monochrome logo marks, e.g. Vinamilk and other client marks),
  2 rows on desktop (5–6 per row), horizontal scroll or wrap on mobile.

---

## 5. `JourneyTimelineSection.tsx`

Background stays on the lighter warm-neutral band from About. This is the
most complex section.

- Section eyebrow label in Mono/Metadata (Geist Mono, `--text-muted`,
  `0em` tracking) at top, e.g. "TIMELINE."
- **7 milestone cards, years '19 → '26**, laid out in a zigzag/staggered
  pattern (alternating left/right offset, each card overlapping the
  vertical flow slightly), connected by **one continuous curved SVG path**
  that snakes from the top card down to the bottom card, drawn with
  rounded bends and small dot markers at each connection point.
- Each card (`--primary`-tinted fill, `1px --border` outline, **0px
  radius — sharp rectangle**) contains:
  - Year label in Mono/Metadata face, bold, top-left (e.g. `'19`, `'20` …
    `'26`)
  - Short title in Khteka H3 (e.g. "Starting out with my brother", "First
    freelance steps", "Beyond what I knew", "Leveling up", "From trust to
    referrals", "A life-changing year", "The journey continues")
  - 2-line description of that year's milestone, Body/`--text-muted`
  - Small avatar + meta row ("Brother / 7 years ago" style attribution) in
    Mono/Metadata
  - **"Read more →"** link underlined in `--highlight` on hover, opens the
    interactive modal
- **Modal**: clicking "Read more" opens a detail modal/drawer with the
  full story for that year (expanded text, maybe a photo).
- Card content plan (edit with Arlan's real history):
  1. `'19` — Starting out with my brother
  2. `'20` — First freelance steps
  3. `'21` — Beyond what I knew
  4. `'22` — Leveling up
  5. `'23` — From trust to referrals
  6. `'24` — A life-changing year
  7. `'26` — The journey continues (current/ongoing — style this card
     with a small progress/status indicator instead of a fixed end date)
- Mobile: collapse zigzag into a single vertical column, straighten the
  connector into a simple vertical line with dot markers, keep card order.

---

## 6. `SkillsSection.tsx`

Background returns to `--bg`. Reframes the reference's "Services" block as
skills/capabilities per `CONTEXT.md`.

- Left column: a short client testimonial quote block with a small
  attribution (name, role/company) — reused as "Testimoni & Kredibilitas,"
  set in `--text-muted`.
- Right/main column: a **stacked list of capability lines** in Khteka
  Heading, large, each on its own line, stepping down the value ladder
  rather than using opacity tricks — first 1–2 items in `--highlight`
  (currently most emphasized), the rest in `--text`, then `--text-muted`,
  then `--muted` for the least-emphasized item, to suggest a breadth of
  skills without over-cluttering:
  1. Brand Strategy
  2. Visual Identity
  3. Website Strategy
  4. Website Design
  5. Website Development
  6. 3D Development
- Below/alongside: a row or grid of **tool logos** (Figma, Webflow,
  React/Next.js, Tailwind CSS, Blender, Adobe CC) and a small
  **certifications** strip (badge-style chips or logo marks).
- Optional hover interaction: hovering a skill line brings it to full
  opacity and slightly indents it.

---

## 7. `ProjectsSection.tsx`

Two connected moments inside this component, matching the reference:

**7.1 "PROJECT JOURNEY" heading**
- Big centered display headline: **"PROJECT JOURNEY"**, full-bleed dark
  background.

**7.2 Three-step process, image-paired**
- Vertical list of 3 steps, each with a small index/line marker on the
  left, a short title + supporting sentence, paired with a portrait-style
  photo on the right (alternate or fixed side):
  1. **We uncover your story** — discovery/research phase copy; photo of
     hands sketching/writing.
  2. **We shape your digital presence** — design/build phase copy; photo
     of hands typing on a keyboard.
  3. **We send it into the world** — launch phase copy; photo of a
     multi-monitor dev/design setup.
- Below the process, add an **actual project showcase grid** (this section
  is named "Showcase karya & Case Studies" in `CONTEXT.md`, so beyond the
  process narrative, include case-study cards): each card shows project
  thumbnail, title, 1-line result/impact, tech/tools used tags, and a
  "View live" link — 2–3 columns desktop, 1 column mobile.

---

## 8. `FaqSection.tsx`

- Dark background, left-aligned display headline: **"Here's what you need
  to consider before partnering with us."**
- Right/main column: an **accordion list** of questions (expand on click,
  chevron rotates, smooth height animation):
  - Who will actually be working on my project?
  - How long do most projects usually take?
  - How do you communicate and manage work?
  - What do I need to start working together?
  - What happens after launch?
  - Can you handle branding and development together?
  - What is the project workflow?
- Bottom-left: a small **"Book a call with Arlan"** card — circular
  profile photo, name, and a compact button — pinned near the FAQ list as
  a persistent conversion nudge.

---

## 9. `ContactSection.tsx`

- Full-bleed dark section with a dim background photo (moody interior/
  studio shot at low opacity, dark overlay for text contrast).
- Massive display headline, mixed weight and an arrow glyph to emphasize
  motion:
  - _"LET'S BUILD AN EXPERIENCE THAT_ **→** _MOVES PEOPLE"_
- Primary CTA button: **"Tell us your story"** with a small icon, sharp
  0px-radius rectangle, `--highlight` fill with `--bg` text, inverts on
  hover.
- Below the CTA: a row of small circular client/collaborator avatars
  (social-proof strip), optionally overlapping like a stacked avatar
  group.

---

## 10. `FooterSection.tsx`

- Dark background, standard multi-column footer layout:
  - Column 1 — nav links: About, Work, Process, Services, Resources,
    Contact
  - Column 2 — social links: LinkedIn, YouTube, Instagram (icon + label)
  - Column 3 — **"Ask AI about Arlan/MONOLOG"** interactive widget: a small
    chat-style input/button that lets visitors query an AI assistant
    about Arlan's work (this can call a lightweight API route backed by
    project/timeline data)
  - A **live local-time clock** (client-rendered, updates every second,
    shows Arlan's timezone) sits near the social/contact column
- Bottom bar: copyright line + a **huge partially-cropped year mark**
  (e.g. "'26" bleeding off the bottom edge in the display face) as a
  closing visual signature, echoing the Hero's oversized wordmark
  treatment.

---

## 11. Technical Implementation Notes

- **Routing/structure**: single-page `app/page.tsx` assembling all
  sections in order; each section is its own client/server component per
  the file tree in `CONTEXT.md`.
- **Scroll animations**: Framer Motion `useScroll` + `useTransform` for
  the timeline path draw; `whileInView` for section/card reveals.
- **SVG path for timeline**: author the curved connector as a single
  `<path>` with a `stroke-dasharray`/`stroke-dashoffset` animation, or
  Framer Motion's `pathLength` prop, timed to scroll progress via
  `useScroll({ target, offset })`.
- **Accessibility**: ensure the accordion (FAQ) and modal (Timeline "Read
  more") are keyboard-navigable with proper `aria-expanded`/`aria-modal`
  attributes; respect `prefers-reduced-motion` by disabling large
  scroll-linked transforms.
- **Performance**: lazy-load below-the-fold images (`next/image`), defer
  the "Ask AI" widget's client JS until interaction.
- **SEO**: set metadata in `app/layout.tsx` (title, description, OG image
  using the Hero wordmark), since that file is explicitly called out as
  owning "SEO & Fonts" in `CONTEXT.md`.
- **Fonts**: **Khteka** is a licensed font (not on Google Fonts) — self-host
  the woff2 files under `public/fonts/khteka/` and register it via
  `next/font/local`, exposing it as a single CSS variable (e.g.
  `--font-khteka`) used for display/heading/body alike. **Geist Mono** can
  load via `next/font/google` (or `geist` npm package) as `--font-geist-mono`
  for metadata-only text. Both load with zero layout shift via `next/font`.
  Wire the `clamp()` type scale and `-0.06em/-0.04em/-0.02em/0em` letter-
  spacing values into Tailwind's `theme.extend.fontSize`/`letterSpacing`
  rather than hardcoding them per component.
- **Grain layer**: implement as a shared `<Grain />` component — an
  absolutely-positioned `<svg>`/`<canvas>` noise texture at `opacity: 0.03–
  0.08`, `mix-blend-mode: overlay`, `pointer-events: none`, reused across
  every dark section rather than baked into individual background images.

---

## 12. Open Content Gaps to Fill In With Arlan

- Real client logos/names for the "Brands We've Helped" row.
- Real testimonial quote(s) for the Skills section.
- Final year-by-year timeline copy (2019–2026) with real milestones.
- Actual project case studies (3–6) with thumbnails, results, and links
  for the Projects showcase grid.
- Real certifications list and tool logo set.
- Contact form fields / booking link destination for "Book a call" and
  "Tell us your story" CTAs.
