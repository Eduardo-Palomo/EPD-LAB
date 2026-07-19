// Cinematic Preloader Logic (Real Progress)
document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    const preloaderBar = document.getElementById("preloader-bar");
    const preloaderPercentage = document.getElementById("preloader-percentage");

    // Track all image tags and the main autoplaying video
    const images = Array.from(document.querySelectorAll("img"));
    const heroVideo = document.getElementById("hero-video");

    let totalResources = images.length;
    if (heroVideo) totalResources += 1;

    let loadedResources = 0;

    function updateProgress() {
        loadedResources++;
        const percentage = totalResources > 0 ? Math.round((loadedResources / totalResources) * 100) : 100;
        
        if (preloaderBar) preloaderBar.style.width = `${percentage}%`;
        if (preloaderPercentage) preloaderPercentage.textContent = `${percentage}%`;

        if (loadedResources >= totalResources) {
            finishLoading();
        }
    }

    function finishLoading() {
        setTimeout(() => {
            preloader.classList.add("loaded");
        }, 300); // Smooth delay
    }

    // Safety fallback (timeout in 6 seconds max)
    const safetyTimeout = setTimeout(() => {
        if (!preloader.classList.contains("loaded")) {
            if (preloaderBar) preloaderBar.style.width = "100%";
            if (preloaderPercentage) preloaderPercentage.textContent = "100%";
            finishLoading();
        }
    }, 6000);

    if (totalResources === 0) {
        finishLoading();
        clearTimeout(safetyTimeout);
        return;
    }

    // Track Images
    images.forEach(img => {
        if (img.complete) {
            updateProgress();
        } else {
            img.addEventListener("load", updateProgress);
            img.addEventListener("error", updateProgress); // Don't block if there's an error loading
        }
    });

    // Track Hero Video
    if (heroVideo) {
        if (heroVideo.readyState >= 3) { // already loaded enough
            updateProgress();
        } else {
            heroVideo.addEventListener("canplaythrough", updateProgress, { once: true });
            heroVideo.addEventListener("error", updateProgress, { once: true });
        }
    }
});

window.addEventListener('scroll', () => {
    const video = document.getElementById('hero-video');
    const navbar = document.querySelector('.navbar');
    const langSwitcher = document.querySelector('.lang-switcher');
    const scrollPos = window.scrollY;

    if (scrollPos > 100) {
        if (video) video.classList.remove('video-visible');
    } else {
        if (video) video.classList.add('video-visible'); 
    }

    if (scrollPos > 50) {
        if (navbar) navbar.classList.add('scrolled');
        if (langSwitcher) langSwitcher.classList.add('scrolled');
    } else {
        if (navbar) navbar.classList.remove('scrolled');
        if (langSwitcher) langSwitcher.classList.remove('scrolled');
    }
});

// Art Portfolio: Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => { card.style.display = 'none'; }, 500);
                }
            });
        });
    });
}

// Hover/Scroll Video Logic
const isMobileOrTouch = window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(pointer: coarse)').matches;

if (isMobileOrTouch) {
    // Mobile/Touch behavior: Play video when card enters viewport
    const videoObserverOptions = {
        threshold: 0.5, // Play when 50% of the card is visible
        rootMargin: "0px"
    };

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const card = entry.target;
            const video = card.querySelector('.hover-video');
            if (!video) return;

            if (entry.isIntersecting) {
                // Clear any existing timeout to avoid multiple queues
                if (card._videoTimeout) clearTimeout(card._videoTimeout);

                // Set a 500ms delay to let the user view the card cover before autoplaying
                card._videoTimeout = setTimeout(() => {
                    card.classList.add('video-active');
                    video.play().catch(() => {});
                }, 500);
            } else {
                // If they scroll past before the 500ms, clear the timeout
                if (card._videoTimeout) {
                    clearTimeout(card._videoTimeout);
                    card._videoTimeout = null;
                }
                card.classList.remove('video-active');
                video.pause();
                video.currentTime = 0;
            }
        });
    }, videoObserverOptions);

    projectCards.forEach(card => {
        const video = card.querySelector('.hover-video');
        if (video) {
            videoObserver.observe(card);
        }
    });
} else {
    // Desktop behavior: Play video on hover
    let currentlyPlaying = null;
    projectCards.forEach(card => {
        const video = card.querySelector('.hover-video');
        if (video) {
            card.addEventListener('mouseenter', () => {
                if (currentlyPlaying && currentlyPlaying !== video) {
                    currentlyPlaying.pause();
                    currentlyPlaying.currentTime = 0;
                }
                video.play().then(() => { currentlyPlaying = video; }).catch(() => {});
            });
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
                if (currentlyPlaying === video) currentlyPlaying = null;
            });
        }
    });
}

// Cinematic Reveal on Scroll
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

projectCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `all 0.8s cubic-bezier(0.2, 1, 0.3, 1) ${index * 0.1}s`;
    revealObserver.observe(card);
});

