# Interactive Software Stack Integration

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the "Software Proficiency" section into two distinct, interactive stacks (3D Art & Dev) using the provided icons.

**Architecture:** Create two separate grid containers for the stacks, apply a unified cinematic hover effect (glow + lift), and ensure responsiveness.

**Tech Stack:** HTML5, CSS3 (Glow filters, transitions).

---

### Task 1: Refactor Software Showcase HTML

**Files:**
- Modify: `index.html`

- [x] **Step 1: Replace the single software grid with categorized stacks**
Organize the icons into "3D Art Stack" and "Dev Stack" using the assets found in `Media/icons/3Dicons` and `Media/icons/DevIcons`.

```html
<div class="software-showcase">
    <h3 class="subsection-title">3D Art Stack</h3>
    <div class="software-grid">
        <div class="software-item" title="Blender"><img src="Media/icons/3Dicons/Blender_logo_no_text.svg.png" alt="Blender"><span>Blender</span></div>
        <div class="software-item" title="Substance 3D"><img src="Media/icons/3Dicons/adobe-substance-3d-painter-icon.webp" alt="Substance 3D"><span>Substance 3D</span></div>
        <div class="software-item" title="Unreal Engine"><img src="Media/icons/3Dicons/unreal-engine-white-icon.webp" alt="Unreal Engine"><span>Unreal Engine</span></div>
        <div class="software-item" title="Unity"><img src="Media/icons/3Dicons/why-unitys-new-install-fees-are-spurring-massive-backlash-am_x5cc.768.webp" alt="Unity"><span>Unity</span></div>
        <div class="software-item" title="Marmoset Toolbag"><img src="Media/icons/3Dicons/tb4_light-744x652.webp" alt="Marmoset Toolbag"><span>Marmoset</span></div>
        <div class="software-item" title="ZBrush"><img src="Media/icons/3Dicons/ZBrush-Logo.jpg" alt="ZBrush"><span>ZBrush</span></div>
        <div class="software-item" title="3ds Max"><img src="Media/icons/3Dicons/autodesk-3ds-max-logo.avif" alt="3ds Max"><span>3ds Max</span></div>
        <div class="software-item" title="Maya"><img src="Media/icons/3Dicons/autodesk-maya-logo.avif" alt="Maya"><span>Maya</span></div>
        <div class="software-item" title="Nuke"><img src="Media/icons/3Dicons/icons8-nuke-144.png" alt="Nuke"><span>Nuke</span></div>
    </div>

    <h3 class="subsection-title" style="margin-top: 60px;">Dev Stack</h3>
    <div class="software-grid dev-stack">
        <div class="software-item" title="React"><img src="Media/icons/DevIcons/React.png" alt="React"><span>React</span></div>
        <div class="software-item" title="Flutter"><img src="Media/icons/DevIcons/Flutter.png" alt="Flutter"><span>Flutter</span></div>
        <div class="software-item" title="Dart"><img src="Media/icons/DevIcons/Dart-logo.png" alt="Dart"><span>Dart</span></div>
        <div class="software-item" title="C#"><img src="Media/icons/DevIcons/Csharp.png" alt="Csharp"><span>C#</span></div>
        <div class="software-item" title="Figma"><img src="Media/icons/DevIcons/figma_logo_icon_147289.webp" alt="Figma"><span>Figma</span></div>
        <div class="software-item" title="Git"><img src="Media/icons/DevIcons/Git_icon.svg.png" alt="Git"><span>Git</span></div>
    </div>
</div>
```

- [x] **Step 2: Commit**
`git add index.html && git commit -m "feat: categorize software proficiency into 3D and Dev stacks"`

---

### Task 2: Enhance Icon Interactions & Styles

**Files:**
- Modify: `css/styles.css`

- [x] **Step 1: Update icon styles with glow effects and dynamic hover**
Make the icons feel like "active modules" with red glow for 3D and blue glow for Dev (in Dev Mode).

```css
.software-item {
    position: relative;
    padding: 20px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.software-item:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-10px) scale(1.05);
    border-color: var(--accent-red);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px var(--accent-red);
}

.software-item img {
    width: 60px;
    height: 60px;
    filter: grayscale(100%) brightness(0.7);
    transition: all 0.4s ease;
}

.software-item:hover img {
    filter: grayscale(0%) brightness(1) drop-shadow(0 0 10px var(--accent-red));
}

.software-item span {
    margin-top: 12px;
    font-size: 0.85rem;
    font-weight: 500;
    opacity: 0.6;
    transition: opacity 0.3s ease;
}

.software-item:hover span {
    opacity: 1;
    color: white;
}
```

- [x] **Step 2: Commit**
`git add css/styles.css && git commit -m "style: add cinematic glow and interactive hover to software icons"`
