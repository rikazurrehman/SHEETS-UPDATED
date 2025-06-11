import React, { useEffect, useRef, memo } from 'react';

interface ParticlesProps {
  className?: string;
}

const Particles: React.FC<ParticlesProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Set canvas to full window size
    const handleResize = () => {
      // Use devicePixelRatio for better performance on high-DPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Particle properties - further reduced count for better performance
    const particlesArray: any[] = [];
    // Adjust particle count based on screen size and performance
    const numberOfParticles = Math.min(20, Math.floor(window.innerWidth / 60));
    
    // Colors for particles
    const colors = ['#8B5CF6', '#38BDF8', '#10B981'];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      gridX: number;
      gridY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5; // Slightly smaller particles
        this.speedX = Math.random() * 0.2 - 0.1; // Slower movement
        this.speedY = Math.random() * 0.2 - 0.1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.4 + 0.2; // Reduced opacity
        // Grid position for spatial partitioning
        this.gridX = 0;
        this.gridY = 0;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
        
        // Update grid position - using larger grid cells for fewer checks
        this.gridX = Math.floor(this.x / 200);
        this.gridY = Math.floor(this.y / 200);
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    
    // Use requestAnimationFrame with throttling for better performance
    let lastTime = 0;
    const fps = 24; // Reduced to 24 fps for better performance
    const interval = 1000 / fps;
    
    // Animation flag to prevent memory leaks
    let animationFrameId: number;
    
    function animate(timestamp: number) {
      const deltaTime = timestamp - lastTime;
      
      if (deltaTime > interval) {
        lastTime = timestamp - (deltaTime % interval);
        
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background once to avoid transparent layers
        ctx.fillStyle = 'rgb(10, 10, 18)'; // gaming-dark color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles in a single loop
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
          particlesArray[i].draw();
        }
        
        // Draw connecting lines with spatial partitioning
        connectParticles();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    }

    // Optimized connection function using spatial grid
    function connectParticles() {
      if (!ctx) return;
      const maxDistance = 100; // Further reduced max distance
      const gridMap = new Map();
      
      // Place particles in grid
      particlesArray.forEach((particle, index) => {
        const key = `${particle.gridX},${particle.gridY}`;
        if (!gridMap.has(key)) {
          gridMap.set(key, []);
        }
        gridMap.get(key).push(index);
      });
      
      // Only check nearby cells
      for (let a = 0; a < particlesArray.length; a++) {
        const particle = particlesArray[a];
        const neighbors = [];
        
        // Check particles in same and adjacent grid cells
        for (let gx = -1; gx <= 1; gx++) {
          for (let gy = -1; gy <= 1; gy++) {
            const key = `${particle.gridX + gx},${particle.gridY + gy}`;
            if (gridMap.has(key)) {
              neighbors.push(...gridMap.get(key));
            }
          }
        }
        
        // Use distance squared to avoid expensive sqrt operations
        const maxDistanceSquared = maxDistance * maxDistance;
        
        for (let i = 0; i < neighbors.length; i++) {
          const b = neighbors[i];
          if (a >= b) continue; // Skip duplicates and already processed pairs
          
          const dx = particle.x - particlesArray[b].x;
          const dy = particle.y - particlesArray[b].y;
          const distanceSquared = dx * dx + dy * dy;
          
          if (distanceSquared < maxDistanceSquared) {
            const distance = Math.sqrt(distanceSquared);
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = 0.05 * (1 - distance / maxDistance); // Reduced opacity
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    init();
    animationFrameId = requestAnimationFrame(animate);

    // Clean up to prevent memory leaks
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 bg-gradient-to-b from-gaming-darker to-gaming-dark pointer-events-none z-0 ${className || ''}`}
    />
  );
};

// Memo for better performance
export default memo(Particles);
