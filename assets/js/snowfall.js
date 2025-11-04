// Snowfall animation effect
(function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.id = 'snowfall';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;';
    document.body.appendChild(canvas);

    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Snowflake particles
    const snowflakes = [];
    const snowflakeCount = 100;

    class Snowflake {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.vx = Math.random() * 1 - 0.5;
            this.vy = Math.random() * 2 + 1;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05; // gravity effect

            // Reset when snowflake goes below screen
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize snowflakes
    for (let i = 0; i < snowflakeCount; i++) {
        snowflakes.push(new Snowflake());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
})();
