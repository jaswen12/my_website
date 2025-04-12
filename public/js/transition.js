barba.init({
  transitions: [{
    name: 'page-flip',
    leave(data) {
      return gsap.to(data.current.container, {
        rotationY: 90,
        duration: 0.6,
        ease: "power2.inOut"
      });
    },
    enter(data) {
      gsap.set(data.next.container, { rotationY: -90 });
      return gsap.to(data.next.container, {
        rotationY: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  }]
});
