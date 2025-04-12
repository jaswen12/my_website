document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("transition-strips");
  const strips = Array.from(document.querySelectorAll("#transition-strips .strip"));
  const totalWidth = window.innerWidth;
  const stripCount = strips.length;
  const stripWidth = totalWidth / stripCount;

  // Set precise position and width
  strips.forEach((strip, i) => {
    strip.style.left = `${Math.floor(i * stripWidth)}px`;
    strip.style.width = `${Math.ceil(stripWidth + 1)}px`; // slight overlap
  });

  function playTransition(callback) {
    wrapper.style.display = "block";
    gsap.set(strips, { xPercent: -100 });

    // Continuous high-frequency ripple
    gsap.to(strips, {
      xPercent: 150,
      duration: 1.2,
      ease: "circ.inOut",
      stagger: {
        each: 0.015,
        from: "start"
      },
      onComplete: () => {
        wrapper.style.display = "none";
        gsap.set(strips, { xPercent: -100 });
        callback && callback();
      }
    });
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