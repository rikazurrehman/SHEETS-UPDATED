import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Download, Eye, EyeOff, Lock, Shield, Sparkles } from 'lucide-react';
import GamingAnimation from '../components/GamingAnimation';
import { useState } from 'react';

const Resume = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="min-h-screen bg-gaming-dark text-white relative">
      <GamingAnimation />
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Resume Header */}
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-5xl font-orbitron font-bold gaming-gradient-text mb-6">Resume</h1>
            
            {/* Button row */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {/* View toggle button */}
              <button 
                onClick={toggleVisibility}
                className="group relative overflow-hidden flex items-center gap-2 bg-gaming-darker backdrop-blur-sm border border-white/10 text-white py-3 px-6 rounded-xl hover:border-gaming-purple/30 transition-all duration-300 shadow-lg"
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
                  className="group relative overflow-hidden flex items-center gap-2 bg-gaming-darker backdrop-blur-sm border border-white/10 text-white py-3 px-6 rounded-xl hover:border-gaming-blue/30 transition-all duration-300 shadow-lg"
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
          
          {/* Resume Content Container */}
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gaming-purple/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gaming-blue/20 rounded-full blur-3xl"></div>
            
            {/* Resume Hidden State */}
            {!isVisible ? (
              <div className="relative flex flex-col items-center justify-center py-32 bg-gaming-darker/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-glow transition-all">
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
              /* Resume Content */
              <div className="relative bg-gaming-darker/50 backdrop-blur-sm border border-gaming-purple/20 rounded-xl p-8 shadow-glow hover:shadow-glow-strong transition-all animate-fadeIn">
                {/* Resume Image */}
                <div className="aspect-[1/1.4] w-full relative overflow-hidden rounded-lg border border-gaming-purple/30">
                  <img 
                    src="/assets/Resume.jpg" 
                    alt="Resume Preview"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Resume;
