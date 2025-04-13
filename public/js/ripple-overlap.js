document.addEventListener("DOMContentLoaded", () => {
  const rects = document.querySelectorAll("#ripple-mask-svg rect.mask-rect");
  const svgMask = document.getElementById("svg-ripple-mask");

  if (!rects.length || !svgMask) {
    console.warn("Ripple animation elements not found.");
    return;
  }

  function playRipple(callback) {
    svgMask.style.visibility = "visible";
    svgMask.style.opacity = "1";

    gsap.set(rects, { scaleY: 0, transformOrigin: "center bottom" });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(rects, {
          scaleY: 0,
          duration: 0.4,
          ease: "power1.inOut",
          stagger: { each: 0.01, from: "start" },
          onComplete: () => {
            svgMask.style.opacity = "0";
            svgMask.style.visibility = "hidden";
          }
        });

        if (callback) callback();
      }
    });

    tl.to(rects, {
      scaleY: 1,
      duration: 0.5,
      ease: "power2.out",
      stagger: { each: 0.01, from: "start" }
    });
  }

  document.querySelectorAll("a.nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      playRipple(() => {
        window.location.href = href;
      });
    });
  });
});