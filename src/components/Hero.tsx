
import { useState, useEffect } from 'react';
import Particles from './Particles';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setIsVisible(true);
  }, []);

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Particle background */}
      <Particles />
      
      {/* Content */}
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text content */}
          <div 
            className={`md:w-1/2 text-center md:text-left transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              I craft <span className="gaming-gradient-text">3D campaigns</span>
              <br />& epic <span className="gaming-gradient-text">video edits</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Bringing gaming-inspired aesthetics to digital content creation with 
              cutting-edge techniques and creative vision.
            </p>
            
            <button 
              onClick={scrollToPortfolio} 
              className="btn-glow group"
            >
              View My Work
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
          
          {/* Profile image */}
          <div 
            className={`md:w-1/2 flex justify-center transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Circular glow background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gaming-purple/30 to-gaming-blue/30 blur-xl animate-pulse"></div>
              
              {/* Profile image */}
              <img 
                src="https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Profile" 
                className="absolute inset-0 w-full h-full object-cover rounded-full border-2 border-gaming-purple shadow-glow z-10"
              />
              
              {/* Animated rings */}
              <div className="absolute inset-0 border-2 border-gaming-purple/50 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-0 border border-gaming-purple/30 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white/50 text-sm mb-2">Scroll Down</span>
        <div className="w-5 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDuration: '1.5s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
