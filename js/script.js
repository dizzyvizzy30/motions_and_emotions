document.addEventListener('DOMContentLoaded', () => {
    // Revolving carousel logic (from previous step)
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
