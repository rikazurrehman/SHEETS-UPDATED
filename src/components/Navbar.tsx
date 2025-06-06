import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, FileText, Home, Info, Briefcase, Code, Mail } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/#about', icon: Info },
  { name: 'Works', href: '/works', icon: Briefcase },
  { name: 'Skills', href: '/#skills', icon: Code },
  { name: 'Contact', href: '/#contact', icon: Mail },
  { name: 'Resume', href: '/resume', icon: FileText },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lastScrollY = useRef(0);
  const navbarRef = useRef<HTMLElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
      
      if (navbarRef.current) {
        if (currentScrollY > 50) {
          navbarRef.current.classList.add('bg-gaming-darker/80', 'backdrop-blur-sm', 'py-3');
          navbarRef.current.classList.remove('bg-transparent', 'py-4');
        } else {
          navbarRef.current.classList.remove('bg-gaming-darker/80', 'backdrop-blur-sm', 'py-3');
          navbarRef.current.classList.add('bg-transparent', 'py-4');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    if (!href.includes('#')) {
      if (location.pathname === href) {
        window.scrollTo(0, 0);
      } else {
        navigate(href);
      }
      window.scrollTo(0, 0);
      return;
    }

    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const [route, hash] = href.split('#');
    
    if (location.pathname === route || (route === '/' && location.pathname === '')) {
      const element = document.querySelector(`#${hash}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
      setTimeout(() => {
        const element = document.querySelector(`#${hash}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <nav 
      ref={navbarRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="font-medium text-lg tracking-wide hover:text-gaming-purple transition-colors"
          onClick={(e) => handleLinkClick('/', e)}
        >
          Rikazur Rehman M
        </Link>
        
        {/* Desktop menu */}
        <ul className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1.5 py-1"
                onClick={(e) => handleLinkClick(item.href, e)}
              > 
                <item.icon size={14} className="opacity-70 group-hover:opacity-100" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/80 hover:text-white p-1.5 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gaming-darker/95 backdrop-blur-md border-t border-white/5">
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-2 py-2 px-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    onClick={(e) => handleLinkClick(item.href, e)}
                  >
                    <item.icon size={16} />
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
