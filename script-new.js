// Main script for portfolio - all code wrapped in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ DOM Loaded - Initializing portfolio features');

    // ===== Navigation smooth scroll =====
    document.querySelectorAll('.nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== Theme system (light/dark/auto) =====
    const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    function activateThemeButtons(theme) {
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });
    }

    function applyTheme(theme) {
        let effective = theme;
        if (theme === 'auto') {
            effective = getSystemTheme();
        }
        document.body.classList.remove('dark-mode', 'light-mode');
        document.body.classList.add(effective === 'dark' ? 'dark-mode' : 'light-mode');
        document.body.dataset.theme = theme;

        activateThemeButtons(theme);
        localStorage.setItem('themeMode', theme);

        const modeIndicator = document.getElementById('themeModeIndicator');
        if (modeIndicator) {
            modeIndicator.textContent = `Thème: ${theme}`;
        }
    }

    // Initialize theme on load
    const savedTheme = localStorage.getItem('themeMode') || 'auto';
    applyTheme(savedTheme);

    // Bind theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (document.body.dataset.theme === 'auto') {
            applyTheme('auto');
        }
    });

    // ===== Interactive hero title =====
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) {
        const phrases = [
            'Minh Tue Tran',
            'Ingenieur DevOps en herbe',
            'Architecte Cloud et Sécurité',
            'Passionné par l\'innovation'
        ];
        let phraseIndex = 0;

        heroTitle.style.cursor = 'pointer';
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

        // Glow effect
        setInterval(() => {
            if (document.body.dataset.theme !== 'dark') {
                heroTitle.style.textShadow = `0 0 8px rgba(0, 123, 255, ${Math.random() * 0.5 + 0.2})`;
            }
        }, 1200);
    }

    // ===== Interactive bubble for mouse tracking =====
    const interactiveBubble = document.querySelector('.interactive');
    if (interactiveBubble) {
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
    }

    // ===== Gallery videos =====
    const videos = document.querySelectorAll('.gallery-video');
    let activeVideo = null;

    videos.forEach((video) => {
        video.addEventListener('click', async () => {
            // Stop previous video
            if (activeVideo && activeVideo !== video) {
                activeVideo.pause();
                activeVideo.currentTime = 0;
                activeVideo.muted = true;
                activeVideo.closest('.gallery-item')?.classList.remove('active');
            }

            // Toggle current video
            if (video.paused) {
                video.play();
                video.muted = false;
                video.closest('.gallery-item')?.classList.add('active');
            } else {
                video.pause();
                video.muted = true;
                video.closest('.gallery-item')?.classList.remove('active');
            }

            activeVideo = video;

            // Picture-in-Picture
            try {
                if (document.pictureInPictureElement) {
                    await document.exitPictureInPicture();
                } else {
                    await video.requestPictureInPicture();
                }
            } catch (error) {
                console.warn('PiP not available:', error);
            }
        });
    });

    // ===== Progress bar skills - toggle hidden text =====
    document.querySelectorAll('.progress-bar').forEach((bar) => {
        const fill = bar.querySelector('.progress-fill');
        const defaultText = fill.textContent;
        let isClicked = false;

        bar.addEventListener('click', () => {
            if (!isClicked) {
                const hiddenValue = bar.getAttribute('data-hidden');
                fill.textContent = hiddenValue;
                isClicked = true;
            } else {
                fill.textContent = defaultText;
                isClicked = false;
            }
        });
    });

    // ===== Soft skill cards - toggle description =====
    document.querySelectorAll('.skill-card').forEach((card) => {
        const description = card.querySelector('.skill-description');
        const text = card.getAttribute('data-description');
        let isVisible = false;

        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            if (!isVisible) {
                description.textContent = text;
                description.style.display = 'block';
                isVisible = true;
            } else {
                description.style.display = 'none';
                isVisible = false;
            }
        });
    });

    // ===== Timeline - interactive character =====
    const character = document.getElementById('character');
    const years = document.querySelectorAll('.year');
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    const popupClose = document.getElementById('popup-close');

    if (character && popup) {
        function moveCharacterToYear(targetYear) {
            const targetPosition = targetYear.offsetLeft + targetYear.offsetWidth / 2;
            character.style.left = `${targetPosition}px`;

            setTimeout(() => {
                const details = targetYear.getAttribute('data-details');
                popupText.textContent = details;
                popup.style.display = 'flex';
            }, 500);
        }

        years.forEach((year) => {
            year.style.cursor = 'pointer';
            year.addEventListener('click', () => {
                moveCharacterToYear(year);
            });
        });

        if (popupClose) {
            popupClose.addEventListener('click', () => {
                popup.style.display = 'none';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    }

    // ===== Project filter =====
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.dataset.filter.toLowerCase();

            projectItems.forEach(item => {
                const techText = item.dataset.category.toLowerCase();
                const shouldShow = filter === "all" || techText.includes(filter);

                if (shouldShow) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add("visible"), 50);
                } else {
                    item.style.display = 'none';
                    item.classList.remove("visible");
                }
            });
        });
    });

    // ===== Scrolling navbar effect =====
    const nav = document.querySelector('.nav');
    if (nav) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    console.log('✓ All features initialized');
});
