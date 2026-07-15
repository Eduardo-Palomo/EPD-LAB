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
    const scrollPos = window.scrollY;

    if (scrollPos > 100) {
        if (video) video.classList.remove('video-visible');
    } else {
        if (video) video.classList.add('video-visible'); 
    }

    if (scrollPos > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
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
