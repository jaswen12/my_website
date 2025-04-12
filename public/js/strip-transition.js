document.addEventListener("DOMContentLoaded", () => {
  const clip = document.getElementById("clip-transition");

  function playClipTransition(callback) {
    clip.style.display = "block";
    gsap.set(clip, {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)"
    });

    const tl = gsap.timeline({
      onComplete: () => {
        callback && callback();
        gsap.to(clip, {
          clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            clip.style.display = "none";
          }
        });
      }
    });

    tl.to(clip, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration: 0.8,
      ease: "power2.inOut"
    });
  }

  document.querySelectorAll("a.nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = link.getAttribute("href");
      playClipTransition(() => {
        window.location.href = target;
      });
    });
  });
});