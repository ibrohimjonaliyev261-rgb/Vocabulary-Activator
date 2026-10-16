/**
 * Lightweight Zero-Dependency Canvas Confetti
 */
class ConfettiCanon {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationFrame = null;
    }

    createCanvas() {
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'va-confetti-canvas';
            this.canvas.style.position = 'fixed';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.width = '100vw';
            this.canvas.style.height = '100vh';
            this.canvas.style.pointerEvents = 'none';
            this.canvas.style.zIndex = '99999';
            document.body.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.resize();
            window.addEventListener('resize', () => this.resize());
        }
    }

    resize() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }

    fire(durationMs = 3500) {
        this.createCanvas();
        this.resize();

        const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#14b8a6'];
        const count = 120;

        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 200,
                y: window.innerHeight * 0.4 + (Math.random() - 0.5) * 100,
                vx: (Math.random() - 0.5) * 14,
                vy: Math.random() * -12 - 4,
                size: Math.random() * 8 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 12,
                opacity: 1,
                shape: Math.random() > 0.4 ? 'rect' : 'circle'
            });
        }

        const startTime = Date.now();

        const render = () => {
            const elapsed = Date.now() - startTime;
            if (elapsed > durationMs && this.particles.length === 0) {
                if (this.ctx && this.canvas) {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                }
                cancelAnimationFrame(this.animationFrame);
                return;
            }

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            for (let i = this.particles.length - 1; i >= 0; i--) {
                const p = this.particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.35; // gravity
                p.vx *= 0.985;
                p.rotation += p.rotSpeed;
                p.opacity -= 0.007;

                if (p.opacity <= 0 || p.y > window.innerHeight + 20) {
                    this.particles.splice(i, 1);
                    continue;
                }

                this.ctx.save();
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate((p.rotation * Math.PI) / 180);
                this.ctx.globalAlpha = Math.max(0, p.opacity);
                this.ctx.fillStyle = p.color;

                if (p.shape === 'rect') {
                    this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                } else {
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
                    this.ctx.fill();
                }

                this.ctx.restore();
            }

            this.animationFrame = requestAnimationFrame(render);
        };

        if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
        this.animationFrame = requestAnimationFrame(render);
    }
}

window.confettiCanon = new ConfettiCanon();
