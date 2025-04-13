document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".fade-up");
  items.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, 300 + i * 150);
  });
});