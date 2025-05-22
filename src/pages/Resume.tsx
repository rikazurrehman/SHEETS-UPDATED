import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Download } from 'lucide-react';
import GamingAnimation from '../components/GamingAnimation';

const Resume = () => {
  return (
    <div className="min-h-screen bg-gaming-dark text-white relative">
      <GamingAnimation />
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Resume Header */}
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-5xl font-orbitron font-bold gaming-gradient-text mb-6">Resume</h1>
            <button 
              onClick={() => window.open('/assets/CVCURSOR.pdf', '_blank')}
              className="btn-glow group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <Download size={18} className="mr-2" />
              Download PDF
              </span>
            </button>
          </div>
          
          {/* Resume Preview Container */}
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gaming-purple/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gaming-blue/20 rounded-full blur-3xl"></div>
            
            {/* Resume Content */}
            <div className="relative bg-gaming-darker/50 backdrop-blur-sm border border-gaming-purple/20 rounded-xl p-8 shadow-glow hover:shadow-glow-strong transition-all">
              {/* Resume Image */}
              <div className="aspect-[1/1.4] w-full relative overflow-hidden rounded-lg border border-gaming-purple/30">
                <img 
                  src="/assets/Resume.jpg" 
                  alt="Resume Preview"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Resume;
