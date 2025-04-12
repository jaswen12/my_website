document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    console.log("Barba initialized after render");

    barba.init({
      transitions: [
        {
          name: 'page-flip',
          async leave(data) {
            await gsap.to(data.current.container, {
              opacity: 0,
              rotateY: 90,
              transformOrigin: "left center",
              duration: 0.6,
              ease: "power2.inOut"
            });
          },
          enter(data) {
            gsap.set(data.next.container, {
              opacity: 0,
              rotateY: -90,
              transformOrigin: "right center"
            });
            return gsap.to(data.next.container, {
              opacity: 1,
              rotateY: 0,
              duration: 0.6,
              ease: "power2.out"
            });
          }
        }
      ]
    });
  }, 100); // ← delay ensures full DOM rendering
});
