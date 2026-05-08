window.addEventListener('scroll', () => {
    const video = document.getElementById('hero-video');
    const scrollPos = window.scrollY; // Obtiene cuánto ha bajado el usuario

    // Si el usuario baja más de 100px, el video desaparece
    // Si regresa al inicio (0px), el video vuelve a aparecer
    if (scrollPos > 100) {
        if (video) video.classList.remove('video-visible');
    } else {
        if (video) video.classList.add('video-visible'); 
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