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

// --- Thème clair/sombre/auto ---
const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function activateThemeButtons(theme) {
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}

function applyTheme(theme) {
    let effective = theme;
    if (theme === 'auto') {
        effective = getSystemTheme();
        document.body.dataset.theme = 'auto';
    } else {
        document.body.dataset.theme = theme;
    }

    document.body.classList.toggle('dark-mode', effective === 'dark');
    document.body.classList.toggle('light-mode', effective === 'light');

    activateThemeButtons(document.body.dataset.theme);
    localStorage.setItem('themeMode', document.body.dataset.theme);

    const modeIndicator = document.getElementById('themeModeIndicator');
    if (modeIndicator) {
        modeIndicator.textContent = `Thème: ${document.body.dataset.theme}`;
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('themeMode') || 'auto';
    applyTheme(savedTheme);

    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            applyTheme(btn.dataset.theme);
        });
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (document.body.dataset.theme === 'auto') {
            applyTheme('auto');
        }
    });
}

document.addEventListener('DOMContentLoaded', initTheme);

// --- Titre interactif animé ---
const heroTitle = document.getElementById('heroTitle');
if (heroTitle) {
    const phrases = [
        'Minh Tue Tran',
        'Ingenieur DevOps en herbe',
        'Architecte Cloud et Sécurité',
        'Passionné par l’innovation'
    ];
    let phraseIndex = 0;

    heroTitle.addEventListener('mouseenter', () => {
        heroTitle.style.transform = 'translateY(-3px) scale(1.04)';
    });
    heroTitle.addEventListener('mouseleave', () => {
        heroTitle.style.transform = 'translateY(0) scale(1)';
    });
    heroTitle.addEventListener('click', () => {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        heroTitle.textContent = phrases[phraseIndex];
        heroTitle.style.color = `hsl(${Math.floor(Math.random() * 360)}, 85%, 60%)`;
    });

    setInterval(() => {
        heroTitle.style.textShadow = `0 0 8px rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`;
    }, 1200);
}

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


// Thème sombre / clair
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
        themeToggle.setAttribute('aria-label', 'Basculer mode clair');
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
        themeToggle.setAttribute('aria-label', 'Basculer mode sombre');
    }
    localStorage.setItem('themeMode', theme);
}

function initTheme() {
    const savedTheme = localStorage.getItem('themeMode') || 'light';
    applyTheme(savedTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
}

document.addEventListener('DOMContentLoaded', initTheme);

// //Traduction    
// const deepLApiKey = "265bf361-d784-47a6-8372-4e1c366fd033:fx"; // 🔑 Mets ta vraie clé API ici

// // ✅ Fonction pour traduire un texte avec DeepL
// async function translateTextDeepL(text, sourceLang, targetLang) {
//     const url = "https://api-free.deepl.com/v2/translate";

//     try {
//         const response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Authorization": `DeepL-Auth-Key ${deepLApiKey}`, // 🔑 Authentification API
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 text: [text],
//                 source_lang: sourceLang.toUpperCase(),
//                 target_lang: targetLang.toUpperCase()
//             })
//         });

//         if (!response.ok) throw new Error(`Erreur API: ${response.status} ${response.statusText}`);

//         const data = await response.json();
//         return data.translations[0].text; // ✅ Retourne le texte traduit
//     } catch (error) {
//         console.error("❌ Erreur lors de la traduction :", error);
//         return text; // Retourne le texte original en cas d'erreur
//     }
// }

// // ✅ Fonction pour changer la langue du site
// async function changeLanguage(lang) {
//     const elements = document.querySelectorAll("[data-translate]");

//     for (let el of elements) {
//         const originalText = el.getAttribute("data-original") || el.textContent;
//         el.setAttribute("data-original", originalText); // 🔒 Sauvegarde du texte original

//         if (lang === "fr") {
//             el.textContent = originalText; // 🔄 Restauration du texte en FR
//         } else {
//             el.textContent = await translateTextDeepL(originalText, "FR", lang);
//         }
//     }

//     localStorage.setItem("lang", lang); // 🔄 Sauvegarde la langue choisie
// }

// // ✅ Charger la langue enregistrée au démarrage
// document.addEventListener("DOMContentLoaded", () => {
//     const savedLang = localStorage.getItem("lang") || "fr";
//     changeLanguage(savedLang);
// });






