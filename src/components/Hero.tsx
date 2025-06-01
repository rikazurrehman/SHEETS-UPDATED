import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Particles from './Particles';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animation after mount
    setIsVisible(true);
  }, []);

  const goToWorks = () => {
    navigate('/works');
    window.scrollTo(0, 0); // Ensure we start at the top of the page
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Particle background - using React.memo for optimization */}
      <Particles />
      
      {/* Creative floating elements - reduced for better performance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-20 h-20 bg-gaming-purple/10 rounded-full blur-xl animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-1/2 right-1/5 w-16 h-16 bg-gaming-green/10 rounded-full blur-xl animate-float" style={{ animationDuration: '12s', animationDelay: '1s' }}></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text content */}
          <div 
            className={`md:w-1/2 text-center md:text-left transition-all duration-700 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative">
                <span className="relative inline-block p-3 rounded-3xl">
                  {/* Soft-edged container for RGB effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gaming-darker/10 backdrop-blur-sm"></div>
                  {/* Contained RGB animated gradient layers with feathered edges */}
                  <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-transparent to-transparent opacity-40 blur-lg rounded-3xl animate-rgb-flow-contained"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-40 blur-lg rounded-3xl animate-rgb-flow-contained" style={{ animationDelay: '1.2s' }}></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-500 opacity-40 blur-lg rounded-3xl animate-rgb-flow-contained" style={{ animationDelay: '2.4s' }}></span>
                  <span className="relative inline-block bg-gradient-to-r from-red-500 via-green-500 to-blue-500 bg-clip-text text-transparent animate-rgb-text-fill font-orbitron">
                    Hey! I'm Rikaz!
                  </span>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/95 mb-6 leading-relaxed font-medium">
                Blending <span className="gaming-gradient-text font-bold">social media strategy</span>, 
                <span className="gaming-gradient-text font-bold"> CGI</span>, and 
                <span className="gaming-gradient-text font-bold"> video production</span> to create crazy content.
              </p>
              
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Most days I'm fully packed and always learning, but when I get a breather, 
                you'll find me riding my bike, chasing a shawarma, or dropping 30 kills in 
                Valorant <span className="inline-block animate-bounce">😜</span>
              </p>
              
              <button 
                onClick={goToWorks} 
                className="btn-glow group relative overflow-hidden"
              >
                <span className="relative z-10 font-medium">Explore Portfolio</span>
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1 relative z-10">→</span>
              </button>
            </div>
          </div>
          
          {/* Profile image - optimized for performance */}
          <div 
            className={`md:w-1/2 flex justify-center transition-all duration-700 delay-200 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Circular glow background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gaming-purple/30 to-gaming-blue/30 blur-xl"></div>
              
              {/* Profile image - using width and height attributes for CLS optimization */}
              <img 
                src="/assets/DSC09562 (3).png"
                alt="Profile" 
                width="384"
                height="384"
                className="absolute inset-0 w-full h-full object-cover rounded-full border-2 border-gaming-purple shadow-glow z-10"
                loading="eager"
              />
              
              {/* Reduced number of animated rings for better performance */}
              <div className="absolute inset-0 border-2 border-gaming-purple/50 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
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
