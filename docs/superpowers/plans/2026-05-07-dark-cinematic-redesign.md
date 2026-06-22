# Dark Cinematic Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Transform the 3D portfolio into a high-end "Dark Cinematic" experience with an immersive grid, glassmorphism navigation, and a dedicated Dev UI-UX section.

**Architecture:** Component-based CSS refactoring using custom properties (CSS variables) for theme consistency. Vanilla JS for smooth transitions, filtering, and mode toggling.

**Tech Stack:** HTML5, CSS3 (Modern features: backdrop-filter, grid, flex), Vanilla JavaScript.

---

### Task 1: Foundation & Typography

**Files:**
- Modify: `css/styles.css`

- [x] **Step 1: Update CSS variables and global styles**

```css
:root {
    --bg-color: #020202;
    --accent-red: #6d0f0f;
    --accent-red-bright: #8e1b1b;
    --accent-dev: #0f4a6d; /* Added for Dev Mode */
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
    --glass-bg: rgba(2, 2, 2, 0.7);
    --glass-border: rgba(255, 255, 255, 0.1);
    --rim-light: radial-gradient(circle, rgba(109, 15, 15, 0.4) 0%, rgba(2, 2, 2, 0) 70%);
}

body {
    background-color: var(--bg-color);
    color: var(--text-primary);
    font-family: 'Oswald', sans-serif;
    overflow-x: hidden;
}

h1, h2, .hero-h1 {
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 2px;
}
```

- [x] **Step 2: Verify visual baseline**
Confirm that backgrounds are deeper black and fonts have updated correctly.

- [x] **Step 3: Commit**
`git commit -m "style: update theme variables and typography foundations"`

---

### Task 2: Floating Glassmorphism Navbar

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`

- [x] **Step 1: Refactor Navbar structure and style**

```css
.navbar {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    max-width: 90%;
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 50px;
    padding: 10px 40px;
    z-index: 2000;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar ul {
    gap: 40px;
}

.navbar a {
    font-size: 1rem;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1px;
}
```

- [x] **Step 2: Verify sticky behavior and blur effect**
Ensure the navbar stays centered and the backdrop-filter works correctly.

- [x] **Step 3: Commit**
`git commit -m "feat: implement floating glassmorphism navbar"`

---

### Task 3: Immersive Dark Grid (Layout)

**Files:**
- Modify: `css/styles.css`

- [x] **Step 1: Refactor projects section to a grid**

```css
.projects-section {
    background: var(--bg-color);
    padding: 100px 5%;
}

.projects-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
    overflow-x: visible;
    white-space: normal;
    padding: 40px 0;
}

.project-card {
    position: relative;
    width: 100%;
    height: 500px;
    background: #0a0a0a;
    border-radius: 15px;
    overflow: visible; /* Changed for pop-out effect */
    transition: transform 0.5s ease, box-shadow 0.5s ease;
}
```

- [x] **Step 2: Verify grid responsiveness**
Check that cards wrap correctly on different screen sizes.

- [x] **Step 3: Commit**
`git commit -m "style: refactor project gallery to immersive grid layout"`

---

### Task 4: Turntable Transitions & Hover FX

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`
- Modify: `js/Script.js`

- [x] **Step 1: Update HTML for pop-out effect**
Wrap `img` in `.card-img-container`.

- [x] **Step 2: Add rim lighting and cross-fade effects in CSS**
```css
.project-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: var(--rim-light);
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: 5;
    pointer-events: none;
}
.project-card:hover { z-index: 50; }
.project-card:hover::before { opacity: 1; }
.project-card .hover-video { z-index: 10; height: 120%; }
```

- [x] **Step 3: Verify smooth transition to video**
Check that the image fades out as the video fades in on hover and pops out.

- [x] **Step 4: Commit**
`git commit -m "feat: add cinematic hover effects and rim lighting to project cards"`

---

### Task 5: Final Section Polish (About & Skills)

**Files:**
- Modify: `css/styles.css`

- [x] **Step 1: Modernize About and Skills sections**

```css
.profile-circle {
    border: 2px solid var(--glass-border);
    box-shadow: 0 0 30px rgba(109, 15, 15, 0.2);
    filter: grayscale(100%) contrast(1.1);
}

.software-item img {
    filter: grayscale(100%) brightness(0.8);
    transition: all 0.4s ease;
}

.software-item:hover img {
    filter: grayscale(0%) brightness(1);
    transform: translateY(-5px);
}
```

- [x] **Step 2: Verify contrast and readability**
Final check on the "About me" text and software grid icons.

- [x] **Step 3: Commit**
`git commit -m "style: polish about and skills sections for cinematic consistency"`

---

### Task 6: 3D Skill Filters

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`
- Modify: `js/Script.js`

- [x] **Step 1: Add Filter Bar to index.html**
Insert before `.projects-container`.

- [x] **Step 2: Add CSS for Filter Bar**
Style buttons with glassmorphism and red accents.

- [x] **Step 3: Implement Filtering Logic in js/Script.js**
Use `dataset.category` to filter cards.

- [x] **Step 4: Commit**
`git commit -m "feat: add category filters for 3D projects"`

---

### Task 7: Dev Lab (Bento Grid UI-UX)

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`
- Modify: `js/Script.js`

- [x] **Step 1: Create Dev Portfolio Section**
Add a new section for Dev projects.

- [x] **Step 2: Design Bento Grid in CSS**
Responsive grid with asymmetric cards.

- [x] **Step 3: Implement Mode Toggle in JS**
Update the floating button to switch between Art and Dev worlds.

- [x] **Step 4: Commit**
`git commit -m "feat: implement Dev Lab with Bento Grid for UI-UX"`

---

### Task 8: Futuristic Split Portal (Entry Screen)

**Files:**
- Modify: `index.html`
- Modify: `css/styles.css`
- Modify: `js/Script.js`

- [x] **Step 1: Add Portal HTML to index.html**
Insert at the beginning of `<body>`:
```html
<div id="entry-portal" class="portal-overlay">
    <div class="portal-side art-side" data-mode="art">
        <div class="portal-content">
            <h2>3D ART STATION</h2>
            <p>Immersive Characters & Environments</p>
            <button class="portal-btn">ENTER ART</button>
        </div>
    </div>
    <div class="portal-side dev-side" data-mode="dev">
        <div class="portal-content">
            <h2>DEV UI-UX LAB</h2>
            <p>Next-Gen Interface Design</p>
            <button class="portal-btn">ENTER LAB</button>
        </div>
    </div>
</div>
```

- [x] **Step 2: Add CSS for Split Portal**
```css
.portal-overlay {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100vh;
    z-index: 9999;
    display: flex;
    overflow: hidden;
}
.portal-side {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    position: relative;
}
.art-side { background: #050505; border-right: 1px solid var(--accent-red); }
.dev-side { background: #0a0a0a; }
.portal-side:hover { flex: 1.2; }
.portal-overlay.fade-out { opacity: 0; pointer-events: none; transition: 0.8s ease; }
```

- [x] **Step 3: Implement Portal Logic in js/Script.js**
Add listeners to `.portal-side` to set the mode (`dev-mode` or `art-mode`) and trigger the `.fade-out` transition.

- [x] **Step 4: Commit**
`git commit -m "feat: implement futuristic split portal entry screen"`
