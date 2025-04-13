document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("transition-overlay");

  function playOverlayTransition(callback) {
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    gsap.set(overlay, { x: "-100%" });

    const tl = gsap.timeline({
      onComplete: () => {
        if (callback) callback();
      }
    });

    tl.to(overlay, {
      x: "0%",
      duration: 0.6,
      ease: "power2.inOut"
    }).to(overlay, {
      x: "100%",
      duration: 0.6,
      ease: "power2.inOut",
      delay: 0.2,
      onComplete: () => {
        overlay.style.opacity = "0";
        overlay.style.visibility = "hidden";
      }
    });
  }

  document.querySelectorAll("a.nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      playOverlayTransition(() => {
        window.location.href = href;
      });
    });
  });
});