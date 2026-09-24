<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Portfolio website for Prastyo Arlan — a single-page Next.js app with Three.js 3D character, kinetic floor shader, canvas raster transitions, and smooth scroll.

- **Stack**: Next.js 16.3.3, React 19, Tailwind CSS 4, Three.js (@react-three/fiber, @react-three/drei), GSAP (@gsap/react, ScrollTrigger), Lenis (smooth scroll), Lucide icons
- **Entry**: `src/app/page.tsx` orchestrates Preloader, Navbar, and sticky Hero Track; `src/app/layout.tsx` sets Google fonts and SmoothScroll
- **Components**: `src/components/` (Preloader, Navbar, SmoothScroll, DotRasterTransition, HalftoneCursorTrail, KineticGridFloor, Model) and `src/components/sections/` (HeroSection, HeroCanvas3D, FeaturedWorkSection)
- **Assets**: 3D model `model.glb`, logos, and images in `public/` — see `CONTEXT.md` for complete technical and design specs

## Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run lint      # ESLint (core-web-vitals + TypeScript rules)
```

No `typecheck` or `test` scripts are configured. TypeScript is checked during `next build` via `tsconfig.json` (`"noEmit": true`, `"strict": true`).

## Conventions

- Path alias `@/*` resolves to `src/*`
- Use `clsx` + `tailwind-merge` for conditional classnames (existing pattern throughout components)
- Section components follow the naming convention `{Name}Section.tsx` in `src/components/sections/`
- See `CONTEXT.md` for detailed component responsibilities and section glossary
- **Design System Rules**: `DESIGN.md` (mirrored in `.agents/rules/design.md`) is the absolute single source of truth for all visual UI, styling, tokens, and motion.
  - **Rule: DO NOT INVENT** — never introduce arbitrary hex colors, ad-hoc font sizes, spacing, or untokenized radiuses.
  - **Rule: DESIGN.md WINS OVER CODE** — if existing legacy code conflicts with `DESIGN.md`, the code must be refactored to match `DESIGN.md`.
  - **Rule: GSAP-ONLY MOTION** — all interactive motion, hovers, and micro-interactions must be authored via GSAP, never raw CSS `transition` properties.

