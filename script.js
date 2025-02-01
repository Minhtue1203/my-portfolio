// script.js
document.querySelectorAll('.nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const interactiveBubble = document.querySelector('.interactive');
    let currentX = 0, currentY = 0, targetX = 0, targetY = 0;

    function moveBubble() {
        currentX += (targetX - currentX) / 20;
        currentY += (targetY - currentY) / 20;
        interactiveBubble.style.transform = `translate(${currentX}px, ${currentY}px)`;
        requestAnimationFrame(moveBubble);
    }

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX - window.innerWidth / 2;
        targetY = e.clientY - window.innerHeight / 2;
    });

    moveBubble();
});

// Sélectionner toutes les vidéos
const videos = document.querySelectorAll('.gallery-video');
let activeVideo = null;

videos.forEach((video) => {
    video.addEventListener('click', () => {
        // Si une autre vidéo est en lecture, on l'arrête
        if (activeVideo && activeVideo !== video) {
            activeVideo.pause();
            activeVideo.currentTime = 0; // Revenir au début
            activeVideo.muted = true;
            activeVideo.closest('.gallery-item').classList.remove('active');
        }

        // Basculer le statut de la vidéo cliquée
        if (video.paused) {
            video.play();
            video.muted = false; // Activer le son
            video.closest('.gallery-item').classList.add('active');
        } else {
            video.pause();
            video.muted = true; // Couper le son
            video.closest('.gallery-item').classList.remove('active');
        }

        activeVideo = video;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.gallery-video');

    videos.forEach((video) => {
        video.addEventListener('click', async () => {
            try {
                if (document.pictureInPictureElement) {
                    await document.exitPictureInPicture();
                } else {
                    await video.requestPictureInPicture();
                }
            } catch (error) {
                console.error('Error entering Picture-in-Picture mode:', error);
            }
        });
    });
});



/* competence interface */
document.querySelectorAll('.progress-bar').forEach((bar) => {
    const fill = bar.querySelector('.progress-fill');
    const defaultText = fill.textContent; // Sauvegarde du texte par défaut
    let isClicked = false; // État pour suivre le clic

    bar.addEventListener('click', () => {
        if (!isClicked) {
            const hiddenValue = bar.getAttribute('data-hidden'); // Récupère la valeur cachée
            fill.textContent = hiddenValue; // Affiche la valeur cachée
            isClicked = true; // Change l'état
        } else {
            fill.textContent = defaultText; // Réinitialise au texte par défaut
            isClicked = false; // Change l'état
        }
    });
});



/* Soft Skill*/

document.querySelectorAll('.skill-card').forEach((card) => {
    const description = card.querySelector('.skill-description'); // Récupère l'élément description
    const text = card.getAttribute('data-description'); // Récupère la description depuis data-description

    let isVisible = false; // État pour suivre si la description est visible

    card.addEventListener('click', () => {
        if (!isVisible) {
            description.textContent = text; // Affiche la description
            description.style.display = 'block';
            isVisible = true;
        } else {
            description.style.display = 'none'; // Cache la description
            isVisible = false;
        }
    });
});

/* Parcours*/

// Variables globales
const character = document.getElementById('character');
const years = document.querySelectorAll('.year');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const popupClose = document.getElementById('popup-close');

// Fonction pour déplacer le personnage
function moveCharacterToYear(targetYear) {
    const targetPosition = targetYear.offsetLeft + targetYear.offsetWidth / 2;

    // Déplace le personnage
    character.style.left = `${targetPosition}px`;

    // Affiche les détails dans la popup
    setTimeout(() => {
        const details = targetYear.getAttribute('data-details');
        popupText.textContent = details;
        popup.style.display = 'flex';
    }, 500);
}

// Ajoute les événements de clic pour chaque année
years.forEach((year) => {
    year.addEventListener('click', () => {
        moveCharacterToYear(year);
    });
});

// Fermer la popup
popupClose.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Fermer la popup en cliquant en dehors
window.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});

/*Projet*/

// Sélection des boutons et projets
const filterButtons = document.querySelectorAll('.filter-buttons button');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter.toLowerCase();

        projectItems.forEach(item => {
            const techText = item.dataset.category.toLowerCase();

            // Afficher si la catégorie contient le filtre ou si "Tous" est sélectionné
            if (filter === "all" || techText.includes(filter)) {
                item.style.display = 'block';
                setTimeout(() => item.classList.add("visible"), 50);
            } else {
                item.style.display = 'none';
                item.classList.remove("visible");
            }
        });
    });
});


/*scrolling bar*/

document.addEventListener("scroll", () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) { // If scrolled down 50px
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});





