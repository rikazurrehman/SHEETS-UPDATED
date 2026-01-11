import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-[5000] transition-all duration-300 ${isScrolled ? 'bg-[#0D0D0D]/80 backdrop-blur-md border-b border-[#E6E6E6]/5 py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-tighter text-[#E6E6E6] flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#FF7441] rounded-lg flex items-center justify-center text-black font-black text-sm rotate-3">R</div>
                    <span>Rikaz.</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-[#E6E6E6]/70 hover:text-[#E6E6E6] text-sm font-medium transition-colors">Home</Link>
                    <Link to="/works" className="text-[#E6E6E6]/70 hover:text-[#E6E6E6] text-sm font-medium transition-colors">Work</Link>
                    <a href="#about" className="text-[#E6E6E6]/70 hover:text-[#E6E6E6] text-sm font-medium transition-colors">About us</a>
                    <a href="#expertise" className="text-[#E6E6E6]/70 hover:text-[#E6E6E6] text-sm font-medium transition-colors">Services</a>
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <a href="#contact" className="px-6 py-2.5 bg-[#FF7441] hover:bg-[#FF7441]/90 text-[#0D0D0D] text-sm font-bold rounded-full transition-all hover:scale-105">
                        Contact us ↗
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-[#E6E6E6]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#0D0D0D] border-b border-[#E6E6E6]/10 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-4">
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-[#E6E6E6]/70 hover:text-[#E6E6E6] text-lg font-medium">Home</Link>
                    <Link to="/works" onClick={() => setIsMobileMenuOpen(false)} className="text-[#E6E6E6]/70 hover:text-[#E6E6E6] text-lg font-medium">Work</Link>
                    <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-[#E6E6E6]/70 hover:text-[#E6E6E6] text-lg font-medium">About us</a>
                    <a href="#expertise" onClick={() => setIsMobileMenuOpen(false)} className="text-[#E6E6E6]/70 hover:text-[#E6E6E6] text-lg font-medium">Services</a>
                    <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-3 bg-[#FF7441] text-[#0D0D0D] text-center font-bold rounded-full mt-2">
                        Contact us ↗
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
