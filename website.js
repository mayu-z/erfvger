const slider = document.querySelector('.slider');
        const items = document.querySelectorAll('.slider .item');
        const toggleBtn = document.getElementById('toggle-btn');
        const imageText = document.getElementById('image-text');
        const textTitle = document.getElementById('text-title');
        const textDescription = document.getElementById('text-description');

        const total = items.length;
        const anglePerItem = 360 / total;

        let isPlaying = true;
        let currentRotation = 0;
        let isAnimating = false;
        let activeItemIndex = -1;

        // Function to get approximate current rotation during animation
        function getCurrentRotationApprox() {
            if (isPlaying) {
                // Estimate based on animation time and speed
                const animationDuration = 20000; // 20 seconds
                const startTime = performance.now() - (performance.now() % animationDuration);
                const elapsed = performance.now() - startTime;
                const progress = (elapsed / animationDuration) % 1;
                return progress * 360;
            }
            return currentRotation;
        }

        // Function to normalize angle to 0-360 range
        function normalizeAngle(angle) {
            return ((angle % 360) + 360) % 360;
        }

        // Function to find shortest rotation path
        function getShortestRotation(from, to) {
            const diff = normalizeAngle(to - from);
            if (diff > 180) {
                return from - (360 - diff);
            } else {
                return from + diff;
            }
        }

        // Function to show text
        function showText(title, description) {
            if (textTitle && textDescription && imageText) { // Null check
                textTitle.textContent = title;
                textDescription.textContent = description;
                setTimeout(() => {
                    imageText.classList.add('show');
                }, 800); // Show text after rotation completes
            }
        }

        // Function to hide text
        function hideText() {
            if (imageText) { // Null check
                imageText.classList.remove('show');
            }
        }

        // Function to set active item
        function setActiveItem(index) {
            // Remove active class from all items
            items.forEach(item => item.classList.remove('active'));
            
            // Add active class to current item
            if (index >= 0 && index < items.length) {
                items[index].classList.add('active');
                activeItemIndex = index;
            } else {
                activeItemIndex = -1;
            }
        }

        // Pause/Play toggle
        if (toggleBtn && slider) { // Null check
            toggleBtn.addEventListener('click', () => {
                if (isAnimating) return; // Don't allow toggle during click animation

                if (isPlaying) {
                    currentRotation = getCurrentRotationApprox();
                    slider.style.animation = 'none';
                    slider.style.transform = `perspective(1000px) rotateX(-10deg) rotateY(${currentRotation}deg)`;
                    toggleBtn.textContent = 'Play';
                } else {
                    // Hide text and remove active state when resuming
                    hideText();
                    setActiveItem(-1);
                    // Resume animation from current position
                    slider.style.animation = `spin 20s linear infinite`;
                    slider.style.animationDelay = `-${(currentRotation / 360) * 20}s`;
                    toggleBtn.textContent = 'Pause';
                }
                isPlaying = !isPlaying;
            });
        }

        // Rotate selected image to front on click with smooth animation
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (isAnimating) return; // Prevent multiple clicks during animation
                if (!slider) return; // Null check for slider

                isAnimating = true;

                // Hide any existing text
                hideText();

                // Pause the animation and get current position
                if (isPlaying) {
                    currentRotation = getCurrentRotationApprox();
                    isPlaying = false;
                    slider.style.animation = 'none';
                    slider.style.transform = `perspective(1000px) rotateX(-10deg) rotateY(${currentRotation}deg)`;
                    if (toggleBtn) toggleBtn.textContent = 'Play';
                }

                
                setTimeout(() => {
                    const targetAngle = -index * anglePerItem;
                    const shortestAngle = getShortestRotation(currentRotation, targetAngle);

                    slider.style.transform = `perspective(1000px) rotateX(-10deg) rotateY(${shortestAngle}deg)`;
                    currentRotation = normalizeAngle(shortestAngle);
                    setActiveItem(index);

                    const title = item.getAttribute('data-title');
                    const description = item.getAttribute('data-description');
                    showText(title, description);

                    setTimeout(() => {
                        isAnimating = false;
                    }, 800); 
                }, 50);
            });
        });



        // --------scroll text-------------
        let scrollDownCount = 0;
        let isSecondVisible = false;
        const h1_1 = document.getElementById('h-1');
        const h1_2 = document.getElementById('h-2');

        if(h1_1 && h1_2){
            window.addEventListener('wheel', (e) => {
                const direction = Math.sign(e.deltaY);
                if (!isSecondVisible && direction > 0) {
                    scrollDownCount++;
                    if (scrollDownCount >= 2) {
                        h1_1.style.opacity = 0;
                        h1_2.style.opacity = 1;
                        isSecondVisible = true;
                        scrollDownCount = 0;
                    }
                } else if (isSecondVisible && direction < 0) {
                    h1_1.style.opacity = 1;
                    h1_2.style.opacity = 0;
                    isSecondVisible = false;
                    scrollDownCount = 0;
                }
            });
        }

    // --------------p text----------------
    let scrollDDownCount = 0;
    let isSecondVVisible = false;
    const p_1 = document.getElementById('p-1');
    const p_2 = document.getElementById('p-2');

    if(p_1 && p_2){
        window.addEventListener('wheel', (e) => {
            const dirrection = Math.sign(e.deltaY);
            if (!isSecondVVisible && dirrection > 0) {
                scrollDDownCount++;
                if (scrollDDownCount >= 2) {
                    p_1.style.opacity = 0.5;
                    p_2.style.opacity = 1;
                    isSecondVVisible = true;
                    scrollDDownCount = 0;
                }
            } else if (isSecondVVisible && dirrection < 0) {
                p_1.style.opacity = 1;
                p_2.style.opacity = 0.5;
                isSecondVVisible = false;
                scrollDDownCount = 0;
            }
        });
    }

  // ----------------dj9  -----------------------
  // Corrected and robust navbar visibility logic:
  const bottomNavBarElement = document.getElementById('bottomFixedNavbarElement');
  const topScrollTrackingElement = document.getElementById('hiddeElement');

  function handleBottomNavbarVisibility() {
      if (!topScrollTrackingElement) {
          // console.error('Debug: topScrollTrackingElement (id: hiddeElement) not found for navbar logic!');
          return; 
      }
      if (!bottomNavBarElement) {
          // console.error('Debug: bottomNavBarElement (id: bottomFixedNavbarElement) not found for navbar logic!');
          return;
      }

      const topSectionRect = topScrollTrackingElement.getBoundingClientRect();
      // console.log('Debug: nav-bar2 visibility check. Element "hiddeElement" topSectionRect.bottom =', topSectionRect.bottom);

      if (topSectionRect.bottom < 0) {
          // console.log('Debug: Condition met (topSectionRect.bottom < 0). Adding "show" class to nav-bar2.');
          bottomNavBarElement.classList.add('show');
      } else {
          // console.log('Debug: Condition NOT met (topSectionRect.bottom >= 0). Removing "show" class from nav-bar2.');
          bottomNavBarElement.classList.remove('show');
      }
  }

  window.addEventListener('scroll', handleBottomNavbarVisibility);

  // Initial check in case the page is already scrolled down or if the hiddeElement is immediately out of view.
  // Ensures correct state on load.
  try {
      handleBottomNavbarVisibility();
  } catch (e) {
      console.error("Error during initial call to handleBottomNavbarVisibility:", e);
  }

 // --------------------------------- new sec -------------------------------

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
                    opacity = Math.max(0, 1 - (distanceFromCenter - 50) / (maxDistance - 25));
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