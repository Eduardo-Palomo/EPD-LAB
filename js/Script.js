window.addEventListener('scroll', () => {
    const video = document.getElementById('hero-video');
    const navbar = document.querySelector('.navbar');
    const scrollPos = window.scrollY;

    // Hero video visibility
    if (scrollPos > 100) {
        if (video) video.classList.remove('video-visible');
    } else {
        if (video) video.classList.add('video-visible'); 
    }

    // Navbar shrink effect
    if (scrollPos > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Reproducir video al hacer hover en las tarjetas de proyecto
const projectCards = document.querySelectorAll('.project-card');
let currentlyPlaying = null; // Guarda el video que se está reproduciendo actualmente

projectCards.forEach(card => {
    const video = card.querySelector('.hover-video');
    if (video) {
        card.addEventListener('mouseenter', () => {
            // Si hay otro video reproduciéndose, lo pausamos y reiniciamos
            if (currentlyPlaying && currentlyPlaying !== video) {
                currentlyPlaying.pause();
                currentlyPlaying.currentTime = 0;
            }

            // Intentamos reproducir el video actual
            video.play().then(() => {
                currentlyPlaying = video;
            }).catch(error => {
                console.log("No se pudo reproducir el video:", error);
            });
        });

        card.addEventListener('mouseleave', () => {
            video.pause();
            // Opcional: reiniciar el video al inicio cuando se quita el mouse
            video.currentTime = 0;
            
            if (currentlyPlaying === video) {
                currentlyPlaying = null;
            }
        });
    }
});

// Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        cards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 500); // Match CSS transition time
            }
        });
    });
});

// Toggle Dev/Art Mode
const toggleBtn = document.getElementById('go-to-dev-btn');
const body = document.body;

if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        body.classList.toggle('dev-mode');
        
        // Cambiar el título del botón según el modo
        if (body.classList.contains('dev-mode')) {
            toggleBtn.title = "Switch to Art Mode";
        } else {
            toggleBtn.title = "Switch to Dev Mode";
        }

        // Opcional: Volver al inicio al cambiar de modo para ver el cambio de accent color
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Entry Portal Logic
const entryPortal = document.getElementById('entry-portal');
const portalSides = document.querySelectorAll('.portal-side');

if (entryPortal && portalSides.length > 0) {
    portalSides.forEach(side => {
        side.addEventListener('click', () => {
            const mode = side.dataset.mode;
            
            if (mode === 'dev') {
                document.body.classList.add('dev-mode');
                if (toggleBtn) toggleBtn.title = "Switch to Art Mode";
            } else {
                document.body.classList.remove('dev-mode');
                if (toggleBtn) toggleBtn.title = "Switch to Dev Mode";
            }
            
            // Fade out the portal
            entryPortal.classList.add('fade-out');
            
            // Remove from DOM after transition
            setTimeout(() => {
                entryPortal.style.display = 'none';
            }, 1000);
        });
    });
}