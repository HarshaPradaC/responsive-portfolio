# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Harsha Prada Chandrakumar — a "cipher dossier" themed site built with React, TypeScript, Vite, Three.js, and Tailwind CSS v4. The aesthetic is classified document / invention documentation, not a CLI terminal.

## Commands

- `npm run dev` — start dev server
- `npm run build` — TypeScript check + Vite production build
- `npm run lint` — ESLint
- `npm run preview` — preview production build

## Architecture

Single-page scroll portfolio with 7 sections, each themed as a "dossier file":

- **Hero** — Cover page with 3D cipher wheel (Three.js)
- **About** — Personnel file with education credentials
- **Skills** — Equipment manifest with binary particles background (Three.js)
- **Experience** — Operations log with timeline
- **Projects** — Patent/invention cards with circuit board shader (Three.js)
- **Achievements** — Hackathons, publications, certifications
- **Contact** — Encrypted message form (Google Apps Script endpoint)

### Key Directories

- `src/data/resume.ts` — All portfolio content as typed constants (single source of truth)
- `src/components/sections/` — 7 section components
- `src/components/three/` — Three.js scenes (CipherWheel, BinaryParticles, CircuitBoard)
- `src/components/ui/` — Reusable UI (DecryptText, StampBadge, SkillTag, ProjectCard, TimelineNode, ContactForm)
- `src/components/layout/` — Header, Footer, SectionWrapper
- `src/hooks/` — useDecryptAnimation (text scramble effect), useSectionInView (intersection observer)
- `resume/` — PDF resume file

### Design System

Defined in `src/index.css` via Tailwind `@theme`:
- Colors: `bg-primary` (#0a0a0f), `accent-amber` (#d4a843), `accent-green` (#39ff6b), `accent-red` (#c0392b)
- Fonts: IBM Plex Mono (mono), Libre Baskerville (serif), Special Elite (typewriter stamps)
- CSS utilities: `.bg-blueprint`, `.scanlines`, `.vignette`, `.corner-fold`, `.text-glow`

### Key Patterns

- **DecryptText** component animates text by scrambling characters then resolving to real text
- **StampBadge** component renders "CLASSIFIED"/"VERIFIED"/"ACTIVE" style rubber stamps with Framer Motion
- **SectionWrapper** wraps every section with consistent header (file number, label, decrypt title) and scroll reveal
- **Three.js scenes** are lazy-loaded with `React.lazy` and only render on desktop (hidden on mobile via `hidden lg:block`)
- **Contact form** POSTs to Google Apps Script at the URL stored in `src/data/resume.ts` (`contactFormUrl`)
- Smooth scrolling via Lenis library initialized in `App.tsx`
