document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    let items = Array.from(document.querySelectorAll('.carousel-item'));
    const itemWidth = items[0].offsetWidth + 20;
    
    // Initial reveal animation
    gsap.from(items, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        onComplete: animateCarousel
    });

    function animateCarousel() {
        const firstItem = items.shift();
        const clone = firstItem.cloneNode(true);
        carousel.appendChild(clone);
        items.push(clone);

        // Set initial position offset to the right
        gsap.set(".carousel-item", { x: itemWidth/2 });

        // Animate all items left by full item width
        gsap.to(".carousel-item", {
            x: `-=${itemWidth}`,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                // When animation completes:
                // Remove the original item that exited left
                firstItem.remove();
                
                // Reset positions to offset right for next animation
                gsap.set(".carousel-item", { x: itemWidth/2 });
                
                // Start next animation
                animateCarousel();
            }
        });
    }
});