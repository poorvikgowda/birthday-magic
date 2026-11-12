/**
 * High-performance 60fps canvas fireworks engine with realistic physics,
 * particle trails, sparkle flickering, and theme-aware color palettes.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
  flicker: boolean;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  exploded: boolean;
}

export class FireworksEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private rockets: Rocket[] = [];
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private colors: string[] = ['#d4af37', '#a855f7', '#ec4899', '#38bdf8', '#fbbf24', '#ffffff'];
  private isRunning = false;

  constructor(canvas: HTMLCanvasElement, colors?: string[]) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Cannot get 2d context');
    this.ctx = context;
    if (colors && colors.length > 0) this.colors = colors;
    this.resize();
    window.addEventListener('resize', this.handleResize);
  }

  private handleResize = () => {
    this.resize();
  };

  private resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);
  }

  setColors(colors: string[]) {
    this.colors = colors;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.rockets = [];
    this.particles = [];
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
  }

  launchRocket(targetX?: number, targetY?: number) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const startX = targetX ?? width * 0.2 + Math.random() * width * 0.6;
    const destY = targetY ?? height * 0.15 + Math.random() * height * 0.35;
    const speed = 12 + Math.random() * 4;

    const color = this.colors[Math.floor(Math.random() * this.colors.length)];

    this.rockets.push({
      x: startX,
      y: height,
      targetY: destY,
      vx: (Math.random() - 0.5) * 2,
      vy: -speed,
      color,
      exploded: false,
    });
  }

  private explode(x: number, y: number, baseColor: string) {
    const particleCount = 80 + Math.floor(Math.random() * 40);
    const primaryColor = baseColor;
    const secondaryColor = this.colors[Math.floor(Math.random() * this.colors.length)];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 1.5;
      const color = Math.random() > 0.4 ? primaryColor : secondaryColor;

      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        alpha: 1,
        decay: 0.012 + Math.random() * 0.018,
        size: Math.random() * 2.8 + 1.2,
        flicker: Math.random() > 0.5,
      });
    }
  }

  private loop = () => {
    if (!this.isRunning) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Dark semi-transparent fade for motion trails
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
    this.ctx.fillRect(0, 0, width, height);

    this.ctx.globalCompositeOperation = 'lighter';

    // Random auto-launch
    if (Math.random() < 0.05 && this.rockets.length < 5) {
      this.launchRocket();
    }

    // Update rockets
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.x += r.vx;
      r.y += r.vy;

      // Draw rocket trail
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
      this.ctx.fillStyle = r.color;
      this.ctx.shadowColor = r.color;
      this.ctx.shadowBlur = 8;
      this.ctx.fill();

      if (r.y <= r.targetY || r.vy >= 0) {
        this.explode(r.x, r.y, r.color);
        this.rockets.splice(i, 1);
      }
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.vx *= 0.96; // drag
      p.vy *= 0.96;
      p.vy += 0.09; // gravity
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.flicker && Math.random() > 0.3 ? p.alpha * 0.4 : p.alpha;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.fill();
      this.ctx.restore();
    }

    this.animationId = requestAnimationFrame(this.loop);
  };
}

