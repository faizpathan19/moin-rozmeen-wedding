import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'petal' | 'heart' | 'flower' | 'sparkle';
  color: string;
  wobble: number;
  wobbleSpeed: number;
}

export const FallingPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Speed up particles gently on scroll
    let scrollBoost = 0;
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      scrollBoost = Math.min(delta * 0.1, 4);
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Palette: blush peach, warm apricot, gold shimmer, soft crimson rose, delicate cream
    const petalColors = ['#FAD2C0', '#F7C5B0', '#EFA78F', '#FDE8E1', '#E8927C'];
    const heartColors = ['#E27D8C', '#D96576', '#EBB0BA', '#C24D60'];
    const sparkleColors = ['#F6D061', '#E5BA43', '#F9E396'];

    const particleCount = width < 768 ? 28 : 46;
    const particles: Particle[] = [];

    const createParticle = (initialY?: number): Particle => {
      const typeRand = Math.random();
      let type: Particle['type'] = 'petal';
      let color = petalColors[Math.floor(Math.random() * petalColors.length)];

      if (typeRand < 0.45) {
        type = 'petal';
        color = petalColors[Math.floor(Math.random() * petalColors.length)];
      } else if (typeRand < 0.75) {
        type = 'heart';
        color = heartColors[Math.floor(Math.random() * heartColors.length)];
      } else if (typeRand < 0.90) {
        type = 'flower';
        color = '#FFFFFF';
      } else {
        type = 'sparkle';
        color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
      }

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * -height,
        size: type === 'sparkle' ? Math.random() * 4 + 3 : Math.random() * 9 + 8,
        speedY: Math.random() * 1.2 + 0.8,
        speedX: Math.random() * 1.5 - 0.75,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.4 + 0.55,
        type,
        color,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.015,
      };
    };

    // Populate initial particles distributed across screen
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(Math.random() * height));
    }

    const drawPetal = (c: CanvasRenderingContext2D, size: number, color: string) => {
      c.beginPath();
      c.moveTo(0, -size);
      c.bezierCurveTo(size * 0.8, -size * 0.5, size * 0.9, size * 0.5, 0, size);
      c.bezierCurveTo(-size * 0.9, size * 0.5, -size * 0.8, -size * 0.5, 0, -size);
      c.fillStyle = color;
      c.fill();
    };

    const drawHeart = (c: CanvasRenderingContext2D, size: number, color: string) => {
      const s = size * 0.75;
      c.beginPath();
      c.moveTo(0, s * 0.3);
      c.bezierCurveTo(-s * 0.5, -s * 0.4, -s, s * 0.2, 0, s);
      c.bezierCurveTo(s, s * 0.2, s * 0.5, -s * 0.4, 0, s * 0.3);
      c.fillStyle = color;
      c.fill();
    };

    const drawFlower = (c: CanvasRenderingContext2D, size: number) => {
      const petals = 5;
      const petalRadius = size * 0.45;
      c.fillStyle = '#FFF8F4';
      for (let i = 0; i < petals; i++) {
        const angle = (i * 2 * Math.PI) / petals;
        const px = Math.cos(angle) * (size * 0.35);
        const py = Math.sin(angle) * (size * 0.35);
        c.beginPath();
        c.arc(px, py, petalRadius, 0, Math.PI * 2);
        c.fill();
      }
      // Warm golden flower center
      c.beginPath();
      c.arc(0, 0, size * 0.22, 0, Math.PI * 2);
      c.fillStyle = '#E5BA43';
      c.fill();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, size: number, color: string) => {
      c.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        c.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
        c.lineTo(Math.cos(angle + Math.PI / 4) * (size * 0.3), Math.sin(angle + Math.PI / 4) * (size * 0.3));
      }
      c.closePath();
      c.fillStyle = color;
      c.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Decay scroll boost smoothly
      scrollBoost *= 0.94;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.wobble += p.wobbleSpeed;
        p.y += p.speedY + scrollBoost;
        p.x += Math.sin(p.wobble) * 0.8 + p.speedX;
        p.rotation += p.rotationSpeed;

        // Reset particle when it falls past screen
        if (p.y > height + 20) {
          particles[i] = createParticle(-20);
          continue;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'petal') {
          drawPetal(ctx, p.size, p.color);
        } else if (p.type === 'heart') {
          drawHeart(ctx, p.size, p.color);
        } else if (p.type === 'flower') {
          drawFlower(ctx, p.size);
        } else if (p.type === 'sparkle') {
          drawSparkle(ctx, p.size, p.color);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
      aria-hidden="true"
    />
  );
};
