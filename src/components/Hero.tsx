import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Particles from './Particles';
import { ArrowRight, Github, Linkedin, Instagram, Twitter } from 'lucide-react';

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
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gaming-purple/40 via-gaming-blue/30 to-transparent blur-xl"></div>
            
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-full border border-white/10"></div>
            <div className="absolute inset-0 rounded-full border border-white/5 animate-pulse" style={{ animationDuration: '3s' }}></div>
            
            {/* Profile image */}
            <img 
              src="/assets/DSC09562 (3).png"
              alt="Profile" 
              width="320"
              height="320"
              className="absolute inset-0 w-full h-full object-cover rounded-full border border-white/20 z-10"
              loading="eager"
            />
          </div>
        </div>
        
        {/* Text content - now below the image */}
        <div 
          className={`text-center max-w-3xl transition-all duration-700 delay-100 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Hey! I'm <span className="gaming-gradient-text">Rikaz!</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-6 leading-relaxed max-w-2xl mx-auto">
            Blending <span className="gaming-gradient-text font-medium">social media strategy</span>, 
            <span className="gaming-gradient-text font-medium"> CGI</span>, and 
            <span className="gaming-gradient-text font-medium"> video production</span> to create crazy content.
          </p>
          
          <p className="text-base text-white/70 mb-8 leading-relaxed max-w-xl mx-auto">
            Most days I'm fully packed and always learning, but when I get a breather, 
            you'll find me riding my bike, chasing a shawarma, or dropping 30 kills in 
            Valorant <span className="inline-block animate-bounce">😜</span>
          </p>
          
          {/* Social links */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
          </div>
          
          {/* CTA button */}
          <div className="flex justify-center">
            <button 
              onClick={goToWorks} 
              className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white py-3 px-6 rounded-full hover:bg-white/15 transition-all relative overflow-hidden"
            >
              {/* Background glow effect that doesn't hide text */}
              <span className="absolute inset-0 bg-gradient-to-r from-gaming-purple/20 to-gaming-blue/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="font-medium relative z-10">Explore Portfolio</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 relative z-10" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Trendy decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gaming-darker/60 to-transparent pointer-events-none"></div>
      
      {/* Floating animated shapes - subtle geometric elements */}
      <div className="absolute top-32 left-1/4 w-16 h-16 border border-white/10 rounded-full blur-sm animate-float opacity-20"></div>
      <div className="absolute top-48 right-1/4 w-24 h-24 border border-white/5 rounded-full blur-sm animate-float opacity-10" style={{ animationDuration: '15s', animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-1/3 w-20 h-20 border border-white/10 rounded-sm blur-sm animate-float opacity-20" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
    </section>
  );
};

export default Hero;
