import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Particles from './Particles';
import { ArrowRight, Github, Linkedin, Instagram, Twitter, Sparkles, ExternalLink, Award, Code } from 'lucide-react';

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
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Particle background */}
      <Particles />
      
      {/* Digital circuit pattern */}
      <div className="absolute top-1/4 right-10 w-20 h-20 border border-white/5 rounded-md rotate-12 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-purple/30"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-blue/30"></div>
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gaming-purple rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-gaming-blue rounded-full"></div>
      </div>
      
      <div className="absolute bottom-1/4 left-10 w-16 h-16 border border-white/5 rounded-md -rotate-12 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-blue/30"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-purple/30"></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-gaming-blue rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-gaming-purple rounded-full"></div>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-6 z-10 flex flex-col items-center">
        {/* Profile image - centered */}
        <div 
          className={`mb-8 transition-all duration-700 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
            {/* Glowing backdrop */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gaming-purple/40 via-gaming-blue/30 to-transparent blur-xl animate-pulse-slow"></div>
            
            {/* Animated rings */}
            <div className="absolute -inset-3 rounded-full border border-white/10 animate-pulse-slow animation-delay-1000"></div>
            <div className="absolute -inset-6 rounded-full border border-white/5 animate-pulse-slow animation-delay-2000"></div>
            
            {/* Corner decorations */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-gaming-purple/30 rounded-tl-lg"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-gaming-blue/30 rounded-tr-lg"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-gaming-blue/30 rounded-bl-lg"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-gaming-purple/30 rounded-br-lg"></div>
            
            {/* Profile image */}
            <img 
              src="/assets/DSC09562 (3).png"
              alt="Profile" 
              width="320"
              height="320"
              className="absolute inset-0 w-full h-full object-cover rounded-full border border-white/20 z-10 shadow-lg"
              loading="eager"
            />
            
            {/* Glowing accent dots */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gaming-purple rounded-full shadow-glow animate-pulse-slow"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gaming-blue rounded-full shadow-glow animate-pulse-slow animation-delay-2000"></div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gaming-purple rounded-full shadow-glow animate-pulse-slow animation-delay-1000"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gaming-blue rounded-full shadow-glow animate-pulse-slow animation-delay-3000"></div>
          </div>
        </div>
        
        {/* Text content - now below the image */}
        <div 
          className={`text-center max-w-3xl transition-all duration-700 delay-100 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="relative mb-6">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-gaming-purple/50 to-transparent"></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 tracking-tight relative">
              Hey! I'm <span className="gaming-gradient-text relative">
                Rikaz!
                <Sparkles className="absolute -top-5 -right-5 w-4 h-4 text-gaming-purple opacity-70 animate-pulse" />
              </span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-gaming-purple to-gaming-blue rounded-full mx-auto mt-2 mb-4 opacity-80"></div>
          </div>
          
          <p className="text-xl text-white/90 mb-6 leading-relaxed max-w-2xl mx-auto">
            Blending <span className="gaming-gradient-text font-medium relative">social media strategy
              <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-gaming-purple/50 to-gaming-blue/50"></div>
            </span>, 
            <span className="gaming-gradient-text font-medium relative"> CGI
              <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-gaming-purple/50 to-gaming-blue/50"></div>
            </span>, and 
            <span className="gaming-gradient-text font-medium relative"> video production
              <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-gaming-purple/50 to-gaming-blue/50"></div>
            </span> to create crazy content.
          </p>
          
          <p className="text-base text-white/70 mb-8 leading-relaxed max-w-xl mx-auto">
            Most days I'm fully packed and always learning, but when I get a breather, 
            you'll find me riding my bike, chasing a shawarma, or dropping 30 kills in 
            Valorant <span className="inline-block animate-bounce">😜</span>
          </p>
          
          {/* Social links - Redesigned */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center p-3 rounded-xl bg-black/30 hover:bg-gaming-darker/60 transition-all border border-white/5 hover:border-gaming-purple/20 hover:scale-105 transform"
            >
              <div className="w-10 h-10 rounded-xl bg-gaming-purple/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow animate-pulse-slow relative">
                <Github className="h-5 w-5 text-gaming-purple relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-gaming-purple/20 to-transparent rounded-xl"></div>
              </div>
            </a>
            
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center p-3 rounded-xl bg-black/30 hover:bg-gaming-darker/60 transition-all border border-white/5 hover:border-gaming-blue/20 hover:scale-105 transform"
            >
              <div className="w-10 h-10 rounded-xl bg-gaming-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow animate-pulse-slow animation-delay-1000 relative">
                <Linkedin className="h-5 w-5 text-gaming-blue relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-gaming-blue/20 to-transparent rounded-xl"></div>
              </div>
            </a>
            
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center p-3 rounded-xl bg-black/30 hover:bg-gaming-darker/60 transition-all border border-white/5 hover:border-gaming-purple/20 hover:scale-105 transform"
            >
              <div className="w-10 h-10 rounded-xl bg-gaming-purple/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow animate-pulse-slow animation-delay-2000 relative">
                <Instagram className="h-5 w-5 text-gaming-purple relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-gaming-purple/20 to-transparent rounded-xl"></div>
              </div>
            </a>
            
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center p-3 rounded-xl bg-black/30 hover:bg-gaming-darker/60 transition-all border border-white/5 hover:border-gaming-blue/20 hover:scale-105 transform"
            >
              <div className="w-10 h-10 rounded-xl bg-gaming-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow animate-pulse-slow animation-delay-3000 relative">
                <Twitter className="h-5 w-5 text-gaming-blue relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-gaming-blue/20 to-transparent rounded-xl"></div>
              </div>
            </a>
          </div>
          
          {/* CTA button - Enhanced */}
          <div className="flex justify-center">
            <button 
              onClick={goToWorks} 
              className="group relative overflow-hidden flex items-center gap-3 bg-black/40 backdrop-blur-sm border border-white/10 text-white py-3 px-6 rounded-xl hover:border-gaming-purple/30 transition-all duration-300 shadow-lg"
            >
              {/* Button background effects */}
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,white_0%,transparent_50%)]"></div>
                <div className="absolute -inset-x-1/4 top-0 h-px w-[150%] bg-gradient-to-r from-transparent via-white/70 to-transparent group-hover:animate-scan opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              {/* Icon container */}
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gaming-darker border border-gaming-purple/20 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                <ExternalLink className="h-4 w-4 text-gaming-purple" />
              </div>
              
              <span className="font-medium relative z-10">Explore Portfolio</span>
              
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 relative z-10" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Trendy decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gaming-darker/60 to-transparent pointer-events-none"></div>
      
      {/* Floating animated shapes - enhanced */}
      <div className="absolute top-32 left-1/4 w-16 h-16 border border-white/10 rounded-full blur-sm animate-float opacity-20 pointer-events-none"></div>
      <div className="absolute top-48 right-1/4 w-24 h-24 border border-white/5 rounded-full blur-sm animate-float opacity-10 pointer-events-none" style={{ animationDuration: '15s', animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-1/3 w-20 h-20 border border-white/10 rounded-sm blur-sm animate-float opacity-20 pointer-events-none" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
      
      {/* Additional decorative elements */}
      <div className="absolute top-20 right-10 flex space-x-1 opacity-30 pointer-events-none">
        <div className="w-2 h-8 bg-gaming-purple/30 rounded-full"></div>
        <div className="w-2 h-5 bg-white/20 rounded-full"></div>
        <div className="w-2 h-10 bg-gaming-blue/30 rounded-full"></div>
      </div>
      
      <div className="absolute bottom-20 left-10 flex space-x-1 opacity-30 pointer-events-none">
        <div className="w-2 h-10 bg-gaming-blue/30 rounded-full"></div>
        <div className="w-2 h-5 bg-white/20 rounded-full"></div>
        <div className="w-2 h-8 bg-gaming-purple/30 rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
