document.addEventListener("DOMContentLoaded", () => {
  const clipRects = document.querySelectorAll('#ripple-mask-svg clipPath rect');
  const wrapper = document.getElementById("svg-ripple-mask");

  function playRipple(callback) {
    wrapper.style.visibility = "visible";
    wrapper.style.opacity = "1";

    gsap.set(clipRects, { scaleY: 0, transformOrigin: "center center" });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(clipRects, {
          scaleY: 0,
          duration: 0.4,
          ease: "power2.inOut",
          stagger: { each: 0.015, from: "start" },
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
      duration: 0.5,
      ease: "power2.inOut",
      stagger: { each: 0.015, from: "start" }
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