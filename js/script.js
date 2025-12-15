document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');

    const updateScrollProgress = () => {
        if (!scrollProgressBar) return;

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgressBar.style.width = scrollPercent + '%';
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initialize on load

    // ============================================
    // PARALLAX LAG EFFECT FOR IMAGES
    // ============================================
    const parallaxImages = document.querySelectorAll('.parallax-image img');

    const updateParallaxImages = () => {
        parallaxImages.forEach(img => {
            const container = img.closest('.parallax-image');
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Check if element is in viewport
            if (rect.bottom >= 0 && rect.top <= viewportHeight) {
                // Calculate parallax offset - images move slower than scroll
                const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
                const parallaxOffset = (scrollProgress - 0.5) * 50; // 50px max offset

                img.style.transform = `translateY(${parallaxOffset}px) scale(1.1)`;
            }
        });
    };

    // ============================================
    // PARALLAX LAG EFFECT FOR TESTIMONIAL CARDS
    // ============================================
    const parallaxCards = document.querySelectorAll('.parallax-card');

    const updateParallaxCards = () => {
        parallaxCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Check if element is in viewport
            if (rect.bottom >= 0 && rect.top <= viewportHeight) {
                // Calculate parallax offset with staggered effect for each card
                const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
                // Different offset multipliers for each card (20, 30, 40) for staggered lag
                const offsetMultiplier = 20 + (index * 10);
                const parallaxOffset = (scrollProgress - 0.5) * offsetMultiplier;

                card.style.transform = `translateY(${parallaxOffset}px)`;
            }
        });
    };

    // ============================================
    // PARALLAX LAG EFFECT FOR PORTFOLIO TALL CARDS
    // ============================================
    const portfolioCards = document.querySelectorAll('.pc-album-card--tall');

    const updatePortfolioParallax = () => {
        portfolioCards.forEach((card, index) => {
            const image = card.querySelector('.pc-album-image');
            if (!image) return;

            const rect = card.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Check if element is in viewport
            if (rect.bottom >= 0 && rect.top <= viewportHeight) {
                // Calculate parallax offset - subtle lag effect
                const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
                // Staggered offset for each card (15, 25, 35)
                const offsetMultiplier = 15 + (index * 10);
                const parallaxOffset = (scrollProgress - 0.5) * offsetMultiplier;

                image.style.transform = `translateY(${parallaxOffset}px)`;
            }
        });
    };

    const updateParallax = () => {
        updateParallaxImages();
        updateParallaxCards();
        updatePortfolioParallax();
    };

    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax(); // Initialize on load

    // ============================================
    // MOBILE MENU TOGGLE FUNCTIONALITY
    // ============================================
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay-menu');
    const mobileDropdown = document.querySelector('.mobile-dropdown');
    const mobileDropBtn = document.querySelector('.mobile-dropbtn');

    // Toggle mobile menu on hamburger click
    if (hamburgerMenu && mobileOverlay) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Toggle Portfolio dropdown on mobile
    if (mobileDropBtn && mobileDropdown) {
        mobileDropBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mobileDropdown.classList.toggle('active');
        });
    }

    // Close menu when clicking a navigation link (except dropdown toggle)
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a:not(.mobile-dropbtn)');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburgerMenu && mobileOverlay) {
                hamburgerMenu.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ============================================
    // REVOLVING CAROUSEL LOGIC
    // ============================================
    const revolvingImages = Array.from(document.querySelectorAll('.stacked-carousel-image'));
    const totalRevolvingImages = revolvingImages.length;
    let currentRevolvingIndex = 0;

    const updateRevolvingCarousel = (frontImageIndex) => {
        revolvingImages.forEach((image, i) => {
            image.classList.remove('position-1', 'position-2', 'position-3', 'position-4', 'position-5');
            let newPosition = (i - frontImageIndex + totalRevolvingImages) % totalRevolvingImages + 1;
            image.classList.add(`position-${newPosition}`);
        });
    };

    revolvingImages.forEach((image, index) => {
        image.addEventListener('mouseover', () => {
            updateRevolvingCarousel(index);
        });
    });

    if (revolvingImages.length > 0) {
        updateRevolvingCarousel(0);
    }


    // About page alternating image logic
    const aboutImages = document.querySelectorAll('.about-image');
    if (aboutImages.length > 1) {
        let currentAboutImageIndex = 0;
        setInterval(() => {
            aboutImages[currentAboutImageIndex].classList.remove('active');
            currentAboutImageIndex = (currentAboutImageIndex + 1) % aboutImages.length;
            aboutImages[currentAboutImageIndex].classList.add('active');
        }, 1500); // 1.5 seconds
    }
});
