document.addEventListener("DOMContentLoaded", () => {
  const clipRects = document.querySelectorAll('#ripple-mask-svg clipPath rect');

  function playRipple(callback) {
    gsap.set(clipRects, { scaleY: 0, transformOrigin: "center center" });

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          gsap.to(clipRects, {
            scaleY: 0,
            duration: 0.4,
            ease: "power2.inOut",
            stagger: { each: 0.015, from: "start" }
          });
        }, 300);

        if (callback) callback();
      }
    });

    tl.to(clipRects, {
      scaleY: 1,
      duration: 0.5,
      ease: "power2.inOut",
      stagger: { each: 0.015, from: "start" }
    });
  }

  // Intercept nav links for animation
  const links = document.querySelectorAll("a.nav-link");
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const href = link.getAttribute("href");
      playRipple(() => {
        window.location.href = href;
      });
    });
  });

  // Initial animation on page load
  playRipple();
});