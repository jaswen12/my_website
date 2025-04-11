document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 background.js loaded');
  
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
  
    let dots = [];
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  
    for (let i = 0; i < 100; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3
      });
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      for (let dot of dots) {
        dot.x += dot.speedX;
        dot.y += dot.speedY;
  
        if (dot.x < 0 || dot.x > canvas.width) dot.speedX *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.speedY *= -1;
  
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 122, 204, 0.3)'; // soft blue, easier to see
        ctx.fillStyle = '#007acc';
        ctx.fill();
      }
  
      requestAnimationFrame(animate);
    }
  
    animate();
  });
  