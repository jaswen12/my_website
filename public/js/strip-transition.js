document.addEventListener("DOMContentLoaded", () => {
  const strips = gsap.utils.toArray("#transition-strips .strip");
  const wrapper = document.getElementById("transition-strips");

  // Set left position for each strip dynamically
  strips.forEach((strip, i) => {
    strip.style.left = `${i * 5}%`;
  });

  function playTransition(callback) {
    wrapper.style.display = "block";
    gsap.set(strips, { xPercent: -100 });

    const tl = gsap.timeline({
      onComplete: () => {
        callback && callback();

        // Tail exit ripple
        gsap.to(strips, {
          xPercent: 200,
          duration: 1,
          ease: "power4.inOut",
          stagger: {
            each: 0.025,
            from: "start"
          },
          onComplete: () => {
            wrapper.style.display = "none";
            gsap.set(strips, { xPercent: -100 });
          }
        });
      }
    });

    // Tail entrance ripple
    tl.to(strips, {
      xPercent: 100,
      duration: 1.1,
      ease: "power4.inOut",
      stagger: {
        each: 0.025,
        from: "start"
      }
    });
  }

  // Attach to navigation
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