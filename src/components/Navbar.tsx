
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Works', href: '/works' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Contact', href: '/#contact' },
  { name: 'Resume', href: '/resume', icon: FileText },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when clicking a link on mobile
  const handleLinkClick = (href: string) => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    // Handle hash links within the same page
    if (href.includes('#') && !href.startsWith('/')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.includes('#') && location.pathname === '/') {
      // If we're already on the home page and clicking a hash link
      const hashPart = href.split('#')[1];
      const element = document.querySelector(`#${hashPart}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gaming-darker/90 backdrop-blur-md py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="font-orbitron text-2xl font-bold neon-text"
        >
          PORTFOLIO
        </Link>
        
        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className="text-white/80 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-0 after:bg-gaming-purple after:transition-all hover:after:w-full flex items-center gap-1"
                onClick={() => handleLinkClick(item.href)}
              >
                {item.icon && <item.icon size={16} />}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gaming-darker/95 backdrop-blur-md border-t border-gaming-purple/30">
          <div className="container mx-auto px-4 py-3">
            <ul className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-2 py-2 px-4 text-white/80 hover:text-white hover:bg-gaming-purple/20 rounded transition-colors"
                    onClick={() => handleLinkClick(item.href)}
                  >
                    {item.icon && <item.icon size={16} />}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
