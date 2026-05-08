# Mobile App Showcase Integration

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the vertical mobile app video (`DevMobile.mp4`) into the Dev Lab Bento Grid.

**Architecture:** Add a `.tall` class to the Bento grid system to support vertical items (spanning 2 rows) and replace the placeholder in HTML with the actual video and project tags.

**Tech Stack:** HTML5, CSS3.

---

### Task 1: Update Bento Grid CSS

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Add the .tall class and adjust video handling**
Define the spanning logic and ensure vertical videos fit perfectly.

```css
.bento-item.tall {
    grid-row: span 2;
}

/* Ensure vertical videos cover the area correctly */
.bento-video {
    object-fit: cover;
    /* For vertical videos, we might want to ensure they don't look stretched */
    height: 100%;
    width: 100%;
}
```

- [ ] **Step 2: Commit**

```bash
git add css/styles.css
git commit -m "style: add tall bento item support for vertical mobile apps"
```

---

### Task 2: Update Dev Lab HTML

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace the Mobile App placeholder with the actual video**
Update the classes, source, and tags for the Flutter project.

```html
            <div class="bento-item tall">
                <video class="bento-video" src="Media/Videos/DevMobile.mp4" muted loop playsinline autoplay></video>
                <div class="featured-badge">Mobile Project</div>
                <h3>Eco-Tracker</h3>
                <p>Flutter Mobile Application</p>
                <div class="bento-tags">
                    <span>Flutter</span>
                    <span>Dart</span>
                    <span>UI/UX</span>
                </div>
            </div>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: showcase Flutter mobile app with vertical video in Dev Lab"
```
