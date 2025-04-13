window.addEventListener("DOMContentLoaded", () => {
  // Don't show body until everything's ready
  document.body.classList.remove("loading");

  const items = document.querySelectorAll(".fade-up");

  gsap.set(items, { opacity: 0, y: 20, visibility: "hidden" });

  gsap.to(items, {
    opacity: 1,
    y: 0,
    visibility: "visible",
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.15
  });
});
