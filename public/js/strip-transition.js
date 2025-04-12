document.addEventListener("DOMContentLoaded", () => {
  const strips = document.querySelectorAll("#transition-strips .strip");
  const wrapper = document.getElementById("transition-strips");

  function playTransition(callback) {
    wrapper.style.display = "block";

    const tl = gsap.timeline({
      onComplete: () => {
        callback && callback();
        gsap.to(strips, {
          xPercent: -100,
          duration: 0.6,
          ease: "power2.inOut",
          stagger: 0.1,
          onComplete: () => {
            wrapper.style.display = "none";
          }
        });
      }
    });

    tl.set(strips, { xPercent: -100 });
    tl.to(strips, {
      xPercent: 0,
      duration: 0.6,
      ease: "power2.inOut",
      stagger: 0.1
    });
  }

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