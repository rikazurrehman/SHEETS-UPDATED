import React, { useEffect, useRef } from 'react';
import { Gamepad, Star, Zap, Triangle, Circle, Square } from 'lucide-react';

const GamingAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Create floating elements
    const createFloatingElement = () => {
      const element = document.createElement('div');
      
      // Random icon selection for more variety
      const iconType = Math.floor(Math.random() * 6);
      let iconSvg = '';
      
      switch(iconType) {
        case 0:
          iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gamepad"><line x1="6" x2="10" y1="12" y2="12"></line><line x1="8" x2="8" y1="10" y2="14"></line><line x1="15" x2="15.01" y1="13" y2="13"></line><line x1="18" x2="18.01" y1="11" y2="11"></line><rect width="20" height="12" x="2" y="6" rx="2"></rect></svg>';
          break;
        case 1:
          iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
          break;
        case 2:
          iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>';
          break;
        case 3:
          iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path></svg>';
          break;
        case 4:
          iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle"><circle cx="12" cy="12" r="10"></circle></svg>';
          break;
        case 5:
          iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square"><rect width="18" height="18" x="3" y="3" rx="2"></rect></svg>';
          break;
      }
      
      element.innerHTML = iconSvg;
      
      const size = Math.random() * 20 + 10;
      const startX = Math.random() * container.offsetWidth;
      const startY = container.offsetHeight;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 10;
      const rotation = Math.random() * 360;
      
      element.style.position = 'absolute';
      element.style.left = `${startX}px`;
      element.style.top = `${startY}px`;
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.color = getRandomColor();
      element.style.opacity = '0.5';
      element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
      element.style.transform = `translateY(0) rotate(${rotation}deg)`;
      element.style.pointerEvents = 'none';
      
      container.appendChild(element);
      
      // Remove element after some time
      setTimeout(() => {
        if (container.contains(element)) {
          container.removeChild(element);
        }
      }, (duration + delay) * 1000);
    };
    
    // Get random color from gaming theme
    const getRandomColor = () => {
      const colors = ['#8B5CF6', '#38BDF8', '#10B981'];
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    // Create elements periodically - increased frequency
    const interval = setInterval(createFloatingElement, 1500);
    
    // Create initial batch of elements
    for (let i = 0; i < 8; i++) {
      createFloatingElement();
    }
    
    // Create glowing orbs that float around
    const createGlowingOrb = () => {
      const orb = document.createElement('div');
      const size = Math.random() * 40 + 20;
      const startX = Math.random() * container.offsetWidth;
      const startY = Math.random() * container.offsetHeight;
      const duration = Math.random() * 15 + 15;
      
      orb.style.position = 'absolute';
      orb.style.left = `${startX}px`;
      orb.style.top = `${startY}px`;
      orb.style.width = `${size}px`;
      orb.style.height = `${size}px`;
      orb.style.borderRadius = '50%';
      orb.style.background = getRandomColor() + '20'; // Low opacity
      orb.style.boxShadow = `0 0 15px ${getRandomColor()}50`;
      orb.style.filter = 'blur(8px)';
      orb.style.opacity = '0.6';
      orb.style.pointerEvents = 'none';
      
      // Create a unique animation for each orb
      const keyframes = `
        @keyframes float-orb-${startX}-${startY} {
          0% { transform: translate(0, 0); }
          25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
          50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
          75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
          100% { transform: translate(0, 0); }
        }
      `;
      
      const style = document.createElement('style');
      style.innerHTML = keyframes;
      document.head.appendChild(style);
      
      orb.style.animation = `float-orb-${startX}-${startY} ${duration}s ease-in-out infinite, pulse 3s ease-in-out infinite alternate`;
      
      container.appendChild(orb);
    };
    
    // Create some glowing orbs
    for (let i = 0; i < 5; i++) {
      createGlowingOrb();
    }
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Animation container */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gaming-purple via-gaming-blue to-gaming-green animate-gradient pointer-events-none"></div>
    </div>
  );
};

export default GamingAnimation;
