document.addEventListener("DOMContentLoaded", () => {
  const strips = document.querySelectorAll("#transition-strips .strip");
  const wrapper = document.getElementById("transition-strips");

  function playTransition(callback) {
    wrapper.style.display = "block"; // ensure visible

    const tl = gsap.timeline({
      onComplete: () => {
        callback && callback();

        // Exit animation after short delay
        setTimeout(() => {
          gsap.to(strips, {
            yPercent: -100,
            duration: 0.5,
            ease: "power2.inOut",
            stagger: 0.1,
            onComplete: () => {
              wrapper.style.display = "none"; // hide after exit
            }
          });
        }, 300);
      }
    });

    tl.set(strips, { yPercent: -100 }); // reset position before start
    tl.to(strips, {
      yPercent: 0,
      duration: 0.5,
      ease: "power2.inOut",
      stagger: 0.1
    });
  }

  // Initial load animation
  playTransition();

  // Animate on internal link navigation
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
