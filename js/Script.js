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

// Hover Video Logic
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
