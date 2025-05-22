import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, FileText, Home, Info, Briefcase, Code, Mail } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/#about-me', icon: Info },
  { name: 'Works', href: '/works', icon: Briefcase },
  { name: 'Skills', href: '/#skills', icon: Code },
  { name: 'Contact', href: '/#contact', icon: Mail },
  { name: 'Resume', href: '/resume', icon: FileText },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // State to control navbar visibility
  const [showScrollTop, setShowScrollTop] = useState(false); // State to control scroll to top button visibility
  const lastScrollY = useRef(0); // Ref to store last scroll position
  const navbarRef = useRef<HTMLElement>(null); // Ref for the navbar element
  
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Logic to hide/show navbar
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) { // Scrolling down
        setIsVisible(false);
      } else { // Scrolling up or at the top
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Logic to show/hide scroll to top button
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
      
      // Add shadow when scrolled
      if (navbarRef.current) {
        if (currentScrollY > 50) {
          navbarRef.current.classList.add('bg-gaming-darker/90', 'backdrop-blur-md', 'py-3', 'shadow-lg');
          navbarRef.current.classList.remove('bg-transparent', 'py-5');
        } else {
          navbarRef.current.classList.remove('bg-gaming-darker/90', 'backdrop-blur-md', 'py-3', 'shadow-lg');
          navbarRef.current.classList.add('bg-transparent', 'py-5');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle navigation and scroll
  const handleLinkClick = (href: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    
    // Close menu on mobile
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    // Regular route navigation (no hash)
    if (!href.includes('#')) {
      // If the current path is the target path, just scroll to top
      if (location.pathname === href) {
        window.scrollTo(0, 0);
      } else {
        // Otherwise, navigate to the new route
        navigate(href);
      }
      // Always scroll to top on full route navigation
      window.scrollTo(0, 0);
      return;
    }

    // Handle hash links within the same page
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Handle route + hash (like "/#about")
    const [route, hash] = href.split('#');
    
    // If we're already on the correct route, just scroll
    if (location.pathname === route || (route === '/' && location.pathname === '')) {
      const element = document.querySelector(`#${hash}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Need to navigate first, then scroll after the new page loads
      navigate(href);
      // After navigation, scroll to the element
      setTimeout(() => {
        const element = document.querySelector(`#${hash}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Function to handle direct scroll to section by ID
  const scrollToSection = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
     if (isMenuOpen) { setIsMenuOpen(false); }
  };

  return (
    <nav 
      ref={navbarRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full' // Use transform for hiding/showing
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="font-orbitron text-2xl font-bold neon-text"
          onClick={(e) => handleLinkClick('/', e)}
        >
          RIKAZUR REHMAN M
        </Link>
        
        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className="text-white/80 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-0 after:bg-gaming-purple after:transition-all hover:after:w-full flex items-center gap-1"
                onClick={(e) => handleLinkClick(item.href, e)}
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
                    onClick={(e) => {
                      // Check if it's the Skills link and handle separately
                      if (item.name === 'Skills') {
                        scrollToSection('tools-i-use', e);
                      } else { handleLinkClick(item.href, e); }
                    }}
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
