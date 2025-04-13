document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("transition-overlay");

  function playOverlayTransition(href) {
    overlay.style.visibility = "visible";
    overlay.style.opacity = "1";
    gsap.set(overlay, { x: "-100%", y: "-100%" });

    gsap.to(overlay, {
      x: "0%",
      y: "0%",
      duration: 0.8,
      ease: "circ.inOut",
      onComplete: () => {
        window.location.href = href;
      }
    });
  }

  document.querySelectorAll("a.nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      playOverlayTransition(href);
    });
  });
});