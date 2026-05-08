# Portfolio Reorganization: VFX & Modeling

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize the project gallery into two main categories: "Modeling & Characters" (merging characters and texturing) and "VFX" (exclusive to new vfx files).

**Architecture:** Update HTML data-attributes and labels, keeping the existing CSS grid and JS filtering logic intact.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript.

---

### Task 1: Update Navigation & Filter Labels

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update the filter bar buttons**
Change the labels and data-filters to match the new organization.

```html
<div class="filter-bar">
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="modeling">Modeling & Characters</button>
    <button class="filter-btn" data-filter="vfx">VFX</button>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "chore: update filter bar labels"
```

---

### Task 2: Reclassify Existing Projects

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Move Texturing and VFX characters to "modeling"**
Update `data-category` for projects that should now be in the main section.

```html
<!-- Update GirlNetRunner -->
<div class="project-card" data-category="modeling">
    ...
</div>

<!-- Update Anna Yamada -->
<div class="project-card" data-category="modeling">
    ...
</div>

<!-- Update Venom, Spawn, Cloth Simulation -->
<div class="project-card" data-category="modeling">
    ...
</div>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: reclassify character projects to modeling category"
```

---

### Task 3: Add New VFX Projects

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add cards for Vfx1 through vfx5**
Insert the new video projects into the `.projects-container`. Use the video as the main source since there are no thumbnails.

```html
<!-- Example for Vfx1 -->
<div class="project-card" data-category="vfx">
    <div class="card-img-container">
        <video src="Media/Videos/Vfx1.mp4" muted loop playsinline autoplay style="width: 100%; height: 100%; object-fit: cover;"></video>
    </div>
    <video class="hover-video" src="Media/Videos/Vfx1.mp4" muted loop playsinline preload="metadata"></video>
</div>
<!-- Repeat for vfx2, vfx3, vfx4, vfx5 -->
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add new vfx video projects to gallery"
```

---

### Task 4: Verify Filtering Logic

**Files:**
- Test: Open `index.html` in browser

- [ ] **Step 1: Verify all filters work**
Ensure clicking "Modeling & Characters" shows all characters/models, and "VFX" only shows the 5 new videos.

- [ ] **Step 2: Commit (if any JS fixes were needed)**

```bash
git commit -m "test: verify filtering logic works with new categories"
```
