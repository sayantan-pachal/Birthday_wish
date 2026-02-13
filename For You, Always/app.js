document.getElementById('start-btn').addEventListener('click', function() {
    // Play Music
    const music = document.getElementById('bg-music');
    music.play();

    // Show Content
    document.getElementById('main-content').classList.remove('hidden');
    
    // Smooth scroll to first message
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    
    // Hide the hero button so she doesn't click twice
    this.style.display = 'none';
});

// Intersection Observer for the "reveal on scroll" effect
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(section => {
    observer.observe(section);
});

const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let hearts = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Heart {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 15 + 5;
        this.speed = Math.random() * 2 + 1;
        this.opacity = 1;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#f48fb1'; // Match your --accent color
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(this.x, this.y + topCurveHeight);
        // Standard heart shape path
        ctx.bezierCurveTo(this.x, this.y, this.x - this.size / 2, this.y, this.x - this.size / 2, this.y + topCurveHeight);
        ctx.bezierCurveTo(this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, this.x, this.y + (this.size + topCurveHeight) / 2, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x, this.y + (this.size + topCurveHeight) / 2, this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, this.x + this.size / 2, this.y + topCurveHeight);
        ctx.bezierCurveTo(this.x + this.size / 2, this.y, this.x, this.y, this.x, this.y + topCurveHeight);
        ctx.fill();
    }

    update() {
        this.y -= this.speed;
        this.opacity -= 0.005;
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.1) hearts.push(new Heart());
    
    hearts = hearts.filter(h => h.opacity > 0);
    hearts.forEach(h => {
        h.update();
        h.draw();
    });
    requestAnimationFrame(animate);
}

// Start animation immediately
animate();