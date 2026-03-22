// script.js - Portfolio Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Navigation Smooth Scroll =====
    document.querySelectorAll('.nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== Theme System (Light/Dark/Auto) =====
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
            modeIndicator.textContent = 'Thème: ' + document.body.dataset.theme;
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

    initTheme();

    // ===== Hero Title =====
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) {
        const phrases = ['Minh Tue Tran','Ingenieur DevOps','Architecte Cloud','Passionné'];
        let phraseIndex = 0;

        heroTitle.style.cursor = 'pointer';
        heroTitle.addEventListener('mouseenter', () => heroTitle.style.transform = 'scale(1.04)');
        heroTitle.addEventListener('mouseleave', () => heroTitle.style.transform = 'scale(1)');
        heroTitle.addEventListener('click', () => {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            heroTitle.textContent = phrases[phraseIndex];
            const hue = Math.floor(Math.random() * 360);
            heroTitle.style.color = 'hsl(' + hue + ', 85%, 60%)';
        });
    }

    // === Interactive Bubble ===
    const bubble = document.querySelector('.interactive');
    if (bubble) {
        let cx = 0, cy = 0, tx = 0, ty = 0;
        function move() {
            cx += (tx - cx) / 20;
            cy += (ty - cy) / 20;
            bubble.style.transform = `translate(${cx}px, ${cy}px)`;
            requestAnimationFrame(move);
        }
        window.addEventListener('mousemove', (e) => {
            tx = e.clientX - window.innerWidth / 2;
            ty = e.clientY - window.innerHeight / 2;
        });
        move();
    }

    // === Gallery Videos ===
    let activeVideo = null;
    document.querySelectorAll('.gallery-video').forEach((video) => {
        video.addEventListener('click', () => {
            if (activeVideo && activeVideo !== video) {
                activeVideo.pause();
                activeVideo.closest('.gallery-item').classList.remove('active');
            }
            if (video.paused) {
                video.play();
                video.closest('.gallery-item').classList.add('active');
            } else {
                video.pause();
                video.closest('.gallery-item').classList.remove('active');
            }
            activeVideo = video;
        });

        // Picture-in-Picture on double-click
        video.addEventListener('dblclick', () => {
            if (document.pictureInPictureEnabled) {
                if (document.pictureInPictureElement) {
                    document.exitPictureInPicture();
                } else {
                    video.requestPictureInPicture();
                }
            }
        });
    });

    // === Skills Cards ===
    document.querySelectorAll('#soft-skills .skill-card').forEach((card) => {
        let isVisible = false;
        card.addEventListener('click', () => {
            const desc = card.querySelector('.skill-description');
            if (!isVisible) {
                desc.textContent = card.getAttribute('data-description');
                desc.style.display = 'block';
            } else {
                desc.style.display = 'none';
            }
            isVisible = !isVisible;
        });
    });

    // === Progress Bars - Hidden Text Toggle ===
    document.querySelectorAll('.progress-bar').forEach((bar) => {
        const progressFill = bar.querySelector('.progress-fill');
        if (progressFill) {
            const originalText = progressFill.textContent;
            const hiddenText = bar.getAttribute('data-hidden');
            let textVisible = false;

            bar.style.cursor = 'pointer';
            bar.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!textVisible) {
                    progressFill.textContent = hiddenText;
                    progressFill.style.fontSize = '0.85em';
                } else {
                    progressFill.textContent = originalText;
                    progressFill.style.fontSize = '';
                }
                textVisible = !textVisible;
            });
        }
    });

    // === Timeline ===
    const character = document.getElementById('character');
    const popup = document.getElementById('popup');
    if (character && popup) {
        document.querySelectorAll('.year').forEach((year) => {
            year.addEventListener('click', () => {
                character.style.left = (year.offsetLeft + year.offsetWidth / 2) + 'px';
                setTimeout(() => {
                    document.getElementById('popup-text').textContent = year.getAttribute('data-details');
                    popup.style.display = 'flex';
                }, 500);
            });
        });
        document.getElementById('popup-close').addEventListener('click', () => popup.style.display = 'none');
        window.addEventListener('click', (e) => { if (e.target === popup) popup.style.display = 'none'; });
    }

    // === Project Filter ===
    document.querySelectorAll('.filter-buttons button').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter.toLowerCase();
            document.querySelectorAll('.project-item').forEach(item => {
                const show = filter === 'all' || item.dataset.category.toLowerCase().includes(filter);
                item.style.display = show ? 'block' : 'none';
                if (show) setTimeout(() => item.classList.add('visible'), 50);
                else item.classList.remove('visible');
            });
        });
    });

    // === Scroll Effect ===
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav');
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    });

});
