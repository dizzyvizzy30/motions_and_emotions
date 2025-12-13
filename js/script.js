document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('.stacked-carousel-image'));
    const totalImages = images.length;

    // Function to update the carousel positions
    const updateCarousel = (frontImageIndex) => {
        images.forEach((image, i) => {
            // Remove all position classes
            image.classList.remove('position-1', 'position-2', 'position-3', 'position-4', 'position-5');

            // Calculate the new position for each image
            let newPosition = (i - frontImageIndex + totalImages) % totalImages + 1;
            
            // Re-assign the correct position class
            image.classList.add(`position-${newPosition}`);
        });
    };

    // Add mouseover event listeners to each image
    images.forEach((image, index) => {
        image.addEventListener('mouseover', () => {
            updateCarousel(index);
        });
    });

    // Initialize the carousel with the first image at the front
    updateCarousel(0);
});