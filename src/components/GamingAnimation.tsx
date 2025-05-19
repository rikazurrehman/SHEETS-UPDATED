
import React, { useEffect, useRef } from 'react';
import { Gamepad, Star } from 'lucide-react';

const GamingAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Create floating elements
    const createFloatingElement = () => {
      const element = document.createElement('div');
      const isGamepad = Math.random() > 0.5;
      
      element.innerHTML = isGamepad ? 
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gamepad"><line x1="6" x2="10" y1="12" y2="12"></line><line x1="8" x2="8" y1="10" y2="14"></line><line x1="15" x2="15.01" y1="13" y2="13"></line><line x1="18" x2="18.01" y1="11" y2="11"></line><rect width="20" height="12" x="2" y="6" rx="2"></rect></svg>' :
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
      
      const size = Math.random() * 20 + 10;
      const startX = Math.random() * container.offsetWidth;
      const startY = container.offsetHeight;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 10;
      
      element.style.position = 'absolute';
      element.style.left = `${startX}px`;
      element.style.top = `${startY}px`;
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.color = Math.random() > 0.5 ? '#8B5CF6' : '#38BDF8';
      element.style.opacity = '0.5';
      element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
      element.style.transform = 'translateY(0)';
      element.style.pointerEvents = 'none';
      
      container.appendChild(element);
      
      // Remove element after some time
      setTimeout(() => {
        if (container.contains(element)) {
          container.removeChild(element);
        }
      }, (duration + delay) * 1000);
    };
    
    // Create elements periodically
    const interval = setInterval(createFloatingElement, 2000);
    
    // Add custom cursor
    const setupCustomCursor = () => {
      // Don't add custom cursor on mobile devices
      if (window.innerWidth < 768) return;
      
      const cursorElement = document.createElement('div');
      cursorElement.className = 'custom-cursor hidden md:block';
      document.body.appendChild(cursorElement);
      
      const cursorTrailElement = document.createElement('div');
      cursorTrailElement.className = 'cursor-trail hidden md:block';
      document.body.appendChild(cursorTrailElement);
      
      const updateCursor = (e: MouseEvent) => {
        cursorElement.style.top = `${e.clientY}px`;
        cursorElement.style.left = `${e.clientX}px`;
        
        setTimeout(() => {
          cursorTrailElement.style.top = `${e.clientY}px`;
          cursorTrailElement.style.left = `${e.clientX}px`;
        }, 100);
      };
      
      document.addEventListener('mousemove', updateCursor);
      
      document.addEventListener('mousedown', () => {
        cursorElement.classList.add('cursor-clicked');
      });
      
      document.addEventListener('mouseup', () => {
        cursorElement.classList.remove('cursor-clicked');
      });
      
      // Add hover effect to interactive elements
      const addHoverEffect = () => {
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
        
        interactiveElements.forEach(element => {
          element.addEventListener('mouseenter', () => {
            cursorElement.classList.add('cursor-hover');
          });
          
          element.addEventListener('mouseleave', () => {
            cursorElement.classList.remove('cursor-hover');
          });
        });
      };
      
      // Wait for DOM to be fully loaded
      setTimeout(addHoverEffect, 1000);
      
      return () => {
        document.removeEventListener('mousemove', updateCursor);
        if (cursorElement.parentNode) {
          cursorElement.parentNode.removeChild(cursorElement);
        }
        if (cursorTrailElement.parentNode) {
          cursorTrailElement.parentNode.removeChild(cursorTrailElement);
        }
      };
    };
    
    const cleanupCursor = setupCustomCursor();
    
    return () => {
      clearInterval(interval);
      if (cleanupCursor) cleanupCursor();
    };
  }, []);
  
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Animation container */}
    </div>
  );
};

export default GamingAnimation;
