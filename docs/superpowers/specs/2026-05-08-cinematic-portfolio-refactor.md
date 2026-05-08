# Portfolio Design Specification: Cinematic Split
**Date:** 2026-05-08

## 1. Concept & Aesthetic
The portfolio is split into three main experiences to avoid generic "AI slop" and deliver highly tailored visual identities.

- **Entry Portal (`index.html`)**: A dramatic diagonal split-screen (`clip-path`). Hovering over a side expands it via smooth CSS transitions, guiding the user immersively into their chosen domain.
- **3D Art Station (`art-portfolio.html`)**: "Cinematic & Maximalist".
  - **Colors**: Deep true blacks (`#050505`), high-contrast neon red accents (`#ff2a2a`).
  - **Typography**: `Bebas Neue` for massive, commanding headings. `Poppins` for readable body text.
  - **Layout**: Asymmetric, visually heavy, negative space to let 3D renders breathe.
- **Dev UI/UX Lab (`dev-portfolio.html`)**: "Technical & Refined".
  - **Colors**: Deep technical navy (`#070b14`), electric cyan/blue accents (`#00e5ff`).
  - **Typography**: `Bebas Neue` for section headers, `Inter` or `Poppins` for body, and a `monospace` stack for tags and technical details.
  - **Layout**: Strict, perfectly aligned Bento Grid. Glassmorphism with layered shadows (ambient occlusion + direct light).

## 2. Architecture & Files
- **HTML**: Three separate files (`index.html`, `art-portfolio.html`, `dev-portfolio.html`).
- **CSS**: A single unified `styles.css`.
  - Driven by CSS Custom Properties (Variables) defined in `:root`.
  - Mode overriding handled by `.art-mode` and `.dev-mode` classes on the `<body>`.
- **JS**: A single `Script.js` handling scroll events, video hover logic, and filtering.

## 3. UI Patterns & Compliance (Web Platform Design)
- **Hierarchy**: Use HSL color definitions for a cohesive color scale. Primary actions (Enter, Submit) will use solid high-contrast backgrounds; secondary tags will use transparent tinted backgrounds.
- **Responsiveness**: Implement fluid typography (`clamp()`) and fluid spacing. Use content-based breakpoints and CSS Grid/Flexbox instead of hardcoded pixels. Mobile mode will have a strict `--side-padding: 1.5rem` to ensure breathing room.
- **Accessibility (WCAG 2.2)**: 
  - Ensure all text meets the 4.5:1 contrast ratio.
  - Implement visible `:focus-visible` outlines (e.g., `3px solid var(--accent-color)`).
  - Minimum 44x44px touch targets for mobile (navbar links, filter buttons).
  - Semantic HTML tags (`<main>`, `<section>`, `<nav>`, `<article>`).

## 4. Specific Component Overhauls
- **Hero Sections**: Full-screen video backgrounds with a heavy bottom-to-top gradient fade so text is legible.
- **Skills Section**: Strictly isolated. Art shows only 3D tools and skills. Dev shows only programming and UI/UX tools. Rendered as compact, centered flex-wrap tags.
- **Contact Form**: Unified semantic structure, styled dynamically. Inputs will have custom focus states and subtle inner shadows to create depth.

## 5. Success Criteria
- The portal feels like a video game main menu.
- Art and Dev pages feel like entirely different websites while sharing the same underlying clean code architecture.
- No horizontal scrolling on mobile; text never touches the edges.
