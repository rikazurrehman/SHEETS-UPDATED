import React, { useEffect, useRef, memo } from 'react';

const Particles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Particle properties - reduced count for performance
    const particlesArray: any[] = [];
    const numberOfParticles = Math.min(30, Math.floor(window.innerWidth / 40));
    
    // Colors for particles
    const colors = ['#8B5CF6', '#38BDF8', '#10B981'];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      blur: number;
      opacity: number;
      gridX: number;
      gridY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.blur = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
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
        
        // Update grid position
        this.gridX = Math.floor(this.x / 150);
        this.gridY = Math.floor(this.y / 150);
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
    const fps = 30; // Limit to 30 fps for better performance
    const interval = 1000 / fps;
    
    function animate(timestamp: number) {
      const deltaTime = timestamp - lastTime;
      
      if (deltaTime > interval) {
        lastTime = timestamp - (deltaTime % interval);
        
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
          particlesArray[i].draw();
        }
        
        // Draw connecting lines with spatial partitioning
        connectParticles();
      }
      
      requestAnimationFrame(animate);
    }

    // Optimized connection function using spatial grid
    function connectParticles() {
      if (!ctx) return;
      const maxDistance = 120; // Reduced max distance
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
        
        for (let i = 0; i < neighbors.length; i++) {
          const b = neighbors[i];
          if (a >= b) continue; // Skip duplicates and already processed pairs
          
          const dx = particle.x - particlesArray[b].x;
          const dy = particle.y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = 0.1 * (1 - distance / maxDistance);
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
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 bg-gradient-to-b from-gaming-darker to-gaming-dark"
    />
  );
};

// Memo for better performance
export default memo(Particles);
