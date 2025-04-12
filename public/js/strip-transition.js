document.addEventListener("DOMContentLoaded", () => {
  const strips = document.querySelectorAll("#transition-strips .strip");

  function playTransition(callback) {
    const tl = gsap.timeline({
      onComplete: () => {
        callback && callback();
        // Exit animation after slight delay
        setTimeout(() => {
          gsap.to(strips, {
            yPercent: -100,
            duration: 0.5,
            ease: "power2.inOut",
            stagger: 0.1
          });
        }, 300);
      }
    });

    tl.to(strips, {
      yPercent: 0,
      duration: 0.5,
      ease: "power2.inOut",
      stagger: 0.1
    });
  }

  // Example usage on load
  playTransition();

  // Optional: intercept link clicks
  const links = document.querySelectorAll("a.nav-link");
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = link.getAttribute("href");

      playTransition(() => {
        window.location.href = target;
      });
    });
  });
});