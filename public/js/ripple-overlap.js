
console.log("SVG Ripple Script Loaded");

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("svg-ripple-mask");
  const count = 120;
  const w = window.innerWidth;
  const h = window.innerHeight;

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", w);
  svg.setAttribute("height", h);
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.setAttribute("preserveAspectRatio", "none");

  const mask = document.createElementNS(svgNS, "mask");
  mask.setAttribute("id", "ripple-mask");

  for (let i = 0; i < count; i++) {
    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", i * (w / count));
    rect.setAttribute("y", 0);
    rect.setAttribute("width", w / count);
    rect.setAttribute("height", h);
    rect.setAttribute("fill", "white");

    gsap.fromTo(rect, {
      scaleY: 0,
      transformOrigin: "center center"
    }, {
      scaleY: 1,
      delay: i * 0.01,
      duration: 0.6,
      ease: "power2.out"
    });

    mask.appendChild(rect);
  }

  svg.appendChild(mask);
  container.innerHTML = ""; // Clear any existing SVG
  container.appendChild(svg);

  console.log(`${count} rects generated`);
});