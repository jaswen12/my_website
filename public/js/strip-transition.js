document.addEventListener("DOMContentLoaded", () => {
  const strips = gsap.utils.toArray("#transition-strips .strip");
  const wrapper = document.getElementById("transition-strips");

  // Slightly overlap strips (assume 5.2% width from CSS)
  strips.forEach((strip, i) => {
    strip.style.left = `${i * 5.1}%`;
  });

  function playTransition(callback) {
    wrapper.style.display = "block";
    gsap.set(strips, { xPercent: -100 });

    const enterTl = gsap.timeline();
    enterTl.to(strips, {
      xPercent: 0,
      duration: 0.9,
      ease: "power2.out",
      stagger: {
        each: 0.04,
        from: "start"
      }
    });

    enterTl.to(strips, {
      xPercent: 100,
      duration: 0.9,
      ease: "power2.inOut",
      stagger: {
        each: 0.04,
        from: "start"
      },
      onComplete: () => {
        wrapper.style.display = "none";
        gsap.set(strips, { xPercent: -100 });
        callback && callback();
      }
    }, "+=0.1");
  }

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