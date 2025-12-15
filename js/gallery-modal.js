/* ============================================
   GALLERY MODAL JAVASCRIPT - Motions and Emotions
   ============================================

   NEW FILE - Does not affect existing scripts

   This file handles:
   - Opening modal when album card is clicked
   - Masonry grid display of all images
   - Lightbox for full-size image viewing
   - Closing modal (X button, back button, ESC key)
   - Keyboard navigation in lightbox

   SAFE: All selectors use 'pc-' prefix to avoid conflicts

============================================ */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION - Album Images
    // ============================================

    const albumImages = {
        // Portfolio Albums - Modern 3-Card Layout
        'chicago-public-events': [
            { src: 'assets/images/portfolio/chicago-public-events/1.webp', alt: 'Chicago public event' },
            { src: 'assets/images/portfolio/chicago-public-events/2.webp', alt: 'Chicago public event' }
        ],
        'nature-landscape': [
            { src: 'assets/images/portfolio/nature-landscape/1.webp', alt: 'Nature landscape' },
            { src: 'assets/images/portfolio/nature-landscape/2.webp', alt: 'Nature landscape' }
        ],
        'paranormal': [
            { src: 'assets/images/portfolio/paranormal/1.webp', alt: 'Paranormal capture' },
            { src: 'assets/images/portfolio/paranormal/2.webp', alt: 'Paranormal capture' }
        ],

        // Events Albums - Modern 4-Card Layout
        'new-beginnings': [
            { src: 'assets/images/portfolio_use/engagement_webp/ilce-7rm4a-(422).webp', alt: 'Engagement photo 1' },
            { src: 'assets/images/portfolio_use/engagement_webp/ilce-7rm4a-(590).webp', alt: 'Engagement photo 2' },
            { src: 'assets/images/portfolio_use/engagement_webp/ilce-7rm4a-(642).webp', alt: 'Engagement photo 3' },
            { src: 'assets/images/portfolio_use/engagement_webp/ilce-7rm4a-(662).webp', alt: 'Engagement photo 4' },
            { src: 'assets/images/portfolio_use/engagement_webp/ilce-7rm4a-(666).webp', alt: 'Engagement photo 5' },
            { src: 'assets/images/portfolio_use/engagement_webp/ilce-7rm4a-(770).webp', alt: 'Engagement photo 6' },
            { src: 'assets/images/portfolio_use/engagement_webp/ilce-7rm4a-(778).webp', alt: 'Engagement photo 7' },
            { src: 'assets/images/portfolio_use/engagement_webp/ilce-7rm4a-(814).webp', alt: 'Engagement photo 8' },
            { src: 'assets/images/portfolio_use/engagement_webp/ilce-7rm4a-(822).webp', alt: 'Engagement photo 9' },
            { src: 'assets/images/portfolio_use/engagement_webp/ilce-7rm4a-(854).webp', alt: 'Engagement photo 10' },
            { src: 'assets/images/portfolio_use/engagement_webp/dsc02424.webp', alt: 'Engagement photo 11' }
        ],
        'large-events': [
            { src: 'assets/images/events/large-events/1.webp', alt: 'Large event photo' },
            { src: 'assets/images/events/large-events/2.webp', alt: 'Festive celebration' }
        ],
        'home-studio': [
            { src: 'assets/images/events/home-studio/1.webp', alt: 'Home shoot' },
            { src: 'assets/images/events/home-studio/2.webp', alt: 'Studio portrait' }
        ],
        'destination': [
            { src: 'assets/images/events/destination/1.webp', alt: 'Destination shoot' },
            { src: 'assets/images/events/destination/2.webp', alt: 'Travel photography' }
        ]
    };

    const defaultDescriptions = {
        'portfolio': 'Explore this collection of fine art photography.',
        'events': 'Let me capture your special moments.'
    };

    // ============================================
    // DOM ELEMENTS
    // ============================================

    let modal, modalTitle, modalDescription, modalClose, modalBack;
    let galleryContainer;
    let lightbox, lightboxImage, lightboxClose, lightboxPrev, lightboxNext;
    let albumCards;

    // State
    let currentImages = [];
    let currentLightboxIndex = 0;
    let currentAlbum = null;

    // ============================================
    // INITIALIZATION
    // ============================================

    function init() {
        // Get DOM elements
        modal = document.getElementById('pc-gallery-modal');
        modalTitle = document.getElementById('pc-modal-title');
        modalDescription = document.getElementById('pc-modal-description');
        modalClose = document.getElementById('pc-modal-close');
        modalBack = document.getElementById('pc-modal-back');
        albumCards = document.querySelectorAll('.pc-album-card');

        // Exit if no modal found
        if (!modal) return;

        // Create gallery grid container (replace carousel)
        createGalleryContainer();

        // Create lightbox
        createLightbox();

        // Bind events
        bindEvents();
    }

    // ============================================
    // CREATE GALLERY CONTAINER
    // ============================================

    function createGalleryContainer() {
        // Find and hide old carousel elements
        const oldCarousel = modal.querySelector('.pc-carousel');
        const oldDots = modal.querySelector('.pc-carousel-dots');

        if (oldCarousel) oldCarousel.style.display = 'none';
        if (oldDots) oldDots.style.display = 'none';

        // Create new gallery grid container
        galleryContainer = document.createElement('div');
        galleryContainer.className = 'pc-gallery-grid';
        galleryContainer.innerHTML = '<div class="pc-gallery-masonry" id="pc-gallery-masonry"></div>';

        // Insert after header
        const header = modal.querySelector('.pc-modal-header');
        if (header && header.nextSibling) {
            header.parentNode.insertBefore(galleryContainer, header.nextSibling);
        }
    }

    // ============================================
    // CREATE LIGHTBOX
    // ============================================

    function createLightbox() {
        lightbox = document.createElement('div');
        lightbox.className = 'pc-lightbox';
        lightbox.id = 'pc-lightbox';
        lightbox.innerHTML = `
            <button class="pc-lightbox-close" id="pc-lightbox-close" aria-label="Close">×</button>
            <button class="pc-lightbox-nav pc-lightbox-prev" id="pc-lightbox-prev" aria-label="Previous">‹</button>
            <img src="" alt="" class="pc-lightbox-image" id="pc-lightbox-image">
            <button class="pc-lightbox-nav pc-lightbox-next" id="pc-lightbox-next" aria-label="Next">›</button>
        `;
        document.body.appendChild(lightbox);

        // Get lightbox elements
        lightboxImage = document.getElementById('pc-lightbox-image');
        lightboxClose = document.getElementById('pc-lightbox-close');
        lightboxPrev = document.getElementById('pc-lightbox-prev');
        lightboxNext = document.getElementById('pc-lightbox-next');
    }

    // ============================================
    // EVENT BINDING
    // ============================================

    function bindEvents() {
        // Album card clicks
        albumCards.forEach(card => {
            card.addEventListener('click', handleCardClick);
        });

        // Modal close buttons
        if (modalClose) modalClose.addEventListener('click', closeModal);
        if (modalBack) modalBack.addEventListener('click', closeModal);

        // Lightbox controls
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightboxImage);
        if (lightboxNext) lightboxNext.addEventListener('click', nextLightboxImage);

        // Lightbox click outside image to close
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', handleKeydown);

        // Modal overlay click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
        }
    }

    // ============================================
    // MODAL FUNCTIONS
    // ============================================

    function handleCardClick(e) {
        const card = e.currentTarget;
        const albumId = card.dataset.album;
        const albumTitle = card.dataset.title;
        const albumType = card.dataset.type || 'portfolio';
        const albumDescription = card.dataset.description || defaultDescriptions[albumType];

        currentAlbum = albumId;

        // Update modal content
        if (modalTitle) modalTitle.textContent = albumTitle;
        if (modalDescription) modalDescription.textContent = albumDescription;

        // Load images into masonry grid
        loadMasonryGallery(albumId);

        // Open modal
        openModal();
    }

    function openModal() {
        if (!modal) return;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('pc-modal-open');
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('pc-modal-open');
        currentAlbum = null;
        currentImages = [];
    }

    // ============================================
    // MASONRY GALLERY FUNCTIONS
    // ============================================

    function loadMasonryGallery(albumId) {
        const masonry = document.getElementById('pc-gallery-masonry');
        if (!masonry) return;

        // Get images for this album
        const images = albumImages[albumId] || [];
        currentImages = images;

        // Clear existing content
        masonry.innerHTML = '';

        if (images.length === 0) {
            masonry.innerHTML = '<div class="pc-gallery-placeholder">Images coming soon</div>';
            return;
        }

        // Create gallery items
        images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'pc-gallery-item';
            item.innerHTML = `
                <img src="${image.src}"
                     alt="${image.alt}"
                     loading="lazy"
                     onerror="this.parentElement.style.display='none'">
            `;
            item.addEventListener('click', () => openLightbox(index));
            masonry.appendChild(item);
        });
    }

    // ============================================
    // LIGHTBOX FUNCTIONS
    // ============================================

    function openLightbox(index) {
        if (!lightbox || currentImages.length === 0) return;

        currentLightboxIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
    }

    function updateLightboxImage() {
        if (!lightboxImage || currentImages.length === 0) return;

        const image = currentImages[currentLightboxIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        // Update nav button states
        if (lightboxPrev) {
            lightboxPrev.style.opacity = currentLightboxIndex === 0 ? '0.3' : '1';
            lightboxPrev.style.pointerEvents = currentLightboxIndex === 0 ? 'none' : 'auto';
        }
        if (lightboxNext) {
            lightboxNext.style.opacity = currentLightboxIndex >= currentImages.length - 1 ? '0.3' : '1';
            lightboxNext.style.pointerEvents = currentLightboxIndex >= currentImages.length - 1 ? 'none' : 'auto';
        }
    }

    function prevLightboxImage() {
        if (currentLightboxIndex > 0) {
            currentLightboxIndex--;
            updateLightboxImage();
        }
    }

    function nextLightboxImage() {
        if (currentLightboxIndex < currentImages.length - 1) {
            currentLightboxIndex++;
            updateLightboxImage();
        }
    }

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================

    function handleKeydown(e) {
        // Lightbox is open
        if (lightbox && lightbox.classList.contains('active')) {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevLightboxImage();
                    break;
                case 'ArrowRight':
                    nextLightboxImage();
                    break;
            }
            return;
        }

        // Modal is open (but not lightbox)
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeModal();
            }
        }
    }

    // ============================================
    // RUN ON DOM READY
    // ============================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
