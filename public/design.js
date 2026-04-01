const canvas = document.getElementById('grid-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let dots = [];
const spacing = 20;
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
        const maxDist = 100;
        
        let radius = dot.baseRadius;
        let opacity = 0.15;
        let color = '#966fd1ff'; // Default outline-variant color

        if (dist < maxDist) {
            const factor = 1 - dist / maxDist;
            radius = dot.baseRadius + factor * 2;
            opacity = 0.15 + factor * 0.6;
            color = '#7874cf'; // Primary brand color from design system
        }

        ctx.beginPath();
        const angle = Math.atan2(dy, dx)
        const lineLength = 25;
        // draw a line
        ctx.save()
        ctx.translate(dot.x, dot.y)
        ctx.rotate(angle*90)
        ctx.beginPath()
        ctx.moveTo(-lineLength / 2, 0)
        ctx.lineTo(lineLength / 2, 0)
        ctx.strokeStyle = color
        ctx.globalAlpha = opacity
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.restore()
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.fill();
    });
    
    requestAnimationFrame(animate);
}

init();
animate();