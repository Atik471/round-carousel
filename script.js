document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const container = document.querySelector('.container');
    let items = Array.from(document.querySelectorAll('.carousel-item'));
    const itemWidth = items[0].offsetWidth + 20;
    
    // Color palette for background transitions
    const colors = ['#8fbc8f', '#6495ed', '#ffa07a', '#9370db', '#5f9ea0'];
    let colorIndex = 0;
    
    // Initial reveal animation
    gsap.from(items, {
        opacity: 0,
        y: '100%',
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: "power3.out",
        stagger: 0.3,
        onComplete: animateCarousel
    });

    function animateCarousel() {
        const firstItem = items.shift();
        const clone = firstItem.cloneNode(true);
        carousel.appendChild(clone);
        items.push(clone);

        // Set initial position offset to the right
        gsap.set(".carousel-item", { x: itemWidth/2 });



        // Create a timeline for synchronized animations
        const tl = gsap.timeline({
            onComplete: () => {
                // When animation completes:
                firstItem.remove();
                gsap.set(".carousel-item", { x: itemWidth/2 });
                animateCarousel();
            }
        });

        // Add both animations to the same timeline
        tl.to(".carousel-item", {
            x: `-=${itemWidth}`,
            duration: 1,
            ease: "power2.out"
        })
        .to(container, {
            backgroundColor: colors[colorIndex],
            duration: 1, // Match carousel duration
            ease: "power2.out"
        }, 0) // Start at same time as carousel animation
        .to(".carousel-item:nth-child(1)", { 
            scale: 0.85,
            duration: 1,
            ease: "power2.out"
        }, 0)
        .to(".carousel-item:nth-child(2)", { 
            scale: 0.9,
            duration: 1,
            ease: "power2.out"
        }, 0)
        .to(".carousel-item:nth-child(3)", { 
            scale: 0.95,
            duration: 1,
            ease: "power2.out"
        }, 0)
        .to(".carousel-item:nth-child(4)", { 
            scale: 1.0,
            duration: 1,
            ease: "power2.out"
        }, 0)
        .to(".carousel-item:nth-child(5)", { 
            scale: 0.95,
            duration: 1,
            ease: "power2.out"
        }, 0)
        .to(".carousel-item:nth-child(6)", { 
            scale: 0.9,
            duration: 1,
            ease: "power2.out"
        }, 0);

        // Update color index for next cycle
        colorIndex = (colorIndex + 1) % colors.length;
    }
});