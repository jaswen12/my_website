document.addEventListener("DOMContentLoaded", () => {
  const strips = document.querySelectorAll("#transition-strips .strip");
  const wrapper = document.getElementById("transition-strips");

  function playTransition(callback) {
    wrapper.style.display = "block";

    // Animate strips in
    gsap.to(strips, {
      xPercent: 100,
      duration: 0.6,
      ease: "power2.inOut",
      stagger: 0.05,
      onComplete: () => {
        callback && callback();

        // Animate strips out
        gsap.to(strips, {
          xPercent: 200,
          duration: 0.6,
          ease: "power2.inOut",
          stagger: 0.05,
          onComplete: () => {
            wrapper.style.display = "none";
            gsap.set(strips, { xPercent: -100 });
          }
        });
      }
    });
  }

  // Attach transition to navigation links
  document.querySelectorAll("a.nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = link.getAttribute("href");
      playTransition(() => {
        window.location.href = target;
      });
    });
  });
});
