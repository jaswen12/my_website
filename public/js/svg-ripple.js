document.addEventListener("DOMContentLoaded", () => {
  const clipRects = document.querySelectorAll('#ripple-mask-svg clipPath rect');
  const wrapper = document.getElementById("svg-ripple-mask");

  function playRipple(callback) {
    wrapper.style.visibility = "visible";
    wrapper.style.opacity = "1";

    gsap.set(clipRects, {
      scaleY: 0,
      transformOrigin: "center center",
      y: -50,
      x: -50,
      skewX: -10
    });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(clipRects, {
          scaleY: 0,
          y: -50,
          x: -50,
          duration: 0.5,
          ease: "power2.inOut",
          stagger: { each: 0.012, from: "start" },
          onComplete: () => {
            wrapper.style.opacity = "0";
            wrapper.style.visibility = "hidden";
          }
        });

        if (callback) callback();
      }
    });

    tl.to(clipRects, {
      scaleY: 1,
      y: 0,
      x: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: { each: 0.012, from: "start" }
    });
  }

  document.querySelectorAll("a.nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const href = link.getAttribute("href");
      playRipple(() => {
        window.location.href = href;
      });
    });
  });
});