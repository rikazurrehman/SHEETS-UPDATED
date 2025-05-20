import { Github, Linkedin, Instagram, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gaming-darker py-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Copyright */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="font-orbitron text-xl font-bold mb-2 neon-text">RIKAZUR REHMAN M</h2>
            <p className="text-white/60 text-sm">
              © {currentYear} All Rights Reserved
            </p>
            <div className="flex items-center mt-2 text-sm text-white/60">
              <Phone size={14} className="mr-1" />
              <span className="mr-4">+91 7010956992</span>
              <Mail size={14} className="mr-1" />
              <span>rikaz.154@gmail.com</span>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="mb-6 md:mb-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#home" className="text-white/60 hover:text-white transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/60 hover:text-white transition-colors text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-white/60 hover:text-white transition-colors text-sm">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#skills" className="text-white/60 hover:text-white transition-colors text-sm">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/60 hover:text-white transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a 
              href="https://linkedin.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/60 hover:text-gaming-purple transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://instagram.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/60 hover:text-gaming-purple transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://github.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/60 hover:text-gaming-purple transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
