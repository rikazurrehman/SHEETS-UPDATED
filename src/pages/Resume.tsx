import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Download, Eye, EyeOff, Lock, Shield, Sparkles, ExternalLink } from 'lucide-react';
import GamingAnimation from '../components/GamingAnimation';
import { useState, useEffect } from 'react';
import Tools from '../sections/Tools';
import Particles from '../components/Particles';

const Resume = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => {
      setIsAnimated(true);
    }, 100);
  }, []);
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="min-h-screen bg-gaming-dark text-white relative overflow-hidden">
      {/* Particle background */}
      <Particles />
      
      {/* Digital circuit patterns - similar to Hero */}
      <div className="absolute top-1/4 right-10 w-20 h-20 border border-white/5 rounded-md rotate-12 opacity-30 pointer-events-none hidden sm:block">
        <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-purple/30"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-blue/30"></div>
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gaming-purple rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-gaming-blue rounded-full"></div>
      </div>
      
      <div className="absolute bottom-1/4 left-10 w-16 h-16 border border-white/5 rounded-md -rotate-12 opacity-30 pointer-events-none hidden sm:block">
        <div className="absolute top-1/2 left-0 h-px w-full bg-gaming-blue/30"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gaming-purple/30"></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-gaming-blue rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-gaming-purple rounded-full"></div>
      </div>
      
      <Navbar />
      
      <div className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Resume Header - with animations */}
          <div 
            className={`flex flex-col items-center mb-12 transition-all duration-700 transform ${
              isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="relative mb-4">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-gaming-purple/50 to-transparent"></div>
              <h1 className="text-5xl font-orbitron font-bold gaming-gradient-text mb-2 tracking-tight relative">
                Resume
                <Sparkles className="absolute -top-5 -right-5 w-4 h-4 text-gaming-purple opacity-70 animate-pulse" />
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-gaming-purple to-gaming-blue rounded-full mx-auto mt-2 mb-4 opacity-80"></div>
            </div>
            
            {/* Button row with delayed animation */}
            <div 
              className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-700 delay-200 transform ${
                isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              {/* View toggle button */}
              <button 
                onClick={toggleVisibility}
                className="group relative overflow-hidden flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 text-white py-3 px-6 rounded-xl hover:border-gaming-purple/30 transition-all duration-300 shadow-lg"
              >
                {/* Button background effects */}
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,white_0%,transparent_50%)]"></div>
                  <div className="absolute -inset-x-1/4 top-0 h-px w-[150%] bg-gradient-to-r from-transparent via-white/70 to-transparent group-hover:animate-scan opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                {/* Icon container */}
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gaming-darker border border-gaming-purple/20 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  {isVisible ? (
                    <EyeOff className="h-4 w-4 text-gaming-purple" />
                  ) : (
                    <Eye className="h-4 w-4 text-gaming-purple" />
                  )}
                </div>
                
                <span className="font-medium relative z-10">
                  {isVisible ? "Hide Resume" : "Show Resume"}
                </span>
              </button>
              
              {/* Download button - only visible when resume is shown */}
              {isVisible && (
                <button 
                  onClick={() => window.open('/assets/CVCURSOR.pdf', '_blank')}
                  className="group relative overflow-hidden flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 text-white py-3 px-6 rounded-xl hover:border-gaming-blue/30 transition-all duration-300 shadow-lg animate-fadeIn"
                >
                  {/* Button background effects */}
                  <div className="absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,white_0%,transparent_50%)]"></div>
                    <div className="absolute -inset-x-1/4 top-0 h-px w-[150%] bg-gradient-to-r from-transparent via-white/70 to-transparent group-hover:animate-scan opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  
                  {/* Icon container */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gaming-darker border border-gaming-blue/20 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <Download className="h-4 w-4 text-gaming-blue" />
                  </div>
                  
                  <span className="font-medium relative z-10">Download PDF</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Resume Content Container - with delayed animation */}
          <div 
            className={`relative transition-all duration-700 delay-300 transform ${
              isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gaming-purple/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gaming-blue/20 rounded-full blur-3xl"></div>
            
            {/* Floating animated shapes - hidden on mobile */}
            <div className="absolute top-32 left-1/4 w-16 h-16 border border-white/10 rounded-full blur-sm animate-float opacity-20 pointer-events-none hidden sm:block"></div>
            <div className="absolute bottom-32 right-1/4 w-24 h-24 border border-white/5 rounded-full blur-sm animate-float opacity-10 pointer-events-none hidden sm:block" style={{ animationDuration: '15s', animationDelay: '1s' }}></div>
            
            {/* Resume Hidden State */}
            {!isVisible ? (
              <div className="relative flex flex-col items-center justify-center py-32 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-glow transition-all">
                <div className="w-20 h-20 rounded-full bg-black/30 border border-gaming-purple/20 flex items-center justify-center mb-6 shadow-glow relative">
                  <Lock className="h-8 w-8 text-gaming-purple" />
                  <div className="absolute inset-0 rounded-full blur-sm border border-gaming-purple/30 animate-pulse-slow"></div>
                </div>
                <h3 className="text-2xl font-orbitron text-white mb-3">Resume Hidden</h3>
                <p className="text-white/60 text-center max-w-md mb-8">
                  Click the "Show Resume" button above to view my qualifications and experience.
                </p>
                <div className="absolute -z-10 inset-0 overflow-hidden opacity-5">
                  <div className="absolute top-[40%] left-0 h-px w-full bg-gaming-purple animate-[scan_8s_ease-in-out_infinite]"></div>
                  <div className="absolute top-[60%] left-0 h-px w-full bg-gaming-blue animate-[scan_12s_ease-in-out_infinite_reverse]"></div>
                </div>
                
                {/* Shield accent */}
                <div className="absolute bottom-8 right-8 opacity-20">
                  <Shield className="h-16 w-16 text-gaming-purple" />
                </div>
                <div className="absolute top-8 left-8 opacity-20">
                  <Sparkles className="h-10 w-10 text-gaming-blue" />
                </div>
              </div>
            ) : (
              /* Resume Content with animation */
              <div className="relative bg-black/40 backdrop-blur-sm border border-gaming-purple/20 rounded-xl p-8 shadow-glow hover:shadow-glow-strong transition-all animate-fadeIn">
                {/* Resume Image */}
                <div className="aspect-[1/1.4] w-full relative overflow-hidden rounded-lg border border-gaming-purple/30 group">
                  <img 
                    src="/assets/Resume.jpg" 
                    alt="Resume Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gaming-darker/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* View full-size button */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-300">
                    <button
                      onClick={() => window.open('/assets/Resume.jpg', '_blank')}
                      className="group relative overflow-hidden flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 text-white py-2 px-3 rounded-lg hover:border-gaming-purple/30 transition-all duration-300 shadow-lg"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-md bg-gaming-darker/80 border border-gaming-purple/20 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                        <ExternalLink className="h-3 w-3 text-gaming-purple" />
                      </div>
                      <span className="text-sm font-medium">Full Size</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Tools I Use Section with animation */}
      <div 
        className={`mt-16 transition-all duration-700 delay-500 transform ${
          isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <Tools />
      </div>
      
      {/* Trendy decorative elements at bottom like Hero */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gaming-darker/60 to-transparent pointer-events-none"></div>
      
      {/* Additional decorative elements like Hero */}
      <div className="absolute top-20 right-10 flex space-x-1 opacity-30 pointer-events-none hidden sm:flex">
        <div className="w-2 h-8 bg-gaming-purple/30 rounded-full"></div>
        <div className="w-2 h-5 bg-white/20 rounded-full"></div>
        <div className="w-2 h-10 bg-gaming-blue/30 rounded-full"></div>
      </div>
      
      <div className="absolute bottom-20 left-10 flex space-x-1 opacity-30 pointer-events-none hidden sm:flex">
        <div className="w-2 h-10 bg-gaming-blue/30 rounded-full"></div>
        <div className="w-2 h-5 bg-white/20 rounded-full"></div>
        <div className="w-2 h-8 bg-gaming-purple/30 rounded-full"></div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Resume;
