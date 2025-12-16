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

    // ============================================
    // SELECTED WORKS GALLERY CYCLING ANIMATION
    // ============================================
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryItems = galleryGrid ? Array.from(galleryGrid.querySelectorAll('.gallery-item')) : [];

    if (galleryGrid && galleryItems.length > 0) {
        // Full pool of ALL images from Destination Shoots and Private Events
        const allImages = [
            // Destination Shoots (8 images)
            'assets/images/portfolio_use/Events_Destination_Shoots_webp/20241014-dsc08308.webp',
            'assets/images/portfolio_use/Events_Destination_Shoots_webp/20241014-dsc08330.webp',
            'assets/images/portfolio_use/Events_Destination_Shoots_webp/20241014-dsc08332.webp',
            'assets/images/portfolio_use/Events_Destination_Shoots_webp/20241015-dsc08376.webp',
            'assets/images/portfolio_use/Events_Destination_Shoots_webp/20241015-dsc08377.webp',
            'assets/images/portfolio_use/Events_Destination_Shoots_webp/20241015-dsc08405.webp',
            'assets/images/portfolio_use/Events_Destination_Shoots_webp/20241015-dsc08426.webp',
            'assets/images/portfolio_use/Events_Destination_Shoots_webp/20241015-dsc08445.webp',
            // Private Events (16 images)
            'assets/images/portfolio_use/Events_Private_Events_webp/landscape-dsc04855.webp',
            'assets/images/portfolio_use/Events_Private_Events_webp/landscape-ilce-7rm4a-(770).webp',
            'assets/images/portfolio_use/Events_Private_Events_webp/landscape-ilce-7rm4a-(778).webp',
            'assets/images/portfolio_use/Events_Private_Events_webp/portrait -20250322-dsc09463.webp',
            'assets/images/portfolio_use/Events_Private_Events_webp/portrait -20250322-dsc09467.webp',
            'assets/images/portfolio_use/Events_Private_Events_webp/portrait -dsc02424 copy.webp',
            'assets/images/portfolio_use/Events_Private_Events_webp/portrait -dsc04810.webp',
            'assets/images/portfolio_use/Events_Private_Events_webp/portrait -dsc04850.webp',
            'assets/images/portfolio_use/Events_Private_Events_webp/portrait -ilce-7rm4a-(422).webp',
            'assets/images/portfolio_use/Events_Private_Events_webp/portrait -ilce-7rm4a-(590).webp',
            'assets/images/portfolio_use/Events_Private_Events_webp/portrait -ilce-7rm4a-(642).webp',
            'assets/images/portfolio_use/Events_Private_Events_webp/portrait -ilce-7rm4a-(662).webp',
            'assets/images/portfolio_use/Events_Private_Events_webp/portrait -ilce-7rm4a-(666).webp',
            'assets/images/portfolio_use/Events_Private_Events_webp/portrait -ilce-7rm4a-(814).webp',
            'assets/images/portfolio_use/Events_Private_Events_webp/portrait -ilce-7rm4a-(822).webp',
            'assets/images/portfolio_use/Events_Private_Events_webp/portrait -ilce-7rm4a-(854).webp'
        ];

        // Shuffle array helper
        const shuffleArray = (array) => {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        // Track images currently displayed vs waiting in queue
        let displayedImages = galleryItems.map(item => item.querySelector('img').src);
        let waitingImages = shuffleArray(allImages.filter(img => !displayedImages.some(d => d.includes(img.split('/').pop()))));
        let poolIndex = 0;

        const cycleGallery = () => {
            // Get next image from waiting pool
            if (waitingImages.length === 0) {
                waitingImages = shuffleArray(allImages.filter(img => !displayedImages.some(d => d.includes(img.split('/').pop()))));
            }
            const newImageSrc = waitingImages[poolIndex % waitingImages.length];
            poolIndex++;

            // Pick entry point (left side - first 2 items)
            const entryIndex = Math.floor(Math.random() * 2);
            // Pick exit point (right side - last 2 items)
            const exitIndex = galleryItems.length - 1 - Math.floor(Math.random() * 2);

            const enteringItem = galleryItems[entryIndex];
            const exitingItem = galleryItems[exitIndex];
            const exitingImg = exitingItem.querySelector('img');
            const exitingImgSrc = exitingImg.src;

            // Step 1: New image enters from left
            enteringItem.classList.add('entering');

            // Step 2: Grid gets knocked - images swap positions to adjust
            setTimeout(() => {
                galleryGrid.classList.add('knocked');

                // Get all current image sources (excluding entry and exit)
                const middleIndices = [];
                for (let i = 0; i < galleryItems.length; i++) {
                    if (i !== entryIndex && i !== exitIndex) {
                        middleIndices.push(i);
                    }
                }

                // Shuffle the middle images - they swap positions
                if (middleIndices.length >= 2) {
                    const middleImages = middleIndices.map(i => galleryItems[i].querySelector('img').src);
                    const shuffledMiddle = shuffleArray(middleImages);

                    middleIndices.forEach((itemIndex, i) => {
                        const item = galleryItems[itemIndex];
                        const img = item.querySelector('img');
                        item.classList.add('shuffling');

                        // Swap to new position
                        setTimeout(() => {
                            img.src = shuffledMiddle[i];
                        }, 250);
                    });
                }
            }, 200);

            // Step 3: Exit animation - one image pushed out to right
            setTimeout(() => {
                exitingItem.classList.add('exiting');
            }, 400);

            // Step 4: Complete the swap and clean up
            setTimeout(() => {
                // Add exiting image back to waiting pool
                const exitFilename = exitingImgSrc.split('/').pop();
                if (!waitingImages.some(w => w.includes(exitFilename))) {
                    waitingImages.push(exitingImgSrc);
                }

                // Set the new image on entering item
                const enteringImg = enteringItem.querySelector('img');
                enteringImg.src = newImageSrc;

                // Update displayed images tracking
                displayedImages = galleryItems.map(item => item.querySelector('img').src);

                // Clean up animation classes
                galleryGrid.classList.remove('knocked');
                galleryItems.forEach(item => {
                    item.classList.remove('entering', 'exiting', 'shuffling');
                });
            }, 1200);
        };

        // Start cycling: 3 second initial delay, then every 4 seconds
        setTimeout(() => {
            cycleGallery();
            setInterval(cycleGallery, 4000);
        }, 3000);
    }

    // ============================================
    // FLOATING BOOK NOW BUTTON - Show at 80% scroll
    // ============================================
    const floatingBookBtn = document.querySelector('.floating-book-btn');

    const updateFloatingButton = () => {
        if (!floatingBookBtn) return;

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        if (scrollPercent >= 80) {
            floatingBookBtn.classList.add('visible');
        } else {
            floatingBookBtn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', updateFloatingButton, { passive: true });
    updateFloatingButton(); // Initialize on load
});
