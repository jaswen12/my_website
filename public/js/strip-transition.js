document.addEventListener("DOMContentLoaded", () => {
  const strips = document.querySelectorAll("#transition-strips .strip");
  const wrapper = document.getElementById("transition-strips");

  strips.forEach((strip, i) => {
    strip.style.left = `${i * 5}%`;
  });

  function playTransition(callback) {
    wrapper.style.display = "block";
    gsap.set(strips, { xPercent: -100 });

    const tl = gsap.timeline({
      onComplete: () => {
        callback && callback();
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

    tl.to(strips, {
      xPercent: 100,
      duration: 0.6,
      ease: "power2.inOut",
      stagger: 0.05
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