// Update the reveal class in CSS via JS for instant injection if not in styles.css
const style = document.createElement('style');
style.innerHTML = `
    .project-card.revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Collapsible Demo Reel Toggle
function toggleReel() {
    const container = document.querySelector('.floating-reel-container');
    if (container) {
        container.classList.toggle('collapsed');
    }
}

// --- Translation Dictionary and Language Switcher Logic ---
const translations = {
    en: {
        // portal
        "portal-art-title": "3D ART STATION",
        "portal-art-desc": "Digital Sculpting & Cinematic Design",
        "portal-dev-title": "DEV UI-UX LAB",
        "portal-dev-desc": "Engineering Next-Gen Interfaces",
        "portal-enter": "Enter",
        
        // navbar
        "nav-home": "Home",
        "nav-about": "About",
        "nav-toolkit": "Toolkit",
        "nav-projects": "Projects",
        "nav-contact": "Contact",
        "art-nav-skills": "Skills",
        
        // dev-portfolio
        "dev-hero-title": "HELLO, I AM <br> EDUARDO",
        "dev-hero-subtitle": "DEV UI-UX LAB",
        "dev-hero-desc": "Engineering high-performance digital systems with architectural precision and technical excellence.",
        "dev-section-projects": "Infrastructure / UI-UX",
        "dev-bento-badge-featured": "Featured System",
        "dev-bento-1-title": "Game Studio Architecture",
        "dev-bento-1-desc": "High-fidelity portfolio orchestration",
        "dev-bento-2-title": "XR Logic Systems",
        "dev-bento-2-desc": "Blueprint logic & shader engineering",
        "dev-bento-badge-mobile": "Mobile Interface",
        "dev-bento-3-title": "Financial Interface Design",
        "dev-bento-3-desc": "Cross-platform mobile optimization",
        "dev-section-about": "The developer",
        "dev-about-p1": "I bridge the gap between technical art and software engineering. My focus is on creating clean, scalable architectures that support high-impact visual experiences.",
        "dev-about-p2": "With a foundation in character art and technical pipelines, I approach development with a unique spatial and structural perspective.",
        "dev-edu-title": "Education",
        "dev-edu-degree1": "Bachelor - Degree in Design and Art for Video Games",
        "dev-edu-degree2": "Bachelor - Degree in Artificial Intelligence Engineering",
        "dev-edu-status-completed": "Completed",
        "dev-edu-status-inprogress": "In Progress",
        "dev-section-toolkit": "Technical Stack",
        "dev-section-contact": "Initialize Project",
        "dev-contact-label-name": "Resource Name",
        "dev-contact-placeholder-name": "Identificación...",
        "dev-contact-label-email": "Callback Email",
        "dev-contact-label-requirements": "System Requirements",
        "dev-contact-placeholder-requirements": "Brief technical requirements summary...",
        "dev-contact-submit": "INITIALIZE PROJECT",
        "floating-toggle-btn-art": "Switch to Art Station",
        "floating-toggle-btn-cv-dev": "View Dev CV",

        // art-portfolio
        "art-hero-subtitle": "3D ART STATION",
        "art-hero-desc": "Crafting immersive characters, environments, and visual stories for games and cinematic experiences.",
        "art-filter-all": "All",
        "art-filter-modeling": "Modeling & Characters",
        "art-filter-vfx": "VFX",
        "art-section-about": "About the Artist",
        "art-about-p1": "I’m Eduardo, a passionate and self-taught 3D artist with over 8 years of experience. I specialize in the full pipeline of character and environment creation, from high-poly sculpting to engine integration. My goal is to bring digital worlds to life with a focus on visual impact and technical efficiency.",
        "art-section-skills": "Creative Toolkit",
        "art-skills-3d": "3D Art Stack",
        "art-skills-core": "Core Art Skills",
        "art-section-contact": "Get in Touch",
        "art-contact-label-name": "Name",
        "art-contact-placeholder-name": "Your name",
        "art-contact-label-email": "Email",
        "art-contact-placeholder-email": "your@email.com",
        "art-contact-label-message": "Message",
        "art-contact-placeholder-message": "Tell me about your project...",
        "art-contact-submit": "INITIALIZE PROJECT",
        "floating-toggle-btn-dev": "Switch to Dev Portfolio",
        "floating-toggle-btn-cv-art": "View 3D CV",
        "floating-reel-toggle-tooltip": "Esconder / Mostrar Demo Reel"
    },
    es: {
        // portal
        "portal-art-title": "ARTE 3D",
        "portal-art-desc": "Modelado 3D & Diseño Cinemático para Videojuegos",
        "portal-dev-title": "LAB DEV UI-UX",
        "portal-dev-desc": "Ingeniería de Interfaces de Nueva Generación",
        "portal-enter": "Entrar",

        // navbar
        "nav-home": "Inicio",
        "nav-about": "Sobre mí",
        "nav-toolkit": "Toolkit",
        "nav-projects": "Proyectos",
        "nav-contact": "Contacto",
        "art-nav-skills": "Habilidades",

        // dev-portfolio
        "dev-hero-title": "HOLA, SOY <br> EDUARDO",
        "dev-hero-subtitle": "LAB DEV UI-UX",
        "dev-hero-desc": "Ingeniería de sistemas digitales de alto rendimiento con precisión arquitectónica y excelencia técnica.",
        "dev-section-projects": "Infraestructura / UI-UX",
        "dev-bento-badge-featured": "Sistema Destacado",
        "dev-bento-1-title": "Arquitectura para Estudios de Juegos",
        "dev-bento-1-desc": "Orquestación de portafolios de alta fidelidad",
        "dev-bento-2-title": "Sistemas de Lógica XR",
        "dev-bento-2-desc": "Ingeniería de shaders y lógica de Blueprint",
        "dev-bento-badge-mobile": "Interfaz Móvil",
        "dev-bento-3-title": "Diseño de Interfaz Financiera",
        "dev-bento-3-desc": "Optimización móvil multiplataforma",
        "dev-section-about": "El desarrollador",
        "dev-about-p1": "Acorto la brecha entre el arte técnico y la ingeniería de software. Mi enfoque está en crear arquitecturas limpias y escalables que den soporte a experiencias visuales de alto impacto.",
        "dev-about-p2": "Con bases en arte de personajes y pipelines técnicos, abordo el desarrollo con una perspectiva espacial y estructural única.",
        "dev-edu-title": "Educación",
        "dev-edu-degree1": "Licenciatura - Diseño y Arte para Videojuegos",
        "dev-edu-degree2": "Licenciatura - Ingeniería en Inteligencia Artificial",
        "dev-edu-status-completed": "Completado",
        "dev-edu-status-inprogress": "En Progreso",
        "dev-section-toolkit": "Stack Técnico",
        "dev-section-contact": "Iniciar Proyecto",
        "dev-contact-label-name": "Nombre del Recurso",
        "dev-contact-placeholder-name": "Identificación...",
        "dev-contact-label-email": "Email de Contacto",
        "dev-contact-label-requirements": "Requerimientos del Sistema",
        "dev-contact-placeholder-requirements": "Breve resumen de requerimientos técnicos...",
        "dev-contact-submit": "INICIAR PROYECTO",
        "floating-toggle-btn-art": "Cambiar a Art Station",
        "floating-toggle-btn-cv-dev": "Ver CV Dev",

        // art-portfolio
        "art-hero-subtitle": "ARTE 3D",
        "art-hero-desc": "Modelado 3D de personajes y entornos para videojuegos — del sculpting en alta resolución a la integración en motor.",
        "art-filter-all": "Todo",
        "art-filter-modeling": "Modelado y Personajes",
        "art-filter-vfx": "VFX",
        "art-section-about": "Sobre el Artista",
        "art-about-p1": "Soy Eduardo, un artista 3D apasionado y autodidacta con más de 8 años de experiencia. Me especializo en todo el pipeline de creación de personajes y entornos, desde el esculpido en alta resolución hasta la integración en motor de juego. Mi meta es dar vida a mundos digitales con foco en el impacto visual y la eficiencia técnica.",
        "art-section-skills": "Toolkit Creativo",
        "art-skills-3d": "Stack de Arte 3D",
        "art-skills-core": "Habilidades de Arte Clave",
        "art-section-contact": "Ponerse en Contacto",
        "art-contact-label-name": "Nombre",
        "art-contact-placeholder-name": "Tu nombre",
        "art-contact-label-email": "Email",
        "art-contact-placeholder-email": "tu@email.com",
        "art-contact-label-message": "Mensaje",
        "art-contact-placeholder-message": "Contame sobre tu proyecto...",
        "art-contact-submit": "INICIAR PROYECTO",
        "floating-toggle-btn-dev": "Cambiar a Dev Portfolio",
        "floating-toggle-btn-cv-art": "Ver CV 3D",
        "floating-reel-toggle-tooltip": "Esconder / Mostrar Demo Reel"
    }
};

function setLanguage(lang) {
    localStorage.setItem("selectedLanguage", lang);
    
    // Update active button state
    document.querySelectorAll(".lang-btn").forEach(btn => {
        if (btn.getAttribute("data-lang") === lang) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Translate DOM elements
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach(el => {
        const key = el.getAttribute("data-translate");
        const translation = translations[lang][key];
        if (translation) {
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                el.setAttribute("placeholder", translation);
            } else if (el.tagName === "A" && el.classList.contains("floating-toggle-btn")) {
                el.setAttribute("title", translation);
            } else if (el.tagName === "A" && el.classList.contains("floating-toggle-btn-cv")) {
                el.setAttribute("title", translation);
            } else if (el.tagName === "BUTTON" && el.classList.contains("toggle-reel-btn")) {
                el.setAttribute("title", translation);
            } else {
                el.innerHTML = translation;
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Determine initial language (saved preference -> browser lang -> default 'en')
    const savedLang = localStorage.getItem("selectedLanguage");
    const browserLang = navigator.language || navigator.userLanguage;
    const initialLang = savedLang || (browserLang.startsWith("es") ? "es" : "en");

    // Apply initial language
    setLanguage(initialLang);

    // Attach click events to language switcher buttons
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const selectedLang = btn.getAttribute("data-lang");
            setLanguage(selectedLang);
        });
    });
});

