document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const container = document.querySelector(".container");
  let items = Array.from(document.querySelectorAll(".carousel-item"));
  const itemWidth = items[0].offsetWidth + 20;

  // Color palette for background transitions
//   const colors = ["#8fbc8f", "#6495ed", "#ffa07a", "#9370db", "#5f9ea0"];
//   let colorIndex = 0;

  // Gradient color sets (50% hard stops)
const gradients = [
    // 1. Warm sand to terracotta
    "linear-gradient(24deg, #E6CEAC 0%, #E6CEAC 50%, #D27D46 50%, #D27D46 100%)",
    
    // 2. Sage green to deeper sage
    "linear-gradient(24deg, #B8C4A3 0%, #B8C4A3 50%, #7A8B58 50%, #7A8B58 100%)",
    
    // 3. Soft lilac to lavender
    "linear-gradient(24deg, #D4C4E1 0%, #D4C4E1 50%, #A67BB5 50%, #A67BB5 100%)",
    
    // 4. Peach to coral
    "linear-gradient(24deg, #FFD8B8 0%, #FFD8B8 50%, #FF9E7D 50%, #FF9E7D 100%)",
    
    // 5. Pale teal to deeper teal
    "linear-gradient(24deg, #A7C7C9 0%, #A7C7C9 50%, #5F9EA0 50%, #5F9EA0 100%)"
];

  let gradIndex = 0;

  // Set initial gradient
  gsap.set(".container", {
    backgroundImage: gradients[0],
  });

  // Initial reveal animation
  gsap.from(items, {
    opacity: 0,
    y: "100%",
    opacity: 0,
    duration: 1.5,
    delay: 0.5,
    ease: "power3.out",
    stagger: 0.3,
    onComplete: animateCarousel,
  });

  function animateCarousel() {
    const firstItem = items.shift();
    const clone = firstItem.cloneNode(true);
    carousel.appendChild(clone);
    items.push(clone);

    // Set initial position offset to the right
    gsap.set(".carousel-item", { x: itemWidth / 2 });

    // Create a timeline for synchronized animations
    const tl = gsap.timeline({
      onComplete: () => {
        // When animation completes:
        firstItem.remove();
        gsap.set(".carousel-item", { x: itemWidth / 2 });
        animateCarousel();
      },
    });

    gradIndex = (gradIndex + 1) % gradients.length;
    // gsap.

    // Add both animations to the same timeline
    tl.to(".carousel-item", {
      x: `-=${itemWidth}`,
      duration: 1,
      ease: "power2.out",
    })
      // .to(container, {
      //     backgroundColor: colors[colorIndex],
      //     duration: 1, // Match carousel duration
      //     ease: "power2.out"
      // }, 0) // Start at same time as carousel animation
      .to(".container", {
        backgroundImage: gradients[gradIndex],
        duration: 1,
        ease: "none", // Instant switch between gradients
        // immediateRender: false
      }, 0)
      .to(
        ".carousel-item:nth-child(1)",
        {
          scale: 0.7,
          rotation: 7,
          duration: 1,
          ease: "power2.out",
        },
        0
      )
      .to(
        ".carousel-item:nth-child(2)",
        {
          scale: 0.75,
          rotation: -5,
          duration: 1,
          ease: "power2.out",
        },
        0
      )
      .to(
        ".carousel-item:nth-child(3)",
        {
          scale: 0.85,
          rotation: -3,
          duration: 1,
          ease: "power2.out",
        },
        0
      )
      .to(
        ".carousel-item:nth-child(4)",
        {
          scale: 1.0,
          rotation: 0,
          duration: 1,
          ease: "power2.out",
        },
        0
      )
      .to(
        ".carousel-item:nth-child(5)",
        {
          scale: 0.85,
          rotation: 3,
          duration: 1,
          ease: "power2.out",
        },
        0
      )
      .to(
        ".carousel-item:nth-child(6)",
        {
          scale: 0.75,
          rotation: 5,
          duration: 1,
          ease: "power2.out",
        },
        0
      );

    // Update color index for next cycle
    // colorIndex = (colorIndex + 1) % colors.length;
  }
});
