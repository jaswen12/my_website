document.addEventListener("DOMContentLoaded", () => {
  const strips = gsap.utils.toArray(".mask-rect");
  const wrapper = document.getElementById("svg-ripple-mask");

  function playRipple(callback) {
    wrapper.style.display = "block";
    gsap.set(strips, { scaleY: 0, transformOrigin: "center bottom" });

    gsap.to(strips, {
      scaleY: 1,
      duration: 1.2,
      ease: "power4.out",
      stagger: {
        each: 0.015,
        from: "start"
      },
      onComplete: () => {
        callback && callback();

        gsap.to(strips, {
          scaleY: 0,
          duration: 1.2,
          ease: "power4.inOut",
          stagger: {
            each: 0.015,
            from: "start"
          },
          onComplete: () => {
            wrapper.style.display = "none";
          }
        });
      }
    });
  }

  document.querySelectorAll("a.nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = link.getAttribute("href");
      playRipple(() => {
        window.location.href = target;
      });
    });
  });
});