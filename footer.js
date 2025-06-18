const container = document.querySelector('.testimonial-container');
const testimonialCards = document.querySelectorAll('.testimonial-card');

// Function to update card opacity based on scroll position
function updateCardOpacity() {
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + (containerRect.width / 2);

    let closestCard = null;
    let minDistance = Infinity;

    testimonialCards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + (cardRect.width / 2);
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < minDistance) {
            minDistance = distance;
            closestCard = card;
        }
    });

    testimonialCards.forEach(card => {
        const cardRect = card.getBoundingClientRect(); // get individual card rect
        const cardCenter = cardRect.left + (cardRect.width / 2); // get individual card center

        // A small threshold to determine "centered" to handle precise float comparisons
        // and to ensure the card is truly in the middle of the viewport, not just the container
        const viewportCenter = window.innerWidth / 2;
        const distanceFromViewportCenter = Math.abs(cardCenter - viewportCenter);

        // The card is considered "active" if it's the closest one identified AND very near the viewport center
        if (card === closestCard && distanceFromViewportCenter < 50 ) { // Check if it's the closest and also centered in viewport
            card.style.opacity = 1;
            card.style.transform = 'scale(1)'; // Keep active card at normal size or slightly larger if preferred
        } else {
            card.style.opacity = 0;
            // Non-active cards can be scaled down or kept at a base scale if they are to be invisible
            card.style.transform = 'scale(0.95)';
        }
    });
}

// Listen for wheel events on the entire document
document.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
        e.preventDefault(); // Keep this if you want to prevent vertical scroll of the page
        container.scrollLeft += e.deltaY;
        updateCardOpacity();
    }
}, { passive: false }); // passive: false if preventDefault is used

// Update opacity on scroll events
container.addEventListener('scroll', updateCardOpacity);

// Initial opacity calculation
updateCardOpacity();

// Also handle touch/swipe events for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    if (!touchStartX || !touchStartY) return;

    let touchEndX = e.touches[0].clientX;
    let touchEndY = e.touches[0].clientY;

    let diffX = touchStartX - touchEndX;
    let diffY = touchStartY - touchEndY;

    if (Math.abs(diffX) > Math.abs(diffY)) { // If horizontal swipe is more significant
        e.preventDefault(); // Keep this if you want to prevent other touch actions like vertical scroll
        container.scrollLeft += diffX; // Adjust scroll speed if necessary
        updateCardOpacity();
    }
    // Reset start points to allow continuous swiping
    // touchStartX = touchEndX;
    // touchStartY = touchEndY;

}, { passive: false }); // passive: false if preventDefault is used

// Reset touch start values on touchend or touchcancel to prevent issues
document.addEventListener('touchend', () => {
    touchStartX = 0;
    touchStartY = 0;
});

document.addEventListener('touchcancel', () => {
    touchStartX = 0;
    touchStartY = 0;
});
