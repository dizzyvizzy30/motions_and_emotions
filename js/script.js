document.addEventListener('DOMContentLoaded', () => {

    const images = [
        { src: 'images/air show /1000024975.jpg', category: 'air show' },
        { src: 'images/air show /1000024976.jpg', category: 'air show' },
        { src: 'images/baby shower/DSC04810.JPG', category: 'baby shower' },
        { src: 'images/baby shower/DSC04850.JPG', category: 'baby shower' },
        { src: 'images/baby shower/DSC04855.JPG', category: 'baby shower' },
        { src: 'images/engagement/ILCE-7RM4A (422).jpg', category: 'engagement' },
        { src: 'images/engagement/ILCE-7RM4A (590).jpg', category: 'engagement' },
        { src: 'images/engagement/ILCE-7RM4A (642).jpg', category: 'engagement' },
        { src: 'images/engagement/ILCE-7RM4A (662).jpg', category: 'engagement' },
        { src: 'images/engagement/ILCE-7RM4A (666).jpg', category: 'engagement' },
        { src: 'images/engagement/ILCE-7RM4A (770).jpg', category: 'engagement' },
        { src: 'images/engagement/ILCE-7RM4A (778).jpg', category: 'engagement' },
        { src: 'images/engagement/ILCE-7RM4A (814).jpg', category: 'engagement' },
        { src: 'images/engagement/ILCE-7RM4A (822).jpg', category: 'engagement' },
        { src: 'images/engagement/ILCE-7RM4A (854).jpg', category: 'engagement' },
        { src: 'images/nature/1000019342.jpg', category: 'nature' },
        { src: 'images/nature/DSC_0078.JPG', category: 'nature' },
        { src: 'images/nature/DSC_0148.JPG', category: 'nature' },
        { src: 'images/nature/DSC00537.JPG', category: 'nature' },
        { src: 'images/nature/DSC00545.JPG', category: 'nature' },
        { src: 'images/nature/DSC00546.JPG', category: 'nature' },
        { src: 'images/nature/DSC00932.JPG', category: 'nature' },
        { src: 'images/nature/DSC00938.JPG', category: 'nature' },
        { src: 'images/nature/DSC00947_1.JPG', category: 'nature' },
        { src: 'images/nature/DSC01033.JPG', category: 'nature' },
        { src: 'images/nature/DSC01056.JPG', category: 'nature' },
        { src: 'images/nature/DSC01061.JPG', category: 'nature' },
        { src: 'images/nature/DSC02424.JPG', category: 'nature' },
        { src: 'images/nature/DSC08321.JPG', category: 'nature' },
        { src: 'images/nature/DSC08481.JPG', category: 'nature' },
        { src: 'images/nature/DSC09108.JPG', category: 'nature' },
        { src: 'images/nature/IMG_20211008_202137.jpg', category: 'nature' },
        { src: 'images/nature/IMG_20211009_171238-EFFECTS.jpg', category: 'nature' },
        { src: 'images/nature/IMG_20211009_180645.jpg', category: 'nature' },
        { src: 'images/nature/PXL_20210904_210052822.jpg', category: 'nature' },
        { src: 'images/nature/PXL_20210904_212916422.jpg', category: 'nature' },
        { src: 'images/nature/PXL_20210904_212920244.jpg', category: 'nature' },
        { src: 'images/Sky scrapers/DSC00678.JPG', category: 'sky scrapers' },
        { src: 'images/Sky scrapers/PXL_20221015_211305263.jpg', category: 'sky scrapers' },
        { src: 'images/Sky scrapers/PXL_20221015_211319151.jpg', category: 'sky scrapers' },
        { src: 'images/Sky scrapers/PXL_20221015_211327799.jpg', category: 'sky scrapers' }
    ];

    // Hero Carousel
    const heroCarousel = document.querySelector('.hero-carousel');
    const engagementPhotos = images.filter(img => img.category === 'engagement').slice(0, 5);
    engagementPhotos.forEach(photo => {
        const div = document.createElement('div');
        div.innerHTML = `<img src="${photo.src}" alt="${photo.category}">`;
        heroCarousel.appendChild(div);
    });

    $('.hero-carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 1000,
    });

    // Showcase Section
    const showcaseGrid = document.querySelector('.showcase-grid');
    const categories = ['air show', 'baby shower', 'engagement', 'nature', 'sky scrapers'];
    categories.forEach(category => {
        const image = images.find(img => img.category === category);
        if (image) {
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.category;
            showcaseGrid.appendChild(img);
        }
    });

    // Portfolio Filtering
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const categoryButtons = document.querySelectorAll('.category-selection button');

    function displayPortfolio(category = 'all') {
        portfolioGrid.innerHTML = '';
        const filteredImages = category === 'all' ? images : images.filter(image => image.category === category);

        filteredImages.forEach(image => {
            const portfolioItem = document.createElement('div');
            portfolioItem.classList.add('portfolio-item');
            portfolioItem.innerHTML = `<img src="${image.src}" alt="${image.category}">`;
            portfolioGrid.appendChild(portfolioItem);
        });
    }

    displayPortfolio();

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            displayPortfolio(category);
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});