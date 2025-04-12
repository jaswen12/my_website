document.addEventListener("DOMContentLoaded", () => {
  console.log("Barba running");

  barba.init({
    transitions: [{
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
      },
      after(data) {
        //Reset any transforms applied
        gsap.set(data.current.container, {
          clearProps: "all"
        });
        gsap.set(data.next.container, {
          clearProps: "all"
        });
      }
    }]
  });
});
