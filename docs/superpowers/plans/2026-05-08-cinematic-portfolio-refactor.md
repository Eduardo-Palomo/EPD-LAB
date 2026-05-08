# Cinematic Portfolio Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the split-page portfolio into a highly polished, visually distinct cinematic experience (Art) and technical interface (Dev) connected by a dramatic entry portal.

**Architecture:** We will systematically update `styles.css` to introduce advanced CSS variables, `clip-path` animations for the portal, a CSS-only masonry layout for Art projects, and a layered glassmorphism Bento grid for Dev projects.

**Tech Stack:** HTML5, Modern CSS (Variables, Grid, Flexbox, `clip-path`, `clamp()`), Vanilla JS.

---

### Task 1: Overhaul the Entry Portal (`index.html`)

**Files:**
- Modify: `css/styles.css`
- Modify: `index.html`

- [ ] **Step 1: Write HTML Structure for Diagonal Split**

```html
<!-- Inside index.html, replace the current portal-overlay content -->
<div id="entry-portal" class="portal-overlay">
    <a href="art-portfolio.html" class="portal-link portal-side art-side">
        <div class="portal-content">
            <h2 class="portal-h2">3D ART STATION</h2>
            <p class="portal-p">Immersive Characters & Environments</p>
            <div class="portal-btn">ENTER ART</div>
        </div>
    </a>
    <a href="dev-portfolio.html" class="portal-link portal-side dev-side">
        <div class="portal-content">
            <h2 class="portal-h2">DEV UI-UX LAB</h2>
            <p class="portal-p">Next-Gen Interface Design</p>
            <div class="portal-btn">ENTER LAB</div>
        </div>
    </a>
</div>
```

- [ ] **Step 2: Add CSS for Clip-Path Split**

```css
/* Inside css/styles.css, replace existing portal styles */
.portal-overlay {
    position: fixed; inset: 0; width: 100vw; height: 100vh;
    z-index: 9999; display: flex; background: #000; overflow: hidden;
}
.portal-link {
    position: absolute; top: 0; bottom: 0; width: 60%;
    text-decoration: none; color: inherit; display: flex;
    align-items: center; justify-content: center;
    transition: clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s ease;
}
.art-side {
    left: 0; background: #050505; border-right: 2px solid var(--accent-red);
    clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%);
    z-index: 2;
}
.dev-side {
    right: 0; background: #0a0f1a;
    clip-path: polygon(20% 0, 100% 0, 100% 100%, 0 100%);
    z-index: 1; width: 60%;
}
/* Hover Expansion */
.portal-overlay:has(.art-side:hover) .art-side { clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%); width: 65%; }
.portal-overlay:has(.art-side:hover) .dev-side { width: 55%; }
.portal-overlay:has(.dev-side:hover) .dev-side { clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%); width: 65%; }
.portal-overlay:has(.dev-side:hover) .art-side { width: 55%; }

/* Mobile fallback for split */
@media (max-width: 768px) {
    .portal-link { width: 100%; height: 50%; position: relative; clip-path: none !important; border: none; }
    .portal-overlay { flex-direction: column; }
    .art-side { border-bottom: 2px solid var(--accent-red); }
}
```

- [ ] **Step 3: Run Visual Verification**
(Open index.html in browser to ensure the diagonal split renders and hovers correctly).

- [ ] **Step 4: Commit**
```bash
git add index.html css/styles.css
git commit -m "feat(portal): implement diagonal clip-path split screen"
```

---

### Task 2: Aesthetic Overhaul for Art Portfolio (`art-portfolio.html`)

**Files:**
- Modify: `css/styles.css`
- Modify: `art-portfolio.html`

- [ ] **Step 1: Define Cinematic Variables in CSS**

```css
body.art-mode {
    --bg-color: #050505;
    --accent-red: #e61919;
    --accent-red-bright: #ff4d4d;
    --text-primary: #ffffff;
    --text-secondary: #a3a3a3;
    --font-heading: 'Bebas Neue', sans-serif;
    --font-body: 'Poppins', sans-serif;
}
```

