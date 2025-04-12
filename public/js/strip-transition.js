document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("transition-strips");
  const strips = Array.from(document.querySelectorAll("#transition-strips .strip"));

  // Get width of the window and calculate exact strip width
  const totalWidth = window.innerWidth;
  const stripCount = strips.length;
  const stripWidth = totalWidth / stripCount;

  strips.forEach((strip, i) => {
    strip.style.left = `${Math.floor(i * stripWidth)}px`;
    strip.style.width = `${Math.ceil(stripWidth + 1)}px`; // +1 to ensure overlap
  });

  function playTransition(callback) {
    wrapper.style.display = "block";
    gsap.set(strips, { xPercent: -100 });

    const tl = gsap.timeline();
    tl.to(strips, {
      xPercent: 0,
      duration: 1.1,
      ease: "power4.out",
      stagger: {
        each: 0.04,
        from: "start"
      }
    });

    tl.to(strips, {
      xPercent: 100,
      duration: 1.1,
      ease: "power4.inOut",
      stagger: {
        each: 0.04,
        from: "start"
      },
      onComplete: () => {
        wrapper.style.display = "none";
        gsap.set(strips, { xPercent: -100 });
        callback && callback();
      }
    }, "+=0.1");
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