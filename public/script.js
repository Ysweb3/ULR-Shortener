const canvas = document.getElementById('grid-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let dots = [];
const spacing = 30;
const mouse = { x: -1000, y: -1000 };

function init() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    dots = [];
    for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
            dots.push({ x, y, baseRadius: 1 });
        }
    }
}

window.addEventListener('resize', init);
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    dots.forEach(dot => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;
        
        let radius = dot.baseRadius;
        let opacity = 0.15;
        let color = '#49454f'; // Default outline-variant color

        if (dist < maxDist) {
            const factor = 1 - dist / maxDist;
            radius = dot.baseRadius + factor * 2;
            opacity = 0.15 + factor * 0.6;
            color = '#7874cf'; // Primary brand color from design system
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.fill();
    });
    
    requestAnimationFrame(animate);
}

init();
animate();
   const form = document.querySelector('form');
  const aliasContainer = document.getElementById('alias-container');
  const toast = document.getElementById('toast-notification');
  const toastProgress = document.getElementById('toast-progress');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Darken ALIAS background
    aliasContainer.classList.remove('bg-surface-container-high/50');
    aliasContainer.classList.add('bg-black/80');

    // Show Toast
    toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');
    
    // Reset Progress Bar
    toastProgress.style.transition = 'none';
    toastProgress.style.width = '100%';
    
    setTimeout(() => {
      toastProgress.style.transition = 'width 3000ms linear';
      toastProgress.style.width = '0%';
    }, 10);

    // Reset after 3 seconds
    setTimeout(() => {
      // Hide Toast
      toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
      toast.classList.remove('opacity-100', 'translate-y-0');
      
      // Reset ALIAS background
      aliasContainer.classList.add('bg-surface-container-high/50');
      aliasContainer.classList.remove('bg-black/80');
    }, 3000);
  });
const longUrlForm = document.getElementById('long-url-form')
const longUrl = document.getElementById('long-url')
const shortCode = document.getElementById('short-code')
console.log(longUrl.value)
longUrlForm.addEventListener('submit',async(e)=>{
    e.preventDefault()
const result = await fetch('/shorten', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    longUrl: longUrl.value
  })
})
const data = await result.json()
shortCode.textContent = data.shortCode
})

