import { Github, Linkedin, Instagram, Phone, Mail, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/' || location.pathname === '/home' || location.pathname === '/index';

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <>
      {/* Go to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-4 sm:right-8 bottom-4 sm:bottom-8 z-50 p-3 rounded-full bg-gaming-darker/80 backdrop-blur-sm border border-gaming-purple/20 shadow-glow hover:shadow-glow-strong transition-all duration-300 transform hover:scale-110 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5 text-gaming-purple" />
      </button>

      <footer className="bg-gaming-darker py-8 sm:py-12 border-t border-gaming-purple/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center space-y-6 sm:space-y-8">
            {/* Logo & Copyright */}
            <div className="text-center">
              <h2 className="font-orbitron text-xl sm:text-2xl font-bold mb-2 gaming-gradient-text">RIKAZUR REHMAN M</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-3 sm:mt-4 text-xs sm:text-sm text-white/60">
                <div className="flex items-center gap-2 hover:text-gaming-purple transition-colors">
                  <Phone size={14} />
                  <span>+91 7010956992</span>
                </div>
                <div className="flex items-center gap-2 hover:text-gaming-purple transition-colors">
                  <Mail size={14} />
                  <span>rikaz.154@gmail.com</span>
                </div>
              </div>
            </div>
            
            {/* Quick links */}
            <div className="w-full max-w-2xl">
              <ul className="flex flex-wrap justify-center gap-x-4 gap-y-3 sm:gap-x-8 sm:gap-y-0 px-2">
                <li>
                  {isHomePage ? (
                    <a href="#home" className="text-white/60 hover:text-gaming-purple transition-colors text-sm px-2 py-1">
                      Home
                    </a>
                  ) : (
                    <Link to="/" className="text-white/60 hover:text-gaming-purple transition-colors text-sm px-2 py-1">
                      Home
                    </Link>
                  )}
                </li>
                <li>
                  {isHomePage ? (
                    <a href="#about" className="text-white/60 hover:text-gaming-purple transition-colors text-sm px-2 py-1">
                      About
                    </a>
                  ) : (
                    <Link to="/#about" className="text-white/60 hover:text-gaming-purple transition-colors text-sm px-2 py-1">
                      About
                    </Link>
                  )}
                </li>
                <li>
                  <Link to="/works" className="text-white/60 hover:text-gaming-purple transition-colors text-sm px-2 py-1">
                    Portfolio
                  </Link>
                </li>
                <li>
                  {isHomePage ? (
                    <a href="#skills" className="text-white/60 hover:text-gaming-purple transition-colors text-sm px-2 py-1">
                      Skills
                    </a>
                  ) : (
                    <Link to="/#skills" className="text-white/60 hover:text-gaming-purple transition-colors text-sm px-2 py-1">
                      Skills
                    </Link>
                  )}
                </li>
                <li>
                  {isHomePage ? (
                    <a href="#contact" className="text-white/60 hover:text-gaming-purple transition-colors text-sm px-2 py-1">
                      Contact
                    </a>
                  ) : (
                    <Link to="/#contact" className="text-white/60 hover:text-gaming-purple transition-colors text-sm px-2 py-1">
                      Contact
                    </Link>
                  )}
                </li>
              </ul>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-6 sm:gap-8">
              <a 
                href="https://www.linkedin.com/in/rikaz-/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/60 hover:text-gaming-purple transition-all transform hover:scale-110 p-2"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
              <a 
                href="https://www.instagram.com/rikazvisuals/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/60 hover:text-gaming-purple transition-all transform hover:scale-110 p-2"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a 
                href="https://github.com/rikazurrehman" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/60 hover:text-gaming-purple transition-all transform hover:scale-110 p-2"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-white/40 text-xs sm:text-sm">
              © {currentYear} All Rights Reserved
            </div>

            {/* Decorative line */}
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-gaming-purple to-transparent opacity-50"></div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
