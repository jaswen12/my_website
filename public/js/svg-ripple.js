document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("svg-ripple-mask");
  const clipRects = document.querySelectorAll('#ripple-mask-svg clipPath rect');

  function playRipple(callback) {
    wrapper.style.visibility = "visible";
    wrapper.style.opacity = "1";

    gsap.set(clipRects, {
      y: -100,
      opacity: 0
    });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(clipRects, {
          y: -100,
          opacity: 0,
          duration: 0.4,
          ease: "power1.inOut",
          stagger: { each: 0.01, from: "start" },
          onComplete: () => {
            wrapper.style.opacity = "0";
            wrapper.style.visibility = "hidden";
          }
        });

        if (callback) callback();
      }
    });

    tl.to(clipRects, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      stagger: { each: 0.01, from: "start" }
    });
  }

  document.querySelectorAll("a.nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const href = link.getAttribute("href");
      playRipple(() => {
        document.body.classList.remove("fade-in-complete");
        window.location.href = href;
      });
    });
  });

  // Fade in content after page load
  document.body.classList.add("fade-in-complete");
});