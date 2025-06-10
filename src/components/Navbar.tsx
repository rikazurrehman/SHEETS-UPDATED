import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, FileText, Home, Info, Briefcase, Code, Mail, Command, Sparkles } from 'lucide-react';

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
  const [activeItem, setActiveItem] = useState('/');
  const lastScrollY = useRef(0);
  const navbarRef = useRef<HTMLElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Set active item based on location
    if (location.hash) {
      setActiveItem(`/${location.hash}`);
    } else {
      setActiveItem(location.pathname);
    }

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
          navbarRef.current.classList.add('bg-gaming-darker/80', 'backdrop-blur-md', 'py-2', 'shadow-lg', 'border-b', 'border-white/5');
          navbarRef.current.classList.remove('bg-transparent', 'py-3');
        } else {
          navbarRef.current.classList.remove('bg-gaming-darker/80', 'backdrop-blur-md', 'py-2', 'shadow-lg', 'border-b', 'border-white/5');
          navbarRef.current.classList.add('bg-transparent', 'py-3');
        }
      }

      // Also update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
          setActiveItem(`/#${section.id}`);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

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

  const isActive = (href: string) => {
    if (href === '/') return activeItem === href;
    return activeItem === href;
  };

  return (
    <nav 
      ref={navbarRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gaming-purple/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
        {/* Logo */}
        <Link 
          to="/" 
          className="font-orbitron font-bold text-base tracking-wide text-white relative group py-4"
          onClick={(e) => handleLinkClick('/', e)}
        >
          <div className="absolute -top-1 -left-3 w-2 h-2 bg-gaming-purple/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -bottom-1 -right-3 w-2 h-2 bg-gaming-blue/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="gaming-gradient-text">Rikazur Rehman M</span>
          <div className="absolute bottom-2 left-0 w-0 h-px bg-gradient-to-r from-gaming-purple to-gaming-blue group-hover:w-full transition-all duration-300"></div>
        </Link>
        
        {/* Desktop menu */}
        <ul className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`relative px-3 py-2 text-sm rounded-lg overflow-hidden transition-all duration-300 group flex items-center gap-2
                    ${active 
                      ? 'text-white bg-black/30 border border-white/10 shadow-inner shadow-white/5' 
                      : 'text-white/70 hover:text-white border border-transparent hover:bg-black/20 hover:border-white/5'
                    }`}
                  onClick={(e) => handleLinkClick(item.href, e)}
                >
                  {/* Background effect */}
                  {active && (
                    <div className="absolute -z-10 inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15),transparent_70%)]"></div>
                  )}
                  
                  {/* Icon with glow */}
                  <div className={`flex-shrink-0 w-5 h-5 flex items-center justify-center ${active ? 'text-gaming-purple' : 'text-white/60 group-hover:text-gaming-purple/80'} transition-colors`}>
                    <item.icon size={14} className={active ? 'animate-pulse' : ''} />
                    {active && <div className="absolute w-full h-full rounded-full bg-gaming-purple/20 animate-pulse-slow blur-sm"></div>}
                  </div>
                  
                  {/* Text */}
                  <span>{item.name}</span>
                  
                  {/* Active indicator */}
                  {active && (
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-gaming-purple/50 to-gaming-blue/50"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        
        {/* Mobile menu button */}
        <button
          className="mobile-menu-button group"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {/* Button background effect */}
          <div className="absolute -z-10 inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.2),transparent_70%)]"></div>
          
          {isMenuOpen ? (
            <X size={18} className="text-gaming-purple" />
          ) : (
            <Menu size={18} className="text-gaming-purple" />
          )}
        </button>
      </div>
      
      {/* Mobile menu - improved for better mobile UX */}
      <div 
        className={`mobile-menu ${
          isMenuOpen ? 'max-h-[calc(100vh-60px)] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          {/* Decorative element */}
          <div className="absolute right-4 top-4 opacity-30 pointer-events-none">
            <Command size={40} className="text-gaming-purple/20" />
          </div>
          
          <ul className="flex flex-col space-y-2 relative">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${
                      active 
                        ? 'bg-black/40 text-white border border-gaming-purple/20 shadow-inner' 
                        : 'text-white/70 hover:text-white hover:bg-black/30 border border-transparent hover:border-white/10'
                    }`}
                    onClick={(e) => handleLinkClick(item.href, e)}
                  >
                    <div className={`w-8 h-8 rounded-lg ${active ? 'bg-gaming-purple/10' : 'bg-black/20'} flex items-center justify-center`}>
                      <item.icon size={16} className={active ? 'text-gaming-purple' : 'text-white/60'} />
                    </div>
                    <span className="text-base">{item.name}</span>
                    {active && (
                      <div className="ml-auto">
                        <Sparkles size={12} className="text-gaming-purple/70" />
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
