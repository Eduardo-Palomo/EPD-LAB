# Contact Form Backend Integration

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable the contact form to send real emails using a third-party service (FormSubmit).

**Architecture:** Update HTML form attributes (`action`, `method`) and ensure all inputs have correct `name` attributes for the email service to process.

**Tech Stack:** HTML5.

---

### Task 1: Integrate FormSubmit.co

**Files:**
- Modify: `index.html`

- [x] **Step 1: Update form attributes and ensure names are correct**
Change the `<form>` tag to include the action and method, and verify names match the requirements.

```html
<form class="ContactForm" action="https://formsubmit.co/TU_CORREO_AQUI@email.com" method="POST">
    <!-- Honeypot para evitar SPAM -->
    <input type="text" name="_honey" style="display:none">
    <!-- Desactivar Captcha (opcional para mejor UX) -->
    <input type="hidden" name="_captcha" value="false">
    <!-- Página de éxito (opcional) -->
    <input type="hidden" name="_next" value="https://tu-usuario.github.io/tu-repo/index.html">

    <div class="form-group">
        <label class="ContactLabel" for="fname">First name</label>
        <input class="ContactInput" type="text" id="fname" name="First Name" placeholder="Your name" required>
    </div>
    <div class="form-group">
        <label class="ContactLabel" for="lname">Last name</label>
        <input class="ContactInput" type="text" id="lname" name="Last Name" placeholder="Your last name" required>
    </div>
    <div class="form-group">
        <label class="ContactLabel" for="Email">Email</label>
        <input class="ContactInput" type="email" id="Email" name="Email" placeholder="your@email.com" required>
    </div>
    <div class="form-group">
        <label class="ContactLabel" for="Message">Message</label>
        <textarea class="ContactTextArea" id="Message" name="Message" rows="4" placeholder="Tell me about your project..." required></textarea>
    </div>
    <button type="submit" class="ContactSubmitBtn">Send Message</button>
</form>
```

- [x] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: integrate contact form with FormSubmit backend"
```
