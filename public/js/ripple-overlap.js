// /public/js/ripple-overlap.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("SVG Ripple Script Loaded");

  const container = document.getElementById("svg-ripple-mask");
  if (!container) return;

  const cols = 15;
  const rows = 8;
  const rippleColor = "#E8DD93"; // Wabi-classic tone
  const duration = 0.6;

  // Create SVG mask content
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.style.position = "absolute";
  svg.style.top = 0;
  svg.style.left = 0;
  svg.style.zIndex = 1000;
  svg.style.pointerEvents = "none";
  svg.style.backgroundColor = rippleColor;

  const blockWidth = 100 / cols;
  const blockHeight = 100 / rows;
  const rects = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", col * blockWidth);
      rect.setAttribute("y", row * blockHeight);
      rect.setAttribute("width", blockWidth);
      rect.setAttribute("height", blockHeight);
      rect.setAttribute("fill", "black");
      svg.appendChild(rect);
      rects.push(rect);
    }
  }

  container.appendChild(svg);

  // Entry animation
  function playIn(callback) {
    gsap.set(rects, { scale: 0, transformOrigin: "center" });
    gsap.to(rects, {
      scale: 1,
      duration,
      ease: "power3.out",
      stagger: {
        each: 0.01,
        from: "start",
        grid: [rows, cols]
      },
      onComplete: callback
    });
  }

  // Exit animation
  function playOut(callback) {
    gsap.to(rects, {
      scale: 0,
      duration,
      ease: "power3.in",
      stagger: {
        each: 0.01,
        from: "end",
        grid: [rows, cols]
      },
      onComplete: callback
    });
  }

  // Intercept nav clicks
  document.querySelectorAll("a.nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");

      playIn(() => {
        window.location.href = href;
      });
    });
  });
});
