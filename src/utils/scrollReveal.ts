
// Initialize scroll animations
export const initScrollReveal = () => {
  const scrollReveal = () => {
    const revealElements = document.querySelectorAll('[data-scroll-reveal="true"]');
    
    revealElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      if (rect.top <= windowHeight * 0.85) {
        element.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', scrollReveal);
  // Initial check
  setTimeout(scrollReveal, 100);
  
  return () => window.removeEventListener('scroll', scrollReveal);
};