- [ ] **Step 2: Update Project Grid to Masonry Layout**

```css
body.art-mode .projects-container {
    display: block;
    columns: 3;
    column-gap: 2rem;
}
body.art-mode .project-card {
    break-inside: avoid;
    margin-bottom: 2rem;
    height: auto; /* Let content dictate height */
    aspect-ratio: 4/5; /* Base aspect ratio */
}
/* Make every odd card taller for masonry effect */
body.art-mode .project-card:nth-child(odd) {
    aspect-ratio: 3/5;
}
@media (max-width: 900px) { body.art-mode .projects-container { columns: 2; } }
@media (max-width: 550px) { body.art-mode .projects-container { columns: 1; } }
```

- [ ] **Step 3: Run Visual Verification**
(Open `art-portfolio.html` and verify deep black colors, red accents, and masonry grid layout).

- [ ] **Step 4: Commit**
```bash
git add css/styles.css
git commit -m "style(art): implement cinematic theme and masonry grid"
```

---

### Task 3: Aesthetic Overhaul for Dev Portfolio (`dev-portfolio.html`)

**Files:**
- Modify: `css/styles.css`
- Modify: `dev-portfolio.html`

- [ ] **Step 1: Define Technical Variables & Monospace Tags**

```css
body.dev-mode {
    --bg-color: #070b14;
    --accent-dev: #00b3cc;
    --accent-dev-bright: #00e5ff;
    --text-primary: #f0f4f8;
    --text-secondary: #8b9bb4;
    --glass-bg: rgba(7, 11, 20, 0.6);
    --glass-border: rgba(0, 229, 255, 0.15);
    --font-heading: 'Bebas Neue', sans-serif;
    --font-body: 'Poppins', sans-serif;
}
body.dev-mode .bento-tags span, body.dev-mode .dev-core-skills li {
    font-family: ui-monospace, 'Cascadia Code', monospace;
    letter-spacing: -0.5px;
    background: rgba(0, 229, 255, 0.05);
    color: var(--accent-dev-bright);
    border: 1px solid var(--glass-border);
}
```

- [ ] **Step 2: Refine Bento Grid Layered Shadows**

```css
body.dev-mode .bento-item {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    box-shadow: 
        0 4px 6px rgba(0,0,0,0.3), /* Tight shadow */
        0 15px 35px rgba(0,229,255,0.05), /* Large ambient glow */
        inset 0 1px 0 rgba(255,255,255,0.1); /* Top rim light */
}
body.dev-mode .bento-item:hover {
    border-color: var(--accent-dev);
    box-shadow: 
        0 10px 15px rgba(0,0,0,0.4),
        0 25px 50px rgba(0,229,255,0.15),
        inset 0 1px 0 rgba(255,255,255,0.2);
}
```

- [ ] **Step 3: Run Visual Verification**
(Open `dev-portfolio.html` and verify the navy background, cyan glowing shadows, and monospace fonts on tags).

- [ ] **Step 4: Commit**
```bash
git add css/styles.css
git commit -m "style(dev): implement technical theme, glowing bento grid, monospace tags"
```

---

### Task 4: Global Accessibility & Polish

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Implement Visible Focus States**

```css
/* Add to styles.css */
*:focus-visible {
    outline: 3px solid var(--accent-red);
    outline-offset: 3px;
}
body.dev-mode *:focus-visible {
    outline-color: var(--accent-dev-bright);
}
```

- [ ] **Step 2: Verify Touch Targets**

```css
.navbar a, .filter-btn, .ContactSubmitBtn {
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
}
```

- [ ] **Step 3: Run Visual Verification**
(Test tabbing through the site using keyboard to ensure focus outlines are visible, and check mobile view).

- [ ] **Step 4: Commit**
```bash
git add css/styles.css
git commit -m "fix(a11y): add focus-visible outlines and ensure 44px touch targets"
```
