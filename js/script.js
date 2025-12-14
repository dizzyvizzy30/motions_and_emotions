document.addEventListener('DOMContentLoaded', () => {
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
