const container = document.querySelector('.testimonial-container');
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        // Function to update card opacity based on scroll position
        function updateCardOpacity() {
            const containerRect = container.getBoundingClientRect();
            const containerCenter = containerRect.left + (containerRect.width / 2);
            
            testimonialCards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + (cardRect.width / 2);
                
                // Calculate distance from center of viewport
                const distanceFromCenter = Math.abs(containerCenter - cardCenter);
                const maxDistance = containerRect.width / 2;
                
                // Calculate opacity based on distance - closer to center = more opaque
                let opacity;
                if (distanceFromCenter <= 50) {
                    // If very close to center, full opacity
                    opacity = 1;
                } else {
                    // Gradually fade to 0 as distance increases
                    opacity = Math.max(0, 1 - (distanceFromCenter - 50) / (maxDistance - 50));
                }
                
                // Smooth scaling effect - subtle scale change
                const scale = 0.95 + (opacity * 0.05); // Scale between 0.95 and 1
                
                card.style.opacity = opacity;
                card.style.transform = `scale(${scale})`;
            });
        }
        
        // Listen for wheel events on the entire document
        document.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
                updateCardOpacity();
            }
        }, { passive: false });

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
            
            // If horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY)) {
                e.preventDefault();
                container.scrollLeft += diffX * 2;
                updateCardOpacity();
            }
        }, { passive: false });